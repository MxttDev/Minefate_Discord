module.exports = function getApi(URL) {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => console.log(data));
};
