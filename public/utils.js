const types = [
    ["is-success is-light", "<i class=\"fa-solid fa-check\"></i>"], 
    ["is-danger is-light", "<i class=\"fa-solid fa-xmark\"></i>"], 
    ["is-warning is-light", "<i class=\"fa-solid fa-triangle-exclamation\"></i>"]
];

const accessRightss = ["Visitor", "Creator", "Moderator", "Helper", "Administrator"];
const accessColors = ["message is-dark is-light is-small", "message is-info is-light is-small", "message is-primary is-light is-small", "message is-danger is-light is-small", "message is-primary is-warning is-small"];

const roles = ["Main character", "Supporting character", "Arc character", "Background character"];
const sexuality = ["Agender","Aromantic","Asexual","Bisexual","Demiromantic","Demisexual","Gay","Genderfluid","GenderQueer","Lesbian","Non-Binary","Pansexual","Polyamorous","Polysexual", "Straight", "Trans"];

const color_codes = {
    "aliceblue":"#f0f8ff", "antiquewhite":"#faebd7", "aqua":"#00ffff", "aquamarine":"#7fffd4", "azure":"#f0ffff", "beige":"#f5f5dc", "bisque":"#ffe4c4", "black":"#000000", "blanchedalmond":"#ffebcd", "blue":"#0000ff", "blueviolet":"#8a2be2", "brown":"#a52a2a", "burlywood":"#deb887", "cadetblue":"#5f9ea0", "chartreuse":"#7fff00", "chocolate":"#d2691e", "coral":"#ff7f50", "cornflowerblue":"#6495ed", "cornsilk":"#fff8dc", "crimson":"#dc143c", "cyan":"#00ffff", "darkblue":"#00008b", "darkcyan":"#008b8b", "darkgoldenrod":"#b8860b", "darkgray":"#a9a9a9", "darkgreen":"#006400", "darkkhaki":"#bdb76b", "darkmagenta":"#8b008b", "darkolivegreen":"#556b2f", "darkorange":"#ff8c00", "darkorchid":"#9932cc", "darkred":"#8b0000", "darksalmon":"#e9967a", "darkseagreen":"#8fbc8f", "darkslateblue":"#483d8b", "darkslategray":"#2f4f4f", "darkturquoise":"#00ced1", "darkviolet":"#9400d3", "deeppink":"#ff1493", "deepskyblue":"#00bfff", "dimgray":"#696969", "dodgerblue":"#1e90ff", "firebrick":"#b22222", "floralwhite":"#fffaf0", "forestgreen":"#228b22", "fuchsia":"#ff00ff", "gainsboro":"#dcdcdc", "ghostwhite":"#f8f8ff", "gold":"#ffd700", "goldenrod":"#daa520", "gray":"#808080", "green":"#008000", "greenyellow":"#adff2f",
    "honeydew":"#f0fff0", "hotpink":"#ff69b4", "indianred ":"#cd5c5c", "indigo":"#4b0082", "ivory":"#fffff0", "khaki":"#f0e68c", "lavender":"#e6e6fa", "lavenderblush":"#fff0f5", "lawngreen":"#7cfc00", "lemonchiffon":"#fffacd", "lightblue":"#add8e6", "lightcoral":"#f08080", "lightcyan":"#e0ffff", "lightgoldenrodyellow":"#fafad2", "lightgrey":"#d3d3d3", "lightgreen":"#90ee90", "lightpink":"#ffb6c1", "lightsalmon":"#ffa07a", "lightseagreen":"#20b2aa", "lightskyblue":"#87cefa", "lightslategray":"#778899", "lightsteelblue":"#b0c4de", "lightyellow":"#ffffe0", "lime":"#00ff00", "limegreen":"#32cd32", "linen":"#faf0e6", "magenta":"#ff00ff", "maroon":"#800000", "mediumaquamarine":"#66cdaa", "mediumblue":"#0000cd", "mediumorchid":"#ba55d3", "mediumpurple":"#9370d8", "mediumseagreen":"#3cb371", "mediumslateblue":"#7b68ee",  "mediumspringgreen":"#00fa9a", "mediumturquoise":"#48d1cc", "mediumvioletred":"#c71585", "midnightblue":"#191970", "mintcream":"#f5fffa", "mistyrose":"#ffe4e1", "moccasin":"#ffe4b5", "navajowhite":"#ffdead", "navy":"#000080", "oldlace":"#fdf5e6", "olive":"#808000", "olivedrab":"#6b8e23", "orange":"#ffa500", "orangered":"#ff4500", "orchid":"#da70d6", "palegoldenrod":"#eee8aa",
    "palegreen":"#98fb98", "paleturquoise":"#afeeee", "palevioletred":"#d87093", "papayawhip":"#ffefd5", "peachpuff":"#ffdab9", "peru":"#cd853f", "pink":"#ffc0cb", "plum":"#dda0dd", "powderblue":"#b0e0e6", "purple":"#800080", "rebeccapurple":"#663399", "red":"#ff0000", "rosybrown":"#bc8f8f", "royalblue":"#49e1", "saddlebrown":"#8b4513", "salmon":"#fa8072", "sandybrown":"#f4a460", "seagreen":"#2e8b57", "seashell":"#fff5ee", "sienna":"#a0522d", "silver":"#c0c0c0", "skyblue":"#87ceeb", "slateblue":"#6a5acd", "slategray":"#708090", "snow":"#fffafa", "springgreen":"#00ff7f", "steelblue":"#4682b4", "tan":"#d2b48c", "teal":"#008080", "thistle":"#d8bfd8", "tomato":"#ff6347", "turquoise":"#40e0d0", "violet":"#ee82ee", "wheat":"#f5deb3", "white":"#ffffff", "whitesmoke":"#f5f5f5", "yellow":"#ffff00", "yellowgreen":"#9acd32"
}

var myuser = undefined;

function getCreator(id){ 
    if (data.people == {}) return {};
    return data.people[id];
}

function getThisId(){ return getCreatorByEmail(myuser.email).id; }
function getCreatorByEmail(email) { return Object.values(data.people).find(p => p.email == email) }
function getCreatorByName(name) { return Object.values(data.people).find(p => p.name == name) }

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

function saveUserData(user){

    document.getElementById("username").innerText = user.displayName;
    document.getElementById("userimg").src = user.photoURL;

    document.getElementById("login").innerText = "Sign out";
    document.getElementById("login").className = "button";

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

    const positions = {};
    document.querySelectorAll(".chara").forEach(character => {

        positions[character.id] = {"left": character.style.left, "top": character.style.top};
    });

    localStorage.setItem("ca-icon-positions", JSON.stringify(positions));
}

function loadIconPositions(){

    const positions = JSON.parse(localStorage.getItem("ca-icon-positions"));
    for(const icon in positions){

        const character = document.getElementById(icon);
        if(positions[icon].left == "" || positions[icon].top == "") continue;

        character.style.left = positions[icon].left;
        character.style.top = positions[icon].top;
    }

    clearLines();
    myworld.establishRelations();
}

window.addEventListener("load", ()=> {

    if(localStorage.getItem("ca-user-account") != undefined) {

        myuser = JSON.parse(localStorage.getItem("ca-user-account"));

        document.getElementById("username").innerText = myuser.displayName;
        document.getElementById("userimg").src = myuser.photoURL;

        document.getElementById("login").innerText = "Sign out";
        document.getElementById("login").className = "button";

        sleep(1000).then(()=>{popUpNotification("Logged in as " + myuser.displayName, 0);});
        
    }else {

        sleep(1000).then(()=>{popUpNotification("No account was found", 2);});
    }
});

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
    document.getElementById("access").className = accessColors[access];
    document.getElementById("access-cont").innerText = accessRightss[access];

    if(access > 1 && document.getElementById("admin-pane-access") == undefined){

        const pane = document.getElementById("adminpane");

        const btn = document.createElement("a");
        btn.className = "button is-link";
        btn.innerText = "Admin panel";
        btn.href = "admin.html";
        btn.id = "admin-pane-access";

        pane.appendChild(btn);
    }
}

function uploadFile(){
    
    event.preventDefault();
    const formdata = new FormData(document.getElementById("upload-form"));
    console.log(formdata.get("resume"));
}

const DatabaseOperations = Object.freeze({
    CREATE: 0,
    UPDATE: 1,
    DELETE: 2
});

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