import React, { Component } from 'react';
import { Editor, EditorState, convertToRaw } from 'draft-js';

class SelectionStateExample extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { editorState } = this.props;
    const selectionState = editorState.getSelection();
    const anchorKey = selectionState.getAnchorKey();
    const currentContent = editorState.getCurrentContent();
    const currentContentBlock = currentContent.getBlockForKey(anchorKey);
    const start = selectionState.getStartOffset();
    const end = selectionState.getEndOffset();
    const selectedText = currentContentBlock.getText().slice(start, end);

    const result = {
      anchorKey,
      start,
      end,
      selectedText,
    };

    return (
      <div>
        {JSON.stringify(result, null, '\t')}
      </div>
    );
  }
}

export default SelectionStateExample;