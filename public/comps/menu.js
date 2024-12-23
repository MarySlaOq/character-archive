import { Component } from '../components.js';

export class Menu extends Component {
    constructor(props = {}) {
        super(props);
        this.state = {
            isMenuOpen: false,
            isLoggedIn: false,
            username: 'Browsing as guest',
            userImage: '/resources/default.jpg'
        };
    }

    onMount() {
   
        if (myuser != undefined) 
            this.setState({userImage: myuser.photoURL, username: myuser.displayName, isLoggedIn: true});
    }

    renderElement() {

        let admin = "";
        if (myuser != undefined){

            let creator = getCreatorByEmail(myuser.email);
            admin = (creator != undefined &&  creator.access > 1) ? `<a href="/pages/admin.html" class="navbar-item"> Admin pane </a>` : "";
        }
        return `
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <a
                        role="button"
                        class="navbar-burger ${this.state.isMenuOpen ? 'is-active' : ''}"
                        aria-label="menu"
                        aria-expanded="${this.state.isMenuOpen}"
                        data-target="navbarBasicExample"
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navbarBasicExample" class="navbar-menu ${this.state.isMenuOpen ? 'is-active' : ''}">
                    <div class="navbar-start">
                        <a href="/index.html" class="navbar-item"> Home </a>
                        <a href="/pages/about.html" class="navbar-item"> Documentation </a>
                        ${admin}
                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link"> Community </a>
                            <div class="navbar-dropdown">
                                <a href="#" class="navbar-item js-modal-trigger" data-target="modal-create" event="checkCreatorValidity">
                                    <i class="fa-solid fa-pencil mr"></i> Apply to be a creator
                                </a>
                                <a href="pages/logs.html" class="navbar-item">
                                    <i class="fa-solid fa-scroll mr"></i> Audit logs
                                </a>
                            </div>
                        </div>
                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link"> More </a>
                            <div class="navbar-dropdown">
                                <a target="_blank" href="https://github.com/MarySlaOq/character-archive" class="navbar-item">
                                    <i class="fa-brands fa-github mr"></i> Source code
                                </a>
                                <a class="navbar-item"> About </a>
                                <a class="navbar-item"> Contact </a>
                                <hr class="navbar-divider" />
                                <a target="_blank" href="https://github.com/MarySlaOq/character-archive/issues" class="navbar-item">
                                    Report an issue
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="navbar-end">
                        <div class="is-flex">
                            <img
                                id="userimg"
                                class="is-rounded profile"
                                src="${this.state.userImage}"
                                alt="Profile"
                            />
                            <a href="${(myuser == undefined || getThisId() == -1) ? "#" : "/pages/profile.html?user=" + getCreator(getThisId()).name}">
                                <p id="username" class="m10 card-header-title">
                                    <b>${this.state.username}</b>
                                </p>
                            </a>
                        </div>
                        <button id="login" class="button">
                            ${this.state.isLoggedIn ? 'Logout' : 'Login with google'}
                        </button>
                    </div>
                </div>
            </nav>
        `;
    }
}

