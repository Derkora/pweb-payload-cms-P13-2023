<template>
      <div>
        <h1>To-do List</h1>
        <nav>
        <RouterLink to="/about/steven">Steven</RouterLink>
        <RouterLink to="/about/hafiz">Hafiz</RouterLink>
        <RouterLink to="/about/dhani">Dhani</RouterLink>
      </nav>
      </div>
  </template>
  
  <style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }

  nav {
  width: 100%;
  font-size: 20px;
  text-align: left;
  margin-top: 1rem;
  }
  nav a.router-link-exact-active {
  color: var(--color-text);
 }

  nav a.router-link-exact-active:hover {
  background-color: transparent;
  }

  nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  }

  nav a:first-of-type {
  border: 0;
  }


</style>

<script setup>

</script>