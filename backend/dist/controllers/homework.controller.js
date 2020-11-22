"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeworkRouter = void 0;
const core_1 = require("@mikro-orm/core");
const express_1 = require("express");
const homework_1 = require("../entities/homework");
const user_1 = require("../entities/user");
const uuid_1 = require("uuid");
exports.homeworkRouter = express_1.Router();
exports.homeworkRouter
    .use((req, res, next) => {
    req.homeworkRepository = req.orm.em.getRepository(homework_1.Homework);
    next();
})
    // teachers use to list all homeworks they created
    .get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authUser = req.orm.em.getReference(user_1.User, req.user.id);
    const teacherid = authUser.id;
    const homeworks = yield req.homeworkRepository.findAll({ teacher_id: teacherid });
    res.send(homeworks);
}))
    // users use to access a homework page by its uuid
    .get("/:uuid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const homework = yield req.homeworkRepository.find({ uuid: req.params.uuid });
    res.send(homework); //TODO return?
}))
    // teachers use to create new homeworks for students
    .post("/newhomework", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.role === user_1.UserRole.Teacher) {
        const { uuid, name, title, description, path_to_solution } = req.body;
        const homework = new homework_1.Homework();
        core_1.wrap(homework).assign(Object.assign(Object.assign({}, req.body), { uuid: uuid_1.v4() }), { em: req.orm.em });
        homework.owner = req.orm.em.getReference(user_1.User, req.user.id);
        yield req.homeworkRepository.persistAndFlush(homework);
        res.send(homework);
    }
    return res.sendStatus(403);
}))
    //teachers use to update a homework
    .patch("/update/:uuid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authUser = req.orm.em.getReference(user_1.User, req.user.id);
    const teacherid = authUser.id;
    const uuid = req.params.uuid;
    const { name, title, description } = req.body;
    const homework = yield req.homeworkRepository.findOne({ uuid: req.params.uuid, owner_id: teacherid });
    if (homework) {
        const updateCount = yield ((_a = req.homeworkRepository) === null || _a === void 0 ? void 0 : _a.nativeUpdate({ uuid }, req.body));
        if (updateCount) {
            return res.sendStatus(200);
        }
    }
    return res.sendStatus(500);
}))
    //teachers use to delete a homework
    .delete("/delete/:uuid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const authUser = req.orm.em.getReference(user_1.User, req.user.id);
    const teacherid = authUser.id;
    const uuid = req.params.uuid;
    const homework = yield req.homeworkRepository.findOne({ uuid: req.params.uuid, owner_id: teacherid });
    if (homework) {
        const deletedCount = yield ((_b = req.homeworkRepository) === null || _b === void 0 ? void 0 : _b.nativeDelete({ uuid }));
        if (deletedCount) {
            return res.sendStatus(200);
        }
    }
    return res.sendStatus(500);
}));
