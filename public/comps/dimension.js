import { Component } from '../components.js';

export class Dimension extends Component {

    constructor(props = {}) {
        super(props);
        this.state = {
        };
    }

    renderElement() {

        const maxOutlineLength = 100;
        let outline = this.props.outline;

        if (outline.length > maxOutlineLength) {
            outline = outline.substring(0, maxOutlineLength) + "...";
        }

        let creators = [];
        this.props.creators.forEach(creator => {
            
            // get person from object
            let person = Object.values(data.people).find(person => person.id == creator);
            if (person == undefined) {
                return; // skip if undefined
            }
        
            creators.push(makeTag(person));
        });

        let creatorsString = creators.join(" ");

        let dateString = "Here since the beggining";
        if (this.props.createDate != undefined) {
            dateString = `Created on ${this.props.createDate}`;
        }

        let icon = this.props.public ? "fa-user-group" : "fa-eye-slash";
        let designation = this.props.public ? "Public" : "Private";

        return `
            <div class="card dimension" id="card-dimension-${this.props.name}" onclick="openDimension('${this.props.name}')">
                <div class="card-image">
                    <figure class="image" >
                    <img
                        class = "dim-icon"
                        src="${this.props.image}"
                        alt="Character from this dimension"
                    />
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media">
                    <div class="media-content">

                        <p class="title is-4">
                        <span class="tooltip"><span class=\"tooltiptext\">${designation} dimension</span><i class="fa-solid ${icon}"></span></i> 
                        ${this.props.name}</p> 
                    </div>
                    </div>

                    <div class="content">
                    ${outline}
                    <hr />
                    <span class="tag is-light">${dateString}</span>
                    <br/>
                    ${creatorsString}
                    </div>
                </div>
            </div>
        `;
    }
}