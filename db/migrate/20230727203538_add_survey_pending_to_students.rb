class AddSurveyPendingToStudents < ActiveRecord::Migration[7.0]
  def change
    add_column :students, :survey_pending, :integer
    add_column :professors, :survey_pending, :integer
    add_column :admins, :survey_pending, :integer
  end
end
