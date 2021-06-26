import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import * as pokedexService from '../services/pokedexService';
import App from '../App';

jest.mock('../services/pokedexService');

describe('Testes do componente <FavoritePokemons.js />', () => {

  it('Testa se é exibido na tela a mensagem No favorite pokemon found, se a pessoa não tiver pokémons favoritos', () => {
    pokedexService.readFavoritePokemonIds.mockReturnValue([]);
    const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,);
    const linkFavorite = getByText(/Favorite Pokémons/i);
    
    fireEvent.click(linkFavorite);

    const textNoFavotite = getByText(/No favorite pokemon found/i);

    expect(textNoFavotite).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    pokedexService.readFavoritePokemonIds.mockReturnValue([25, 4, 10]);
    const { getByText, getAllByTestId } = render(
    <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,);
    const linkFavorite = getByText(/Favorite Pokémons/i);
    
    fireEvent.click(linkFavorite);
    
    const pokemonNodes = getAllByTestId('pokemon-name');

    expect(pokemonNodes.length).toBe(3);
  });

  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    pokedexService.readFavoritePokemonIds.mockReturnValue([25, 4]);
    const { getByText, queryByText } = render(
    <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,);
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

})
