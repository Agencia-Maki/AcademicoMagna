class ExamQuestion < ApplicationRecord
  belongs_to :exam
  has_many :question_options, dependent: :destroy
  accepts_nested_attributes_for :question_options, allow_destroy: true, update_only: true
end
