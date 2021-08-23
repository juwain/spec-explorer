const sortByAlphabet = (a, b) => {
  const titleA = a.title.toUpperCase();
  const titleB = b.title.toUpperCase();

  return (titleA < titleB) ? -1 : 1;
}

const sortByDate = (a, b) => {
  return Date.parse(a.date) - Date.parse(b.date);
}

export {
  sortByAlphabet,
  sortByDate
}