let endpoint;

if (process.env.NODE_ENV === 'development') {
    endpoint = 'https://shift-allocation.herokuapp.com/api';
} else {
    endpoint = 'http://localhost:3000/api';
}

export default endpoint;