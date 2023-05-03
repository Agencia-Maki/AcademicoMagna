# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_04_28_193304) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "document_number", default: "", null: false
    t.string "first_name", default: "", null: false
    t.string "last_name", default: "", null: false
    t.string "phone"
    t.string "avatar"
    t.integer "gender"
    t.integer "document_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["document_number"], name: "index_admins_on_document_number", unique: true
    t.index ["email"], name: "index_admins_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true
  end

  create_table "answer_options", force: :cascade do |t|
    t.bigint "question_answer_id", null: false
    t.string "enunciate"
    t.integer "status"
    t.boolean "marked"
    t.decimal "score", precision: 4, scale: 2
    t.index ["question_answer_id"], name: "index_answer_options_on_question_answer_id"
  end

  create_table "chapters", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.datetime "start_date"
    t.datetime "end_date"
    t.bigint "course_id", null: false
    t.index ["course_id"], name: "index_chapters_on_course_id"
  end

  create_table "course_categories", force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.index ["slug"], name: "index_course_categories_on_slug", unique: true
  end

  create_table "courses", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "start_date"
    t.datetime "end_date"
    t.integer "status"
    t.string "cover"
    t.string "magna_class_link"
    t.integer "show_magna_class_link"
    t.integer "its_free"
    t.string "conference_link"
    t.bigint "professor_id"
    t.bigint "course_category_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug"
    t.string "duration"
    t.index ["course_category_id"], name: "index_courses_on_course_category_id"
    t.index ["professor_id"], name: "index_courses_on_professor_id"
  end

  create_table "exam_questions", force: :cascade do |t|
    t.decimal "score", precision: 4, scale: 2
    t.string "enunciate"
    t.string "feedback"
    t.bigint "exam_id", null: false
    t.index ["exam_id"], name: "index_exam_questions_on_exam_id"
  end

  create_table "exam_scores", force: :cascade do |t|
    t.bigint "student_answer_id"
    t.bigint "student_id"
    t.text "feedback"
    t.decimal "score", precision: 4, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["student_answer_id"], name: "index_exam_scores_on_student_answer_id"
    t.index ["student_id"], name: "index_exam_scores_on_student_id"
  end

  create_table "exams", force: :cascade do |t|
    t.bigint "course_id"
    t.string "name", null: false
    t.string "file"
    t.integer "type_exam"
    t.integer "status"
    t.integer "percent"
    t.datetime "start"
    t.datetime "end"
    t.integer "duration"
    t.integer "attempt"
    t.integer "student_visibility"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_exams_on_course_id"
  end

  create_table "inscriptions", force: :cascade do |t|
    t.bigint "course_id"
    t.bigint "student_id"
    t.datetime "date_inscription"
    t.integer "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_inscriptions_on_course_id"
    t.index ["student_id"], name: "index_inscriptions_on_student_id"
  end

  create_table "lessons", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.text "topics"
    t.string "link_video"
    t.bigint "chapter_id", null: false
    t.index ["chapter_id"], name: "index_lessons_on_chapter_id"
  end

  create_table "materials", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "file"
    t.bigint "chapter_id", null: false
    t.index ["chapter_id"], name: "index_materials_on_chapter_id"
  end

  create_table "professors", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "document_number", default: "", null: false
    t.string "first_name", default: "", null: false
    t.string "last_name", default: "", null: false
    t.string "code", default: "", null: false
    t.string "phone"
    t.string "address"
    t.string "country"
    t.string "province"
    t.string "avatar"
    t.string "bank_name"
    t.string "bank_account_number"
    t.decimal "salary", precision: 8, scale: 2
    t.date "date_of_bith"
    t.date "date_of_admission"
    t.integer "status"
    t.integer "gender"
    t.integer "document_type"
    t.integer "currency"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "signature"
    t.index ["code"], name: "index_professors_on_code", unique: true
    t.index ["document_number"], name: "index_professors_on_document_number", unique: true
    t.index ["email"], name: "index_professors_on_email", unique: true
    t.index ["reset_password_token"], name: "index_professors_on_reset_password_token", unique: true
  end

  create_table "question_answers", force: :cascade do |t|
    t.bigint "student_answer_id", null: false
    t.decimal "score", precision: 4, scale: 2
    t.string "enunciate", null: false
    t.index ["student_answer_id"], name: "index_question_answers_on_student_answer_id"
  end

  create_table "question_options", force: :cascade do |t|
    t.bigint "exam_question_id", null: false
    t.string "enunciate"
    t.decimal "score", precision: 4, scale: 2
    t.integer "status"
    t.index ["exam_question_id"], name: "index_question_options_on_exam_question_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.index ["slug"], name: "index_roles_on_slug", unique: true
  end

  create_table "student_answers", force: :cascade do |t|
    t.bigint "exam_id"
    t.bigint "student_id"
    t.string "file"
    t.integer "status"
    t.integer "percent"
    t.decimal "score", precision: 4, scale: 2
    t.integer "duration"
    t.integer "attempt"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["exam_id"], name: "index_student_answers_on_exam_id"
    t.index ["student_id"], name: "index_student_answers_on_student_id"
  end

  create_table "student_records", force: :cascade do |t|
    t.string "email"
    t.string "document_number"
    t.string "first_name"
    t.string "last_name"
    t.string "phone"
    t.string "code"
    t.string "course_code"
    t.string "course_name"
    t.integer "document_type"
    t.integer "gender"
    t.integer "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "students", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "document_number", default: "", null: false
    t.string "first_name", default: "", null: false
    t.string "last_name", default: "", null: false
    t.string "code", default: "", null: false
    t.string "phone"
    t.string "address"
    t.string "country"
    t.string "province"
    t.string "avatar"
    t.string "profession"
    t.string "obtained_title"
    t.string "year_grade"
    t.string "company_name"
    t.string "job_title"
    t.string "ruc"
    t.string "business_name"
    t.string "business_address"
    t.date "date_of_bith"
    t.integer "status"
    t.integer "gender"
    t.integer "document_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code"], name: "index_students_on_code", unique: true
    t.index ["document_number"], name: "index_students_on_document_number", unique: true
    t.index ["email"], name: "index_students_on_email", unique: true
    t.index ["reset_password_token"], name: "index_students_on_reset_password_token", unique: true
  end

  add_foreign_key "answer_options", "question_answers"
  add_foreign_key "chapters", "courses"
  add_foreign_key "courses", "course_categories"
  add_foreign_key "courses", "professors"
  add_foreign_key "exam_questions", "exams"
  add_foreign_key "lessons", "chapters"
  add_foreign_key "materials", "chapters"
  add_foreign_key "question_answers", "student_answers"
  add_foreign_key "question_options", "exam_questions"
end
