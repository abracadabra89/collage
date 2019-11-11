document.addEventListener('DOMContentLoaded', () => {
    
    const gridContainer = document.querySelector('div.grid');
    const searchInput = document.querySelector('input#search-input')
    const body = document.querySelector('body');
    const searchButton = document.querySelector('button#search-btn');

    const clientId = 'f24aca1bf867d565f88e453b6a06d80aeae7c6705d250604d41df7e710b834ee';

    getImages();
    async function getImages(){
        // const response = await fetch(`https://api.unsplash.com/photos/?client_id=${clientId}`);
        const response = await fetch(`https://api.unsplash.com/photos/random/?client_id=${clientId}&count=30`);
        const data = await response.json();
        data.forEach(image => appendImage(image['urls']['small']));
        // console.log(data)
    }

    async function imageSearch(query){
        const response = await fetch(`https://api.unsplash.com/search/photos/?client_id=${clientId}&query=${query}`);
        const data = await response.json();
        data.results.forEach(image => appendImage(image['urls']['small']));
        // console.log(data)
    }


    function appendImage(imageURL) {
        let div = document.createElement('div');
        div.className = 'grid-item'

        let img = document.createElement('img');
        img.src = imageURL;
        img.className = 'image'

        div.appendChild(img);
        gridContainer.appendChild(div);
    };

    body.addEventListener('click', function(e) {
        e.preventDefault;
        e.stopPropagation;

        if (e.target.id === 'search-btn') {
            gridContainer.innerHTML = "";
            let query = searchInput.value;
            imageSearch(query);
        }
    })


});