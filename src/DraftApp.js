import React, { Component } from 'react';
import { Editor, EditorState } from 'draft-js';
import ContentStateExample from './example/ContentStateExample';
import SelectionStateExample from './example/SelectionStateExample';

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
          <div className="result-view-title">Result</div>
          <SelectionStateExample editorState={this.state.editorState} onChange={this.onChange}/>
        </div>
        <div className="editor-view" onClick={()=>this.domEditor.focus()}>
          <div className="editor-view-title">Editor</div>
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