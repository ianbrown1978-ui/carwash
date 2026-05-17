<script>
	import Header from "$lib/components/Header.svelte"; 
import Footer from '$lib/components/Footer.svelte';
import Login from '$lib/components/Login.svelte';


	import { loggedInUser } from '$lib/stores/globals.js';

	import { goto } from '$app/navigation'; // needed for redirect!
	import { browser } from '$app/environment'; // needed to detect page fully loaded

    import Register from '$lib/components/Register.svelte';

		// receive the load() return as `data`
	export let data; // This receives the return value from load() in +page.server.js – SvelteKit passes it in automatically
	export let form = {}; // initialise empty object for form submission result/errors   - this is the default svelte storage location for this data


	loggedInUser.set(data.user);
	

	if (form?.user) {
		loggedInUser.set(form.user);
		console.log('logged in');
	}

	//  check to see if logged in (and page fully loaded)
	if (browser && $loggedInUser != 'Guest') {
		console.log('go home');
		alert('You are already logged in'); // simple browser popup
		goto('/'); // redirect to homepage
	}




	// debug line:
	//console.log('data:', data);     // Logs the entire data object received

	// pull out specific variabled=s from data object to be used in the page (good practice)
	// [] used as this is a list of users
	const users = data.users ?? []; // this defaults to an  array if data.users doesnt exist/null

	// below the questionmark after data warns the compiler this may not exist and not to error if it doesnt
	//  {} used as default as an object (key/value pairs)

	const errors = form?.errors ?? {};
	//console.log("errors client side:", errors); // debugging


	/* 
       pull submitted values back into input fields
       note optional chaining: required value={form?.userName ?? ''} is used specifying the value should be the posted data if the page re loads without success (failed validation from server)
       the form? means this field may not be present, ?? '' means OR use empty string if not present
     */

	const userName = form?.values?.userName ?? '';
	const firstName = form?.values?.firstName ?? '';
	const lastName = form?.values?.lastName ?? '';
	const password = form?.values?.password ?? '';
	const passwordCheck = form?.values?.passwordCheck ?? '';

	/*
	above is the same as below de structuring (choose which you prefer)
	const { values = {} } = form; // store the values object (or blank)
	const { userName = '', firstName = '', lastName = '', password = '', passwordCheck = '' } = values; // store each of the properties from values (=values) as local variable
	*/
</script>



<div class="layout">

<Header title={'User Admin'} />

<main>
	<Register {data} form={form} />
</main>

<main-right>
		<Login form={form || {}} /><!-- Login component is passed the form object or empty if none exists -->
		<!-- form object created by the user front end and passed back in for its errors and data properties -->
	</main-right>

	<Footer />
	
</div>