import { Collection, wrap } from "@mikro-orm/core";
import { Router } from "express";
import { Teacher, TeacherType } from "../entities/teacher";
import { Lesson } from "../entities/lesson";
import { hashPassword } from "../security/password-utils";

export const teacherRouter = Router();

teacherRouter
  .use((req, res, next) => {
    req.teacherRepository = req.orm.em.getRepository(Teacher);
    next();
  })

  // list all teachers
  .get("", async (req, res) => {
    const teachers = await req.teacherRepository!.findAll({
      populate: ["languages"],
    });
    res.send(teachers);
  })

  // get one teacher by id
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

  // get lessons held by the teacher by id
  .get("/:id/lessons", async (req, res) => {
    const lessons = await req.lessonRepository!.findAll(
      { id: parseInt(req.params.id) }
    );
    if (!lessons) {
      return res.sendStatus(404);
    }
    res.send(lessons);
  })

  // endpoint to register new teachers
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
  })

  // sign in as a teacher
  .post("/signin", async (req, res) => {
    const { username, password, role }: AuthenticationDto = req.body;
    if (role !== "teacher") {
      return res.sendStatus(404);
    }
    const teacher = await req.teacherRepository!.findOne({ username });
    if (!teacher) {
      return res.sendStatus(401);
    }
    const hashedPassword = await hashPassword(password);
    if (hashedPassword !== teacher.password) {
      return res.sendStatus(401);
    }
    return res.send(teacher);
  });

interface AuthenticationDto {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  is_native: boolean;
  country: string;
  type: TeacherType;
  intro: string;
  languages: Collection<string>;
  role: string;
}
