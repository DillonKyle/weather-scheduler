require 'httparty'

class OpenWeatherMapService
  include HTTParty
  base_uri 'https://api.openweathermap.org/data/2.5'

  def initialize(api_key)
    @api_key = api_key
  end

  def fetch_weather_for_location(lat, lon)
    options = {
      query: {
        lat: lat,
        lon: lon,
        units: "imperial",
        appid: @api_key
      }
    }

    self.class.get('/forecast', options)
  end
end