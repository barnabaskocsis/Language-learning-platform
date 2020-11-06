import { Router } from "express";
import { studentRouter } from "./student.controller";
import { teacherRouter } from "./teacher.controller";
import { lessonRouter } from "./lesson.controller";

export const routes = Router();

routes.use('/student', studentRouter);
routes.use('/teachers', teacherRouter);
routes.use('/lessons', lessonRouter);

//routes.use('/issues', passport.authenticate('jwt', { session: false }), issuesRouter);
