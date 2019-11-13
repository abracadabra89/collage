document.addEventListener('DOMContentLoaded', () => {
    let currentUser;
    // let boardTitles = [];

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
    async function userData(username){
        const response = await fetch(`http://localhost:3000/api/v1/users`);
        const data = await response.json();
        currentUser = data.filter(data => data.username === username)[0];
        console.log(currentUser)
        emptyContainer();
        getImages();
        // getBoardTitles();
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

    // async function myBoards(){
    //     const response = await fetch(`http://localhost:3000/api/v1/users/${currentUser}`);
    //     const data = await response.json();
    //     data.boards.forEach(board => appendBoard(board));
    // };

    // async function getBoardTitles(){
    //     const response = await fetch(`http://localhost:3000/api/v1/users/${currentUser}`);
    //     const data = await response.json();
    //     data.boards.forEach(board => boardTitles.push(board.title));
    // };

    function showImage(img){
        gridContainer.appendChild(img);

        let addImageForm = document.createElement('form');
        addImageForm.innerHTML = 
            `<div class="form-group">
                <label for="exampleFormControlSelect1">Your Boards:</label>
                <select class="form-control" id="boardDropdown">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Add</button>`

        gridContainer.appendChild(addImageForm);
    }

    // Append Images to Page
    function appendImage(imageURL) {
        let imageTile = document.createElement('div');
        imageTile.className = 'grid-item'
        imageTile.style = 'position: relative;'

        let img = document.createElement('img');
        img.src = imageURL;
        img.className = 'image'

        // let dropDown = document.createElement('div');
        // dropDown.className = 'drop-down';
        // dropDown.style = "position: absolute; top: 0px; right: 0px; padding: 15px 15px 0 0"
        // dropDown.innerHTML = `<button class="drop-down-button" type="button">Save</button>`

        // let dropDownMenu = document.createElement('div');
        // dropDownMenu.class = 'drop-down-menu';        

        // dropDown.appendChild(dropDownMenu)
        // imageTile.appendChild(dropDown);
        imageTile.appendChild(img);
        gridContainer.appendChild(imageTile);
    };

    function myBoards(){
        return currentUser.boards;
    }

    function hasBoards(){
        return myBoards().length > 0;
    }

    function getDefaultBoardImage(board){
        let boardImage;

        switch (board.images.length) {
            case (0):
                boardImage = 'assets/image_cap.png';
                break;
        
            default:
                boardImage = board.images[0]['link'];
                break;
        }

        return boardImage;
    }

    function appendBoard(board){
        let defaultImage = getDefaultBoardImage(board);
        // console.log(defaultImage)

        let boardDiv = document.createElement('div');
        boardDiv.innerHTML = `<div class="card" style="width: 18rem;">
            <img src="${defaultImage}" class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text">${board['title']}</p>
            </div>
        </div>`;

        gridContainer.appendChild(boardDiv);

        console.log(board)
    }

    function boardPage() {
        let newBoardForm = document.createElement('div');
        newBoardForm.innerHTML = 
            `<form>
                <div class="form-group">
                    <label for="formGroupExampleInput">Title:</label>
                    <input type="text" class="form-control" id="new-board-title" placeholder="Board Title">
                </div>
                <div class="form-group">
                    <input type="hidden" id="userId" name="user_id" value: ${currentUser}>
                    <button id="new-board-submit" type="submit" class="btn btn-primary">Create</button>
                </div>
            </form>`;
        
        // let boards = myBoards();
        if (hasBoards()) {
            myBoards().forEach(board => appendBoard(board));
        }

        gridContainer.appendChild(newBoardForm);


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
        } else if (e.target.className === 'drop-down-button'){
            console.log('button')
        } else if (e.target.className === 'image'){
            emptyContainer();
            showImage(e.target);
        }

        switch (e.target.id) {
            case 'search-btn':
                emptyContainer();
                imageSearch(searchInput.value);
                break;

            case 'boards':
                emptyContainer();
                boardPage();
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
                userData(username);
                break;
        
            default:
                break;
        }

    });


});