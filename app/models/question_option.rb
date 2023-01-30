class QuestionOption < ApplicationRecord
  belongs_to :exam_question
  enum status: %i[correct incorrect]
end
