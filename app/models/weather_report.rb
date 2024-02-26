class WeatherReport < ApplicationRecord
  belongs_to :location
  validates :dt, uniqueness: true
end