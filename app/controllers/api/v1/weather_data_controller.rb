class Api::V1::WeatherDataController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    @weather_data = WeatherData.all
    render json: @weather_data
  end

  def create
    @weather_data = WeatherData.new(weather_data_params)
    if @weather_data.save
      render json: @weather_data, status: :created
    else
      render json: @weather_data.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @weather_data = WeatherData.find(params[:id])
    if @weather_data.destroy
      render json: {"status"=> "destroyed"}
    else
      render json: {"status"=> "error"}
    end
  end

  private

  def weather_data_params
    params.require(:weather_datum).permit(:name, :latitude, :longitude)
  end
end
