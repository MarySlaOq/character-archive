import { InfoLevel } from './comps/info.js';
import { Menu } from './comps/menu.js';
import { Universe } from './comps/universe.js';

data.components = {};

// Mounts components to the DOM
export function startApp() {

    const menu = new Menu();
    
    menu.mount(document.getElementById("menu"));
    data.components.menu = menu;

    loadUserData();
    
    // Check url
    const urlParams = new URLSearchParams(window.location.search);
    const dimension = urlParams.get('dimension');

    // get page
    const page = window.location.href.split("/").pop().split("?")[0];
    
    if (!dimension && (page.startsWith("index") || page === "public" || page === "")) {
        
        const universe = new Universe();
        data.components.universe = universe;
        universe.mount(document.getElementById("universe"));

        const level = new InfoLevel();
        data.components.level = level;
        level.mount(document.getElementById("level"));
    }
}