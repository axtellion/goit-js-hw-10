import './css/styles.css';
import { fetchCountries } from "./js/fetchCountries.js";
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';



const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector("#search-box"),
    list: document.querySelector(".country-list"),
    countyInfo: document.querySelector(".country-info"),
}

const countyClener = () => {
    refs.list.innerHTML = "";
    refs.countyInfo.innerHTML = "";
}





const searchCounties = (e) => {
    const countryName = e.target.value.trim();
    
    if (countryName === '') {
        countyClener();
        return;   
    }

    fetchCountries(countryName)
        .then(checkCaunry)
    .catch(err => {
      Notiflix.Notify.failure(`Oops, there is no country with that name:${err}`);
    });
}

const checkCaunry = (countryName) => {
    const quantity = countryName.length;
    if (quantity > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (quantity >= 2 && quantity <= 10) {
        addCountrys(countryName);
          } 
        else {
            addCountry(countryName);
          }
    }

const addCountry = (country) => {
    const { flags, name, capital, languages, population } = country[0];

  const langArray = Object.values(country[0].languages);
  const langString = langArray.join(', ');
  const headerMarkup = `<h1 class='country'><img class="flagImg" src='${flags.png}' alt='${name.official}' />${name.official}</h1>`;
  const descriprionMarkup = `<p class='capital'>Capital: ${capital}</p><p class='population'> Population: ${population}</p><p class='languages'>Languages: ${langString}</p>`;

  redrawingMarkup(headerMarkup, descriprionMarkup);
}


const addCountrys = (date) => {
    const title = date.map(element => {
        const { flags, name } = element;
        return `<li><p class="text"><img class="flagImg" src='${flags.png}' alt='${name.official}'/>${element.name.official}</p></li>`;
    })
        .join(' ');
    redrawingMarkup(title);
};

function redrawingMarkup(header, description = '') {
  refs.list.innerHTML = header;
  refs.countyInfo.innerHTML = description;
}

refs.input.addEventListener('input', debounce(searchCounties, DEBOUNCE_DELAY));