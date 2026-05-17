import * as lib from '$lib';
import * as validators from '$lib/validators.js';
import crypto from 'crypto'; // SHA255 encryption module

// this page is for server side only queries 

export async function load({ cookies }) {

  const user = await lib.getLoggedInUser(cookies);
  let showBasket = Number(cookies.get('adult'))>0 || Number(cookies.get('student'))>0 ? true : false;

  try {
    const users = await lib.getAllUsers(); // call the function!
    //console.log('Fetched users:', users); // Keep this log for now
    return { users, user }; // return it in the data object
  } catch (error) {
    console.error('Error fetching users:', error);
    return { users: [], user, showBasket }; // Return an empty array on error
  }
}


export const actions = {
  // these actions will be returned inside the form object not the data object!
  
  add: async ({ request }) => {

    // trim() removes spaces (and other whitespace like tabs or newlines) from the start and end of a string, but not from the middle.

    const form = await request.formData(); // built in formData object again using the request object

    // set these up in a value object from the start
    const values = {
      userName: form.get('userName').trim(),
      firstName: form.get('firstName').trim(),
      lastName: form.get('lastName').trim(),
      password: form.get('password').trim(),
      passwordCheck: form.get('passwordCheck').trim()
    };

    const errors = {}; // set up object hold all the errors
    let formErrors = false;

    // Run validations and collect any error messages

    const userNameError = validators.validateUserName(values.userName);
    if (userNameError) {
      errors.userNameLength = userNameError;// the if function presents accessing an ampty object
      formErrors = true;
    }

    const invalidCharsError = validators.validateChars(values.userName);
    if (invalidCharsError) {
      errors.userNameChars = invalidCharsError;// the if function presents accessing an ampty object
      formErrors = true;
    }

    const existsError = await validators.validateUserExists(values.userName);
    if (existsError) {
      errors.userExists = existsError;
      formErrors = true;
    }

    const firstError = validators.validateFirstName(values.firstName);
    if (firstError) {
      errors.firstName = firstError;
      formErrors = true;
    }

    const lastError = validators.validateLastName(values.lastName);
    if (lastError) {
      errors.lastName = lastError;
      formErrors = true;
    }

    const passwordError = validators.validatePassword(values.password);
    if (passwordError) {
      errors.password = passwordError;
      formErrors = true;
    }

    const passwordCheckError = validators.validatePasswordCheck(values.passwordCheck, values.password);
    if (passwordCheckError) {
      errors.passwordCheck = passwordCheckError;
      formErrors = true;
    }

    if (formErrors) {
      return { errors, values }; //
    }

    try {
      const passwordHash = crypto
        .createHash('sha256')
        .update(values.password)
        .digest('hex');

      console.log('Hashed password:', passwordHash);
      await lib.addUser(values.userName, values.firstName, values.lastName, passwordHash);
    } catch (error) {
      return { errors: { db: 'Failed to add user' } };
    }


    return { success: true };
  },

  delete: async ({ request }) => {
    const form = await request.formData();
    const userName = form.get('userName');

    if (!userName) {
      return { errors: { userName: 'Missing userName for deletion' } };
      //return lib.fail(400, { errors: { userName: 'Missing userName for deletion' } });
    }

    try {
      await lib.deleteUser(userName);
    } catch (error) {
      return { errors: { db: 'Failed to delete user' } };
      //return lib.fail(500, { errors: { db: 'Failed to delete user' } });
    }

    return { delete_success: true };
  },

  // and for the Login component
  login: lib.loginAction,
  logout: lib.logoutAction
};
