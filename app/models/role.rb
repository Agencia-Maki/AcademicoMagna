class Role < ApplicationRecord
  # include HTTParty
  has_many :admins

  private
    # def self.get_admins(*args)
    #   response = HTTParty.get('https://62c1b57c2af60be89ecc6915.mockapi.io/leats')
    #   response.parsed_response

    #   response.parsed_response.each do |item|
    #     if item["status"] == false
    #       leat = Leat.new
    #       leat.first_name = item["first_name"]
    #       leat.last_name = item["last_name"]
    #       leat.telephone = item["telephone"]
    #       leat.email = item["email"]
    #       leat.save!
    #     end
    #   end
    # end
end
