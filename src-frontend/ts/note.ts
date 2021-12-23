import { withReadyState } from './helpers';

withReadyState(() => {
  const params = new URLSearchParams(window.location.search);
  console.log(params);
});
