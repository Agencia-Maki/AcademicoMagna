class AddDurationToCourses < ActiveRecord::Migration[7.0]
  def change
    add_column :courses, :duration, :string
  end
end
