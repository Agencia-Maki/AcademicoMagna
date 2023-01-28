class CreateExamScores < ActiveRecord::Migration[7.0]
  def change
    create_table :exam_scores do |t|
      t.belongs_to :student_answer, index: true  # checar el index si ayuda o no
      t.belongs_to :student
      t.text :feedback
      t.decimal :score, precision: 4, scale: 2
      t.timestamps
    end
  end
end
