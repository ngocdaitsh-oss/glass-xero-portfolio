"use client";

import { Blk, T } from "./edit";
import { CheckCards, Formula, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Tree Testing — copy from ux-glossary/tree-testing.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "metrics", title: "Các chỉ số chính", icon: "bar-chart" },
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

const ROWS: [string, number, number, number, string][] = [
  ["Chính sách hủy lịch", 72, 58.2, 82.6, "Chưa đủ chắc chắn"],
  ["Giấy tờ cần mang", 36, 24.1, 49.9, "Không đạt"],
];

/** Each scenario's success rate and 95% CI against the 70% bar the team set beforehand. */
function TargetChart() {
  return (
    <Blk label="biểu đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="bar-chart" size={36} iconSize={18} radius={10} />
        <Eyebrow>Tỷ lệ thành công so với tiêu chí 70%</Eyebrow>
      </div>
      <div className="flex flex-col gap-4">
        {ROWS.map(([label, p, lo, hi, verdict], i) => (
          <div key={label} className="flex items-center gap-5">
            <span className="w-[180px] shrink-0 text-[15px] leading-[22px] font-semibold">{label}</span>
            <div className="relative h-12 flex-1 rounded-lg bg-[var(--d-well)]">
              <span className="absolute -inset-y-1 w-0.5 bg-[var(--d-bad)]" style={{ left: "70%" }} />
              <span
                className={`absolute top-1/2 h-4 -translate-y-1/2 rounded-full ${i === 0 ? "bg-[var(--d-ci)]" : "bg-[var(--d-bad-soft)]"}`}
                style={{ left: `${lo}%`, width: `${hi - lo}%` }}
              />
              <span
                className={`absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full ${i === 0 ? "bg-[var(--d-accent)]" : "bg-[var(--d-bad)]"}`}
                style={{ left: `${p}%` }}
              />
            </div>
            <div className="flex w-[160px] shrink-0 flex-col text-right">
              <span className="font-mono text-[15px] font-semibold">{p}%</span>
              <span className={`text-[13px] ${i === 0 ? "text-[var(--w-muted)]" : "text-[var(--d-bad)]"}`}>{verdict}</span>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-5">
          <span className="w-[180px] shrink-0" />
          <div className="flex flex-1 justify-between font-mono text-[13px] text-[var(--w-muted)]">
            {[0, 25, 50, 75, 100].map((v) => (
              <span key={v}>{v}%</span>
            ))}
          </div>
          <span className="w-[160px] shrink-0" />
        </div>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Vạch đỏ là tiêu chí 70% nhóm chốt trước. Khoảng tin cậy của “chính sách hủy” chứa 70%; của “giấy tờ” nằm hoàn toàn bên dưới.
      </T>
    </Blk>
  );
}

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Section {...S.problem}>
        <P>
          Khi người dùng không tìm thấy nội dung trên website, nguyên nhân có thể là cấu trúc (nội dung nằm sai nhóm, tên danh mục khó hiểu) hoặc giao diện (menu khó thấy, chữ nhỏ). Kiểm thử
          trên giao diện thật khó tách hai nguyên nhân này.
        </P>
        <div className="flex items-start gap-4">
          <CheckCards
            groups={[
              [
                "check-circle",
                "Tree testing giúp",
                ["Tách riêng cấu trúc và tên gọi khỏi giao diện.", "Kiểm tra trước khi thiết kế giao diện, khi sửa cấu trúc còn rẻ.", "So sánh hai phương án cây bằng số liệu."],
              ],
              [
                "ban",
                "Không giải quyết",
                ["Người dùng có thấy menu trên giao diện hay không → cần usability testing.", "Tìm kiếm (search) → tree testing chỉ kiểm tra duyệt danh mục."],
              ],
            ]}
          />
        </div>
      </Section>

      <Section {...S.metrics}>
        <P>Theo NN/g, các chỉ số thường dùng:</P>
        <Table
          head={["Chỉ số", "Ý nghĩa"]}
          widths={[320]}
          rows={[
            { icon: "check-circle", cells: ["Tỷ lệ thành công (success rate)", "Bao nhiêu phần trăm người tham gia chọn đúng vị trí."] },
            { icon: "arrows", cells: ["Tỷ lệ đi thẳng (directness)", "Bao nhiêu người tìm đúng mà không phải quay lại."] },
            { icon: "alert", highlight: true, cells: ["Danh mục khác được chọn", "Người tham gia đã chọn sai vào đâu, gợi ý họ kỳ vọng nội dung nằm ở đó."] },
            { icon: "hourglass", cells: ["Thời gian", "Mất bao lâu để chọn."] },
          ]}
        />
        <P>
          Danh mục chọn sai thường hữu ích hơn bản thân tỷ lệ: nếu nhiều người cùng chọn một chỗ sai, có thể nội dung nên nằm ở chỗ đó, hoặc tên danh mục đó gây hiểu nhầm.
        </P>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "check-circle",
              "Nên dùng khi",
              [
                "Vừa dựng kiến trúc thông tin (ví dụ sau card sorting) và cần kiểm chứng.",
                "Đổi tên hoặc sắp xếp lại menu của website đã có.",
                "So sánh hai phương án cấu trúc.",
              ],
            ],
          ]}
        />
        <Table
          head={["Chưa phù hợp khi", "Thay bằng"]}
          widths={[520]}
          rows={[
            { icon: "component", cells: ["Chưa có cấu trúc, cần biết người dùng phân nhóm thế nào", "Card sorting."] },
            { icon: "eye", cells: ["Cần kiểm tra menu trên giao diện thật", "Usability testing, first-click testing."] },
            { icon: "list-search", cells: ["Người dùng chủ yếu dùng tìm kiếm", "Phân tích từ khóa tìm kiếm."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Chuẩn bị cây dạng văn bản.", "Danh mục và danh mục con.", "Cây hoàn chỉnh."],
            ["Viết task scenario cho từng nội dung cần tìm.", "Không dùng chữ có trong cây.", "Danh sách kịch bản."],
            ["Xác định đáp án đúng.", "Có thể nhiều vị trí đúng.", "Bảng đáp án."],
            ["Chốt tiêu chí trước.", "Ví dụ “đạt nếu tỷ lệ thành công từ X% trở lên”. Mức X do nhóm chọn.", "Tiêu chí đạt / không đạt."],
            ["Chạy thử có người điều phối với vài người.", "Để sửa kịch bản mơ hồ (NN/g khuyên làm bước này).", "Kịch bản đã sửa."],
            ["Chạy chính thức.", "Nếu so sánh hai cây, mỗi người chỉ làm một cây (between-subjects), để không bị ảnh hưởng bởi cây trước.", "Dữ liệu thô."],
            ["Tính chỉ số, xem danh mục chọn sai, ra quyết định.", "", "Danh sách thay đổi cấu trúc."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <Callout tone="scenario">
          Số liệu minh họa, không phải dữ liệu thật. 50 người tham gia, kịch bản “Tìm thông tin về chính sách hủy lịch”. Tiêu chí nhóm chốt trước: đạt nếu tỷ lệ thành công từ 70% trở lên (lựa
          chọn của nhóm, không phải ngưỡng chuẩn). Kết quả: 36 người chọn đúng; trong đó 28 người đi thẳng, 8 người quay lại rồi mới tìm đúng.
        </Callout>
        <Subhead icon="check-circle">Bước 1: Tỷ lệ thành công</Subhead>
        <Formula label="Tỷ lệ thành công" formula="Số người chọn đúng ÷ Tổng số người" note="36 ÷ 50 = 0,72 → 72%" />
        <Subhead icon="arrows">Bước 2: Tỷ lệ đi thẳng</Subhead>
        <Formula label="Tỷ lệ thành công đi thẳng" formula="Số người đúng mà không quay lại ÷ Tổng số người" note="28 ÷ 50 = 0,56 → 56%. Số người đúng nhưng phải quay lại: 36 − 28 = 8." />
        <Subhead icon="bar-chart">Bước 3: Kiểm tra độ tin cậy</Subhead>
        <P>72% đến từ 50 người, nên tỷ lệ thật trong toàn bộ người dùng có thể cao hoặc thấp hơn. Khoảng tin cậy cho biết phạm vi hợp lý của tỷ lệ thật. Mức 95% là quy ước phổ biến.</P>
        <Table
          head={["Nhập vào công cụ", "Kết quả"]}
          widths={[400]}
          rows={[
            { highlight: true, cells: ["36 đúng trên 50 người", "Khoảng tin cậy 95%: 58,2% – 82,6%"] },
            { cells: ["28 đi thẳng trên 50 người", "Khoảng tin cậy 95%: 42,3% – 68,8%"] },
          ]}
        />
        <Formula label="Mẹo ước lượng nhanh" formula="(Số đúng + 2) ÷ (Tổng + 4)" note="(36 + 2) ÷ (50 + 4) = 38 ÷ 54 ≈ 0,704 → khoảng 70,4%, sai số khoảng ± 12 điểm" />
        <Subhead icon="users">Bước 4: Cỡ mẫu</Subhead>
        <Table
          head={["Số người", "Sai số khoảng (tỷ lệ quanh 50%)"]}
          widths={[300]}
          rows={[
            { cells: ["10", "± 31 điểm"] },
            { cells: ["30", "± 18 điểm"] },
            { highlight: true, cells: ["50", "± 14 điểm"] },
            { cells: ["100", "± 10 điểm"] },
            { cells: ["200", "± 7 điểm"] },
          ]}
        />
        <P>
          Quy tắc nhớ nhanh: muốn sai số nhỏ một nửa thì cần gấp bốn lần số người. NN/g lưu ý: tree testing để tìm vấn đề (định tính) cần ít người; để có số liệu chắc chắn (định lượng) cần mẫu
          lớn hơn.
        </P>
        <Subhead icon="split">Bước 5: Quy tắc quyết định</Subhead>
        <Table
          head={["Kết quả", "Quyết định"]}
          widths={[460]}
          rows={[
            { icon: "check-circle", cells: ["Cả khoảng tin cậy nằm trên mức tiêu chí", "Đạt."] },
            { icon: "x", cells: ["Cả khoảng tin cậy nằm dưới mức tiêu chí", "Không đạt, cần sửa."] },
            { icon: "hourglass", cells: ["Khoảng tin cậy chứa mức tiêu chí", "Chưa đủ chắc chắn: xem danh mục chọn sai, cân nhắc thêm người."] },
          ]}
        />
        <InfoCard
          tone="fill"
          icon="hourglass"
          title="Áp dụng"
          body="72% cao hơn 70%, nhưng khoảng 58,2% – 82,6% chứa mức 70%. Chưa đủ chắc chắn là đạt. Nhóm xem danh mục chọn sai trước khi quyết định."
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["component", "Kết quả phản ánh cây dạng chữ", "Trên giao diện thật, vị trí, kích thước, biểu tượng có thể giúp hoặc cản trở."],
            ["users", "Người tham gia được giao việc", "Nên có động cơ tìm khác người dùng thật."],
            ["file", "Phụ thuộc vào cách viết kịch bản", "Kịch bản chứa chữ trong cây sẽ làm tỷ lệ cao giả."],
            ["chat", "Không cho biết vì sao người dùng chọn sai", "Trừ khi có câu hỏi thêm hoặc buổi có người điều phối."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Cây danh mục dạng văn bản.", "Task scenario và bảng đáp án.", "Tiêu chí đạt chốt trước.", "Công cụ tree testing."]}
          outputs={["Tỷ lệ thành công, tỷ lệ đi thẳng cho từng kịch bản.", "Danh mục chọn sai phổ biến.", "Danh sách thay đổi cấu trúc và tên gọi."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard icon="component" title="Bối cảnh" body="Sau card sorting, nhóm dựng cây mới cho trang dịch vụ: “Dịch vụ”, “Chuyên gia”, “Đặt lịch”, “Hỗ trợ”." />
        <TargetChart />
        <div className="flex gap-4">
          <InfoCard
            icon="alert"
            title="Danh mục chọn sai"
            className="flex-1"
            body="Chính sách hủy lịch: phần lớn người chọn sai đã vào “Đặt lịch” thay vì “Hỗ trợ”. Giấy tờ cần mang: người chọn sai rải ra “Dịch vụ” và “Đặt lịch”."
          />
          <InfoCard
            tone="fill"
            icon="check-circle"
            title="Quyết định"
            className="flex-1"
            body="Chính sách hủy: thêm liên kết từ “Đặt lịch” sang chính sách hủy, vì người dùng kỳ vọng nó ở đó. Giấy tờ: chuyển vào “Đặt lịch” dưới mục “Chuẩn bị buổi tư vấn”, rồi chạy lại tree test."
          />
        </div>
        <Callout tone="note" icon="briefcase">
          Số liệu minh họa. Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Kịch bản chứa tên danh mục", "Người tham gia chỉ cần tìm chữ.", "Dùng từ của người dùng."],
            ["Chỉ nhìn tỷ lệ thành công", "Bỏ lỡ thông tin từ danh mục chọn sai.", "Luôn xem chỗ chọn sai."],
            ["Cùng người làm hai cây", "Cây thứ hai bị ảnh hưởng bởi cây thứ nhất.", "Mỗi người làm một cây."],
            ["Kết luận từ ít người như số liệu chắc chắn", "Sai số rất lớn.", "Báo khoảng tin cậy; thêm người nếu cần."],
            ["Không chốt tiêu chí trước", "Dễ diễn giải theo mong muốn.", "Chốt trước khi chạy."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Câu hỏi chính", "Có giao diện?"]}
          widths={[260]}
          rows={[
            { icon: "list", highlight: true, cells: ["Tree Testing", "Người dùng có tìm được nội dung trong cấu trúc này không?", "Không."] },
            { icon: "component", cells: ["Card Sorting", "Người dùng phân nhóm nội dung thế nào?", "Không."] },
            { icon: "target", cells: ["First-Click Testing", "Cú nhấp đầu tiên trên giao diện có đúng hướng không?", "Có."] },
            { icon: "users", cells: ["Usability Testing", "Người dùng có hoàn thành tác vụ trên sản phẩm không?", "Có."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Trước khi chạy"
            items={["Cây dạng văn bản hoàn chỉnh.", "Kịch bản không chứa tên danh mục.", "Có bảng đáp án.", "Đã chốt tiêu chí đạt.", "Đã chạy thử có người điều phối."]}
          />
          <ChecklistColumn
            icon="analytics"
            title="Sau khi chạy"
            items={["Đã tính tỷ lệ thành công và tỷ lệ đi thẳng.", "Đã báo khoảng tin cậy.", "Đã xem danh mục chọn sai.", "Quyết định theo quy tắc đã chốt."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Card Sorting", "Phân loại thẻ", "Thường làm trước, để dựng cây."],
            ["Information Architecture", "Kiến trúc thông tin", "Đối tượng được kiểm tra."],
            ["First-Click Testing", "Kiểm thử cú nhấp đầu tiên", "Kiểm tra điều hướng trên giao diện."],
            ["Task Scenario", "Kịch bản tác vụ", "Mỗi câu hỏi là một kịch bản."],
            ["Usability Testing", "Kiểm thử khả năng sử dụng", "Kiểm tra trên giao diện thật."],
            ["Statistical Significance", "Ý nghĩa thống kê", "Khi so sánh hai cây."],
          ]}
        />
      </Section>
    </div>
  );
}

export const TREE_TESTING: Article = {
  slug: "tree-testing",
  version: 1,
  term: "Tree Testing",
  fn: 5,
  vi: "Kiểm thử cây điều hướng",
  kind: "Phương pháp kiểm thử",
  definition:
    "Tree testing là phương pháp kiểm tra xem người dùng có tìm được nội dung trong cấu trúc điều hướng hay không, bằng cách cho họ đi qua một “cây” danh mục chỉ có chữ để tìm vị trí của một thông tin cụ thể.",
  definitionMore: "Vì không có giao diện, kết quả phản ánh chất lượng của cách phân nhóm và cách đặt tên danh mục.",
  oneLine: "Kiểm tra người dùng có tìm được nội dung trong cây danh mục chỉ có chữ hay không.",
  glance: [
    ["72%", "Tỷ lệ thành công trong ví dụ"],
    ["58–83%", "Khoảng tin cậy 95%"],
  ],
  facts: [
    { label: "Nhóm chính", items: ["Kiểm thử khả năng sử dụng"] },
    { label: "Thẻ phụ", items: ["Kiến trúc và điều hướng"] },
    {
      label: "Lưu ý tên gọi",
      items: ["“Cây” (tree) là cấu trúc điều hướng dạng văn bản: danh mục, danh mục con, không có giao diện. Tree testing kiểm tra cấu trúc, không kiểm tra thiết kế hình ảnh."],
    },
  ],
  sections: SECTIONS,
  Body,
};
