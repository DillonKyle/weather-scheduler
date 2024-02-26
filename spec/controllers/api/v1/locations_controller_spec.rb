require 'rails_helper'

RSpec.describe Api::V1::LocationsController, type: :controller do
  describe "GET #index" do
    before do
      create_list(:location, 3)
      get :index
    end

    it "returns a successful response" do
      expect(response).to be_successful
    end

    it "returns all locations" do
      expect(JSON.parse(response.body).size).to eq(3)
    end
  end

  describe "POST #create" do
    context "with valid parameters" do
      it "creates a new location" do
        expect {
          post :create, params: { location: { name: "New Location", latitude: 40.7128, longitude: -74.0060 } }
        }.to change(Location, :count).by(1)
      end
    end

    context "with invalid parameters" do
      it "does not create a new location" do
        expect {
          post :create, params: { location: { name: "" } }
        }.to_not change(Location, :count)
      end
    end
  end

  describe "DELETE #destroy" do
    let!(:location) { create(:location) }

    it "destroys the requested location" do
      expect {
        delete :destroy, params: { id: location.id }
      }.to change(Location, :count).by(-1)
    end
  end

  describe "GET #fetch_all" do
    let!(:locations) { create_list(:location, 3) }

    before do
      service_double = instance_double(OpenWeatherMapService)
      
      allow(OpenWeatherMapService).to receive(:new).and_return(service_double)
      
      allow(service_double).to receive(:fetch_weather_for_location) do |lat, lon|
        double("HTTParty Response", success?: true, parsed_response: {
          "list" => [{
            "dt" => Time.now.to_i,
            "main" => {
              "temp" => 70.0,
              "feels_like" => 68.0,
              "temp_min" => 65.0,
              "temp_max" => 72.0,
              "pressure" => 1012,
              "humidity" => 75
            },
            "weather" => [{ "id" => 800, "main" => "Clear", "description" => "clear sky", "icon" => "01d" }],
            "clouds" => { "all" => 0 },
            "wind" => { "speed" => 5.2, "deg" => 240 },
            "sys" => { "pod" => "d" },
            "dt_txt" => "2024-02-26 12:00:00"
          }],
        })
      end

      get :fetch_all
    end

    it "returns a successful response" do
      expect(response).to have_http_status(:ok)
    end

    it "returns the correct number of locations" do
      json_response = JSON.parse(response.body)
      expect(json_response.size).to eq(3)
    end
  end
end