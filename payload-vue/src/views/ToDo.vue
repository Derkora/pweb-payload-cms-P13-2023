<template>
    <div>
      <h2>Todo List</h2>
      <form @submit.prevent="addTodo">
        <label for="tugas">Tugas:</label><br>
        <input type="text" id="tugas" v-model="tugas" required><br>
        <label for="tanggal">Tanggal:</label><br>
        <input type="date" id="tanggal" v-model="tanggal" required><br>
        <label for="category">Kategori:</label><br>
        <select id="category" v-model="category" required>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.nama }}</option>
        </select><br>
        <input type="submit" value="Tambah">
      </form> 
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          {{ todo.Tugas }} - {{ formatDate(todo.Tanggal) }} - {{ todo.Category ? todo.Category : 'Tidak ada kategori' }}
          <button @click="openModal(todo)">Edit</button>
          <button @click="deleteTodo(todo.id)">Hapus</button>
        </li>
      </ul>
      <div v-if="showModal" class="modal">
      <h2>Edit Todo</h2>
      <form @submit.prevent="editTodo">
        <label for="edit-tugas">Tugas:</label><br>
        <input type="text" id="edit-tugas" v-model="editTugas" required><br>
        <label for="edit-tanggal">Tanggal:</label><br>
        <input type="date" id="edit-tanggal" v-model="editTanggal" required><br>
        <label for="edit-category">Kategori:</label><br>
        <select id="edit-category" v-model="editCategory" required>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.nama }}</option>
        </select><br>
        <input type="submit" value="Simpan">
      </form> 
      <button @click="closeModal">Tutup</button>
    </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  
  export default {
    data() {
    return {
      showModal: false,
      editId: null,
      editTugas: '',
      editTanggal: '',
      editCategory: '',
    };
  },

    
    setup() {
      const tugas = ref('')
      const tanggal = ref('')
      const category = ref('')
      const todos = ref([])
      const categories = ref([])
  
      const fetchTodos = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/Todo')
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json()
          todos.value = data.docs
        } catch (error) {
          console.error(error)
          alert('Terjadi kesalahan saat mengambil data todo.')
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
          alert('Terjadi kesalahan saat mengambil data kategori.')
        }
      }
  
      const addTodo = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/Todo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Tugas: tugas.value, Tanggal: tanggal.value, Category: category.value }),
          })
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          alert('Todo berhasil ditambahkan!')
          tugas.value = ''
          tanggal.value = ''
          category.value = ''
          fetchTodos()
        } catch (error) {
          console.error(error)
          alert('Terjadi kesalahan saat menambahkan todo.')
        }
      }

      const editTodo = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/Todo/${this.editId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Tugas: this.editTugas, Tanggal: this.editTanggal, Category: this.editCategory }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        alert('Todo berhasil diperbarui!');
        this.closeModal();
        this.fetchTodos();
      } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan saat memperbarui todo.');
      }
    }


      const deleteTodo = async (id) => {
        try {
          const response = await fetch(`http://localhost:3000/api/Todo/${id}`, { 
            method: 'DELETE' 
        })
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          alert('Todo berhasil dihapus!')
          fetchTodos()
        } catch (error) {
          console.error(error)
          alert('Terjadi kesalahan saat menghapus todo.')
        }
      }
  
      onMounted(() => {
        fetchTodos()
        fetchCategories()
      })
  
      return { tugas, tanggal, category, todos, categories, addTodo, editTodo, deleteTodo }
    },
    methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    openModal(todo) {
      this.showModal = true;
      this.editId = todo.id;
      this.editTugas = todo.Tugas;
      this.editTanggal = todo.Tanggal;
      this.editCategory = todo.Category ? todo.Category.id : '';
    },
    closeModal() {
      this.showModal = false;
    },
  },
  }
  </script>

 