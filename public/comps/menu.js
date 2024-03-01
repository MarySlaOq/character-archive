const menu = `<nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
    <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
    >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
    </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
        <a href="index.html" class="navbar-item"> Home </a>

        <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link"> Community </a>

        <div class="navbar-dropdown">
            <!--<hr class="navbar-divider" />-->
            <a event="checkCreatorValidity" data-target="modal-create" class="navbar-item js-modal-trigger"> <i class="fa-solid fa-pencil mr"></i> Apply to be a creator </a>
        </div>
        </div>

        <a href="about.html" class="navbar-item"> Documentation </a>

        <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link"> More </a>

        <div class="navbar-dropdown">
            <a
            target="_blank"
            href="https://github.com/MarySlaOq/character-archive"
            class="navbar-item"
            >
            <i class="fa-brands fa-github mr"></i> Source code
            </a>
            <a class="navbar-item"> About </a>
            <a class="navbar-item"> Contact </a>
            <hr class="navbar-divider" />
            <a
            target="_blank"
            href="https://github.com/MarySlaOq/character-archive/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc"
            class="navbar-item"
            >
            Report an issue
            </a>
        </div>
        </div>
    </div>

    <!--<button onclick="addCharacterAttribute()">test</button>-->

    <div class="navbar-end">
        <div class="is-flex">

        <img
            id="userimg"
            class="is-rounded profile"
            src="resources/default.jpg"
            alt=""
        />
        <p id="username" class="m10 card-header-title">
            <b>Browsing as guest</b>
        </p>
        </div>
        <article id="access" style="margin: auto;">
        <div class="message-body" id="access-cont">
        </div>
        </article>
        <button id="login" class="button">Login with google</button>
    </div>
    </div>
</nav>`;

document.getElementById("menu").innerHTML = menu;