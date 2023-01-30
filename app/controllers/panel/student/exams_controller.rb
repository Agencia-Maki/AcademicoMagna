class Panel::Student::ExamsController < ApplicationController
  def get_all_data_exams_by_student
    exams = Exam.where(course_id: params[:course_id], student_visibility: 'show_exam').order(created_at: :desc)
    render json: {
        data: {
          data: exams.map { |exam| {
            id: exam.id,
            name: exam.name,
            file: exam.file,
            type_exam: exam.type_exam,
            status: exam.status,
            start: exam.start,
            end: exam.end,
            duration: exam.duration,
            attempt: exam.attempt.nil? ? 1 : exam.attempt,    
            answer: exam.student_answers.find_by(student_id: current_student.id, exam_id: exam.id),
            rest_trys: exam.student_answers.find_by(student_id: current_student.id, exam_id: exam.id).nil? ? exam.attempt : exam.attempt - exam.student_answers.find_by(student_id: current_student.id, exam_id: exam.id).attempt,
            # if exam.student_answers.find_by(student_id: current_student.id, exam_id: exam.id)
            #   rest_trys: 77,
            # else
            #   rest_trys: 88,
            # end
            # rest_trys: exam.attempt - exam.student_answers.find_by(student_id: current_student.id, exam_id: exam.id).attempt if exam.student_answers.find_by(student_id: current_student.id, exam_id: exam.id)
          }          
        },
        status: :ok
      }
    }    
  end

end
