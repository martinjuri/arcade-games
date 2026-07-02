"use client";

import { useMemo, useState } from "react";

type Pantalla = "biblioteca" | "detalle" | "jugador" | "auth" | "fama";

type Juego = {
  slug: string;
  titulo: string;
  categoria: string;
  descripcion: string;
  detalle: string;
  mejor: number;
  color: string;
};

type Marca = {
  jugador: string;
  puntuacion: number;
  fecha: string;
};

const juegos: Juego[] = [
  {
    slug: "arkanoid",
    titulo: "Arkanoid",
    categoria: "Reflejos",
    descripcion: "Rompe bloques con precisión neón.",
    detalle:
      "Controla la nave, conserva la bola en juego y destruye cada bloque del muro. Cada rebote suma tensión y cada nivel acelera el pulso del vault.",
    mejor: 98200,
    color: "cyan",
  },
  {
    slug: "tetris",
    titulo: "Tetris",
    categoria: "Puzzle",
    descripcion: "Encaja piezas antes del colapso.",
    detalle:
      "Ordena tetrominós, limpia líneas y sobrevive al ritmo creciente. La pantalla premia la calma, pero el tiempo nunca deja de empujar.",
    mejor: 143800,
    color: "magenta",
  },
  {
    slug: "snake",
    titulo: "Snake",
    categoria: "Clásico",
    descripcion: "Crece sin chocar contra tu leyenda.",
    detalle:
      "Persigue puntos de energía, estira tu cola y calcula cada giro. Un movimiento impulsivo puede convertir una partida perfecta en FIN DEL JUEGO.",
    mejor: 76400,
    color: "yellow",
  },
  {
    slug: "pac-man",
    titulo: "Pac-Man",
    categoria: "Laberinto",
    descripcion: "Come puntos y esquiva fantasmas.",
    detalle:
      "Recorre pasillos eléctricos, toma potenciadores y cambia la persecución a tu favor. El vault guarda cada ruta brillante.",
    mejor: 117300,
    color: "yellow",
  },
  {
    slug: "space-invaders",
    titulo: "Space Invaders",
    categoria: "Disparos",
    descripcion: "Defiende la Tierra del enjambre.",
    detalle:
      "Apunta con temple, administra coberturas y derriba oleadas alienígenas. Cada invasor vencido sube tu señal en el salón.",
    mejor: 126900,
    color: "cyan",
  },
  {
    slug: "asteroids",
    titulo: "Asteroids",
    categoria: "Espacial",
    descripcion: "Navega, dispara y no te pulverices.",
    detalle:
      "Flota entre rocas, domina la inercia y dispara antes de quedar rodeado. El espacio parece vacío hasta que todo viene hacia ti.",
    mejor: 89100,
    color: "magenta",
  },
];

const marcas: Record<string, Marca[]> = Object.fromEntries(
  juegos.map((juego, indice) => [
    juego.slug,
    Array.from({ length: 10 }, (_, fila) => ({
      jugador: [
        "NEONMARTA",
        "PIXELMAX",
        "LUZCERO",
        "BYTEANA",
        "CAPITAN80",
        "NOVALEX",
        "RETROPAZ",
        "CIRCUIT",
        "VOLTINA",
        "INVITADO",
      ][fila],
      puntuacion: juego.mejor - fila * (4200 + indice * 350),
      fecha: `0${(fila % 9) + 1}/07/2026`,
    })),
  ]),
);

export default function Home() {
  const [pantalla, setPantalla] = useState<Pantalla>("biblioteca");
  const [juegoActivo, setJuegoActivo] = useState(juegos[0]);
  const [busqueda, setBusqueda] = useState("");
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [tabAuth, setTabAuth] = useState<"login" | "registro">("login");
  const [juegoFama, setJuegoFama] = useState(juegos[0].slug);
  const [puntuacionGuardada, setPuntuacionGuardada] = useState(false);

  const juegosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();

    if (!termino) {
      return juegos;
    }

    return juegos.filter((juego) =>
      `${juego.titulo} ${juego.categoria}`.toLowerCase().includes(termino),
    );
  }, [busqueda]);

  const abrirDetalle = (juego: Juego) => {
    setJuegoActivo(juego);
    setPantalla("detalle");
    setMenuAbierto(false);
    setPuntuacionGuardada(false);
  };

  const abrirJugador = () => {
    setPantalla("jugador");
    setPuntuacionGuardada(false);
  };

  const navegar = (destino: Pantalla) => {
    setPantalla(destino);
    setMenuAbierto(false);
  };

  return (
    <main className="arcade-shell min-h-screen overflow-hidden text-white">
      <div className="scanlines" aria-hidden="true" />
      <div className="retro-grid" aria-hidden="true" />

      <nav className="sticky top-0 z-40 border-b border-cyan-300/25 bg-black/70 px-4 py-3 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <button
            className="logo-flicker text-left font-display text-lg text-cyan-200 sm:text-xl"
            onClick={() => navegar("biblioteca")}
            type="button"
          >
            ARCADE VAULT
          </button>

          <div className="hidden items-center gap-6 md:flex">
            <NavButton activo={pantalla === "biblioteca"} onClick={() => navegar("biblioteca")}>
              Biblioteca
            </NavButton>
            <NavButton activo={pantalla === "fama"} onClick={() => navegar("fama")}>
              Salón de la Fama
            </NavButton>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button className="pixel-button secondary" onClick={() => navegar("auth")} type="button">
              Iniciar Sesión
            </button>
            <span className="avatar" aria-label="Avatar de jugador">
              AV
            </span>
          </div>

          <button
            className="mobile-menu-button grid md:hidden"
            onClick={() => setMenuAbierto((abierto) => !abierto)}
            type="button"
            aria-label="Abrir menú"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {menuAbierto ? (
          <div className="mt-4 grid gap-3 border-t border-cyan-300/20 pt-4 md:hidden">
            <button className="mobile-link" onClick={() => navegar("biblioteca")} type="button">
              Biblioteca
            </button>
            <button className="mobile-link" onClick={() => navegar("fama")} type="button">
              Salón de la Fama
            </button>
            <button className="mobile-link" onClick={() => navegar("auth")} type="button">
              Iniciar Sesión
            </button>
          </div>
        ) : null}
      </nav>

      <section className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
        {pantalla === "biblioteca" ? (
          <Biblioteca
            busqueda={busqueda}
            juegos={juegosFiltrados}
            onBuscar={setBusqueda}
            onJugar={abrirDetalle}
          />
        ) : null}

        {pantalla === "detalle" ? (
          <Detalle
            juego={juegoActivo}
            marcas={marcas[juegoActivo.slug]}
            onJugar={abrirJugador}
            onVolver={() => navegar("biblioteca")}
          />
        ) : null}

        {pantalla === "jugador" ? (
          <Jugador
            juego={juegoActivo}
            guardada={puntuacionGuardada}
            onGuardar={() => setPuntuacionGuardada(true)}
            onReiniciar={() => setPuntuacionGuardada(false)}
            onSalir={() => navegar("biblioteca")}
          />
        ) : null}

        {pantalla === "auth" ? (
          <Auth tab={tabAuth} onTab={setTabAuth} onInvitado={() => navegar("biblioteca")} />
        ) : null}

        {pantalla === "fama" ? (
          <SalonDeLaFama juego={juegoFama} onJuego={setJuegoFama} />
        ) : null}
      </section>
    </main>
  );
}

function Biblioteca({
  busqueda,
  juegos,
  onBuscar,
  onJugar,
}: {
  busqueda: string;
  juegos: Juego[];
  onBuscar: (valor: string) => void;
  onJugar: (juego: Juego) => void;
}) {
  return (
    <div className="page-transition">
      <header className="mb-8 grid gap-5 lg:grid-cols-[1fr_380px] lg:items-end">
        <div>
          <p className="mb-3 font-mono text-sm uppercase tracking-[0.35em] text-yellow-200">
            INSERTA UNA MONEDA PARA JUGAR
          </p>
          <h1 className="logo-flicker max-w-4xl font-display text-4xl leading-tight text-cyan-100 sm:text-6xl">
            ARCADE VAULT
          </h1>
        </div>
        <label className="search-box">
          <span>Buscar juego o categoría</span>
          <input
            value={busqueda}
            onChange={(evento) => onBuscar(evento.target.value)}
            placeholder="Buscar por nombre o categoría"
          />
        </label>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {juegos.map((juego) => (
          <article className="game-card" key={juego.slug}>
            <div className={`cover-art cover-${juego.color}`}>
              <span>{juego.titulo.slice(0, 2).toUpperCase()}</span>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h2 className="font-display text-sm text-white">{juego.titulo}</h2>
                  <span className="category-pill">{juego.categoria}</span>
                </div>
                <p className="font-mono text-sm text-slate-300">{juego.descripcion}</p>
              </div>
              <div className="mt-auto grid gap-3">
                <div className="score-badge">
                  <span>MEJOR PUNTUACIÓN</span>
                  <strong>{juego.mejor.toLocaleString("es-AR")}</strong>
                </div>
                <button className="pixel-button" onClick={() => onJugar(juego)} type="button">
                  JUGAR
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Detalle({
  juego,
  marcas,
  onJugar,
  onVolver,
}: {
  juego: Juego;
  marcas: Marca[];
  onJugar: () => void;
  onVolver: () => void;
}) {
  return (
    <div className="page-transition grid gap-6 lg:grid-cols-[1fr_380px]">
      <section className="launch-panel">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-magenta-200">Juego seleccionado</p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-cyan-100 sm:text-6xl">{juego.titulo}</h1>
        <p className="mt-6 max-w-3xl font-mono text-lg leading-8 text-slate-200">{juego.detalle}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button className="pixel-button pulse" onClick={onJugar} type="button">
            JUGAR AHORA
          </button>
          <button className="pixel-button secondary" onClick={onVolver} type="button">
            VOLVER AL VAULT
          </button>
        </div>
      </section>

      <Leaderboard titulo="MEJORES PUNTUACIONES" marcas={marcas} compacta />
    </div>
  );
}

function Jugador({
  juego,
  guardada,
  onGuardar,
  onReiniciar,
  onSalir,
}: {
  juego: Juego;
  guardada: boolean;
  onGuardar: () => void;
  onReiniciar: () => void;
  onSalir: () => void;
}) {
  return (
    <div className="page-transition">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded border border-cyan-300/25 bg-black/50 p-3 font-mono text-sm">
        <div className="flex flex-wrap gap-4">
          <span>PUNTUACIÓN: 48.900</span>
          <span>VIDAS: 03</span>
          <span>NIVEL: 07</span>
          <span>JUGADOR: INVITADO</span>
        </div>
        <div className="flex gap-2">
          <button className="hud-button" type="button">PAUSA</button>
          <button className="hud-button" onClick={onSalir} type="button">SALIR</button>
        </div>
      </div>

      <section className="crt-bezel">
        <div className="crt-screen">
          <div className="mock-game">
            <span className="ship" />
            <span className="target target-one" />
            <span className="target target-two" />
            <span className="target target-three" />
            <h1>{juego.titulo}</h1>
            <p>CONTENEDOR CANVAS / IFRAME SANDBOX</p>
          </div>
        </div>
      </section>

      <div className="game-over-modal">
        <h2>FIN DEL JUEGO</h2>
        <p>Puntuación final: 48.900</p>
        {guardada ? <strong className="typewriter">PUNTUACIÓN GUARDADA</strong> : null}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button className="pixel-button" onClick={onGuardar} type="button">
            GUARDAR PUNTUACIÓN
          </button>
          <button className="pixel-button secondary" onClick={onReiniciar} type="button">
            JUGAR DE NUEVO
          </button>
          <button className="pixel-button secondary" onClick={onSalir} type="button">
            VOLVER AL VAULT
          </button>
        </div>
      </div>
    </div>
  );
}

function Auth({
  tab,
  onTab,
  onInvitado,
}: {
  tab: "login" | "registro";
  onTab: (tab: "login" | "registro") => void;
  onInvitado: () => void;
}) {
  return (
    <section className="auth-card page-transition mx-auto max-w-md">
      <h1 className="logo-flicker text-center font-display text-2xl text-cyan-100">ARCADE VAULT</h1>
      <div className="auth-tabs">
        <button className={tab === "login" ? "active" : ""} onClick={() => onTab("login")} type="button">
          INICIAR SESIÓN
        </button>
        <button className={tab === "registro" ? "active" : ""} onClick={() => onTab("registro")} type="button">
          CREAR CUENTA
        </button>
      </div>
      <form className="grid gap-4">
        <label className="field">
          <span>Usuario</span>
          <input placeholder="Nombre de jugador" />
        </label>
        {tab === "registro" ? (
          <label className="field">
            <span>Correo electrónico</span>
            <input placeholder="correo@ejemplo.com" type="email" />
          </label>
        ) : null}
        <label className="field">
          <span>Contraseña</span>
          <input placeholder="Clave secreta" type="password" />
        </label>
        <button className="pixel-button" type="button">
          {tab === "login" ? "ENTRAR AL VAULT" : "CREAR CUENTA"}
        </button>
      </form>
      <button className="guest-button" onClick={onInvitado} type="button">
        JUGAR COMO INVITADO
      </button>
      <div className="grid gap-3 sm:grid-cols-2">
        <button className="social-button" type="button">Google</button>
        <button className="social-button" type="button">GitHub</button>
      </div>
    </section>
  );
}

function SalonDeLaFama({
  juego,
  onJuego,
}: {
  juego: string;
  onJuego: (slug: string) => void;
}) {
  const activo = juegos.find((item) => item.slug === juego) ?? juegos[0];

  return (
    <div className="page-transition">
      <header className="mb-6">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-yellow-200">Ranking global</p>
        <h1 className="mt-3 font-display text-3xl text-cyan-100 sm:text-5xl">SALÓN DE LA FAMA</h1>
      </header>

      <div className="tabs">
        {juegos.map((item) => (
          <button
            className={item.slug === juego ? "active" : ""}
            key={item.slug}
            onClick={() => onJuego(item.slug)}
            type="button"
          >
            {item.titulo}
          </button>
        ))}
      </div>

      <Leaderboard titulo={activo.titulo} marcas={marcas[activo.slug]} />
      <div className="personal-best">TU MEJOR MARCA: 48.900 COMO INVITADO</div>
    </div>
  );
}

function Leaderboard({
  titulo,
  marcas,
  compacta = false,
}: {
  titulo: string;
  marcas: Marca[];
  compacta?: boolean;
}) {
  return (
    <section className="leaderboard">
      <h2>{titulo}</h2>
      <div className="leaderboard-head">
        <span>RANGO</span>
        <span>JUGADOR</span>
        <span>PUNTUACIÓN</span>
        {!compacta ? <span>FECHA</span> : null}
      </div>
      {marcas.map((marca, indice) => (
        <div className={`leaderboard-row rank-${indice + 1}`} key={`${marca.jugador}-${marca.puntuacion}`}>
          <span>#{indice + 1}</span>
          <strong>{marca.jugador}</strong>
          <span>{marca.puntuacion.toLocaleString("es-AR")}</span>
          {!compacta ? <span>{marca.fecha}</span> : null}
        </div>
      ))}
    </section>
  );
}

function NavButton({
  activo,
  children,
  onClick,
}: {
  activo: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button className={`nav-button ${activo ? "active" : ""}`} onClick={onClick} type="button">
      {children}
    </button>
  );
}
