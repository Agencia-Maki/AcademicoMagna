class Exam < ApplicationRecord
  before_create :set_initial_status
  before_create :set_initial_attemps_for_manual_exams

  belongs_to :course
  has_many :student_answers, dependent: :destroy    # entregas de estudiantes
  has_many :exam_questions, dependent: :destroy
  accepts_nested_attributes_for :exam_questions, allow_destroy: true, update_only: true
  mount_uploader :file, ExamUploader

  enum status: %i[graded ungraded on_hold]
  enum type_exam: %i[manual automatic]
  enum student_visibility: %i[show_exam hidden_exam]

  private
    def set_initial_status
      self.status = :on_hold
    end

    def set_initial_attemps_for_manual_exams
      if self.type_exam == 'manual'
        self.attempt = 5
      end
    end

end
