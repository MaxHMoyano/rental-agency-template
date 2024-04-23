import countries from "world-countries";

export type FormattedCountry = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountries.slice(0, 10);
  const getByValue = (value: string): FormattedCountry | undefined => {
    return formattedCountries.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
