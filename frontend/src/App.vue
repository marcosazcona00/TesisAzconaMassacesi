<template>
  <div id="app">
    <Navbar />
    <div class="row">
      <div class="col">
        <div v-for="card,i in cards" :key="i" style="margin-top: 50px; margin-left: 20px">
          <Card 
            :title="card.title"
            :info="card"
            :code="''"
            @testCode="testCode"
            @setContract="setContract"
          />
        </div>
      </div>
      <div class="col mt-2">
        <div style="display: flex; gap: 20px">  
          <label 
            v-for="contract, i in contracts" 
            :key="`contracts${i}`" 
            style="cursor: pointer"
            @click="changeEditor(i)"
            :class="{ 'btn btn-primary': i !== actualEditor, 'btn btn-success': i === actualEditor }"
          >
            {{contract.name}}
          </label>          
        </div>
        <div id="editors">
          <div v-for="contract, i in contracts" :key="`editor${i}`" :id="`editor${i}`" v-show="actualEditor === i">
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { basicSetup } from 'codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { solidity } from '@replit/codemirror-lang-solidity';
import { oneDark } from '@codemirror/theme-one-dark';
import { indentWithTab } from "@codemirror/commands";

import Navbar from './components/Navbar.vue';
import Card from './components/Card.vue';


export default {
  name: 'Home',
  components: { Card, Navbar },
  data() {
    return {
      editors: [],
      contracts: [],
      cards: [],
      actualEditor: null,
    };
  },
  mounted() {
    this.getChallenges();
  },
  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    cleanEditor() {
      const editors = document.getElementById('editors');
      editors.innerHTML = '';
      this.editors = [];
      this.contracts = [];
    },
    changeEditor(index) {
      this.actualEditor = index;
    },
    async getChallenges() {
      const { data } = await axios.get('http://localhost:3000/challenges/list');
      this.cards = data;
    },
    async setContract(contracts) { 
      this.cleanEditor();
      this.contracts = contracts;
      this.actualEditor = 0;
      await this.sleep(1); // El sleep es para darle tiempo a que se rendericen los div editores
      contracts.forEach((contract, i) => {
        console.log(`#editor${i}`);
        const editor = new EditorView({
          state: EditorState.create({
            doc: contract.code,
            extensions: [
              basicSetup,
              solidity,
              oneDark,
              keymap.of([indentWithTab]),
            ],
          }),
          parent: document.querySelector(`#editor${i}`),
        });
        this.editors.push(editor);
      })
    },
    async testCode({ info }) {
      const { data } = await axios.post('http://localhost:3000/run', {
        code: this.editor.state.doc.toString(),
        contract: info.contract,
        solName: info.solName
      })
      alert(data.description);
    }
  }
}
</script>

