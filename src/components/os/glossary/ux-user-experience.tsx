"use client";

import { Fragment } from "react";
import { Blk, T } from "./edit";
import { CheckCards, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, Icon, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* User Experience (UX) — copy from ux-glossary/ux-user-experience.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "how", title: "UX hình thành như thế nào", icon: "component" },
  { id: "ui", title: "Biểu hiện trên giao diện: ví dụ tốt và chưa tốt", icon: "eye" },
  { id: "when", title: "Khi nào nên dùng khái niệm UX", icon: "check-circle" },
  { id: "limits", title: "Giới hạn: khi nào “UX” chưa đủ", icon: "shield-alert" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "measure", title: "Cách đánh giá UX", icon: "bar-chart" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

const FACTORS: [string, string][] = [
  ["Người dùng", "Mục tiêu, kỳ vọng, kinh nghiệm, năng lực, cảm xúc"],
  ["Sản phẩm", "Chức năng, nội dung, tương tác, hiệu năng"],
  ["Bối cảnh", "Thiết bị, môi trường, thời gian, xã hội"],
];
const TIME = ["Trước", "Trong", "Sau", "Tích lũy"];

/** User × Product × Context meet in the experience, which unfolds over time. */
function MechanismDiagram() {
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="component" size={36} iconSize={18} radius={10} />
        <Eyebrow>Người dùng × Sản phẩm × Bối cảnh, theo thời gian</Eyebrow>
      </div>
      <div className="flex items-stretch gap-4">
        <div className="flex flex-1 flex-col gap-3">
          {FACTORS.map(([t, d]) => (
            <div key={t} className="flex flex-col gap-1 rounded-2xl bg-[var(--d-soft)] p-5">
              <span className="text-[17px] leading-[24px] font-semibold">{t}</span>
              <span className="text-[15px] leading-[22px] text-[var(--w-secondary)]">{d}</span>
            </div>
          ))}
        </div>
        <span className="flex items-center text-[var(--w-muted)]">
          <Icon name="arrow-right" size={24} />
        </span>
        <div className="flex w-[260px] shrink-0 flex-col items-center justify-center gap-2 rounded-[24px] bg-[var(--d-fill)] p-6 text-center text-white">
          <span className="text-[32px] leading-[38px] font-semibold">UX</span>
          <span className="text-[15px] leading-[22px] text-white/85">Phát sinh trong người dùng khi ba yếu tố gặp nhau</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {TIME.map((t, i) => (
          <Fragment key={t}>
            <span className="flex-1 rounded-full bg-[var(--d-well)] py-2.5 text-center text-[15px] font-semibold">{t}</span>
            {i < TIME.length - 1 && <Icon name="arrow-right" size={16} className="text-[var(--w-muted)]" />}
          </Fragment>
        ))}
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Gợi ý dựa trên khung của Hassenzahl & Tractinsky (2006). Cùng một sản phẩm có thể cho trải nghiệm rất khác ở hai người, hoặc ở cùng một người tại hai thời điểm.
      </T>
    </Blk>
  );
}

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Section {...S.problem}>
        <P>
          Một sản phẩm có thể đủ tính năng nhưng vẫn không được dùng: người dùng không tìm thấy chức năng, không hiểu bước tiếp theo, không tin tưởng để nhập thông tin, hoặc bỏ dở giữa chừng. Khái
          niệm UX giúp nhóm nhìn sản phẩm từ phía người sử dụng, thay vì từ phía người xây dựng.
        </P>
        <InfoGrid
          items={[
            ["list", "Ưu tiên vấn đề nào trước", "Vấn đề nào gây cản trở lớn nhất cho mục tiêu của người dùng."],
            ["check-circle", "Thế nào là “đủ tốt” để ra mắt", "Không chỉ “chạy được” mà còn “dùng được” cho nhóm người dùng mục tiêu."],
            ["bar-chart", "Đo thành công bằng gì", "Chọn tín hiệu phản ánh trải nghiệm thật, không chỉ số lượt truy cập."],
            ["split", "Đánh đổi thế nào", "Cân bằng nhu cầu người dùng với mục tiêu kinh doanh và ràng buộc kỹ thuật."],
            ["chat", "Ngôn ngữ chung", "Để designer, PM, BA, developer và QA cùng nói về một thứ khi nhắc đến “trải nghiệm”."],
          ]}
        />
      </Section>

      <Section {...S.how}>
        <Subhead icon="component">Cơ chế: Người dùng × Sản phẩm × Bối cảnh, theo thời gian</Subhead>
        <P>
          UX không nằm sẵn trong giao diện. Nó phát sinh trong người dùng khi họ tương tác với sản phẩm trong một bối cảnh cụ thể. Cùng một sản phẩm có thể mang lại trải nghiệm rất khác cho hai
          người, hoặc cho cùng một người ở hai thời điểm.
        </P>
        <MechanismDiagram />
        <Table
          head={["Yếu tố", "Bao gồm", "Ví dụ minh họa (giả định: khách đặt lịch tư vấn trên portfolio)"]}
          widths={[200]}
          rows={[
            {
              icon: "users",
              cells: ["Người dùng", "Mục tiêu, kỳ vọng, kinh nghiệm trước đó, năng lực (kể cả khuyết tật), trạng thái cảm xúc, mức độ gấp.", "Một quản lý sản phẩm đang cần tìm designer gấp, chưa từng làm việc với chủ portfolio."],
            },
            { icon: "component", cells: ["Sản phẩm / Hệ thống", "Chức năng, nội dung, cấu trúc, cách tương tác, giao diện, tốc độ, độ ổn định, hỗ trợ.", "Trang dịch vụ, form đặt lịch, email xác nhận."] },
            { icon: "eye", cells: ["Bối cảnh", "Thiết bị, môi trường vật lý, thời gian, áp lực xã hội/tổ chức.", "Đặt lịch bằng điện thoại giữa hai cuộc họp, mạng chập chờn."] },
            {
              icon: "hourglass",
              cells: ["Thời gian", "Trước, trong, sau khi dùng và cảm nhận tích lũy.", "Ấn tượng khi đọc case study → lúc điền form → khi nhận email xác nhận → cảm nhận sau buổi tư vấn."],
            },
          ]}
        />
        <Subhead icon="hourglass">UX theo thời gian</Subhead>
        <Table
          head={["Giai đoạn", "Mô tả", "Câu hỏi thiết kế"]}
          widths={[240]}
          rows={[
            { cells: ["Kỳ vọng (anticipated)", "Hình dung trước khi dùng, từ giới thiệu, lời kể, kinh nghiệm với sản phẩm tương tự.", "Người dùng mong đợi điều gì trước khi bắt đầu?"] },
            { cells: ["Tức thời (momentary)", "Cảm nhận ngay trong một khoảnh khắc tương tác.", "Bước này có rõ ràng, có phản hồi kịp thời không?"] },
            { cells: ["Theo lượt dùng (episodic)", "Đánh giá sau khi hoàn thành (hoặc bỏ dở) một lần sử dụng.", "Sau lần này, họ thấy được việc hay mất công?"] },
            { cells: ["Tích lũy (cumulative)", "Ấn tượng tổng thể sau nhiều lần dùng theo thời gian.", "Họ có quay lại, có giới thiệu cho người khác không?"] },
          ]}
        />
        <P>Theo User Experience White Paper, Roto và cộng sự, 2011.</P>
        <Subhead icon="list">Các tầng thiết kế góp phần tạo nên UX</Subhead>
        <P>Jesse James Garrett mô tả trải nghiệm được xây dựng qua năm tầng, đi từ trừu tượng đến cụ thể. Quyết định ở tầng dưới giới hạn lựa chọn ở tầng trên.</P>
        <Table
          head={["Tầng", "Câu hỏi chính", "Ví dụ sản phẩm đầu ra"]}
          widths={[240]}
          rows={[
            { cells: ["Strategy — Chiến lược", "Người dùng cần gì? Doanh nghiệp/sản phẩm muốn đạt gì?", "Mục tiêu sản phẩm, nhóm người dùng, tiêu chí thành công."] },
            { cells: ["Scope — Phạm vi", "Cần có những tính năng và nội dung nào?", "Danh sách yêu cầu, user story."] },
            { cells: ["Structure — Cấu trúc", "Thông tin và luồng tương tác được tổ chức thế nào?", "Information architecture, user flow."] },
            { highlight: true, cells: ["Skeleton — Khung", "Thành phần được sắp xếp trên màn hình ra sao?", "Wireframe, bố cục điều hướng."] },
            { highlight: true, cells: ["Surface — Bề mặt", "Sản phẩm trông và cảm thấy như thế nào?", "Visual design, typography, màu sắc, chuyển động."] },
          ]}
        />
        <InfoCard
          tone="fill"
          icon="component"
          title="Ý nghĩa"
          body="UI chủ yếu nằm ở tầng Khung và Bề mặt. UX trải dài cả năm tầng — một giao diện đẹp không bù được cho chiến lược sai hoặc luồng thiếu bước."
        />
        <Subhead icon="lightbulb">Các phẩm chất của một trải nghiệm</Subhead>
        <P>Peter Morville đề xuất mô hình “UX Honeycomb” gồm bảy phẩm chất. Đây là công cụ để đặt câu hỏi, không phải thang chấm điểm.</P>
        <Table
          head={["Phẩm chất", "Tiếng Việt", "Câu hỏi tự kiểm tra"]}
          widths={[200, 200]}
          rows={[
            { cells: ["Useful", "Hữu ích", "Sản phẩm có giải quyết nhu cầu thật không?"] },
            { cells: ["Usable", "Dễ sử dụng", "Người dùng hoàn thành tác vụ có dễ dàng, ít lỗi không?"] },
            { cells: ["Findable", "Dễ tìm", "Họ có tìm thấy nội dung, chức năng cần thiết không?"] },
            { cells: ["Credible", "Đáng tin", "Họ có tin vào thông tin và sản phẩm không?"] },
            { cells: ["Accessible", "Tiếp cận được", "Người khuyết tật hoặc trong điều kiện hạn chế có dùng được không?"] },
            { cells: ["Desirable", "Hấp dẫn", "Thẩm mỹ, thương hiệu, cảm xúc có tạo thiện cảm không?"] },
            { cells: ["Valuable", "Có giá trị", "Sản phẩm có tạo giá trị cho người dùng và cho tổ chức không?"] },
          ]}
        />
        <P>Một cách nhìn bổ sung (Hassenzahl): trải nghiệm có hai mặt chất lượng.</P>
        <div className="flex gap-4">
          <InfoCard icon="check-circle" title="Thực dụng (pragmatic)" className="flex-1" body="Giúp người dùng làm xong việc hiệu quả." />
          <InfoCard icon="lightbulb" title="Cảm xúc (hedonic)" className="flex-1" body="Mang lại cảm giác thú vị, tự hào, gắn bó, thể hiện bản thân." />
        </div>
        <P>Một sản phẩm tốt thường cần cả hai, với tỷ lệ tùy vào bối cảnh (phần mềm kế toán khác ứng dụng chụp ảnh).</P>
      </Section>

      <Section {...S.ui}>
        <Scenario>Ví dụ giả định dựa trên luồng đặt lịch tư vấn trên portfolio. Không phải case study đã triển khai.</Scenario>
        <Table
          head={["Tình huống", "Chưa tốt", "Tốt hơn", "Phẩm chất"]}
          widths={[180]}
          rows={[
            { cells: ["Nhập sai email", "Báo “Có lỗi xảy ra” và xóa dữ liệu đã nhập.", "Chỉ rõ trường sai, nói cách sửa, giữ nguyên dữ liệu khác.", "Usable"] },
            { cells: ["Khung giờ hết chỗ", "Chỉ báo lỗi sau khi bấm Gửi.", "Chỉ hiển thị giờ còn trống; nếu giờ vừa hết, đề xuất giờ gần nhất và giữ thông tin đã nhập.", "Usable, Credible"] },
            { cells: ["Sau khi gửi", "Màn hình chỉ có chữ “Thành công”.", "Tóm tắt lịch đã đặt, thời gian theo múi giờ của khách, cách đổi/hủy, thời điểm sẽ được liên hệ.", "Credible, Valuable"] },
            { cells: ["Trạng thái lỗi", "Chỉ tô đỏ ô nhập.", "Màu + biểu tượng + thông báo bằng chữ, được trình đọc màn hình đọc được.", "Accessible"] },
            { cells: ["Đăng ký nhận tin", "Ô “Nhận bản tin” được tick sẵn, chữ nhỏ.", "Không tick sẵn; nói rõ người dùng nhận được gì.", "Credible"] },
            { cells: ["Đang gửi", "Bấm Gửi không có phản hồi; người dùng bấm lại nhiều lần.", "Nút chuyển trạng thái “Đang gửi…”, chặn gửi trùng.", "Usable"] },
            { cells: ["Tìm dịch vụ", "Dịch vụ nằm trong menu ẩn với tên nội bộ khó hiểu.", "Nhãn dùng từ ngữ của khách hàng, có liên kết từ case study liên quan.", "Findable"] },
          ]}
        />
      </Section>

      <Section {...S.when}>
        <InfoGrid
          items={[
            ["target", "Khi định hướng sản phẩm", "Đặt câu hỏi “người dùng cố gắng làm gì, trong bối cảnh nào?” trước khi bàn tính năng."],
            ["list-search", "Khi đánh giá một sản phẩm hiện có", "Nhìn toàn bộ hành trình sử dụng, không chỉ một màn hình."],
            ["chat", "Khi các bên tranh luận về giải pháp", "Chuyển từ “tôi thích/không thích” sang “điều này ảnh hưởng gì đến người dùng và bằng chứng là gì”."],
            ["bar-chart", "Khi đặt tiêu chí thành công", "Bổ sung tín hiệu về trải nghiệm bên cạnh chỉ số kinh doanh."],
            ["users", "Khi giải thích vai trò của thiết kế", "Với PM, developer, khách hàng hoặc nhà tuyển dụng."],
          ]}
        />
        <CheckCards
          groups={[
            [
              "alert",
              "Dấu hiệu cần quay lại góc nhìn UX",
              [
                "Tính năng ra mắt nhưng ít người dùng hoặc dùng sai cách.",
                "Đội hỗ trợ nhận nhiều câu hỏi lặp lại về cùng một chỗ.",
                "Người dùng tự tạo “đường vòng” (chụp màn hình, ghi chú tay, dùng công cụ khác) để làm xong việc.",
                "Nhóm không trả lời được “ai dùng tính năng này và để làm gì”.",
              ],
            ],
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["target", "“UX” quá rộng để làm tiêu chí trực tiếp", "“Cải thiện UX” không phải mục tiêu kiểm chứng được. Hãy tách thành câu hỏi cụ thể: tác vụ nào, cho ai, cải thiện điều gì, đo bằng gì."],
            ["users", "Không thể thiết kế trực tiếp ra một trải nghiệm", "Vì UX nằm ở người dùng, đội ngũ chỉ có thể thiết kế điều kiện để trải nghiệm tốt có khả năng xảy ra, rồi kiểm chứng."],
            ["file", "Nhận định không thay thế bằng chứng", "Cần nghiên cứu, kiểm thử hoặc dữ liệu hành vi phù hợp."],
            ["component", "Vấn đề nằm ngoài sản phẩm số", "Giao hàng, chăm sóc khách hàng, quy trình tại quầy: cân nhắc Customer Experience (CX), Service Design hoặc Journey Mapping."],
            ["check-circle", "Chỉ cần biết có hoàn thành tác vụ không", "Dùng khái niệm và phương pháp cụ thể hơn: Usability và Usability Testing."],
            ["eye", "Cần đảm bảo người khuyết tật dùng được", "Cần tiêu chuẩn Accessibility (ví dụ WCAG); cảm nhận chung về UX không đủ để kết luận."],
          ]}
        />
      </Section>

      <Section {...S.apply} intro="Mức độ chi tiết của từng bước phụ thuộc vào quy mô, thời gian và rủi ro của dự án.">
        <Steps
          steps={[
            ["Xác định người dùng, mục tiêu và bối cảnh", "Ai dùng? Họ cố gắng đạt điều gì? Trong điều kiện nào? Phân biệt điều đã biết và điều đang giả định.", "Danh sách giả định, câu hỏi cần trả lời."],
            ["Hiểu trải nghiệm hiện tại", "Phỏng vấn, quan sát, xem dữ liệu hành vi, đọc phản hồi hỗ trợ, đánh giá sản phẩm hiện có.", "Phát hiện có bằng chứng, điểm đau, cơ hội."],
            ["Xác định vấn đề và tiêu chí thành công", "Viết lại vấn đề từ góc nhìn người dùng; thống nhất cách nhận biết khi nào vấn đề được giải quyết.", "Problem statement, tiêu chí/chỉ số theo dõi."],
            ["Thiết kế qua các tầng", "Phạm vi → cấu trúc (IA, user flow) → khung (wireframe) → bề mặt (UI). Đừng nhảy thẳng vào giao diện khi tầng dưới chưa rõ.", "User flow, wireframe, prototype."],
            ["Kiểm chứng với người dùng phù hợp", "Kiểm thử prototype hoặc sản phẩm với người thuộc nhóm mục tiêu; ghi nhận cả hành vi lẫn cảm nhận.", "Danh sách vấn đề theo mức độ nghiêm trọng, quyết định điều chỉnh."],
            ["Theo dõi sau khi ra mắt và lặp lại", "Kết hợp định lượng (điều gì xảy ra) với định tính (vì sao xảy ra). Trải nghiệm thay đổi theo thời gian.", "Báo cáo theo dõi, backlog cải tiến."],
          ]}
        />
      </Section>

      <Section {...S.measure} intro="Không có một con số duy nhất đại diện cho toàn bộ UX. Chọn phương pháp theo câu hỏi cần trả lời, và kết hợp nhiều nguồn khi có thể.">
        <Table
          head={["Phương pháp", "Đánh giá khía cạnh nào", "Lưu ý khi diễn giải"]}
          widths={[260]}
          rows={[
            { icon: "users", cells: ["Usability testing", "Người dùng có hoàn thành tác vụ không, gặp khó ở đâu, vì sao.", "Kết quả phụ thuộc vào người tham gia và kịch bản; nói rõ giới hạn khi kết luận."] },
            { icon: "chat", cells: ["Phỏng vấn / quan sát tại bối cảnh", "Nhu cầu, động cơ, bối cảnh, cách làm hiện tại.", "Lời kể khác hành vi thực tế; cần đối chiếu."] },
            {
              icon: "list",
              cells: ["Bảng hỏi chuẩn hóa (SUS, UEQ, AttrakDiff)", "Cảm nhận về tính dễ dùng và/hoặc chất lượng thực dụng – cảm xúc.", "Dùng đúng câu hỏi và cách tính của bảng hỏi gốc; không tự đặt ngưỡng “tốt/xấu” nếu không có cơ sở."],
            },
            { icon: "analytics", cells: ["Dữ liệu hành vi (analytics)", "Tỷ lệ hoàn thành, điểm rời bỏ, thời gian tác vụ, lỗi.", "Cho biết điều gì xảy ra, không cho biết vì sao."] },
            { icon: "list-search", cells: ["Đánh giá theo heuristic", "Vi phạm nguyên tắc dễ dùng phổ biến.", "Do chuyên gia thực hiện; không thay thế người dùng thật."] },
            { icon: "bar-chart", cells: ["Khung chọn chỉ số (HEART)", "Giúp liên kết mục tiêu → tín hiệu → chỉ số.", "Là khung tư duy; chỉ số cụ thể phải chọn theo sản phẩm."] },
          ]}
        />
        <Callout tone="note" icon="target">
          Chỉ số và ngưỡng đánh giá phải xuất phát từ mục tiêu và bối cảnh của sản phẩm. Bài này không đưa ra ngưỡng chung cho mọi trường hợp.
        </Callout>
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={[
            "Mục tiêu kinh doanh/sản phẩm và ràng buộc (thời gian, kỹ thuật, pháp lý).",
            "Hiểu biết về người dùng: nghiên cứu sẵn có, dữ liệu hành vi, phản hồi hỗ trợ.",
            "Sản phẩm hiện tại hoặc giải pháp thay thế mà người dùng đang dùng.",
            "Danh sách giả định cần kiểm chứng.",
          ]}
          outputs={[
            "Mô tả rõ người dùng, mục tiêu, bối cảnh — tách bạch giả định và bằng chứng.",
            "Vấn đề được ưu tiên và tiêu chí thành công đã thống nhất.",
            "Tài liệu thiết kế theo tầng: user flow, wireframe, prototype, UI.",
            "Kết quả kiểm chứng và các quyết định thiết kế kèm lý do.",
            "Kế hoạch theo dõi trải nghiệm sau khi ra mắt.",
          ]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối ví dụ đặt lịch tư vấn. Không phải dự án đã triển khai, không có số liệu thật.</Scenario>
        <InfoCard icon="alert" title="Vấn đề" body="Giả sử chủ portfolio nhận thấy nhiều người mở form đặt lịch nhưng ít người gửi yêu cầu." />
        <div className="flex gap-4">
          <InfoCard icon="users" title="Người dùng" className="flex-1" body="Khách tiềm năng thường bận, xem trên điện thoại, chưa chắc có nên đặt lịch hay không." />
          <InfoCard icon="eye" title="Bối cảnh" className="flex-1" body="Họ vừa đọc một case study, muốn hỏi nhanh nhưng form yêu cầu nhiều thông tin." />
        </div>
        <Table
          head={["Tầng", "Rà soát"]}
          widths={[220]}
          rows={[
            { cells: ["Chiến lược", "Mục tiêu là cuộc trao đổi đầu tiên, không cần đủ thông tin dự án ngay."] },
            { cells: ["Phạm vi", "Có những trường thông tin không cần cho buổi đầu."] },
            { cells: ["Cấu trúc", "Khách chỉ biết giờ đã hết sau khi điền xong."] },
            { cells: ["Bề mặt", "Không có thông tin buổi tư vấn kéo dài bao lâu, có mất phí không."] },
          ]}
        />
        <CheckCards
          groups={[
            [
              "check-circle",
              "Quyết định (giả thuyết cần kiểm chứng)",
              [
                "Rút gọn form về những thông tin cần cho buổi đầu.",
                "Hiển thị giờ còn trống trước khi yêu cầu nhập thông tin.",
                "Nêu rõ thời lượng, hình thức và chi phí (nếu có) ngay đầu form.",
                "Kiểm thử prototype với một nhóm nhỏ người thuộc nhóm khách hàng mục tiêu trước khi triển khai.",
              ],
            ],
          ]}
        />
        <Callout tone="note" icon="briefcase">
          Đây là các quyết định được rút ra từ việc phân tích, chưa phải kết quả kiểm thử thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["UX = UI / làm cho đẹp", "UI chỉ là một phần của trải nghiệm; giao diện đẹp không sửa được luồng sai hay nội dung khó hiểu.", "Xem xét cả năm tầng, từ chiến lược đến bề mặt."],
            ["UX = Usability", "Dễ dùng là một phẩm chất quan trọng, nhưng UX còn gồm tính hữu ích, sự tin tưởng, cảm xúc, khả năng tiếp cận.", "Dùng mô hình phẩm chất (honeycomb) để kiểm tra toàn diện."],
            ["“Tôi cũng là người dùng”", "Nhóm sản phẩm hiểu sản phẩm quá rõ; không đại diện được người dùng mục tiêu.", "Kiểm chứng với người dùng thật thuộc nhóm mục tiêu."],
            ["UX là việc riêng của designer", "Tốc độ tải, lỗi hệ thống, nội dung, chính sách giá, hỗ trợ khách hàng đều ảnh hưởng trải nghiệm.", "Đưa PM, dev, QA, nội dung, hỗ trợ vào quá trình."],
            ["Chỉ thiết kế đường đi thành công", "Trải nghiệm thường bị phá vỡ ở lỗi, ngoại lệ, chờ đợi, hủy bỏ.", "Thiết kế và kiểm thử cả trạng thái lỗi, rỗng, đang tải."],
            ["Đo UX bằng một chỉ số duy nhất", "Một con số không phản ánh nhiều khía cạnh và không giải thích nguyên nhân.", "Kết hợp định lượng và định tính; chọn chỉ số theo mục tiêu."],
            ["Coi lời nói là hành vi", "Người dùng nói “rất dễ” vẫn có thể thất bại khi làm.", "Quan sát hành vi, không chỉ hỏi ý kiến."],
            ["Dùng dark pattern để tăng chỉ số", "Tăng ngắn hạn nhưng làm mất niềm tin và có thể vi phạm quy định.", "Đo cả tín hiệu dài hạn: quay lại, khiếu nại, hủy."],
            ["Để accessibility đến cuối", "Sửa muộn tốn kém và dễ bị bỏ qua.", "Đưa yêu cầu tiếp cận vào từ giai đoạn cấu trúc và thiết kế."],
            ["Nói “vì UX tốt hơn” mà không có bằng chứng", "Biến UX thành ý kiến cá nhân, khó thuyết phục.", "Nêu rõ giả định, bằng chứng, và cách kiểm chứng."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Trọng tâm", "Phạm vi", "Câu hỏi điển hình"]}
          widths={[200]}
          rows={[
            { highlight: true, cells: ["UX — User Experience", "Cảm nhận và phản ứng của người dùng với sản phẩm/dịch vụ.", "Trước, trong, sau khi dùng; mọi yếu tố ảnh hưởng.", "“Người dùng trải qua điều gì và cảm thấy thế nào?”"] },
            { cells: ["UX Design", "Hoạt động thiết kế các điều kiện để tạo trải nghiệm tốt.", "Nghiên cứu, cấu trúc, tương tác, kiểm chứng.", "“Ta nên thiết kế gì để người dùng đạt mục tiêu?”"] },
            { cells: ["UI — User Interface", "Phần người dùng nhìn thấy và tương tác trực tiếp.", "Bố cục, thành phần, màu sắc, chữ, chuyển động.", "“Màn hình này trình bày và phản hồi thế nào?”"] },
            { cells: ["Usability", "Mức độ người dùng cụ thể đạt mục tiêu cụ thể một cách hiệu quả, hiệu suất và hài lòng.", "Một phần của UX, đo được qua tác vụ.", "“Họ có làm xong việc không, có dễ không?”"] },
            { cells: ["Accessibility", "Khả năng người khuyết tật và người trong điều kiện hạn chế sử dụng được sản phẩm.", "Có tiêu chuẩn cụ thể (ví dụ WCAG).", "“Ai đang bị loại khỏi trải nghiệm này?”"] },
            { cells: ["CX — Customer Experience", "Trải nghiệm của khách hàng với toàn bộ tổ chức/thương hiệu.", "Nhiều kênh: quảng cáo, mua hàng, giao hàng, hỗ trợ, sản phẩm.", "“Khách hàng cảm thấy thế nào về toàn bộ quan hệ với chúng ta?”"] },
          ]}
        />
        <InfoCard tone="fill" icon="component" title="Tóm gọn" body="UI ⊂ UX ⊂ CX (về phạm vi) — usability và accessibility là các phẩm chất quan trọng nằm trong UX." />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="target"
            title="Hiểu và định hướng"
            items={[
              "Đã xác định rõ người dùng, mục tiêu và bối cảnh sử dụng.",
              "Đã phân biệt điều đã biết (có bằng chứng) với điều đang giả định.",
              "Đã xem xét trải nghiệm trước, trong và sau khi dùng — không chỉ một màn hình.",
              "Đã kiểm tra các tầng từ chiến lược đến bề mặt, không chỉ giao diện.",
              "Đã thiết kế cho trạng thái lỗi, ngoại lệ, đang tải và hủy bỏ.",
            ]}
          />
          <ChecklistColumn
            icon="check-circle"
            title="Kiểm chứng"
            items={[
              "Đã xét khả năng tiếp cận (accessibility) ngay từ đầu.",
              "Đã có tiêu chí thành công cụ thể, đo được, phù hợp mục tiêu.",
              "Đã kiểm chứng với người dùng thuộc nhóm mục tiêu.",
              "Không dùng dark pattern để đạt chỉ số ngắn hạn.",
              "Mọi kết luận “UX tốt hơn” đều có bằng chứng hoặc ghi rõ là giả thuyết.",
            ]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Accessibility", "Khả năng tiếp cận", "Đảm bảo mọi người đều có thể có trải nghiệm."],
            ["Journey Mapping", "Bản đồ hành trình", "Nhìn trải nghiệm qua nhiều kênh và cảm xúc theo thời gian."],
            ["Usability Testing", "Kiểm thử khả năng sử dụng", "Phương pháp kiểm chứng trải nghiệm với người dùng thật."],
            ["Information Architecture", "Kiến trúc thông tin", "Tầng cấu trúc giúp nội dung dễ tìm."],
            ["Customer Experience (CX)", "Trải nghiệm khách hàng", "Phạm vi rộng hơn UX, bao gồm toàn bộ tổ chức."],
            ["Cognitive Load", "Tải nhận thức", "Nỗ lực trí óc khi dùng sản phẩm, một yếu tố lớn của trải nghiệm."],
          ]}
        />
      </Section>
    </div>
  );
}

export const USER_EXPERIENCE: Article = {
  slug: "user-experience",
  version: 1,
  term: "User Experience (UX)",
  fn: 7,
  vi: "Trải nghiệm người dùng",
  kind: "Nguyên tắc / khái niệm",
  definition: "User Experience (UX) là toàn bộ cảm nhận và phản ứng của một người khi họ sử dụng — hoặc dự định sử dụng — một sản phẩm, hệ thống hay dịch vụ.",
  definitionMore:
    "UX bao gồm việc họ có làm được điều mình cần hay không, làm có dễ không, và họ cảm thấy thế nào (tin tưởng, thoải mái, bối rối hay bực bội) trước, trong và sau khi dùng. Hiểu UX giúp đội ngũ ra quyết định dựa trên con người thật đang dùng sản phẩm, thay vì chỉ dựa trên danh sách tính năng hay cảm tính nội bộ.",
  oneLine: "Cảm nhận và phản ứng của người dùng khi sử dụng hoặc dự định sử dụng một sản phẩm, hệ thống hay dịch vụ.",
  glance: [
    ["5 tầng", "Chiến lược đến bề mặt"],
    ["7 phẩm chất", "UX Honeycomb"],
  ],
  facts: [
    { label: "Nhóm chính", items: ["Nền tảng và nguyên tắc"] },
    { label: "Thẻ phụ", items: ["Nghiên cứu khám phá", "Kiểm thử và đánh giá", "Đo lường và phân tích"] },
    {
      label: "Lưu ý tên gọi",
      items: ["“UX Design” (thiết kế trải nghiệm người dùng) là hoạt động thiết kế, không đồng nghĩa với “UX”. “UI” và “Usability” là khái niệm khác (xem phần Phân biệt)."],
    },
  ],
  sections: SECTIONS,
  Body,
};
