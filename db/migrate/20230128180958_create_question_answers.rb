class CreateQuestionAnswers < ActiveRecord::Migration[7.0]
  def change
    create_table :question_answers do |t|   #pregunta de la entrega
      t.references :student_answer, null: false, foreign_key: true 
      t.decimal :score, precision: 4, scale: 2
      t.string :enunciate, null: false
    end
  end
end
