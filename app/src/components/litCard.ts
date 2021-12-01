import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ptrl-card')
export default class CardElement extends LitElement {

  @property()
  cardName: String = ''; 

  render() {
    return html`<div class="card">
      <div class="title">${this.cardName}</div>
    </div>`;
  }

  static get styles() {
    return [
      css`
        .card {
          color: black;
          padding: 12px;
          margin-bottom: 12px;
          background-color: rgb(170 221 169);
          font-family: sans-serif;
          border-radius: 5px;
          filter: drop-shadow(0px 2px 3px rgba(0,0,0,.4));
        }
      `
    ];
  }
}
