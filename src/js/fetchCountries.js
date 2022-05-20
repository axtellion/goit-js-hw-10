
export function fetchCountries(name) {
    const searchParams = `?fields=name,capital,population,flags,languages`;
    return fetch(`https://restcountries.com/v3.1/name/${name}${searchParams}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.status);
  });
};