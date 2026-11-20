"use client";

import { Blk, T } from "./edit";
import { CheckCards, Formula, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Research Operations — copy from ux-glossary/research-operations.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "parts", title: "Sáu thành phần của ResearchOps", icon: "component" },
  { id: "when", title: "Khi nào cần ResearchOps", icon: "check-circle" },
  { id: "not-yet", title: "Khi nào chưa cần", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "maths", title: "Công thức và ví dụ tính", icon: "sigma" },
  { id: "limits", title: "Giới hạn: khi nào ResearchOps chưa đủ", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

const DAYS = [6, 9, 4, 11, 5];

/** Days to recruit for the last five studies, against their 7-day average. */
function RecruitChart() {
  const max = 12;
  return (
    <Blk label="biểu đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="calendar" size={36} iconSize={18} radius={10} />
        <Eyebrow>Số ngày tuyển đủ người của năm nghiên cứu gần nhất</Eyebrow>
      </div>
      <div className="flex flex-col gap-3">
        {DAYS.map((d, i) => (
          <div key={i} className="flex items-center gap-5">
            <span className="w-[120px] shrink-0 text-[15px] leading-6 font-semibold">Nghiên cứu {i + 1}</span>
            <div className="relative h-9 flex-1 rounded-lg bg-[var(--d-well)]">
              <span className={`absolute inset-y-0 left-0 rounded-lg ${d > 7 ? "bg-[var(--d-ci)]" : "bg-[var(--d-ci-weak)]"}`} style={{ width: `${(d / max) * 100}%` }} />
              <span className="absolute -inset-y-1 w-0.5 bg-[var(--d-bad)]" style={{ left: `${(7 / max) * 100}%` }} />
            </div>
            <span className="w-[72px] shrink-0 text-right font-mono text-[15px]">{d} ngày</span>
          </div>
        ))}
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Vạch đỏ là trung bình 7 ngày. So sánh lại sau khi có danh sách khách đồng ý tham gia để thấy ResearchOps có giúp không.
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
            Khi một tổ chức nghiên cứu nhiều hơn, các vấn đề hậu cần xuất hiện: mỗi người nghiên cứu tự tuyển người theo cách riêng; mẫu đồng ý tham gia mỗi nơi một kiểu; kết quả nằm rải rác
            trong các thư mục, không ai tìm lại được; cùng một câu hỏi được nghiên cứu nhiều lần. Người nghiên cứu mất nhiều thời gian cho việc hậu cần hơn là cho việc hiểu người dùng.
          </P>
          <P strong>ResearchOps chuẩn hóa và hỗ trợ những việc này để nghiên cứu nhanh hơn, nhất quán hơn và được dùng lại.</P>
        </div>
        <Eyebrow>ResearchOps hỗ trợ</Eyebrow>
        <InfoGrid
          minH={150}
          items={[
            ["users", "Tuyển người tham gia", "Nhanh và đúng đối tượng."],
            ["shield-alert", "Tuân thủ", "Quyền riêng tư, đồng ý tham gia, lưu trữ dữ liệu."],
            ["book", "Kết quả được tìm lại và dùng lại", "Không nghiên cứu lại cùng một câu hỏi."],
            ["lightbulb", "Nhiều người hơn trong tổ chức", "Làm được nghiên cứu đúng cách."],
          ]}
        />
      </Section>

      <Section {...S.parts}>
        <P>NN/g mô tả sáu thành phần (và lưu ý mô hình này chưa bao quát hết):</P>
        <Table
          head={["Thành phần", "Trả lời câu hỏi", "Ví dụ minh họa (giả định)"]}
          widths={[240]}
          rows={[
            { icon: "users", cells: ["Người tham gia (participants)", "Tuyển, sắp lịch, trả thù lao thế nào?", "Danh sách khách đồng ý tham gia nghiên cứu; quy trình trả thù lao chuẩn."] },
            { icon: "shield-alert", cells: ["Quản trị (governance)", "Đồng ý tham gia, quyền riêng tư, lưu trữ dữ liệu thế nào?", "Mẫu đồng ý chung; quy định xóa bản ghi sau 12 tháng."] },
            { icon: "book", cells: ["Kiến thức (knowledge)", "Kết quả được lưu, tìm, dùng lại thế nào?", "Kho nghiên cứu (research repository) có gắn nhãn theo chủ đề."] },
            { icon: "component", cells: ["Công cụ (tools)", "Dùng công cụ gì, ai quản lý?", "Bộ công cụ chung cho gọi video, ghi hình, khảo sát, test không điều phối."] },
            { icon: "lightbulb", cells: ["Năng lực (competency)", "Ai làm được nghiên cứu, học thế nào?", "Khóa ngắn cho nhà thiết kế về cách phỏng vấn không dẫn dắt."] },
            { icon: "chat", cells: ["Lan tỏa (advocacy)", "Làm sao để tổ chức thấy và dùng giá trị của nghiên cứu?", "Buổi chia sẻ kết quả hằng tháng."] },
          ]}
        />
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            ["target", "Bối cảnh phù hợp", ["Nhiều nhóm, nhiều người làm nghiên cứu.", "Nghiên cứu diễn ra thường xuyên, không chỉ thỉnh thoảng.", "Có yêu cầu pháp lý về dữ liệu cá nhân."]],
            [
              "eye",
              "Dấu hiệu nhận biết",
              ["Tuyển người mất nhiều thời gian nhất trong mỗi nghiên cứu.", "Không ai biết nghiên cứu trước đã tìm ra gì.", "Mỗi nhóm dùng mẫu đồng ý, công cụ khác nhau."],
            ],
            ["clipboard-check", "Điều kiện cần", ["Sự ủng hộ của lãnh đạo và ngân sách.", "Người phụ trách (có thể bán thời gian ở tổ chức nhỏ)."]],
          ]}
        />
      </Section>

      <Section {...S["not-yet"]}>
        <Table
          head={["Tình huống", "Vì sao chưa cần", "Cách làm thay thế"]}
          widths={[340]}
          rows={[
            { icon: "users", cells: ["Một hai người nghiên cứu, ít dự án", "Chi phí xây hệ thống lớn hơn lợi ích.", "Vài mẫu đơn giản: mẫu đồng ý, bảng theo dõi người tham gia."] },
            { icon: "calendar", cells: ["Nghiên cứu hiếm khi diễn ra", "Không có nhiều việc lặp lại để chuẩn hóa.", "Thuê dịch vụ tuyển người khi cần."] },
          ]}
        />
        <P>Ngay cả với tổ chức nhỏ, một số phần (mẫu đồng ý, nơi lưu kết quả) vẫn đáng làm sớm.</P>
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Tìm điểm nghẽn lớn nhất.", "Hỏi người nghiên cứu việc gì tốn thời gian nhất.", "Danh sách điểm nghẽn."],
            ["Bắt đầu với một thành phần.", "Thường là người tham gia hoặc kiến thức.", "Phạm vi ưu tiên."],
            ["Chuẩn hóa quy trình và mẫu.", "", "Quy trình, mẫu dùng chung."],
            ["Chọn công cụ và người phụ trách.", "", "Công cụ chung, vai trò rõ ràng."],
            ["Đo hiệu quả.", "Thời gian tuyển người, chi phí, mức độ dùng lại kết quả.", "Chỉ số vận hành."],
            ["Mở rộng sang thành phần khác.", "", "Hệ thống ResearchOps dần hoàn thiện."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <P>ResearchOps thường theo dõi vài chỉ số vận hành đơn giản.</P>
        <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật. Một nghiên cứu phỏng vấn 12 khách.</Callout>
        <Subhead icon="users">Chi phí mỗi người tham gia</Subhead>
        <Formula label="Tổng chi phí" formula="Thù lao mỗi người × Số người + Chi phí tuyển" note="500.000 đ × 12 + 3.600.000 đ = 6.000.000 + 3.600.000 = 9.600.000 đ" />
        <Formula label="Chi phí mỗi người" formula="Tổng chi phí ÷ Số người" note="9.600.000 ÷ 12 = 800.000 đ" />
        <Subhead icon="calendar">Thời gian tuyển trung bình</Subhead>
        <Formula
          label="Thời gian tuyển trung bình"
          formula="Tổng số ngày tuyển của các nghiên cứu ÷ Số nghiên cứu"
          note="Năm nghiên cứu gần nhất mất 6, 9, 4, 11 và 5 ngày → (6 + 9 + 4 + 11 + 5) ÷ 5 = 35 ÷ 5 = 7 ngày"
        />
        <RecruitChart />
        <InfoCard
          tone="fill"
          icon="check-circle"
          title="Cách dùng"
          body="So sánh trước và sau khi có danh sách khách đồng ý tham gia. Nếu thời gian tuyển giảm rõ, đó là bằng chứng cho giá trị của ResearchOps khi trình bày với lãnh đạo."
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          cols={3}
          items={[
            ["lightbulb", "ResearchOps không thay thế kỹ năng nghiên cứu", "Hệ thống tốt nhưng câu hỏi sai thì kết quả vẫn sai."],
            ["hourglass", "Quá nhiều quy trình", "Có thể làm chậm nghiên cứu nhỏ, nhanh."],
            ["book", "Kho kiến thức chỉ có giá trị khi được dùng", "Cần gắn nhãn tốt và thói quen tra cứu."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Hiểu biết về điểm nghẽn hiện tại.", "Yêu cầu pháp lý về dữ liệu.", "Ngân sách, người phụ trách."]}
          outputs={["Quy trình, mẫu dùng chung.", "Danh sách người tham gia, kho kiến thức, bộ công cụ.", "Chỉ số vận hành."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard
          icon="component"
          title="Bối cảnh"
          body="Dịch vụ tư vấn đã chạy nhiều nghiên cứu (diary study, moderated test, focus group). Mỗi lần tuyển người mất trung bình 7 ngày; nhiều kết quả cũ không ai tìm lại được."
        />
        <InfoGrid
          cols={3}
          items={[
            ["users", "Người tham gia", "Thêm lựa chọn “Tôi muốn tham gia nghiên cứu để cải thiện dịch vụ” sau buổi tư vấn; tạo danh sách khách đồng ý."],
            ["shield-alert", "Quản trị", "Một mẫu đồng ý chung, quy định thời gian lưu bản ghi."],
            ["book", "Kiến thức", "Kho nghiên cứu gắn nhãn theo giai đoạn hành trình (tìm hiểu, so sánh, đặt lịch, sau tư vấn)."],
          ]}
        />
        <InfoCard tone="fill" icon="analytics" title="Theo dõi" body="Thời gian tuyển trung bình và chi phí mỗi người, so sánh sau ba tháng." />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Xây toàn bộ hệ thống một lúc", "Tốn kém, khó được chấp nhận.", "Bắt đầu từ điểm nghẽn lớn nhất."],
            ["Kho kiến thức không có cấu trúc", "Không ai tìm được gì.", "Gắn nhãn thống nhất, theo cách người dùng kho tìm kiếm."],
            ["Bỏ qua quyền riêng tư", "Rủi ro pháp lý, mất lòng tin.", "Quản trị là thành phần cốt lõi."],
            ["Không đo hiệu quả", "Khó chứng minh giá trị.", "Theo dõi thời gian tuyển, chi phí, mức độ dùng lại."],
            ["Quy trình quá nặng cho nghiên cứu nhỏ", "Làm chậm nghiên cứu.", "Có quy trình nhẹ cho nghiên cứu nhanh."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Quan hệ với ResearchOps"]}
          widths={[300]}
          rows={[
            { icon: "component", cells: ["DesignOps", "Khái niệm rộng hơn; ResearchOps là một nhánh chuyên biệt."] },
            { icon: "users", cells: ["UX Research", "Việc nghiên cứu; ResearchOps hỗ trợ việc đó."] },
            { icon: "book", cells: ["Research repository", "Một phần của thành phần “kiến thức”."] },
            { icon: "rotate", cells: ["Customer Feedback Loop", "Phản hồi liên tục từ khách; ResearchOps giúp tổ chức và lưu trữ."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Nền tảng"
            items={["Đã xác định điểm nghẽn lớn nhất.", "Có mẫu đồng ý chung, quy định lưu trữ dữ liệu.", "Có cách tuyển người tham gia nhanh, đúng đối tượng."]}
          />
          <ChecklistColumn icon="analytics" title="Vận hành" items={["Kết quả nghiên cứu được lưu ở nơi tìm lại được.", "Có người phụ trách.", "Theo dõi chỉ số vận hành."]} />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Remote Testing", "Kiểm thử từ xa", "Công cụ và tuyển người cho test từ xa."],
            ["Customer Feedback Loop", "Vòng phản hồi khách hàng", "Tổ chức và lưu trữ phản hồi."],
            ["Affinity Diagram", "Sơ đồ tương đồng", "Kết quả tổng hợp được đưa vào kho kiến thức."],
            ["Qualitative Research", "Nghiên cứu định tính", "Loại nghiên cứu cần nhiều hậu cần."],
            ["Diary Study", "Nghiên cứu nhật ký", "Cần tuyển và giữ người tham gia lâu."],
            ["Moderated Testing", "Kiểm thử có người điều phối", "Cần lịch, công cụ, thù lao."],
            ["Synthetic User", "Người dùng tổng hợp", "Cần quy định khi nào được dùng AI trong nghiên cứu."],
          ]}
        />
      </Section>
    </div>
  );
}

export const RESEARCH_OPERATIONS: Article = {
  slug: "research-operations",
  version: 1,
  term: "Research Operations",
  fn: 7,
  vi: "Vận hành nghiên cứu",
  kind: "Quy trình / cách tiếp cận",
  definition:
    "Research Operations là tập hợp các nỗ lực giúp người nghiên cứu lên kế hoạch, thực hiện và áp dụng nghiên cứu chất lượng ở quy mô lớn, bằng cách tổ chức và tối ưu con người, quy trình và kỹ năng nghiên cứu.",
  definitionMore: "ResearchOps lo phần “hậu cần” để người nghiên cứu tập trung vào việc tìm hiểu người dùng.",
  oneLine: "Hệ thống người, quy trình và công cụ giúp làm nghiên cứu tốt và nhất quán ở quy mô lớn.",
  glance: [
    ["6", "Thành phần theo NN/g"],
    ["7 ngày", "Thời gian tuyển trung bình trong ví dụ"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["ResearchOps", "ReOps"] },
    { label: "Nhóm chính", items: ["Quy trình"] },
    { label: "Thẻ phụ", items: ["Nghiên cứu khám phá"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "ResearchOps không phải việc làm nghiên cứu, mà là hệ thống hỗ trợ để nghiên cứu được làm tốt, nhanh và nhất quán: tuyển người, công cụ, quy trình, lưu trữ kiến thức. NN/g coi đây là một nhánh chuyên biệt của DesignOps.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
