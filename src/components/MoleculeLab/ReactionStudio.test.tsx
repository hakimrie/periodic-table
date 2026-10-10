import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ReactionStudio } from './ReactionStudio';

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('ReactionStudio Component Suite', () => {
  it('renders chemical reaction selector and active equation', () => {
    render(<ReactionStudio />);
    expect(screen.getAllByText(/Synthesis of Water/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Complete Combustion of Methane/i)).toBeDefined();
    expect(screen.getByText(/LIMITING/i)).toBeDefined();
  });

  it('allows switching between chemical reactions', () => {
    render(<ReactionStudio />);
    const methaneBtn = screen.getByRole('button', { name: /Complete Combustion of Methane/i });
    fireEvent.click(methaneBtn);
    const matches = screen.getAllByText(/Complete Combustion of Methane/i);
    expect(matches.length).toBeGreaterThan(0);
    expect(screen.getByText(/Bunsen burners/i)).toBeDefined();
  });

  it('triggers reaction animation when ignite button is clicked', () => {
    render(<ReactionStudio />);
    const triggerBtn = screen.getByRole('button', { name: /Ignite \/ Trigger Reaction/i });
    expect(triggerBtn).toBeDefined();
    fireEvent.click(triggerBtn);
    expect(screen.getByText(/Reacting.../i)).toBeDefined();
  });
});
