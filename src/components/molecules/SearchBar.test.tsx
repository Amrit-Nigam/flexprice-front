import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import SearchBar from './SearchBar/SearchBar';

describe('SearchBar', () => {
	it('invokes onSearch after debounce', async () => {
		const onSearch = vi.fn();
		render(<SearchBar onSearch={onSearch} debounceMs={30} placeholder='Find…' />);
		const field = screen.getByPlaceholderText('Find…');
		await userEvent.type(field, 'abc');
		await waitFor(() => expect(onSearch).toHaveBeenLastCalledWith('abc'));
	});
});
