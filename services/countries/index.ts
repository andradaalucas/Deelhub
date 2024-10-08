import axios, { AxiosResponse } from 'axios';

// Definimos el tipo que representará la estructura de los países (puedes ajustarlo según lo que el API devuelva)
interface Country {
  name: string;
  capital: string;
  currency: string;
  phoneCode: string;
  flag: string;
  state_url: string;
}


// Función para hacer la petición y devolver los países
export const getAllCountries = async function (): Promise<Country[]> {
  try {
    // Aquí agregamos el Bearer Token en los headers
    const bearerToken = process.env.REACT_APP_BEARER_TOKEN;
    console.log(bearerToken);
    
    const response: AxiosResponse<any> = await axios.get(
      'https://restfulcountries.com/api/v1',
      {
        headers: {
          Authorization: `Bearer 1477|lLZZTuX9E6VgxgG82JI64HG77U0WJ0l2A8qCddci`, // Reemplaza yourToken con tu Bearer token
        },
      }
    );

    const filteredCountries = response.data?.data.map((country: any) => ({
      name: country.name,
      capital: country.capital || ['N/A'], 
      currency: country.currency,
      phoneCode: country.phone_code,
      flag: country.href.flag,
      state_url: country.href.states
    }));

    console.log(response.data);
    
    return filteredCountries;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw new Error('Could not fetch countries');
  }
};

export const getStateByCountry = async function (state_url: string) {
  try {
    // Aquí agregamos el Bearer Token en los headers
    const bearerToken = process.env.REACT_APP_BEARER_TOKEN;
    const response: AxiosResponse<any> = await axios.get(
      state_url,
      {
        headers: {
          Authorization: `Bearer 1477|lLZZTuX9E6VgxgG82JI64HG77U0WJ0l2A8qCddci`, // Reemplaza yourToken con tu Bearer token
        },
      }
    );
    const filteredStates = response.data?.data.map((states: any) => ({
      name: states.name,
    }));
    return filteredStates;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw new Error('Could not fetch countries');
  }
};

