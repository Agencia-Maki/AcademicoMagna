class Inscription < ApplicationRecord
  belongs_to :course
  belongs_to :student
  before_create :set_initial_status
  paginates_per 10
  validates :student_id, uniqueness: {message: "El alumno(a) ya esta matriculado(a) en el curso, verifique sus registros", scope: :course_id}
  enum status: [:active, :inactive]

  private
    def set_initial_status
      self.status = :active
    end
end
