import { SORT_KEYS } from '../service/enums.js';

const sortByAlphabet = (a, b) => {
  const titleA = a.title.toUpperCase();
  const titleB = b.title.toUpperCase();

  return (titleA < titleB) ? -1 : 1;
}

const sortByDate = (a, b) => {
  return Date.parse(a.date) - Date.parse(b.date);
}

const sortings = {
  [SORT_KEYS.ALPHABET]: { text: 'by alphabet', fn: sortByAlphabet },
  [SORT_KEYS.DATE]: { text: 'by date', fn: sortByDate }
}

export {
  sortings
}