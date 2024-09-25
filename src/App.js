import './App.css';
import SaveSegment from './component/SaveSegment';
import AddSchemaToSegment from './component/AddSchemaToSegment';
import { useState } from 'react';

function App() {
  const [showSegment, setShowSegment]=useState(false)

  const handleToggleSegment = () => {
    setShowSegment(prevState => !prevState);
  };

  const handleClosePopup = () => {
    setShowSegment(false);
  };

  return (
    <div className="App">
      <SaveSegment onToggle={handleToggleSegment} />
      {showSegment && (
        <div>
        <div className="overlay" onClick={handleClosePopup}></div>
        <AddSchemaToSegment onClose={handleClosePopup} />
      </div>
      )}
    </div>
  );
}

export default App;
