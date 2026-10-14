import type { Block } from '@/content/field-notes/types';
import { PromptBlock } from './PromptBlock';

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose">
      {blocks.map((b, i) => {
        switch (b.t) {
          case 'p': return <p key={i}>{b.text}</p>;
          case 'h2': return <h2 key={i}>{b.text}</h2>;
          case 'h3': return <h3 key={i}>{b.text}</h3>;
          case 'ul': return <ul key={i}>{b.items.map((x) => <li key={x}>{x}</li>)}</ul>;
          case 'ol': return <ol key={i}>{b.items.map((x) => <li key={x}>{x}</li>)}</ol>;
          case 'prompt': return <PromptBlock key={i} title={b.title} text={b.text} context="article" />;
          case 'note': return <aside key={i} className="callout"><p><strong>{b.title}.</strong> {b.text}</p></aside>;
          case 'table': return (
            <div className="table-wrap" key={i} style={{ margin: 'var(--s-5) 0' }}>
              <table className="table"><caption>{b.caption}</caption>
                <thead><tr>{b.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
                <tbody>{b.rows.map((r) => <tr key={r[0]}>{r.map((c, j) => (j === 0 ? <th scope="row" key={j}>{c}</th> : <td key={j}>{c}</td>))}</tr>)}</tbody>
              </table>
            </div>
          );
        }
      })}
    </div>
  );
}
