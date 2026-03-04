"use client";

import React, { useMemo, useState } from "react";
import site from "../../content/mvp.json";
import units from "../../content/units.json";

type Unit = (typeof units)[number];

export default function OnePager() {
  const [openUnitId, setOpenUnitId] = useState<string | null>(null);

  const openUnit = useMemo(() => {
    if (!openUnitId) return null;
    return units.find((u) => u.id === openUnitId) ?? null;
  }, [openUnitId]);

  return (
    <>
      {/* NAV */}
      <header className="nav">
        <div className="navInner">
          <div className="brand">
            <img
              className="brandMark"
              src="/assets/logo.png"
              alt={site.projectName}
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
            />
          </div>

          <nav className="navLinks">
            <a href="#byty">Seznam bytů</a>
            <a href="#okoli">Okolí</a>
            <a href="#standardy">Standardy</a>
            <a href="#harmonogram">Harmonogram</a>
            <a href="#kontakt">Kontakt</a>
          </nav>
        </div>
      </header>

      <main className="container">
        {/* HERO */}
        <section id="top" className="hero">
          <h1 className="h1">{site.heroH1}</h1>
          <p className="lead">{site.heroSubhead}</p>

          <div className="badges">
            <span className="badge">Od {site.priceFrom}</span>
            <span className="badge">Předání {site.handoverDate}</span>
            <span className="badge">{site.district}, {site.city}</span>
          </div>

          <div className="btnRow heroActions">
            <a className="btnPrimary" href="#byty">Zobrazit byty</a>
            <a className="btnSecondary" href="#kontakt">Domluvit prohlídku</a>
          </div>

          <div className="heroCard">
            <img
              className="heroImg"
              src="/assets/hero.jpg"
              alt={`${site.projectName} hero`}
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
            />
          </div>
        </section>

        {/* BENEFITS */}
        <section id="vyhody" className="section">
          <div className="sectionHeader center">
            <div className="sectionKicker">Benefity</div>
            <h2 className="h2">Proč právě tady</h2>
            <div className="sectionDesc">
              Krátký seznam věcí, které mají v každodenním životě největší hodnotu. Jasně, jednoduše, bez marketingové vaty.
            </div>
          </div>

          <div className="grid3">
            <div className="card iconCard">
              <div className="iconDot">{icons.parking}</div>
              <div>
                <div className="cardTitle">{site.benefits[0] ?? "Parkovací stání"}</div>
                <div className="cardText">Vyhrazené stání. Žádné večerní kroužení kolem bloku.</div>
              </div>
            </div>

            <div className="card iconCard">
              <div className="iconDot">{icons.leaf}</div>
              <div>
                <div className="cardTitle">{site.benefits[1] ?? "Klidná část města"}</div>
                <div className="cardText">Vedlejší ulice, ale skvělá dostupnost. Ticho, které si všimnete.</div>
              </div>
            </div>

            <div className="card iconCard">
              <div className="iconDot">{icons.wrench}</div>
              <div>
                <div className="cardTitle">{site.benefits[2] ?? "Klientské změny možné"}</div>
                <div className="cardText">Dolaďte standardy včas. Dohoda jasně, termíny pevně.</div>
              </div>
            </div>
          </div>
        </section>

        {/* UNITS */}
        <section id="byty" className="section">
          <div className="sectionHeader">
            <div className="sectionKicker">Dostupnost</div>
            <h2 className="h2">Seznam bytů</h2>
            <div className="sectionDesc">
              Klikněte na “Detail” pro rychlý přehled a stažení PDF.
            </div>
          </div>

          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  <th>Byt</th>
                  <th>Podlaží</th>
                  <th>Dispozice</th>
                  <th>Plocha (m²)</th>
                  <th>Balkon (m²)</th>
                  <th>Orientace</th>
                  <th>Cena</th>
                  <th>Stav</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {units.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.floor}</td>
                    <td>{u.layout}</td>
                    <td>{formatArea(u.areaTotal)}</td>
                    <td>{formatArea(u.balconyArea)}</td>
                    <td>{u.orientation}</td>
                    <td>{u.price ? `${formatCzk(u.price)} Kč` : "—"}</td>
                    <td><StatusPill status={u.status} /></td>
                    <td>
                      <button className="modalClose" onClick={() => setOpenUnitId(u.id)}>
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ marginTop: 14, color: "var(--muted)" }}>
            Plochy jsou orientační. Ceny a dostupnost se mohou změnit.
          </p>
        </section>

        {/* LOCATION */}
        <section id="okoli" className="section">
          <div className="sectionHeader">
            <div className="sectionKicker">Lokalita</div>
            <h2 className="h2">Okolí</h2>
            <div className="sectionDesc">
              Suché Vrbné je praktické. Všechno, co řešíte každý den, je v dosahu. Adresa projektu: <strong>{site.addressLine}</strong>.
            </div>
          </div>

          <div className="card">
            <div className="locationGrid">
              {site.distances.map((d) => (
                <div key={d.label} className="locationItem">
                  <div className="locationLabel">{d.label}</div>
                  <div className="locationValue">{d.value}</div>
                </div>
              ))}
            </div>

            <div className="mapActions">
              <a className="btnSecondary" href={site.map.shareUrl} target="_blank" rel="noreferrer">
                {icons.map} Otevřít v Mapách
              </a>
            </div>

            <div className="heroCard" style={{ marginTop: 0 }}>
              <img
                className="heroImg"
                src="/assets/story.jpg"
                alt="Okolí a atmosféra"
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
              />
            </div>
          </div>
        </section>

        {/* STANDARDY + HARMONOGRAM + KONTAKT (more “designed”) */}
        <section id="standardy" className="section">
          <div className="sectionHeader center">
            <div className="sectionKicker">Dokumenty & plán</div>
            <h2 className="h2">Standardy, harmonogram a kontakt</h2>
            <div className="sectionDesc">
              Vše důležité na jednom místě. PDF standardy, termíny a přímý kontakt bez formulářového pekla.
            </div>
          </div>

          <div className="cardsRow">
            {/* Standards */}
            <div className="card center">
              <div className="iconDot" style={{ margin: "0 auto 12px auto" }}>{icons.doc}</div>
              <div className="cardTitle">Standardy</div>
              <div className="cardText">Detailní standardní provedení ke stažení v PDF.</div>
              <div className="btnRow">
                <a className="btnPrimary" href={`/assets/${site.standardsPdfFileName}`}>
                  Stáhnout standardy (PDF)
                </a>
              </div>
            </div>

            {/* Timeline */}
            <div className="card center" id="harmonogram">
              <div className="iconDot" style={{ margin: "0 auto 12px auto" }}>{icons.clock}</div>
              <div className="cardTitle">Harmonogram</div>
              <div className="cardText">
                {site.timeline.map((t) => `${t.label}: ${t.date}`).join(" · ")}
              </div>
              <div className="btnRow">
                <a className="btnSecondary" href="#byty">{icons.list} Zobrazit byty</a>
              </div>
            </div>

            {/* Contact */}
            <div className="card center" id="kontakt">
              <div className="iconDot" style={{ margin: "0 auto 12px auto" }}>{icons.chat}</div>
              <div className="cardTitle">{site.contact.name}</div>
              <div className="cardText">
                <div><a href={`tel:${stripSpaces(site.contact.phone)}`}>{site.contact.phone}</a></div>
                <div><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></div>
              </div>
              <div className="btnRow">
                <a className="btnPrimary" href={`mailto:${site.contact.email}?subject=${encodeURIComponent(site.projectName)}%20-%20dotaz`}>
                  Napsat email
                </a>
                <a className="btnSecondary" href={`tel:${stripSpaces(site.contact.phone)}`}>
                  Zavolat
                </a>
              </div>
            </div>
          </div>

          <div className="footer">
            <div>© {new Date().getFullYear()} {site.projectName}</div>
            <div>Vizualizace je ilustrativní. Plochy jsou orientační.</div>
          </div>
        </section>
      </main>

      {openUnit ? <UnitModal unit={openUnit} onClose={() => setOpenUnitId(null)} /> : null}
    </>
  );
}

function StatusPill({ status }: { status: string }) {
  const cls =
    status === "Volné" ? "pill pillFree" :
    status === "Rezervováno" ? "pill pillRes" :
    "pill pillSold";
  return <span className={cls}>{status}</span>;
}

function UnitModal({ unit, onClose }: { unit: Unit; onClose: () => void }) {
  return (
    <div className="backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modalTop">
          <div>
            <h3 className="modalTitle">Byt {unit.id} ({unit.layout})</h3>
            <div style={{ marginTop: 6, color: "var(--muted)" }}>
              Podlaží {unit.floor} · Orientace {unit.orientation} · <StatusPill status={unit.status} />
            </div>

            <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <span className="badge">Plocha: {formatArea(unit.areaTotal)} m²</span>
              <span className="badge">Balkon: {formatArea(unit.balconyArea)} m²</span>
              <span className="badge">Cena: {unit.price ? `${formatCzk(unit.price)} Kč` : "—"}</span>
            </div>
          </div>

          <button className="modalClose" onClick={onClose}>Zavřít</button>
        </div>

        <div style={{ marginTop: 16 }} className="card">
          <div className="cardTitle">Popis</div>
          <div className="cardText">
            {unit.shortDesc?.trim() ? unit.shortDesc : "Doplňte krátký popis bytu (3–5 vět)."}
          </div>
        </div>

        <div className="btnRow" style={{ marginTop: 14 }}>
          <a className="btnPrimary" href="#kontakt" onClick={onClose}>
            Domluvit prohlídku
          </a>
          <a className="btnSecondary" href={`/assets/${unit.pdfFile}`} target="_blank" rel="noreferrer">
            Stáhnout PDF
          </a>
        </div>
      </div>
    </div>
  );
}

/* Helpers */
function formatCzk(n: number) {
  return new Intl.NumberFormat("cs-CZ").format(n);
}
function stripSpaces(s: string) {
  return s.replace(/\s+/g, "");
}
function formatArea(n: number) {
  if (!n || Number.isNaN(n)) return "—";
  const rounded = Math.round(n * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2);
}

/* Inline icons (no libs) */
const icons = {
  parking: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 4h7a5 5 0 0 1 0 10H7V4Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 14v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 4c-9 1-14 6-15 15 9-1 14-6 15-15Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 17c3-5 7-7 12-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  wrench: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14.5 6.5a4.5 4.5 0 0 0-5.9 5.9L4 17.1 6.9 20l4.7-4.6a4.5 4.5 0 0 0 5.9-5.9L14 10l-1.6-1.6 2.1-1.9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  map: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10 18 4 20V6l6-2 4 2 6-2v14l-6 2-4-2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M10 4v14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M14 6v14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3h7l3 3v15H7V3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M14 3v3h3" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 12h6M9 16h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7v6l4 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 15a4 4 0 0 1-4 4H9l-5 3V7a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8 9h8M8 13h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  list: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 7h12M8 12h12M8 17h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 7h.01M4 12h.01M4 17h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
};
