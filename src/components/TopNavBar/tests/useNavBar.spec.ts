import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { useNavBar } from '../useNavBar';


const mockSetState = vi.fn();
vi.mock('react', () => ({
  useState: (initial: any) => [initial, mockSetState]
}))

describe('Hook: useNavBar()', () => {
  it('should start with state provided by user', () => {
    const {isOpen, handleClick} = useNavBar(true);

    expect(isOpen).toBeTruthy();
  });

  it('should change state on user click', () => {
    const {isOpen, handleClick} = useNavBar(true);

    handleClick();

    expect(mockSetState).toBeCalledWith(false);
  });
});