import React, { Component } from 'react';
import { EditorState } from 'draft-js';

class SelectionStateExample extends Component {

  constructor(props) {
    super(props);
    this.setSelection = this.setSelection.bind(this);
  }

  /**
   * Select from startOffset to endOffset
   * @param {int} startOffset 
   * @param {int} endOffset 
   */
  setSelection(anchorOffset, focusOffset) {
    const editorState = this.props.editorState;
    const selectionState = editorState.getSelection();
    const updatedSelectionState = selectionState.merge({
      anchorOffset,
      focusOffset,
    });
    const newEditorState = EditorState.forceSelection(editorState, updatedSelectionState);
    this.props.onChange(newEditorState);
  }

  render() {
    const { editorState } = this.props;
    const selectionState = editorState.getSelection();
    const anchorKey = selectionState.getAnchorKey();
    const currentContent = editorState.getCurrentContent();
    const currentContentBlock = currentContent.getBlockForKey(anchorKey);
    const startKey = selectionState.getStartKey();
    const endKey = selectionState.getEndKey();
    const startOffset = selectionState.getStartOffset();
    const endOffset = selectionState.getEndOffset();
    const anchorOffset = selectionState.getAnchorOffset();
    const focusOffset = selectionState.getFocusOffset();
    // todo: consider the multiline case.
    const selectedText = currentContentBlock.getText().slice(startOffset, endOffset);
    const isBackward = selectionState.getIsBackward();

    const result = {
      anchorKey,
      startOffset,
      endOffset,
      startKey,
      endKey,
      anchorOffset,
      focusOffset,
      selectedText,
      isBackward,
    };

    return (
      <div>
        <div style={{color: 'tomato', fontWeight: '600'}}>
          Tips:
          SelectionState keeps track of your selection.
          Each sentences have a anchorKey which is unique.          
          If you drag from left to right, isBackward has false value.
          If not(right to left), has true value.
          Write something and Try to drag the text!
        </div>
        <div>
          {JSON.stringify(result, null, '\t')}
        </div>
        <SelectionForm setSelection={this.setSelection}/>
      </div>
    );
  }
}

class SelectionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      anchorOffset: 0,
      focusOffset: 0,
    };

    this.handleAnchorOffsetChange = this.handleAnchorOffsetChange.bind(this);
    this.handleFocusOffsetChange = this.handleFocusOffsetChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAnchorOffsetChange(event) {
    this.setState({
      anchorOffset: event.target.value,
    });
  }

  handleFocusOffsetChange(event) {
    this.setState({
      focusOffset: event.target.value,
    });
  }

  handleSubmit() {
    this.props.setSelection(this.state.anchorOffset, this.state.focusOffset);
  }

  render() {
    return (
      <div>
        <form>
          <label>
            anchorOffset:
            <input 
              type="text" 
              name="anchorOffset"
              value={this.state.anchorOffset} 
              onChange={this.handleAnchorOffsetChange}
            />
          </label>
          <label>
            focusOffset:
            <input 
              type="text" 
              name="focusOffset" 
              value={this.state.focusOffset} 
              onChange={this.handleFocusOffsetChange}
            />
          </label>
        </form>
        <button value="Set selection" onClick={this.handleSubmit}>Set selection</button>
      </div>
    );
  }
}

export default SelectionStateExample;