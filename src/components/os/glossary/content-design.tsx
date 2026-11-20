"use client";

import { Blk, T } from "./edit";
import { CheckCard, CheckCards, Flow, InfoGrid, InOutCards, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Content Design — copy from ux-glossary/content-design.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "cycle", title: "Các bước và vòng lặp của content design", icon: "rotate" },
  { id: "roles", title: "Vai trò tham gia", icon: "users" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "evaluate", title: "Cách đánh giá nội dung", icon: "clipboard-check" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các cách tiếp cận gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** Before / after copy sample, quoted on the card. */
function Quote({ label, tone, children }: { label: string; tone: "bad" | "good"; children: React.ReactNode }) {
  return (
    <Blk label="thẻ" className={`flex flex-1 flex-col gap-4 rounded-[24px] p-7 ${tone === "bad" ? "bg-[var(--d-bad-soft)]" : "bg-[var(--d-soft)]"}`}>
      <div className="flex items-center gap-3">
        <Tile icon={tone === "bad" ? "x" : "check"} size={36} iconSize={18} radius={10} tone={tone === "bad" ? "bad" : "solid"} />
        <Eyebrow size={14} className={tone === "bad" ? "text-[var(--d-bad)]" : "text-[var(--d-accent)]"}>
          {label}
        </Eyebrow>
      </div>
      {children}
    </Blk>
  );
}

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Section {...S.problem}>
        <P>
          Nội dung thường được viết theo góc nhìn của tổ chức: điều tổ chức muốn nói, theo cấu trúc phòng ban, bằng thuật ngữ nội bộ. Người dùng lại đến với một câu hỏi cụ thể
          (“Tư vấn mất bao nhiêu tiền?”, “Tôi có đổi lịch được không?”) và muốn có câu trả lời nhanh. Khi nội dung không khớp nhu cầu, người dùng phải đọc nhiều, đoán nhiều, hoặc
          gọi điện hỏi. Chi phí đó rơi cả vào người dùng lẫn tổ chức.
        </P>
        <Eyebrow>Content design hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          minH={170}
          items={[
            ["check-circle", "Có cần nội dung này không", "Nội dung nào đáp ứng nhu cầu thật, nội dung nào chỉ để “cho có”."],
            ["component", "Hình thức nào phù hợp", "Văn bản, bảng, danh sách bước, công cụ tính, video, hay thay đổi thiết kế."],
            ["split", "Đặt ở đâu", "Trên trang nào, ở bước nào của luồng."],
            ["chat", "Viết thế nào", "Từ ngữ người dùng hiểu và tìm kiếm."],
          ]}
          last={["analytics", "Đo hiệu quả bằng gì", "Người dùng có làm được việc họ cần không."]}
        />
      </Section>

      <Section {...S.cycle}>
        <Table
          head={["Giai đoạn", "Hoạt động", "Đầu ra"]}
          widths={[340]}
          rows={[
            {
              icon: "binoculars",
              cells: ["1. Khám phá nhu cầu", "Nghiên cứu người dùng, xem từ khóa tìm kiếm, câu hỏi gửi về bộ phận hỗ trợ, dữ liệu analytics.", "Danh sách nhu cầu người dùng, ngôn ngữ họ dùng."],
            },
            {
              icon: "book",
              cells: ["2. Viết user story / job story cho nội dung", "Mô tả nhu cầu: “Là [ai], tôi cần [gì], để [mục đích]”.", "Câu chuyện nhu cầu, tiêu chí chấp nhận."],
            },
            { icon: "split", cells: ["3. Chọn hình thức và vị trí", "Quyết định nội dung nên là gì và ở đâu trong hành trình.", "Bản phác thảo cấu trúc, vị trí trong luồng."] },
            { icon: "pencil", cells: ["4. Viết và thiết kế", "Viết rõ ràng, ngắn, chủ động, trước hết là thông tin quan trọng nhất.", "Bản nháp nội dung trong ngữ cảnh giao diện."] },
            {
              icon: "shield-alert",
              cells: ["5. Rà soát", "Rà soát cùng chuyên gia nghiệp vụ, pháp lý; giữ nguyên ý đúng mà không làm mất sự rõ ràng.", "Nội dung đã được xác nhận về độ chính xác."],
            },
            { icon: "users", cells: ["6. Kiểm thử", "Kiểm thử với người dùng: họ có tìm thấy, hiểu và làm được không.", "Danh sách điều chỉnh."] },
            { icon: "analytics", cells: ["7. Xuất bản và theo dõi", "Theo dõi tìm kiếm, phản hồi, câu hỏi hỗ trợ.", "Dữ liệu cho vòng cải tiến tiếp theo."] },
          ]}
        />
        <Flow
          title="Vòng lặp content design"
          icon="rotate"
          wrap
          steps={["Khám phá nhu cầu", "Câu chuyện nhu cầu", "Hình thức & vị trí", "Viết", "Rà soát", "Kiểm thử", "Xuất bản", "Theo dõi & cải tiến"]}
          on={[0]}
          soft={[7]}
          note="Các giai đoạn nối thành vòng tròn: sau khi xuất bản và theo dõi, nhóm quay lại khám phá nhu cầu."
        />
        <Subhead icon="pencil">Nguyên tắc viết thường dùng</Subhead>
        <InfoGrid
          items={[
            ["target", "Quan trọng nhất trước", "Câu trả lời cho nhu cầu chính ở đầu; chi tiết sau."],
            ["chat", "Từ ngữ của người dùng", "Dùng từ người dùng tìm kiếm và nói, không dùng thuật ngữ nội bộ."],
            ["play-circle", "Ngắn và chủ động", "Câu ngắn, động từ chủ động, mỗi câu một ý."],
            ["list", "Dễ đọc lướt", "Tiêu đề mô tả, danh sách, bảng khi so sánh."],
          ]}
          last={["arrows", "Hướng dẫn hành động", "Nói rõ người dùng cần làm gì tiếp theo."]}
        />
      </Section>

      <Section {...S.roles}>
        <Table
          head={["Vai trò", "Đóng góp"]}
          widths={[420]}
          rows={[
            { icon: "pencil", highlight: true, cells: ["Content designer", "Dẫn dắt quy trình: nghiên cứu nhu cầu, quyết định hình thức, viết, kiểm thử."] },
            { icon: "book", cells: ["Chuyên gia nghiệp vụ (subject matter expert)", "Đảm bảo nội dung chính xác."] },
            { icon: "component", cells: ["Product / UX designer", "Phối hợp nội dung với luồng và giao diện."] },
            { icon: "binoculars", cells: ["Researcher", "Cung cấp dữ liệu nhu cầu, kiểm thử nội dung."] },
            { icon: "shield-alert", cells: ["Pháp lý, tuân thủ", "Rà soát yêu cầu bắt buộc."] },
          ]}
        />
        <Callout tone="note">Theo cách tiếp cận này, content designer tham gia từ đầu dự án, không chỉ “điền chữ” vào thiết kế đã xong.</Callout>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "target",
              "Bối cảnh phù hợp",
              [
                "Sản phẩm hoặc dịch vụ mà người dùng cần hiểu thông tin để hành động (dịch vụ công, tài chính, y tế, đặt lịch, chính sách).",
                "Bộ phận hỗ trợ nhận nhiều câu hỏi lặp lại mà câu trả lời đã “có trên website”.",
                "Nội dung lớn, nhiều người viết, thiếu nhất quán.",
                "Xây mới hoặc tổ chức lại trang web.",
              ],
            ],
            [
              "eye",
              "Dấu hiệu nhận biết",
              [
                "Trang có nhiều chữ nhưng người dùng vẫn không tìm ra câu trả lời.",
                "Nội dung được viết bằng thuật ngữ nội bộ.",
                "Nội dung được thêm vào cuối dự án, sau khi giao diện đã xong.",
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
            {
              icon: "lightbulb",
              cells: ["Nội dung sáng tạo thuần thương hiệu (chiến dịch quảng cáo)", "Mục tiêu chính là cảm xúc, nhận diện, không phải đáp ứng nhu cầu tác vụ.", "Copywriting; vẫn có thể dùng nguyên tắc rõ ràng."],
            },
            { icon: "shield-alert", cells: ["Văn bản pháp lý bắt buộc giữ nguyên", "Không được thay đổi câu chữ.", "Thêm tóm tắt dễ hiểu đi kèm, nếu được phép."] },
            { icon: "pencil", cells: ["Chỉ cần sửa một vài nhãn nút", "Quy trình đầy đủ là quá mức cần thiết.", "UX writing trực tiếp, kiểm thử nhanh."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            [
              "Thu thập bằng chứng về nhu cầu.",
              "Từ khóa tìm kiếm trên trang và công cụ tìm kiếm, câu hỏi gửi bộ phận hỗ trợ, phỏng vấn, analytics.",
              "Danh sách nhu cầu, xếp theo tần suất và tầm quan trọng.",
            ],
            [
              "Viết câu chuyện nhu cầu cho từng nội dung.",
              "Ví dụ: “Là khách hàng lần đầu, tôi cần biết chi phí tư vấn trước khi để lại thông tin, để quyết định có đặt lịch không.”",
              "Câu chuyện nhu cầu và tiêu chí chấp nhận.",
            ],
            ["Chọn hình thức và vị trí.", "Hỏi: nội dung này giúp người dùng ở bước nào? Văn bản có phải hình thức tốt nhất không?", "Quyết định hình thức, vị trí trong luồng."],
            ["Viết bản nháp trong ngữ cảnh.", "Viết trực tiếp trên thiết kế hoặc prototype, không viết rời trong tài liệu.", "Nội dung trong prototype."],
            ["Rà soát cùng chuyên gia.", "Dùng pair writing nếu được.", "Nội dung chính xác và rõ ràng."],
            ["Kiểm thử với người dùng.", "Kiểm tra người dùng có tìm thấy, hiểu đúng và hành động được không.", "Nội dung đã điều chỉnh."],
            ["Xuất bản, theo dõi và cải tiến.", "Theo dõi tìm kiếm, phản hồi và câu hỏi hỗ trợ sau khi xuất bản.", "Chỉ số theo dõi, lịch rà soát nội dung định kỳ."],
          ]}
        />
      </Section>

      <Section {...S.evaluate}>
        <Table
          head={["Cách đánh giá", "Phát hiện được", "Khi nào dùng"]}
          widths={[340]}
          rows={[
            { icon: "users", cells: ["Usability testing với tác vụ cần thông tin", "Người dùng có tìm thấy và hiểu đúng không.", "Trước khi xuất bản nội dung quan trọng."] },
            { icon: "pencil", cells: ["Highlighter test", "Người tham gia đánh dấu phần giúp họ (một màu) và phần gây khó hiểu (màu khác).", "Kiểm tra nhanh một đoạn nội dung."] },
            { icon: "check-circle", cells: ["Kiểm tra hiểu đúng (comprehension check)", "Đặt câu hỏi về nội dung sau khi đọc.", "Nội dung có hậu quả nếu hiểu sai (chính sách, chi phí)."] },
            { icon: "list-search", cells: ["Dữ liệu tìm kiếm và hỗ trợ", "Câu hỏi còn lặp lại sau khi xuất bản.", "Theo dõi liên tục."] },
            { icon: "analytics", cells: ["Analytics", "Người dùng có đi tiếp sau khi đọc không.", "Theo dõi liên tục; không giải thích nguyên nhân."] },
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={[
            "Bằng chứng về nhu cầu (tìm kiếm, câu hỏi hỗ trợ, nghiên cứu).",
            "Thông tin nghiệp vụ chính xác.",
            "Hướng dẫn phong cách (style guide) nếu có.",
            "Bối cảnh luồng và giao diện.",
          ]}
          outputs={["Câu chuyện nhu cầu cho nội dung.", "Nội dung đã kiểm thử, đặt đúng vị trí.", "Quyết định loại bỏ nội dung không cần thiết.", "Chỉ số theo dõi và lịch rà soát."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối luồng đặt lịch tư vấn. Không phải dự án đã triển khai.</Scenario>
        <CheckCard
          icon="binoculars"
          title="Bằng chứng (giả định)"
          mark="•"
          items={[
            "Câu hỏi phổ biến nhất gửi về hỗ trợ: “Tư vấn mất phí không?” và “Đổi lịch thế nào?”.",
            "Phỏng vấn cho thấy khách lo về chi phí trước khi để lại thông tin.",
            "Trang “Câu hỏi thường gặp” có câu trả lời, nhưng ít người tìm tới.",
          ]}
        />
        <div className="flex items-stretch gap-4">
          <Quote label="Trước — theo góc nhìn tổ chức" tone="bad">
            <T as="p" className="text-[18px] leading-7 text-[var(--w-secondary)]">
              “Chúng tôi tự hào mang đến dịch vụ tư vấn chuyên nghiệp với đội ngũ giàu kinh nghiệm. Vui lòng xem mục Câu hỏi thường gặp để biết thêm về chính sách.”
            </T>
          </Quote>
          <Quote label="Sau — theo nhu cầu, ngay trong form" tone="good">
            <T as="p" className="text-[20px] leading-7 font-semibold">
              Buổi tư vấn đầu tiên: miễn phí, 30 phút.
            </T>
            <T as="p" className="text-[18px] leading-7">
              Bạn có thể đổi hoặc hủy lịch đến 24 giờ trước buổi hẹn, trong mục Lịch hẹn của tôi.
            </T>
          </Quote>
        </div>
        <Callout tone="note">Nội dung trên là ví dụ minh họa; chính sách thật (mức phí, thời hạn đổi lịch) phải lấy từ nghiệp vụ.</Callout>
        <InfoCard
          icon="check-circle"
          tone="fill"
          title="Quyết định"
          body="Đưa hai thông tin quan trọng nhất vào ngay bước đặt lịch; kiểm thử bằng comprehension check; theo dõi số câu hỏi về chi phí gửi về hỗ trợ sau khi xuất bản."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Thêm nội dung vào cuối dự án", "Giao diện đã khóa, nội dung phải nhồi vào chỗ không phù hợp.", "Đưa content design vào từ giai đoạn khám phá."],
            ["Viết theo cấu trúc tổ chức", "Người dùng không biết sơ đồ tổ chức.", "Cấu trúc theo nhu cầu và tác vụ."],
            ["Dùng lorem ipsum khi thiết kế", "Thiết kế không phản ánh độ dài và cấu trúc thật.", "Thiết kế với nội dung thật hoặc gần thật."],
            ["Cái gì cũng giải thích bằng văn bản", "Có khi một bảng, một công cụ hay thay đổi luồng hiệu quả hơn.", "Chọn hình thức theo nhu cầu."],
            ["Rà soát làm mất sự rõ ràng", "Mỗi người thêm một câu “cho chắc”.", "Rà soát theo câu chuyện nhu cầu; dùng pair writing."],
            ["Không theo dõi sau xuất bản", "Nội dung lỗi thời, sai dần theo thời gian.", "Có chủ sở hữu và lịch rà soát."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Cách tiếp cận", "Trọng tâm", "Phạm vi"]}
          widths={[280]}
          rows={[
            {
              icon: "pencil",
              highlight: true,
              cells: ["Content Design", "Đáp ứng nhu cầu bằng nội dung đúng, ở dạng đúng, đúng chỗ.", "Từ nghiên cứu nhu cầu đến đo lường; có thể quyết định không cần nội dung."],
            },
            { icon: "chat", cells: ["UX Writing", "Chữ trong giao diện: nhãn, nút, thông báo, hướng dẫn.", "Thường hẹp hơn, tập trung vào microcopy."] },
            { icon: "component", cells: ["Microcopy", "Những đoạn chữ ngắn trong giao diện.", "Một phần sản phẩm của content design."] },
            { icon: "lightbulb", cells: ["Copywriting", "Thuyết phục, bán hàng, xây dựng thương hiệu.", "Mục tiêu marketing."] },
            { icon: "book", cells: ["Content Strategy", "Kế hoạch dài hạn về nội dung: quản trị, quy trình, mục tiêu.", "Cấp chiến lược; content design là phần thực thi."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <ChecklistColumn
          icon="clipboard-check"
          title="Rà soát nội dung"
          items={[
            "Mỗi nội dung gắn với một nhu cầu người dùng có bằng chứng.",
            "Thông tin quan trọng nhất ở đầu.",
            "Dùng từ ngữ người dùng tìm kiếm và hiểu.",
            "Hình thức phù hợp (văn bản, bảng, danh sách bước, công cụ).",
            "Nội dung được đặt ở đúng bước người dùng cần.",
            "Đã rà soát độ chính xác với chuyên gia nghiệp vụ.",
            "Đã kiểm thử người dùng tìm thấy, hiểu và hành động được.",
            "Có chủ sở hữu và lịch rà soát sau xuất bản.",
          ]}
        />
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Microcopy", "Vi văn bản", "Một phần sản phẩm của content design."],
            ["Information Architecture", "Kiến trúc thông tin", "Nơi nội dung được tổ chức và tìm thấy."],
            ["Cognitive Load", "Tải nhận thức", "Nội dung rõ ràng, đúng chỗ giúp giảm tải."],
            ["Card Sorting", "Phân loại thẻ", "Tìm từ ngữ và cách nhóm của người dùng."],
            ["Usability Testing", "Kiểm thử khả năng sử dụng", "Cách kiểm thử nội dung."],
            ["Accessibility", "Khả năng tiếp cận", "Nội dung dễ hiểu là một phần của khả năng tiếp cận."],
            ["Customer Journey", "Hành trình khách hàng", "Xác định nội dung cần ở giai đoạn nào."],
          ]}
        />
      </Section>
    </div>
  );
}

export const CONTENT_DESIGN: Article = {
  slug: "content-design",
  version: 1,
  term: "Content Design",
  fn: 4,
  vi: "Thiết kế nội dung",
  kind: "Quy trình / cách tiếp cận",
  definition:
    "Content design là cách tiếp cận thiết kế nội dung bắt đầu từ nhu cầu của người dùng và dựa trên dữ liệu: xác định người dùng cần biết hoặc làm gì, rồi chọn nội dung, hình thức và vị trí phù hợp nhất để đáp ứng nhu cầu đó.",
  definitionMore:
    "Kết quả có thể là một đoạn văn, một bảng, một công cụ tính, một biểu mẫu, hoặc quyết định không cần nội dung nào. Content design coi nội dung là một phần của trải nghiệm, được nghiên cứu, kiểm thử và cải tiến như mọi phần thiết kế khác.",
  oneLine: "Thiết kế nội dung từ nhu cầu người dùng: chọn đúng thông tin, đúng hình thức, đúng vị trí.",
  glance: [
    ["7", "Giai đoạn trong vòng lặp"],
    ["GOV.UK", "Nơi cách tiếp cận được định hình"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["UX writing (gần nghĩa nhưng phạm vi hẹp hơn)"] },
    { label: "Nhóm chính", items: ["Cấu trúc và thiết kế"] },
    { label: "Thẻ phụ", items: ["Quy trình và vận hành", "Nghiên cứu khám phá"] },
    {
      label: "Lưu ý tên gọi",
      items: ["Được định hình qua công việc của Sarah Winters (Richards) tại GOV.UK. Không chỉ là viết chữ đẹp: là quyết định nội dung gì, ở dạng nào, ở đâu."],
    },
  ],
  sections: SECTIONS,
  Body,
};
