import { Collection, Entity, PrimaryKey, Property } from "@mikro-orm/core";

// id, userId, lessonId, date
@Entity()
export class StudentLesson {
  @PrimaryKey()
  id!: number;

  @Property()
  username!: string;

  @Property()
  password!: string;
}
