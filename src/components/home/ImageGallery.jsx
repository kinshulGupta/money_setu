import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Globe, X } from "lucide-react";
import { Image } from "@/components/ui/image";
import { HOME_IMAGES } from "@/lib/homeContent";
import "./image-gallery.css";

/* Sectors we finance — two rows of photography drifting past each other.
   Card sizes are per-card (w/h in em) so the rows keep a ragged top edge
   against one shared baseline, exactly as the block was designed. */

const ROW_A = [
  {
    id: "manufacturing",
    tag: "Working capital",
    name: "Manufacturing",
    w: 14.961,
    h: 9.688,
    src: "https://media.base44.com/images/public/6aecf10883986b449f7887a2/100e16468_generated_image.png",
    alt: "Precision manufacturing floor with CNC machinery under cool industrial light",
  },
  {
    id: "logistics",
    tag: "Export credit",
    name: "Logistics",
    w: 8.633,
    h: 13.516,
    src: "https://media.base44.com/images/public/6aecf10883986b449f7887a2/b41bd3607_generated_image.png",
    alt: "Container port with gantry cranes at blue hour",
  },
  {
    id: "healthcare",
    tag: "Equipment finance",
    name: "Healthcare",
    w: 14.961,
    h: 9.688,
    src: "https://media.base44.com/images/public/6aecf10883986b449f7887a2/f91d0c13b_generated_image.png",
    alt: "Hospital corridor in soft daylight",
  },
  {
    id: "agri",
    tag: "Project debt",
    name: "Agri-processing",
    w: 9.649,
    h: 12.07,
    src: "https://media.base44.com/images/public/6aecf10883986b449f7887a2/092c6c8bd_generated_image.png",
    alt: "Grain silos of an agri-processing facility at golden hour",
  },
  {
    id: "retail",
    tag: "Supply chain",
    name: "Retail & D2C",
    w: 9.649,
    h: 12.07,
    src: "https://media.base44.com/images/public/6aecf10883986b449f7887a2/dbbd6b772_generated_image.png",
    alt: "Distribution warehouse interior at night",
  },
];

const ROW_B = [
  {
    id: "syndication",
    tag: "Debt syndication",
    name: "Syndication",
    w: 9.922,
    h: 13.476,
    src: HOME_IMAGES.boardroom,
    alt: "Advisors reviewing a credit file across a boardroom table",
  },
  {
    id: "advisory",
    tag: "Virtual CFO",
    name: "Advisory",
    w: 17.07,
    h: 11.289,
    src: "https://media.base44.com/images/public/6aecf10883986b449f7887a2/916c8033d_generated_image.png",
    alt: "Analysts reviewing projections on a glass partition at night",
  },
  {
    id: "valuation",
    tag: "Rule 11UA",
    name: "Valuation",
    w: 11.211,
    h: 12.579,
    src: HOME_IMAGES.signing,
    alt: "Sanction letter being signed beside printed financial statements",
  },
  {
    id: "capital",
    tag: "Capital markets",
    name: "Capital",
    w: 17.07,
    h: 11.289,
    src: HOME_IMAGES.skyline,
    alt: "Financial district towers at night seen through a glass facade",
  },
];

const TILES = [...ROW_A, ...ROW_B];

const NAV = [
  { label: "Services", to: "/services" },
  { label: "Calculators", to: "/calculators" },
  { label: "Enquire", to: "/enquire" },
  { label: "Client desk", to: "/login" },
];

const SPEED = 42; // px per second at the design scale
const FLIGHT = 520;
const EASE = "cubic-bezier(.22,.61,.36,1)";
const CURTAIN = 780;
const REVEAL = "morph";

function TileCard({ tile, copy }) {
  return (
    <button
      type="button"
      className="ig-card"
      data-ig-open
      data-ig-tile={tile.id}
      tabIndex={copy ? -1 : undefined}
    >
      <span className="ig-text">
        <span className="ig-city">{tile.tag}</span>
        <span className="ig-name">{tile.name}</span>
      </span>
      <span
        className="ig-frame"
        style={{ "--ig-w": `${tile.w}em`, "--ig-h": `${tile.h}em` }}
      >
        <Image
          src={tile.src}
          alt={copy ? "" : tile.alt}
          className="ig-art"
          fittingType="fill"
        />
      </span>
    </button>
  );
}

function Row({ tiles, back }) {
  return (
    <div className={`ig-row${back ? " ig-row--back" : ""}`}>
      <div className="ig-track">
        <div className="ig-set">
          {tiles.map((tile) => (
            <TileCard key={tile.id} tile={tile} copy={false} />
          ))}
        </div>
        {/* exact copy — makes the -50% loop seamless */}
        <div className="ig-set" aria-hidden="true">
          {tiles.map((tile) => (
            <TileCard key={`${tile.id}-copy`} tile={tile} copy />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ImageGallery() {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const fullRef = useRef(null);
  const artRef = useRef(null);
  const cityRef = useRef(null);
  const nameRef = useRef(null);
  const closeRef = useRef(null);
  const tiltRef = useRef({ el: null, box: null });
  const pendingRef = useRef(null);
  const openerRef = useRef(null);
  const flightsRef = useRef([]);
  const isOpenRef = useRef(false);
  const closeDoneRef = useRef(null);
  const viaKeyboardRef = useRef(false);

  const [active, setActive] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  /* row duration derived from the measured set width, so both rows travel at
     the same speed whatever the card sizes are */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const sync = () => {
      root.querySelectorAll(".ig-track").forEach((track) => {
        const set = track.querySelector(".ig-set");
        const width = set ? set.getBoundingClientRect().width : 0;
        if (width > 0) track.style.animationDuration = `${(width / SPEED).toFixed(2)}s`;
      });
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(root);
    const timer = setTimeout(() => root.classList.add("is-ig-entered"), 2900);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  /* ---- pointer tilt (runtime only — pointer position cannot be CSS) ---- */
  const untilt = (el) => {
    if (!el) return;
    el.classList.remove("is-ig-tilting");
    el.style.removeProperty("--ig-rx");
    el.style.removeProperty("--ig-ry");
  };
  const dropTilt = () => {
    untilt(tiltRef.current.el);
    tiltRef.current = { el: null, box: null };
  };

  const handlePointerMove = (event) => {
    if (event.pointerType && event.pointerType !== "mouse") return;
    const frame = event.target.closest ? event.target.closest(".ig-frame") : null;
    const tilt = tiltRef.current;
    if (frame !== tilt.el) {
      untilt(tilt.el);
      tilt.el = frame;
      tilt.box = frame ? frame.getBoundingClientRect() : null;
      if (frame) frame.classList.add("is-ig-tilting");
    }
    if (!frame || !tilt.box || !tilt.box.width) return;
    const x = (event.clientX - tilt.box.left) / tilt.box.width - 0.5;
    const y = (event.clientY - tilt.box.top) / tilt.box.height - 0.5;
    frame.style.setProperty("--ig-ry", `${(x * 36).toFixed(2)}deg`);
    frame.style.setProperty("--ig-rx", `${(-y * 36).toFixed(2)}deg`);
  };

  /* ---- the morph ---- */
  const cancelFlights = () => {
    flightsRef.current.forEach((a) => {
      try {
        a.cancel();
      } catch {
        /* already gone */
      }
    });
    flightsRef.current = [];
  };

  const play = (el, transform, back) => {
    if (!el || !transform) return null;
    const flight = el.animate(
      back
        ? [{ transform: "none" }, { transform }]
        : [{ transform }, { transform: "none" }],
      { duration: FLIGHT, easing: EASE, fill: back ? "both" : "none" }
    );
    flightsRef.current.push(flight);
    return flight;
  };

  const invert = (from, to, scale) => {
    if (!from || !to) return null;
    const a = from.getBoundingClientRect();
    const b = to.getBoundingClientRect();
    if (!a.width || !b.width) return null;
    const s = scale ?? a.width / b.width;
    return `translate(${((a.left + a.width / 2) - (b.left + b.width / 2)).toFixed(2)}px,${(
      (a.top + a.height / 2) - (b.top + b.height / 2)
    ).toFixed(2)}px) scale(${s.toFixed(4)})`;
  };

  /* the city and the name fly as separate lines: flush left on a card,
     centred in the full view, so one transform cannot land both */
  const lineFlights = (card) => {
    const city = card.querySelector(".ig-city");
    const name = card.querySelector(".ig-name");
    const ratio = (from, to) => {
      const a = parseFloat(getComputedStyle(from).fontSize);
      const b = parseFloat(getComputedStyle(to).fontSize);
      return a && b ? a / b : 1;
    };
    return [
      city ? invert(city, cityRef.current, ratio(city, cityRef.current)) : null,
      name ? invert(name, nameRef.current, ratio(name, nameRef.current)) : null,
    ];
  };

  const open = useCallback((card) => {
    if (closeDoneRef.current) closeDoneRef.current();
    if (isOpenRef.current) return;
    const tile = TILES.find((item) => item.id === card.dataset.igTile);
    if (!tile) return;
    isOpenRef.current = true;
    dropTilt(); // a rotated frame reports its projected box
    openerRef.current = card;
    pendingRef.current = card;
    setActive(tile);
  }, []);

  /* the flight runs after the panel has rendered the new picture */
  useEffect(() => {
    if (!active) return;
    const card = pendingRef.current;
    pendingRef.current = null;
    const root = rootRef.current;
    if (!root || !card) return;

    if (REVEAL === "curtain") {
      root.classList.add("is-ig-open");
      closeRef.current?.focus();
      return;
    }

    // the panel sits outside the query container, so borrow the stage's unit
    if (stageRef.current && fullRef.current) {
      fullRef.current.style.fontSize = getComputedStyle(stageRef.current).fontSize;
    }
    cancelFlights();
    root.querySelectorAll(".is-ig-source").forEach((el) => el.classList.remove("is-ig-source"));
    root.classList.remove("is-ig-closing");
    root.classList.add("is-ig-open");

    const artFlight = invert(card.querySelector(".ig-frame"), artRef.current);
    const flights = lineFlights(card);
    card.classList.add("is-ig-source");
    const played = [
      play(artRef.current, artFlight),
      play(cityRef.current, flights[0]),
      play(nameRef.current, flights[1]),
    ].filter(Boolean);

    closeRef.current?.focus();
    // fill:none means a retired flight falls back to the resting CSS
    const timer = setTimeout(() => {
      played.forEach((a) => {
        try {
          a.cancel();
        } catch {
          /* already gone */
        }
      });
    }, FLIGHT + 150);
    return () => clearTimeout(timer);
  }, [active]);

  const close = useCallback(() => {
    if (!isOpenRef.current) return;
    isOpenRef.current = false;
    const root = rootRef.current;
    const card = openerRef.current;
    openerRef.current = null;
    if (!root) return;

    const restoreFocus = () => {
      if (viaKeyboardRef.current && card && card.isConnected && card.tabIndex !== -1) {
        card.focus();
      } else if (document.activeElement === closeRef.current) {
        closeRef.current?.blur(); // don't leave a row paused by focus-within
      }
    };

    if (REVEAL === "curtain") {
      root.classList.add("is-ig-closing");
      const done = () => {
        if (closeDoneRef.current === done) closeDoneRef.current = null;
        if (isOpenRef.current) return;
        root.classList.remove("is-ig-open", "is-ig-closing");
        card?.classList.remove("is-ig-source");
        setActive(null);
        restoreFocus();
      };
      closeDoneRef.current = done;
      setTimeout(done, CURTAIN);
      return;
    }

    const done = () => {
      cancelFlights();
      root.classList.remove("is-ig-open", "is-ig-closing");
      card?.classList.remove("is-ig-source");
      setActive(null);
      restoreFocus();
    };

    if (!card || !card.isConnected) {
      done();
      return;
    }

    cancelFlights();
    card.classList.remove("is-ig-source");
    const artFlight = invert(card.querySelector(".ig-frame"), artRef.current);
    const flights = lineFlights(card);
    card.classList.add("is-ig-source");
    root.classList.add("is-ig-closing");

    const lead = play(artRef.current, artFlight, true);
    play(cityRef.current, flights[0], true);
    play(nameRef.current, flights[1], true);
    closeDoneRef.current = done;
    if (lead) lead.finished.then(done, done);
    else done();
    setTimeout(done, FLIGHT + 150);
  }, []);

  const handleClick = (event) => {
    const card = event.target.closest ? event.target.closest("[data-ig-open]") : null;
    if (card) {
      open(card);
      return;
    }
    // only the empty area, the X or Escape dismisses — never the picture
    if (event.target === fullRef.current || event.target.closest("[data-ig-close]")) close();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " " || event.key === "Escape") {
      viaKeyboardRef.current = true;
    }
    if (event.key === "Escape") {
      setMenuOpen(false);
      close();
    }
  };

  return (
    <section
      ref={rootRef}
      className="ig-section border-t border-white/10"
      data-ig-reveal={REVEAL}
      aria-label="Sectors we finance"
      onPointerDown={() => {
        viaKeyboardRef.current = false;
      }}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
    >
      <div className="ig-shell">
        <div className="ig-stage" ref={stageRef}>
          <nav className={`ig-bar${menuOpen ? " is-ig-menu" : ""}`} aria-label="Sector gallery">
            <span className="ig-globe-wrap" aria-hidden="true">
              <Globe className="ig-globe-icon" strokeWidth={0.9} />
            </span>

            <div className="ig-links">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="ig-bar-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <button
              className="ig-burger"
              type="button"
              aria-expanded={menuOpen}
              aria-label="Menu"
              onClick={(event) => {
                event.stopPropagation();
                setMenuOpen((value) => !value);
              }}
            >
              <span />
              <span />
            </button>
          </nav>

          <div
            className="ig-rows"
            onPointerMove={handlePointerMove}
            onPointerLeave={dropTilt}
          >
            <Row tiles={ROW_A} />
            <Row tiles={ROW_B} back />
          </div>

          <p className="ig-caption">Sectors we finance</p>
        </div>
      </div>

      {/* full view — a SIBLING of the blurred stage, inside the section */}
      <div className="ig-full" ref={fullRef} role="dialog" aria-modal="true" aria-label="Sector image">
        <button
          type="button"
          className="ig-full-close"
          data-ig-close
          aria-label="Close image"
          ref={closeRef}
          onClick={close}
        >
          <X />
        </button>

        {active && (
          <Image
            src={active.src}
            alt={active.alt}
            className="ig-full-art"
            fittingType="fill"
            style={{ "--ig-ar": `${active.w} / ${active.h}` }}
          />
        )}

        <figcaption className="ig-full-cap">
          <span className="ig-full-city" ref={cityRef}>
            {active?.tag}
          </span>
          <span className="ig-full-name" ref={nameRef}>
            {active?.name}
          </span>
        </figcaption>
      </div>
    </section>
  );
}