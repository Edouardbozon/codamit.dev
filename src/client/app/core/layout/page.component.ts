import { html, TemplateResult } from "lit-html";
import { LitElement, property } from "@polymer/lit-element/lit-element";
import { pageMaxWidth } from "./variables";

export default class Page extends LitElement {
  @property({ type: Boolean })
  navbar = true;

  render(): TemplateResult {
    return html`
      <link href="assets/css/bulma.min.css" rel="stylesheet">
      <style>.page-wrapper { max-width: ${pageMaxWidth} !important; margin: 0 auto; }</style>
      ${this.navbar ? html`<ez-navbar></ez-navbar>` : html``}
      <main class="page-wrapper"><slot></slot></main>
      <ez-footer></ez-footer>
    `;
  }
}
