"use client";

import { Blk, T } from "./edit";
import { CheckCards, Formula, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Multivariate Testing — copy from ux-glossary/multivariate-testing.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "parts", title: "Thành phần của một multivariate test", icon: "component" },
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

const IMAGES = ["Ảnh văn phòng", "Ảnh chuyên gia", "Ảnh gia đình"];
/** Rates the md gives; null where it leaves the combination out. */
const GRID: [string, (string | null)[]][] = [
  ["Tiêu đề cũ", ["4,0% · gốc", null, null]],
  ["Tiêu đề mới", ["4,3%", null, "4,8%"]],
];

/** 2 headlines × 3 images = 6 combinations, each shown to 10.000 people. */
function ComboGrid() {
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="component" size={36} iconSize={18} radius={10} />
        <Eyebrow>2 tiêu đề × 3 ảnh = 6 tổ hợp</Eyebrow>
      </div>
      <div className="grid grid-cols-[140px_repeat(3,1fr)] gap-2">
        <span />
        {IMAGES.map((img) => (
          <span key={img} className="px-2 pb-1 text-center text-[15px] leading-[22px] font-semibold">
            {img}
          </span>
        ))}
        {GRID.map(([head, cells]) => (
          <div key={head} className="contents">
            <span className="flex items-center text-[15px] leading-[22px] font-semibold">{head}</span>
            {cells.map((c, i) => {
              const win = c === "4,8%";
              return (
                <div
                  key={i}
                  className={`flex h-[84px] flex-col items-center justify-center gap-1 rounded-2xl ${win ? "bg-[var(--d-ci)] text-white" : c ? "bg-[var(--d-ci-weak)]" : "bg-[var(--d-well)]"}`}
                >
                  <span className={`font-mono text-[18px] font-semibold ${c ? "" : "text-[var(--w-muted)]"}`}>{c ?? "…"}</span>
                  <span className={`text-[13px] ${win ? "text-white/85" : "text-[var(--w-muted)]"}`}>10.000 người</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Tiêu đề mới một mình chưa đủ (4,3%, chưa đủ bằng chứng); tác động rõ khi đi cùng ảnh gia đình (4,8%, p ≈ 0,006 dưới ngưỡng 0,01).
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
            A/B test so sánh hai phiên bản trang. Nếu phiên bản B thắng nhưng B khác A ở cả tiêu đề, hình ảnh và nút, nhóm không biết thay đổi nào đã tạo ra khác biệt. Có thể chỉ tiêu đề
            có tác dụng, còn hình ảnh mới thậm chí làm kết quả kém đi.
          </P>
          <P strong>Multivariate test tách được đóng góp của từng thành phần và cho biết các thành phần có ảnh hưởng lẫn nhau không.</P>
          <P>NN/g nhận xét multivariate test phù hợp với cải tiến từng phần, còn A/B test phù hợp hơn khi so sánh thiết kế khác hẳn nhau.</P>
        </div>
        <Eyebrow>Multivariate testing hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          cols={3}
          minH={150}
          items={[
            ["target", "Thành phần nào đáng thay đổi", "Tách đóng góp của từng thành phần."],
            ["check-circle", "Tổ hợp nào tốt nhất", "So từng tổ hợp với tổ hợp gốc."],
            ["ban", "Thành phần nào không ảnh hưởng", "Có thể giữ nguyên."],
          ]}
        />
      </Section>

      <Section {...S.parts}>
        <Table
          head={["Thành phần", "Mô tả", "Ví dụ minh họa (giả định)"]}
          widths={[260]}
          rows={[
            { icon: "component", cells: ["Biến (thành phần thay đổi)", "Phần của trang được thử.", "Tiêu đề; hình ảnh chính."] },
            { icon: "list", cells: ["Phiên bản của mỗi biến", "Các cách thể hiện.", "Tiêu đề: cũ, mới. Hình ảnh: ảnh văn phòng, ảnh chuyên gia, ảnh gia đình."] },
            { icon: "sigma", highlight: true, cells: ["Tổ hợp", "Mỗi cách kết hợp một phiên bản của mỗi biến.", "2 tiêu đề × 3 ảnh = 6 tổ hợp."] },
            { icon: "target", cells: ["Chỉ số chính", "Mục tiêu cần cải thiện.", "Tỷ lệ bấm “Đặt lịch tư vấn”."] },
            { icon: "split", cells: ["Chia ngẫu nhiên", "Mỗi người thấy một tổ hợp.", "Lưu lượng chia đều cho 6 tổ hợp."] },
          ]}
        />
        <Callout tone="note" title="Thử đủ hay thử một phần">
          Thử tất cả tổ hợp gọi là thiết kế đầy đủ (full factorial). Khi có quá nhiều tổ hợp, có thể chỉ thử một phần tổ hợp được chọn có hệ thống (partial / fractional factorial), đổi lại
          khó biết các thành phần ảnh hưởng lẫn nhau thế nào.
        </Callout>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            ["target", "Bối cảnh phù hợp", ["Trang có lưu lượng truy cập lớn.", "Muốn cải tiến từng phần trên một thiết kế đã ổn.", "Cần biết thành phần nào tạo khác biệt."]],
            ["eye", "Dấu hiệu nhận biết", ["A/B test trước đã thắng nhưng không rõ vì sao.", "Nhóm tranh luận giữa nhiều thay đổi nhỏ cùng lúc."]],
            [
              "clipboard-check",
              "Điều kiện cần",
              ["Đủ lưu lượng cho mọi tổ hợp (xem phần Công thức).", "Công cụ thử nghiệm hỗ trợ chia nhiều tổ hợp.", "Chỉ số chính và quy tắc quyết định chốt trước."],
            ],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[360]}
          rows={[
            { icon: "users", cells: ["Lưu lượng truy cập thấp", "Mỗi tổ hợp nhận quá ít người; NN/g lưu ý đây là hạn chế chính.", "A/B test với ít phương án."] },
            { icon: "split", cells: ["So sánh thiết kế khác hẳn nhau", "Không có thành phần chung để tách.", "A/B testing."] },
            { icon: "chat", cells: ["Cần biết vì sao", "Chỉ cho biết tổ hợp nào thắng.", "Usability test, phỏng vấn."] },
            { icon: "pencil", cells: ["Giai đoạn sớm, chưa có sản phẩm thật", "Cần người dùng thật trên sản phẩm.", "Design comparison, first-click testing."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Chọn chỉ số chính và các biến.", "Ít biến, ít phiên bản.", "Danh sách biến và phiên bản."],
            ["Tính số tổ hợp và lưu lượng cần.", "", "Kế hoạch thời gian chạy."],
            ["Chốt quy tắc quyết định trước.", "", "Tiêu chí thắng, mức tin cậy, cách xử lý nhiều phép so sánh."],
            ["Chạy thử nghiệm.", "Không dừng sớm khi thấy kết quả đẹp.", "Dữ liệu theo tổ hợp."],
            ["Phân tích.", "So từng tổ hợp với tổ hợp gốc; xem đóng góp của từng biến.", "Tổ hợp thắng, nhận định."],
            ["Áp dụng và theo dõi.", "", "Thay đổi đã triển khai."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <Callout tone="scenario">
          Số liệu minh họa, không phải dữ liệu thật. Trang dịch vụ tư vấn, 60.000 người truy cập trong thời gian thử nghiệm. Hai biến: tiêu đề (2 phiên bản) và hình ảnh chính (3 phiên bản).
        </Callout>
        <Subhead icon="sigma">Bước 1: Số tổ hợp</Subhead>
        <Formula label="Số tổ hợp" formula="Số phiên bản biến 1 × Số phiên bản biến 2" note="2 × 3 = 6. Thêm một biến thứ ba có 2 phiên bản: 2 × 3 × 2 = 12 tổ hợp. Số tổ hợp tăng rất nhanh." />
        <Subhead icon="users">Bước 2: Lưu lượng cho mỗi tổ hợp</Subhead>
        <Formula
          label="Số người mỗi tổ hợp"
          formula="Tổng lưu lượng ÷ Số tổ hợp"
          note="60.000 ÷ 6 = 10.000. So với A/B test hai phương án trên cùng lưu lượng: 60.000 ÷ 2 = 30.000 người mỗi phương án."
        />
        <Subhead icon="bar-chart">Bước 3: Tỷ lệ chuyển đổi mỗi tổ hợp</Subhead>
        <Formula label="Tỷ lệ chuyển đổi" formula="Số người bấm “Đặt lịch” ÷ Số người thấy tổ hợp đó" />
        <Table
          head={["Tổ hợp", "Bấm “Đặt lịch”", "Tỷ lệ"]}
          widths={[380]}
          rows={[
            { cells: ["Tiêu đề cũ + ảnh văn phòng (gốc)", "400", "400 ÷ 10.000 = 4,0%"] },
            { highlight: true, cells: ["Tiêu đề mới + ảnh gia đình", "480", "480 ÷ 10.000 = 4,8%"] },
            { cells: ["Tiêu đề mới + ảnh văn phòng", "430", "430 ÷ 10.000 = 4,3%"] },
            { cells: ["(ba tổ hợp còn lại)", "…", "…"] },
          ]}
        />
        <ComboGrid />
        <Subhead icon="split">Bước 4: So với tổ hợp gốc</Subhead>
        <Formula label="Chênh lệch" formula="Tỷ lệ tổ hợp − Tỷ lệ gốc" note="Nhập từng cặp vào công cụ so sánh hai tỷ lệ (giống A/B test)." />
        <Table
          head={["Nhập vào công cụ", "Chênh lệch", "Khoảng tin cậy 95%", "p-value"]}
          widths={[360]}
          rows={[
            { highlight: true, cells: ["Gốc 400/10.000 và Tiêu đề mới + ảnh gia đình 480/10.000", "+0,8 điểm", "≈ +0,2 đến +1,4 điểm", "≈ 0,006"] },
            { cells: ["Gốc 400/10.000 và Tiêu đề mới + ảnh văn phòng 430/10.000", "+0,3 điểm", "≈ −0,3 đến +0,9 điểm", "≈ 0,29"] },
          ]}
        />
        <Subhead icon="alert">Bước 5: Cẩn thận khi so sánh nhiều lần</Subhead>
        <P>
          Có 5 tổ hợp được so với gốc. So càng nhiều lần, khả năng gặp một “chiến thắng” do ngẫu nhiên càng tăng. Một cách đơn giản là chia ngưỡng thông thường cho số phép so sánh:
        </P>
        <Formula
          label="Ngưỡng chặt hơn"
          formula="Ngưỡng thông thường ÷ Số phép so sánh"
          note="0,05 ÷ 5 = 0,01. Cách này gọi là hiệu chỉnh Bonferroni; 0,05 là quy ước phổ biến, nhóm tự chọn theo rủi ro."
        />
        <Subhead icon="check-circle">Bước 6: Quyết định</Subhead>
        <InfoGrid
          cols={3}
          items={[
            ["check-circle", "Tiêu đề mới + ảnh gia đình", "p ≈ 0,006, nhỏ hơn ngưỡng chặt 0,01 → khác biệt có khả năng là thật, tăng khoảng 0,8 điểm phần trăm."],
            ["hourglass", "Tiêu đề mới + ảnh văn phòng", "Khoảng tin cậy chứa 0 → chưa đủ bằng chứng."],
            ["lightbulb", "Nhận định", "Tiêu đề mới một mình chưa đủ; tác động rõ khi đi cùng ảnh gia đình. Áp dụng tổ hợp tiêu đề mới + ảnh gia đình."],
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["users", "Cần lưu lượng lớn", "Ít người mỗi tổ hợp thì khoảng tin cậy rộng."],
            ["alert", "So sánh nhiều lần làm tăng khả năng kết luận sai", "Nếu không hiệu chỉnh."],
            ["chat", "Chỉ cho biết tổ hợp nào tốt hơn", "Không cho biết vì sao."],
            ["calendar", "Kết quả đúng trong bối cảnh đã thử", "Cùng trang, cùng thời gian, cùng nhóm người dùng."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Chỉ số chính, các biến và phiên bản.", "Ước tính lưu lượng và thời gian chạy.", "Quy tắc quyết định, cách hiệu chỉnh nhiều phép so sánh."]}
          outputs={["Tỷ lệ theo từng tổ hợp, khoảng tin cậy.", "Tổ hợp thắng và nhận định về từng biến.", "Quyết định triển khai."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard
          icon="component"
          title="Bối cảnh"
          body="Trang dịch vụ đã được cải thiện qua nhiều vòng nghiên cứu. Nhóm muốn tinh chỉnh tiêu đề và hình ảnh chính, nhưng không biết thay đổi nào có tác dụng."
        />
        <InfoCard
          icon="analytics"
          title="Cách áp dụng và kết quả"
          body="Như phần Công thức và ví dụ tính. Tổ hợp tiêu đề mới (“Kế hoạch tài chính cho cả gia đình bạn”) + ảnh gia đình tăng tỷ lệ bấm đặt lịch từ 4,0% lên 4,8%, vượt ngưỡng đã hiệu chỉnh."
        />
        <InfoCard
          tone="fill"
          icon="link"
          title="Kết nối với nghiên cứu định tính"
          body="Kết quả khớp với nhận định từ ethnographic research và JTBD: khách ra quyết định cùng gia đình. Nhóm phỏng vấn ngắn vài khách để hiểu ảnh gia đình tác động thế nào."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Quá nhiều biến và phiên bản", "Số tổ hợp tăng rất nhanh, mỗi tổ hợp quá ít người.", "Ít biến, ít phiên bản; tính lưu lượng trước."],
            ["Không hiệu chỉnh khi so sánh nhiều lần", "Dễ có “chiến thắng” do ngẫu nhiên.", "Dùng ngưỡng chặt hơn."],
            ["Dừng sớm khi thấy kết quả đẹp", "Kết quả chưa ổn định.", "Chạy đủ thời gian đã định."],
            ["Dùng cho thiết kế khác hẳn nhau", "Không có thành phần chung để tách.", "Dùng A/B test."],
            ["Nhầm với A/B/n", "A/B/n so sánh nhiều phương án trọn vẹn, không tách thành phần.", "Gọi đúng tên, chọn đúng phương pháp."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Phương pháp", "Cách làm", "Khi nào chọn"]}
          widths={[260]}
          rows={[
            { icon: "component", highlight: true, cells: ["Multivariate Testing", "Nhiều biến, mọi tổ hợp.", "Cải tiến từng phần, lưu lượng lớn."] },
            { icon: "split", cells: ["A/B Testing", "Hai (hoặc vài) phương án trọn vẹn.", "Thay đổi lớn, lưu lượng vừa phải."] },
            { icon: "list", cells: ["A/B/n Testing", "Nhiều phương án trọn vẹn.", "So sánh vài thiết kế khác nhau."] },
            { icon: "eye", cells: ["Design Comparison", "Hỏi ý kiến người tham gia về các phương án.", "Giai đoạn sớm, chưa có sản phẩm thật."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Trước khi chạy"
            items={["Ít biến, ít phiên bản.", "Đã tính số tổ hợp và lưu lượng mỗi tổ hợp.", "Chỉ số chính và quy tắc quyết định chốt trước.", "Có cách hiệu chỉnh khi so sánh nhiều lần."]}
          />
          <ChecklistColumn
            icon="analytics"
            title="Khi phân tích"
            items={["So từng tổ hợp với gốc, kèm khoảng tin cậy.", "Áp dụng ngưỡng đã hiệu chỉnh.", "Không dừng sớm.", "Kết hợp nghiên cứu định tính để hiểu vì sao."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["A/B Testing", "Kiểm thử A/B", "Phương pháp gần, dùng chung cách so sánh hai tỷ lệ."],
            ["Statistical Significance", "Ý nghĩa thống kê", "Cách đọc p-value và ngưỡng."],
            ["Confidence Intervals", "Khoảng tin cậy", "Cách đọc chênh lệch."],
            ["Design Comparison", "So sánh thiết kế", "Cách so sánh phương án ở giai đoạn sớm."],
            ["Heatmap", "Bản đồ nhiệt", "Gợi ý thành phần nên thử."],
            ["Lean UX", "UX tinh gọn", "Thử nghiệm để kiểm chứng giả thuyết."],
          ]}
        />
      </Section>
    </div>
  );
}

export const MULTIVARIATE_TESTING: Article = {
  slug: "multivariate-testing",
  version: 1,
  term: "Multivariate Testing",
  fn: 5,
  vi: "Kiểm thử đa biến",
  kind: "Phương pháp nghiên cứu / kiểm thử",
  definition:
    "Multivariate testing là phương pháp thử nghiệm trên sản phẩm thật, trong đó nhiều thành phần của một trang (ví dụ tiêu đề, hình ảnh, nút) được thay đổi cùng lúc, mỗi thành phần có vài phiên bản, và người dùng được chia ngẫu nhiên vào các tổ hợp để tìm tổ hợp đạt mục tiêu tốt nhất.",
  definitionMore: "Khác với A/B test (cho biết phương án nào thắng), multivariate test giúp biết thành phần nào góp phần vào kết quả.",
  oneLine: "Thử cùng lúc nhiều thành phần và tổ hợp của chúng để biết thành phần nào tạo khác biệt.",
  glance: [
    ["6", "Tổ hợp trong ví dụ"],
    ["+0,8", "Điểm phần trăm của tổ hợp thắng"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["MVT", "Multivariate test"] },
    { label: "Nhóm chính", items: ["Kiểm thử và đánh giá"] },
    { label: "Thẻ phụ", items: ["Đo lường và phân tích"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "Không phải A/B test có nhiều phương án (A/B/n). Multivariate test thay đổi nhiều thành phần cùng lúc, mỗi thành phần có vài phiên bản, và thử mọi tổ hợp để biết thành phần nào, kết hợp nào tạo khác biệt.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
