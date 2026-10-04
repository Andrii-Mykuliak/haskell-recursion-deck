import React from "react";
import { C } from "../deck/theme";
import { SlideDef } from "../deck/steps";
import { Code } from "../deck/Code";
import { A, At, Chip, Lead, M, Mark, Slide } from "../deck/ui";

/* 16 · Завершуваність рекурсії */
const S16: React.FC = () => (
  <Slide title="Завершуваність рекурсії">
    <Lead>
      Наявність базового випадку ще не означає, що функція його досягне. Потрібна міра, яка зменшується на рекурсивному кроці.
    </Lead>
    <Code
      x={96}
      y={340}
      size={44}
      step={1}
      code={`
        bad :: Int -> Int
        bad 0 = 0
        bad n = [[2|bad (n + 1)]]
      `}
    />
    <Mark ok={false} step={2} delay={10} x={900} y={470} />
    <At x={980} y={472} w={850} step={2} delay={8} size={36}>
      <M c={C.amber}>n</M> зростає і віддаляється від <M c={C.amber}>0</M>
    </At>
    <Code
      x={96}
      y={590}
      size={44}
      step={3}
      code={`
        badLength :: [a] -> Int
        badLength [] = 0
        badLength xs = 1 + [[4|badLength xs]]
      `}
    />
    <Mark ok={false} step={4} delay={10} x={1030} y={720} />
    <At x={1110} y={722} w={760} step={4} delay={8} size={36}>
      <M c={C.amber}>xs</M> не стає меншим
    </At>
    <At x={96} y={860} w={1720} step={5} size={36}>
      Міра може бути різною: <A>число</A>, <A>довжина списку</A>, <A>кількість вузлів дерева</A> або інша величина, для якої неможливе
      нескінченне спадання.
    </At>
  </Slide>
);

/* 17 · Функція Акермана */
const S17: React.FC = () => (
  <Slide title="Функція Акермана">
    <Lead>
      Для складнішої рекурсії не завжди достатньо одного простого лічильника. Функція Акермана завершується, але потребує міркування про пару
      аргументів.
    </Lead>
    <Code
      x={96}
      y={340}
      size={44}
      step={1}
      code={`
        ackermann 0 n = n + 1
        ackermann m 0 = ackermann (m - 1) 1
        ackermann m n =
          ackermann (m - 1)
                    (ackermann m (n - 1))
      `}
    />
    <At x={1230} y={340} step={2} dir="left" pop>
      <Chip size={40} color={C.amber} border={C.amber}>
        (m, n)
      </Chip>
    </At>
    <At x={1230} y={450} step={2} delay={12} size={34} weight={600}>
      <M>(m, 0)</M> → <M>(m - 1, 1)</M>
    </At>
    <At x={1230} y={496} step={2} delay={18} size={26} weight={400} color={C.dim}>
      m зменшується
    </At>
    <At x={1230} y={580} step={2} delay={26} size={34} weight={600}>
      <M>(m, n)</M> → <M>(m, n - 1)</M>
    </At>
    <At x={1230} y={626} step={2} delay={32} size={26} weight={400} color={C.dim}>
      m те саме, n зменшується
    </At>
    <At x={1230} y={710} step={2} delay={40} size={34} weight={600}>
      <M>(m, n)</M> → <M>(m - 1, …)</M>
    </At>
    <At x={1230} y={756} step={2} delay={46} size={26} weight={400} color={C.dim}>
      m зменшується
    </At>
    <At x={96} y={880} w={1720} step={3} size={38}>
      Завершуваність пояснюють <A>лексикографічним порядком</A>: спочатку порівнюється <M c={C.amber}>m</M>, а якщо <M c={C.amber}>m</M> однакове —{" "}
      <M c={C.amber}>n</M>.
    </At>
  </Slide>
);

export const r6Slides: SlideDef[] = [
  { id: "termination", title: "Завершуваність", steps: [40, 50, 55, 50, 55, 60], C: S16 },
  { id: "ackermann", title: "Функція Акермана", steps: [40, 55, 80, 60], C: S17 },
];
