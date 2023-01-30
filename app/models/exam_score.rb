class ExamScore < ApplicationRecord
  belongs_to :student_answer
  belongs_to :student
end
