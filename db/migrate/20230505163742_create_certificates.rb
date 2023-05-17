class CreateCertificates < ActiveRecord::Migration[7.0]
  def change
    create_table :certificates do |t|
      t.string :title
      t.integer :tag
      t.integer :certificate_type
      t.string :hours
      t.date :start_at
      t.date :end_at
      t.references :course, null: :true, foreign_key: true

      t.timestamps
    end
  end
end
