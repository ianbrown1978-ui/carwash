<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Login from '$lib/components/Login.svelte';

	import { goto } from '$app/navigation'; // needed for redirect!
	import { browser } from '$app/environment'; // needed to detect page fully loaded

	// receive the load() return as `data`
	export let data; // This receives the return value from load() in +page.server.js – SvelteKit passes it in automatically

	let header = {
		title: data.title,
		showBasket: data.showBasket ?? false
	};

	const userDetails = data.userDetails;
	const userBookings = data.userBookings;

	export let form = {}; // initialise empty object for form submission result/errors   - this is the default svelte storage location for this data

	export let loggedInUser = data.user ?? '';
	console.log('loggedInUser', loggedInUser);

	if (form?.user) {
		loggedInUser.set(form.user);
		console.log('logged in');
	}

	// reactive check, only runs in browser
	// if (browser) simply checks if the code is running in the browser (client-side) rather than during server-side rendering.
	if (browser && loggedInUser === 'Guest') {
		console.log('go home');
		alert('You are not logged in, please register'); // simple browser popup
		goto('/register'); // redirect to homepage
	}

	// this is used to translate timeslot into a time
	// object key / value pairs
	const timeslotMap = {
		1: '9:00',
		2: '9:30',
		3: '10:00',
		4: '10:30',
		5: '11:00',
		6: '11:30',
		7: '12:00',
		8: '12:30',
		9: '13:00',
		10: '13:30',
		11: '14:00',
		12: '14:30',
		13: '15:00',
		14: '15:30',
		15: '16:00',
		16: '16:30'
	};
</script>

<div class="layout">
	<Header {...header} />

	<main>
		<h1>User Details</h1>
		Welcome back {loggedInUser}.

		{#if userBookings && userBookings.length > 0}
			Your user ID is: {userDetails.userID}, here are your bookings:
		{:else}
			You have no bookings to display!
		{/if}

		<ul>
			{#each userBookings as booking}
				<li>
					<!-- {booking.bookingDate} — {timeslotMap[booking.timeslot]}  this shows shole timestamp -->
					{new Date(booking.bookingDate).toLocaleDateString('en-GB')} — {timeslotMap[
						booking.timeslot
					]}
				</li>
			{/each}
		</ul>
	</main>

	<main-right>
		<Login
			form={form || {}}
			{loggedInUser}
		/><!-- Login component is passed the form object or empty if none exists -->
		<!-- form object created by the user front end and passed back in for its errors and data properties -->
	</main-right>

	<Footer />
</div>
