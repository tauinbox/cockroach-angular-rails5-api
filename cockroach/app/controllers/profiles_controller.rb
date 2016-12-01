class ProfilesController < ApplicationController
  before_action :authenticate_user!, only: [:show, :create, :update, :destroy]
  before_action :set_profile, only: [:show, :update, :destroy]

  def show
  end

  def update
  end

  def destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_profile
      @profile = Profile.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def profile_params
      params.require(:profile).permit(:nickname, :firstname, :lastname, :userpic, :status)
    end  
end
