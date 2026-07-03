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
  partidas: string;
  color: "cyan" | "magenta" | "yellow";
  cover: string;
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
    partidas: "12.4K",
    color: "cyan",
    cover: "cover-bricks",
  },
  {
    slug: "tetris",
    titulo: "Tetris",
    categoria: "Puzzle",
    descripcion: "Encaja piezas antes del colapso.",
    detalle:
      "Ordena tetrominós, limpia líneas y sobrevive al ritmo creciente. La pantalla premia la calma, pero el tiempo nunca deja de empujar.",
    mejor: 143800,
    partidas: "31.8K",
    color: "magenta",
    cover: "cover-tetro",
  },
  {
    slug: "snake",
    titulo: "Snake",
    categoria: "Clásico",
    descripcion: "Crece sin chocar contra tu leyenda.",
    detalle:
      "Persigue puntos de energía, estira tu cola y calcula cada giro. Un movimiento impulsivo puede convertir una partida perfecta en FIN DEL JUEGO.",
    mejor: 76400,
    partidas: "9.1K",
    color: "yellow",
    cover: "cover-snake",
  },
  {
    slug: "pac-man",
    titulo: "Pac-Man",
    categoria: "Laberinto",
    descripcion: "Come puntos y esquiva fantasmas.",
    detalle:
      "Recorre pasillos eléctricos, toma potenciadores y cambia la persecución a tu favor. El vault guarda cada ruta brillante.",
    mejor: 117300,
    partidas: "27.2K",
    color: "yellow",
    cover: "cover-glot",
  },
  {
    slug: "space-invaders",
    titulo: "Space Invaders",
    categoria: "Disparos",
    descripcion: "Defiende la Tierra del enjambre.",
    detalle:
      "Apunta con temple, administra coberturas y derriba oleadas alienígenas. Cada invasor vencido sube tu señal en el salón.",
    mejor: 126900,
    partidas: "18.0K",
    color: "cyan",
    cover: "cover-invaders",
  },
  {
    slug: "asteroids",
    titulo: "Asteroids",
    categoria: "Espacial",
    descripcion: "Navega, dispara y no te pulverices.",
    detalle:
      "Flota entre rocas, domina la inercia y dispara antes de quedar rodeado. El espacio parece vacío hasta que todo viene hacia ti.",
    mejor: 89100,
    partidas: "15.6K",
    color: "magenta",
    cover: "cover-rocas",
  },
];

const categorias = ["TODOS", ...new Set(juegos.map((juego) => juego.categoria))];

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
  const [categoriaFiltro, setCategoriaFiltro] = useState("TODOS");
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [tabAuth, setTabAuth] = useState<"login" | "registro">("login");
  const [juegoFama, setJuegoFama] = useState(juegos[0].slug);
  const [usuario, setUsuario] = useState<string | null>(null);
  const [pausado, setPausado] = useState(false);
  const [terminado, setTerminado] = useState(false);
  const [puntuacionGuardada, setPuntuacionGuardada] = useState(false);
  const [nombreJugador, setNombreJugador] = useState("INVITADO");

  const juegosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();

    return juegos.filter((juego) => {
      const coincideCategoria = categoriaFiltro === "TODOS" || juego.categoria === categoriaFiltro;
      const coincideTermino = !termino || `${juego.titulo} ${juego.categoria}`.toLowerCase().includes(termino);
      return coincideCategoria && coincideTermino;
    });
  }, [busqueda, categoriaFiltro]);

  const navegar = (destino: Pantalla) => {
    setPantalla(destino);
    setMenuAbierto(false);
  };

  const abrirDetalle = (juego: Juego) => {
    setJuegoActivo(juego);
    navegar("detalle");
  };

  const abrirJugador = () => {
    setPausado(false);
    setTerminado(false);
    setPuntuacionGuardada(false);
    setNombreJugador(usuario ?? "INVITADO");
    navegar("jugador");
  };

  const iniciarSesion = (nombre: string) => {
    setUsuario(nombre);
    navegar("biblioteca");
  };

  const cerrarSesion = () => setUsuario(null);

  const reiniciarPartida = () => {
    setPausado(false);
    setTerminado(false);
    setPuntuacionGuardada(false);
  };

  const esInicio = pantalla === "biblioteca" || pantalla === "detalle" || pantalla === "jugador";

  return (
    <>
      <div className="av-bg" aria-hidden="true" />
      <div className="av-noise" aria-hidden="true" />

      <div className="av-app">
        <nav className="av-nav">
          <div className="logo" onClick={() => navegar("biblioteca")}>
            <div className="logo-mark" />
            <div className="logo-text neon-cyan">
              ARCADE <span className="neon-magenta">VAULT</span>
            </div>
          </div>

          <div className="links">
            <a
              href="#"
              className={esInicio ? "active" : ""}
              onClick={(evento) => {
                evento.preventDefault();
                navegar("biblioteca");
              }}
            >
              Biblioteca
            </a>
            <a
              href="#"
              className={pantalla === "fama" ? "active" : ""}
              onClick={(evento) => {
                evento.preventDefault();
                navegar("fama");
              }}
            >
              Salón de la Fama
            </a>
          </div>

          <div className="spacer" />

          <div className="coin-counter">
            <span className="coin" />
            <span>CRÉDITOS · 03</span>
          </div>

          {usuario ? (
            <button className="btn ghost auth-btn" onClick={cerrarSesion} type="button">
              {usuario} ▾
            </button>
          ) : (
            <button className="btn auth-btn" onClick={() => navegar("auth")} type="button">
              Iniciar Sesión
            </button>
          )}

          <button
            className="btn ghost hamburger"
            onClick={() => setMenuAbierto(true)}
            type="button"
            aria-label="Abrir menú"
          >
            ≡
          </button>
        </nav>

        <div
          className={`av-mobile-backdrop${menuAbierto ? " open" : ""}`}
          onClick={() => setMenuAbierto(false)}
          aria-hidden="true"
        />
        <aside className={`av-mobile-panel${menuAbierto ? " open" : ""}`}>
          <div className="pixel neon-cyan" style={{ fontSize: 11, marginBottom: 16 }}>
            MENÚ
          </div>
          <a
            href="#"
            className={esInicio ? "active" : ""}
            onClick={(evento) => {
              evento.preventDefault();
              navegar("biblioteca");
            }}
          >
            Biblioteca
          </a>
          <a
            href="#"
            className={pantalla === "fama" ? "active" : ""}
            onClick={(evento) => {
              evento.preventDefault();
              navegar("fama");
            }}
          >
            Salón de la Fama
          </a>
          <a
            href="#"
            className={pantalla === "auth" ? "active" : ""}
            onClick={(evento) => {
              evento.preventDefault();
              navegar("auth");
            }}
          >
            {usuario ? "Cuenta" : "Iniciar Sesión"}
          </a>
          <div style={{ flex: 1 }} />
          <div className="pixel" style={{ fontSize: 9, color: "var(--ink-faint)", letterSpacing: "0.16em" }}>
            CRÉDITOS · 03
          </div>
        </aside>

        <main className="av-main">
          {pantalla === "biblioteca" ? (
            <Biblioteca
              busqueda={busqueda}
              juegos={juegosFiltrados}
              categorias={categorias}
              categoriaFiltro={categoriaFiltro}
              onBuscar={setBusqueda}
              onCategoria={setCategoriaFiltro}
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
              pausado={pausado}
              terminado={terminado}
              guardada={puntuacionGuardada}
              nombre={nombreJugador}
              onNombreCambiar={setNombreJugador}
              onPausar={() => setPausado((valor) => !valor)}
              onTerminar={() => setTerminado(true)}
              onGuardar={() => setPuntuacionGuardada(true)}
              onReiniciar={reiniciarPartida}
              onSalir={() => navegar("detalle")}
            />
          ) : null}

          {pantalla === "auth" ? (
            <Auth
              tab={tabAuth}
              onTab={setTabAuth}
              onSubmit={iniciarSesion}
              onInvitado={() => navegar("biblioteca")}
            />
          ) : null}

          {pantalla === "fama" ? (
            <SalonDeLaFama
              juego={juegoFama}
              juegos={juegos}
              marcas={marcas}
              usuario={usuario}
              onJuego={setJuegoFama}
              onVolver={() => navegar("biblioteca")}
            />
          ) : null}
        </main>

        <footer className="av-footer">© 2026 ARCADE VAULT · HECHO CON PÍXELES Y NEÓN · v1.0.0</footer>
      </div>
    </>
  );
}

function Biblioteca({
  busqueda,
  juegos,
  categorias,
  categoriaFiltro,
  onBuscar,
  onCategoria,
  onJugar,
}: {
  busqueda: string;
  juegos: Juego[];
  categorias: string[];
  categoriaFiltro: string;
  onBuscar: (valor: string) => void;
  onCategoria: (categoria: string) => void;
  onJugar: (juego: Juego) => void;
}) {
  return (
    <div className="fade-in">
      <section className="av-hero">
        <h1 className="flicker">ARCADE VAULT</h1>
        <div className="sub">
          INSERTA UNA MONEDA PARA JUGAR <span className="blink">_</span>
        </div>
      </section>

      <div className="av-filters">
        <div className="av-search">
          <span className="ico">⌕</span>
          <input
            value={busqueda}
            onChange={(evento) => onBuscar(evento.target.value)}
            placeholder="Buscar un juego por nombre…"
          />
        </div>
        <div className="av-chips">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              className={`chip${categoriaFiltro === categoria ? " active" : ""}`}
              onClick={() => onCategoria(categoria)}
              type="button"
            >
              {categoria}
            </button>
          ))}
        </div>
      </div>

      <div className="av-grid">
        {juegos.map((juego) => (
          <TarjetaJuego key={juego.slug} juego={juego} onSeleccionar={onJugar} />
        ))}
        {juegos.length === 0 ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: 80, color: "var(--ink-faint)" }}>
            <div className="pixel" style={{ fontSize: 14, color: "var(--magenta)", marginBottom: 12 }}>
              NO HAY RESULTADOS
            </div>
            <div>Intenta otra búsqueda o categoría.</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function TarjetaJuego({
  juego,
  onSeleccionar,
}: {
  juego: Juego;
  onSeleccionar: (juego: Juego) => void;
}) {
  return (
    <div className="card" onClick={() => onSeleccionar(juego)}>
      <div className="cover">
        <div className={`cover-bg ${juego.cover}`} />
        <div className="label">{juego.categoria}</div>
      </div>
      <div className="meta">
        <div className="title">{juego.titulo}</div>
        <div className="desc">{juego.descripcion}</div>
        <div className="row">
          <div className="score-badge">
            <span>MEJOR PUNTUACIÓN</span>
            <b>{juego.mejor.toLocaleString("es-AR")}</b>
          </div>
          <button
            className={`btn${juego.color === "magenta" ? " magenta" : juego.color === "yellow" ? " yellow" : ""}`}
            onClick={(evento) => {
              evento.stopPropagation();
              onSeleccionar(juego);
            }}
            type="button"
          >
            JUGAR
          </button>
        </div>
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
    <div className="av-detail fade-in">
      <div>
        <div className="detail-cover">
          <div className={`cover-bg ${juego.cover}`} />
        </div>
        <div style={{ marginTop: 20 }} className="detail-info">
          <div className="detail-tags">
            <span>{juego.categoria}</span>
            <span>1 JUGADOR</span>
            <span>TECLADO / TÁCTIL</span>
            <span>RETRO 1985</span>
          </div>
          <h2 className="neon-cyan">{juego.titulo}</h2>
          <p>{juego.detalle}</p>
          <div className="stat-strip">
            <div>
              <div className="l">Partidas</div>
              <div className="v">{juego.partidas}</div>
            </div>
            <div>
              <div className="l">Mejor global</div>
              <div className="v" style={{ color: "var(--magenta)", textShadow: "0 0 6px rgba(255,0,110,0.5)" }}>
                {juego.mejor.toLocaleString("es-AR")}
              </div>
            </div>
            <div>
              <div className="l">Dificultad</div>
              <div className="v" style={{ color: "var(--yellow)", textShadow: "0 0 6px rgba(245,255,0,0.5)" }}>
                ★ ★ ★ ☆ ☆
              </div>
            </div>
          </div>
          <div className="detail-actions">
            <button className="btn xl pulse" onClick={onJugar} type="button">
              ▶ JUGAR AHORA
            </button>
            <button className="btn ghost lg" onClick={onVolver} type="button">
              VOLVER AL VAULT
            </button>
          </div>
        </div>
      </div>

      <aside>
        <Leaderboard titulo="MEJORES PUNTUACIONES" marcas={marcas} />
      </aside>
    </div>
  );
}

function Leaderboard({ titulo, marcas }: { titulo: string; marcas: Marca[] }) {
  return (
    <section className="leaderboard">
      <h3>{titulo}</h3>
      {marcas.map((marca, indice) => (
        <div
          key={`${marca.jugador}-${marca.puntuacion}`}
          className={`lb-row${indice === 0 ? " top1" : indice === 1 ? " top2" : indice === 2 ? " top3" : ""}`}
        >
          <div className="rk">#{String(indice + 1).padStart(2, "0")}</div>
          <div className="pl">
            {marca.jugador}
            <div style={{ fontSize: 10, color: "var(--ink-faint)", letterSpacing: "0.1em" }}>{marca.fecha}</div>
          </div>
          <div className="sc">{marca.puntuacion.toLocaleString("es-AR")}</div>
        </div>
      ))}
    </section>
  );
}

function Jugador({
  juego,
  pausado,
  terminado,
  guardada,
  nombre,
  onNombreCambiar,
  onPausar,
  onTerminar,
  onGuardar,
  onReiniciar,
  onSalir,
}: {
  juego: Juego;
  pausado: boolean;
  terminado: boolean;
  guardada: boolean;
  nombre: string;
  onNombreCambiar: (nombre: string) => void;
  onPausar: () => void;
  onTerminar: () => void;
  onGuardar: () => void;
  onReiniciar: () => void;
  onSalir: () => void;
}) {
  return (
    <div className="av-player fade-in">
      <div className="player-hud">
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <div className="hud-stat">
            <div className="l">Jugador</div>
            <div className="v" style={{ color: "var(--ink)" }}>
              {nombre}
            </div>
          </div>
          <div className="hud-stat">
            <div className="l">Puntuación</div>
            <div className="v">48.900</div>
          </div>
          <div className="hud-stat lives">
            <div className="l">Vidas</div>
            <div className="v">♥ ♥ ♥</div>
          </div>
          <div className="hud-stat level">
            <div className="l">Nivel</div>
            <div className="v">07</div>
          </div>
        </div>
        <div className="hud-actions">
          <button className="btn yellow" onClick={onPausar} type="button">
            {pausado ? "REANUDAR" : "PAUSA"}
          </button>
          <button className="btn magenta" onClick={onTerminar} type="button">
            FIN
          </button>
          <button className="btn ghost" onClick={onSalir} type="button">
            SALIR
          </button>
        </div>
      </div>

      <div className="crt">
        <div className="crt-screen">
          <div className="game-arena">
            <div className="grid-floor" />
            <div className="enemy e1" />
            <div className="enemy e2" />
            <div className="enemy e3" />
            <div className="player-ship" />
          </div>
          {pausado && !terminado ? (
            <div className="crt-content" style={{ background: "rgba(0,0,0,0.6)", zIndex: 5 }}>
              <div>
                <div className="pixel neon-yellow" style={{ fontSize: 22 }}>
                  EN PAUSA
                </div>
                <div className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", marginTop: 10, letterSpacing: "0.16em" }}>
                  PULSA REANUDAR PARA CONTINUAR
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="crt-bottom">
          <span className="led">SEÑAL OK</span>
          <span>{juego.titulo} · CRT-83 · 60 HZ</span>
          <span>CARGA · 1MB</span>
        </div>
      </div>

      {terminado ? (
        <div className="modal-bd">
          <div className="modal">
            <h2>FIN DEL JUEGO</h2>
            <div className="final-label">PUNTUACIÓN FINAL</div>
            <div className="final">48.900</div>
            {!guardada ? (
              <div className="input-row">
                <input
                  value={nombre}
                  onChange={(evento) => onNombreCambiar(evento.target.value.toUpperCase().slice(0, 10))}
                  placeholder="TUS INICIALES"
                />
                <button className="btn yellow" onClick={onGuardar} type="button">
                  GUARDAR PUNTUACIÓN
                </button>
              </div>
            ) : (
              <div className="toast-saved">▸ PUNTUACIÓN GUARDADA_</div>
            )}
            <div className="actions">
              <button className="btn" onClick={onReiniciar} type="button">
                JUGAR DE NUEVO
              </button>
              <button className="btn magenta" onClick={onSalir} type="button">
                VOLVER AL VAULT
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Auth({
  tab,
  onTab,
  onSubmit,
  onInvitado,
}: {
  tab: "login" | "registro";
  onTab: (tab: "login" | "registro") => void;
  onSubmit: (nombre: string) => void;
  onInvitado: () => void;
}) {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");

  return (
    <div className="av-auth-wrap fade-in">
      <div className="auth-card">
        <div className="auth-header">
          <div className="mark" />
          <h2 className="neon-cyan">ARCADE VAULT</h2>
          <div className="mono" style={{ fontSize: 11, color: "var(--ink-faint)", letterSpacing: "0.16em", marginTop: 6 }}>
            ACCESO AL SISTEMA · v1.0
          </div>
        </div>

        <div className="auth-tabs">
          <button className={tab === "login" ? "on" : ""} onClick={() => onTab("login")} type="button">
            INICIAR SESIÓN
          </button>
          <button className={tab === "registro" ? "on" : ""} onClick={() => onTab("registro")} type="button">
            CREAR CUENTA
          </button>
        </div>

        <form
          onSubmit={(evento) => {
            evento.preventDefault();
            onSubmit((nombreUsuario || "PLAYER1").toUpperCase().slice(0, 10));
          }}
        >
          <div className="field">
            <label>Usuario</label>
            <input value={nombreUsuario} onChange={(evento) => setNombreUsuario(evento.target.value)} placeholder="px_kai" />
          </div>
          {tab === "registro" ? (
            <div className="field slide-in">
              <label>Correo electrónico</label>
              <input type="email" value={correo} onChange={(evento) => setCorreo(evento.target.value)} placeholder="jugador@vault.gg" />
            </div>
          ) : null}
          <div className="field">
            <label>Contraseña</label>
            <input type="password" value={clave} onChange={(evento) => setClave(evento.target.value)} placeholder="••••••••" />
          </div>

          <button className="btn lg" type="submit" style={{ width: "100%", marginTop: 8 }}>
            {tab === "login" ? "ENTRAR AL VAULT" : "CREAR Y JUGAR"}
          </button>
        </form>

        <button className="btn ghost" style={{ width: "100%", marginTop: 10 }} onClick={onInvitado} type="button">
          JUGAR COMO INVITADO
        </button>

        <div className="auth-divider">O CONTINÚA CON</div>
        <div className="social">
          <button className="btn ghost" type="button">
            ◆ GOOGLE
          </button>
          <button className="btn ghost" type="button">
            ▣ GITHUB
          </button>
        </div>

        <div style={{ marginTop: 18, textAlign: "center", fontSize: 11, color: "var(--ink-faint)", letterSpacing: "0.1em" }}>
          AL ENTRAR ACEPTAS LOS TÉRMINOS DEL SALÓN ARCADE
        </div>
      </div>
    </div>
  );
}

function SalonDeLaFama({
  juego,
  juegos,
  marcas,
  usuario,
  onJuego,
  onVolver,
}: {
  juego: string;
  juegos: Juego[];
  marcas: Record<string, Marca[]>;
  usuario: string | null;
  onJuego: (slug: string) => void;
  onVolver: () => void;
}) {
  const activo = juegos.find((item) => item.slug === juego) ?? juegos[0];
  const filas = marcas[activo.slug];
  const miPosicion = 8;
  const miPuntuacion = Math.max(filas[5].puntuacion - 2400, 1000);

  return (
    <div className="av-hall fade-in">
      <div className="hall-head">
        <h1>SALÓN DE LA FAMA</h1>
        <p className="pixel" style={{ fontSize: 10 }}>
          LOS NOMBRES QUE NUNCA SE BORRAN DE LA PANTALLA
        </p>
      </div>

      <div className="hall-tabs">
        {juegos.map((item) => (
          <button
            key={item.slug}
            className={`chip${item.slug === juego ? " active" : ""}`}
            onClick={() => onJuego(item.slug)}
            type="button"
          >
            {item.titulo}
          </button>
        ))}
      </div>

      <div className="podium">
        <div className="podium-slot silver">
          <div className="rank-num">02</div>
          <div className="name">{filas[1].jugador}</div>
          <div className="score">{filas[1].puntuacion.toLocaleString("es-AR")}</div>
          <div className="date">{filas[1].fecha}</div>
        </div>
        <div className="podium-slot gold">
          <div className="pixel" style={{ fontSize: 9, color: "var(--gold)", letterSpacing: "0.18em" }}>
            CAMPEÓN
          </div>
          <div className="rank-num" style={{ fontSize: 36, marginTop: 4 }}>
            01
          </div>
          <div className="name">{filas[0].jugador}</div>
          <div className="score" style={{ fontSize: 20 }}>
            {filas[0].puntuacion.toLocaleString("es-AR")}
          </div>
          <div className="date">{filas[0].fecha}</div>
        </div>
        <div className="podium-slot bronze">
          <div className="rank-num">03</div>
          <div className="name">{filas[2].jugador}</div>
          <div className="score">{filas[2].puntuacion.toLocaleString("es-AR")}</div>
          <div className="date">{filas[2].fecha}</div>
        </div>
      </div>

      <div className="hall-table">
        <div className="th">
          <div>RANGO</div>
          <div>JUGADOR</div>
          <div>PUNTUACIÓN</div>
          <div>FECHA</div>
        </div>
        {filas.map((fila, indice) => (
          <div
            key={`${fila.jugador}-${indice}`}
            className={`tr${indice === 0 ? " top1" : indice === 1 ? " top2" : indice === 2 ? " top3" : ""}`}
            style={{ animationDelay: `${indice * 50}ms` }}
          >
            <div className="rk">#{String(indice + 1).padStart(2, "0")}</div>
            <div className="pl">{fila.jugador}</div>
            <div className="sc">{fila.puntuacion.toLocaleString("es-AR")}</div>
            <div className="dt">{fila.fecha}</div>
          </div>
        ))}
        {usuario ? (
          <>
            <div className="tr you-label">▸ TU MEJOR MARCA EN {activo.titulo}</div>
            <div className="tr you" style={{ animationDelay: `${filas.length * 50 + 50}ms` }}>
              <div className="rk" style={{ color: "var(--yellow)" }}>
                #{String(miPosicion).padStart(2, "0")}
              </div>
              <div className="pl" style={{ color: "var(--yellow)" }}>
                {usuario}
              </div>
              <div className="sc" style={{ color: "var(--yellow)", textShadow: "0 0 6px rgba(245,255,0,0.5)" }}>
                {miPuntuacion.toLocaleString("es-AR")}
              </div>
              <div className="dt">—</div>
            </div>
          </>
        ) : null}
      </div>

      <div style={{ textAlign: "center", marginTop: 32 }}>
        <button className="btn lg" onClick={onVolver} type="button">
          VOLVER A LA BIBLIOTECA
        </button>
      </div>
    </div>
  );
}
