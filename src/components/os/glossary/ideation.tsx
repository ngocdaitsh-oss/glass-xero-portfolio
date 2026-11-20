"use client";

import { Blk, T } from "./edit";
import { CheckCards, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Ideation — copy from ux-glossary/ideation.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "diverge", title: "Phân kỳ và hội tụ", icon: "split" },
  { id: "techniques", title: "Kỹ thuật tạo ý tưởng", icon: "lightbulb" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "limits", title: "Giới hạn: khi nào ideation chưa đủ", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** One diamond: the problem opens out into many ideas, then narrows to the few chosen. */
function DivergeConverge() {
  const dots: [number, number][] = [];
  for (let c = 0; c < 9; c++) {
    const x = 250 + c * 62;
    const half = Math.round(4 - Math.abs(c - 4)) + 1;
    for (let r = 0; r < half; r++) dots.push([x, 140 + (r - (half - 1) / 2) * 34]);
  }
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="split" size={36} iconSize={18} radius={10} />
        <Eyebrow>Phân kỳ rồi hội tụ</Eyebrow>
      </div>
      <svg viewBox="0 0 1000 280" className="w-full" role="img" aria-label="Vấn đề đã rõ mở ra nhiều ý tưởng rồi thu lại vài ý tưởng được chọn">
        <polygon points="200,140 498,20 796,140 498,260" className="fill-[var(--d-well)]" />
        {dots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="11" className={i === 12 || i === 13 || i === 20 ? "fill-[var(--d-fill)]" : "fill-[var(--d-ci)]"} />
        ))}
        <rect x="10" y="112" width="170" height="56" rx="14" className="fill-[var(--d-soft)]" />
        <text x="95" y="146" textAnchor="middle" className="fill-[var(--d-accent)] text-[17px] font-semibold">
          Vấn đề đã rõ
        </text>
        <rect x="816" y="112" width="174" height="56" rx="14" className="fill-[var(--d-fill)]" />
        <text x="903" y="146" textAnchor="middle" className="fill-white text-[17px] font-semibold">
          Ý tưởng được chọn
        </text>
        <text x="349" y="276" textAnchor="middle" className="fill-[var(--w-muted)] font-mono text-[14px] tracking-[0.6px]">
          PHÂN KỲ
        </text>
        <text x="647" y="276" textAnchor="middle" className="fill-[var(--w-muted)] font-mono text-[14px] tracking-[0.6px]">
          HỘI TỤ
        </text>
      </svg>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Hình mở rộng ra giữa (nhiều ý tưởng), rồi thu hẹp lại bên phải (vài ý tưởng được chọn).
      </T>
    </Blk>
  );
}

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Section {...S.problem}>
        <div className="flex flex-col gap-5">
          <P>
            Khi gặp một vấn đề, nhóm thường nhảy ngay vào ý tưởng đầu tiên, hoặc ý tưởng của người có tiếng nói lớn nhất. Ý tưởng đầu tiên hiếm khi là tốt nhất; nó thường là ý tưởng quen
            thuộc nhất.
          </P>
          <P strong>Ideation tạo không gian để có nhiều lựa chọn trước khi quyết định, và để mọi người trong nhóm cùng đóng góp.</P>
        </div>
        <Eyebrow>Ideation hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          cols={3}
          minH={150}
          items={[
            ["split", "Có những hướng giải pháp nào", "Cho vấn đề đã xác định."],
            ["flask", "Hướng nào đáng làm bản mẫu và kiểm tra", "Sau khi chọn lọc."],
            ["users", "Kết hợp ý tưởng", "Từ nhiều người."],
          ]}
        />
      </Section>

      <Section {...S.diverge}>
        <P>
          Mô hình Double Diamond của Design Council mô tả quá trình thiết kế gồm hai lần mở rộng rồi thu hẹp. Ideation nằm ở viên kim cương thứ hai (Develop → Deliver): mở rộng ra nhiều
          giải pháp rồi thu hẹp lại.
        </P>
        <DivergeConverge />
        <Table
          head={["Giai đoạn", "Mục tiêu", "Quy tắc", "Ví dụ minh họa (giả định)"]}
          widths={[220]}
          rows={[
            { icon: "split", cells: ["Phân kỳ (diverge)", "Nhiều ý tưởng nhất có thể.", "Chưa đánh giá; số lượng trước, chất lượng sau.", "40 ý tưởng giúp khách tự tin khi đặt lịch."] },
            { icon: "filter", cells: ["Hội tụ (converge)", "Chọn ý tưởng đáng làm tiếp.", "Đánh giá theo tiêu chí đã thống nhất.", "Chọn 3 ý tưởng để làm bản mẫu."] },
          ]}
        />
        <Callout tone="note" title="Không trộn hai giai đoạn">
          Đánh giá ngay khi ý tưởng vừa xuất hiện khiến mọi người ngại đưa ra ý tưởng mới.
        </Callout>
      </Section>

      <Section {...S.techniques}>
        <Table
          head={["Kỹ thuật", "Cách làm", "Phù hợp khi"]}
          widths={[300]}
          rows={[
            { icon: "chat", cells: ["Brainstorming", "Nhóm cùng đưa ý tưởng, không phê bình.", "Nhóm quen làm việc với nhau."] },
            { icon: "pencil", highlight: true, cells: ["Brainwriting", "Mỗi người viết ý tưởng riêng trước, rồi chia sẻ.", "Tránh người nói nhiều chi phối; NN/g khuyến khích hình thức viết."] },
            { icon: "component", cells: ["Phác thảo nhanh (ví dụ Crazy 8s)", "Mỗi người phác thảo nhiều phương án trong thời gian ngắn.", "Ý tưởng về giao diện."] },
            { icon: "target", cells: ["“How might we”", "Chuyển vấn đề thành câu hỏi “Làm thế nào để…” rồi tạo ý tưởng cho từng câu.", "Vấn đề lớn cần chia nhỏ."] },
            { icon: "arrows", cells: ["Mượn ý tưởng từ lĩnh vực khác", "Xem cách lĩnh vực khác giải quyết vấn đề tương tự.", "Muốn thoát khỏi lối nghĩ quen."] },
          ]}
        />
        <P>Theo khảo sát của NN/g với 257 người làm UX, các nhóm hiệu quả dùng kỹ thuật có cấu trúc thay vì chỉ thảo luận tự do.</P>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "target",
              "Bối cảnh phù hợp",
              ["Vấn đề đã được xác định rõ, dựa trên nghiên cứu.", "Cần nhiều hướng giải pháp trước khi làm bản mẫu.", "Muốn cả nhóm (kể cả ngoài thiết kế) cùng đóng góp."],
            ],
            ["eye", "Dấu hiệu nhận biết", ["Nhóm chỉ có một giải pháp và đang tranh luận về nó.", "Giải pháp hiện tại đã được thử và không hiệu quả."]],
            ["clipboard-check", "Điều kiện cần", ["Câu phát biểu vấn đề rõ ràng.", "Người điều phối giữ tách biệt phân kỳ và hội tụ.", "Tiêu chí chọn ý tưởng."]],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[340]}
          rows={[
            { icon: "binoculars", cells: ["Vấn đề chưa rõ", "Ý tưởng giải quyết sai vấn đề.", "Nghiên cứu, xác định vấn đề trước."] },
            { icon: "check-circle", cells: ["Giải pháp đã rõ, chỉ cần thực hiện", "Tốn thời gian không cần thiết.", "Đi thẳng vào thiết kế chi tiết."] },
            { icon: "flask", cells: ["Dùng để thay cho kiểm chứng", "Ý tưởng hay trong phòng họp chưa chắc hiệu quả với người dùng.", "Làm bản mẫu và kiểm tra."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Phát biểu vấn đề.", "Dạng “Làm thế nào để…”, dựa trên nghiên cứu.", "Câu hỏi “how might we”."],
            ["Tạo ý tưởng riêng lẻ.", "Mỗi người tự viết hoặc phác thảo trong thời gian giới hạn.", "Nhiều ý tưởng."],
            ["Chia sẻ và mở rộng.", "Mỗi người trình bày; cả nhóm bổ sung, kết hợp.", "Danh sách ý tưởng đã nhóm."],
            ["Hội tụ theo tiêu chí.", "Ví dụ bỏ phiếu bằng chấm dán (dot voting), hoặc xếp theo tác động và công sức.", "Vài ý tưởng được chọn."],
            ["Chuyển sang bản mẫu.", "", "Kế hoạch làm bản mẫu và kiểm tra."],
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          cols={3}
          items={[
            ["flask", "Ý tưởng chưa được kiểm chứng", "Chọn ý tưởng bằng bỏ phiếu chỉ là ý kiến của nhóm."],
            ["users", "Ý tưởng bị giới hạn bởi người tham gia", "Nhóm thiếu đa dạng thì ý tưởng cũng ít đa dạng."],
            ["dots", "Số lượng không đảm bảo chất lượng", "Nhiều ý tưởng nhưng xa vấn đề thì không có ích."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={[
            "Vấn đề đã xác định, nhận định từ nghiên cứu.",
            "Người tham gia đa dạng vai trò.",
            "Thời gian, không gian, vật liệu (giấy note, bút, bảng số).",
            "Tiêu chí chọn ý tưởng.",
          ]}
          outputs={["Danh sách ý tưởng.", "Vài ý tưởng được chọn kèm lý do.", "Kế hoạch làm bản mẫu."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <div className="flex gap-4">
          <InfoCard icon="binoculars" title="Bối cảnh" className="flex-1" body="Nghiên cứu cho thấy khách ngại đặt lịch vì không chắc buổi tư vấn có đáng tiền không." />
          <InfoCard
            icon="target"
            title="Câu hỏi “how might we”"
            className="flex-1"
            body="Làm thế nào để khách tự tin rằng buổi tư vấn sẽ giúp được mình trước khi đặt lịch?"
          />
        </div>
        <Table
          head={["Giai đoạn", "Diễn biến"]}
          widths={[200]}
          rows={[
            {
              icon: "split",
              cells: [
                "Phân kỳ",
                "6 người viết riêng trong 10 phút, được khoảng 40 ý tưởng. Ví dụ: video ngắn giới thiệu chuyên gia; câu chuyện khách hàng theo tình huống; buổi tư vấn ngắn miễn phí; cam kết hoàn tiền; bảng “bạn sẽ nhận được gì sau buổi tư vấn”.",
              ],
            },
            {
              icon: "filter",
              cells: [
                "Hội tụ",
                "Mỗi người 3 chấm dán, sau đó xếp ý tưởng được chọn theo tác động và công sức. Chọn 3 ý tưởng: bảng “bạn sẽ nhận được gì”, câu chuyện khách hàng theo tình huống, và buổi tư vấn ngắn miễn phí.",
              ],
            },
          ]}
        />
        <InfoCard tone="fill" icon="check-circle" title="Bước tiếp theo" body="Làm bản mẫu cho cả ba và so sánh bằng design comparison." />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Đánh giá ngay khi ý tưởng xuất hiện", "Mọi người ngại đóng góp.", "Tách phân kỳ và hội tụ."],
            ["Chỉ thảo luận tự do", "Người nói nhiều chi phối.", "Viết riêng trước."],
            ["Ideation khi vấn đề chưa rõ", "Giải quyết sai vấn đề.", "Phát biểu vấn đề dựa trên nghiên cứu."],
            ["Chọn ý tưởng không theo tiêu chí", "Quyết định theo cảm tính.", "Thống nhất tiêu chí trước khi chọn."],
            ["Dừng ở danh sách ý tưởng", "Không kiểm chứng.", "Làm bản mẫu, kiểm tra với người dùng."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Quan hệ với ideation"]}
          widths={[340]}
          rows={[
            { icon: "chat", cells: ["Brainstorming", "Một kỹ thuật trong ideation."] },
            { icon: "lightbulb", cells: ["Design Thinking", "Cách tiếp cận rộng; ideation là một giai đoạn."] },
            { icon: "calendar", cells: ["Design Sprint", "Quy trình năm ngày; ngày phác thảo là ideation."] },
            { icon: "component", cells: ["Prototyping", "Bước sau ideation, biến ý tưởng thành thứ kiểm tra được."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="split"
            title="Phân kỳ"
            items={["Vấn đề đã được xác định, dựa trên nghiên cứu.", "Mỗi người tạo ý tưởng riêng trước khi chia sẻ.", "Phân kỳ và hội tụ được tách riêng."]}
          />
          <ChecklistColumn icon="filter" title="Hội tụ" items={["Có tiêu chí chọn ý tưởng.", "Ý tưởng được chọn có kế hoạch kiểm chứng."]} />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Design Thinking", "Tư duy thiết kế", "Ideation là một giai đoạn."],
            ["Design Sprint", "Thiết kế nước rút", "Ngày phác thảo là ideation có cấu trúc."],
            ["Low-Fidelity Prototype", "Bản mẫu độ trung thực thấp", "Cách kiểm tra ý tưởng nhanh."],
            ["Design Comparison", "So sánh thiết kế", "So sánh các ý tưởng đã chọn."],
            ["Affinity Diagram", "Sơ đồ tương đồng", "Nhóm ý tưởng sau phân kỳ."],
            ["Jobs to be Done (JTBD)", "Công việc cần hoàn thành", "Khung để phát biểu vấn đề trước ideation."],
          ]}
        />
      </Section>
    </div>
  );
}

export const IDEATION: Article = {
  slug: "ideation",
  version: 1,
  term: "Ideation",
  fn: 3,
  vi: "Tạo ý tưởng",
  kind: "Quy trình / cách tiếp cận",
  definition:
    "Ideation là giai đoạn trong quá trình thiết kế, khi nhóm tạo ra nhiều ý tưởng giải pháp cho một vấn đề đã xác định, rồi chọn lọc những ý tưởng đáng phát triển tiếp.",
  definitionMore: "Ideation đi sau khi đã hiểu người dùng và xác định vấn đề, đi trước giai đoạn tạo bản mẫu.",
  oneLine: "Tạo nhiều ý tưởng giải pháp cho một vấn đề đã rõ, rồi chọn ra ý tưởng đáng làm tiếp.",
  glance: [
    ["2", "Giai đoạn: phân kỳ, hội tụ"],
    ["5", "Kỹ thuật tạo ý tưởng"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Idea generation"] },
    { label: "Nhóm chính", items: ["Thiết kế và tạo mẫu"] },
    { label: "Thẻ phụ", items: ["Quy trình"] },
    {
      label: "Lưu ý tên gọi",
      items: ["Ideation không chỉ là brainstorming. Brainstorming là một kỹ thuật; ideation gồm cả mở rộng ý tưởng (phân kỳ) lẫn chọn lọc (hội tụ)."],
    },
  ],
  sections: SECTIONS,
  Body,
};
