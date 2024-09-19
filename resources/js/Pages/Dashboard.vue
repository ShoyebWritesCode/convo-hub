<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import axios from 'axios'; // Import axios for sending messages
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const currentSection = ref('chats');
const currentChat = ref(null);
const currentGroup = ref(null);
const newMessage = ref('');
const messages = ref([]);

// Example static data for chats, users, and groups
const chats = ref([
    { id: 1, name: 'John Doe', lastMessage: 'Hey there!' },
    { id: 2, name: 'Jane Smith', lastMessage: 'How are you?' },
]);

const activeUsers = ref([
    { id: 1, name: 'Alice', status: 'Online' },
    { id: 2, name: 'Bob', status: 'Away' },
]);

const groups = ref([
    { id: 1, name: 'Developers', description: 'Group for developers' },
    { id: 2, name: 'Designers', description: 'Group for designers' },
]);

const sendMessage = () => {
    if (newMessage.value.trim() === '') return;

    // Send message to the server
    axios.post('/send-message', { message: newMessage.value })
        .then(response => {
            newMessage.value = ''; // Clear input after sending
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });
};

const openChat = (chatId) => {
    currentChat.value = {
        id: chatId,
        name: chats.value.find(chat => chat.id === chatId).name,
        messages: [
            { id: 1, user: 'John Doe', timestamp: '10:00 AM', message: 'Hello!' },
            { id: 2, user: 'Me', timestamp: '10:05 AM', message: 'Hi there!' },
        ],
    };
};

const openGroup = (groupId) => {
    currentGroup.value = {
        id: groupId,
        name: groups.value.find(group => group.id === groupId).name,
        messages: [
            { id: 1, user: 'Alice', timestamp: '09:00 AM', message: 'Welcome to the group!' },
            { id: 2, user: 'Me', timestamp: '09:15 AM', message: 'Thanks for adding me!' },
        ],
    };
};

const receiveMessage = (message) => {
    // Push messages to appropriate sections
    if (currentSection.value === 'publicChat') {
        messages.value.push(message);
    } else if (currentChat.value) {
        currentChat.value.messages.push(message);
    } else if (currentGroup.value) {
        currentGroup.value.messages.push(message);
    }
};

onMounted(() => {
    // Initialize Echo
    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: 'bc83ac2e6e45a5d63f70',
        cluster: 'ap2',
        encrypted: true,
    });

    // Listen for messages on the 'chat' channel
    Echo.channel('chat')
        .listen('MessageSent', (event) => {
            receiveMessage(event.message);
        });

    // Optionally subscribe to a public channel if needed
    Echo.channel('public')
        .listen('MessageSent', (event) => {
            receiveMessage(event.message);
        });
});
</script>

<template>

    <Head title="Chat Dashboard" />

    <AuthenticatedLayout>
        <div class="flex h-screen bg-base-100">
            <!-- Sidebar Navigation -->
            <div class="w-1/4 p-4 border-r border-base-300 bg-base-200">
                <!-- Toggle Buttons -->
                <div class="flex flex-col space-y-2 mb-4">
                    <button @click="currentSection = 'chats'"
                        :class="{ 'btn': true, 'btn-info': currentSection === 'chats', 'btn-secondary': currentSection !== 'chats' }">Chats</button>
                    <button @click="currentSection = 'activeUsers'"
                        :class="{ 'btn': true, 'btn-info': currentSection === 'activeUsers', 'btn-secondary': currentSection !== 'activeUsers' }">Active
                        Users</button>
                    <button @click="currentSection = 'myGroups'"
                        :class="{ 'btn': true, 'btn-info': currentSection === 'myGroups', 'btn-secondary': currentSection !== 'myGroups' }">My
                        Groups</button>
                    <button @click="currentSection = 'publicChat'"
                        :class="{ 'btn': true, 'btn-info': currentSection === 'publicChat', 'btn-secondary': currentSection !== 'publicChat' }">Public
                        Chat</button>
                </div>

                <!-- Section Content -->
                <div v-if="currentSection === 'chats'">
                    <div class="border-b border-base-200 mb-4">
                        <h3 class="text-lg font-semibold text-base-content">Chats</h3>
                    </div>
                    <div class="flex flex-col space-y-4">
                        <div v-for="chat in chats" :key="chat.id" class="bg-base-200 p-4 rounded-lg shadow-sm">
                            <h4 class="text-lg font-semibold">{{ chat.name }}</h4>
                            <p class="text-sm text-base-content">{{ chat.lastMessage }}</p>
                            <button @click="openChat(chat.id)" class="btn btn-accent mt-2">Open Chat</button>
                        </div>
                    </div>
                </div>

                <div v-if="currentSection === 'publicChat'">
                    <div class="border-b border-base-200 mb-4">
                        <h3 class="text-lg font-semibold text-base-content">Public Chat</h3>
                    </div>
                    <div class="flex flex-col space-y-4">
                        <div v-for="message in messages" :key="message.id" class="bg-base-200 p-4 rounded-lg shadow-sm">
                            <div class="flex items-start">
                                <div class="bg-accent text-accent-content p-2 rounded-lg max-w-xs">
                                    <p class="font-semibold">{{ message.user }}
                                        <span class="text-neutral-content text-sm">{{ message.timestamp }}</span>
                                    </p>
                                    <p>{{ message.message }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="currentSection === 'activeUsers'">
                    <div class="border-b border-base-200 mb-4">
                        <h3 class="text-lg font-semibold text-base-content">Active Users</h3>
                    </div>
                    <div class="flex flex-col space-y-4">
                        <div v-for="user in activeUsers" :key="user.id" class="bg-base-200 p-4 rounded-lg shadow-sm">
                            <h4 class="text-lg font-semibold">{{ user.name }}</h4>
                            <p class="text-sm text-base-content">{{ user.status }}</p>
                        </div>
                    </div>
                </div>

                <div v-if="currentSection === 'myGroups'">
                    <div class="border-b border-base-200 mb-4">
                        <h3 class="text-lg font-semibold text-base-content">My Groups</h3>
                    </div>
                    <div class="flex flex-col space-y-4">
                        <div v-for="group in groups" :key="group.id" class="bg-base-200 p-4 rounded-lg shadow-sm">
                            <h4 class="text-lg font-semibold">{{ group.name }}</h4>
                            <p class="text-sm text-base-content">{{ group.description }}</p>
                            <button @click="openGroup(group.id)" class="btn btn-accent mt-2">Open Group</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Chat Window -->
            <div v-if="currentChat || currentGroup || currentSection === 'publicChat'"
                class="w-3/4 p-4 bg-base-100 flex flex-col">
                <!-- Chat Header -->
                <div class="border-b border-base-300 mb-4">
                    <h3 class="text-lg font-semibold text-base-content">
                        {{ currentChat ? `Chat with ${currentChat.name}` : currentGroup ? `Group Chat:
                        ${currentGroup.name}` : 'Public Chat' }}
                    </h3>
                </div>

                <!-- Chat Messages -->
                <div class="flex-1 overflow-y-auto bg-base-200 p-4 rounded-lg border border-base-300 mb-4">
                    <div v-for="message in (currentChat ? currentChat.messages : currentGroup ? currentGroup.messages : messages)"
                        :key="message.id" class="mb-4">
                        <div class="flex items-start">
                            <div class="bg-accent text-accent-content p-2 rounded-lg max-w-xs">
                                <p class="font-semibold">{{ message.user }}
                                    <span class="text-neutral-content text-sm">{{ message.timestamp }}</span>
                                </p>
                                <p>{{ message.message }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Message Input -->
                <div class="border-t border-base-300 pt-4">
                    <input v-model="newMessage" @keyup.enter="sendMessage" class="input input-bordered w-full mb-2"
                        type="text" placeholder="Type your message..." />
                    <button @click="sendMessage" class="btn btn-primary">Send</button>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>
/* Optional: Add custom styles if needed */
</style>
