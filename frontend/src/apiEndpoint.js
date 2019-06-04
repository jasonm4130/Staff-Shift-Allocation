let endpoint;

const deploying = false;

if (deploying) {
    endpoint = 'https://shift-allocation.herokuapp.com/api';
} else {
    endpoint = 'http://localhost:3000/api';
}

export default endpoint;