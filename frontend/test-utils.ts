/* eslint-disable import/export */

import { render } from "@testing-library/react";

const customRender = (ui, options = {}) =>
    render(ui, {
        // wrap provider(s) here if needed
        wrapper: ({ children }) => children,
        ...options,
    });

export * from "@testing-library/react";