class CreateAnswerOptions < ActiveRecord::Migration[7.0]
  def change
    create_table :answer_options do |t|     #opcion de la pregunta de entrega
      t.references :question_answer, null: false, foreign_key: true 
      t.string :enunciate
      t.integer :status
      t.boolean :marked
      t.decimal :score, precision: 4, scale: 2
    end
  end
end
