import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ElementDetails } from './ElementDetails';
import { getElementById } from '../../data/elements';

describe('ElementDetails Educational Modes', () => {
  const iron = getElementById(26)!; // Iron (Fe)

  it('renders High School mode with foundational concepts and toggles', () => {
    const onModeChange = vi.fn();

    render(
      <ElementDetails
        element={iron}
        onSelectElement={vi.fn()}
        educationalMode="high-school"
        onModeChange={onModeChange}
        tempUnit="C"
        onTempUnitChange={vi.fn()}
        isFavorite={false}
        onToggleFavorite={vi.fn()}
      />
    );

    // Banner and badge
    expect(screen.getByText('High School Mode')).toBeInTheDocument();
    expect(screen.getByText('Foundational Chemistry')).toBeInTheDocument();

    // Educational content
    expect(screen.getByText('In Simple Terms')).toBeInTheDocument();
    expect(screen.getByText('High-Yield Learning Points')).toBeInTheDocument();

    // Toggles for deep dive
    expect(screen.getByText('Want to go deeper? (Quantum Subshell Mechanics)')).toBeInTheDocument();
    expect(screen.getByText('Show full subshell configuration')).toBeInTheDocument();

    // Clicking deep dive toggle reveals "Why It Behaves This Way"
    const deepDiveBtn = screen.getByText('Want to go deeper? (Quantum Subshell Mechanics)');
    fireEvent.click(deepDiveBtn);
    expect(screen.getByText('Why It Behaves This Way')).toBeInTheDocument();

    // Clicking full config toggle reveals full subshell configuration
    const fullConfigBtn = screen.getByText('Show full subshell configuration');
    fireEvent.click(fullConfigBtn);
    expect(screen.getByText(iron.electronConfiguration.full)).toBeInTheDocument();
  });

  it('renders University mode with comprehensive quantum and thermodynamic data', () => {
    const onModeChange = vi.fn();

    render(
      <ElementDetails
        element={iron}
        onSelectElement={vi.fn()}
        educationalMode="university"
        onModeChange={onModeChange}
        tempUnit="C"
        onTempUnitChange={vi.fn()}
        isFavorite={false}
        onToggleFavorite={vi.fn()}
      />
    );

    // Banner and badge
    expect(screen.getByText('University Mode')).toBeInTheDocument();
    expect(screen.getByText('Advanced & Quantum')).toBeInTheDocument();

    // Both Simple Terms AND Why It Behaves This Way are directly visible
    expect(screen.getByText('In Simple Terms')).toBeInTheDocument();
    expect(screen.getByText('Why It Behaves This Way')).toBeInTheDocument();

    // Full configuration is directly visible
    expect(screen.getAllByText('Full Electron Configuration').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(iron.electronConfiguration.full)).toBeInTheDocument();

    // Advanced properties are visible
    expect(screen.getByText('Crystal Structure')).toBeInTheDocument();
    expect(screen.getByText('First Ionization Energy')).toBeInTheDocument();
  });

  it('renders Quick Reference mode with a high-density data sheet and no narrative walls', () => {
    const onModeChange = vi.fn();

    render(
      <ElementDetails
        element={iron}
        onSelectElement={vi.fn()}
        educationalMode="quick-reference"
        onModeChange={onModeChange}
        tempUnit="C"
        onTempUnitChange={vi.fn()}
        isFavorite={false}
        onToggleFavorite={vi.fn()}
      />
    );

    // Banner and badge
    expect(screen.getByText('Quick Reference Mode')).toBeInTheDocument();
    expect(screen.getByText('Data Sheet View')).toBeInTheDocument();

    // Tables of constants
    expect(screen.getByText('Physical Constants')).toBeInTheDocument();
    expect(screen.getByText('Chemical & Thermodynamic Constants')).toBeInTheDocument();
    expect(screen.getByText('Atomic & Electronic Constants')).toBeInTheDocument();

    // Narrative sections are suppressed for high density
    expect(screen.queryByText('In Simple Terms')).not.toBeInTheDocument();
    expect(screen.queryByText('High-Yield Learning Points')).not.toBeInTheDocument();
  });

  it('calls onModeChange when switching mode buttons', () => {
    const onModeChange = vi.fn();

    render(
      <ElementDetails
        element={iron}
        onSelectElement={vi.fn()}
        educationalMode="high-school"
        onModeChange={onModeChange}
        tempUnit="C"
        onTempUnitChange={vi.fn()}
        isFavorite={false}
        onToggleFavorite={vi.fn()}
      />
    );

    const univBtn = screen.getByRole('button', { name: /University/i });
    fireEvent.click(univBtn);
    expect(onModeChange).toHaveBeenCalledWith('university');

    const quickRefBtn = screen.getByRole('button', { name: /Quick Ref/i });
    fireEvent.click(quickRefBtn);
    expect(onModeChange).toHaveBeenCalledWith('quick-reference');
  });

  it('renders accessible controls with proper ARIA attributes', () => {
    const onToggleFavorite = vi.fn();
    const hydrogen = getElementById(1)!;
    const helium = getElementById(2)!;
    const lithium = getElementById(3)!;

    render(
      <ElementDetails
        element={helium}
        prevElement={hydrogen}
        nextElement={lithium}
        onSelectElement={vi.fn()}
        educationalMode="high-school"
        onModeChange={vi.fn()}
        tempUnit="C"
        onTempUnitChange={vi.fn()}
        isFavorite={true}
        onToggleFavorite={onToggleFavorite}
      />
    );

    // Favorite button has aria-pressed="true"
    const favBtn = screen.getByRole('button', { name: /remove from favorites/i });
    expect(favBtn).toHaveAttribute('aria-pressed', 'true');

    // Prev / Next element navigation buttons have descriptive aria-labels
    expect(screen.getByRole('button', { name: /previous element: hydrogen/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next element: lithium/i })).toBeInTheDocument();

    // Mode buttons have aria-pressed
    const hsBtn = screen.getByRole('button', { name: /high school/i });
    expect(hsBtn).toHaveAttribute('aria-pressed', 'true');

    // Accordion button has aria-expanded and aria-controls
    const deepDiveBtn = screen.getByRole('button', { name: /want to go deeper/i });
    expect(deepDiveBtn).toHaveAttribute('aria-expanded', 'false');
    expect(deepDiveBtn).toHaveAttribute('aria-controls', 'deep-mechanics-panel');

    fireEvent.click(deepDiveBtn);
    expect(deepDiveBtn).toHaveAttribute('aria-expanded', 'true');
  });
});
