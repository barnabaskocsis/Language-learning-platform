import { Collection, Entity, PrimaryKey, Property } from "@mikro-orm/core";

// id,name,teacherId,userId,title,description,path_to_solution
@Entity()
export class Homework {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  password!: string;
}
