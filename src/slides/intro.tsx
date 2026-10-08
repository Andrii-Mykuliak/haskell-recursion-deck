import React, { createContext, useContext, useEffect, useState } from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { C, F } from "../deck/theme";
import { mix, POP, SlideDef, useSteps } from "../deck/steps";
import { At, HaskellLogo, Slide } from "../deck/ui";
import { AuthorBlock } from "../deck/Author";

const TitleSlide: React.FC = () => {
  const { s, t } = useSteps();
  const line1 = "Рекурсія та";
  const line2 = "структурна індукція";
  const letters = (str: string, base: number) =>
    str.split("").map((ch, i) => {
      const p = s(0, base + i * 1.6);
      return (
        <span key={i} style={{ display: "inline-block", opacity: p, transform: `translateY(${(1 - p) * 60}px)`, whiteSpace: "pre" }}>
          {ch}
        </span>
      );
    });
  const glow = interpolate(t(0, 40), [0, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Slide>
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 14,
          width: 760,
          height: 540,
          background: "#141821",
          opacity: s(0, 0),
        }}
      />
      <div style={{ position: "absolute", right: 60, top: 70, filter: `drop-shadow(0 0 ${40 * glow}px rgba(143,78,139,0.35))` }}>
        <HaskellLogo size={680} p1={s(0, 4, POP)} p2={s(0, 12, POP)} p3={s(0, 22, POP)} />
      </div>
      <At x={116} y={350} step={0} delay={8} size={60} weight={800} color={C.pink}>
        Лекція 5
      </At>
      <div style={{ position: "absolute", left: 110, top: 440, fontFamily: F.head, fontWeight: 800, fontSize: 104, lineHeight: 1.12, color: C.text }}>
        <div>{letters(line1, 14)}</div>
        <div>{letters(line2, 34)}</div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 116,
          top: 720,
          height: 6,
          width: mix(0, 520, s(0, 50)),
          background: `linear-gradient(90deg, ${C.accent}, ${C.pink})`,
          borderRadius: 3,
        }}
      />
      <At x={116} y={760} step={0} delay={56} size={36} weight={400} color={C.dim} font={F.mono} style={{ fontVariantLigatures: "none" }}>
        {"factorial n = n * factorial (n - 1)"}
      </At>
      <AuthorBlock />
    </Slide>
  );
};

const WIN = { x: 970, y: 360, w: 850, h: 478 };
const RATIO = WIN.w / 1920;
const FIXED = { x: WIN.x / (1 - RATIO), y: WIN.y / (1 - RATIO) };
const DEPTH = 6;
const ZOOM_SECONDS = 3.7;

const TAPE_STEP = 0.3;
const CELL = 64;
const CELL_GAP = 12;
const PITCH = CELL + CELL_GAP;
const TAPE_X0 = 112;
const TAPE_STOP = 1500;

const IterationTape: React.FC<{ sec: number; p: number }> = ({ sec, p }) => {
  const pos = sec / TAPE_STEP;
  const idx = Math.floor(pos);
  const frac = pos - idx;
  const eased = frac < 0.5 ? 2 * frac * frac : 1 - Math.pow(-2 * frac + 2, 2) / 2;
  const headW = (idx + eased) * PITCH;
  const cam = Math.max(0, headW - (TAPE_STOP - TAPE_X0));
  const first = Math.max(0, Math.floor(cam / PITCH) - 1);
  const last = first + Math.ceil(1920 / PITCH) + 3;
  const Y0 = 150;
  const cells: React.ReactNode[] = [];
  for (let i = first; i <= last; i++) {
    const done = i < idx;
    cells.push(
      <div
        key={i}
        style={{
          position: "absolute",
          left: TAPE_X0 + i * PITCH - cam,
          top: 10,
          width: CELL,
          height: CELL,
          borderRadius: 14,
          border: `3px solid ${done ? C.mint : C.line}`,
          background: done ? "rgba(134,224,168,0.2)" : "transparent",
          color: done ? C.mint : C.faint,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: F.mono,
          fontWeight: 700,
          fontSize: 26,
        }}
      >
        {done ? "✓" : i + 1}
      </div>,
    );
  }
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: TAPE_X0,
          top: 92,
          fontFamily: F.mono,
          fontWeight: 600,
          fontSize: 32,
          color: C.dim,
          fontVariantLigatures: "none",
          opacity: Math.min(1, p),
        }}
      >
        {"for i in [1 .. ∞]  "}
        <span style={{ color: C.amber }}>{`i = ${idx + 1}`}</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: Y0 - 10,
          width: 1920,
          height: CELL + 20,
          opacity: Math.min(1, p),
          maskImage: "linear-gradient(90deg, transparent 0px, transparent 70px, black 230px, black 1740px, transparent 1920px)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0px, transparent 70px, black 230px, black 1740px, transparent 1920px)",
        }}
      >
        {cells}
        <div
          style={{
            position: "absolute",
            left: TAPE_X0 + headW - cam - 7,
            top: 3,
            width: CELL + 14,
            height: CELL + 14,
            borderRadius: 18,
            border: `4px solid ${C.amber}`,
            boxShadow: "0 0 22px rgba(242,193,125,0.6)",
          }}
        />
      </div>
    </>
  );
};

const ClockCtx = createContext(0);

const useClock = () => {
  const [sec, setSec] = useState(0);
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const tick = () => {
      setSec((performance.now() - t0) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return sec;
};

const QuoteFace: React.FC = () => {
  const { s } = useSteps();
  const sec = useContext(ClockCtx);
  const words = (str: string, base: number, color?: string) =>
    str.split(" ").map((w, i) => {
      const p = s(0, base + i * 7, POP);
      return (
        <span key={i} style={{ display: "inline-block", whiteSpace: "pre", opacity: Math.min(1, p), transform: `translateY(${(1 - p) * 40}px)`, color }}>
          {w + " "}
        </span>
      );
    });
  const ring = s(0, 0, POP);
  return (
    <Slide>
      <IterationTape sec={sec} p={ring} />
      <div style={{ position: "absolute", left: 110, top: 330, fontFamily: F.head, fontWeight: 800, fontSize: 84, lineHeight: 1.2, color: C.text }}>
        <div>{words("To iterate is human,", 8)}</div>
        <div>{words("to recurse, divine.", 40, C.accentHi)}</div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 116,
          top: 590,
          height: 6,
          width: mix(0, 420, s(1, 0)),
          background: `linear-gradient(90deg, ${C.accent}, ${C.pink})`,
          borderRadius: 3,
        }}
      />
      <At x={110} y={630} w={820} step={1} delay={6} size={50} weight={600} color={C.text}>
        Ітерація - від людини,
        <br />
        рекурсія - від Бога
      </At>
      <At x={110} y={778} step={1} delay={24} size={34} weight={400} color={C.dim} font={F.mono}>
        L. Peter Deutsch
      </At>
      <At x={110} y={836} w={820} step={1} delay={40} size={30} weight={400} color={C.dim}>
        Цитату наведено в книзі Дональда Кнута «Мистецтво програмування»
      </At>
      <div
        style={{
          position: "absolute",
          left: WIN.x,
          top: WIN.y,
          width: WIN.w,
          height: WIN.h,
          borderRadius: 18,
          border: `4px solid ${C.accent}`,
          boxSizing: "border-box",
          opacity: s(0, 40),
        }}
      />
    </Slide>
  );
};

const QuoteSlide: React.FC = () => {
  const { s } = useSteps();
  const sec = useClock();
  const phase = (sec / ZOOM_SECONDS) % 1;
  const appear = s(0, 40, POP);
  return (
    <ClockCtx.Provider value={sec}>
    <AbsoluteFill style={{ background: C.bg }}>
      <QuoteFace />
      <div
        style={{
          position: "absolute",
          left: WIN.x,
          top: WIN.y,
          width: WIN.w,
          height: WIN.h,
          borderRadius: 18,
          overflow: "hidden",
          opacity: Math.min(1, appear),
          boxShadow: `0 0 ${50 * appear}px rgba(141,118,220,0.45)`,
        }}
      >
        <div style={{ position: "absolute", left: -WIN.x, top: -WIN.y, width: 1920, height: 1080 }}>
          {Array.from({ length: DEPTH }, (_, i) => i + 1).map((k) => (
            <div
              key={k}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 1920,
                height: 1080,
                transformOrigin: `${FIXED.x}px ${FIXED.y}px`,
                transform: `scale(${Math.pow(RATIO, k - phase)})`,
              }}
            >
              <QuoteFace />
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: WIN.x,
          top: WIN.y,
          width: WIN.w,
          height: WIN.h,
          borderRadius: 18,
          border: `4px solid ${C.accentHi}`,
          boxSizing: "border-box",
          opacity: Math.min(1, appear),
        }}
      />
    </AbsoluteFill>
    </ClockCtx.Provider>
  );
};

const AGENDA = [
  "Рекурсія як спосіб опису обчислення",
  "Базовий і рекурсивний випадки",
  "Структурна рекурсія над списками",
  "Рекурсивні типи даних і дерева",
  "Форми рекурсії та акумулятори",
  "Завершуваність рекурсивних обчислень",
  "Структурна індукція і доведення властивостей",
];

const Agenda: React.FC<{ active?: number }> = ({ active }) => {
  const { s } = useSteps();
  const full = active === undefined;
  return (
    <Slide title="План">
      {!full && (
        <div
          style={{
            position: "absolute",
            left: 84,
            top: 205 + active! * 112 - 14,
            width: mix(0, 1740, s(0, 6)),
            height: 92,
            borderRadius: 14,
            background: "rgba(141,118,220,0.13)",
            border: `2px solid rgba(141,118,220,${0.5 * s(0, 6)})`,
          }}
        />
      )}
      {AGENDA.map((item, i) => {
        const p = full ? s(0, 8 + i * 5, POP) : 1;
        const on = full ? 1 : i === active ? s(0, 10) : 0;
        const dim = full ? 1 : i === active ? 1 : 0.35;
        const y = 205 + i * 112;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 104,
              top: y,
              display: "flex",
              alignItems: "center",
              gap: 36,
              opacity: p * dim,
              transform: `translateX(${(1 - p) * -40 + on * 24}px)`,
            }}
          >
            <div
              style={{
                width: 76,
                height: 64,
                borderRadius: 8,
                background: i % 2 ? "#5e5086" : C.pink,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: F.body,
                fontWeight: 800,
                fontSize: 40,
                color: C.text,
                boxShadow: on ? `0 0 ${30 * on}px rgba(178,95,168,${0.6 * on})` : undefined,
                transform: `scale(${1 + 0.12 * on})`,
              }}
            >
              {i + 1}
            </div>
            <div style={{ fontFamily: F.body, fontSize: 54, fontWeight: on ? 700 : 400, color: C.text }}>{item}</div>
          </div>
        );
      })}
    </Slide>
  );
};

export const introSlides: SlideDef[] = [
  { id: "title", title: "Титул", steps: [110], C: TitleSlide },
  { id: "quote", title: "Епіграф", steps: [220, 150], C: QuoteSlide },
  { id: "agenda", title: "План", steps: [60], C: () => <Agenda /> },
];

export const agendaSlide = (active: number): SlideDef => ({
  id: `agenda-${active + 1}`,
  title: `План · ${active + 1}`,
  steps: [40],
  C: () => <Agenda active={active} />,
});
