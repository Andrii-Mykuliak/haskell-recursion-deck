import React from "react";
import { interpolate } from "remotion";
import { C, F } from "../deck/theme";
import { mix, POP, SlideDef, useSteps } from "../deck/steps";
import { At, HaskellLogo, Slide } from "../deck/ui";

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
    </Slide>
  );
};

const QuoteSlide: React.FC = () => {
  const { s } = useSteps();
  const words = (str: string, base: number, color?: string) =>
    str.split(" ").map((w, i) => {
      const p = s(0, base + i * 7, POP);
      return (
        <span key={i} style={{ display: "inline-block", whiteSpace: "pre", opacity: Math.min(1, p), transform: `translateY(${(1 - p) * 40}px)`, color }}>
          {w + " "}
        </span>
      );
    });
  return (
    <Slide>
      <div style={{ position: "absolute", left: 96, top: 90, fontFamily: F.head, fontWeight: 800, fontSize: 380, lineHeight: 1, color: C.accent, opacity: 0.35 * s(0, 0) }}>
        “
      </div>
      <div style={{ position: "absolute", left: 190, top: 330, fontFamily: F.head, fontWeight: 800, fontSize: 100, lineHeight: 1.2, color: C.text }}>
        <div>{words("To iterate is human,", 10)}</div>
        <div>{words("to recurse, divine.", 40, C.accentHi)}</div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 196,
          top: 610,
          height: 6,
          width: mix(0, 420, s(1, 0)),
          background: `linear-gradient(90deg, ${C.accent}, ${C.pink})`,
          borderRadius: 3,
        }}
      />
      <At x={190} y={650} w={1500} step={1} delay={6} size={56} weight={600} color={C.text}>
        Ітерація - від людини, рекурсія - від Бога
      </At>
      <At x={190} y={780} step={1} delay={24} size={38} weight={400} color={C.dim} font={F.mono}>
        L. Peter Deutsch
      </At>
      <At x={190} y={850} w={1500} step={1} delay={40} size={34} weight={400} color={C.dim}>
        Цитату наведено в книзі Дональда Кнута «Мистецтво програмування»
      </At>
    </Slide>
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
  { id: "title", title: "Титул", steps: [90], C: TitleSlide },
  { id: "quote", title: "Епіграф", steps: [100, 60], C: QuoteSlide },
  { id: "agenda", title: "План", steps: [60], C: () => <Agenda /> },
];

export const agendaSlide = (active: number): SlideDef => ({
  id: `agenda-${active + 1}`,
  title: `План · ${active + 1}`,
  steps: [40],
  C: () => <Agenda active={active} />,
});
