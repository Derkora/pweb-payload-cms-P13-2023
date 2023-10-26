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
        <input type="submit" value="Tambah" class="tambah">
      </form> 
      <h2>What to do:</h2>
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <input type="checkbox" id="tombol" v-model="todo.tombol">
          {{ todo.Tugas }} - {{ formatDate(todo.Tanggal) }} - {{ todo.Category }}
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
      text-align: start;

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
      float: right;
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
      const editId = ref('')
      const editTugas = ref('')
      const editTanggal = ref('')
      const editKategori = ref('')
      const tombol = ref('')
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

      const toggleTodo = async (todo) => {
  try {
    const response = await fetch(`http://localhost:3000/api/Todo/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tombol: todo.tombol }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    alert('Todo berhasil diperbarui!');
    await fetchTodos();
  } catch (error) {
    console.error(error);
    alert('Terjadi kesalahan saat memperbarui todo.');
  }
}
      const editTodo = async (editId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/Todo/${editId.value}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Tugas: editTugas.value, Tanggal: editTanggal.value, Category: editKategori.value }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    alert('Todo berhasil diperbarui!');
    closeModal();
    await fetchTodos();
  } catch (error) {
    console.error(error);
    alert('Terjadi kesalahan saat memperbarui todo.');
  }
}


      const deleteTodo = async (id) => {
        try {
          const response = await fetch(`http://localhost:3000/api/Todo/${id}`, { 
            method: 'DELETE',
            headers: {
        'Content-Type': 'application/json',
        }, 
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
  
      return { tugas, tanggal, category, todos, categories, tombol, editId, addTodo, editTodo, deleteTodo, toggleTodo }
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

 