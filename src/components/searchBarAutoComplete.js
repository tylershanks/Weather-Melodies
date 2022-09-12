import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import axios from "axios";
import { geoApiOptions } from "../autocompleteAPI";

const SearchBarAutoComplete = ({onSearchChange}) => {

    const [search, setSearch] = useState(null);

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    const loadOptions = (inputValue) => {
        geoApiOptions.params.namePrefix = inputValue
        console.log(geoApiOptions)
        return axios.request(geoApiOptions)
            .then((response) => {
                console.log(response)
            return {
            options: response.data.data.map((city) => {
                return {
                    value: `${city.latitude} ${city.longitude}`,
                    label:`${city.name}, ${city.countryCode}`,
                    
                    cityName:`${city.name}`,
                    countryCode:`${city.countryCode}`
                }
            }),
        }
        }).catch(function (error) {
            console.error(error);
        });
    }

    return (
        <AsyncPaginate 
            placeholder='Search For City'
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}

export default SearchBarAutoComplete;