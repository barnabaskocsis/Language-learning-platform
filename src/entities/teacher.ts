import { Collection, Entity, PrimaryKey, Property, Enum, OneToMany, ManyToMany } from "@mikro-orm/core";
import { Language } from "./language";
import { Lesson } from "./lesson";

@Entity()
export class Teacher {
  @PrimaryKey()
  id!: number;

  @Property()
  username!: string;

  @Property()
  first_name!: string;

  @Property()
  last_name!: string;

  @Property()
  password!: string;

  @Property()
  is_native!: boolean;

  @Property()
  country!: string;

  @Enum()
  type!: TeacherType;

  @Property()
  intro!: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @ManyToMany(() => Language, "teachers", { owner: true })
  languages = new Collection<Language>(this);

  @OneToMany(() => Lesson, (lesson) => lesson.teacher)
  lesson = new Collection<Lesson>(this);
}

export enum TeacherType {
  Professional = "PROFESSIONAL",
  Community = "COMMUNITY",
}
