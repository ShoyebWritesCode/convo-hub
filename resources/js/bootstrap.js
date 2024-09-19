import axios from 'axios';
window.axios = axios;
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

console.log('bootstrap.js loaded');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'bc83ac2e6e45a5d63f70',
    cluster: 'ap2',
    encrypted: true,
});

// Subscribe to the channel and listen for the event
window.Echo.channel('convo-hub')
    .listen('.MessageSent', (e) => {
        console.log('Message received:', e.message);


    });




