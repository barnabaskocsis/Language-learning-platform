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
exports.studentlessonRouter = void 0;
const core_1 = require("@mikro-orm/core");
const express_1 = require("express");
const studentlesson_1 = require("../entities/studentlesson");
const user_1 = require("../entities/user");
const lesson_1 = require("../entities/lesson");
exports.studentlessonRouter = express_1.Router();
exports.studentlessonRouter
    .use((req, res, next) => {
    req.studentLessonRepository = req.orm.em.getRepository(studentlesson_1.StudentLesson);
    next();
})
    // students use to check their booked lessons
    .get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authUser = req.orm.em.getReference(user_1.User, req.user.id);
    const studentlessons = yield req.studentLessonRepository.findAll({ id: authUser.id });
    res.send(studentlessons);
}))
    // students use to book a lesson by {lesson_id}
    .post("/book/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date } = req.body;
    const studentlesson = new studentlesson_1.StudentLesson();
    core_1.wrap(studentlesson).assign(req.body, { em: req.orm.em });
    studentlesson.user = req.orm.em.getReference(user_1.User, req.user.id);
    studentlesson.lesson = req.orm.em.getReference(lesson_1.Lesson, parseInt(req.params.id));
    yield req.studentLessonRepository.persistAndFlush(studentlesson);
    res.sendStatus(200);
}))
    // students use to delete a booked lesson
    .delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authUser = req.orm.em.getReference(user_1.User, req.user.id);
    const studentid = authUser.id;
    const id = req.params.id;
    const lesson = yield req.studentLessonRepository.findOne({ id: parseInt(req.params.id), user_id: studentid });
    if (lesson) {
        const deletedCount = yield ((_a = req.studentLessonRepository) === null || _a === void 0 ? void 0 : _a.nativeDelete({ id }));
        if (deletedCount) {
            return res.sendStatus(200);
        }
    }
    return res.sendStatus(500);
}));
