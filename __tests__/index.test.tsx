import React from 'react';
import { render } from '@testing-library/react';
import Home from '../pages_/index';

describe("Home", () => {
    it("works", () => {
        const { queryByText } = render(<Home />);
        expect(queryByText("home:add")).not.toBeNull();
    })
})