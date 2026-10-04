import React from "react";
import { C, F } from "../deck/theme";
import { POP, SlideDef, useSteps } from "../deck/steps";
import { Code } from "../deck/Code";
import { A, At, Chip, Lead, M, Slide } from "../deck/ui";

/* 9 · Рекурсивні типи даних */
const S09: React.FC = () => (
  <Slide title="Рекурсивні типи даних">
    <Lead>
      Алгебраїчний тип даних може посилатися на себе у власному визначенні. Тоді функції над ним зазвичай повторюють структуру конструкторів.
    </Lead>
    <At x={110} y={360} w={860} step={1} size={38} weight={600}>
      • <A c={C.amber}>базовий</A> конструктор задає крайній випадок
    </At>
    <At x={110} y={500} w={860} step={2} size={38} weight={600}>
      • <A>рекурсивний</A> конструктор містить підструктуру того самого типу
    </At>
    <At x={110} y={640} w={860} step={3} size={38} weight={600}>
      • <M>pattern matching</M> задає форму рекурсивної функції
    </At>
    <Code
      x={1040}
      y={360}
      size={42}
      step={1}
      code={`
        data List a
          = [[1|Empty]]
          | [[2|Cons a (List a)]]
      `}
    />
    <Code
      x={1040}
      y={600}
      size={42}
      step={1}
      delay={20}
      code={`
        data Tree a
          = [[1|EmptyTree]]
          | [[2|Node a (Tree a) (Tree a)]]
      `}
    />
  </Slide>
);

type TreeNode = { id: string; x: number; y: number; label: string };
const NODES: TreeNode[] = [
  { id: "a", x: 1560, y: 400, label: "a" },
  { id: "b", x: 1420, y: 540, label: "b" },
  { id: "c", x: 1700, y: 540, label: "c" },
  { id: "d", x: 1340, y: 680, label: "d" },
  { id: "e", x: 1500, y: 680, label: "e" },
];
const EDGES: [string, string][] = [
  ["a", "b"],
  ["a", "c"],
  ["b", "d"],
  ["b", "e"],
];

const TreeDiagram: React.FC<{ step: number }> = ({ step }) => {
  const { s, lin } = useSteps();
  const at = (id: string) => NODES.find((n) => n.id === id)!;
  return (
    <>
      <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={1} height={1}>
        {EDGES.map(([from, to], i) => {
          const f = at(from);
          const t = at(to);
          const p = lin(step, 8 + i * 8, 14);
          return (
            <line
              key={from + to}
              x1={f.x}
              y1={f.y}
              x2={f.x + (t.x - f.x) * p}
              y2={f.y + (t.y - f.y) * p}
              stroke={C.accent}
              strokeWidth={4}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      {NODES.map((n, i) => {
        const p = s(step, i * 7, POP);
        return (
          <div
            key={n.id}
            style={{
              position: "absolute",
              left: n.x - 36,
              top: n.y - 36,
              width: 72,
              height: 72,
              borderRadius: 72,
              background: C.panel,
              border: `3px solid ${C.lav}`,
              color: C.lav,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: F.mono,
              fontWeight: 700,
              fontSize: 34,
              opacity: Math.min(1, p),
              transform: `scale(${p})`,
            }}
          >
            {n.label}
          </div>
        );
      })}
    </>
  );
};

/* 10 · Дерево як рекурсивна структура */
const S10: React.FC = () => (
  <Slide title="Дерево як рекурсивна структура">
    <Lead>
      Для дерева рекурсивна функція має випадок порожнього дерева і випадок вузла, у якому обробляються ліве та праве піддерева.
    </Lead>
    <Code
      x={96}
      y={340}
      size={40}
      step={1}
      code={`
        treeSize :: Tree a -> Int
        treeSize EmptyTree = 0
        treeSize (Node _ left right) =
          1 + treeSize left + treeSize right
      `}
    />
    <Code
      x={96}
      y={620}
      size={40}
      step={2}
      code={`
        treeDepth :: Tree a -> Int
        treeDepth EmptyTree = 0
        treeDepth (Node _ left right) =
          1 + max (treeDepth left) (treeDepth right)
      `}
    />
    <TreeDiagram step={3} />
    <At x={1230} y={780} step={3} delay={40} pop>
      <Chip size={32}>treeSize = 5</Chip>
    </At>
    <At x={1230} y={870} step={3} delay={52} pop>
      <Chip size={32} color={C.amber} border={C.amber}>
        treeDepth = 3
      </Chip>
    </At>
    <At x={96} y={880} w={1050} step={4} size={36}>
      Два піддерева означають <A>два рекурсивні виклики</A>. Спосіб об’єднання результатів залежить від задачі.
    </At>
  </Slide>
);

export const r4Slides: SlideDef[] = [
  { id: "rec-types", title: "Рекурсивні типи", steps: [40, 60, 50, 55], C: S09 },
  { id: "tree", title: "Дерево", steps: [40, 55, 55, 85, 55], C: S10 },
];
