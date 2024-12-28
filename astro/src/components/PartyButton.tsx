import { useState } from 'react';
import { $partyMode, setPartyMode } from '../utils/partyModeStore';

export default function PartyButton() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    setPartyMode(!isActive);
  };

  return (
    <button
      id="party-toggle"
      onClick={handleClick}
      data-party-mode
      className={`${
        isActive ? 'bg-[#00FF88]' : 'bg-white'
      } hover:bg-[#00FF88] text-black px-4 py-2 rounded-full shadow-lg transition-colors duration-300`}
    >
      🎉 Party Mode
    </button>
  );
}