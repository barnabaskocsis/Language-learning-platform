import { Collection, Entity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core";
import { Teacher } from "./teacher";
import { Language } from "./language";

// id,title,price,languageId,teacherId
@Entity()
export class Lesson {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property()
  price!: number;

  @ManyToOne(() => Teacher)
  teacher!: Teacher;

  @ManyToOne(() => Language)
  language!: Language;
}
