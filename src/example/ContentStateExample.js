import React, { Component } from 'react';
import { Editor, EditorState, convertToRaw } from 'draft-js';

class ContentStateExample extends Component {
  render() {
    return(
      <div>{JSON.stringify(convertToRaw(this.props.editorState.getCurrentContent()), null, '\t')}</div>
    );
  }
}

export default ContentStateExample;