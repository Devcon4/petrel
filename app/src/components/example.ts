import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { async } from '../services/decoratorUtils';
import themeState, { ThemeType } from '../services/themeState';
import { flexHostStyles, globalStyles } from '../styles/globalStyles';
import './litCard';
import './mwc';

// Example component that displays current theme from state.
@customElement('cara-example')
export default class ExampleElement extends LitElement {

  @state()
  @async(themeState.theme)
  colorTheme: ThemeType;

  render() {
    return html`<div class="example flex">
      <h2>${this.colorTheme} Theme</h2>

      <ptrl-mwc></ptrl-mwc>
      
      <div class="cards">
        <ptrl-card cardName="test card one!"></ptrl-card>
        <ptrl-card cardName="test card two!"></ptrl-card>
      </div>
    </div>`
  }

  static get styles() {
    return [
      globalStyles,
      flexHostStyles,
      css`
        h2 {
          text-align: center;
          transition: all 150ms linear;
          text-transform: capitalize;
        }

        .cards {
          width: 300px;
        }
      `
    ];
  }
}
