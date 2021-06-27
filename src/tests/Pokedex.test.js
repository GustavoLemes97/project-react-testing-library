import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const isPokemonFavoriteById = {};

pokemons.forEach(({ id }) => {
  isPokemonFavoriteById[id] = true;
});

const typeButtonsName = [
  'Electric',
  'Fire',
  'Bug',
  'Poison',
  'Psychic',
  'Normal',
  'Dragon',
];

const pokemonExtra = [
  {
    id: 25,
    name: 'Rubens',
    type: 'Lento',
    averageWeight: { value: '120.0', measurementUnit: 'kg' },
    image:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.ofuxico.com.br%2Ffamosos%2Frubens-barrichello%2F&psig=AOvVaw3Qi2664Q3Du4HA8PDIfhoK&ust=1624758424701000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCMj5uPmWtPECFQAAAAAdAAAAABAD',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: 'Slower man.',
  },
  {
    id: 25,
    name: 'Rubens2',
    type: 'Lento',
    averageWeight: { value: '120.0', measurementUnit: 'kg' },
    image:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.ofuxico.com.br%2Ffamosos%2Frubens-barrichello%2F&psig=AOvVaw3Qi2664Q3Du4HA8PDIfhoK&ust=1624758424701000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCMj5uPmWtPECFQAAAAAdAAAAABAD',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: 'Slower man.',
  },
];

const checkPokemonQuantityByName = (getAllByTestId, btnProximo) => {
  pokemons.forEach((pkms) => {
    pkms = getAllByTestId('pokemon-name');
    expect(pkms.length).toBe(1);
    fireEvent.click(btnProximo);
  });
};

const checkDynamicButtons = (getByTestId, allButtons) => {
  typeButtonsName.forEach((buttonName, index) => {
    fireEvent.click(allButtons[index]);

    const pokemonType = getByTestId('pokemon-type');

    expect(allButtons[index].innerHTML).toBe(buttonName);

    expect(pokemonType.innerHTML).toBe(buttonName);
    fireEvent.click(allButtons[index]);
    expect(pokemonType.innerHTML).toBe(buttonName);
  });
};

describe('Testes do componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByText } = render(
      <Router>
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteById }
        />
      </Router>,
    );
    const homeSubtitle = getByText(/Encountered pokémons/i);

    expect(homeSubtitle).toBeInTheDocument();
  });

  it('Teste exibe o próximo Pokémon quando o botão Próximo pokémon é clicado', () => {
    const { getByText } = render(
      <Router>
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteById }
        />
      </Router>,
    );
    const btnProximo = getByText(/Próximo pokémon/i);
    const pikachu = getByText(/Pikachu/i);

    expect(btnProximo).toBeInTheDocument();

    pokemons.forEach((pokemon, index) => {
      pokemon = getByText(`${pokemon.name}`);
      expect(pokemon).toBeInTheDocument();
      fireEvent.click(btnProximo);
      const lastIndex = 8;
      if (index === lastIndex) {
        fireEvent.click(btnProximo);
        expect(pikachu).toBeInTheDocument();
      }
    });
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    const { getByText, getAllByTestId } = render(
      <Router>
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteById }
        />
      </Router>,
    );
    const btnProximo = getByText(/Próximo pokémon/i);

    checkPokemonQuantityByName(getAllByTestId, btnProximo);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    const { getAllByTestId, getByTestId } = render(
      <Router>
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteById }
        />
      </Router>,
    );
    const allButtons = getAllByTestId('pokemon-type-button');

    checkDynamicButtons(getByTestId, allButtons);
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText, getAllByTestId } = render(
      <Router>
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteById }
        />
      </Router>,
    );
    const btnAll = getByText(/All/i);
    const btnProximo = getByText(/Próximo pokémon/i);

    expect(btnAll).toBeInTheDocument();

    fireEvent.click(btnAll);

    checkPokemonQuantityByName(getAllByTestId, btnProximo);
  });

  it('Teste se é criado, dinamicamente, um botão para cada tipo de Pokémon', () => {
    pokemons.push(...pokemonExtra);
    const { getByText, getAllByTestId, getByTestId } = render(
      <Router>
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteById }
        />
      </Router>,
    );

    typeButtonsName.push('Lento');

    const allButtons = getAllByTestId('pokemon-type-button');
    const btnProximo = getByText(/Próximo pokémon/i);

    checkDynamicButtons(getByTestId, allButtons);

    fireEvent.click(allButtons[0]);
    expect(btnProximo).toHaveAttribute('disabled');

    fireEvent.click(allButtons[1]);
    expect(btnProximo).not.toHaveAttribute('disabled');
  });
});
