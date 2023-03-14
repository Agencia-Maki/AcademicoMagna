class CreateStudentRecords < ActiveRecord::Migration[7.0]
  def change
    create_table :student_records do |t|
      t.string :email
      t.string :document_number
      t.string :first_name
      t.string :last_name
      t.string :phone
      t.string :code
      t.string :course_code
      t.string :course_name

      t.integer :document_type
      t.integer :gender
      t.integer :status

      t.timestamps
    end
  end
end
