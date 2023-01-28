# frozen_string_literal: true

class DeviseCreateStudents < ActiveRecord::Migration[7.0]
  def change
    create_table :students do |t|
      ## Database authenticatable
      t.string :email,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""

      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      ## Rememberable
      t.datetime :remember_created_at
      ## User information\
      
      t.string :document_number,        null: false, default: ""
      t.string :first_name, null: false, default: ""
      t.string :last_name,  null: false, default: ""
      t.string :code,       null: false, default: ""
      t.string :phone
      t.string :address
      t.string :country
      t.string :province      
      t.string :avatar

      t.string :profession
      t.string :obtained_title
      t.string :year_grade

      t.string :company_name
      t.string :job_title

      t.string :ruc
      t.string :business_name
      t.string :business_address

      t.date :date_of_bith

      t.integer :status
      t.integer :gender
      t.integer :document_type

      t.timestamps null: false
    end

    add_index :students, :email,                unique: true
    add_index :students, :reset_password_token, unique: true
    add_index :students, :document_number,      unique: true
    add_index :students, :code,                 unique: true
  end
end
