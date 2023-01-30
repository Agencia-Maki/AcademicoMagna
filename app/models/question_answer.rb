class QuestionAnswer < ApplicationRecord
  belongs_to :student_answer
  has_many :answer_options, dependent: :destroy
  accepts_nested_attributes_for :answer_options, allow_destroy: true, update_only: true
end
