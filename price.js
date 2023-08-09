const axios = require('axios');
const qs = require('qs');


const API_KEY = 'ZGPZGJSgUNT2FtT46TYViYNwwTKQbZpC';
const API_SECRET = 'aR78wJNVtPRTKAHD';

async function getFlightPrices() {
  try {
    const authResponse = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      qs.stringify({
        grant_type: 'client_credentials',
        client_id: API_KEY,
        client_secret: API_SECRET,
      })
    );

    const accessToken = authResponse.data.access_token;

    const flightPricesResponse = await axios.get(
      'https://test.api.amadeus.com/v2/shopping/flight-offers',
      {
        params: {
          originLocationCode: 'DEL',
          destinationLocationCode: 'JAI',
          departureDate: '2023-06-15',
          currencyCode: 'INR',
          adults: 1,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const flightPrices = flightPricesResponse.data.data;
    const result = {};

    flightPrices.forEach(flight => {
      result[flight.validatingAirlineCodes[0]] = `₹${flight.price.grandTotal}`;
    });

    console.log(result);
  } catch (error) {
    console.error(error.response.data);
  }
}

getFlightPrices();
