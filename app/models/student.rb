class Student < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, 
         :registerable,
         :recoverable, 
         :rememberable,
         :timeoutable,
         :validatable,
         authentication_keys: [:login]

  before_create :set_initial_status
  attr_writer :login
  enum gender: %i[male female no_specified]
  enum status: %i[active inactive slow_payer on_hold]
  enum document_type: %i[dni foreigner_card passport]
  mount_uploader :avatar, AvatarUploader
  paginates_per 10
  has_many :inscriptions, dependent: :destroy
  has_many :courses, through: :inscriptions
  
  has_many :student_answers, dependent: :destroy
  has_many :exam_scores, dependent: :destroy

  validates :document_number, uniqueness: {message: "%{value} ya registrado, verifique sus registros"}
  validates :email, uniqueness: {message: "%{value} ya registrado, verifique sus registros"}
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP, message: "formato no valido" }
  validate :check_full_name

  after_create :send_welcome_email


  def login 
    @login || self.document_number || self.email || self.code
  end

  def send_welcome_email
    StudentMailer.with(self).welcome_email.deliver_later
  end

  private
    ## CUSTOM VALIDATIONS
    def check_full_name
      if first_name.blank? || last_name.blank?
        errors.clear
        errors.add(:base, "Debes ingresar los nombres y apellidos")
      end
    end

    def set_initial_status
      self.status = :on_hold
    end

    def self.find_for_database_authentication warden_condition
      conditions = warden_condition.dup
      login = conditions.delete(:login)
      where(conditions).where(
        ["lower(document_number) = :value OR lower(email) = :value OR lower(code) = :value",
          { value: login.strip.downcase}]).first
    end

    
end
