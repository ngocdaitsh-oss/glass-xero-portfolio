"use client";

import { Blk, T } from "./edit";
import { CheckCards, InfoGrid, InOutCards, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Focus Group — copy from ux-glossary/focus-group.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "parts", title: "Thành phần của một buổi focus group", icon: "component" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "moderator", title: "Vai trò của người điều phối", icon: "users" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các phương pháp gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** The example's plan: three groups of seven around a moderator, with a separate note-taker. */
function Groups() {
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="users" size={36} iconSize={18} radius={10} />
        <Eyebrow>Ba nhóm, mỗi nhóm 7 người, mỗi buổi 2 giờ</Eyebrow>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((g) => (
          <div key={g} className="flex flex-col items-center gap-5 rounded-[20px] bg-[var(--d-well)] p-7">
            <span className="font-mono text-[13px] tracking-[0.6px] text-[var(--w-muted)]">NHÓM {g}</span>
            <div className="relative size-[180px]">
              {Array.from({ length: 7 }, (_, i) => {
                const a = (i / 7) * Math.PI * 2 - Math.PI / 2;
                return (
                  <span
                    key={i}
                    className="absolute size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--d-ci)]"
                    style={{ left: `${50 + Math.cos(a) * 42}%`, top: `${50 + Math.sin(a) * 42}%` }}
                  />
                );
              })}
              <span className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--d-fill)] text-center text-[12px] leading-4 font-semibold text-white">
                Điều phối
              </span>
            </div>
            <span className="rounded-[10px] bg-[var(--w-card)] px-3 py-1.5 text-[14px] leading-5 font-semibold">+ người ghi chép riêng</span>
          </div>
        ))}
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Nielsen khuyên chạy nhiều hơn một nhóm, vì một nhóm có thể bị một vài người chi phối. Chạy thêm nhóm để phân biệt điều chung với điều chỉ riêng một nhóm.
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
            Ở giai đoạn sớm, nhóm cần biết người dùng muốn gì, lo gì, và dùng từ ngữ nào khi nói về một chủ đề. Phỏng vấn từng người cho chiều sâu, nhưng thảo luận nhóm cho thấy những
            điều phỏng vấn đơn không có: ý kiến được phản biện, so sánh, hoặc được bổ sung bởi người khác.
          </P>
          <P strong>Nielsen (NN/g) nhấn mạnh vai trò đúng của focus group là khám phá người dùng muốn gì, không phải đánh giá sản phẩm có dễ dùng không.</P>
        </div>
        <Eyebrow>Focus group hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          minH={150}
          items={[
            ["target", "Nhu cầu và mong muốn chính", "Của một nhóm người dùng."],
            ["chat", "Ngôn ngữ của người dùng", "Từ ngữ dùng cho nhãn, nội dung, thông điệp."],
            ["lightbulb", "Phản ứng ban đầu", "Với một ý tưởng, khái niệm."],
            ["binoculars", "Chủ đề cần nghiên cứu sâu hơn", "Bằng phương pháp khác."],
          ]}
        />
      </Section>

      <Section {...S.parts}>
        <Table
          head={["Thành phần", "Mô tả", "Ví dụ minh họa (giả định)"]}
          widths={[260]}
          rows={[
            {
              icon: "users",
              cells: ["Người tham gia", "Nhóm nhỏ, cùng đặc điểm liên quan đến chủ đề. Nielsen gợi ý khoảng 6–9 người mỗi nhóm.", "7 người đang cân nhắc dịch vụ tư vấn."],
            },
            { icon: "chat", cells: ["Người điều phối (moderator)", "Dẫn dắt, giữ chủ đề, cân bằng tiếng nói.", "Người nghiên cứu có kinh nghiệm điều phối."] },
            {
              icon: "list",
              cells: ["Kịch bản thảo luận", "Các câu hỏi mở theo thứ tự từ chung đến cụ thể.", "“Lần gần nhất bạn tìm dịch vụ tư vấn, bạn bắt đầu thế nào?”"],
            },
            { icon: "hourglass", cells: ["Thời lượng", "Theo Nielsen, khoảng 2 giờ.", "2 giờ, có nghỉ giữa buổi."] },
            { icon: "pencil", cells: ["Ghi chép", "Người ghi chép riêng, ghi âm hoặc ghi hình khi được đồng ý.", "Một người ghi chép, ghi âm toàn buổi."] },
            {
              icon: "component",
              highlight: true,
              cells: ["Số nhóm", "Nielsen khuyên chạy nhiều hơn một nhóm, vì một nhóm có thể bị một vài người chi phối.", "3 nhóm."],
            },
          ]}
        />
        <Groups />
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "target",
              "Bối cảnh phù hợp",
              [
                "Giai đoạn khám phá, cần hiểu nhu cầu và thái độ.",
                "Muốn nghe ngôn ngữ người dùng dùng khi nói về chủ đề.",
                "Muốn thấy phản ứng ban đầu với một khái niệm hay định hướng.",
                "Kết hợp với các phương pháp quan sát hành vi.",
              ],
            ],
            ["eye", "Dấu hiệu nhận biết", ["Nhóm chưa rõ người dùng quan tâm điều gì nhất.", "Cần nhiều ý kiến khác nhau trong thời gian ngắn."]],
            ["clipboard-check", "Điều kiện cần", ["Người điều phối có kinh nghiệm.", "Người tham gia đúng đặc điểm, thoải mái chia sẻ trước người khác."]],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[320]}
          rows={[
            { icon: "play-circle", cells: ["Đánh giá độ dễ dùng", "Xem demo không giống tự dùng; người ta nói khác với làm.", "Usability testing, quan sát từng người."] },
            { icon: "shield-alert", cells: ["Chủ đề nhạy cảm (tài chính cá nhân, sức khỏe)", "Người tham gia ngại chia sẻ trước người lạ.", "Phỏng vấn cá nhân, diary study."] },
            { icon: "eye", cells: ["Cần biết hành vi thật", "Dữ liệu là điều người ta nói.", "Field study, analytics."] },
            { icon: "bar-chart", cells: ["Cần số liệu đại diện", "Mẫu nhỏ, ý kiến bị ảnh hưởng lẫn nhau.", "Khảo sát."] },
            {
              icon: "alert",
              cells: ["Là nguồn dữ liệu duy nhất", "Nielsen cảnh báo không dùng focus group làm nguồn dữ liệu usability duy nhất.", "Kết hợp với quan sát từng người dùng."],
            },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định mục tiêu.", "Điều cần khám phá: nhu cầu, thái độ, ngôn ngữ, phản ứng với khái niệm.", "Mục tiêu nghiên cứu."],
            ["Tuyển người tham gia.", "Cùng đặc điểm liên quan; tránh người quen nhau hoặc người có quan hệ cấp trên – cấp dưới.", "Danh sách cho từng nhóm."],
            ["Viết kịch bản thảo luận.", "Câu hỏi mở, từ chung đến cụ thể; có hoạt động khởi động.", "Kịch bản."],
            ["Chạy buổi thảo luận.", "Điều phối, cân bằng tiếng nói, ghi chép.", "Ghi âm, ghi chép."],
            ["Chạy thêm nhóm.", "Để phân biệt điều chung với điều chỉ riêng một nhóm.", "Dữ liệu từ nhiều nhóm."],
            ["Phân tích.", "Gom chủ đề (affinity diagram), ghi lại trích dẫn tiêu biểu và ngôn ngữ người dùng.", "Nhận định, câu hỏi cần kiểm chứng tiếp."],
          ]}
        />
      </Section>

      <Section {...S.moderator}>
        <P strong>
          Chất lượng focus group phụ thuộc rất nhiều vào người điều phối. Nielsen nêu một rủi ro chính: ý kiến của một người có thể chi phối cả nhóm, và người điều phối phải ngăn điều
          này.
        </P>
        <Table
          head={["Việc cần làm", "Ví dụ"]}
          widths={[360]}
          rows={[
            { icon: "users", cells: ["Cân bằng tiếng nói", "“Cảm ơn anh. Chị Lan, chị có thấy giống vậy không?”"] },
            { icon: "chat", cells: ["Hỏi mở, không dẫn dắt", "Hỏi “Bạn nghĩ gì về…” thay vì “Bạn có thấy … tiện không?”"] },
            { icon: "binoculars", cells: ["Đào sâu", "“Bạn có thể kể một lần cụ thể không?”"] },
            { icon: "target", cells: ["Giữ chủ đề", "Nhẹ nhàng đưa thảo luận quay lại kịch bản."] },
            { icon: "split", cells: ["Trung lập", "Không thể hiện đồng ý hay phản đối."] },
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["chat", "Người ta nói khác với làm", "Nielsen nhấn mạnh điều người tham gia kể về hành vi có thể khác hành vi thật."],
            ["lightbulb", "Muốn khác với cần", "Người dùng có thể nghĩ mình muốn một thứ, nhưng thật ra cần thứ khác."],
            ["users", "Ý kiến bị ảnh hưởng lẫn nhau", "Một hai người nói nhiều có thể kéo cả nhóm theo."],
            ["play-circle", "Xem demo không giống tự dùng", "Phản ứng với một bản trình diễn không cho biết sản phẩm dễ dùng hay không."],
            ["bar-chart", "Không đại diện về mặt thống kê", "Không đếm “bao nhiêu người trong nhóm đồng ý” để suy ra tỷ lệ."],
            ["component", "Focus group online", "Có thể bị thiên lệch do người tự chọn tham gia."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Mục tiêu nghiên cứu.", "Người tham gia cho nhiều nhóm.", "Kịch bản thảo luận.", "Người điều phối, người ghi chép, phòng hoặc nền tảng online."]}
          outputs={["Ghi âm, ghi chép.", "Chủ đề chính về nhu cầu và thái độ.", "Trích dẫn tiêu biểu, ngôn ngữ người dùng.", "Câu hỏi cần kiểm chứng bằng phương pháp khác."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <div className="flex gap-4">
          <InfoCard
            icon="target"
            title="Bối cảnh"
            className="flex-1"
            body="Nhóm muốn thêm một gói tư vấn mới và cần hiểu khách quan tâm điều gì, gọi tên dịch vụ ra sao."
          />
          <InfoCard icon="users" title="Cách áp dụng" className="flex-1" body="Ba focus group, mỗi nhóm 7 người đang cân nhắc dịch vụ tư vấn, mỗi buổi 2 giờ." />
        </div>
        <CheckCards
          mark="•"
          groups={[
            [
              "binoculars",
              "Nhận định (giả định)",
              [
                "Cả ba nhóm đều quay lại câu hỏi “buổi tư vấn giúp được gì cụ thể”.",
                "Người tham gia dùng cụm “nói chuyện với chuyên gia”, không ai dùng chữ “phiên tư vấn” như trên trang.",
                "Một nhóm phản ứng mạnh với giá, hai nhóm còn lại quan tâm đến kinh nghiệm của chuyên gia hơn.",
              ],
            ],
          ]}
        />
        <InfoCard
          icon="check-circle"
          tone="fill"
          title="Cách dùng kết quả"
          body="Đổi nhãn nút thành ngôn ngữ người dùng; đưa ví dụ tình huống cụ thể lên trang. Phản ứng về giá chỉ có ở một nhóm → cần kiểm chứng thêm bằng khảo sát trước khi kết luận."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Dùng focus group để đánh giá độ dễ dùng", "Nói khác làm; xem demo không giống tự dùng.", "Usability testing với từng người."],
            ["Chỉ chạy một nhóm", "Kết quả có thể chỉ phản ánh một vài người nói nhiều.", "Chạy nhiều nhóm."],
            ["Đếm phiếu trong nhóm như khảo sát", "Mẫu nhỏ, ý kiến ảnh hưởng lẫn nhau.", "Dùng để tìm chủ đề, không để đo tỷ lệ."],
            ["Câu hỏi dẫn dắt", "Người tham gia trả lời theo hướng được gợi ý.", "Câu hỏi mở, trung lập."],
            ["Để một người chi phối", "Mất tiếng nói của người khác.", "Người điều phối chủ động cân bằng."],
            ["Chọn chủ đề nhạy cảm", "Người tham gia không chia sẻ thật.", "Phỏng vấn cá nhân."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Phương pháp", "Cách làm", "Thu được", "Khi nào chọn"]}
          widths={[220]}
          rows={[
            {
              icon: "users",
              highlight: true,
              cells: ["Focus Group", "Thảo luận nhóm có điều phối.", "Ý kiến, thái độ, ngôn ngữ, tương tác giữa người tham gia.", "Khám phá nhu cầu, phản ứng với khái niệm."],
            },
            { icon: "chat", cells: ["User Interview", "Trò chuyện một – một.", "Chiều sâu, trải nghiệm cá nhân.", "Chủ đề nhạy cảm, cần chi tiết."] },
            { icon: "play-circle", cells: ["Usability Testing", "Từng người tự làm tác vụ.", "Hành vi sử dụng thật.", "Đánh giá độ dễ dùng."] },
            { icon: "list", cells: ["Survey", "Bảng hỏi cho nhiều người.", "Số liệu về thái độ.", "Cần biết tỷ lệ."] },
            { icon: "book", cells: ["Attitudinal Methods", "Nhóm phương pháp thu điều người dùng nói.", "Thái độ, quan điểm.", "Focus group là một phương pháp trong nhóm này."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Chuẩn bị"
            items={[
              "Mục tiêu là khám phá nhu cầu, thái độ, không phải đánh giá độ dễ dùng.",
              "Chủ đề không quá nhạy cảm để thảo luận nhóm.",
              "Người tham gia cùng đặc điểm liên quan.",
              "Kế hoạch có nhiều hơn một nhóm.",
              "Kịch bản câu hỏi mở, trung lập.",
            ]}
          />
          <ChecklistColumn icon="users" title="Trong buổi" items={["Cân bằng tiếng nói, không để một người chi phối.", "Có người ghi chép riêng."]} />
          <ChecklistColumn
            icon="analytics"
            title="Sau buổi"
            items={[
              "Phân biệt điều chung với điều chỉ riêng một nhóm.",
              "Không suy ra tỷ lệ từ số người đồng ý.",
              "Có kế hoạch kiểm chứng bằng phương pháp quan sát hành vi.",
            ]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Attitudinal Methods", "Phương pháp nghiên cứu thái độ", "Nhóm phương pháp mà focus group thuộc về."],
            ["User Interview", "Phỏng vấn người dùng", "Thay thế khi chủ đề nhạy cảm hoặc cần chiều sâu."],
            ["Usability Testing", "Kiểm thử khả năng sử dụng", "Phương pháp đúng để đánh giá độ dễ dùng."],
            ["Survey", "Khảo sát", "Kiểm chứng chủ đề bằng số liệu."],
            ["Affinity Diagram", "Sơ đồ tương đồng", "Cách tổng hợp nội dung thảo luận."],
            ["Field Study", "Nghiên cứu thực địa", "Quan sát hành vi thật để bổ sung cho điều người tham gia nói."],
          ]}
        />
      </Section>
    </div>
  );
}

export const FOCUS_GROUP: Article = {
  slug: "focus-group",
  version: 1,
  term: "Focus Group",
  fn: 1,
  vi: "Thảo luận nhóm tập trung",
  kind: "Phương pháp nghiên cứu / kiểm thử",
  definition:
    "Focus group là phương pháp nghiên cứu định tính, trong đó một nhóm nhỏ người tham gia cùng thảo luận về một chủ đề dưới sự điều phối của người dẫn dắt, nhằm tìm hiểu nhu cầu, quan điểm, thái độ và cách họ nói về chủ đề đó.",
  definitionMore: "Giá trị đặc trưng nằm ở sự tương tác giữa các thành viên: ý kiến của người này gợi ra ý kiến của người khác.",
  oneLine: "Thảo luận nhóm có người dẫn dắt để tìm hiểu nhu cầu và thái độ, không để đo độ dễ dùng.",
  glance: [
    ["6–9", "Người mỗi nhóm (Nielsen)"],
    ["≈ 2 giờ", "Mỗi buổi thảo luận"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Group interview (gần nghĩa)"] },
    { label: "Nhóm chính", items: ["Nghiên cứu khám phá"] },
    { label: "Thẻ phụ", items: ["Nghiên cứu định tính", "Nghiên cứu thái độ"] },
    {
      label: "Lưu ý tên gọi",
      items: ["Focus group là thảo luận có điều phối giữa nhiều người cùng lúc. Không phải usability test theo nhóm: focus group thu ý kiến và thái độ, không đo hành vi sử dụng."],
    },
  ],
  sections: SECTIONS,
  Body,
};
