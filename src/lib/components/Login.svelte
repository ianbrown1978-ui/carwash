<script>
	export let form = {}; // this sets up a blank array in case a form object is not recevied the page wont crash
	export let loggedInUser = {};

	// form.errors and form.values come from server passing form object (by default)

	// de structuring:
	const { errors = {}, values = {} } = form; // extracts errors and values from the form object, providing defaults {} if form or its properties are undefined.
	/*
	above (de structured)  would be the same as below, so you can use either method
	const errors = form?.errors ?? {};
	const values = form?.values ?? {};
	*/

	//import { loggedInUser } from '$lib/stores/globals';
	//const loggedInUser = cookies.get('user') || 'Guest';
	console.log('logged in user from login component:', loggedInUser);
</script>

{#if loggedInUser === 'Guest'}
	<form method="POST" action="?/login" novalidate>
		<!-- ?login posts to the login action in page.server -->
		<!-- novalidate is an HTML form attribute that disables the browser’s built-in form validation (like “Please fill out this field” pop-ups). -->
		<input
			name="username"
			placeholder="Username"
			value={values.username}
			aria-invalid={errors.username ? 'true' : 'false'}
		/>
		<!-- aria-invalid (optional) tells assistive technologies (like screen readers) whether a form field’s current value is invalid.
			 also note that the value of udername can be blank but only if there is no form object containing this data (i.e a failed login)  -->
		{#if errors.username}
			<span style="color: red">{errors.username}</span>
		{/if}

		<input
			type="password"
			name="password"
			placeholder="Password"
			value={values.password}
			aria-invalid={errors.password ? 'true' : 'false'}
		/>

		{#if errors.password}
			<span style="color: red">{errors.password}</span>
		{/if}

		<button type="submit">Login</button>

		{#if errors.general}
			<p style="color: red">{errors.general}</p>
		{/if}
	</form>
{:else}
	<h3>Welcome, {loggedInUser}</h3>
	<form method="POST" action="?/logout">
		<button type="submit">Logout</button>
	</form>
{/if}
