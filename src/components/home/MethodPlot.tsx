const steps = [
  { n: '01', name: 'Brief', text: 'Say what you need, for whom, in what shape.', shape: 'quarter', colour: 'bg-burgundy' },
  { n: '02', name: 'Run', text: 'Use the tool you already have on real material.', shape: 'square', colour: 'bg-terracotta' },
  { n: '03', name: 'Check', text: 'Test the result against your source. You decide.', shape: 'half', colour: 'bg-saffron' },
  { n: '04', name: 'Keep', text: 'Save what worked as a workflow you can reuse.', shape: 'circle', colour: 'bg-moss' },
] as const;

/** The Fieldwork loop drawn with the tile kit inside the plot frame. Real HTML so it reads on any device. */
export function MethodPlot() {
  return (
    <div className="plot" role="group" aria-label="The Fieldwork loop: brief, run, check, keep">
      <span className="plot__label">Plot 01 · the loop</span>
      <ol className="method">
        {steps.map((s) => (
          <li key={s.n}>
            <div className="method__shape" aria-hidden="true"><span className={`shape shape--${s.shape} ${s.colour}`} /></div>
            <div className="method__cap"><h3>{s.name}</h3><span className="index">{s.n}</span></div>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
      <p className="margin-note">Every exercise uses the same four moves</p>
    </div>
  );
}
