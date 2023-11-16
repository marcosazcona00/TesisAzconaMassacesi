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
      <div class="col">
        <div id="editor"></div>
      </div>
    </div>
    <div v-if="editor" class="editor" id="editor"></div>
  </div>
</template>

<script>
import axios from 'axios';
import { basicSetup } from 'codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { solidity } from '@replit/codemirror-lang-solidity';
import { oneDark } from '@codemirror/theme-one-dark';
import {indentWithTab} from "@codemirror/commands";

import Navbar from './components/Navbar.vue';
import Card from './components/Card.vue';


export default {
  name: 'Home',
  components: { Card, Navbar },
  data() {
    return {
      editor: null,
      cards: [
        { 
          contract: 'notOnlyOwner', 
          solName: 'NotOnlyOwner', 
          title: 'NotOnlyOwner',
          description: 'Completar el metodo test de manera tal que solo el que deployo el contrato de prueba pueda poner modifiedByOwner en true'
        },
      ],
    };
  },
  mounted() {
  },
  methods: {
    setContract(contract) { 
      this.editor = new EditorView({
        state: EditorState.create({
          // doc: this.code,
          doc: contract,
          extensions: [
            basicSetup,
            solidity,
            oneDark,
            keymap.of([indentWithTab]),
          ],
        }),
        parent: document.querySelector('#editor'),
      });
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

