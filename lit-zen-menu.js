import { LitElement, html } from 'lit-element';
import { ZenMenuSelectionElement } from './lit-zen-menu-selection.js';

class ZenMenuElement extends LitElement {

  static get properties() {
    return {
      xp: {
        // notify: true,
        type: Number
      },
      menu: {
        type: String
      }
    }
  }

  render() {
    return html`
      <style> .xp { color: orange;   display: block;  float: left;   border: 1px solid orange;   }
      .menu { color: red;   display: block;  float: left;   border: 1px solid red;   }
       </style>
       <div class="menu">
      <span class="title">This is the Zen Menu Component.</br></span>
      <span class="tooltip">Current XP:</span><br />
      <span class="xp" >${this.xp}</span><br />
      <span class="tooltip">Current Menu:</span><br />
      <div class="menu" >${this.menu}</div>
  ${this.selectionsArray.map(i => html`<li><zen-menu-selection name=${i.name}></zen-menu-selection></li>`)}
    
  
      <zen-menu-selection on-click="selectionClick"></zen-menu-selection>
      </div>
    `;
  }

  constructor() {
    super();
    this.xp = 0;
    this.menu = "";
    this.selectionsArray = [ new ZenMenuSelectionElement("spell training") ];
    this.selection = new ZenMenuSelectionElement("weight training");

  }

  renderSelections() {

return this.selections.map(
      selection => html` 
        <div class="zen-selections">
          <zen-menu-selection name=${selection.name}>
          </zen-menu-selection>
        </div>
      `
            // ?checked="${todo.complete}" 
            // @change="${ e => this.updateTodoStatus(todo, e.target.checked)}"> 
            // ${todo.task}
    );
  }

  updateMenu() {
    console.log("menu was updated when XP was:" + this.xp);

    this.menu = "menu was updated when XP was:" + this.xp;

    // loop through Selections, check cost to add to displayed.
  }

  selectionClick(e) {
    console.log(e);
    let element = this.shadowRoot.querySelector('zen-menu-selection');
    element.click();
    console.log(element.name);
  }

  addSelection() {
    // this.selectionsArray = [...this.selectionsArray, { 
    //   selection: new ZenMenuSelectionElement()
    // }];
  }
}

customElements.define('zen-menu', ZenMenuElement);
