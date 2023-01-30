class Panel::Professor::ScoresController < ApplicationController

  def set_exam_score
    student_answer = StudentAnswer.new()
    student_answer.exam_id = params[:exam_id]
    student_answer.student_id = params[:student_id]
    student_answer.score = params[:score]
    student_answer.percent = params[:percent]
    student_answer.status = 'graded'

    if student_answer.save
      exam_score = ExamScore.new()
      exam_score.student_answer_id = student_answer.id
      exam_score.feedback = params[:feedback]
      exam_score.student_id = params[:student_id]
      exam_score.score = params[:score]
      if exam_score.save
        render json: {
          status: 'ok',
          message: 'Exam score saved successfully',
          id: student_answer.id
        }
      else
        render json: {
          status: 'error',
        }
      end    
    else
      render json: {status: 'error'}
    end

  end

  def exam_params
    exam_scores_attributes = %i[id student_id feedback score _destroy] 
    params.require(:student_answer).permit(:score, :exam_id, :status, :percent, :student_id, exam_scores: [exam_scores_attributes])
  end

end

# id: nil, student_answer_id: nil, student_id: nil, feedback: nil, score: nil,