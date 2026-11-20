"use client";

import { Blk, T } from "./edit";
import { CheckCards, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Synthetic User — copy from ux-glossary/synthetic-user.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết (và vấn đề tạo ra)", icon: "target" },
  { id: "limits-main", title: "Giới hạn chính", icon: "alert" },
  { id: "when", title: "Khi nào có thể dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào không nên dùng", icon: "ban" },
  { id: "apply", title: "Cách áp dụng có trách nhiệm", icon: "list" },
  { id: "limits", title: "Giới hạn: vì sao không thay thế được người thật", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** What the AI predicted vs. what 8 real owners said: the main worry did not match. */
function AiVsReal() {
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="split" size={36} iconSize={18} radius={10} />
        <Eyebrow>Mối lo chính: AI gợi ý và người thật nói</Eyebrow>
      </div>
      <div className="flex items-stretch gap-4">
        <div className="flex flex-1 flex-col gap-3 rounded-2xl bg-[var(--d-well)] p-6">
          <span className="font-mono text-[13px] tracking-[1px] text-[var(--w-muted)] uppercase">Synthetic user</span>
          <span className="text-[16px] leading-6 font-semibold">“Thiếu thời gian”</span>
          <span className="text-[15px] leading-[22px] text-[var(--w-secondary)]">Dùng làm danh sách chủ đề để hỏi, không phải kết quả.</span>
        </div>
        <span className="flex items-center font-mono text-[22px] text-[var(--d-bad)]">≠</span>
        <div className="flex flex-1 flex-col gap-3 rounded-2xl bg-[var(--d-fill)] p-6 text-white">
          <span className="font-mono text-[13px] tracking-[1px] text-white/80 uppercase">8 chủ doanh nghiệp thật</span>
          <span className="text-[16px] leading-6 font-semibold">“Dòng tiền không đều”</span>
          <span className="text-[16px] leading-6 font-semibold">“Ngại chia sẻ số liệu với người lạ”</span>
          <span className="text-[15px] leading-[22px] text-white/85">Hai điều AI không nhắc tới.</span>
        </div>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Báo cáo chỉ dùng kết quả từ người thật; ghi chú rằng danh sách chủ đề ban đầu được gợi ý bởi AI.
      </T>
    </Blk>
  );
}

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Section {...S.problem}>
        <div className="flex flex-col gap-5">
          <P>Nghiên cứu người dùng tốn thời gian: tuyển người, sắp lịch, phỏng vấn, phân tích. Synthetic user hứa hẹn câu trả lời ngay lập tức, không tốn chi phí tuyển người.</P>
          <P strong>
            Nhưng câu trả lời đó được tạo từ mô hình ngôn ngữ, không từ trải nghiệm của ai cả. Nếu dùng sai, nhóm có thể ra quyết định dựa trên những điều nghe hợp lý nhưng không có thật.
          </P>
        </div>
        <div className="flex items-start gap-4">
          <CheckCards
            groups={[
              [
                "check-circle",
                "Synthetic user có thể hỗ trợ",
                ["Chuẩn bị: tìm hiểu nhanh một lĩnh vực mới, chuẩn bị câu hỏi.", "Thử kịch bản phỏng vấn trước khi gặp người thật.", "Tạo giả thuyết để kiểm chứng sau."],
              ],
              ["ban", "Synthetic user không thay được", ["Hành vi thật, bối cảnh thật, cảm xúc thật.", "Quyết định cuối cùng về thiết kế."]],
            ]}
          />
        </div>
      </Section>

      <Section {...S["limits-main"]}>
        <P>Theo NN/g:</P>
        <Table
          head={["Giới hạn", "Diễn giải", "Ví dụ minh họa (giả định)"]}
          widths={[260]}
          rows={[
            { icon: "check", cells: ["Quá dễ đồng ý", "AI có xu hướng đồng tình, khen ý tưởng.", "“Người dùng tổng hợp” nói sẽ chắc chắn dùng tính năng mới."] },
            { icon: "eye", cells: ["Hình dung hành vi không thực tế", "Mô tả cách dùng lý tưởng, không giống đời thật.", "Nói sẽ đọc kỹ mọi thông tin trước khi đặt lịch."] },
            { icon: "list", cells: ["Nông về thứ tự ưu tiên", "Mọi thứ đều “quan trọng”.", "Không phân biệt được giá quan trọng hơn hay chuyên gia quan trọng hơn."] },
            { icon: "book", cells: ["Trải nghiệm quá khứ không đáng tin", "Kể lại câu chuyện chưa từng xảy ra.", "“Lần trước tôi đặt lịch ở nơi khác và…” (bịa)."] },
            { icon: "analytics", cells: ["Không có dữ liệu hành vi", "Không quan sát được gì.", "Không thể chỉ ra người dùng do dự ở nút nào."] },
          ]}
        />
        <Callout tone="note">NN/g cũng khuyên tránh dùng với nhóm người dùng đặc thù, ít phổ biến, vì AI càng ít dữ liệu về họ.</Callout>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "target",
              "Bối cảnh phù hợp (theo NN/g)",
              [
                "Tìm hiểu ban đầu về một lĩnh vực mới, như một dạng nghiên cứu tài liệu.",
                "Chuẩn bị cho nghiên cứu thật: gợi ý câu hỏi, chủ đề cần hỏi.",
                "Thử nghiệm kịch bản phỏng vấn (pilot) trước khi gặp người thật.",
                "Tạo giả thuyết để kiểm chứng bằng người thật.",
              ],
            ],
            ["clipboard-check", "Điều kiện cần", ["Nhóm hiểu rõ đây là đầu ra của AI.", "Có kế hoạch nghiên cứu với người thật."]],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao không nên", "Thay bằng"]}
          widths={[340]}
          rows={[
            { icon: "target", cells: ["Ra quyết định thiết kế cuối cùng", "Không có bằng chứng từ người thật.", "Nghiên cứu với người dùng thật."] },
            { icon: "eye", cells: ["Đánh giá độ dễ dùng", "Không có hành vi thật.", "Usability testing."] },
            { icon: "users", cells: ["Nhóm người dùng đặc thù", "AI ít dữ liệu, dễ khuôn mẫu.", "Tuyển người thật (có thể qua snowball sampling)."] },
            { icon: "alert", cells: ["Báo cáo cho lãnh đạo như “nghiên cứu”", "Gây hiểu lầm nghiêm trọng.", "Ghi rõ nguồn, hoặc không đưa vào báo cáo."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định mục đích chuẩn bị, không phải kết luận.", "", "Mục đích dùng rõ ràng."],
            ["Dùng để tạo câu hỏi và giả thuyết.", "", "Danh sách câu hỏi, giả thuyết."],
            ["Ghi rõ nguồn là AI trong mọi tài liệu.", "", "Tài liệu minh bạch."],
            ["Kiểm chứng với người thật.", "", "Kết quả nghiên cứu thật."],
            ["So sánh điều AI nói với điều người thật nói, để biết AI sai ở đâu.", "", "Bài học về giới hạn của công cụ."],
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["ban", "Không có trải nghiệm", "Câu trả lời là văn bản có khả năng xảy ra cao, không phải ký ức hay cảm xúc thật."],
            ["rotate", "Có thể lặp lại khuôn mẫu", "Có trong dữ liệu huấn luyện."],
            ["target", "Không có bối cảnh riêng của người dùng của bạn", "Thói quen địa phương, sản phẩm của bạn, đối thủ của bạn."],
            ["alert", "Tạo cảm giác chắc chắn giả", "Câu trả lời trôi chảy khiến nhóm tin hơn mức nên tin."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Mục đích chuẩn bị rõ ràng.", "Mô tả nhóm người dùng (để AI mô phỏng).", "Kế hoạch nghiên cứu với người thật."]}
          outputs={["Câu hỏi, giả thuyết, kịch bản đã thử.", "Không có “kết quả nghiên cứu”."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard
          icon="component"
          title="Bối cảnh"
          body="Dịch vụ muốn tìm hiểu nhóm chủ doanh nghiệp rất nhỏ, một nhóm chưa nghiên cứu bao giờ. Tuyển người dự kiến mất vài tuần."
        />
        <InfoCard
          icon="lightbulb"
          title="Dùng synthetic user để chuẩn bị"
          body="Hỏi AI về những mối lo thường gặp của chủ doanh nghiệp nhỏ khi tìm tư vấn tài chính → danh sách chủ đề để hỏi trong phỏng vấn; thử kịch bản phỏng vấn để thấy câu nào mơ hồ."
        />
        <InfoCard
          icon="users"
          title="Kiểm chứng"
          body="Phỏng vấn 8 chủ doanh nghiệp thật (tuyển qua snowball sampling). AI liệt kê “thiếu thời gian” là mối lo chính; người thật nói nhiều nhất về dòng tiền không đều và ngại chia sẻ số liệu với người lạ, điều AI không nhắc tới."
        />
        <AiVsReal />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Trình bày như nghiên cứu người dùng", "Gây hiểu lầm, quyết định sai.", "Ghi rõ nguồn là AI; không gọi là nghiên cứu."],
            ["Dùng để bỏ qua nghiên cứu thật", "Không có bằng chứng thật.", "Luôn kiểm chứng với người thật."],
            ["Tin câu trả lời vì nghe hợp lý", "Trôi chảy không đồng nghĩa với đúng.", "So với dữ liệu thật."],
            ["Dùng cho nhóm đặc thù", "AI ít dữ liệu, dễ khuôn mẫu.", "Tuyển người thật."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Dựa trên", "Vai trò"]}
          widths={[300]}
          rows={[
            { icon: "lightbulb", highlight: true, cells: ["Synthetic User", "Mô hình AI, không dựa trên người dùng của bạn.", "Chuẩn bị, tạo giả thuyết."] },
            { icon: "users", cells: ["User Persona", "Nghiên cứu với người dùng thật, tổng hợp lại.", "Tham chiếu chung về người dùng."] },
            { icon: "pencil", cells: ["Proto-persona", "Giả định của nhóm, ghi rõ là giả định.", "Điểm bắt đầu cần kiểm chứng."] },
            { icon: "book", cells: ["Desk research (nghiên cứu tài liệu)", "Tài liệu, báo cáo có sẵn.", "Hiểu bối cảnh trước khi nghiên cứu."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn icon="file" title="Khi dùng" items={["Mục đích là chuẩn bị, không phải kết luận.", "Mọi tài liệu ghi rõ nguồn là AI.", "Có kế hoạch nghiên cứu với người thật."]} />
          <ChecklistColumn
            icon="shield-alert"
            title="Giới hạn"
            items={["Không dùng cho nhóm người dùng đặc thù.", "Quyết định thiết kế chỉ dựa trên bằng chứng từ người thật."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["User Persona", "Chân dung người dùng", "Dựa trên người thật, khác synthetic user."],
            ["Qualitative Research", "Nghiên cứu định tính", "Nghiên cứu thật để kiểm chứng."],
            ["Snowball Sampling", "Chọn mẫu quả cầu tuyết", "Cách tuyển người thật khó tiếp cận."],
            ["Empathy Mapping", "Bản đồ thấu cảm", "Cần dữ liệu thật, không phải từ AI."],
            ["Research Operations", "Vận hành nghiên cứu", "Quy định cách dùng công cụ AI trong nghiên cứu."],
            ["Wizard of Oz", "Phương pháp “phù thủy xứ Oz”", "Ngược vai: người thật đóng vai hệ thống."],
          ]}
        />
      </Section>
    </div>
  );
}

export const SYNTHETIC_USER: Article = {
  slug: "synthetic-user",
  version: 1,
  term: "Synthetic User",
  fn: 1,
  vi: "Người dùng tổng hợp",
  kind: "Nguyên tắc / khái niệm",
  definition:
    "Synthetic user là một hồ sơ do trí tuệ nhân tạo tạo ra, mô phỏng một nhóm người dùng, và đưa ra “câu trả lời” hay “phát hiện” mà không cần nghiên cứu người dùng thật.",
  definitionMore: "Theo NN/g, synthetic user có thể hỗ trợ một số việc chuẩn bị, nhưng chỉ nên bổ sung, không thay thế nghiên cứu với người thật.",
  oneLine: "Hồ sơ người dùng do AI tạo ra để mô phỏng câu trả lời; không thay thế người dùng thật.",
  glance: [
    ["5", "Giới hạn chính theo NN/g"],
    ["8", "Người thật để kiểm chứng trong ví dụ"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["AI-generated user", "AI persona"] },
    { label: "Nhóm chính", items: ["Nghiên cứu khám phá"] },
    { label: "Thẻ phụ", items: ["Nền tảng và nguyên tắc"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "Synthetic user là hồ sơ do AI tạo ra để mô phỏng một nhóm người dùng, và “trả lời” như người dùng. Đây không phải nghiên cứu người dùng thật. NN/g nhấn mạnh không bao giờ trình bày kết quả từ synthetic user như nghiên cứu thật.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
