class PagesController < ApplicationController
  def index
    redirect_to '/admins/dashboard/index' if current_admin
    redirect_to '/students/dashboard/index' if current_student
    redirect_to '/professors/dashboard/index' if current_professor
    redirect_to '/alumnos' if !current_admin && !current_student && !current_professor
  end
  
  def not_logged 
    if request.fullpath.include? "/students/"
      redirect_to '/students/sign_in'
    elsif request.fullpath.include? "/professors/"
      redirect_to '/professors/sign_in'
    elsif request.fullpath.include? "/admins/"
      redirect_to '/admins/sign_in'
    end
  end
end
