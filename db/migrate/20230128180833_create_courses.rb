class CreateCourses < ActiveRecord::Migration[7.0]
  def change
    create_table :courses do |t|
      t.string :name
      t.text :description
      t.datetime :start_date
      t.datetime :end_date
      t.integer :status
      t.string :cover
      t.string :conference_link
      t.references :professor, null: :true, foreign_key: true
      t.references :course_category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
