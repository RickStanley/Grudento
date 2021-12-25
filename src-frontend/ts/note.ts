import { appWindow } from '@tauri-apps/api/window';
import { Note } from '../components/note';
import { declareCustomElement, withReadyState } from './helpers';

withReadyState(() => {
  declareCustomElement(Note);
  let isAlwaysOnTop = false;

  window.addEventListener('click', (e: MouseEvent) => {
    const target = e.target;
    const actionElement = target as HTMLElement | null;
    const action = actionElement?.dataset.action;

    if (action && /^toggle/.test(action)) {
      actionElement.toggleAttribute(
        'active',
        !actionElement.hasAttribute('active')
      );
    }

    switch (action) {
      case 'close:window':
        window.close();
        break;
      case 'toggle:pin':
        appWindow
          .setAlwaysOnTop((isAlwaysOnTop = !isAlwaysOnTop))
          .then((done) => {
            console.log(done);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
    }
  });
});
