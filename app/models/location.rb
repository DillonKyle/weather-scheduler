class Location < ApplicationRecord
  has_many :weather_reports

  # Validations for uniqueness of the lat-lon pair can be added to ensure no duplicates
  validates :latitude, presence: true
  validates :longitude, presence: true
  validates :latitude, uniqueness: { scope: :longitude }
end
