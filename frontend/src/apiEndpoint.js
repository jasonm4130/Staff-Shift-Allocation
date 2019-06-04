let endpoint;

const deploying = true;

if (deploying) {
    endpoint = 'https://secret-plateau-39065.herokuapp.com/';
} else {
    endpoint = 'http://localhost:3000/api';
}

export default endpoint;