const sortByAlphabet = (a, b) => {
  const titleA = a.title.toUpperCase();
  const titleB = b.title.toUpperCase();

  if (titleA < titleB) {
    return -1;
  }
  if (titleA > titleB) {
    return 1;
  }

  return 0;
}

const sortByDate = (a, b) => {
  return Date.parse(a.date) - Date.parse(b.date);
}

export {
  sortByAlphabet,
  sortByDate
}