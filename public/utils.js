// Global variables
let animals = {};
let data = {
    "people": [],
    "dimensions":[],
    "relations": {},
    "settings": {}
}

const types = [
    ["is-success is-light", "<i class=\"fa-solid fa-check\"></i>"], 
    ["is-danger is-light", "<i class=\"fa-solid fa-xmark\"></i>"], 
    ["is-warning is-light", "<i class=\"fa-solid fa-triangle-exclamation\"></i>"]
];

const accessRightss = ["Visitor", "Creator", "Moderator", "Helper", "Administrator"];
const accessColors = ["message is-dark is-light is-small", "message is-info is-light is-small", "message is-primary is-light is-small", "message is-danger is-light is-small", "message is-primary is-warning is-small"];
const tagColors = ["is-dark", "is-info", "is-primary", "is-danger", "is-warning"];

const roles = ["Main character", "Supporting character", "Arc character", "Background character"];
const sexuality = ["Agender","Aromantic","Asexual","Bisexual","Demiromantic","Demisexual","Gay","Genderfluid","GenderQueer","Lesbian","Non-Binary","Pansexual","Polyamorous","Polysexual", "Straight", "Trans"];

const color_codes = {
    "aliceblue":"#f0f8ff", "antiquewhite":"#faebd7", "aqua":"#00ffff", "aquamarine":"#7fffd4", "azure":"#f0ffff", "beige":"#f5f5dc", "bisque":"#ffe4c4", "black":"#000000", "blanchedalmond":"#ffebcd", "blue":"#0000ff", "blueviolet":"#8a2be2", "brown":"#a52a2a", "burlywood":"#deb887", "cadetblue":"#5f9ea0", "chartreuse":"#7fff00", "chocolate":"#d2691e", "coral":"#ff7f50", "cornflowerblue":"#6495ed", "cornsilk":"#fff8dc", "crimson":"#dc143c", "cyan":"#00ffff", "darkblue":"#00008b", "darkcyan":"#008b8b", "darkgoldenrod":"#b8860b", "darkgray":"#a9a9a9", "darkgreen":"#006400", "darkkhaki":"#bdb76b", "darkmagenta":"#8b008b", "darkolivegreen":"#556b2f", "darkorange":"#ff8c00", "darkorchid":"#9932cc", "darkred":"#8b0000", "darksalmon":"#e9967a", "darkseagreen":"#8fbc8f", "darkslateblue":"#483d8b", "darkslategray":"#2f4f4f", "darkturquoise":"#00ced1", "darkviolet":"#9400d3", "deeppink":"#ff1493", "deepskyblue":"#00bfff", "dimgray":"#696969", "dodgerblue":"#1e90ff", "firebrick":"#b22222", "floralwhite":"#fffaf0", "forestgreen":"#228b22", "fuchsia":"#ff00ff", "gainsboro":"#dcdcdc", "ghostwhite":"#f8f8ff", "gold":"#ffd700", "goldenrod":"#daa520", "gray":"#808080", "grey":"#808080", "green":"#008000", "greenyellow":"#adff2f",
    "honeydew":"#f0fff0", "hotpink":"#ff69b4", "indianred ":"#cd5c5c", "indigo":"#4b0082", "ivory":"#fffff0", "khaki":"#f0e68c", "lavender":"#e6e6fa", "lavenderblush":"#fff0f5", "lawngreen":"#7cfc00", "lemonchiffon":"#fffacd", "lightblue":"#add8e6", "lightcoral":"#f08080", "lightcyan":"#e0ffff", "lightgoldenrodyellow":"#fafad2", "lightgrey":"#d3d3d3", "lightgreen":"#90ee90", "lightpink":"#ffb6c1", "lightsalmon":"#ffa07a", "lightseagreen":"#20b2aa", "lightskyblue":"#87cefa", "lightslategray":"#778899", "lightsteelblue":"#b0c4de", "lightyellow":"#ffffe0", "lime":"#00ff00", "limegreen":"#32cd32", "linen":"#faf0e6", "magenta":"#ff00ff", "maroon":"#800000", "mediumaquamarine":"#66cdaa", "mediumblue":"#0000cd", "mediumorchid":"#ba55d3", "mediumpurple":"#9370d8", "mediumseagreen":"#3cb371", "mediumslateblue":"#7b68ee",  "mediumspringgreen":"#00fa9a", "mediumturquoise":"#48d1cc", "mediumvioletred":"#c71585", "midnightblue":"#191970", "mintcream":"#f5fffa", "mistyrose":"#ffe4e1", "moccasin":"#ffe4b5", "navajowhite":"#ffdead", "navy":"#000080", "oldlace":"#fdf5e6", "olive":"#808000", "olivedrab":"#6b8e23", "orange":"#ffa500", "orangered":"#ff4500", "orchid":"#da70d6", "palegoldenrod":"#eee8aa",
    "palegreen":"#98fb98", "paleturquoise":"#afeeee", "palevioletred":"#d87093", "papayawhip":"#ffefd5", "peachpuff":"#ffdab9", "peru":"#cd853f", "pink":"#ffc0cb", "plum":"#dda0dd", "powderblue":"#b0e0e6", "purple":"#800080", "rebeccapurple":"#663399", "red":"#ff0000", "rosybrown":"#bc8f8f", "royalblue":"#49e1", "saddlebrown":"#8b4513", "salmon":"#fa8072", "sandybrown":"#f4a460", "seagreen":"#2e8b57", "seashell":"#fff5ee", "sienna":"#a0522d", "silver":"#c0c0c0", "skyblue":"#87ceeb", "slateblue":"#6a5acd", "slategray":"#708090", "snow":"#fffafa", "springgreen":"#00ff7f", "steelblue":"#4682b4", "tan":"#d2b48c", "teal":"#008080", "thistle":"#d8bfd8", "tomato":"#ff6347", "turquoise":"#40e0d0", "violet":"#ee82ee", "wheat":"#f5deb3", "white":"#ffffff", "whitesmoke":"#f5f5f5", "yellow":"#ffff00", "yellowgreen":"#9acd32"
}

const relationshipSorter = {
    0: "Friendship",
    1: "Romantic",
    2: "Familial",
    3: "Professional",
    4: "Rivalry",
    5: "Acquaintance",
    6: "Figurative",
    999: "Miscellaneous",
}

const socialList = ["Twitter", "Instagram", "Reddit", "Github"];
const socialIcons = ["fa-twitter", "fa-instagram", "fa-reddit", "fa-github"];

var myuser = undefined;

function getCreator(id){ 
    if (data.people == {}) return {};
    return data.people[id];
}

function getThisId(){ 
    let creator = getCreatorByEmail(myuser.email);
    return creator == undefined ? -1 : creator.id; 
}
function getCreatorByEmail(email) { return Object.values(data.people).find(p => p.email == email) }
function getCreatorByName(name) { return Object.values(data.people).find(p => p.name == name) }

function getApplicationById(id){ return Object.entries(data.applications).find(a => a[1].id == id)[1]; }
function getApplicationIndexById(id){ return Object.entries(data.applications).find(a => a[1].id == id)[0];}

function getRelationshipById(id){ return Object.entries(data.relations).find(a => a[1].id == id)[1]; }
function getRelationshipIndexById(id){ return Object.entries(data.relations).find(a => a[1].id == id)[0];}

function getCharacteterWorld(character){ return data.dimensions.find(w => w.characters.includes(character)).name; }

function getPageOfLink(link){
    const url = new URL(link);
    const page = url.pathname.split("/").pop();
    return page;
}

function makeTag(person, icon = undefined){ 

    let iconText = icon == undefined ? "" : `
        <span class="icon m10">
            <i class="fas fa-${icon}"></i>
        </span>&nbsp;
    `;

    return `
        
        <a href="/pages/profile.html?user=${person.name}" class="tag is-light ${tagColors[person.access]}">
            ${iconText}
            ${person.name}
        </a>
    `; 
}

function makeRelationSelect(selected = undefined){

    let relationTypes = Object.entries(data.relations);
    
    // Sort by sorter and alphabetically
    relationTypes = relationTypes.sort((a, b) => a[1].name.localeCompare(b[1].name));
    relationTypes = relationTypes.sort((a, b) => a[1].sorter - b[1].sorter);

    let relationEntries = relationTypes.map(r => "<option "+ (selected === undefined ? "" : (r[0] == selected ? "selected": "")) +">" + r[1].name + "</option>");
    
    // Add optgroup for sorter
    for (let i = 0; i < relationEntries.length; i++) 
        if (i > 0 && relationTypes[i][1].sorter != relationTypes[i-1][1].sorter) 
            relationEntries[i] = "<optgroup label='" + relationshipSorter[relationTypes[i][1].sorter] + "'>" + relationEntries[i];

    // Insert first optgroup
    relationEntries[0] = "<optgroup label='" + relationshipSorter[relationTypes[0][1].sorter] + "'>" + relationEntries[0];

    return relationEntries.join("");
}

const popUpNotification = (text, type) => {

    let add = 100;
    [...document.body.querySelectorAll(".notification")].reverse().forEach(not => {

        not.style.opacity = 0.5 - add / 1000;
        not.style.left = add + "px";
        add += 100;
    });

    const popup = document.createElement("div");
    popup.className = "notification " + types[type][0];
    popup.innerHTML = `<h1>${types[type][1]} ${text}</h1>`;
    popup.style.opacity = 1;

    setTimeout(() => {
        popup.style.transform = "translate(0, 100px)";
    }, 1500);

    setTimeout(() => {
        popup.remove();
    }, 2000);

    document.body.appendChild(popup);
}

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

function setStateOfComponentIfExists(component, state){

    if (data.components[component] != undefined) {
        data.components[component].setState(state);
    }else {
        console.error("Component not found: " + component);
    }
}

function openDimension(dimension) {

    // Open url
    window.open("/index.html?dimension=" + dimension, "_self");
}

function updateLoginInfo(){

    if (myuser != undefined){

        document.getElementById("username").innerText = myuser.displayName;
        document.getElementById("userimg").src = myuser.photoURL;
    
        document.getElementById("login").innerText = "Sign out";
        document.getElementById("login").className = "button";
    }

    // Set functionality of the login button
    try {
    
        document.getElementById("login").onclick = globalThis.login;
        
    } catch (error) {

        console.error(error);
    }
}

function loadUserData(){
    
    if(localStorage.getItem("ca-user-account") != undefined) {

        myuser = JSON.parse(localStorage.getItem("ca-user-account"));

        sleep(1000).then(()=>{popUpNotification("Logged in as " + myuser.displayName, 0);});
        
    }else {

        sleep(1000).then(()=>{popUpNotification("No account was found", 2);});
    }

}

function saveUserData(user){

    myuser = user;
    localStorage.setItem("ca-user-account", JSON.stringify(myuser));
}

function downloadFile(filename, text) {

    var element = document.createElement('a');
    element.setAttribute('href', "data:txt/json;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

function saveIconsPositions(){

    // const positions = {};
    // document.querySelectorAll(".chara").forEach(character => {

    //     positions[character.id] = {"left": character.style.left, "top": character.style.top};
    // });

    // localStorage.setItem("ca-icon-positions", JSON.stringify(positions));
}

function loadIconPositions(){

    // const positions = JSON.parse(localStorage.getItem("ca-icon-positions"));
    // for(const icon in positions){

    //     const character = document.getElementById(icon);
    //     if (character == null) continue;

    //     if(positions[icon].left == "" || positions[icon].top == "") continue;

    //     character.style.left = positions[icon].left;
    //     character.style.top = positions[icon].top;
    // }

    // clearLines();
    // myworld.establishRelations();
}

const parserFinishedCallback = () => {

    if(document.getElementById("worlds") != undefined && localStorage.getItem("ca-icon-positions") !== undefined){
        loadIconPositions();
    }

    loadAccessRights();
    if(window["loadContent"] != undefined){ loadContent(); }
}

function getGoogleProfilePicture(email){
    const md5 = new Hashes.MD5;
    const hashedValue = md5.hex(email);
    console.log("MD5 Hash: " + hashedValue);
}

function loadAccessRights(){

    if(window["block"] != undefined){ block(); }

    // Check if is creator
    if(myuser == undefined) return;

    const creator = getCreatorByEmail(myuser.email);

    const access = creator == undefined ? 0 : (creator.access == undefined ? 1 : creator.access);
    // document.getElementById("access").className = accessColors[access];

    // if(access > 1 && document.getElementById("admin-pane-access") == undefined){

    //     const pane = document.getElementById("adminpane");

    //     const btn = document.createElement("a");
    //     btn.className = "button is-link";
    //     btn.innerText = "Admin panel";
    //     btn.href = "admin.html";
    //     btn.id = "admin-pane-access";

    //     try {
    //         pane.appendChild(btn);
    //     } catch (error) {}

    // }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function share() {

    navigator.clipboard.writeText(window.location.href);
    popUpNotification("Link copied to clipboard", 0);
}

function uploadFile(){
    
    event.preventDefault();
    const formdata = new FormData(document.getElementById("upload-form"));
    console.log(formdata.get("resume"));
}

function saveLog(type, details = null){

    if(myuser == undefined) return;

    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    
    const trigger = getCreatorByEmail(myuser.email).id;

    const logData = {
        date: date,
        time: time,
        operation: type.id,
        message: type.message,
        concern: type.concern,
        details: details,
        trigger: trigger
    };

    let uniq = 'id' + (new Date()).getTime();
    globalThis.createDatabaseValue(logData, `logs/${uniq}`);
}

const DatabaseOperations = Object.freeze({
    CREATE: 0,
    UPDATE: 1,
    DELETE: 2
});

const LogTypes = Object.freeze({
    NEW_CREATOR: {id: 0, message: "A new creator was verified", concern: -1},
    CREATOR_REJECTED: {id: 5, message: "A new creator was rejected", concern: -1},
    ROLE_UPDATE: {id: 1, message: "A new status modification was processed", concern: -1},
    ACCOUNT_DELETE: {id: 2, message: "A creator was banned", concern: -1},
    NEW_RELATION: {id: 3, message: "A new relationship type was added to the database", concern: -1},
    DELETE_RELATION: {id: 4, message: "A relationship type was removed from database", concern: -1},
});

const logIcons = [
    ["<i class=\"fa-solid fa-check\"></i>", "has-text-success"],
    ["<i class=\"fa-solid fa-triangle-exclamation\"></i>", "has-text-warning"],
    ["<i class=\"fa-solid fa-ban\"></i>", "has-text-danger"],
    ["<i class=\"fa-solid fa-heart\"></i>", "has-text-info"],
    ["<i class=\"fa-solid fa-xmark\"></i>", "has-text-danger"],
    ["<i class=\"fa-solid fa-hand\"></i>", "has-text-warning"],
];

// CRUD data conversion lookup map
const dataConversionLookupMap = {

    name: {
        "origin": "p",
        "target": "text"
    },
    fullname: {
        "origin": "p",
        "target": "text",
        "dataKey": "full_name"
    },
    outline: {
        "origin": "p",
        "target": "textarea",
        "dataKey": "biography"
    },
    species: {
        "origin": "span",
        "target": "text"
    },
    age: {
        "origin": "span",
        "target": "text"
    },
    gender: {
        "origin": "span",
        "target": "text"
    },
    occupation: {
        "origin": "span",
        "target": "text"
    },
    height: {
        "origin": "span",
        "target": "number"
    },
    weight: {
        "origin": "span",
        "target": "number"
    },
    bloodtype: {
        "origin": "span",
        "target": "text"
    },
    birthdate: {
        "origin": "span",
        "target": "text"
    },
    birthplace: {
        "origin": "span",
        "target": "text"
    },
    sexuality: {
        "origin": "span",
        "target": "list",
        "data": {
            "constant": true,
            "source": sexuality,
            "datakey": "sexuality",
            "elementTarget": "text",
            "newID": "sexuality-selector"
        }
    },
    notes: {
        "origin": "p",
        "target": "text"
    },
    personality: {
        "origin": "p",
        "target": "list",
        "data": {
            "constant": false,
            "dataKey": "personality",
            "elementTarget": "text"
        }
    },
    likes: {
        "origin": "ul",
        "target": "list",
        "data": {
            "constant": false,
            "dataKey": "likes",
            "elementTarget": "text"
        }
    },
    hates: {
        "origin": "ul",
        "target": "list",
        "data": {
            "constant": false,
            "dataKey": "hates",
            "elementTarget": "text"
        }
    },
    relations: {
        "origin": "rel",
        "target": "list",
        "data": {
            "constant": false,
            "dataKey": "relations",
            "elementTarget": "rel"
        }
    },
    image: {
        "origin": "img",
        "target": "text"
    }
}

// An empty character -UPDATE WHEN NEW INFO IS ADDED!!-
const emptyCharacterTemplate = {
    "id": -1,
    "name": "",
    "full_name" : "",
    "biography": "",
    "personality": [],
    "species": "",
    "age": "",
    "gender": "",
    "occupation": "",
    "height": 0,
    "weight": 0,
    "bloodtype": "",
    "birthdate": "",
    "birthplace": "",
    "sexuality": -1,
    "creators": [],
    "image": "",
    "role": 0,
    "relations": [],
    "likes": [],
    "hates": [],
    "notes": "",
    "pinterest": "",
    "spotify": "",
    "tags": [],
    "highlight": ""
}