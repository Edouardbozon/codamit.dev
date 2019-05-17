import { css, html, LitElement } from 'lit-element';

import github from '../../utils/icons/github';
import twitter from '../../utils/icons/twitter';
import { navigate } from '../../utils/navigate';

export default class Component extends LitElement {
  twitterUrl = 'https://twitter.com/edouardbozon';
  githubUrl = 'https://github.com/edouardbozon';

  static get styles() {
    return css`
      :host {
        display: block;
      }

      nav {
        height: 64px;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        color: rgb(180, 180, 180);
        background: rgb(34, 34, 34);
        font-family: 'IBM Plex Sans', sans-serif;
      }

      h1 {
        margin: 0;
        font-size: 1.4rem;
      }

      svg {
        display: inline-block;
        width: 24px;
        height: 24px;
      }

      .logo-btn {
        color: rgb(180, 180, 180);
        text-decoration: none;
        display: flex;
        align-items: center;
      }

      .socials a {
        padding-left: 1rem;
      }

      .logo {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        margin-right: 12px;
      }
    `;
  }

  render() {
    return html`
      <nav>
        <a href="/" @click=${navigate('/')} class="logo-btn">
          <img src="/assets/images/portrait.jpg" class="logo" />
          Codamit - Tech Blog
        </a>
        <span class="socials">
          <a title="Github profile" href="${this.githubUrl}">${github}</a>
          <a title="Twitter profile" href="${this.twitterUrl}">${twitter}</a>
        </span>
      </nav>
    `;
  }
}

customElements.define('ez-navbar', Component);