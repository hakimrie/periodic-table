import type { ChemicalElement } from '../types/element';

export function getGridPosition(element: ChemicalElement): { row: number; col: number } {
  const Z = element.atomicNumber;

  if (Z === 1) return { row: 1, col: 1 };
  if (Z === 2) return { row: 1, col: 18 };

  if (Z >= 3 && Z <= 4) return { row: 2, col: Z - 2 }; // 3 -> 1, 4 -> 2
  if (Z >= 5 && Z <= 10) return { row: 2, col: Z + 8 }; // 5 -> 13, 10 -> 18

  if (Z >= 11 && Z <= 12) return { row: 3, col: Z - 10 }; // 11 -> 1, 12 -> 2
  if (Z >= 13 && Z <= 18) return { row: 3, col: Z }; // 13 -> 13, 18 -> 18

  if (Z >= 19 && Z <= 36) return { row: 4, col: Z - 18 }; // 19 -> 1, 36 -> 18
  if (Z >= 37 && Z <= 54) return { row: 5, col: Z - 36 }; // 37 -> 1, 54 -> 18

  if (Z >= 55 && Z <= 56) return { row: 6, col: Z - 54 }; // 55 -> 1, 56 -> 2
  if (Z >= 57 && Z <= 71) return { row: 9, col: Z - 57 + 4 }; // Lanthanides row 9, cols 4 to 18
  if (Z >= 72 && Z <= 86) return { row: 6, col: Z - 72 + 4 }; // 72 -> 4, 86 -> 18

  if (Z >= 87 && Z <= 88) return { row: 7, col: Z - 86 }; // 87 -> 1, 88 -> 2
  if (Z >= 89 && Z <= 103) return { row: 10, col: Z - 89 + 4 }; // Actinides row 10, cols 4 to 18
  if (Z >= 104 && Z <= 118) return { row: 7, col: Z - 104 + 4 }; // 104 -> 4, 118 -> 18

  return { row: 1, col: 1 };
}
