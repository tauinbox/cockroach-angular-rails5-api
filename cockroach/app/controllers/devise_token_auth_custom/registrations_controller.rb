class DeviseTokenAuthCustom::RegistrationsController < DeviseTokenAuth::RegistrationsController

  def create
    # this calls DeviseTokenAuth::RegistrationsController #create as usual
    # after creating a new user, create a profile that has
    # the profile.user_id field set to the user_id of the user jsut created    
    super do |resource|
      if resource.save
        resource.create_profile!
      end
    end    
  end

end