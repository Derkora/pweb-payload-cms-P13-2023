<template>
    <div>
        <ul>
        <li v-for="log in logs" :key="log.id">
          {{ log.namalog }} - {{ log.action }} - {{ formatDate(log.timestamp) }} 
        </li>
      </ul>
    </div>

</template>
<script> 
import { ref, onMounted } from 'vue'
  
  export default {
    setup() {
        const log = ref('')
        const logs = ref([])

        const fetchLogs = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/Log',{
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
          logs.value = data.docs
        } catch (error) {
          console.error(error)
          alert('Terjadi kesalahan saat mengambil data Log.')
        }
      }
      onMounted(() => {
        fetchLogs()
      })
  
      return {log, logs}
    },
    methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
}
    
}

</script>