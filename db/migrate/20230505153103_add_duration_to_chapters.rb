class AddDurationToChapters < ActiveRecord::Migration[7.0]
  def change
    add_column :chapters, :duration, :integer
  end
end
