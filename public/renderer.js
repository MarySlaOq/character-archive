import { Menu } from './comps/menu.js';
import { Universe } from './comps/universe.js';
import { Profile } from './comps/profile.js';

data.components = {};

// Mounts components to the DOM
export function startApp() {

    loadUserData();

    const menu = new Menu();
    
    menu.mount(document.getElementById("menu"));
    data.components.menu = menu;

    updateLoginInfo();

    // Check url
    const urlParams = new URLSearchParams(window.location.search);
    const dimension = urlParams.get('dimension');

    // get page
    const page = window.location.href.split("/").pop().split("?")[0];
    
    // For index
    if (!dimension && (page.startsWith("index") || page === "public" || page === "")) {
        
        const universe = new Universe();
        data.components.universe = universe;
        universe.mount(document.getElementById("universe"));
    }

    // For profile
    if (page === "profile.html") {

        // Getting user
        const user = urlParams.get('user');

        const profile = new Profile({user: user});
        data.components.profile = profile;
        profile.mount(document.getElementById("profile"));
    }
}