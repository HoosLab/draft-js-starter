import React, { Component } from 'react';
import { EditorState, Modifier, EditorChangeType } from 'draft-js';
import ContentStateExample from './ContentStateExample';

class EntityExample extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mutabilityInput: "",
      dataInput: "",
      data: "",
    };

    this.setEntity = this.setEntity.bind(this);
    this.getEntity = this.getEntity.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.getEntity(nextProps.editorState);
  }

  /**
   * Generate a new entity object with the supplied properties.
   * @param {DraftEntityType} type 
   * @param {DraftEntityMutability} mutability 
   * @param {Object} data?
   */
  setEntity(type="myEntityType", mutability="IMMUTABLE", data) {
    const { editorState } = this.props;
    const { onChange } = this.props;

    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    contentState.createEntity(type, mutability, data);

    const entityKey = contentState.getLastCreatedEntityKey();
    
    // Modifier.applyEntity
    // applyEntity(
    // contentState: ContentState,
    // selectionState: SelectionState,
    // entityKey: ?string
    // ): ContentState
    // Apply an entity to the entire selected range, or remove all entities from the range if entityKey is null.
    const newContentState = Modifier.applyEntity(contentState, selectionState, entityKey);
    
    // EditorState.push
    // static push(
    //   editorState: EditorState,
    //   contentState: ContentState,
    //   changeType: EditorChangeType
    // ): EditorState
    // Returns a new EditorState object with the specified ContentState applied as the new currentContent.
    // Based on the changeType, this ContentState may be regarded as a boundary state for undo/redo behavior.
    // [EditorChangeType]: https://draftjs.org/docs/api-reference-editor-change-type.html
    // ** All content changes must be applied to the EditorState with this method.
    const newEditorState = EditorState.push(editorState, newContentState, 'apply-entity');

    this.props.onChange(newEditorState);
  }

  getEntity(editorState) {
    const selectionState = editorState.getSelection();
    const startKey = selectionState.getStartKey();
    const startOffset = selectionState.getStartOffset();
    const contentState = editorState.getCurrentContent();
    
    // Find current contentBlock by using startKey and 
    const currentContentBlock = contentState.getBlockForKey(startKey);
    const entityKey = currentContentBlock.getEntityAt(startOffset);
    
    if (entityKey !== null) {
      const entityInstance = contentState.getEntity(entityKey);
      const data = entityInstance.getData();
      this.setState({
        data,
      });
      return data;
    } else {
      this.setState({
        data: "",
      });
      return {};
    }
  }

  render() {
    return (
      <div>
        <div style={{color: 'tomato'}}>Current Entity: {JSON.stringify(this.state.data, null, '\t')}</div>
        <div style={{color: 'tomato'}}>Input</div>
        <div>
          <form>
            <label>
              mutability:
              <input
                value={this.state.mutabilityInput}
                onChange={(e) => this.setState({mutabilityInput: e.target.value})}
              />
            </label>
            <label>
              data:
              <input
                value={this.state.dataInput}
                onChange={(e) => this.setState({dataInput: e.target.value})}
              />
            </label>
          </form>
          <div>
            <button onClick={() => this.setEntity("", this.state.mutabilityInput, this.state.dataInput)}>Set Entity</button>
          </div>
        </div>
        <div style={{color: 'tomato'}}>ContentState</div>
        <ContentStateExample editorState={this.props.editorState} onChange={this.props.onChange}/>
      </div>
    );
  }
}

export default EntityExample;