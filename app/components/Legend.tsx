import { Flowchart } from "./Flowchart";
import type { FlowchartDefinition } from "./Flowchart";

const legendChart: FlowchartDefinition = {
  width: 760,
  height: 320,
  nodes: [
    {
      id: "legend-start",
      type: "start",
      label: "Начало / Конец",
      x: 20,
      y: 30
    },
    {
      id: "legend-process",
      type: "process",
      label: "Процесс",
      x: 270,
      y: 24
    },
    {
      id: "legend-predef",
      type: "predefinedProcess",
      label: "Предопределенный\nпроцесс",
      x: 520,
      y: 24
    },
    {
      id: "legend-decision",
      type: "decision",
      label: "Решение / проверка\nусловия",
      x: 40,
      y: 170
    },
    {
      id: "legend-io",
      type: "io",
      label: "Ввод / вывод данных",
      x: 320,
      y: 190
    },
    {
      id: "legend-junction",
      type: "junction",
      label: "",
      x: 640,
      y: 210
    }
  ],
  edges: [
    {
      id: "legend-e1",
      from: "legend-start",
      to: "legend-process",
      points: [
        { x: 120, y: 120 },
        { x: 220, y: 120 },
        { x: 220, y: 67 },
        { x: 270, y: 67 }
      ]
    },
    {
      id: "legend-e2",
      from: "legend-process",
      to: "legend-predef",
      points: [
        { x: 490, y: 67 },
        { x: 520, y: 67 }
      ]
    },
    {
      id: "legend-e3",
      from: "legend-predef",
      to: "legend-decision",
      points: [
        { x: 640, y: 67 },
        { x: 710, y: 67 },
        { x: 710, y: 240 },
        { x: 160, y: 240 },
        { x: 160, y: 230 }
      ]
    },
    {
      id: "legend-e4",
      from: "legend-decision",
      to: "legend-io",
      points: [
        { x: 150, y: 230 },
        { x: 360, y: 230 }
      ],
      label: "Да"
    },
    {
      id: "legend-e5",
      from: "legend-decision",
      to: "legend-junction",
      points: [
        { x: 40, y: 230 },
        { x: 40, y: 280 },
        { x: 652, y: 280 },
        { x: 652, y: 230 }
      ],
      label: "Нет",
      labelOffset: { x: -22, y: 8 }
    },
    {
      id: "legend-e6",
      from: "legend-io",
      to: "legend-junction",
      points: [
        { x: 560, y: 230 },
        { x: 628, y: 230 }
      ]
    }
  ]
};

export function Legend() {
  return (
    <section>
      <h2 className="section-title">Условные обозначения ГОСТ 19.701-90</h2>
      <div style={{ marginBottom: "1.2rem", color: "rgba(18,28,58,0.7)" }}>
        Схемы строятся из стандартизированных блоков, каждый из которых несёт
        строго определённый смысл. Приведённая легенда напоминает ключевые
        фигуры для построения структурных блок-схем.
      </div>
      <Flowchart chart={legendChart} />
    </section>
  );
}
