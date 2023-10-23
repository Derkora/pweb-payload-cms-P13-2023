<script setup>
import { ref } from "vue";

let database = ref([
  {
    name: "Hafiz Akmaldi Santosa",
    nrp: "5027221061"
  },
  {
    name: "Steven Figo",
    nrp: "5027221021"
  },
  {
    name: "Rizki Ramadhani",
    nrp: "5027221013"
  },
])
</script>

<template>
  <h2 class="green">Anggota kelompok:</h2>
  <ul>
      <li v-for="(item, index) in database" :key="index">
        Nama: {{ item.name }} <br>
        NRP: {{ item.nrp }}
      </li>
    </ul>
</template>

<style scoped>
  .li {
    margin: 5px;
  }
</style>