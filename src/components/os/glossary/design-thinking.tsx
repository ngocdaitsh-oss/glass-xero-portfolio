"use client";

import { Blk, T } from "./edit";
import { CheckCards, InfoGrid, InOutCards, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Design Thinking — copy from ux-glossary/design-thinking.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "stages", title: "Các giai đoạn và vòng lặp", icon: "rotate" },
  { id: "roles", title: "Vai trò tham gia", icon: "users" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "evaluate", title: "Cách đánh giá", icon: "gauge" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các cách tiếp cận gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** Design Council's Double Diamond: two diverge → converge shapes, with the loop back from testing. */
function DoubleDiamond() {
  const phase = "fill-[var(--w-muted)] font-mono text-[13px] tracking-[0.6px]";
  const label = "fill-[var(--w-text)] text-[16px] font-semibold";
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="split" size={36} iconSize={18} radius={10} />
        <Eyebrow>Double Diamond</Eyebrow>
      </div>
      <svg viewBox="0 0 1000 300" className="w-full" role="img" aria-label="Hai hình thoi: khám phá rồi xác định vấn đề, phát triển rồi bàn giao giải pháp">
        <polygon points="80,140 290,40 500,140 290,240" className="fill-[var(--d-soft)]" />
        <polygon points="500,140 710,40 920,140 710,240" className="fill-[var(--d-well)]" />
        <line x1="290" y1="40" x2="290" y2="240" className="stroke-[var(--w-card)]" strokeWidth="3" />
        <line x1="710" y1="40" x2="710" y2="240" className="stroke-[var(--w-card)]" strokeWidth="3" />
        <text x="185" y="146" textAnchor="middle" className={label}>Khám phá</text>
        <text x="395" y="146" textAnchor="middle" className={label}>Xác định</text>
        <text x="605" y="146" textAnchor="middle" className={label}>Phát triển</text>
        <text x="815" y="146" textAnchor="middle" className={label}>Bàn giao</text>
        <text x="290" y="24" textAnchor="middle" className={phase}>ĐÚNG VẤN ĐỀ</text>
        <text x="710" y="24" textAnchor="middle" className={phase}>ĐÚNG GIẢI PHÁP</text>
        <circle cx="80" cy="140" r="9" className="fill-[var(--w-muted)]" />
        <circle cx="500" cy="140" r="11" className="fill-[var(--d-fill)]" />
        <circle cx="920" cy="140" r="11" className="fill-[var(--d-accent)]" />
        <text x="80" y="268" textAnchor="middle" className={phase}>VẤN ĐỀ BAN ĐẦU</text>
        <text x="500" y="268" textAnchor="middle" className={phase}>VẤN ĐỀ ĐÃ ĐỊNH NGHĨA</text>
        <text x="920" y="268" textAnchor="middle" className={phase}>GIẢI PHÁP</text>
        <path d="M900 285 Q500 312 100 285" fill="none" className="stroke-[var(--d-accent)]" strokeWidth="2" strokeDasharray="6 6" />
        <polygon points="100,285 114,278 112,292" className="fill-[var(--d-accent)]" />
      </svg>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Hình thoi thứ nhất mở ra (khám phá vấn đề) rồi khép lại (xác định vấn đề). Hình thoi thứ hai mở ra (phát triển nhiều giải pháp) rồi khép lại (bàn giao một giải pháp). Mũi
        tên từ kiểm thử có thể quay ngược về bất kỳ giai đoạn nào trước đó.
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
            Nhiều dự án bắt đầu bằng một giải pháp có sẵn (“làm ứng dụng”, “thêm tính năng X”) thay vì một vấn đề đã được hiểu rõ. Nhóm làm rất tốt một thứ mà người dùng không cần,
            hoặc giải đúng triệu chứng nhưng sai nguyên nhân. Các vấn đề phức tạp, chưa rõ ràng (người dùng muốn gì, vì sao họ hành xử như vậy) lại không giải được bằng phân tích
            thuần túy.
          </P>
          <P strong>
            Brown (2008) lập luận rằng tư duy thiết kế nên được đưa lên sớm hơn trong quá trình. Nó không chỉ làm sản phẩm đẹp hơn ở cuối, mà còn định hình sản phẩm, dịch vụ, quy trình
            và chiến lược ngay từ đầu.
          </P>
        </div>
        <Eyebrow>Design thinking hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          minH={150}
          items={[
            ["target", "Đang giải đúng vấn đề chưa", "Định nghĩa lại vấn đề dựa trên hiểu biết về người dùng."],
            ["split", "Có những hướng giải nào", "Mở rộng trước khi chọn."],
            ["gauge", "Hướng nào đáng đầu tư", "Dựa trên phản hồi từ prototype, không chỉ từ ý kiến."],
            ["flask", "Học gì trước khi xây", "Kiểm chứng giả định với chi phí thấp."],
          ]}
        />
      </Section>

      <Section {...S.stages}>
        <Subhead icon="list">Mô hình 5 chế độ (Stanford d.school)</Subhead>
        <Table
          head={["Chế độ", "Mục tiêu", "Hoạt động ví dụ", "Đầu ra"]}
          widths={[220]}
          rows={[
            { icon: "users", cells: ["Thấu cảm (Empathize)", "Hiểu người dùng: họ làm gì, nghĩ gì, cảm thấy gì.", "Phỏng vấn, quan sát, contextual inquiry.", "Ghi chép, câu chuyện, quan sát."] },
            {
              icon: "target",
              cells: [
                "Xác định (Define)",
                "Diễn đạt lại vấn đề từ góc nhìn người dùng.",
                "Tổng hợp bằng affinity diagram; viết câu vấn đề; đặt câu hỏi “Làm thế nào để…”.",
                "Câu định nghĩa vấn đề (point of view).",
              ],
            },
            { icon: "lightbulb", cells: ["Tạo ý tưởng (Ideate)", "Tạo nhiều hướng giải quyết.", "Động não, phác thảo, Crazy 8s.", "Danh sách ý tưởng, ý tưởng được chọn."] },
            {
              icon: "component",
              cells: ["Làm thử (Prototype)", "Biến ý tưởng thành thứ người dùng có thể trải nghiệm.", "Phác giấy, wireframe, nhập vai, prototype tương tác.", "Prototype ở mức vừa đủ để học."],
            },
            { icon: "play-circle", cells: ["Kiểm thử (Test)", "Học từ phản ứng của người dùng.", "Usability testing, phỏng vấn với prototype.", "Điều đã học, điều cần sửa."] },
          ]}
        />
        <Callout tone="note">
          NN/g dùng thêm giai đoạn thứ sáu là Triển khai (Implement), và gom sáu giai đoạn thành ba nhóm: Hiểu (thấu cảm, xác định), Khám phá (tạo ý tưởng, làm thử), Hiện thực (kiểm
          thử, triển khai).
        </Callout>

        <Subhead icon="split">Mô hình Double Diamond (Design Council)</Subhead>
        <P>Hai hình thoi nối tiếp, mỗi hình thoi gồm một pha mở rộng và một pha thu hẹp.</P>
        <DoubleDiamond />
        <Table
          head={["Hình thoi", "Pha", "Ý nghĩa"]}
          widths={[280, 240]}
          rows={[
            { icon: "binoculars", cells: ["Thứ nhất — đúng vấn đề", "Khám phá (Discover)", "Mở rộng: tìm hiểu vấn đề từ nhiều góc."] },
            { icon: "target", cells: ["", "Xác định (Define)", "Thu hẹp: chọn vấn đề cần giải."] },
            { icon: "lightbulb", cells: ["Thứ hai — đúng giải pháp", "Phát triển (Develop)", "Mở rộng: tạo và thử nhiều giải pháp."] },
            { icon: "check-circle", cells: ["", "Bàn giao (Deliver)", "Thu hẹp: hoàn thiện, kiểm thử, ra mắt giải pháp."] },
          ]}
        />

        <Subhead icon="component">Điểm chung của các mô hình</Subhead>
        <InfoGrid
          items={[
            ["users", "Lấy con người làm trung tâm", "Mọi quyết định quay về nhu cầu thật của người dùng."],
            ["split", "Mở rộng trước, thu hẹp sau", "Không chọn giải pháp quá sớm."],
            ["flask", "Làm thử để học", "Prototype là công cụ học, không phải sản phẩm cuối."],
            ["rotate", "Lặp lại", "Kiểm thử có thể đưa nhóm quay lại hiểu hoặc định nghĩa lại vấn đề."],
          ]}
        />
      </Section>

      <Section {...S.roles}>
        <Table
          head={["Vai trò", "Đóng góp"]}
          widths={[420]}
          rows={[
            { icon: "users", cells: ["Nhóm liên chức năng (thiết kế, sản phẩm, kỹ thuật, kinh doanh)", "Mang nhiều góc nhìn vào việc hiểu vấn đề và tạo ý tưởng."] },
            { icon: "hourglass", cells: ["Người dẫn dắt (facilitator)", "Giữ nhóm đi đúng tinh thần: không nhảy vào giải pháp quá sớm, không phán xét khi tạo ý tưởng."] },
            { icon: "binoculars", cells: ["Researcher", "Dẫn dắt hoạt động thấu cảm và kiểm thử."] },
            { icon: "chat", cells: ["Người dùng", "Tham gia nghiên cứu và kiểm thử; đôi khi đồng thiết kế (co-design)."] },
            { icon: "target", cells: ["Người ra quyết định", "Hỗ trợ việc thử nghiệm và chấp nhận rằng một số ý tưởng sẽ thất bại."] },
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
                "Vấn đề phức tạp, chưa rõ ràng, liên quan nhiều đến hành vi con người.",
                "Bắt đầu sản phẩm, dịch vụ mới hoặc thay đổi lớn.",
                "Nhóm đang làm theo yêu cầu có sẵn mà chưa chắc đó là đúng vấn đề.",
                "Cần tạo đột phá thay vì cải tiến từng chút.",
              ],
            ],
            [
              "eye",
              "Dấu hiệu nhận biết",
              [
                "Sản phẩm làm đúng yêu cầu nhưng người dùng không dùng.",
                "Nhóm tranh luận về giải pháp mà chưa ai hỏi người dùng.",
                "Vấn đề được mô tả bằng giải pháp (“cần một ứng dụng…”).",
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
            { icon: "check-circle", cells: ["Vấn đề đã rõ, giải pháp đã được kiểm chứng", "Không cần mở rộng lại từ đầu.", "Thực thi, tối ưu bằng dữ liệu (A/B testing)."] },
            { icon: "shield-alert", cells: ["Vấn đề kỹ thuật thuần túy (hiệu năng, bảo mật)", "Ít liên quan đến hành vi và nhu cầu người dùng.", "Phương pháp kỹ thuật chuyên biệt."] },
            { icon: "ban", cells: ["Tổ chức không chấp nhận thử và sai", "Tinh thần làm thử, thất bại sớm bị cản trở.", "Bắt đầu bằng dự án nhỏ để chứng minh giá trị."] },
            { icon: "lightbulb", cells: ["Chỉ làm “workshop cho vui” mà không có nghiên cứu thật", "Giai đoạn thấu cảm bị thay bằng giả định.", "Dành thời gian nghiên cứu với người dùng thật."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Bắt đầu từ một thách thức mở.", "Diễn đạt dưới dạng câu hỏi “Làm thế nào để…” thay vì một giải pháp.", "Câu hỏi thách thức."],
            ["Thấu cảm: nghiên cứu với người dùng thật.", "Phỏng vấn, quan sát, contextual inquiry; ghi lại cả điều họ nói và điều họ làm.", "Dữ liệu nghiên cứu."],
            [
              "Xác định: tổng hợp và định nghĩa lại vấn đề.",
              "Gom nhóm nhận định (affinity diagram); viết câu vấn đề dạng “[Người dùng] cần [nhu cầu] vì [nhận định]”.",
              "Câu định nghĩa vấn đề, câu hỏi “Làm thế nào để…”.",
            ],
            ["Tạo ý tưởng: mở rộng rồi chọn lọc.", "Tạo nhiều ý tưởng trước, không phán xét; sau đó mới chọn.", "Ý tưởng được chọn để làm thử."],
            ["Làm thử: vừa đủ để học.", "Prototype rẻ và nhanh nhất có thể trả lời câu hỏi cần học.", "Prototype."],
            ["Kiểm thử và lặp lại.", "Học từ người dùng; quay lại giai đoạn trước khi cần.", "Điều đã học, quyết định tiếp tục, điều chỉnh hay dừng."],
          ]}
        />
      </Section>

      <Section {...S.evaluate}>
        <P strong>Design thinking là cách tiếp cận, nên đánh giá dựa trên chất lượng của quá trình và quyết định, không có một chỉ số duy nhất.</P>
        <Table
          head={["Câu hỏi đánh giá", "Dấu hiệu làm tốt"]}
          widths={[460]}
          rows={[
            { icon: "users", cells: ["Vấn đề có dựa trên nghiên cứu với người dùng thật không?", "Có dữ liệu thấu cảm; câu vấn đề trích dẫn được nhận định cụ thể."] },
            { icon: "split", cells: ["Nhóm có mở rộng đủ trước khi chọn không?", "Có nhiều ý tưởng khác nhau; ý tưởng được chọn có lý do."] },
            { icon: "component", cells: ["Prototype có giúp học điều cần học không?", "Mỗi prototype gắn với một câu hỏi cụ thể."] },
            { icon: "rotate", cells: ["Kết quả kiểm thử có thay đổi quyết định không?", "Có điều chỉnh rõ sau kiểm thử."] },
            { icon: "gauge", cells: ["Giải pháp cuối có đạt mục tiêu khi ra mắt không?", "Đo bằng chỉ số phù hợp (tỷ lệ hoàn thành, CES, giữ chân…)."] },
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Thách thức hoặc câu hỏi mở.", "Thời gian và nguồn lực cho nghiên cứu với người dùng.", "Nhóm liên chức năng; sự ủng hộ của người ra quyết định."]}
          outputs={["Hiểu biết về người dùng (ghi chép, persona, journey map).", "Câu định nghĩa vấn đề.", "Ý tưởng và prototype đã kiểm thử.", "Quyết định dựa trên điều đã học."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard icon="file" title="Yêu cầu ban đầu" body="“Làm ứng dụng di động để khách đặt lịch tư vấn.”" />
        <Table
          head={["Giai đoạn", "Diễn biến"]}
          widths={[240]}
          rows={[
            {
              icon: "users",
              cells: [
                "Thấu cảm",
                "Phỏng vấn tám khách hàng và quan sát lễ tân tại chi nhánh (contextual inquiry). Nhận thấy khách đặt lịch online không khó; khó khăn lớn nhất là không biết mình cần tư vấn gói nào và lo lắng về chi phí.",
              ],
            },
            {
              icon: "target",
              cells: [
                "Xác định",
                "“Khách hàng lần đầu cần biết dịch vụ nào phù hợp với tình huống của mình và chi phí ra sao trước khi đặt lịch, vì họ sợ mất thời gian cho buổi tư vấn không đúng nhu cầu.” Câu hỏi: “Làm thế nào để khách tự tin chọn đúng dịch vụ trước khi đặt lịch?”",
              ],
            },
            {
              icon: "lightbulb",
              cells: ["Tạo ý tưởng", "Bộ câu hỏi gợi ý dịch vụ, bảng so sánh dịch vụ, cuộc gọi 5 phút miễn phí, video giới thiệu, ví dụ tình huống khách hàng."],
            },
            {
              icon: "play-circle",
              cells: [
                "Làm thử và kiểm thử",
                "Prototype giấy của bộ câu hỏi gợi ý dịch vụ và bảng so sánh, kiểm thử với năm người. Bộ câu hỏi giúp khách tự tin hơn; bảng so sánh bị đánh giá là quá nhiều chữ.",
              ],
            },
          ]}
        />
        <InfoCard
          icon="check-circle"
          tone="fill"
          title="Quyết định"
          body="Không làm ứng dụng riêng ở giai đoạn này. Thêm bộ câu hỏi gợi ý dịch vụ vào trang web trước bước đặt lịch, rồi đo tỷ lệ đặt lịch và tỷ lệ khách đổi dịch vụ sau buổi tư vấn."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Coi design thinking là một buổi workshop", "Thiếu nghiên cứu thật và kiểm thử; chỉ còn giấy ghi chú và ý tưởng.", "Dành thời gian cho thấu cảm và kiểm thử với người dùng thật."],
            ["Bỏ qua giai đoạn thấu cảm", "Vấn đề được định nghĩa từ giả định nội bộ.", "Nghiên cứu trước khi định nghĩa vấn đề."],
            ["Chọn giải pháp quá sớm", "Bỏ lỡ hướng tốt hơn.", "Mở rộng đủ trước khi thu hẹp."],
            ["Làm theo các giai đoạn như đường thẳng", "Không quay lại khi kiểm thử cho thấy sai hướng.", "Chấp nhận lặp lại, quay lại giai đoạn trước."],
            ["Prototype quá trau chuốt quá sớm", "Tốn công, khó bỏ khi sai.", "Bắt đầu với prototype rẻ, nhanh."],
            ["Không đo kết quả sau khi triển khai", "Không biết giải pháp có thật sự hiệu quả.", "Gắn chỉ số đo lường khi ra mắt."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Cách tiếp cận", "Trọng tâm", "Quan hệ với Design Thinking"]}
          widths={[260]}
          rows={[
            { icon: "lightbulb", highlight: true, cells: ["Design Thinking", "Tư duy và quy trình lấy con người làm trung tâm cho vấn đề phức tạp.", "—"] },
            { icon: "calendar", cells: ["Design Sprint", "Quy trình năm ngày, cấu trúc chặt.", "Một cách thực hiện design thinking dưới dạng nén."] },
            { icon: "flask", cells: ["Lean UX", "Học liên tục qua giả thuyết và thử nghiệm nhỏ trong phát triển.", "Dùng tinh thần tương tự trong nhịp phát triển hằng ngày."] },
            {
              icon: "users",
              cells: ["User-Centered Design (UCD)", "Quy trình thiết kế dựa trên người dùng, có tiêu chuẩn (ISO 9241-210).", "Gần nghĩa; UCD thường gắn với thiết kế sản phẩm tương tác."],
            },
            { icon: "component", cells: ["Service Design", "Thiết kế toàn bộ dịch vụ, gồm phần hậu trường.", "Áp dụng design thinking cho dịch vụ đa kênh."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="target"
            title="Hiểu và định nghĩa"
            items={[
              "Thách thức được diễn đạt bằng câu hỏi mở, không phải giải pháp.",
              "Có nghiên cứu với người dùng thật trước khi định nghĩa vấn đề.",
              "Câu định nghĩa vấn đề dựa trên nhận định cụ thể.",
              "Đã tạo nhiều ý tưởng trước khi chọn.",
            ]}
          />
          <ChecklistColumn
            icon="flask"
            title="Làm thử và học"
            items={[
              "Mỗi prototype gắn với một câu hỏi cần học.",
              "Kiểm thử với người dùng thật.",
              "Sẵn sàng quay lại giai đoạn trước khi cần.",
              "Có chỉ số đo kết quả sau khi triển khai.",
            ]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Design Sprint", "Thiết kế nước rút", "Cách thực hiện nén trong năm ngày."],
            ["Ideation", "Tạo ý tưởng", "Giai đoạn tạo ý tưởng."],
            ["Prototype", "Bản mẫu", "Công cụ học trong giai đoạn làm thử."],
            ["Empathy Mapping", "Bản đồ thấu cảm", "Công cụ tổng hợp ở giai đoạn thấu cảm."],
            ["Contextual Inquiry", "Phỏng vấn tại bối cảnh", "Phương pháp thấu cảm."],
            ["Affinity Diagram", "Sơ đồ tương đồng", "Công cụ tổng hợp ở giai đoạn xác định."],
            ["Lean UX", "UX tinh gọn", "Cách tiếp cận học liên tục gần gũi."],
            ["Service Design", "Thiết kế dịch vụ", "Áp dụng design thinking cho dịch vụ."],
          ]}
        />
      </Section>
    </div>
  );
}

export const DESIGN_THINKING: Article = {
  slug: "design-thinking",
  version: 1,
  term: "Design Thinking",
  fn: 3,
  vi: "Tư duy thiết kế",
  kind: "Quy trình / cách tiếp cận",
  definition:
    "Design thinking là cách tiếp cận giải quyết vấn đề lấy con người làm trung tâm: bắt đầu từ việc hiểu sâu nhu cầu của người dùng, xác định đúng vấn đề, tạo nhiều ý tưởng, rồi làm thử và kiểm thử nhanh để học và cải tiến.",
  definitionMore:
    "Thay vì đi thẳng từ yêu cầu đến giải pháp, nhóm dành thời gian đặt câu hỏi “chúng ta có đang giải đúng vấn đề không?”. Quy trình lặp lại nhiều vòng, không đi theo một đường thẳng.",
  oneLine: "Cách giải quyết vấn đề lấy con người làm trung tâm: hiểu, xác định, tạo ý tưởng, làm thử và kiểm thử.",
  glance: [
    ["5", "Chế độ theo Stanford d.school"],
    ["2", "Hình thoi trong Double Diamond"],
  ],
  facts: [
    { label: "Nhóm chính", items: ["Quy trình và vận hành"] },
    { label: "Thẻ phụ", items: ["Nền tảng và nguyên tắc", "Nghiên cứu khám phá"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "Không có một phiên bản “chuẩn” duy nhất: Stanford d.school (5 chế độ), NN/g (6 giai đoạn), Double Diamond (4 giai đoạn). Design thinking không chỉ dành cho designer; nó là cách tiếp cận giải quyết vấn đề cho mọi nhóm.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
