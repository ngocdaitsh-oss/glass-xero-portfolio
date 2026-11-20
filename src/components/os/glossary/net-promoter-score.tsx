"use client";

import { Blk, T } from "./edit";
import { CheckCards, Formula, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Net Promoter Score — copy from ux-glossary/net-promoter-score.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "groups", title: "Câu hỏi và ba nhóm", icon: "component" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "maths", title: "Công thức và ví dụ tính", icon: "sigma" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các chỉ số gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

const WAVES: [string, number, number, number, string][] = [
  ["Đợt đầu", 45, 30, 25, "+20"],
  ["Đợt sau", 55, 25, 20, "+35"],
];

/** Each wave as one 100% bar: promoters, passives, detractors. NPS = first segment − last segment. */
function NpsBars() {
  return (
    <Blk label="biểu đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="bar-chart" size={36} iconSize={18} radius={10} />
        <Eyebrow>Ba nhóm qua hai đợt, mỗi đợt 200 người</Eyebrow>
      </div>
      <div className="flex flex-col gap-4">
        {WAVES.map(([label, pro, pas, det, nps]) => (
          <div key={label} className="flex items-center gap-5">
            <span className="w-[80px] shrink-0 text-[15px] leading-6 font-semibold">{label}</span>
            <div className="flex h-12 flex-1 overflow-hidden rounded-xl">
              <span className="flex items-center justify-center bg-[var(--d-ci)] font-mono text-[15px] font-semibold text-white" style={{ width: `${pro}%` }}>
                {pro}%
              </span>
              <span className="flex items-center justify-center bg-[var(--d-well)] font-mono text-[15px]" style={{ width: `${pas}%` }}>
                {pas}%
              </span>
              <span className="flex items-center justify-center bg-[var(--d-bad-soft)] font-mono text-[15px] text-[var(--d-bad)]" style={{ width: `${det}%` }}>
                {det}%
              </span>
            </div>
            <span className="w-[80px] shrink-0 text-right font-mono text-[18px] font-semibold text-[var(--d-accent)]">{nps}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-5 text-[15px] leading-[22px] text-[var(--w-muted)]">
        <span className="flex items-center gap-2">
          <span className="size-3.5 rounded-sm bg-[var(--d-ci)]" /> Ủng hộ (9–10)
        </span>
        <span className="flex items-center gap-2">
          <span className="size-3.5 rounded-sm bg-[var(--d-well)]" /> Trung lập (7–8)
        </span>
        <span className="flex items-center gap-2">
          <span className="size-3.5 rounded-sm bg-[var(--d-bad-soft)]" /> Phản đối (0–6)
        </span>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        NPS = % ủng hộ − % phản đối. Người trung lập không vào phép tính nhưng vẫn nằm trong tổng số người.
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
            Ban lãnh đạo cần một con số đơn giản để biết khách hàng có hài lòng và gắn bó không, và theo dõi theo thời gian. Bảng khảo sát dài cho nhiều thông tin nhưng khó so sánh và ít
            người trả lời.
          </P>
          <P strong>
            NPS là một câu hỏi, dễ thu, dễ hiểu. NN/g ghi nhận đây là lý do NPS vẫn đáng dùng: lãnh đạo hiểu nó, nó tương quan với điểm SUS, và nó dễ thu thập.
          </P>
        </div>
        <Eyebrow>NPS hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          cols={3}
          minH={150}
          items={[
            ["analytics", "Thiện cảm của khách đang tăng hay giảm", "Theo thời gian."],
            ["users", "Nhóm khách nào cần chú ý", "Người phản đối nói gì trong câu hỏi mở."],
            ["link", "Liên kết UX với mục tiêu kinh doanh", "Khi kết hợp với các chỉ số UX khác."],
          ]}
        />
      </Section>

      <Section {...S.groups}>
        <Callout tone="note" title="Câu hỏi">
          “Bạn có khả năng giới thiệu [công ty / sản phẩm] cho bạn bè hoặc đồng nghiệp đến mức nào?” Thang điểm từ 0 (hoàn toàn không) đến 10 (chắc chắn có).
        </Callout>
        <Table
          head={["Nhóm", "Điểm", "Ý nghĩa"]}
          widths={[300]}
          rows={[
            { icon: "check-circle", highlight: true, cells: ["Người ủng hộ (Promoters)", "9–10", "Có khả năng giới thiệu, quay lại."] },
            { icon: "dots", cells: ["Người trung lập (Passives)", "7–8", "Hài lòng nhưng không nhiệt tình."] },
            { icon: "x", cells: ["Người phản đối (Detractors)", "0–6", "Không hài lòng, có thể nói không tốt về sản phẩm."] },
          ]}
        />
        <P>Thường kèm một câu hỏi mở: “Lý do chính cho điểm của bạn là gì?”</P>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            ["target", "Bối cảnh phù hợp", ["Theo dõi thiện cảm chung theo thời gian.", "Có đủ nhiều người trả lời.", "Cần một chỉ số mà lãnh đạo quen thuộc."]],
            ["eye", "Dấu hiệu nhận biết", ["Tổ chức đã dùng NPS và cần nối các chỉ số UX với nó."]],
            ["clipboard-check", "Điều kiện cần", ["Dùng đúng câu hỏi và cách tính chuẩn (NN/g khuyên không thay đổi cách tính).", "Kết hợp với chỉ số UX khác."]],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[320]}
          rows={[
            { icon: "users", cells: ["Sau một usability test 5 người", "NN/g lưu ý NPS cần mẫu lớn; 5 người không cho dữ liệu đáng tin.", "Quan sát hành vi, tỷ lệ hoàn thành tác vụ."] },
            { icon: "component", cells: ["Đo chi tiết giao diện", "NPS không đo được cảm nhận về từng phần nhỏ.", "Câu hỏi sau tác vụ, SUS."] },
            { icon: "gauge", cells: ["Đo độ dễ dùng", "Trung thành không đồng nghĩa với dễ dùng.", "SUS, UMUX, tỷ lệ hoàn thành."] },
            { icon: "target", cells: ["Đo nỗ lực tại một điểm chạm", "NPS nói về toàn bộ quan hệ với thương hiệu.", "Customer Effort Score."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Chọn thời điểm hỏi.", "Sau một trải nghiệm đủ dài, hoặc theo chu kỳ cố định.", "Kế hoạch thu thập."],
            ["Dùng đúng câu hỏi chuẩn, kèm câu hỏi mở.", "", "Khảo sát."],
            ["Thu thập đủ số người trả lời.", "", "Dữ liệu."],
            ["Tính NPS và xem phân bố điểm.", "", "NPS, tỷ lệ ba nhóm."],
            ["Đọc câu trả lời mở, nhất là của người phản đối.", "", "Lý do chính."],
            ["Theo dõi theo thời gian, kết hợp chỉ số UX khác.", "", "Xu hướng, quyết định."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật. 200 khách trả lời câu hỏi NPS sau buổi tư vấn: 90 ủng hộ, 60 trung lập, 50 phản đối.</Callout>
        <Subhead icon="check-circle">Bước 1: Tỷ lệ người ủng hộ</Subhead>
        <Formula label="Tỷ lệ người ủng hộ" formula="Số người ủng hộ ÷ Tổng số người" note="90 ÷ 200 = 45%" />
        <Subhead icon="x">Bước 2: Tỷ lệ người phản đối</Subhead>
        <Formula label="Tỷ lệ người phản đối" formula="Số người phản đối ÷ Tổng số người" note="50 ÷ 200 = 25%" />
        <Subhead icon="sigma">Bước 3: NPS</Subhead>
        <Formula
          label="NPS"
          formula="Tỷ lệ người ủng hộ − Tỷ lệ người phản đối"
          note="45 − 25 = +20. NPS viết là một con số (không có dấu %), từ −100 (tất cả phản đối) đến +100 (tất cả ủng hộ)."
        />

        <Subhead icon="split">So sánh hai đợt</Subhead>
        <P>Số liệu minh họa. Đợt sau, cũng 200 người: 110 ủng hộ, 50 trung lập, 40 phản đối.</P>
        <Formula label="NPS đợt sau" formula="110 ÷ 200 − 40 ÷ 200" note="55% − 20% = +35" />
        <Formula label="Chênh lệch" formula="NPS đợt sau − NPS đợt trước" note="35 − 20 = +15 điểm" />
        <NpsBars />
        <Callout tone="note" title="Kết quả chắc chắn đến đâu">
          Vì NPS là hiệu của hai tỷ lệ, sai số của nó lớn hơn sai số của từng tỷ lệ. Trước khi kết luận NPS “đã tăng”, nhập số người của ba nhóm ở mỗi đợt vào công cụ tính sai số cho NPS
          để xem khoảng tin cậy. NN/g cũng khuyên báo cáo kèm điểm trung bình (0–10) với sai số, vì việc chia nhóm làm mất thông tin.
        </Callout>
        <InfoCard
          tone="fill"
          icon="check-circle"
          title="Quyết định"
          body="Nếu khoảng tin cậy của chênh lệch nằm trên 0, có thể nói thiện cảm đã tăng. Dù vậy, NPS không cho biết vì sao: đọc câu trả lời mở và đối chiếu với chỉ số UX (tỷ lệ hoàn thành đặt lịch, CES) trước khi gắn sự tăng với một thay đổi thiết kế cụ thể."
        />
      </Section>

      <Section {...S.limits}>
        <P>NN/g nêu các giới hạn chính:</P>
        <InfoGrid
          cols={3}
          items={[
            ["ban", "Không đủ để đánh giá UX khi dùng một mình", "Cần kết hợp tỷ lệ hoàn thành, thời gian tác vụ."],
            ["users", "Cần mẫu lớn", "Ít người thì sai số rất rộng."],
            ["component", "Chia nhóm làm mất thông tin", "Điểm 6 và 0 bị xem như nhau."],
            ["gauge", "Trung thành không đồng nghĩa với dễ dùng", "NPS đo thiện cảm, không đo khả năng sử dụng."],
            ["eye", "Không đo được chi tiết giao diện", "Không biết vấn đề nằm ở đâu."],
            ["alert", "Dễ bị “làm đẹp” khi trở thành chỉ tiêu", "Quy luật Campbell: chỉ số càng được dùng để ra quyết định thì càng dễ bị bóp méo."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Câu hỏi chuẩn, câu hỏi mở.", "Thời điểm và kênh thu thập.", "Đủ số người trả lời."]}
          outputs={["NPS, tỷ lệ ba nhóm, điểm trung bình kèm sai số.", "Lý do chính từ câu trả lời mở.", "Xu hướng theo thời gian."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard icon="component" title="Bối cảnh" body="Dịch vụ hỏi NPS sau mỗi buổi tư vấn. Đợt đầu NPS = +20." />
        <div className="flex gap-4">
          <InfoCard
            icon="chat"
            title="Câu trả lời mở của người phản đối (giả định)"
            className="flex-1"
            body="Chủ yếu về việc khó đổi lịch và không nhận được tóm tắt sau buổi tư vấn."
          />
          <InfoCard icon="pencil" title="Thay đổi" className="flex-1" body="Thêm chức năng đổi lịch tự phục vụ và email tóm tắt sau buổi tư vấn." />
        </div>
        <InfoCard
          tone="fill"
          icon="analytics"
          title="Đợt sau"
          body="NPS = +35. Nhóm kiểm tra khoảng tin cậy trước khi báo cáo, và đối chiếu với CES ở bước đổi lịch (giảm nỗ lực) để thấy thay đổi nào liên quan."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Tự đổi ngưỡng nhóm (ví dụ coi 8 là ủng hộ)", "Không so sánh được với nơi khác.", "Giữ cách tính chuẩn."],
            ["Viết NPS là phần trăm trung bình", "NPS là hiệu hai tỷ lệ.", "Tính đúng: % ủng hộ − % phản đối."],
            ["Hỏi NPS sau test 5 người", "Mẫu quá nhỏ.", "Dùng chỉ số hành vi."],
            ["Kết luận “tăng” mà không xem sai số", "Chênh lệch có thể do ngẫu nhiên.", "Kiểm tra khoảng tin cậy."],
            ["Dùng NPS làm chỉ số UX duy nhất", "Không cho biết vấn đề ở đâu.", "Kết hợp chỉ số UX khác."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Chỉ số", "Đo gì", "Khi nào chọn"]}
          widths={[260]}
          rows={[
            { icon: "users", highlight: true, cells: ["NPS", "Khả năng giới thiệu, thiện cảm chung.", "Theo dõi quan hệ với thương hiệu."] },
            { icon: "check-circle", cells: ["CSAT", "Mức hài lòng với một trải nghiệm.", "Sau một tương tác cụ thể."] },
            { icon: "gauge", cells: ["Customer Effort Score", "Nỗ lực để hoàn thành một việc.", "Tại một điểm chạm."] },
            { icon: "clipboard-check", cells: ["SUS", "Khả năng sử dụng cảm nhận, 10 câu.", "Đánh giá độ dễ dùng có thể so sánh."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn icon="file" title="Thu thập" items={["Dùng câu hỏi và ngưỡng chuẩn.", "Có câu hỏi mở kèm theo.", "Đủ số người trả lời."]} />
          <ChecklistColumn
            icon="analytics"
            title="Báo cáo"
            items={["Báo cáo cả tỷ lệ ba nhóm, không chỉ NPS.", "Kiểm tra sai số trước khi so sánh hai đợt.", "Kết hợp với chỉ số UX hành vi."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Customer Effort Score (CES)", "Điểm nỗ lực khách hàng", "Chỉ số tại điểm chạm, bổ sung cho NPS."],
            ["Customer Experience", "Trải nghiệm khách hàng", "NPS là chỉ số CX phổ biến."],
            ["System Usability Scale (SUS)", "Thang khả năng sử dụng hệ thống", "Tương quan với NPS, đo độ dễ dùng."],
            ["Rating Scales", "Thang đánh giá", "NPS dùng thang 0–10."],
            ["Confidence Intervals", "Khoảng tin cậy", "Cách đọc sai số khi so sánh."],
            ["Customer Feedback Loop", "Vòng phản hồi khách hàng", "NPS kèm câu hỏi mở là một nguồn phản hồi."],
            ["UX Metrics", "Chỉ số UX", "NPS là một chỉ số thái độ trong nhóm Happiness của HEART."],
          ]}
        />
      </Section>
    </div>
  );
}

export const NET_PROMOTER_SCORE: Article = {
  slug: "net-promoter-score",
  version: 1,
  term: "Net Promoter Score (NPS)",
  fn: 6,
  vi: "Chỉ số khách hàng giới thiệu",
  kind: "Chỉ số / thống kê",
  definition:
    "Net Promoter Score là chỉ số đo khả năng khách hàng giới thiệu sản phẩm hay công ty cho người khác, dựa trên một câu hỏi duy nhất chấm điểm từ 0 đến 10. Người trả lời được chia thành ba nhóm, và NPS bằng tỷ lệ người ủng hộ trừ tỷ lệ người phản đối.",
  definitionMore: "Kết quả nằm trong khoảng từ −100 đến +100.",
  oneLine: "Một câu hỏi 0–10 về khả năng giới thiệu; NPS = % ủng hộ − % phản đối.",
  glance: [
    ["+20", "NPS đợt đầu trong ví dụ"],
    ["+35", "NPS đợt sau trong ví dụ"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["NPS"] },
    { label: "Nhóm chính", items: ["Đo lường và phân tích"] },
    { label: "Thẻ phụ", items: ["Nghiên cứu thái độ"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "NPS là chỉ số lòng trung thành và thiện cảm với thương hiệu hay sản phẩm, không phải chỉ số khả năng sử dụng. NN/g lưu ý NPS có tương quan với khả năng sử dụng cảm nhận, nhưng “trung thành” không đồng nghĩa với “dễ dùng”.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
