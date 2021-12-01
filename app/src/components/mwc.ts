import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';


@customElement('ptrl-mwc')
export default class MwcElement extends LitElement {

  @property()
  cardName: String = ''; 

  render() {
    return html`<div class="mwc">
      <div class="card">
        <div class="title">Form</div>
        <mwc-textfield label="Firstname"></mwc-textfield>
        <mwc-textfield label="Lastname"></mwc-textfield>
      </div>
    </div>`;
  }

  static get styles() {
    return [
      css`
        .mwc {
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .title {
          font-size: 32px;
          margin-bottom: 12px;
        }

        .card {
          display: flex;
          flex-direction: column;
          background-color: var(--cara-surface);
          padding: 24px;
          border-radius: 5px;
          filter: drop-shadow(0px 2px 3px rgba(0,0,0,.4));
        }

        .card > * {
          margin-top: 12px;
        }
      `
    ];
  }
}
