class AnswerOption < ApplicationRecord
  belongs_to :question_answer
  enum status: %i[correct incorrect]
end
