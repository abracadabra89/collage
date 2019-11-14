document.addEventListener('DOMContentLoaded', () => {
    // Current user object
    let currentUser;

    // DOM Elements
    const wrapper = document.querySelector('div.wrapper');
    const gridContainer = document.querySelector('div.grid');
    const searchInput = document.querySelector('input#search-input')
    const body = document.querySelector('body');
    const likeButton = document.getElementById('like');
    
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
        data.forEach(image => appendImage(image));
    };

    // Search bar
    async function imageSearch(query){
        const response = await fetch(`https://api.unsplash.com/search/photos/?client_id=${clientId}&query=${query}&count=30`);
        const data = await response.json();
        data.results.forEach(image => appendImage(image));
    };

    async function getBoard(boardId,){
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

    async function getBoards(){
        let userId = currentUser.id
        const response = await fetch(`http://localhost:3000/api/v1/users/${userId}`);
        const user = await response.json();
        user.boards.forEach(board => boardDropdown(board.id, board.title))
    }

    function boardDropdown(id, title){
        // console.log(id, title)
        let boardDropdown = document.getElementById('boardDropdown');
        let option = document.createElement('option');
        option.innerText = title;
        option.dataset.id = id;

        boardDropdown.appendChild(option);
    }

    // Show page for an image
    function showImage(imageDiv){
        let image = imageDiv.lastElementChild
        gridContainer.appendChild(image);

        let imgBoardForm = document.createElement('form');
        imgBoardForm.className = 'add-image-form'
        imgBoardForm.innerHTML = 
            `<div class="form-group">
                <label for="board_id">Your Boards:</label>
                <select class="form-control" id="boardDropdown"></select>
            </div>
            <input type="hidden" id="title" name="title" value=${imageDiv.dataset.title}>
            <input type="hidden" id="description" name="description" value=${imageDiv.dataset.description}>
            <button id="add" type="submit" class="btn btn-primary">Add</button>`
        
        gridContainer.appendChild(imgBoardForm);
        getBoards();
    }

    // Append Images to Page
    function appendImage(obj) {
        let title = obj.alt_description;
        let description = obj.description;
        let image = obj.urls.small;

        let imageContainer = document.createElement('div');
        imageContainer.className = 'grid-item'
        imageContainer.dataset.title = title;
        imageContainer.dataset.description = description;
        imageContainer.style = 'position: relative;'

        let img = document.createElement('img');
        img.src = image;
        img.className = 'image'

        imageContainer.appendChild(img);
        gridContainer.appendChild(imageContainer);
    };

    // Return all of user's board objects
    function myBoards(){
        return currentUser.boards;
    }

    // Returns true if a user has boards
    function hasBoards(){
        return myBoards().length > 0;
    }

    // Like a board
    function addLike(e){
        let likes = e.target.lastElementChild;
        likes.innerText = parseInt(likes.innerText) + 1;
        let likesInt = parseInt(likes.innerText);

        let boardId = e.target.lastElementChild.dataset.id
        fetch(`http://localhost:3000/api/v1/boards/${boardId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'accepts': 'application/json'
          },
          body: JSON.stringify({ 'likes': `${likesInt}` })
        })
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

    //adding comments to the board
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
            `<h2 class="board-title">${board.title}</h2>
            <button id="like" type="button" class="btn btn-primary">
                Likes <span data-id=${board.id} class="badge badge-light">${board.likes}</span>
            </button>
            <div class="board-images"></div>`

        gridContainer.appendChild(boardContainer);

        board.images.forEach(function(image){
            let imageContainer = document.createElement('div');
            imageContainer.className = 'grid-item'
            imageContainer.dataset.title = image.title;
            imageContainer.dataset.description = image.description;

            let img = document.createElement('img');
            img.src = image.link;
            img.className = 'board-image'

            imageContainer.appendChild(img);
            gridContainer.appendChild(imageContainer);
        })
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
            }).then(addLatestComment(obj))
        })
    }

    function showMessage(message){
        let messageDiv = document.createElement('div');
        messageDiv.className = 'alert alert-success';
        messageDiv.role = 'alert';
        messageDiv.innerText = message;

        wrapper.insertBefore(messageDiv, wrapper.firstChild);
    }

    function addImage(e){
        if(e.preventDefault){
            e.preventDefault();
        }else{
            e.returnValue = false;
        }

        let form = document.querySelector('form.add-image-form');
        let boardDropdown = dropdown = document.getElementById('boardDropdown');

        let title = document.querySelector('input#title').value
        let description = document.querySelector('input#description').value
        let boardId = parseInt(boardDropdown.selectedOptions[0].dataset.id);
        let imageURL = form.previousSibling.src;

        if (description === "null") {
            description = "";
        } else if (title === "null") {
            description = "";
        }
    
        fetch(`http://localhost:3000/api/v1/images`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
              'board_id': `${boardId}`,
              'title': `${title}`,
              'description': `${description}`,
              'link': `${imageURL}`
          })
        })
        .then(resp => resp.text())
        .then(message => showMessage(message))
        .catch(console.error)
    }

    // Empty the DOM
    function emptyContainer(){
        gridContainer.innerHTML = "";
    }

    // Event Delagation
    body.addEventListener('click', function(e) {
        e.preventDefault;
        e.stopPropagation;

        // console.log(e.target)

        let boardId;
        switch (e.target.className) {
            case 'search-bar-item':
                let search = e.target.innerText;
                emptyContainer();
                imageSearch(search);
                break;

            case 'image':
                emptyContainer();
                showImage(e.target.parentNode);
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

            case 'like':
                addLike(e);
                break;

            case 'add':
                addImage(e);
                break;
        
            default:
                break;
        }

    });

    function addLatestComment(obj) {
        console.log(obj)
        let commentSpace = document.createElement('p');
        commentSpace.innerText = obj.description;
        boardComments = document.querySelector('.board-comment');
        boardComments.appendChild(commentSpace);
    }


});









