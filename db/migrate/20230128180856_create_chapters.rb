class CreateChapters < ActiveRecord::Migration[7.0]
  def change
    create_table :chapters do |t|
      t.string :name, null: false, default: ""
      t.datetime :start_date
      t.datetime :end_date
      t.references :course, null: false, foreign_key: true
    end
  end
end
