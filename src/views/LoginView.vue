<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Vue3Lottie } from "vue3-lottie";
import doctorAnimation from "@/assets/doctor.json";

const username = ref("");
const password = ref("");
const errorMessage = ref("");
const store = useStore();
const router = useRouter();

const animationOptions = {
  animationData: doctorAnimation,
  loop: true,
};

const handleLogin = () => {
  if (username.value === "test" && password.value === "1234") {
    store.dispatch("login", "fake-jwt-token");
    console.log("DOBAR SI");
    router.push("/");
  } else {
    errorMessage.value = "Krivi pristupni podaci!";
  }
};
</script>

<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="animation-container">
        <Vue3Lottie
          class="lottie"
          :animationData="animationOptions.animationData"
          :loop="animationOptions.loop"
        />
      </div>

      <form @submit.prevent="handleLogin">
        <input
          v-model="username"
          type="text"
          placeholder="Korisničko ime"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Zaporka"
          required
        />
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <button type="submit">Prijava</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Full-screen centering */
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

/* Login container */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

/* Lottie animation */
.animation-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 1px;
}

.lottie {
  width: 250px;
  height: 250px;
}

/* Input styling */
input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Error message */
.error {
  color: red;
  font-size: 14px;
}

/* Button styling */
button {
  background: #ea708e;
  color: white;
  padding: 12px;
  border: none;
  cursor: pointer;
  width: 100%;
  border-radius: 5px;
  transition: 0.3s;
}

button:hover {
  background: #d95c79;
}
</style>
