<script>
	export let title = "Default Title";
	export let showBasket = false; // defaults to false if showBasket not passed
</script>
<style>
    /* local css to this component, for easy editing */

	h1 {
		margin: 0;
	}
</style>
<header>
	<div class="header-left">
		<!-- use the folder img inside static as it stays consisntent/static! -->
		<img src="/img/logo.png" alt="Logo" id="logo" style="height: 50px;" />
	</div>
	<div class="header-right">
		<h1>{title}</h1>
	</div>
</header>
<nav>

	<div>

	<a href="/">
		<button>Home</button>
	</a>

	<a href="/products?washType=null" rel="external">
		<button>Products</button>
	</a>
	
	<!-- the rel=external is needed to reload the data for the page when clicked-->
	<a href="/products?washType=2" rel="external">
		<button>Wash Type 2</button>
	</a>
	<a href="/products?washType=3" rel="external">
		<button>Wash Type 3</button>
	</a>
	<a href="/backend">
		<button>Admin</button>
	</a>

	<a href="/register">
		<button>Register</button>
	</a>

	<a href="/dashboard">
		<button>API</button>
	</a>

	<a href="/user">
		<button>User</button>
	</a>

	<a href="/ticket">
		<button>Ticket</button>
	</a>
	{#if showBasket}
  <a href="/ticket">
    <img src="img/basket.jpg" alt="Basket" style="width:30px; height:30px;">
  </a>
  {:else}
  Empty
{/if}



</div>
    
</nav>