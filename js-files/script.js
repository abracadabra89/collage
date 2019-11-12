document.addEventListener('DOMContentLoaded', () => {
    let currentUser;

    // DOM Elements
    const gridContainer = document.querySelector('div.grid');
    const searchInput = document.querySelector('input#search-input')
    const body = document.querySelector('body');
    
    if (currentUser) {
        getImages();
    } else {
        logIn();
    }

    // Unsplash API Creds
    const clientId = 'f24aca1bf867d565f88e453b6a06d80aeae7c6705d250604d41df7e710b834ee';

    // User Data
    async function logInUser(username){
        const response = await fetch(`http://localhost:3000/api/v1/users`);
        const data = await response.json();
        let userData = data.filter(data => data.username === username);
        if (userData) {
            currentUser = userData[0]['id'];
            emptyContainer()
            getImages()
        } else {
            logInError();
        }
    }

    function logIn(){
        let logInForm = document.createElement('div');
        logInForm.innerHTML = `<form>
            <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control" id="username-login" placeholder="Username">
            </div>
            <div class="form-group">
            <button id="login" type="submit" class="btn btn-primary">Log In</button>
            </div>
            </form>`

        gridContainer.appendChild(logInForm);
    }
    
    // Loading DOM Content
    async function getImages(){
        const response = await fetch(`https://api.unsplash.com/photos/random/?client_id=${clientId}&count=30`);
        const data = await response.json();
        data.forEach(image => appendImage(image['urls']['small']));
    };

    async function imageSearch(query){
        const response = await fetch(`https://api.unsplash.com/search/photos/?client_id=${clientId}&query=${query}&count=30`);
        const data = await response.json();
        data.results.forEach(image => appendImage(image['urls']['small']));
    };

    async function myBoards(){
        const response = await fetch(`http://localhost:3000/api/v1/users/${currentUser}`);
        const data = await response.json();
        data.boards.forEach(board => appendBoard(board));
    };

    // Append Images to Page
    function appendImage(imageURL) {
        let div = document.createElement('div');
        div.className = 'grid-item'
        div.style = 'position: relative;'

        let img = document.createElement('img');
        img.src = imageURL;
        img.className = 'image'

        let boardDropDown = document.createElement('div');
        boardDropDown.className = 'btn-group';
        boardDropDown.style = style= "position: absolute; top: 0px; right: 0px; padding: 15px 15px 0 0"
        boardDropDown.innerHTML = `<button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Save
            </button>
            <div class="dropdown-menu">
                ...
            </div>`

        div.appendChild(boardDropDown);
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

        if (e.target.className === 'search-bar-item'){
            let search = e.target.innerText;
            emptyContainer();
            imageSearch(search);
        }

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
     
            case 'login':
                let username = document.querySelector('#username-login').value;
                logInUser(username);
                break;
        
            default:
                break;
        }

    });

    gridContainer.addEventListener('mouseover', function(e){
        switch (e.target.className) {
            case 'image':
                console.log('image')
                break;
        
            default:
                break;
        }
    })


});