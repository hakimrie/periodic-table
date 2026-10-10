import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SpectraLab } from './SpectraLab';
import { FlameTestView } from './FlameTestView';
import { SpectrographView } from './SpectrographView';
import { BohrTransitionsView } from './BohrTransitionsView';

describe('SpectraLab Component Suite', () => {
  it('renders the SpectraLab header and sub-navigation pills', () => {
    render(<SpectraLab />);
    expect(screen.getByText(/Spectra & Flame Lab/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Flame Test Simulator/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Optical Spectrograph/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Quantum Energy Transitions/i })).toBeInTheDocument();
  });

  it('renders FlameTestView with salt rack and controls', () => {
    render(<FlameTestView initialElementZ={11} />);
    expect(screen.getAllByText(/Flame Test Simulator/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Chemical Salt Rack/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Cobalt Glass/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Clean Wire/i)).toBeInTheDocument();
  });

  it('renders SpectrographView with primary element selector and mode toggles', () => {
    render(<SpectrographView initialElementZ={1} />);
    expect(screen.getAllByText(/Emission/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Continuous Absorption/i)).toBeInTheDocument();
    expect(screen.getByText(/Hear Element/i)).toBeInTheDocument();
    expect(screen.getByText(/Near Ultraviolet/i)).toBeInTheDocument();
    expect(screen.getByText(/Near Infrared/i)).toBeInTheDocument();
  });

  it('renders BohrTransitionsView with energy levels and jump trigger', () => {
    render(<BohrTransitionsView />);
    expect(screen.getByText(/Bohr Hydrogenic Energy Level Transitions/i)).toBeInTheDocument();
    expect(screen.getByText(/Trigger Quantum Jump/i)).toBeInTheDocument();
    expect(screen.getByText(/Balmer Lines/i)).toBeInTheDocument();
  });
});
