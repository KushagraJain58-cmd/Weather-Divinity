import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, GeoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return (
      fetch(    //allows us to use AJAX call
        `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,   //URL returns a JSON object for us
        GeoApiOptions
      )
        .then((response) => response.json())  //AJAX call- returns a promise- convert into something we can use in JS
        //   .then((response)=>console.log(response))
        .then((response) => {
          // console.log(response);
          return {
            options: response.data.map((city) => {
              //we have array of objects
              return {
                value: `${city.latitude} ${city.longitude}`, //store value of latitude and longitude
                label: `${city.name}, ${city.countryCode}`,
              };
            }),
          };
        })
        .catch((err) => console.error(err))
    );
  };

  const onChangeHandler = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={onChangeHandler}
      loadOptions={loadOptions} //Async function that take next arguments
    />
  );
};

export default Search;
