import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from './page';
import RootLayout, { metadata } from './layout';
import { renderToStaticMarkup } from 'react-dom/server';

describe('Página provisional', () => {
  it('identifica Granada y comunica la ausencia de fuentes conectadas', () => {
    render(<Home />);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Conocer el aire de Granada.',
      }),
    ).toBeVisible();
    expect(screen.getByText('Granada capital')).toBeVisible();
    expect(
      screen.getByRole('region', { name: 'Todavía no hay datos disponibles' }),
    ).toHaveTextContent(
      'No hay fuentes de polen, meteorología o calidad del aire conectadas.',
    );
    expect(screen.getByRole('main')).toHaveAttribute('id', 'contenido');
  });

  it('ofrece idioma español y un salto de teclado al contenido principal', () => {
    const html = renderToStaticMarkup(
      <RootLayout>
        <Home />
      </RootLayout>,
    );
    expect(html).toContain('lang="es"');
    expect(html).toContain('href="#contenido"');
    expect(html).toContain('id="contenido" tabindex="-1"');
    expect(metadata.title).toBe('Polenia · Granada');
  });
});
