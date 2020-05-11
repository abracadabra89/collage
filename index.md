<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="style.css">
    <script type="text/javascript" src="script.js"></script>
    <title>Collaage</title>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light">
        <a id="homepage" class="navbar-brand" href="#"><img id="logo" src="assets/logo4.png" class='displayed' style="max-height: 90px;"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a id="boards" class="nav-link" href="#">Boards</a>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <input id="search-input" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button id="search-btn" class="btn btn-sm btn-outline-secondary" style='display:flex; justify-content:center;'>Search</button>
            </form>
        </div>
    </nav>

    <div class="search-bar-container">
        <ul id="search-bar">
            <li class="search-bar-item">Fashion</li>
            <li class="search-bar-item">Art</li>
            <li class="search-bar-item">Interiors</li>
            <li class="search-bar-item">Technology</li>
            <li class="search-bar-item">Random</li>
        </ul>
    </div>

    <div class="wrapper">
        <div class="headers"></div>
        <div class="grid"></div>
    </div>

</body>
</html>
