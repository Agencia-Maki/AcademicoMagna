class CreateExams < ActiveRecord::Migration[7.0]
  def change
    create_table :exams do |t|
      t.belongs_to :course
      t.string :name, null: false
      t.string :file
      t.integer :type_exam
      t.integer :status
      t.integer :percent
      t.datetime :start
      t.datetime :end
      t.integer :duration
      t.integer :attempt
      t.integer :student_visibility
      t.timestamps
    end
  end
end
