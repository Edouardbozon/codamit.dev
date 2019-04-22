import { LitElement, html } from 'lit-element/lit-element';
import { profileConfiguration } from '../../utils/profile-config';
import { setPageMeta } from '../../utils/set-document-meta';

export default class Home extends LitElement {
  connectedCallback() {
    super.connectedCallback();

    setPageMeta({
      title: 'Codamit - Tech Blog',
      description: 'I share stuff about code, architecture and best practices',
    });
  }

  render() {
    return html`
      <link href="assets/css/bulma.min.css" rel="stylesheet" />
      <style>
        :host {
          display: block;
        }
        .link {
          text-decoration: underline;
        }
      </style>
      <ez-navbar></ez-navbar>
      <ez-profile .profile="${profileConfiguration}"></ez-profile>
      <ez-page .navbar="${false}">
        <ez-article-feed></ez-article-feed>
        <ez-twitter-feed></ez-twitter-feed>
      </ez-page>
    `;
  }
}

customElements.define('ez-home', Home);
