"use client";

import { Blk, T } from "./edit";
import { CheckCards, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, P, Section, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Prototype — copy from ux-glossary/prototype.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "questions", title: "Prototype để trả lời câu hỏi gì", icon: "list-search" },
  { id: "spectrum", title: "Phổ độ trung thực", icon: "component" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

const STOPS: [string, string][] = [
  ["Phác thảo giấy", "“Hướng nào?”"],
  ["Khung xám", "“Luồng?”"],
  ["Wireframe bấm được", "“Cấu trúc?”"],
  ["Bản mẫu hoàn chỉnh", "“Chi tiết có rõ?”"],
];

/** Low → high fidelity: each stop answers a narrower question at a higher cost. */
function Spectrum() {
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="component" size={36} iconSize={18} radius={10} />
        <Eyebrow>Từ thấp đến cao: câu hỏi chuyển từ hướng đi sang chi tiết</Eyebrow>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {STOPS.map(([name, q], i) => (
          <div
            key={name}
            className="flex flex-col gap-2 rounded-2xl p-5"
            style={{ background: `color-mix(in srgb, var(--d-ci) ${18 + i * 27}%, var(--d-well))`, color: i >= 2 ? "white" : undefined }}
          >
            <span className="text-[16px] leading-6 font-semibold">{name}</span>
            <span className={`text-[15px] leading-[22px] ${i >= 2 ? "text-white/85" : "text-[var(--w-secondary)]"}`}>{q}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 font-mono text-[14px] text-[var(--w-muted)]">
        <span>Thấp</span>
        <span className="h-0.5 flex-1 rounded-full bg-[var(--d-ci-weak)]" />
        <span>chi phí, thời gian tăng dần →</span>
        <span className="h-0.5 flex-1 rounded-full bg-[var(--d-ci)]" />
        <span>Cao</span>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Độ trung thực có nhiều chiều (tương tác, hình ảnh, nội dung); một prototype có thể cao ở chiều này và thấp ở chiều khác.
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
            Thảo luận về một thiết kế bằng lời hoặc bằng tài liệu mô tả dễ dẫn tới hiểu lầm: mỗi người hình dung một kiểu. Xây sản phẩm thật để kiểm tra thì tốn kém.
          </P>
          <P strong>Prototype biến ý tưởng thành thứ có thể thấy và thử, với chi phí thấp hơn nhiều so với xây thật, để nhóm học sớm và sửa sớm.</P>
        </div>
        <Eyebrow>Prototype hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          minH={150}
          items={[
            ["lightbulb", "Ý tưởng có đáng làm tiếp không", "Kiểm tra sớm, trước khi đầu tư."],
            ["arrows", "Luồng và cấu trúc có hợp lý không", "Thử trên bản mẫu thay vì bàn bằng lời."],
            ["play-circle", "Chi tiết tương tác có rõ không", "Kiểm tra trước khi phát triển."],
            ["users", "Các bên có cùng hiểu thiết kế không", "Mọi người cùng thấy một thứ."],
          ]}
        />
      </Section>

      <Section {...S.questions}>
        <P>Houde và Hill đề xuất nhìn prototype theo câu hỏi nó cần trả lời, thay vì theo công cụ làm ra nó:</P>
        <Table
          head={["Câu hỏi", "Prototype kiểm tra", "Ví dụ minh họa (giả định)"]}
          widths={[260]}
          rows={[
            { icon: "users", cells: ["Vai trò (role)", "Sản phẩm có ích gì trong cuộc sống người dùng?", "Storyboard khách dùng dịch vụ tư vấn từ lúc tìm hiểu đến sau tư vấn."] },
            { icon: "eye", cells: ["Hình thức và cảm giác (look and feel)", "Người dùng thấy, nghe, cảm nhận thế nào khi dùng?", "Bản mẫu bấm được của trang đặt lịch với hình ảnh hoàn chỉnh."] },
            { icon: "component", cells: ["Cách thực hiện (implementation)", "Có xây được về mặt kỹ thuật không?", "Bản thử kết nối lịch của chuyên gia với hệ thống đặt lịch."] },
          ]}
        />
        <P>Xác định câu hỏi trước giúp chọn đúng loại và mức độ prototype.</P>
      </Section>

      <Section {...S.spectrum}>
        <Spectrum />
        <Table
          head={["", "Low-fidelity", "High-fidelity"]}
          widths={[220]}
          rows={[
            { icon: "list-search", cells: ["Câu hỏi phù hợp", "Hướng đi, cấu trúc, luồng.", "Chi tiết tương tác, hình ảnh, cảm nhận."] },
            { icon: "gauge", cells: ["Chi phí", "Thấp, nhanh.", "Cao hơn, lâu hơn."] },
            { icon: "rotate", cells: ["Thay đổi", "Dễ, ngay trong buổi test.", "Khó hơn."] },
            { icon: "book", cells: ["Chi tiết", "Xem bài Low-Fidelity Prototype.", "Xem bài High-Fidelity Prototype."] },
          ]}
        />
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            ["target", "Bối cảnh phù hợp", ["Sau ideation, cần kiểm tra ý tưởng.", "Trước khi phát triển, cần kiểm tra luồng và chi tiết.", "Cần thống nhất hiểu biết giữa các bên."]],
            ["eye", "Dấu hiệu nhận biết", ["Nhóm tranh luận về thiết kế dựa trên mô tả bằng lời.", "Có câu hỏi về người dùng mà chỉ thử mới trả lời được."]],
            ["clipboard-check", "Điều kiện cần", ["Câu hỏi rõ ràng mà prototype cần trả lời.", "Kế hoạch kiểm tra (với người dùng hoặc nội bộ)."]],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[340]}
          rows={[
            { icon: "lightbulb", cells: ["Chưa hiểu vấn đề", "Prototype giải pháp cho vấn đề chưa rõ.", "Nghiên cứu khám phá."] },
            { icon: "analytics", cells: ["Cần biết thị trường có cần không", "Prototype không đo hành vi mua thật.", "MVP."] },
            { icon: "gauge", cells: ["Cần đo hiệu năng, dữ liệu thật", "Prototype không có hệ thống thật.", "Bản thử nghiệm trên sản phẩm thật."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định câu hỏi.", "Vai trò, hình thức, hay cách thực hiện.", "Câu hỏi prototype cần trả lời."],
            ["Chọn mức độ trung thực thấp nhất trả lời được câu hỏi.", "", "Loại prototype."],
            ["Làm prototype.", "Chỉ phần cần thiết cho câu hỏi.", "Prototype."],
            ["Kiểm tra.", "Với người dùng (usability test) hoặc nội bộ (heuristic evaluation).", "Nhận định."],
            ["Sửa, lặp lại, tăng độ trung thực khi cần.", "", "Thiết kế đã kiểm chứng, sẵn sàng phát triển."],
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          cols={3}
          items={[
            ["ban", "Prototype không phải sản phẩm", "Kết quả cho biết người dùng phản ứng với bản mẫu, không chắc giống hệt sản phẩm thật."],
            ["arrows", "Đường đi bị giới hạn", "Trong phần đã dựng."],
            ["chat", "Độ trung thực ảnh hưởng phản hồi", "Bản thấp khiến người dùng tưởng tượng nhiều; bản cao khiến họ ngại góp ý lớn."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Câu hỏi cần trả lời.", "Ý tưởng, luồng, nội dung.", "Công cụ phù hợp với mức độ trung thực."]}
          outputs={["Prototype.", "Nhận định từ kiểm tra.", "Thiết kế đã điều chỉnh."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <Eyebrow>Hành trình prototype của tính năng “tóm tắt chi phí dễ chia sẻ”</Eyebrow>
        <Table
          head={["Giai đoạn", "Câu hỏi", "Prototype", "Kết quả"]}
          widths={[140]}
          rows={[
            { cells: ["1", "Khách có hiểu và muốn chia sẻ không?", "Phác thảo giấy ba phương án.", "Chọn bảng “bạn sẽ nhận được gì”."] },
            { cells: ["2", "Luồng chia sẻ có hợp lý không?", "Wireframe bấm được.", "Đưa nút chia sẻ lên cạnh bảng giá."] },
            { cells: ["3", "Chi tiết có rõ, cảm giác có tin cậy không?", "Bản mẫu hoàn chỉnh.", "Chỉnh chữ và cách trình bày chi phí."] },
            { highlight: true, cells: ["4", "Có cải thiện hành vi thật không?", "(Chuyển sang A/B test trên sản phẩm thật.)", "—"] },
          ]}
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Làm prototype không có câu hỏi", "Không biết đã học được gì.", "Xác định câu hỏi trước."],
            ["Độ trung thực quá cao quá sớm", "Tốn công, khó bỏ.", "Chọn mức thấp nhất trả lời được câu hỏi."],
            ["Coi prototype là sản phẩm gần xong", "Người liên quan kỳ vọng sai.", "Nói rõ mục đích và phạm vi."],
            ["Nhầm prototype với MVP", "Hai thứ trả lời hai câu hỏi khác nhau.", "Dùng đúng thứ cho đúng câu hỏi."],
            ["Không kiểm tra với người dùng", "Chỉ phản ánh ý kiến nhóm.", "Lên kế hoạch test."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Quan hệ với prototype"]}
          widths={[300]}
          rows={[
            { icon: "pencil", cells: ["Low-Fidelity Prototype", "Prototype ở mức độ trung thực thấp."] },
            { icon: "play-circle", cells: ["High-Fidelity Prototype", "Prototype ở mức độ trung thực cao."] },
            { icon: "component", cells: ["Wireframe", "Bố cục trang, thường tĩnh; có thể nối lại thành prototype."] },
            { icon: "eye", cells: ["Mockup", "Hình ảnh giao diện tĩnh, độ trung thực hình ảnh cao."] },
            { icon: "target", cells: ["MVP", "Phiên bản đưa ra thị trường để học bằng hành vi thật."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Trước khi làm"
            items={["Có câu hỏi rõ ràng prototype cần trả lời.", "Chọn mức độ trung thực thấp nhất đủ để trả lời.", "Chỉ làm phần cần cho câu hỏi."]}
          />
          <ChecklistColumn icon="clipboard-check" title="Kiểm tra" items={["Có kế hoạch kiểm tra.", "Nói rõ phạm vi với người liên quan."]} />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Low-Fidelity Prototype", "Bản mẫu độ trung thực thấp", "Mức độ thấp, kiểm tra hướng đi."],
            ["High-Fidelity Prototype", "Bản mẫu độ trung thực cao", "Mức độ cao, kiểm tra chi tiết."],
            ["Minimum Viable Product", "Sản phẩm khả dụng tối thiểu", "Khác mục đích: học về thị trường."],
            ["Ideation", "Tạo ý tưởng", "Nguồn ý tưởng để làm prototype."],
            ["Moderated Testing", "Kiểm thử có người điều phối", "Cách kiểm tra prototype với người dùng."],
            ["Design Sprint", "Thiết kế nước rút", "Có một ngày để làm prototype."],
            ["Wireframe", "Khung dây", "Bản phác bố cục tĩnh trước khi làm prototype."],
            ["Wizard of Oz", "Phương pháp “phù thủy xứ Oz”", "Người thật đóng vai hệ thống sau prototype."],
          ]}
        />
      </Section>
    </div>
  );
}

export const PROTOTYPE: Article = {
  slug: "prototype",
  version: 1,
  term: "Prototype",
  fn: 3,
  vi: "Bản mẫu",
  kind: "Tài liệu / sơ đồ thiết kế",
  definition:
    "Prototype là phiên bản thử của một thiết kế, được làm ra để kiểm tra ý tưởng, luồng hoặc chi tiết với người dùng và nhóm trước khi xây sản phẩm thật.",
  definitionMore:
    "Prototype có thể là vài tờ giấy vẽ tay hoặc một bản bấm được trông như sản phẩm cuối; mức độ giống sản phẩm thật gọi là độ trung thực (fidelity).",
  oneLine: "Phiên bản thử của thiết kế để kiểm tra ý tưởng và chi tiết trước khi xây thật.",
  glance: [
    ["3", "Câu hỏi theo Houde và Hill"],
    ["4", "Giai đoạn trong ví dụ"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Mẫu thử"] },
    { label: "Nhóm chính", items: ["Thiết kế và tạo mẫu"] },
    { label: "Thẻ phụ", items: ["Kiểm thử và đánh giá"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "Bài này là khái niệm chung. Hai mức độ cụ thể có bài riêng: Low-Fidelity Prototype và High-Fidelity Prototype. Prototype khác MVP: prototype dùng để kiểm tra thiết kế, MVP dùng để học về thị trường bằng hành vi thật.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
