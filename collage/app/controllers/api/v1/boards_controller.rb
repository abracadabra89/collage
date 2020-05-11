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
        render json: new_board
    end

    def update
        board = Board.find(params[:id])
        board.update(board_params)
    end

    def destroy
        Board.destroy(params[:id])
        render json: "Board successfully deleted"
    end

    private

    def board_params
        params.require(:board).permit(:title, :user_id, :likes);
    end
end
