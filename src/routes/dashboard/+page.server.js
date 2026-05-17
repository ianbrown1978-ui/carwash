import * as lib from '$lib'; 

export async function load({ cookies }) {
  const user = cookies.get('user') || 'Guest';
  let showBasket = Number(cookies.get('adult'))>0 || Number(cookies.get('student'))>0 ? true : false;

  // API data & kepy (not on front end for security)
  // signup at weatherapi.com/signup.aspx
  // go to https://www.weatherapi.com/my/ for your key
  // test response https://www.weatherapi.com/api-explorer.aspx


  const wkey= '73904fe2c5fa42bd91e83820252808';
  const location = 'London';

  // res short for response from the fetch request
  // alerts set to yes, these will return inside the response
  const res = await fetch('http://api.weatherapi.com/v1/current.json?key='+ wkey +'&q='+ location +'&aqi=no&alerts=yes');
  
  // Convert the raw HTTP response (res) into a usable JavaScript object (weather) by parsing the JSON data returned from the WeatherAPI endpoint
  const weather = await res.json();
  // weather object now holds lots of data you need to refer to the documentation to see whats available (e.g. weather.current.condition.icon) 


  // another test using https://www.weatherapi.com/api-explorer.aspx
  const sport = '';
  const res1 = await fetch('http://api.weatherapi.com/v1/sports.json?key='+ wkey +'&q='+ location );
  const sports = await res1.json();


  return {
    title: 'Dashboard',
    user, weather, location, sports, showBasket
  };
}


export const actions = {
  login: lib.loginAction,
  logout: lib.logoutAction
};

// API
// https://www.weatherapi.com/
//