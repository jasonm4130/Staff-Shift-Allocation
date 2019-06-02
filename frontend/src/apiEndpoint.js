let endpoint;

if (process.env.API_ENDPOINT) {
    endpoint = process.env.API_ENDPOINT;
} else {
    endpoint = 'http://localhost:3000/api';
}

export default endpoint;