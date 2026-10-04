import React from "react";
import { C } from "../deck/theme";
import { SlideDef } from "../deck/steps";
import { Code } from "../deck/Code";
import { A, Arrow, At, Chip, Lead, M, Slide } from "../deck/ui";

/* 3 · Рекурсія як модель обчислення */
const S03: React.FC = () => (
  <Slide title="Рекурсія як модель обчислення">
    <Lead>
      Рекурсія описує обчислення через простіший випадок того самого обчислення. У функційному стилі це не “цикл без циклу”, а спосіб узгодити
      програму зі структурою задачі.
    </Lead>
    <At x={96} y={400} step={1} dir="left" pop>
      <Chip size={40}>складна задача</Chip>
    </At>
    <Arrow x1={488} y1={434} x2={588} y2={434} step={1} delay={10} dur={12} color={C.dim} />
    <At x={608} y={400} step={1} delay={14} dir="left" pop>
      <Chip size={40}>простіша задача</Chip>
    </At>
    <Arrow x1={1030} y1={434} x2={1130} y2={434} step={1} delay={24} dur={12} color={C.dim} />
    <At x={1150} y={400} step={1} delay={28} dir="left" pop>
      <Chip size={40} color={C.amber} border={C.amber}>
        базовий випадок
      </Chip>
    </At>
    <At x={96} y={540} w={1720} step={2} size={36} weight={400} color={C.dim}>
      Рекурсивний крок має наближати нас до випадку, де результат відомий без нового виклику.
    </At>
    <Code
      x={150}
      y={650}
      size={44}
      step={2}
      delay={10}
      code={`
        factorial 4
        → 4 * factorial 3
        → ...
        → factorial 0
      `}
    />
    <At x={900} y={720} w={900} step={3} size={40}>
      Результат визначається не зміною стану, а <A>рівняннями</A> для різних форм аргументу.
    </At>
  </Slide>
);

/* 4 · Базовий і рекурсивний випадки */
const S04: React.FC = () => (
  <Slide title="Базовий і рекурсивний випадки">
    <Lead>Коректне рекурсивне означення має два смислові компоненти: випадок зупинки і крок, який зменшує або спрощує задачу.</Lead>
    <Code
      x={110}
      y={400}
      size={54}
      step={1}
      code={`
        factorial :: Integer -> Integer
        [[2|factorial 0 = 1]]
        factorial n = [[3|n * factorial (n - 1)]]
      `}
    />
    <At x={110} y={650} step={2} dir="left" pop>
      <Chip size={40} color={C.amber} border={C.amber}>
        0
      </Chip>
    </At>
    <At x={230} y={656} step={2} delay={6} size={44}>
      — <A c={C.amber}>базовий</A> випадок: відповідь відома без виклику
    </At>
    <At x={110} y={790} step={3} dir="left" pop>
      <Chip size={40}>n</Chip>
    </At>
    <At x={230} y={796} step={3} delay={6} size={44}>
      — <A>рекурсивний</A> випадок: задача стає меншою
    </At>
  </Slide>
);

/* 5 · Як розгортається factorial 4 */
const S05: React.FC = () => (
  <Slide title="Як розгортається factorial 4">
    <Lead>Рекурсивний виклик відкладає частину роботи до моменту, коли буде досягнуто базовий випадок.</Lead>
    <Code
      x={110}
      y={340}
      size={52}
      step={1}
      code={`
        @1 factorial [[1|4]]
        @2 = 4 * factorial [[2|3]]
        @3 = 4 * (3 * factorial [[3|2]])
        @4 = 4 * (3 * (2 * factorial [[4|1]]))
        @5 = 4 * (3 * (2 * (1 * factorial [[5|0]])))
        @6 = [[6|24]]
      `}
    />
    <At x={1280} y={400} w={560} step={6} size={36} weight={400} color={C.dim}>
      аргумент: <M c={C.amber}>4 → 3 → 2 → 1 → 0</M>
    </At>
    <At x={96} y={860} w={1720} step={7} size={40}>
      Важливо побачити не тільки самовиклик, а й <A>напрямок руху</A>: <M>n</M> послідовно наближається до <M c={C.amber}>0</M>.
    </At>
  </Slide>
);

export const r1Slides: SlideDef[] = [{ id: "model", title: "Модель обчислення", steps: [40, 50, 55, 55], C: S03 }];
export const r2Slides: SlideDef[] = [
  { id: "base-rec", title: "Базовий і рекурсивний випадки", steps: [40, 45, 50, 50], C: S04 },
  { id: "unfold", title: "Розгортання factorial", steps: [40, 28, 28, 28, 28, 28, 40, 55], C: S05 },
];
