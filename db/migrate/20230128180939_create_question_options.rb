class CreateQuestionOptions < ActiveRecord::Migration[7.0]
  def change
    create_table :question_options do |t|
      t.references :exam_question, null: false, foreign_key: true
      t.string :enunciate
      t.decimal :score, precision: 4, scale: 2 
      t.integer :status
    end
  end
end
