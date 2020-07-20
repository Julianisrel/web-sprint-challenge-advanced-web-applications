import react from "React";

export const axiosWithAuth = () => {
	const token = localStorage.getItem('token');
	// will return  an instance of axios
	return axios.create({
		baseURL : 'http://localhost:5000',
		headers : {
			Authorization : token,
		},
	});
};