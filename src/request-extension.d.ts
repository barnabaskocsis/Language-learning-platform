import { EntityRepository, MikroORM, IDatabaseDriver } from "@mikro-orm/core";


declare global {
  namespace Express {

    interface Request {
      orm: MikroORM<IDatabaseDriver>;
      studentRepository?: EntityRepository<ApplicationUser>;
      teacherRepository?: EntityRepository<ApplicationUser>;
      lessonRepository?: EntityRepository<ApplicationUser>;
    }
  }
}
