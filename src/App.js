import { useEffect, useState } from 'react';
import ColorInput from './components/ColorInput/ColorInput';
import './App.scss';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showTrigger, setShowTrigger] = useState(true);

  useEffect(() => {
    showModal ? setShowTrigger(false) : setShowTrigger(true);
  }, [showModal])

  return (
    <div className="app">
      <ColorInput showTrigger={showTrigger} onClose={setShowModal} showModal={showModal}/>
    </div>
  );
}

export default App;
