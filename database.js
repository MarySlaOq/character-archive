// Get the database info
const fetchAllDataBaseInfo = (database, app) => {
document.getElementById("database").className = "success";
document.getElementById("database").innerText =
    "Database status: connected";

document.getElementById("database").style.animation =
    "fadeout 3s linear 0.5s 1 normal forwards";

const peopleRef = ref(database, "people");
};