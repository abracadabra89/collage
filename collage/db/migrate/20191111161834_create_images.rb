class CreateImages < ActiveRecord::Migration[6.0]
  def change
    create_table :images do |t|
      t.belongs_to :board
      t.string :title
      t.string :description
      t.string :link

      t.timestamps
    end
  end
end
