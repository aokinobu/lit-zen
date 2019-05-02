import { LitElement, html } from 'lit-element';
import './lit-zen-menu-selection.js';

class ZenStatusElement extends LitElement {

  static get properties() {
    return {
      selectionsArray: {
        type: Array,
        hasChanged(newVal, oldVal) {
          //   console.log("selectionsArrayhasChanged");
          //   console.log(oldVal);
          //   console.log(newVal);
          //   if (oldVal === undefined) {
          //     console.log(`${newVal} > ${oldVal}. hasChanged: true.`);
          //     return true;
          //   }
          //   if (oldVal.length <= 0) {
          //     console.log(`${newVal} > ${oldVal}. hasChanged: true.`);
          //     return true;
          //   }
          // let intersection = newVal.filter(x => oldVal.includes(x));
          // // let intersection2 = oldVal.filter(x => newVal.includes(x));
          // console.log(intersection);
          // // console.log(intersection2);
          // if (newVal> oldVal) {
          //   console.log(`${newVal} > ${oldVal}. hasChanged: true.`);
          //   return true;
          // }
          // else {
          //   console.log(`${newVal} <= ${oldVal}. hasChanged: false.`);
          //   return false;
          // }
        }
      },
      menuSelectionsArray: {
        type: Array
      }
    }
  }

  render() {
    let liftSelection = { name: "lift" };
    return html`
      <style> .xp { color: orange;   display: block;  float: left;   border: 1px solid orange;   }
      .menu { color: red;   display: block;  float: left;   border: 1px solid red;   }
       </style>
       <div class="zen-status">
      <span class="title">This is the Zen Status Component.</br></span>
      <span class="tooltip">Current Selections:</span><br />
      <span class="selections" >${this.renderSelections}</span><br />
      <span > ${this.footerTemplate} </span>
      </div>
    `;
    // <button @click="${this.addSelection(liftSelection)}">Click</button>
  }

  constructor() {
    super();
    console.log("ZenStatusElement");
    // static array of selection type
    this.selectionsArray = new Array();


  }



  get renderSelections() {
    console.log("renderSelections");


    // ${this.selectionsArray.map(i => html`<li><zen-menu-selection name=${i.name}></zen-menu-selection></li>`)}

    // return this.selections.map(
    // selection => html`
    // <div class="zen-selections">
    //   <zen-menu-selection name=${this.selectionsArray[0].name}>
    //   </zen-menu-selection>
    // </div>
    console.log(this.selectionsArray);



    // let  i = 0;
    // for (i = 0; i < element.length; ++i) {
    //   console.log(element[i]);
    //   element.kickOff();

    // }

    return this.selectionsArray.map(i => html`<zen-menu-selection id="${i.name}${i.count}" selectionName=${i.name}></zen-menu-selection>`);
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



  // addSelection(selection) {
  //   console.log("add");
  //   console.log(selection);
  //   this.selectionsArray.push({ name: selection.name, display: true });
  //   // , { name: "spell", display: true }
  //   // this.selectionsArray = [...this.selectionsArray, {
  //   //   selection: new ZenMenuSelectionElement()
  //   // }];
  // }

  get footerTemplate() {
    return html`<footer>footer</footer>`;
  }

  firstUpdated() {
    console.log("zen-status firstUpdated");
    // this.addSelection("lift");
  }

  async checkStatus() {
    console.log("checkStatus");
    this.selectionsArray.map(i => console.log(i));
    // this.selectionsArray.map(i => function () {i.kickOff()});
    // this.selectionsArray.map(i => function () {if (!i.running) {i.kickOff()}});
    this.requestUpdate();

    // await Promise.all(this.updateComplete, this.kickOffAll());
    //   let element = this.shadowRoot.querySelectorAll('zen-menu-selection');
    //   console.log("zen-menu-selection0");
    //   console.log(element.length);

  }


  async kickOffAll() {
    console.log("kickOffAll");
    let element = this.shadowRoot.querySelectorAll('zen-menu-selection');
    console.log("zen-menu-selection");
    console.log(element.length);
    console.log(element);
    let i = 0;

    for (i = 0; i < element.length; ++i) {
      console.log(element[i]);

    }
  }

  updated(changedProps) {
    console.log("changedProps");
    console.log(changedProps);
    let i = 0;

    for (i = 0; i < this.selectionsArray.length; i++) {
      console.log(this.selectionsArray[i].name + this.selectionsArray[i].count);
      let element = this.shadowRoot.getElementById(this.selectionsArray[i].name + this.selectionsArray[i].count);
      console.log("zen-menu-selection");
      console.log(element);
    }
  }
}

customElements.define('zen-status', ZenStatusElement);
