class Location < ApplicationRecord
  has_many :weather_reports

  validates :latitude, presence: true
  validates :longitude, presence: true
  validates :latitude, uniqueness: { scope: :longitude }
end
