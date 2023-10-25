export default {
  addUser: `INSERT INTO users(
    email,
    first_name,
    last_name,
    password
  ) VALUES ($1, $2, $3, $4) RETURNING id, email, first_name as "firstName", last_name as "lastName"
  `,

  checkIfEmailExists: `SELECT email FROM users WHERE email=$1`,

  getUserByEmail: `SELECT first_name as "firstName", last_name as "lastName", email,
  password FROM users WHERE email=$1`,
};
