import React from "react";
import { C, F } from "../deck/theme";
import { POP, SlideDef, useSteps } from "../deck/steps";
import { Code } from "../deck/Code";
import { A, Arrow, At, Chip, Lead, M, Slide } from "../deck/ui";

/* 11 · Основні форми рекурсії */
const FORMS: { n: string; t: string; d: string; code: string }[] = [
  { n: "1", t: "Лінійна рекурсія", d: "один рекурсивний виклик", code: "factorial n =\n  n * factorial (n - 1)" },
  { n: "2", t: "Розгалужена рекурсія", d: "кілька рекурсивних викликів", code: "fib n =\n  fib (n - 1)\n  + fib (n - 2)" },
  { n: "3", t: "Взаємна рекурсія", d: "функції викликають одна одну", code: "isEven 0 = True\nisEven n = isOdd (n - 1)\nisOdd 0 = False\nisOdd n = isEven (n - 1)" },
];

const FormCard: React.FC<{ i: number }> = ({ i }) => {
  const { s } = useSteps();
  const f = FORMS[i];
  const p = s(i + 1, 0, POP);
  const x = 96 + i * 600;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: 340,
        width: 560,
        height: 520,
        borderRadius: 20,
        background: C.panel,
        border: `3px solid ${C.line}`,
        opacity: Math.min(1, p),
        transform: `translateY(${(1 - p) * 40}px)`,
        padding: "34px 36px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: 64,
          height: 56,
          borderRadius: 8,
          background: i % 2 ? "#5e5086" : C.pink,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: F.body,
          fontWeight: 800,
          fontSize: 34,
        }}
      >
        {f.n}
      </div>
      <div style={{ marginTop: 22, fontFamily: F.head, fontWeight: 600, fontSize: 40 }}>{f.t}</div>
      <div style={{ marginTop: 8, fontFamily: F.body, fontSize: 28, color: C.dim }}>{f.d}</div>
      <div
        style={{
          marginTop: 40,
          fontFamily: F.mono,
          fontWeight: 600,
          fontSize: 30,
          lineHeight: "46px",
          color: C.mint,
          whiteSpace: "pre",
          fontVariantLigatures: "none",
        }}
      >
        {f.code}
      </div>
    </div>
  );
};

const S11: React.FC = () => (
  <Slide title="Основні форми рекурсії">
    <Lead>Форми рекурсії відрізняються не синтаксисом, а структурою рекурсивних викликів.</Lead>
    {FORMS.map((_, i) => (
      <FormCard key={i} i={i} />
    ))}
  </Slide>
);

/* 12 · Наївний Fibonacci */
type FibNode = { x: number; y: number; label: string; dup?: "two" | "one" };
const FIB: FibNode[] = [
  { x: 1475, y: 370, label: "fib 4" },
  { x: 1290, y: 500, label: "fib 3" },
  { x: 1660, y: 500, label: "fib 2", dup: "two" },
  { x: 1190, y: 630, label: "fib 2", dup: "two" },
  { x: 1390, y: 630, label: "fib 1", dup: "one" },
  { x: 1570, y: 630, label: "fib 1", dup: "one" },
  { x: 1760, y: 630, label: "fib 0" },
  { x: 1130, y: 760, label: "fib 1", dup: "one" },
  { x: 1250, y: 760, label: "fib 0" },
];
const FIB_EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 4],
  [2, 5],
  [2, 6],
  [3, 7],
  [3, 8],
];

const FibTree: React.FC = () => {
  const { s, lin } = useSteps();
  return (
    <>
      <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={1} height={1}>
        {FIB_EDGES.map(([a, b], i) => {
          const p = lin(2, 6 + i * 6, 12);
          const f = FIB[a];
          const t = FIB[b];
          return (
            <line
              key={i}
              x1={f.x}
              y1={f.y + 26}
              x2={f.x + (t.x - f.x) * p}
              y2={f.y + 26 + (t.y - 26 - (f.y + 26)) * p}
              stroke={C.accent}
              strokeWidth={3}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      {FIB.map((n, i) => {
        const p = s(2, i * 6, POP);
        const hi = s(3, 0);
        const col = n.dup === "two" ? C.amber : n.dup === "one" ? C.pink : C.lav;
        const on = n.dup ? hi : 0;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: n.x - 52,
              top: n.y - 26,
              width: 104,
              height: 52,
              borderRadius: 14,
              background: `rgba(${n.dup === "two" ? "242,193,125" : "178,95,168"},${0.22 * on})`,
              border: `3px solid ${on > 0.5 ? col : C.lav}`,
              color: on > 0.5 ? col : C.lav,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: F.mono,
              fontWeight: 700,
              fontSize: 26,
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

const S12: React.FC = () => (
  <Slide title="Наївний Fibonacci">
    <Lead>Визначення чисел Фібоначчі добре повторює математичну рекурсію, але породжує багато повторних підзадач.</Lead>
    <Code
      x={96}
      y={340}
      size={40}
      step={1}
      code={`
        fibonacci :: Int -> Integer
        fibonacci 0 = 0
        fibonacci 1 = 1
        fibonacci n =
          fibonacci (n - 1) + fibonacci (n - 2)
      `}
    />
    <FibTree />
    <At x={96} y={700} w={900} step={3} delay={10} size={36}>
      <M c={C.amber}>fib 4</M> — 9 викликів, але лише <A>5 різних</A> підзадач.
    </At>
    <At x={96} y={880} w={1720} step={4} size={38}>
      Коректність і ефективність — <A>різні питання</A>. Рекурсивний опис може бути зрозумілим, але обчислювально дорогим.
    </At>
  </Slide>
);

/* 12b · Мемоїзація */
const MEMO_ROWS: [string, string][] = [
  ["", "0"],
  ["", "1"],
  ["1 + 0", "1"],
  ["1 + 1", "2"],
  ["2 + 1", "3"],
];

const S12M: React.FC = () => {
  const { s } = useSteps();
  const cell = (label: string, left: number, top: number, w: number, p: number, color: string, head = false) => (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: w,
        height: 66,
        border: `3px solid ${head ? C.accent : C.line}`,
        background: head ? "rgba(141,118,220,0.2)" : C.panel,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: F.mono,
        fontWeight: 700,
        fontSize: 32,
        opacity: Math.min(1, p),
        transform: `translateY(${(1 - p) * 14}px)`,
      }}
    >
      {label}
    </div>
  );
  const X = 1180;
  return (
    <Slide title="Мемоїзація">
      <Lead>
        Повторні підзадачі можна не рахувати знову: результат кожної підзадачі зберігається в таблиці і береться звідти.
      </Lead>
      <Code
        x={96}
        y={340}
        size={36}
        step={1}
        code={`
          fibs :: [Integer]
          fibs = map fibMemo [0 ..]
        `}
      />
      <Code
        x={96}
        y={470}
        size={36}
        step={2}
        code={`
          fibMemo :: Int -> Integer
          fibMemo 0 = 0
          fibMemo 1 = 1
          fibMemo n = [[3|fibs !! (n - 1) + fibs !! (n - 2)]]
        `}
      />
      {cell("n", X, 340, 90, s(3, 0), C.lav, true)}
      {cell("з таблиці", X + 90, 340, 220, s(3, 0), C.dim, true)}
      {cell("fibs !! n", X + 310, 340, 210, s(3, 0), C.amber, true)}
      {MEMO_ROWS.map(([expr, val], i) => (
        <React.Fragment key={i}>
          {cell(String(i), X, 420 + i * 72, 90, s(3, 8 + i * 12), C.lav)}
          {cell(expr || "—", X + 90, 420 + i * 72, 220, s(3, 8 + i * 12), C.mint)}
          {cell(val, X + 310, 420 + i * 72, 210, s(3, 8 + i * 12), C.amber)}
        </React.Fragment>
      ))}
      <At x={96} y={760} w={1000} step={4} size={38}>
        <M c={C.amber}>fib 4</M> — <A>5 обчислень</A> замість 9 викликів: кожне значення рахується один раз.
      </At>
      <At x={96} y={900} w={1720} step={5} size={32} weight={400} color={C.dim}>
        Список <M>fibs</M> заповнюється за потреби — це ліниві обчислення, наступна лекція.
      </At>
    </Slide>
  );
};

/* 13 · Взаємна рекурсія */
const S13: React.FC = () => (
  <Slide title="Взаємна рекурсія">
    <Lead>
      За взаємної рекурсії кілька функцій визначаються одна через одну. Це корисно для взаємопов’язаних станів або категорій.
    </Lead>
    <Code
      x={96}
      y={340}
      size={40}
      step={1}
      code={`
        isEven :: Int -> Bool
        isEven 0 = True
        isEven n = isOdd (n - 1)

        isOdd :: Int -> Bool
        isOdd 0 = False
        isOdd n = isEven (n - 1)
      `}
    />
    <Code
      x={960}
      y={340}
      size={40}
      step={2}
      stagger={9}
      code={`
        isEven 4
        → isOdd 3
        → isEven 2
        → isOdd 1
        → isEven 0
        → [[2@50|True]]
      `}
    />
    <At x={150} y={840} step={3} dir="left" pop>
      <Chip size={36}>isEven</Chip>
    </At>
    <At x={520} y={840} step={3} delay={8} dir="right" pop>
      <Chip size={36}>isOdd</Chip>
    </At>
    <Arrow x1={330} y1={850} x2={510} y2={850} step={3} delay={14} dur={14} color={C.accentHi} curve={-40} />
    <Arrow x1={520} y1={888} x2={340} y2={888} step={3} delay={22} dur={14} color={C.pink} curve={-40} />
  </Slide>
);

/* 14 · Акумулятор і хвостова рекурсія */
const S14: React.FC = () => (
  <Slide title="Акумулятор і хвостова рекурсія">
    <Lead>
      Акумулятор — додатковий параметр, у якому передається вже накопичений результат. Так можна організувати рекурсивний стан без мутації.
    </Lead>
    <Code
      x={96}
      y={340}
      size={46}
      step={1}
      code={`
        factorialAcc :: Integer -> Integer
        factorialAcc n = go n 1
          where
            go 0 acc = [[2|acc]]
            go k acc = [[3|go (k - 1) (k * acc)]]
      `}
    />
    <At x={1180} y={470} w={680} step={2} size={38}>
      <M c={C.amber}>acc</M> — накопичений результат
    </At>
    <At x={1180} y={610} w={680} step={3} size={38}>
      рекурсивний виклик — <A>остання операція</A> функції
    </At>
    <At x={96} y={800} w={1720} step={4} size={40}>
      Хвостовою називають рекурсію, у якій рекурсивний виклик є <A>останньою операцією</A> функції.
    </At>
  </Slide>
);

/* 15 · Що означає go 4 1 */
const ROWS: [string, string][] = [
  ["4", "1"],
  ["3", "4"],
  ["2", "12"],
  ["1", "24"],
  ["0", "24"],
];

const S15: React.FC = () => {
  const { s } = useSteps();
  const cell = (label: string, left: number, top: number, p: number, color: string, head = false) => (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: 180,
        height: 66,
        border: `3px solid ${head ? C.accent : C.line}`,
        background: head ? "rgba(141,118,220,0.2)" : C.panel,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: F.mono,
        fontWeight: 700,
        fontSize: 36,
        opacity: Math.min(1, p),
        transform: `translateY(${(1 - p) * 16}px)`,
      }}
    >
      {label}
    </div>
  );
  return (
    <Slide title="Що означає go 4 1">
      <Lead>
        Допоміжна функція <M>go</M> має два аргументи: число, яке ще треба опрацювати, і <M c={C.amber}>acc</M> — уже накопичений добуток.
      </Lead>
      <Code
        x={96}
        y={340}
        size={52}
        step={1}
        code={`
          @1 go 4 1
          @2 → go 3 (4 * 1)
          @3 → go 2 (3 * 4)
          @4 → go 1 (2 * 12)
          @5 → go 0 (1 * 24)
          @6 → [[6|24]]
        `}
      />
      {cell("k", 1250, 340, s(1, 0), C.lav, true)}
      {cell("acc", 1430, 340, s(1, 0), C.amber, true)}
      {ROWS.map(([k, acc], i) => (
        <React.Fragment key={i}>
          {cell(k, 1250, 420 + i * 78, s(i + 1, 8), C.lav)}
          {cell(acc, 1430, 420 + i * 78, s(i + 1, 8), C.amber)}
        </React.Fragment>
      ))}
      <At x={96} y={850} w={1720} step={7} size={38}>
        На кожному кроці перший аргумент зменшується, а <M c={C.amber}>acc</M> містить результат, накопичений до цього моменту.
      </At>
    </Slide>
  );
};

export const r5Slides: SlideDef[] = [
  { id: "forms", title: "Форми рекурсії", steps: [40, 55, 55, 55], C: S11 },
  { id: "fib", title: "Наївний Fibonacci", steps: [40, 55, 75, 55, 55], C: S12 },
  { id: "memo", title: "Мемоїзація", steps: [40, 50, 55, 85, 55, 55], C: S12M },
  { id: "mutual", title: "Взаємна рекурсія", steps: [40, 55, 70, 60], C: S13 },
  { id: "acc", title: "Акумулятор", steps: [40, 55, 45, 45, 55], C: S14 },
  { id: "go-trace", title: "go 4 1", steps: [40, 30, 30, 30, 30, 30, 40, 55], C: S15 },
];
