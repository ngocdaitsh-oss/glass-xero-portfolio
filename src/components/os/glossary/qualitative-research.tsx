"use client";

import { Fragment } from "react";
import { Blk, T } from "./edit";
import { CheckCards, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Qualitative Research — copy from ux-glossary/qualitative-research.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "traits", title: "Đặc điểm của nghiên cứu định tính", icon: "component" },
  { id: "methods", title: "Các phương pháp định tính phổ biến", icon: "list" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "apply", title: "Cách áp dụng", icon: "list-search" },
  { id: "limits", title: "Giới hạn: khi nào định tính chưa đủ", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt định tính và định lượng", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** Six participants: 4 wanted to ask family first, 2 could not see the confirm button. */
const PEOPLE = ["family", "family", "family", "family", "button", "button"] as const;

/** Quant shows where, qual explains why, quant measures the fix. */
function QuantQualLoop() {
  const steps: [string, string, string, boolean][] = [
    ["Định lượng", "Ở đâu, bao nhiêu", "Analytics: 40% khách bỏ ở bước xác nhận.", false],
    ["Định tính", "Vì sao", "Usability test 6 khách.", true],
    ["Định lượng", "Sửa có tác dụng không", "A/B test đo tác động của giải pháp.", false],
  ];
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="rotate" size={36} iconSize={18} radius={10} />
        <Eyebrow>Định lượng cho biết ở đâu, định tính cho biết vì sao</Eyebrow>
      </div>
      <div className="flex items-stretch gap-3">
        {steps.map(([kind, q, body, qual], i) => (
          <Fragment key={i}>
            {i > 0 && <span className="flex items-center font-mono text-[22px] text-[var(--w-muted)]">→</span>}
            <div className={`flex flex-1 flex-col gap-2 rounded-2xl p-6 ${qual ? "bg-[var(--d-ci)] text-white" : "bg-[var(--d-well)]"}`}>
              <span className={`font-mono text-[13px] tracking-[1px] uppercase ${qual ? "text-white/80" : "text-[var(--w-muted)]"}`}>{kind}</span>
              <span className="text-[16px] leading-6 font-semibold">{q}</span>
              <span className={`text-[15px] leading-[22px] ${qual ? "text-white/85" : "text-[var(--w-secondary)]"}`}>{body}</span>
              {qual && (
                <div className="mt-2 flex flex-col gap-2">
                  <div className="flex gap-1.5">
                    {PEOPLE.map((p, k) => (
                      <span key={k} className={`size-5 rounded-full ${p === "family" ? "bg-white" : "bg-white/40"}`} />
                    ))}
                  </div>
                  <span className="text-[14px] leading-5 text-white/85">4 muốn hỏi người thân · 2 không thấy nút</span>
                </div>
              )}
            </div>
          </Fragment>
        ))}
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Kết quả định tính là hai giả thuyết về nguyên nhân, không phải tỷ lệ: 6 người không đủ để nói “67% khách cần hỏi người thân”.
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
            Số liệu cho biết 40% người dùng bỏ ở bước thanh toán, nhưng không cho biết vì sao. Không biết vì sao thì không biết sửa gì: nút khó thấy, giá bất ngờ, hay người dùng cần hỏi ý kiến
            người thân trước?
          </P>
          <P strong>Nghiên cứu định tính đi vào chiều sâu: quan sát người dùng làm, nghe họ giải thích, để hiểu nguyên nhân và tìm hướng sửa.</P>
        </div>
        <Eyebrow>Nghiên cứu định tính hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          cols={3}
          minH={150}
          items={[
            ["alert", "Vấn đề là gì", "Và vì sao xảy ra."],
            ["users", "Người dùng cần gì", "Và nghĩ thế nào."],
            ["pencil", "Thiết kế nên sửa theo hướng nào", "Dựa trên nguyên nhân đã hiểu."],
          ]}
        />
      </Section>

      <Section {...S.traits}>
        <Table
          head={["Đặc điểm", "Mô tả", "Ví dụ minh họa (giả định)"]}
          widths={[260]}
          rows={[
            { icon: "eye", cells: ["Thu trực tiếp", "Quan sát, nghe người dùng.", "Ngồi cạnh khách khi họ đặt lịch."] },
            { icon: "chat", cells: ["Câu hỏi mở", "Không định trước câu trả lời.", "“Bạn đang nghĩ gì khi dừng ở đây?”"] },
            { icon: "users", highlight: true, cells: ["Ít người, nhiều chiều sâu", "Theo NN/g, usability test định tính thường dùng khoảng 5–8 người.", "6 buổi phỏng vấn, mỗi buổi 45 phút."] },
            { icon: "component", cells: ["Phân tích bằng diễn giải", "Gom chủ đề, tìm mẫu hình.", "Affinity diagram từ ghi chép."] },
            { icon: "rotate", cells: ["Linh hoạt", "Có thể điều chỉnh câu hỏi giữa các buổi.", "Thêm câu hỏi về người thân sau buổi thứ hai."] },
          ]}
        />
      </Section>

      <Section {...S.methods}>
        <Table
          head={["Phương pháp", "Thu gì", "Bài liên quan"]}
          widths={[300]}
          rows={[
            { icon: "chat", cells: ["Phỏng vấn người dùng", "Trải nghiệm, động cơ, quan điểm.", "User Interview"] },
            { icon: "clipboard-check", cells: ["Usability test định tính", "Vấn đề khi dùng, vì sao.", "Moderated Testing"] },
            { icon: "binoculars", cells: ["Contextual inquiry, field study", "Hành vi trong bối cảnh thật.", "Contextual Inquiry, Field Study"] },
            { icon: "calendar", cells: ["Diary study", "Trải nghiệm theo thời gian.", "Diary Study"] },
            { icon: "users", cells: ["Focus group", "Ý kiến, thái độ trong nhóm.", "Focus Group"] },
            { icon: "book", cells: ["Ethnographic research", "Văn hóa, chuẩn mực.", "Ethnographic Research"] },
          ]}
        />
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "target",
              "Bối cảnh phù hợp",
              [
                "Giai đoạn khám phá, chưa rõ vấn đề.",
                "Cần hiểu vì sao một số liệu như vậy.",
                "Thiết kế đang hình thành, cần tìm và sửa vấn đề (NN/g gọi là mục tiêu formative: định hướng thiết kế).",
              ],
            ],
            ["eye", "Dấu hiệu nhận biết", ["Có số liệu nhưng không giải thích được.", "Nhóm tranh luận dựa trên giả định về người dùng."]],
            ["clipboard-check", "Điều kiện cần", ["Người nghiên cứu biết hỏi mở, không dẫn dắt.", "Người tham gia đúng nhóm người dùng mục tiêu."]],
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định câu hỏi nghiên cứu.", "Câu hỏi “vì sao”, “như thế nào”.", "Câu hỏi nghiên cứu."],
            ["Chọn phương pháp.", "Theo câu hỏi và bối cảnh.", "Kế hoạch nghiên cứu."],
            ["Tuyển người theo độ đa dạng, không theo số lượng lớn.", "", "Danh sách người tham gia."],
            ["Thu dữ liệu.", "Ghi âm, ghi chép, tách quan sát với diễn giải.", "Dữ liệu thô."],
            ["Phân tích.", "Gắn nhãn, gom chủ đề, tìm mẫu hình.", "Nhận định."],
            ["Chuyển thành hành động.", "", "Cơ hội thiết kế, vấn đề cần sửa."],
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["bar-chart", "Không trả lời “bao nhiêu người”", "3/6 người gặp vấn đề không có nghĩa là 50% người dùng sẽ gặp."],
            ["users", "Phụ thuộc người nghiên cứu", "Cách hỏi và cách diễn giải ảnh hưởng kết quả."],
            ["split", "Khó so sánh chính xác", "Giữa các phiên bản hay theo thời gian."],
            ["sigma", "Không đại diện về mặt thống kê", "Khi cần các câu trả lời này, kết hợp với nghiên cứu định lượng."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Câu hỏi nghiên cứu.", "Phương pháp và kịch bản.", "Người tham gia đa dạng."]}
          outputs={["Nhận định, trích dẫn tiêu biểu.", "Vấn đề và nguyên nhân.", "Cơ hội thiết kế, câu hỏi cần định lượng."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <div className="flex gap-4">
          <InfoCard icon="analytics" title="Bối cảnh" className="flex-1" body="Analytics (định lượng) cho thấy 40% khách bỏ ở bước xác nhận đặt lịch." />
          <InfoCard icon="eye" title="Nghiên cứu định tính" className="flex-1" body="Usability test với 6 khách, có think-aloud." />
        </div>
        <InfoCard
          icon="chat"
          title="Nhận định (giả định)"
          body="4/6 khách dừng ở bước xác nhận vì muốn hỏi người thân về giờ; 2/6 không thấy nút xác nhận vì nằm dưới cùng trang trên điện thoại."
        />
        <QuantQualLoop />
        <InfoCard
          tone="fill"
          icon="check-circle"
          title="Cách dùng kết quả"
          body="Nhóm có hai giả thuyết về nguyên nhân. Thiết kế giải pháp cho cả hai (giữ chỗ tạm + đưa nút lên), rồi dùng A/B test (định lượng) để đo tác động. Không báo cáo “67% khách cần hỏi người thân” vì 6 người không đủ để suy ra tỷ lệ."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Báo cáo phần trăm từ vài người", "Không đại diện.", "Nói “4 trong 6 người”, kèm lưu ý."],
            ["Câu hỏi dẫn dắt", "Kết quả lệch.", "Câu hỏi mở, trung lập."],
            ["Tuyển người giống nhau", "Bỏ sót góc nhìn.", "Tuyển theo độ đa dạng."],
            ["Coi định tính là “ý kiến”", "Định tính gồm cả quan sát hành vi.", "Ưu tiên quan sát hành vi khi có thể."],
            ["Dừng ở nhận định", "Không dẫn tới hành động.", "Chuyển thành cơ hội thiết kế."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["", "Định tính", "Định lượng"]}
          widths={[260]}
          rows={[
            { icon: "eye", cells: ["Cách thu", "Trực tiếp: quan sát, nghe.", "Gián tiếp: qua khảo sát, công cụ analytics."] },
            { icon: "list-search", cells: ["Câu hỏi", "Vì sao? Sửa thế nào?", "Bao nhiêu? Mức độ nào?"] },
            { icon: "users", cells: ["Số người (usability test, theo NN/g)", "Khoảng 5–8.", "Thường hơn 30."] },
            { icon: "component", cells: ["Phân tích", "Diễn giải, gom chủ đề.", "Thống kê, tính toán."] },
            { icon: "target", cells: ["Mục tiêu chính", "Định hướng thiết kế (formative), có thể đánh giá.", "Chủ yếu đánh giá (summative): đo, so sánh, theo dõi."] },
          ]}
        />
        <P>Hai loại bổ sung cho nhau: định lượng cho biết ở đâu và bao nhiêu, định tính cho biết vì sao.</P>
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Chuẩn bị"
            items={["Câu hỏi nghiên cứu là “vì sao” hoặc “như thế nào”.", "Phương pháp phù hợp với câu hỏi.", "Người tham gia đa dạng.", "Câu hỏi mở, không dẫn dắt."]}
          />
          <ChecklistColumn
            icon="analytics"
            title="Phân tích"
            items={["Tách quan sát với diễn giải.", "Không suy ra tỷ lệ từ vài người.", "Nhận định dẫn tới hành động hoặc câu hỏi định lượng tiếp theo."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Quantitative Research", "Nghiên cứu định lượng", "Loại nghiên cứu bổ sung."],
            ["Affinity Diagram", "Sơ đồ tương đồng", "Cách phân tích dữ liệu định tính."],
            ["Moderated Testing", "Kiểm thử có người điều phối", "Phương pháp định tính phổ biến."],
            ["Contextual Inquiry", "Phỏng vấn tại bối cảnh", "Phương pháp định tính."],
            ["Diary Study", "Nghiên cứu nhật ký", "Phương pháp định tính theo thời gian."],
            ["Attitudinal Methods", "Phương pháp nghiên cứu thái độ", "Chiều khác trong khung phương pháp."],
            ["Think-Aloud Protocol", "Nói to suy nghĩ", "Kỹ thuật thu dữ liệu định tính trong kiểm thử."],
            ["Synthetic User", "Người dùng tổng hợp", "Hồ sơ do AI tạo, không thay được nghiên cứu định tính thật."],
          ]}
        />
      </Section>
    </div>
  );
}

export const QUALITATIVE_RESEARCH: Article = {
  slug: "qualitative-research",
  version: 1,
  term: "Qualitative Research",
  fn: 1,
  vi: "Nghiên cứu định tính",
  kind: "Nguyên tắc / khái niệm",
  definition:
    "Qualitative research là nghiên cứu thu dữ liệu về hành vi hoặc thái độ bằng cách quan sát và lắng nghe người dùng trực tiếp, và phân tích chủ yếu bằng diễn giải thay vì tính toán.",
  definitionMore: "Nghiên cứu định tính phù hợp để trả lời câu hỏi vì sao và sửa thế nào.",
  oneLine: "Quan sát và lắng nghe người dùng trực tiếp để hiểu vì sao và nên sửa thế nào.",
  glance: [
    ["5–8", "Người cho usability test định tính (NN/g)"],
    ["6", "Phương pháp phổ biến"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Qual research", "Qual"] },
    { label: "Nhóm chính", items: ["Nghiên cứu khám phá"] },
    { label: "Thẻ phụ", items: ["Nền tảng và nguyên tắc"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "“Định tính” nói về loại dữ liệu và cách phân tích (quan sát, lời nói, không chủ yếu dựa vào tính toán), không nói về chất lượng. Định tính không phải “kém tin cậy hơn” định lượng; hai loại trả lời hai kiểu câu hỏi khác nhau.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
