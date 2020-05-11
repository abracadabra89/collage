document.addEventListener('DOMContentLoaded', () => {
    // Current user object
    let currentUser;

    // DOM Elements
    const wrapper = document.querySelector('div.wrapper');
    const header = document.querySelector('div.headers');
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
        data.forEach(image => appendImage(image));
    };

    // Search bar
    async function imageSearch(query){
        const response = await fetch(`https://api.unsplash.com/search/photos/?client_id=${clientId}&query=${query}&count=30`);
        const data = await response.json();
        data.results.forEach(image => appendImage(image));
    };

    async function getBoard(boardId){
        const response = await fetch(`http://localhost:3000/api/v1/boards/${boardId}`);
        const board = await response.json();
        appendBoardImages(board);
    };

    async function getBoards(){
        let userId = currentUser.id
        const response = await fetch(`http://localhost:3000/api/v1/users/${userId}`);
        const user = await response.json();
        user.boards.forEach(board => boardDropdown(board.id, board.title))
    }

    async function getAllBoards(){
        let userId = currentUser.id
        const response = await fetch(`http://localhost:3000/api/v1/users/${userId}`);
        const user = await response.json();
        user.boards.forEach(board => appendBoard(board));
    }

    async function addBoard(title, currentUser){
        let userId = currentUser.id
        const response = await fetch(`http://localhost:3000/api/v1/boards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accepts': 'application/json'
            },
            body: JSON.stringify({
                'user_id': `${userId}`,
                'title': `${title}`,
                'likes': 0
            })
        })
        .then(response => response.json())
        .then(board => appendBoard(board))
        .catch(console.error)
    }

    async function deleteBoard(e) {
        let boardId = e.target.dataset.id;

        await fetch(`http://localhost:3000/api/v1/boards/${boardId}`, {
            method: 'DELETE',
        })
        emptyContainer();
        boardPage()
    }

    async function removeImage(imageId) {
        await fetch(`http://localhost:3000/api/v1/images/${imageId}`, {
            method: 'DELETE'
        })
        emptyContainer();
        boardPage()
    }

    function boardDropdown(id, title){
        let boardDropdown = document.getElementById('boardDropdown');
        let option = document.createElement('option');
        option.innerText = title;
        option.dataset.id = id;

        boardDropdown.appendChild(option);
    };

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
            <div class="form-group">
                <button id="add" type="submit" class="btn btn-primary">Add</button>
            </div>`
        
        gridContainer.appendChild(imgBoardForm);
        getBoards();
    }

    function showBoardImage(e){
        console.log(e.target)
        
        let imageContainer = e.target.parentNode;
        gridContainer.appendChild(imageContainer);

        let buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = '<button id="delete-image" data-id="" type="button" class="btn btn-danger">Remove Image</button>'
        gridContainer.appendChild(buttonContainer);
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
    };

    function appendBoard(board){
        let defaultImage = getDefaultBoardImage(board);

        let boardDiv = document.createElement('div');
        let boardComments = document.createElement('div')
        boardComments.className = 'board-comment';
        boardDiv.className = 'card';
        boardDiv.style = 'width: 25rem;';
        boardDiv.dataset.id = board['id'];
        boardDiv.innerHTML = 
            `<img src="${defaultImage}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-text">${board['title']}</h4>
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
           commentElem.dataset.id = comment.id;
           let deleteButton = document.createElement('span');
           deleteButton.innerHTML =  '<span><img class="comment-delete-button" src="assets/delete.png" alt="delete-button"></span>';
           
           commentElem.innerText = comment.description;
           commentElem.appendChild(deleteButton);
           boardComments.append(commentElem);
        })
    };


    function appendBoardImages(board){
        let boardContainer = document.createElement('div');
        boardContainer.className = 'board-container'
        boardContainer.innerHTML = 
            `<h2 class="board-title">${board.title}</h2>
            <button id="like" type="button" class="btn btn-primary">
                Likes <span data-id=${board.id} class="badge badge-light">${board.likes}</span>
            </button>
            <button id="delete-board" data-id=${board.id} type="button" class="btn btn-danger">Delete Board</button>
            <div class="board-images" data-id=${board.id}></div>`
        
        header.appendChild(boardContainer);

        board.images.forEach(function(image){
            console.log(image)
            let imageContainer = document.createElement('div');
            imageContainer.className = 'grid-item'
            imageContainer.dataset.title = image.title;
            imageContainer.dataset.description = image.description;
            imageContainer.dataset.imageid = image.id;

            let img = document.createElement('img');
            img.src = image.link;
            img.className = 'board-image';
            img.dataset.id = board['id'];

            imageContainer.appendChild(img);
            gridContainer.appendChild(imageContainer);
        })
    };

    function addLatestComment(commentId, boardObj, e) {
        let commentSpace = document.createElement('p');
        commentSpace.innerText = boardObj.description;
        commentSpace.dataset.id = commentId;
        let deleteButton = document.createElement('span');
        deleteButton.innerHTML =  '<span><img class="comment-delete-button" src="assets/delete.png" alt="delete-button"></span>';

        commentSpace.appendChild(deleteButton);
        let boardComments = e.target.parentElement.parentElement.nextSibling
        boardComments.appendChild(commentSpace);

    };

    function newBoard(){
        let boardTitle = document.getElementById('new-board-title').value;
        addBoard(boardTitle, currentUser);
    }

    // Constructs board index page (including form for new boards)
    function boardPage() {
        let newBoardForm = document.createElement('div');
        newBoardForm.className = 'board-form-container'
        newBoardForm.innerHTML = 
            `<div class="jumbotron new-board-form" style="max-width: 850px;">
                <h4 class="display-4">Create a board</h4>
                <hr class="my-4">
                <form>
                    <div class="form-group">
                        <label for="formGroupExampleInput">Title:</label>
                        <input type="text" class="form-control" id="new-board-title" placeholder="Board Title">
                    </div>
                    <div class="form-group">
                        <input type="hidden" id="userId" name="user_id" value: ${currentUser}>
                        <button id="new-board-submit" type="submit" class="btn btn-primary btn-lg">Create Board</button>
                    </div>
                </form>
            </div>`;

        header.prepend(newBoardForm);
        getAllBoards();
    };

    function addComment(e){
        let commentInput = e.target.parentElement.parentElement.firstElementChild.lastElementChild.value;
        let boardDiv = e.target.closest('.card');
        let boardId = boardDiv.dataset.id;
        let boardObj = {board_id:boardId, description:commentInput};

        fetch('http://localhost:3000/api/v1/comments', {
                 method: 'POST',
                 headers: {
                'content-type': 'application/json'
                 },
                 body: JSON.stringify(boardObj)
             })
             .then(resp => resp.json())
            .then(comment => addLatestComment(comment.id, boardObj, e))
    }

    function addImage(e){
        if (e.preventDefault) {
            e.preventDefault();
        } else {
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
        .then()
        .catch(console.error)
    }

    function deleteImage(e){
        let button = e.target;
        let imageId = button.parentElement.parentElement.firstElementChild.dataset.imageid;

        removeImage(imageId);
    }

    function deleteComment(e){
        let commentElem = e.target.parentElement.parentElement.parentElement;
        let commentId = e.target.parentElement.parentElement.parentElement.dataset.id;

        commentElem.remove();

        fetch(`http://localhost:3000/api/v1/comments/${commentId}`, {
            method: 'DELETE'
        });
    }

    // Empty the DOM
    function emptyContainer(){
        header.innerHTML = "";
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
                getBoard(boardId);
                break;

             case 'card-body':
                boardId = e.target.parentNode.dataset.id;
                emptyContainer();
                getBoard(boardId);
                break;
            
             case 'board-image':
                 emptyContainer();
                 showBoardImage(e);
                 break;

            case 'comment-delete-button':
                deleteComment(e);
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
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
                let username = document.querySelector('#username-login').value;
                userData(username);
                break;

            case 'like':
                addLike(e);
                break;

            case 'add':
                addImage(e);
                break;

            case 'logo':
                emptyContainer();
                getImages();
                break;
            
            case 'new-board-submit':
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }

                newBoard();
                break;

            case 'delete-board':
                deleteBoard(e);
                break;

            case 'delete-image':
                deleteImage(e);
                break;

            case 'new-comment-submit':
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }

                addComment(e);
                break;
        
            default:
                break;
        }

    });


});