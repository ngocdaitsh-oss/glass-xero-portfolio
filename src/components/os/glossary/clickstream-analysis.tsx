"use client";

import { Blk, T } from "./edit";
import { CheckCard, CheckCards, Formula, InfoGrid, InOutCards, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Stat, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Clickstream Analysis — copy from ux-glossary/clickstream-analysis.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "parts", title: "Thành phần của dữ liệu clickstream", icon: "component" },
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

/** Funnel: one bar per step, width proportional to sessions left; the step-through rate sits between bars. */
function Funnel() {
  const steps: [string, number, string?][] = [
    ["Trang dịch vụ", 10000],
    ["Mở form", 3200, "32,0% đi tiếp"],
    ["Chọn giờ", 1400, "43,8% đi tiếp"],
    ["Gửi thành công", 1000, "71,4% đi tiếp"],
  ];
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="filter" size={36} iconSize={18} radius={10} />
        <Eyebrow>Sơ đồ phễu</Eyebrow>
      </div>
      <div className="flex flex-col gap-1.5">
        {steps.map(([name, n, rate], i) => (
          <div key={name} className="flex flex-col gap-1.5">
            {rate ? <span className={`pl-[200px] font-mono text-[14px] leading-5 tracking-[0.4px] ${i === 2 ? "text-[var(--d-bad)]" : "text-[var(--w-muted)]"}`}>↓ {rate}</span> : null}
            <div className="flex items-center gap-5">
              <T className="w-[180px] shrink-0 text-[17px] leading-6 font-semibold">{name}</T>
              <div className="h-10 flex-1">
                <span className={`block h-full rounded-xl ${i === 2 ? "bg-[var(--d-fill)]" : "bg-[var(--d-soft)]"}`} style={{ width: `${(n / 10000) * 100}%`, minWidth: 8 }} />
              </div>
              <span className="w-[80px] shrink-0 text-right font-mono text-[16px] leading-6">{n.toLocaleString("vi-VN")}</span>
            </div>
          </div>
        ))}
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Mỗi bước của phễu là một thanh, độ dài tỷ lệ với số phiên còn lại. Giữa các thanh ghi tỷ lệ đi tiếp. Bước có tỷ lệ rời đi lớn nhất là nơi cần tìm hiểu trước.
      </T>
    </Blk>
  );
}

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Section {...S.problem}>
        <P>
          Nghiên cứu định tính cho hiểu biết sâu nhưng chỉ với vài người. Nhóm khó biết vấn đề quan sát được có phổ biến không, hay vấn đề lớn nhất đang nằm ở đâu trong một luồng
          dài. Clickstream analysis dùng dữ liệu của toàn bộ người dùng để trả lời câu hỏi về quy mô và vị trí.
        </P>
        <Eyebrow>Clickstream analysis hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          minH={170}
          items={[
            ["filter", "Vấn đề nằm ở bước nào", "Người dùng rời luồng nhiều nhất ở đâu."],
            ["binoculars", "Ưu tiên nghiên cứu sâu", "Bước nào đáng để quan sát, phỏng vấn tiếp."],
            ["split", "Đường đi thực tế khác thiết kế ra sao", "Người dùng có đi theo luồng dự kiến không, có quay lại nhiều không."],
            ["users", "Nhóm người dùng nào gặp khó", "Khác biệt theo thiết bị, kênh đến, người mới hay cũ."],
          ]}
          last={["analytics", "Theo dõi sau thay đổi", "Chỉ số luồng thay đổi thế nào sau khi ra mắt."]}
        />
      </Section>

      <Section {...S.parts}>
        <Table
          head={["Thành phần", "Mô tả", "Ví dụ minh họa (giả định)"]}
          widths={[260]}
          rows={[
            { icon: "play-circle", cells: ["Sự kiện (event)", "Một thao tác được ghi lại: xem trang, nhấp nút, gửi form.", "view_service_page, open_booking_form, select_time, submit_booking."] },
            { icon: "hourglass", cells: ["Phiên (session)", "Chuỗi sự kiện trong một lần truy cập.", "Một lần khách vào trang và đặt lịch."] },
            { icon: "users", cells: ["Người dùng (user)", "Định danh nối nhiều phiên của cùng một người (nếu có).", "ID ẩn danh trên trình duyệt."] },
            { icon: "list", cells: ["Thuộc tính", "Thông tin đi kèm: thiết bị, kênh đến, thời điểm.", "Mobile/desktop; đến từ tìm kiếm hay quảng cáo."] },
            { icon: "filter", cells: ["Phễu (funnel)", "Chuỗi bước đã định nghĩa trước để đo tỷ lệ đi tiếp.", "Trang dịch vụ → Mở form → Chọn giờ → Gửi."] },
            { icon: "split", cells: ["Đường đi (path)", "Thứ tự thực tế các trang/sự kiện.", "Mở form → Bảng giá → quay lại form."] },
          ]}
        />
        <Funnel />
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "target",
              "Bối cảnh phù hợp",
              [
                "Sản phẩm đã ra mắt và có dữ liệu sự kiện đáng tin.",
                "Cần biết vấn đề nằm ở đâu trong một luồng nhiều bước.",
                "Cần định lượng mức độ phổ biến của một vấn đề phát hiện trong nghiên cứu định tính.",
                "Theo dõi sau ra mắt, trước hoặc sau A/B test.",
              ],
            ],
            ["eye", "Dấu hiệu nhận biết", ["Tỷ lệ chuyển đổi tổng thấp nhưng không biết thấp ở bước nào.", "Nhóm tranh luận về việc người dùng “có lẽ” làm gì."]],
            [
              "clipboard-check",
              "Điều kiện cần",
              [
                "Kế hoạch đo lường (tracking plan) với tên và định nghĩa sự kiện rõ ràng.",
                "Dữ liệu được kiểm tra: sự kiện không thiếu, không trùng.",
                "Tuân thủ quy định về quyền riêng tư và đồng ý thu thập dữ liệu.",
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
            { icon: "chat", cells: ["Cần hiểu vì sao người dùng rời đi", "Dữ liệu cho biết ở đâu, không cho biết vì sao.", "Usability testing, phỏng vấn, session replay."] },
            { icon: "users", cells: ["Sản phẩm chưa ra mắt hoặc ít người dùng", "Không đủ dữ liệu.", "Kiểm thử prototype."] },
            { icon: "split", cells: ["Muốn chứng minh thay đổi gây ra cải thiện", "So sánh trước – sau dễ bị yếu tố bên ngoài làm nhiễu.", "A/B testing."] },
            { icon: "alert", cells: ["Sự kiện chưa được định nghĩa và kiểm tra", "Kết quả sai lệch theo dữ liệu sai.", "Xây tracking plan và kiểm tra dữ liệu trước."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Đặt câu hỏi.", "Ví dụ: “Người dùng rời luồng đặt lịch ở bước nào nhiều nhất, và có khác nhau giữa mobile và desktop không?”", "Câu hỏi phân tích."],
            [
              "Định nghĩa sự kiện và phễu.",
              "Đặt tên sự kiện nhất quán; định nghĩa rõ thế nào là “đi tiếp” (cùng phiên hay trong một khoảng thời gian).",
              "Tracking plan và định nghĩa phễu.",
            ],
            [
              "Kiểm tra chất lượng dữ liệu.",
              "So sánh số sự kiện với nguồn khác (ví dụ số lịch hẹn trong hệ thống nội bộ); tìm sự kiện thiếu hoặc trùng.",
              "Dữ liệu đã kiểm tra, ghi chú các hạn chế.",
            ],
            ["Phân tích phễu và đường đi.", "Tính tỷ lệ đi tiếp từng bước; xem đường đi phổ biến, vòng lặp, điểm thoát.", "Bước có vấn đề lớn nhất."],
            ["Phân đoạn (segment).", "Chia theo thiết bị, kênh đến, người mới/cũ; so sánh kèm khoảng tin cậy.", "Nhóm người dùng gặp khó nhiều hơn."],
            ["Đặt giả thuyết và kiểm chứng.", "Dùng nghiên cứu định tính để tìm nguyên nhân; dùng A/B test để kiểm chứng giải pháp.", "Giả thuyết và kế hoạch kiểm chứng."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <Subhead icon="target">Xác định tiêu chí trước khi phân tích</Subhead>
        <InfoGrid
          cols={3}
          items={[
            ["check-circle", "Chỉ số chính", "Tỷ lệ phiên xem trang dịch vụ đi đến gửi đặt lịch thành công."],
            ["filter", "Chỉ số theo bước", "Tỷ lệ đi tiếp và tỷ lệ rời đi ở từng bước."],
            ["users", "Nhóm so sánh chốt trước", "Mobile và desktop. Chốt trước để tránh “đào” dữ liệu đến khi thấy một khác biệt chỉ do may rủi."],
          ]}
        />
        <Subhead icon="sigma">Công thức</Subhead>
        <div className="flex gap-4">
          <Formula label="Tỷ lệ đi tiếp ở một bước" formula="Số phiên ở bước này ÷ Số phiên ở bước ngay trước" />
          <Formula label="Tỷ lệ rời đi ở một bước" formula="100% − Tỷ lệ đi tiếp" />
          <Formula label="Tỷ lệ chuyển đổi tổng" formula="Số phiên ở bước cuối ÷ Số phiên ở bước đầu" />
        </div>
        <Subhead icon="bar-chart">Ví dụ thay số</Subhead>
        <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật.</Callout>
        <Table
          head={["Bước", "Số phiên", "Tỷ lệ đi tiếp", "Tỷ lệ rời đi"]}
          widths={[320]}
          rows={[
            { cells: ["Xem trang dịch vụ", "10.000", "—", "—"] },
            { cells: ["Mở form đặt lịch", "3.200", "3.200 ÷ 10.000 = 32,0%", "68,0%"] },
            { highlight: true, cells: ["Chọn giờ", "1.400", "1.400 ÷ 3.200 ≈ 43,8%", "56,3%"] },
            { cells: ["Gửi thành công", "1.000", "1.000 ÷ 1.400 ≈ 71,4%", "28,6%"] },
          ]}
        />
        <div className="flex gap-4">
          <Stat fill value="10,0%" label="Tỷ lệ chuyển đổi tổng" note="1.000 ÷ 10.000. Khoảng tin cậy 95% từ công cụ: khoảng 9,4% – 10,6%; hẹp vì có nhiều phiên." />
          <Callout tone="note" title="Cách đọc">
            Bước rời đi nhiều nhất về số lượng là từ trang dịch vụ sang mở form. Nhưng bước này tự nhiên có nhiều người chỉ xem thông tin. Trong số người đã bắt đầu đặt lịch, bước
            “Chọn giờ” mất hơn một nửa số người đã mở form. Đây là bước đáng nghiên cứu sâu nhất, vì người dùng ở đây đã có ý định đặt lịch.
          </Callout>
        </div>

        <Subhead icon="split">Kiểm tra độ tin cậy của khác biệt giữa hai nhóm</Subhead>
        <Table
          head={["", "Desktop", "Mobile"]}
          widths={[380]}
          rows={[
            { cells: ["Số phiên xem trang dịch vụ", "4.000", "6.000"] },
            { cells: ["Số phiên gửi thành công", "560", "440"] },
            { highlight: true, cells: ["Tỷ lệ chuyển đổi", "560 ÷ 4.000 = 14,0%", "440 ÷ 6.000 ≈ 7,3%"] },
          ]}
        />
        <Formula label="Chênh lệch" formula="Tỷ lệ mobile − Tỷ lệ desktop = 7,3% − 14,0% ≈ −6,7 điểm phần trăm" />
        <P>Nhập hai nhóm vào công cụ so sánh hai tỷ lệ (như khi phân tích A/B test):</P>
        <Table
          head={["Nhập vào công cụ", "Kết quả"]}
          widths={[480]}
          rows={[{ cells: ["Desktop: 560 / 4.000 · Mobile: 440 / 6.000", "Sai số ≈ 1,3 điểm phần trăm · p-value rất nhỏ (dưới 0,001)"] }]}
        />
        <Formula label="Khoảng tin cậy" formula="−6,7 ± 1,3 → từ khoảng −7,9 đến −5,4 điểm phần trăm" />
        <div className="flex gap-4">
          <Callout tone="good" title="Cách đọc đúng">
            Khoảng tin cậy nằm hoàn toàn dưới 0. Chênh lệch giữa mobile và desktop rất khó là do may rủi. Đây là dấu hiệu mạnh để ưu tiên nghiên cứu trải nghiệm trên mobile.
          </Callout>
          <Callout tone="bad" title="Cách đọc sai">
            “Giao diện mobile làm giảm chuyển đổi một nửa.” Người dùng mobile và desktop khác nhau ở nhiều điểm (mục đích, kênh đến, thời điểm). Đây là so sánh quan sát, không phải
            thử nghiệm chia nhóm ngẫu nhiên, nên không chứng minh được nguyên nhân.
          </Callout>
        </div>

        <Subhead icon="clipboard-check">Điều kiện để kết quả đáng tin</Subhead>
        <InfoGrid
          items={[
            ["play-circle", "Sự kiện rõ và đầy đủ", "Sự kiện được định nghĩa rõ và ghi đầy đủ trên mọi nền tảng."],
            ["sigma", "Cách đếm thống nhất", "Theo phiên hay theo người dùng, thống nhất giữa các bước."],
            ["users", "Nhóm so sánh chốt trước", "Càng so nhiều nhóm, càng dễ gặp một khác biệt chỉ do may rủi."],
            ["shield-alert", "Dữ liệu bị thiếu", "Có tính đến chặn theo dõi (ad blocker), từ chối cookie, bot."],
          ]}
        />

        <Subhead icon="split">Quy tắc ra quyết định</Subhead>
        <Table
          head={["Kết quả", "Quyết định"]}
          widths={[480]}
          rows={[
            { icon: "filter", cells: ["Một bước có tỷ lệ rời đi bất thường cao", "Nghiên cứu định tính ở bước đó (usability testing, session replay)."] },
            { icon: "users", cells: ["Khác biệt lớn và đáng tin giữa hai nhóm", "Ưu tiên nghiên cứu nhóm kém hơn; không vội kết luận nguyên nhân."] },
            { icon: "rotate", cells: ["Đường đi thực tế có vòng lặp (quay lại trang trước nhiều lần)", "Tìm thông tin còn thiếu ở bước hiện tại."] },
            { icon: "split", cells: ["Đã có giải pháp", "Kiểm chứng bằng A/B test, không chỉ so sánh trước – sau."] },
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["binoculars", "Cho biết “ở đâu”, không cho biết “vì sao”", "Cần nghiên cứu định tính để tìm nguyên nhân."],
            ["split", "Tương quan không phải nhân quả", "Khác biệt giữa phân đoạn có thể do đặc điểm của người dùng chứ không do thiết kế."],
            ["alert", "Phụ thuộc chất lượng tracking", "Sự kiện thiếu hoặc định nghĩa sai dẫn tới kết luận sai."],
            ["eye", "Không thấy những gì không được ghi", "Người dùng đọc, phân vân, so sánh với đối thủ ở tab khác đều không có trong dữ liệu."],
          ]}
          last={["shield-alert", "Một phần người dùng không được ghi nhận", "Do từ chối theo dõi; dữ liệu có thể lệch về một số nhóm."]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Câu hỏi phân tích.", "Tracking plan; dữ liệu sự kiện đã kiểm tra.", "Định nghĩa phễu và phân đoạn.", "Công cụ analytics."]}
          outputs={[
            "Phễu với tỷ lệ đi tiếp và rời đi từng bước.",
            "Đường đi phổ biến và điểm thoát.",
            "So sánh phân đoạn kèm khoảng tin cậy.",
            "Danh sách bước ưu tiên nghiên cứu, kèm giả thuyết.",
          ]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối luồng đặt lịch tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard
          icon="filter"
          title="Phân tích"
          body="Phễu cho thấy bước “Chọn giờ” mất hơn một nửa số người đã mở form. Phân tích đường đi cho thấy nhiều phiên ở bước này mở trang “Bảng giá” rồi không quay lại form. Người dùng mobile chuyển đổi thấp hơn rõ rệt."
        />
        <CheckCard
          icon="list"
          title="Bước tiếp theo"
          mark="•"
          items={[
            "Usability test trên mobile, tập trung vào bước chọn giờ.",
            "Phỏng vấn ngắn với khách đã bỏ dở (attitudinal methods).",
            "Giả thuyết: thiếu thông tin chi phí và lịch khó chọn trên màn hình nhỏ. Giải pháp sẽ được kiểm chứng bằng A/B test.",
          ]}
        />
        <Callout tone="note" icon="briefcase">
          Đây là kế hoạch minh họa, chưa phải kết quả phân tích thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Kết luận nguyên nhân từ dữ liệu clickstream", "Dữ liệu chỉ cho thấy hành vi, không cho thấy lý do.", "Kết hợp nghiên cứu định tính; kiểm chứng bằng thử nghiệm."],
            ["Tin dữ liệu mà không kiểm tra tracking", "Sự kiện thiếu hoặc trùng làm sai tỷ lệ.", "Đối chiếu với nguồn dữ liệu khác trước khi phân tích."],
            ["Trộn đơn vị đếm (bước này đếm phiên, bước sau đếm người)", "Tỷ lệ không có ý nghĩa.", "Thống nhất đơn vị trong toàn phễu."],
            ["“Đào” phân đoạn đến khi thấy khác biệt", "Nhiều phép so sánh dễ cho kết quả ngẫu nhiên trông như thật.", "Chốt phân đoạn trước; coi phát hiện khác là giả thuyết."],
            ["Chỉ nhìn bước có số người rời đi lớn nhất", "Bước đầu luôn có nhiều người chỉ xem qua.", "Xét cả bối cảnh ý định của người dùng ở từng bước."],
            ["So sánh trước – sau như bằng chứng", "Mùa vụ, chiến dịch, sự kiện bên ngoài làm nhiễu.", "Dùng A/B test khi cần chứng minh tác động."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Phương pháp", "Dữ liệu", "Trả lời câu hỏi", "Khi nào chọn"]}
          widths={[260]}
          rows={[
            {
              icon: "filter",
              highlight: true,
              cells: ["Clickstream Analysis", "Chuỗi sự kiện của toàn bộ người dùng.", "“Người dùng đi đâu, rời đi ở đâu?”", "Khoanh vùng vấn đề trên quy mô lớn."],
            },
            { icon: "play-circle", cells: ["Session Replay", "Bản ghi lại thao tác của từng phiên.", "“Phiên cụ thể này diễn ra thế nào?”", "Xem chi tiết hành vi ở bước có vấn đề."] },
            { icon: "eye", cells: ["Heatmap", "Tổng hợp vị trí nhấp, cuộn trên một trang.", "“Người dùng tương tác ở đâu trên trang này?”", "Đánh giá bố cục một trang."] },
            { icon: "split", cells: ["A/B Testing", "Hành vi của hai nhóm chia ngẫu nhiên.", "“Thay đổi này có gây ra cải thiện không?”", "Chứng minh tác động của giải pháp."] },
            { icon: "users", cells: ["Usability Testing", "Quan sát người dùng làm tác vụ.", "“Vì sao người dùng gặp khó?”", "Tìm nguyên nhân."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Trước khi phân tích"
            items={["Có câu hỏi phân tích rõ ràng.", "Sự kiện và phễu được định nghĩa và ghi lại.", "Dữ liệu đã được đối chiếu với nguồn khác.", "Phân đoạn được chốt trước."]}
          />
          <ChecklistColumn
            icon="analytics"
            title="Khi đọc kết quả"
            items={[
              "Đơn vị đếm thống nhất trong toàn phễu.",
              "So sánh phân đoạn có khoảng tin cậy.",
              "Không kết luận nguyên nhân từ dữ liệu quan sát.",
              "Bước có vấn đề được chuyển thành câu hỏi cho nghiên cứu định tính.",
            ]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Session Replay", "Xem lại phiên", "Xem chi tiết các phiên ở bước có vấn đề."],
            ["Heatmap", "Bản đồ nhiệt", "Phân tích tương tác trên một trang."],
            ["A/B Testing", "Kiểm thử A/B", "Kiểm chứng giải pháp cho vấn đề tìm được."],
            ["User Flow", "Luồng tương tác của người dùng", "Luồng dự kiến để so với đường đi thực tế."],
            ["Quantitative Research", "Nghiên cứu định lượng", "Nhóm phương pháp mà clickstream thuộc về."],
            ["Confidence Intervals", "Khoảng tin cậy", "Cách so sánh tỷ lệ giữa các phân đoạn."],
            ["Attitudinal Methods", "Phương pháp nghiên cứu thái độ", "Bổ sung lý do cho dữ liệu hành vi."],
          ]}
        />
      </Section>
    </div>
  );
}

export const CLICKSTREAM_ANALYSIS: Article = {
  slug: "clickstream-analysis",
  version: 1,
  term: "Clickstream Analysis",
  fn: 6,
  vi: "Phân tích luồng nhấp — chuỗi thao tác của người dùng trên sản phẩm",
  kind: "Phương pháp nghiên cứu / kiểm thử",
  definition:
    "Clickstream analysis là việc phân tích chuỗi thao tác mà người dùng để lại khi dùng sản phẩm số: trang họ xem, nút họ nhấp, thứ tự và thời điểm của từng bước.",
  definitionMore:
    "Dữ liệu được ghi tự động trên toàn bộ người dùng thật. Vì vậy phương pháp này cho thấy người dùng thực sự đi đâu và rời đi ở đâu trên quy mô lớn. Nó giúp nhóm khoanh vùng vấn đề, nhưng không tự giải thích vì sao người dùng hành động như vậy.",
  oneLine: "Phân tích chuỗi trang và thao tác người dùng để lại, để thấy họ đi đâu và rời đi ở đâu.",
  glance: [
    ["Ở đâu", "Dữ liệu trả lời"],
    ["Vì sao", "Cần nghiên cứu định tính"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Clickstream analytics", "Path analysis (khi tập trung vào thứ tự các trang)"] },
    { label: "Nhóm chính", items: ["Đo lường và phân tích"] },
    { label: "Thẻ phụ", items: ["Nghiên cứu khám phá", "Kiểm thử và đánh giá"] },
    {
      label: "Lưu ý tên gọi",
      items: ["“Clickstream” là dữ liệu; “clickstream analysis” là việc phân tích dữ liệu đó. Funnel analysis là một cách phân tích phổ biến trên dữ liệu clickstream."],
    },
  ],
  sections: SECTIONS,
  Body,
};
