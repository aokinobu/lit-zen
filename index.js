import { LitElement, html } from 'lit-element';
import './lit-zen-progress.js';
import './lit-zen-menu.js';
import './lit-zen-menu-selection.js';
import './lit-zen-status.js';
import './lit-zen-commander.js';
import './lit-zen-world.js';
import './lit-zen-game.js';

class ZenElement extends LitElement {

  static get properties() {
    return {
      name: { type: String },
    };
  }

  constructor() {
    super();
    this.name = 'Zen Project';
    this.addEventListener('zen-event-xp-changed', this.modifyXp);
  }

  render() {
    return html`
    <style> .title { color: green; } .xp { color: purple;   display: block;  float: left;   border: 1px
solid purple;   } </style>
    <div class="zen">
      <p>Hello, Welcome to ${this.name}!</p>
      <zen-progress></zen-progress>
      <zen-world></zen-world>
      <zen-menu class="xp" >
${this.renderSelections}</zen-menu>
<zen-status></zen-status>
    </div>`;
  }
  firstUpdated() {
    console.log("zen-main firstUpdated");
  }

  updated(changedProps) {
    console.log("updated");
    console.log(changedProps.get('xp'));
  }

  onXpChanged() {
    console.log("xp changed");
  }

  modifyXp(e) {
    console.log("xp modified");
    console.log(e);
    console.log(e.detail.message);
    console.log(e.detail.xp);

    // click.detail.xp=this.xp;

    let element = this.shadowRoot.querySelector('zen-menu');
    element.xp = e.detail.xp;
    console.log(element);
    // element.updateMenu();
  }

  handleEvent(e) {
    console.log(e.bubbles);
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
<p slot="lift"><zen-menu-selection selectionName="weight lifting" @click="${this.weightLifting}"></zen-menu-selection></p>
<p slot="spell"><zen-menu-selection selectionName="spell casting" @click="${this.spellCasting}"></zen-menu-selection></p>
      `
            // ?checked="${todo.complete}" 
            // @change="${ e => this.updateTodoStatus(todo, e.target.checked)}"> 
            // ${todo.task}
    // );
  }

  weightLifting(e) {
    console.log("weight");
    console.log(e);
    console.log(e.target.selectionName);
  }
  spellCasting(e) {
    console.log("spellCasting");
    console.log(e);
    console.log(e.target.selectionName);
  }
}

customElements.define('lit-zen', ZenElement);
