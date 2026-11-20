"use client";

import { Blk, T } from "./edit";
import { CheckCards, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Task Scenario — copy from ux-glossary/task-scenario.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "traits", title: "Đặc điểm của kịch bản tốt", icon: "check-circle" },
  { id: "examples", title: "Ví dụ tốt và chưa tốt", icon: "split" },
  { id: "when", title: "Khi nào nên dùng / chưa phù hợp", icon: "component" },
  { id: "apply", title: "Cách viết", icon: "pencil" },
  { id: "limits", title: "Giới hạn", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

const PARTS: [string, string][] = [
  ["Bối cảnh", "Bạn là chủ một tiệm cà phê nhỏ,"],
  ["Động cơ", "muốn hỏi chuyên gia về việc vay vốn mở rộng."],
  ["Ràng buộc", "Ngân sách cho tư vấn khoảng 1 triệu đồng."],
  ["Yêu cầu hành động", "Hãy chọn gói bạn thấy phù hợp nhất với ngân sách và nhu cầu."],
];

/** One scenario split into its parts, with the success criterion that stays with the team. */
function Anatomy() {
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="file" size={36} iconSize={18} radius={10} />
        <Eyebrow>Cấu tạo của kịch bản 1 (sau khi pilot)</Eyebrow>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[13px] tracking-[1px] text-[var(--w-muted)] uppercase">Người tham gia nhận</span>
        <div className="flex flex-wrap gap-2">
          {PARTS.map(([label, text], i) => (
            <div key={label} className={`flex flex-col gap-1 rounded-2xl px-5 py-4 ${i === 3 ? "bg-[var(--d-fill)] text-white" : "bg-[var(--d-ci-weak)]"}`}>
              <span className={`font-mono text-[12px] tracking-[1px] uppercase ${i === 3 ? "text-white/80" : "text-[var(--w-muted)]"}`}>{label}</span>
              <span className="text-[15px] leading-[22px]">{text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[13px] tracking-[1px] text-[var(--w-muted)] uppercase">Chỉ nhóm giữ</span>
        <div className="rounded-2xl bg-[var(--d-well)] px-5 py-4 text-[15px] leading-[22px]">
          <span className="font-semibold">Tiêu chí thành công:</span> chọn một gói có giá không vượt 1 triệu đồng.
        </div>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Kịch bản nói cần đạt gì, không chứa chữ trên giao diện và không chỉ cách làm.
      </T>
    </Blk>
  );
}

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Section {...S.problem}>
        <P>
          Trong buổi kiểm thử, cách giao việc ảnh hưởng trực tiếp tới kết quả. Nếu lời giao việc chứa đúng chữ trên nút, người tham gia chỉ cần tìm chữ đó, và nhóm không học được gì về việc
          họ có hiểu giao diện hay không. Nếu lời giao việc mơ hồ, người tham gia không biết khi nào là xong.
        </P>
        <Eyebrow>Task scenario giúp</Eyebrow>
        <InfoGrid
          cols={3}
          minH={150}
          items={[
            ["users", "Hành động như trong đời thật", "Có lý do và bối cảnh."],
            ["split", "Kết quả so sánh được", "Ai cũng nhận cùng một kịch bản."],
            ["check-circle", "Đo được tỷ lệ hoàn thành", "Vì kịch bản có điểm kết thúc rõ."],
          ]}
        />
      </Section>

      <Section {...S.traits}>
        <P>Theo NN/g:</P>
        <Table
          head={["Đặc điểm", "Ý nghĩa"]}
          widths={[300]}
          rows={[
            { icon: "target", cells: ["Thực tế", "Là việc người dùng thật sự muốn làm, trong tình huống có thể xảy ra."] },
            { icon: "play-circle", cells: ["Có thể hành động", "Yêu cầu người tham gia làm, không yêu cầu họ giải thích sẽ làm thế nào."] },
            { icon: "ban", cells: ["Không gợi ý", "Không dùng chữ có trên giao diện, không mô tả các bước."] },
            { icon: "lightbulb", cells: ["Có bối cảnh và động cơ", "Cho biết vì sao họ cần làm việc này."] },
            { icon: "check-circle", cells: ["Không mơ hồ", "Có thông tin đủ để biết khi nào là xong."] },
          ]}
        />
      </Section>

      <Section {...S.examples}>
        <Table
          head={["Chưa tốt", "Vì sao", "Tốt hơn"]}
          widths={[300]}
          rows={[
            { icon: "x", cells: ["“Nhấn nút Đặt lịch tư vấn.”", "Chứa chữ trên giao diện, chỉ cách làm.", "“Bạn muốn gặp chuyên gia để hỏi về khoản vay mua nhà. Hãy sắp xếp một buổi gặp vào tuần sau.”"] },
            { icon: "x", cells: ["“Bạn sẽ tìm giá dịch vụ như thế nào?”", "Hỏi giải thích, không yêu cầu hành động.", "“Bạn có ngân sách 1 triệu đồng cho tư vấn. Hãy tìm xem gói nào vừa với ngân sách.”"] },
            { icon: "x", cells: ["“Khám phá trang web.”", "Mơ hồ, không có điểm kết thúc.", "“Bạn muốn biết có thể hủy lịch đã đặt không. Hãy tìm câu trả lời.”"] },
            {
              icon: "x",
              cells: ["“Đặt lịch với chuyên gia Nguyễn A lúc 9 giờ thứ Hai, gói Cơ bản, thanh toán thẻ.”", "Quá chi tiết, thành chỉ dẫn từng bước.", "Giữ mục tiêu và ràng buộc thật cần thiết, bỏ các bước."],
            },
          ]}
        />
        <P>Các con số và tên trong ví dụ là minh họa.</P>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "check-circle",
              "Nên dùng khi",
              [
                "Chạy usability testing có hoặc không có người điều phối.",
                "Chạy first-click testing, tree testing (mỗi câu hỏi là một kịch bản ngắn).",
                "Cần so sánh kết quả giữa các phiên bản thiết kế.",
              ],
            ],
          ]}
        />
        <Table
          head={["Chưa phù hợp khi", "Thay bằng"]}
          widths={[520]}
          rows={[
            { icon: "binoculars", cells: ["Muốn hiểu người dùng làm gì ngoài đời", "Contextual inquiry, task analysis."] },
            { icon: "eye", cells: ["Muốn biết người dùng tự nhiên dùng sản phẩm thế nào, không có việc giao sẵn", "Field study, session replay, nghiên cứu dài hạn."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Bắt đầu từ mục tiêu người dùng.", "Lấy từ nghiên cứu hoặc task analysis.", "Danh sách mục tiêu cần kiểm tra."],
            ["Đặt bối cảnh và động cơ.", "Ai, vì sao, ràng buộc gì.", "Tình huống ngắn."],
            ["Viết yêu cầu hành động.", "Không chứa chữ có trên giao diện.", "Câu giao việc."],
            ["Xác định tiêu chí hoàn thành.", "Cho nhóm, không đưa cho người tham gia.", "Định nghĩa “thành công”."],
            ["Chạy thử (pilot).", "Với một đồng nghiệp hoặc người dùng.", "Kịch bản đã sửa câu mơ hồ."],
            ["Sắp thứ tự các kịch bản.", "Tránh kịch bản trước tiết lộ đáp án kịch bản sau.", "Bộ kịch bản hoàn chỉnh."],
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          cols={3}
          items={[
            ["file", "Vẫn là việc được giao", "Dù có bối cảnh, không phải nhu cầu thật của người tham gia lúc đó."],
            ["eye", "Chỉ kiểm tra những việc nhóm nghĩ tới", "Vấn đề ngoài kịch bản có thể bị bỏ sót."],
            ["target", "Tiêu chí hoàn thành do nhóm đặt", "Nếu đặt sai, tỷ lệ hoàn thành cũng sai."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Mục tiêu người dùng (từ nghiên cứu, task analysis).", "Giao diện hoặc prototype sẽ kiểm thử.", "Danh sách chữ trên giao diện (để tránh dùng trong kịch bản)."]}
          outputs={["Bộ kịch bản đã pilot.", "Tiêu chí hoàn thành cho từng kịch bản."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard icon="component" title="Bối cảnh" body="Từ task analysis, nhóm biết ba mục tiêu chính: chọn gói theo ngân sách, đặt lịch, chuẩn bị giấy tờ." />
        <Table
          head={["", "Kịch bản (bản nháp)"]}
          widths={[80]}
          rows={[
            { cells: ["1", "“Bạn là chủ một tiệm cà phê nhỏ, muốn hỏi chuyên gia về việc vay vốn mở rộng. Ngân sách cho tư vấn khoảng 1 triệu đồng. Hãy chọn gói phù hợp.”"] },
            { cells: ["2", "“Bạn chỉ rảnh buổi chiều thứ Năm tuần sau. Hãy sắp xếp một buổi gặp.”"] },
            { cells: ["3", "“Buổi tư vấn đã được đặt. Hãy tìm xem bạn cần mang theo những gì.”"] },
          ]}
        />
        <InfoCard
          tone="fill"
          icon="pencil"
          title="Pilot"
          body="Người thử đầu tiên hỏi “gói phù hợp nghĩa là rẻ nhất à?”. Nhóm sửa kịch bản 1 thành “chọn gói bạn thấy phù hợp nhất với ngân sách và nhu cầu”, và ghi tiêu chí thành công: chọn một gói có giá không vượt 1 triệu đồng."
        />
        <Anatomy />
        <Callout tone="note" icon="briefcase">
          Số liệu minh họa. Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Dùng chữ trên giao diện", "Người tham gia chỉ cần tìm chữ.", "Dùng từ của người dùng."],
            ["Chỉ dẫn từng bước", "Không còn gì để quan sát.", "Chỉ nêu mục tiêu."],
            ["Hỏi “bạn sẽ làm thế nào”", "Lời nói khác hành động.", "Yêu cầu làm."],
            ["Không có điểm kết thúc", "Người tham gia và nhóm đều không biết khi nào xong.", "Thêm thông tin cụ thể cần tìm hoặc đạt."],
            ["Không pilot", "Câu mơ hồ chỉ lộ ra khi chạy thật.", "Chạy thử trước."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Là gì", "Dùng ở đâu"]}
          widths={[340]}
          rows={[
            { icon: "file", highlight: true, cells: ["Task Scenario", "Lời giao việc cho người tham gia.", "Buổi kiểm thử."] },
            { icon: "list", cells: ["Task Analysis", "Phân tích cách người dùng làm việc ngoài đời.", "Trước thiết kế, làm nguồn cho kịch bản."] },
            { icon: "book", cells: ["User Story", "Mô tả nhu cầu cho nhóm phát triển.", "Quy trình phát triển."] },
            { icon: "chat", cells: ["Discussion guide (kịch bản phỏng vấn)", "Danh sách câu hỏi cho phỏng vấn.", "Phỏng vấn, không phải kiểm thử."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="pencil"
            title="Nội dung"
            items={["Kịch bản xuất phát từ mục tiêu thật của người dùng.", "Có bối cảnh và động cơ.", "Yêu cầu hành động, không hỏi giải thích.", "Không chứa chữ có trên giao diện."]}
          />
          <ChecklistColumn icon="clipboard-check" title="Chuẩn bị" items={["Có tiêu chí hoàn thành rõ (cho nhóm).", "Đã pilot.", "Thứ tự kịch bản không tiết lộ đáp án."]} />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Usability Testing", "Kiểm thử khả năng sử dụng", "Nơi kịch bản được dùng."],
            ["Task Analysis", "Phân tích tác vụ", "Nguồn mục tiêu để viết kịch bản."],
            ["Moderated Testing", "Kiểm thử có người điều phối", "Người điều phối đọc kịch bản."],
            ["Remote Testing", "Kiểm thử từ xa", "Kịch bản phải tự rõ vì không ai giải thích."],
            ["First-Click Testing", "Kiểm thử cú nhấp đầu tiên", "Mỗi câu hỏi là một kịch bản ngắn."],
            ["Tree Testing", "Kiểm thử cây", "Mỗi câu hỏi là một kịch bản ngắn."],
          ]}
        />
      </Section>
    </div>
  );
}

export const TASK_SCENARIO: Article = {
  slug: "task-scenario",
  version: 1,
  term: "Task Scenario",
  fn: 5,
  vi: "Kịch bản tác vụ",
  kind: "Tài liệu / sơ đồ thiết kế",
  definition:
    "Task scenario là đoạn mô tả ngắn giao cho người tham gia kiểm thử một việc cần làm, đặt trong một tình huống thực tế có bối cảnh và lý do, để quan sát họ dùng sản phẩm như thế nào.",
  definitionMore: "Kịch bản tốt cho người tham gia biết cần đạt được gì, nhưng không chỉ cách làm.",
  oneLine: "Lời giao việc có bối cảnh cho người tham gia kiểm thử, nói cần đạt gì nhưng không chỉ cách làm.",
  glance: [
    ["5", "Đặc điểm của kịch bản tốt"],
    ["3", "Kịch bản trong ví dụ"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Usability task", "Test task"] },
    { label: "Nhóm chính", items: ["Kiểm thử khả năng sử dụng"] },
    { label: "Thẻ phụ", items: ["Nghiên cứu khám phá"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "Task scenario là lời giao việc cho người tham gia trong buổi kiểm thử, kèm bối cảnh và động cơ. Khác với “tác vụ” trong task analysis (bước người dùng làm ngoài đời).",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
