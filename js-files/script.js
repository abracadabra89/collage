document.addEventListener('DOMContentLoaded', () => {
    
    let containerRow = document.querySelector('div.grid');

    const clientId = 'f24aca1bf867d565f88e453b6a06d80aeae7c6705d250604d41df7e710b834ee';

    getImages();
    async function getImages(){
        // const response = await fetch(`https://api.unsplash.com/photos/?client_id=${clientId}`);
        const response = await fetch(`https://api.unsplash.com/search/photos/?client_id=${clientId}&query=wilderness&per_page=50`);
        const data = await response.json();
        data.results.forEach(image => appendImage(image['urls']['regular']));
    }

    function appendImage(imageURL) {
        let div = document.createElement('div');
        div.className = 'grid-item'

        let img = document.createElement('img');
        img.src = imageURL;
        img.className = 'image'

        div.appendChild(img);
        containerRow.appendChild(div);
    }

});