import { WebviewWindow } from '@tauri-apps/api/window';
import { Note } from '../components/note';
import { declareCustomElement, withReadyState } from './helpers';

withReadyState(() => {
  declareCustomElement(Note);

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
          // invoke('create_window');
          const a = new WebviewWindow('Teste', {
            title: 'Nota',
            url: 'note/index.html?p=1'
          });
        }
        break;
    }
  });
});
