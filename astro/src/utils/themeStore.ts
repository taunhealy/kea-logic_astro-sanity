import { atom } from 'nanostores';

export type Theme = 'dark' | 'light';
export const $theme = atom<Theme>('dark');

export function setTheme(theme: Theme) {
  $theme.set(theme);
  document.documentElement.setAttribute('data-theme', theme);
}