import { WebviewWindow } from '@tauri-apps/api/window';
import { Note } from '../components/note';
import {
  createNoteHeader,
  createNoteLink,
  createNoteListItem,
  createNotePreviewItem,
  declareCustomElement,
  log,
  withReadyState
} from './helpers';

withReadyState(() => {
  declareCustomElement(Note);

  const note = createNotePreviewItem(
    1,
    '# Lorem ipsum dolor\nHello from lorem ipsum dolor!\nSie werden nich beleidigung deustchland!!\nSchadenfreunde lorem lorelorelroe\nI met a traveler from a antique land\ntest\nestsetsetes\ntestsetes',
    {
      header: createNoteHeader('note-1', { createdAt: Date.now() }),
      link: createNoteLink('#')
    }
  );
  const noteListItem = createNoteListItem(note);
  const fragment = document.createRange().createContextualFragment(noteListItem);

  document.querySelector('.notes__list')
    ?.append(fragment);

  window.addEventListener('click', (e: MouseEvent) => {
    const target = e.target;
    const actionElement = target as HTMLElement | null;
    const action = actionElement?.dataset.action;
    switch (action) {
      case 'toggle:menu':
        {
          const menu = actionElement?.nextElementSibling;
          if (!menu) break;
          const openState = menu.hasAttribute('aria-hidden');
          actionElement.setAttribute('aria-expanded', openState.toString());
          menu.toggleAttribute('aria-hidden', !openState);
        }
        break;
      case 'open:note':
        {
          e.preventDefault();
          const a = new WebviewWindow('Teste', {
            title: 'Nota',
            url: 'note/index.html?p=1',
            height: 500,
            width: 500,
            resizable: true,
            decorations: false
          });
          log(`Created window: ${a.label}`);
        }
        break;
    }
  });
});
