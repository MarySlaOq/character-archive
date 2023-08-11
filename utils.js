const types = [
    ["success", "<i class=\"fa-solid fa-check\"></i>"], 
    ["failed", "<i class=\"fa-solid fa-xmark\"></i>"], 
    ["loading", "<i class=\"fa-solid fa-triangle-exclamation\"></i>"]
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

    popup.onanimationend = popup.remove;

    document.body.appendChild(popup);
}

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

function saveUserData(user){

    document.getElementById("username").innerText = user.displayName;
    document.getElementById("userimg").src = user.photoURL;

    document.getElementById("login").innerText = "Sign out";
    document.getElementById("login").className = "close";

    myuser = user;
    localStorage.setItem("ca-user-account", JSON.stringify(myuser));
}

window.addEventListener("load", ()=> {
   
    if(localStorage.getItem("ca-user-account") != undefined) {

        myuser = JSON.parse(localStorage.getItem("ca-user-account"));
        document.getElementById("username").innerText = myuser.displayName;
        document.getElementById("userimg").src = myuser.photoURL;

        document.getElementById("login").innerText = "Sign out";
        document.getElementById("login").className = "close";

        sleep(2000).then(()=>{popUpNotification("Logged in as " + myuser.displayName, 0);});
        
    }else {

        sleep(2000).then(()=>{popUpNotification("No account was found", 2);});
    }
});