<template>
  <div>
    <h2>Tambah Kategori Baru</h2>
    <form @submit.prevent="submitForm">
      <label for="nama">Nama Kategori:</label><br>
      <input type="text" id="nama" v-model="nama" required><br>
      <input type="submit" value="Submit">
    </form> 
    <h2>Kategori:</h2>
    <ul>
        <li v-for="category in categories" :key="category.id">
          {{ category.nama }} 
          <button @click="showModal = true; categoryToEdit = category">Edit</button>
          <button @click="deleteCategory(category)">Delete</button>
        </li>
      </ul>

    <div v-if="showModal" class="modal">
        <h2 class="modal-card-title">Edit Kategori</h2>
          <form @submit.prevent="editCategory(categoryToEdit)">
            <label for="nama">Nama Kategori:</label><br>
            <input type="text" id="nama" v-model="categoryToEdit.nama" required><br>
            <input type="submit" value="Submit">
          </form> 
          <button @click="showModal = false">Tutup</button>
      </div>
  </div>
</template>
<style scoped>

* {
  text-align: center;
  
}

li input {
  margin: 0;
  width: 16px;
  height: 16px;
  margin-right: 5%;

}

li {
  list-style: none;
  text-align: center;

}

input {
  width: 70%;
  border-radius: 4px;
  border: none;
  margin-bottom: 16px;
  height: 32px;
}

select {
  width: 70%;
  border-radius: 4px;
  margin-bottom: 16px;
  height: 32px;
}

button {
  background: none;
  background-color: #00bd7e ;
  border: none;
  border-radius: 4px;
  margin-left: 8px;
  padding: 4px;

}

.tambah {
  background-color: #00bd7e ;

}

</style>

<script>
import { ref, onMounted  } from 'vue'

export default {
  setup() {
    const nama = ref('')
    const category = ref('')
    const categories = ref([])
    const showModal = ref(false)
    const categoryToEdit = ref({})

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

    const editCategory = async (category) => {
      try {
        const response = await fetch(`http://localhost:3000/api/Category/${category.id}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nama: category.nama }),
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        console.log(data)
        alert('Kategori berhasil diubah!')
      } catch (error) {
        console.error(error)
        alert('Terjadi kesalahan saat mengubah kategori.')
      }
      showModal.value = false
    }

    const deleteCategory = async (category) => {
      try {
        const response = await fetch(`http://localhost:3000/api/Category/${category.id}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        console.log(data)
        alert('Kategori berhasil dihapus!')
      } catch (error) {
        console.error(error)
        alert('Terjadi kesalahan saat menghapus kategori.')
      }
    }

    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/Category',{
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        categories.value = data.docs
      } catch (error) {
        console.error(error)
        alert('Terjadi kesalahan saat mengambil data category.')
      }
    }
    
    onMounted(() => {
      fetchCategories()
    })

    return { nama, submitForm, category, categories, editCategory, deleteCategory, showModal, categoryToEdit }
  }

}
</script>
