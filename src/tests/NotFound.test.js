import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testes do componente <NotFound.js />', () => {
  it('Testa se contém um heading h2 com o texto Page requested not found 😭', () => {
    const { getByText } = render(<NotFound />);

    const textNotFound = getByText(/Page requested not found/i);

    expect(textNotFound).toBeInTheDocument();
  });

  it('Testa se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { getByAltText } = render(<NotFound />);

    const image = getByAltText(/Pikachu crying because the page requested was not found/);

    expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
