import { Collection, wrap } from "@mikro-orm/core";
import { Router } from "express";
import { Lesson } from "../entities/lesson";
import { Student } from "../entities/student";
import { Teacher } from "../entities/teacher";
import { hashPassword } from "../security/password-utils";

export const lessonRouter = Router();

lessonRouter
  .use((req, res, next) => {
    req.lessonRepository = req.orm.em.getRepository(Teacher);
    next();
  })

  // list all sold lessons of a teacher
  .get("/:id", async (req, res) => {
    const lessons = await req.teacherRepository!.findAll({ id: parseInt(req.params.id) });
    res.send(lessons);
  })

  // list all booked lessons of a teacher
  .get("", async (req, res) => {
    const teachers = await req.teacherRepository!.findAll({
      populate: ["languages"],
    });
    res.send(teachers);
  })

  // list all booked lessons of a student
  .get("", async (req, res) => {
    const teachers = await req.teacherRepository!.findAll({
      populate: ["languages"],
    });
    res.send(teachers);
  })

  // get one lesson by id
  .get("/:id", async (req, res) => {
    const teacher = await req.teacherRepository!.findOne(
      { id: parseInt(req.params.id) },
      {
        populate: ["languages"],
      }
    );
    if (!teacher) {
      return res.sendStatus(404);
    }
    res.send(teacher);
  })

  /*// endpoint to register new teachers
  .post("/apply", async (req, res) => {
    const { username, password, first_name, last_name, is_native, country, type, intro }: AuthenticationDto = req.body;
    let teacher = await req.teacherRepository!.findOne({ username });
    if (teacher) {
      return res.sendStatus(409);
    }

    const hashedPassword = await hashPassword(password);

    teacher = new Teacher();
    wrap(teacher).assign({ ...req.body, password: hashedPassword }, { em: req.orm.em });

    const languages = teacher.languages.getItems();
    if (languages) {
      languages.filter((language: number) => language).forEach((language: number) => req.orm.em.merge(language));
    }

    await req.teacherRepository!.persistAndFlush(teacher);
    res.send(teacher);
    return res.sendStatus(200);
  })*/

interface AuthenticationDto {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  is_native: boolean;
  country: string;
  intro: string;
  languages: Collection<string>;
  role: string;
}
