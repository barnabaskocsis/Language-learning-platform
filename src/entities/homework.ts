import { Collection, Entity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core";
import { User } from "./user";

// id,name,userId,title,description,path_to_solution
@Entity()
export class Homework {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property()
  path_to_solution!: string;

  @ManyToOne(() => User)
  user!: User;
}
