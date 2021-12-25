import { CustomElement } from '../components/customElement';

type NotePreviewOptions = {
  color?: string;
  header?: string;
  link?: string;
};

type NotePreviewHeaderOptions = {
  createdAt?: string | number;
};

// TODO: better error handling
const log = (error: any) => {
  console.log('Something went wrong', error);
};

const toDateFormat = (() => {
  const formater = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric'
  });
  return (date: Date | number): string => {
    try {
      return formater.format(date);
    } catch (error) {
      log(error);
      return '';
    }
  };
})();

const withReadyState = (start: Function) => {
  /in/.test(document.readyState)
    ? setTimeout(withReadyState, 5, start)
    : start();
};

// #region DOM generation
const createNoteListItem = (content: string) =>
  `<li class="notes__list__item">${content}</li>`;

const createNoteLink = (url: string = '#') =>
  `<a data-action="open:note" class="note__link" href="${url}" slot="link-shield"><span class="visually-hidden">Open this note.</span></a>`;

const createNoteHeader = (
  label: string,
  { createdAt = '' }: NotePreviewHeaderOptions = {}
) => `<header slot="header" class="note__header">
<p class="header__created"><span class="visually-hidden">Last updated at</span> <time datetime="${createdAt}">${toDateFormat(
  typeof createdAt === 'number' ? createdAt : new Date(createdAt)
)}</time></p>
<div role="region" aria-labelledby="${label}-actions-label" class="header__actions">
  <p id="${label}-actions-label" class="visually-hidden">Note actions</p>
  <button data-action="toggle:menu" aria-expanded="false" aria-haspopup="menu" aria-controls="${label}-actions-list" class="actions__expand button--action" type="button">⁝</button>
  <menu id="${label}-actions-list" aria-hidden="true" class="actions__list">
    <li><button class="item__action" type="button">Delete</button></li>
  </menu>
</div>
</header>`;

const createNotePreviewItem = (
  id: number,
  content: string,
  { color = '', header = '', link = '' }: NotePreviewOptions = {}
) => `<g-note id="${id}" class="notes__note" color="${color}" preview>
${header}
${link}
${content}
</g-note>`;
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
  createNoteListItem,
  createNotePreviewItem,
  createNoteHeader,
  createNoteLink,
  declareCustomElement
};
