import { default as React, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createReactEditorJS } from 'react-editor-js';

function Redactor({
  initId,
  activeNote,
  placeholder,
  setActiveNote,
  editorTools,
  classes = {},
  handleRtl = false,
  readOnly = false,
  disableTitle = false,
  isSelectableTitle = false,
  emptyTitle = 'Empty title',
}) {
  const titleRef = useRef(null);
  const ReactEditorJS = createReactEditorJS();

  const [title, setTitle] = useState(activeNote?.title || emptyTitle);
  const [titleDirection, setTitleDirection] = useState(
    calculateRtlDirection(activeNote?.title || emptyTitle)
  );
  const [redactorDirection, setRedactorDirection] = useState(
    calculateRtlDirection(
      activeNote?.data
        ? activeNote.data.blocks.map((block) => block.data.text).join(' ')
        : ''
    )
  );

  useEffect(() => {
    if (activeNote?.title) {
      setTitle(activeNote.title);
      updateDirection(activeNote.title, setTitleDirection);
    }
  }, [activeNote]);

  function filterText(text) {
    return text.replace(/<br>/g, '').replace(/\s|&nbsp;/g, '');
  }

  function calculateRtlDirection(text) {
    const filteredText = filterText(text);
    const totalChars = filteredText.length;
    const rtlChars = (
      filteredText.match(/[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/g) || []
    ).length;
    return (totalChars > 0 && rtlChars / totalChars > 0.5) || handleRtl ? 'rtl' : 'ltr';
  }

  const updateDirection = (text, setDirection) => {
    const direction = calculateRtlDirection(text);
    setDirection(direction);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    updateDirection(newTitle, setTitleDirection);
  };

  const handleTitleBlur = () => {
    const updatedTitle = title.trim() || emptyTitle;
    if (typeof setActiveNote === 'function') {
      setActiveNote((prev) => ({ ...prev, title: updatedTitle }));
    }
    setTitle(updatedTitle);
    updateDirection(updatedTitle, setTitleDirection);
  };

  const handleEditorChange = async (e) => {
    const content = await e.saver.save();
    const combinedText = content.blocks.map((block) => block.data.text).join(' ');
    updateDirection(combinedText, setRedactorDirection);
    if (typeof setActiveNote === 'function') {
      setActiveNote((prev) => ({ ...prev, data: content }));
    }
  };

  const selectTitle = () => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(titleRef.current);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  return (
    <div className={classes.wrapper}>
      {!disableTitle && (
        <input
          className={classes.title}
          type="text"
          placeholder="Title"
          maxLength="256"
          readOnly={readOnly}
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          onClick={() => isSelectableTitle && selectTitle()}
          ref={titleRef}
          dir={titleDirection}
        />
      )}
      <div className={classes.redactor} dir={redactorDirection}>
        <ReactEditorJS
          onChange={handleEditorChange}
          autofocus={false}
          defaultValue={activeNote?.data}
          placeholder={placeholder || 'Let`s write an awesome note!'}
          readOnly={readOnly}
          tools={editorTools}
          minHeight={0}
          logLevel="ERROR"
          holder={initId}
        />
      </div>
    </div>
  );
}

Redactor.propTypes = {
  classes: PropTypes.shape({
    wrapper: PropTypes.string,
    redactor: PropTypes.string,
    title: PropTypes.string,
  }),
  editorTools: PropTypes.object,
  initId: PropTypes.string,
  placeholder: PropTypes.string,
  activeNote: PropTypes.object,
  setActiveNote: PropTypes.func,
  readOnly: PropTypes.bool,
  disableTitle: PropTypes.bool,
  emptyTitle: PropTypes.string,
  isSelectableTitle: PropTypes.bool,
  isRtl: PropTypes.bool,
};

export default Redactor;
