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
        render json: {message: "Image successfully added", image: image}
    end

    def destroy
        Image.destroy(params[:id])
    end

    private

    def image_params
        params.require(:image).permit(:board_id, :title, :description, :link)
    end
end
