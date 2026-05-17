<script>

	export let form = {}; // initialise empty object for form submission result/errors   - this is the default svelte storage location for this data
    export let data;


	let popup = ''; // for popup message '' | 'success' | 'error'

	// debug line:
	//console.log('data:', data);     // Logs the entire data object received

	// pull out specific variabled=s from data object to be used in the page (good practice)
	// [] used as this is a list of users
	const users = data.users ?? []; // this defaults to an  array if data.users doesnt exist/null

	// below the questionmark after data warns the compiler this may not exist and not to error if it doesnt
	//  {} used as default as an object (key/value pairs)

	const errors = form?.errors ?? {};
	//console.log("errors client side:", errors); // debugging

	if (form?.success) {
		popup = 'success'; // used in the html below/bottom
		setTimeout(() => (popup = null), 3000); // message will dissapear after 3 seconds
	}

	if (form?.delete_success) {
		popup = 'delete_success'; // used in the html below/bottom
		setTimeout(() => (popup = null), 3000); // message will dissapear after 3 seconds
	}

	if (form?.errors) {
		popup = 'error';
		setTimeout(() => (popup = null), 3000);
	}

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

<h2>Add User</h2>

	<form class="register" method="POST" action="?/add" novalidate>
		<!-- ?add posts to the add action in page.server -->
		<!-- placeholder used for accessibility -->
		<input name="userName" placeholder="Username" required value={userName} />
		{#if errors.userNameLength}<p class="error">{errors.userNameLength}</p>{/if}
		{#if errors.userNameChars}<p class="error">{errors.userNameChars}</p>{/if}
		{#if errors.userExists}<p class="error">{errors.userExists}</p>{/if}

		<input name="firstName" placeholder="First name" required value={firstName} />
		{#if errors.firstName}<p class="error">{errors.firstName}</p>{/if}

		<input name="lastName" placeholder="Last name" required value={lastName} />
		{#if errors.lastName}<p class="error">{errors.lastName}</p>{/if}

		<input name="password" placeholder="Password" type="password" required value={password} />
		{#if errors.password}<p class="error">{errors.password}</p>{/if}

		<input
			name="passwordCheck"
			placeholder="Password Check"
			type="password"
			required
			value={passwordCheck}
		/>
		{#if errors.passwordCheck}<p class="error">{errors.passwordCheck}</p>{/if}

		<button type="submit">Add</button>
	</form>

	{#if popup === 'success'}
		<div class="popup success">User added successfully!</div>
	{/if}

	{#if popup === 'delete_success'}
		<div class="popup success">User removed successfully!</div>
	{/if}

	{#if popup === 'error'}
		<div class="popup error">Failed to add user.</div>
	{/if}