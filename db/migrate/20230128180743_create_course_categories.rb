class CreateCourseCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :course_categories do |t|
      t.string :name
      t.string :slug
    end
    add_index :course_categories, :slug, unique: true
  end
end
