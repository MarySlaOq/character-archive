// Get the database info
const fetchAllDataBaseInfo = (database, app) => {
    document.getElementById("database").className = "success";
    document.getElementById("database").innerText =
        "Database status: connected";

    document.getElementById("database").style.animation =
        "fadeout 3s linear 0.5s 1 normal forwards";

    const peopleRef = ref(database, "people");
};

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