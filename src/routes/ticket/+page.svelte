<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Login from '$lib/components/Login.svelte';

	export let data;
	export let form = {};

	//console.log('data.user', data.user);
	export let loggedInUser = data.user;
	console.log('loggedInUser', loggedInUser);

	// numner of adults and students being returned from the server function
	const adult = data.adult ?? 0;
	const student = data.student ?? 0;
	const adultPrice = data.adultPrice ?? 0;
	const studentPrice = data.studentPrice ?? 0;
	const cookieConsent = data.cookieConsent ?? 'no';

	const error = form?.error ?? ''; // careful with chaining form? as form may not exist

	//if passing multiple variables into header could set up as an object
	let header = {
		title: data.title,
		showBasket: data.showBasket ?? false
	};

	const total = adult * adultPrice + student * studentPrice; // calkculate the price
</script>

<div class="layout">
	<Header {...header} />
	<!-- ...header spreads the object as separate props.  -->

	<main>
		<h2>Your Cart</h2>

		<p>Adult tickets: {adult}</p>
		<p>Student tickets: {student}</p>
		<p><strong>Total: £{total}</strong></p>

		<hr />

		<h2>Add Tickets</h2>

		<form method="POST" action="?/add">
			<input type="hidden" name="id" value="1" />
			<button>Add Adult Ticket</button>
		</form>

		<form method="POST" action="?/add">
			<input type="hidden" name="id" value="2" />
			<button>Add Student Ticket</button>
		</form>

		<h2>Remove Tickets</h2>

		<form method="POST" action="?/remove">
			<input type="hidden" name="id" value="1" />
			<button>Remove Adult Ticket</button>
		</form>

		<form method="POST" action="?/remove">
			<input type="hidden" name="id" value="2" />
			<button>Remove Student Ticket</button>
		</form>

		<h2>Clear Cart</h2>

		<form method="POST" action="?/clear">
			<button>Clear Cart</button>
		</form>

		<form method="POST" action="?/purchase">
			<button>Purchase</button>
			{#if error}
				<p style="color: red;">{error}</p>
			{/if}
		</form>

		{#if cookieConsent === ''||error==='cookieCocookies required'}
			<div class="popup success">
				Consent to cookies?
				<form method="POST" action="?/consent">
					<button name="cookieConsent" value="yes">Yes</button>
					<button name="cookieConsent" value="no">No</button>
				</form>
			</div>
		{/if}
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
