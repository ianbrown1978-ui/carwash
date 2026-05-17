<script>
	// Site available on https://playcode.io/2491361

	
	export let data; //is the default way to receive all props returned from the server load function for that route. It’s automatically populated by SvelteKit.
	
	export let form = {}; //form in your Svelte page how you make form data available on the page
	// If the page is reached normally (no form submitted yet), SvelteKit doesn’t send any form prop → so your ={} default kicks in, preventing errors. 
	// see Login component where this is used, this object is needed by layout.svelte which inclides the login component 
	// the form is actually in this component Login, and this is called in the layout page, but needed here to hold the latest login data

	import Header from "$lib/components/Header.svelte"; // this is the Header component (see lib / components)
	import Footer from '$lib/components/Footer.svelte';
	import Login from '$lib/components/Login.svelte';

	export let loggedInUser = data.user ?? '';
	console.log('loggedInUser', loggedInUser);

	// below is an array of objects, [ opens the array, { opens the object  
	// see presentation, this means we can loop over this array with #each (see html below) and still use the .description meaningful naming
	const routes = [
		{
			path: "/products",
			title: "All Products",
			image: "/img/product/1/1.png",
			description: "Description for Route 1",
		},
		{
			path: "/products?washType=2",
			title: "Route 2",
			image: "/img/product/2/1.png",
			description: "Description for Route 2",
		},
		{
			path: "/products?washType=3",
			title: "Route 3",
			image: "/img/product/3/1.png",
			description: "Description for Route 3",
		},
		{
			path: "/products?washType=4",
			title: "Route 4",
			image: "/img/product/4/1.png",
			description: "Description for Route 4",
		},
	];
</script>

<div class="layout">

<Header title={data.title} /><!-- this is a component being passed the prop data.title -->

<!-- below code is html with svelte tags inside of {}, routes is the array of objects defined at the top of the page -->
<main>
	<div class="grid-container">
		{#each routes as route}<!-- looping syntax -->
			<div class="grid-item">
				<a href={route.path}>
					<img src={route.image} alt={route.title} />
					<div>
						<h2>{route.title}</h2>
						<p>{route.description}</p>
					</div>
				</a>
			</div>
		{/each}
	</div>
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