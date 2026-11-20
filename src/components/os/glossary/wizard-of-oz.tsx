"use client";

import { Blk, T } from "./edit";
import { CheckCards, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, Icon, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef, type IconName } from "./ui";

/* Wizard of Oz — copy from ux-glossary/wizard-of-oz.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "roles", title: "Các vai trò và kiểu phản hồi", icon: "users" },
  { id: "when", title: "Khi nào nên dùng / chưa phù hợp", icon: "check-circle" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "ethics", title: "Đạo đức: có cần nói thật với người tham gia?", icon: "shield-alert" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

function Node({ icon, title, body, strong }: { icon: IconName; title: string; body: string; strong?: boolean }) {
  return (
    <div className={`flex flex-1 flex-col gap-2 rounded-2xl p-5 ${strong ? "bg-[var(--d-fill)] text-white" : "bg-[var(--d-soft)]"}`}>
      <Icon name={icon} size={22} />
      <span className="text-[17px] leading-[24px] font-semibold">{title}</span>
      <span className={`text-[15px] leading-[22px] ${strong ? "text-white/85" : "text-[var(--w-secondary)]"}`}>{body}</span>
    </div>
  );
}

/** Request goes through the interface to a hidden wizard; the reply comes back as if from the system. */
function WozDiagram() {
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="users" size={36} iconSize={18} radius={10} />
        <Eyebrow>Ai làm gì trong một buổi Wizard of Oz</Eyebrow>
      </div>
      <div className="flex items-stretch gap-3">
        <div className="flex flex-[2] flex-col gap-3 rounded-[24px] bg-[var(--d-well)] p-4">
          <span className="text-[14px] font-semibold text-[var(--w-muted)]">Phòng nghiên cứu</span>
          <div className="flex flex-1 gap-3">
            <Node icon="users" title="Người tham gia" body="Gửi yêu cầu qua giao diện." />
            <Node icon="chat" title="Người điều phối" body="Ngồi cạnh, quan sát và hỏi thêm." />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 text-[13px] text-[var(--w-muted)]">
          <span>yêu cầu</span>
          <Icon name="arrow-right" size={22} className="text-[var(--d-fill)]" />
          <Icon name="arrow-right" size={22} className="rotate-180 text-[var(--d-fill)]" />
          <span>phản hồi</span>
        </div>
        <div className="flex flex-1 flex-col gap-3 rounded-[24px] bg-[var(--d-well)] p-4">
          <span className="text-[14px] font-semibold text-[var(--w-muted)]">Phòng khác (ẩn)</span>
          <Node strong icon="play-circle" title="Phù thủy" body="Chọn hoặc gõ phản hồi theo quy tắc đã chuẩn bị." />
        </div>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Phản hồi hiện trên giao diện như thể do hệ thống tạo. Người tham gia không thấy phù thủy.
      </T>
    </Blk>
  );
}

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Section {...S.problem}>
        <P>
          Một số thiết kế phụ thuộc vào công nghệ đắt và phức tạp: chatbot hiểu ngôn ngữ tự nhiên, trợ lý giọng nói, hệ thống gợi ý, tra cứu dữ liệu theo thời gian thực. Prototype tĩnh không thể
          hiện được trải nghiệm này, còn xây thật để thử thì quá tốn kém, nhất là khi chưa biết người dùng có cần không.
        </P>
        <CheckCards
          groups={[
            [
              "check-circle",
              "Wizard of Oz giúp (theo NN/g)",
              [
                "Tìm hiểu người dùng có muốn, có thấy hữu ích, có dùng được một ý tưởng hay không, trước khi đầu tư xây công nghệ.",
                "Quan sát cách người dùng thật sự nói hoặc hỏi, để biết hệ thống cần hiểu những gì.",
              ],
            ],
          ]}
        />
        <InfoCard
          icon="file"
          title="Nguồn gốc"
          body="Theo NN/g, phương pháp được ghi nhận sớm vào năm 1973 (Don Norman và Allen Munro, thử một trợ lý du lịch tự động ở sân bay), và tên gọi do Jeff Kelley đặt năm 1983 trong luận án về giao diện ngôn ngữ tự nhiên."
        />
      </Section>

      <Section {...S.roles}>
        <Subhead icon="users">Vai trò trong buổi nghiên cứu</Subhead>
        <Table
          head={["Vai trò", "Việc làm"]}
          widths={[300]}
          rows={[
            { icon: "users", cells: ["Người tham gia", "Người dùng mục tiêu, tương tác với giao diện."] },
            { icon: "chat", cells: ["Người điều phối (facilitator)", "Giao việc, đặt câu hỏi, quan sát."] },
            { icon: "play-circle", highlight: true, cells: ["Phù thủy (wizard)", "Ở chỗ khác, tạo phản hồi của “hệ thống” theo quy tắc đã chuẩn bị."] },
          ]}
        />
        <WozDiagram />
        <Subhead icon="chat">Kiểu phản hồi (theo NN/g)</Subhead>
        <Table
          head={["Kiểu", "Mô tả", "Phù hợp khi"]}
          widths={[180]}
          rows={[
            { cells: ["Đóng", "Phù thủy chọn từ một số phản hồi soạn sẵn.", "Hệ thống có ít phản hồi cố định."] },
            { cells: ["Mở", "Phù thủy tự viết phản hồi.", "Giao diện hội thoại linh hoạt."] },
            { cells: ["Kết hợp", "Có cả phản hồi soạn sẵn và tự viết.", "Cần cả hai."] },
          ]}
        />
        <P>Mỗi kiểu có đánh đổi: phản hồi đóng có thể không khớp tình huống; phản hồi mở thay đổi giữa các buổi, khó so sánh.</P>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "check-circle",
              "Nên dùng khi (theo NN/g)",
              [
                "Thiết kế giao diện hội thoại (chatbot, trợ lý giọng nói).",
                "Giao diện dùng thuật toán học máy để gợi ý.",
                "Giao diện tra cứu thông tin theo thời gian thực.",
                "Muốn thử ý tưởng dựa trên AI tạo sinh trước khi xây.",
              ],
            ],
          ]}
        />
        <Table
          head={["Chưa phù hợp khi", "Vì sao", "Thay bằng"]}
          widths={[320]}
          rows={[
            { icon: "component", cells: ["Giao diện thông thường, phản hồi đơn giản", "Prototype đã đủ.", "Low/high-fidelity prototype."] },
            { icon: "bar-chart", cells: ["Cần đo hiệu năng thật của thuật toán", "Người không phản ánh được giới hạn của máy.", "Thử nghiệm với hệ thống thật."] },
            { icon: "users", cells: ["Cần nhiều người tham gia, không điều phối", "Phương pháp cần phù thủy theo dõi từng buổi.", "Remote unmoderated testing với prototype."] },
          ]}
        />
      </Section>

      <Section {...S.apply} intro="Theo NN/g, gồm các bước:">
        <Steps
          steps={[
            ["Tạo prototype", "Giao diện mà người tham gia sẽ thấy.", "Giao diện cho người tham gia."],
            ["Chọn kiểu phản hồi", "Đóng, mở hay kết hợp.", "Thư viện phản hồi hoặc quy tắc viết phản hồi."],
            ["Viết kế hoạch nghiên cứu", "Vai trò, câu hỏi của người điều phối, cách phù thủy điều khiển, quy tắc phản hồi (bao gồm khi nào hệ thống “không hiểu”).", "Kịch bản nghiên cứu."],
            ["Chuẩn bị phù thủy", "Lý tưởng là có kỹ sư tham gia để phản hồi sát với khả năng thật của công nghệ.", "Phù thủy đã luyện tập."],
            ["Chạy thử (pilot)", "", "Kịch bản và công cụ đã sửa."],
            ["Chạy nghiên cứu", "Rồi giải thích lại cho người tham gia sau buổi (debrief) nếu có giấu thông tin.", "Quan sát, ghi chép."],
          ]}
        />
      </Section>

      <Section {...S.ethics}>
        <P>Theo NN/g:</P>
        <InfoGrid
          cols={2}
          items={[
            ["eye", "Thường không nói trước", "Để hành vi tự nhiên. Nếu người tham gia đoán ra, buổi nghiên cứu dễ biến thành “đóng vai”."],
            ["chat", "Nếu người tham gia hỏi", "Có thể nhắc họ cứ hành xử như với hệ thống thật."],
            ["rotate", "Debrief sau buổi", "Khi có giấu thông tin, cần giải thích lại để người tham gia biết sự thật và có thể rút dữ liệu của mình."],
            ["shield-alert", "Không bắt buộc tiết lộ trước", "Trừ khi việc không biết có thể gây hại cho người tham gia."],
          ]}
        />
        <Callout tone="note" icon="alert">
          Thêm cho bối cảnh của bạn: kiểm tra quy định đạo đức nghiên cứu của tổ chức. Nếu người tham gia có thể chia sẻ thông tin nhạy cảm (ví dụ tài chính cá nhân) vì nghĩ đang nói với máy, cần cân
          nhắc kỹ và nói rõ cách dữ liệu được dùng.
        </Callout>
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["play-circle", "Phù thủy có thể “hiểu tốt hơn” máy", "Khiến trải nghiệm trông đẹp hơn thực tế. Có kỹ sư tham gia giúp giảm rủi ro này."],
            ["split", "Phản hồi mở khác nhau giữa các buổi", "Khó đánh giá chung."],
            ["eye", "Người tham gia đoán ra", "Hành vi có thể không còn tự nhiên."],
            ["target", "Không chứng minh công nghệ làm được", "Kết quả cho biết người dùng muốn và dùng thế nào, không chứng minh công nghệ làm được như vậy."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={[
            "Prototype giao diện.",
            "Thư viện hoặc quy tắc phản hồi.",
            "Kịch bản nghiên cứu, phân vai.",
            "Phù thủy đã luyện tập; kỹ sư tư vấn về khả năng thật của công nghệ.",
            "Quy trình debrief.",
          ]}
          outputs={[
            "Cách người dùng diễn đạt yêu cầu.",
            "Mức hữu ích, mong muốn đối với ý tưởng.",
            "Vấn đề khả năng sử dụng của luồng.",
            "Yêu cầu cho hệ thống thật (cần hiểu những loại câu hỏi nào).",
          ]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard icon="component" title="Bối cảnh" body="Nhóm muốn thêm trợ lý trò chuyện giúp khách chọn gói tư vấn, nhưng chưa biết khách có muốn không và họ sẽ hỏi gì." />
        <CheckCards
          groups={[
            [
              "list",
              "Chuẩn bị",
              [
                "Giao diện ô chat trên trang dịch vụ.",
                "Phản hồi kết hợp: soạn sẵn cho câu hỏi về giá, giờ, giấy tờ; tự viết cho câu hỏi khác, theo quy tắc ngắn gọn, không tư vấn tài chính cụ thể.",
                "Quy tắc “không hiểu”: nếu câu hỏi ngoài phạm vi, trả lời rằng chưa hỗ trợ và gợi ý đặt lịch với chuyên gia.",
                "Kỹ sư xác nhận những loại câu hỏi mà công nghệ dự kiến xử lý được.",
              ],
            ],
          ]}
        />
        <div className="flex gap-4">
          <InfoCard
            icon="eye"
            title="Quan sát (minh họa)"
            className="flex-1"
            body="6 người tham gia; phần lớn câu hỏi xoay quanh “gói nào hợp với tôi” và “chi phí tổng cộng”; 2 người hỏi về bảo mật thông tin."
          />
          <InfoCard
            icon="rotate"
            title="Debrief"
            className="flex-1"
            body="Sau buổi, người điều phối giải thích có người điều khiển trợ lý, và hỏi người tham gia có đồng ý dùng dữ liệu buổi đó không."
          />
        </div>
        <InfoCard tone="fill" icon="check-circle" title="Quyết định" body="Xây trợ lý tập trung vào ba chủ đề trên; câu hỏi khác chuyển sang đặt lịch với người thật." />
        <Callout tone="note" icon="briefcase">
          Số liệu minh họa. Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Phù thủy “quá thông minh”", "Trải nghiệm đẹp hơn công nghệ thật làm được.", "Có quy tắc phản hồi; kỹ sư tham gia."],
            ["Không có quy tắc phản hồi", "Mỗi buổi một kiểu, không so sánh được.", "Soạn thư viện và quy tắc trước."],
            ["Không debrief", "Vi phạm đạo đức khi có giấu thông tin.", "Luôn giải thích sau buổi."],
            ["Phản hồi chậm bất thường", "Người tham gia đoán ra có người điều khiển.", "Luyện tập; dùng phản hồi soạn sẵn."],
            ["Kết luận công nghệ khả thi", "Phương pháp không kiểm tra công nghệ.", "Kiểm tra khả thi riêng."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Khác ở đâu"]}
          widths={[320]}
          rows={[
            { icon: "play-circle", highlight: true, cells: ["Wizard of Oz", "Người thật đóng vai hệ thống phía sau giao diện."] },
            { icon: "component", cells: ["Prototype", "Hệ thống phản hồi theo kịch bản cố định, không có người điều khiển."] },
            { icon: "play-circle", cells: ["Minimum Viable Product", "Sản phẩm tối thiểu cho khách thật dùng; đôi khi cũng có người làm thủ công phía sau (NN/g nhắc ví dụ Zappos)."] },
            { icon: "users", cells: ["Synthetic User", "AI đóng vai người dùng; Wizard of Oz là người đóng vai hệ thống."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Chuẩn bị"
            items={["Có prototype giao diện.", "Đã chọn kiểu phản hồi và soạn quy tắc.", "Phù thủy đã luyện tập; có kỹ sư tư vấn.", "Có quy trình debrief.", "Đã chạy thử."]}
          />
          <ChecklistColumn icon="analytics" title="Sau buổi" items={["Đã debrief nếu có giấu thông tin.", "Không kết luận về khả năng của công nghệ."]} />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Prototype", "Bản mẫu", "Giao diện người tham gia nhìn thấy."],
            ["Moderated Testing", "Kiểm thử có người điều phối", "Wizard of Oz là một dạng có điều phối."],
            ["Usability Testing", "Kiểm thử khả năng sử dụng", "Khung phương pháp chung."],
            ["Minimum Viable Product", "Sản phẩm khả dụng tối thiểu", "Có thể vận hành thủ công phía sau."],
            ["Synthetic User", "Người dùng tổng hợp", "Ngược vai: AI đóng người dùng."],
            ["Task Scenario", "Kịch bản tác vụ", "Việc giao cho người tham gia."],
          ]}
        />
      </Section>
    </div>
  );
}

export const WIZARD_OF_OZ: Article = {
  slug: "wizard-of-oz",
  version: 1,
  term: "Wizard of Oz",
  fn: 5,
  vi: "Phương pháp “phù thủy xứ Oz”",
  kind: "Phương pháp kiểm thử",
  definition:
    "Wizard of Oz là phương pháp nghiên cứu có người điều phối, trong đó người tham gia dùng một giao diện trông như tự hoạt động, nhưng thực ra toàn bộ hoặc một phần phản hồi do một người ẩn phía sau tạo ra.",
  definitionMore: "Nhờ vậy, nhóm có thể thử ý tưởng dựa trên công nghệ phức tạp (như AI) mà chưa cần xây công nghệ đó.",
  oneLine: "Một người bí mật đóng vai hệ thống để thử ý tưởng trước khi xây công nghệ thật.",
  glance: [
    ["3 vai", "Người tham gia, điều phối, phù thủy"],
    ["1983", "Năm Jeff Kelley đặt tên"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["WoZ"] },
    { label: "Nhóm chính", items: ["Kiểm thử khả năng sử dụng"] },
    { label: "Thẻ phụ", items: ["Thiết kế và tạo mẫu"] },
    {
      label: "Lưu ý tên gọi",
      items: ["Tên lấy từ tiểu thuyết The Wonderful Wizard of Oz của L. Frank Baum, nơi “phù thủy” quyền năng thực ra là một người đứng sau tấm màn. Trong nghiên cứu, “phù thủy” là người bí mật điều khiển hệ thống."],
    },
  ],
  sections: SECTIONS,
  Body,
};
