/* eslint-disable @typescript-eslint/no-explicit-any */
import db from '../db.json';

export const getBurguers = async () => {
  return db.Burguers as any;
};

export const getCombos = async () => {
  return db.combos as any;
};

export const getSides = async () => {
  return db.sides as any;
};
