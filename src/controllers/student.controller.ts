import { Collection, wrap } from "@mikro-orm/core";
import { Router } from "express";
import { Student } from "../entities/student";
import { hashPassword } from "../security/password-utils";

export const studentRouter = Router();

studentRouter
  .use((req, res, next) => {
    req.studentRepository = req.orm.em.getRepository(Student);
    next();
  })

  // list all students
  .get("", async (req, res) => {
    const students = await req.studentRepository!.findAll({
      populate: ["languages"],
    });
    res.send(students);
  })

  // get one student by id
  .get("/:id", async (req, res) => {
    const student = await req.studentRepository!.findOne(
      { id: parseInt(req.params.id) },
      {
        populate: ["languages"],
      }
    );
    if (!student) {
      return res.sendStatus(404);
    }
    res.send(student);
  })

  // endpoint to register new students
  .post("/signup", async (req, res) => {
    const { username, password, first_name, last_name }: AuthenticationDto = req.body;
    let student = await req.studentRepository!.findOne({ username });
    if (student) {
      return res.sendStatus(409);
    }

    const hashedPassword = await hashPassword(password);

    student = new Student();
    wrap(student).assign({ ...req.body, password: hashedPassword }, { em: req.orm.em });

    const languages = student.languages.getItems();
    if (languages) {
      languages.filter((language: number) => language).forEach((language: number) => req.orm.em.merge(language));
    }

    await req.studentRepository!.persistAndFlush(student);
    res.send(student);
    return res.sendStatus(200);
  })

  // sign in as a student
  .post("/signin", async (req, res) => {
    const { username, password, role }: AuthenticationDto = req.body;
    if (role !== "student") {
      return res.sendStatus(404);
    }
    const student = await req.studentRepository!.findOne({ username });
    if (!student) {
      return res.sendStatus(401);
    }
    const hashedPassword = await hashPassword(password);
    if (hashedPassword !== student.password) {
      return res.sendStatus(401);
    }
    return res.send(student);
  });

interface AuthenticationDto {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  languages: Collection<string>;
  role: string;
}
