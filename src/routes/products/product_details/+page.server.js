import * as lib from '$lib'; // impot all from index.js in the lib folder
// 

// this function is passed two built in object, the url and cookies
export async function load({ url, cookies }) {
  const productID = url.searchParams.get('productID') ?? ''; // gets pruduct ID passed by the url (only way to access this page)
  const user = cookies.get('user') || 'Guest';

  try {
  
    const productDetails = await lib.getProductDetails(productID)
    console.log('Fetched products details for:', productID); // Keep this log for now

    // example of how this could be done below with images in a table
    // const productImages = await lib.getProductImages(productID)
    // console.log('Fetched products images:', productImages); // Keep this log for now

    return { title: 'Product Details Page', productDetails, user }; // return it in the data object

  } catch (error) {
    console.error('Error fetching product details:', error);
    return { productDetails: [] }; // Return an empty array on error. product images could be added here.
  }
}

export const actions = {

  // book action is async as it contains await functions
  // 'request' is the HTTP request sent by the browser when the user submits the form.
  book: async ({ request }) => {

    console.log('booking action');

    //.formData() is an async method that parses the POST body as FormData.
    const formData = await request.formData();
    const values = {
      productID: formData.get('productID'),
      userName: formData.get('userName'),
      bookingDate: formData.get('bookingDate'),
      timeslot: formData.get('timeslot')
    };

    const errors = {}; // set up object hold all the errors
    let formErrors = false;

    console.log('values',values);


    //Validation
    // !values means doesnt exist, the exclamation mark is meaningful
    if (!values.bookingDate) {
      errors.dateError = 'You must select a date';
      formErrors = true;
    }

    if (!values.timeslot) {
      errors.timeError = 'You must select a time';
      formErrors = true;
    }

    console.log('formErrors',formErrors); // logging output in consol

    if (formErrors) {
      return { errors, values }; // so these can be shown in the front end to the user
    }

    try {
      console.log('Sending booking', values);
      await lib.addBooking(values.userName, values.productID, values.timeslot, values.bookingDate, );
    } catch (error) {
      console.log('Fail booking');
      return { bookingerror:'these was a booking error', values  };
    }

    return { success: true };

  }

  ,
  login: lib.loginAction,
  logout: lib.logoutAction
};