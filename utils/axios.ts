import axios from "axios";

export default axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
		"Cache-Control": "no-cache",
	},
	withCredentials: true,
	timeout: 60000, // 10 seconds timeout
});
