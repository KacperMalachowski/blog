import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import HeaderBar from ".";

describe('HearBar Index Component', () => {
  it('should show text', () => {
    render(<HeaderBar />);

    expect(screen.getByText(/Hello/i)).toBeDefined();
  })
})