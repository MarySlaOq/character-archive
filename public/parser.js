const file = document.getElementById("script").src;

// Hello hello <3 hai o7
//lets get back to work!! :flex:

function getRelationshipData(id){ return data.relations[id]; }
function getResource(name){

    if(name==undefined) return "";

    if(name.includes("public/resources")) name = name.split("/").slice(-1)[0];
    if(name.includes("http")) return name;
    return "resources/" + name;
}
function getFlagOf(name){ return `resources/flags/${name}-Pride.jpg`; }

function getCurrentCharacterPopUpData(){

    return myworld.getChara(popup.getAttribute("character-id"));
}

var block_popup = false;
var my_top = -1;

var popup = document.getElementById("popup");
var mapPopup = document.getElementById("map-popup");

var currentMagicalPage = 0;

const restartEditor = () => {

    exit_editor();
    toggle_edit();
}

// Prevent right click
document.addEventListener('contextmenu', event => event.preventDefault());

// Create window resize dragging safety
window.addEventListener("resize", (event) => {

    // Deal with absolute position shit
    adjustMagicPage();
    reset_positions();
    defineGrabbable();
    mapZoomOut();
});

function adjustMagicPage() {
    
}

function mapZoomOut(){

    $(`[id='${myworld.name}slide']`).cycle('destroy'); 

    // Zoom out of map
    const map = myworld.getCurrentMap();
    let mapid = map.parentElement.parentElement.parentElement.id.split("w-m")[1];

    const myData = myworld.getMapDataFromIndex(mapid);

    // remove slide show images
    map.parentElement.innerHTML = "<img class=\"map-image\" src=\""+getResource(myData.image)+"\">";

    document.getElementById(myworld.name + "slide").style.removeProperty("height");

    myworld.positionAllMapPins();

    //Clear region data
    const frame = document.querySelector(`.map-active .region-data`);
    frame.style.display = "none";
}

function previous_map(){

    mapZoomOut();
    document.querySelectorAll(".map-active").forEach(active_map => {

        if(active_map.id.includes(myworld.name)){

            // Found current map
            const id = active_map.id.split("w-m")[1];

            let next = id - 1;
            active_map.className = active_map.className.replace("map-active", "");

            var next_map = document.getElementById(myworld.name + "w-m" + next);
            if(next_map == null) next_map = document.getElementById(myworld.name + "w-m" + (myworld.world.maps.length-1));

            next_map.classList.add("map-active");
            return;
        }    
    });

    myworld.positionAllMapPins();
}

function next_map(){

    mapZoomOut();
    document.querySelectorAll(".map-active").forEach(active_map => {

        if(active_map.id.includes(myworld.name)){

            // Found current map
            const id = active_map.id.split("w-m")[1];

            let next = (parseInt(id) + 1);
            active_map.className = active_map.className.replace("map-active", "");

            var next_map = document.getElementById(myworld.name + "w-m" + next.toString());
            if(next_map == null) next_map = document.getElementById(myworld.name + "w-m0");

            next_map.classList.add("map-active");
            return;
        }
    });

    myworld.positionAllMapPins();
}

function reset_positions() {

    document.querySelectorAll(".chara").forEach(character => {

        // Dont change if in different world
        if(character.offsetParent == null) return;

        character.style.left = 0;
        character.style.top = 0;

        clearLines();
        myworld.establishRelations();
    });

    saveIconsPositions();
}

let ismerging = false;
// Merge all the maps
function merge_maps(){

    //Close region data pop up
    mapZoomOut();

    myworld.clearPins();
    ismerging = true;

    const start_height = document.getElementById(myworld.name).getBoundingClientRect().height;

    const otherMaps = [];
    const offsets = [];

    let map_n = 1;

    var currentMap = null;

    document.querySelectorAll(".map-image").forEach(map => {

        if(currentMap==null) currentMap = map.offsetParent != null ? map : null;
        if(map.parentElement.parentElement.parentElement.id.split("w-m")[0] != myworld.name || map.offsetParent != null) return;
        
        const img = document.createElement("img");
        img.className = "map-merging";
        img.src = map.src;
        
        otherMaps.push(img);

        map_n++;
    });

    if(map_n==1 || currentMap == null) return;

    map_n = 1 / map_n;
    otherMaps.forEach(map => {

        const drawnMap = currentMap.parentNode.appendChild(map);
        const height = drawnMap.getBoundingClientRect().height;

        offsets.push(height);
        // mais 5.5 porque offsets gostam de me comer o cu
        const this_height = offsets.reduce((a, b) => a + b + 5.5, 0);

        drawnMap.style.bottom = this_height + "px";
        drawnMap.style.opacity = map_n;
    });

    document.getElementById(myworld.name).style.height = start_height + "px";
}

function unmerge(){

    myworld.positionAllMapPins();
    document.querySelectorAll(".map-merging").forEach(map => {

        map.remove();
    });

    document.getElementById(myworld.name).style.removeProperty("height");
}

function searchUpdate(prompt=null){

    prompt = prompt==null ? document.getElementById(myworld.name + "search").value.toLowerCase() : prompt;
    reset_positions();
    
    myworld.characters.forEach(chara => {

        let name = chara.name.toString().toLowerCase();
        document.getElementById(`${myworld.name}c${chara.id}`).style.display = name.includes(prompt) ? "block" : "none";
    });

    myworld.establishRelations();
}

function popupOf(who){

    let chara = myworld.getChara(who);
    myworld.openPopUp(chara);
}

function next_popup(){

    exit_editor();

    let id = getCurrentCharacterPopUpData().id + 1;

    if(id >= myworld.characters.length) id = 0;
    popupOf(id);
}

function previous_popup(){

    exit_editor();

    let id = getCurrentCharacterPopUpData().id - 1;

    if(id < 0) id = myworld.characters.length-1;
    popupOf(id);
}

function relationship_control(){

    const text = document.getElementsByClassName("controller").item(0).innerText;
    const state = text == "Hide all relationships";
    document.getElementsByClassName("controller").item(0).innerText = state ? "Show all relationships" : "Hide all relationships";

    if(state) clearLines();
    else myworld.establishRelations();
}

function toggle_pins(){

    const button = document.getElementById(`${myworld.name}pin_toggle`);
    const state = button.innerText == "Hide pins";

    button.innerText = state ? "Show pins" : "Hide pins";

    document.querySelectorAll(".map-pin").forEach(pin => {

        if(!pin.id.includes(myworld.name + "w-p")) return;
        
        if(!state) {
            pin.style.display = "block";
            myworld.positionAllMapPins();
        }
        else pin.style.display = "none";
    });
}

function clearLines(color=null){

    document.querySelectorAll(".controller").forEach(e => e.innerText = "Show all relationships");

    lines = Array.from(document.getElementsByTagName('svg'));
    for (var l of lines) {

        flag = true;
        if(color != null){

            const list = l.querySelectorAll("svg>g>use");
            for (let index = 0; index < list.length; index++) {
                const g = list.item(index);                

                const stroke_color = g.style.stroke;
                console.log(stroke_color + " " + color);
                if(stroke_color == color) {
                    flag = false;
                    break;
                }
            }
            
        }

        if(flag) l.remove();
    }
}

// Open new world
function openWorld(event, world, view=0){
    
    localStorage.setItem("ca-visit", world);

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {

        tablinks[i].className = tablinks[i].className.replace(" is-active", "");
        if(tablinks[i].innerText == world) tablinks[i].classList.add("is-active");
    }

    clearLines();

    let w = new World(world);
    myworld = w;

    document.getElementById(world).style.display = "block";

    //After creation
    w.establishRelations();
    defineGrabbable();
    
    //Lock page height
    const n_char = Math.floor(myworld.characters.length / 2);
    const height = n_char * (320 + 290);
    
    //document.getElementsByClassName("chara-container").item(0).style.height = height + "px";
    
    loadCharacterSelect();
    switchView(view);
}

class World {

    name = "";
    outline = "";
    characters = [];
    magic = [];

    output = "";
    divisions = [];

    lines = [];

    height = -1;

    world = {};
    events = [];
    calendar = [];
    
    animals = [];
    contributors = [];

    constructor(name){

        if(name=="") return;

        let dim = data.dimensions.find(w => w.name == name);

        this.name = dim.name;
        this.outline = dim.outline;
        this.characters = dim.characters;

        this.world = dim.world;
        this.events = dim.events;
        this.calendar = dim.calendar;

        this.animals = animals[name];
        if (dim.magic != undefined && dim.magic.pages.length % 2 != 0) dim.magic.pages.push("");
        this.magic = dim.magic;

        this.divisions = this.setupCharacters();
    }

    sortCharactersByAttribute = (attr) => {
        
        let sorted = false;
        while (!sorted){

            sorted = true;
            for (let index = 0; index < this.characters.length - 1; index++) {
                const current_role = this.characters[index][attr];
                const next_role = this.characters[index + 1][attr];

                if(current_role > next_role){

                    let save = this.characters[index];
                    this.characters[index] = this.characters[index + 1];
                    this.characters[index + 1] = save;

                    sorted = false;
                }
            }
        }
    }

    sortCharactersByName = () => {

        let subarrays = [];

        for (let index = 0; index < roles.length; index++) {
            
            let startIndex = 0;
            // Remove already checked characters
            let sliced_chara = this.characters.slice(
                subarrays.map(a => a.length).reduce((pre, cur) => pre + cur, 0), 
                this.characters.length
            );

            let endIndex = sliced_chara.indexOf(sliced_chara.find(c => c.role != index));
            if(endIndex == -1) endIndex = sliced_chara.length;

            subarrays.push(sliced_chara.slice(startIndex, endIndex));
        }

        // Sort each section alphabetically
        for (let index = 0; index < subarrays.length; index++) {
            
            var role_list = subarrays[index];
            //Sort this
            role_list.sort(function(a, b) {
                return a.name == b.name ? 0 : a.name < b.name ? -1 : 1;
            });
        }

        //Unite array
        this.characters = subarrays.flat(1);
    }

    setupCharacters(){

        if(this.characters.length == 0){
            return ["No characters to be displayed"];
        }

        //Order characters by role relevance and alphabetically
        this.sortCharactersByAttribute("role");
        if(data.settings.sort_characters_alphabetically) this.sortCharactersByName();

        this.output = `<p>Showing ${this.characters.length} characters</p>`;

        let chars = [];

        for (let index = 0; index < this.characters.length; index++) {
            const chara = this.characters[index];
            
            let container = document.createElement("div");
            container.className = "chara DraggableItem js-modal-trigger";
            container.setAttribute("data-target", "popup");

            container.draggable = true;
            container.id = this.name+ "c"+chara.id;
            
            let chara_image = document.createElement("img");
            chara_image.src = getResource(chara.image);
            chara_image.className = "chara-image";
            chara_image.style.borderColor = chara.highlight;

            
            let chara_name = document.createElement("p");
            chara_name.innerText = chara.name;
            chara_name.classList = "chara-name tooltip"
            
            chara_name.innerHTML += "<span class=\"tooltiptext\">" + roles[chara.role] + "</span>";

            let my_relations = document.createElement("button");
            my_relations.innerHTML = "<i class=\"fas fa-arrow-up\"></i>";
            my_relations.className = "button-4"
            my_relations.onclick = () => {

                block_popup = true;
                clearLines(chara.highlight);
            }
            
            container.appendChild(chara_image);
            //chara_name.appendChild(my_relations);
            container.appendChild(chara_name);

            container.addEventListener("click", () => {this.openPopUp(chara)})

            chars.push(container);
        }

        return chars;
    }

    subtitles = [];

    establishRelations(){

        clearLines();

        this.subtitles = [];

        document.querySelectorAll(".controller").forEach(e => e.innerText = "Hide all relationships");
        
        this.characters.forEach(chara => {
            if(chara.relations == undefined) return;
            chara.relations.forEach(relation => {

                const start = document.getElementById(this.name + 'c' + chara.id);
                if(start.style.display == "none") return;

                const end = document.getElementById(this.name + 'c' + relation.to);
                if(end.style.display == "none") return;
                
                const relationData = getRelationshipData(relation.details);
                if(!this.subtitles.includes(relation.details)) this.subtitles.push(relation.details);
                
                const settings = {
                    color: relationData.color,
                    size: data.settings.line_weight,
                    path: "sway",
                    startPlug: 'square',
                    dash: {animation: data.settings.arrow_animation}
                };

                //Check if is mutual relation
                if(data.settings.mix_mutual_relationships){

                    if(this.getChara(relation.to).relations !== undefined){

                        const mutual = this.getChara(relation.to).relations.find(r => r.to == chara.id);
                        if(mutual != undefined){
                            
                            // Double arrow
                            settings.startPlug = "arrow1";
                            // Inbetween color
                            const color1 = this.hexToRgb(color_codes[relationData.color]);
                            const color2 = this.hexToRgb(color_codes[getRelationshipData(mutual.details).color]);
        
                            const new_color = [
                                (color1[0] + color2[0]) / 2,
                                (color1[1] + color2[1]) / 2,
                                (color1[2] + color2[2]) / 2,
                            ];
        
                            settings.color = `rgb(${new_color.join(",")})`;
        
                            let index = this.getChara(relation.to).relations.indexOf(mutual);
                            if(relation.drawn == undefined) this.getChara(relation.to).relations[index].drawn = true;
                        }
                    }
                }

                if(data.settings.labels) settings["middleLabel"] = relationData.name;
                
                //Draw relation lines
                if(relation.drawn == undefined) {

                    new LeaderLine(
                        start,
                        end,
                        settings
                    );
                }
            });
        });
        
        // Draw subtitles
        document.querySelectorAll(".subtitles").forEach(sub => {

            if(sub.offsetParent == null) return;

            let innerHTML = "";
            for (let index = 0; index < this.subtitles.length; index++) {
                const subtitle = this.subtitles[index];
                
                const details = getRelationshipData(subtitle);
                innerHTML += "<div class='subtitle'> <div class='circle' style='background-color: "+ details.color +"'></div> <span>"+ details.name +"</span> </div>";
            }

            sub.innerHTML = innerHTML;
        })
    }

    drawMaps() {

        const container = document.createElement("div");
        if(this.world == undefined) {return container}

        container.innerHTML += `
            <button class='button' onclick="toggle_pins()" id="${myworld.name}pin_toggle">Hide pins</button>
            <button class="button" onclick="previous_map()">Previous</button>
            <button class="button" onclick="next_map()">Next</button>
            <br><br>
            <button class="button is-primary" onmouseup="unmerge()" onmousedown="merge_maps()">Merge maps (hold)</button>
        `;
        
        for (let index = 0; index < this.world.maps.length; index++) {
            const mapData = this.world.maps[index];
            
            const mapElement = document.createElement("div");
            mapElement.className = "map-width map-element" + (index == 0 ? " map-active" : "");
            mapElement.id = this.name + "w-m" + index;

            const mapName = document.createElement("h3");
            mapName.className = "title";
            mapName.innerText = mapData.name;

            const slideContainer = document.createElement("div");
            slideContainer.id = myworld.name + "slide";

            const mapImage = document.createElement("img");
            mapImage.className = "map-image";
            mapImage.src = getResource(mapData.image);

            mapElement.appendChild(mapName);
            mapElement.innerHTML += "<p>"+mapData.description+"</p>";

            const rule = document.createElement("div");
            rule.className = "map-rule";

            if(mapData.pins != undefined) {

                //Draw pins
                for (let j = 0; j < mapData.pins.length; j++) {
                    
                    const pin = mapData.pins[j];
                    const pinElement = document.createElement("img");

                    // Set pin type
                    const type = this.getDivision(pin.type);
                    pinElement.style.filter = "hue-rotate("+type.hue+"deg)";

                    pinElement.className = "map-pin tooltip";
                    pinElement.id = myworld.name + "w-p" + pin.location;
                    pinElement.setAttribute("origin", mapData.name);

                    const tooltip = document.createElement("span");
                    tooltip.innerText = pin.location;
                    tooltip.className = "tooltiptext";

                    pinElement.src = "https://upload.wikimedia.org/wikipedia/commons/e/ed/Map_pin_icon.svg";

                    pinElement.appendChild(tooltip);
                    rule.appendChild(pinElement);
                }
            }
            
            mapElement.appendChild(document.createElement("br"));
            slideContainer.appendChild(mapImage);
            rule.appendChild(slideContainer);
            rule.appendChild(slideContainer);

            // Draw region information
            const region = document.createElement("div");
            region.className = "fake-box region-data";
            region.id = myworld.name + "region-data";

            region.innerHTML = `
                <div class="m10">
                    <div id="details" class="m-5 is-flex is-justify-content-space-around">

                        <div class="is-flex is-justify-content-center">
                            <h2 class="title" id="${myworld.name}region_name">Region name</h2>
                            <img src="https://images.jifo.co/141438036_1685123167974.svg" class="flag" id='${myworld.name}flag' />
                        </div>
                        <button class="button is-primary" onclick="mapZoomOut()">Return to full map</button>
                    </div>
                </div>
                <p id="${myworld.name}desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore veritatis inventore sed ullam enim, dolor at culpa in, quod deserunt blanditiis! Pariatur officiis ipsa, facilis repellat odio sint inventore voluptatibus culpa sunt vero recusandae! Fugiat sapiente voluptas alias exercitationem eos tempora provident, ipsam, optio, modi vel deserunt iste repellat voluptatibus.</p>
                <hr />
                <div class="columns">
                    <div class="column">
                        <p><i class="fas fa-arrows"></i> <b>Area</b> <span id='${myworld.name}area'>100</span> m²</p>
                        <p><i class="fas fa-users"></i> <b>Population</b> <span id='${myworld.name}pop'>100</span> inhabitants</p>
                        <p><i class="fas fa-tint"></i> <b>Bodies of water</b> <span id='${myworld.name}water'>1, 2, 3</span></p>
                        <p><i class="fas fa-male"></i> <b>Denonym</b> <span id='${myworld.name}den'></span></p>
                        <p><i class="fas fa-balance-scale"></i> <b>Politics</b> <span id='${myworld.name}pol'></span></p>
                    </div>
                    <div class="column">
                        <p><i class="fas fa-coins"></i> <b>Economy</b> <span id='${myworld.name}econ'></span></p>
                        <p><i class="fas fa-trophy"></i> <b>Reputation</b> <span id='${myworld.name}rep'></span></p>
                        <p><i class="fas fa-sun"></i> <b>Climate</b> <span id='${myworld.name}cli'></span></p>
                        <p><i class="fa-solid fa-money-bill"></i> <b>Money</b> <span id='${myworld.name}mon'></span></p>
                        <p><i class="fa-solid fa-language"></i> <b>Language</b> <span id='${myworld.name}lang'></span></p>
                    </div>
                </div>
                <p><i class="fas fa-book"></i> <b>History</b> <br><br>
                    <span id='${myworld.name}hist'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore veritatis inventore sed ullam enim, dolor at culpa in, quod deserunt blanditiis! Pariatur officiis ipsa, facilis repellat odio sint inventore voluptatibus culpa sunt vero recusandae! Fugiat sapiente voluptas alias exercitationem eos tempora provident, ipsam, optio, modi vel deserunt iste repellat voluptatibus.
                    </span>
                </p>
                <hr />
                <p><i class="fa-solid fa-paw"></i> <b>Animals</b> <br><br>
                    <div class="is-flex is-flex-wrap-wrap is-justify-content-center" id='${myworld.name}ani'>
                    </div>
                </p>
                <hr />
                <p><i class="fa-solid fa-shirt"></i> <b>Clothing</b> <br><br>
                    <span id='${myworld.name}cloth'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore veritatis inventore sed ullam enim, dolor at culpa in, quod deserunt blanditiis! Pariatur officiis ipsa, facilis repellat odio sint inventore voluptatibus culpa sunt vero recusandae! Fugiat sapiente voluptas alias exercitationem eos tempora provident, ipsam, optio, modi vel deserunt iste repellat voluptatibus.
                    </span>
                </p>
                <img id="${myworld.name}landscape" src="https://i.kym-cdn.com/entries/icons/facebook/000/034/683/fumo.jpg">
                `;
                
            mapElement.appendChild(rule);

            mapElement.appendChild(document.createElement("br"));
            mapElement.appendChild(region);
            container.appendChild(mapElement);
        }

        return container;
    }

    positionAllMapPins() {

        if(this.world == undefined || this.world.maps == undefined) return;
        
        // Position all this map's pins

        [...document.querySelectorAll(".map-pin")]
        .filter(node => node.id.includes(myworld.name + "w-p") && node.offsetParent != null)
        .forEach(pin => {

            pin.style.opacity = 1;

            const pin_bounds = pin.parentElement.querySelector("img").getBoundingClientRect();
            const map_bounds = pin.parentElement.querySelector(".map-image").getBoundingClientRect();
            
            var xx = 0;
            var yy = 0;

            // Center the pin
            xx = xx - pin_bounds.width / 2;
            yy = yy - pin_bounds.height;

            // Get pin data
            const location = pin.id.split("w-p")[1];
            const map = pin.getAttribute("origin");

            const mapInfo = this.getMapPin(map, location);

            // Move percentage
            const moveHorizontal = map_bounds.width * (mapInfo.x / 100);
            const moveVertical = map_bounds.height * (mapInfo.y / 100);

            xx += moveHorizontal;
            yy += moveVertical;
            
            pin.style.left = xx + "px";
            pin.style.top = yy + "px";

            // Define click
            pin.addEventListener("mouseover", () => {

                const type = this.getDivision(mapInfo.type);

                // Set text
                document.getElementById("location").innerText = mapInfo.location;
                document.getElementById("description").innerHTML = mapInfo.description + (mapInfo.region_data == undefined ? "" : "<br><br><br><span><strong>click to read more</strong></span>");
                document.getElementById("division-type").innerText = type.name;

                mapPopup.style.opacity = 1;
                        
                const mapDimensions = mapPopup.getBoundingClientRect();

                mapPopup.style.left = (xx - mapDimensions.width / 2 + pin_bounds.width / 2) + "px";
                mapPopup.style.top = (yy - mapDimensions.height) + "px";
            });

            if(mapInfo.region_data != undefined ){

                pin.addEventListener("click", () => {

                    // Pin click
                    // Set the elements in the info tab

                    const current_region_data = document.querySelector(".map-active" + " .region-data");
                    current_region_data.style.display = "block";

                    const y = document.querySelector(".map-active" + " .region-data #details").getBoundingClientRect().top + window.scrollY;

                    current_region_data.querySelector(`[id="${myworld.name}region_name"]`).innerText = mapInfo.location;
                    current_region_data.querySelector(`[id="${myworld.name}desc"]`).innerText = mapInfo.description;
                    current_region_data.querySelector(`[id="${myworld.name}area"]`).innerText = mapInfo.region_data.area;
                    current_region_data.querySelector(`[id="${myworld.name}pop"]`).innerText = mapInfo.region_data.population;
                    current_region_data.querySelector(`[id="${myworld.name}water"]`).innerText = mapInfo.region_data.bodies_of_water.join(", ");
                    current_region_data.querySelector(`[id="${myworld.name}den"]`).innerText = mapInfo.region_data.demonym;
                    current_region_data.querySelector(`[id="${myworld.name}pol"]`).innerText = mapInfo.region_data.politics;
                    current_region_data.querySelector(`[id="${myworld.name}econ"]`).innerText = mapInfo.region_data.economy;
                    current_region_data.querySelector(`[id="${myworld.name}rep"]`).innerText = mapInfo.region_data.reputation;
                    current_region_data.querySelector(`[id="${myworld.name}cli"]`).innerText = mapInfo.region_data.climate;
                    current_region_data.querySelector(`[id="${myworld.name}mon"]`).innerText = mapInfo.region_data.money;
                    current_region_data.querySelector(`[id="${myworld.name}lang"]`).innerText = mapInfo.region_data.language;

                    current_region_data.querySelector(`[id="${myworld.name}hist"]`).innerText = mapInfo.region_data.history;
                    current_region_data.querySelector(`[id="${myworld.name}flag"]`).src = getResource(mapInfo.region_data.flag);

                    // Get region animals
                    const animal_container = current_region_data.querySelector(`[id="${myworld.name}ani"]`);
                    animal_container.innerHTML = "";
                    if(myworld.animals == undefined || mapInfo.region_data.animals.length == 0) {

                        animal_container.innerHTML = "This region doesn't have animals assigned"
                    }else mapInfo.region_data.animals.forEach(animal => {

                        const ani = myworld.animals[animal.toString()];
                        
                        const container = document.createElement("div");
                        container.className = "animal-card";
                        container.innerHTML = `
                            <img src='${getResource(ani.image)}' />
                            <h3 class="title is-4">${ani.name}</h3>
                            <p>${ani.outline.substring(0, 200) + (ani.outline.length >= 200 ? "..." : "")}</p>
                            <!-- more info -->
                            <div></div><br>
                        `;

                        const readmore = document.createElement("button");
                        readmore.className = "button";
                        readmore.innerText = "Read more";

                        readmore.onclick = () => {

                            if(readmore.innerText == "Read more"){
                                
                                // Amplify this shit
                                readmore.innerText = "Read less";
                                container.style.width = "100%";
                                
                                container.querySelector("p").innerText = ani.outline;

                            }else {

                                // Back to normal
                                readmore.innerText = "Read more";
                                container.style.width = "45%";
                                container.querySelector("p").innerText = ani.outline.substring(0, 200) + (ani.outline.length >= 200 ? "..." : "");
                            }
                        }

                        container.appendChild(readmore);
                        animal_container.appendChild(container);
                    });

                    //Show zoomed map
                    const map = this.getCurrentMap();
                    this.clearPins();

                    map.src = getResource(mapInfo.region_data.scenery[0]);
                    map.parentElement.querySelectorAll("img").forEach(i => {
                        if(i != map) i.remove();
                    });

                    mapInfo.region_data.scenery.forEach(m => {

                        if(m==mapInfo.region_data.scenery[0]) return;

                        const mapImage = document.createElement("img");
                        mapImage.src = getResource(m);
                        mapImage.className = "map-image";

                        map.parentElement.appendChild(mapImage);
                        $(`[id='${myworld.name}slide']`).cycle({ 
                            fx:    'zoom', 
                            sync:  false, 
                            delay: -2000 
                        });
                    });

                    //Scroll to them
                    window.scroll({
                        top: y,
                        behavior: 'smooth'
                    });
                });
            }

            pin.addEventListener("mouseleave", () => {
                mapPopup.style.opacity=0;
            });

        });
    }

    drawSpellBook() {

        if(this.magic == undefined) return document.createElement("span");

        const magicContainer = document.createElement("div");
        const outline = document.createElement("p");
        outline.innerText = this.magic.outline;

        outline.innerHTML += `
            <br>
            <hr>
            <div class="is-flex">
                <button id="prevP" onclick="previousMagicPage(-1)" class="button">Previous page</button>
                <button id="nextP" onclick="nextMagicPage(1)" class="button is-primary ml-2">Next page</button>
            </div>
        `;

        const pages = document.createElement("div");
        pages.className = "pages";
        pages.innerHTML = `
            <div id="left" class="pages-left">
                <div class="page-content">${this.magic.pages[currentMagicalPage]}</div>
            </div>

            <div id="right" class="pages-right"> 
                <div class="page-content">${this.magic.pages[currentMagicalPage+1]}</div>
            </div>
            </div>
        `;

        magicContainer.appendChild(outline);
        magicContainer.appendChild(pages);
        return magicContainer;
    }

    getCurrentMap(){

        return [...document.querySelectorAll(".map-image")].find(m => m.offsetParent != null);
    }

    clearPins(){

        [...document.querySelectorAll(".map-pin")]
        .filter(node => node.id.includes(myworld.name + "w-p") && node.offsetParent != null)
        .forEach(pin => {

            pin.style.opacity = 0;
        });
    }

    hexToRgb(hex, result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)) {
        return result ? result.map(i => parseInt(i, 16)).slice(1) : null
        //returns [r, g, b]
    }

    replaceNameWithHyperLinks(text, self="") {

        if(!data.settings.show_hyperlinks_in_character_bio) return text;

        for (let index = 0; index < this.characters.length; index++) {
            const chara = this.characters[index];

            if(self != "" && chara.name == self) continue;
            
            text = text.replaceAll(
                chara.name,
                `<a href='#0' onclick="popupOf('${chara.id}')">${chara.name}</a>`
            );
        }

        return text;
    }

    setupTagFilters() {

        // Set up tag filters
        var uniqueTags = [...new Set(this.characters.map(c => c.tags).flat(1))];

        const sorter = document.getElementById(this.name + "chara-sorter");
        sorter.innerHTML = "";

        uniqueTags.forEach(tag => {

            if(tag==undefined) return;

            const ele = document.createElement("a");
            ele.href = "#0";
            ele.className = "dropdown-item"
            ele.innerText = tag;

            sorter.appendChild(ele);
        });
    }

    openPopUp(chara){

        popup.scrollTop = 0;
        popup.style.zIndex = 1000;

        // Check if user can edit this character
        const edit = document.getElementById("edit");
        const del = document.getElementById("delete");
        const al = document.getElementById("alert");

        edit.removeAttribute("disabled")
        del.removeAttribute("disabled")

        al.innerText = "This character belongs to you";
        al.className = "has-text-success";

        if(myuser !== undefined){

            let myemail = myuser.email;
            if(chara.creators.find(c => getCreator(c).email == myemail) === undefined){
    
                //alert(chara.creators.find(c => getCreator(c).email == myemail))
                edit.setAttribute("disabled", true)
                del.setAttribute("disabled", true)
            
                al.innerText = "This character is not yours";
                al.className = "has-text-danger";
            }
        } else {

            edit.setAttribute("disabled", true)
            del.setAttribute("disabled", true)
        
            al.innerText = "Log in to edit your characters";
            al.className = "has-text-info";
        }

        popup.setAttribute("character-id", chara.id);

        document.getElementById("image").src = getResource(chara.image);

        document.getElementById("name").innerText = chara.name;
        document.getElementById("outline").innerHTML = this.replaceNameWithHyperLinks(chara.biography, chara.name);

        document.getElementById("personality").innerText = "";
        if(chara.personality != undefined) document.getElementById("personality").innerText = chara.personality.join(", ");

        document.getElementById("species").innerText = chara.species;
        document.getElementById("age").innerText = chara.age;
        document.getElementById("gender").innerText = chara.gender;
        document.getElementById("occupation").innerText = chara.occupation;
        document.getElementById("height").innerText = chara.height + " cm";
        document.getElementById("weight").innerText = chara.weight + " kg";
        document.getElementById("bloodtype").innerText = chara.bloodtype;
        document.getElementById("birthdate").innerText = chara.birthdate;
        document.getElementById("birthplace").innerText = chara.birthplace;
        document.getElementById("fullname").innerHTML = chara.full_name;
        document.getElementById("sexuality").innerHTML = chara.sexuality == -1 ? "" : `<img class='sex-flag' src='${getFlagOf(sexuality[chara.sexuality])}' />`;

        const notes = document.getElementById("notes");
        if(chara.notes == "" || chara.notes == undefined || chara.notes == "undefined"){

            notes.parentNode.parentNode.style.display = "none";
        }else{

            notes.parentNode.parentNode.style.display = "block";
            notes.innerText = chara.notes;
        }

        document.getElementById("pinterest").onclick = () => {

            if(chara.pinterest == "") popUpNotification("No folder specified", 1);
            else window.open(chara.pinterest, "_blank");
        };

        document.getElementById("spotify").onclick = () => {
            
            if(chara.spotify == "") popUpNotification("No playlist specified",1);
            else window.open(chara.spotify, "_blank");
        };

        document.getElementById("likes").innerHTML = "";
        document.getElementById("hates").innerHTML = "";
        
        if(chara.likes != undefined && chara.likes.length > 0) document.getElementById("likes").innerHTML = "<li>" + chara.likes.join("</li><li>") + "</li>";
        if(chara.hates != undefined && chara.hates.length > 0) document.getElementById("hates").innerHTML = "<li>" + chara.hates.join("</li><li>") + "</li>";

        const rel = document.getElementById("relations");
        rel.innerHTML = "";
        
        if(chara.relations != undefined) rel.innerHTML = chara.relations.map(rel => `<p class="relation"><img src="${getResource(this.getChara(rel.to).image)}" /> &nbsp; Related to &nbsp;<a onclick="popupOf(${rel.to})" href="#0"> ${this.idToName(rel.to)}</a>: ${getRelationshipData(rel.details).name}</p>`).join("");

        if (chara.relations == undefined || chara.relations.length == 0) rel.innerHTML = "No relationships established"

        const creator = document.getElementById("creators");
        creator.innerHTML = chara.creators.map(c => `<span class="tag"><p><b>${getCreator(c).name}</b>${
            getCreator(c).socials == "" ? " no social media to display" : (getCreator(c).socials.map(s => `
                <a target="_blank" href="${s.link}">${s.name}</a>
          `).join(", "))
        }</p><a onclick="removeCharacterCreator(${c})" class="tag is-delete"></a></span>`).join("");
    }

    idToName(id){

        return this.characters.find(c => c.id == id).name || "Not found";
    }

    getChara(id){

        return this.characters.find(c => c.id == id) || null;
    }

    nameToId(name){

        return this.characters.find(c => c.name == name).id ;
    }

    getMapPin(map, pin){

        const world = this.world.maps.find(m => m.name == map);
        return world.pins.find(p => p.location == pin);
    }

    getDivision(type) {

        return this.world.divisions.find(d => d.id == type);
    }

    getMapDataFromIndex(index) {

        return this.world.maps[parseInt(index)];
    }
} 

// Start template world
let myworld = new World("");

function switchView(view){

    const panel = [
        document.getElementById(`${myworld.name}-cv`),
        document.getElementById(`${myworld.name}-wo`),
        document.getElementById(`${myworld.name}-et`),
        document.getElementById(`${myworld.name}-cl`),
        document.getElementById(`${myworld.name}-mg`)
    ];

    if(panel[view].className.includes("disabled")) {

        popUpNotification(`${myworld.name}'s file does not have a "${panel[view].innerText}" attribute configured yet`, 2);
        return;
    }

    for (let i = 0; i < panel.length; i++) panel[i].className = panel[i].className.replace("is-primary", "");
    panel[view].className += " is-primary";

    // Fetch views
    const character_view = document.getElementById(`${myworld.name}-chara-container`);
    const world_view = document.getElementById(`${myworld.name}-world-container`);
    const event_view = document.getElementById(`${myworld.name}-event-container`);
    const calendar_view = document.getElementById(`${myworld.name}-calendar-container`);
    const magic_view = document.getElementById(`${myworld.name}-magic-container`);

    switch (view) {
        // Character display
        case 0:

            magic_view.style.display = "none";
            character_view.style.display = "block";
            world_view.style.display = "none";
            event_view.style.display = "none";
            calendar_view.style.display = "none";
            myworld.establishRelations();
            
            break;
        // World overview
        case 1:

            magic_view.style.display = "none";
            world_view.style.display = "block";
            character_view.style.display = "none";
            event_view.style.display = "none";
            calendar_view.style.display = "none";
            clearLines();

            myworld.positionAllMapPins();

            break;
        // Event timeline
        case 2:

            magic_view.style.display = "none";
            event_view.style.display = "block";
            character_view.style.display = "none";
            world_view.style.display = "none";
            calendar_view.style.display = "none";
            clearLines();

            break;
        // Calendar
        case 3:

            magic_view.style.display = "none";
            calendar_view.style.display = "block";
            character_view.style.display = "none";
            world_view.style.display = "none";
            event_view.style.display = "none";
            clearLines();

            break;
        // Magic
        case 4:

            magic_view.style.display = "block";
            calendar_view.style.display = "none";
            character_view.style.display = "none";
            world_view.style.display = "none";
            event_view.style.display = "none";
            clearLines();
            break;
    }
}

function parse() {

    console.log(data);

    document.getElementById("loader").style.display = "none";

    document.getElementById("highlight").innerHTML = Object.entries(color_codes).map(c => `<option class="outline" style="color: ${c[1]}" value="${c[0]}">${c[0]}</option>`).join("3");

    popup = document.getElementById("popup");
    mapPopup = document.getElementById("map-popup");

    // Set up page
    const tagHolder = document.getElementById("tags");
    tagHolder.innerHTML = "";

    const worldHolder = document.getElementById("worlds");
    worldHolder.innerHTML = "";

    data.dimensions.forEach(element => {

        let world = new World(element.name);
        myworld = world;
        
        let tab = document.createElement("a")
        tab.onclick = () => {openWorld(event, element.name)}
        tab.innerText = element.name;

        const li = document.createElement("li");
        li.className = "tablinks"
        li.appendChild(tab);
        
        tagHolder.appendChild(li);
        
        let content = document.createElement("div");
        content.id = element.name;
        content.className = "tabcontent";

        content.innerHTML = "<h2 class='title'>"+element.name+"</h2>";

        const outline = document.createElement("p");
        outline.className = "world-outline";
        outline.innerText = element.outline;
        
        content.appendChild(outline);
        content.innerHTML += "<hr><h3 class='title is-4'>World contributtors</h3>";

        let creators = [];
        for(let i = 0; i < myworld.characters.length; i++)    
            for(let j = 0; j < myworld.characters[i].creators.length; j++){

                const creator = myworld.characters[i].creators[j];
                if(!creators.includes(creator)) creators.push(creator);
            }
        myworld.contributors = creators.map(c => getCreator(c));

        creators = creators.map(c => "<span class='tag is-link is-medium is-light'>" + getCreator(c).name + "</span>").join(" ");

        const creatornames = document.createElement("div");
        creatornames.innerHTML = creators;

        content.appendChild(creatornames);

        // Add view switch panels
        const view_panel = `
            <hr />
            <button onclick='switchView(0)' id="${myworld.name}-cv" class='button is-medium' ${myworld.characters == undefined ? " disabled" : ""}><span class="icon"><i class="fa-solid fa-person"></i> </span><span>Character view</span></button>
            <button onclick='switchView(1)' id="${myworld.name}-wo" class='button is-medium' ${myworld.world == undefined ? " disabled" : ""}><span class="icon"><i class="fa-solid fa-earth"></i> </span><span>World overview</span></button>
            <button onclick='switchView(2)' id="${myworld.name}-et" class='button is-medium' ${myworld.events == undefined ? " disabled" : ""}><span class="icon"><i class="fa-solid fa-timeline"></i> </span><span>Event timeline</span></button>
            <button onclick='switchView(3)' id="${myworld.name}-cl" class='button is-medium' ${myworld.calendar == undefined ? " disabled" : ""}><span class="icon"><i class="fa-solid fa-calendar"></i> </span><span>Calendar</span></button>
            <button onclick='switchView(4)' id="${myworld.name}-mg" class='button is-medium' ${myworld.magic == undefined ? " disabled" : ""}><span class="icon"><i class="fa-solid fa-wand-magic-sparkles"></i> </span><span>Magic</span></button>
        `;

        content.innerHTML += view_panel;
        content.appendChild(document.createElement("hr"));

        // ---------CHARACTER VIEW---------

        const cView = document.createElement("div");
        cView.id = myworld.name + "-" + "chara-container";

        const controller = `
            <div class="block">

                <button class='button controller' onclick='relationship_control()'>Hide all relationships</button>
                <button onclick='reset_positions()' class='button'>Reset character positions</button>
                
                <div id="sorter${myworld.name}" class="dropdown">
                    <div class="dropdown-trigger">
                        <button class="button" aria-haspopup="true" onclick="toggle_sorter()" aria-controls="dropdown-menu">
                        <span>Sort by tags</span>
                        <span class="icon is-small">
                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                            </button>
                            </div>
                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                        <div class='dropdown-content' id="${myworld.name}chara-sorter">
                        </div> 
                        </div>
                    </div>
                        
                        ${myuser=== undefined ? "" : 
                            (
                                (myworld.contributors.map(c => c.email).includes(myuser.email)) ? 
                                `
                                    <br />
                                    <br />
                                    <button data-target='popup' onclick='open_creator()' class='js-modal-trigger button is-rounded is-success'>
                                        <span class='icon'>
                                            <i class='fas fa-user'></i>
                                        </span>
                                        <span>Create new character</span>
                                    </button>
                                    
                                    <button class='button is-rounded is-info ml-3 js-modal-trigger' data-target="collaborator">
                                        <span class='icon'>
                                            <i class='fas fa-pen'></i>
                                        </span>
                                        <span>Add world collaborator</span>
                                    </button>
                                    ` 
                                    : ""
                                )}
                <br /><br /><br />
                <! -- form for shit and maybe el menu -->
                <div class="">
                    <form name="search">
                        <input maxlength=80 id="${myworld.name}search" type="text" placeholder="Search" oninput="searchUpdate()" class="input" name="txt">
                    </form>
                </div>

                <div class="subtitles is-flex is-flex-wrap-wrap">
                    <div class="subtitle"> <div class="circle"></div> <span>Text</span></div>
                    <div class="subtitle"> <div class="circle"></div> <span>Text</span></div>
                    <div class="subtitle"> <div class="circle"></div> <span>Text</span></div>
                </div>

                <br><br><br>
            </div>`;
        cView.innerHTML += controller;
        
        worldHolder.appendChild(content);
        
        let dom = document.createElement("div");
        dom.className = "is-flex is-flex-wrap-wrap m30 is-justify-content-center";
        
        for (let index = 0; index < world.divisions.length; index++) dom.append(world.divisions[index]);
        cView.append(dom);

        // ---------WORLD OVERVIEW---------
        const wView = document.createElement("div");
        wView.id = myworld.name + "-" + "world-container";
        
        const map_container = document.createElement("div");
        map_container.className = "map-container";
        //map_container.innerHTML += "<h2>" +myworld.name+ "'s cartography</h2>";

        let map_data = myworld.drawMaps();
        map_container.appendChild(map_data);

        wView.appendChild(map_container);
        
        // ---------EVENT TIMELINE---------
        const eView = document.createElement("div");
        eView.id = myworld.name + "-" + "event-container";
        
        var title = document.createElement("h2");
        title = document.createElement("h2");
        title.innerText = myworld.name + "'s chronological events"
        
        eView.appendChild(title);

        // --------- CALENDAR ---------
        const clView = document.createElement("div");
        clView.id = myworld.name + "-" + "calendar-container";
        
        var title = document.createElement("h2");
        title = document.createElement("h2");
        title.innerText = myworld.name + "'s holidays n shit"
        
        clView.appendChild(title);

        // ---------- Magic ---------
        const mgView = document.createElement("div");
        mgView.id = myworld.name + "-magic-container";
        const mTitle = document.createElement("p");
        mTitle.innerText = myworld.name + "'s magic system";
        mTitle.className = "title";

        mgView.appendChild(mTitle);
        let magic_data = myworld.drawSpellBook();
        mgView.appendChild(magic_data);
        
        // Append views
        content.appendChild(cView);
        content.appendChild(wView);
        content.appendChild(eView);
        content.appendChild(clView);
        content.appendChild(mgView);

        myworld.setupTagFilters();
        
        setTriggers();
        adjustMagicPage();
    });

    document.addEventListener("mouseup", () => {
        if(ismerging) {
            ismerging = false;
            unmerge();
        }
    });

    var coll = document.getElementsByClassName("char_sorter");
    var i;

    for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {

        if(this.nextElementSibling.childElementCount == 0){

            popUpNotification("This characters don't have any tags assigned", 2)
            return;
        }

        var content = this.nextElementSibling;
        if (content.style.display === "block") {
        content.style.display = "none";
        } else {
        content.style.display = "block";
        }
    });
    }

    // Open first world

    openWorld(event, localStorage.getItem("ca-visit") == undefined ? data.dimensions[0].name : localStorage.getItem("ca-visit"), 0);

    parserFinishedCallback();
}

function toggle_sorter() {

    const sorter = document.getElementById("sorter" + myworld.name);
    if(sorter.classList.contains("is-active")) sorter.classList.remove("is-active");
    else sorter.classList.add("is-active");
}

// Dragging and dropping elements
function defineGrabbable(restore = false, xx=0, yy=0){

    var draggableItems = Array.from(
        document.querySelectorAll(".DraggableItem")
    );
    console.log(`There are ${draggableItems.length} draggable items.`);

    //Loop over each draggable item and add the listeners
    for (var i = 0; i < draggableItems.length; i++) {
        var element = draggableItems[i];

        //console.log(element.getBoundingClientRect());

        if(element.offsetParent == null) continue;

        element.setAttribute("rel-x", element.getBoundingClientRect().left);
        element.setAttribute("rel-y", element.getBoundingClientRect().top + window.scrollY);

        dragElement(element);
    }

    function dragElement(ele) {
        //Listen for whenever the element is clicked
        ele.addEventListener("mousedown", dragMouseDown);

        //vars to hold the listeners after the mouse
        var mouseMoveListener;
        var mouseUpListener;

        //Save the mouse offset on the element, so it will not snap to top left corner when starting to drag
        var offsetX = 0,
            offsetY = 0;

        function dragMouseDown(e) {

            var e = window.event;
            if(e.which != 3) return;
            
            //Set the offsets
            offsetX = e.offsetX;
            offsetY = e.offsetY;
            //Add the listeners
            mouseMoveListener = window.addEventListener("mousemove", elementDrag);
            mouseUpListener = window.addEventListener("mouseup", dragMouseUp);
        }
        function dragMouseUp(e) {

            //Check placing validity
            var e = window.event;
            if(e.which != 3) return;

            //remove the listeners, which stops teh element from following the mouse
            mouseMoveListener = window.removeEventListener(
                "mousemove",
                elementDrag
            );
            mouseUpListener = window.removeEventListener("mouseup", dragMouseUp);

            clearLines();
            myworld.establishRelations();

            saveIconsPositions();
        }
        function elementDrag(e) {

            //console.log(ele.getAttribute("rel-x"));

            //move the element
            ele.style.position = "relative";
            ele.style.left = e.clientX - offsetX - ele.getAttribute("rel-x") + "px";
            ele.style.top = e.clientY - offsetY - ele.getAttribute("rel-y") + window.scrollY + "px";
        }
    }
}

function delete_chara(){

    const chara = getCurrentCharacterPopUpData();
    const val = confirm(`Are you sure you want to delete ${chara.name} from ${myworld.name}?\nThis action can't be undone.`);

    if (val) {

        globalThis.updateDatabaseValue({}, `characters/${myworld.name}/${chara.id}`).then((result) => {
        
                window.location.reload();
        });;
    }
}

// Exports the character information to json format
function export_data(){

    const chara = getCurrentCharacterPopUpData();
    var dataStr = "data:txt/json;charset=utf-8," + encodeURIComponent(
        JSON.stringify(chara)
    );

    var dla = document.getElementById("downloadAnchor");
    dla.setAttribute("href", dataStr);
    dla.setAttribute("download", chara.name.trim().replace(" ", "-") + ".json");
    
    dla.click();
}

function toggle_edit(values=null){

    if( values == event) values = null;
    
    const edit_toggle = document.getElementById("edit");
    edit_toggle.children.item(1).innerText = "Back to normal";
    edit_toggle.onclick = exit_editor;
    
    const n = document.getElementById("next_c")
    n.innerText = "Save changes";
    n.onclick = () => {
     
        saveNewCharacterInformation(DatabaseOperations.UPDATE);
    }
    
    const p = document.getElementById("prev_c")
    p.innerText = "Close editor";
    p.onclick = exit_editor;
    
    const c = document.getElementById("creators");
    document.getElementById("edit-only").style.display = 'block';

    edit_toggle.style.display = values == null ? 'inline-flex' : 'none';
    document.getElementById("export").style.display = values == null ? 'inline-flex' : 'none';
    document.getElementById("delete").style.display = values == null ? 'inline-flex' : 'none';
    document.getElementById("alert").style.display = values == null ? 'block' : 'none';
    c.style.display = values == null ? 'block' : 'none';
    
    document.getElementById("notes").parentNode.parentNode.style.display = "block";

    document.getElementById("popupbody").scrollTop = 0;

    // Fill metadata 
    const chara = values == null ? getCurrentCharacterPopUpData() : values;

    document.getElementById("highlight").value = chara.highlight;
    document.getElementById("spotify-input").value = chara.spotify;
    document.getElementById("pinterest-input").value = chara.pinterest;
    document.getElementById("role").value = chara.role;

    if(chara.tags != undefined) document.getElementById("tags-input").innerHTML = chara.tags.map(t => `
        <div class="field has-addons"><div class="control"><input class="input" type="text" value="${t}"></div>
            <div class="control">
                <a onclick="removeThisPersonalityTrait()" class="button is-danger">
                    Delete
                </a>
            </div>`
    ).join();
  
    // Turn readonly editable components to read/write components
    document.querySelectorAll('[editable="true"]').forEach((comp) => {
        
        const conversionData = dataConversionLookupMap[comp.id];

        if(conversionData === undefined) return;
        const targetElement = conversionData.target;

        let writableComponent;

        
        if(targetElement != "textarea"){
            
            if(targetElement == "list"){
                
                var createListElementAdequate = () => {};

                writableComponent = document.createElement("div");
                let list = values == null ? getCurrentCharacterPopUpData()[conversionData.data.dataKey] : values[conversionData.data.dataKey];

                if(conversionData.data.elementTarget == "rel"){

                    createListElementAdequate = (element) => {

                        const group = document.createElement("div");
                        group.className = "field has-addons";

                        const control = document.createElement("div");
                        control.className = "control";

                        const ele = document.createElement("div");
                        ele.className = "select";

                        let myname = values == null ? getCurrentCharacterPopUpData().name : values.name;
                        ele.innerHTML = `
                        <select>
                            ${
                                myworld.characters.filter(n => n.name != myname).map(c => "<option " + (element === undefined ? "": (c.id==element.to ? "selected" : "")) + ">" + c.name + "</option>")
                            }
                        </select>`;

                        group.innerHTML += `
                        <p class="control">
                                <span class="select">
                                <select>
                                    ${
                                        Object.entries(data.relations).map(r => "<option "+ (element === undefined ? "" : (r[0] == element.details ? "selected": "")) +">" + r[1].name + "</option>")
                                    }
                                </select>
                                </span>
                            </p>
                        `;

                        ele.defaultValue = element === undefined ? "" : getRelationshipData(element.details).name;

                        control.appendChild(ele);
                        group.appendChild(control);
                        group.innerHTML += `
                        <div class="control">
                            <a onclick="removeThisPersonalityTrait()" class="button is-danger">
                            Delete
                            </a>
                        </div>
                        `;

                        return group;
                    }

                }else if (!conversionData.data.constant){

                    createListElementAdequate = (element) => {

                        const group = document.createElement("div");
                        group.className = "field has-addons";

                        const control = document.createElement("div");
                        control.className = "control";
                        
                        const ele = document.createElement("input");
                        ele.className = "input";
                        ele.type = conversionData.data.elementTarget;

                        ele.defaultValue = element || "";

                        control.appendChild(ele);
                        group.appendChild(control);
                        group.innerHTML += `
                        <div class="control">
                            <a onclick="removeThisPersonalityTrait()" class="button is-danger">
                            Delete
                            </a>
                        </div>
                        `;

                        return group;
                    }
                } 

                if(conversionData.data.constant){

                    const container = document.createElement("div");
                    container.className = "select";
                    
                    const select = document.createElement("select");
                    select.id = conversionData.data.newID;
                    select.innerHTML = "<option value='-1'>None</option>" + conversionData.data.source.map((item, index) => `<option value=${index}>${item} </option> `).join("");

                    container.appendChild(select);
                    writableComponent.appendChild(container);

                }else{
    
                    if(list !== undefined) for(let i = 0; i < list.length; i++){
    
                        var ele;                    
                        
                        ele = createListElementAdequate(list[i]);
                        writableComponent.appendChild(ele);
                    }
    
                    const append = document.createElement("button");
                    append.className = "button is-primary";
                    append.innerText = "Create new item";
                    append.onclick = () => {
    
                        const group = createListElementAdequate();
                        writableComponent.insertBefore(group, append);
                    }
    
                    writableComponent.appendChild(append);
                }

            }else{
                
                writableComponent = document.createElement("input");
                writableComponent.type = targetElement;
                writableComponent.className = comp.className;
    
                writableComponent.classList.add("input");
            }
        }
        else {

            writableComponent = document.createElement(targetElement);
            writableComponent.className = comp.className;
            
            writableComponent.classList.add("textarea");
        }

        writableComponent.id = comp.id;
        writableComponent.setAttribute("editable", "true");
        if(conversionData.origin == "img")
            writableComponent.value = values == null ? comp.src : values.image;
        else
            writableComponent.value = values == null ? (targetElement == "number" ? parseInt(comp.innerText) : comp.innerText) : (values[dataConversionLookupMap[comp.id].dataKey] == undefined ? values[comp.id] : values[dataConversionLookupMap[comp.id].dataKey]);
        
        writableComponent.placeholder = comp.id;

        comp.replaceWith(writableComponent);
    });

    document.getElementById("sexuality-selector").value = chara.sexuality;
}

function exit_editor() {

    document.getElementById("edit-only").style.display = 'none';
    const edit_toggle = document.getElementById("edit");
    edit_toggle.children.item(1).innerText = "Edit character data";
    edit_toggle.onclick = toggle_edit;
    
    const n = document.getElementById("next_c")
    n.innerText = "Next character";
    n.onclick = next_popup;

    const p = document.getElementById("prev_c")
    p.innerText = "Previous character";
    p.onclick = previous_popup;
    
    const c = document.getElementById("creators");
    edit_toggle.style.display = 'inline-flex';
    document.getElementById("export").style.display = 'inline-flex';
    document.getElementById("delete").style.display = 'inline-flex';
    document.getElementById("alert").style.display = 'block';
    c.style.display = 'block';

    const chara = getCurrentCharacterPopUpData();

    if(chara != null && chara.notes == "")
    document.getElementById("notes").parentNode.parentNode.style.display = "none";
  
    // Turn readonly editable components to read/write components
    document.querySelectorAll('[editable="true"]').forEach((comp) => {
        
        if(dataConversionLookupMap[comp.id] === undefined) return;
        const targetElement = dataConversionLookupMap[comp.id].origin;

        if(targetElement=="rel"){

            comp.innerhtml = "";
            
            if (chara != null && chara.relations != undefined) comp.innerHTML = chara.relations.map(rel => `<p class="relation"><img src="${getResource(myworld.getChara(rel.to).image)}" /> &nbsp; Related to &nbsp;<a onclick="popupOf(${rel.to})" href="#0"> ${myworld.idToName(rel.to)}</a>: ${getRelationshipData(rel.details).name}</p>`).join("");
            if (chara != null && (chara.relations == undefined || chara.relations.length == 0)) comp.innerHTML = "No relationships established";

            return;
        }

        let readonlyComponent = document.createElement(targetElement);

        readonlyComponent.id = comp.id;
        readonlyComponent.className = comp.className.replace("input", "").replace("textarea", "");

        readonlyComponent.attributes = comp.attributes;

        if(targetElement == "img") readonlyComponent.src = getResource(comp.value);
        else readonlyComponent.innerText = comp.value;
        readonlyComponent.setAttribute("editable", "true");

        comp.replaceWith(readonlyComponent);
    });
}

function removeThisPersonalityTrait(trait) {

    window.event.target.parentElement.parentElement.remove();
}

function saveNewCharacterInformation(operation=DatabaseOperations.UPDATE){

    var currentTarget;
    currentTarget = popup.getAttribute("character-id") == -1 ? emptyCharacterTemplate : getCurrentCharacterPopUpData();

    for (let field in dataConversionLookupMap) {
        
        const element = document.getElementById(field);
        if(element === undefined) continue;

        let name = element.tagName.toLowerCase();

        switch (name) {
            case "textarea":
            case "input":

                if(element.value == undefined || element.value == "undefined") continue;
                
                field = dataConversionLookupMap[field].dataKey || field;
                currentTarget[field] = element.value;
                break;
            case "div":
                
            if(field == "relations") {

                let thisRelations = [];
                element.querySelectorAll(".field").forEach((item) => {

                    const selectionBoxes = [...item.querySelectorAll("select")];
                    // 0 = relation type; 1 = relation partner
                    
                    const relationDetailsId = Object.entries(data.relations).filter(r => r[1].name==selectionBoxes[0].value)[0][0];
                    const relationPartnerId = myworld.nameToId(selectionBoxes[1].value);

                    const relationReference = {
                        details: parseInt(relationDetailsId),
                        to: parseInt(relationPartnerId)
                    }

                    thisRelations.push(relationReference);
                });

                currentTarget[field] = thisRelations;

            }else {

                // General list
                let thisList = [];
                element.querySelectorAll(".field input").forEach((item) => {thisList.push(item.value)});
                currentTarget[field] = thisList;
            }

            default:break;
        }
    }
    currentTarget.sexuality = document.getElementById("sexuality-selector").value;

    // Save the metadata
    currentTarget.highlight = document.getElementById("highlight").value;
    currentTarget.role = document.getElementById("role").value;
    currentTarget.spotify = document.getElementById("spotify-input").value;
    currentTarget.pinterest = document.getElementById("pinterest-input").value;

    let thisList = [];
    document.querySelectorAll("#tags-input input").forEach((item) => {thisList.push(item.value)});
    currentTarget.tags = thisList;

    // Update database information
    //console.log(currentTarget);

    switch (operation) {
        case DatabaseOperations.UPDATE:
            
            globalThis.updateDatabaseValue(currentTarget, `/characters/${myworld.name}/${currentTarget.id}`).then((result) => {
        
                data.dimensions.find(d => d.name == myworld.name)[currentTarget.id] = currentTarget;
        
                exit_editor();
        
                popupOf(currentTarget.id);
                myworld.establishRelations();
                parse();

                popUpNotification(`${currentTarget.name} was just edited`, 0);
            });
            break;
    
        case DatabaseOperations.CREATE:

            // Define a new id
            let lastID = -1;
            myworld.characters.forEach(chara => {
                if (chara.id > lastID) lastID = chara.id;
            });

            lastID++;
            
            currentTarget.id = lastID;
            currentTarget.creators = [getCreatorByEmail(myuser.email).id];

            globalThis.createDatabaseValue(
                currentTarget,
                `characters/${myworld.name}/${currentTarget.id}`
            );

            popUpNotification(`${currentTarget.name} was created into ${myworld.name} successfully`, 0);
            closeAllModals();

            break;
    }
}

function loadCharacterSelect(){

    const characterOptions = myworld.characters.filter(c => c.creators.includes(getCreatorByEmail(myuser.email).id)).map(c => `<option value=${c.id}>${c.name}</option>`).join("");
    document.getElementById("character-list").innerHTML = characterOptions;
    collaborationLinkSwap();
}

function addCollaborator(){

    const selectedCharacter = document.getElementById("character-list").value;
    const creator = document.getElementById("creator-mail").value;

    const person = getCreatorByEmail(creator);
    if(person == undefined){

        popUpNotification("Can't find " + creator + " as a registered creator", 1);
        return;
    }

    if (document.getElementById("character-list").hasAttribute("disabled")){

        let editedCounter = 0;
        myworld.characters.forEach(chara => {

            // Skip characters who already have this creator assigned and characters which dont belong to us
            let myid = getCreatorByEmail(myuser.email).id;
            if(!chara.creators.includes(person.id) && chara.creators.includes(myid)) {

                chara.creators.push(person.id);
                globalThis.updateDatabaseValue(chara, `/characters/${myworld.name}/${chara.id}`).then((result) => {
            
                    popUpNotification(`${person.name} is now a collaborator of ${chara.name}`, 0);
                });

                editedCounter++;   
            }
        });

        popUpNotification(`Edited ${editedCounter} total characters`, 0);

    }else{
    
        // Get this character's current creators
        const charaObj = myworld.getChara(selectedCharacter);
        if(charaObj.creators.includes(person.id)){
    
            popUpNotification(creator + " is already a contributor for this character", 2);
            return;
        }
    
        charaObj.creators.push(person.id);
        globalThis.updateDatabaseValue(charaObj, `/characters/${myworld.name}/${charaObj.id}`).then((result) => {
            
            popUpNotification(`${person.name} is now a collaborator of ${charaObj.name}`, 0);
        });
    }
}

function removeCharacterCreator(creator) {

    if(myuser == undefined){
        popUpNotification("You can't remove this creator", 1)
        return;
    }

    const chara = getCurrentCharacterPopUpData();
    const person = getCreator(creator);
    if (person.email == myuser.email){
        popUpNotification("You can't remove yourself from the creator list", 1)
        return;
    }

    // Check if your part of creator list
    if(!chara.creators.includes(getCreatorByEmail(myuser.email).id)){
        popUpNotification("You can't remove creators from a character you don't own", 1)
        return;
    }

    const removeIndex = chara.creators.indexOf(creator);
    chara.creators.splice(removeIndex, 1);
    
    globalThis.updateDatabaseValue(chara, `/characters/${myworld.name}/${chara.id}`).then((result) => {
        
        popUpNotification(`${person.name} is no longer a collaborator of ${chara.name}`, 0);

        popupOf(chara.id);
    });
}

function collaborationLinkSwap(){

    const value = document.getElementById("one-chara").checked;
    if(!value) document.getElementById("character-list").setAttribute("disabled", true);
    else document.getElementById("character-list").removeAttribute("disabled");
}

function open_creator(){

    popup.setAttribute("character-id", -1);
    toggle_edit(emptyCharacterTemplate);
    
    const create = document.getElementById("next_c");
    create.innerText = "Create new character";

    create.onclick = () => {saveNewCharacterInformation(DatabaseOperations.CREATE);}

    document.getElementById("prev_c").onclick = closeAllModals;
}

function createTag(){

    const group = document.createElement("div");
    group.className = "field has-addons";

    const control = document.createElement("div");
    control.className = "control";

    const ele = document.createElement("input");
    ele.className = "input";
    ele.type = "text";

    ele.defaultValue = "";

    control.appendChild(ele);
    group.appendChild(control);
    group.innerHTML += `
    <div class="control">
        <a onclick="removeThisPersonalityTrait()" class="button is-danger">
        Delete
        </a>
    </div>
    `;

    document.getElementById("tags-input").appendChild(group);
}

function nextMagicPage(amount) {

    if(amount == 0) return;

    if (document.querySelectorAll(".turning, .unturning").length > 0) return;
        
    if (myworld.magic.pages[currentMagicalPage + amount * 2 + 1] == undefined){
        
        popUpNotification("This is the last page", 2);
        return;
    }
    
    currentMagicalPage += amount * 2;
    const l = document.getElementById("left");
    const r = document.getElementById("right");

    r.classList.add("turning");

    r.onanimationend = () => {

        r.classList.remove("turning");
        l.classList.add("unturning");
        
        r.innerHTML = myworld.magic.pages[currentMagicalPage + 1];
        l.innerHTML = myworld.magic.pages[currentMagicalPage ]
    };

    l.onanimationend = () => {

        l.classList.remove("unturning");
    };
}

function previousMagicPage(amount) {

    if(amount == 0) return;

    if (document.querySelectorAll(".turning, .unturning").length > 0) return;
    
    
    if (myworld.magic.pages[currentMagicalPage + amount * 2] == undefined){
        
        popUpNotification("This is the first page", 2);
        return;
    }
    currentMagicalPage += amount * 2;

    const l = document.getElementById("left");
    const r = document.getElementById("right");

    l.classList.add("turning");

    l.onanimationend = () => {

        l.classList.remove("turning");
        r.classList.add("unturning");
        
        r.innerHTML = myworld.magic.pages[currentMagicalPage + 1];
        l.innerHTML = myworld.magic.pages[currentMagicalPage]
    };

    r.onanimationend = () => {

        r.classList.remove("unturning");
    };
}

function checkCreatorValidity(){

    if(myuser == undefined) {
        popUpNotification("You need to log in to request a creator account", 2);
        closeAllModals();
        return;
    }else{

        // Check if already a creator / already requested
        if(getCreatorByEmail(myuser.email) != undefined){
            popUpNotification("You already are a creator", 1);
            closeAllModals();
            return;
        }

        if(data.applications.find(a => a.email == myuser.email)){
            popUpNotification("You already requested an application", 1);
            closeAllModals();
            return;
        }

        document.getElementById("creator-email").value = myuser.email;
        document.getElementById("creator-name").value = myuser.displayName;
    }
}

const socialList = ["Twitter", "Instagram", "Reddit", "Github"];
function createApplication(){

    const name = document.getElementById("creator-name").value;
    const email = document.getElementById("creator-email").value;
    const message = document.getElementById("creator-message").value;
    const agree = document.getElementById("creator-agree").checked;

    const socials = [];
    socialList.forEach(s => socials.push({link: document.getElementById(`creator-${s}`).value, name: s }));

    if(!agree){
        popUpNotification("You must agree with the terms and conditions", 2);
        return;
    }

    if(getCreatorByName(name) != undefined){
        popUpNotification("A creator with the name " + name + " already exists", 2); 
        return;
    }

    if(message.trim() == "" || name.trim() == "" || name.lenght > 16){
        popUpNotification("Message and/or name can't be empty / too long", 2);
        return;
    }

    // Sucess!
    // Get send date & app id
    const date = new Date().toLocaleDateString();
    let id = 0;
    data.applications.forEach(a => id = a.id >= id ? a.id : id);

    const request = {
        id: (id + 1),
        date: date,
        email: email,
        name: name,
        message: message,
        socials: socials
    }

    globalThis.createDatabaseValue(request, `applications/${id}`);
    popUpNotification("Application submited", 0);
    closeAllModals();
    window.location.reload();
}