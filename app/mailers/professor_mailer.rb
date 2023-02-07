class ProfessorMailer < ApplicationMailer
  default from: 'aula.virtual@magna.edu.pe'
  
  def welcome_email
    @url  = 'https://aulavirtual.magna.edu.pe'
    @professor = params
    mail(to: @professor.email, subject: 'Bienvenido a Magna!')
  end
  
end
