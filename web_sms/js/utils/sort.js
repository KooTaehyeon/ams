export function basicSort(array, text) {
  console.log(text, 'text');
  const newArray = array.sort(function (a, b) {
    if (a[text] < b[text]) {
      return 1;
    }
    if (a[text] > b[text]) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  console.log(newArray);
  return newArray;
}
export function nameSort(array) {
  const newArray = array.sort((x, y) => {
    return x.name.charCodeAt(0) - y.name.charCodeAt(0);
  });
  return newArray;
}
export function numberSort(array, text) {
  console.log(text);
  const newArray = array.sort(function (a, b) {
    if (Number(a[text]) > Number(b[text])) {
      return 1;
    }
    if (Number(a[text]) < Number(b[text])) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  console.log(newArray);
  return newArray;
}
