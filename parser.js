const file = document.getElementById("script").src;
console.log(data);

// Hello hello <3 hai o7
//lets get back to work!! :flex:

const color_codes = {
     "aliceblue":"#f0f8ff", "antiquewhite":"#faebd7", "aqua":"#00ffff", "aquamarine":"#7fffd4", "azure":"#f0ffff", "beige":"#f5f5dc", "bisque":"#ffe4c4", "black":"#000000", "blanchedalmond":"#ffebcd", "blue":"#0000ff", "blueviolet":"#8a2be2", "brown":"#a52a2a", "burlywood":"#deb887", "cadetblue":"#5f9ea0", "chartreuse":"#7fff00", "chocolate":"#d2691e", "coral":"#ff7f50", "cornflowerblue":"#6495ed", "cornsilk":"#fff8dc", "crimson":"#dc143c", "cyan":"#00ffff", "darkblue":"#00008b", "darkcyan":"#008b8b", "darkgoldenrod":"#b8860b", "darkgray":"#a9a9a9", "darkgreen":"#006400", "darkkhaki":"#bdb76b", "darkmagenta":"#8b008b", "darkolivegreen":"#556b2f", "darkorange":"#ff8c00", "darkorchid":"#9932cc", "darkred":"#8b0000", "darksalmon":"#e9967a", "darkseagreen":"#8fbc8f", "darkslateblue":"#483d8b", "darkslategray":"#2f4f4f", "darkturquoise":"#00ced1", "darkviolet":"#9400d3", "deeppink":"#ff1493", "deepskyblue":"#00bfff", "dimgray":"#696969", "dodgerblue":"#1e90ff", "firebrick":"#b22222", "floralwhite":"#fffaf0", "forestgreen":"#228b22", "fuchsia":"#ff00ff", "gainsboro":"#dcdcdc", "ghostwhite":"#f8f8ff", "gold":"#ffd700", "goldenrod":"#daa520", "gray":"#808080", "green":"#008000", "greenyellow":"#adff2f",
     "honeydew":"#f0fff0", "hotpink":"#ff69b4", "indianred ":"#cd5c5c", "indigo":"#4b0082", "ivory":"#fffff0", "khaki":"#f0e68c", "lavender":"#e6e6fa", "lavenderblush":"#fff0f5", "lawngreen":"#7cfc00", "lemonchiffon":"#fffacd", "lightblue":"#add8e6", "lightcoral":"#f08080", "lightcyan":"#e0ffff", "lightgoldenrodyellow":"#fafad2", "lightgrey":"#d3d3d3", "lightgreen":"#90ee90", "lightpink":"#ffb6c1", "lightsalmon":"#ffa07a", "lightseagreen":"#20b2aa", "lightskyblue":"#87cefa", "lightslategray":"#778899", "lightsteelblue":"#b0c4de", "lightyellow":"#ffffe0", "lime":"#00ff00", "limegreen":"#32cd32", "linen":"#faf0e6", "magenta":"#ff00ff", "maroon":"#800000", "mediumaquamarine":"#66cdaa", "mediumblue":"#0000cd", "mediumorchid":"#ba55d3", "mediumpurple":"#9370d8", "mediumseagreen":"#3cb371", "mediumslateblue":"#7b68ee",  "mediumspringgreen":"#00fa9a", "mediumturquoise":"#48d1cc", "mediumvioletred":"#c71585", "midnightblue":"#191970", "mintcream":"#f5fffa", "mistyrose":"#ffe4e1", "moccasin":"#ffe4b5", "navajowhite":"#ffdead", "navy":"#000080", "oldlace":"#fdf5e6", "olive":"#808000", "olivedrab":"#6b8e23", "orange":"#ffa500", "orangered":"#ff4500", "orchid":"#da70d6", "palegoldenrod":"#eee8aa",
     "palegreen":"#98fb98", "paleturquoise":"#afeeee", "palevioletred":"#d87093", "papayawhip":"#ffefd5", "peachpuff":"#ffdab9", "peru":"#cd853f", "pink":"#ffc0cb", "plum":"#dda0dd", "powderblue":"#b0e0e6", "purple":"#800080", "rebeccapurple":"#663399", "red":"#ff0000", "rosybrown":"#bc8f8f", "royalblue":"#4169e1", "saddlebrown":"#8b4513", "salmon":"#fa8072", "sandybrown":"#f4a460", "seagreen":"#2e8b57", "seashell":"#fff5ee", "sienna":"#a0522d", "silver":"#c0c0c0", "skyblue":"#87ceeb", "slateblue":"#6a5acd", "slategray":"#708090", "snow":"#fffafa", "springgreen":"#00ff7f", "steelblue":"#4682b4", "tan":"#d2b48c", "teal":"#008080", "thistle":"#d8bfd8", "tomato":"#ff6347", "turquoise":"#40e0d0", "violet":"#ee82ee", "wheat":"#f5deb3", "white":"#ffffff", "whitesmoke":"#f5f5f5", "yellow":"#ffff00", "yellowgreen":"#9acd32"
}

// Prevent right click
document.addEventListener('contextmenu', event => event.preventDefault());

// Create window resize dragging safety
window.addEventListener("resize", (event) => {

    defineGrabbable(true, 
        0, 
        0
    );
})

var block_popup = false;
var my_top = -1;

const popup = document.getElementById("popup");
const mapPopup = document.getElementById("map-popup");

function getCreator(id){ return data.people.find(p => p.id == id); }

function getRelationshipData(id){ return data.relations[id]; }

function getResource(name){

    return "resources/" + name;
}

const roles = ["Main character", "Supporting character", "Arc character", "Background character"];
class World {

    name = "";
    outline = "";
    characters = [];

    output = "";
    divisions = [];

    lines = [];

    height = -1;

    world = {};
    events = [];
    calendar = [];

    constructor(name){

        if(name=="") return;

        let dim = data.dimensions.find(w => w.name == name);

        this.name = dim.name;
        this.outline = dim.outline;
        this.characters = dim.characters;

        this.world = dim.world;
        this.events = dim.events;
        this.calendar = dim.calendar;

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
            container.className = "chara DraggableItem";
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

        this.subtitles = [];

        document.querySelectorAll(".controller").forEach(e => e.innerText = "Hide all relationships");
        
        this.characters.forEach(chara => {
            chara.relations.forEach(relation => {

                const start = document.getElementById(this.name + 'c' + chara.id);
                const end = document.getElementById(this.name + 'c' + relation.to);

                
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
            <button class='button-30' onclick="toggle_pins()" id="${myworld.name}pin_toggle">Hide pins</button>
            <button class="button-30" onclick="previous_map()">Previous</button>
            <button class="button-30" onclick="next_map()">Next</button>
            <br><br>
            <button class="button-30" onmouseup="unmerge()" onmousedown="merge_maps()">Merge maps (hold)</button>
        `;
        
        for (let index = 0; index < this.world.maps.length; index++) {
            const mapData = this.world.maps[index];
            
            const mapElement = document.createElement("div");
            mapElement.className = "map-element" + (index == 0 ? " map-active" : "");
            mapElement.id = this.name + "w-m" + index;

            const mapName = document.createElement("h3");
            mapName.innerText = mapData.name;

            const mapImage = document.createElement("img");
            mapImage.className = "map-image";
            mapImage.src = getResource(mapData.image);

            mapElement.appendChild(mapName);
            mapElement.innerHTML += "<p>"+mapData.description+"</p>";

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
                    mapElement.appendChild(pinElement);
                }
            }
            
            mapElement.appendChild(mapImage);

            // Draw region information
            const region = document.createElement("div");
            region.className = "region-data";
            region.id = myworld.name + "region-data";

            region.innerHTML = `
                <div id="details" class="container3">
                    <h2 id="${myworld.name}region_name">Region name</h2>
                    <img src="https://images.jifo.co/141438036_1685123167974.svg" class="flag" id='${myworld.name}flag' />
                </div>
                <p id="${myworld.name}desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore veritatis inventore sed ullam enim, dolor at culpa in, quod deserunt blanditiis! Pariatur officiis ipsa, facilis repellat odio sint inventore voluptatibus culpa sunt vero recusandae! Fugiat sapiente voluptas alias exercitationem eos tempora provident, ipsam, optio, modi vel deserunt iste repellat voluptatibus.</p>
                <div class="traits">
                    <p><i class="fas fa-arrows"></i> <b>Area</b> <span id='${myworld.name}area'>100</span> m²</p>
                    <p><i class="fas fa-users"></i> <b>Population</b> <span id='${myworld.name}pop'>100</span> inhabitants</p>
                    <p><i class="fas fa-tint"></i> <b>Bodies of water</b> <span id='${myworld.name}water'>1, 2, 3</span></p>
                    <p><i class="fas fa-male"></i> <b>Denonym</b> <span id='${myworld.name}den'></span></p>
                    <p><i class="fas fa-balance-scale"></i> <b>Politics</b> <span id='${myworld.name}pol'></span></p>
                    <p><i class="fas fa-coins"></i> <b>Economy</b> <span id='${myworld.name}econ'></span></p>
                    <p><i class="fas fa-trophy"></i> <b>Reputation</b> <span id='${myworld.name}rep'></span></p>
                    <p><i class="fas fa-sun"></i> <b>Climate</b> <span id='${myworld.name}cli'></span></p>
                    <p><i class="fa-solid fa-money-bill"></i> <b>Money</b> <span id='${myworld.name}mon'></span></p>
                    <p><i class="fa-solid fa-language"></i> <b>Language</b> <span id='${myworld.name}lang'></span></p>
                </div>
                <p><i class="fas fa-book"></i> <b>History</b> <br><br>
                    <span id='${myworld.name}hist'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore veritatis inventore sed ullam enim, dolor at culpa in, quod deserunt blanditiis! Pariatur officiis ipsa, facilis repellat odio sint inventore voluptatibus culpa sunt vero recusandae! Fugiat sapiente voluptas alias exercitationem eos tempora provident, ipsam, optio, modi vel deserunt iste repellat voluptatibus.
                    </span>
                </p>
                <img id="${myworld.name}landscape" src="https://i.kym-cdn.com/entries/icons/facebook/000/034/683/fumo.jpg">
                <p><i class="fa-solid fa-paw"></i> <b>Animals</b> <br><br>
                    <span id='${myworld.name}ani'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore veritatis inventore sed ullam enim, dolor at culpa in, quod deserunt blanditiis! Pariatur officiis ipsa, facilis repellat odio sint inventore voluptatibus culpa sunt vero recusandae! Fugiat sapiente voluptas alias exercitationem eos tempora provident, ipsam, optio, modi vel deserunt iste repellat voluptatibus.
                    </span>
                </p>
                <img id="${myworld.name}landscape" src="https://i.kym-cdn.com/entries/icons/facebook/000/034/683/fumo.jpg" />
                <p><i class="fa-solid fa-shirt"></i> <b>Clothing</b> <br><br>
                    <span id='${myworld.name}cloth'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore veritatis inventore sed ullam enim, dolor at culpa in, quod deserunt blanditiis! Pariatur officiis ipsa, facilis repellat odio sint inventore voluptatibus culpa sunt vero recusandae! Fugiat sapiente voluptas alias exercitationem eos tempora provident, ipsam, optio, modi vel deserunt iste repellat voluptatibus.
                    </span>
                </p>
                <img id="${myworld.name}landscape" src="https://i.kym-cdn.com/entries/icons/facebook/000/034/683/fumo.jpg">
                
                `;

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
            
            var xx = map_bounds.left;
            var yy = (map_bounds.top + window.scrollY);

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
    
                    document.getElementById(myworld.name + "region-data").style.display = "block";

                    const y = document.getElementById("details").getBoundingClientRect().top + window.scrollY;

                    window.scroll({
                        top: y,
                        behavior: 'smooth'
                    });

                    document.getElementById(`${myworld.name}region_name`).innerText = mapInfo.location;
                    document.getElementById(`${myworld.name}desc`).innerText = mapInfo.description;
                    document.getElementById(`${myworld.name}area`).innerText = mapInfo.region_data.area;
                    document.getElementById(`${myworld.name}pop`).innerText = mapInfo.region_data.population;
                    document.getElementById(`${myworld.name}water`).innerText = mapInfo.region_data.bodies_of_water.join(", ");
                    document.getElementById(`${myworld.name}den`).innerText = mapInfo.region_data.demonym;
                    document.getElementById(`${myworld.name}pol`).innerText = mapInfo.region_data.politics;
                    document.getElementById(`${myworld.name}econ`).innerText = mapInfo.region_data.economy;
                    document.getElementById(`${myworld.name}rep`).innerText = mapInfo.region_data.reputation;
                    document.getElementById(`${myworld.name}cli`).innerText = mapInfo.region_data.climate;
                    document.getElementById(`${myworld.name}mon`).innerText = mapInfo.region_data.money;
                    document.getElementById(`${myworld.name}lang`).innerText = mapInfo.region_data.language;

                    document.getElementById(`${myworld.name}hist`).innerText = mapInfo.region_data.history;
                    document.getElementById(`${myworld.name}flag`).src = getResource(mapInfo.region_data.flag);
                    document.getElementById(`${myworld.name}landscape`).src = getResource(mapInfo.region_data.scenery);
                });
            }

            pin.addEventListener("mouseleave", () => {
                mapPopup.style.opacity=0;
            });
        });
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

    openPopUp(chara){

        if(block_popup){

            block_popup = false;
            return;
        }


        popup.scrollTop = 0;

        popup.style.zIndex = 1000;
        popup.style.opacity = 1;

        document.getElementById("blinds").style.opacity = 1;
        document.getElementById("blinds").style.zIndex = 200;

        document.getElementById("image").src = getResource(chara.image);

        document.getElementById("name").innerText = chara.name;
        document.getElementById("outline").innerHTML = this.replaceNameWithHyperLinks(chara.biography, chara.name);
        document.getElementById("personality").innerText = chara.personality.join(", ")

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

        const notes = document.getElementById("notes");
        if(chara.notes == ""){

            notes.parentNode.style.display = "none";
        }else{

            notes.parentNode.style.display = "block";
            notes.innerText = chara.notes;
        }

        document.getElementById("pinterest").onclick = () => {

            if(chara.pinterest == "") alert("No folder specified");
            else window.open(chara.pinterest, "_blank");
        };

        document.getElementById("spotify").onclick = () => {
            
            if(chara.spotify == "") alert("No playlist specified");
            else window.open(chara.spotify, "_blank");
        };

        document.getElementById("likes").innerHTML = "<li>" + chara.likes.join("</li><li>") + "</li>";
        document.getElementById("hates").innerHTML = "<li>" + chara.hates.join("</li><li>") + "</li>";

        const rel = document.getElementById("relations");
        rel.innerHTML = chara.relations.map(rel => `<p class="relation"><img src="${getResource(this.getChara(rel.to).image)}" /> Related to <a onclick="popupOf(${rel.to})" href="#0">${this.idToName(rel.to)}</a>: ${getRelationshipData(rel.details).name}</p>`).join("");

        if (chara.relations.length == 0) rel.innerHTML = "No relationships established"

        const creator = document.getElementById("creators");
        creator.innerHTML = chara.creators.map(c => `<p><b>${getCreator(c).name}</b>${
            getCreator(c).socials.map(s => ` <a href="${s.link}">${s.name}</a>`).join(", ")
        }</p>`).join("");
    }

    idToName(id){

        return this.characters.find(c => c.id == id).name || "Not found";
    }

    getChara(id){

        return this.characters.find(c => c.id == id) || null;
    }

    nameToId(name){

        return this.characters.find(c => c.name == name).id || null;
    }

    getMapPin(map, pin){

        const world = this.world.maps.find(m => m.name == map);
        return world.pins.find(p => p.location == pin);
    }

    getDivision(type) {

        return this.world.divisions.find(d => d.id == type);
    }
}

function switchView(view){

    const panel = [
        document.getElementById(`${myworld.name}-cv`),
        document.getElementById(`${myworld.name}-wo`),
        document.getElementById(`${myworld.name}-et`),
        document.getElementById(`${myworld.name}-cl`)
    ];

    if(panel[view].className.includes("blocked")) {

        alert(`${myworld.name}'s file does not have a "${panel[view].innerText}" attribute configured yet`);
        return;
    }

    for (let i = 0; i < panel.length; i++) panel[i].className = panel[i].className.replace("active", "");
    panel[view].className += " active";

    // Fetch views
    const character_view = document.getElementById(`${myworld.name}-chara-container`);
    const world_view = document.getElementById(`${myworld.name}-world-container`);
    const event_view = document.getElementById(`${myworld.name}-event-container`);
    const calendar_view = document.getElementById(`${myworld.name}-calendar-container`);

    switch (view) {
        // Character display
        case 0:
            character_view.style.display = "block";
            world_view.style.display = "none";
            event_view.style.display = "none";
            calendar_view.style.display = "none";
            myworld.establishRelations();
            
            break;
        // World overview
        case 1:
            world_view.style.display = "block";
            character_view.style.display = "none";
            event_view.style.display = "none";
            calendar_view.style.display = "none";
            clearLines();

            myworld.positionAllMapPins();

            break;
        // Event timeline
        case 2:
            event_view.style.display = "block";
            character_view.style.display = "none";
            world_view.style.display = "none";
            calendar_view.style.display = "none";
            clearLines();

            break;
        // Callendar
        case 3:
            calendar_view.style.display = "block";
            character_view.style.display = "none";
            world_view.style.display = "none";
            event_view.style.display = "none";
            clearLines();

            break;
    }
}

function previous_map(){

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

// Start template world
let myworld = new World("");

// Set up page
document.getElementById("title").innerText = file;
const tagHolder = document.getElementById("tags");
const worldHolder = document.getElementById("worlds");

data.dimensions.forEach(element => {

    let world = new World(element.name);
    myworld = world;
    
    let tab = document.createElement("button")
    tab.className = "tooltip";
    tab.onclick = () => {openWorld(event, element.name)}
    tab.innerText = element.name;
    
    tagHolder.appendChild(tab);
    
    let content = document.createElement("div");
    content.id = element.name;
    content.className = "tabcontent";

    content.innerHTML = "<h2 class='tooltip world_name'>"+element.name+"</h2>";

    const outline = document.createElement("p");
    outline.className = "world-outline";
    outline.innerText = element.outline;
    
    content.appendChild(outline);
    content.innerHTML += "<h3>World contributtors</h3>";

    let creators = [];
    for(let i = 0; i < myworld.characters.length; i++)    
        for(let j = 0; j < myworld.characters[i].creators.length; j++){

            const creator = myworld.characters[i].creators[j];
            if(!creators.includes(creator)) creators.push(creator);
        }

    creators = creators.map(c => getCreator(c).name).join(", ");

    const creatornames = document.createElement("p");
    creatornames.innerText = creators;

    content.appendChild(creatornames);

    // Add view switch panels
    const view_panel = `
        <button onclick='switchView(0)' id="${myworld.name}-cv" class='button-6${myworld.characters == undefined ? " blocked" : ""}'>Character view</button>
        <button onclick='switchView(1)' id="${myworld.name}-wo" class='button-6${myworld.world == undefined ? " blocked" : ""}'>World overview</button>
        <button onclick='switchView(2)' id="${myworld.name}-et" class='button-6${myworld.events == undefined ? " blocked" : ""}'>Event timeline</button>
        <button onclick='switchView(3)' id="${myworld.name}-cl" class='button-6${myworld.calendar == undefined ? " blocked" : ""}'>Calendar</button>
    `;

    content.innerHTML += view_panel;
    content.appendChild(document.createElement("hr"));

    // ---------CHARACTER VIEW---------

    const cView = document.createElement("div");
    cView.id = myworld.name + "-" + "chara-container";

    const controller = `
        <div>
            <button class='button-30 controller' onclick='relationship_control()'>Hide all relationships</button>
            <button onclick='reset_positions()' class='button-30'>Reset character positions</button>

            <div class="subtitles">
                <div class="subtitle"> <div class="circle"></div> <span>Text</span></div>
                <div class="subtitle"> <div class="circle"></div> <span>Text</span></div>
                <div class="subtitle"> <div class="circle"></div> <span>Text</span></div>
            </div>

            <br><br><br>
        </div>`;
    cView.innerHTML += controller;
    
    worldHolder.appendChild(content);
    
    let dom = document.createElement("div");
    dom.className = "chara-container";
    
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

    // --------- CALLENDAR---------
    const clView = document.createElement("div");
    clView.id = myworld.name + "-" + "calendar-container";
    
    var title = document.createElement("h2");
    title = document.createElement("h2");
    title.innerText = myworld.name + "'s holidays n shit"
    
    clView.appendChild(title);
    
    // Append views
    content.appendChild(cView);
    content.appendChild(wView);
    content.appendChild(eView);
    content.appendChild(clView);
});

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
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
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
    
    switchView(view);
}

// Merge all the maps
function merge_maps(){

    myworld.clearPins();

    //Close region data pop up
    document.getElementById(myworld.name + "region-data").style.display = "none";

    const start_height = document.getElementById(myworld.name).getBoundingClientRect().height;

    const otherMaps = [];
    const offsets = [];

    let map_n = 1;

    var currentMap = null;

    document.querySelectorAll(".map-image").forEach(map => {

        if(currentMap==null) currentMap = map.offsetParent != null ? map : null;
        if(map.parentElement.id.split("w-m")[0] != myworld.name || map.offsetParent != null) return;
        
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
        // mais 3.5 porque offsets gostam de me comer o cu
        const this_height = offsets.reduce((a, b) => a + b + 3.5, 0);

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

function popupOf(who){

    let chara = myworld.getChara(who);
    myworld.openPopUp(chara);
}

function next_popup(){

    const mychar = document.getElementById("name").innerText;
    let id = myworld.nameToId(mychar) + 1;

    if(id >= myworld.characters.length) id = 0;
    popupOf(id);
}

function previous_popup(){

    const mychar = document.getElementById("name").innerText;
    let id = myworld.nameToId(mychar) - 1;

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
        
        if(!state) pin.style.display = "block";
        else pin.style.display = "none";

        myworld.positionAllMapPins();
    });
}

function reset_positions() {

    document.querySelectorAll(".chara").forEach(character => {

        // Dont change if in different world
        if(character.offsetParent == null) return;

        character.style.left = 0;
        character.style.top = 0;

        clearLines();
        myworld.establishRelations();
    })
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

        if (!element.hasAttribute("rel-x") || restore) element.setAttribute("rel-x", element.getBoundingClientRect().left);
        if (!element.hasAttribute("rel-y") || restore) element.setAttribute("rel-y", element.getBoundingClientRect().top + window.scrollY);

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
        }
        function elementDrag(e) {

            //move the element
            ele.style.position = "relative";
            ele.style.left = e.clientX - offsetX - ele.getAttribute("rel-x") + "px";
            ele.style.top = e.clientY - offsetY - ele.getAttribute("rel-y") + window.scrollY + "px";
        }
    }
}

// Open first world
openWorld(event, data.dimensions[0].name, 1);