import { Component } from "../components.js";
import { Dimension } from "./dimension.js";
import { InfoLevel } from "./info.js";

export class Universe extends Component {

    constructor(props = {}) {
        super(props);
        this.state = {
            tab: 0,
        };
    }

    onMount() {


        let id = -1;
        if (myuser != undefined) id = getThisId();

        this.dimensions = [];
        data.dimensions.forEach(dimension => {

            let creators = [];

            // Fill all found creators
            let n = dimension.characters.length;
            for (let i = 0; i < n; i++) {
                
                // get character from object
                let character = Object.values(dimension.characters)[i];
                if (character == undefined) {
                    continue; // skip if undefined
                }
                
                creators.push(...character.creators);
            }

            // Select random character
            let characterWithImage = dimension.characters.filter(character => character.image != undefined && character.image != "" && character.image != null && !character.image.includes("chara-archive.web.app/resources"));
            let randomCharacter = characterWithImage[Math.floor(Math.random() * characterWithImage.length)];

            creators = [...new Set(creators)];
            if (!dimension.public && !creators.includes(id)){
                return;
            }

            const dimensionComponent = new Dimension({
                name: dimension.name,
                outline: dimension.outline,
                createDate: dimension.create_date,
                public: dimension.public,
                creators: creators,
                image: randomCharacter.image,
            });

            this.dimensions.push(
                {
                    code: dimensionComponent.code(),
                    is_mine: id == -1 ? false : creators.includes(id),
                }
            );
        });
    }

    renderElement() {

        let dimCode = "";
        let temp = this.dimensions;

        if (this.state.tab == 1 && myuser == undefined) {

            popUpNotification("You need to be logged in to see your worlds!", 2);
            this.setState({ tab: 0 });
        }

        if (this.state.tab == 1)
            temp = this.dimensions.filter(dim => dim.is_mine);

        temp.forEach(dim => {
            dimCode += `<div class="column">${dim.code}</div>`;
        });

        if (dimCode == "") {
            dimCode = "<div class='column'>Nothing to see here D:</div>";
        }

        const level = new InfoLevel();
        data.components.level = level;

        let universe_block = this.state.tab == 0 ? `
            <section>                
                <section class="section">
                    <h1 class="title">The character archive universe!</h1>
                    <h2 class="subtitle">
                        Explore the wonderful worlds created by the community!
                    </h2>
                </section>
                <div class="columns">
                    ${dimCode}
                </div>
            </section>

            ${level.code()}
        ` : `
            <section class="section">

                <h1 class="title">My worlds!</h1>
                <div class="columns">
                    ${dimCode}
                </div>
            </section>
        `;

        return `
            <br>
            <div class="tabs is-centered is-boxed is-medium" >
            <ul>
                <li class="${this.state.tab == 0 ? "is-active" : ""}" onclick=swapTab(0)>
                <a>
                    <span>Public worlds!</span>
                </a>
                </li>
                <li class="${this.state.tab == 1 ? "is-active" : ""}" onclick=swapTab(1)>
                <a>
                    <span>My stuff</span>
                </a>
                </li>
            </ul>
            </div>
            ${universe_block}
        `;
    }
}