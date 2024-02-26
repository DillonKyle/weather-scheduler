# Weather Data App
This app requires ruby, rails, and react to install and run.
The setup can be troublesome and complicated so I will point out the files of interest.
If youd like to see the application running, it is hosted on heroku here:
https://csca5028-weather-scheduler-4a78e0f68e0d.herokuapp.com/

## Database
[Schema](./db/schema.rb)

## Service
[Service that calls the Open Weather Data Api](./app/services/open_weather_map_service.rb)

## Backend API
[Method (fetch_all) that processes the request, retrieves the weather data for every saved location and stores then in the DB](./app/controllers/api/v1/locations_controller.rb#fetch_all)

## Continous Integration
[Github Action](./.github/workflows/ruby.yml)

## Tests
[Unit Tests for the backend api](./spec/controllers/api/v1/locations_controller_spec.rb)
