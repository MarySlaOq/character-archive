import { startApp } from "./renderer.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import {
    getDatabase,
    ref,
    child,
    get,
    set,
    update,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

// Get the database info
const loadDB = (database, app) => {

    var connection = false;

    // Get the database info
    async function fetchAllDataBaseInfo(database, app) {

        if(globalThis.dataInfo != undefined){
            data = globalThis.dataInfo;
            if(window["parse"] != undefined) parse();
            else{
                parserFinishedCallback();
            }
            return;
        }

        popUpNotification("Connected to database successfully", 0);

        sleep(0).then(() => {
            // Get people
            const dbRef = ref(database);
            get(child(dbRef, `people`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                data.people = {...snapshot.val()};

                get(child(dbRef, `applications`)).then((snapshot) => {
                    if (snapshot.exists()) {
                    data.applications = snapshot.val();
                    }
                });

                if (data.applications == undefined) data.applications = [];

                get(child(dbRef, `relations`)).then((snapshot) => {
                    if (snapshot.exists()) {
                    data.relations = { ...snapshot.val() };


                    get(child(dbRef, `settings`)).then((snapshot) => {
                        if (snapshot.exists()) {
                        data.settings = { ...snapshot.val() };


                        get(child(dbRef, `animals`)).then((snapshot) => {
                            if (snapshot.exists()) {
                            animals = { ...snapshot.val() };


                            get(child(dbRef, `worlds`)).then((snapshot) => {
                                if (snapshot.exists()) {
                                for (const property in snapshot.val()) {
                                    const element = snapshot.val()[property];
                                    const dimData = {
                                    name: element.name,
                                    outline: element.outline,
                                    world: {
                                        divisions: element.divisions,
                                        maps: [],
                                    },
                                    characters: [],
                                    public: element.public,
                                    create_date: element.creation_date,
                                    };

                                    if (element.divisions == undefined)
                                    dimData.world = undefined;

                                    data.dimensions.push(dimData);
                                }


                                get(child(dbRef, `maps`)).then((snapshot) => {
                                    if (snapshot.exists()) {
                                    for (const property in snapshot.val()) {
                                        const element = snapshot.val()[property];

                                        data.dimensions.find(
                                        (d) => d.name == property
                                        ).world.maps = element;
                                    }

                                    get(child(dbRef, `characters`)).then(
                                        (snapshot) => {
                                        if (snapshot.exists()) {
                                            for (const property in snapshot.val()) {
                                            const element =
                                                snapshot.val()[property];

                                            data.dimensions.find(
                                                (d) => d.name == property
                                            ).characters = element;
                                            }

                                            get(child(dbRef, `magic`)).then(
                                            (snapshot) => {
                                                if (snapshot.exists()) {
                                                    for (const property in snapshot.val()) {
                                                        const element =
                                                        snapshot.val()[property];

                                                        data.dimensions.find(
                                                        (d) => d.name == property
                                                        ).magic = element;
                                                    }

                                                    get(child(dbRef, `logs`)).then(
                                                    (snapshot) => {
                                                        if (snapshot.exists()) {
                                                            data.logs = snapshot.val();

                                                            globalThis.dataInfo = data;
                                                            startApp();
                                                            
                                                            if(window["parse"] != undefined){
                                                                parse();
                                                            } 
                                                            else{
                                                                
                                                                parserFinishedCallback();
                                                            }
                                                        }
                                                    });

                                                } else {
                                                    popUpNotification("Could not load characters",1);
                                                }
                                            }
                                            );
                                        } else {
                                            popUpNotification("Could not load characters",1);
                                        }
                                        }
                                    );
                                    } else {
                                        popUpNotification("Could not load maps", 1);
                                    }
                                });
                                } else {
                                    popUpNotification("Could not load dimensions",1);
                                }
                            });
                            } else {
                                popUpNotification("Could not load animals", 1);
                            }
                        });
                        } else {
                            popUpNotification("Could not load settings", 1);
                        }
                    });
                    } else {
                        popUpNotification("Could not load relations", 1);
                    }
                });

                } else {
                    popUpNotification("Could not load people", 1);
                }
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

    let auth;
    let provider;
    try {

        const app = initializeApp(firebaseConfig);
        connection = true;

        const analytics = getAnalytics(app);
        auth = getAuth(app);
        provider = new GoogleAuthProvider();

        const database = getDatabase(app);
        fetchAllDataBaseInfo(database, app);

    } catch (err) {
        console.error(err);
        popUpNotification("Could not connect to database", 1);
    }

    function authFunction() {

        console.log("authFunction");

        if (document.getElementById("login").innerText == "Sign out") {
            signOut(auth)
            .then(() => {
                myuser = undefined;
                localStorage.removeItem("ca-user-account");
                document.getElementById("username").innerText =
                "Browsing as guest";
                document.getElementById("userimg").src = "resources/default.jpg";
                document.getElementById("login").innerText = "Login with google";
                document.getElementById("login").className = "button";

                window.location.reload();
            })
            .catch((error) => {
                popUpNotification("Sign out failed", 1);
            });
        } else {
            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                const user = result.user;
                saveUserData(user);

                popUpNotification("Logged in as " + user.displayName, 0);

                window.location.reload();
            })
            .catch((error) => {
                popUpNotification("Google login failed", 1);
            });
        }
    }

    try {
        
        document.getElementById("login").onclick = authFunction;
        
    } catch (error) {}

    function updateDatabaseValue(newInformation, characterPath) {
        const updates = {};
        updates[characterPath] = newInformation;
        return update(ref(getDatabase()), updates);
    }

    function createDatabaseValue(newInformation, createCollection) {
        set(ref(getDatabase(), createCollection), newInformation);
    }

    globalThis.createDatabaseValue = createDatabaseValue;
    globalThis.updateDatabaseValue = updateDatabaseValue;
};

loadDB();

// DATABASE ADMINISTRATION FUNCTIONS
const addCharacterAttribute = () => {

    const field = "sexuality";
    const value = -1;

    data.dimensions.forEach(element => {
        
        element.characters.forEach(character => {

            const path = `/characters/${element.name}/${character.id}`;
            
            const modCharacter = character;
            modCharacter[field] = value;

            globalThis.updateDatabaseValue(modCharacter, path);
        });
    });;
}