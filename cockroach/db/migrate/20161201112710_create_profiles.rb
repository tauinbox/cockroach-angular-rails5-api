class CreateProfiles < ActiveRecord::Migration[5.0]
  def change
    create_table :profiles do |t|
      t.string :nickname
      t.string :firstname
      t.string :lastname
      t.string :userpic
      t.string :status
      t.references :user, foreign_key: true, index: true

      t.timestamps
    end
  end
end
