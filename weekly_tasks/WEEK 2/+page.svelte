<script>
/*

REPLACE home route with this

The front page shows 4 products in a grid
You will need an object containing 4 products
You have the static folder giving you the location of the product images (and the standard name)
Complete this exercise with BOTH array and object structure

*/

/*


Script tag at the top should start the page

Receive the data from the server page

Import header and footer components


*/

/*

The CSS you will need for the HTML part is:

<div class="layout"> (for grid structure)

Include the header compoentns (grid row 1) and pass in the title prop

<main> (grid row 2)

Loop through using 'each' (for array) or referencing the object directly object.property (for objects)

<div class="grid-container"> (parent to the 4 items)
<div class="grid-item"> (detail of each product)

Include the footer component, add a useful prop to this and edit footer to display this

Check the html tags have all been closed and you are ready to test with npm run dev


*/

/*


Next add in the loggedInUser by importing this from "$lib/stores/globals.js"

import { loggedInUser } from "$lib/stores/globals.js"; 
use the .set(set to object); method available on this object to set to 'user' propert of this pages data object



*/



/*

Extended: use CSS page to style yourself, make sure images are included in static folder for the products

Debugging: npm run build, terminal, vis studio errors

Make notes in the code and take screenshots in evidence document

*/
</script>
