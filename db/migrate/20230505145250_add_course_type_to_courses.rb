class AddCourseTypeToCourses < ActiveRecord::Migration[7.0]
  def change
    add_column :courses, :course_type, :integer
  end
end
