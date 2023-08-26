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
        <b-button @click="test">Probar</b-button>
      </b-card>
    </b-card-group>
  </div>
</template>
<script>
export default {
  props: ['info', 'code'],
  data() {
    return {
    }
  },
  methods: {
    async test() {
      this.$emit('testCode', { info: this.info });
      // const { data } = await axios.post('http://localhost:3000/run', {
      //   code: this.code,
      //   contract: this.info.contract,
      //   solName: this.info.solName
      // })
      // alert(data);
    }
  }
}
</script>
