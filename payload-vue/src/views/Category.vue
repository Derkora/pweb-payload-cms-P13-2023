<template>
  <div>
    <h2>Tambah Kategori Baru</h2>
    <form @submit.prevent="submitForm">
      <label for="nama">Nama Kategori:</label><br>
      <input type="text" id="nama" v-model="nama" required><br>
      <input type="submit" value="Submit">
    </form> 
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const nama = ref('')

    const submitForm = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/Category', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nama: nama.value }),
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        console.log(data)
        alert('Kategori berhasil ditambahkan!')
        nama.value = ''
      } catch (error) {
        console.error(error)
        alert('Terjadi kesalahan saat menambahkan kategori.')
      }
    }

    return { nama, submitForm }
  }
}
</script>
