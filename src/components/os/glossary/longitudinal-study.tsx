"use client";

import { Blk, T } from "./edit";
import { CheckCards, Formula, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Longitudinal Study — copy from ux-glossary/longitudinal-study.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "parts", title: "Thành phần của một nghiên cứu dài hạn", icon: "component" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "maths", title: "Công thức và ví dụ tính", icon: "sigma" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các phương pháp gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

const W1 = [4, 5, 3, 4, 5, 3, 4, 5, 4, 3, 4, 5];
const W8 = [5, 5, 5, 5, 4, 4, 6, 5, 5, 4, 6, 6];

/** Each person's week-1 and week-8 score on the 1–7 scale, joined so the change reads per person. */
function Dumbbell() {
  const x = (v: number) => `${((v - 1) / 6) * 100}%`;
  return (
    <Blk label="biểu đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="rotate" size={36} iconSize={18} radius={10} />
        <Eyebrow>Điểm tuần 1 và tuần 8 của từng người</Eyebrow>
      </div>
      <div className="flex flex-col gap-1.5">
        {W1.map((a, i) => {
          const b = W8[i];
          const d = b - a;
          return (
            <div key={i} className="flex items-center gap-5">
              <span className="w-[90px] shrink-0 text-[15px] leading-6 font-semibold">Người {i + 1}</span>
              <div className="relative h-7 flex-1 rounded-lg bg-[var(--d-well)]">
                <span
                  className={`absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full ${d < 0 ? "bg-[var(--d-bad-soft)]" : "bg-[var(--d-ci)]"}`}
                  style={{ left: x(Math.min(a, b)), width: `calc(${x(Math.max(a, b))} - ${x(Math.min(a, b))})` }}
                />
                <span className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--w-muted)]" style={{ left: x(a) }} />
                <span
                  className={`absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full ${d < 0 ? "bg-[var(--d-bad)]" : "bg-[var(--d-accent)]"}`}
                  style={{ left: x(b) }}
                />
              </div>
              <span className={`w-[50px] shrink-0 text-right font-mono text-[15px] ${d < 0 ? "text-[var(--d-bad)]" : ""}`}>{d > 0 ? `+${d}` : d === 0 ? "0" : `−${-d}`}</span>
            </div>
          );
        })}
        <div className="flex items-center gap-5">
          <span className="w-[90px] shrink-0" />
          <div className="flex flex-1 justify-between font-mono text-[13px] text-[var(--w-muted)]">
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
          <span className="w-[50px] shrink-0" />
        </div>
      </div>
      <div className="flex flex-wrap gap-5 text-[15px] leading-[22px] text-[var(--w-muted)]">
        <span className="flex items-center gap-2">
          <span className="size-3.5 rounded-full bg-[var(--w-muted)]" /> Tuần 1
        </span>
        <span className="flex items-center gap-2">
          <span className="size-3.5 rounded-full bg-[var(--d-accent)]" /> Tuần 8
        </span>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Mỗi người so với chính họ. Người số 5 là người duy nhất giảm điểm.
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
            Hầu hết nghiên cứu UX chỉ đo lần dùng đầu tiên: usability test, phỏng vấn sau khi dùng thử. Nhưng trải nghiệm thay đổi theo thời gian. Có thứ khó lúc đầu rồi quen dần; có thứ
            thú vị lúc đầu rồi nhàm; có vấn đề chỉ xuất hiện sau nhiều tuần.
          </P>
          <P>
            Nghiên cứu cắt ngang (đo nhiều người, một lần) cũng không giải quyết được: so sánh “người mới” với “người dùng lâu” là so sánh hai nhóm khác nhau. Người dùng lâu có thể khác ngay
            từ đầu, ví dụ những người không thích sản phẩm đã bỏ đi.
          </P>
          <P strong>Longitudinal study theo dõi cùng một người qua thời gian, nên thấy được thay đổi thật.</P>
        </div>
        <Eyebrow>Longitudinal study hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          cols={3}
          minH={150}
          items={[
            ["rotate", "Trải nghiệm thay đổi thế nào", "Sau khi làm quen."],
            ["users", "Khi nào và vì sao", "Người dùng bỏ đi."],
            ["check-circle", "Thay đổi thiết kế có hiệu quả lâu dài không", "Hay chỉ hiệu ứng mới lạ."],
          ]}
        />
      </Section>

      <Section {...S.parts}>
        <Table
          head={["Thành phần", "Mô tả", "Ví dụ minh họa (giả định)"]}
          widths={[260]}
          rows={[
            { icon: "users", cells: ["Nhóm người tham gia", "Cùng một nhóm người suốt nghiên cứu.", "15 khách vừa dùng dịch vụ tư vấn lần đầu."] },
            { icon: "calendar", cells: ["Các thời điểm đo", "Lịch đo cố định.", "Tuần 1, tuần 4, tuần 8 sau buổi tư vấn."] },
            { icon: "component", cells: ["Phương pháp", "Có thể kết hợp nhiều phương pháp.", "Khảo sát ngắn + phỏng vấn 20 phút ở mỗi thời điểm."] },
            { icon: "rotate", highlight: true, cells: ["Chỉ số lặp lại", "Cùng câu hỏi, cùng thang ở mọi thời điểm.", "“Tôi thấy cổng hỗ trợ sau tư vấn hữu ích” (thang 1–7)."] },
            { icon: "check-circle", cells: ["Theo dõi duy trì", "Ghi lại ai còn tham gia, ai bỏ.", "12/15 người tham gia đủ ba lần."] },
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
                "Sản phẩm dùng lặp lại lâu dài (ứng dụng thói quen, phần mềm công việc, dịch vụ theo gói).",
                "Cần biết trải nghiệm sau giai đoạn làm quen.",
                "Cần đánh giá hiệu quả lâu dài của một thay đổi.",
                "Muốn hiểu vì sao người dùng bỏ sau một thời gian.",
              ],
            ],
            ["eye", "Dấu hiệu nhận biết", ["Kết quả test lần đầu tốt nhưng tỷ lệ giữ chân thấp.", "Người dùng lâu phàn nàn về điều người mới không nhắc tới."]],
            [
              "clipboard-check",
              "Điều kiện cần",
              ["Thời gian và ngân sách cho nhiều tháng.", "Cách giữ liên lạc và động lực cho người tham gia.", "Câu hỏi và thang đo giữ nguyên giữa các lần."],
            ],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[360]}
          rows={[
            { icon: "hourglass", cells: ["Cần kết quả trong vài tuần", "Không đủ thời gian.", "Diary study ngắn, usability test."] },
            { icon: "play-circle", cells: ["Chỉ cần đánh giá lần dùng đầu", "Không cần theo dõi lâu.", "Usability test."] },
            { icon: "split", cells: ["Cần so sánh có kiểm soát giữa hai phương án", "Nhiều yếu tố thay đổi theo thời gian.", "A/B testing (có thể chạy dài)."] },
            { icon: "users", cells: ["Khó giữ liên lạc với người tham gia", "Nhiều người bỏ, dữ liệu thiếu.", "Analytics theo nhóm người dùng (cohort)."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định câu hỏi về thay đổi.", "", "Câu hỏi nghiên cứu."],
            ["Chọn thời điểm đo và phương pháp.", "Thời điểm theo nhịp sử dụng sản phẩm.", "Lịch nghiên cứu."],
            ["Cố định chỉ số lặp lại.", "Cùng câu hỏi, cùng thang ở mọi lần.", "Bộ câu hỏi lặp lại."],
            ["Tuyển nhiều người hơn số cần.", "Để còn đủ dữ liệu khi có người bỏ.", "Nhóm người tham gia."],
            ["Thu thập ở từng thời điểm.", "Nhắc lịch, giữ liên lạc.", "Dữ liệu theo thời điểm."],
            ["Phân tích thay đổi theo từng người.", "So sánh mỗi người với chính họ.", "Mức thay đổi, nhận định."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <Callout tone="scenario">
          Số liệu minh họa, không phải dữ liệu thật. 15 khách tham gia; 12 người trả lời đủ ở tuần 1 và tuần 8. Câu hỏi: “Tôi thấy cổng hỗ trợ sau tư vấn hữu ích” (thang 1–7).
        </Callout>
        <Subhead icon="users">Bước 1: Tỷ lệ duy trì</Subhead>
        <Formula label="Tỷ lệ duy trì" formula="Số người tham gia đủ ÷ Số người bắt đầu" note="12 ÷ 15 = 80%" />
        <P>Chỉ phân tích thay đổi trên 12 người có đủ dữ liệu; ghi rõ 3 người đã bỏ và, nếu biết, lý do.</P>

        <Subhead icon="rotate">Bước 2: Mức thay đổi của từng người</Subhead>
        <Formula label="Mức thay đổi" formula="Điểm tuần 8 − Điểm tuần 1" />
        <Dumbbell />

        <Subhead icon="sigma">Bước 3: Mức thay đổi trung bình</Subhead>
        <Formula
          label="Thay đổi trung bình"
          formula="Tổng mức thay đổi ÷ Số người"
          note="Tổng mức thay đổi = 11 → 11 ÷ 12 ≈ +0,9 điểm. Cách kiểm tra: trung bình tuần 1 = 49 ÷ 12 ≈ 4,1; trung bình tuần 8 = 60 ÷ 12 = 5,0; chênh lệch ≈ 0,9."
        />

        <Subhead icon="bar-chart">Bước 4: Kết quả chắc chắn đến đâu</Subhead>
        <P>
          Nhập 12 mức thay đổi (không phải hai cột điểm riêng) vào công cụ tính khoảng tin cậy cho trung bình. Đây là so sánh theo cặp: mỗi người so với chính họ.
        </P>
        <Table
          head={["Nhập vào công cụ", "Kết quả"]}
          widths={[520]}
          rows={[
            {
              highlight: true,
              cells: ["12 mức thay đổi: +1, 0, +2, +1, −1, +1, +2, 0, +1, +1, +2, +1; mức tin cậy 95%", "Khoảng tin cậy của thay đổi trung bình ≈ +0,3 đến +1,5 điểm"],
            },
          ]}
        />
        <Callout tone="note" title="Diễn giải">
          Khoảng tin cậy nằm hoàn toàn trên 0 → cảm nhận về cổng hỗ trợ có khả năng tăng thật sau tám tuần với nhóm này. Mức 95% là quy ước phổ biến.
        </Callout>

        <Subhead icon="split">Bước 5: Quyết định</Subhead>
        <InfoCard
          tone="fill"
          icon="check-circle"
          title="Cảm nhận tăng theo thời gian"
          body="Cổng hỗ trợ khó dùng lúc đầu nhưng hữu ích hơn khi khách quen. Câu hỏi tiếp theo cho phần phỏng vấn: điều gì khiến tuần đầu khó, và có thể giúp khách quen nhanh hơn không? Người số 5 giảm điểm → phỏng vấn riêng để hiểu lý do."
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["users", "Người bỏ giữa chừng có thể khác người ở lại", "Người không thích sản phẩm thường bỏ trước, nên kết quả có thể đẹp hơn thực tế."],
            ["calendar", "Nhiều yếu tố thay đổi theo thời gian", "Không chỉ sản phẩm: mùa, hoàn cảnh cá nhân, đối thủ."],
            ["eye", "Việc tham gia có thể làm thay đổi hành vi", "Người tham gia chú ý đến sản phẩm hơn bình thường."],
            ["bar-chart", "Ít người, nhóm có chọn lọc", "Không đại diện cho toàn bộ người dùng."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Câu hỏi về thay đổi theo thời gian.", "Lịch đo, phương pháp, chỉ số lặp lại.", "Người tham gia (nhiều hơn số cần), cách giữ liên lạc."]}
          outputs={["Dữ liệu theo từng thời điểm.", "Mức thay đổi theo từng người, trung bình và khoảng tin cậy.", "Tỷ lệ duy trì.", "Nhận định về trải nghiệm theo thời gian."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard
          icon="component"
          title="Bối cảnh"
          body="Dịch vụ ra mắt cổng hỗ trợ sau tư vấn (tài liệu, nhắc việc, hỏi thêm chuyên gia). Test lần đầu cho thấy khách thấy cổng khá rối. Nhóm cần biết cảm nhận có thay đổi khi khách dùng lâu hơn không, trước khi quyết định thiết kế lại."
        />
        <div className="flex gap-4">
          <InfoCard icon="calendar" title="Cách áp dụng" className="flex-1" body="Theo dõi 15 khách trong 8 tuần, khảo sát ngắn và phỏng vấn ở tuần 1, 4, 8." />
          <InfoCard
            icon="analytics"
            title="Kết quả (theo phần tính toán ở trên)"
            className="flex-1"
            body="Cảm nhận tăng trung bình 0,9 điểm; khoảng tin cậy nằm trên 0. Phỏng vấn cho thấy khách thấy rối ở tuần đầu vì không biết bắt đầu từ đâu, nhưng sau khi dùng nhắc việc vài lần thì thấy hữu ích."
          />
        </div>
        <InfoCard
          tone="fill"
          icon="check-circle"
          title="Quyết định"
          body="Không thiết kế lại toàn bộ; tập trung vào trải nghiệm tuần đầu: thêm hướng dẫn bắt đầu và gợi ý việc đầu tiên."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["So sánh người mới với người dùng lâu", "Hai nhóm khác nhau, không phải thay đổi theo thời gian.", "Theo dõi cùng một người."],
            ["Đổi câu hỏi giữa các lần", "Không so sánh được.", "Giữ nguyên câu và thang."],
            ["So sánh hai cột điểm như hai nhóm độc lập", "Bỏ qua việc mỗi người so với chính họ.", "Tính mức thay đổi từng người rồi phân tích."],
            ["Bỏ qua người rời nghiên cứu", "Kết quả có thể đẹp hơn thực tế.", "Báo cáo tỷ lệ duy trì và lý do rời."],
            ["Tuyển vừa đủ số người", "Thiếu dữ liệu khi có người bỏ.", "Tuyển dư."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Phương pháp", "Quan hệ", "Khi nào chọn"]}
          widths={[280]}
          rows={[
            { icon: "rotate", highlight: true, cells: ["Longitudinal Study", "Thiết kế nghiên cứu: cùng người, nhiều thời điểm.", "Cần thấy thay đổi thật theo thời gian."] },
            { icon: "calendar", cells: ["Diary Study", "Một phương pháp dùng trong nghiên cứu dài hạn; người tham gia tự ghi hằng ngày.", "Cần chi tiết trải nghiệm hằng ngày."] },
            { icon: "users", cells: ["Cross-sectional Study", "Nhiều người, một thời điểm.", "Cần ảnh chụp nhanh hiện tại."] },
            { icon: "analytics", cells: ["Cohort Analysis (analytics)", "Theo dõi hành vi nhóm người dùng theo thời gian bằng dữ liệu tự động.", "Cần số liệu lớn về giữ chân."] },
            { icon: "gauge", cells: ["Benchmark Study", "Đo lặp lại sản phẩm qua các phiên bản, có thể với người khác nhau.", "So sánh hiệu năng giữa các phiên bản."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Chuẩn bị"
            items={["Câu hỏi về thay đổi theo thời gian.", "Lịch đo theo nhịp sử dụng.", "Câu hỏi và thang giữ nguyên giữa các lần.", "Tuyển dư người tham gia."]}
          />
          <ChecklistColumn
            icon="analytics"
            title="Phân tích"
            items={[
              "Báo cáo tỷ lệ duy trì.",
              "Tính mức thay đổi theo từng người.",
              "Khoảng tin cậy tính trên mức thay đổi (so sánh theo cặp).",
              "Ghi rõ giới hạn về người bỏ giữa chừng.",
            ]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Diary Study", "Nghiên cứu nhật ký", "Phương pháp thường dùng trong nghiên cứu dài hạn."],
            ["Benchmark Study", "Nghiên cứu đối chuẩn", "Đo lặp lại qua các phiên bản."],
            ["Likert Scale", "Thang Likert", "Dạng câu hỏi lặp lại phổ biến."],
            ["Confidence Intervals", "Khoảng tin cậy", "Cách đọc mức thay đổi trung bình."],
            ["Onboarding", "Làm quen người dùng", "Giai đoạn đầu mà nghiên cứu dài hạn thường làm rõ."],
            ["Customer Journey", "Hành trình khách hàng", "Hành trình kéo dài nhiều tuần, nhiều tháng."],
          ]}
        />
      </Section>
    </div>
  );
}

export const LONGITUDINAL_STUDY: Article = {
  slug: "longitudinal-study",
  version: 1,
  term: "Longitudinal Study",
  fn: 1,
  vi: "Nghiên cứu dài hạn",
  kind: "Phương pháp nghiên cứu / kiểm thử",
  definition:
    "Longitudinal study là nghiên cứu theo dõi cùng một nhóm người qua nhiều thời điểm (nhiều tuần, nhiều tháng hoặc lâu hơn) để thấy hành vi, thái độ và trải nghiệm của họ thay đổi thế nào theo thời gian.",
  definitionMore: "Vì so sánh mỗi người với chính họ ở thời điểm trước, phương pháp này cho thấy sự thay đổi mà một lần đo không thể hiện được.",
  oneLine: "Theo dõi cùng một nhóm người qua nhiều thời điểm để thấy trải nghiệm thay đổi thế nào.",
  glance: [
    ["+0,9", "Thay đổi trung bình trong ví dụ"],
    ["80%", "Tỷ lệ duy trì trong ví dụ"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Long-term user study", "Repeated measures study"] },
    { label: "Nhóm chính", items: ["Nghiên cứu khám phá"] },
    { label: "Thẻ phụ", items: ["Đo lường và phân tích"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "Đây là thiết kế nghiên cứu: theo dõi cùng một nhóm người qua nhiều thời điểm, có thể dùng nhiều phương pháp bên trong. Đối lập với nghiên cứu cắt ngang, chỉ chụp một thời điểm.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
