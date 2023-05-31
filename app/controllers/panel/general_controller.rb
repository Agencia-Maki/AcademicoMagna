class Panel::GeneralController < ApplicationController
  def get_califications
    exam = Exam.find(params[:exam_id])
    califications = exam.student_answers
    render json: {
      data: califications.map { |calification| {
          id: calification.id,
          student: calification.student.first_name + " " + calification.student.last_name,
          score: calification.exam_score.nil? ? 0 : calification.exam_score.score,
          percent: calification.percent,
          comment: calification.exam_score.nil? ? "" : calification.exam_score.feedback,
          created_at: calification.created_at
        }
      }, status: :ok
    }
  end

  def get_calification_by_student
    # exam = Exam.find(params[:exam_id])
    # calification = exam.student_answers.where(student_id: params[:student_id]).last
    # byebug
    calification = StudentAnswer.find_by(student_id: params[:student_id], exam_id: params[:exam_id])
    # byebug
    render json: {
      data: {
          id: calification.id,
          student: calification.student.first_name + " " + calification.student.last_name,
          score: calification.exam_score.nil? ? 0 : calification.exam_score.score,
          percent: calification.percent,
          comment: calification.exam_score.nil? ? "" : calification.exam_score.feedback,
          created_at: calification.created_at,
          file: calification.file,
          type_exam: calification.exam.type_exam,
          exam_all_data: calification.question_answers.map { |question| {
            enunciate: question.enunciate,
            feedback: nil,
            options: question.answer_options
          }}
        }, status: :ok
    }
  end
end