import { LitElement, html } from 'lit-element';
import './lit-zen-menu-selection.js';

class ZenStatusElement extends LitElement {

  static get properties() {
    return {
      // xp: {
      //   // notify: true,
      //   type: Number,
      //   hasChanged(newVal, oldVal) {
      //     if (newVal > oldVal) {
      //       console.log(`${newVal} > ${oldVal}. hasChanged: true.`);
      //       return true;
      //     }
      //     else {
      //       console.log(`${newVal} <= ${oldVal}. hasChanged: false.`);
      //       return false;
      //     }
      //   }
      // },
      // menu: {
      //   type: String
      // }
    }
  }

  render() {
    return html`
      <style> .xp { color: orange;   display: block;  float: left;   border: 1px solid orange;   }
      .menu { color: red;   display: block;  float: left;   border: 1px solid red;   }
       </style>
       <div class="zen-status">
      <span class="title">This is the Zen Status Component.</br></span>
      <span class="tooltip">Current Selections:</span><br />
      <span class="selections" >${this.renderSelections}</span><br />
      ${this.footerTemplate}
      </div>
    `;
  }

  constructor() {
    super();
    console.log("ZenStatusElement");
    // static array of selection type
    this.selectionsArray = [];
  }

  get renderSelections() {

    // ${this.selectionsArray.map(i => html`<li><zen-menu-selection name=${i.name}></zen-menu-selection></li>`)}    

    // return this.selections.map(
    // selection => html` 
    // <div class="zen-selections">
    //   <zen-menu-selection name=${this.selectionsArray[0].name}>
    //   </zen-menu-selection>
    // </div>



    return html` 
            <zen-menu-selection selectionName="spell casting"></zen-menu-selection>
        `
    // ?checked="${todo.complete}" 
    // @change="${ e => this.updateTodoStatus(todo, e.target.checked)}"> 
    // ${todo.task}
    // );
  }

  selectionClick(e) {
    console.log(e);
    let element = this.shadowRoot.querySelector('zen-menu-selection');
    element.click();
    console.log(element.name);
  }

  addSelection(name) {
    this.selectionsArray.push({ name: name, display: true });
    // , { name: "spell", display: true }
    // this.selectionsArray = [...this.selectionsArray, { 
    //   selection: new ZenMenuSelectionElement()
    // }];
  }

  get footerTemplate() {
    return html`<footer>footer</footer>`;
  }
}

customElements.define('zen-status', ZenStatusElement);
