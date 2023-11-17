<template>
  <div>
    <b-card-group style="width: 50%; cursor: pointer">
      <b-card
        :header="info.title"
        header-tag="header"
        footer-tag="footer"
        :title="info.title"
      >
        <b-card-text>{{ info.description }}</b-card-text>
        <b-button @click="getChallenge">Mostrar codigo</b-button>
        <b-button v-if="show" @click="test">Probar</b-button>
      </b-card>
    </b-card-group>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  props: ['info', 'code'],
  data() {
    return {
      show: false,
    }
  },
  methods: {
    async getChallenge() {
      // const { data: contracts } = await axios.get(`http://localhost:3000/challenge/${this.info.contract}`);
      const { data: contracts } = await axios.get(`http://localhost:3000/challenge/reentrancy`);
      this.$emit('setContract', contracts)
      this.show = true;
    },
    async test() {
      this.$emit('testCode', { info: this.info });
    }
  }
}
</script>
