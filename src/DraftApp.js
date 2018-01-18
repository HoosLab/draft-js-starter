import React, { Component } from 'react';
import { Editor, EditorState, convertToRaw } from 'draft-js';

class DraftApp extends Component {

  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = this.onChange.bind(this);
    this.setDomEditorRef = ref => this.domEditor = ref;
  }

  componentDidMount() {
    this.domEditor.focus();
  }

  onChange(editorState) {
    
    return this.setState({editorState});
  }

  render() {
    return (
      <div className="editor-container">
        <div className="result-view">
          <div>Result</div>
          <div>{JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()), null, '\t')}</div>
        </div>
        <div className="editor-view" onClick={()=>this.domEditor.focus()}>
          <div>Editor</div>
          <Editor
            ref={this.setDomEditorRef}
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder="Enter some text..."
          />
        </div>
      </div>
    );
  }
}

export default DraftApp;