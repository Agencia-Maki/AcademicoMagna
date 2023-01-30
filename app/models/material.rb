class Material < ApplicationRecord
  belongs_to :chapter
  mount_uploader :file, MaterialUploader
end
