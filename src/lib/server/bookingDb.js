import { db } from '$lib/server/db.js';

// Add a booking

export async function addBooking(userName, productID, timeslot, bookingDate) {
  let userID;

  // get userID from username
  try {
    const query = 'SELECT userID FROM users WHERE userName = ?';
    const [rows] = await db.query(query, [userName]);
    if (rows.length === 0) throw new Error('User not found');
    userID = rows[0].userID;
  } catch (error) {
    console.error('[addBooking] Database query failed:', error);
    return;
  }

  // make the booking
  try {
    const query = 'INSERT INTO bookings (userID, productID, timeslot, bookingDate) VALUES (?, ?, ?, ?)';
    await db.query(query, [userID, productID, timeslot, bookingDate]);
  } catch (error) {
    console.error('[addBooking] Insert failed:', error);
    throw error;
  }
}
