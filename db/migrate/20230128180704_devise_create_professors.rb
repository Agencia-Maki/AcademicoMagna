# frozen_string_literal: true

class DeviseCreateProfessors < ActiveRecord::Migration[7.0]
  def change
    create_table :professors do |t|
      ## Database authenticatable
      t.string :email,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""

      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      ## Rememberable
      t.datetime :remember_created_at

      ## Professor information
      t.string :document_number,        null: false, default: ""
      t.string :first_name,             null: false, default: ""
      t.string :last_name,              null: false, default: ""
      t.string :code,                   null: false, default: ""
      t.string :phone
      t.string :address
      t.string :country
      t.string :province      
      t.string :avatar

      t.string :bank_name
      t.string :bank_account_number
      t.decimal :salary, precision: 8, scale: 2

      t.date :date_of_bith
      t.date :date_of_admission

      t.integer :status
      t.integer :gender
      t.integer :document_type
      t.integer :currency

      t.timestamps null: false
    end

    add_index :professors, :email,                unique: true
    add_index :professors, :reset_password_token, unique: true
    add_index :professors, :document_number,      unique: true
    add_index :professors, :code,                 unique: true
  end
end
