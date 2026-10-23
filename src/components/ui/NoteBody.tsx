import type { Block } from '@/content/about/notes';

export function NoteBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose">
      {blocks.map((b, i) => {
        switch (b.t) {
          case 'p': return <p key={i}>{b.text}</p>;
          case 'h2': return <h2 key={i}>{b.text}</h2>;
          case 'ul': return <ul key={i}>{b.items.map((x) => <li key={x}>{x}</li>)}</ul>;
          case 'ol': return <ol key={i}>{b.items.map((x) => <li key={x}>{x}</li>)}</ol>;
          case 'note': return <aside key={i} className="callout"><p><strong>{b.title}.</strong> {b.text}</p></aside>;
        }
      })}
    </div>
  );
}
