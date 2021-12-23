import {
  defaultValueCtx,
  Editor,
  editorViewOptionsCtx,
  rootCtx,
  themeFactory
} from '@milkdown/core';
import { history } from '@milkdown/plugin-history';
import { commonmark } from '@milkdown/preset-commonmark';

const theme = themeFactory({});

const createEditor = (
  container: Element | null | undefined,
  { readonly = false, initialContent = '' } = {}
): void => {
  if (!container) throw Error('No container provided.');
  Editor.make()
    .config((ctx) => {
      ctx.set(editorViewOptionsCtx, { editable: () => !readonly });
      ctx.set(rootCtx, container);
      ctx.set(defaultValueCtx, initialContent);
    })
    .use(theme)
    .use(commonmark)
    .use(history)
    .create();
};

export default createEditor;
