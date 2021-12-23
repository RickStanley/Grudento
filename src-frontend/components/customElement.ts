
export abstract class CustomElement extends HTMLElement {
  /** The custom element's tag/attribute name. */
  static readonly elementName: string;
  /** The custom element stylesheet URL. */
  static readonly css: string;
}
