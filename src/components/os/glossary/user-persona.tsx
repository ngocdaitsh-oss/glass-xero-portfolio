"use client";

import { Blk, T } from "./edit";
import { CheckCards, InOutCards, PairCards, RelatedCards, Scenario, Steps, InfoGrid } from "./blocks";
import type { Article } from "./types";
import { ChecklistColumn, Eyebrow, Icon, InfoCard, P, Section, Table, Tile, sectionProps, Callout, type SectionDef } from "./ui";

/* User Persona — copy from ux-glossary/user-persona.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "parts", title: "Thành phần của persona", icon: "component" },
  { id: "types", title: "Ba loại persona", icon: "split" },
  { id: "when", title: "Khi nào nên dùng / chưa phù hợp", icon: "check-circle" },
  { id: "apply", title: "Cách tạo", icon: "list" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** The example persona laid out as the one-page card a team would pin up. */
function PersonaCard() {
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="users" size={36} iconSize={18} radius={10} />
        <Eyebrow>Thẻ persona: chị Lan</Eyebrow>
      </div>
      <div className="flex items-start gap-6">
        <div className="flex w-[260px] shrink-0 flex-col gap-4 rounded-[24px] bg-[var(--d-fill)] p-6 text-white">
          <span className="flex size-16 items-center justify-center rounded-full bg-white/20">
            <Icon name="users" size={28} />
          </span>
          <div className="flex flex-col gap-1">
            <span className="text-[22px] leading-[28px] font-semibold">Chị Lan, 38 tuổi</span>
            <span className="text-[15px] leading-[22px] text-white/85">Chủ tiệm cà phê nhỏ, muốn vay vốn mở thêm chi nhánh nhưng sợ quyết định sai.</span>
          </div>
          <span className="text-[15px] leading-[22px] italic">“Tôi chỉ muốn biết trước sẽ tốn bao nhiêu và người ta giữ thông tin của mình thế nào.”</span>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-3">
          {[
            ["Kinh nghiệm", "Chưa từng thuê tư vấn tài chính; dùng điện thoại thành thạo."],
            ["Bối cảnh", "Tự chọn dùng dịch vụ; đặt lịch trên điện thoại, buổi tối sau giờ đóng cửa."],
            ["Mục tiêu", "Biết khoản vay bao nhiêu là an toàn với dòng tiền của mình."],
            ["Mối lo", "Chi phí tư vấn không rõ; ngại chia sẻ số liệu với người lạ."],
          ].map(([t, d]) => (
            <div key={t} className="flex flex-col gap-1.5 rounded-2xl bg-[var(--d-soft)] p-5">
              <span className="text-[16px] leading-[22px] font-semibold">{t}</span>
              <span className="text-[15px] leading-[22px] text-[var(--w-secondary)]">{d}</span>
            </div>
          ))}
        </div>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Persona định tính dựng từ 14 cuộc phỏng vấn và ghi chép usability testing. Tên và chi tiết là hư cấu.
      </T>
    </Blk>
  );
}

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Section {...S.problem}>
        <P>
          Khi không có hình dung chung về người dùng, mỗi người trong nhóm thiết kế cho người dùng trong đầu mình, thường giống chính họ. Kết quả là tranh luận cảm tính, và sản phẩm cố phục vụ tất
          cả mọi người nên không phục vụ tốt ai.
        </P>
        <CheckCards
          groups={[
            [
              "check-circle",
              "Persona giúp (theo NN/g)",
              [
                "Làm người dùng trở nên cụ thể, giúp nhóm cưỡng lại việc thiết kế cho mọi người.",
                "Tạo cách gọi chung trong các cuộc họp (“chị Lan sẽ hiểu chỗ này không?”).",
                "Định hướng đánh giá chuyên gia, brief cho đối tác, sàng lọc người tham gia nghiên cứu, và phân nhóm dữ liệu phân tích.",
              ],
            ],
          ]}
        />
      </Section>

      <Section {...S.parts}>
        <P>Theo Dykes (2025), persona thường gồm:</P>
        <Table
          head={["Thành phần", "Mục đích"]}
          widths={[320]}
          rows={[
            { icon: "users", cells: ["Tên, tuổi, ảnh", "Làm nhân vật dễ nhớ."] },
            { icon: "file", cells: ["Câu mô tả ngắn (tagline)", "Tóm tắt nhân vật trong một câu."] },
            { icon: "bar-chart", cells: ["Mức kinh nghiệm", "Với lĩnh vực và với sản phẩm."] },
            { icon: "eye", cells: ["Bối cảnh sử dụng", "Tự chọn hay bắt buộc dùng; tần suất; thiết bị."] },
            { icon: "target", highlight: true, cells: ["Mục tiêu và mối lo", "Điều họ muốn đạt, điều làm họ ngần ngại."] },
            { icon: "chat", cells: ["Một câu trích dẫn", "Lời nói tiêu biểu, thường lấy từ phỏng vấn."] },
          ]}
        />
        <InfoCard
          tone="fill"
          icon="alert"
          title="Nguyên tắc quan trọng"
          body="Mỗi chi tiết phải ảnh hưởng đến thiết kế. Chi tiết không liên quan (sở thích, món ăn yêu thích) nên bỏ, vì chúng làm loãng thông tin hữu ích."
        />
      </Section>

      <Section {...S.types}>
        <P>Theo Laubheimer (2020):</P>
        <Table
          head={["Loại", "Dựa trên", "Ưu điểm", "Hạn chế", "Phù hợp"]}
          widths={[180]}
          rows={[
            {
              cells: [
                "Proto-persona (nhẹ)",
                "Giả định có sẵn của nhóm, có thể kèm dữ liệu sẵn có; thường làm trong một buổi workshop 2–4 giờ.",
                "Nhanh; làm lộ ra giả định ngầm; có thể dẫn tới nghiên cứu.",
                "Thường không chính xác; dễ thành “buồng vang” củng cố định kiến.",
                "Nhóm rất nhỏ, mới bắt đầu, Lean UX.",
              ],
            },
            {
              highlight: true,
              cells: [
                "Persona định tính",
                "Nghiên cứu khám phá mẫu nhỏ: phỏng vấn, usability test, field study (gợi ý 5–30 cuộc phỏng vấn, dừng khi không còn thông tin mới).",
                "Chính xác về động cơ và nhu cầu; cân bằng công sức và giá trị.",
                "Không cho biết mỗi persona chiếm bao nhiêu phần trăm người dùng; có thể bỏ sót hoặc phóng đại trường hợp đặc biệt.",
                "Phần lớn các nhóm.",
              ],
            },
            {
              cells: [
                "Persona thống kê",
                "Nghiên cứu định tính, rồi khảo sát lớn (ít nhất 100, tốt hơn từ 500 người), rồi phân cụm thống kê.",
                "Ít bị ảnh hưởng bởi trường hợp đặc biệt; biết tỷ lệ mỗi persona.",
                "Đắt, chậm, cần chuyên gia thống kê; kết quả thường giống persona định tính.",
                "Tổ chức rất lớn, có chuyên gia dữ liệu.",
              ],
            },
          ]}
        />
        <Callout tone="note" icon="alert">
          Laubheimer nhấn mạnh: loại nào cũng phải dựa trên hiểu biết định tính, và không nên dựng persona chỉ từ dữ liệu nhân khẩu học hay phân tích số liệu.
        </Callout>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "check-circle",
              "Nên dùng khi",
              [
                "Nhóm đã có dữ liệu nghiên cứu và cần một hình dung chung về người dùng.",
                "Có vài nhóm người dùng với mục tiêu, bối cảnh khác nhau.",
                "Cần căn cứ để ưu tiên tính năng hoặc sàng lọc người tham gia nghiên cứu.",
              ],
            ],
          ]}
        />
        <Table
          head={["Chưa phù hợp khi", "Vì sao", "Thay bằng"]}
          widths={[320]}
          rows={[
            { icon: "list-search", cells: ["Chưa có nghiên cứu nào", "Persona sẽ chỉ là giả định.", "Làm proto-persona và ghi rõ là giả định, rồi nghiên cứu."] },
            { icon: "hourglass", cells: ["Cần hiểu hành trình qua thời gian", "Persona không mô tả trình tự.", "Journey mapping."] },
            { icon: "target", cells: ["Cần hiểu một khoảnh khắc cụ thể", "Persona khái quát, không đi vào tình huống.", "Empathy mapping, task analysis."] },
            { icon: "users", cells: ["Muốn thay kiểm thử bằng “persona sẽ nghĩ thế nào”", "Persona không thay được người thật.", "Usability testing."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Thu thập dữ liệu", "Từ nghiên cứu: phỏng vấn, field study, khảo sát, nghiên cứu dài hạn.", "Dữ liệu thô."],
            ["Mã hóa và tìm chủ đề", "Mục tiêu, bối cảnh, mối lo lặp lại.", "Các chủ đề chính."],
            ["Gom người dùng có điểm giống nhau", "Thành nhóm.", "Các nhóm người dùng."],
            ["Viết persona", "Cho mỗi nhóm, chỉ giữ chi tiết ảnh hưởng tới thiết kế.", "Bản nháp persona."],
            ["Làm cùng nhóm", "Càng sớm càng tốt (NN/g khuyên tạo persona như một hoạt động nhóm).", "Persona được cả nhóm hiểu và chấp nhận."],
            ["Dùng thường xuyên và cập nhật", "Khi có dữ liệu mới.", "Persona còn đúng theo thời gian."],
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["bar-chart", "Không cho biết tỷ lệ", "Persona định tính không biết “chị Lan” đại diện cho 10% hay 60% khách hàng."],
            ["users", "Khái quát hóa", "Có thể che mất sự đa dạng trong một nhóm."],
            ["file", "Chỉ đúng đến mức dữ liệu đúng", "Dữ liệu cũ thì persona cũng cũ."],
            ["eye", "Không thay được kiểm thử", "Đánh giá thiết kế qua góc nhìn persona không thay được kiểm thử với người thật."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Dữ liệu nghiên cứu người dùng.", "Các chủ đề đã phân tích.", "Nhóm thiết kế và các bên liên quan tham gia."]}
          outputs={["3–6 persona (con số tham khảo cho workshop proto-persona theo Laubheimer; số lượng thực tế tùy dữ liệu).", "Ghi chú về nguồn dữ liệu của từng persona."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai. Tên và chi tiết là hư cấu.</Scenario>
        <InfoCard icon="file" title="Dữ liệu" body="14 cuộc phỏng vấn khách hàng, cộng ghi chép từ usability testing." />
        <PersonaCard />
        <InfoCard
          tone="fill"
          icon="check-circle"
          title="Cách dùng"
          body="Nhóm dùng chị Lan để ưu tiên: hiện giá rõ cho mọi gói, thêm thông tin bảo mật dữ liệu ngay trên form, tối ưu đặt lịch trên điện thoại. Các quyết định này sau đó được kiểm chứng bằng usability testing."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Dựng từ tưởng tượng mà không ghi là giả định", "Nhóm tin persona là thật.", "Ghi rõ “proto-persona”, lên kế hoạch nghiên cứu."],
            ["Chỉ dùng nhân khẩu học", "Tuổi, giới tính không giải thích hành vi.", "Tập trung mục tiêu, bối cảnh, mối lo."],
            ["Thêm chi tiết không liên quan", "Làm loãng thông tin.", "Mỗi chi tiết phải ảnh hưởng tới thiết kế."],
            ["Làm xong rồi cất đi", "Không ai dùng.", "Đưa vào họp, brief, tiêu chí ưu tiên."],
            ["Dùng persona thay cho test", "Persona không phải người thật.", "Kiểm chứng với người dùng."],
            ["Dùng AI tạo persona không có dữ liệu", "Không dựa trên người dùng của bạn.", "Xem Synthetic User; chỉ dùng để chuẩn bị."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Là gì"]}
          widths={[340]}
          rows={[
            { icon: "users", highlight: true, cells: ["User Persona", "Nhân vật đại diện cho một nhóm người dùng, dựa trên nghiên cứu."] },
            { icon: "play-circle", cells: ["Synthetic User", "Hồ sơ do AI tạo, không dựa trên nghiên cứu người dùng của bạn."] },
            { icon: "lightbulb", cells: ["Empathy Mapping", "Tổng hợp người dùng nói, nghĩ, làm, cảm thấy gì; thường là bước trung gian."] },
            { icon: "arrows", cells: ["Journey Mapping", "Hành trình của một persona qua các giai đoạn."] },
            { icon: "bar-chart", cells: ["Phân khúc thị trường (market segment)", "Nhóm khách hàng theo đặc điểm kinh doanh, nhân khẩu học."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="pencil"
            title="Khi tạo"
            items={["Dựa trên dữ liệu nghiên cứu (hoặc ghi rõ là proto-persona).", "Có mục tiêu, bối cảnh, mối lo.", "Mỗi chi tiết ảnh hưởng tới thiết kế.", "Làm cùng nhóm."]}
          />
          <ChecklistColumn
            icon="check-circle"
            title="Khi dùng"
            items={["Được nhắc tới trong quyết định thiết kế.", "Không thay thế kiểm thử với người thật.", "Có kế hoạch cập nhật khi có dữ liệu mới."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Synthetic User", "Người dùng tổng hợp", "Do AI tạo, không dựa trên nghiên cứu thật."],
            ["Empathy Mapping", "Bản đồ thấu cảm", "Bước tổng hợp trước hoặc đi kèm persona."],
            ["Journey Mapping", "Bản đồ hành trình", "Hành trình của một persona."],
            ["Qualitative Research", "Nghiên cứu định tính", "Nguồn dữ liệu chính cho persona."],
            ["Survey", "Khảo sát", "Nguồn dữ liệu cho persona thống kê."],
            ["Jobs to be Done (JTBD)", "Công việc cần hoàn thành", "Cách nhìn khác: tập trung vào việc, không vào nhân vật."],
          ]}
        />
      </Section>
    </div>
  );
}

export const USER_PERSONA: Article = {
  slug: "user-persona",
  version: 1,
  term: "User Persona",
  fn: 2,
  vi: "Chân dung người dùng",
  kind: "Tài liệu / sơ đồ thiết kế",
  definition:
    "User persona là bản mô tả một người dùng hư cấu nhưng thực tế, đại diện cho một nhóm người dùng điển hình hoặc mục tiêu, được dựng từ dữ liệu nghiên cứu.",
  definitionMore: "Persona biến số liệu và ghi chép rời rạc thành một nhân vật dễ nhớ, giúp cả nhóm đồng cảm và thiết kế cho người dùng cụ thể thay vì “mọi người”.",
  oneLine: "Nhân vật hư cấu dựng từ dữ liệu nghiên cứu, đại diện cho một nhóm người dùng điển hình.",
  glance: [
    ["3 loại", "Proto, định tính, thống kê"],
    ["5–30", "Cuộc phỏng vấn cho persona định tính"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Persona"] },
    { label: "Nhóm chính", items: ["Nghiên cứu khám phá"] },
    { label: "Thẻ phụ", items: ["Tổng hợp và phân tích"] },
    {
      label: "Lưu ý tên gọi",
      items: ["Persona là nhân vật hư cấu nhưng dựa trên dữ liệu nghiên cứu thật. Persona dựng từ giả định của nhóm gọi là proto-persona, cần ghi rõ là giả định."],
    },
  ],
  sections: SECTIONS,
  Body,
};
