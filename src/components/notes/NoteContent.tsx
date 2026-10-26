import type { ReactNode } from "react";

type Block =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

function isBlockStart(line: string) {
  return line.startsWith("### ") || line.startsWith("- ") || /^\d+\.\s/.test(line) || line.startsWith("|");
}

function cells(line: string) {
  return line
    .slice(1, -1)
    .split("|")
    .map((cell) => cell.trim());
}

function parse(markdown: string): Block[] {
  const lines = markdown.split("\n");
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push({ type: "heading", text: line.slice(4) });
      index += 1;
      continue;
    }
    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        tableLines.push(lines[index].trim());
        index += 1;
      }
      const data = tableLines.filter((row) => !/^\|[\s:|-]+\|$/.test(row)).map(cells);
      if (data.length) blocks.push({ type: "table", headers: data[0], rows: data.slice(1) });
      continue;
    }
    const ordered = /^\d+\.\s/.test(line);
    if (line.startsWith("- ") || ordered) {
      const items: string[] = [];
      while (index < lines.length) {
        const item = lines[index].trim();
        if (ordered ? /^\d+\.\s/.test(item) : item.startsWith("- ")) {
          items.push(item.replace(ordered ? /^\d+\.\s/ : /^-\s/, ""));
          index += 1;
        } else if (!item) {
          index += 1;
        } else {
          break;
        }
      }
      blocks.push({ type: "list", ordered, items });
      continue;
    }
    const paragraph = [line];
    index += 1;
    while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index].trim())) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
  }
  return blocks;
}

function Inline({ text }: { text: string }) {
  return text.split(/(\*\*.*?\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : <span key={index}>{part}</span>,
  );
}

export function NoteContent({ markdown, mobile = false }: { markdown: string; mobile?: boolean }) {
  const blocks = parse(markdown);
  const bodyClass = mobile ? "text-base leading-[1.55]" : "text-base leading-6";
  const headingClass = mobile ? "pt-2 text-[18px] leading-[1.35] font-semibold" : "pt-2 text-[17px] leading-6 font-semibold";
  const listClass = mobile ? "space-y-2 pl-5 text-base leading-[1.5]" : "space-y-1.5 pl-5 text-base leading-6";

  return (
    <div className="flex flex-col gap-3">
      {blocks.map((block, index): ReactNode => {
        if (block.type === "heading") return <h4 key={index} className={headingClass}><Inline text={block.text} /></h4>;
        if (block.type === "paragraph") return <p key={index} className={`text-fg-secondary ${bodyClass}`}><Inline text={block.text} /></p>;
        if (block.type === "list") {
          const Tag = block.ordered ? "ol" : "ul";
          return (
            <Tag key={index} className={`text-fg-secondary ${listClass} ${block.ordered ? "list-decimal" : "list-disc"}`}>
              {block.items.map((item) => <li key={item}><Inline text={item} /></li>)}
            </Tag>
          );
        }
        return (
          <div key={index} className="os-scroll max-w-full overflow-x-auto rounded-xl border border-[var(--divider)]">
            <table className="min-w-[720px] border-collapse text-left text-sm leading-5">
              <thead className="bg-overlay">
                <tr>{block.headers.map((header) => <th key={header} className="border-b border-[var(--divider)] px-3 py-2.5 font-semibold"><Inline text={header} /></th>)}</tr>
              </thead>
              <tbody>
                {block.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-overlay-subtle transition-colors">
                    {row.map((cell, cellIndex) => <td key={cellIndex} className="text-fg-secondary border-b border-[var(--divider)] px-3 py-2.5 align-top last:border-b-0"><Inline text={cell} /></td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
