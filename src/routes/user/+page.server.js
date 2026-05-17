import * as lib from '$lib';

// this page is for server side only queries 

export async function load({ cookies }) {

  const user = await lib.getLoggedInUser(cookies);
  let showBasket = Number(cookies.get('adult'))>0 || Number(cookies.get('student'))>0 ? true : false;

  try {
    const userDetails = await lib.getUserDetails(user); // user details returned
    const userBookings = await lib.getUserBookings(user); // user bookings call the function!
    //console.log('Fetched users:', users); // Keep this log for now
    //console.log('Fetched bookings:', userBookings); // Keep this log for now
    return { userDetails, userBookings, user, showBasket }; // return it in the data object
  } catch (error) {
    console.error('Error fetching users:', error);
    return { userDetails: [], userBookings: [], user, showBasket }; // Return an empty array on error
  }
}


export const actions = {

  // and for the Login component
  login: lib.loginAction,
  logout: lib.logoutAction,
};
