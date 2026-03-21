export function searchImage(userValue) {
  const URL = 'https://pixabay.com/api/';
  const key = 'key=55115585-71990795827d4e19bcf2e84dd';

  const params = new URLSearchParams({
    q: userValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`${URL}?${key}&${params}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        throw new Error();
      }
      return data;
    });
}
