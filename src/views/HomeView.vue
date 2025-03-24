<template>
  <div class="home">
    <MedicalPatients />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MedicalPatients from "@/components/MedicalPatients.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    MedicalPatients,
  },
});
</script>
