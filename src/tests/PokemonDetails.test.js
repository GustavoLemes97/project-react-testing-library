import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import pokemons from '../data';
import App from '../App';

const pokemon = pokemons[0];

describe('Testes do componente <PokemonDetails.js />', () => {
  beforeEach(() => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const linkDetais = getByText(/More Details/i);
    fireEvent.click(linkDetais);
  });

  it('Teste as informações do Pokémon selecionado são mostradas na tela', () => {
    const { getByText, queryByText, getAllByRole } = render();

    const { name, summary } = pokemon;
    const pkmnDetailsName = getByText(`${name} Details`);
    const pkmnDetailsLink = queryByText(/More Detais/i);
    const summaryRole = getAllByRole('heading');
    const paragrapheInfo = getByText(summary);

    expect(pkmnDetailsName).toBeInTheDocument();
    expect(pkmnDetailsLink).not.toBeInTheDocument();
    expect(summaryRole[2].innerHTML).toBe('Summary');
    expect(paragrapheInfo).toBeInTheDocument();
  });

  it('Teste se na página contem as localizações do pokémon', () => {
    const { getByText } = render();

    const { name, foundAt } = pokemon;
    const pkmnTextLocation = getByText(`Game Locations of ${name}`);
    const pkmnLocationsQuantity = pkmnTextLocation.nextSibling.childNodes.length;
    const pknmLocationNameMap = pkmnTextLocation.nextSibling.childNodes;

    expect(pkmnTextLocation).toBeInTheDocument();
    expect(pkmnLocationsQuantity).toBe(foundAt.length);
    foundAt.forEach((element, index) => {
      const bool = pknmLocationNameMap[index].innerHTML.includes(element.location)
      && pknmLocationNameMap[index].innerHTML.includes(element.map)
      && pknmLocationNameMap[index].innerHTML.includes(`${name} location`);
      expect(bool).toBe(true);
    });
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { getByText, queryByAltText, getByRole } = render();

    const { name } = pokemon;
    const favoriteLabel = getByText(/Pokémon favoritado?/i);
    const checkbox = getByRole('checkbox');

    fireEvent.click(checkbox);
    const favoriteElement = queryByAltText(`${name} is marked as favorite`);

    expect(checkbox).toBeInTheDocument();
    expect(favoriteLabel).toBeInTheDocument();

    expect(favoriteElement).toBeInTheDocument();

    fireEvent.click(checkbox);
    expect(favoriteElement).not.toBeInTheDocument();
  });
});
