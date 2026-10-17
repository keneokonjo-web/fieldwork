/** Four corner marks in the frame of a hero or section: letters of the wordmark and the page number. */
export function Corners({ n, letters = ['F', 'I', 'E'] }: { n: string; letters?: [string, string, string] | string[] }) {
  return (
    <>
      <i className="tl" aria-hidden="true">{letters[0]}</i>
      <i className="tr" aria-hidden="true">({n})</i>
      <i className="bl" aria-hidden="true">{letters[1]}</i>
      <i className="br" aria-hidden="true">{letters[2]}</i>
    </>
  );
}
