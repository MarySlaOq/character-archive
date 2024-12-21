// component class
export class Component {
  
    constructor(props = {}) {
    this.props = props;
    this.state = {};
  }
  
    setState(state) {

        this.state = Object.assign({}, this.state, state);
        this.render();
    }

    mount(parent) {

        this.parent = parent;

        this.onMount();
        
        this.render();
        parent.appendChild(this.element);

        this.mounted = true;
    }

    code(){
        return this.renderElement();
    }

    render() {

        const content = this.renderElement();

        if (this.mounted) {
            this.element.innerHTML = content;
        }else {            

            this.element = document.createElement('div');
            this.element.innerHTML = content;
        }
        
        this.afterRender();
    }

    onMount() {
        // Placeholder for child classes
    }

    afterRender() {
        // Placeholder for child classes
    }

    renderElement() {
        // Placeholder for child classes
    }
}