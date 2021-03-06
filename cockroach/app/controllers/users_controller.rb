class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    # @users = User.all

    # render json: @users
  end

  def members_only
    render json: {
      data: {
        message: "Welcome #{current_user.email}",
        user: current_user
      }
    }, status: 200
  end

end
