// Validation functions

import { db } from '$lib/server/db.js'; // database connction required

// async means wait for one query to finish before running aother
export async function validateUserExists(userName) {

    try {
        const [existing] = await db.query('SELECT * FROM users WHERE userName = ?', [userName]);
        if (existing.length > 0) {
            console.log('failed, userName exists');
            return 'User-name exists';
        }
    } catch (error) {
        console.error('❌ Error checking user existence:', error);
        return 'Database error during user existence check';
    }
}


// this function could be used on any field
export function validateChars(inputText) {
    if (/[^a-zA-Z0-9]/.test(inputText)) {
        console.log('failed, invalid characters used');
        return 'Fields can only contain letters and numbers';
    }
}

// specific username valiation
export function validateUserName(userName) {
    if (!userName || userName.length < 3) {
        console.log('failed, username too short');
        return 'User-name must be at least 3 characters long';
    }
}

// password validation
export function validatePassword(password) {
    if (!password || password.length < 6) {
        console.log('failed, password too short');
        return 'Password must be at least 6 characters long';
    }
    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
        console.log('failed, password not num and letter');
        return 'Password must include at least one letter and one number';
    }
}



// password check validation
export function validatePasswordCheck(passwordCheck, password) {
    if (passwordCheck != password) {
        console.log('failed, password doesnt match');
        return 'Password and check must match';
    }
}



// names validation
export function validateFirstName(firstName) {

    if (!firstName || firstName.length < 2) {
        console.log('failed, first name');
        return 'First name must be at least 2 characters long';
    }
}


export function validateLastName(lastName) {

    if (!lastName || lastName.length < 2) {
        console.log('failed, last name');
        return 'Last name must be at least 2 characters long';
    }
}