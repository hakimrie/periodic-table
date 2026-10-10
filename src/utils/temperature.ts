import type { TemperatureUnit } from '../types/element';

export function convertTemperature(kelvin: number | undefined, unit: TemperatureUnit): string {
  if (kelvin === undefined || isNaN(kelvin)) return 'N/A';

  switch (unit) {
    case 'C': {
      const celsius = kelvin - 273.15;
      return `${celsius.toFixed(1)} °C`;
    }
    case 'F': {
      const fahrenheit = ((kelvin - 273.15) * 9) / 5 + 32;
      return `${fahrenheit.toFixed(1)} °F`;
    }
    case 'K':
    default:
      return `${kelvin.toFixed(1)} K`;
  }
}

export function formatTemperature(kelvin: number | undefined, unit: TemperatureUnit): string {
  return convertTemperature(kelvin, unit);
}
