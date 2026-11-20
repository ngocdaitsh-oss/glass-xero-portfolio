"use client";

import { Blk, T } from "./edit";
import { InOutCards, PairCards, RelatedCards, Steps } from "./blocks";
import type { Article } from "./types";
import { Arrow, Callout, ChecklistColumn, Checks, Eyebrow, InfoCard, Node, P, Section, Stat, Subhead, Table, Tile, sectionProps, type IconName, type SectionDef } from "./ui";

/*
 * Attitudinal Methods — copy from ux-glossary/attitudinal-methods.md, on the Glossary Detail layout (Figma 2011:28710).
 * Editorial notes, "Nguồn tham khảo" and the empty case-study block are left out.
 */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "map", title: "Vị trí trong bản đồ phương pháp nghiên cứu", icon: "split" },
  { id: "methods", title: "Các phương pháp thuộc nhóm", icon: "component" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "maths", title: "Công thức và ví dụ tính", icon: "sigma" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với behavioral methods", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Problem />
      <MethodMap />
      <Methods />
      <When />
      <NotFit />
      <Apply />
      <Maths />
      <Limits />
      <InOut />
      <Example />
      <Mistakes />
      <Compare />
      <Checklist />
      <Related />
    </div>
  );
}

function Problem() {
  const decisions: [IconName, string, string][] = [
    ["target", "Nên giải quyết vấn đề nào", "Người dùng thấy điều gì quan trọng, điều gì gây khó chịu."],
    ["chat", "Định vị và ngôn ngữ", "Người dùng gọi tên sự vật thế nào, kỳ vọng điều gì từ sản phẩm."],
    ["analytics", "Theo dõi cảm nhận theo thời gian", "Mức hài lòng, niềm tin, cảm nhận về độ dễ dùng."],
    ["flask", "Đặt giả thuyết cho nghiên cứu hành vi", "Lời kể của người dùng gợi ý điều cần kiểm chứng bằng quan sát hoặc thử nghiệm."],
  ];
  return (
    <Section {...S.problem}>
      <div className="flex flex-col gap-5">
        <P>
          Dữ liệu hành vi (lượt nhấp, tỷ lệ hoàn thành, thời gian) cho biết người dùng đã làm gì, nhưng thường im lặng về vì sao. Một người bỏ form có thể vì không tin tưởng,
          vì không hiểu giá, vì đang bận, hay vì đã chọn đối thủ. Chỉ nhìn số liệu hành vi, nhóm dễ đoán nguyên nhân theo cảm tính.
        </P>
        <P strong>Attitudinal methods lấp khoảng trống đó bằng cách hỏi trực tiếp người dùng về nhu cầu, cảm nhận và cách họ hiểu sản phẩm.</P>
      </div>
      <Eyebrow>Attitudinal methods hỗ trợ các quyết định</Eyebrow>
      <div className="grid grid-cols-2 gap-5">
        {decisions.map(([icon, title, body], i) => (
          <InfoCard key={title} icon={icon} n={i + 1} title={title} body={body} minH={190} />
        ))}
      </div>
    </Section>
  );
}

/** Two axes: attitude ↔ behaviour across, qualitative ↔ quantitative down; methods placed in the quadrants. */
function AxisChart() {
  const quads: { pos: string; items: string[]; on?: boolean }[] = [
    { pos: "items-start justify-start", items: ["Phỏng vấn", "Focus group", "Diary study"], on: true },
    { pos: "items-end justify-start", items: ["Usability testing", "Contextual inquiry"] },
    { pos: "items-start justify-end", items: ["Khảo sát", "Card sorting"], on: true },
    { pos: "items-end justify-end", items: ["Clickstream / analytics", "A/B testing"] },
  ];
  const axis = "font-mono text-[14px] leading-5 tracking-[0.4px] text-[var(--w-muted)] uppercase";
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="split" size={36} iconSize={18} radius={10} />
        <Eyebrow>Sơ đồ hai trục</Eyebrow>
      </div>
      <T className={`${axis} self-center`}>Định tính (vì sao)</T>
      <div className="flex items-center gap-5">
        <T className={`${axis} w-[110px] shrink-0 text-right`}>Thái độ (nói)</T>
        <div className="relative grid flex-1 grid-cols-2 grid-rows-2 gap-0 rounded-2xl bg-[var(--d-well)]">
          <span aria-hidden className="absolute inset-y-4 left-1/2 w-px bg-[var(--d-line)]" />
          <span aria-hidden className="absolute inset-x-4 top-1/2 h-px bg-[var(--d-line)]" />
          {quads.map((q) => (
            <div key={q.items[0]} className={`flex min-h-[150px] flex-col gap-2.5 p-6 ${q.pos}`}>
              {q.items.map((it) => (
                <span key={it} className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2 ${q.on ? "bg-[var(--d-fill)] text-white" : "bg-[var(--w-card)]"}`}>
                  <span aria-hidden className={`size-2 rounded-full ${q.on ? "bg-white" : "bg-[var(--d-accent)]"}`} />
                  <T className="text-[16px] leading-6 font-semibold">{it}</T>
                </span>
              ))}
            </div>
          ))}
        </div>
        <T className={`${axis} w-[110px] shrink-0`}>Hành vi (làm)</T>
      </div>
      <T className={`${axis} self-center`}>Định lượng (bao nhiêu)</T>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Vị trí trên sơ đồ mang tính minh họa. Một số phương pháp nằm giữa hai đầu; ví dụ usability testing thu cả hành vi (làm được hay không) và thái độ (lời nghĩ to, đánh giá
        sau tác vụ).
      </T>
    </Blk>
  );
}

function MethodMap() {
  return (
    <Section {...S.map} intro="Rohrer (NN/g) phân loại phương pháp nghiên cứu UX theo ba chiều. Attitudinal là một đầu của chiều thứ nhất:">
      <Table
        head={["Chiều", "Hai đầu", "Câu hỏi"]}
        widths={[300, 340]}
        rows={[
          { icon: "chat", highlight: true, cells: ["Thái độ – Hành vi", "Attitudinal ↔ Behavioral", "Ta thu điều người dùng nói hay điều người dùng làm?"] },
          {
            icon: "bar-chart",
            cells: ["Định tính – Định lượng", "Qualitative ↔ Quantitative", "Ta muốn hiểu vì sao (quan sát trực tiếp, ít người) hay đo bao nhiêu (gián tiếp, nhiều người)?"],
          },
          {
            icon: "eye",
            cells: ["Bối cảnh sử dụng", "Tự nhiên · Có kịch bản · Giới hạn · Không dùng sản phẩm", "Người dùng có đang dùng sản phẩm khi nghiên cứu không, và trong điều kiện nào?"],
          },
        ]}
      />
      <AxisChart />
    </Section>
  );
}

function Methods() {
  return (
    <Section {...S.methods}>
      <Table
        head={["Phương pháp", "Thu được gì", "Định tính / Định lượng"]}
        widths={[340, undefined, 260]}
        rows={[
          { icon: "chat", cells: ["Phỏng vấn người dùng (user interview)", "Câu chuyện, động cơ, bối cảnh, cách người dùng mô tả vấn đề.", "Định tính"] },
          { icon: "clipboard-check", cells: ["Khảo sát (survey)", "Ý kiến và đánh giá của nhiều người, có thể đo bằng thang điểm.", "Chủ yếu định lượng"] },
          { icon: "users", cells: ["Focus group", "Ý kiến và phản ứng của một nhóm nhỏ khi thảo luận cùng nhau.", "Định tính"] },
          { icon: "list", cells: ["Card sorting", "Cách người dùng nhóm và gọi tên nội dung, phản ánh mô hình tư duy.", "Cả hai"] },
          { icon: "calendar", cells: ["Diary study", "Trải nghiệm và cảm nhận được tự ghi lại theo thời gian.", "Định tính (có thể kèm thang điểm)"] },
          { icon: "gauge", cells: ["Thang đo chuẩn hóa (SUS, UMUX, NPS, CES)", "Điểm cảm nhận về độ dễ dùng, mức khuyến nghị, mức nỗ lực.", "Định lượng"] },
          { icon: "lightbulb", cells: ["Desirability study", "Từ ngữ người dùng chọn để mô tả cảm nhận về thiết kế.", "Cả hai"] },
        ]}
      />
    </Section>
  );
}

function When() {
  const groups: [IconName, string, string[]][] = [
    [
      "target",
      "Bối cảnh phù hợp",
      [
        "Giai đoạn khám phá: chưa rõ vấn đề, cần hiểu nhu cầu, động cơ và ngôn ngữ của người dùng.",
        "Cần hiểu “vì sao” đằng sau một số liệu hành vi bất thường.",
        "Đo cảm nhận mà quan sát không thấy được: niềm tin, mức hài lòng, cảm giác an tâm.",
        "Theo dõi theo thời gian bằng thang đo chuẩn hóa, ví dụ đo SUS mỗi quý.",
        "Sản phẩm chưa tồn tại: chưa có hành vi để quan sát, chỉ có thể hỏi về nhu cầu và thói quen hiện tại.",
      ],
    ],
    [
      "eye",
      "Dấu hiệu nhận biết",
      [
        "Nhóm tranh luận về việc người dùng “muốn gì” mà chưa ai thực sự hỏi họ.",
        "Số liệu cho thấy người dùng bỏ dở nhưng không ai biết lý do.",
        "Cần chọn từ ngữ, nhãn menu, cách gọi tên tính năng.",
      ],
    ],
    [
      "clipboard-check",
      "Điều kiện cần",
      [
        "Tiếp cận được người tham gia đúng nhóm mục tiêu.",
        "Câu hỏi được thiết kế để tránh dẫn dắt.",
        "Có kế hoạch kết hợp với dữ liệu hành vi khi cần quyết định quan trọng.",
      ],
    ],
  ];
  return (
    <Section {...S.when}>
      <div className="flex items-start gap-4">
        {groups.map(([icon, title, items]) => (
          <Blk key={title} label="thẻ" className="g-card flex flex-1 flex-col gap-6 self-stretch rounded-[24px] bg-[var(--w-card)] p-7">
            <div className="flex items-center gap-3">
              <Tile icon={icon} size={40} iconSize={20} />
              <Eyebrow className="text-[var(--d-accent)]">{title}</Eyebrow>
            </div>
            <Checks items={items} />
          </Blk>
        ))}
      </div>
    </Section>
  );
}

function NotFit() {
  return (
    <Section {...S["not-fit"]}>
      <Table
        head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
        widths={[360]}
        rows={[
          {
            icon: "check-circle",
            cells: ["Cần biết người dùng có hoàn thành được tác vụ không", "Người dùng thường đánh giá quá cao khả năng của mình; lời kể khác với thao tác thật.", "Usability testing, analytics."],
          },
          {
            icon: "binoculars",
            cells: [
              "Dự đoán hành vi tương lai (“Bạn có mua không?”, “Bạn có dùng tính năng này không?”)",
              "Ý định nói ra thường khác hành vi thật.",
              "A/B testing, fake door test, theo dõi hành vi sau ra mắt.",
            ],
          },
          {
            icon: "hourglass",
            cells: ["Hỏi về chi tiết hành vi đã qua lâu", "Trí nhớ không chính xác; người dùng tái dựng lại câu chuyện hợp lý.", "Contextual inquiry, diary study, dữ liệu hành vi."],
          },
          { icon: "eye", cells: ["Đánh giá giao diện bằng cách hỏi “bạn thích bản nào”", "Sở thích thẩm mỹ khác với khả năng sử dụng.", "Kiểm thử hai phiên bản bằng tác vụ thật."] },
        ]}
      />
    </Section>
  );
}

function Apply() {
  const steps: [string, string, string][] = [
    [
      "Xác định câu hỏi nghiên cứu.",
      "Viết rõ điều cần biết, phân biệt câu hỏi về thái độ (“họ cảm thấy gì về…”) với câu hỏi về hành vi (“họ có làm được…”).",
      "Danh sách câu hỏi nghiên cứu và loại dữ liệu cần.",
    ],
    [
      "Chọn phương pháp phù hợp.",
      "Cần hiểu sâu, ít người → phỏng vấn. Cần đo trên nhiều người → khảo sát với thang đo. Cần hiểu cách người dùng phân loại nội dung → card sorting.",
      "Phương pháp, số người tham gia dự kiến, lý do chọn.",
    ],
    [
      "Thiết kế công cụ hỏi.",
      "Câu hỏi trung lập, một ý mỗi câu, không dẫn dắt. Ưu tiên hỏi về trải nghiệm cụ thể đã xảy ra (“Lần gần nhất bạn đặt lịch…”) hơn là ý kiến chung chung. Dùng thang đo chuẩn hóa nếu cần so sánh theo thời gian.",
      "Kịch bản phỏng vấn hoặc bảng câu hỏi đã thử trước với 1–2 người.",
    ],
    ["Tuyển và thu thập.", "Tuyển đúng nhóm người dùng; ghi lại nguyên văn câu trả lời quan trọng.", "Dữ liệu thô (ghi chép, bản ghi, câu trả lời khảo sát)."],
    [
      "Phân tích.",
      "Dữ liệu định tính: gom nhóm bằng affinity diagram hoặc thematic analysis. Dữ liệu định lượng: tính tỷ lệ, trung bình kèm khoảng tin cậy.",
      "Các nhận định chính, kèm mức độ tin cậy.",
    ],
    [
      "Đối chiếu với dữ liệu hành vi.",
      "Với quyết định quan trọng, kiểm chứng nhận định bằng quan sát hoặc dữ liệu hành vi trước khi hành động.",
      "Nhận định đã kiểm chứng, hoặc giả thuyết cần kiểm chứng tiếp.",
    ],
  ];
  return (
    <Section {...S.apply}>
      <Steps steps={steps} />
    </Section>
  );
}

function Formula({ label, formula, note }: { label: string; formula: string; note?: string }) {
  return (
    <Blk label="công thức" className="g-card flex flex-1 flex-col gap-3 rounded-[24px] bg-[var(--w-card)] p-7">
      <Eyebrow size={14} className="text-[var(--d-accent)]">
        {label}
      </Eyebrow>
      <T as="p" className="text-[24px] leading-8 font-semibold tracking-[-0.6px]">
        {formula}
      </T>
      {note ? (
        <T as="p" className="text-[16px] leading-6 text-[var(--w-secondary)]">
          {note}
        </T>
      ) : null}
    </Blk>
  );
}

function Maths() {
  const matrix: { title: string; body: string; tone: "card" | "fill" | "ink" }[] = [
    { title: "Thái độ tốt, hành vi tốt", body: "Ưu tiên vấn đề khác.", tone: "card" },
    { title: "Thái độ tốt, hành vi kém", body: "Có vấn đề người dùng không tự nhận ra; điều tra bằng quan sát.", tone: "card" },
    { title: "Thái độ kém, hành vi tốt", body: "Người dùng làm được nhưng không hài lòng (tốn công, thiếu tin tưởng); phỏng vấn để hiểu vì sao.", tone: "card" },
    { title: "Thái độ kém, hành vi kém", body: "Ưu tiên cao; kết hợp cả hai nguồn để tìm nguyên nhân.", tone: "fill" },
  ];
  return (
    <Section
      {...S.maths}
      intro="Phần này áp dụng khi attitudinal method cho ra số liệu, phổ biến nhất là tỷ lệ đồng ý trên thang điểm trong khảo sát. Mục tiêu là đọc con số kèm mức không chắc chắn, và đặt nó cạnh dữ liệu hành vi."
    >
      <Subhead icon="target">Xác định tiêu chí trước khi đo</Subhead>
      <div className="flex gap-4">
        <InfoCard
          icon="chat"
          title="Chỉ số chính"
          className="flex-1"
          body="Tỷ lệ top-2-box, tức tỷ lệ người chọn hai mức cao nhất (4 hoặc 5) cho câu “Đặt lịch tư vấn trên trang này rất dễ dàng” (thang 1–5)."
        />
        <InfoCard icon="play-circle" title="Chỉ số đối chiếu hành vi" className="flex-1" body="Tỷ lệ hoàn thành tác vụ đặt lịch trong usability test." />
      </div>

      <Subhead icon="sigma">Công thức</Subhead>
      <div className="flex gap-4">
        <Formula label="Tỷ lệ top-2-box" formula="Số người chọn 4 hoặc 5 ÷ Tổng số người trả lời" />
        <Formula label="Khoảng tin cậy" formula="Tỷ lệ ± Sai số" note="Sai số tính bằng công cụ; xem bài Confidence Intervals." />
      </div>

      <Subhead icon="bar-chart">Ví dụ thay số</Subhead>
      <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật.</Callout>
      <Table
        head={["", "Khảo sát (thái độ)", "Usability test (hành vi)"]}
        widths={[300]}
        rows={[
          { cells: ["Đo gì", "Người dùng cảm thấy đặt lịch dễ", "Người dùng làm được việc đặt lịch"] },
          { cells: ["Số người", "200", "10"] },
          { cells: ["Kết quả", "144 người chọn 4 hoặc 5", "6 người hoàn thành không cần trợ giúp"] },
          { highlight: true, cells: ["Tỷ lệ", "144 ÷ 200 = 72%", "6 ÷ 10 = 60%"] },
          { cells: ["Khoảng tin cậy 95% (từ công cụ)", "khoảng 65% – 78%", "khoảng 31% – 83%"] },
        ]}
      />
      <div className="flex gap-4">
        <Stat fill value="72%" label="Cảm thấy dễ · n = 200" note="Khoảng tin cậy 95%: khoảng 65% – 78%." />
        <Stat value="60%" label="Làm được · n = 10" note="Khoảng tin cậy 95%: khoảng 31% – 83%." />
      </div>
      <Blk label="thẻ" className="g-card flex flex-col gap-6 rounded-[24px] bg-[var(--w-card)] p-7">
        <div className="flex items-center gap-3">
          <Tile icon="book" size={40} iconSize={20} />
          <Eyebrow className="text-[var(--d-accent)]">Cách đọc</Eyebrow>
        </div>
        <Checks
          items={[
            "Khoảng 2/3 đến 3/4 người trả lời cảm thấy việc đặt lịch dễ dàng. Con số này khá chắc chắn nhờ 200 người trả lời, nên khoảng tin cậy hẹp.",
            "Khoảng tin cậy của usability test rất rộng vì chỉ có 10 người, nên chưa thể nói tỷ lệ thật là 60%. Nhưng nó đủ để nhắc rằng cảm nhận “dễ dùng” không đồng nghĩa với “làm được”.",
            "Hai con số đo hai thứ khác nhau, lấy từ hai nhóm người khác nhau, nên không trừ trực tiếp cho nhau.",
          ]}
        />
      </Blk>
      <Callout tone="bad" title="Cách đọc sai">
        “72% người dùng thấy dễ, vậy luồng đặt lịch không có vấn đề.”
      </Callout>

      <Subhead icon="shield-alert">Điều kiện để kết quả đáng tin</Subhead>
      <div className="grid grid-cols-3 gap-4">
        <InfoCard n={1} icon="users" body="Người trả lời đại diện cho nhóm người dùng mục tiêu (không chỉ người hài lòng nhất mới trả lời)." />
        <InfoCard n={2} icon="rotate" body="Câu hỏi và thang đo giữ nguyên giữa các lần đo nếu muốn so sánh theo thời gian." />
        <InfoCard n={3} icon="chat" body="Câu hỏi không dẫn dắt và hỏi về trải nghiệm cụ thể." />
      </div>

      <Subhead icon="split">Quy tắc ra quyết định: thái độ × hành vi</Subhead>
      <div className="grid grid-cols-2 gap-4">
        {matrix.map((m) => (
          <InfoCard key={m.title} tone={m.tone} title={m.title} body={m.body} minH={150} />
        ))}
      </div>
    </Section>
  );
}

function Limits() {
  const items: [IconName, string, string][] = [
    ["chat", "Lời nói khác hành động", "Người dùng có thể nói một đằng làm một nẻo, không phải vì nói dối mà vì khó tự nhận biết hành vi của mình."],
    ["users", "Thiên lệch xã hội (social desirability bias)", "Người tham gia có xu hướng trả lời theo hướng “đúng” hoặc dễ nghe."],
    ["hourglass", "Trí nhớ không hoàn hảo", "Câu trả lời về quá khứ là bản tái dựng, không phải bản ghi."],
    ["filter", "Phạm vi của mẫu", "Kết quả khảo sát chỉ đại diện cho những người đã trả lời."],
  ];
  return (
    <Section {...S.limits}>
      <div className="grid grid-cols-2 gap-4">
        {items.map(([icon, title, body], i) => (
          <InfoCard key={title} icon={icon} n={i + 1} title={title} body={body} />
        ))}
        <InfoCard
          icon="gauge"
          n={5}
          tone="ink"
          className="col-span-2"
          title="Thang đo khác nhau không so sánh trực tiếp được"
          body="Đổi cách hỏi hoặc số mức thang đo làm mất khả năng so sánh với lần đo trước."
        />
      </div>
    </Section>
  );
}

function InOut() {
  return (
    <Section {...S.io}>
      <InOutCards
        inputs={[
          "Câu hỏi nghiên cứu.",
          "Tiêu chí tuyển người tham gia.",
          "Kịch bản phỏng vấn hoặc bảng câu hỏi; thang đo chuẩn hóa nếu cần.",
          "Công cụ ghi âm, ghi chép hoặc nền tảng khảo sát.",
        ]}
        outputs={[
          "Nhận định về nhu cầu, động cơ, cảm nhận, kèm trích dẫn tiêu biểu.",
          "Số liệu thái độ (tỷ lệ, điểm trung bình) kèm khoảng tin cậy.",
          "Danh sách giả thuyết cần kiểm chứng bằng phương pháp hành vi.",
        ]}
      />
    </Section>
  );
}

function Example() {
  const steps: [IconName, string, string, string][] = [
    ["chat", "Phỏng vấn 6 khách đã từng bỏ dở", "Thái độ, định tính", "Nhiều người nói họ lo không biết chi phí tư vấn trước khi để lại thông tin."],
    ["clipboard-check", "Khảo sát ngắn sau khi đặt lịch", "Thái độ, định lượng", "Đo mức tự tin về chi phí trên thang 1–5."],
    ["analytics", "Đối chiếu với hành vi", "Dữ liệu clickstream", "Xem tỷ lệ người mở trang “Bảng giá” trước khi bỏ form."],
  ];
  return (
    <Section {...S.example}>
      <Callout tone="scenario" title="Tình huống giả định">
        Tiếp nối luồng đặt lịch tư vấn. Không phải dự án đã triển khai.
      </Callout>
      <InfoCard icon="analytics" title="Bối cảnh" body="Analytics cho thấy nhiều khách mở form đặt lịch nhưng không gửi. Nhóm không biết lý do." />
      <Eyebrow>Cách áp dụng</Eyebrow>
      <div className="flex items-stretch gap-3">
        {steps.map(([icon, title, tag, body], i) => (
          <span key={title} className="flex flex-1 items-center gap-3">
            {i ? <Arrow size={20} /> : null}
            <Blk label="bước" className="g-card flex flex-1 flex-col gap-3 self-stretch rounded-[24px] bg-[var(--w-card)] p-7">
              <div className="flex items-center justify-between">
                <Tile icon={icon} />
                <span className="font-mono text-[14px] leading-5 tracking-[0.4px] text-[var(--d-accent)]">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <T as="h4" className="text-[20px] leading-7 font-semibold tracking-[-0.4px]">
                {title}
              </T>
              <T className="self-start rounded-lg bg-[var(--d-soft)] px-2.5 py-1 font-mono text-[13px] leading-[18px] tracking-[0.4px] text-[var(--d-accent)] uppercase">{tag}</T>
              <T as="p" className="text-[16px] leading-6 text-[var(--w-secondary)]">
                {body}
              </T>
            </Blk>
          </span>
        ))}
      </div>
      <InfoCard
        icon="check-circle"
        tone="fill"
        title="Quyết định"
        body="Lo ngại về chi phí trở thành giả thuyết. Nhóm thêm thông tin chi phí ngay trong form, rồi kiểm chứng bằng A/B test với chỉ số chính là tỷ lệ gửi form thành công."
      />
      <Callout tone="note" icon="briefcase">
        Đây là kế hoạch minh họa, chưa phải kết quả nghiên cứu thực tế.
      </Callout>
    </Section>
  );
}

function Mistakes() {
  return (
    <Section {...S.mistakes}>
      <PairCards
        items={[
          ["Hỏi “Bạn có dùng tính năng X không?” để quyết định xây tính năng", "Ý định nói ra thường cao hơn hành vi thật.", "Hỏi về hành vi đã xảy ra; kiểm chứng bằng thử nghiệm."],
          ["Câu hỏi dẫn dắt (“Bạn thấy tính năng mới tiện thế nào?”)", "Gợi sẵn câu trả lời tích cực.", "Hỏi trung lập: “Bạn mô tả trải nghiệm với tính năng này thế nào?”"],
          ["Câu hỏi kép (“Trang này nhanh và dễ dùng?”)", "Không biết người trả lời đang đánh giá ý nào.", "Mỗi câu một ý."],
          ["Coi ý kiến số đông là đúng", "Phản hồi phản ánh người trả lời, không phải mọi người dùng.", "Kiểm tra mẫu; đối chiếu với dữ liệu hành vi."],
          ["Chỉ báo điểm trung bình, không có khoảng tin cậy", "Không biết con số chắc chắn đến đâu.", "Báo kèm cỡ mẫu và khoảng tin cậy."],
          ["Đổi câu hỏi giữa các lần đo", "Mất khả năng so sánh theo thời gian.", "Giữ nguyên câu hỏi và thang đo cho chỉ số theo dõi."],
        ]}
      />
    </Section>
  );
}

function Compare() {
  return (
    <Section {...S.compare}>
      <Table
        head={["", "Attitudinal methods", "Behavioral methods"]}
        widths={[240]}
        rows={[
          { cells: ["Thu thập", "Điều người dùng nói, nghĩ, cảm thấy.", "Điều người dùng thực sự làm."] },
          { cells: ["Ví dụ", "Phỏng vấn, khảo sát, focus group, card sorting.", "Usability testing, A/B testing, analytics, eye tracking."] },
          { cells: ["Trả lời tốt", "Vì sao, họ cần gì, họ cảm thấy thế nào.", "Họ làm gì, làm được không, ở đâu bị vướng."] },
          { cells: ["Điểm yếu", "Lời nói có thể khác hành động.", "Ít khi giải thích được nguyên nhân."] },
        ]}
      />
      <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
        <div className="flex items-center gap-3">
          <Tile icon="rotate" size={36} iconSize={18} radius={10} />
          <Eyebrow>Kết hợp thường gặp</Eyebrow>
        </div>
        <div className="flex items-start justify-between">
          <Node on title="Phương pháp thái độ" sub="đặt giả thuyết" className="w-[260px]" />
          <Arrow />
          <Node soft title="Phương pháp hành vi" sub="kiểm chứng" className="w-[260px]" />
          <Arrow />
          <Node on title="Phương pháp thái độ" sub="giải thích kết quả" className="w-[260px]" />
        </div>
      </Blk>
    </Section>
  );
}

function Checklist() {
  return (
    <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
      <div className="flex items-start gap-4">
        <ChecklistColumn
          icon="file"
          title="Trước khi thu thập"
          items={[
            "Câu hỏi nghiên cứu nói rõ đang tìm hiểu thái độ hay hành vi.",
            "Đã chọn phương pháp phù hợp với câu hỏi.",
            "Câu hỏi trung lập, mỗi câu một ý, hỏi về trải nghiệm cụ thể.",
            "Đã thử bảng câu hỏi hoặc kịch bản với 1–2 người.",
          ]}
        />
        <ChecklistColumn
          icon="analytics"
          title="Khi phân tích"
          items={[
            "Số liệu được báo kèm cỡ mẫu và khoảng tin cậy.",
            "Phân biệt rõ điều người dùng nói với điều đã quan sát.",
            "Nhận định quan trọng đã được đối chiếu với dữ liệu hành vi, hoặc được ghi là giả thuyết.",
          ]}
        />
      </div>
    </Section>
  );
}

function Related() {
  return (
    <Section {...S.related}>
      <RelatedCards
        items={[
          ["Survey", "Khảo sát", "Phương pháp thái độ định lượng phổ biến nhất."],
          ["Focus Group", "Thảo luận nhóm", "Phương pháp thái độ định tính theo nhóm."],
          ["Card Sorting", "Phân loại thẻ", "Thu cách người dùng phân loại nội dung."],
          ["Qualitative Research", "Nghiên cứu định tính", "Chiều phân loại còn lại trong khung phương pháp."],
          ["Likert Scale", "Thang Likert", "Dạng thang đo thường dùng trong khảo sát thái độ."],
          ["Usability Testing", "Kiểm thử khả năng sử dụng", "Phương pháp hành vi để kiểm chứng điều người dùng nói."],
          ["A/B Testing", "Kiểm thử A/B", "Kiểm chứng giả thuyết từ nghiên cứu thái độ bằng hành vi thật."],
          ["Affinity Diagram", "Sơ đồ tương đồng", "Cách tổng hợp dữ liệu định tính từ phỏng vấn."],
          ["Confidence Intervals", "Khoảng tin cậy", "Cách đọc số liệu khảo sát kèm độ không chắc chắn."],
        ]}
      />
    </Section>
  );
}

export const ATTITUDINAL_METHODS: Article = {
  slug: "attitudinal-methods",
  version: 1,
  term: "Attitudinal Methods",
  fn: 1,
  vi: "Phương pháp nghiên cứu thái độ — tìm hiểu điều người dùng nói, nghĩ và cảm thấy",
  kind: "Phương pháp nghiên cứu / kiểm thử",
  definition:
    "Attitudinal methods là nhóm phương pháp nghiên cứu thu thập điều người dùng tự nói ra: niềm tin, nhu cầu, mong đợi, sở thích, mức hài lòng và cách họ nhìn nhận sản phẩm.",
  definitionMore:
    "Dữ liệu đến từ lời kể và câu trả lời của người dùng, qua phỏng vấn, khảo sát, focus group hay card sorting. Nhóm phương pháp này giúp hiểu vì sao và người dùng muốn gì, nhưng không chứng minh được họ sẽ thực sự làm gì.",
  oneLine: "Nhóm phương pháp tìm hiểu điều người dùng nói, nghĩ và cảm thấy, thay vì điều họ thực sự làm.",
  glance: [
    ["Nói", "Thái độ"],
    ["Làm", "Hành vi"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Attitudinal research"] },
    { label: "Nhóm chính", items: ["Nghiên cứu khám phá"] },
    { label: "Thẻ phụ", items: ["Đo lường và phân tích", "Kiểm thử và đánh giá"] },
    {
      label: "Lưu ý tên gọi",
      items: ["Đây là một nhóm phương pháp, không phải một phương pháp riêng. Đối lập với nó là behavioral methods, tìm hiểu điều người dùng thực sự làm."],
    },
  ],
  sections: SECTIONS,
  Body,
};
