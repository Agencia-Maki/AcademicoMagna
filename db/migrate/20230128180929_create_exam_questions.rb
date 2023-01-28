class CreateExamQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :exam_questions do |t|      
      t.decimal :score, precision: 4, scale: 2  # presicion numero total de digitos y scale para la cantidad de decimales   20.00
      t.string :enunciate
      t.string :feedback
      t.references :exam, null: false, foreign_key: true      
    end
  end
end
