import { useState } from 'react';

export default function PartyButton() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    const partyMode = document.getElementById('party-mode');
    if (partyMode) {
      partyMode.classList.toggle('hidden');
    }
    setIsActive(!isActive);
  };

  return (
    <button
      id="party-toggle"
      onClick={handleClick}
      className={`fixed bottom-4 right-4 z-[10000] ${
        isActive ? 'bg-[#00FF88]' : 'bg-white'
      } hover:bg-[#00FF88] text-black px-4 py-2 rounded-full shadow-lg transition-colors duration-300`}
    >
      🎉 Party Mode
    </button>
  );
}