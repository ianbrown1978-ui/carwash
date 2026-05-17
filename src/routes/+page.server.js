import * as lib from '$lib'; 
// import all from index.js in the lib folder, this is Svelte standard structure, the * means ALL

// load is the required name for the function that loads data for a route.


// async load function is passed the built in Svelte cookies object
export async function load({ cookies }) {


  const user = await lib.getLoggedInUser(cookies);

  //const user = cookies.get('user') || 'Guest'; // this is a const object, although can change the page would reload for it to change
  
  // returning key pair title with 'Homepage' and the user object set from the cookie (also a key pair)

  console.log ('load func',user)
  return {
    title: 'Homepage',
    user
  };
}



// these are the actions which will be performed by forms (login component), not on load
// we see ation=login on the form, and here it is tied to the function imported from lib
// this function was in auth.js

export const actions = {
  login: lib.loginAction,
  logout: lib.logoutAction
};