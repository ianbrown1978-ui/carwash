import { db } from '$lib/server/db.js'; // database connction required

// all database login in these files using form post to keep it simple
// FYI: error object isn’t defined by you — it’s created automatically by JavaScript when something goes wrong inside the try block.
export async function getAllProducts() {
    try {
        const query = 'SELECT * FROM products';
        const [rows] = await db.query(query);
        //console.log('fetched from products:', rows);
        return rows;
        //return Array.isArray(rows) ? rows : []; 
        // this more advanced would return only if an array, the ? denotes is true, : then default
    } catch (error) {
        console.error('Database query failed:', error);
        return [];
    }
}


// security feature: The question mark (?) in the SQL query is a placeholder for a parameter. 
// When you use parameterized queries, the actual value for the placeholder is provided separately, which helps prevent SQL injection attacks.
export async function getProductsByWashType(washTypeChoice) {
  try {
    const query = `SELECT * FROM products WHERE washType = ?`;
    const [rows] = await db.query(query, [washTypeChoice]); // this helps prevent sql injection by making it impos to replace washtype choice
    //console.log('Query was:', query);
    return rows;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}


export async function getProductDetails(productID) {

  try {
    const query = `SELECT * FROM products WHERE productID = ?`;
    const [rows] = await db.query(query, [productID]); // this helps prevent sql injection by making it impos to replace washtype choice
    //console.log('Query was:', query);
    return rows[0]; // only one product is expected
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductImages(productID) {

try {
  const query = `
    SELECT * 
    FROM product_images
    WHERE product_images.productID = ?
  `;
  const [rows] = await db.query(query, [productID]);
  //console.log('Query was:', query);
  return rows; // multiple rows, one per image
} catch (error) {
  console.error('Error fetching product details:', error);
  return [];
}

}

//  note the two functions above could be combine, e.g: 
//  products.*, product_images.url, FROM products
//  LEFT JOIN product_images ON products.productID = product_images.productID
//  WHERE products.productID = ? lesson on this?
