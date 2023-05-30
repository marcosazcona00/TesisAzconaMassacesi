<template>
  <div id="app">
    {{ code }}
    <textarea v-model="code" style="width: 1000px; height: 1000px"/>
    <button @click="send"> Probar </button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      code: null, 
    }
  },
  methods: {
    async send() {
      const { data } = await axios.post('http://localhost:3000/run', { 
        code: this.code, 
        contract: 'notOnlyOwner',
        solName: 'NotOnlyOwner', 
      });
      alert(data);
    }
  }
}
</script>

