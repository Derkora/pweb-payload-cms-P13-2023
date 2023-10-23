<template>
  <div class="about">
    <div>
      <h1>To-do List</h1>
    </div>
    <ToDo />
    <router-link :to=" '/about' " class="back-button">Back</router-link>
  </div>
</template>

<style scoped>
.about {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.back-button {
  background: #00bd7e;
  padding: 5px 10px;
  border-radius: 5px;
  color: whitesmoke;
  border-color: #00bd7e;
  cursor: pointer;
}
.back-button:hover {
  background-color: #00bd7e;
  color: black;
}

router-link {
  color: #00bd7e;
  text-decoration: none;
  margin-top: 20px;
  font-weight: bold;
  transition: color 0.3s;
}

router-link:hover {
  color: #008754;
}
</style>

<script setup>
import ToDo from '../components/ToDo.vue'
</script>
