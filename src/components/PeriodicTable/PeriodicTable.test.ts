import { describe, it, expect } from 'vitest';
import { getGridPosition } from '../../utils/grid';
import { getElementById } from '../../data/elements';
import { convertTemperature } from '../../utils/temperature';

describe('Periodic Table Grid Positioning', () => {
  it('places Hydrogen (Z=1) at row 1, col 1', () => {
    const h = getElementById(1)!;
    expect(getGridPosition(h)).toEqual({ row: 1, col: 1 });
  });

  it('places Helium (Z=2) at row 1, col 18', () => {
    const he = getElementById(2)!;
    expect(getGridPosition(he)).toEqual({ row: 1, col: 18 });
  });

  it('places Alkali metals in col 1', () => {
    const li = getElementById(3)!;
    const na = getElementById(11)!;
    const k = getElementById(19)!;
    expect(getGridPosition(li).col).toBe(1);
    expect(getGridPosition(na).col).toBe(1);
    expect(getGridPosition(k).col).toBe(1);
  });

  it('places Halogens in col 17 and Noble gases in col 18', () => {
    const f = getElementById(9)!;
    const ne = getElementById(10)!;
    const cl = getElementById(17)!;
    const ar = getElementById(18)!;

    expect(getGridPosition(f).col).toBe(17);
    expect(getGridPosition(ne).col).toBe(18);
    expect(getGridPosition(cl).col).toBe(17);
    expect(getGridPosition(ar).col).toBe(18);
  });

  it('places Lanthanides on row 9 and Actinides on row 10', () => {
    const la = getElementById(57)!; // Lanthanum
    const lu = getElementById(71)!; // Lutetium
    const ac = getElementById(89)!; // Actinium
    const lr = getElementById(103)!; // Lawrencium

    expect(getGridPosition(la).row).toBe(9);
    expect(getGridPosition(lu).row).toBe(9);
    expect(getGridPosition(ac).row).toBe(10);
    expect(getGridPosition(lr).row).toBe(10);
  });
});

describe('Temperature Conversion Utility', () => {
  it('converts Kelvin to Celsius accurately', () => {
    expect(convertTemperature(273.15, 'C')).toBe('0.0 °C');
    expect(convertTemperature(373.15, 'C')).toBe('100.0 °C');
    expect(convertTemperature(0, 'C')).toBe('-273.1 °C');
  });

  it('converts Kelvin to Fahrenheit accurately', () => {
    expect(convertTemperature(273.15, 'F')).toBe('32.0 °F');
    expect(convertTemperature(373.15, 'F')).toBe('212.0 °F');
  });

  it('formats Kelvin directly', () => {
    expect(convertTemperature(300, 'K')).toBe('300.0 K');
    expect(convertTemperature(undefined, 'K')).toBe('N/A');
  });
});
