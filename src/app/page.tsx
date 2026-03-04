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
          <div className="brand">{site.projectName}</div>
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
            <span className="badge">
              {site.district}, {site.city}
            </span>
          </div>

          <div className="btnRow">
            <a className="btnPrimary" href="#byty">
              Zobrazit byty
            </a>
            <a className="btnSecondary" href="#kontakt">
              Domluvit prohlídku
            </a>
          </div>

          {/* Nice framed hero image */}
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
          <h2 className="h2">Proč právě tady</h2>
          <div className="grid3">
            {site.benefits.map((b) => (
              <div className="card" key={b}>
                <div className="cardTitle">{b}</div>
                <div className="cardText">Poctivé bydlení bez zbytečných kompromisů.</div>
              </div>
            ))}
          </div>
        </section>

        {/* UNITS */}
        <section id="byty" className="section">
          <h2 className="h2">Seznam bytů</h2>

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
                    <td>
                      <StatusPill status={u.status} />
                    </td>
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
          <h2 className="h2">Okolí</h2>

          <div className="card">
            <div className="cardTitle">
              {site.addressLine}, {site.city}
            </div>

            <div style={{ marginTop: 12 }} className="grid3">
              {site.distances.map((d) => (
                <div key={d.label} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <span style={{ color: "var(--muted)" }}>{d.label}</span>
                  <span style={{ fontWeight: 760 }}>{d.value}</span>
                </div>
              ))}
            </div>

            <div className="btnRow">
              <a className="btnSecondary" href={site.map.shareUrl} target="_blank" rel="noreferrer">
                Otevřít v Mapách
              </a>
            </div>

            {/* Optional image: will auto-hide if missing */}
            <div className="heroCard" style={{ marginTop: 14 }}>
              <img
                className="heroImg"
                src="/assets/story.jpg"
                alt="Okolí a atmosféra"
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
              />
            </div>
          </div>
        </section>

        {/* STANDARDS */}
        <section id="standardy" className="section">
          <h2 className="h2">Standardy</h2>
          <div className="card">
            <div className="cardText" style={{ marginTop: 0 }}>
              Detailní standardní provedení ke stažení v PDF.
            </div>
            <div className="btnRow">
              <a className="btnPrimary" href={`/assets/${site.standardsPdfFileName}`}>
                Stáhnout standardy (PDF)
              </a>
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section id="harmonogram" className="section">
          <h2 className="h2">Harmonogram</h2>
          <div className="grid3">
            {site.timeline.map((t) => (
              <div className="card" key={t.label}>
                <div className="cardTitle">{t.label}</div>
                <div style={{ marginTop: 10, fontSize: 18 }}>{t.date}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="kontakt" className="section">
          <h2 className="h2">Kontakt</h2>
          <div className="card">
            <div style={{ fontWeight: 820 }}>{site.contact.name}</div>
            <div style={{ marginTop: 10 }}>
              <a href={`tel:${stripSpaces(site.contact.phone)}`}>{site.contact.phone}</a>
            </div>
            <div style={{ marginTop: 6 }}>
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </div>

            <div className="btnRow">
              <a
                className="btnPrimary"
                href={`mailto:${site.contact.email}?subject=${encodeURIComponent(site.projectName)}%20-%20dotaz`}
              >
                Napsat email
              </a>
              <a className="btnSecondary" href={`tel:${stripSpaces(site.contact.phone)}`}>
                Zavolat
              </a>
            </div>
          </div>

          <div className="footer">
            <div>© {new Date().getFullYear()} {site.projectName}</div>
            <div>Vizualizace je ilustrativní. Plochy jsou orientační.</div>
          </div>
        </section>
      </main>

      {/* MODAL */}
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

          <button className="modalClose" onClick={onClose}>
            Zavřít
          </button>
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

function formatCzk(n: number) {
  return new Intl.NumberFormat("cs-CZ").format(n);
}

function stripSpaces(s: string) {
  return s.replace(/\s+/g, "");
}

function formatArea(n: number) {
  if (!n || Number.isNaN(n)) return "—";
  // show 2 decimals only if needed
  const rounded = Math.round(n * 100) / 100;
  const asInt = Number.isInteger(rounded);
  return asInt ? String(rounded) : rounded.toFixed(2);
}
