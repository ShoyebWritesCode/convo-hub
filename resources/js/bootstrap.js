import axios from 'axios';
window.axios = axios;


console.log('bootstrap.js loaded');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';






