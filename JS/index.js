fetch("http://192.168.0.26:5500/public/data.json")
  .then((response) => response.json())
  .then((response) => console.log(response));

fetch("data.json")
  .then((response) => response.json())
  .then((json) => console.log(response));
