<script>
	// API following https://www.weatherapi.com/docs/

	export let data; //is the default way to receive all props returned from the server load function for that route. It’s automatically populated by SvelteKit.
	export let form; //form in your Svelte page is just a client-side variable holding processed results.

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Login from '$lib/components/Login.svelte';

	import { loggedInUser } from '$lib/stores/globals.js'; // loggedInUser is a shared reactive store to keep track of the current user

	// for API
  // console logs used so you can see what is returned and what you can use on the front end

	const weather = data.weather;
	console.log('weather object', weather);

	const sports = data.sports;
	console.log('sports object', sports);

	loggedInUser.set(data.user);

	if (form?.user) {
		loggedInUser.set(form.user);
		console.log('logged in');
	}
</script>

<div class="layout">
	<Header title={data.title} />

	<main class="dashboard">
		<h1>API Example - Current Weather</h1>
		<!-- https://www.weatherapi.com/docs/   
     one simple object returned shows enough for this 2 mark question
     check the consol logged object to see what data is available  -->
		{#if weather}
			<p>Temperature in {data.location}: {data.weather.current.temp_c}°C</p>
			<p>
				Weather Alert: {data.weather.alerts?.alert?.length
					? data.weather.alerts.alert[0].headline
					: 'None'}
			</p>
			<div class="weather">
				<img src={'https:' + weather.current.condition.icon} alt={weather.current.condition.text} />
				<span>{weather.current.condition.text}, {weather.current.temp_c}°C</span>
			</div>
		{/if}

    <!-- sports is an array object can be looped over
    console log the object to see what data is available rather than relying on the documentation! 
    -->
		{#if sports.football?.length > 0}
			<!-- Check if there are football events -->
			<h3>Football</h3>
			<ul>
				{#each sports.football as event}
					<!-- Loop over each football event -->
					<li>
						{event.match} @ {event.start}
					</li>
				{/each}
			</ul>
		{/if}

	</main>

	<main-right>
		<Login
			form={form || {}}
		/><!-- Login component is passed the form object or empty if none exists -->
		<!-- form object created by the user front end and passed back in for its errors and data properties -->
	</main-right>

	<Footer />
</div>
