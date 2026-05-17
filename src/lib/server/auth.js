// auth.js handles higher-level logic like login actions, cookie setting, redirects — stuff related to authentication workflows.
// functions filed seperately for logic and orgnaistion within the server folder but could all be in one file

import * as lib from '$lib';
import { db } from '$lib/server/db.js'; // database connction required
import * as validators from '$lib/validators.js';
import { redirect } from '@sveltejs/kit';
import crypto from 'crypto';



export async function getLoggedInUser(cookies) {
  let user = '';
  const token = cookies.get('session');

//console.log('SELECT * FROM users WHERE session_token =',token);

  if (!token) return 'Guest';

  const [rows] = await db.execute(
    'SELECT * FROM users WHERE session_token = ?',
    [token]
  );

  if (rows.length === 0) {user='Guest'} else {user=rows[0].userName;}

  console.log('getLoggedInUser user',user);

  return user;
}



// where you see objets in brackets these are not JS style params they are injected as needed by svelte (like req/res in express)
// formData is a built in method for reading raw POSTed form inputs on the server.
export async function loginAction({ request, cookies }) {
  const formData = await request.formData();
  const username = formData.get('username');
  const password = formData.get('password');

  const errors = {};
  let formErrors = false;

  /*
  NOTE: validation removed from the login for logical reason that we dont want to give away username and password requirements with an error
  if it doesnt match just return that statement instead!
  */


  if (formErrors) {
    return {
      errors,
      values: { username, password } // passing these back so the form doesnt go blank
    }
  }


  console.log('auth.js check');
  const user = await lib.identifyUser(username, password);
  if (!user) {
    return {
      errors: { general: 'Invalid username or password' },
      values: { username, password }
    }
  }
 
const token = crypto.randomBytes(32).toString('hex');
console.log('auth.js user',user);
await db.execute('UPDATE users SET session_token = ? WHERE userID = ?', [token, user.userID]);

cookies.set('session', token, {
  httpOnly: false,
  secure: true,
  sameSite: 'strict',
  path: '/',
  maxAge: 86400
});

console.log('getLoggedInUser user',username);


return { username: username };

}

export async function logoutAction({ cookies }) {
  cookies.delete('session', { path: '/' });
  throw redirect(303, '/');  // Redirect to homepage
}

export async function cookieConsent ({ cookies, request }) {
const formData = await request.formData();
const cookieConsent = formData.get('cookieConsent');
console.log('cookieConsent user',cookieConsent);
cookies.set('cookieConsent', cookieConsent, { path: '/' });

// ideally this should be stored
// await db.execute('UPDATE users SET cookieConsent = yes WHERE userID = ?', [user.userID]);
}