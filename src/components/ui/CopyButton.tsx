'use client';
import { useRef, useState } from 'react';
import { track } from '@/lib/analytics';

export function CopyButton({ text, label = 'Copy', copiedLabel = 'Copied', context = 'prompt', small = true }: { text: string; label?: string; copiedLabel?: string; context?: string; small?: boolean }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  async function copy() {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text);
      else {
        const ta = document.createElement('textarea');
        ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        const ok = document.execCommand('copy'); document.body.removeChild(ta);
        if (!ok) throw new Error('copy failed');
      }
      setState('copied'); track('prompt_copied', { location: context });
    } catch { setState('failed'); }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), 2500);
  }
  return (
    <>
      <button type="button" className={`btn${small ? ' btn--small' : ''} btn--secondary`} onClick={copy}>
        {state === 'copied' ? copiedLabel : state === 'failed' ? 'Copy failed' : label}
      </button>
      <span className="visually-hidden" role="status" aria-live="polite">
        {state === 'copied' ? 'Copied to clipboard' : state === 'failed' ? 'Could not copy. Select the text and copy it manually.' : ''}
      </span>
    </>
  );
}
