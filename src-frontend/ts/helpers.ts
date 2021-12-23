import { CustomElement } from '../components/customElement';

// TODO: better error handling
const log = (error: any) => {
  console.log('Something went wrong', error);
};

const withReadyState = (start: Function) => {
  /in/.test(document.readyState)
    ? setTimeout(withReadyState, 5, start)
    : start();
};

// #region DOM generation
const createListItem = (content: string) => `<li>${content}</li>`;

const createNotePreviewItem = (content: string, color: string) =>
  `<g-note color="${color}" preview>${content}</g-note>`;
// #endregion DOM generation

interface Type<T> extends Function {
  new (...args: any[]): T;
}

const declareCustomElement = <T extends CustomElement>(
  element: Type<T>
): void => {
  return customElements.define(
    (element as unknown as typeof CustomElement).elementName,
    element
  );
};

export {
  log,
  withReadyState,
  createListItem,
  createNotePreviewItem,
  declareCustomElement
};
