const types = [
    ["success", "<i class=\"fa-solid fa-check\"></i>"], 
    ["failed", "<i class=\"fa-solid fa-xmark\"></i>"], 
    ["loading", "<i class=\"fa-solid fa-triangle-exclamation\"></i>"]
];

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