<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import InputError from '@/Components/InputError.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import FileInput from '@/Components/FileInput.vue'

const fileInput = ref(null);
// const profileImageUrl = ref('/path/to/default/image.jpg'); // Replace with actual path

const form = useForm({
    profile_picture: null,
});

const uploadProfilePicture = () => {
    let formData = new FormData();
    formData.append('profile_picture', form.profile_picture);
    // console.log(formData.get('profile_picture'));

    form.post(route('profile.picture.upload'), {
        preserveScroll: true,
        data: {
            profile_picture: form.profile_picture,
        },
        onSuccess: () => {
            // Handle success (e.g., update profileImageUrl to new image URL)
            console.log("hi");
        },
        onError: (error) => {
            // Handle error
            console.log(error);
        },
        onFinish: () => form.reset(),
    });
};
</script>

<template>
    <section class="space-y-6">
        <header>
            <h2 class="text-lg font-medium text-gray-900">Profile Picture</h2>

            <p class="mt-1 text-sm text-gray-600">
                Upload a new profile picture or keep your current one.
            </p>
        </header>

        <!-- Display Existing Profile Picture -->
        <!-- <div class="mt-4">
            <img :src="profileImageUrl" alt="Profile Picture" class="w-24 h-24 rounded-full object-cover">
        </div> -->

        <!-- Profile Picture Upload Form -->
        <div class="mt-4">
            <file-input type="file" ref="fileInput" class="block w-full text-sm text-gray-600" accept="image/*"
                @change="form.profile_picture = $event.target.files[0]" v-model="form.profile_picture" />
            <InputError :message="form.errors.profile_picture" class="mt-2" />
        </div>

        <!-- Upload & Cancel Buttons -->
        <div class="mt-6 flex justify-end">
            <SecondaryButton @click="fileInput.value = null; form.reset()">Cancel</SecondaryButton>

            <PrimaryButton class="ms-3" :class="{ 'opacity-25': form.processing }" :disabled="form.processing"
                @click="uploadProfilePicture">
                Upload
            </PrimaryButton>
        </div>
    </section>
</template>
