"use client";

import { Fragment } from "react";
import { Blk, T } from "./edit";
import { CheckCards, Formula, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, Icon, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* UX Metrics — copy from ux-glossary/ux-metrics.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "usability", title: "Nhóm chỉ số khả năng sử dụng", icon: "check-circle" },
  { id: "heart", title: "Khung HEART", icon: "component" },
  { id: "gsm", title: "Quy trình Mục tiêu – Tín hiệu – Chỉ số", icon: "arrows" },
  { id: "when", title: "Khi nào nên dùng / chưa phù hợp", icon: "check-circle" },
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

const CHAIN: [string, string, string][] = [
  ["Mục tiêu", "Goals", "Khách đặt lịch dễ dàng."],
  ["Tín hiệu", "Signals", "Khách hoàn thành đặt lịch, ít bỏ giữa chừng."],
  ["Chỉ số", "Metrics", "Tỷ lệ phiên bắt đầu đặt lịch mà hoàn thành, theo tuần."],
];

/** Goals → Signals → Metrics, with the booking example under each step. */
function GsmDiagram() {
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="arrows" size={36} iconSize={18} radius={10} />
        <Eyebrow>Từ mục tiêu đến chỉ số</Eyebrow>
      </div>
      <div className="flex items-stretch gap-3">
        {CHAIN.map(([vi, en, ex], i) => (
          <Fragment key={en}>
            <div className={`flex flex-1 flex-col gap-3 rounded-2xl p-6 ${i === 2 ? "bg-[var(--d-fill)] text-white" : "bg-[var(--d-soft)]"}`}>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[18px] leading-[24px] font-semibold">{vi}</span>
                <span className={`font-mono text-[13px] ${i === 2 ? "text-white/80" : "text-[var(--w-muted)]"}`}>{en}</span>
              </div>
              <span className={`text-[15px] leading-[22px] ${i === 2 ? "text-white" : "text-[var(--w-secondary)]"}`}>“{ex}”</span>
            </div>
            {i < CHAIN.length - 1 && (
              <span className="flex items-center text-[var(--w-muted)]">
                <Icon name="arrow-right" size={20} />
              </span>
            )}
          </Fragment>
        ))}
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Bắt đầu từ mục tiêu, tìm hành vi hoặc cảm nhận cho thấy mục tiêu đạt hay không, rồi biến tín hiệu thành chỉ số dạng tỷ lệ để theo dõi.
      </T>
    </Blk>
  );
}

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Section {...S.problem}>
        <P>
          Các chỉ số phổ biến nhất của sản phẩm số thường là chỉ số kinh doanh hoặc kỹ thuật: lượt xem trang, số người dùng hoạt động, doanh thu. Rodden và cộng sự (2010) gọi nhóm này là PULSE
          (Page views, Uptime, Latency, Seven-day active users, Earnings). Các chỉ số này quan trọng nhưng khó dùng để đánh giá một thay đổi giao diện:
        </P>
        <InfoGrid
          cols={2}
          items={[
            ["eye", "Lượt xem trang tăng", "Có thể vì tính năng được yêu thích, hoặc vì người dùng bị lạc và bấm lung tung."],
            ["users", "Số người hoạt động trong 7 ngày", "Không cho biết họ dùng thường xuyên đến đâu, cũng không phân biệt người mới với người cũ."],
          ]}
        />
        <CheckCards
          groups={[
            [
              "check-circle",
              "UX metrics giúp",
              ["Đo trực tiếp trải nghiệm, không chỉ quy mô.", "Biết một thay đổi thiết kế làm trải nghiệm tốt lên hay xấu đi.", "Theo dõi tiến độ hướng tới mục tiêu của sản phẩm."],
            ],
          ]}
        />
      </Section>

      <Section {...S.usability}>
        <P>Theo Nielsen (2001), khả năng sử dụng thường được đo trên một bộ tác vụ kiểm thử, bằng các chỉ số:</P>
        <Table
          head={["Chỉ số", "Câu hỏi trả lời", "Cách đo"]}
          widths={[300]}
          rows={[
            { icon: "check-circle", cells: ["Tỷ lệ thành công (success rate)", "Người dùng có làm được tác vụ không?", "Phần trăm người hoàn thành."] },
            { icon: "hourglass", cells: ["Thời gian làm tác vụ (time on task)", "Mất bao lâu?", "Thời gian từ lúc bắt đầu tới lúc xong."] },
            { icon: "alert", cells: ["Tỷ lệ lỗi (error rate)", "Người dùng mắc lỗi bao nhiêu?", "Số lỗi trên mỗi tác vụ hoặc mỗi người."] },
            { icon: "lightbulb", cells: ["Mức hài lòng (satisfaction)", "Người dùng thấy thế nào?", "Bảng hỏi, ví dụ UMUX, SUS."] },
          ]}
        />
        <Callout tone="note" icon="alert">
          Về tỷ lệ thành công, Nielsen & Budiu (2001) khuyên: nếu muốn ghi nhận “thành công một phần”, hãy chia mức (thành công hoàn toàn, thành công nhưng gặp vấn đề nhỏ, thành công nhưng gặp
          vấn đề lớn, thất bại) và báo phần trăm người ở từng mức. Không nên gán số cho các mức (ví dụ 1; 0,66; 0,33; 0) rồi tính trung bình, vì các mức này chỉ có thứ tự, không có khoảng cách
          đều.
        </Callout>
      </Section>

      <Section {...S.heart}>
        <P>Rodden và cộng sự (2010) đề xuất năm nhóm chỉ số lấy người dùng làm trung tâm:</P>
        <Table
          head={["Nhóm", "Đo gì", "Ví dụ chỉ số (theo bài gốc)"]}
          widths={[240]}
          rows={[
            { icon: "lightbulb", cells: ["Happiness — Hài lòng", "Thái độ: hài lòng, thẩm mỹ, khả năng giới thiệu, cảm nhận dễ dùng.", "Điểm hài lòng từ khảo sát định kỳ trong sản phẩm."] },
            {
              icon: "play-circle",
              cells: ["Engagement — Gắn bó", "Mức độ tham gia: tần suất, cường độ, độ sâu tương tác.", "Số lần truy cập mỗi người mỗi tuần; tỷ lệ người dùng hoạt động từ 5 ngày trở lên trong tuần."],
            },
            { icon: "login", cells: ["Adoption — Chấp nhận", "Bao nhiêu người mới bắt đầu dùng trong một khoảng thời gian.", "Số tài khoản tạo trong 7 ngày qua."] },
            { icon: "rotate", cells: ["Retention — Giữ chân", "Bao nhiêu người của một giai đoạn vẫn còn dùng ở giai đoạn sau.", "Phần trăm người hoạt động tuần này vẫn hoạt động sau 3 tháng."] },
            { icon: "check-circle", cells: ["Task success — Hoàn thành tác vụ", "Hiệu quả, hiệu suất, lỗi.", "Tỷ lệ hoàn thành, thời gian, tỷ lệ lỗi."] },
          ]}
        />
        <Subhead icon="file">Lưu ý từ bài gốc</Subhead>
        <InfoGrid
          items={[
            [
              "split",
              "Không phải dự án nào cũng cần cả năm nhóm",
              "Trong phần mềm doanh nghiệp người dùng bắt buộc phải dùng, Engagement có thể ít ý nghĩa ở cấp sản phẩm. Khung giúp nhóm quyết định rõ nên dùng hay bỏ nhóm nào.",
            ],
            ["users", "Engagement báo trung bình mỗi người", "Không báo tổng, vì tổng tăng có thể chỉ do có thêm người dùng."],
            ["link", "Không để chỉ số đứng một mình", "Cần kết hợp với kết quả usability testing, field study."],
          ]}
        />
      </Section>

      <Section {...S.gsm}>
        <P>
          Theo Rodden và cộng sự (2010), chỉ số chỉ hữu ích khi gắn với mục tiêu. Bắt đầu từ mục tiêu (người dùng cần làm được gì, thiết kế lại nhằm đạt gì), tìm tín hiệu (hành vi hoặc cảm nhận
          nào cho thấy mục tiêu đạt hay không đạt), rồi biến tín hiệu thành chỉ số cụ thể để theo dõi trên bảng số liệu.
        </P>
        <GsmDiagram />
        <InfoGrid
          items={[
            ["target", "Mục tiêu", "Các thành viên có thể bất đồng về mục tiêu; quy trình này là dịp để thống nhất. Mục tiêu của một tính năng có thể khác mục tiêu của cả sản phẩm."],
            [
              "play-circle",
              "Tín hiệu",
              "Chọn tín hiệu nhạy và đặc hiệu, chỉ thay đổi khi trải nghiệm tốt lên hoặc xấu đi. Đôi khi thất bại dễ nhận ra hơn thành công (bỏ dở tác vụ, bấm hoàn tác).",
            ],
            ["bar-chart", "Chỉ số", "Số đếm thô sẽ tăng theo số người dùng, nên dùng tỷ lệ, phần trăm, hoặc trung bình mỗi người."],
          ]}
        />
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "check-circle",
              "Nên dùng khi",
              [
                "Cần theo dõi trải nghiệm của sản phẩm đã ra mắt qua thời gian.",
                "Cần đánh giá tác động của một thay đổi thiết kế (kết hợp A/B testing).",
                "Cần thống nhất với các bên về “thành công” nghĩa là gì.",
              ],
            ],
          ]}
        />
        <Table
          head={["Chưa phù hợp khi", "Vì sao", "Thay bằng"]}
          widths={[320]}
          rows={[
            { icon: "list-search", cells: ["Sản phẩm chưa ra mắt, đang khám phá", "Chưa có hành vi để đo.", "Nghiên cứu định tính."] },
            { icon: "chat", cells: ["Cần biết vì sao chỉ số thay đổi", "Chỉ số chỉ cho biết cái gì.", "Usability testing, phỏng vấn."] },
            { icon: "users", cells: ["Ít người dùng", "Số liệu dao động mạnh.", "Kiểm thử định tính, theo dõi dài hơn."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định mục tiêu", "Của sản phẩm hoặc tính năng, có các bên liên quan tham gia.", "Danh sách mục tiêu đã thống nhất."],
            ["Dùng HEART để rà", "Nhóm nào liên quan, nhóm nào bỏ, ghi rõ lý do.", "Các nhóm chỉ số được chọn."],
            ["Tìm tín hiệu", "Cho từng mục tiêu, và nguồn dữ liệu (log, khảo sát).", "Danh sách tín hiệu."],
            ["Định nghĩa chỉ số", "Dạng tỷ lệ hoặc trung bình mỗi người, kèm cách tính.", "Bảng định nghĩa chỉ số."],
            ["Kiểm tra dữ liệu", "Hành động cần đo đã được ghi lại chưa, đã lọc lượt truy cập tự động chưa.", "Dữ liệu đáng tin."],
            ["Theo dõi và kết hợp", "Với nghiên cứu định tính khi chỉ số thay đổi bất thường.", "Quyết định có căn cứ."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật.</Callout>
        <Subhead icon="check-circle">1. Tỷ lệ thành công (Task success)</Subhead>
        <Formula
          label="Tỷ lệ thành công"
          formula="Số người hoàn thành ÷ Tổng số người thử"
          note="60 người thử đặt lịch trong buổi kiểm thử định lượng, 41 người hoàn thành → 41 ÷ 60 ≈ 0,683 → 68,3%"
        />
        <Table
          head={["Nhập vào công cụ", "Kết quả"]}
          widths={[360]}
          rows={[{ highlight: true, cells: ["41 thành công trên 60 người", "Khoảng tin cậy 95%: 55,7% – 78,7%"] }]}
        />
        <P>Nielsen (2001) gợi ý khoảng 20 người cho mỗi thiết kế khi cần số liệu có khoảng tin cậy tương đối hẹp; nhóm tự chọn theo mức chắc chắn cần có.</P>
        <Subhead icon="play-circle">2. Gắn bó, tính trung bình mỗi người (Engagement)</Subhead>
        <Formula label="Số lần đặt lịch trung bình" formula="Tổng số lần đặt ÷ Số khách hàng" note="Trong quý, 800 khách đặt tổng cộng 1.200 lần → 1.200 ÷ 800 = 1,5 lần mỗi khách" />
        <P>Nếu quý sau tổng tăng lên 1.500 lần nhưng số khách tăng lên 1.000, thì trung bình là 1.500 ÷ 1.000 = 1,5: không thay đổi. Tổng tăng chỉ vì có thêm khách.</P>
        <Subhead icon="rotate">3. Giữ chân (Retention)</Subhead>
        <Formula
          label="Tỷ lệ giữ chân"
          formula="Số khách vẫn quay lại ÷ Số khách ban đầu"
          note="300 khách đặt lịch lần đầu trong tháng 1; 90 người đặt lại trong vòng 3 tháng → 90 ÷ 300 = 0,3 → 30%"
        />
        <Subhead icon="login">4. Chấp nhận (Adoption)</Subhead>
        <Formula
          label="Tỷ lệ dùng tính năng mới"
          formula="Số khách dùng tính năng ÷ Số khách hoạt động"
          note="Tính năng “đặt lại buổi trước”: tuần có 500 khách hoạt động, 120 người dùng → 120 ÷ 500 = 0,24 → 24%"
        />
        <InfoCard
          tone="fill"
          icon="split"
          title="Quy tắc đọc"
          body="So sánh mỗi chỉ số với mức trước thay đổi hoặc với tiêu chí đã chốt trước, không với mong muốn sau khi thấy số."
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["chat", "Cho biết cái gì, không cho biết vì sao", "Chỉ số cho biết cái gì thay đổi, không cho biết vì sao."],
            ["eye", "Hiểu theo nhiều cách", "Thời gian trên trang dài có thể là hứng thú hoặc bối rối."],
            ["file", "Dữ liệu log có thể thiếu hoặc sai", "Nếu hành động không được ghi lại, hoặc lẫn lượt truy cập tự động."],
            ["play-circle", "Chủ yếu cho sản phẩm đã ra mắt", "Theo Rodden và cộng sự (2010), chỉ số không thay được nghiên cứu ở giai đoạn đầu."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Mục tiêu sản phẩm hoặc tính năng.", "Nguồn dữ liệu: log hành vi, khảo sát.", "Định nghĩa rõ cho từng chỉ số."]}
          outputs={["Bảng chỉ số theo HEART (các nhóm được chọn).", "Giá trị ban đầu để so sánh.", "Theo dõi theo thời gian."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard icon="target" title="Mục tiêu" body="Khách đặt lịch dễ dàng và quay lại khi cần tư vấn tiếp." />
        <Table
          head={["Nhóm HEART", "Tín hiệu", "Chỉ số"]}
          widths={[220]}
          rows={[
            { icon: "lightbulb", cells: ["Happiness", "Khách thấy dễ đặt lịch.", "Điểm UMUX-LITE trung bình mỗi quý."] },
            { icon: "ban", cells: ["Engagement", "Bỏ qua: khách không cần dùng dịch vụ thường xuyên.", "—"] },
            { icon: "login", cells: ["Adoption", "Khách dùng tính năng “đặt lại buổi trước”.", "Phần trăm khách hoạt động dùng tính năng."] },
            { icon: "rotate", cells: ["Retention", "Khách quay lại.", "Phần trăm khách đặt lại trong 3 tháng."] },
            { icon: "check-circle", highlight: true, cells: ["Task success", "Khách đặt xong, ít bỏ giữa chừng.", "Phần trăm phiên bắt đầu đặt lịch mà hoàn thành."] },
          ]}
        />
        <InfoCard
          tone="fill"
          icon="split"
          title="Diễn giải"
          body="Nhóm chủ động bỏ Engagement vì dịch vụ tư vấn không phải thứ khách dùng hằng ngày, và ghi rõ lý do."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Đo số đếm thô", "Tăng theo số người dùng, không phản ánh trải nghiệm.", "Dùng tỷ lệ, trung bình mỗi người."],
            ["Đo mọi thứ", "Quá nhiều số, không ai dùng.", "Bắt đầu từ mục tiêu, chọn ít chỉ số."],
            ["Không có mục tiêu", "Không biết số tốt hay xấu.", "Dùng quy trình Mục tiêu – Tín hiệu – Chỉ số."],
            ["Gán điểm cho mức thành công rồi tính trung bình", "Các mức chỉ có thứ tự.", "Báo phần trăm từng mức."],
            ["Chỉ nhìn số, không tìm lý do", "Hiểu sai nguyên nhân.", "Kết hợp nghiên cứu định tính."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Trọng tâm"]}
          widths={[380]}
          rows={[
            { icon: "bar-chart", highlight: true, cells: ["UX Metrics", "Đo trải nghiệm người dùng, gắn với mục tiêu."] },
            { icon: "analytics", cells: ["Chỉ số kinh doanh (PULSE, doanh thu)", "Đo sức khỏe kinh doanh, kỹ thuật."] },
            { icon: "target", cells: ["Benchmark Study", "Đo chỉ số UX theo chuẩn để so sánh qua thời gian hoặc với đối thủ."] },
            { icon: "lightbulb", cells: ["UMUX, NPS, CES", "Các chỉ số thái độ cụ thể, thuộc nhóm Happiness."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="target"
            title="Chọn chỉ số"
            items={["Mỗi chỉ số gắn với một mục tiêu.", "Đã rà năm nhóm HEART, ghi rõ nhóm nào bỏ và vì sao.", "Chỉ số dạng tỷ lệ hoặc trung bình mỗi người."]}
          />
          <ChecklistColumn
            icon="analytics"
            title="Theo dõi"
            items={["Đã kiểm tra dữ liệu được ghi lại đầy đủ.", "Có giá trị ban đầu để so sánh.", "Có kế hoạch tìm lý do khi chỉ số thay đổi."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["UMUX", "Thang đo khả năng sử dụng UMUX", "Chỉ số thái độ (Happiness)."],
            ["Benchmark Study", "Nghiên cứu đối chuẩn", "Đo chỉ số định kỳ để so sánh."],
            ["A/B Testing", "Kiểm thử A/B", "Đo tác động của thay đổi bằng chỉ số."],
            ["Usability Testing", "Kiểm thử khả năng sử dụng", "Nguồn đo tỷ lệ thành công, thời gian."],
            ["Net Promoter Score (NPS)", "Chỉ số khách hàng giới thiệu", "Chỉ số thái độ."],
            ["Quantitative Research", "Nghiên cứu định lượng", "Khung phương pháp của chỉ số."],
          ]}
        />
      </Section>
    </div>
  );
}

export const UX_METRICS: Article = {
  slug: "ux-metrics",
  version: 1,
  term: "UX Metrics",
  fn: 6,
  vi: "Chỉ số trải nghiệm người dùng",
  kind: "Chỉ số / thống kê",
  definition:
    "UX metrics là các con số dùng để đo chất lượng trải nghiệm người dùng, gồm cả hành vi (người dùng làm được gì, nhanh đến đâu, có quay lại không) và thái độ (người dùng cảm thấy thế nào).",
  definitionMore: "Chỉ số chỉ hữu ích khi gắn với một mục tiêu cụ thể của sản phẩm hoặc tính năng.",
  oneLine: "Các con số đo hành vi và thái độ của người dùng, gắn với mục tiêu sản phẩm.",
  glance: [
    ["5 nhóm", "Khung HEART"],
    ["3 bước", "Mục tiêu – Tín hiệu – Chỉ số"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Usability metrics (nhóm chỉ số về khả năng sử dụng)", "User-centered metrics"] },
    { label: "Nhóm chính", items: ["Chỉ số và đo lường"] },
    { label: "Thẻ phụ", items: ["Nền tảng và nguyên tắc"] },
    {
      label: "Lưu ý tên gọi",
      items: ["“UX metrics” là tên chung cho nhiều loại chỉ số. Bài này giới thiệu hai cách nhìn phổ biến: nhóm chỉ số khả năng sử dụng (NN/g) và khung HEART (Google)."],
    },
  ],
  sections: SECTIONS,
  Body,
};
