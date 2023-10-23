<template>
    <div class="task">
      <h2 class="green">Smangat beb {{ $route.params.id }}</h2>
  
      <!-- Tombol untuk menampilkan modal tambah tugas -->
      <button @click="showAddTaskModal" class="tambahTugas">Tambah Tugas</button>
  
      <!-- Dropdown untuk memilih kategori pengurutan -->
      <div>
        <label for="sortCategory">Urutkan berdasarkan Kategori:</label>
      </div>
      <select v-model="selectedSortCategory" id="sortCategory" class="category">
        <option value="" class="option">Semua Kategori</option>
        <option v-for="category in uniqueCategories" :key="category" class="option">{{ category }}</option>
      </select>
  
      <!-- Modal untuk menambah/mengedit tugas -->
      <div v-if="isTaskModalVisible" class="modal">
        <div class="modal-content">
          <h3>{{ isEditing ? 'Edit Tugas' : 'Tambah Tugas Baru' }}</h3>
          <label for="taskName">Nama Tugas:</label>
          <input v-model="task.name" id="taskName" type="text" />
  
          <label for="taskCategory">Kategori:</label>
          <select v-model="task.category" id="taskCategory">
            <option value="Tugas">Tugas</option>
            <option value="Belanja">Belanja</option>
            <option value="Praktikum">Praktikum</option>
          </select>
  
          <label for="taskDate">Tanggal:</label>
          <input v-model="task.date" id="taskDate" type="date" />
  
          <label for="taskPriority">Prioritas:</label>
          <select v-model="task.priority" id="taskPriority">
            <option value="">Tanpa Prioritas</option>
            <option value="!">Prioritas Rendah (!)</option>
            <option value="!!">Prioritas Sedang (!!)</option>
            <option value="!!!">Prioritas Tinggi (!!!)</option>
          </select>
  
          <button @click="saveTask">{{ isEditing ? 'Simpan Perubahan' : 'Simpan' }}</button>
          <button @click="closeTaskModal">Batal</button>
        </div>
      </div>
  
      <!-- Daftar tugas -->
      <ul>
        <li v-for="(task, index) in sortedTasks" :key="index" class="task-item">
          <input type="checkbox" v-model="task.completed" />
          <span :class="getPriorityClass(task.priority)">{{ task.name }}</span> | {{ task.category }} | {{ task.date }}
          <button @click="editTask(index)" class="edit-button">Edit</button>
          <button @click="deleteTask(index)" class="delete-button">Hapus</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isTaskModalVisible: false,
        isEditing: false,
        task: {
          name: "",
          category: "Tugas",
          date: "",
          priority: ""
        },
        tasks: [],
        selectedSortCategory: ""
      };
    },
    computed: {
      // Menggunakan nama pengguna sebagai bagian dari kunci local storage
      localStorageKey() {
        return `tasks_${this.$route.params.id}`; // Gunakan ID pengguna atau identifikasi unik lainnya
      },
      // Mengambil tugas dari local storage sesuai dengan entitas yang diidentifikasi
      storedTasks() {
        const tasksJSON = localStorage.getItem(this.localStorageKey);
        return tasksJSON ? JSON.parse(tasksJSON) : [];
      },
      sortedTasks() {
        if (this.selectedSortCategory) {
          return this.tasks.filter(task => task.category === this.selectedSortCategory);
        } else {
          return this.tasks;
        }
      },
      uniqueCategories() {
        return [...new Set(this.tasks.map(task => task.category))];
      }
    },
    created() {
      // Mengambil daftar tugas dari local storage saat komponen dibuat
      this.tasks = this.storedTasks;
    },
    methods: {
      showAddTaskModal() {
        this.isTaskModalVisible = true;
        this.isEditing = false;
        this.resetTask();
      },
      closeTaskModal() {
        this.isTaskModalVisible = false;
        this.resetTask();
      },
      saveTask() {
        if (
          this.task.name.trim() === "" ||
          this.task.date.trim() === ""
        ) {
          alert("Harap isi semua input!");
          return;
        }
  
        if (this.isEditing) {
          // Mengedit tugas yang ada
          this.tasks[this.editingIndex] = { ...this.task };
          this.isEditing = false;
        } else {
          // Menambahkan tugas baru
          this.tasks.push({ ...this.task, completed: false });
        }
  
        // Simpan daftar tugas ke local storage sesuai dengan entitas yang diidentifikasi
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.tasks));
  
        this.closeTaskModal();
      },
      editTask(index) {
        this.isTaskModalVisible = true;
        this.isEditing = true;
        this.editingIndex = index;
        this.task = { ...this.tasks[index] };
      },
      deleteTask(index) {
        this.tasks.splice(index, 1);
        // Simpan daftar tugas ke local storage setelah menghapus
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.tasks));
      },
      resetTask() {
        this.task = { name: "", category: "Tugas", date: "", priority: "" };
      },
      getPriorityClass(priority) {
        switch (priority) {
          case "!":
            return "priority-low";
          case "!!":
            return "priority-medium";
          case "!!!":
            return "priority-high";
          default:
            return "";
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Gaya CSS untuk modal */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: rgb(41, 41, 41);
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    color: whitesmoke;
  }
  
  .modal-content label {
    display: block;
    margin-bottom: 5px;
    color: whitesmoke;
  }
  
  .modal-content input,
  .modal-content select {
    width: 100%;
    padding: 5px;
    margin-bottom: 10px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  }
  
  /* Gaya tombol "Tambah Tugas" */
  .tambahTugas {
    margin-top: 16px;
    margin-bottom: 16px;
    background: none;
    padding: 5px;
    border-radius: 5px;
    color: whitesmoke;
    border-color: #00bd7e;
    border-width: 2px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    cursor: pointer;
  }
  
  /* Gaya dropdown kategori */
  .category {
    margin-top: 16px;
    margin-bottom: 16px;
    background: none;
    padding: 5px;
    border-radius: 5px;
    color: whitesmoke;
    border-color: #00bd7e;
  }
  
  /* Gaya option pada dropdown kategori */
  .option {
    color: black;
  }
  
  /* Gaya umum untuk tampilan daftar tugas */
  .task {
    background-color: rgb(41, 41, 41);
    padding: 32px;
    border-radius: 16px;
    color: whitesmoke;
  }
  
  /* Gaya item tugas */
  .task-item {
    margin-bottom: 10px;
  }
  
  /* Gaya tombol Edit dan Hapus */
  .edit-button,
  .delete-button {
    background: none;
    padding: 5px 10px;
    border-radius: 5px;
    color: whitesmoke;
    border-color: #00bd7e;
    cursor: pointer;
    margin-left: 10px;
  }
  
  /* Gaya hover untuk tombol Edit dan Hapus */
  .edit-button:hover,
  .delete-button:hover {
    background-color: #00bd7e;
    color: black;
  }
  
  /* Gaya teks prioritas rendah */
  .priority-low {
    color: #00bd7e;
    font-weight: bold;
  }
  
  /* Gaya teks prioritas sedang */
  .priority-medium {
    color: #ffcc00;
    font-weight: bold;
  }
  
  /* Gaya teks prioritas tinggi */
  .priority-high {
    color: #ff4444;
    font-weight: bold;
  }
  </style>
  