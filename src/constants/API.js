const baseURL = "http://localhost:5000/";

const endpoints = {
  login: `${baseURL}auth/login`,
  signup: `${baseURL}auth/register`,
  book: `${baseURL}consultation/book`
};

export default endpoints;