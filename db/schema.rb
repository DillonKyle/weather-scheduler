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

ActiveRecord::Schema[7.1].define(version: 2024_02_26_034522) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "locations", force: :cascade do |t|
    t.string "name"
    t.string "latitude"
    t.string "longitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "weather_reports", force: :cascade do |t|
    t.integer "dt"
    t.decimal "temp"
    t.decimal "feels_like"
    t.decimal "temp_min"
    t.decimal "temp_max"
    t.integer "pressure"
    t.integer "humidity"
    t.integer "weather_id"
    t.string "weather_main"
    t.string "weather_description"
    t.string "weather_icon"
    t.integer "clouds"
    t.decimal "wind_speed"
    t.integer "wind_deg"
    t.decimal "wind_gust"
    t.integer "visibility"
    t.decimal "pop"
    t.decimal "rain_3h"
    t.string "sys_pod"
    t.datetime "dt_txt"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "location_id", null: false
    t.index ["location_id"], name: "index_weather_reports_on_location_id"
  end

  add_foreign_key "weather_reports", "locations"
end
