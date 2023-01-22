const db = require('./index.js')
const stars = db.stars;

async function addBalance(id, amount) {
	const user = stars.get(id);

	if (user) {
		user.balance += Number(amount);
		return user.save();
	}

	const newUser = await Users.create({ user_id: id, balance: amount });
	stars.set(id, newUser);

	return newUser;
}

function getBalance(id) {
	const user = stars.get(id);
	return user ? user.balance : 0;
}

module.exports = {addBalance, getBalance};