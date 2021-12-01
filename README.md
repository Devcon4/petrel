# Modern web with lit and MWC
---

I wanted to review some of the newer features that have been added to the web spec over the last few years. One of the main one is native WebComponents and ShadowDOM. Lit is a emerging tool by the Polymer team that makes creating WebComponents a little easier and adds change detection. CSS Variables are a new tool that makes it way easier to style components as well. Finally I want to show the Material teams new MWC library witch uses both of those tools to create material components.

## WebComponents

### The spec

[WebComponents](https://www.webcomponents.org/)
is a collection of specs that make it easy to create library agnostic components.

- **Custom elements**: Foundation spec that allows you to register custom html elements.
- **Shadow DOM**: This spec adds a way to encapsulate styles so they can't leak.
- **ES Modules**: The new module system in Javascript that makes it easier to split up your code.
- **HTML Templates**: A new way to create fragments of markup that can be reused.

When we talk about WebComponents we are actually talking about using all of these specs together.

### Usage
Lets look at how we would create a WebComponent by hand.

*index.html*
``` html
<!DOCTYPE html>
<html lang="en">
  <head></head>
  <body>

    <template id="card-template">
      <div class="card">
        <div class="title"></div>
      </div>
    </template>

    <script>
      class PtrlCard extends HTMLElement {

        get cardName() {
          return this.getAttribute('cardName');
        }

        connectedCallback() {
          const root = this.attachShadow({mode: 'open'});

          const frag = document.getElementById('card-template');
          const template = document.importNode(frag.content, true);

          template.querySelector('.title').innerHTML = this.cardName;
          const styles = document.createElement('style');

          styles.innerHTML = `
            .card {
              color: black;
              padding: 12px;
              margin-bottom: 12px;
              background-color: rgb(170 221 169);
              font-family: sans-serif;
              border-radius: 5px;
              filter: drop-shadow(0px 2px 3px rgba(0,0,0,.4));
            }
          `;

          root.appendChild(styles);
          root.appendChild(template);
        }
      }

      window.customElements.define('ptrl-card', PtrlCard);
    </script>

    <ptrl-card cardName="test card one!"></ptrl-card>
    <ptrl-card cardName="test card two!"></ptrl-card>
  </body>
</html>
```

I don't want to get into specifics yet but there are some things I would like to point out. First is how we can create a class that extends HTMLElement, register it, and reuse it. We can declare a template in html and use it as a document fragment is pretty cool. The card class styles are scoped to our card component and don't affect anything outside of the shadow DOM. the biggest problem though is that this code is pretty messy, we are doing a lot of manual DOM manipulation to set everything up, and our styles are just a Javascript string.

This is where Lit comes it to clean up some of the syntax while still getting the benifits.

## Lit
[Lit](https://lit.dev/) is a rebranding of the latest version of Lit-Element. In short it makes it easier to create custom elements. One of the biggest things it does is add change detection so our DOM is more reactive. Lets look at making the same element above but as a LitElement.

*LitCard.ts*
``` ts
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Example component that displays current theme from state.
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
```

*index.html*
```html
<!DOCTYPE html>
<html lang="en">
  <head></head>
  <body>
    <ptrl-card cardName="test card one!"></ptrl-card>
    <ptrl-card cardName="test card two!"></ptrl-card>

    <script type="module" async src="./LitCard.ts"></script>
  </body>
</html>
```

This is Typescript this time so it would need typescript bundling setup in order to work, although there is a vanilla Javascript way to write LitElements as well. LitElement take advantage of Tagged Template Litterals in Javascript rather than JSX like other frameworks. In my opinion this is much more natural way to mix html and js. There is a render function that will return this elements template. There is also a styles getter that we can pass styles into. Lit also has several helper decorators like @customElement that registers your component and @property which adds cardName as a component attribute.

## This repo

Lets take a second to look at everything else that is in this repo. First this repo uses my [Caracara](https://github.com/Devcon4/caracara) repo as a template. This template sets up everything needed to start building Lit apps. Lit is just a library and doesn't have a CLI like other frameworks. Thankfully with ES Modules and Rollup it is much easier to setup bundlers that ever before. If you look in the components folder you will see the LitCard we created above.

## CSS Variables
We can now create variables for many things in css. This makes it way easier to do many things that previously we would depend on Javascript to do. If we take a look at the index.html of this example app we can see that it sets up a full color theme using css variables. This example app is setup with a dark/light theme switcher, we do a fancy css trick with --light/--dark but the main idea is that we can change the value of css variables at runtime.

## Material MWC
There are several versions of the main Material Design component library, We normally use @angular/material which is great but it sucks that it only works in angular. The Material Design team has been working on a new implementation using Lit that works in any framework called [MWC](https://github.com/material-components/material-web). Lit is great for libraries and doesn't have to be your main framework. You can make a one off component in Lit and use it in both angular and react if you want.
