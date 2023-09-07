class AddBonusTypeToCourses < ActiveRecord::Migration[7.0]
  def change
    add_column :courses, :bonus_type, :integer
  end
end
