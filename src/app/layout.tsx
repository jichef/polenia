import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Polenia · Granada',
  description:
    'Polenia está en preparación: información polínica para Granada capital.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
