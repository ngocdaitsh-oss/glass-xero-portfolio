"use client";

import { Blk, T } from "./edit";
import { CheckCards, Formula, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Lean UX — copy from ux-glossary/lean-ux.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "principles", title: "Nguyên tắc chính", icon: "book" },
  { id: "hypothesis", title: "Giả thuyết trong Lean UX", icon: "flask" },
  { id: "loop", title: "Vòng lặp xây dựng – đo lường – học", icon: "rotate" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "limits", title: "Giới hạn: khi nào Lean UX chưa đủ", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các cách tiếp cận gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** Build → Measure → Learn around the hypothesis in the middle. */
function Loop() {
  const nodes: [string, string, number, number][] = [
    ["Xây dựng", "Thử nghiệm nhỏ nhất", 500, 60],
    ["Đo lường", "Dữ liệu từ người dùng", 790, 250],
    ["Học", "Tiếp tục / điều chỉnh / bỏ", 210, 250],
  ];
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="rotate" size={36} iconSize={18} radius={10} />
        <Eyebrow>Vòng lặp xây dựng – đo lường – học</Eyebrow>
      </div>
      <svg viewBox="0 0 1000 320" className="w-full" role="img" aria-label="Xây dựng, đo lường, học, rồi quay lại xây dựng; giả thuyết ở giữa">
        <ellipse cx="500" cy="180" rx="300" ry="110" fill="none" className="stroke-[var(--d-ci)]" strokeWidth="3" strokeDasharray="8 8" />
        <rect x="390" y="152" width="220" height="56" rx="14" className="fill-[var(--d-fill)]" />
        <text x="500" y="187" textAnchor="middle" className="fill-white text-[18px] font-semibold">
          Giả thuyết
        </text>
        {nodes.map(([t, s, x, y]) => (
          <g key={t}>
            <rect x={x - 130} y={y - 40} width="260" height="80" rx="16" className="fill-[var(--d-soft)]" />
            <text x={x} y={y - 6} textAnchor="middle" className="fill-[var(--d-accent)] text-[19px] font-semibold">
              {t}
            </text>
            <text x={x} y={y + 20} textAnchor="middle" className="fill-[var(--w-secondary)] text-[15px]">
              {s}
            </text>
          </g>
        ))}
      </svg>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Một vòng tròn ba bước: Xây dựng → Đo lường → Học, rồi quay lại Xây dựng. Giả thuyết nằm ở giữa vòng.
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
            Theo cách làm truyền thống, nhóm thiết kế làm tài liệu đầy đủ, chuyển cho phát triển, rồi mới biết người dùng có cần không. Nếu ý tưởng sai, nhiều tháng công sức bị lãng phí.
            Nhóm cũng dễ đo thành công bằng “đã giao bao nhiêu tính năng” thay vì “người dùng có làm được điều họ cần không”.
          </P>
          <P strong>Lean UX rút ngắn khoảng cách giữa ý tưởng và bằng chứng: thử nhỏ, học nhanh, điều chỉnh sớm.</P>
        </div>
        <Eyebrow>Lean UX hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          cols={3}
          minH={130}
          items={[
            ["split", "Nên tiếp tục, điều chỉnh hay bỏ", "Một hướng đi."],
            ["flask", "Thử nghiệm nhỏ nhất nào", "Trả lời được câu hỏi."],
            ["gauge", "Kết quả nào", "Là thước đo thành công."],
          ]}
        />
      </Section>

      <Section {...S.principles}>
        <Table
          head={["Nguyên tắc", "Ý nghĩa", "Ví dụ minh họa (giả định)"]}
          widths={[280]}
          rows={[
            {
              icon: "target",
              highlight: true,
              cells: ["Kết quả hơn sản phẩm đầu ra", "Đo thay đổi hành vi, không đo số tính năng.", "Mục tiêu là “khách đặt lịch nhiều hơn”, không phải “làm xong trang mới”."],
            },
            { icon: "users", cells: ["Nhóm liên chức năng", "Thiết kế, phát triển, sản phẩm cùng làm từ đầu.", "Cả nhóm cùng viết giả thuyết."] },
            { icon: "component", cells: ["Lô nhỏ", "Làm và thử từng phần nhỏ.", "Thử một phần nội dung trước khi làm lại cả trang."] },
            { icon: "chat", cells: ["Khám phá liên tục", "Nói chuyện với người dùng đều đặn, không chỉ đầu dự án.", "Mỗi tuần vài buổi trò chuyện ngắn với khách."] },
            { icon: "file", cells: ["Ít tài liệu nặng", "Tài liệu chỉ đủ để cả nhóm hiểu chung.", "Phác thảo trên bảng thay vì đặc tả dài."] },
          ]}
        />
      </Section>

      <Section {...S.hypothesis}>
        <P>
          Lean UX viết ý tưởng thành câu giả thuyết gồm bốn phần: kết quả kinh doanh, người dùng, kết quả cho người dùng, và tính năng. Mẫu câu thường được trình bày trong các bài nói
          của Gothelf và Seiden.
        </P>
        <Formula label="Câu giả thuyết" formula="Chúng tôi tin rằng [kết quả kinh doanh] sẽ đạt được nếu [nhóm người dùng] đạt được [kết quả cho người dùng] nhờ [tính năng]." />
        <Formula
          label="Điều kiện để biết đúng hay sai"
          formula="Chúng tôi sẽ biết mình đúng khi thấy [phản hồi định tính] và/hoặc [số liệu định lượng] và/hoặc [thay đổi chỉ số chính]."
        />
        <Callout tone="scenario" title="Ví dụ (giả định)">
          Chúng tôi tin rằng tỷ lệ đặt lịch sẽ tăng nếu khách lần đầu tự tin về chi phí trước khi đặt nhờ bảng tóm tắt chi phí dễ chia sẻ. Chúng tôi sẽ biết mình đúng khi thấy khách
          nói rõ được chi phí trong buổi test, và tỷ lệ đặt lịch của khách lần đầu tăng.
        </Callout>
      </Section>

      <Section {...S.loop}>
        <Loop />
        <P>
          Thử nghiệm nhỏ nhất có thể là: bản phác thảo giấy, bản mẫu bấm được, trang mô tả tính năng chưa có để đo mức quan tâm, hoặc làm thủ công phía sau thay cho hệ thống tự động.
        </P>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "target",
              "Bối cảnh phù hợp",
              ["Nhiều điều chưa chắc chắn về người dùng hay giải pháp.", "Nhóm làm việc theo chu kỳ ngắn (agile).", "Có thể tiếp cận người dùng và dữ liệu thường xuyên."],
            ],
            ["eye", "Dấu hiệu nhận biết", ["Nhóm tranh luận lâu về ý tưởng mà không có bằng chứng.", "Tính năng ra mắt nhưng không ai dùng."]],
            [
              "clipboard-check",
              "Điều kiện cần",
              ["Nhóm liên chức năng có quyền quyết định.", "Lãnh đạo chấp nhận đo thành công bằng kết quả và chấp nhận một số thử nghiệm thất bại."],
            ],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[360]}
          rows={[
            {
              icon: "shield-alert",
              cells: [
                "Lĩnh vực có rủi ro cao, cần quy trình kiểm duyệt chặt (y tế, an toàn)",
                "Không thể thử nghiệm tự do với người dùng thật.",
                "Thử nghiệm có kiểm soát, quy trình kiểm duyệt.",
              ],
            },
            { icon: "users", cells: ["Không tiếp cận được người dùng", "Không có dữ liệu để học.", "Tìm cách tiếp cận trước."] },
            { icon: "bar-chart", cells: ["Tổ chức chỉ đo bằng số tính năng giao", "Mâu thuẫn với nguyên tắc kết quả.", "Thống nhất thước đo với lãnh đạo trước."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định vấn đề và kết quả mong muốn.", "", "Câu phát biểu vấn đề, chỉ số kết quả."],
            ["Liệt kê giả định.", "Về người dùng, nhu cầu, giải pháp.", "Danh sách giả định, xếp theo rủi ro."],
            ["Viết giả thuyết.", "Cho các giả định rủi ro nhất.", "Câu giả thuyết và điều kiện đúng/sai."],
            ["Thiết kế thử nghiệm nhỏ nhất.", "", "Thử nghiệm và cách đo."],
            ["Chạy và đo.", "", "Dữ liệu định tính, định lượng."],
            ["Học và quyết định.", "Tiếp tục, điều chỉnh hay bỏ.", "Quyết định, giả thuyết tiếp theo."],
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["flask", "Thử nghiệm nhỏ có thể cho kết quả sai", "Nếu không đại diện cho trải nghiệm thật."],
            ["hourglass", "Dễ chỉ tối ưu ngắn hạn", "Thiếu tầm nhìn dài hạn."],
            ["file", "“Ít tài liệu” không có nghĩa là không có tài liệu", "Thiếu ghi chép khiến nhóm quên đã học gì."],
            ["users", "Đòi hỏi thay đổi văn hóa tổ chức", "Không chỉ thay đổi quy trình của nhóm thiết kế."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Vấn đề và kết quả mong muốn.", "Nhóm liên chức năng.", "Cách tiếp cận người dùng và dữ liệu."]}
          outputs={["Giả thuyết đã kiểm chứng hoặc bác bỏ.", "Bài học ghi lại.", "Quyết định về hướng đi tiếp theo."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard icon="calendar" title="Bối cảnh" body="Nhóm định làm lại toàn bộ trang dịch vụ, ước tính mất hai tháng." />
        <Table
          head={["Bước", "Nội dung"]}
          widths={[280]}
          rows={[
            { icon: "alert", cells: ["Giả định rủi ro nhất", "Khách bỏ vì không rõ chi phí."] },
            { icon: "flask", cells: ["Giả thuyết", "Như ví dụ ở phần Giả thuyết."] },
            {
              icon: "component",
              highlight: true,
              cells: [
                "Thử nghiệm nhỏ nhất",
                "Thêm một bảng tóm tắt chi phí dạng văn bản vào trang hiện tại, kèm nút chia sẻ; chạy A/B test hai tuần; song song phỏng vấn ngắn 5 khách.",
              ],
            },
          ]}
        />
        <InfoCard
          icon="lightbulb"
          title="Học (giả định)"
          body="Khách trong phỏng vấn nói rõ được chi phí; tỷ lệ đặt lịch ở nhóm có bảng tóm tắt cao hơn, với khoảng tin cậy nằm trên 0."
        />
        <InfoCard
          tone="fill"
          icon="check-circle"
          title="Quyết định"
          body="Tiếp tục hướng này; giả thuyết tiếp theo là về bước chọn giờ. Thay vì làm lại toàn bộ trang trong hai tháng, nhóm cải thiện từng phần theo bằng chứng."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Coi Lean UX là “làm nhanh, bỏ nghiên cứu”", "Mất phần học, chỉ còn làm nhanh.", "Mỗi vòng phải có đo lường và học."],
            ["Giả thuyết không có điều kiện đúng/sai", "Không biết khi nào đã học được gì.", "Luôn viết điều kiện kiểm chứng."],
            ["Thử nghiệm quá lớn", "Mất lợi thế học nhanh.", "Tìm thử nghiệm nhỏ nhất trả lời được câu hỏi."],
            ["Chỉ nhóm thiết kế làm", "Mất tính liên chức năng.", "Cả nhóm cùng viết giả thuyết, cùng xem kết quả."],
            ["Không ghi lại bài học", "Lặp lại sai lầm.", "Ghi lại giả thuyết, kết quả, quyết định."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Cách tiếp cận", "Trọng tâm", "Khi nào chọn"]}
          widths={[260]}
          rows={[
            { icon: "flask", highlight: true, cells: ["Lean UX", "Giả thuyết, thử nghiệm nhỏ, đo kết quả, làm liên tục.", "Nhóm agile, nhiều điều chưa chắc chắn."] },
            { icon: "lightbulb", cells: ["Design Thinking", "Thấu cảm, xác định vấn đề, tạo ý tưởng, thử nghiệm.", "Khám phá vấn đề mới."] },
            { icon: "calendar", cells: ["Design Sprint", "Quy trình năm ngày cho một câu hỏi lớn.", "Cần trả lời nhanh một câu hỏi quan trọng."] },
            { icon: "rotate", cells: ["Agile", "Cách phát triển phần mềm theo chu kỳ ngắn.", "Lean UX đưa thiết kế vào trong cách làm agile."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="flask"
            title="Giả thuyết"
            items={[
              "Thành công đo bằng kết quả, không bằng số tính năng.",
              "Giả định được liệt kê và xếp theo rủi ro.",
              "Giả thuyết có đủ bốn phần và điều kiện đúng/sai.",
            ]}
          />
          <ChecklistColumn
            icon="rotate"
            title="Thử nghiệm và học"
            items={["Thử nghiệm là nhỏ nhất trả lời được câu hỏi.", "Cả nhóm liên chức năng tham gia.", "Bài học và quyết định được ghi lại."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Design Thinking", "Tư duy thiết kế", "Cách tiếp cận gần, nhấn mạnh thấu cảm."],
            ["Design Sprint", "Thiết kế nước rút", "Quy trình ngắn có cấu trúc để kiểm chứng ý tưởng."],
            ["A/B Testing", "Kiểm thử A/B", "Một cách đo kết quả của giả thuyết."],
            ["Minimum Viable Product (MVP)", "Sản phẩm khả dụng tối thiểu", "Dạng thử nghiệm nhỏ nhất để kiểm chứng giả thuyết."],
            ["Low-Fidelity Prototype", "Bản mẫu độ trung thực thấp", "Thử nghiệm nhỏ nhất phổ biến."],
            ["Customer Feedback Loop", "Vòng phản hồi khách hàng", "Học liên tục từ khách hàng."],
            ["Jobs to be Done (JTBD)", "Công việc cần hoàn thành", "Nguồn cho kết quả mong muốn của người dùng."],
          ]}
        />
      </Section>
    </div>
  );
}

export const LEAN_UX: Article = {
  slug: "lean-ux",
  version: 1,
  term: "Lean UX",
  fn: 3,
  vi: "UX tinh gọn",
  kind: "Quy trình / cách tiếp cận",
  definition:
    "Lean UX là cách tiếp cận thiết kế, trong đó nhóm liên chức năng coi mỗi ý tưởng là một giả thuyết, kiểm chứng nó nhanh bằng thử nghiệm nhỏ với người dùng thật, rồi học từ kết quả để quyết định bước tiếp theo.",
  definitionMore: "Thành công được đo bằng kết quả (thay đổi hành vi người dùng), không bằng số tính năng hay tài liệu đã giao.",
  oneLine: "Coi ý tưởng là giả thuyết, kiểm chứng nhanh với người dùng, đo thành công bằng kết quả.",
  glance: [
    ["4", "Phần của câu giả thuyết"],
    ["3", "Bước: xây dựng, đo lường, học"],
  ],
  facts: [
    { label: "Nhóm chính", items: ["Quy trình"] },
    { label: "Thẻ phụ", items: ["Chiến lược sản phẩm"] },
    {
      label: "Lưu ý tên gọi",
      items: ["Lean UX là cách làm việc của nhóm, không phải một phương pháp nghiên cứu hay một tài liệu. Trọng tâm là học nhanh qua giả thuyết và thử nghiệm."],
    },
  ],
  sections: SECTIONS,
  Body,
};
