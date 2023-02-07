class StudentMailer < ApplicationMailer
  default from: 'aula.virtual@magna.edu.pe'
  
  def welcome_email
    @url  = 'https://aulavirtual.magna.edu.pe'
    @student = params
    mail(to: @student.email, subject: 'Bienvenido a Magna!')
  end
end
