<template>
  <div id="app">
    <Navbar />
    <div class="row">
      <div class="col">
        <div v-for="card,i in cards" :key="i" style="margin-top: 50px; margin-left: 20px">
          <Card 
            :title="card.title"
            :info="card"
            :code="code"
          />
        </div>
      </div>
      <div class="col">
        <textarea v-model="code" style="width: 800px; height: 70vh; margin-top: 20px" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from './components/Navbar.vue';
import Card from './components/Card.vue';

export default {
  name: 'Home',
  components: { Navbar, Card },
  data() {
    return {
      code: null, 
      cards: [
        { 
          contract: 'notOnlyOwner', 
          solName: 'NotOnlyOwner', 
          title: 'NotOnlyOwner',
          description: 'Completar el metodo test de manera tal que solo el que deployo el contrato de prueba pueda poner modifiedByOwner en true'
        }
      ]
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

