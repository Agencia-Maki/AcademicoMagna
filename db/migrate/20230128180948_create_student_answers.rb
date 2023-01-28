class CreateStudentAnswers < ActiveRecord::Migration[7.0]
  def change
    create_table :student_answers do |t|  #entrega de examen
      t.belongs_to :exam
      t.belongs_to :student
      t.string :file
      t.integer :status
      t.integer :percent
      t.decimal :score, precision: 4, scale: 2
      t.integer :duration
      t.integer :attempt
      t.timestamps
    end
  end
end
