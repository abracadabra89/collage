class Api::V1::BoardsController < ApplicationController
    def index
        boards = Board.all
        render json: boards, include: ['images' ,'comments'] 
    end

    def show
        board = Board.find(params[:id])
        render json: board, include: ['images', 'comments'] 
    end

    def create
        new_board = Board.create(board_params)
    end

    private

    def board_params
        params.require(:board).permit(:title, :user_id);
    end
end
