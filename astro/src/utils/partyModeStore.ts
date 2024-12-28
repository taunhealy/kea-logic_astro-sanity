import { atom } from 'nanostores';

export const $partyMode = atom<boolean>(false);

export function setPartyMode(isParty: boolean) {
  $partyMode.set(isParty);
  const partyMode = document.getElementById('party-mode');
  if (partyMode) {
    partyMode.classList.toggle('hidden', !isParty);
  }
  
  // Update all elements with data-party-mode attribute
  document.querySelectorAll('[data-party-mode]').forEach(element => {
    if (isParty) {
      element.classList.add('party-button');
    } else {
      element.classList.remove('party-button');
    }
  });
}