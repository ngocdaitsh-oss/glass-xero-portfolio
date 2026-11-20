"use client";

import { Blk, T } from "./edit";
import { CheckCards, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Task Analysis — copy from ux-glossary/task-analysis.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "phases", title: "Hai giai đoạn của task analysis", icon: "component" },
  { id: "hta", title: "Sơ đồ phân tích tác vụ phân cấp (HTA)", icon: "list" },
  { id: "when", title: "Khi nào nên dùng / chưa phù hợp", icon: "check-circle" },
  { id: "apply", title: "Cách áp dụng", icon: "list-search" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

const TASKS: [string, string | null, [string, boolean][]][] = [
  ["1. Tìm hiểu dịch vụ", null, [["1.1 Đọc mô tả gói tư vấn", false], ["1.2 Xem giá", false]]],
  [
    "2. Đặt lịch",
    "Làm 2.1 → 2.2; nếu không có giờ phù hợp → 2.3",
    [
      ["2.1 Chọn chuyên gia", false],
      ["2.2 Chọn khung giờ", false],
      ["2.3 Gọi điện hỏi giờ khác", true],
    ],
  ],
  ["3. Chuẩn bị buổi tư vấn", null, [["3.1 Xác nhận email", false], ["3.2 Gom giấy tờ cần mang", false]]],
];

/** Goal → tasks → subtasks with plans; the step outside the product is flagged. */
function HtaTree() {
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="list" size={36} iconSize={18} radius={10} />
        <Eyebrow>HTA: mục tiêu “Được tư vấn tài chính”</Eyebrow>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="rounded-2xl bg-[var(--d-fill)] px-6 py-4 text-[16px] font-semibold text-white">0. Được tư vấn tài chính</div>
        <span className="font-mono text-[13px] text-[var(--w-muted)]">Kế hoạch 0: làm 1 → 2 → 3</span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {TASKS.map(([task, plan, subs]) => (
          <div key={task} className="flex flex-col gap-2">
            <div className="rounded-xl bg-[var(--d-ci-weak)] px-4 py-3 text-[15px] leading-[22px] font-semibold">{task}</div>
            {plan && <span className="px-1 font-mono text-[13px] leading-5 text-[var(--w-muted)]">{plan}</span>}
            {subs.map(([s, outside]) => (
              <div
                key={s}
                className={`ml-4 rounded-xl px-4 py-2.5 text-[15px] leading-[22px] ${outside ? "bg-[var(--d-bad-soft)] text-[var(--d-bad)]" : "bg-[var(--d-well)]"}`}
              >
                {s}
                {outside && <span className="block text-[13px]">Ngoài sản phẩm</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Kế hoạch (plan) mô tả thứ tự và điều kiện. Bước ngoài sản phẩm vẫn được ghi lại vì đó là cơ hội thiết kế hỗ trợ.
      </T>
    </Blk>
  );
}

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Section {...S.problem}>
        <P>
          Nhóm thiết kế thường hình dung tác vụ theo cách hệ thống được xây, không theo cách người dùng thật sự làm. Kết quả là giao diện bắt người dùng đi theo thứ tự không tự nhiên, thiếu bước
          họ cần, hoặc thừa bước họ không cần.
        </P>
        <div className="flex items-start gap-4">
          <CheckCards
            groups={[
              [
                "check-circle",
                "Task analysis giúp",
                [
                  "Thấy toàn bộ các bước người dùng làm, kể cả bước ngoài sản phẩm (gọi điện hỏi, ghi chú ra giấy).",
                  "Biết bước nào thường xuyên, bước nào khó, để ưu tiên thiết kế.",
                  "Có cơ sở cho kịch bản kiểm thử (task scenario) và kiến trúc thông tin.",
                ],
              ],
              [
                "ban",
                "Không giải quyết",
                [
                  "Lý do sâu xa vì sao người dùng có mục tiêu đó → cần phỏng vấn, nghiên cứu định tính rộng hơn.",
                  "Đánh giá giao diện cụ thể → cần usability testing.",
                ],
              ],
            ]}
          />
        </div>
      </Section>

      <Section {...S.phases}>
        <Eyebrow>Giai đoạn 1: Thu thập thông tin (theo NN/g)</Eyebrow>
        <Table
          head={["Cách", "Mô tả ngắn"]}
          widths={[380]}
          rows={[
            { icon: "binoculars", cells: ["Contextual inquiry", "Quan sát và hỏi người dùng ngay trong bối cảnh làm việc."] },
            { icon: "alert", cells: ["Phỏng vấn sự cố quan trọng (critical incident)", "Hỏi về những lần cụ thể việc diễn ra rất tốt hoặc rất tệ."] },
            { icon: "calendar", cells: ["Nhật ký (diary)", "Người dùng tự ghi lại khi làm tác vụ trong một khoảng thời gian."] },
            { icon: "hourglass", cells: ["Lấy mẫu hoạt động (activity sampling)", "Ghi lại người dùng đang làm gì vào các thời điểm định trước."] },
            { icon: "play-circle", cells: ["Mô phỏng (simulation)", "Nhà nghiên cứu tự đi qua tác vụ như người dùng."] },
          ]}
        />
        <Eyebrow>Giai đoạn 2: Phân tích và cấu trúc</Eyebrow>
        <InfoGrid
          cols={3}
          items={[
            ["arrows", "Thứ tự", "Các bước."],
            ["list", "Phân cấp", "Mục tiêu → tác vụ → tác vụ con."],
            ["rotate", "Tần suất", "Bước nào lặp lại nhiều."],
            ["lightbulb", "Yêu cầu nhận thức và thể chất", "Bước nào cần nhớ, tính toán, ra quyết định."],
            ["hourglass", "Thời gian", "Bước nào mất nhiều thời gian."],
          ]}
        />
        <Callout tone="note">
          NN/g lưu ý: không chỉ dựa vào lời kể của người dùng, vì người dùng thường bỏ sót bước quen tay hoặc mô tả cách “nên làm” thay vì cách họ thật sự làm.
        </Callout>
      </Section>

      <Section {...S.hta}>
        <P>
          HTA chia một mục tiêu thành các tác vụ, rồi chia mỗi tác vụ thành các tác vụ con. Đi kèm là kế hoạch (plan): mô tả thứ tự và điều kiện thực hiện các tác vụ con, ví dụ “làm 1 rồi 2;
          nếu không có giờ phù hợp thì làm 2.3”.
        </P>
        <HtaTree />
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "check-circle",
              "Nên dùng khi",
              [
                "Thiết kế mới hoặc thiết kế lại một luồng nhiều bước.",
                "Cần hiểu quy trình phức tạp, chuyên môn (ví dụ công việc của nhân viên vận hành).",
                "Chuẩn bị viết task scenario cho usability testing.",
                "Chuẩn bị kiến trúc thông tin dựa trên cách người dùng làm việc.",
              ],
            ],
          ]}
        />
        <Table
          head={["Chưa phù hợp khi", "Thay bằng"]}
          widths={[460]}
          rows={[
            { icon: "lightbulb", cells: ["Chưa biết người dùng có mục tiêu gì", "Phỏng vấn, nghiên cứu khám phá."] },
            { icon: "arrows", cells: ["Cần cảm xúc, trải nghiệm qua nhiều kênh", "Journey mapping."] },
            { icon: "eye", cells: ["Cần đánh giá giao diện đã có", "Usability testing, heuristic evaluation."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Chọn mục tiêu cần phân tích, giới hạn phạm vi.", "", "Mục tiêu và phạm vi rõ ràng."],
            ["Thu thập thông tin bằng quan sát, kết hợp phỏng vấn.", "Không chỉ dựa vào lời kể.", "Ghi chép các bước thật."],
            ["Liệt kê tác vụ và tác vụ con, kể cả bước ngoài sản phẩm.", "", "Danh sách tác vụ."],
            ["Dựng phân cấp và kế hoạch (HTA), ghi các nhánh điều kiện.", "", "Sơ đồ HTA."],
            ["Đánh dấu bước thường xuyên, bước khó, bước tốn thời gian.", "", "Điểm ưu tiên thiết kế."],
            ["Kiểm tra lại với người dùng hoặc người hiểu quy trình.", "", "Mô hình tác vụ đã xác nhận."],
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          cols={3}
          items={[
            ["users", "Phản ánh những người được quan sát", "Nhóm người dùng khác có thể làm khác."],
            ["rotate", "Mô tả cách làm hiện tại", "Không tự động chỉ ra cách làm tốt hơn."],
            ["chat", "Nếu chỉ dựa vào lời kể", "Mô hình có thể là cách “nên làm” chứ không phải cách thật."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Mục tiêu người dùng cần phân tích.", "Người dùng để quan sát, phỏng vấn.", "Cách ghi chép (ghi chú, ghi hình nếu được đồng ý)."]}
          outputs={["Danh sách tác vụ và tác vụ con.", "Sơ đồ HTA kèm kế hoạch.", "Danh sách điểm ưu tiên thiết kế."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <div className="flex gap-4">
          <InfoCard icon="component" title="Bối cảnh" className="flex-1" body="Nhóm thiết kế lại luồng đặt lịch tư vấn." />
          <InfoCard icon="eye" title="Thu thập" className="flex-1" body="Quan sát 6 khách hàng đặt lịch, phỏng vấn ngắn sau đó." />
        </div>
        <Eyebrow>Phát hiện (minh họa)</Eyebrow>
        <InfoGrid
          cols={3}
          items={[
            ["arrows", "4 trên 6 người xem giá trước", "Khi đọc mô tả gói, ngược với thứ tự trang hiện tại."],
            ["chat", "3 trên 6 người gọi điện hỏi", "Vì không tìm được giờ phù hợp; một bước nằm ngoài sản phẩm."],
            ["file", "Bước “gom giấy tờ”", "Chỉ được biết qua email xác nhận, nhiều người không đọc."],
          ]}
        />
        <P>Số liệu minh họa, không phải dữ liệu thật. Với 6 người, đây là tín hiệu định tính, không phải tỷ lệ chính xác.</P>
        <InfoCard
          tone="fill"
          icon="check-circle"
          title="Quyết định"
          body="Đưa giá lên đầu; thêm lựa chọn “yêu cầu khung giờ khác” trong luồng; hiển thị danh sách giấy tờ ngay trên trang xác nhận."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Nhầm mục tiêu với tác vụ", "Mục tiêu không quan sát được, khó phân tích.", "Tách: mục tiêu → các tác vụ quan sát được."],
            ["Chỉ dựa vào lời kể", "Bỏ sót bước, mô tả cách “nên làm”.", "Kết hợp quan sát."],
            ["Bỏ qua bước ngoài sản phẩm", "Mất cơ hội thiết kế hỗ trợ.", "Ghi cả bước gọi điện, ghi giấy…"],
            ["Phân tích theo cấu trúc hệ thống", "Phản ánh cách xây, không phải cách dùng.", "Bắt đầu từ người dùng."],
            ["Quá chi tiết", "Sơ đồ khó dùng.", "Dừng ở mức đủ để ra quyết định thiết kế."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Trọng tâm", "Phạm vi"]}
          widths={[260]}
          rows={[
            { icon: "list", highlight: true, cells: ["Task Analysis", "Các bước để đạt một mục tiêu.", "Một mục tiêu, chi tiết bước."] },
            { icon: "arrows", cells: ["Journey Mapping", "Trải nghiệm, cảm xúc qua các giai đoạn và kênh.", "Rộng, nhiều điểm chạm."] },
            { icon: "file", cells: ["Task Scenario", "Kịch bản giao cho người tham gia trong kiểm thử.", "Một tác vụ cụ thể để test."] },
            { icon: "briefcase", cells: ["Jobs to Be Done", "Việc người dùng “thuê” sản phẩm để làm, lý do và bối cảnh.", "Động cơ, không phải bước."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn icon="file" title="Trước khi thu thập" items={["Mục tiêu và phạm vi rõ ràng.", "Đã tách mục tiêu khỏi tác vụ."]} />
          <ChecklistColumn icon="eye" title="Khi thu thập" items={["Có quan sát, không chỉ dựa vào lời kể.", "Ghi cả bước ngoài sản phẩm."]} />
          <ChecklistColumn
            icon="analytics"
            title="Khi phân tích"
            items={["Có phân cấp và kế hoạch (nhánh điều kiện).", "Đánh dấu bước thường xuyên, khó, tốn thời gian.", "Đã kiểm tra lại với người dùng."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Task Scenario", "Kịch bản tác vụ", "Viết từ kết quả task analysis."],
            ["Contextual Inquiry", "Phỏng vấn tại bối cảnh", "Cách thu thập thông tin chính."],
            ["Journey Mapping", "Bản đồ hành trình", "Rộng hơn, gồm cảm xúc và kênh."],
            ["Information Architecture", "Kiến trúc thông tin", "Dựng theo cách người dùng làm việc."],
            ["Diary Study", "Nghiên cứu nhật ký", "Cách thu thập theo thời gian."],
            ["Jobs to be Done (JTBD)", "Công việc cần hoàn thành", "Động cơ đằng sau mục tiêu."],
          ]}
        />
      </Section>
    </div>
  );
}

export const TASK_ANALYSIS: Article = {
  slug: "task-analysis",
  version: 1,
  term: "Task Analysis",
  fn: 2,
  vi: "Phân tích tác vụ",
  kind: "Phương pháp nghiên cứu",
  definition:
    "Task analysis là phương pháp tìm hiểu cách người dùng thực hiện tác vụ để đạt mục tiêu: họ làm những bước nào, theo thứ tự nào, dùng gì, gặp khó ở đâu.",
  definitionMore: "Phương pháp gồm hai giai đoạn: thu thập thông tin về cách người dùng làm việc, rồi phân tích và cấu trúc lại thành mô hình tác vụ.",
  oneLine: "Phân tích các bước người dùng thực hiện để đạt mục tiêu, nhằm thiết kế hỗ trợ đúng chỗ.",
  glance: [
    ["2", "Giai đoạn: thu thập và phân tích"],
    ["5", "Cách thu thập theo NN/g"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Hierarchical Task Analysis (HTA) — một dạng phổ biến"] },
    { label: "Nhóm chính", items: ["Nghiên cứu khám phá"] },
    { label: "Thẻ phụ", items: ["Kiến trúc và điều hướng"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "Tác vụ (task) là hành động quan sát được, có điểm bắt đầu và kết thúc. Mục tiêu (goal) không phải tác vụ: “muốn được tư vấn” là mục tiêu, “chọn khung giờ” là tác vụ.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
