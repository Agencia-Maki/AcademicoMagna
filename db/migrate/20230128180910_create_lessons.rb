class CreateLessons < ActiveRecord::Migration[7.0]
  def change
    create_table :lessons do |t|
      t.string :name, null: false, default: ""
      t.text :topics
      t.string :link_video
      t.references :chapter, null: false, foreign_key: true
    end
  end
end
