# frozen_string_literal: true

class DeviseCreateAdmins < ActiveRecord::Migration[7.0]
  def change
    create_table :admins do |t|
      ## Database authenticatable
      t.string :email,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""

      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      ## Rememberable
      t.datetime :remember_created_at

      ## Administrators information
      t.string :document_number,        null: false, default: ""
      t.string :first_name,             null: false, default: ""
      t.string :last_name,              null: false, default: ""
      t.string :phone
      t.string :avatar
      
      t.integer :gender
      t.integer :document_type

      t.timestamps null: false
    end

    add_index :admins, :email,                unique: true
    add_index :admins, :reset_password_token, unique: true
    add_index :admins, :document_number,      unique: true
  end
end
