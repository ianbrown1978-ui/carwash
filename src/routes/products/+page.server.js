import * as lib from '$lib'; // impot all from index.js in the lib folder

export async function load({ url, cookies }) {

  const washType = url.searchParams.get('washType') || null; // gets wash type if passed by a link: /products?washType=2
  // null ensures washType is null if nothing is found. It’s safe to assign to a variable.

  const user = cookies.get('user') || 'Guest';

  // try and catch block, if try code fails return the err object in a message and an empty product array
  try {

    console.log('washType reporting:', washType);
    let products;
    if (washType && washType !== 'null') {
      products = await lib.getProductsByWashType(washType);
    } else {
      products = await lib.getAllProducts();
    }

    /*
    advanced method for the above (tenary)
    If washType exists, get filtered products; otherwise, get all products. This is a tenary (lesson on this) setting the products object by one function, but if no results defaulting to another
    
    const products = washType
      ? await lib.getProductsByWashType(washType)
      : await lib.getAllProducts();
    */

    // console.log('Fetched products:', products); // logged in console fyi

    return {
      products, // return it in the data object
      title: 'Product Page', // also returning page title
      user
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [] }; // Return an empty array on error
  }
}


export const actions = {

  fetchProducts: async ({ request }) => {
    const formData = await request.formData(); // built in method for forms
    const choice = formData.get('washType');

    if (!choice) { return { error: 'Missing wash type' };}
    // if (!choice) return lib.fail(400, { message: 'Missing wash type' }); // errorif missing choice
    // commented out optional / advanced error type 400:
    
    if (choice === '*') { const products = await lib.getAllProducts(); return { products }; } // get all is choice is for all

    try {
      const products = await lib.getProductsByWashType(choice);
      return { products };
    } catch (err) {
      console.error('Error fetching filtered products:', err);

      return { error: 'Database error', products: [] }; // returns empty array for products (to prevent page failure as the object is called)
      //return lib.fail(500, { message: 'Database error', products: [] });

    }
  },

  login: lib.loginAction,
  logout: lib.logoutAction

};
