"use client";

import { Blk, T } from "./edit";
import { InOutCards, PairCards, RelatedCards, Steps } from "./blocks";
import type { Article } from "./types";
import { Arrow, Callout, ChecklistColumn, Checks, Eyebrow, InfoCard, Node, P, Section, Subhead, Table, Tile, sectionProps, type IconName, type SectionDef } from "./ui";

/*
 * Accessibility — copy from ux-glossary/accessibility.md, on the Glossary Detail layout (Figma 2011:28710).
 * Same rules as A/B Testing: editorial notes applied, "Nguồn tham khảo" and the empty case-study block left out.
 */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "pour", title: "Cơ chế: bốn nguyên tắc nền tảng", icon: "component" },
  { id: "ui", title: "Biểu hiện trên giao diện: ví dụ tốt và chưa tốt", icon: "eye" },
  { id: "when", title: "Khi nào cần nghĩ đến accessibility", icon: "check-circle" },
  { id: "limits", title: "Giới hạn: khi nào “đạt chuẩn” chưa đủ", icon: "shield-alert" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "evaluate", title: "Cách đánh giá accessibility", icon: "clipboard-check" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Problem />
      <Pour />
      <InUi />
      <When />
      <Limits />
      <Apply />
      <Evaluate />
      <InOut />
      <Example />
      <Mistakes />
      <Compare />
      <Checklist />
      <Related />
    </div>
  );
}

function Problem() {
  const decisions: [IconName, string, string][] = [
    ["check-circle", "Thế nào là “xong” cho một thành phần giao diện", "Không chỉ đúng hình, mà còn dùng được bằng bàn phím, trình đọc màn hình và khi phóng to."],
    ["eye", "Chọn màu, cỡ chữ, khoảng cách", "Dựa trên tiêu chí kiểm chứng được, không chỉ cảm tính thẩm mỹ."],
    ["alert", "Ưu tiên sửa lỗi nào trước", "Lỗi nào chặn hoàn toàn một nhóm người dùng khỏi tác vụ chính."],
    ["shield-alert", "Đáp ứng yêu cầu pháp lý và hợp đồng", "Nhiều thị trường và tổ chức yêu cầu sản phẩm số tuân theo tiêu chuẩn tiếp cận (thường tham chiếu WCAG)."],
  ];
  return (
    <Section {...S.problem}>
      <div className="flex flex-col gap-5">
        <P>
          Nhiều sản phẩm được thiết kế ngầm cho một “người dùng điển hình”: nhìn rõ, nghe tốt, dùng chuột thành thạo, đọc nhanh và không bị phân tâm. Khi người dùng không
          khớp với hình mẫu đó, họ gặp rào cản. Ví dụ: nút chỉ có biểu tượng mà trình đọc màn hình không đọc được tên, chữ xám nhạt trên nền trắng, form chỉ báo lỗi bằng
          màu đỏ, hoặc popup không đóng được bằng bàn phím.
        </P>
        <P strong>
          Theo WHO (2023), khoảng 1,3 tỷ người, tương đương khoảng 16% dân số thế giới, sống với khuyết tật đáng kể. Ngoài ra, ai cũng có thể gặp hạn chế tạm thời (gãy tay,
          mắt mỏi sau phẫu thuật) hoặc theo tình huống (dùng điện thoại dưới nắng, một tay bế con, nơi ồn ào không bật được tiếng).
        </P>
      </div>
      <Eyebrow>Accessibility hỗ trợ các quyết định</Eyebrow>
      <div className="grid grid-cols-2 gap-5">
        {decisions.map(([icon, title, body], i) => (
          <InfoCard key={title} icon={icon} n={i + 1} title={title} body={body} minH={190} />
        ))}
      </div>
    </Section>
  );
}

function Pour() {
  return (
    <Section
      {...S.pour}
      intro="WCAG (Web Content Accessibility Guidelines) của W3C, tiêu chuẩn được tham chiếu rộng rãi nhất, tổ chức các yêu cầu theo bốn nguyên tắc, thường gọi tắt là POUR:"
    >
      <Table
        head={["Nguyên tắc", "Câu hỏi cần trả lời", "Biểu hiện trên giao diện"]}
        widths={[280]}
        rows={[
          {
            icon: "eye",
            cells: [
              "Perceivable — Nhận biết được",
              "Người dùng có tiếp nhận được thông tin qua ít nhất một giác quan họ dùng được không?",
              "Văn bản thay thế cho ảnh; phụ đề cho video; độ tương phản đủ; không chỉ dùng màu để truyền tải ý nghĩa.",
            ],
          },
          {
            icon: "play-circle",
            cells: [
              "Operable — Thao tác được",
              "Người dùng có điều khiển được mọi chức năng bằng cách nhập liệu họ dùng được không?",
              "Dùng được hoàn toàn bằng bàn phím; focus luôn nhìn thấy; vùng chạm đủ lớn; đủ thời gian thao tác; không có nội dung nhấp nháy gây hại.",
            ],
          },
          {
            icon: "lightbulb",
            cells: [
              "Understandable — Hiểu được",
              "Người dùng có hiểu nội dung và cách giao diện hoạt động không?",
              "Ngôn ngữ rõ ràng; nhãn và hướng dẫn cho form; báo lỗi cụ thể kèm cách sửa; hành vi giao diện nhất quán, dự đoán được.",
            ],
          },
          {
            icon: "shield-alert",
            cells: [
              "Robust — Bền vững",
              "Nội dung có hoạt động đúng với trình duyệt và công nghệ hỗ trợ (trình đọc màn hình, phần mềm điều khiển bằng giọng nói…) không?",
              "HTML đúng ngữ nghĩa; thành phần tùy biến có tên, vai trò và trạng thái được công nghệ hỗ trợ đọc được.",
            ],
          },
        ]}
      />
      <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
        <div className="flex items-center gap-3">
          <Tile icon="split" size={36} iconSize={18} radius={10} />
          <Eyebrow>Chuỗi nhận biết → thao tác → hiểu</Eyebrow>
        </div>
        <div className="flex items-start justify-between">
          <Node title="Người dùng" />
          <Arrow />
          <Node title="Nhận biết" sub="nhìn / nghe / chạm / trình đọc màn hình" className="w-[220px]" />
          <Arrow />
          <Node title="Thao tác" sub="chuột / bàn phím / chạm / giọng nói" className="w-[220px]" />
          <Arrow />
          <Node title="Hiểu" sub="ngôn ngữ, nhãn, lỗi, nhất quán" className="w-[200px]" />
          <Arrow />
          <Node title="Hoàn thành tác vụ" on />
        </div>
        <T as="p" className="rounded-2xl bg-[var(--d-soft)] px-5 py-3 text-center text-[15px] leading-[22px] font-semibold text-[var(--d-accent)]">
          Robust: mọi bước phải hoạt động với công nghệ hỗ trợ
        </T>
        <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
          Người dùng tiếp cận sản phẩm qua một hoặc nhiều cách nhận biết (nhìn, nghe, chạm) và thao tác (chuột, bàn phím, chạm, giọng nói, công nghệ hỗ trợ). Nếu một chuỗi
          nhận biết → thao tác → hiểu bị đứt ở bất kỳ điểm nào, người dùng đó không hoàn thành được tác vụ.
        </T>
      </Blk>

      <Subhead icon="bar-chart">Mức tuân thủ</Subhead>
      <div className="flex gap-4">
        <InfoCard title="A" body="Mức cơ bản nhất." className="flex-1" />
        <InfoCard tone="fill" title="AA" body="Mức thường được dùng làm mục tiêu trong chính sách và quy định." className="flex-1" />
        <InfoCard title="AAA" body="Mức cao nhất." className="flex-1" />
      </div>
      <P>WCAG chia tiêu chí thành ba mức A, AA, AAA. Phiên bản hiện hành là WCAG 2.2 (W3C Recommendation, cập nhật 12/12/2024).</P>

      <Subhead icon="users">Phổ khuyết tật: vĩnh viễn, tạm thời, tình huống</Subhead>
      <Table
        head={["Khả năng", "Vĩnh viễn", "Tạm thời", "Theo tình huống"]}
        widths={[200]}
        rows={[
          { icon: "eye", cells: ["Nhìn", "Người mù, thị lực kém", "Sau phẫu thuật mắt", "Màn hình chói nắng"] },
          { icon: "chat", cells: ["Nghe", "Người khiếm thính", "Viêm tai", "Nơi công cộng ồn ào"] },
          { icon: "users", cells: ["Vận động", "Mất một tay, run tay", "Gãy tay", "Một tay đang bế con"] },
          { icon: "lightbulb", cells: ["Nhận thức", "Rối loạn học tập, suy giảm trí nhớ", "Mệt mỏi, dùng thuốc", "Bị gián đoạn liên tục"] },
        ]}
      />
      <P>
        Cách nhìn theo phổ này được phổ biến bởi bộ công cụ Inclusive Design của Microsoft. Mục đích là nhắc rằng một giải pháp cho nhóm vĩnh viễn thường giúp được cả hai
        nhóm còn lại.
      </P>
    </Section>
  );
}

function InUi() {
  const rows: [string, string, string, string][] = [
    ["Ảnh có ý nghĩa", "Không có văn bản thay thế, hoặc alt=\"image123.png\".", "Alt mô tả thông tin ảnh truyền tải; ảnh trang trí để alt rỗng để trình đọc màn hình bỏ qua.", "Perceivable"],
    ["Màu chữ", "Chữ xám nhạt trên nền trắng, khó đọc.", "Đạt tỷ lệ tương phản tối thiểu của WCAG: 4.5:1 cho chữ thường, 3:1 cho chữ lớn (mức AA).", "Perceivable"],
    ["Trạng thái lỗi", "Ô nhập chỉ chuyển viền đỏ.", "Viền đổi màu kèm biểu tượng và dòng chữ nêu lỗi và cách sửa, gắn với ô nhập.", "Perceivable · Understandable"],
    ["Nút chỉ có biểu tượng", "Nút “×” hoặc “☰” không có tên.", "Có tên truy cập được (“Đóng”, “Mở menu”), có tooltip nếu cần.", "Robust · Understandable"],
    ["Focus bàn phím", "Ẩn viền focus vì “trông xấu”.", "Focus luôn nhìn thấy rõ và không bị header sticky che.", "Operable"],
    ["Thành phần tùy biến", "Dropdown dựng bằng thẻ div, chỉ bấm được bằng chuột.", "Dùng thẻ HTML gốc khi có thể; nếu tự dựng, theo mẫu tương tác của WAI-ARIA APG (phím, vai trò, trạng thái).", "Operable · Robust"],
    ["Vùng chạm", "Liên kết nhỏ đặt sát nhau trên mobile.", "Vùng chạm đủ lớn hoặc đủ khoảng cách. WCAG 2.2 (AA) yêu cầu tối thiểu 24×24 CSS px hoặc có khoảng cách tương đương, trừ một số ngoại lệ.", "Operable"],
    ["Nhãn form", "Chỉ dùng placeholder làm nhãn; chữ biến mất khi gõ.", "Nhãn hiển thị cố định, gắn với ô nhập; placeholder chỉ là gợi ý phụ.", "Understandable"],
    ["Chuyển động", "Animation lớn, tự chạy, không tắt được.", "Tôn trọng thiết lập giảm chuyển động của hệ điều hành; cho phép dừng nội dung tự chạy.", "Operable"],
    ["Video", "Không phụ đề.", "Có phụ đề; với nội dung chỉ truyền tải bằng hình ảnh, có mô tả âm thanh hoặc bản văn bản.", "Perceivable"],
  ];
  return (
    <Section {...S.ui}>
      <div className="grid grid-cols-2 gap-4">
        {rows.map(([part, bad, good, rule]) => (
          <Blk key={part} label="thẻ" className="g-card flex flex-col gap-4 rounded-[24px] bg-[var(--w-card)] p-7">
            <div className="flex items-start justify-between gap-4">
              <T as="h4" className="text-[20px] leading-7 font-semibold tracking-[-0.4px]">
                {part}
              </T>
              <T className="shrink-0 rounded-lg bg-[var(--d-soft)] px-2.5 py-1 font-mono text-[12px] leading-[18px] tracking-[0.4px] text-[var(--d-accent)] uppercase">{rule}</T>
            </div>
            <div className="flex flex-col gap-1 border-l-2 border-[var(--d-bad)] pl-4">
              <span className="font-mono text-[13px] leading-[18px] tracking-[0.4px] text-[var(--d-bad)]">CHƯA TỐT</span>
              <T as="p" className="text-[16px] leading-6 text-[var(--w-secondary)]">
                {bad}
              </T>
            </div>
            <div className="flex flex-col gap-1 border-l-2 border-[var(--d-accent)] pl-4">
              <span className="font-mono text-[13px] leading-[18px] tracking-[0.4px] text-[var(--d-accent)]">TỐT HƠN</span>
              <T as="p" className="text-[16px] leading-6">
                {good}
              </T>
            </div>
          </Blk>
        ))}
      </div>
    </Section>
  );
}

function When() {
  return (
    <Section {...S.when} intro="Luôn luôn, nhưng mỗi giai đoạn có trọng tâm khác:">
      <Table
        head={["Giai đoạn", "Việc cần làm"]}
        widths={[340]}
        rows={[
          { icon: "binoculars", cells: ["Nghiên cứu", "Đưa người khuyết tật và người dùng công nghệ hỗ trợ vào nhóm tham gia khi phù hợp; hỏi về thiết bị và cách họ thao tác."] },
          { icon: "split", cells: ["Kiến trúc thông tin, user flow", "Xác định thứ tự đọc, thứ tự focus; tránh luồng phụ thuộc vào thao tác chỉ có ở chuột (kéo thả, hover)."] },
          { icon: "component", cells: ["Wireframe, UI", "Thứ bậc heading, nhãn, trạng thái lỗi, tương phản, vùng chạm, focus."] },
          { icon: "book", cells: ["Design system", "Gắn yêu cầu accessibility vào từng component và token màu, để mọi màn hình dùng lại đều kế thừa."] },
          { icon: "file", cells: ["Phát triển", "HTML đúng ngữ nghĩa, tên truy cập, quản lý focus khi mở/đóng dialog."] },
          { icon: "check-circle", cells: ["Kiểm thử, phát hành", "Kiểm tra tự động + kiểm tra thủ công + kiểm thử với người dùng thật; theo dõi lỗi như lỗi chức năng."] },
        ]}
      />
      <Blk label="thẻ" className="g-card flex flex-col gap-6 rounded-[24px] bg-[var(--w-card)] p-7">
        <div className="flex items-center gap-3">
          <Tile icon="alert" size={40} iconSize={20} />
          <Eyebrow className="text-[var(--d-accent)]">Dấu hiệu cần ưu tiên ngay</Eyebrow>
        </div>
        <Checks
          items={[
            "Sản phẩm phục vụ dịch vụ công, y tế, giáo dục, tài chính, hoặc nhóm người dùng lớn tuổi.",
            "Có yêu cầu pháp lý hoặc hợp đồng về tiêu chuẩn tiếp cận ở thị trường mục tiêu.",
            "Tác vụ chính có form, thanh toán, đăng ký hoặc nội dung đa phương tiện.",
            "Đang xây dựng hoặc cập nhật design system.",
          ]}
        />
      </Blk>
    </Section>
  );
}

function Limits() {
  const items: [IconName, string, string][] = [
    [
      "check-circle",
      "Đạt WCAG không đảm bảo dùng được",
      "Một trang có thể vượt qua các tiêu chí kỹ thuật nhưng vẫn khó dùng với trình đọc màn hình vì thứ tự thông tin rối, nhãn mơ hồ hoặc quá nhiều bước.",
    ],
    [
      "filter",
      "Công cụ tự động chỉ bắt được một phần lỗi",
      "Công cụ không đánh giá được alt text có đúng nghĩa không, thứ tự focus có hợp lý không, hay ngôn ngữ có dễ hiểu không.",
    ],
    [
      "lightbulb",
      "WCAG chưa bao phủ đầy đủ nhu cầu nhận thức và học tập",
      "W3C có tài liệu bổ sung riêng cho nhóm này (Making Content Usable for People with Cognitive and Learning Disabilities).",
    ],
    [
      "component",
      "Tiêu chuẩn web không tự động áp dụng cho mọi nền tảng",
      "Ứng dụng di động, game, kiosk hay thiết bị có hướng dẫn riêng của từng nền tảng cần tham khảo thêm.",
    ],
  ];
  return (
    <Section {...S.limits}>
      <div className="grid grid-cols-2 gap-4">
        {items.map(([icon, title, body], i) => (
          <InfoCard key={title} icon={icon} n={i + 1} title={title} body={body} />
        ))}
        <InfoCard
          icon="alert"
          n={5}
          tone="ink"
          className="col-span-2"
          title="Bài này không phải tư vấn pháp lý"
          body="Yêu cầu pháp lý khác nhau theo quốc gia và lĩnh vực; cần kiểm tra với bộ phận pháp chế khi có nghĩa vụ tuân thủ."
        />
      </div>
    </Section>
  );
}

function Apply() {
  const steps: [string, string, string][] = [
    ["Xác định mục tiêu và phạm vi.", "Chọn tiêu chuẩn và mức tuân thủ (thường là WCAG 2.2 mức AA), các nền tảng và tác vụ chính cần đảm bảo trước.", "Tuyên bố mục tiêu accessibility của dự án."],
    [
      "Đưa yêu cầu vào design system.",
      "Kiểm tra tương phản của bộ màu, định nghĩa trạng thái focus, kích thước vùng chạm, cấu trúc heading, mẫu thông báo lỗi. Ghi chú hành vi bàn phím và tên truy cập cho từng component.",
      "Component và token đã có tiêu chí tiếp cận.",
    ],
    [
      "Chú thích accessibility trong bản thiết kế.",
      "Đánh dấu thứ tự đọc/focus, heading, landmark (header, nav, main, footer), alt text, nhãn của nút biểu tượng, trạng thái lỗi và nội dung động.",
      "Bản bàn giao có chú thích accessibility cho developer.",
    ],
    [
      "Xây dựng với HTML đúng ngữ nghĩa.",
      "Ưu tiên phần tử gốc (button, a, label, input…); chỉ dùng ARIA khi phần tử gốc không đáp ứng được và theo đúng mẫu tương tác.",
      "Bản triển khai.",
    ],
    [
      "Kiểm tra theo nhiều lớp.",
      "Công cụ tự động → kiểm tra thủ công bằng bàn phím, phóng to 200–400%, trình đọc màn hình → kiểm thử với người dùng có khuyết tật cho tác vụ chính.",
      "Danh sách vấn đề, mức độ nghiêm trọng, tiêu chí liên quan.",
    ],
    [
      "Sửa, ghi nhận và duy trì.",
      "Theo dõi lỗi accessibility trong cùng hệ thống quản lý lỗi; thêm kiểm tra vào quy trình review và phát hành để không tái phát.",
      "Báo cáo hiện trạng, kế hoạch khắc phục, quy trình duy trì.",
    ],
  ];
  return (
    <Section {...S.apply}>
      <Steps steps={steps} />
    </Section>
  );
}

function Evaluate() {
  return (
    <Section {...S.evaluate}>
      <Table
        head={["Cách đánh giá", "Phát hiện được", "Không phát hiện được", "Khi nào dùng"]}
        widths={[270]}
        rows={[
          {
            icon: "filter",
            cells: [
              "Công cụ kiểm tra tự động (tiện ích trình duyệt, kiểm tra trong CI)",
              "Thiếu alt, thiếu nhãn, tương phản thấp, lỗi cấu trúc HTML/ARIA cơ bản.",
              "Chất lượng alt, thứ tự focus, độ dễ hiểu, trải nghiệm tổng thể.",
              "Thường xuyên, sớm, tự động trong quy trình phát triển.",
            ],
          },
          {
            icon: "component",
            cells: [
              "Kiểm tra bàn phím",
              "Thành phần không với tới được, bẫy focus, focus không nhìn thấy, thứ tự focus vô lý.",
              "Vấn đề riêng của trình đọc màn hình.",
              "Mỗi component và mỗi luồng chính.",
            ],
          },
          {
            icon: "chat",
            cells: [
              "Kiểm tra với trình đọc màn hình (NVDA, VoiceOver, TalkBack…)",
              "Tên, vai trò, trạng thái sai; nội dung động không được thông báo.",
              "Đánh giá của người dùng thật quen dùng công cụ.",
              "Component phức tạp, luồng chính trước khi phát hành.",
            ],
          },
          { icon: "eye", cells: ["Kiểm tra phóng to và reflow", "Nội dung bị cắt, chồng lấn, phải cuộn ngang.", "—", "Mọi bố cục responsive."] },
          {
            icon: "clipboard-check",
            cells: [
              "Đánh giá theo tiêu chí WCAG (audit)",
              "Mức tuân thủ theo từng tiêu chí, kèm bằng chứng.",
              "Mức độ khó khăn thực tế mà người dùng gặp.",
              "Trước khi phát hành lớn, khi có yêu cầu tuân thủ.",
            ],
          },
          {
            icon: "users",
            cells: [
              "Kiểm thử với người dùng khuyết tật",
              "Rào cản thật trong bối cảnh thật, cách họ thực sự thao tác.",
              "Độ bao phủ toàn bộ tiêu chí.",
              "Tác vụ quan trọng; kết hợp với audit.",
            ],
          },
        ]}
      />
      <Callout tone="note">Không có một cách đánh giá nào đủ một mình. Công cụ tự động là lớp đầu tiên, không phải bằng chứng cuối cùng.</Callout>
    </Section>
  );
}

function InOut() {
  return (
    <Section {...S.io}>
      <InOutCards
        inputs={[
          "Tiêu chuẩn và mức tuân thủ mục tiêu.",
          "Danh sách tác vụ chính và nhóm người dùng, kể cả công nghệ hỗ trợ họ có thể dùng.",
          "Design system hoặc bộ component hiện có.",
          "Công cụ kiểm tra (tự động, trình đọc màn hình) và môi trường thử nghiệm.",
          "Yêu cầu pháp lý hoặc hợp đồng liên quan (nếu có).",
        ]}
        outputs={[
          "Thiết kế có chú thích accessibility và component đã có tiêu chí tiếp cận.",
          "Báo cáo đánh giá: vấn đề, mức nghiêm trọng, tiêu chí WCAG liên quan, cách sửa.",
          "Kế hoạch khắc phục và quy trình kiểm tra định kỳ.",
          "(Khi cần) Tuyên bố accessibility (accessibility statement) mô tả mức tuân thủ, hạn chế đã biết và kênh phản hồi.",
        ]}
      />
    </Section>
  );
}

function Example() {
  return (
    <Section {...S.example}>
      <Callout tone="scenario" title="Tình huống giả định">
        Tiếp nối luồng đặt lịch tư vấn trong bài User Flow. Không phải dự án đã triển khai.
      </Callout>
      <Blk label="thẻ" className="g-card flex flex-col gap-6 rounded-[24px] bg-[var(--w-card)] p-8">
        <div className="flex items-center gap-3">
          <Tile icon="split" size={40} iconSize={20} />
          <Eyebrow size={14}>Bối cảnh</Eyebrow>
        </div>
        <div className="flex items-center gap-3">
          {["Chọn dịch vụ", "Chọn giờ", "Nhập thông tin", "Gửi yêu cầu"].map((s, i) => (
            <span key={s} className="flex items-center gap-3">
              {i ? <Arrow size={20} /> : null}
              <span className={`rounded-xl px-5 py-3 ${i === 1 ? "bg-[var(--d-soft)] text-[var(--d-accent-strong)]" : "bg-[var(--d-well)]"}`}>
                <T className="text-[17px] leading-6 font-semibold tracking-[-0.2px]">{s}</T>
              </span>
            </span>
          ))}
        </div>
        <T as="p" className="text-[17px] leading-[26px] tracking-[-0.2px] text-[var(--w-secondary)]">
          Bước chọn giờ dùng một lưới lịch tự dựng; khung giờ trống tô xanh, khung đã kín tô xám.
        </T>
      </Blk>
      <Eyebrow>Rà soát accessibility phát hiện (giả định)</Eyebrow>
      <Table
        head={["Vấn đề", "Ai bị ảnh hưởng", "Hướng xử lý"]}
        widths={[340]}
        rows={[
          {
            cells: [
              "Lưới lịch chỉ bấm được bằng chuột.",
              "Người dùng bàn phím, trình đọc màn hình, điều khiển bằng giọng nói.",
              "Dùng nút thật cho mỗi khung giờ; di chuyển được bằng phím; mỗi nút có tên đầy đủ (ví dụ “Thứ Ba 18/11, 14:00, còn trống”).",
            ],
          },
          {
            cells: [
              "Trạng thái trống/kín chỉ phân biệt bằng màu.",
              "Người mù màu, người dùng trình đọc màn hình.",
              "Thêm chữ hoặc biểu tượng “Đã kín”; khung đã kín được đánh dấu không khả dụng.",
            ],
          },
          {
            cells: [
              "Khi giờ vừa hết chỗ, thông báo hiện ở đầu trang.",
              "Người dùng trình đọc màn hình không biết có thông báo; người phóng to không nhìn thấy.",
              "Thông báo gắn ngay tại bước chọn giờ, được công nghệ hỗ trợ đọc tự động; đưa focus về danh sách giờ còn trống.",
            ],
          },
          {
            cells: [
              "Lỗi form chỉ hiện viền đỏ.",
              "Người mù màu, người dùng trình đọc màn hình.",
              "Hiện lỗi bằng chữ ngay dưới ô, gắn với ô nhập; tóm tắt lỗi ở đầu form khi gửi.",
            ],
          },
          { cells: ["Bộ đếm thời gian giữ chỗ 5 phút không báo trước.", "Người thao tác chậm, người dùng công nghệ hỗ trợ.", "Báo trước thời hạn; cho phép gia hạn."] },
        ]}
      />
      <div className="flex gap-4">
        <InfoCard
          icon="check-circle"
          tone="fill"
          className="flex-1"
          title="Quyết định"
          body="Các vấn đề chặn tác vụ (lưới lịch không dùng được bằng bàn phím, thông báo hết chỗ không được đọc) được sửa trước khi ra mắt. Sau khi sửa, luồng được kiểm tra lại bằng bàn phím và trình đọc màn hình, và lên kế hoạch kiểm thử với người dùng thật."
        />
        <InfoCard
          icon="split"
          className="flex-1"
          title="Liên hệ với bài A/B Testing"
          body="Đây là ví dụ cho trường hợp “không nên A/B test”. Không nên để một nhóm người dùng tiếp tục dùng lưới lịch không thao tác được bằng bàn phím chỉ để so sánh; sửa trực tiếp theo tiêu chuẩn."
        />
      </div>
      <Callout tone="note" icon="briefcase">
        Đây là kế hoạch minh họa, chưa phải kết quả đánh giá thực tế.
      </Callout>
    </Section>
  );
}

function Mistakes() {
  return (
    <Section {...S.mistakes}>
      <PairCards
        items={[
          [
            "“Accessibility chỉ dành cho người mù”",
            "Bỏ qua người khiếm thính, khó khăn vận động, nhận thức, người lớn tuổi và hạn chế tạm thời/tình huống.",
            "Xét đủ các nhóm khả năng: nhìn, nghe, vận động, nhận thức.",
          ],
          ["Để đến cuối dự án mới kiểm tra", "Sửa muộn tốn kém; một số vấn đề nằm ở cấu trúc, phải làm lại cả luồng.", "Đưa yêu cầu vào design system và chú thích ngay từ wireframe."],
          ["Chỉ dựa vào công cụ tự động", "Công cụ không đánh giá được ý nghĩa, thứ tự và trải nghiệm.", "Kết hợp kiểm tra thủ công và kiểm thử với người dùng."],
          [
            "Thêm “overlay” accessibility và coi như xong",
            "Lớp phủ tự động không sửa được lỗi gốc trong mã, có thể gây xung đột với công nghệ hỗ trợ người dùng đang dùng.",
            "Sửa trong thiết kế và mã nguồn.",
          ],
          ["Lạm dụng ARIA", "ARIA sai còn tệ hơn không có; nó thay đổi cách công nghệ hỗ trợ hiểu phần tử.", "Ưu tiên HTML gốc; dùng ARIA theo đúng mẫu đã kiểm chứng."],
          ["Ẩn viền focus", "Người dùng bàn phím không biết mình đang ở đâu.", "Thiết kế kiểu focus rõ ràng, hợp phong cách thay vì xóa đi."],
          ["Chỉ dùng màu để báo trạng thái", "Người mù màu hoặc dùng trình đọc màn hình không nhận ra.", "Kết hợp màu với chữ, biểu tượng hoặc hình dạng."],
          [
            "“Accessibility làm xấu thiết kế”",
            "Hầu hết yêu cầu (tương phản, vùng chạm, nhãn rõ) đồng thời cải thiện khả năng sử dụng cho mọi người.",
            "Coi tiêu chí là ràng buộc thiết kế, như kích thước màn hình.",
          ],
          [
            "Alt text mô tả hình thức thay vì ý nghĩa",
            "“Ảnh một biểu đồ” không giúp người nghe hiểu dữ liệu.",
            "Mô tả thông tin ảnh truyền tải; với biểu đồ, cung cấp bảng dữ liệu hoặc tóm tắt.",
          ],
          ["Kiểm tra một lần rồi thôi", "Nội dung và tính năng mới liên tục tạo lỗi mới.", "Đưa kiểm tra vào quy trình review và phát hành."],
        ]}
      />
    </Section>
  );
}

function Compare() {
  return (
    <Section {...S.compare}>
      <Table
        head={["Khái niệm", "Trọng tâm", "Câu hỏi chính", "Quan hệ với Accessibility"]}
        widths={[230]}
        rows={[
          {
            icon: "users",
            highlight: true,
            cells: ["Accessibility", "Loại bỏ rào cản để mọi người, kể cả người khuyết tật, dùng được sản phẩm.", "“Có ai bị chặn khỏi tác vụ này không?”", "—"],
          },
          {
            icon: "check-circle",
            cells: [
              "Usability",
              "Mức độ hiệu quả, hiệu suất và hài lòng khi người dùng mục tiêu hoàn thành tác vụ.",
              "“Tác vụ có dễ và nhanh không?”",
              "Sản phẩm có thể dễ dùng với đa số nhưng không tiếp cận được với một số người; và ngược lại, đạt chuẩn tiếp cận nhưng khó dùng.",
            ],
          },
          {
            icon: "target",
            cells: [
              "Inclusive Design",
              "Phương pháp thiết kế xuất phát từ sự đa dạng con người, gồm khả năng, ngôn ngữ, văn hóa, tuổi, hoàn cảnh.",
              "“Chúng ta đang vô tình loại trừ ai?”",
              "Rộng hơn accessibility; accessibility thường là một kết quả đo được của inclusive design.",
            ],
          },
          {
            icon: "component",
            cells: [
              "Universal Design",
              "Thiết kế một giải pháp dùng được bởi nhiều người nhất có thể mà không cần điều chỉnh riêng.",
              "“Một thiết kế có phục vụ được tất cả không?”",
              "Cùng hướng mục tiêu; xuất phát từ kiến trúc và sản phẩm vật lý.",
            ],
          },
          {
            icon: "lightbulb",
            cells: ["User Experience (UX)", "Toàn bộ cảm nhận và phản ứng khi dùng sản phẩm.", "“Trải nghiệm tổng thể ra sao?”", "Accessibility là điều kiện để một người có trải nghiệm ngay từ đầu."],
          },
        ]}
      />
    </Section>
  );
}

function Checklist() {
  return (
    <Section
      {...S.checklist}
      intro="Dùng để tự rà soát; trạng thái tick không được lưu lại. Checklist này là điểm khởi đầu, không thay thế đánh giá đầy đủ theo WCAG."
    >
      <div className="flex items-start gap-4">
        <ChecklistColumn
          icon="component"
          title="Thiết kế"
          items={[
            "Mỗi trang có một H1 và heading theo thứ bậc hợp lý.",
            "Màu chữ và thành phần tương tác đạt tỷ lệ tương phản tối thiểu.",
            "Không có thông tin nào chỉ được truyền tải bằng màu.",
            "Trạng thái focus được thiết kế, nhìn thấy rõ và không bị che.",
            "Vùng chạm đủ lớn hoặc đủ khoảng cách trên mobile.",
            "Mỗi ô nhập có nhãn hiển thị; lỗi nêu rõ vấn đề và cách sửa.",
            "Ảnh có ý nghĩa có alt text; ảnh trang trí được đánh dấu bỏ qua.",
            "Animation tôn trọng thiết lập giảm chuyển động.",
          ]}
        />
        <ChecklistColumn
          icon="play-circle"
          title="Triển khai và kiểm tra"
          items={[
            "Hoàn thành được tác vụ chính chỉ bằng bàn phím, không bị kẹt focus.",
            "Thứ tự focus khớp thứ tự đọc.",
            "Nút và liên kết có tên truy cập rõ nghĩa.",
            "Nội dung động (thông báo, lỗi, cập nhật) được công nghệ hỗ trợ đọc.",
            "Phóng to 200% không mất nội dung; 400% không phải cuộn ngang (trừ bảng, bản đồ…).",
            "Đã chạy công cụ tự động và kiểm tra thủ công với ít nhất một trình đọc màn hình.",
          ]}
        />
        <ChecklistColumn
          icon="clipboard-check"
          title="Quy trình"
          items={[
            "Đã xác định tiêu chuẩn và mức tuân thủ mục tiêu.",
            "Yêu cầu accessibility có trong design system và tiêu chí nghiệm thu.",
            "Có kênh để người dùng báo cáo rào cản.",
          ]}
        />
      </div>
    </Section>
  );
}

function Related() {
  return (
    <Section {...S.related}>
      <RelatedCards
        items={[
          ["Usability Heuristics", "Nguyên tắc khả năng sử dụng", "Bổ sung cho tiêu chí tiếp cận khi đánh giá chuyên gia."],
          ["Usability Testing", "Kiểm thử khả năng sử dụng", "Cách kiểm thử với người dùng khuyết tật trong tác vụ thật."],
          ["Heuristic Evaluation", "Đánh giá theo nguyên tắc", "Phương pháp audit có thể kết hợp tiêu chí WCAG."],
          ["Cognitive Load", "Tải nhận thức", "Liên quan nguyên tắc “Hiểu được” và nhu cầu nhận thức."],
          ["Visual Hierarchy", "Phân cấp thị giác", "Liên quan heading, tương phản, thứ tự đọc."],
          ["Microcopy", "Vi văn bản", "Nhãn, thông báo lỗi, tên nút rõ nghĩa."],
          ["Content Design", "Thiết kế nội dung", "Nội dung rõ ràng, đúng chỗ hỗ trợ nguyên tắc “hiểu được”."],
          ["User Experience (UX)", "Trải nghiệm người dùng", "Accessibility là điều kiện để có trải nghiệm."],
          ["User Flow", "Luồng tương tác của người dùng", "Nguồn của tình huống ví dụ trong bài."],
          ["A/B Testing", "Kiểm thử A/B", "Ví dụ về trường hợp nên sửa trực tiếp thay vì thử nghiệm."],
        ]}
      />
    </Section>
  );
}

export const ACCESSIBILITY: Article = {
  slug: "accessibility",
  version: 1,
  term: "Accessibility",
  fn: 4,
  vi: "Khả năng tiếp cận — thiết kế để mọi người đều dùng được",
  kind: "Nguyên tắc / khái niệm",
  definition:
    "Accessibility là mức độ một sản phẩm số có thể được nhận biết, thao tác và hiểu bởi mọi người, kể cả người khuyết tật, người cao tuổi hay người đang ở trong điều kiện hạn chế tạm thời.",
  definitionMore:
    "Một giao diện có khả năng tiếp cận không buộc người dùng phải nhìn rõ, nghe được, dùng chuột hay thao tác nhanh mới hoàn thành được việc của mình. Hiểu accessibility giúp nhóm thiết kế và xây dựng sản phẩm mà không vô tình loại bỏ một phần người dùng.",
  oneLine: "Thiết kế để mọi người, kể cả người khuyết tật, đều nhận biết, thao tác và hiểu được sản phẩm số.",
  glance: [
    ["a11y", "Viết tắt"],
    ["AA", "Mức WCAG thường làm mục tiêu"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Digital accessibility", "Web accessibility (khi nói riêng về web)"] },
    { label: "Nhóm chính", items: ["Nền tảng và nguyên tắc"] },
    { label: "Thẻ phụ", items: ["Cấu trúc và thiết kế", "Kiểm thử và đánh giá"] },
    { label: "Lưu ý tên gọi", items: ["“Inclusive design” (thiết kế hòa nhập) và “Usability” (khả năng sử dụng) là khái niệm gần nhưng khác."] },
  ],
  sections: SECTIONS,
  Body,
};
