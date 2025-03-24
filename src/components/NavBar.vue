<script setup lang="ts">
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const isAuthenticated = computed(() => store.getters.isAuthenticated);

const handleLogout = () => {
  store.dispatch("logout");
  router.push("/login");
};

const goToHome = () => {
  router.push(isAuthenticated.value ? "/" : "/login");
};
</script>

<template>
  <nav class="navbar">
    <div class="logo-container" @click="goToHome">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </div>
    <div class="nav-links">
      <button v-if="isAuthenticated" @click="handleLogout" class="logout-btn">
        Odjava
      </button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background: #e8b4a3; /* e8b4a3 */
  color: white;
}

.logo-container {
  flex-shrink: 0; /* Prevents shrinking */
  cursor: pointer; /* Makes it look clickable */
}

.logo {
  height: 30px; /* Smaller size */
  width: auto;
  transition: opacity 0.3s;
}

.logo:hover {
  opacity: 0.8; /* Subtle hover effect */
}

/* Moves all links to the right */
.nav-links {
  display: flex;
  gap: 20px;
  margin-left: auto; /* Pushes all links to the right */
  align-items: center;
}

.nav-links a,
.nav-links button {
  color: black;
  text-decoration: none;
  font-size: 20px;
  transition: 0.3s;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
}

.nav-links a:hover,
.nav-links button:hover {
  text-decoration: underline;
}

.logout-btn {
  background: red;
  color: white;
  border-radius: 5px;
  transition: 0.3s;
}

.logout-btn:hover {
  background: darkred;
}
</style>
