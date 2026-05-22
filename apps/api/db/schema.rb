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

ActiveRecord::Schema.define(version: 2026_05_22_120000) do

  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.bigint "issue_id", null: false
    t.string "kind", null: false
    t.string "actor_type", default: "system", null: false
    t.bigint "actor_id"
    t.text "body"
    t.jsonb "metadata", default: {}, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["issue_id", "created_at"], name: "index_activities_on_issue_id_and_created_at"
    t.index ["issue_id"], name: "index_activities_on_issue_id"
  end

  create_table "issues", force: :cascade do |t|
    t.bigint "project_id", null: false
    t.bigint "user_id", null: false
    t.bigint "workflow_state_id", null: false
    t.integer "number", null: false
    t.string "title", null: false
    t.text "description"
    t.string "priority", default: "none", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id", "number"], name: "index_issues_on_project_id_and_number", unique: true
    t.index ["project_id"], name: "index_issues_on_project_id"
    t.index ["user_id"], name: "index_issues_on_user_id"
    t.index ["workflow_state_id"], name: "index_issues_on_workflow_state_id"
  end

  create_table "projects", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name", null: false
    t.string "key", null: false
    t.string "color", default: "#5E6AD2", null: false
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "key"], name: "index_projects_on_user_id_and_key", unique: true
    t.index ["user_id"], name: "index_projects_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "email", null: false
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "middlename"
  end

  create_table "workflow_states", force: :cascade do |t|
    t.bigint "project_id", null: false
    t.string "name", null: false
    t.string "slug", null: false
    t.integer "position", default: 0, null: false
    t.string "category", default: "backlog", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id", "slug"], name: "index_workflow_states_on_project_id_and_slug", unique: true
    t.index ["project_id"], name: "index_workflow_states_on_project_id"
  end

  add_foreign_key "activities", "issues"
  add_foreign_key "issues", "projects"
  add_foreign_key "issues", "users"
  add_foreign_key "issues", "workflow_states"
  add_foreign_key "projects", "users"
  add_foreign_key "workflow_states", "projects"
end
