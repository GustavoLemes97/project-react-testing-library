import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testes do componente <About.js />', () => {

  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = render(<About />);

    const textAboutPokedex = getByText(/This application simulates a Pokédex/i);

    expect(textAboutPokedex).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByText } = render(<About />);

    const aboutHeading = getByText(/About Pokédex/i);

    expect(aboutHeading).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = render(<About />);

    const paragrapheOne = getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémons/i);
    const paragrapheTwo = getByText(/One can filter Pokémons by type, and see more details for each one of them/i);

    expect(paragrapheOne).toBeInTheDocument();
    expect(paragrapheTwo).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    const { getByAltText } = render(<About />);

    const image = getByAltText(/Pokédex/i);

    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
})
