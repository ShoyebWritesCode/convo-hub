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
                    <button @click="currentSection = 'publicChat'; fetchMessages()"
                        :class="{ 'btn': true, 'btn-info': currentSection === 'publicChat', 'btn-secondary': currentSection !== 'publicChat' }">
                        Public Chat
                    </button>

                </div>

                <!-- Section Content -->
                <!-- <div v-if="currentSection === 'chats'">
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
                </div> -->

                <div v-if="currentSection === 'publicChat'">
                    <div class="border-b border-base-200 mb-4">
                        <h3 class="text-lg font-semibold text-base-content">Public Chat</h3>
                    </div>
                    <!-- <div class="flex flex-col space-y-4">
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
                    </div> -->
                </div>

                <!-- <div v-if="currentSection === 'activeUsers'">
                    <div class="border-b border-base-200 mb-4">
                        <h3 class="text-lg font-semibold text-base-content">Active Users</h3>
                    </div>
                    <div class="flex flex-col space-y-4">
                        <div v-for="user in activeUsers" :key="user.id" class="bg-base-200 p-4 rounded-lg shadow-sm">
                            <h4 class="text-lg font-semibold">{{ user.name }}</h4>
                            <p class="text-sm text-base-content">{{ user.status }}</p>
                        </div>
                    </div>
                </div> -->

                <!-- <div v-if="currentSection === 'myGroups'">
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
                </div> -->
            </div>

            <!-- Chat Window -->
            <div class="w-3/4 p-4 bg-base-100 flex flex-col">
                <!-- Chat Header -->
                <div class="border-b border-base-300 mb-4">
                    <h3 class="text-lg font-semibold text-base-content">
                        <!-- {{ currentChat ? `Chat with ${currentChat.name}` : currentGroup ? `Group Chat:
                        ${currentGroup.name}` : 'Public Chat' }} -->
                        Public Chat
                    </h3>

                </div>

                <!-- Chat Messages -->
                <!-- <div class="flex-1 overflow-y-auto bg-base-200 p-4 rounded-lg border border-base-300 mb-4">
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
                </div> -->
                <div ref="messagesContainer"
                    class="flex-1 overflow-y-auto bg-base-200 p-4 rounded-lg border border-base-300 mb-4">
                    <div v-for="message in messages" :key="message.id" class="mb-4">
                        <div class="flex items-start"
                            :class="{ 'justify-end': message.user_id == UID, 'justify-start': message.user_id !== UID }">
                            <div
                                :class="message.user_id == UID ? 'bg-primary text-primary-content' + ' p-2 rounded-lg max-w-xs' : 'bg-accent text-accent-content' + ' p-2 rounded-lg max-w-xs'">
                                <p class="font-semibold"> {{ message.user_id == UID ? 'You' : (message.user ?
                                    message.user.name : message.user_name) }}
                                    <span class="text-neutral-content text-sm">{{ formatTime(message.created_at)
                                        }}</span>
                                </p>
                                <p>{{ message.message }}</p>
                                <p class="text-sm text-neutral-content">
                                    <span v-if="message.seen_by !== null && JSON.parse(message.seen_by).length > 0">
                                        <template
                                            v-for="(path, index) in (typeof message.seen_by === 'string' ? JSON.parse(message.seen_by) : message.seen_by)"
                                            :key="index">
                                            <img :src="path" alt="User's Profile"
                                                class="w-4 h-4 rounded-full inline-block mr-1" />
                                        </template>
                                    </span>
                                </p>

                                <!-- Plus Button for Reactions -->
                                <div class="relative">
                                    <button @click="toggleReactions(message.id)"
                                        class="text-sm text-gray-400 hover:text-gray-600">
                                        +
                                    </button>

                                    <!-- Emoji Reactions -->
                                    <div v-if="message.showReactions"
                                        class="absolute mt-2 bg-white p-2 rounded-lg shadow-lg">
                                        <span v-for="reaction in reactions" :key="reaction"
                                            class="cursor-pointer text-lg mx-1"
                                            @click="reactToMessage(message.id, reaction)">
                                            {{ reaction }}
                                        </span>
                                    </div>
                                </div>
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

<script>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { Head } from '@inertiajs/vue3';
import { ref } from 'vue';




export default {
    components: {
        AuthenticatedLayout,
        Head,

    },
    props: {
        messages: Array,
        UID: Number,
    },
    data() {
        return {
            currentSection: 'publicChat',
            reactions: ['👍', '❤️', '😂'], // Emoji list
            newMessage: '',
            isInitialized: false,
        };
    },

    mounted() {
        this.scrollToBottom();
        console.log(this.UID);
        console.log(this.messages);
        console.log("Initializing Pusher...");
        if (!this.isInitialized) {
            console.log("Initializing Pusher...");
            // this.fetchMessages();
            this.isInitialized = true; // Set flag to true after fetching
        }
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

                this.messages.push({
                    user_id: e.user_id,
                    user_name: e.user_name,
                    message: e.message,
                    created_at: e.created_at,
                });
                this.scrollToBottom();
                this.seenBy();

            });
        console.log("Pusher initialized!");
        // console.log(this.messages);
    },
    methods: {
        sendMessage() {
            if (this.newMessage.trim() === '') return;

            // Send the message to the server using inertia.post
            this.$inertia.post('/send-message', { message: this.newMessage }, {
                onSuccess: () => {

                    console.log('Message sent successfully!');
                    this.newMessage = '';
                },
                onError: (error) => {
                    console.error('Error sending message:', error);
                }
            });
        },

        fetchMessages() {
            console.log('Fetching messages...');
            this.$inertia.get('/public-messages', {}, {
                onSuccess: (response) => {
                    console.log('Response:', response);
                    console.log('Messages:', response.messages);
                },
                onError: (error) => {
                    console.error('Error fetching messages:', error);
                }
            });
        },

        formatTime(timestamp) {
            return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        },

        seenBy() {
            const user_id = this.UID;
            this.$inertia.post('/seen-by', { user_id }, {
                onSuccess: () => {
                    console.log('Seen by sent successfully!');
                },
                onError: (error) => {
                    console.error('Error sending seen by:', error);
                }
            });
        },

        scrollToBottom() {
            const container = this.$refs.messagesContainer;
            container.scrollTop = container.scrollHeight;
            console.log("hello from bottom");
        },

        toggleReactions(messageId) {
            this.messages = this.messages.map(message => {
                if (message.id === messageId) {
                    message.showReactions = !message.showReactions;
                } else {
                    message.showReactions = false;
                }
                return message;
            });
        },

        reactToMessage(messageId, reaction) {
            this.$inertia.post('/react-to-message', { message_id: messageId, reaction: reaction }, {
                onSuccess: () => {
                    console.log('Reaction added successfully!');
                },
                onError: (error) => {
                    console.error('Error adding reaction:', error);
                }
            });
        },

    },
    watch: {
        messages: {
            deep: true, // Enables deep watching for nested properties
            handler(newMessages) {
                newMessages.forEach(message => {
                    this.newMessage = '';
                });
            }
        }
    }
};

</script>
