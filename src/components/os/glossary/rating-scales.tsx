"use client";

import { Blk, T } from "./edit";
import { CheckCards, Formula, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Rating Scales — copy from ux-glossary/rating-scales.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "types", title: "Các loại thang đánh giá", icon: "component" },
  { id: "design", title: "Các quyết định khi thiết kế thang", icon: "pencil" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "maths", title: "Công thức và ví dụ tính", icon: "sigma" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

const COUNTS = [0, 1, 2, 3, 5, 6, 3];

/** 20 answers on a 7-point semantic differential; the top two levels are highlighted. */
function Histogram() {
  const max = Math.max(...COUNTS);
  return (
    <Blk label="biểu đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="bar-chart" size={36} iconSize={18} radius={10} />
        <Eyebrow>Phân bố 20 câu trả lời: Khó hiểu (1) – Dễ hiểu (7)</Eyebrow>
      </div>
      <div className="flex h-[200px] items-end gap-3">
        {COUNTS.map((c, i) => (
          <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
            <span className="font-mono text-[15px] font-semibold">{c}</span>
            <span className={`w-full rounded-t-lg ${i >= 5 ? "bg-[var(--d-ci)]" : "bg-[var(--d-ci-weak)]"}`} style={{ height: `${(c / max) * 150}px`, minHeight: 4 }} />
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        {COUNTS.map((_, i) => (
          <span key={i} className="flex-1 text-center font-mono text-[14px] text-[var(--w-muted)]">
            {i + 1}
          </span>
        ))}
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Trung bình 5,1; hai mức cao nhất (tô đậm) chiếm 9 ÷ 20 = 45%. Luôn xem phân bố trước khi tóm tắt bằng một con số.
      </T>
    </Blk>
  );
}

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Section {...S.problem}>
        <div className="flex flex-col gap-5">
          <P strong>Câu hỏi có/không quá thô; câu hỏi mở khó tổng hợp. Thang đánh giá nằm giữa: có mức độ và dễ tổng hợp.</P>
          <P>
            Nhưng chọn sai loại thang, hoặc thiết kế thang không cẩn thận, khiến dữ liệu khó diễn giải: người trả lời hiểu nhãn khác nhau, thang lệch về một phía, hay câu hỏi đo hai ý cùng lúc.
          </P>
        </div>
        <Eyebrow>Thang đánh giá hỗ trợ</Eyebrow>
        <InfoGrid
          cols={3}
          minH={150}
          items={[
            ["gauge", "Đo cảm nhận", "Về một khía cạnh."],
            ["split", "So sánh", "Giữa phiên bản, thời điểm, nhóm người dùng."],
            ["sigma", "Tạo chỉ số chuẩn", "NPS, SUS, CES."],
          ]}
        />
      </Section>

      <Section {...S.types}>
        <Table
          head={["Loại", "Cách hỏi", "Ví dụ minh họa (giả định)", "Bài liên quan"]}
          widths={[220]}
          rows={[
            { icon: "check-circle", cells: ["Likert", "Mức độ đồng ý với một câu phát biểu.", "“Tôi thấy đặt lịch dễ dàng”: Rất không đồng ý → Rất đồng ý.", "Likert Scale"] },
            { icon: "arrows", highlight: true, cells: ["Semantic differential", "Vị trí giữa hai tính từ trái nghĩa.", "Khó hiểu ○○○○○○○ Dễ hiểu", "—"] },
            { icon: "sigma", cells: ["Thang số", "Chấm điểm trên dãy số, thường chỉ ghi nhãn hai đầu.", "“Khả năng bạn giới thiệu dịch vụ, từ 0 đến 10.”", "Net Promoter Score"] },
            { icon: "gauge", cells: ["Thang mức độ (không phải đồng ý)", "Mức độ của một thuộc tính: dễ/khó, hài lòng, nỗ lực.", "“Việc đổi lịch dễ đến mức nào?” Rất khó → Rất dễ.", "Customer Effort Score"] },
            { icon: "check", cells: ["Sao (star rating)", "Chấm 1–5 sao.", "Đánh giá buổi tư vấn.", "—"] },
          ]}
        />
        <P>
          NN/g so sánh hai loại phổ biến nhất: Likert đo mức độ đồng ý, còn semantic differential đặt người trả lời giữa hai cực, giúp đo sắc thái của một thuộc tính mà không cần viết câu
          phát biểu.
        </P>
      </Section>

      <Section {...S.design}>
        <Table
          head={["Quyết định", "Lựa chọn", "Lưu ý"]}
          widths={[220]}
          rows={[
            { icon: "list", cells: ["Số mức", "Thường 5; đôi khi 7 hoặc 9 (theo NN/g với Likert); 0–10 cho NPS.", "Giữ nguyên trong cùng nghiên cứu để so sánh được."] },
            { icon: "target", cells: ["Có điểm giữa không", "Số mức lẻ có điểm trung lập.", "Bỏ điểm giữa buộc người trả lời chọn bên, nhưng có thể ép người thật sự trung lập."] },
            { icon: "pencil", cells: ["Nhãn", "Nhãn cho mọi mức, hoặc chỉ hai đầu.", "NN/g khuyên dùng nhãn bằng chữ cho mỗi mức với thang Likert."] },
            { icon: "arrows", cells: ["Hướng thang", "Tích cực bên trái hay bên phải.", "Thống nhất trong cùng bảng hỏi."] },
            { icon: "split", cells: ["Cân bằng", "Số mức tích cực bằng số mức tiêu cực.", "Thang lệch (“Tốt / Rất tốt / Tuyệt vời”) cho kết quả lệch."] },
          ]}
        />
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            ["target", "Bối cảnh phù hợp", ["Khảo sát thái độ, cảm nhận.", "Câu hỏi sau tác vụ trong usability test.", "Theo dõi chỉ số theo thời gian."]],
            ["eye", "Dấu hiệu nhận biết", ["Cần biết “mức độ” chứ không chỉ “có hay không”."]],
            ["clipboard-check", "Điều kiện cần", ["Loại thang phù hợp với câu hỏi.", "Thang thống nhất giữa các lần đo."]],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[340]}
          rows={[
            { icon: "play-circle", cells: ["Cần biết hành vi", "Thang đo điều người ta nói.", "Analytics, quan sát."] },
            { icon: "chat", cells: ["Cần biết vì sao", "Con số không giải thích lý do.", "Câu hỏi mở kèm theo, phỏng vấn."] },
            { icon: "split", cells: ["Cần chỉ số so sánh được với nơi khác", "Thang tự thiết kế khó so sánh.", "Bảng hỏi chuẩn (SUS, NPS)."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định điều cần đo.", "", "Thuộc tính, thái độ cần đo."],
            ["Chọn loại thang.", "Đồng ý (Likert), giữa hai cực (semantic differential), mức độ, hay thang số chuẩn.", "Loại thang."],
            ["Thiết kế thang.", "Số mức, nhãn, điểm giữa, hướng, cân bằng.", "Thang hoàn chỉnh."],
            ["Thử với vài người.", "", "Thang đã chỉnh."],
            ["Thu và phân tích.", "Phân bố, tỷ lệ hai mức cao nhất, trung bình kèm khoảng tin cậy.", "Kết quả."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <Callout tone="scenario">
          Số liệu minh họa, không phải dữ liệu thật. 20 khách chấm thang semantic differential 7 mức cho trang dịch vụ: “Khó hiểu (1) ○○○○○○○ Dễ hiểu (7)”.
        </Callout>
        <Histogram />
        <Subhead icon="sigma">Tổng điểm và điểm trung bình</Subhead>
        <Formula
          label="Tổng điểm"
          formula="Mỗi mức × Số người chọn mức đó, cộng lại"
          note="2 × 1 + 3 × 2 + 4 × 3 + 5 × 5 + 6 × 6 + 7 × 3 = 2 + 6 + 12 + 25 + 36 + 21 = 102"
        />
        <Formula label="Điểm trung bình" formula="Tổng điểm ÷ Số người" note="102 ÷ 20 = 5,1" />
        <Subhead icon="check-circle">Tỷ lệ hai mức cao nhất</Subhead>
        <Formula label="Tỷ lệ hai mức cao nhất" formula="(Số người chọn 6 + Số người chọn 7) ÷ Số người" note="(6 + 3) ÷ 20 = 9 ÷ 20 = 45%" />
        <InfoGrid
          cols={3}
          items={[
            ["bar-chart", "Xem phân bố trước", "Luôn xem phân bố trước khi tóm tắt bằng một con số."],
            ["list", "Các mức là thứ tự", "Khoảng cách giữa các mức không chắc bằng nhau, nên báo cáo trung bình kèm phân bố."],
            ["users", "20 người, khoảng tin cậy rộng", "Cách tính khoảng tin cậy cho tỷ lệ và trung bình giống bài Likert Scale và Confidence Intervals."],
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["chat", "Đo điều người ta nói", "Không phải điều họ làm."],
            ["target", "Xu hướng chọn mức giữa hoặc đồng ý", "Tùy cách hỏi."],
            ["split", "So sánh chỉ có ý nghĩa khi thang giống nhau", "Đổi thang thì không so được."],
            ["users", "Văn hóa ảnh hưởng cách chấm", "Một số nhóm hiếm khi chọn mức cao nhất."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards inputs={["Điều cần đo.", "Loại thang và thiết kế thang."]} outputs={["Phân bố, trung bình, tỷ lệ hai mức cao nhất.", "Kết quả so sánh nếu có."]} />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard
          icon="component"
          title="Bối cảnh"
          body="Nhóm muốn đo cảm nhận về trang dịch vụ sau khi thay đổi nội dung, ở ba khía cạnh: dễ hiểu, đáng tin, rõ chi phí."
        />
        <InfoCard
          icon="arrows"
          title="Chọn thang"
          body="Semantic differential 7 mức cho cả ba khía cạnh (“Khó hiểu – Dễ hiểu”, “Khó tin – Đáng tin”, “Mơ hồ về chi phí – Rõ về chi phí”), vì cần đo sắc thái của từng thuộc tính mà không phải viết câu phát biểu."
        />
        <InfoCard
          tone="fill"
          icon="analytics"
          title="Kết quả “dễ hiểu” (theo phần tính toán ở trên)"
          body="Trung bình 5,1; 45% chọn hai mức cao nhất. Đo lại bằng đúng thang này sau lần thay đổi tiếp theo để so sánh."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Thang không cân bằng", "Kết quả lệch về một phía.", "Số mức tích cực bằng tiêu cực."],
            ["Đổi số mức giữa các lần đo", "Không so sánh được.", "Giữ nguyên thang."],
            ["Dùng Likert cho thuộc tính hai cực", "Câu phát biểu dài, dễ dẫn dắt.", "Dùng semantic differential."],
            ["Cặp tính từ không thật sự trái nghĩa", "Người trả lời bối rối.", "Chọn cặp đối lập rõ ràng."],
            ["Chỉ báo cáo trung bình", "Che mất phân bố.", "Kèm phân bố, tỷ lệ hai mức cao nhất."],
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn icon="pencil" title="Thiết kế" items={["Loại thang phù hợp với câu hỏi.", "Thang cân bằng, nhãn rõ.", "Số mức thống nhất trong nghiên cứu và giữa các lần đo."]} />
          <ChecklistColumn icon="analytics" title="Thu và báo cáo" items={["Đã thử với vài người.", "Báo cáo phân bố kèm con số tóm tắt."]} />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Likert Scale", "Thang Likert", "Một loại thang đánh giá."],
            ["Net Promoter Score (NPS)", "Chỉ số khách hàng giới thiệu", "Dùng thang số 0–10."],
            ["Customer Effort Score (CES)", "Điểm nỗ lực khách hàng", "Dùng thang mức độ."],
            ["Survey", "Khảo sát", "Nơi thang đánh giá thường xuất hiện."],
            ["Attitudinal Methods", "Phương pháp nghiên cứu thái độ", "Thang đánh giá là công cụ đo thái độ."],
            ["Quantitative Research", "Nghiên cứu định lượng", "Phân tích dữ liệu thang đo."],
          ]}
        />
      </Section>
    </div>
  );
}

export const RATING_SCALES: Article = {
  slug: "rating-scales",
  version: 1,
  term: "Rating Scales",
  fn: 6,
  vi: "Thang đánh giá",
  kind: "Chỉ số / thống kê",
  definition:
    "Rating scale là dạng câu hỏi cho người trả lời chọn một vị trí trên một dãy mức có thứ tự (ví dụ 1–5, 0–10, hay giữa hai tính từ trái nghĩa) để thể hiện mức độ của một thái độ hay cảm nhận.",
  definitionMore: "Mỗi loại thang phù hợp với một kiểu câu hỏi khác nhau.",
  oneLine: "Câu hỏi chấm điểm trên một dãy mức có thứ tự để đo thái độ và cảm nhận.",
  glance: [
    ["5,1", "Điểm trung bình trong ví dụ"],
    ["45%", "Chọn hai mức cao nhất"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Thang đo", "Rating questions"] },
    { label: "Nhóm chính", items: ["Đo lường và phân tích"] },
    { label: "Thẻ phụ", items: ["Nghiên cứu thái độ"] },
    { label: "Lưu ý tên gọi", items: ["Đây là khái niệm chung cho các dạng câu hỏi chấm điểm. Thang Likert (mức độ đồng ý) là một loại, có bài riêng."] },
  ],
  sections: SECTIONS,
  Body,
};
