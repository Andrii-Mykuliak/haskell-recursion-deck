import React from "react";
import { C, F } from "../deck/theme";
import { POP, SlideDef, useSteps } from "../deck/steps";
import { Code } from "../deck/Code";
import { A, Arrow, At, Chip, Lead, M, Slide } from "../deck/ui";

const ConsCell: React.FC<{ x: number; y: number; value: string; step: number; delay: number }> = ({ x, y, value, step, delay }) => {
  const { s } = useSteps();
  const p = s(step, delay, POP);
  const box = (left: number, w: number, label: string, color: string) => (
    <div
      style={{
        position: "absolute",
        left,
        top: y,
        width: w,
        height: 84,
        border: `3px solid ${color}`,
        background: C.panel,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: F.mono,
        fontWeight: 700,
        fontSize: 40,
      }}
    >
      {label}
    </div>
  );
  return (
    <div style={{ opacity: Math.min(1, p), transform: `scale(${p})`, transformOrigin: `${x + 85}px ${y + 42}px` }}>
      {box(x, 110, value, C.lav)}
      {box(x + 110, 70, "•", C.accent)}
    </div>
  );
};

/* 6 · Список як рекурсивна структура */
const S06: React.FC = () => {
  const vals = ["3", "5", "8"];
  const X0 = 560;
  const GAP = 300;
  const Y = 470;
  return (
    <Slide title="Список як рекурсивна структура">
      <Lead>
        Список у Haskell або порожній, або складається з голови та хвоста. Хвіст знову є списком, тому структура природно рекурсивна.
      </Lead>
      <At x={96} y={350} step={1} dir="left" pop>
        <Chip size={40}>[]</Chip>
      </At>
      <At x={96} y={440} step={1} delay={10} dir="left" pop>
        <Chip size={40}>x : xs</Chip>
      </At>
      <At x={96} y={540} w={400} step={2} size={32} weight={400} color={C.dim}>
        <M c={C.amber}>x</M> — голова, <M c={C.amber}>xs</M> — хвіст
      </At>
      <At x={X0} y={372} step={2} size={40} font={F.mono} color={C.text} style={{ fontVariantLigatures: "none" }}>
        {"[3,5,8] = "}
        <A c={C.lav}>3 : (5 : (8 : []))</A>
      </At>
      {vals.map((v, i) => (
        <React.Fragment key={v}>
          <ConsCell x={X0 + i * GAP} y={Y} value={v} step={2} delay={10 + i * 14} />
          <Arrow x1={X0 + i * GAP + 145} y1={Y + 42} x2={X0 + (i + 1) * GAP - 10} y2={Y + 42} step={2} delay={22 + i * 14} dur={12} color={C.accent} />
        </React.Fragment>
      ))}
      <At x={X0 + 3 * GAP} y={Y + 2} step={2} delay={50} dir="left" pop>
        <Chip size={40} color={C.amber} border={C.amber}>
          []
        </Chip>
      </At>
      <Code
        x={96}
        y={690}
        size={46}
        step={3}
        code={`
          sumList [] = 0
          sumList (x:xs) = x + sumList xs
        `}
      />
      <At x={96} y={880} w={1720} step={4} size={38}>
        Функція над списком повторює форму списку: окремий випадок для <M>[]</M> і окремий — для <M>x:xs</M>.
      </At>
    </Slide>
  );
};

/* 7 · Рекурсивні функції над списками */
const S07: React.FC = () => (
  <Slide title="Рекурсивні функції над списками">
    <Lead>
      Різні функції над списками мають подібний каркас: обробити порожній список або розділити непорожній список на голову й хвіст.
    </Lead>
    <Code
      x={96}
      y={340}
      size={44}
      step={1}
      code={`
        lengthList :: [a] -> Int
        [[2|lengthList []]] = 0
        lengthList [[2|(_:xs)]] = 1 + lengthList xs
      `}
    />
    <Code
      x={96}
      y={580}
      size={44}
      step={2}
      code={`
        positiveOnly [] = []
        positiveOnly (x:xs)
          | x > 0     = x : positiveOnly xs
          | otherwise = positiveOnly xs
      `}
    />
    <At x={1230} y={340} step={3} dir="left" pop>
      <Chip size={32} color={C.amber} border={C.amber}>
        спільний каркас
      </Chip>
    </At>
    <Code
      x={1230}
      y={430}
      size={40}
      step={3}
      delay={10}
      code={`
        f [] = ...
        f (x:xs) = ... f xs
      `}
    />
    <At x={96} y={900} w={1720} step={4} size={38}>
      Повторюваність таких схем у наступній лекції стане мотивацією для <A>map</A>, <A>filter</A> і <A>fold</A>.
    </At>
  </Slide>
);

/* 8 · Рекурсія може будувати структуру */
const S08: React.FC = () => (
  <Slide title="Рекурсія може будувати структуру">
    <Lead>
      Рекурсивна функція може не лише споживати список, а й створювати його по одному конструктору на кожному кроці.
    </Lead>
    <Code
      x={96}
      y={340}
      size={46}
      step={1}
      code={`
        countDown :: Int -> [Int]
        countDown 0 = []
        countDown n = n : countDown (n - 1)
      `}
    />
    <Code
      x={96}
      y={590}
      size={40}
      step={2}
      stagger={8}
      code={`
        countDown 4
        = 4 : countDown 3
        = 4 : 3 : countDown 2
        = 4 : 3 : 2 : countDown 1
        = [[2@50|4 : 3 : 2 : 1 : []]]
      `}
    />
    <At x={96} y={920} w={1720} step={3} size={36}>
      Кожний рекурсивний крок додає один елемент, а решта результату будується рекурсивно.
    </At>
  </Slide>
);

export const r3Slides: SlideDef[] = [
  { id: "list-structure", title: "Список як структура", steps: [40, 45, 90, 55, 55], C: S06 },
  { id: "list-functions", title: "Функції над списками", steps: [40, 50, 55, 55, 55], C: S07 },
  { id: "build", title: "Побудова структури", steps: [40, 55, 70, 55], C: S08 },
];
