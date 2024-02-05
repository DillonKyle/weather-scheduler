class Createlocations < ActiveRecord::Migration[7.1]
  def change
    create_table :locations do |t|
      t.string :name
      t.string :latitude
      t.string :longitude
      
      t.timestamps
    end
    add_reference :weather_reports, :location, foreign_key: true
  end
end
