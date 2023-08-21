const types = [
    ["is-success is-light", "<i class=\"fa-solid fa-check\"></i>"], 
    ["is-danger is-light", "<i class=\"fa-solid fa-xmark\"></i>"], 
    ["is-warning is-light", "<i class=\"fa-solid fa-triangle-exclamation\"></i>"]
];

var myuser = undefined;

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

        sleep(3000).then(()=>{popUpNotification("Logged in as " + myuser.displayName, 0);});
        
    }else {

        sleep(3000).then(()=>{popUpNotification("No account was found", 2);});
    }
});

const parserFinishedCallback = () => {

    if(localStorage.getItem("ca-icon-positions") !== undefined){
        loadIconPositions();
    }
}
