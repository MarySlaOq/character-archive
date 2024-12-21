import { Component } from "../components.js";

export class InfoLevel extends Component {

    constructor(props = {}) {
        super(props);
        this.state = {
        };
    }

    renderElement() {

        let characterCount = 0;
        data.dimensions.forEach(dimension => {
            characterCount += dimension.characters.length;
        });

        return `
            <section class="section">
                <h1 class="title">Community</h1>
                <h2 class="subtitle">
                    Thank you for being a part of the community. Here are some stats about the character archive!
                </h2>
            </section>
            <nav class="level">
            <div class="level-item has-text-centered">
                <div>
                <p class="heading">Worlds</p>
                <p class="title">${data.dimensions.length}</p>
                </div>
            </div>
            <div class="level-item has-text-centered">
                <div>
                <p class="heading">Characters</p>
                <p class="title">${characterCount}</p>
                </div>
            </div>
            <div class="level-item has-text-centered">
                <div>
                <p class="heading">Artists</p>
                <p class="title">${Object.keys(data.people).length}</p>
                </div>
            </div>
            </nav>
            <br>
        `;
    }
}