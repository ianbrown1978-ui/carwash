// Your lib/index.js is for exporting reusable functions, utilities, and data modules to be imported where needed—it’s a shared library.

// in this file you can export data required by all pages (export means make this available to another page)
// these can then be imported in the page.server files as they are needed
// import { fail, addUser, deleteUser, validateUserName } from '$lib';
// Keep lib/index.js clean, public, and client-safe. Put private logic in lib/server/, and don’t re-export it publicly.

// common imported modules
export { fail } from '@sveltejs/kit'; // this is an optional block to help understand errors

// common files, not secure
export * from '$lib/validators.js'; // form validation

// data queries
export * from '$lib/server/userDb.js'; // userDb
export * from '$lib/server/productDb.js'; // productDb
export * from '$lib/server/bookingDb.js'; // productDb
export * from '$lib/server/db.js'; // database connection including password

// testing!
export * from '$lib/server/auth.js'; // export all the server actions (login cookie set, redirect) not yet used