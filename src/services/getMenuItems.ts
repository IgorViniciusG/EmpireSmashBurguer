import { getBurguers, getCombos, getSides } from './menuService';

export async function getMenuItems() {
  const burguers = await getBurguers();
  const sides = await getSides();
  const combos = await getCombos();
  return [...burguers, ...sides, ...combos];
}
