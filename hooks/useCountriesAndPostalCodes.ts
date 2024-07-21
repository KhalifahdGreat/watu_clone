import { useEffect, useState } from "react";
import axios from "axios";

interface Country {
  name: string;
  callingCode: string;
  flag: string;
}

const useCountriesAndCallingCodes = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const selectedCountries = [
    "Nigeria",
    "Ghana",
    "Kenya",
    "South Africa",
    "Ethiopia",
    "Equatorial Guinea",
  ];

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const data = response.data;

        const countriesData = data
          .filter((country: any) =>
            selectedCountries.includes(country.name.common)
          )
          .map((country: any) => ({
            name: country.name.common,
            callingCode: country.idd.root
              ? `${country.idd.root}${country.idd.suffixes[0]}`
              : "N/A",
            flag: country.flags.png, // Use .png or .svg based on your needs
          }));

        setCountries(countriesData);
      } catch (err) {
        setError("Failed to fetch countries");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading, error };
};

export default useCountriesAndCallingCodes;
