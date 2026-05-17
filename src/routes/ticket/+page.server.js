import { redirect } from '@sveltejs/kit';
import * as lib from '$lib';
import { db } from '$lib/server/db.js'; // database connction required


export async function load({ cookies }) {


  const user = await lib.getLoggedInUser(cookies); // secure
  // the mothod below is more simple but will not be saved and could not be used in prodution (security)  
  //const user = cookies.get('user') || 'Guest'; // this is a const object, although can change the page would reload for it to change
  
  const cookieConsent = cookies.get('cookieConsent') || ''; 

  console.log ('load func',user)
  return {
    title: 'Homepage',
    user,
    cookieConsent
  };
}

export async function load({ cookies, url }) {

    // this page needs a product ID to link to the database
    const productID = url.searchParams.get('productID') ?? '';

    // all pages look for the logged in cookie
    // const user = cookies.get('user') || 'Guest';

    const user = await lib.getLoggedInUser(cookies);
    console.log('user frm load',user)
    
    let cookieConsent = cookies.get('cookieConsent') || ''; 

    
    // MySql option: 
    // if user is on a different device this needs to create the cookies at this point
    // if no cookies:
    // await.lib.retrieveCart (userID) to find cartID, there should only be one
    // write the cookies (see below add action) based on whats in the cart record


    // write a try catch block with await.lib.getPrice to replace the temporary prices below (based on productID)
    const adultPrice = 10;
    const studentPrice = 7;

    // True if either cookie exists, false if neither exists
    // this needed in all load functions if whowing the menu with the basket in
    
    let showBasket = Number(cookies.get('adult'))>0 || Number(cookies.get('student'))>0 ? true : false;
    console.log('showBasket',showBasket)

    return {
        title: 'tickets',
        adult: Number(cookies.get('adult') || 0),
        student: Number(cookies.get('student') || 0),
        adultPrice, studentPrice, productID, showBasket, user, cookieConsent
    };
}





export const actions = {

    // ADD TICKET
    add: async ({ request, cookies }) => {
        const data = await request.formData();
        const id = Number(data.get('id'));
        
        const cookieConsent = cookies.get('cookieConsent') || ''; 
        if (cookieConsent !== 'yes') {
            return { success: false, error: 'cookies required' };
        }

        let adult = Number(cookies.get('adult') || 0); // get adult ticket nmber from basket
        let student = Number(cookies.get('student') || 0); // get student  ticket nmber from basket

        if (id === 1) adult++; // add to existing adults
        if (id === 2) student++; // add to existing students

        cookies.set('adult', adult, { path: '/', maxAge: 86400 }); // set the cookie in local folder (root)
        cookies.set('student', student, { path: '/', maxAge: 86400 });

        // MySql option, better!
        // if no cartID
        // write a try catch block with await.lib.addToCart (adult,student, userID) 
        // must create a cartID
        // put booking in the database with userID and cartID


        return { success: true, adult, student };
    },

    // REMOVE TICKET
    remove: async ({ request, cookies }) => {
        const data = await request.formData();
        const id = Number(data.get('id'));

        let adult = Number(cookies.get('adult') || 0);
        let student = Number(cookies.get('student') || 0);

        if (id === 1 && adult > 0) adult--;
        if (id === 2 && student > 0) student--;

        cookies.set('adult', adult, { path: '/', maxAge: 86400 });
        cookies.set('student', student, { path: '/', maxAge: 86400 });

        // MySql option:
        // write a try catch block with await.lib.reduceCart (adult,student,cartID) for persistent booking here
        // needs UPDATE query based on cartID

        return { success: true, adult, student };
    },

    // CLEAR CART
    clear: async ({ cookies }) => {
        cookies.set('adult', 0, { path: '/' });
        cookies.set('student', 0, { path: '/' });

        // write a try catch block with await.lib.clearCart (adult, student, cartID) for persistent booking here

        return { success: true, adult: 0, student: 0 };
    },

    // PURCHASE
    purchase: async ({ request, cookies }) => {

        // check logged in
        const user = await lib.getLoggedInUser(cookies);
        console.log('user', user);
        if (user==='Guest') {return { success: false, error: 'you must login' }; }

        // get tickets from the cookie
        let adult = Number(cookies.get('adult') || 0); // get adult ticket nmber from basket
        let student = Number(cookies.get('student') || 0); // get student  ticket nmber from basket

        console.log('adult + student', adult + student);
        if (adult + student === 0) {
            return { success: false, error: 'no tickets selected' };
        }

        // MySql option:
        // write a try catch block with await.lib.makeBooking (adult/student) to put the booking into the database and trigger payment
        // must redlete the cart ID and move into a bookings table

        // payment module initiated

        // clear the cookies
        cookies.set('adult', 0, { path: '/' });
        cookies.set('student', 0, { path: '/' });

        throw redirect(303, '/ticket/success'); // see above this requires an import!

    },

    consent: lib.cookieConsent,
    // and for the Login component
    login: lib.loginAction,
    logout: lib.logoutAction
};
