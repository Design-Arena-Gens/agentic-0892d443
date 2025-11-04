import { Flowchart } from "@/app/components/Flowchart";
import { Legend } from "@/app/components/Legend";
import { flowchartCatalog } from "@/app/data/flowcharts";

export default function Page() {
  return (
    <>
      <section className="hero">
        <h1>ГОСТ 19.701-90: Набор блок-схем для модульной программы</h1>
        <p>
          Комплект визуальных схем для функций вычислительного модуля, оформленный
          по требованиям ГОСТ 19.701-90 (ISO 5807-1985). Каждая подпрограмма имеет
          собственную, автономную диаграмму с нисходящим потоком, обязательным
          слиянием ветвей и предопределёнными процессами для вызовов функций.
        </p>
      </section>

      <section className="overview-grid">
        <article className="overview-card">
          <strong>Функция main</strong>
          <span>
            Визуализирована как «карта» верхнего уровня: только контроль логики и
            вызовы подпрограмм, без деталей их реализации.
          </span>
        </article>
        <article className="overview-card">
          <strong>Автономные диаграммы</strong>
          <span>
            Каждая подпрограмма имеет собственную схему, совместимую с ГОСТ:
            отдельные входы/выходы, единый конец потока.
          </span>
        </article>
        <article className="overview-card">
          <strong>Строгий нисходящий поток</strong>
          <span>
            Потоки не образуют «спагетти»: все переходы ведут вниз, циклы
            возвращаются к условию, ветви объединяются.
          </span>
        </article>
        <article className="overview-card">
          <strong>Готово к печати</strong>
          <span>
            SVG-схемы легко экспортируются для документации или презентаций —
            масштабирование без потери качества.
          </span>
        </article>
      </section>

      <Legend />

      <section className="flowchart-gallery">
        <h2 className="section-title">Диаграммы функций</h2>
        {flowchartCatalog.map((item) => (
          <article className="flowchart-card" key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <Flowchart chart={item.chart} />
          </article>
        ))}
      </section>

      <section className="footer-note">
        Приведённая структура соответствует методологии «каждая функция —
        собственная блок-схема». Формы, развилки и циклы выполняют требования ГОСТ
        19.701-90: поток сверху вниз, возвращение в точку контроля цикла,
        обязательное слияние ветвей и использование предопределённых процессов для
        обращений к подпрограммам.
      </section>
    </>
  );
}
