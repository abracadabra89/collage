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
    };

    currentUser()
    let currentUser;
    async function currentUser(){
        const response = await fetch(`http://localhost:3000/api/v1/users`);
        const data = await response.json();
        currentUser = data[data.length - 1]['id'];
    };

    async function imageSearch(query){
        const response = await fetch(`https://api.unsplash.com/search/photos/?client_id=${clientId}&query=${query}`);
        const data = await response.json();
        data.results.forEach(image => appendImage(image['urls']['small']));
    };

    async function myBoards(){
        const response = await fetch(`http://localhost:3000/api/v1/users/${currentUser}`);
        const data = await response.json();
        data.boards.forEach(board => appendBoard(board));
    };

    async function newBoard(){
        fetch(`http://localhost:3000/api/v1/boards`, {
            method: "P"
        })
        
    };

    // async function newBoard(){
    //     const response = await fetch(`http://localhost:3000/api/v1/users/:id`);
    //     const data = await response.json();
    //     // data.boards.forEach(board => (board['images'].forEach(image => appendImage(image.link))));
    //     data.boards.forEach(board => appendBoard(board));
    // }

    // async function showBoard(){
    //     const response = await fetch(`http://localhost:3000/api/v1/users/:id`);
    //     const data = await response.json();
    //     data.boards.forEach(board => console.log(board['images']));
    // }



    function appendImage(imageURL) {
        let div = document.createElement('div');
        div.className = 'grid-item'

        let img = document.createElement('img');
        img.src = imageURL;
        img.className = 'image'

        div.appendChild(img);
        gridContainer.appendChild(div);
    };

    function boardPage() {
        let createBoardDiv = document.createElement('div');
        createBoardDiv.innerHTML = `<form>
        <div class="form-group">
          <label for="formGroupExampleInput">Title:</label>
          <input type="text" class="form-control" id="new-board-title" placeholder="Board Title">
        </div>
        <div class="form-group">
        <input type="hidden" id="userId" name="user_id" value: ${currentUser}>
        <button id="new-board-submit" type="submit" class="btn btn-primary">Create</button>
        </div>
      </form>`;
        gridContainer.appendChild(createBoardDiv);
    }

    function appendBoard(board){
        let boardDiv = document.createElement('div');
        boardDiv.innerHTML = `<div class="card" style="width: 18rem;">
            <img src=${board['images'][0]['link']} class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text">Board Title.</p>
            </div>
        </div>`;

        gridContainer.appendChild(boardDiv);
    }

    function emptyContainer(){
        gridContainer.innerHTML = "";
    }

    body.addEventListener('click', function(e) {
        e.preventDefault;
        e.stopPropagation;

        console.log(e.target)

        switch (e.target.id) {
            case 'search-btn':
                emptyContainer();
                imageSearch(searchInput.value);
                break;

            case 'boards':
                emptyContainer();
                boardPage();
                myBoards();
                break;
                
            case 'homepage':
                emptyContainer();
                getImages();
                break;
                     
            case 'new-board':
                getImages();
                break;
        
            default:
                break;
        }

    })


});