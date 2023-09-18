import React, { useState } from 'react';

import AnnotatablePage from './AnnotatablePage';

const Range = maxValue => 
  Array.from(Array(maxValue).keys());

const EndlessViewer = props => {

  const [ annotationMode, setAnnotationMode ] = useState('ANNOTATION');

  const [ tools, setTools ] = useState([]);
  const updateTools = (newTools) => {
    console.log(newTools);
    setTools(newTools);
  };

  const onToggleImageMode = (tool) => {
    if (annotationMode === tool)
      setAnnotationMode('');
    else
      setAnnotationMode(tool);
  }

  return (
    <div>
      <header>
        {tools.map((tool) => {
          return <button
            className={annotationMode === tool ? 'active' : null} 
            onClick={() => onToggleImageMode(tool)}>
            {tool}
          </button>
        })}
      </header>

      <main>
        <div className="pdf-viewer-container">
          {Range(props.pdf.numPages).map(idx =>
            <AnnotatablePage 
              key={idx}
              url={props.url}
              pdf={props.pdf}
              page={idx + 1} 
              config={props.config}
              store={props.store}
              setTools={updateTools}
              annotationMode={annotationMode} 
              onCreateAnnotation={props.onCreateAnnotation}
              onUpdateAnnotation={props.onUpdateAnnotation}
              onDeleteAnnotation={props.onDeleteAnnotation} 
              onCancelSelected={props.onCancelSelected} />
          )}
        </div>
      </main>
    </div>
  )
}

export default EndlessViewer;