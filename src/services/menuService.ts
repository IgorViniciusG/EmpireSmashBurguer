
import db from '../db.json';


export const getBurguers = async () => {
  return db.Burguers;
};

export const getCombos = async () => {
  return db.combos; 
};

export const getSides = async () => {
  return db.sides;
}