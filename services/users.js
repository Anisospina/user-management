export const load = () =>
  fetch("https://jsonplaceholder.typicode.com/users").then((response) =>
    response.json()
  );

export const get = (id) =>
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((response) =>
    response.json()
  );
