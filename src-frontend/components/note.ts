import { log } from '../ts/helpers';
import { CustomElement } from './customElement';

class Note extends HTMLElement implements CustomElement {
  static elementName: string = 'g-note';
  static css = new URL('../styles/note.css', import.meta.url).href;

  isPreview: boolean = false;
  createdAt: string = '';
  #_rendered: boolean = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    if (!this.#_rendered) {
      this.#render();
      this.#_rendered = true;
    }
  }

  #updateProperties(): void {
    this.isPreview = this.hasAttribute('preview');
  }

  async #preRender(): Promise<string> {
    this.#updateProperties();
    return `
    <link rel="stylesheet" href="${Note.css}">
    <div class="ribbon"></div>
    <slot name="header"></slot>
    <slot name="link-shield"></slot>
    <article class="note-content"></article>`;
  }

  // Ugly ass `.bind(this)`
  async #render(
    ofTemplateResult: () => Promise<string> = this.#preRender.bind(this)
  ): Promise<void> {
    try {
      const result = await ofTemplateResult();
      this.shadowRoot!.innerHTML = result;

      this.#afterRender();
    } catch (e) {
      log(e);
    }
  }

  async #afterRender(): Promise<void> {
    try {
      const { default: createEditor } = await import('./editor');
      createEditor(this.shadowRoot!.querySelector('.note-content'), {
        readonly: this.isPreview,
        initialContent: this.lastChild?.textContent ?? ''
      });
    } catch (error) {
      log(error);
    }
  }
}

export { Note };
