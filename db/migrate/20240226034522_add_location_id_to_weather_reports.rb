class AddLocationIdToWeatherReports < ActiveRecord::Migration[7.1]
  def change
    add_reference :weather_reports, :location, null: false, foreign_key: true
  end
end
