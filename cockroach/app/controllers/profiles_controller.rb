class ProfilesController < ApplicationController
  before_action :authenticate_user!, only: [:show, :create, :update, :destroy]
  before_action :set_profile, only: [:show, :update, :destroy]

  def show
    render json: @profile
  end

  def update
    if @profile.update(profile_params)
      render json: @profile
    else
      render json: @profile.errors, status: :unprocessable_entity
    end    
  end

  def destroy
    @profile.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_profile
      @profile = Profile.find_by(user_id: params[:user_id])
    end

    # Only allow a trusted parameter "white list" through.
    def profile_params
      params.require(:profile).permit(:nickname, :firstname, :lastname, :userpic, :status)
    end  
end
