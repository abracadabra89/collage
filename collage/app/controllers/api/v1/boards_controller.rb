class Api::V1::BoardsController < ApplicationController
    def index
        boards = Board.all
        render json: boards, include: ['images']
    end

    # def show
    #     board = Image.find(params[:id])
    #     render json: board
    # end
end
