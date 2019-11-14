document.addEventListener('DOMContentLoaded', () => {
    // Current user object
    let currentUser;

    // DOM Elements
    const gridContainer = document.querySelector('div.grid');
    const searchInput = document.querySelector('input#search-input')
    const body = document.querySelector('body');
    
    // If current user isn't set, show logIn page
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
        emptyContainer();
        getImages();
    }

    // Displays login form
    function logIn(){
        let logInForm = document.createElement('div');
        logInForm.innerHTML = `<form>
            <div class="form-group" style="text-align:center">
            <label for="username"></label>
            <input type="text" class="form-control" id="username-login" placeholder="Username">
            </div>
            <div class="form-group" style="text-align:center">
            <button id="login" type="submit" class="btn btn-sm btn-outline-secondary">Log In</button>
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

    // Search bar
    async function imageSearch(query){
        const response = await fetch(`https://api.unsplash.com/search/photos/?client_id=${clientId}&query=${query}&count=30`);
        const data = await response.json();
        data.results.forEach(image => appendImage(image['urls']['small']));
    };

    async function getBoard(boardId){
        const response = await fetch(`http://localhost:3000/api/v1/boards/${boardId}`);
        const board = await response.json();
        appendBoardImages(board);
    };


    // Show 'page' for an image
    function showImage(img){
        gridContainer.appendChild(img);

        let addToBoard = document.createElement('form');
        addToBoard.innerHTML = `<form>
            <div class="form-group" style="text-align:center">
                <label for="exampleFormControlSelect1">Your Boards:</label>
                <select class="form-control" id="boardDropdown">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                </select>
                <br>
            <button type="submit" class="btn btn-secondary" style="text-align:center">Add</button>
            </div>
            </form>`
        gridContainer.appendChild(addToBoard);
    }

    // Append Images to Page
    function appendImage(imageURL) {
        let imageTile = document.createElement('div');
        imageTile.className = 'grid-item'
        imageTile.style = 'position: relative;'

        let img = document.createElement('img');
        img.src = imageURL;
        img.className = 'image'

        imageTile.appendChild(img);
        gridContainer.appendChild(imageTile);
    };

    // Return all of user's board objects
    function myBoards(){
        return currentUser.boards;
    }

    // Returns true if a user has boards
    function hasBoards(){
        return myBoards().length > 0;
    }

    // Sets a default board image on the board index page
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

    // Appends each board to board index page
    function appendBoard(board){
        let defaultImage = getDefaultBoardImage(board);

        let boardDiv = document.createElement('div');
         let boardComments = document.createElement('div')
         boardComments.className = 'board-comment';
        

        
        boardDiv.className = 'card';
        boardDiv.style = 'width: 18rem;';
        boardDiv.dataset.id = board['id'];
        boardDiv.innerHTML = 
            `<img src="${defaultImage}" class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text">${board['title']}</p>
            </div>
            <form>
            <div class="form-group" style="text-align:center">
                <label for="formGroupExampleInput">Comment:</label>
                <input type="text" class="form-control" id="new-comment" placeholder="Comment">
            </div>
            <div class="form-group" style="text-align:center">
                <input type="hidden" id="userId" name="user_id" value: ${currentUser} >
                <button id="new-comment-submit"  type="submit" class="btn btn-sm btn-outline-secondary">Comment</button>
            </div>
        </form>`;
        appendComments(board, boardComments);
        boardDiv.appendChild(boardComments);

        gridContainer.appendChild(boardDiv);
    };

    function appendComments(board, boardComments){
        board.comments.forEach(comment => {
           let commentElem = document.createElement('p')
           commentElem.innerText = comment.description;
           boardComments.append(commentElem);


        
    })
}

       

    function appendBoardImages(board){
        let boardContainer = document.createElement('div');
        boardContainer.className = 'board-container'
        boardContainer.innerHTML = 
            `<h3 class="board-title">${board.title}</h3>
            <div class="board-likes">
                <div id="likes">${board.likes} likes  <button type="submit" data-id="${board.id} class="btn btn-sm btn-outline-secondary" >Like</button></div>
                </div>
            <div class="board-images"></div>`

        gridContainer.appendChild(boardContainer);

        board.images.forEach(image => appendImage(image.link))
    };

    // Constructs board index page (including form for new boards)
    function boardPage() {
        let newBoardForm = document.createElement('div');
        newBoardForm.innerHTML = 
            `<form>
                <div class="form-group" style="text-align:center">
                    <label for="formGroupExampleInput">Title:</label>
                    <input type="text" class="form-control" id="new-board-title" placeholder="Board Title">
                </div>
                <div class="form-group" style="text-align:center">
                    <input type="hidden" id="userId" name="user_id" value: ${currentUser} >
                    <button id="new-board-submit" type="submit" class="btn btn-sm btn-outline-secondary">Create</button>
                </div>
            </form>`;
        
        gridContainer.appendChild(newBoardForm);

        if (hasBoards()) {
            myBoards().forEach(board => appendBoard(board));
        };
        
        let submitButton = document.querySelector('#new-comment-submit')
        submitButton.addEventListener('click', function(e){
            e.preventDefault();
            // console.log()

            let commentInput = document.querySelector('#new-comment').value
            let boardDiv = e.target.closest('.card')
            let boardId = boardDiv.dataset.id;
            let obj = {board_id:boardId, description:commentInput};
            
            
            
            fetch('http://localhost:3000/api/v1/comments', {
                method: 'POST',
                headers: {
                'content-type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
            // .then(response = response.json())
           
            
        

        
            

        })
    }




    






    // Board show page
    function showBoard(boardId){
        getBoard(boardId);
    }

    // Empty the DOM
    function emptyContainer(){
        gridContainer.innerHTML = "";
    }

    // Event Delagation
    body.addEventListener('click', function(e) {
        e.preventDefault;
        e.stopPropagation;

        let boardId;
        switch (e.target.className) {
            case 'search-bar-item':
                let search = e.target.innerText;
                emptyContainer();
                imageSearch(search);
                break;

            // case 'drop-down-button':
            //     console.log('button')
            //     break;

            case 'image':
                emptyContainer();
                showImage(e.target);
                break;

            case 'card-text':
                boardId = e.target.parentNode.parentNode.dataset.id;
                emptyContainer();
                getBoard(boardId);
                break;

             case 'card-img-top':
                boardId = e.target.parentNode.dataset.id;
                emptyContainer();
                createComment(boardId);
                break;

             case 'card-body':
                boardId = e.target.parentNode.dataset.id;
                emptyContainer();
                getBoard(boardId);
                break;
        
            default:
                break;
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









