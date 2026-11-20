"use client";

import { CheckCard, CheckCards, Formula, InfoGrid, InOutCards, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Stat, Subhead, Table, sectionProps, type SectionDef } from "./ui";

/* Customer Effort Score (CES) — copy from ux-glossary/customer-effort-score.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "measure", title: "Định nghĩa đo lường: câu hỏi và thang đo", icon: "gauge" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "maths", title: "Công thức và ví dụ tính", icon: "sigma" },
  { id: "limits", title: "Giới hạn diễn giải", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các chỉ số gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Section {...S.problem}>
        <P>
          Nhiều tổ chức đo sự hài lòng chung chung, nhưng khó biết điểm chạm cụ thể nào đang làm khách mệt mỏi. Một khách phải gọi ba lần, chuyển qua hai bộ phận và nhắc lại
          thông tin nhiều lần vẫn có thể cho điểm hài lòng trung bình, vì nhân viên lịch sự. CES tập trung vào công sức khách phải bỏ ra tại một tương tác cụ thể. Đó là thứ tổ
          chức có thể đo và cải thiện trực tiếp.
        </P>
        <Eyebrow>CES hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          minH={170}
          items={[
            ["target", "Điểm chạm nào gây khó khăn nhất", "Cần cải thiện trước."],
            ["rotate", "Thay đổi quy trình có giảm nỗ lực không", "So sánh trước và sau."],
            ["split", "Kênh nào hiệu quả hơn", "Tự phục vụ, chat, gọi điện, với cùng loại yêu cầu."],
            ["chat", "Khách nào cần được liên hệ lại", "Khi họ báo cáo nỗ lực cao."],
          ]}
        />
      </Section>

      <Section {...S.measure}>
        <Table
          head={["Phiên bản", "Câu hỏi (diễn đạt tóm tắt)", "Thang đo", "Chiều điểm"]}
          widths={[260, undefined, 240, 200]}
          rows={[
            { icon: "book", cells: ["CES gốc (CEB, 2010)", "Khách đã phải bỏ ra bao nhiêu công sức để giải quyết yêu cầu.", "1 (rất ít) – 5 (rất nhiều)", "Điểm thấp là tốt."] },
            {
              icon: "gauge",
              highlight: true,
              cells: ["CES 2.0", "Mức đồng ý với nhận định rằng tổ chức đã giúp khách giải quyết vấn đề một cách dễ dàng.", "1 (rất không đồng ý) – 7 (rất đồng ý)", "Điểm cao là tốt."],
            },
            { icon: "list", cells: ["Biến thể theo tác vụ", "Mức dễ dàng khi hoàn thành một tác vụ cụ thể (ví dụ đặt lịch).", "Thường 1–7", "Điểm cao là tốt."] },
          ]}
        />
        <div className="flex gap-4">
          <Callout tone="note">
            Câu chữ chính xác của từng phiên bản cần được đối chiếu với tài liệu gốc trước khi dùng. Tổ chức dịch câu hỏi sang tiếng Việt nên giữ nguyên bản dịch giữa các lần đo.
          </Callout>
          <Callout tone="good" icon="hourglass" title="Thời điểm hỏi">
            Ngay sau tương tác cần đo (sau khi gửi đặt lịch, sau khi kết thúc cuộc gọi hỗ trợ), để khách trả lời dựa trên trải nghiệm còn mới.
          </Callout>
        </div>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "target",
              "Bối cảnh phù hợp",
              [
                "Đo các tương tác cụ thể: hỗ trợ khách hàng, tự phục vụ, đặt lịch, đổi trả.",
                "Theo dõi hiệu quả của thay đổi quy trình hoặc giao diện tại một điểm chạm.",
                "So sánh giữa các kênh phục vụ.",
              ],
            ],
            ["eye", "Dấu hiệu nhận biết", ["Khách liên hệ lại nhiều lần cho cùng một vấn đề.", "Mức hài lòng chung không chỉ ra được nơi cần cải thiện."]],
            [
              "clipboard-check",
              "Điều kiện cần",
              [
                "Xác định được thời điểm kết thúc tương tác để gửi câu hỏi.",
                "Thống nhất một phiên bản câu hỏi và thang đo.",
                "Có kế hoạch hành động khi điểm thấp, không chỉ thu số liệu.",
              ],
            ],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[340]}
          rows={[
            { icon: "users", cells: ["Đo cảm nhận về toàn bộ quan hệ với thương hiệu", "CES gắn với một tương tác cụ thể.", "NPS hoặc khảo sát quan hệ khách hàng."] },
            { icon: "chat", cells: ["Cần biết vì sao khách thấy khó", "Một câu hỏi thang điểm không cho biết nguyên nhân.", "Câu hỏi mở kèm theo; phỏng vấn; usability testing."] },
            {
              icon: "component",
              cells: ["Đo độ dễ dùng của giao diện trong nghiên cứu có kiểm soát", "Có thang đo chuẩn hóa dành cho mục đích này.", "SUS, UMUX, câu hỏi độ dễ sau tác vụ."],
            },
            { icon: "bar-chart", cells: ["Số phản hồi rất ít", "Điểm dao động mạnh, khó so sánh.", "Gộp theo thời gian dài hơn; nghiên cứu định tính."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Chọn điểm chạm và phiên bản CES.", "Ví dụ: sau khi khách gửi đặt lịch thành công; CES thang 1–7.", "Định nghĩa chỉ số, câu hỏi, thang đo."],
            [
              "Chốt cách tổng hợp.",
              "Trung bình điểm, hoặc tỷ lệ top-2-box (tỷ lệ chọn 6 hoặc 7). Chọn một cách làm chỉ số chính và giữ nguyên.",
              "Công thức báo cáo.",
            ],
            ["Thêm câu hỏi mở.", "“Điều gì khiến việc này dễ hoặc khó với bạn?”", "Dữ liệu giải thích."],
            ["Thu thập và theo dõi.", "Báo cáo theo kỳ, kèm khoảng tin cậy và số phản hồi.", "Bảng theo dõi CES."],
            ["Đóng vòng phản hồi.", "Liên hệ lại khách báo nỗ lực cao khi phù hợp; đưa nhận định vào danh sách cải tiến.", "Hành động cải tiến."],
            ["Đánh giá thay đổi.", "So sánh CES trước và sau thay đổi, hoặc dùng A/B test khi có thể.", "Kết luận về hiệu quả thay đổi."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <Subhead icon="target">Xác định tiêu chí trước khi đo</Subhead>
        <Table
          head={["Loại chỉ số", "Trong ví dụ"]}
          widths={[340]}
          rows={[
            { highlight: true, cells: ["Chỉ số chính", "Tỷ lệ top-2-box: tỷ lệ khách chọn 6 hoặc 7 trên thang 1–7 cho câu hỏi về mức dễ dàng khi đặt lịch."] },
            { cells: ["Chỉ số phụ", "Điểm CES trung bình; tỷ lệ khách chọn 1–3 (nỗ lực cao)."] },
            { cells: ["Chỉ số bảo vệ", "Tỷ lệ phản hồi khảo sát (để biết nhóm trả lời có bị thu hẹp không)."] },
            { cells: ["Mức thay đổi đáng quan tâm", "Tăng top-2-box ít nhất 10 điểm phần trăm."] },
          ]}
        />
        <Subhead icon="sigma">Công thức</Subhead>
        <div className="flex gap-4">
          <Formula label="Điểm CES trung bình" formula="Tổng điểm của mọi người trả lời ÷ Số người trả lời" />
          <Formula
            label="Tỷ lệ top-2-box"
            formula="Số người chọn 6 hoặc 7 ÷ Số người trả lời"
            note="Tức là: trong số người trả lời, bao nhiêu phần trăm thấy việc này rất dễ."
          />
          <Formula label="Chênh lệch giữa hai kỳ" formula="Tỷ lệ kỳ 2 − Tỷ lệ kỳ 1" />
        </div>
        <Subhead icon="bar-chart">Ví dụ thay số</Subhead>
        <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật.</Callout>
        <Table
          head={["", "Kỳ 1 (trước thay đổi)", "Kỳ 2 (sau thay đổi)"]}
          widths={[340]}
          rows={[
            { cells: ["Số phản hồi", "200", "200"] },
            { cells: ["Số người chọn 6 hoặc 7", "124", "150"] },
            { highlight: true, cells: ["Tỷ lệ top-2-box", "124 ÷ 200 = 62,0%", "150 ÷ 200 = 75,0%"] },
          ]}
        />
        <div className="flex gap-4">
          <Stat value="62,0%" label="Kỳ 1 · n = 200" note="Tỷ lệ top-2-box trước thay đổi." />
          <Stat value="75,0%" label="Kỳ 2 · n = 200" note="Tỷ lệ top-2-box sau thay đổi." />
          <Stat fill value="+13" label="Điểm phần trăm" note="Chênh lệch = 75,0% − 62,0%." />
        </div>

        <Subhead icon="shield-alert">Kiểm tra độ tin cậy của kết quả</Subhead>
        <P>Nhập số liệu hai kỳ vào công cụ so sánh hai tỷ lệ (như khi phân tích A/B test):</P>
        <Table
          head={["Nhập vào công cụ", "Kết quả"]}
          widths={[480]}
          rows={[{ cells: ["Kỳ 1: 124 / 200 · Kỳ 2: 150 / 200", "Sai số của chênh lệch ≈ 9 điểm phần trăm · p-value ≈ 0,005"] }]}
        />
        <Formula label="Khoảng tin cậy" formula="13 ± 9 → từ khoảng 4 đến 22 điểm phần trăm" />
        <div className="flex gap-4">
          <Callout tone="good" title="Cách đọc đúng">
            Khoảng tin cậy không chứa 0, nên dữ liệu ủng hộ việc tỷ lệ khách thấy đặt lịch “rất dễ” đã tăng. Mức tăng thật nhiều khả năng từ 4 đến 22 điểm. Đầu dưới thấp hơn mức 10
            điểm đáng quan tâm, nên mức cải thiện thật có thể nhỏ hơn kỳ vọng.
          </Callout>
          <Callout tone="bad" title="Cách đọc sai">
            “Thay đổi giao diện làm CES tăng 13 điểm.” Đây là so sánh hai kỳ, không phải thử nghiệm chia nhóm ngẫu nhiên. Mùa vụ, nhóm khách khác nhau hay thay đổi khác cùng thời
            điểm đều có thể góp phần.
          </Callout>
        </div>

        <Subhead icon="users">Cần bao nhiêu phản hồi</Subhead>
        <P>
          Bảng tra cho tỷ lệ hiện tại 62%, theo quy ước phổ biến (khoảng tin cậy 95%, 80% khả năng phát hiện nếu thay đổi có thật), tính bằng công cụ tính cỡ mẫu:
        </P>
        <Table
          head={["Muốn phát hiện mức tăng", "Tỷ lệ kỳ 2 cần đạt", "Số phản hồi cần mỗi kỳ"]}
          rows={[
            { cells: ["15 điểm phần trăm", "77%", "khoảng 147"] },
            { highlight: true, cells: ["10 điểm phần trăm", "72%", "khoảng 346"] },
            { cells: ["5 điểm phần trăm", "67%", "khoảng 1.437"] },
          ]}
        />
        <Callout tone="note" title="Quy tắc dễ nhớ">
          Với 200 phản hồi mỗi kỳ, chỉ những thay đổi khoảng 15 điểm trở lên mới được phát hiện đáng tin. Muốn phát hiện thay đổi nhỏ bằng một nửa, cần khoảng gấp bốn lần số phản
          hồi.
        </Callout>

        <Subhead icon="clipboard-check">Điều kiện để kết quả đáng tin</Subhead>
        <InfoGrid
          items={[
            ["chat", "Giữ nguyên câu hỏi", "Câu hỏi, bản dịch và thang đo giữ nguyên giữa các kỳ."],
            ["hourglass", "Cùng thời điểm", "Gửi câu hỏi ở cùng thời điểm trong hành trình."],
            ["users", "Tỷ lệ phản hồi ổn định", "Không thay đổi bất thường (người trả lời có thể khác nhau giữa các kỳ)."],
            ["split", "Chứng minh tác động", "Khi cần chứng minh tác động của một thay đổi, dùng A/B test thay vì so sánh trước – sau."],
          ]}
        />

        <Subhead icon="split">Quy tắc ra quyết định</Subhead>
        <Table
          head={["Kết quả", "Quyết định"]}
          widths={[560]}
          rows={[
            {
              icon: "check-circle",
              cells: ["CES cải thiện, khoảng tin cậy không chứa 0, đạt mức đáng quan tâm", "Ghi nhận; theo dõi tiếp; mở rộng cách làm sang điểm chạm khác."],
            },
            { icon: "hourglass", cells: ["CES cải thiện nhưng khoảng tin cậy chứa 0", "Chưa kết luận; tiếp tục thu thập."] },
            { icon: "users", cells: ["CES cải thiện nhưng tỷ lệ phản hồi giảm mạnh", "Kiểm tra nhóm trả lời có bị lệch không."] },
            { icon: "alert", cells: ["Điểm thấp tập trung ở một loại yêu cầu", "Ưu tiên nghiên cứu loại yêu cầu đó; đọc câu trả lời mở."] },
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["gauge", "Không so sánh được giữa các phiên bản CES", "Thang 1–5 và 1–7, chiều điểm khác nhau."],
            ["arrows", "So sánh với tổ chức khác rất khó", "Do khác câu hỏi, bản dịch, điểm chạm và đối tượng khách."],
            ["hourglass", "Điểm cảm nhận, không phải đo thời gian hay số bước", "Nên đặt cạnh số liệu hành vi (số lần liên hệ, thời gian xử lý)."],
            ["users", "Người trả lời có thể không đại diện", "Người rất hài lòng hoặc rất bực thường trả lời nhiều hơn."],
          ]}
          last={[
            "link",
            "Mối liên hệ giữa CES và giữ chân khách",
            "Được báo cáo trong nghiên cứu gốc; mức độ áp dụng cho từng tổ chức cần được kiểm chứng bằng dữ liệu của chính tổ chức đó.",
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={[
            "Điểm chạm cần đo; phiên bản câu hỏi và thang đo.",
            "Cách tổng hợp (trung bình hoặc top-2-box).",
            "Kênh và thời điểm gửi khảo sát.",
            "Kế hoạch đóng vòng phản hồi.",
          ]}
          outputs={["CES theo kỳ, theo điểm chạm, theo kênh, kèm khoảng tin cậy.", "Lý do khách thấy dễ hoặc khó (từ câu hỏi mở).", "Danh sách cải tiến ưu tiên."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối luồng đặt lịch tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard icon="target" title="Bối cảnh" body="Nhóm muốn đo mức dễ dàng khi đặt lịch online và khi đổi lịch qua tổng đài." />
        <CheckCard
          icon="list"
          title="Cách áp dụng"
          mark="•"
          items={[
            "Sau khi đặt lịch thành công: câu hỏi CES thang 1–7, kèm câu hỏi mở.",
            "Sau cuộc gọi đổi lịch: cùng câu hỏi, gửi qua tin nhắn.",
            "Báo cáo tỷ lệ top-2-box theo tháng, kèm khoảng tin cậy.",
          ]}
        />
        <InfoCard
          icon="check-circle"
          tone="fill"
          title="Phát hiện (giả định)"
          body="CES của đổi lịch qua tổng đài thấp hơn rõ rệt; câu trả lời mở nhắc nhiều tới “phải chờ máy” và “phải đọc lại thông tin”. Nhóm ưu tiên xây tính năng đổi lịch tự phục vụ, rồi so sánh CES của hai kênh sau khi ra mắt."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kế hoạch minh họa, chưa phải kết quả thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Trộn các phiên bản CES", "Điểm không so sánh được.", "Ghi rõ phiên bản; giữ nguyên qua các kỳ."],
            ["Không ghi chiều điểm", "Người đọc không biết điểm cao là tốt hay xấu.", "Ghi rõ trong mọi báo cáo."],
            ["Hỏi quá muộn sau tương tác", "Khách không nhớ rõ.", "Hỏi ngay sau khi hoàn thành."],
            ["Chỉ báo điểm trung bình", "Che giấu nhóm khách gặp khó nhiều.", "Báo cả phân bố hoặc tỷ lệ nỗ lực cao."],
            ["Thu số liệu mà không hành động", "Khách mất niềm tin vào khảo sát.", "Có quy trình đóng vòng phản hồi."],
            ["Coi so sánh trước – sau là bằng chứng nhân quả", "Nhiều yếu tố khác thay đổi theo thời gian.", "Dùng A/B test khi cần chứng minh tác động."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Chỉ số", "Đo gì", "Phạm vi", "Khi nào chọn"]}
          widths={[220]}
          rows={[
            { icon: "gauge", highlight: true, cells: ["CES", "Mức nỗ lực khách cảm nhận.", "Một tương tác cụ thể.", "Cải thiện điểm chạm, quy trình phục vụ."] },
            { icon: "users", cells: ["NPS", "Mức sẵn lòng giới thiệu.", "Quan hệ tổng thể với thương hiệu.", "Theo dõi lòng trung thành theo thời gian."] },
            { icon: "check-circle", cells: ["CSAT", "Mức hài lòng.", "Tương tác hoặc tổng thể, tùy câu hỏi.", "Đo cảm nhận chung về một trải nghiệm."] },
            { icon: "clipboard-check", cells: ["SUS / UMUX", "Cảm nhận về độ dễ dùng của hệ thống.", "Một sản phẩm, thường trong nghiên cứu.", "Đánh giá khả năng sử dụng, benchmark."] },
            { icon: "lightbulb", cells: ["Cognitive Load", "Nỗ lực trí óc khi dùng giao diện.", "Một tác vụ.", "Thiết kế và đánh giá giao diện."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <ChecklistColumn
          icon="clipboard-check"
          title="Đo và báo cáo CES"
          items={[
            "Đã chọn và ghi rõ phiên bản CES, thang đo, chiều điểm.",
            "Câu hỏi được gửi ngay sau tương tác cần đo.",
            "Có câu hỏi mở để hiểu lý do.",
            "Đã chốt cách tổng hợp (trung bình hoặc top-2-box).",
            "Báo cáo kèm số phản hồi và khoảng tin cậy.",
            "Có quy trình đóng vòng phản hồi với khách báo nỗ lực cao.",
            "Không so sánh với số liệu dùng phiên bản khác.",
          ]}
        />
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Net Promoter Score (NPS)", "Chỉ số khách hàng giới thiệu", "Chỉ số quan hệ tổng thể, thường dùng cạnh CES."],
            ["Customer Experience", "Trải nghiệm khách hàng", "Phạm vi mà CES đo một khía cạnh."],
            ["Customer Feedback Loop", "Vòng phản hồi khách hàng", "Cách biến điểm CES thành hành động."],
            ["Cognitive Load", "Tải nhận thức", "Một phần của nỗ lực khi dùng giao diện."],
            ["Confidence Intervals", "Khoảng tin cậy", "Cách báo cáo CES kèm độ không chắc chắn."],
            ["Survey", "Khảo sát", "Hình thức thu thập CES."],
            ["UX Metrics", "Chỉ số UX", "Nhóm chỉ số mà CES có thể bổ sung."],
            ["UMUX", "Thang đo khả năng sử dụng UMUX", "Bảng hỏi ngắn đo cảm nhận khả năng sử dụng toàn hệ thống."],
          ]}
        />
      </Section>
    </div>
  );
}

export const CUSTOMER_EFFORT_SCORE: Article = {
  slug: "customer-effort-score",
  version: 1,
  term: "Customer Effort Score (CES)",
  fn: 6,
  vi: "Điểm nỗ lực của khách hàng",
  kind: "Chỉ số / thống kê",
  definition:
    "Customer Effort Score (CES) là chỉ số đo mức độ dễ hay khó mà khách hàng cảm nhận khi hoàn thành một việc với tổ chức, ví dụ giải quyết một yêu cầu hỗ trợ, đặt lịch hay đổi đơn hàng.",
  definitionMore:
    "Khách trả lời một câu hỏi ngắn ngay sau tương tác, trên một thang điểm. Chỉ số này ra đời từ lập luận rằng giảm nỗ lực của khách hàng là cách giữ chân khách hiệu quả hơn so với cố gắng làm họ “vui sướng”.",
  oneLine: "Chỉ số đo khách hàng cảm thấy dễ hay khó khi hoàn thành một việc với tổ chức.",
  glance: [
    ["CES", "Viết tắt"],
    ["1–7", "Thang CES 2.0, cao là tốt"],
  ],
  facts: [
    { label: "Viết tắt", items: ["CES"] },
    { label: "Nhóm chính", items: ["Đo lường và phân tích"] },
    { label: "Thẻ phụ", items: ["Kiểm thử và đánh giá", "Quy trình và vận hành"] },
    {
      label: "Lưu ý tên gọi",
      items: ["CES có nhiều phiên bản với câu hỏi và thang đo khác nhau (bản gốc 1–5; CES 2.0 thang đồng ý 1–7). Luôn ghi rõ đang dùng phiên bản nào."],
    },
  ],
  sections: SECTIONS,
  Body,
};
