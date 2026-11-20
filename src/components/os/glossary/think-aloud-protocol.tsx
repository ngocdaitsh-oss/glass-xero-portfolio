"use client";

import { Blk, T } from "./edit";
import { CheckCards, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Think-Aloud Protocol — copy from ux-glossary/think-aloud-protocol.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "pros-cons", title: "Ưu điểm và hạn chế", icon: "split" },
  { id: "when", title: "Khi nào nên dùng / chưa phù hợp", icon: "check-circle" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "prompts", title: "Câu nhắc của người điều phối", icon: "chat" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

const SAID = ["“Gói Cơ bản 500 nghìn…”", "“còn gói Chuyên sâu thì… à, không thấy giá.”", "“Chắc phải liên hệ? Thôi chắc đắt lắm.”"];
const DID = ["Đọc gói Cơ bản", "Tìm giá gói Chuyên sâu, không thấy", "Chọn gói Cơ bản"];

/** What participant 3 said, lined up against what they did at the same moment. */
function SaidDid() {
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="chat" size={36} iconSize={18} radius={10} />
        <Eyebrow>Người tham gia 3, ở trang chọn gói</Eyebrow>
      </div>
      <div className="grid grid-cols-[110px_repeat(3,1fr)] gap-3">
        <span className="flex items-center text-[15px] font-semibold">Nghe được</span>
        {SAID.map((s, i) => (
          <div key={i} className="rounded-2xl bg-[var(--d-ci-weak)] px-4 py-3 text-[15px] leading-[22px] italic">
            {s}
          </div>
        ))}
        <span className="flex items-center text-[15px] font-semibold">Thấy được</span>
        {DID.map((d, i) => (
          <div key={i} className={`rounded-2xl px-4 py-3 text-[15px] leading-[22px] ${i === 2 ? "bg-[var(--d-fill)] font-semibold text-white" : "bg-[var(--d-well)]"}`}>
            {d}
          </div>
        ))}
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Chỉ nhìn hành vi, nhóm thấy khách chọn gói Cơ bản. Nghe lời nói, nhóm biết vì sao: thiếu giá gói Chuyên sâu, dù gói đó phù hợp nhu cầu hơn.
      </T>
    </Blk>
  );
}

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Section {...S.problem}>
        <P>
          Quan sát hành vi cho biết người dùng làm gì, nhưng không cho biết vì sao. Một người dừng lại 10 giây trước nút “Tiếp tục” có thể đang đọc kỹ, đang lo về giá, hoặc không hiểu nút sẽ dẫn
          đi đâu. Hỏi sau buổi thì người dùng thường quên hoặc kể lại theo cách hợp lý hóa.
        </P>
        <Eyebrow>Think-aloud giúp</Eyebrow>
        <InfoGrid
          cols={3}
          minH={150}
          items={[
            ["alert", "Nghe được hiểu nhầm", "Ngay khi nó xảy ra."],
            ["lightbulb", "Biết kỳ vọng của người dùng", "Trước khi họ nhấn."],
            ["chat", "Có câu nói trực tiếp", "Để thuyết phục nhóm và lãnh đạo."],
          ]}
        />
      </Section>

      <Section {...S["pros-cons"]}>
        <P>Theo Nielsen (2012):</P>
        <div className="flex items-start gap-4">
          <CheckCards
            groups={[
              [
                "check-circle",
                "Ưu điểm",
                [
                  "Rẻ: không cần thiết bị đặc biệt.",
                  "Vững: dù làm chưa hoàn hảo vẫn cho phát hiện hữu ích.",
                  "Linh hoạt: dùng được ở mọi giai đoạn, từ bản vẽ giấy tới sản phẩm thật.",
                  "Thuyết phục: nghe người dùng nói trực tiếp khiến nhóm dễ chấp nhận vấn đề.",
                  "Dễ học: người mới có thể bắt đầu nhanh.",
                ],
              ],
              [
                "alert",
                "Hạn chế",
                [
                  "Không cho số liệu thống kê: phù hợp nghiên cứu định tính.",
                  "Không tự nhiên: người bình thường không nói to khi dùng máy.",
                  "Người dùng tự lọc lời nói: có thể chỉ nói điều họ cho là “đúng” hoặc “nên nói”.",
                  "Dễ bị người điều phối dẫn dắt: câu nhắc thiếu kinh nghiệm có thể làm thay đổi hành vi.",
                ],
              ],
            ]}
          />
        </div>
        <Callout tone="note">
          Vì người tham gia phải vừa làm vừa nói, thao tác có thể chậm hơn và khác lúc dùng bình thường. Nguồn trong bài không đo mức ảnh hưởng này; để thận trọng, nếu cần số liệu thời gian làm
          tác vụ, nên đo trong buổi riêng không nói to.
        </Callout>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "check-circle",
              "Nên dùng khi",
              ["Cần hiểu vì sao người dùng gặp khó.", "Kiểm thử định tính với ít người tham gia.", "Kiểm thử prototype ở bất kỳ mức độ hoàn thiện nào."],
            ],
          ]}
        />
        <Table
          head={["Chưa phù hợp khi", "Vì sao", "Thay bằng"]}
          widths={[320]}
          rows={[
            {
              icon: "hourglass",
              cells: ["Cần đo thời gian, tỷ lệ chính xác", "Nói to có thể làm chậm và thay đổi hành vi; phương pháp không hợp với thống kê chi tiết.", "Kiểm thử định lượng không nói to."],
            },
            { icon: "gauge", cells: ["Tác vụ đòi hỏi tập trung cao (ví dụ nhập số liệu tài chính)", "Nói to làm phân tâm.", "Retrospective think-aloud: xem lại bản ghi rồi nói."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Giới thiệu và làm mẫu ngắn.", "Cho người tham gia thấy “nói to suy nghĩ” là thế nào.", "Người tham gia hiểu cách làm."],
            ["Giao task scenario.", "Nhắc họ cứ nói những gì đang nghĩ.", "Người tham gia bắt đầu tác vụ."],
            ["Giữ im lặng phần lớn thời gian.", "Chỉ nhắc nhẹ khi người tham gia im lặng lâu.", "Lời nói tự nhiên, ít bị dẫn dắt."],
            ["Ghi lại lời nói kèm hành động.", "Ghi hình nếu được đồng ý.", "Ghi chép đồng bộ lời nói và hành vi."],
            ["Hỏi thêm sau tác vụ, không hỏi giữa tác vụ.", "", "Giải thích bổ sung."],
            ["Phân tích.", "Nhóm các câu nói theo vấn đề, kết hợp với hành vi quan sát được.", "Danh sách vấn đề kèm bằng chứng."],
          ]}
        />
      </Section>

      <Section {...S.prompts}>
        <Table
          head={["Nên", "Không nên", "Vì sao"]}
          widths={[340]}
          rows={[
            { icon: "check", cells: ["“Bạn đang nghĩ gì?”", "“Bạn có thấy nút Đặt lịch không?”", "Câu sau chỉ đường."] },
            { icon: "check", cells: ["“Cứ tiếp tục nói nhé.”", "“Đúng rồi, chỗ đó đấy.”", "Câu sau xác nhận, thay đổi hành vi."] },
            { icon: "check", cells: ["“Bạn mong đợi điều gì sẽ xảy ra?”", "“Bạn có thích thiết kế này không?”", "Câu sau hỏi ý kiến, không hỏi suy nghĩ."] },
            { icon: "check", cells: ["Im lặng khi người tham gia đang nói.", "Ngắt lời để giải thích.", "Ngắt lời làm mất mạch suy nghĩ."] },
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          cols={3}
          items={[
            ["chat", "Lời nói là những gì người tham gia chọn nói ra", "Không phải toàn bộ suy nghĩ."],
            ["bar-chart", "Phát hiện là định tính", "Cho biết vấn đề có tồn tại, không cho biết bao nhiêu phần trăm người dùng gặp."],
            ["hourglass", "Thời gian và tỷ lệ hoàn thành trong buổi think-aloud", "Không nên báo cáo như số liệu định lượng."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Bộ task scenario.", "Lời giới thiệu và ví dụ làm mẫu.", "Danh sách câu nhắc trung tính.", "Cách ghi lại (ghi hình, ghi chú)."]}
          outputs={["Ghi chép lời nói kèm hành vi.", "Danh sách vấn đề kèm câu nói làm bằng chứng."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard icon="component" title="Bối cảnh" body="Kiểm thử luồng đặt lịch với 5 người, dùng think-aloud." />
        <SaidDid />
        <InfoCard
          icon="analytics"
          title="Phát hiện"
          body="3 trên 5 người nói gần giống nhau về việc thiếu giá gói Chuyên sâu. Hành vi cho thấy họ tránh gói đó. Với 5 người, đây là tín hiệu định tính: vấn đề có tồn tại, chưa cho biết tỷ lệ chính xác."
        />
        <InfoCard tone="fill" icon="check-circle" title="Quyết định" body="Hiển thị giá cho mọi gói." />
        <Callout tone="note" icon="briefcase">
          Số liệu minh họa. Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Người điều phối nói quá nhiều", "Dẫn dắt, thay đổi hành vi.", "Im lặng, chỉ nhắc trung tính."],
            ["Hỏi ý kiến thay vì suy nghĩ", "“Thích không” khác “đang nghĩ gì”.", "Hỏi kỳ vọng, suy nghĩ."],
            ["Báo cáo thời gian như số liệu thật", "Nói to có thể làm chậm thao tác.", "Tách buổi đo thời gian."],
            ["Chỉ dựa vào lời nói", "Lời nói có thể khác hành động.", "Kết hợp với hành vi quan sát được."],
            ["Không làm mẫu", "Người tham gia không biết nói gì.", "Làm mẫu ngắn trước."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Khi nào nói", "Ghi chú"]}
          widths={[300]}
          rows={[
            { icon: "chat", highlight: true, cells: ["Concurrent think-aloud", "Trong khi làm tác vụ.", "Dạng phổ biến nhất."] },
            { icon: "rotate", cells: ["Retrospective think-aloud", "Sau khi làm, khi xem lại bản ghi.", "Ít ảnh hưởng hành vi, nhưng dễ quên hoặc hợp lý hóa."] },
            { icon: "users", cells: ["Moderated Testing", "Bối cảnh: có người điều phối.", "Think-aloud là kỹ thuật thường dùng trong đó."] },
            { icon: "list-search", cells: ["User Interview", "Không làm tác vụ, chỉ trò chuyện.", "Cho biết người dùng kể gì, không quan sát hành vi."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Chuẩn bị"
            items={["Có lời giới thiệu và ví dụ làm mẫu.", "Có danh sách câu nhắc trung tính.", "Nếu cần số liệu thời gian, đo trong buổi riêng."]}
          />
          <ChecklistColumn icon="eye" title="Trong buổi" items={["Người điều phối giữ im lặng phần lớn thời gian.", "Câu hỏi thêm để sau tác vụ."]} />
          <ChecklistColumn icon="analytics" title="Phân tích" items={["Kết hợp lời nói với hành vi.", "Báo cáo là phát hiện định tính."]} />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Moderated Testing", "Kiểm thử có người điều phối", "Bối cảnh thường dùng think-aloud."],
            ["Usability Testing", "Kiểm thử khả năng sử dụng", "Phương pháp chứa kỹ thuật này."],
            ["Task Scenario", "Kịch bản tác vụ", "Việc giao cho người tham gia khi nói to."],
            ["Qualitative Research", "Nghiên cứu định tính", "Think-aloud cho dữ liệu định tính."],
            ["Eye Tracking", "Theo dõi chuyển động mắt", "Cho biết người dùng nhìn đâu; think-aloud cho biết họ nghĩ gì."],
          ]}
        />
      </Section>
    </div>
  );
}

export const THINK_ALOUD_PROTOCOL: Article = {
  slug: "think-aloud-protocol",
  version: 1,
  term: "Think-Aloud Protocol",
  fn: 5,
  vi: "Nói to suy nghĩ",
  kind: "Phương pháp nghiên cứu",
  definition:
    "Think-aloud protocol là kỹ thuật yêu cầu người tham gia vừa dùng sản phẩm vừa nói ra liên tục những gì họ đang nghĩ, để nhóm nghiên cứu hiểu được lý do đằng sau hành động.",
  definitionMore: "Người quan sát không chỉ thấy người dùng nhấn vào đâu, mà còn nghe được họ đang kỳ vọng gì, hiểu nhầm gì, do dự ở đâu.",
  oneLine: "Người tham gia nói to suy nghĩ khi dùng sản phẩm, giúp nhóm hiểu lý do đằng sau hành động.",
  glance: [
    ["5", "Ưu điểm theo Nielsen"],
    ["3/5", "Người nói về thiếu giá trong ví dụ"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Thinking aloud", "Think-aloud method"] },
    { label: "Nhóm chính", items: ["Kiểm thử khả năng sử dụng"] },
    { label: "Thẻ phụ", items: ["Nghiên cứu định tính"] },
    { label: "Lưu ý tên gọi", items: ["Think-aloud là kỹ thuật dùng trong buổi kiểm thử, thường kết hợp với moderated testing. Không phải một loại kiểm thử riêng."] },
  ],
  sections: SECTIONS,
  Body,
};
