export const initialise = () => {};

export const saveItem = (ref, set) =>
  new Promise(resolve => {
    resolve(`save-${ref}-${set}`);
  });

export const readItemOnce = ref =>
  new Promise(resolve => {
    resolve(`read-${ref}`);
  });

export const logEvent = () => {};
