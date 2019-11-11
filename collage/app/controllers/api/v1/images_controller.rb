class Api::V1::ImagesController < ApplicationController
    def index
        images = Image.all
        render json: images
    end
end
