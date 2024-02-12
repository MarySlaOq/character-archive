
function loadStuff(access){

    if(access >= 2){
        // Application management
        const applications = data.applications.map(app => `
            <div class="card">
                <header class="card-header">
                <p class="card-header-title">
                    ${app.name}'s Request
                </p> <span style="margin:auto; padding-right: 10px;">${app.date}</span>
                </header>
                <div class="card-content">
                <div class="content">
                    Contact: <b>${app.email}</b><br>
                    Reason: ${app.message}
                </div>
                </div>
                <footer class="card-footer">
                <a onclick="acceptCreator(${app.id})" class="card-footer-item">Accept</a>
                <a onclick="rejectCreator(${app.id})" class="card-footer-item">Reject</a>
                </footer>
            </div>
        `);

        document.getElementById("application-list").innerHTML = applications.join("");
    }else{
        document.getElementById("application-list").innerHTML = "You cannot access this feature";
    }

    if(access >= 4){

        const peopleList = `

            <div class="select">
                <select id="user-select">
                    ${Object.entries(data.people).map(p =>
                        `<option value="${p[1].id}">${p[1].name} (${p[1].email})</option>`
                    ).join("")}
                </select>
            </div>

            <br>
            <br>

            <div class="buttons">
            <button event="setInformation" class="button is-primary js-modal-trigger" data-target="modify">Modify access</button>
            <button onclick="deleteUser()" class="button is-danger">Delete user</button>
            </div>
        `;

        document.getElementById("user-list").innerHTML = peopleList;
    }else{
        document.getElementById("user-list").innerHTML = "You cannot access this feature";
    }

    if(access >= 3) {

        const backup = `
            <div class="buttons">
                <button onclick="backupDb()" class="button is-primary">Make a backup</button>
                <button onclick="" class="button is-secondary">Load a backup</button>
            </div>
            <textarea class="textarea is-small has-fixed-size" placeholder="Data goes here"></textarea>
        `;

        document.getElementById("backups").innerHTML = backup;
    }else{

        document.getElementById("backups").innerHTML = "You cannot access this feature";
    }

    setTriggers();
}

function backupDb(){
    downloadFile("character-archive-backup.json", JSON.stringify(globalThis.dataAll));
}

function setInformation(){

    const c = getCreator(document.getElementById("user-select").value);
    document.getElementById("edit-title").innerText = "Change " + c.name + "'s permissions";
    document.getElementById("edit-access").value = c.access == undefined ? 1 : c.access;

    messageChange();
}

const AccessWarnings = [
    "A visitor will only be able to look at content",
    "A creator is able to be invited to worlds and characters. They can create new characters, modify existing characters, delete existing characters, and manage the creators of characters. A creator can only edit their own characters",
    "A moderator is able to do everything a creator can, as well as be able to acept and reject creator applications. Moderators may have basic access to database functions",
    "A helper is able to do everything a moderator can, as well as having access to more advanced database functions and are able to send messages to all users",
    "An administrator can do everything the other levels can and more. Total(ish) access to the database. Have access to sensitive information and can delete a lot of stuff"
]

function messageChange(){

    const accesslevel = document.getElementById("edit-access").value;
    document.getElementById("access-message").innerText = AccessWarnings[accesslevel];
}

function changeAccess(){

    const accesslevel = document.getElementById("edit-access").value;
    const c = getCreator(document.getElementById("user-select").value);

    c.access = parseInt(accesslevel);
    globalThis.updateDatabaseValue(c, `people/${c.id}`).then((result) => {
        
        window.location.reload();
});;
}

function acceptCreator(id){

    let newId = 0;
    data.people.forEach(a => newId = a.id >= newId ? a.id : newId);

    const creatorInformation = {
        access: 1,
        email: data.applications[id].email,
        id: (newId + 1),
        name: data.applications[id].name,
        socials: data.applications[id].socials
    }

    // Create person
    globalThis.createDatabaseValue(
        creatorInformation,
        `people/${creatorInformation.id}`
    );

    rejectCreator(id);
}

function rejectCreator(id){

    // Delete request
    globalThis.updateDatabaseValue({}, `applications/${id}`).then((result) => {
        
        window.location.reload();
    });
}

function deleteUser(){

    const id = document.getElementById("user-select").value;
    const user = getCreator(id);

    if(id == getCreatorByEmail(myuser.email).id){

        popUpNotification("You can't delete yourself", 1)
        return;        
    }

    const val = confirm(`Are you sure you want to delete ${user.name}?\nThis action can't be undone.`);

    if (val) {

        globalThis.updateDatabaseValue({}, `people/${id}`).then((result) => {
        
                window.location.reload();
        });;
    }
}