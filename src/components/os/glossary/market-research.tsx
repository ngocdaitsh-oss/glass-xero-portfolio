"use client";

import { Blk, T } from "./edit";
import { CheckCards, Formula, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Market Research — copy from ux-glossary/market-research.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "types", title: "Các loại nghiên cứu thị trường", icon: "component" },
  { id: "vs-ux", title: "Market research và UX research", icon: "split" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "maths", title: "Công thức và ví dụ tính", icon: "sigma" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các phương pháp gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** Top-down market sizing: each bar narrows by the rate applied at that step. Widths are illustrative, not to scale. */
const FUNNEL: [string, string, string, number][] = [
  ["Hộ gia đình trong khu vực", "120.000", "Thống kê", 100],
  ["Khách quan tâm", "18.000", "× 15% quan tâm", 62],
  ["Khách có thể chọn dịch vụ", "900 / năm", "× 5% thị phần", 42],
];

function Funnel() {
  return (
    <Blk label="biểu đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="filter" size={36} iconSize={18} radius={10} />
        <Eyebrow>Ước tính quy mô từ trên xuống</Eyebrow>
      </div>
      <div className="flex flex-col items-center gap-2">
        {FUNNEL.map(([label, value, rate, w], i) => (
          <div key={label} className="flex w-full flex-col items-center gap-2">
            {i > 0 && <span className="font-mono text-[14px] text-[var(--w-muted)]">{rate}</span>}
            <div
              className={`flex items-center justify-between gap-4 rounded-2xl px-6 py-4 ${i === 0 ? "bg-[var(--d-well)]" : "bg-[var(--d-ci-weak)]"}`}
              style={{ width: `${w}%`, minWidth: 420 }}
            >
              <span className="text-[16px] leading-6 font-semibold">{label}</span>
              <span className="font-mono text-[18px] font-semibold whitespace-nowrap">{value}</span>
            </div>
          </div>
        ))}
        <span className="font-mono text-[14px] text-[var(--w-muted)]">× 1.500.000 đ</span>
        <div className="flex min-w-[420px] items-center justify-between gap-6 rounded-2xl bg-[var(--d-ci)] px-6 py-4 text-white">
          <span className="text-[16px] leading-6 font-semibold">Doanh thu tiềm năng</span>
          <span className="font-mono text-[18px] font-semibold whitespace-nowrap">1,35 tỷ đ / năm</span>
        </div>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Số liệu minh họa. Mỗi tỷ lệ là một giả định: thị phần còn một nửa thì số khách và doanh thu cũng còn một nửa.
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
            Một sản phẩm có thể rất dễ dùng nhưng vẫn thất bại vì không đủ người cần, giá không phù hợp, hoặc đối thủ đã làm tốt hơn. Những câu hỏi này nằm ngoài phạm vi của usability test
            hay phỏng vấn trải nghiệm.
          </P>
          <P strong>Market research giúp trả lời câu hỏi kinh doanh trước khi đầu tư, và giúp nhóm UX biết đang thiết kế cho thị trường nào.</P>
        </div>
        <Eyebrow>Market research hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          minH={150}
          items={[
            ["target", "Có nên vào thị trường này không", "Quy mô, mức tăng trưởng."],
            ["users", "Phục vụ phân khúc nào", "Nhóm khách hàng có nhu cầu khác nhau."],
            ["gauge", "Định giá và định vị", "So với đối thủ."],
            ["chat", "Thông điệp nào", "Thu hút khách hàng."],
          ]}
        />
      </Section>

      <Section {...S.types}>
        <Table
          head={["Loại", "Mô tả", "Ví dụ minh họa (giả định)"]}
          widths={[260]}
          rows={[
            { icon: "file", cells: ["Nghiên cứu thứ cấp (secondary)", "Dùng dữ liệu đã có: báo cáo ngành, thống kê, dữ liệu công khai.", "Số hộ gia đình trong khu vực theo thống kê."] },
            { icon: "clipboard-check", cells: ["Nghiên cứu sơ cấp (primary)", "Tự thu dữ liệu mới: khảo sát, phỏng vấn, focus group.", "Khảo sát 400 người về nhu cầu tư vấn tài chính."] },
            { icon: "users", cells: ["Phân khúc thị trường", "Chia khách hàng thành nhóm có nhu cầu khác nhau.", "Gia đình trẻ, người sắp nghỉ hưu, chủ doanh nghiệp nhỏ."] },
            { icon: "binoculars", cells: ["Phân tích đối thủ", "So sánh sản phẩm, giá, định vị của đối thủ.", "So sánh giá và gói dịch vụ của ba trung tâm tư vấn khác."] },
            { icon: "gauge", cells: ["Nghiên cứu giá", "Tìm mức giá khách sẵn lòng trả.", "Hỏi mức giá “quá rẻ đến mức nghi ngờ” và “quá đắt”."] },
            { icon: "sigma", highlight: true, cells: ["Ước tính quy mô thị trường", "Ước tính số khách và doanh thu tiềm năng.", "Xem phần Công thức."] },
          ]}
        />
      </Section>

      <Section {...S["vs-ux"]}>
        <Table
          head={["", "Market research", "UX research"]}
          widths={[220]}
          rows={[
            { icon: "target", cells: ["Câu hỏi chính", "Có nên làm không? Ai sẽ mua? Bán được bao nhiêu?", "Người dùng làm gì? Có dùng được không? Vì sao?"] },
            { icon: "users", cells: ["Đối tượng", "Thị trường, khách hàng tiềm năng, đối thủ.", "Người dùng và cách họ tương tác với sản phẩm."] },
            { icon: "list", cells: ["Phương pháp thường dùng", "Khảo sát lớn, dữ liệu thứ cấp, phân tích đối thủ, focus group.", "Phỏng vấn, quan sát, usability test, diary study, analytics."] },
            { icon: "analytics", cells: ["Dữ liệu thường thu", "Thái độ, ý định, số liệu thị trường.", "Hành vi, trải nghiệm, khó khăn."] },
            { icon: "calendar", cells: ["Thời điểm", "Thường trước khi ra mắt hoặc thay đổi lớn.", "Suốt vòng đời sản phẩm."] },
          ]}
        />
        <P>
          Hai loại nghiên cứu có thể dùng chung một số phương pháp (khảo sát, focus group, phỏng vấn) nhưng hỏi những câu hỏi khác nhau. Nhóm hiệu quả thường chia sẻ kết quả giữa hai bên.
        </P>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            ["target", "Bối cảnh phù hợp", ["Trước khi ra mắt sản phẩm hoặc dịch vụ mới.", "Mở rộng sang thị trường, phân khúc mới.", "Thay đổi giá hoặc định vị."]],
            ["eye", "Dấu hiệu nhận biết", ["Nhóm chưa biết ai là khách hàng chính và có bao nhiêu người như vậy.", "Lãnh đạo cần số liệu về cơ hội để quyết định đầu tư."]],
            ["clipboard-check", "Điều kiện cần", ["Câu hỏi kinh doanh rõ.", "Mẫu khảo sát đại diện cho thị trường mục tiêu (với nghiên cứu sơ cấp định lượng)."]],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[360]}
          rows={[
            { icon: "eye", cells: ["Cần biết vì sao người dùng gặp khó trên giao diện", "Market research không quan sát việc sử dụng.", "Usability testing."] },
            { icon: "analytics", cells: ["Cần biết hành vi thật trên sản phẩm", "Dữ liệu chủ yếu là ý định và thái độ.", "Analytics, field study."] },
            { icon: "file", cells: ["Sản phẩm đã có nhiều dữ liệu người dùng", "Dữ liệu nội bộ có thể trả lời nhanh hơn.", "Phân tích dữ liệu hiện có."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định câu hỏi kinh doanh.", "", "Câu hỏi nghiên cứu."],
            ["Tìm dữ liệu thứ cấp trước.", "", "Thông tin đã có, khoảng trống cần nghiên cứu thêm."],
            ["Thiết kế nghiên cứu sơ cấp cho phần còn thiếu.", "", "Bảng hỏi, kế hoạch mẫu."],
            ["Thu thập dữ liệu.", "", "Dữ liệu khảo sát, phỏng vấn."],
            ["Phân tích và ước tính.", "Phân khúc, quy mô, giá.", "Kết quả kèm giả định."],
            ["Chia sẻ với nhóm sản phẩm và UX.", "", "Quyết định kinh doanh, đầu vào cho nghiên cứu UX."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <P>
          Một phép tính phổ biến trong market research là ước tính quy mô thị trường từ trên xuống: đi từ tổng số khách tiềm năng, nhân dần với các tỷ lệ để ra số khách có thể có.
        </P>
        <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật. Dịch vụ tư vấn tài chính gia đình ở một thành phố.</Callout>
        <Subhead icon="users">Bước 1: Số khách quan tâm</Subhead>
        <Formula
          label="Số khách quan tâm"
          formula="Số hộ gia đình trong khu vực × Tỷ lệ quan tâm"
          note="120.000 × 15% = 18.000 hộ. Tỷ lệ quan tâm lấy từ khảo sát; khi báo cáo, ghi kèm khoảng tin cậy của tỷ lệ này."
        />
        <Subhead icon="target">Bước 2: Số khách có thể chọn dịch vụ</Subhead>
        <Formula label="Số khách có thể chọn" formula="Số khách quan tâm × Thị phần dự kiến" note="18.000 × 5% = 900 hộ mỗi năm" />
        <Subhead icon="sigma">Bước 3: Doanh thu tiềm năng</Subhead>
        <Formula label="Doanh thu tiềm năng" formula="Số khách × Giá trung bình" note="900 × 1.500.000 đ = 1.350.000.000 đ mỗi năm" />
        <Funnel />
        <Callout tone="note" title="Lưu ý">
          Mỗi tỷ lệ là một giả định. Khi một giả định thay đổi, kết quả thay đổi theo cùng tỷ lệ: nếu thị phần dự kiến chỉ còn một nửa (2,5%), số khách và doanh thu cũng còn một nửa. Nên
          trình bày thêm phương án thấp và cao, không chỉ một con số.
        </Callout>
        <InfoCard
          tone="fill"
          icon="check-circle"
          title="Quyết định"
          body="Con số ước tính dùng để so sánh với chi phí đầu tư và xem cơ hội có đủ lớn không; nó không phải dự báo chắc chắn."
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["chat", "Ý định khác hành vi", "Người nói “sẽ mua” chưa chắc sẽ mua."],
            ["sigma", "Ước tính quy mô phụ thuộc vào giả định", "Nhân nhiều tỷ lệ với nhau thì sai số cũng tích lũy."],
            ["users", "Mẫu không đại diện", "Cho kết quả sai lệch."],
            ["ban", "Không cho biết sản phẩm có dễ dùng không", "Cần nghiên cứu UX để trả lời."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Câu hỏi kinh doanh.", "Dữ liệu thứ cấp.", "Bảng hỏi, mẫu đại diện cho thị trường mục tiêu."]}
          outputs={["Phân khúc, quy mô thị trường kèm giả định.", "Thông tin đối thủ, giá.", "Quyết định kinh doanh và đầu vào cho nghiên cứu UX."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard icon="component" title="Bối cảnh" body="Dịch vụ tư vấn cân nhắc mở gói “Tài chính gia đình” mới." />
        <InfoCard
          icon="analytics"
          title="Market research (giả định)"
          body="Dữ liệu thống kê về số hộ gia đình; khảo sát 400 người cho tỷ lệ quan tâm 15%; phân tích ba đối thủ cho thấy mức giá phổ biến 1–2 triệu đồng một buổi. Ước tính 900 hộ mỗi năm ở phương án trung bình."
        />
        <InfoCard
          tone="fill"
          icon="link"
          title="Kết nối với UX research"
          body="Market research cho biết có đủ cơ hội và phân khúc nào. Sau đó nhóm UX phỏng vấn gia đình trong phân khúc này để hiểu họ quyết định thế nào (jobs to be done), và test luồng đặt gói mới."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Dùng market research để đánh giá độ dễ dùng", "Không quan sát việc sử dụng.", "Kết hợp usability testing."],
            ["Chỉ đưa một con số quy mô", "Che mất sự không chắc chắn.", "Trình bày phương án thấp, trung bình, cao."],
            ["Coi ý định mua là hành vi mua", "Người ta thường nói sẽ mua nhiều hơn thực tế.", "Kiểm chứng bằng thử nghiệm (ví dụ MVP)."],
            ["Mẫu khảo sát không đại diện", "Kết quả lệch.", "Chọn mẫu theo thị trường mục tiêu."],
            ["Không chia sẻ với nhóm UX", "Hai bên nghiên cứu trùng hoặc mâu thuẫn.", "Chia sẻ kết quả, phối hợp câu hỏi."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Phương pháp", "Câu hỏi", "Khi nào chọn"]}
          widths={[260]}
          rows={[
            { icon: "analytics", highlight: true, cells: ["Market Research", "“Có nên làm, cho ai, bán được không?”", "Quyết định kinh doanh."] },
            { icon: "users", cells: ["UX Research", "“Người dùng dùng thế nào, vì sao?”", "Quyết định thiết kế."] },
            { icon: "clipboard-check", cells: ["Survey", "Công cụ thu dữ liệu, dùng được cho cả hai.", "Cần số liệu từ nhiều người."] },
            { icon: "chat", cells: ["Focus Group", "Công cụ thu ý kiến nhóm, dùng được cho cả hai.", "Khám phá thái độ, ngôn ngữ."] },
            { icon: "briefcase", cells: ["Jobs to be Done", "“Khách thuê sản phẩm để làm gì?”", "Nối giữa câu hỏi thị trường và thiết kế."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn icon="file" title="Chuẩn bị" items={["Câu hỏi kinh doanh rõ.", "Đã tìm dữ liệu thứ cấp trước.", "Mẫu đại diện cho thị trường mục tiêu."]} />
          <ChecklistColumn icon="analytics" title="Kết quả" items={["Ước tính ghi rõ từng giả định.", "Có phương án thấp và cao.", "Kết quả được chia sẻ với nhóm UX."]} />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Survey", "Khảo sát", "Công cụ thu dữ liệu chính."],
            ["Focus Group", "Thảo luận nhóm tập trung", "Công cụ dùng chung với UX research."],
            ["Jobs to be Done (JTBD)", "Công việc cần hoàn thành", "Nối câu hỏi thị trường với thiết kế."],
            ["Minimum Viable Product", "Sản phẩm khả dụng tối thiểu", "Kiểm chứng ý định bằng hành vi thật."],
            ["Attitudinal Methods", "Phương pháp nghiên cứu thái độ", "Phần lớn market research thu thái độ, ý định."],
            ["Confidence Intervals", "Khoảng tin cậy", "Cách đọc tỷ lệ từ khảo sát."],
          ]}
        />
      </Section>
    </div>
  );
}

export const MARKET_RESEARCH: Article = {
  slug: "market-research",
  version: 1,
  term: "Market Research",
  fn: 1,
  vi: "Nghiên cứu thị trường",
  kind: "Phương pháp nghiên cứu / kiểm thử",
  definition:
    "Market research là việc thu thập và phân tích có hệ thống thông tin về thị trường, khách hàng tiềm năng, đối thủ và xu hướng, nhằm hỗ trợ quyết định kinh doanh: có nên làm sản phẩm không, cho ai, định giá thế nào, và quy mô cơ hội lớn đến đâu.",
  definitionMore: "Market research thường nhìn thị trường từ bên ngoài; UX research nhìn trải nghiệm sử dụng từ bên trong.",
  oneLine: "Thu thập thông tin về thị trường, khách hàng và đối thủ để quyết định có nên làm và làm cho ai.",
  glance: [
    ["900", "Hộ mỗi năm trong ví dụ"],
    ["6", "Loại nghiên cứu thị trường"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Marketing research (gần nghĩa, phạm vi rộng hơn)"] },
    { label: "Nhóm chính", items: ["Chiến lược sản phẩm"] },
    { label: "Thẻ phụ", items: ["Đo lường và phân tích"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "Market research và UX research bổ sung cho nhau, không thay thế nhau. Market research trả lời “có nên làm không, cho ai, bán được không”; UX research trả lời “người dùng dùng thế nào, có dùng được không, vì sao”.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
