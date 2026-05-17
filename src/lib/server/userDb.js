import { db } from '$lib/server/db.js';

//import bcrypt from 'bcrypt'; // requires 'npm install bcrypt' to be run in terminal
import crypto from 'crypto'; // SHA255 encryption module pref by exam board!

// Get all users
export async function getAllUsers() {
  try {
    const query = 'SELECT * FROM users';
    const [rows] = await db.query(query);
    //console.log('[getAllUsers] fetched rows:', rows);
    return Array.isArray(rows) ? rows : []; // tenary structure ( ? - if exists) ( : else return )
  } catch (error) {
    console.error('[getAllUsers] Database query failed:', error);
    return [];
  }
}

export async function getUserDetails(userName) {
  try {
    const query = 'SELECT * FROM users where userName = ?';
    const [rows] = await db.query(query, [userName]);
    return rows[0]; // only one product is expected
  } catch (error) {
    console.error('[getUserDetails] Database query failed:', error);
    return [];
  }
}

// get a users bookings
export async function getUserBookings(userName) {
  let userID;

  // get userID first
  try {
    const query = 'SELECT userID FROM users WHERE userName = ?';
    const [rows] = await db.query(query, [userName]);
    if (rows.length === 0) throw new Error('User not found');
    userID = rows[0].userID;
  } catch (error) {
    console.error('[getUserBookings] User lookup failed:', error);
    return [];
  }

  // then get all their bookings
  try {
    const query = 'SELECT * FROM bookings WHERE userID = ?';
    const [rows] = await db.query(query, [userID]);
    console.log('getUserBookings:',rows);
    return rows;
  } catch (error) {
    console.error('[getUserBookings] Booking query failed:', error);
    return [];
  }
}



// Add a user
export async function addUser(userName, firstName, lastName, password) {
  try {
    const query = 'INSERT INTO users (userName, firstName, lastName, password) VALUES (?, ?, ?, ?)';
    await db.query(query, [userName, firstName, lastName, password]);
  } catch (error) {
    console.error('[addUser] Insert failed:', error);
    throw error;
  }
}

// Delete a user
export async function deleteUser(userName) {
  try {
    const query = 'DELETE FROM users WHERE userName = ?';
    await db.query(query, [userName]);
  } catch (error) {
    console.error('[deleteUser] Delete failed:', error);
    throw error;
  }
}

// ✅ Identify user with password check
export async function identifyUser(userName, password) {
  try {
    const query = 'SELECT * FROM users WHERE userName = ?';
    const [rows] = await db.query(query, [userName]);

    if (rows.length === 0) return null;

    const user = rows[0];
    
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    const match = hash === user.password; // returns true or false
    //bcrpt version: const match = await bcrypt.compare(password, user.password);

    

    if (!match) return null;

    return user;
  } catch (error) {
    console.error('[identifyUser] Login failed:', error);
    return null;
  }
}
