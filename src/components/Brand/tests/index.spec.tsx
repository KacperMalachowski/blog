import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import BrandComponent from '../index';

describe('Brand Component', () => {
  it('should render Brand text', () => {
    const brandText = "Test Brand";

    render(<BrandComponent>{brandText}</BrandComponent>);

    expect(screen.getByText(brandText)).toBeDefined();
  });
});