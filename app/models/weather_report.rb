class WeatherReport < ApplicationRecord
  # assuming you have a cities table to link with
  belongs_to :location
  validates :dt, uniqueness: true
  # attributes from the JSON structure
  # dt, temp, feels_like, temp_min, temp_max, pressure, humidity, weather_id, weather_main, weather_description, weather_icon, clouds, wind_speed, wind_deg, wind_gust, visibility, pop, rain_3h, sys_pod, dt_txt
end