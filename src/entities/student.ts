import { Collection, Entity, PrimaryKey, Property, ManyToMany } from "@mikro-orm/core";
import { Language } from "./language";

@Entity()
export class Student {
  @PrimaryKey()
  id!: number;

  @Property()
  username!: string;

  @Property()
  password!: string;

  @Property()
  first_name!: string;

  @Property()
  last_name!: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @ManyToMany(() => Language, "students", { owner: true })
  languages = new Collection<Language>(this);
}
