import { useEffect, useState, useRef } from "react";

import RecentColors from "../RecentColors/RecentColors";

import '../../App.scss';

const ColorInput = ({showTrigger, onClose, showModal}) => {

    const [hex, setHex] = useState('');
    const [rgbStyle, setRgbStyle] = useState('black');
  
    let rgb = hexToRgb(hex); 
  
    let recent = [];

    const recentRef = useRef(getRecentFromLS());
  
    function setColorToLS() {
      recent.push(hex);
      return localStorage.setItem('recent-colors', JSON.stringify(recent));
    }
    
    function getRecentFromLS() {
      const value = localStorage.getItem('recent-colors', recent);
      return JSON.parse(value);
    }
  
    const addColor = () => {
      if ((hex.length === 4 || hex.length === 7) && hex !== '') {
        recentRef.current.push(hex);
      }
      recentRef.current = recentRef.current.slice(Math.max(recentRef.current.length - 5, 0));
    }
  
    function hexToRgb(h) {
      let r = 0, g = 0, b = 0;
    
      if (h.length === 4) {
        r = "0x" + h[1] + h[1];
        g = "0x" + h[2] + h[2];
        b = "0x" + h[3] + h[3];
        
      } else if (h.length === 7) {
        r = "0x" + h[1] + h[2];
        g = "0x" + h[3] + h[4];
        b = "0x" + h[5] + h[6];
      } 
      return hex.length < 1 ? '' : +r + "," + +g + "," + +b;
    }
  
    const onUpdateHex = (e) => {
      setHex(e.target.value);
    }
  
    const changeColor = () => {
      if (rgb.split(',')[0] > 135 || rgb.split(',')[1] > 135 || rgb.split(',')[2] > 135 || (hex === '' || hex.length < 1)) {
        setRgbStyle('black');
      } else {
        setRgbStyle('white');
      }
    }
  
    useEffect(() => {
      setColorToLS();
      getRecentFromLS();
      addColor();
      changeColor();
    }, [hex])
  
    return (
      <div className='body' style={{'backgroundColor' : `rgb(${hex.length < 1 ? '255,255,255' : rgb})`}}>
        <div className='wrapper'>
          <input id='hex' type='text' placeholder='from hex' autoComplete='off' value={hex} onChange={onUpdateHex} style={{
            'color' : rgbStyle,
            'borderBottom' : `1px dotted ${rgbStyle}`,
            }}/>
          <input id='rgb' type='text' placeholder='to rgb' autoComplete='off' value={rgb} style={{
            'color' : rgbStyle,
            'borderBottom' : `1px dotted ${rgbStyle}`}}/>
           {showTrigger ? <button className='btn' onClick={() => onClose(true)} style={{
            'color' : rgbStyle,
            'border': `2px solid ${rgbStyle}`}}
            >Show last colors</button> : <RecentColors show={showModal} onClose={onClose} data={recentRef.current}/>}
        </div>
      </div>
    )
  }

  export default ColorInput;