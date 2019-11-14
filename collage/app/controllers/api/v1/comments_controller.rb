class Api::V1::CommentsController < ApplicationController
    def index
        comments = Comment.all
        render json: comments
    end

    def show
        comment = Comment.find(params[:id])
        render json: comment
    end

    def create 
      comment = Comment.create(comments_params)
      logger.info("board id: #{comment.id}")
      logger.info("board content: #{comment.description}")
    end

    private

    def comments_params
        params.require(:comment).permit(:board_id, :description)

    end

    

end
