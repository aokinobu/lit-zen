import { LitElement, html } from 'lit-element';

class ZenGameElement extends LitElement {

  static get properties() {
    return {
      gameStatus: {
        type: String
      }
    };
  }

  render() {
    return html`
      <style> .game { color: purple;   display: block;  float: left;   border: 1px solid purple;   } </style>
      <div class="game">
      <span class="title">This is the Game component.</br></span>
      <zen-commander commanderName="Player"></zen-commander>
      <zen-commander commanderName="Enemy"></zen-commander>
      </div>
    `;
  }

  constructor() {
    super();
    this.gameStatus = "";
  }
}

customElements.define('zen-game', ZenGameElement);
