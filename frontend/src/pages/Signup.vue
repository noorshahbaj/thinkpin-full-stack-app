<script setup>
import GuestLayout from '../components/GuestLayout.vue';
import axiosClient from '../axios';
import router from '../router';
import { ref } from 'vue';
const data = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

const errors = ref({
    name: [],
    email: [],
    password: [],
})

function submit() {
    axiosClient.get('/sanctum/csrf-cookie').then(response => {
        axiosClient.post("/register", data.value)
            .then(response => {
                router.push({ name: 'Home' })
            })
            .catch(error => {
                console.log(error.response.data)
                errors.value = error.response.data.errors;
            })
    });
}
</script>

<template>
    <GuestLayout>
        <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create new account</h2>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form @submit.prevent="submit" class="space-y-4">
                <div>
                    <label for="name" class="block text-sm/6 font-medium text-gray-900">Full Name</label>
                    <div class="mt-2">
                        <input v-model="data.name" type="name" name="name" id="name"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                    <p class="text-xs/5 text-red-600">{{ errors.name ? errors.name[0] : '' }}</p>
                </div>

                <div>
                    <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
                    <div class="mt-2">
                        <input v-model="data.email" type="email" name="email" id="email"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                    <p class="text-xs/5 text-red-600">{{ errors.email ? errors.email[0] : '' }}</p>
                </div>

                <div>
                    <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
                    <div class="mt-2">
                        <input v-model="data.password" type="password" name="password" id="password"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                    <p class="text-xs/5 text-red-600">{{ errors.password ? errors.password[0] : '' }}</p>
                </div>

                <div>
                    <label for="passwordConfirmation" class="block text-sm/6 font-medium text-gray-900">Repeat
                        Password</label>
                    <div class="mt-2">
                        <input v-model="data.password_confirmation" type="password" name="passwordConfirmation"
                            id="passwordConfirmation"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create
                        an account</button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm/6 text-gray-500">
                Already have an account?
                {{ ' ' }}
                <RouterLink :to="{ name: 'Login' }" class="font-semibold text-indigo-600 hover:text-indigo-500">Login
                    from here
                </RouterLink>
            </p>
        </div>
    </GuestLayout>
</template>

<style scoped></style>
