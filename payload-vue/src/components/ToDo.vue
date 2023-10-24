<template>
  <div class="todo-list">
    <h2>Your To-Do List</h2>
    <div class="add-task">
      <input
        v-model="newTask.text"
        class="add-task-input"
        type="text"
        placeholder="Add a new task"
      />
      <select v-model="newTask.category" class="add-task-select">
        <option v-for="category in categories" :key="category._id" :value="category._id">
          {{ category.name }}
        </option>
      </select>
      <button @click="addNewTask" class="add-task-button">Add Task</button>
    </div>

    <div class="add-category">
      <input v-model="newCategory" class="add-category-input" type="text" placeholder="Add a new category" />
      <button @click="addNewCategory" class="add-category-button">Add Category</button>
    </div>

    <ul>
      <li v-for="task in tasks" :key="task._id" class="task-item">
        <div class="task-details">
          <p>{{ task.text }}</p>
          <p class="task-category">Category: {{ getCategoryName(task.category) }}</p>
        </div>
        <div class="task-actions">
          <button @click="editTask(task)" class="edit-button">Edit</button>
          <button @click="deleteTask(task)" class="delete-button">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    todos: Array,
    categories: Array,
  },
  data() {
    return {
      newTask: {
        text: '',
        category: '',
      },
      newCategory: '', // Data for new category
      editedTask: null,
    };
  },
  methods: {
    addNewTask() {
      if (this.newTask.text && this.newTask.category) {
        this.$emit('addTodo', this.newTask);
        this.newTask.text = '';
        this.newTask.category = '';
      }
    },
    editTask(task) {
      this.editedTask = { ...task };
    },
    saveEdit() {
      if (this.editedTask.text && this.editedTask.category) {
        this.$emit('updateTodo', this.editedTask);
        this.editedTask = null;
      }
    },
    deleteTask(task) {
      if (confirm('Are you sure you want to delete this task?')) {
        this.$emit('deleteTodo', task);
      }
    },
    getCategoryName(categoryId) {
      const category = this.categories.find((c) => c._id === categoryId);
      return category ? category.name : 'Unknown';
    },
    addNewCategory() {
      if (this.newCategory) {
        this.$emit('addCategory', this.newCategory);
        this.newCategory = ''; // Reset category input
      }
    },
  },
};
</script>

<style scoped>
.todo-list {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.add-task {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.add-task-input {
  width: 60%;
  padding: 5px;
  margin-right: 10px;
}

.add-task-select {
  width: 25%;
  padding: 5px;
  margin-right: 10px;
}

.add-task-button {
  width: 15%;
  background-color: #008CBA;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-task-button:hover {
  background-color: #005A80;
}

.add-category {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.add-category-input {
  width: 60%;
  padding: 5px;
  margin-right: 10px;
}

.add-category-button {
  width: 15%;
  background-color: #00CC00;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-category-button:hover {
  background-color: #009900;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
}

.task-category {
  font-style: italic;
}

.edit-button {
  background-color: #008CBA;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-button:hover {
  background-color: #005A80;
}

.delete-button {
  background-color: #FF5733;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #C74422;
}
</style>
