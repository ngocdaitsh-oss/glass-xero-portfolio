"use client";

import { Blk, T } from "./edit";
import { CheckCards, Formula, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Quantitative Research — copy from ux-glossary/quantitative-research.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "traits", title: "Đặc điểm của nghiên cứu định lượng", icon: "component" },
  { id: "methods", title: "Các phương pháp định lượng phổ biến", icon: "list" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list-search" },
  { id: "maths", title: "Công thức và ví dụ tính", icon: "sigma" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt định lượng và định tính", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

const MARGINS: [number, number][] = [
  [10, 31],
  [30, 18],
  [50, 14],
  [100, 10],
  [200, 7],
];

/** ± margin around 50% for each sample size, drawn as an interval on a 0–100% axis. */
function MarginChart() {
  return (
    <Blk label="biểu đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="users" size={36} iconSize={18} radius={10} />
        <Eyebrow>Sai số quanh tỷ lệ 50% theo số người</Eyebrow>
      </div>
      <div className="flex flex-col gap-3">
        {MARGINS.map(([n, m]) => (
          <div key={n} className="flex items-center gap-5">
            <span className="w-[90px] shrink-0 text-[15px] leading-6 font-semibold">{n} người</span>
            <div className="relative h-9 flex-1 rounded-lg bg-[var(--d-well)]">
              <span className="absolute inset-y-0 w-px bg-[var(--w-muted)]" style={{ left: "50%" }} />
              <span
                className={`absolute top-1/2 h-4 -translate-y-1/2 rounded-full ${n === 50 ? "bg-[var(--d-ci)]" : "bg-[var(--d-ci-weak)]"}`}
                style={{ left: `${50 - m}%`, width: `${2 * m}%` }}
              />
              <span className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--d-accent)]" style={{ left: "50%" }} />
            </div>
            <span className={`w-[64px] shrink-0 text-right font-mono text-[15px] ${n === 50 ? "font-semibold text-[var(--d-accent)]" : ""}`}>± {m}</span>
          </div>
        ))}
        <div className="flex items-center gap-5">
          <span className="w-[90px] shrink-0" />
          <div className="flex flex-1 justify-between font-mono text-[13px] text-[var(--w-muted)]">
            {[0, 25, 50, 75, 100].map((v) => (
              <span key={v}>{v}%</span>
            ))}
          </div>
          <span className="w-[64px] shrink-0" />
        </div>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Mức tin cậy 95%. Muốn sai số nhỏ đi một nửa → cần khoảng gấp bốn lần số người.
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
            Nghiên cứu định tính cho biết người dùng gặp vấn đề gì và vì sao, nhưng không cho biết vấn đề đó phổ biến đến đâu, hay thiết kế mới có tốt hơn thiết kế cũ bao nhiêu. Lãnh đạo
            thường cần những con số này để ưu tiên và đầu tư.
          </P>
          <P strong>Nghiên cứu định lượng đo với nhiều người, theo cùng một cách, để so sánh, theo dõi và ước tính.</P>
        </div>
        <Eyebrow>Nghiên cứu định lượng hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          minH={150}
          items={[
            ["users", "Vấn đề lớn đến đâu", "Bao nhiêu người gặp."],
            ["split", "Thiết kế nào tốt hơn", "So sánh hai phiên bản."],
            ["analytics", "Trải nghiệm thay đổi thế nào", "Theo thời gian, so với đối thủ."],
            ["gauge", "Đầu tư có hiệu quả không", "NN/g nhắc đến việc tính lợi tức đầu tư (ROI) như một mục tiêu."],
          ]}
        />
      </Section>

      <Section {...S.traits}>
        <Table
          head={["Đặc điểm", "Mô tả", "Ví dụ minh họa (giả định)"]}
          widths={[260]}
          rows={[
            { icon: "analytics", cells: ["Thu gián tiếp qua công cụ", "Khảo sát, analytics, nền tảng test.", "Công cụ ghi tỷ lệ hoàn thành đặt lịch."] },
            { icon: "target", cells: ["Chỉ số xác định trước", "Biết trước sẽ đo gì.", "Tỷ lệ hoàn thành, thời gian, điểm SUS."] },
            { icon: "users", highlight: true, cells: ["Nhiều người", "Theo NN/g, usability test định lượng thường cần hơn 30 người.", "50 người làm cùng tác vụ."] },
            { icon: "sigma", cells: ["Phân tích bằng tính toán", "Tỷ lệ, trung bình, khoảng tin cậy, kiểm định.", "Khoảng tin cậy cho tỷ lệ hoàn thành."] },
            { icon: "rotate", cells: ["Lặp lại được", "Cùng cách đo cho phép so sánh.", "Đo lại sau mỗi phiên bản."] },
          ]}
        />
      </Section>

      <Section {...S.methods}>
        <Table
          head={["Phương pháp", "Đo gì", "Bài liên quan"]}
          widths={[320]}
          rows={[
            { icon: "clipboard-check", cells: ["Khảo sát", "Thái độ, ý định, đặc điểm.", "Survey, Likert Scale, NPS"] },
            { icon: "analytics", cells: ["Analytics", "Hành vi trên sản phẩm.", "Clickstream Analysis, Heatmap"] },
            { icon: "split", cells: ["A/B testing, multivariate testing", "Khác biệt hành vi giữa các phiên bản.", "A/B Testing, Multivariate Testing"] },
            { icon: "gauge", cells: ["Usability test định lượng", "Tỷ lệ hoàn thành, thời gian, lỗi.", "Benchmark Study"] },
            { icon: "target", cells: ["First-click testing, tree testing", "Tỷ lệ đúng khi tìm kiếm, điều hướng.", "First-Click Testing"] },
            { icon: "eye", cells: ["Eye tracking (heatmap)", "Tỷ lệ người nhìn vào vùng, thời gian.", "Eye Tracking"] },
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
                "Cần biết mức độ phổ biến của một vấn đề.",
                "So sánh phiên bản, theo dõi theo thời gian, so với đối thủ (mục tiêu summative: đánh giá).",
                "Cần số liệu để ưu tiên hoặc thuyết phục.",
              ],
            ],
            ["eye", "Dấu hiệu nhận biết", ["Câu hỏi bắt đầu bằng “bao nhiêu”, “có khác biệt không”, “tăng hay giảm”."]],
            ["clipboard-check", "Điều kiện cần", ["Chỉ số rõ ràng, đo được.", "Đủ số người.", "Quy tắc quyết định chốt trước."]],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[300]}
          rows={[
            { icon: "list-search", cells: ["Chưa biết nên đo gì", "Chỉ số xác định trước có thể bỏ sót vấn đề thật.", "Nghiên cứu định tính trước."] },
            { icon: "chat", cells: ["Cần biết vì sao", "Số liệu không giải thích nguyên nhân.", "Phỏng vấn, usability test định tính."] },
            { icon: "users", cells: ["Không đủ người", "Khoảng tin cậy quá rộng.", "Định tính, hoặc chờ thu đủ dữ liệu."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định câu hỏi và chỉ số.", "", "Chỉ số chính."],
            ["Chọn phương pháp và công cụ.", "", "Kế hoạch đo."],
            ["Tính số người cần.", "Theo sai số chấp nhận được.", "Cỡ mẫu."],
            ["Chốt quy tắc quyết định.", "", "Tiêu chí, mức tin cậy."],
            ["Thu dữ liệu.", "", "Dữ liệu."],
            ["Phân tích.", "Tỷ lệ, trung bình, khoảng tin cậy.", "Kết quả kèm độ chắc chắn."],
            ["Kết hợp định tính để hiểu vì sao.", "", "Quyết định."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật. Usability test định lượng không điều phối: 50 người làm tác vụ “Đặt lịch tư vấn”.</Callout>
        <Subhead icon="check-circle">Bước 1: Tỷ lệ hoàn thành</Subhead>
        <Formula label="Tỷ lệ hoàn thành" formula="Số người hoàn thành ÷ Tổng số người" note="41 ÷ 50 = 82%" />
        <Subhead icon="bar-chart">Bước 2: Kết quả chắc chắn đến đâu</Subhead>
        <Formula label="Kết quả điều chỉnh" formula="(Số người hoàn thành + 2) ÷ (Tổng số người + 4)" note="(41 + 2) ÷ (50 + 4) = 43 ÷ 54 ≈ 79,6%" />
        <Formula label="Khoảng tin cậy" formula="Kết quả điều chỉnh ± Sai số" />
        <Table
          head={["Nhập vào công cụ tính khoảng tin cậy cho tỷ lệ", "Sai số", "Khoảng tin cậy 95%"]}
          widths={[420]}
          rows={[{ highlight: true, cells: ["41 hoàn thành trên 50 người", "≈ 11 điểm", "Khoảng 69% – 91%"] }]}
        />
        <Subhead icon="hourglass">Bước 3: Thời gian trung bình</Subhead>
        <P>Số liệu minh họa. Thời gian (giây) của 10 người hoàn thành đầu tiên: 62, 75, 58, 90, 71, 66, 84, 70, 59, 77.</P>
        <Formula label="Thời gian trung bình" formula="Tổng thời gian ÷ Số người" note="712 ÷ 10 = 71,2 giây" />
        <Table
          head={["Nhập vào công cụ tính khoảng tin cậy cho trung bình", "Kết quả"]}
          widths={[420]}
          rows={[{ highlight: true, cells: ["10 giá trị trên, mức tin cậy 95%", "Khoảng tin cậy ≈ 64 – 79 giây"] }]}
        />
        <P>Dữ liệu thời gian thường lệch (vài người rất chậm); một số công cụ tính trên dữ liệu đã biến đổi để xử lý điều này.</P>
        <Subhead icon="users">Bước 4: Cần bao nhiêu người</Subhead>
        <P>Sai số ước tính cho một tỷ lệ khoảng 50% (trường hợp sai số lớn nhất), mức tin cậy 95%:</P>
        <MarginChart />
        <Callout tone="note" title="Quy tắc dễ nhớ">
          Muốn sai số nhỏ đi một nửa → cần khoảng gấp bốn lần số người. Mức 95% là quy ước phổ biến; nhóm tự chọn theo rủi ro.
        </Callout>
        <Subhead icon="split">Bước 5: Quyết định</Subhead>
        <InfoCard
          tone="fill"
          icon="hourglass"
          title="Chưa chắc chắn đạt mục tiêu"
          body="Nhóm đặt mục tiêu (trước khi test) là tỷ lệ hoàn thành ít nhất 75%. Kết quả 82%, nhưng khoảng tin cậy 69–91% vẫn chứa giá trị dưới 75%. Có thể thu thêm người, hoặc chấp nhận kết quả và theo dõi tiếp."
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["target", "Chỉ đo những gì đã định trước", "Vấn đề nằm ngoài chỉ số sẽ bị bỏ sót."],
            ["chat", "Không cho biết vì sao", "Cần kết hợp định tính."],
            ["sigma", "Có ý nghĩa thống kê chưa chắc có ý nghĩa thực tế", "Khác biệt rất nhỏ cũng có thể “có ý nghĩa” với mẫu lớn."],
            ["users", "Mẫu không đại diện cho kết quả sai", "Dù số người lớn."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Câu hỏi, chỉ số, quy tắc quyết định.", "Công cụ đo.", "Đủ số người, mẫu đại diện."]}
          outputs={["Chỉ số kèm khoảng tin cậy.", "So sánh với mục tiêu, phiên bản trước, đối thủ.", "Quyết định và câu hỏi định tính tiếp theo."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard
          icon="component"
          title="Bối cảnh"
          body="Sau khi sửa luồng đặt lịch dựa trên nghiên cứu định tính, nhóm cần biết luồng mới có đạt mục tiêu không trước khi báo cáo lãnh đạo."
        />
        <InfoCard
          icon="analytics"
          title="Cách áp dụng và kết quả"
          body="Như phần Công thức. Tỷ lệ hoàn thành 82% (69–91%), thời gian trung bình 71 giây (64–79)."
        />
        <InfoCard
          tone="fill"
          icon="link"
          title="Kết hợp định tính"
          body="Xem lại video của 9 người không hoàn thành để hiểu nguyên nhân; nếu cùng một vấn đề lặp lại, sửa tiếp rồi đo lại."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Báo cáo con số không kèm khoảng tin cậy", "Người đọc tưởng chính xác.", "Luôn kèm khoảng tin cậy."],
            ["Đo trước khi biết nên đo gì", "Bỏ sót vấn đề thật.", "Nghiên cứu định tính trước."],
            ["Đổi quy tắc quyết định sau khi xem dữ liệu", "Kết luận theo ý muốn.", "Chốt trước."],
            ["Coi “có ý nghĩa thống kê” là “quan trọng”", "Khác biệt nhỏ có thể không đáng đầu tư.", "Xem cả độ lớn của khác biệt."],
            ["Gọi “4/6 người” là định lượng", "Mẫu nhỏ, không đo theo công cụ chuẩn.", "Gọi đúng là định tính."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["", "Định lượng", "Định tính"]}
          widths={[260]}
          rows={[
            { icon: "analytics", cells: ["Cách thu", "Gián tiếp, qua công cụ.", "Trực tiếp: quan sát, nghe."] },
            { icon: "list-search", cells: ["Câu hỏi", "Bao nhiêu? Mức độ nào?", "Vì sao? Sửa thế nào?"] },
            { icon: "users", cells: ["Số người (usability test, theo NN/g)", "Thường hơn 30.", "Khoảng 5–8."] },
            { icon: "sigma", cells: ["Phân tích", "Thống kê, tính toán.", "Diễn giải, gom chủ đề."] },
            { icon: "target", cells: ["Mục tiêu chính", "Đánh giá (summative).", "Định hướng thiết kế (formative)."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Chuẩn bị"
            items={["Câu hỏi là “bao nhiêu”, “mức độ nào”.", "Chỉ số rõ ràng, xác định trước.", "Đã tính số người theo sai số chấp nhận được.", "Quy tắc quyết định chốt trước."]}
          />
          <ChecklistColumn icon="analytics" title="Báo cáo" items={["Báo cáo kèm khoảng tin cậy.", "Kết hợp định tính để hiểu vì sao."]} />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Qualitative Research", "Nghiên cứu định tính", "Loại nghiên cứu bổ sung."],
            ["Confidence Intervals", "Khoảng tin cậy", "Cách đọc độ chắc chắn của kết quả."],
            ["A/B Testing", "Kiểm thử A/B", "Phương pháp định lượng so sánh."],
            ["Benchmark Study", "Nghiên cứu đối chuẩn", "Đo lặp lại để so sánh."],
            ["Survey", "Khảo sát", "Công cụ định lượng phổ biến."],
            ["UX Metrics", "Chỉ số UX", "Các chỉ số thường đo."],
            ["Usability Testing", "Kiểm thử khả năng sử dụng", "Dạng định lượng đo tỷ lệ thành công, thời gian."],
          ]}
        />
      </Section>
    </div>
  );
}

export const QUANTITATIVE_RESEARCH: Article = {
  slug: "quantitative-research",
  version: 1,
  term: "Quantitative Research",
  fn: 1,
  vi: "Nghiên cứu định lượng",
  kind: "Chỉ số / thống kê",
  definition:
    "Quantitative research là nghiên cứu thu dữ liệu gián tiếp qua một công cụ đo (khảo sát, analytics, nền tảng test) với các chỉ số được xác định trước, và phân tích bằng tính toán.",
  definitionMore:
    "Nghiên cứu định lượng phù hợp để trả lời câu hỏi bao nhiêu và ở mức độ nào: tỷ lệ hoàn thành, thời gian, mức hài lòng, khác biệt giữa hai phiên bản.",
  oneLine: "Đo bằng số với nhiều người để trả lời bao nhiêu và ở mức độ nào.",
  glance: [
    ["82%", "Tỷ lệ hoàn thành trong ví dụ"],
    ["30+", "Người cho usability test định lượng (NN/g)"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Quant research", "Quant"] },
    { label: "Nhóm chính", items: ["Đo lường và phân tích"] },
    { label: "Thẻ phụ", items: ["Nền tảng và nguyên tắc"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "“Định lượng” nghĩa là dữ liệu được đo bằng số và phân tích bằng tính toán. Có số liệu chưa chắc đã là nghiên cứu định lượng: “4 trong 6 người” từ một buổi test định tính vẫn là dữ liệu định tính.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
