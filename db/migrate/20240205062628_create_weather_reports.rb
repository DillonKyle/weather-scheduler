class CreateWeatherReports < ActiveRecord::Migration[7.1]
  def change
    create_table :weather_reports do |t|
      t.integer :dt
      t.decimal :temp
      t.decimal :feels_like
      t.decimal :temp_min
      t.decimal :temp_max
      t.integer :pressure
      t.integer :humidity
      t.integer :weather_id
      t.string :weather_main
      t.string :weather_description
      t.string :weather_icon
      t.integer :clouds
      t.decimal :wind_speed
      t.integer :wind_deg
      t.decimal :wind_gust
      t.integer :visibility
      t.decimal :pop
      t.decimal :rain_3h
      t.string :sys_pod
      t.datetime :dt_txt

      t.timestamps
    end
  end
end
