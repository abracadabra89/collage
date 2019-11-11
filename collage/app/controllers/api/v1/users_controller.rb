class Api::V1::UsersController < ApplicationController
    def index
        users = User.all
        render json: users, include: ['boards']
    end

    def show
        user = User.find(params[:id])
        render json: user, include: ['boards']
    end
end
