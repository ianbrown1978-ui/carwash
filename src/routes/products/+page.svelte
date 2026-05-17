<script>
	export let data;
	export let form;

	import Header from "$lib/components/Header.svelte"; 
import Footer from '$lib/components/Footer.svelte';
import Login from '$lib/components/Login.svelte';

	import { loggedInUser } from '$lib/stores/globals.js';
	
	loggedInUser.set(data.user);
	

	if (form?.user) {
		loggedInUser.set(form.user);
		console.log('logged in');
	}

	let products = form?.products ?? data.products ?? [];
</script>

<div class="layout">

<Header title={data.title} />

<main>
	<div
		style="display: flex; flex-direction: column; align-items: center; justify-content: center; "
	>
		<!-- Buttons -->
		<div
			class="buttons"
			style="display: flex; flex-direction: column; align-items: center; margin-bottom: 20px;"
		>
			<!-- Show All -->
			<div style="margin-bottom: 0.5rem;">
				<form method="POST" action="?/fetchProducts">
					<input type="hidden" name="washType" value="*" />
					<button type="submit">Show All Products</button>
				</form>
			</div>

			<!-- Wash Type Buttons -->
			<div>

			
				{#each [1, 2, 3, 4] as washType} <!-- data 1,2,3,4 setup for use related to wash type in database -->
					<form method="POST" action="?/fetchProducts" style="display: inline;">
						<input type="hidden" name="washType" value={washType} />
						<button type="submit">Wash Type {washType}</button>
					</form>
				{/each}
			</div>
		</div>

		<!-- Products Table -->
		<table>
			<thead>
				<tr>
					<th>Description</th>
					<th>Price</th>
					<th>Image</th>
				</tr>
			</thead>
			<tbody>
				{#each products as product}
					<tr>
						<td>
							<a href="/products/product_details?productID={product.productID}">
								{product.description}
							</a>
						</td>
						<td>{product.price}</td>
						<td>
							<img
								src="/img/product/{product.productID}/1.png"
								alt="Pic for {product.description}"
								width="100"
								height="100"
							/>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

</main>


<main-right>
		<Login form={form || {}} /><!-- Login component is passed the form object or empty if none exists -->
		<!-- form object created by the user front end and passed back in for its errors and data properties -->
	</main-right>

	<Footer />
	
</div>