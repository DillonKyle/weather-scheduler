FactoryBot.define do
  
  factory :location do
    sequence(:name) { |n| "Location #{n}" }
    sequence(:latitude) { |n| 40.7143528 + n * 0.0001 }
    sequence(:longitude) { |n| -74.0059731 + n * 0.0001 }
  end

  factory :weather_report do
    location
    dt { Time.now.to_i }
    temp { 20.5 }
    feels_like { 19.0 }
    temp_min { 18.0 }
    temp_max { 22.0 }
    pressure { 1012 }
    humidity { 80 }
    weather_id { 800 }
    weather_main { "Clear" }
    weather_description { "clear sky" }
    weather_icon { "01d" }
    clouds { 1 }
    wind_speed { 5.2 }
    wind_deg { 150 }
    wind_gust { 7.0 }
    visibility { 10000 }
    pop { 0 }
    rain_3h { nil }
    sys_pod { "n" }
    dt_txt { "2024-02-26 12:00:00" }
  end
end