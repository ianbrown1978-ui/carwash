<script>
	// could be if not product ID found redirect here

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Login from '$lib/components/Login.svelte';
	import { onMount } from 'svelte';

	export let data;
	export let form = {}; // initialise empty object for form submission
	let timeslot = (form?.values?.timeslot) ?? ''; // resilient chaining used, if form doesnt exist timeslot willl be empty but valid

	export let bookingerror ="";

	import { loggedInUser } from '$lib/stores/globals.js'; // loggedInUser is a shared reactive store to keep track of the current user
	loggedInUser.set(data.user);

	if (form?.user) {
		loggedInUser.set(form.user);
		console.log('logged in');
	}

	// these are set up to return empty if they dont exist:
	let productDetails = data.productDetails ?? {}; // full object array

	// for product images
	//let productImages = data.productImages ?? []; // ordered list which COULD be used for images (but isnt)
	let showImages = 3; // how many images to show these put into the static route in folders by productID much easier

	//onMount guarantees the code only runs client-side, once page is fully loaded, avoiding the window is not defined error.
	// success/error of the form
	onMount(() => {
		if (form?.success) {
			// redirect to user bookings
			console.log('go to user bookings');
			alert('Booking complete'); // simple browser popup
			window.location.href = '/user'; // redirect
		}
	});
</script>

<div class="layout">
	<Header title={data.title} />

	<main style="display: flex; gap: 1rem; padding: 1rem;">
		<!-- Left: Full Description -->
		<div style="flex: 1; background-color: #e6f2ff; padding: 1rem;">
			<h2>{productDetails.description}</h2>
			<p>{productDetails.fullDescription}</p>
		</div>

		<!-- Right: Product Image
   added complexity here could be avoided with set number of images and hard code the links 
   note: alt tag is an accesibility requirement to avoid errors! -->

		<div style="flex: 1; background-color: #ccf2ff; padding: 1rem; text-align: center;">
			<!-- in {#each Array(n) as _, i}, _ is the ignored first value (the array element, unused here), and i is the index. It’s common to use _ when you only need the index.-->
			<!-- just save these in a structured way in the static folder -->
			{#each Array(showImages) as _, i}
				<img
					src="/img/product/{productDetails.productID}/{i + 1}.png"
					alt="car wash product {productDetails.productID}"
					width="300"
					style="margin-bottom: 1rem;"
				/>
			{/each}

			<!-- below not used, could be used if images were in the database  
		{#each productImages as image}
			<img
				src={image.url}
				alt={image.alt}
				width="300"
				style="margin-bottom: 1rem;"
			/>
		{/each}
		-->
		</div>

		<!--  Book  -->
		<!--  form action posts the book action AND productID=, IMPORTANT!  -->
		<form class="register" method="POST" action="?/book&productID={productDetails.productID}" novalidate>
			<input type="hidden" name="productID" value={productDetails.productID} />
			<input type="hidden" name="userName" value={$loggedInUser} />

			<label
				>Date:
				<input
					type="date"
					name="bookingDate"
					required
					min={new Date().toISOString().split('T')[0]}
				/></label
			>

			<label
				>Timeslot:
				<select name="timeslot" bind:value={timeslot} required>
					<option value="1">9:00</option>
					<option value="2">9:30</option>
					<option value="3">10:00</option>
					<option value="4">10:30</option>
					<option value="5">11:00</option>
					<option value="6">11:30</option>
					<option value="7">12:00</option>
					<option value="8">12:30</option>
					<option value="9">13:00</option>
					<option value="10">13:30</option>
					<option value="11">14:00</option>
					<option value="12">14:30</option>
					<option value="13">15:00</option>
					<option value="14">15:30</option>
					<option value="15">16:00</option>
					<option value="16">16:30</option>
				</select></label
			>

			<button type="submit">Book</button>
			
			{#if bookingerror}
				<p style="color: red">{bookingerror}</p>
			{/if}
			<p style="color: red">
			{form?.values?.bookingDate}   <!-- the value submitted -->
			{form?.values?.timeslot} <!-- any validation error -->
			{form?.errors?.dateError}   <!-- the value submitted -->
			{form?.errors?.timeError} <!-- any validation error -->
			</p>
		</form>
	</main>

	<main-right>
		<Login
			form={form || {}}
		/><!-- Login component is passed the form object or empty if none exists -->
		<!-- form object created by the user front end and passed back in for its errors and data properties -->
	</main-right>

	<Footer />
</div>
