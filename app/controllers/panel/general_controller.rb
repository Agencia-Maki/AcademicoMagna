class Panel::GeneralController < ApplicationController
  def get_califications
    exam = Exam.find(params[:exam_id])
    califications = exam.student_answers
    render json: {
      data: califications.map { |calification| {
          id: calification.id,
          student: calification.student.first_name + " " + calification.student.last_name,
          score: calification.exam_score.score,
          percent: calification.percent,
          comment: calification.exam_score.feedback,
          created_at: calification.created_at
        }
      }, status: :ok
    }
  end

  def get_calification_by_student
    exam = Exam.find(params[:exam_id])
    calification = exam.student_answers.where(student_id: params[:student_id]).last
    render json: {
      data: {
          id: calification.id,
          student: calification.student.first_name + " " + calification.student.last_name,
          score: calification.exam_score.score,
          percent: calification.percent,
          comment: calification.exam_score.feedback,
          created_at: calification.created_at,
          file: calification.file,
          type_exam: exam.type_exam,
          exam_all_data: exam.exam_questions.map { |question| {
            enunciate: question.enunciate,
            feedback: question.feedback,
            options: question.question_options.where(status: "correct")
          }}
        }, status: :ok
    }
  end
end