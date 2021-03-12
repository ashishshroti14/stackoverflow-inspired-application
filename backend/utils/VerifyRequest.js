const { verify } = require("jsonwebtoken");

// /**
//  * Verify a Request from Cookies
//  *
//  * @param {import("express").Request} req
//  * @param {string} authToken The name of the cookie to be checked.
//  * @param {string} signatureString The signature string being used
//  *
//  * @returns {object} The verified Object
//  */
const verifyRequest = (req, authToken, signatureString) => {
	const reqCookies = req.headers.cookie;

	const noAuthTokenErr = new Error("Not authorized");
	noAuthTokenErr.code = 9090;

	if (!reqCookies) throw noAuthTokenErr;

	const AuthCookie = reqCookies
		.split(";")
		.filter((str) => str.trim().startsWith(authToken))[0];

	if (!AuthCookie) throw noAuthTokenErr;

	const token = AuthCookie.split("=")[1];
	const payload = verify(token, signatureString);

	return payload;
};

module.exports = verifyRequest;
