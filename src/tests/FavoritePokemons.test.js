import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as pokedexService from '../services/pokedexService';
import App from '../App';

jest.mock('../services/pokedexService');

describe('Testes do componente <FavoritePokemons.js />', () => {
  it('Testa se é exibido na tela a mensagem No favorite pokemon'
  + ' found, se a pessoa não tiver pokémons favoritos', () => {
    pokedexService.readFavoritePokemonIds.mockReturnValue([]);
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const linkFavorite = getByText(/Favorite Pokémons/i);

    fireEvent.click(linkFavorite);

    const textNoFavotite = getByText(/No favorite pokemon found/i);

    expect(textNoFavotite).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const pokeOneIndex = 25;
    const pokeTwoIndex = 4;
    const pokeThreeIndex = 10;

    const pokeIndex = [pokeOneIndex, pokeTwoIndex, pokeThreeIndex];
    pokedexService.readFavoritePokemonIds.mockReturnValue(pokeIndex);
    const { getByText, getAllByTestId } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const linkFavorite = getByText(/Favorite Pokémons/i);

    fireEvent.click(linkFavorite);

    const pokemonNodes = getAllByTestId('pokemon-name');
    const expectedLength = 3;
    expect(pokemonNodes.length).toBe(expectedLength);
  });

  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const pokeOneIndex = 25;
    const pokeTwoIndex = 4;

    const pokeIndex = [pokeOneIndex, pokeTwoIndex];
    pokedexService.readFavoritePokemonIds.mockReturnValue(pokeIndex);
    const { getByText, queryByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const linkFavorite = getByText(/Favorite Pokémons/i);

    fireEvent.click(linkFavorite);

    const pikachu = getByText(/Pikachu/i);
    const charmander = getByText(/Charmander/i);
    const caterpie = queryByText(/Caterpie/i);
    const ekans = queryByText(/Ekans/i);

    expect(pikachu).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();
    expect(caterpie).not.toBeInTheDocument();
    expect(ekans).not.toBeInTheDocument();
  });
});
