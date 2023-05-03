class AddSignatureToProfessors < ActiveRecord::Migration[7.0]
  def change
    add_column :professors, :signature, :string
  end
end
