require 'test_helper'

class UserControllerTest < ActionDispatch::IntegrationTest
  test "should get members_only" do
    get user_members_only_url
    assert_response :success
  end

end
