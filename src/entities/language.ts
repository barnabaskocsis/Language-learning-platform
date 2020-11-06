import { Collection, Entity, PrimaryKey, Property, ManyToMany, OneToMany } from "@mikro-orm/core";
import { Teacher } from "./teacher";
import { Student } from "./student";
import { Lesson } from "./lesson";

// id,language,language_code
@Entity()
export class Language {
  @PrimaryKey()
  id!: number;

  @Property()
  language_code!: string;

  @Property()
  langauge!: string;

  @ManyToMany(() => Teacher, teacher => teacher.languages)
  teachers = new Collection<Teacher>(this);

  @ManyToMany(() => Student, student => student.languages)
  students = new Collection<Teacher>(this);

  @OneToMany(() => Lesson, (lesson) => lesson.language)
  lesson = new Collection<Lesson>(this);
}
