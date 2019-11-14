class Api::V1::ImagesController < ApplicationController
    def index
        images = Image.all
        render json: images
    end

    def show
        image = Image.find(params[:id])
        render json: image
    end

    def create
        image = Image.create(image_params)
        render json: "Image successfully added"
    end

    private

    def image_params
        params.require(:image).permit(:board_id, :title, :description, :link)
    end
end
