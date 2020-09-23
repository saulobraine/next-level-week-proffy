import { Request, Response } from 'express';
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {



  async index(request: Request, response: Response) {
    const filters = request.query;
    let timeInMinutes = 0;

    if (filters.time) {
      timeInMinutes = convertHourToMinutes(filters.time as string);
    }

    const classes = await db('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('class_schedule.class_id = classes.id')
          .modify(QueryBuilder => {
            ((filters.week_day && filters.week_day != 'allDays') && QueryBuilder.whereRaw('class_schedule.week_day = ??', [Number(filters.week_day as string)]));

            ((filters.time && filters.time != 'allTimes') && QueryBuilder
              .whereRaw('class_schedule.from <= ??', [timeInMinutes])
              .whereRaw('class_schedule.to > ??', [timeInMinutes])
            )
          });
      })
      .modify(QueryBuilder => {
        ((filters.subject && filters.subject != 'allSubjects') && QueryBuilder.where('classes.subject', '=', filters.subject as string))
      })
      .join('users', 'classes.user_id', '=', 'users.id')
      .orderBy('users.name')
      .select();

    const UserSchedule = classes.map(async (classUser: any) => {

      const class_schedule = await db('class_schedule')
        .join('classes', function () {
          this.on(function () {
            this.on('classes.id', '=', 'class_schedule.class_id')
            this.andOn('classes.user_id', '=', classUser.user_id)
          })
        })
        .orderBy('class_schedule.week_day')
        .select(['class_schedule.*']);

      return {
        ...classUser,
        class_schedule
      }
    });


    Promise.all(UserSchedule).then(UserScheduleResponse => {
      return response.json(UserScheduleResponse);
    });
  }

  async create(request: Request, response: Response) {

    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body;

    const trx = await db.transaction();

    try {
      const insertedUsersIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio
      }).returning('id');

      const user_id = insertedUsersIds[0];

      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id
      }).returning('id');

      const class_id = insertedClassesIds[0];

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to)
        };
      });

      await trx('class_schedule').insert(classSchedule);

      await trx.commit();

      return response.status(201).send();

    } catch (err) {

      await trx.rollback();

      return response.status(400).json({
        error: "Unexpected error while creating new class"
      });
    }
  }
}