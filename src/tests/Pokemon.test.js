import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter, Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import App from '../App';

const pokemon = pokemons[0];
const isFavorite = true;

describe('Testes do componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByText, getByTestId, getByAltText } = render(
      <BrowserRouter>
        <Pokemon
          pokemon={ pokemon }
          isFavorite={ isFavorite }
        />
      </BrowserRouter>,
    );

    const { image, name, averageWeight: { value, measurementUnit } } = pokemon;
    const pkmnName = getByText(name);
    const pkmnType = getByTestId('pokemon-type').innerHTML;
    const pkmnWeight = getByTestId('pokemon-weight').innerHTML;
    const pkmnImage = getByAltText(`${name} sprite`);

    expect(pkmnName).toBeInTheDocument();
    expect(pkmnType).toBe('Electric');
    expect(pkmnWeight).toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(pkmnImage.src).toBe(image);
  });

  it('Teste se o card do Pokémon indicado na Pokédex'
  + 'contém um link de navegação para exibir detalhes'
  + ' deste Pokémon. O link deve possuir a URL /pokemons/<id>,'
  + 'onde <id> é o id do Pokémon exibido', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <Pokemon
          pokemon={ pokemon }
          isFavorite={ isFavorite }
        />
      </Router>,
    );

    const { id } = pokemon;
    const detailLink = getByText(/More details/i);
    expect(detailLink).toBeInTheDocument();

    fireEvent.click(detailLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Teste se ao clicar no link de navegação do Pokémon, '
  + 'é feito o redirecionamento da aplicação para a página '
  + 'de detalhes de Pokémon', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const { name } = pokemon;
    const detailLink = getByText(/More details/i);
    expect(detailLink).toBeInTheDocument();

    fireEvent.click(detailLink);
    const pkmnDetailsPage = getByText(`${name} Details`);
    expect(pkmnDetailsPage).toBeInTheDocument();
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByAltText } = render(
      <BrowserRouter>
        <Pokemon
          pokemon={ pokemon }
          isFavorite={ isFavorite }
        />
      </BrowserRouter>,
    );

    const { name } = pokemon;
    const favoriteImage = getByAltText(`${name} is marked as favorite`);

    expect(favoriteImage).toHaveAttribute('src', '/star-icon.svg');
  });
});
