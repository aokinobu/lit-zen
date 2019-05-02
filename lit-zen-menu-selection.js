import { LitElement, html } from 'lit-element';

class ZenMenuSelectionElement extends LitElement {

  static get properties() {
    return {
      selectionName: {
        type: String
      }
    };
  }

  render() {
    return html`
      <style> .progress { color: blue;   display: block;  float: left;   border: 1px solid red;   } </style>
      <div class="menuselection">
      <span class="title">This is the Zen Menu Selection Component.<br /></span>
      <span class="tooltip">Selection Name:${this.selectionName}</span><br />
            <button @click=${this.startWorker}>get to work</button>
      <button @click=${this.stopWorker}>stop working</button>
      </div>
    `;
  }

  constructor() {
    super();
    this.selectionName = "";
    this.running = false;
    this.timer = undefined;
  }

  // firstUpdated() {
  //   console.log("zen-menu-selection firstUpdated");
  // }

  kickOff() {
    console.log("kickoff");

    console.log(this.selectionName);
  }


    startWorker() {
    console.log("start worker");
    this.result = "started";
    this.timer = setInterval(this.throwXp, 3000, this);
    console.log(this.timer);
  }

  stopWorker() {
    console.log("stop");
    console.log(this.timer);
    clearInterval(this.timer);
  }

    async throwXp(dat) {

    console.log("xp!");
    // self = dat;
    dat.result = "xp!";

    let event = new CustomEvent('zen-event-xp-changed', {
      detail: { message: 'xp changed', xp: 100 },
      bubbles: true,
      composed: true
    });
    dat.dispatchEvent(event);
  }
}

customElements.define('zen-menu-selection', ZenMenuSelectionElement);
