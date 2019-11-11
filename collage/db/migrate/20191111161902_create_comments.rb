class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.belongs_to :board
      t.string :description

      t.timestamps
    end
  end
end
