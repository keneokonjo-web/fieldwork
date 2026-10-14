import { CopyButton } from './CopyButton';

export function PromptBlock({ title = 'Prompt', text, context }: { title?: string; text: string; context?: string }) {
  return (
    <div className="prompt">
      <div className="prompt__bar">
        <span>{title}</span>
        <CopyButton text={text} context={context} />
      </div>
      <pre tabIndex={0}>{text}</pre>
    </div>
  );
}
