BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "language" (
	"id"	integer NOT NULL,
	"language_code"	varchar NOT NULL,
	"langauge"	varchar NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "user" (
	"id"	integer NOT NULL,
	"username"	varchar NOT NULL,
	"password"	varchar NOT NULL,
	"first_name"	varchar NOT NULL,
	"last_name"	varchar NOT NULL,
	"country"	varchar,
	"is_native"	integer,
	"type"	varchar,
	"intro"	varchar,
	"role"	varchar NOT NULL,
	"created_at"	text NOT NULL,
	"updated_at"	text NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "lesson" (
	"id"	integer NOT NULL,
	"title"	varchar NOT NULL,
	"price"	integer NOT NULL,
	"teacher_id"	integer,
	"language_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "student_lesson" (
	"id"	integer NOT NULL,
	"date"	datetime NOT NULL,
	"user_id"	integer,
	"lesson_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "homework" (
	"id"	integer NOT NULL,
	"uuid"	varchar NOT NULL,
	"name"	varchar NOT NULL,
	"title"	varchar NOT NULL,
	"description"	varchar NOT NULL,
	"path_to_solution"	varchar,
	"owner_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "user_languages" (
	"user_id"	integer NOT NULL,
	"language_id"	integer NOT NULL,
	PRIMARY KEY("user_id","language_id")
);
CREATE INDEX IF NOT EXISTS "user_languages_user_id_index" ON "user_languages" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "user_languages_language_id_index" ON "user_languages" (
	"language_id"
);
CREATE INDEX IF NOT EXISTS "lesson_teacher_id_index" ON "lesson" (
	"teacher_id"
);
CREATE INDEX IF NOT EXISTS "lesson_language_id_index" ON "lesson" (
	"language_id"
);
CREATE INDEX IF NOT EXISTS "student_lesson_user_id_index" ON "student_lesson" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "student_lesson_lesson_id_index" ON "student_lesson" (
	"lesson_id"
);
CREATE INDEX IF NOT EXISTS "homework_owner_id_index" ON "homework" (
	"owner_id"
);
COMMIT;
