class CreateBoards < ActiveRecord::Migration[6.0]
  def change
    create_table :boards do |t|
      t.belongs_to :user
      t.integer :likes

      t.timestamps
    end
  end
end
