import React from "react";
import { AbsoluteFill, Easing, interpolate } from "remotion";
import { C, F } from "../deck/theme";
import { POP, SlideDef, useSteps } from "../deck/steps";
import { Code } from "../deck/Code";
import { At, Chip } from "../deck/ui";

/* Final slide: a fractal tree grows by recursion, one level per step; the base case lights the leaves. */

const MAX_DEPTH = 9;
const LEVEL_START = 14;
const LEVEL_STEP = 17;
const LEVEL_DUR = 17;
const LEAVES_AT = LEVEL_START + MAX_DEPTH * LEVEL_STEP + LEVEL_DUR;
const ROOT = { x: 1260, y: 1010 };
const TRUNK = 235;
const SPREAD = 0.43;

const COLORS = ["#453a62", "#5e5086", "#6f5fa5", "#8d76dc", "#a994ff", "#b25fa8", "#c26cae", "#f38bbf", "#f59e72", "#86e0a8"];
const LEAF_COLORS = [C.mint, C.pink, C.amber, C.lav];

const rnd = (n: number) => {
  const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = Easing.out(Easing.cubic);

type Seg = { x1: number; y1: number; x2: number; y2: number; d: number };
type Tip = { x: number; y: number; id: number };

const grow = (f: number, sway: number) => {
  const segs: Seg[] = [];
  const tips: Tip[] = [];
  const walk = (x: number, y: number, ang: number, len: number, d: number, id: number) => {
    const start = LEVEL_START + d * LEVEL_STEP;
    const p = ease(clamp01((f - start) / LEVEL_DUR));
    if (p <= 0) return;
    const a = ang + sway * Math.sin(f * 0.045 + d * 0.6 + (id % 7)) * ((d + 1) / MAX_DEPTH);
    const x2 = x + Math.sin(a) * len;
    const y2 = y - Math.cos(a) * len;
    segs.push({ x1: x, y1: y, x2: x + (x2 - x) * p, y2: y + (y2 - y) * p, d });
    if (d === MAX_DEPTH) {
      tips.push({ x: x2, y: y2, id });
      return;
    }
    if (p < 1) return;
    const jl = rnd(id * 3 + 1);
    const jr = rnd(id * 3 + 2);
    walk(x2, y2, a - SPREAD * (0.8 + 0.4 * jl), len * (0.72 + 0.08 * jl), d + 1, id * 2);
    walk(x2, y2, a + SPREAD * (0.8 + 0.4 * jr), len * (0.72 + 0.08 * jr), d + 1, id * 2 + 1);
  };
  walk(ROOT.x, ROOT.y, 0, TRUNK, 0, 1);
  return { segs, tips };
};

const STARS = Array.from({ length: 70 }, (_, i) => ({
  x: rnd(i * 5 + 1) * 1920,
  y: rnd(i * 7 + 2) * 1080,
  r: 1 + rnd(i * 11 + 3) * 2,
  v: 0.2 + rnd(i * 13 + 4) * 0.5,
  ph: rnd(i * 17 + 5) * 6.28,
}));

const Outro: React.FC = () => {
  const { s, frame: f } = useSteps();
  const swayRamp = interpolate(f, [LEAVES_AT - 20, LEAVES_AT + 50], [0, 0.022], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const { segs, tips } = grow(f, swayRamp);
  const depth = Math.min(MAX_DEPTH, Math.max(0, Math.floor((f - LEVEL_START) / LEVEL_STEP) + 1));
  const done = f >= LEAVES_AT;
  const glow = interpolate(f, [LEAVES_AT, LEAVES_AT + 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const credit = s(0, LEAVES_AT + 30);
  const sweep = interpolate(f, [LEAVES_AT + 40, LEAVES_AT + 90], [-30, 130], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const letters = (str: string, base: number) =>
    str.split("").map((ch, i) => {
      const p = s(0, base + i * 2, POP);
      return (
        <span key={i} style={{ display: "inline-block", whiteSpace: "pre", opacity: Math.min(1, p), transform: `translateY(${(1 - p) * 50}px)` }}>
          {ch}
        </span>
      );
    });

  return (
    <AbsoluteFill style={{ background: C.bg, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 66% 62%, rgba(141,118,220,${0.18 + 0.12 * glow}) 0%, ${C.bg} 62%)`,
        }}
      />
      <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0 }}>
        {STARS.map((st, i) => (
          <circle
            key={i}
            cx={st.x}
            cy={(st.y - f * st.v + 1080 * 4) % 1080}
            r={st.r}
            fill="#c4b5fd"
            opacity={0.25 + 0.25 * Math.sin(f * 0.08 + st.ph)}
          />
        ))}
        <g strokeLinecap="round">
          {segs.map((g, i) => (
            <line
              key={i}
              x1={g.x1}
              y1={g.y1}
              x2={g.x2}
              y2={g.y2}
              stroke={COLORS[g.d]}
              strokeWidth={Math.max(2.5, 16 * Math.pow(0.77, g.d))}
            />
          ))}
        </g>
        <g style={{ filter: `drop-shadow(0 0 ${10 * glow}px rgba(134,224,168,0.8))` }}>
          {done &&
            tips.map((t) => {
              const t0 = LEAVES_AT + rnd(t.id) * 36;
              const q = ease(clamp01((f - t0) / 14));
              const r = 8.5 * q * (1 + 0.28 * Math.sin(f * 0.14 + t.id));
              return <circle key={t.id} cx={t.x} cy={t.y} r={r} fill={LEAF_COLORS[t.id % LEAF_COLORS.length]} />;
            })}
        </g>
      </svg>

      <div style={{ position: "absolute", left: 90, top: 150, fontFamily: F.head, fontWeight: 800, fontSize: 104, lineHeight: 1.12, color: C.text }}>
        <div>{letters("Дякую", 6)}</div>
        <div>{letters("за увагу!", 18)}</div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 96,
          top: 430,
          height: 6,
          width: 440 * s(0, 36),
          borderRadius: 3,
          background: `linear-gradient(90deg, ${C.accent}, ${C.pink})`,
        }}
      />
      <Code
        x={96}
        y={500}
        size={36}
        step={0}
        delay={30}
        stagger={8}
        code={`
          grow 0 = [[0@${LEAVES_AT}~60|leaf]]
          grow n = fork t t
            where t = [[0@${LEVEL_START}~${MAX_DEPTH * LEVEL_STEP}|grow (n - 1)]]
        `}
      />
      <At x={96} y={720} step={0} delay={44} dir="left" pop>
        <Chip size={34} color={done ? C.mint : C.amber} border={done ? C.mint : C.amber}>
          {done ? "n = 0: базовий випадок" : `глибина = ${depth}`}
        </Chip>
      </At>

      <div style={{ position: "absolute", left: 96, top: 900, opacity: credit, transform: `translateY(${(1 - credit) * 16}px)` }}>
        <span
          style={{
            fontFamily: F.mono,
            fontWeight: 600,
            fontSize: 34,
            letterSpacing: 2,
            backgroundImage: `linear-gradient(100deg, ${C.dim} 0%, ${C.dim} ${sweep - 12}%, #ffffff ${sweep}%, ${C.dim} ${sweep + 12}%, ${C.dim} 100%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          made with Claude Opus 5.5
        </span>
      </div>
    </AbsoluteFill>
  );
};

export const outroSlide: SlideDef = { id: "thanks", title: "Дякую за увагу", steps: [LEAVES_AT + 140], C: Outro };
