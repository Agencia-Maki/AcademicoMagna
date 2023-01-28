class CreateMaterials < ActiveRecord::Migration[7.0]
  def change
    create_table :materials do |t|
      t.string :name, null: false, default: ""
      t.string :file
      t.references :chapter, null: false, foreign_key: true
    end
  end
end
