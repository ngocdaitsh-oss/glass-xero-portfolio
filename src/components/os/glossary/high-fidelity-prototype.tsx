"use client";

import { CheckCards, FidelityDims, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Table, sectionProps, type SectionDef } from "./ui";

/* High-Fidelity Prototype — copy from ux-glossary/high-fidelity-prototype.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "dims", title: "Các chiều của độ trung thực", icon: "component" },
  { id: "tradeoffs", title: "Ưu điểm và chi phí", icon: "split" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các tài liệu gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Section {...S.problem}>
        <div className="flex flex-col gap-5">
          <P>
            Bản vẽ phác thảo đủ để kiểm tra ý tưởng và cấu trúc, nhưng không cho biết người dùng phản ứng thế nào với chi tiết: thời gian phản hồi, trạng thái lỗi, cách một thành phần giao
            diện hoạt động, hay cảm giác khi dùng thật. Xây dựng sản phẩm thật để kiểm tra những điều này thì quá tốn kém nếu phải sửa lại.
          </P>
          <P strong>High-fidelity prototype cho người dùng trải nghiệm gần như thật với chi phí thấp hơn xây dựng.</P>
        </div>
        <Eyebrow>High-fidelity prototype hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          cols={3}
          minH={150}
          items={[
            ["component", "Chi tiết tương tác có ổn không", "Trạng thái, chuyển động, thông báo lỗi."],
            ["split", "Luồng hoàn chỉnh có chạy được không", "Từ đầu đến cuối."],
            ["check-circle", "Thiết kế có sẵn sàng giao cho phát triển không", "Kèm đặc tả chi tiết để giao cho phát triển."],
          ]}
        />
      </Section>

      <Section {...S.dims}>
        <P>NN/g mô tả độ trung thực qua nhiều chiều; một bản mẫu có thể cao ở chiều này và thấp ở chiều khác.</P>
        <FidelityDims
          title="Bốn chiều của độ trung thực"
          rows={[
            ["Tương tác", "Người điều phối đổi trang bằng tay.", "Bấm được, phản hồi như thật.", "high"],
            ["Hình ảnh", "Khung xám, phác thảo.", "Màu, chữ, hình ảnh như sản phẩm cuối.", "high"],
            ["Nội dung", "Chữ giữ chỗ.", "Nội dung thật hoặc gần thật.", "high"],
            ["Điều hướng", "Chỉ vài trang chính.", "Đầy đủ cấu trúc.", "high"],
          ]}
          note="Ô tô đậm là mức của một high-fidelity prototype điển hình. Không phải chiều nào cũng cần cao; chọn theo câu hỏi cần kiểm tra."
        />
        <Table
          head={["Chiều", "Ví dụ high-fidelity (giả định)"]}
          widths={[260]}
          rows={[
            { icon: "play-circle", cells: ["Tương tác", "Chọn giờ, hiện trạng thái đang xử lý, chuyển sang trang xác nhận."] },
            { icon: "eye", cells: ["Hình ảnh", "Đúng hệ thống thiết kế của dịch vụ."] },
            { icon: "file", cells: ["Nội dung", "Tên gói, giá, mô tả thật."] },
            { icon: "list", cells: ["Điều hướng", "Đủ các trang trong luồng đặt lịch."] },
          ]}
        />
      </Section>

      <Section {...S.tradeoffs}>
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="check-circle"
            title="Ưu điểm (theo NN/g)"
            items={[
              "Thời gian phản hồi thực tế.",
              "Kiểm tra được luồng và từng thành phần giao diện.",
              "Người dùng cảm thấy như phần mềm thật, phản ứng tự nhiên hơn.",
              "Người điều phối không phải đóng vai “máy tính”.",
            ]}
          />
          <ChecklistColumn
            icon="alert"
            title="Chi phí và rủi ro"
            items={[
              "Tốn thời gian xây dựng.",
              "Nhóm dễ gắn bó, ngại thay đổi lớn.",
              "Người xem tập trung vào chi tiết hình ảnh, bỏ qua vấn đề cấu trúc.",
              "Người liên quan có thể tưởng sản phẩm đã gần xong.",
            ]}
          />
        </div>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "target",
              "Bối cảnh phù hợp",
              [
                "Cấu trúc và luồng chính đã được kiểm chứng ở độ trung thực thấp.",
                "Cần kiểm tra chi tiết tương tác, trạng thái, chuyển động.",
                "Cần thuyết phục người liên quan hoặc giao cho phát triển.",
                "Usability test cần người dùng tự thao tác, không có người hỗ trợ.",
              ],
            ],
            ["eye", "Dấu hiệu nhận biết", ["Các câu hỏi còn lại là về chi tiết (“thông báo lỗi có rõ không?”), không về hướng đi."]],
            ["clipboard-check", "Điều kiện cần", ["Công cụ tạo bản mẫu, hệ thống thiết kế.", "Nội dung thật hoặc gần thật."]],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[340]}
          rows={[
            { icon: "split", cells: ["Còn đang khám phá nhiều hướng", "Tốn công cho hướng có thể bị bỏ.", "Low-fidelity prototype."] },
            { icon: "list", cells: ["Cấu trúc thông tin chưa ổn định", "Người dùng chú ý vào hình ảnh, bỏ qua vấn đề cấu trúc.", "Wireframe, tree testing."] },
            { icon: "gauge", cells: ["Cần đo hiệu năng thật, dữ liệu thật", "Bản mẫu không có hệ thống thật đằng sau.", "Phiên bản thử nghiệm của sản phẩm thật."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định câu hỏi cần kiểm tra.", "", "Câu hỏi và các luồng cần dựng."],
            ["Chọn chiều nào cần trung thực cao.", "Không phải chiều nào cũng cần cao; chọn theo câu hỏi.", "Phạm vi bản mẫu."],
            ["Dựng bản mẫu.", "Dùng hệ thống thiết kế, nội dung thật; dựng cả trạng thái lỗi và trạng thái trống nếu cần kiểm tra.", "Bản mẫu bấm được."],
            ["Kiểm tra nội bộ.", "Đi qua luồng để chắc mọi đường đều dẫn đúng chỗ.", "Bản mẫu sẵn sàng cho test."],
            ["Kiểm tra với người dùng.", "", "Nhận định, danh sách chỉnh sửa."],
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          cols={3}
          items={[
            ["component", "Bản mẫu không phải sản phẩm", "Hiệu năng, dữ liệu, lỗi hệ thống thật chưa được kiểm tra."],
            ["chat", "Người dùng có thể ngại góp ý", "Vì bản mẫu trông đã hoàn thiện."],
            ["split", "Đường đi bị giới hạn", "Người dùng đi lệch khỏi luồng đã dựng sẽ gặp chỗ trống, khó biết họ sẽ làm gì tiếp."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Câu hỏi cần kiểm tra.", "Luồng và cấu trúc đã kiểm chứng.", "Hệ thống thiết kế, nội dung."]}
          outputs={["Bản mẫu bấm được.", "Kết quả kiểm tra với người dùng.", "Đặc tả chi tiết để giao cho phát triển."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard
          icon="calendar"
          title="Bối cảnh"
          body="Luồng đặt lịch đã được kiểm chứng bằng bản phác thảo giấy. Nhóm còn băn khoăn về bước chọn giờ: người dùng có hiểu giờ nào còn trống không, và thông báo khi giờ vừa bị người khác đặt có rõ không."
        />
        <div className="flex gap-4">
          <InfoCard
            icon="component"
            title="Cách áp dụng"
            className="flex-1"
            body="Dựng high-fidelity prototype cho luồng đặt lịch, có trạng thái giờ kín, trạng thái đang xử lý và thông báo khi giờ vừa hết. Test với 6 người, mỗi người tự thao tác."
          />
          <InfoCard
            icon="analytics"
            title="Kết quả (giả định)"
            className="flex-1"
            body="Người dùng phân biệt được giờ trống và giờ kín; nhưng thông báo “giờ vừa hết” xuất hiện ở đầu trang, người dùng không thấy vì đang nhìn nút xác nhận ở cuối."
          />
        </div>
        <InfoCard tone="fill" icon="check-circle" title="Quyết định" body="Đặt thông báo ngay cạnh nút xác nhận và gợi ý giờ gần nhất còn trống." />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Bắt đầu bằng high-fidelity", "Tốn công cho hướng chưa được kiểm chứng.", "Kiểm chứng hướng đi ở độ trung thực thấp trước."],
            ["Dùng chữ giữ chỗ trong bản mẫu hình ảnh hoàn chỉnh", "Không kiểm tra được nội dung, gây nhầm lẫn.", "Dùng nội dung thật hoặc gần thật."],
            ["Chỉ dựng “đường đẹp”", "Bỏ sót trạng thái lỗi, trạng thái trống.", "Dựng cả các trạng thái cần kiểm tra."],
            ["Coi bản mẫu như sản phẩm đã sẵn sàng", "Chưa có hệ thống thật.", "Nói rõ phạm vi với người liên quan."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Tài liệu", "Độ trung thực", "Dùng khi"]}
          widths={[300]}
          rows={[
            { icon: "pencil", cells: ["Low-Fidelity Prototype", "Thấp: phác thảo, giấy, khung xám.", "Khám phá hướng đi, kiểm tra cấu trúc."] },
            { icon: "list", cells: ["Wireframe", "Thấp đến trung bình, thường tĩnh.", "Bố cục, cấu trúc trang."] },
            { icon: "component", highlight: true, cells: ["High-Fidelity Prototype", "Cao, bấm được.", "Kiểm tra chi tiết, chuẩn bị giao phát triển."] },
            { icon: "eye", cells: ["Mockup", "Hình ảnh cao, thường tĩnh.", "Duyệt giao diện, hình ảnh."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="target"
            title="Trước khi dựng"
            items={["Hướng đi và cấu trúc đã được kiểm chứng.", "Biết rõ câu hỏi bản mẫu cần trả lời.", "Chọn chiều trung thực cao theo câu hỏi."]}
          />
          <ChecklistColumn
            icon="component"
            title="Khi dựng"
            items={["Có nội dung thật hoặc gần thật.", "Dựng cả trạng thái lỗi, trạng thái trống cần kiểm tra.", "Đã kiểm tra nội bộ mọi đường dẫn."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Low-Fidelity Prototype", "Bản mẫu độ trung thực thấp", "Bước trước, kiểm chứng hướng đi."],
            ["Prototype", "Bản mẫu", "Khái niệm chung."],
            ["Usability Testing", "Kiểm thử khả năng sử dụng", "Cách kiểm tra bản mẫu với người dùng."],
            ["Heuristic Evaluation", "Đánh giá theo nguyên tắc kinh nghiệm", "Rà soát bản mẫu trước khi test."],
            ["Design Comparison", "So sánh thiết kế", "So sánh các phương án ở độ trung thực cao."],
            ["Design System", "Hệ thống thiết kế", "Nguồn thành phần để dựng bản mẫu."],
          ]}
        />
      </Section>
    </div>
  );
}

export const HIGH_FIDELITY_PROTOTYPE: Article = {
  slug: "high-fidelity-prototype",
  version: 1,
  term: "High-Fidelity Prototype",
  fn: 3,
  vi: "Bản mẫu độ trung thực cao",
  kind: "Tài liệu / sơ đồ thiết kế",
  definition:
    "High-fidelity prototype là bản mẫu có hình thức và cách tương tác gần với sản phẩm cuối: giao diện hoàn chỉnh về hình ảnh, nội dung thật hoặc gần thật, và có thể bấm để đi qua các luồng.",
  definitionMore: "Bản mẫu này dùng để kiểm tra chi tiết tương tác, luồng công việc và cảm nhận, trước khi tốn công xây dựng thật.",
  oneLine: "Bản mẫu bấm được, trông và hoạt động gần như sản phẩm thật, dùng để kiểm tra chi tiết.",
  glance: [
    ["4", "Chiều độ trung thực"],
    ["Bấm được", "Đi qua luồng như thật"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Hi-fi prototype"] },
    { label: "Nhóm chính", items: ["Thiết kế và tạo mẫu"] },
    { label: "Thẻ phụ", items: ["Kiểm thử và đánh giá"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "Độ trung thực là mức bản mẫu giống sản phẩm cuối đến đâu; có thể cao ở mặt này, thấp ở mặt khác. Không phải sản phẩm hoàn chỉnh: phần lớn chưa có hệ thống thật đằng sau.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
