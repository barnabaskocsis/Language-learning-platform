import { IDatabaseDriver, Configuration, Options } from "@mikro-orm/core";
import { env } from "process";
import { Student } from "./entities/student";
import { Teacher } from "./entities/teacher";
import { Language } from "./entities/language";
import { Lesson } from "./entities/lesson";

export default {
  entities: [Student, Teacher, Language, Lesson],
  dbName: env.NODE_ENV === "test" ? "italki.test.sqlite" : "italki.sqlite",
  type: "sqlite",
} as Options<IDatabaseDriver> | Configuration<IDatabaseDriver>;
