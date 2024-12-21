import { Component } from "../components.js";
import { Universe } from "./universe.js";

export class Profile extends Component {

    constructor(props = {}) {

        super(props);

        this.state = {
            tab: 0,
        };

        this.undefined = `
            <div class="container">
            <h1 class="title">Profile not found</h1>
            <p> The profile you are looking for does not exist. </p>
            </div>
        `;
    }

    renderElement() {

        
        if (this.props.user == null || this.props.user == "" || this.props.user == undefined) return this.undefined

        const user = getCreatorByName(this.props.user);
        if (user == undefined) return this.undefined;

        const universe = new Universe({user: user});

        return `
            <div class="container">
                <div>
                    <h1 class="title">Profile of ${this.props.user}</h1>
                    <a class="tag is-light ${tagColors[user.access]}">${accessRightss[user.access]}</a>
                </div>
                <hr />

                ${universe.code()}
            </div>
        `;

    }
}