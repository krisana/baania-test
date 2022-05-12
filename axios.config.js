import axios from 'axios';

axios.defaults.baseURL = 'https://test-backend.baania.dev';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios;