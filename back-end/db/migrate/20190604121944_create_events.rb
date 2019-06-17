class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :name
      t.text :description
      t.string :url
      t.string :venue_name
      t.string :venue_address
      t.references :category
      t.datetime :date

      t.timestamps
    end
  end
end
