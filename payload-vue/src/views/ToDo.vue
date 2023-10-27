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
        {{ todo.Tugas }} - {{ formatDate(todo.Tanggal) }} - {{ todo.Category.nama }}
        <button @click="showModal = true; todoToEdit = todo">Edit</button>
        <button @click="deleteTodo(todo)">Hapus</button>
      </li>
    </ul>
    <div v-if="showModal" class="modal">
      <h2>Edit Todo</h2>
        <form @submit.prevent="editTodo(todoToEdit)">
        <label for="edit-tugas">Tugas:</label><br>
        <input type="text" id="edit-tugas" v-model="todoToEdit.Tugas" required><br>
        <label for="edit-tanggal">Tanggal:</label><br>
        <input type="date" id="edit-tanggal" v-model="todoToEdit.Tanggal" required><br>
        <label for="edit-category">Kategori:</label><br>
        <select id="edit-category" v-model="todoToEdit.Category" required>
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

    setup() {
      const showModal = ref(false)
      const tugas = ref('')
      const tanggal = ref('')
      const category = ref('')
      const todos = ref([])
      const categories = ref([])
      const todoToEdit = ref({})
  
      const fetchTodos = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/Todo',{
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
          alert('Terjadi kesalahan saat mengambil data todo.')
        }
      }
  
      const addTodo = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/Todo', {
            method: 'POST',
            credentials: 'include',
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

      const editTodo = async (todo) => {
      try {
        const response = await fetch(`http://localhost:3000/api/Todo/${todo.id}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tombol: todo.tombol, Tugas: todo.tugas, Tanggal: todo.tanggal, Category: todo.category}),
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        console.log(data)
        alert('Kategori berhasil diubah!')
      } catch (error) {
        console.error(error)
        alert('Terjadi kesalahan saat mengubah todo.')
      }
      showModal.value = false
    }

    const deleteTodo = async (todo) => {
      try {
        const response = await fetch(`http://localhost:3000/api/Todo/${todo.id}`, {
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
        alert('Terjadi kesalahan saat menghapus todo.')
      }
    }


      onMounted(() => {
        fetchTodos()
        fetchCategories()
      })
  
      return { tugas, tanggal, category, todos, categories, addTodo, showModal, editTodo, todoToEdit, deleteTodo}
    },

    methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    }
  }
</script>

 