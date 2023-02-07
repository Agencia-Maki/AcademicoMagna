class CoverUploader < CarrierWave::Uploader::Base
  # Include RMagick or MiniMagick support:
  include CarrierWave::RMagick
  
  # storage :aws
  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def default_url
    ActionController::Base.helpers.asset_path('covers/default_cover.png')
    # if model.gender == "male"
    #   ActionController::Base.helpers.asset_path('avatars/male_avatar.png')
    # elsif model.gender == "female"
    #   ActionController::Base.helpers.asset_path('avatars/female_avatar.png')
    # else
    #   ActionController::Base.helpers.asset_path('avatars/no_specified_avatar.png')
    # end
  end

  def extension_whitelist
    %w(jpg jpeg gif png)
  end
end
