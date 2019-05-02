import { LitElement, html } from 'lit-element';
// import { ZenMenuSelectionElement } from './lit-zen-menu-selection.js';

class ZenMenuElement extends LitElement {

  static get properties() {
    return {
      xp: {
        // notify: true,
        type: Number,
        //  hasChanged(newVal, oldVal) {
        //   if (newVal > oldVal) {
        //     // console.log(`${newVal} > ${oldVal}. hasChanged: true.`);
        //     // kick off rerendering of Selections
        //     return true;
        //   }
        //   else {
        //     // console.log(`${newVal} <= ${oldVal}. hasChanged: false.`);
        //     return false;
        //   }
        // }
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
      <span class="title">This is the Zen Menu Component.<br /></span>
      <span class="tooltip">Current XP:</span><br />
      <span class="xp" >${this.xp}</span><br />
      <span class="tooltip">Current Menu:</span><br />
 ${this.renderSelectionSlots}

  ${this.footerTemplate}
      </div>
    `;
        // ${this.renderSelections}
  }

  constructor() {
    super();
    this.xp = 0;
    this.menu = "";
    // static array of selection type
    this.selectionsArray = [ { name: "lift", display: true }, { name: "spell", display: true} ];
    // this.selection = new ZenMenuSelectionElement("weight training");

  }

get renderSelectionSlots() {
  // this.selectionsArray.map(i => console.log(i.name));
      return html` 
${this.selectionsArray.map(i => i.display? html`<slot name="${i.name}"></slot>`:html``)}
`
// ${this.myBool?
//     html`<p>Render some HTML if myBool is true</p>`:
//     html`<p>Render some other HTML if myBool is false</p>`}
// <slot name="lift"></slot>

}
/*
  get renderSelections() {

  // ${this.selectionsArray.map(i => html`<li><zen-menu-selection name=${i.name}></zen-menu-selection></li>`)}

    // return this.selections.map(
      // selection => html`
        // <div class="zen-selections">
        //   <zen-menu-selection name=${this.selectionsArray[0].name}>
        //   </zen-menu-selection>
        // </div>



      return html`
        <div class="zen-selections">
          <zen-menu-selection name="weight training">
          </zen-menu-selection>
        </div>
      `
            // ?checked="${todo.complete}"
            // @change="${ e => this.updateTodoStatus(todo, e.target.checked)}">
            // ${todo.task}
    // );
  }
  */

  // updateMenu() {
  //   console.log("menu was updated when XP was:" + this.xp);

  //   this.menu = "menu was updated when XP was:" + this.xp;

  //   // loop through Selections, check cost to add to displayed.
  // }

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

    get footerTemplate() {
    return html`<footer>footer</footer>`;
  }
}

customElements.define('zen-menu', ZenMenuElement);
