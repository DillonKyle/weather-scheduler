class AddLocationRefrenceToWeatherReport < ActiveRecord::Migration[7.1]
  def change
    add_reference(:weather_reports, :location, foreign_key: true)
  end
end
