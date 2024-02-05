class Api::V1::LocationsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    @locations = Location.all
    render json: @locations
  end

  def create
    @location = Location.new(locations_params)
    if @location.save
      render json: @location, status: :created
    else
      render json: @location.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @location = Location.find(params[:id])
    if @location.destroy
      render json: {"status"=> "destroyed"}
    else
      render json: {"status"=> "error"}
    end
  end

  def fetch_all
    api_key = ENV["WEATHER_API"] # Replace with your actual API key
    service = OpenWeatherMapService.new(api_key)

    locations = Location.all.map do |location|
      response = service.fetch_weather_for_location(location.latitude, location.longitude)
      if response.success?
        data = response.parsed_response

        data["list"].each do |entry|
          unless WeatherReport.exists?(dt: entry["dt"])
            WeatherReport.create!(
              location: location,
              dt: entry["dt"],
              temp: entry["main"]["temp"],
              feels_like: entry["main"]["feels_like"],
              temp_min: entry["main"]["temp_min"],
              temp_max: entry["main"]["temp_max"],
              pressure: entry["main"]["pressure"],
              humidity: entry["main"]["humidity"],
              weather_id: entry["weather"].first["id"],
              weather_main: entry["weather"].first["main"],
              weather_description: entry["weather"].first["description"],
              weather_icon: entry["weather"].first["icon"],
              clouds: entry["clouds"]["all"],
              wind_speed: entry["wind"]["speed"],
              wind_deg: entry["wind"]["deg"],
              wind_gust: entry["wind"]["gust"],
              visibility: entry["visibility"],
              pop: entry["pop"],
              rain_3h: entry["rain"] ? entry["rain"]["3h"] : nil,
              sys_pod: entry["sys"]["pod"],
              dt_txt: entry["dt_txt"]
            )
          end
        end
        # Combine location info with weather data
        { location_id: location.id, location_name: location.name, weather: response.parsed_response }
      else
        { location_id: location.id, error: "Failed to fetch weather data" }
      end
    end

    render json: locations
  end

  private

  def locations_params
    puts "*"*20
    pp params
    puts "*"*20
    params.require(:location).permit(:name, :latitude, :longitude)
  end
end
