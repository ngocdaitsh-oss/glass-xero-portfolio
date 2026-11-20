"use client";

import { Blk, T } from "./edit";
import { CheckCards, Formula, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Statistical Significance — copy from ux-glossary/statistical-significance.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "concepts", title: "Các khái niệm chính", icon: "component" },
  { id: "not-say", title: "Những điều p-value không nói", icon: "ban" },
  { id: "when", title: "Khi nào cần kiểm tra ý nghĩa thống kê", icon: "check-circle" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "maths", title: "Công thức và ví dụ tính", icon: "sigma" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** The difference's CI on a −1…+3 axis next to zero, then 20 null tests where about one comes out "significant" by chance. */
function SignificanceChart() {
  const x = (v: number) => `${((v + 1) / 4) * 100}%`;
  return (
    <Blk label="biểu đồ" className="g-card flex flex-col gap-8 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="bar-chart" size={36} iconSize={18} radius={10} />
        <Eyebrow>Chênh lệch B − A và khoảng tin cậy 95%</Eyebrow>
      </div>
      <div className="flex flex-col gap-2">
        <div className="relative mt-8 h-14 rounded-xl bg-[var(--d-well)]">
          <span className="absolute inset-y-0 w-0.5 bg-[var(--d-bad)]" style={{ left: x(0) }} />
          <span className="absolute -top-7 -translate-x-1/2 text-[14px] font-semibold text-[var(--d-bad)]" style={{ left: x(0) }}>
            0 (không khác biệt)
          </span>
          <span className="absolute top-1/2 h-4 -translate-y-1/2 rounded-full bg-[var(--d-ci)]" style={{ left: x(0.3), width: `calc(${x(2.5)} - ${x(0.3)})` }} />
          <span className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--d-accent)]" style={{ left: x(1.4) }} />
          <span className="absolute -top-7 -translate-x-1/2 text-[14px] font-semibold whitespace-nowrap text-[var(--d-accent)]" style={{ left: x(1.4) }}>
            +1,4 (+0,3 đến +2,5)
          </span>
        </div>
        <div className="flex justify-between font-mono text-[13px] text-[var(--w-muted)]">
          {["−1", "0", "+1", "+2", "+3"].map((v) => (
            <span key={v}>{v}</span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div className="grid shrink-0 grid-cols-10 gap-1.5">
          {Array.from({ length: 20 }, (_, i) => (
            <span key={i} className={`size-6 rounded-md ${i === 13 ? "bg-[var(--d-bad)]" : "bg-[var(--d-well)]"}`} />
          ))}
        </div>
        <span className="text-[15px] leading-[22px] text-[var(--w-secondary)]">
          20 lần kiểm tra khi thật ra không có khác biệt: 20 × 0,05 ≈ 1 kết quả “có ý nghĩa” do ngẫu nhiên (ô đỏ).
        </span>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Khoảng tin cậy nằm hoàn toàn bên phải 0 → có ý nghĩa thống kê (p ≈ 0,013). Cải thiện thật có thể nhỏ (0,3 điểm) hoặc khá lớn (2,5 điểm).
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
            Khi so sánh hai phiên bản, kết quả gần như không bao giờ bằng nhau tuyệt đối, kể cả khi hai phiên bản thật ra tốt như nhau. Câu hỏi là: khác biệt nhìn thấy có thật không, hay chỉ
            là dao động ngẫu nhiên?
          </P>
          <P strong>Kiểm tra ý nghĩa thống kê cho một cách có hệ thống để trả lời câu hỏi đó, thay vì dựa vào cảm giác “khác biệt trông khá lớn”.</P>
        </div>
        <Eyebrow>Ý nghĩa thống kê hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          cols={3}
          minH={150}
          items={[
            ["check-circle", "Có nên tin vào khác biệt", "Giữa hai phiên bản."],
            ["users", "Có cần thêm dữ liệu không", "Trước khi kết luận."],
            ["ban", "Tránh hành động theo “chiến thắng” ngẫu nhiên", "Có hệ thống thay vì cảm giác."],
          ]}
        />
      </Section>

      <Section {...S.concepts}>
        <Table
          head={["Khái niệm", "Diễn giải bằng lời", "Ví dụ minh họa (giả định)"]}
          widths={[240]}
          rows={[
            { icon: "split", cells: ["Giả thuyết “không khác biệt”", "Giả định ban đầu: hai phiên bản thật ra như nhau.", "Nút mới và nút cũ có cùng tỷ lệ đặt lịch thật."] },
            {
              icon: "sigma",
              highlight: true,
              cells: ["p-value", "Nếu giả thuyết “không khác biệt” đúng, khả năng thấy khác biệt lớn như vậy (hoặc lớn hơn) do ngẫu nhiên là bao nhiêu.", "p ≈ 0,013: khoảng 1,3%."],
            },
            { icon: "target", cells: ["Ngưỡng (alpha)", "Mức p mà dưới đó ta coi là có ý nghĩa; chọn trước khi xem dữ liệu.", "0,05 theo quy ước; 0,01 khi rủi ro cao."] },
            { icon: "bar-chart", cells: ["Khoảng tin cậy", "Khoảng các giá trị hợp lý cho khác biệt thật.", "Khác biệt thật nằm khoảng +0,3 đến +2,5 điểm."] },
            { icon: "gauge", cells: ["Độ lớn của khác biệt", "Khác biệt lớn đến đâu trên thực tế.", "+1,4 điểm phần trăm."] },
          ]}
        />
      </Section>

      <Section {...S["not-say"]}>
        <P>Năm 2016, Hiệp hội Thống kê Hoa Kỳ (ASA) đưa ra tuyên bố gồm sáu nguyên tắc về p-value. Một số nguyên tắc chính:</P>
        <InfoGrid
          items={[
            ["sigma", "p-value cho biết dữ liệu không khớp với một mô hình thống kê đến mức nào", "Đó là điều duy nhất nó đo."],
            ["ban", "p-value không phải xác suất giả thuyết là đúng", "Cũng không phải xác suất dữ liệu chỉ do ngẫu nhiên tạo ra."],
            ["alert", "Không quyết định chỉ dựa vào ngưỡng", "Không nên đưa ra kết luận hay quyết định chỉ dựa vào việc p vượt hay không vượt một ngưỡng."],
            ["file", "Báo cáo đầy đủ và minh bạch", "Không chỉ báo cáo kết quả “có ý nghĩa”."],
          ]}
        />
        <P>p-value cũng không đo độ lớn của tác động hay tầm quan trọng của kết quả.</P>
        <Callout tone="note" title="Cảnh báo của Nielsen (NN/g)">
          Nếu kiểm tra 20 câu hỏi mà thật ra không có khác biệt nào, trung bình vẫn sẽ có khoảng 1 kết quả “có ý nghĩa” do ngẫu nhiên. Vấn đề nằm ở việc “câu cá” (thử nhiều thứ để tìm kết quả
          đẹp) mà không có giả thuyết từ trước. Giả thuyết dựa trên hiểu biết định tính ít khả năng sai hơn.
        </Callout>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "target",
              "Bối cảnh phù hợp",
              ["So sánh hai hay nhiều phiên bản (A/B test, multivariate test).", "So sánh chỉ số giữa hai thời điểm, hai nhóm người dùng.", "Nghiên cứu định lượng có đủ dữ liệu."],
            ],
            [
              "ban",
              "Không phù hợp",
              ["Nghiên cứu định tính với vài người (mục tiêu là hiểu, không phải đo).", "Mô tả một nhóm mà không so sánh (dùng khoảng tin cậy thay vào đó)."],
            ],
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Đặt câu hỏi và giả thuyết trước.", "", "Giả thuyết cụ thể, dựa trên hiểu biết từ trước."],
            ["Chọn ngưỡng và cỡ mẫu trước.", "", "Ngưỡng (ví dụ 0,05), số người cần."],
            ["Thu dữ liệu đủ, không dừng sớm.", "", "Dữ liệu."],
            ["Tính p-value và khoảng tin cậy bằng công cụ.", "", "Kết quả thống kê."],
            ["Xem độ lớn của khác biệt.", "Khác biệt có đủ lớn để đáng hành động không.", "Đánh giá ý nghĩa thực tế."],
            ["Quyết định và báo cáo đầy đủ.", "", "Quyết định, báo cáo minh bạch."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <P>p-value được tính bằng công cụ thống kê; bài này không dùng công thức phức tạp. Phần dưới giải thích cách đọc kết quả.</P>
        <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật. A/B test nút đặt lịch trên trang dịch vụ, mỗi phiên bản 5.000 người.</Callout>
        <Subhead icon="sigma">Bước 1: Tỷ lệ và chênh lệch</Subhead>
        <Formula label="Tỷ lệ" formula="Số người đặt lịch ÷ Số người thấy phiên bản" note="A: 400 ÷ 5.000 = 8,0%. B: 470 ÷ 5.000 = 9,4%." />
        <Formula label="Chênh lệch" formula="Tỷ lệ B − Tỷ lệ A" note="9,4 − 8,0 = +1,4 điểm phần trăm" />
        <Subhead icon="bar-chart">Bước 2: Nhập vào công cụ</Subhead>
        <Table
          head={["Nhập vào công cụ so sánh hai tỷ lệ", "Kết quả"]}
          widths={[400]}
          rows={[{ highlight: true, cells: ["A: 400/5.000, B: 470/5.000, ngưỡng 0,05", "p-value ≈ 0,013; khoảng tin cậy 95% của chênh lệch ≈ +0,3 đến +2,5 điểm"] }]}
        />
        <SignificanceChart />
        <Subhead icon="eye">Bước 3: Đọc kết quả</Subhead>
        <InfoGrid
          items={[
            ["check-circle", "p ≈ 0,013 < 0,05", "Có ý nghĩa thống kê theo ngưỡng đã chọn."],
            ["chat", "Diễn giải bằng lời", "Nếu hai nút thật ra tốt như nhau, khả năng thấy chênh lệch lớn như thế này do ngẫu nhiên chỉ khoảng 1,3%."],
            ["ban", "Không có nghĩa là", "“Có 98,7% khả năng B tốt hơn”."],
            ["bar-chart", "Khoảng tin cậy", "Cải thiện thật có thể nhỏ (0,3 điểm) hoặc khá lớn (2,5 điểm)."],
          ]}
        />
        <Subhead icon="alert">Bước 4: Cảnh báo khi kiểm tra nhiều lần</Subhead>
        <Formula
          label="Số kết quả “có ý nghĩa” do ngẫu nhiên dự kiến"
          formula="Số lần kiểm tra × Ngưỡng"
          note="Kiểm tra 20 chỉ số mà thật ra không có khác biệt nào: 20 × 0,05 = khoảng 1 kết quả “có ý nghĩa” sai."
        />
        <P>Khi buộc phải so sánh nhiều lần, có thể dùng ngưỡng chặt hơn: Ngưỡng chặt hơn = Ngưỡng ÷ Số lần so sánh (xem bài Multivariate Testing).</P>
        <Subhead icon="split">Bước 5: Quyết định</Subhead>
        <InfoCard
          tone="fill"
          icon="check-circle"
          title="Có ý nghĩa thống kê, nhưng cần hỏi thêm"
          body="Ngay cả khi cải thiện chỉ 0,3 điểm (đầu thấp của khoảng tin cậy), thay đổi có đáng không? Với việc đổi một nút, chi phí thấp → áp dụng. Với thay đổi tốn kém, có thể cần thêm dữ liệu để thu hẹp khoảng tin cậy."
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          cols={3}
          items={[
            ["gauge", "Có ý nghĩa thống kê ≠ quan trọng trên thực tế", "Xem độ lớn của khác biệt."],
            ["users", "Không có ý nghĩa thống kê ≠ không có khác biệt", "Có thể chỉ là chưa đủ dữ liệu."],
            ["alert", "Kiểm tra nhiều lần làm tăng kết quả sai", "Cần hiệu chỉnh ngưỡng."],
            ["hourglass", "Dừng sớm khi thấy p đẹp", "Làm kết quả không đáng tin."],
            ["target", "Ngưỡng 0,05 là quy ước", "Không phải ranh giới tự nhiên giữa đúng và sai."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Giả thuyết, ngưỡng, cỡ mẫu chọn trước.", "Dữ liệu đủ.", "Công cụ tính."]}
          outputs={["p-value, khoảng tin cậy, độ lớn của khác biệt.", "Đánh giá ý nghĩa thực tế.", "Quyết định và báo cáo đầy đủ."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard
          icon="component"
          title="Bối cảnh"
          body="Sau A/B test, nhóm sản phẩm báo cáo “nút mới thắng, có ý nghĩa thống kê” và muốn áp dụng thêm 10 thay đổi khác theo cùng cách."
        />
        <InfoCard icon="analytics" title="Đọc kết quả (theo phần tính toán ở trên)" body="p ≈ 0,013, cải thiện có thể từ 0,3 đến 2,5 điểm." />
        <InfoCard
          tone="fill"
          icon="chat"
          title="Góp ý cho nhóm"
          body="Báo cáo kèm khoảng tin cậy, không chỉ “có ý nghĩa”. Với 10 thay đổi tiếp theo: mỗi thay đổi cần giả thuyết từ nghiên cứu (heatmap, usability test), chốt ngưỡng trước; nếu kiểm tra nhiều thay đổi cùng lúc, dùng ngưỡng chặt hơn."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["“p = 0,013 nghĩa là 98,7% khả năng B tốt hơn”", "p không phải xác suất giả thuyết đúng.", "Diễn giải đúng: khả năng thấy kết quả này nếu không có khác biệt."],
            ["“Có ý nghĩa” = quan trọng", "Khác biệt có thể rất nhỏ.", "Xem độ lớn và khoảng tin cậy."],
            ["“Không có ý nghĩa” = không khác biệt", "Có thể thiếu dữ liệu.", "Xem khoảng tin cậy; cân nhắc thu thêm."],
            ["Thử nhiều thứ, báo cáo cái “có ý nghĩa”", "Tăng kết quả sai.", "Giả thuyết trước; hiệu chỉnh ngưỡng; báo cáo đầy đủ."],
            ["Dừng sớm khi p xuống dưới 0,05", "Kết quả không đáng tin.", "Chốt cỡ mẫu trước."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Trả lời câu hỏi"]}
          widths={[380]}
          rows={[
            { icon: "sigma", highlight: true, cells: ["Statistical Significance (p-value)", "Kết quả có khó xảy ra do ngẫu nhiên không?"] },
            { icon: "bar-chart", cells: ["Confidence Intervals", "Giá trị thật có thể nằm trong khoảng nào?"] },
            { icon: "gauge", cells: ["Practical significance (ý nghĩa thực tế)", "Khác biệt có đủ lớn để đáng hành động không?"] },
            { icon: "eye", cells: ["Statistical power (độ mạnh)", "Nếu có khác biệt thật, khả năng phát hiện được là bao nhiêu?"] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn icon="file" title="Trước khi chạy" items={["Giả thuyết có từ trước, dựa trên hiểu biết.", "Ngưỡng và cỡ mẫu chốt trước.", "Không dừng sớm."]} />
          <ChecklistColumn
            icon="analytics"
            title="Khi báo cáo"
            items={["Báo cáo p-value kèm khoảng tin cậy và độ lớn.", "Hiệu chỉnh khi so sánh nhiều lần.", "Đánh giá ý nghĩa thực tế trước khi quyết định."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Confidence Intervals", "Khoảng tin cậy", "Cách đọc bổ sung, cho biết độ lớn."],
            ["A/B Testing", "Kiểm thử A/B", "Nơi dùng kiểm tra ý nghĩa thống kê nhiều nhất."],
            ["Multivariate Testing", "Kiểm thử đa biến", "Cần hiệu chỉnh khi so sánh nhiều lần."],
            ["Quantitative Research", "Nghiên cứu định lượng", "Bối cảnh dùng ý nghĩa thống kê."],
            ["Qualitative Research", "Nghiên cứu định tính", "Nguồn giả thuyết tốt trước khi kiểm tra."],
            ["Benchmark Study", "Nghiên cứu đối chuẩn", "So sánh giữa các lần đo."],
          ]}
        />
      </Section>
    </div>
  );
}

export const STATISTICAL_SIGNIFICANCE: Article = {
  slug: "statistical-significance",
  version: 1,
  term: "Statistical Significance",
  fn: 6,
  vi: "Ý nghĩa thống kê",
  kind: "Chỉ số / thống kê",
  definition:
    "Một kết quả được gọi là có ý nghĩa thống kê khi khả năng nó xảy ra do ngẫu nhiên (nếu thật ra không có khác biệt hay tác động nào) đủ nhỏ, nhỏ hơn một ngưỡng chọn trước. Khả năng đó được gọi là p-value.",
  definitionMore: "Theo quy ước phổ biến, p nhỏ hơn 0,05 (5%) được coi là có ý nghĩa; với quyết định rủi ro cao, có thể dùng ngưỡng chặt hơn như 0,01.",
  oneLine: "Kết quả khó xảy ra do ngẫu nhiên đến mức nào; có ý nghĩa thống kê chưa chắc đã quan trọng.",
  glance: [
    ["0,013", "p-value trong ví dụ"],
    ["+1,4", "Điểm phần trăm chênh lệch"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Significance", "“Có ý nghĩa thống kê”"] },
    { label: "Nhóm chính", items: ["Đo lường và phân tích"] },
    { label: "Thẻ phụ", items: ["Nền tảng và nguyên tắc"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "“Có ý nghĩa thống kê” không có nghĩa là quan trọng. Nó chỉ nói rằng kết quả khó xảy ra do ngẫu nhiên nếu thật ra không có khác biệt. Một khác biệt rất nhỏ, không đáng đầu tư, vẫn có thể “có ý nghĩa thống kê” khi có nhiều dữ liệu.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
