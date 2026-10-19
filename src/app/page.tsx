import { SiteHeader } from '@/components/site-header';

export default function Home() {
  return (
    <div className="shell">
      <SiteHeader />
      <main id="contenido" tabIndex={-1}>
        <p className="eyebrow">Proyecto en preparación</p>
        <h1>Conocer el aire de Granada.</h1>
        <p className="intro">
          Estamos preparando Polenia, un espacio para consultar información
          polínica de Granada capital.
        </p>
        <section className="notice" aria-labelledby="estado">
          <span className="tag">Base técnica · POL-010</span>
          <h2 id="estado">Todavía no hay datos disponibles</h2>
          <p>
            Esta es una página provisional. No hay fuentes de polen,
            meteorología o calidad del aire conectadas.
          </p>
          <p>
            Los favoritos locales y las recomendaciones contextuales se
            incorporarán en futuras fases.
          </p>
        </section>
      </main>
      <footer>Polenia · Información local, con contexto.</footer>
    </div>
  );
}
