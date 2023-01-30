class Professor < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, 
         :registerable,
         :recoverable, 
         :rememberable,
         :timeoutable,
         :validatable,
         authentication_keys: [:login]

  has_many :courses
  attr_writer :login
  enum gender: %i[male female no_specified]
  enum document_type: %i[dni foreigner_card passport]
  mount_uploader :avatar, AvatarUploader
  paginates_per 10

  validates :document_number, uniqueness: {message: "%{value} ya registrado, verifique sus registros"}
  validates :email, uniqueness: {message: "%{value} ya registrado, verifique sus registros"}
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP, message: "formato no valido" }
  validate :check_full_name

  def login 
    @login || self.document_number || self.email || self.code
  end

  private
    def check_full_name
      if first_name.blank? || last_name.blank?
        errors.clear
        errors.add(:base, "Debes ingresar los nombres y apellidos")
      end
    end

    def self.find_for_database_authentication warden_condition
      conditions = warden_condition.dup
      login = conditions.delete(:login)
      where(conditions).where(
        ["lower(document_number) = :value OR lower(email) = :value OR lower(code) = :value",
          { value: login.strip.downcase}]).first
    end
end
