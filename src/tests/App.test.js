import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Testes do componente <App.js />', () => {

  it('Testa se a página principal da Pokédex é renderizada ao carregar a aplicação no caminho de URL `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    const homeSubtitle = getByText(/Encountered pokémons/i);

    expect(homeSubtitle).toBeInTheDocument();
  });

  it('Testa se o topo da aplicação contém um conjunto fixo de links de navegação (Home, About, Favorite Pokémons)', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    const linkHome = getByText(/Home/i);
    const linkAbout = getByText(/About/i);
    const linkFavorite = getByText(/Favorite Pokémons/i);

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    const homeSubtitle = getByText(/Encountered pokémons/i);
    const linkHome = getByText(/Home/i);
    
    fireEvent.click(linkHome);
    expect(homeSubtitle).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const linkAbout = getByText(/About/i);
    
    fireEvent.click(linkAbout);
    const pathname = history.location.pathname;
    expect(pathname).toBe('/about');
  });

  it('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const linkFavorite = getByText(/Favorite Pokémons/i);
    
    fireEvent.click(linkFavorite);
    const pathname = history.location.pathname;
    expect(pathname).toBe('/favorites');
  });

  it('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const linkFavorite = getByText(/Favorite Pokémons/i);
    
    fireEvent.click(linkFavorite);
    const pathname = history.location.pathname;
    expect(pathname).toBe('/favorites');
  });

  it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    history.push('/batata')
    const notFound = getByText(/Page requested not found/i);
    
    expect(notFound).toBeInTheDocument();
  });

})

