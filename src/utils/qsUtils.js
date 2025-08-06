export const setQueryParam = (key, value, action = 'set') => {
  const url = new URL(window.location);

  if (action === 'set') url.searchParams.set(key, value);
  else if (action === 'delete') url.searchParams.delete(key);

  window.history.replaceState({}, '', url);
};

export const getQueryParam = (key) => {
  const params = new URLSearchParams(window.location.search);

  return params.get(key);
};
