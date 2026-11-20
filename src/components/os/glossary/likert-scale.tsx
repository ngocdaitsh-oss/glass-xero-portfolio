"use client";

import { Blk, T } from "./edit";
import { CheckCards, Formula, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Stat, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Likert Scale — copy from ux-glossary/likert-scale.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "parts", title: "Thành phần của một câu Likert", icon: "component" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "maths", title: "Công thức và ví dụ tính", icon: "sigma" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các thang đo gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

const COUNTS: [string, number, string][] = [
  ["1 Rất không đồng ý", 3, "bg-[var(--d-bad)] text-white"],
  ["2 Không đồng ý", 5, "bg-[var(--d-bad-soft)]"],
  ["3 Trung lập", 8, "bg-[var(--d-ci-weak)]"],
  ["4 Đồng ý", 14, "bg-[var(--d-ci)]"],
  ["5 Rất đồng ý", 10, "bg-[var(--d-fill)] text-white"],
];

/** The 40 answers as one stacked bar, read before any summary number. */
function Distribution() {
  return (
    <Blk label="biểu đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="bar-chart" size={36} iconSize={18} radius={10} />
        <Eyebrow>Phân bố 40 câu trả lời</Eyebrow>
      </div>
      <div className="flex h-16 gap-1">
        {COUNTS.map(([l, n, c]) => (
          <span key={l} className={`flex items-center justify-center rounded-[12px] font-mono text-[16px] font-semibold ${c}`} style={{ width: `${(n / 40) * 100}%` }}>
            {n}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-[15px] leading-[22px] text-[var(--w-secondary)]">
        {COUNTS.map(([l, , c]) => (
          <span key={l} className="flex items-center gap-2">
            <span className={`size-3.5 rounded-[4px] ${c}`} />
            {l}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-[8fr_8fr_24fr] gap-1 font-mono text-[13px] tracking-[0.4px] text-[var(--w-muted)]">
        <span>KHÔNG ĐỒNG Ý · 20%</span>
        <span className="text-center">TRUNG LẬP</span>
        <span className="text-right">ĐỒNG Ý (TOP-2-BOX) · 60%</span>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Luôn xem bảng phân bố trước khi tính một con số tóm tắt. Hai nhóm có cùng trung bình có thể có phân bố rất khác nhau.
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
            Câu hỏi có/không (“Bạn có thấy dễ đặt lịch không?”) bỏ mất sắc thái: người thấy “khá dễ” và người thấy “rất dễ” bị gộp làm một. Câu hỏi mở cho chi tiết nhưng khó tổng hợp
            khi có hàng trăm câu trả lời.
          </P>
          <P strong>
            Likert scale cho câu trả lời có mức độ và dễ tổng hợp, nên là một trong những dạng câu hỏi phổ biến nhất trong khảo sát UX. Nhiều bảng hỏi chuẩn hóa như SUS cũng dùng dạng câu
            Likert.
          </P>
        </div>
        <Eyebrow>Likert scale hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          cols={3}
          minH={130}
          items={[
            ["users", "Người dùng cảm nhận thế nào", "Về một khía cạnh."],
            ["rotate", "Cảm nhận có thay đổi không", "Giữa hai phiên bản, hai thời điểm."],
            ["target", "Khía cạnh nào cần ưu tiên cải thiện", "Dựa trên mức đồng ý."],
          ]}
        />
      </Section>

      <Section {...S.parts}>
        <Table
          head={["Thành phần", "Mô tả", "Ví dụ minh họa (giả định)"]}
          widths={[240]}
          rows={[
            { icon: "chat", cells: ["Câu phát biểu", "Một nhận định rõ ràng, một ý.", "“Tôi thấy việc đặt lịch tư vấn dễ dàng.”"] },
            {
              icon: "list",
              cells: ["Các mức trả lời", "NN/g ghi nhận thường dùng 5 mức, đôi khi 7 hoặc 9.", "1 Rất không đồng ý · 2 Không đồng ý · 3 Trung lập · 4 Đồng ý · 5 Rất đồng ý"],
            },
            { icon: "file", cells: ["Nhãn", "Mỗi mức có nhãn bằng chữ; NN/g khuyên dùng nhãn đồng ý chuẩn.", "Như trên."] },
            { icon: "split", cells: ["Điểm giữa", "Mức trung lập cho người không nghiêng về bên nào.", "“Trung lập”."] },
          ]}
        />
        <Subhead icon="pencil">Câu phát biểu tốt và chưa tốt</Subhead>
        <PairCards
          first="Vì sao"
          second="Tốt hơn"
          icon="chat"
          items={[
            ["“Việc đặt lịch nhanh và dễ.”", "Hai ý trong một câu.", "Tách thành hai câu: “nhanh” và “dễ”."],
            ["“Bạn có đồng ý rằng trang mới tuyệt vời hơn không?”", "Dẫn dắt.", "“Trang này giúp tôi tìm được thông tin cần thiết.”"],
            ["“Giao diện có tính khả dụng cao.”", "Thuật ngữ chuyên môn.", "“Tôi biết phải làm gì tiếp theo trên trang này.”"],
          ]}
        />
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "target",
              "Bối cảnh phù hợp",
              ["Khảo sát thái độ, cảm nhận với nhiều người.", "Câu hỏi sau tác vụ trong usability test.", "So sánh cảm nhận giữa hai phiên bản hoặc hai thời điểm."],
            ],
            ["eye", "Dấu hiệu nhận biết", ["Cần số liệu về cảm nhận, không chỉ có/không."]],
            ["clipboard-check", "Điều kiện cần", ["Câu phát biểu rõ, một ý, không dẫn dắt.", "Dùng thống nhất số mức và nhãn trong cùng khảo sát."]],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[320]}
          rows={[
            { icon: "eye", cells: ["Cần biết hành vi thật", "Likert đo điều người dùng nói.", "Analytics, quan sát."] },
            { icon: "chat", cells: ["Cần biết vì sao", "Con số không giải thích lý do.", "Câu hỏi mở kèm theo, phỏng vấn."] },
            { icon: "arrows", cells: ["Đo giữa hai tính từ trái nghĩa", "Không phải mức độ đồng ý.", "Semantic differential (ví dụ “Khó dùng – Dễ dùng”)."] },
            { icon: "gauge", cells: ["Cần chỉ số chuẩn có thể so sánh", "Câu tự viết khó so sánh với nơi khác.", "Bảng hỏi chuẩn hóa như SUS."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định điều cần đo.", "", "Thái độ hoặc khía cạnh cần đo."],
            ["Viết câu phát biểu.", "Một ý mỗi câu; có thể dùng nhiều câu cho một khía cạnh.", "Danh sách câu."],
            ["Chọn số mức và nhãn.", "", "Thang đo thống nhất."],
            ["Thử với vài người.", "Kiểm tra người trả lời hiểu câu đúng ý.", "Câu đã chỉnh."],
            ["Thu thập.", "", "Câu trả lời."],
            ["Phân tích.", "Phân bố, trung bình, tỷ lệ top-2-box, khoảng tin cậy.", "Kết quả và quyết định."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật. 40 khách trả lời câu “Tôi thấy việc đặt lịch tư vấn dễ dàng” trên thang 5 mức.</Callout>
        <Subhead icon="bar-chart">Bước 1: Xem phân bố trước</Subhead>
        <Distribution />
        <P>Ví dụ một nhóm toàn trung lập và một nhóm chia đôi rất thích, rất ghét có thể có cùng trung bình.</P>

        <Subhead icon="check-circle">Bước 2: Tỷ lệ đồng ý (top-2-box)</Subhead>
        <Formula label="Tỷ lệ đồng ý" formula="(Số người chọn 4 + Số người chọn 5) ÷ Tổng số người" />
        <div className="flex gap-4">
          <Stat fill value="60%" label="Tỷ lệ đồng ý" note="(14 + 10) ÷ 40 = 24 ÷ 40" />
          <Stat value="20%" label="Tỷ lệ không đồng ý" note="(3 + 5) ÷ 40 = 8 ÷ 40" />
        </div>

        <Subhead icon="sigma">Bước 3: Điểm trung bình</Subhead>
        <Formula
          label="Tổng điểm"
          formula="Mỗi mức × Số người chọn mức đó, cộng lại"
          note="1 × 3 + 2 × 5 + 3 × 8 + 4 × 14 + 5 × 10 = 3 + 10 + 24 + 56 + 50 = 143"
        />
        <Formula label="Điểm trung bình" formula="Tổng điểm ÷ Tổng số người" note="143 ÷ 40 ≈ 3,6" />
        <Callout tone="note" title="Lưu ý về trung bình">
          Các mức Likert là thứ tự (4 lớn hơn 3), nhưng khoảng cách giữa các mức không chắc bằng nhau. Nhiều người làm nghiên cứu vẫn dùng trung bình vì dễ so sánh, nhưng nên báo cáo kèm
          phân bố hoặc tỷ lệ đồng ý.
        </Callout>

        <Subhead icon="gauge">Bước 4: Kết quả chắc chắn đến đâu</Subhead>
        <P>
          Cách đơn giản để có khoảng tin cậy cho tỷ lệ đồng ý: cộng thêm 2 người đồng ý và 2 người không đồng ý, rồi lấy kết quả điều chỉnh ± sai số.
        </P>
        <Formula label="Kết quả điều chỉnh" formula="(Số người đồng ý + 2) ÷ (Tổng số người + 4)" note="(24 + 2) ÷ (40 + 4) = 26 ÷ 44 ≈ 59,1%" />
        <Formula label="Khoảng tin cậy" formula="Kết quả điều chỉnh ± Sai số" />
        <Table
          head={["Nhập vào công cụ tính khoảng tin cậy cho tỷ lệ", "Sai số", "Khoảng tin cậy 95%"]}
          widths={[420]}
          rows={[{ highlight: true, cells: ["24 đồng ý trên 40 người", "≈ 14,5 điểm", "khoảng 45% – 74%"] }]}
        />
        <P>Mức 95% là quy ước phổ biến; nhóm tự chọn theo mức rủi ro.</P>

        <Subhead icon="split">Bước 5: Quyết định</Subhead>
        <InfoCard
          tone="fill"
          icon="target"
          title="Chưa đạt được mục tiêu một cách chắc chắn"
          body="Nhóm đặt mục tiêu (trước khi khảo sát) là ít nhất 70% khách đồng ý rằng đặt lịch dễ dàng. Kết quả 60%, khoảng tin cậy 45–74%. Xem câu trả lời mở của 8 người không đồng ý để biết vì sao, rồi cải thiện và khảo sát lại."
        />
      </Section>

      <Section {...S.limits}>
        <CheckCards
          mark="•"
          groups={[
            [
              "shield-alert",
              "Giới hạn",
              [
                "Đo điều người dùng nói, không đo điều họ làm.",
                "Người trả lời có xu hướng đồng ý với câu phát biểu, nhất là khi câu nghe tích cực.",
                "Một câu đơn lẻ kém ổn định hơn bộ nhiều câu cùng đo một thái độ.",
                "So sánh giữa các khảo sát chỉ có ý nghĩa khi câu, thang và nhãn giống nhau.",
                "Trung bình che mất phân bố.",
              ],
            ],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Điều cần đo.", "Câu phát biểu đã thử.", "Thang đo và nhãn thống nhất.", "Mục tiêu hoặc ngưỡng quyết định chốt trước."]}
          outputs={["Phân bố câu trả lời.", "Tỷ lệ đồng ý, điểm trung bình, khoảng tin cậy.", "Quyết định và câu hỏi tiếp theo."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard icon="list" title="Bối cảnh" body="Sau khi đặt lịch xong, khách nhận một khảo sát ngắn gồm ba câu Likert và một câu hỏi mở." />
        <div className="flex gap-4">
          <InfoCard
            icon="bar-chart"
            title="Kết quả câu “Tôi thấy việc đặt lịch tư vấn dễ dàng”"
            className="flex-1"
            body="Theo phần tính toán ở trên: 60% đồng ý, khoảng tin cậy 45–74%; trung bình 3,6."
          />
          <InfoCard
            icon="chat"
            title="Câu trả lời mở của nhóm không đồng ý (giả định)"
            className="flex-1"
            body="Chủ yếu nhắc đến việc mất thông tin khi quay lại trang, và không biết giờ nào còn trống."
          />
        </div>
        <InfoCard
          tone="fill"
          icon="check-circle"
          title="Quyết định"
          body="Ưu tiên tự lưu thông tin đã nhập và hiển thị rõ giờ còn trống; khảo sát lại sau khi thay đổi bằng đúng câu và thang cũ để so sánh."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Hai ý trong một câu", "Không biết người trả lời đồng ý với ý nào.", "Một ý mỗi câu."],
            ["Câu dẫn dắt", "Kết quả lệch về phía đồng ý.", "Câu trung lập."],
            ["Chỉ báo cáo trung bình", "Che mất phân bố.", "Báo cáo kèm phân bố, tỷ lệ đồng ý."],
            ["Đổi số mức hoặc nhãn giữa các lần khảo sát", "Không so sánh được.", "Giữ nguyên câu và thang."],
            ["Báo cáo tỷ lệ không kèm khoảng tin cậy", "Người đọc tưởng con số chính xác.", "Luôn kèm khoảng tin cậy khi số người ít."],
            ["Gọi một câu đơn lẻ là “Likert scale”", "Nhầm khái niệm.", "Gọi đúng là câu Likert (Likert item)."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Thang đo", "Cách hỏi", "Ví dụ"]}
          widths={[260]}
          rows={[
            { icon: "list", highlight: true, cells: ["Likert", "Mức độ đồng ý với một câu phát biểu.", "“Tôi thấy đặt lịch dễ dàng”: Rất không đồng ý → Rất đồng ý."] },
            { icon: "arrows", cells: ["Semantic Differential", "Chọn vị trí giữa hai tính từ trái nghĩa.", "Khó dùng ○○○○○○○ Dễ dùng."] },
            { icon: "gauge", cells: ["SUS", "Bảng hỏi chuẩn hóa 10 câu dạng Likert, tính ra điểm 0–100.", "Đo khả năng sử dụng có thể so sánh."] },
            { icon: "users", cells: ["NPS", "Một câu, thang 0–10 về khả năng giới thiệu.", "“Bạn có giới thiệu dịch vụ cho người khác không?”"] },
            { icon: "hourglass", cells: ["Customer Effort Score", "Mức nỗ lực để hoàn thành một việc.", "Thường dùng thang dạng Likert."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="pencil"
            title="Khi viết câu"
            items={["Một ý mỗi câu.", "Không dẫn dắt, không dùng thuật ngữ chuyên môn.", "Số mức và nhãn thống nhất.", "Đã thử với vài người."]}
          />
          <ChecklistColumn
            icon="analytics"
            title="Khi phân tích"
            items={["Xem phân bố trước.", "Báo cáo tỷ lệ đồng ý kèm khoảng tin cậy.", "Nếu dùng trung bình, báo cáo kèm phân bố.", "So sánh chỉ khi câu và thang giống nhau."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Rating Scales", "Thang đánh giá", "Khái niệm chung; Likert là một loại thang đánh giá."],
            ["Survey", "Khảo sát", "Likert là dạng câu phổ biến trong khảo sát."],
            ["System Usability Scale (SUS)", "Thang khả năng sử dụng hệ thống", "Bảng hỏi chuẩn hóa dùng câu dạng Likert."],
            ["Customer Effort Score (CES)", "Điểm nỗ lực khách hàng", "Thường dùng thang dạng Likert."],
            ["Attitudinal Methods", "Phương pháp nghiên cứu thái độ", "Likert là công cụ đo thái độ."],
            ["Confidence Intervals", "Khoảng tin cậy", "Cách đọc tỷ lệ đồng ý với ít người."],
            ["Net Promoter Score (NPS)", "Chỉ số khách hàng giới thiệu", "Thang đo một câu khác."],
            ["UMUX", "Thang đo khả năng sử dụng UMUX", "Bảng hỏi chuẩn hóa dùng các câu dạng Likert 7 mức."],
          ]}
        />
      </Section>
    </div>
  );
}

export const LIKERT_SCALE: Article = {
  slug: "likert-scale",
  version: 1,
  term: "Likert Scale",
  fn: 6,
  vi: "Thang Likert",
  kind: "Chỉ số / thống kê",
  definition:
    "Likert scale là cách đo thái độ bằng cách cho người trả lời chọn mức độ đồng ý với một loạt câu phát biểu, thường trên 5 mức từ “Rất không đồng ý” đến “Rất đồng ý”.",
  definitionMore: "Kết quả của các câu cùng chủ đề được kết hợp để cho biết thái độ chung của người trả lời.",
  oneLine: "Đo thái độ bằng mức độ đồng ý với các câu phát biểu, thường trên 5 mức.",
  glance: [
    ["5", "Mức trả lời thường dùng"],
    ["60%", "Tỷ lệ đồng ý trong ví dụ"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Thang đo mức độ đồng ý"] },
    { label: "Nhóm chính", items: ["Đo lường và phân tích"] },
    { label: "Thẻ phụ", items: ["Nghiên cứu thái độ"] },
    {
      label: "Lưu ý tên gọi",
      items: ["Theo NN/g, Likert scale là bộ nhiều câu cùng đo một thái độ. Một câu đơn lẻ đúng ra là Likert item (câu Likert). Trong thực tế hai từ thường bị dùng lẫn."],
    },
  ],
  sections: SECTIONS,
  Body,
};
