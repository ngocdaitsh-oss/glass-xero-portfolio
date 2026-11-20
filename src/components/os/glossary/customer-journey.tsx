"use client";

import { Blk, T } from "./edit";
import { CheckCards, InfoGrid, InOutCards, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Customer Journey — copy from ux-glossary/customer-journey.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "parts", title: "Cơ chế: các thành phần của một hành trình", icon: "component" },
  { id: "seams", title: "Biểu hiện: hành trình liền mạch và đứt gãy", icon: "eye" },
  { id: "when", title: "Khi nào cần nhìn theo hành trình", icon: "check-circle" },
  { id: "limits", title: "Giới hạn: khi nào góc nhìn hành trình chưa đủ", icon: "shield-alert" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "evaluate", title: "Cách đánh giá một hành trình", icon: "clipboard-check" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** Stages as columns with touchpoints, and an emotion line that rises with reassurance and dips at pain points. */
function EmotionCurve() {
  const stages: { name: string; touch: string; mood: number; note: string }[] = [
    { name: "Tìm hiểu", touch: "Tìm kiếm", mood: 0, note: "tò mò" },
    { name: "Cân nhắc", touch: "Trang dịch vụ, đánh giá", mood: -1, note: "lo về phí" },
    { name: "Đặt lịch", touch: "Form, email", mood: 1, note: "an tâm khi xác nhận" },
    { name: "Tư vấn", touch: "Tư vấn viên", mood: -1.4, note: "phải kể lại từ đầu" },
    { name: "Sau tư vấn", touch: "Email (nếu có)", mood: -0.6, note: "không biết bước tiếp theo" },
  ];
  const W = 1000;
  const H = 180;
  const x = (i: number) => (i + 0.5) * (W / stages.length);
  const y = (m: number) => H / 2 - m * 52;
  const path = stages.map((s, i) => `${i ? "L" : "M"}${x(i)},${y(s.mood)}`).join(" ");
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="analytics" size={36} iconSize={18} radius={10} />
        <Eyebrow>Giai đoạn, điểm chạm và đường cảm xúc</Eyebrow>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {stages.map((s) => (
          <div key={s.name} className="flex flex-col gap-2">
            <span className="rounded-xl bg-[var(--d-fill)] px-3 py-2.5 text-center text-white">
              <T className="text-[16px] leading-6 font-semibold">{s.name}</T>
            </span>
            <span className="rounded-xl bg-[var(--d-well)] px-3 py-2 text-center">
              <T className="text-[14px] leading-5 text-[var(--w-secondary)]">{s.touch}</T>
            </span>
          </div>
        ))}
      </div>
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-[180px] w-full text-[var(--d-accent)]" preserveAspectRatio="none" aria-hidden>
          <line x1="0" x2={W} y1={H / 2} y2={H / 2} stroke="var(--d-line)" strokeWidth="1" strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
          <path d={path} fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
        {stages.map((s, i) => (
          <div
            key={s.name}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
            style={{ left: `${(x(i) / W) * 100}%`, top: `${(y(s.mood) / H) * 100}%` }}
          >
            <span className={`size-4 rounded-full ring-4 ring-[var(--w-card)] ${s.mood < -1 || s.mood === -1 ? "bg-[var(--d-bad)]" : "bg-[var(--d-accent)]"}`} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-3">
        {stages.map((s) => (
          <T key={s.name} className={`text-center text-[14px] leading-5 ${s.mood <= -1 ? "font-semibold text-[var(--d-bad)]" : "text-[var(--w-muted)]"}`}>
            {s.note}
          </T>
        ))}
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Các giai đoạn xếp thành cột theo thời gian. Đường cảm xúc đi lên khi khách an tâm, đi xuống khi gặp khó. Những điểm thấp nhất là ứng viên ưu tiên cải thiện.
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
            Tổ chức thường được chia theo chức năng: marketing, bán hàng, sản phẩm, vận hành, hỗ trợ. Mỗi bộ phận nhìn thấy một đoạn của trải nghiệm và tối ưu đoạn đó. Khách hàng
            thì trải qua toàn bộ, theo thứ tự thời gian, và nhớ nhất những lúc bị bỏ rơi ở chỗ chuyển tiếp.
          </P>
          <P strong>
            Góc nhìn hành trình chuyển câu hỏi từ “bộ phận tôi làm tốt chưa?” sang “khách đang cố làm gì, và họ trải qua điều gì từ đầu đến cuối?”
          </P>
        </div>
        <Eyebrow>Hiểu customer journey hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          minH={170}
          items={[
            ["target", "Điểm chạm nào quan trọng nhất", "Với mục tiêu của khách."],
            ["split", "Khoảng đứt gãy nằm ở đâu", "Nhất là giữa các kênh và bộ phận."],
            ["bar-chart", "Ưu tiên cải tiến", "Theo mức ảnh hưởng đến cảm nhận của khách."],
            ["users", "Ai chịu trách nhiệm", "Cho từng giai đoạn."],
          ]}
          last={["chat", "Nội dung và hỗ trợ nào cần có", "Ở từng giai đoạn."]}
        />
      </Section>

      <Section {...S.parts}>
        <Table
          head={["Thành phần", "Ý nghĩa", "Ví dụ (tình huống dịch vụ tư vấn, giả định)"]}
          widths={[260]}
          rows={[
            { icon: "users", cells: ["Nhân vật (actor)", "Ai đang đi hành trình; thường là một persona hoặc nhóm khách cụ thể.", "Khách hàng lần đầu tìm dịch vụ tư vấn."] },
            { icon: "target", cells: ["Mục tiêu và kịch bản", "Khách muốn đạt điều gì, trong tình huống nào.", "Được tư vấn để quyết định có dùng dịch vụ hay không."] },
            { icon: "split", cells: ["Giai đoạn (stages)", "Các phần lớn của hành trình.", "Tìm hiểu → Cân nhắc → Đặt lịch → Tư vấn → Sau tư vấn."] },
            { icon: "play-circle", cells: ["Hành động", "Khách làm gì ở mỗi giai đoạn.", "Tìm kiếm, so sánh, đọc đánh giá, đặt lịch, đến buổi hẹn."] },
            { icon: "link", cells: ["Điểm chạm và kênh", "Nơi khách tương tác với tổ chức hoặc bên liên quan.", "Kết quả tìm kiếm, trang dịch vụ, form, email, tư vấn viên."] },
            { icon: "chat", cells: ["Suy nghĩ và cảm xúc", "Khách nghĩ gì, cảm thấy gì, lo lắng điều gì.", "“Không biết có mất phí không”, an tâm khi nhận xác nhận."] },
            { icon: "lightbulb", cells: ["Điểm đau và cơ hội", "Chỗ khách gặp khó, chỗ có thể cải thiện.", "Phải đọc lại thông tin khi gặp tư vấn viên."] },
          ]}
        />
        <EmotionCurve />
      </Section>

      <Section {...S.seams}>
        <PairCards
          icon={null}
          first="Đứt gãy"
          second="Liền mạch hơn"
          items={[
            ["Quảng cáo → trang đích: lời hứa đầu tiên định hình kỳ vọng", "Quảng cáo nói “miễn phí”, trang không nhắc tới phí.", "Thông điệp nhất quán."],
            ["Online → tư vấn viên: khách ghét phải lặp lại", "Tư vấn viên không thấy thông tin khách đã nhập.", "Thông tin đi theo khách qua các kênh."],
            ["Đặt lịch → trước buổi hẹn: khoảng “im lặng” làm giảm cam kết", "Không có nhắc lịch; khách quên.", "Nhắc lịch, hướng dẫn chuẩn bị."],
            ["Buổi tư vấn → sau tư vấn: kết thúc ảnh hưởng mạnh tới cảm nhận", "Không có tóm tắt hay bước tiếp theo.", "Gửi tóm tắt, hướng dẫn quyết định."],
            ["Gặp sự cố: cách xử lý quyết định niềm tin", "Phải gọi tổng đài giờ hành chính để đổi lịch.", "Đổi lịch tự phục vụ."],
          ]}
        />
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "target",
              "Bối cảnh phù hợp",
              [
                "Trải nghiệm trải qua nhiều kênh, nhiều bộ phận, nhiều ngày hoặc tuần.",
                "Cần thống nhất cách hiểu giữa các bộ phận về trải nghiệm của khách.",
                "Thiết kế dịch vụ mới hoặc cải tổ dịch vụ hiện có.",
                "Chỉ số từng bộ phận tốt nhưng khách vẫn không hài lòng.",
              ],
            ],
            [
              "eye",
              "Dấu hiệu nhận biết",
              ["Không ai mô tả được hành trình từ đầu đến cuối của khách.", "Vấn đề lặp lại ở chỗ giao giữa hai bộ phận.", "Các dự án cải tiến chồng chéo nhau."],
            ],
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["split", "Hành trình là mô hình đơn giản hóa", "Khách thật không đi theo một đường thẳng; họ quay lại, bỏ dở, đi qua kênh không dự kiến."],
            ["users", "Một hành trình chỉ đại diện cho một nhóm khách và một mục tiêu", "Khách khác nhau có hành trình khác nhau."],
            ["alert", "Hành trình dựa trên giả định nội bộ dễ sai", "Cần dữ liệu nghiên cứu."],
            ["target", "Hiểu hành trình chưa phải là cải thiện", "Cần chủ sở hữu và hành động."],
          ]}
          last={["component", "Không thay thế phân tích chi tiết", "Vấn đề của một màn hình vẫn cần usability testing, user flow."]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Chọn nhân vật và mục tiêu.", "Một nhóm khách, một mục tiêu, một kịch bản cụ thể.", "Phạm vi hành trình."],
            [
              "Thu thập dữ liệu.",
              "Phỏng vấn, contextual inquiry, dữ liệu hỗ trợ khách hàng, clickstream analysis, khảo sát (CES, NPS).",
              "Bằng chứng về hành động, điểm chạm, cảm xúc.",
            ],
            ["Xác định giai đoạn và điểm chạm.", "Chia hành trình thành các giai đoạn lớn và liệt kê điểm chạm ở mỗi giai đoạn.", "Khung hành trình."],
            ["Ghi lại suy nghĩ, cảm xúc, điểm đau.", "Dựa trên dữ liệu, không dựa trên phỏng đoán.", "Hành trình hiện tại (current state)."],
            ["Thể hiện thành journey map.", "Xem bài Journey Mapping.", "Tài liệu chia sẻ được."],
            ["Xác định cơ hội, chủ sở hữu và chỉ số.", "Gắn mỗi cơ hội với người chịu trách nhiệm và cách đo.", "Kế hoạch cải tiến theo giai đoạn."],
          ]}
        />
      </Section>

      <Section {...S.evaluate}>
        <Table
          head={["Cách đánh giá", "Cho biết", "Lưu ý"]}
          widths={[380]}
          rows={[
            { icon: "filter", cells: ["Chỉ số theo giai đoạn (tỷ lệ chuyển tiếp, tỷ lệ bỏ dở)", "Khách rời hành trình ở đâu.", "Dữ liệu hành vi; không giải thích nguyên nhân."] },
            { icon: "gauge", cells: ["CES tại điểm chạm", "Mức nỗ lực tại từng tương tác.", "Gắn với điểm chạm cụ thể."] },
            { icon: "users", cells: ["NPS, CSAT tổng thể", "Cảm nhận chung sau hành trình.", "Không chỉ ra giai đoạn cụ thể."] },
            { icon: "alert", cells: ["Số lần liên hệ lại, khiếu nại theo giai đoạn", "Điểm đứt gãy gây chi phí.", "Cần phân loại thống nhất."] },
            { icon: "chat", cells: ["Nghiên cứu định tính", "Lý do và cảm xúc.", "Cần để giải thích số liệu."] },
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Nhân vật, mục tiêu, kịch bản.", "Dữ liệu nghiên cứu và vận hành.", "Danh sách kênh và bộ phận liên quan."]}
          outputs={[
            "Mô tả hành trình hiện tại, thường dưới dạng journey map.",
            "Danh sách điểm đau và cơ hội theo giai đoạn.",
            "Chủ sở hữu và chỉ số cho từng giai đoạn.",
            "(Khi cần) Hành trình mong muốn (future state).",
          ]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard icon="users" title="Nhân vật và mục tiêu" body="Khách hàng lần đầu muốn được tư vấn để quyết định có dùng dịch vụ." />
        <Table
          head={["Giai đoạn", "Hành động", "Điểm chạm", "Cảm xúc", "Điểm đau", "Cơ hội"]}
          widths={[170]}
          rows={[
            { cells: ["Tìm hiểu", "Tìm kiếm, đọc trang dịch vụ", "Kết quả tìm kiếm, website", "Tò mò", "Không rõ dịch vụ khác nhau thế nào", "Bảng so sánh dịch vụ"] },
            {
              highlight: true,
              cells: [
                "Cân nhắc",
                "Tìm thông tin phí, đọc đánh giá",
                "Website, trang đánh giá",
                "Lo lắng về chi phí",
                "Thông tin phí nằm ở trang hỏi đáp",
                "Nêu phí ngay tại trang dịch vụ (content design)",
              ],
            },
            { cells: ["Đặt lịch", "Chọn giờ, nhập thông tin", "Form, email xác nhận", "An tâm khi được xác nhận", "Khó đổi lịch", "Đổi lịch tự phục vụ"] },
            {
              highlight: true,
              cells: ["Tư vấn", "Gặp tư vấn viên", "Tư vấn viên", "Bực vì phải kể lại", "Tư vấn viên không có thông tin form", "Chuyển thông tin form cho tư vấn viên"],
            },
            { cells: ["Sau tư vấn", "Cân nhắc quyết định", "Không có", "Không chắc bước tiếp theo", "Không có tóm tắt", "Email tóm tắt và bước tiếp theo"] },
          ]}
        />
        <InfoCard
          icon="check-circle"
          tone="fill"
          title="Quyết định"
          body="Ưu tiên hai điểm thấp nhất trên đường cảm xúc là “Tư vấn” và “Cân nhắc”. Mỗi giai đoạn được gán chủ sở hữu, kèm chỉ số theo dõi."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Vẽ hành trình theo quy trình nội bộ", "Phản ánh cách tổ chức làm việc, không phải điều khách trải qua.", "Bắt đầu từ mục tiêu và hành động của khách."],
            ["Không dựa trên dữ liệu", "Hành trình thành giả định có hình thức đẹp.", "Dựa trên nghiên cứu; ghi rõ phần nào là giả định."],
            ["Một hành trình cho mọi khách", "Che giấu khác biệt giữa các nhóm khách.", "Một hành trình cho mỗi nhân vật và mục tiêu quan trọng."],
            ["Nhầm customer journey với user flow", "User flow chỉ là các bước trong sản phẩm.", "Dùng user flow cho chi tiết tương tác, hành trình cho bức tranh toàn cảnh."],
            ["Làm xong bản đồ rồi cất đi", "Không tạo ra thay đổi.", "Gắn chủ sở hữu, chỉ số và kế hoạch hành động."],
            ["Bỏ qua giai đoạn sau khi mua", "Phần kết của hành trình ảnh hưởng mạnh tới cảm nhận và giới thiệu.", "Bao gồm hỗ trợ, sử dụng, quay lại."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Phạm vi", "Trả lời câu hỏi"]}
          widths={[320]}
          rows={[
            { icon: "split", highlight: true, cells: ["Customer Journey", "Toàn bộ hành trình qua mọi kênh, theo thời gian.", "“Khách trải qua điều gì từ đầu đến cuối?”"] },
            { icon: "book", cells: ["Journey Mapping / Journey Map", "Hoạt động và tài liệu mô tả hành trình.", "“Thể hiện hành trình thế nào để cả nhóm cùng hiểu?”"] },
            { icon: "component", cells: ["User Flow", "Các bước tương tác trong một sản phẩm để hoàn thành một tác vụ.", "“Người dùng đi qua những màn hình và nhánh nào?”"] },
            {
              icon: "users",
              cells: ["Customer Experience", "Tổng thể cảm nhận về tổ chức.", "“Khách cảm nhận về tổ chức thế nào?” — hành trình là cách phân tích CX."],
            },
            {
              icon: "list",
              cells: ["Service Blueprint", "Hành trình của khách cộng với hoạt động hậu trường và hệ thống hỗ trợ.", "“Tổ chức cần làm gì phía sau để hành trình diễn ra?”"],
            },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <ChecklistColumn
          icon="clipboard-check"
          title="Rà soát hành trình"
          items={[
            "Đã xác định rõ nhân vật, mục tiêu và kịch bản.",
            "Hành trình dựa trên dữ liệu nghiên cứu, phần giả định được ghi rõ.",
            "Bao gồm cả giai đoạn trước và sau khi mua.",
            "Ghi lại điểm chạm ngoài tầm kiểm soát trực tiếp (đánh giá, đối tác).",
            "Có suy nghĩ, cảm xúc và điểm đau ở từng giai đoạn.",
            "Mỗi giai đoạn có chủ sở hữu và chỉ số.",
            "Hành trình được dùng để ra quyết định, không chỉ để trưng bày.",
          ]}
        />
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Journey Mapping", "Lập bản đồ hành trình", "Hoạt động và tài liệu thể hiện hành trình."],
            ["User Flow", "Luồng tương tác của người dùng", "Chi tiết tương tác trong một giai đoạn."],
            ["Customer Experience", "Trải nghiệm khách hàng", "Hành trình là cách phân tích CX."],
            ["User Persona", "Chân dung người dùng", "Nhân vật của hành trình."],
            ["Service Design", "Thiết kế dịch vụ", "Thiết kế cả phần hậu trường của hành trình."],
            ["Contextual Inquiry", "Phỏng vấn tại bối cảnh", "Nguồn dữ liệu để xây hành trình."],
            ["Diary Study", "Nghiên cứu nhật ký", "Thấy hành trình thật diễn ra qua nhiều ngày."],
            ["Clickstream Analysis", "Phân tích luồng nhấp", "Dữ liệu hành vi cho các giai đoạn số."],
            ["Customer Effort Score (CES)", "Điểm nỗ lực khách hàng", "Chỉ số tại từng điểm chạm."],
          ]}
        />
      </Section>
    </div>
  );
}

export const CUSTOMER_JOURNEY: Article = {
  slug: "customer-journey",
  version: 1,
  term: "Customer Journey",
  fn: 2,
  vi: "Hành trình khách hàng",
  kind: "Nguyên tắc / khái niệm",
  definition:
    "Customer journey là chuỗi giai đoạn, hành động, điểm chạm và cảm xúc mà một khách hàng trải qua khi theo đuổi một mục tiêu với tổ chức, từ lúc nhận ra nhu cầu đến sau khi nhu cầu được đáp ứng.",
  definitionMore:
    "Hành trình đi qua nhiều kênh (website, tổng đài, cửa hàng, email) và nhiều bộ phận, kể cả những điểm chạm tổ chức không trực tiếp kiểm soát. Nhìn trải nghiệm theo hành trình giúp tổ chức thấy điều khách thực sự trải qua, thay vì chỉ thấy phần việc của từng bộ phận.",
  oneLine: "Chuỗi giai đoạn, điểm chạm và cảm xúc khách trải qua khi theo đuổi một mục tiêu với tổ chức.",
  glance: [
    ["7", "Thành phần của một hành trình"],
    ["1", "Nhân vật + 1 mục tiêu mỗi hành trình"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["User journey (khi nói về người dùng một sản phẩm)"] },
    { label: "Nhóm chính", items: ["Tổng hợp và mô hình hóa"] },
    { label: "Thẻ phụ", items: ["Nền tảng và nguyên tắc", "Nghiên cứu khám phá"] },
    {
      label: "Lưu ý tên gọi",
      items: ["Customer journey là hành trình thật; journey mapping là hoạt động và journey map là tài liệu mô tả nó. User flow chỉ mô tả các bước trong một sản phẩm, hẹp hơn nhiều."],
    },
  ],
  sections: SECTIONS,
  Body,
};

export const USER_JOURNEY: Article = { ...CUSTOMER_JOURNEY, slug: "user-journey", term: "User Journey" };
