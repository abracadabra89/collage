class Api::V1::UsersController < ApplicationController
    def index
        users = User.all
        render json: users, include: ['boards']
    end

    def create
        user = User.create(user_params)
        session[:user_id] = user.id

        render json: user
    end

    def show
        user = User.find(params[:id])
        render json: user, include: ['boards']
    end

    private

    def user_params
        params.permit(:username)
    end
end
