"use client";

import { Fragment } from "react";
import { Blk, T } from "./edit";
import { CheckCards, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Session Replay — copy from ux-glossary/session-replay.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "parts", title: "Thành phần và cách hoạt động", icon: "component" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "privacy", title: "Quyền riêng tư", icon: "shield-alert" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các phương pháp gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

const EVENTS: [string, boolean][] = [
  ["Mở trang dịch vụ", false],
  ["Cuộn xuống bảng giá", false],
  ["Chạm vào ảnh bảng giá", true],
  ["Chạm hai ngón để phóng to", true],
  ["Rời trang", false],
];

/** One replayed phone session as a sequence of events; the highlighted steps are the pattern repeated across sessions. */
function ReplayTimeline() {
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="play-circle" size={36} iconSize={18} radius={10} />
        <Eyebrow>Chuỗi hành vi trong một phiên trên điện thoại</Eyebrow>
      </div>
      <div className="flex items-stretch gap-2">
        {EVENTS.map(([label, hot], i) => (
          <Fragment key={label}>
            {i > 0 && <span className="flex items-center font-mono text-[18px] text-[var(--w-muted)]">→</span>}
            <div className={`flex flex-1 flex-col gap-2 rounded-2xl p-4 ${hot ? "bg-[var(--d-fill)] text-white" : "bg-[var(--d-well)]"}`}>
              <span className={`font-mono text-[13px] ${hot ? "text-white/80" : "text-[var(--w-muted)]"}`}>Bước {i + 1}</span>
              <span className="text-[15px] leading-[22px] font-semibold">{label}</span>
            </div>
          </Fragment>
        ))}
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Analytics chỉ cho biết khách rời trang; bản ghi cho thấy họ đã cố phóng to ảnh bảng giá vì chữ quá nhỏ. Bản ghi không cho biết họ nghĩ gì, nên cần kiểm chứng bằng usability test.
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
            Analytics và heatmap cho biết ở đâu người dùng bỏ đi hoặc click nhiều, nhưng gộp hành vi của nhiều người nên không thấy chuỗi hành động của từng người: họ thử gì trước, quay lại
            đâu, bấm đi bấm lại chỗ nào.
          </P>
          <P strong>Session replay cho thấy từng phiên cụ thể, giúp hiểu vì sao một con số trong analytics như vậy.</P>
        </div>
        <Eyebrow>Session replay hỗ trợ</Eyebrow>
        <InfoGrid
          cols={3}
          minH={150}
          items={[
            ["arrows", "Hiểu chuỗi hành vi", "Dẫn tới bỏ dở."],
            ["alert", "Phát hiện lỗi kỹ thuật", "Người dùng gặp nhưng không báo."],
            ["check-circle", "Kiểm chứng giả thuyết", "Từ heatmap hay analytics."],
          ]}
        />
      </Section>

      <Section {...S.parts}>
        <Table
          head={["Thành phần", "Mô tả", "Ví dụ minh họa (giả định)"]}
          widths={[240]}
          rows={[
            { icon: "play-circle", cells: ["Bản ghi phiên", "Dựng lại các bước người dùng đã làm.", "Khách mở trang dịch vụ, cuộn, vào form, rời đi."] },
            { icon: "filter", cells: ["Bộ lọc", "Chọn phiên theo điều kiện.", "Phiên trên điện thoại, có vào form nhưng không hoàn tất."] },
            { icon: "alert", cells: ["Tín hiệu hành vi", "Công cụ đánh dấu hành vi bất thường.", "Click liên tục vào một chỗ (rage click), cuộn qua lại nhanh."] },
            { icon: "shield-alert", cells: ["Ẩn dữ liệu nhạy cảm", "Che nội dung các ô nhạy cảm.", "Số điện thoại, email không hiển thị trong bản ghi."] },
            { icon: "calendar", cells: ["Thời gian lưu", "Bản ghi được giữ trong một thời gian.", "Clarity ghi nhận lưu 30 ngày (bản ghi đánh dấu yêu thích lâu hơn)."] },
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
                "Có số liệu cho thấy vấn đề ở một bước, cần hiểu chuỗi hành vi.",
                "Nghi ngờ có lỗi kỹ thuật trên một số thiết bị.",
                "Muốn thấy hành vi thật, không bị ảnh hưởng bởi việc biết mình được quan sát.",
              ],
            ],
            ["eye", "Dấu hiệu nhận biết", ["Tỷ lệ bỏ cao ở một bước nhưng không tái hiện được vấn đề nội bộ.", "Heatmap cho thấy click nhiều vào chỗ không bấm được."]],
            [
              "clipboard-check",
              "Điều kiện cần",
              ["Công cụ ghi phiên, đã cấu hình ẩn dữ liệu nhạy cảm.", "Chính sách quyền riêng tư thông báo cho người dùng.", "Thời gian xem phiên (xem phiên tốn thời gian)."],
            ],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[340]}
          rows={[
            { icon: "chat", cells: ["Cần biết người dùng nghĩ gì", "Không có lời nói, không hỏi được.", "Usability test có think-aloud."] },
            { icon: "bar-chart", cells: ["Cần số liệu tổng", "Xem từng phiên không cho tỷ lệ.", "Analytics, funnel."] },
            { icon: "shield-alert", cells: ["Trang có nhiều dữ liệu nhạy cảm", "Rủi ro quyền riêng tư cao.", "Tắt ghi phiên ở trang đó; usability test."] },
            { icon: "pencil", cells: ["Chưa có sản phẩm thật", "Cần người dùng thật.", "Usability test với bản mẫu."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Bắt đầu từ câu hỏi, không xem ngẫu nhiên.", "Ví dụ: “Vì sao khách bỏ ở bước xác nhận trên điện thoại?”", "Câu hỏi và bộ lọc."],
            ["Lọc phiên liên quan.", "", "Danh sách phiên cần xem."],
            ["Xem và ghi chú.", "Ghi lại hành vi lặp lại, thời điểm, thiết bị.", "Ghi chú theo phiên."],
            ["Gom mẫu hình.", "Đếm số phiên có cùng hành vi để ưu tiên.", "Mẫu hình và mức độ lặp lại trong số phiên đã xem."],
            ["Kiểm chứng.", "Tái hiện lỗi, hoặc chạy usability test để hiểu vì sao.", "Nguyên nhân, đề xuất sửa."],
          ]}
        />
      </Section>

      <Section {...S.privacy}>
        <P strong>Session replay ghi lại hành vi của người dùng thật, nên quyền riêng tư là yêu cầu bắt buộc:</P>
        <InfoGrid
          items={[
            ["shield-alert", "Ẩn nội dung các ô nhạy cảm", "Clarity ghi nhận lưu nội dung ở dạng đã che với các trường nhạy cảm. Kiểm tra lại cấu hình, đặc biệt với ô nhập tự thiết kế."],
            ["file", "Thông báo trong chính sách quyền riêng tư", "Và tuân thủ quy định về dữ liệu cá nhân nơi dịch vụ hoạt động."],
            ["ban", "Tắt ghi ở trang nhạy cảm", "Thanh toán, thông tin tài chính, sức khỏe."],
            ["users", "Giới hạn người được xem", "Và thời gian lưu."],
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["chat", "Không biết người dùng nghĩ gì", "Hay vì sao họ dừng lại."],
            ["users", "Phiên được xem có thể không đại diện", "Nhất là khi chỉ xem vài phiên đầu tiên."],
            ["eye", "Dễ thiên lệch xác nhận", "Chỉ thấy điều đang tìm."],
            ["component", "Bản ghi dựng lại có thể khác màn hình thật", "Ở một số trường hợp (nội dung động, nội dung nhúng)."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Câu hỏi, bộ lọc.", "Công cụ đã cấu hình ẩn dữ liệu.", "Thời gian xem."]}
          outputs={["Ghi chú theo phiên.", "Mẫu hình hành vi lặp lại.", "Lỗi kỹ thuật, giả thuyết cần kiểm chứng."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <div className="flex gap-4">
          <InfoCard icon="component" title="Bối cảnh" className="flex-1" body="Heatmap cho thấy nhiều phiên trên điện thoại click vào ảnh bảng giá (không bấm được)." />
          <InfoCard icon="filter" title="Cách áp dụng" className="flex-1" body="Lọc phiên trên điện thoại có click vào ảnh bảng giá; xem 20 phiên." />
        </div>
        <InfoCard
          icon="eye"
          title="Mẫu hình (giả định)"
          body="Trong 20 phiên đã xem, phần lớn khách chạm hai ngón để phóng to ảnh vì chữ quá nhỏ, rồi rời trang. Một số phiên cho thấy khách bấm nút “Xác nhận” hai lần vì trang tải chậm."
        />
        <ReplayTimeline />
        <InfoCard
          tone="fill"
          icon="check-circle"
          title="Quyết định"
          body="Chuyển bảng giá sang văn bản; thêm trạng thái “đang xử lý” và chặn bấm lặp ở nút xác nhận. Kiểm chứng bằng usability test và theo dõi tỷ lệ hoàn thành."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Xem ngẫu nhiên không có câu hỏi", "Tốn thời gian, không kết luận được.", "Bắt đầu từ câu hỏi và bộ lọc."],
            ["Kết luận từ một hai phiên", "Không đại diện.", "Xem nhiều phiên, ghi số phiên có cùng hành vi."],
            ["Báo cáo tỷ lệ từ số phiên đã xem như tỷ lệ cho mọi người dùng", "Phiên đã lọc không đại diện.", "Dùng analytics cho tỷ lệ."],
            ["Không ẩn dữ liệu nhạy cảm", "Vi phạm quyền riêng tư.", "Kiểm tra cấu hình trước khi bật."],
            ["Đoán suy nghĩ người dùng", "Session replay không có lời nói.", "Kiểm chứng bằng usability test."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Phương pháp", "Cho thấy", "Khi nào chọn"]}
          widths={[260]}
          rows={[
            { icon: "play-circle", highlight: true, cells: ["Session Replay", "Chuỗi hành vi của từng người thật, không có lời nói.", "Hiểu vì sao một số liệu như vậy."] },
            { icon: "eye", cells: ["Heatmap", "Hành vi gộp của nhiều người trên giao diện.", "Thấy nhanh vị trí vấn đề."] },
            { icon: "arrows", cells: ["Clickstream Analysis", "Đường đi qua các trang, gộp nhiều người.", "Thấy luồng chung."] },
            { icon: "users", cells: ["Usability Testing", "Hành vi kèm lời nói, có điều phối.", "Cần hiểu suy nghĩ."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="shield-alert"
            title="Trước khi xem"
            items={["Có câu hỏi và bộ lọc trước khi xem.", "Đã ẩn dữ liệu nhạy cảm và tắt ghi ở trang nhạy cảm.", "Chính sách quyền riêng tư đã thông báo."]}
          />
          <ChecklistColumn icon="analytics" title="Khi kết luận" items={["Ghi số phiên có cùng hành vi, không chỉ ấn tượng.", "Kiểm chứng nguyên nhân bằng phương pháp khác."]} />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Heatmap", "Bản đồ nhiệt", "Xem gộp trước, xem từng phiên sau."],
            ["Clickstream Analysis", "Phân tích luồng nhấp", "Luồng chung, gộp nhiều người."],
            ["Usability Testing", "Kiểm thử khả năng sử dụng", "Kiểm chứng suy nghĩ của người dùng."],
            ["Quantitative Research", "Nghiên cứu định lượng", "Cho tỷ lệ mà session replay không cho."],
            ["Accessibility", "Khả năng truy cập", "Một số vấn đề truy cập lộ ra qua hành vi."],
            ["Research Operations", "Vận hành nghiên cứu", "Quy định về quyền riêng tư, lưu trữ."],
          ]}
        />
      </Section>
    </div>
  );
}

export const SESSION_REPLAY: Article = {
  slug: "session-replay",
  version: 1,
  term: "Session Replay",
  fn: 6,
  vi: "Xem lại phiên truy cập",
  kind: "Phương pháp nghiên cứu / kiểm thử",
  definition:
    "Session replay là việc ghi lại và phát lại từng bước những gì một người dùng thật đã làm trên trang web hoặc ứng dụng (cuộn, click, nhập liệu, chuyển trang) để nhóm xem lại hành vi trong bối cảnh sử dụng thật.",
  definitionMore:
    "Session replay nằm giữa analytics (số liệu tổng) và usability test (quan sát có điều phối): thấy hành vi thật của từng người, nhưng không biết họ nghĩ gì.",
  oneLine: "Xem lại từng bước thao tác của người dùng thật trên sản phẩm để hiểu chuỗi hành vi.",
  glance: [
    ["20", "Phiên được xem trong ví dụ"],
    ["30 ngày", "Thời gian lưu bản ghi theo Clarity"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Session recording", "User recording"] },
    { label: "Nhóm chính", items: ["Đo lường và phân tích"] },
    { label: "Thẻ phụ", items: ["Kiểm thử và đánh giá"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "Phần lớn công cụ không quay video màn hình. Theo tài liệu của Microsoft Clarity, bản ghi được dựng lại từ cấu trúc trang và các thao tác của người dùng. Người dùng không biết mình đang được quan sát như trong usability test.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
