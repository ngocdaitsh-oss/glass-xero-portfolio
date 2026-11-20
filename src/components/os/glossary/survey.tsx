"use client";

import { Blk, T } from "./edit";
import { CheckCards, Formula, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Survey — copy from ux-glossary/survey.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "parts", title: "Thành phần của một khảo sát", icon: "component" },
  { id: "writing", title: "Nguyên tắc viết câu hỏi", icon: "pencil" },
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

const MARGINS: [number, number][] = [
  [100, 10],
  [200, 7],
  [312, 5.5],
];

/** Who answered out of who was invited, then how the ± margin around 50% narrows with more answers. */
function SurveyChart() {
  return (
    <Blk label="biểu đồ" className="g-card flex flex-col gap-8 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="clipboard-check" size={36} iconSize={18} radius={10} />
        <Eyebrow>312 trên 2.000 người trả lời và sai số của một tỷ lệ</Eyebrow>
      </div>
      <div className="flex flex-col gap-2">
        <div className="relative h-11 rounded-xl bg-[var(--d-well)]">
          <span className="absolute inset-y-0 left-0 flex items-center rounded-xl bg-[var(--d-fill)] px-3 font-mono text-[15px] font-semibold whitespace-nowrap text-white" style={{ width: "15.6%" }}>
            312
          </span>
          <span className="absolute inset-y-0 right-4 flex items-center font-mono text-[15px] text-[var(--w-muted)]">2.000 được mời</span>
        </div>
        <span className="text-[15px] leading-[22px] text-[var(--w-muted)]">Tỷ lệ phản hồi 15,6%</span>
      </div>
      <div className="flex flex-col gap-3">
        {MARGINS.map(([n, m]) => (
          <div key={n} className="flex items-center gap-5">
            <span className="w-[90px] shrink-0 text-[15px] leading-6 font-semibold">{n} người</span>
            <div className="relative h-9 flex-1 rounded-lg bg-[var(--d-well)]">
              <span className="absolute inset-y-0 w-px bg-[var(--w-muted)]" style={{ left: "50%" }} />
              <span
                className={`absolute top-1/2 h-4 -translate-y-1/2 rounded-full ${n === 312 ? "bg-[var(--d-ci)]" : "bg-[var(--d-ci-weak)]"}`}
                style={{ left: `${50 - m * 2}%`, width: `${m * 4}%` }}
              />
            </div>
            <span className={`w-[80px] shrink-0 text-right font-mono text-[15px] ${n === 312 ? "font-semibold text-[var(--d-accent)]" : ""}`}>± {String(m).replace(".", ",")}</span>
          </div>
        ))}
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Khoảng quanh 50%, mức tin cậy 95% (trục phóng to: 25–75%). Sai số chỉ tính dao động ngẫu nhiên, không tính người trả lời không đại diện hay câu hỏi bị hiểu sai.
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
            Phỏng vấn cho hiểu biết sâu, nhưng chỉ với vài người. Khi cần biết bao nhiêu người có một nhu cầu, một ý kiến hay một đặc điểm, cần hỏi nhiều người theo cùng một cách.
          </P>
          <P strong>Khảo sát thu dữ liệu từ hàng trăm người với chi phí thấp, giúp đo lường và kiểm chứng những gì nghiên cứu định tính tìm ra.</P>
        </div>
        <Eyebrow>Khảo sát hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          cols={3}
          minH={150}
          items={[
            ["users", "Vấn đề hay nhu cầu phổ biến đến đâu", "Hỏi nhiều người theo cùng một cách."],
            ["split", "Nhóm người dùng nào khác nhau thế nào", "So sánh giữa các nhóm."],
            ["rotate", "Thái độ thay đổi theo thời gian", "Khảo sát lặp lại."],
          ]}
        />
      </Section>

      <Section {...S.parts}>
        <Table
          head={["Thành phần", "Mô tả", "Ví dụ minh họa (giả định)"]}
          widths={[260]}
          rows={[
            { icon: "target", cells: ["Mục tiêu", "Điều cần biết.", "Mức độ quan tâm của khách đến gói tư vấn gia đình."] },
            { icon: "users", cells: ["Đối tượng và cách tiếp cận", "Ai sẽ trả lời, gửi qua kênh nào.", "2.000 khách đã dùng dịch vụ, gửi qua email."] },
            { icon: "list", cells: ["Câu hỏi đóng", "Có sẵn lựa chọn; dễ tổng hợp.", "“Lần gần nhất bạn tìm dịch vụ tư vấn là khi nào?”"] },
            { icon: "gauge", cells: ["Thang đánh giá", "Mức độ đồng ý, hài lòng.", "Câu Likert, NPS."] },
            { icon: "chat", cells: ["Câu hỏi mở", "Người trả lời tự viết.", "“Điều gì sẽ giúp bạn quyết định đặt lịch?”"] },
            { icon: "file", cells: ["Câu hỏi thông tin người trả lời", "Đặc điểm để chia nhóm.", "Độ tuổi, có con hay không."] },
          ]}
        />
      </Section>

      <Section {...S.writing}>
        <P>NN/g tổng hợp 10 nguyên tắc; tóm tắt các nguyên tắc chính:</P>
        <Table
          head={["Nguyên tắc", "Chưa tốt", "Tốt hơn"]}
          widths={[340]}
          rows={[
            { icon: "target", cells: ["Chỉ hỏi điều cần, điều người trả lời trả lời chính xác được", "Hỏi điều đã có trong dữ liệu analytics.", "Bỏ câu đó."] },
            { icon: "chat", cells: ["Ngôn ngữ trung lập, tự nhiên, không thuật ngữ", "“Bạn thấy giao diện mới tuyệt vời thế nào?”", "“Bạn thấy trang mới thế nào?”"] },
            {
              icon: "calendar",
              cells: ["Hỏi hành vi gần đây cụ thể, không bắt dự đoán", "“Bạn sẽ đặt lịch bao nhiêu lần mỗi năm?”", "“Trong 12 tháng qua, bạn đã đặt lịch khoảng bao nhiêu lần?”"],
            },
            { icon: "list", cells: ["Ưu tiên câu hỏi đóng, một câu hỏi mở rộng ở cuối", "Năm câu hỏi mở liên tiếp.", "Câu đóng + một câu mở cuối."] },
            { icon: "split", cells: ["Không hỏi hai ý trong một câu", "“Đặt lịch nhanh và dễ không?”", "Tách thành hai câu."] },
            { icon: "gauge", cells: ["Thang cân bằng", "Tốt / Rất tốt / Tuyệt vời.", "Rất không hài lòng → Rất hài lòng."] },
            { icon: "check", cells: ["Lựa chọn đầy đủ, không trùng nhau", "18–25, 25–35.", "18–24, 25–34."] },
            { icon: "dots", cells: ["Có lựa chọn không trả lời, nhưng không gộp nhiều thứ vào một", "Chỉ có “Khác”.", "“Không biết” và “Không muốn trả lời” riêng."] },
            { icon: "x", cells: ["Phần lớn câu hỏi không bắt buộc", "Bắt buộc mọi câu.", "Chỉ bắt buộc câu thật sự cần."] },
            { icon: "users", cells: ["Tôn trọng người trả lời", "Câu hỏi thông tin cá nhân không cần thiết.", "Chỉ hỏi khi cần, dùng từ ngữ bao quát."] },
          ]}
        />
        <P>NN/g cũng nhấn mạnh thử khảo sát với vài người trước khi gửi.</P>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            ["target", "Bối cảnh phù hợp", ["Cần số liệu từ nhiều người.", "Kiểm chứng nhận định từ nghiên cứu định tính.", "Theo dõi thái độ theo thời gian."]],
            ["eye", "Dấu hiệu nhận biết", ["Câu hỏi là “bao nhiêu người”, “nhóm nào”."]],
            ["clipboard-check", "Điều kiện cần", ["Câu hỏi đã được thử.", "Danh sách người nhận phù hợp với nhóm cần đo."]],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[300]}
          rows={[
            { icon: "play-circle", cells: ["Cần biết hành vi thật", "Người ta kể khác với làm.", "Analytics, quan sát."] },
            { icon: "list-search", cells: ["Chưa biết nên hỏi gì", "Câu hỏi đóng có thể bỏ sót điều quan trọng.", "Phỏng vấn trước."] },
            { icon: "eye", cells: ["Cần đánh giá độ dễ dùng", "Khảo sát không thấy được khó khăn khi dùng.", "Usability testing."] },
            { icon: "chat", cells: ["Cần hiểu sâu vì sao", "Câu trả lời ngắn.", "Phỏng vấn, diary study."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định mục tiêu và đối tượng.", "", "Mục tiêu, danh sách người nhận."],
            ["Viết câu hỏi theo các nguyên tắc.", "", "Bản nháp."],
            ["Thử với vài người.", "Hỏi họ hiểu câu hỏi thế nào.", "Bản đã chỉnh."],
            ["Gửi và nhắc.", "", "Câu trả lời."],
            ["Phân tích.", "Tỷ lệ phản hồi, tỷ lệ từng lựa chọn kèm khoảng tin cậy, đọc câu trả lời mở.", "Kết quả."],
            ["Báo cáo kèm giới hạn.", "", "Báo cáo, quyết định."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật. Khảo sát gửi qua email cho 2.000 khách.</Callout>
        <Subhead icon="users">Tỷ lệ phản hồi</Subhead>
        <Formula label="Tỷ lệ phản hồi" formula="Số người trả lời ÷ Số người được mời" note="312 ÷ 2.000 = 15,6%" />
        <P>
          Tỷ lệ phản hồi thấp không tự động làm kết quả sai, nhưng tăng nguy cơ người trả lời khác người không trả lời (ví dụ chỉ những người rất hài lòng hoặc rất bực mới trả lời). Ghi rõ
          trong báo cáo.
        </P>
        <Subhead icon="bar-chart">Sai số của một tỷ lệ</Subhead>
        <Table
          head={["Nhập vào công cụ (ở tỷ lệ 50%)", "Kết quả"]}
          widths={[400]}
          rows={[{ highlight: true, cells: ["156 trên 312 người, mức tin cậy 95%", "Khoảng tin cậy ≈ 44,5% – 55,5%, tức sai số khoảng ± 5,5 điểm"] }]}
        />
        <SurveyChart />
        <Callout tone="note" title="Quy tắc dễ nhớ">
          Muốn sai số nhỏ đi một nửa → cần khoảng gấp bốn lần số người. Sai số này chỉ tính đến dao động ngẫu nhiên. Nó không tính đến việc người trả lời không đại diện hay câu hỏi bị hiểu
          sai.
        </Callout>
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["chat", "Người trả lời kể lại", "Không phải hành vi thật."],
            ["users", "Người trả lời có thể không đại diện", "Cho người không trả lời."],
            ["pencil", "Cách đặt câu hỏi ảnh hưởng câu trả lời", "Thử trước khi gửi."],
            ["sigma", "Sai số thống kê không bao gồm các sai lệch khác", "Ghi rõ giới hạn."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Mục tiêu, đối tượng, kênh gửi.", "Bảng hỏi đã thử."]}
          outputs={["Tỷ lệ phản hồi.", "Tỷ lệ từng lựa chọn, khoảng tin cậy.", "Chủ đề từ câu hỏi mở.", "Báo cáo kèm giới hạn."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard
          icon="component"
          title="Bối cảnh"
          body="Phỏng vấn cho thấy nhiều khách cần bàn với người thân trước khi đặt lịch. Nhóm muốn biết điều này phổ biến đến đâu."
        />
        <InfoCard
          icon="clipboard-check"
          title="Khảo sát"
          body="Gửi 2.000 khách, nhận 312 câu trả lời (15,6%). Câu hỏi: “Lần gần nhất đặt lịch, bạn có bàn với ai trước không?” (có sẵn lựa chọn, kèm “Không nhớ”)."
        />
        <InfoCard icon="analytics" title="Kết quả (giả định)" body="Khoảng một nửa trả lời có, với sai số khoảng ± 5,5 điểm." />
        <InfoCard
          tone="fill"
          icon="check-circle"
          title="Quyết định"
          body="Nhu cầu đủ phổ biến để ưu tiên tính năng chia sẻ tóm tắt chi phí. Báo cáo ghi rõ tỷ lệ phản hồi thấp và người trả lời là khách đã dùng dịch vụ, không phải khách tiềm năng."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Hỏi người ta dự đoán hành vi", "Dự đoán thường sai.", "Hỏi hành vi gần đây cụ thể."],
            ["Câu dẫn dắt, thang lệch", "Kết quả lệch.", "Câu trung lập, thang cân bằng."],
            ["Khảo sát quá dài", "Người trả lời bỏ giữa chừng, trả lời qua loa.", "Chỉ hỏi điều cần."],
            ["Không thử trước", "Câu hỏi bị hiểu sai.", "Thử với vài người."],
            ["Báo cáo tỷ lệ không kèm sai số và tỷ lệ phản hồi", "Người đọc tin quá mức.", "Báo cáo đầy đủ."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Phương pháp", "Thu gì", "Khi nào chọn"]}
          widths={[260]}
          rows={[
            { icon: "clipboard-check", highlight: true, cells: ["Survey", "Điều nhiều người kể lại.", "Cần số liệu về thái độ."] },
            { icon: "chat", cells: ["User Interview", "Điều một người kể lại, sâu.", "Cần hiểu vì sao."] },
            { icon: "analytics", cells: ["Analytics", "Hành vi thật trên sản phẩm.", "Cần biết người dùng làm gì."] },
            { icon: "users", cells: ["Focus Group", "Ý kiến trong thảo luận nhóm.", "Khám phá thái độ, ngôn ngữ."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="pencil"
            title="Bảng hỏi"
            items={["Mục tiêu rõ, chỉ hỏi điều cần.", "Câu hỏi trung lập, một ý, không thuật ngữ.", "Hỏi hành vi gần đây, không bắt dự đoán.", "Thang cân bằng, lựa chọn đầy đủ và không trùng."]}
          />
          <ChecklistColumn icon="analytics" title="Gửi và báo cáo" items={["Đã thử với vài người.", "Báo cáo tỷ lệ phản hồi, sai số và giới hạn."]} />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Rating Scales", "Thang đánh giá", "Dạng câu hỏi thường dùng."],
            ["Voice of the Customer (VoC)", "Tiếng nói khách hàng", "Khảo sát dùng để xếp ưu tiên nhu cầu."],
            ["Likert Scale", "Thang Likert", "Dạng câu hỏi thường dùng."],
            ["Net Promoter Score (NPS)", "Chỉ số khách hàng giới thiệu", "Câu hỏi khảo sát chuẩn."],
            ["Quantitative Research", "Nghiên cứu định lượng", "Khảo sát là phương pháp định lượng phổ biến."],
            ["Attitudinal Methods", "Phương pháp nghiên cứu thái độ", "Khảo sát thu thái độ."],
            ["Confidence Intervals", "Khoảng tin cậy", "Đọc sai số của tỷ lệ."],
            ["Market Research", "Nghiên cứu thị trường", "Khảo sát dùng nhiều trong market research."],
          ]}
        />
      </Section>
    </div>
  );
}

export const SURVEY: Article = {
  slug: "survey",
  version: 1,
  term: "Survey",
  fn: 1,
  vi: "Khảo sát",
  kind: "Phương pháp nghiên cứu / kiểm thử",
  definition: "Survey là phương pháp thu thông tin từ nhiều người bằng một bộ câu hỏi chuẩn, để biết thái độ, ý kiến, đặc điểm hoặc hành vi họ tự kể lại.",
  definitionMore: "Vì mọi người trả lời cùng câu hỏi, kết quả có thể tổng hợp thành số liệu và so sánh giữa các nhóm hay thời điểm.",
  oneLine: "Bộ câu hỏi chuẩn gửi cho nhiều người để biết thái độ và ý kiến của họ.",
  glance: [
    ["15,6%", "Tỷ lệ phản hồi trong ví dụ"],
    ["± 5,5", "Điểm sai số với 312 người"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Questionnaire (bảng hỏi)"] },
    { label: "Nhóm chính", items: ["Nghiên cứu thái độ"] },
    { label: "Thẻ phụ", items: ["Đo lường và phân tích"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "Khảo sát thu điều người trả lời nói (thái độ, ý kiến, hành vi họ kể lại), không đo trực tiếp hành vi. Câu hỏi đóng cho số liệu; câu hỏi mở cho dữ liệu định tính.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
