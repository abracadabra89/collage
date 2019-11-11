class CreateBoards < ActiveRecord::Migration[6.0]
  def change
    create_table :boards do |t|
      t.belongs_to :user
      t.string :title
      t.integer :likes

      t.timestamps
    end
  end
end
