class CreateRoles < ActiveRecord::Migration[7.0]
  def change
    create_table :roles do |t|
      t.string :name
      t.string :slug
    end
    add_index :roles, :slug, unique: true
  end
end
