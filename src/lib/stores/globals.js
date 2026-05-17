//// here are client side friendly globals to use

import { writable } from 'svelte/store'; // this is a built in Svelte module

export const loggedInUser = writable('Guest'); // dummy user