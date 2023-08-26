<template>
    <div id="editor"></div>
</template>
<script>
import { basicSetup } from 'codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { solidity } from '@replit/codemirror-lang-solidity';
import { oneDark } from '@codemirror/theme-one-dark'
import {indentWithTab} from "@codemirror/commands"

export default {
  name: 'CodeEditor',
  props: ['code'],
  data() {
    return {
      editor: null,
    };
  },   
  mounted() {
    this.editor = new EditorView({
      state: EditorState.create({
        doc: this.code,
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
}
</script>