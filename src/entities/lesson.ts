import { Collection, Entity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core";
import { User } from "./user";
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

  @ManyToOne(() => User)
  teacher!: User;

  @ManyToOne(() => Language)
  language!: Language;
}
