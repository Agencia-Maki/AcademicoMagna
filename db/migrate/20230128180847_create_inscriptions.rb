class CreateInscriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :inscriptions do |t|
      t.belongs_to :course
      t.belongs_to :student
      t.datetime :date_inscription
      t.integer :status
      t.timestamps
    end
  end
end
