import React from "react";
import { C } from "../deck/theme";
import { F } from "../deck/theme";
import { POP, SlideDef, useSteps } from "../deck/steps";
import { Code } from "../deck/Code";
import { A, Arrow, At, Chip, Lead, M, Slide, HaskellLogo } from "../deck/ui";

/* 18 · Структурна індукція */
const RULES: { y: number; step: number; chip: string; text: React.ReactNode; base: boolean }[] = [
  { y: 350, step: 1, chip: "[]", base: true, text: <>база: довести властивість для <M>[]</M></> },
  { y: 460, step: 1, chip: "x : xs", base: false, text: <>крок: припустити для <M>xs</M>, довести для <M>x:xs</M></> },
  { y: 620, step: 2, chip: "EmptyTree", base: true, text: <>база: довести властивість для порожнього дерева</> },
  { y: 730, step: 2, chip: "Node a l r", base: false, text: <>крок: припустити для <M>l</M> і <M>r</M>, довести для вузла</> },
];

const S18: React.FC = () => (
  <Slide title="Структурна індукція">
    <Lead>
      Структурна індукція доводить властивість за будовою рекурсивного типу: твердження перевіряється для кожного конструктора.
    </Lead>
    {RULES.map((r, i) => {
      const col = r.base ? C.amber : C.lav;
      return (
        <React.Fragment key={i}>
          <At x={96} y={r.y} step={r.step} delay={r.base ? 0 : 14} dir="left" pop>
            <Chip size={36} color={col} border={col} style={{ minWidth: 330 }}>
              {r.chip}
            </Chip>
          </At>
          <Arrow x1={470} y1={r.y + 32} x2={560} y2={r.y + 32} step={r.step} delay={(r.base ? 0 : 14) + 8} dur={12} color={C.dim} />
          <At x={580} y={r.y + 4} w={1250} step={r.step} delay={(r.base ? 0 : 14) + 12} size={36} weight={600}>
            {r.text}
          </At>
        </React.Fragment>
      );
    })}
    <At x={96} y={880} w={1720} step={3} size={38}>
      Структура доведення повторює структуру <A>типу</A> і структуру <A>рекурсивної функції</A>.
    </At>
  </Slide>
);

/* 19 · Приклад: довжина додавання списків */
const S19: React.FC = () => (
  <Slide title="Індукція: приклад зі списками">
    <Lead step={0}>
      Доведемо: <M>lengthList (append xs ys) = lengthList xs + lengthList ys</M>
    </Lead>
    <Code
      x={96}
      y={340}
      size={34}
      step={1}
      code={`
        append :: [a] -> [a] -> [a]
        append [] ys = ys
        append (x:xs) ys = x : append xs ys

        lengthList [] = 0
        lengthList (_:xs) = 1 + lengthList xs
      `}
    />
    <At x={96} y={690} w={800} step={1} delay={30} size={34} weight={400} color={C.dim}>
      індукція за <M c={C.amber}>xs</M>: база <M>[]</M> і крок <M>x:xs</M>
    </At>
    <At x={1000} y={330} step={2} size={34} weight={700} color={C.amber}>
      База: xs = []
    </At>
    <Code
      x={1000}
      y={385}
      size={30}
      step={2}
      delay={8}
      code={`
        lengthList (append [] ys)
        = lengthList ys
        = 0 + lengthList ys
        = lengthList [] + lengthList ys
      `}
    />
    <At x={1000} y={600} step={3} size={34} weight={700} color={C.lav}>
      Крок: x:xs
    </At>
    <Code
      x={1000}
      y={655}
      size={30}
      step={3}
      delay={8}
      code={`
        lengthList (append (x:xs) ys)
        = 1 + lengthList (append xs ys)
        = [[4|1 + (lengthList xs + lengthList ys)]]
        = lengthList (x:xs) + lengthList ys
      `}
    />
    <At x={1000} y={870} w={860} step={4} size={34}>
      третій рядок — <A>індуктивне припущення</A>
    </At>
  </Slide>
);

/* 20 · Підсумок */
const POINTS = [
  "рекурсія описує обчислення через простіший випадок тієї самої задачі",
  "функція має базовий і рекурсивний випадки",
  "структура списку або дерева підказує структуру рекурсивної функції",
  "акумулятор передає стан без мутації",
  "завершуваність потребує міри або добре заснованого порядку",
  "структурна індукція повторює будову рекурсивного типу",
];

const S20: React.FC = () => {
  const { s } = useSteps();
  return (
    <Slide>
      <div style={{ position: "absolute", right: 90, top: 90, opacity: 0.25 * s(0, 10) }}>
        <HaskellLogo size={420} p1={s(0, 4, POP)} p2={s(0, 10, POP)} p3={s(0, 16, POP)} />
      </div>
      <At x={130} y={180} step={0} delay={4} size={80} weight={800} font={F.head}>
        Підсумок
      </At>
      {POINTS.map((p, i) => (
        <At key={i} x={190} y={340 + i * 88} w={1560} step={0} delay={18 + i * 9} size={40} weight={600}>
          <A c={C.pink}>•</A> {p}
        </At>
      ))}
      <At x={96} y={880} step={1} size={44}>
        Наступна лекція — <A c={C.mint}>функційні абстракції та ліниві обчислення</A>
      </At>
    </Slide>
  );
};

export const r7Slides: SlideDef[] = [
  { id: "induction", title: "Структурна індукція", steps: [40, 80, 80, 55], C: S18 },
  { id: "induction-proof", title: "Приклад доведення", steps: [40, 60, 70, 75, 55], C: S19 },
];
export const summarySlide: SlideDef = { id: "summary", title: "Підсумок", steps: [90, 45], C: S20 };
