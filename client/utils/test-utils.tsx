import { render, queries, RenderOptions } from '@testing-library/react';
import * as customQueries from './custom-queries';
import { ReactElement } from 'react';

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'queries'>
) => render(ui, { queries: { ...queries, ...customQueries }, ...options });

export * from '@testing-library/react';
export { customRender as render };
