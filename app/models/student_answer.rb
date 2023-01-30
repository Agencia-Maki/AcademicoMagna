class StudentAnswer < ApplicationRecord
  belongs_to :exam
  belongs_to :student
  has_many :question_answers, dependent: :destroy
  has_one :exam_score, dependent: :destroy
  accepts_nested_attributes_for :question_answers, allow_destroy: true, update_only: true
  # accepts_nested_attributes_for :exam_scores, allow_destroy: true
  mount_uploader :file, ExamUploader

  enum status: %i[graded ungraded on_hold]   # graded = calificado  ungraded = no calificado pero entregado  on_hold = no entregado (por defecto) 

  private
    def set_initial_status
      self.status = :ungraded
    end
end
