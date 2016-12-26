class CommentsController < ApplicationController
  before_filter :authenticate_user!, only: [:create, :update, :destroy]
  before_action :set_comment, only: [:update, :destroy]

  # POST /comments
  def create
    @article = Article.find(params[:article_id])
    @comment = @article.comments.new(user_id: current_user.id, body: comment_params[:body])

    if @comment.save
      render json: @comment, status: :created
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /comments/1
  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /comments/1
  def destroy
    @comment.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def comment_params
      params.require(:comment).permit(:body)
    end
end
