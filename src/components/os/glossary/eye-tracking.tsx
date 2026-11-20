"use client";

import { Blk, T } from "./edit";
import { CheckCard, CheckCards, Formula, InfoGrid, InOutCards, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Stat, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Eye Tracking — copy from ux-glossary/eye-tracking.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "concepts", title: "Các khái niệm và chỉ số chính", icon: "component" },
  { id: "outputs", title: "Cách trình bày kết quả", icon: "analytics" },
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

const SECONDS = [1.2, 0.8, 2.5, 1.9, 0.6, 3.1, 1.4, 0.9, 2.2];

/** Time to first fixation on the button, one bar per person; the three who never looked have no bar to draw. */
function FirstFixation() {
  const max = 3.5;
  const mean = 1.6;
  return (
    <Blk label="biểu đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="eye" size={36} iconSize={18} radius={10} />
        <Eyebrow>Thời gian đến lần nhìn đầu tiên vào nút</Eyebrow>
      </div>
      <div className="relative flex flex-col gap-2">
        {[...SECONDS, null, null, null].map((s, i) => (
          <div key={i} className="flex items-center gap-5">
            <span className="w-[90px] shrink-0 text-[16px] leading-6 font-semibold">Người {i + 1}</span>
            <div className="relative h-7 flex-1 rounded-lg bg-[var(--d-well)]">
              {s === null ? null : <span className="absolute inset-y-0 left-0 rounded-lg bg-[var(--d-ci)]" style={{ width: `${(s / max) * 100}%` }} />}
              <span className="absolute inset-y-[-4px] w-[2px] bg-[var(--d-accent)]" style={{ left: `${(mean / max) * 100}%` }} />
            </div>
            <span className={`w-[120px] shrink-0 text-right font-mono text-[15px] leading-6 ${s === null ? "text-[var(--d-bad)]" : ""}`}>
              {s === null ? "không nhìn" : `${String(s).replace(".", ",")} giây`}
            </span>
          </div>
        ))}
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Vạch dọc là trung bình 1,6 giây, chỉ tính 9 người đã nhìn. 3 người không nhìn thì không có thời gian để cộng; họ được báo cáo riêng trong tỷ lệ người nhìn.
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
            Usability test cho biết người dùng có tìm thấy nút hay thông tin không. Nhưng khi họ không tìm thấy, nhóm không biết: họ không nhìn thấy, hay nhìn thấy mà không hiểu? Hỏi
            lại người dùng cũng không đáng tin, vì ít ai nhớ chính xác mình đã nhìn vào đâu.
          </P>
          <P strong>Eye tracking ghi lại trực tiếp đường nhìn, nên phân biệt được hai trường hợp đó.</P>
        </div>
        <Callout tone="note" title="Mẫu hình chữ F">
          Một phát hiện nổi tiếng từ eye tracking (NN/g, nghiên cứu năm 2006, được nghiên cứu lại năm 2017): người dùng quét ngang phần trên, quét ngang một đoạn ngắn hơn bên dưới,
          rồi quét dọc xuống mép trái. Dòng đầu và chữ đầu mỗi dòng nhận nhiều lần nhìn hơn.
        </Callout>
        <Eyebrow>Eye tracking hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          cols={3}
          minH={170}
          items={[
            ["list", "Thứ bậc thị giác có hiệu quả không", "Người dùng nhìn vào điều quan trọng trước chưa."],
            ["eye", "Vì sao một yếu tố bị bỏ qua", "Không được nhìn thấy, hay thấy mà không hiểu."],
            ["target", "Nội dung nên đặt ở đâu", "Để được quét tới."],
          ]}
        />
      </Section>

      <Section {...S.concepts}>
        <Table
          head={["Khái niệm", "Ý nghĩa", "Ví dụ minh họa (giả định)"]}
          widths={[280]}
          rows={[
            { icon: "eye", cells: ["Fixation (điểm dừng mắt)", "Mắt dừng lại tương đối yên ở một chỗ; đây là lúc người xem tiếp nhận thông tin.", "Mắt dừng ở dòng giá trên trang dịch vụ."] },
            { icon: "arrows", cells: ["Saccade (bước nhảy mắt)", "Chuyển động nhanh giữa hai điểm dừng; gần như không tiếp nhận thông tin trong lúc này.", "Mắt nhảy từ tiêu đề xuống nút “Đặt lịch”."] },
            { icon: "target", cells: ["AOI (vùng quan tâm)", "Vùng trên giao diện mà nhóm muốn phân tích.", "Nút “Đặt lịch tư vấn”."] },
            { icon: "hourglass", cells: ["Time to first fixation", "Thời gian từ lúc trang hiện đến lần đầu nhìn vào AOI.", "1,6 giây để nhìn thấy nút."] },
            { icon: "gauge", cells: ["Dwell time", "Tổng thời gian nhìn vào AOI.", "Nhìn bảng giá tổng cộng 4 giây."] },
            { icon: "users", cells: ["Tỷ lệ người nhìn vào AOI", "Bao nhiêu người đã nhìn vào vùng ít nhất một lần.", "9 trên 12 người."] },
          ]}
        />
      </Section>

      <Section {...S.outputs}>
        <Table
          head={["Hình thức", "Cho thấy", "Số người tham gia"]}
          widths={[200]}
          rows={[
            {
              icon: "split",
              cells: ["Gaze plot", "Đường nhìn của một người: các điểm dừng đánh số theo thứ tự.", "Theo NN/g, khoảng 8–12 người là đủ cho nghiên cứu định tính dựa trên gaze plot."],
            },
            {
              icon: "analytics",
              highlight: true,
              cells: [
                "Heatmap",
                "Vùng được nhìn nhiều (màu nóng) và ít (màu lạnh), gộp nhiều người.",
                "NN/g khuyến nghị khoảng 39 người làm cùng một tác vụ trên cùng một trang để heatmap đủ ổn định.",
              ],
            },
            { icon: "play-circle", cells: ["Gaze replay", "Video đường nhìn trong lúc làm tác vụ.", "Dùng để xem lại từng phiên."] },
          ]}
        />
        <div className="flex gap-4">
          <Stat value="8–12" label="Người cho gaze plot" note="Nghiên cứu định tính (NN/g)" />
          <Stat fill value="≈ 39" label="Người cho heatmap" note="Cùng tác vụ, cùng trang (NN/g)" />
        </div>
        <P>Heatmap cần nhiều người vì nó gộp hành vi; với ít người, một hai người nhìn lạ có thể làm thay đổi cả bản đồ.</P>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "target",
              "Bối cảnh phù hợp",
              ["Cần hiểu vì sao người dùng bỏ qua một yếu tố quan trọng.", "So sánh thứ bậc thị giác giữa các phương án.", "Nghiên cứu cách người dùng đọc và quét nội dung."],
            ],
            ["eye", "Dấu hiệu nhận biết", ["Usability test cho thấy người dùng không tìm thấy nút, nhưng không rõ họ có nhìn thấy không."]],
            [
              "clipboard-check",
              "Điều kiện cần",
              [
                "Thiết bị eye tracking và người biết vận hành, hiệu chỉnh.",
                "Tác vụ thực tế: NN/g nhấn mạnh tác vụ ảnh hưởng mạnh đến đường nhìn, tác vụ không thực tế cho kết quả sai lệch.",
                "Đủ người tham gia cho hình thức kết quả cần dùng.",
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
            { icon: "play-circle", cells: ["Câu hỏi về độ dễ dùng chung", "Usability test thường đã trả lời được, ít tốn kém hơn.", "Usability testing."] },
            { icon: "hourglass", cells: ["Ngân sách và thời gian hạn chế", "Thiết bị, hiệu chỉnh và phân tích tốn kém.", "First-click testing, five-second test."] },
            { icon: "chat", cells: ["Cần hiểu người dùng nghĩ gì", "Eye tracking không cho biết suy nghĩ.", "Think-aloud, phỏng vấn sau phiên."] },
            { icon: "analytics", cells: ["Muốn heatmap nhưng chỉ có vài người", "Bản đồ không ổn định, dễ gây hiểu sai.", "Gaze plot từng người, phân tích định tính."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định câu hỏi và AOI.", "", "Câu hỏi nghiên cứu, danh sách vùng quan tâm."],
            ["Thiết kế tác vụ thực tế.", "Tác vụ giống với mục tiêu thật của người dùng.", "Kịch bản tác vụ."],
            ["Chọn hình thức kết quả và số người.", "Gaze plot cho định tính, heatmap cho gộp nhiều người.", "Kế hoạch tuyển người."],
            ["Hiệu chỉnh thiết bị cho từng người.", "", "Dữ liệu ghi được chính xác."],
            ["Chạy phiên.", "Có thể kết hợp phỏng vấn sau phiên, xem lại gaze replay cùng người tham gia.", "Dữ liệu đường nhìn, ghi chép."],
            ["Phân tích.", "Tính chỉ số theo AOI, xem gaze plot, heatmap.", "Chỉ số, nhận định, đề xuất thiết kế."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <Callout tone="scenario">
          Số liệu minh họa, không phải dữ liệu thật. 12 người làm tác vụ “Tìm cách đặt lịch tư vấn” trên trang dịch vụ. AOI là nút “Đặt lịch tư vấn”.
        </Callout>
        <Subhead icon="users">Bước 1: Tỷ lệ người nhìn vào vùng</Subhead>
        <Formula label="Tỷ lệ người nhìn vào AOI" formula="Số người đã nhìn vào AOI ÷ Tổng số người" note="Tỷ lệ = 9 ÷ 12 = 75%." />

        <Subhead icon="hourglass">Bước 2: Thời gian trung bình đến lần nhìn đầu tiên</Subhead>
        <Formula
          label="Thời gian trung bình"
          formula="Tổng thời gian đến lần nhìn đầu ÷ Số người đã nhìn"
          note="Chỉ tính những người đã nhìn: 3 người không nhìn thì không có thời gian để cộng."
        />
        <FirstFixation />
        <P>
          Tổng = 14,6 giây → Thời gian trung bình = 14,6 ÷ 9 ≈ <b>1,6 giây</b>.
        </P>

        <Subhead icon="bar-chart">Bước 3: Kết quả chắc chắn đến đâu</Subhead>
        <P>Với 12 người, 75% chỉ là ước lượng. Nhập vào công cụ tính khoảng tin cậy cho tỷ lệ.</P>
        <Table
          head={["Nhập vào công cụ", "Kết quả"]}
          widths={[520]}
          rows={[{ highlight: true, cells: ["9 thành công trên 12 người, mức tin cậy 95%", "Khoảng tin cậy ≈ 46% – 92%"] }]}
        />
        <Callout tone="note" title="Diễn giải">
          Tỷ lệ thật có thể chỉ khoảng một nửa, cũng có thể gần như tất cả. Mức 95% là quy ước phổ biến; nhóm tự chọn theo mức rủi ro.
        </Callout>

        <Subhead icon="split">Bước 4: Quyết định</Subhead>
        <CheckCard
          icon="check-circle"
          title="Đọc kết quả"
          items={[
            "Ba người không hề nhìn vào nút → vấn đề nhìn thấy, không phải vấn đề hiểu. Xem gaze plot của ba người này để biết họ nhìn vào đâu thay vì nút.",
            "Khoảng tin cậy rộng → dùng kết quả để tìm vấn đề và cải tiến, không để báo cáo con số chính xác.",
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["eye", "Nhìn không đồng nghĩa với thấy hay hiểu", "Người dùng có thể nhìn thẳng vào nút mà không nhận ra đó là nút."],
            ["binoculars", "Không nhìn không đồng nghĩa với không biết", "Thị giác ngoại vi vẫn tiếp nhận một phần thông tin."],
            ["target", "Tác vụ quyết định đường nhìn", "Cùng một trang, tác vụ khác cho heatmap khác."],
            ["analytics", "Heatmap với ít người dễ gây hiểu sai", "Một hai người nhìn lạ có thể làm thay đổi cả bản đồ."],
          ]}
          last={["flask", "Môi trường phòng lab", "Có thể khác hành vi thật."]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Câu hỏi nghiên cứu và danh sách AOI.", "Thiết bị eye tracking, phần mềm phân tích.", "Tác vụ thực tế.", "Người tham gia đủ cho hình thức kết quả."]}
          outputs={["Gaze plot, heatmap, gaze replay.", "Chỉ số theo AOI.", "Nhận định về thứ bậc thị giác và đề xuất thiết kế."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard
          icon="play-circle"
          title="Bối cảnh"
          body="Usability test cho thấy một số người không tìm được nút “Đặt lịch tư vấn” trên trang dịch vụ. Nhóm cần biết họ có nhìn thấy nút không."
        />
        <InfoCard
          icon="analytics"
          title="Kết quả (theo phần tính toán ở trên)"
          body="9/12 người nhìn vào nút, trung bình sau 1,6 giây. Gaze plot của ba người còn lại cho thấy họ dừng mắt lâu ở banner ảnh lớn phía trên, rồi cuộn xuống bảng giá."
        />
        <InfoCard
          icon="check-circle"
          tone="fill"
          title="Quyết định"
          body="Nút đang bị banner lấn át. Đặt nút gần bảng giá (nơi người dùng đã nhìn tới) và giảm chiều cao banner. Kiểm tra lại bằng một vòng usability test."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Dựng heatmap từ vài người", "Bản đồ không ổn định.", "Đủ người cho heatmap, hoặc dùng gaze plot."],
            ["Tác vụ không thực tế (“hãy xem trang này”)", "Đường nhìn khác hẳn khi có mục tiêu thật.", "Tác vụ giống mục tiêu thật."],
            ["Kết luận “nhìn vào = hiểu”", "Nhìn không đồng nghĩa với hiểu.", "Kết hợp phỏng vấn, think-aloud."],
            ["Tính thời gian trung bình gồm cả người không nhìn", "Không có thời gian để tính cho họ.", "Chỉ chia cho số người đã nhìn; báo cáo riêng tỷ lệ người nhìn."],
            ["Bỏ qua hiệu chỉnh thiết bị", "Dữ liệu lệch vị trí.", "Hiệu chỉnh cho từng người."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Phương pháp", "Đo gì", "Khi nào chọn"]}
          widths={[320]}
          rows={[
            { icon: "eye", highlight: true, cells: ["Eye Tracking", "Mắt nhìn vào đâu, thứ tự, thời gian.", "Cần biết người dùng có nhìn thấy không."] },
            { icon: "play-circle", cells: ["Usability Testing", "Người dùng có hoàn thành tác vụ không.", "Đánh giá độ dễ dùng chung."] },
            { icon: "target", cells: ["First-Click Testing", "Người dùng click đầu tiên vào đâu.", "Kiểm tra nhanh điều hướng, ít tốn kém."] },
            { icon: "analytics", cells: ["Heatmap click/cuộn (analytics)", "Vị trí click, độ sâu cuộn trên sản phẩm thật.", "Dữ liệu lớn, không cần thiết bị."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Chuẩn bị"
            items={[
              "Câu hỏi nghiên cứu cần biết người dùng nhìn vào đâu.",
              "AOI được xác định trước.",
              "Tác vụ thực tế.",
              "Số người phù hợp với hình thức kết quả (gaze plot hay heatmap).",
            ]}
          />
          <ChecklistColumn
            icon="analytics"
            title="Thu thập và phân tích"
            items={[
              "Thiết bị được hiệu chỉnh cho từng người.",
              "Thời gian trung bình chỉ chia cho người đã nhìn.",
              "Có khoảng tin cậy cho các tỷ lệ.",
              "Kết hợp dữ liệu định tính để hiểu vì sao.",
            ]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Usability Testing", "Kiểm thử khả năng sử dụng", "Eye tracking thường chạy kèm usability test."],
            ["First-Click Testing", "Kiểm thử cú nhấp đầu tiên", "Cách rẻ hơn để kiểm tra người dùng tìm đến đâu trước."],
            ["Heatmap", "Bản đồ nhiệt", "Cách trình bày gộp dữ liệu nhìn của nhiều người."],
            ["Cognitive Load", "Tải nhận thức", "Đường nhìn rối có thể là dấu hiệu tải nhận thức cao."],
            ["Visual Hierarchy", "Phân cấp thị giác", "Điều eye tracking giúp kiểm tra."],
            ["Confidence Intervals", "Khoảng tin cậy", "Cách diễn giải các tỷ lệ với ít người."],
            ["Design Comparison", "So sánh thiết kế", "So sánh đường nhìn giữa các phương án."],
          ]}
        />
      </Section>
    </div>
  );
}

export const EYE_TRACKING: Article = {
  slug: "eye-tracking",
  version: 1,
  term: "Eye Tracking",
  fn: 5,
  vi: "Theo dõi chuyển động mắt",
  kind: "Phương pháp nghiên cứu / kiểm thử",
  definition:
    "Eye tracking là phương pháp dùng thiết bị chuyên dụng để ghi lại vị trí và thời gian mắt người dùng nhìn vào màn hình hoặc vật thể, từ đó cho thấy họ nhìn vào đâu, theo thứ tự nào và bỏ qua những gì.",
  definitionMore: "Kết quả thường được trình bày dưới dạng heatmap (bản đồ nhiệt) và gaze plot (đường nhìn).",
  oneLine: "Ghi lại mắt người dùng nhìn vào đâu, theo thứ tự nào và bỏ qua gì trên giao diện.",
  glance: [
    ["8–12", "Người cho gaze plot"],
    ["≈ 39", "Người cho heatmap ổn định"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Eyetracking"] },
    { label: "Nhóm chính", items: ["Kiểm thử và đánh giá"] },
    { label: "Thẻ phụ", items: ["Đo lường và phân tích"] },
    { label: "Lưu ý tên gọi", items: ["Eye tracking ghi lại mắt nhìn vào đâu, không phải người dùng hiểu hay chú ý đến điều gì. Nhìn vào không đồng nghĩa với đọc hay nhớ."] },
  ],
  sections: SECTIONS,
  Body,
};
