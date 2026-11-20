"use client";

import { CheckCards, FidelityDims, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Table, sectionProps, type SectionDef } from "./ui";

/* Low-Fidelity Prototype — copy from ux-glossary/low-fidelity-prototype.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "forms", title: "Các dạng bản mẫu độ trung thực thấp", icon: "component" },
  { id: "tradeoffs", title: "Ưu điểm và hạn chế", icon: "split" },
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
            Càng đầu tư nhiều vào một thiết kế, nhóm càng khó bỏ nó, kể cả khi nó sai hướng. Nếu chờ đến khi có giao diện hoàn chỉnh mới đưa cho người dùng xem, mọi sai lầm về cấu trúc
            hay luồng đều tốn kém để sửa.
          </P>
          <P strong>Low-fidelity prototype cho phép kiểm tra sớm, sửa nhanh, bỏ không tiếc.</P>
        </div>
        <Eyebrow>Low-fidelity prototype hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          cols={3}
          minH={150}
          items={[
            ["split", "Hướng đi nào đáng làm tiếp", "Trong nhiều ý tưởng."],
            ["arrows", "Cấu trúc và luồng có hợp lý không", "Trước khi đầu tư vào chi tiết."],
            ["file", "Nội dung nào cần có", "Trên mỗi màn hình."],
          ]}
        />
      </Section>

      <Section {...S.forms}>
        <FidelityDims
          title="Bản mẫu thấp thể hiện gì"
          rows={[
            ["Cấu trúc", "Có: các màn hình chính.", "Đầy đủ cấu trúc.", "low"],
            ["Nội dung chính", "Có: nhãn, tiêu đề, nút chính bằng chữ thật.", "Nội dung hoàn chỉnh.", "low"],
            ["Luồng đi", "Có: đổi tờ giấy hoặc nối khung xám.", "Bấm được, phản hồi như thật.", "low"],
            ["Hình ảnh", "Chưa: phác thảo, khối xám.", "Hình ảnh hoàn chỉnh.", "low"],
          ]}
          note="Ô tô đậm là mức của một low-fidelity prototype. “Độ trung thực thấp” nghĩa là ít giống sản phẩm cuối, không có nghĩa là kém chất lượng."
        />
        <Table
          head={["Dạng", "Cách làm", "Ví dụ minh họa (giả định)"]}
          widths={[280]}
          rows={[
            { icon: "pencil", highlight: true, cells: ["Phác thảo giấy (paper prototype)", "Vẽ tay từng màn hình; người điều phối đổi tờ giấy khi người dùng “bấm”.", "Năm tờ giấy cho luồng đặt lịch."] },
            { icon: "component", cells: ["Wireframe khung xám", "Khối xám, chữ thật hoặc giữ chỗ; có thể nối thành luồng bấm được đơn giản.", "Luồng đặt lịch dạng khung xám trên công cụ thiết kế."] },
            { icon: "book", cells: ["Storyboard", "Chuỗi hình vẽ kể tình huống sử dụng.", "Sáu khung kể khách tìm dịch vụ, bàn với gia đình, đặt lịch."] },
            { icon: "users", cells: ["Wizard of Oz", "Người thật đóng vai hệ thống phía sau.", "Người nghiên cứu trả lời “tự động” thay cho chatbot đặt lịch."] },
          ]}
        />
      </Section>

      <Section {...S.tradeoffs}>
        <Table
          head={["Ưu điểm (theo NN/g)", "Hạn chế"]}
          widths={[520]}
          rows={[
            { icon: "hourglass", cells: ["Ít thời gian chuẩn bị.", "Người điều phối phải đóng vai “máy tính”, dễ nhầm lẫn."] },
            { icon: "rotate", cells: ["Dễ thay đổi ngay trong buổi test.", "Không kiểm tra được chi tiết tương tác, thời gian phản hồi."] },
            { icon: "chat", cells: ["Người dùng ít áp lực, dễ góp ý thẳng thắn.", "Người dùng cần tưởng tượng nhiều hơn."] },
            { icon: "x", cells: ["Nhà thiết kế ít gắn bó, dễ bỏ hướng sai.", "Không phù hợp để đánh giá hình ảnh, thương hiệu."] },
            { icon: "eye", cells: ["Người liên quan hiểu đây là bản chưa xong.", "Khó dùng cho test từ xa không có người điều phối."] },
          ]}
        />
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            ["target", "Bối cảnh phù hợp", ["Giai đoạn sớm, sau ideation, khi còn nhiều hướng.", "Cần kiểm tra cấu trúc, luồng, nội dung chính.", "Muốn cả nhóm (kể cả người không làm thiết kế) cùng tham gia."]],
            ["eye", "Dấu hiệu nhận biết", ["Nhóm đang tranh luận giữa nhiều hướng mà chưa có bằng chứng.", "Câu hỏi là “có hợp lý không?”, chưa phải “chi tiết có rõ không?”."]],
            ["clipboard-check", "Điều kiện cần", ["Câu hỏi nghiên cứu rõ.", "Người điều phối quen với việc đóng vai hệ thống (với bản mẫu giấy)."]],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[360]}
          rows={[
            { icon: "play-circle", cells: ["Cần kiểm tra chi tiết tương tác", "Không có trạng thái, chuyển động, phản hồi thật.", "High-fidelity prototype."] },
            { icon: "eye", cells: ["Cần đánh giá hình ảnh, thương hiệu", "Chưa có hình ảnh hoàn chỉnh.", "Mockup, design comparison."] },
            { icon: "users", cells: ["Test từ xa không có người điều phối", "Người dùng khó tự thao tác với bản phác thảo.", "Bản mẫu bấm được."] },
            { icon: "briefcase", cells: ["Người liên quan cần thấy sản phẩm gần xong", "Khó hình dung từ phác thảo.", "High-fidelity prototype."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định câu hỏi cần trả lời.", "", "Câu hỏi nghiên cứu."],
            ["Chọn dạng bản mẫu.", "Giấy, khung xám, storyboard hay Wizard of Oz.", "Dạng bản mẫu."],
            ["Làm nhanh nhiều phương án.", "Giới hạn thời gian để không đầu tư quá nhiều.", "Vài phương án."],
            ["Dùng nội dung đủ thật.", "Nhãn, tiêu đề, nút chính nên là chữ thật, vì người dùng cần đọc để quyết định.", "Bản mẫu sẵn sàng."],
            ["Kiểm tra với người dùng.", "Cho người dùng làm tác vụ; ghi lại chỗ họ do dự.", "Nhận định."],
            ["Sửa ngay và kiểm tra lại.", "", "Hướng đi được chọn, sẵn sàng làm ở độ trung thực cao hơn."],
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          cols={3}
          items={[
            ["component", "Chỉ kiểm tra được cấu trúc, luồng, nội dung chính", "Không kết luận về chi tiết tương tác hay hình ảnh."],
            ["users", "Người điều phối có thể vô tình gợi ý", "Khi đóng vai hệ thống."],
            ["lightbulb", "Người dùng phải tưởng tượng", "Phản ứng có thể khác với sản phẩm thật."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Câu hỏi nghiên cứu.", "Ý tưởng từ ideation.", "Giấy, bút hoặc công cụ khung xám; nội dung chính."]}
          outputs={["Bản mẫu nhiều phương án.", "Nhận định từ người dùng.", "Hướng đi được chọn để làm tiếp."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard
          icon="component"
          title="Bối cảnh"
          body="Sau ideation, nhóm có ba hướng giúp khách tự tin về chi phí: bảng “bạn sẽ nhận được gì”, câu chuyện khách hàng theo tình huống, và buổi tư vấn ngắn miễn phí."
        />
        <InfoCard
          icon="pencil"
          title="Cách áp dụng"
          body="Phác thảo giấy cho cả ba hướng trong một buổi sáng. Buổi chiều test với 5 khách: mỗi người xem cả ba và làm tác vụ “quyết định có đặt lịch không”."
        />
        <Eyebrow>Nhận định (giả định)</Eyebrow>
        <InfoGrid
          cols={3}
          items={[
            ["check-circle", "Bảng “bạn sẽ nhận được gì”", "Được hiểu nhanh nhất; khách muốn chia sẻ nó cho người thân."],
            ["book", "Câu chuyện khách hàng", "Được đánh giá cao nhưng khách không đọc hết."],
            ["alert", "Buổi tư vấn ngắn miễn phí", "Làm một số khách nghi ngờ “có bán hàng không”."],
          ]}
        />
        <InfoCard
          tone="fill"
          icon="check-circle"
          title="Quyết định"
          body="Chọn bảng “bạn sẽ nhận được gì” làm chính, kèm một câu chuyện khách hàng ngắn; làm high-fidelity prototype để kiểm tra chi tiết."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Làm bản mẫu thấp quá chi tiết", "Mất lợi thế nhanh và dễ bỏ.", "Giới hạn thời gian; chỉ đủ để trả lời câu hỏi."],
            ["Dùng toàn chữ giữ chỗ", "Người dùng không có gì để đọc và quyết định.", "Nhãn, tiêu đề, nút chính dùng chữ thật."],
            ["Chỉ làm một phương án", "Không có gì để so sánh.", "Làm nhiều phương án."],
            ["Kết luận về hình ảnh từ bản phác thảo", "Bản mẫu thấp không thể hiện hình ảnh.", "Dùng mockup hoặc high-fidelity."],
            ["Người điều phối gợi ý", "Kết quả lệch.", "Luyện trước; chỉ phản hồi theo hành động của người dùng."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Tài liệu", "Độ trung thực", "Dùng khi"]}
          widths={[300]}
          rows={[
            { icon: "pencil", highlight: true, cells: ["Low-Fidelity Prototype", "Thấp, có luồng để thử.", "Kiểm tra hướng đi, cấu trúc, luồng."] },
            { icon: "lightbulb", cells: ["Sketch (phác thảo ý tưởng)", "Rất thấp, thường không có luồng.", "Tạo và trao đổi ý tưởng."] },
            { icon: "component", cells: ["Wireframe", "Thấp đến trung bình, thường tĩnh.", "Bố cục từng trang."] },
            { icon: "play-circle", cells: ["High-Fidelity Prototype", "Cao, bấm được, hình ảnh hoàn chỉnh.", "Kiểm tra chi tiết, chuẩn bị giao phát triển."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn icon="file" title="Chuẩn bị" items={["Có câu hỏi nghiên cứu rõ.", "Bản mẫu chỉ đủ chi tiết để trả lời câu hỏi.", "Có nhiều phương án."]} />
          <ChecklistColumn
            icon="clipboard-check"
            title="Khi test"
            items={["Nhãn, tiêu đề, nút chính dùng chữ thật.", "Người điều phối đã luyện đóng vai hệ thống.", "Không kết luận về hình ảnh hay chi tiết tương tác."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["High-Fidelity Prototype", "Bản mẫu độ trung thực cao", "Bước sau, kiểm tra chi tiết."],
            ["Ideation", "Tạo ý tưởng", "Nguồn ý tưởng để làm bản mẫu."],
            ["Prototype", "Bản mẫu", "Khái niệm chung."],
            ["Design Sprint", "Thiết kế nước rút", "Dùng bản mẫu nhanh để test trong một ngày."],
            ["Lean UX", "UX tinh gọn", "Bản mẫu thấp là thử nghiệm nhỏ nhất phổ biến."],
            ["Usability Testing", "Kiểm thử khả năng sử dụng", "Cách kiểm tra bản mẫu với người dùng."],
            ["Heuristic Evaluation", "Đánh giá theo nguyên tắc kinh nghiệm", "Có thể rà soát từ khung xám."],
            ["Wireframe", "Khung dây", "Bản phác bố cục; nối lại thành luồng bấm được là thành low-fi prototype."],
          ]}
        />
      </Section>
    </div>
  );
}

export const LOW_FIDELITY_PROTOTYPE: Article = {
  slug: "low-fidelity-prototype",
  version: 1,
  term: "Low-Fidelity Prototype",
  fn: 3,
  vi: "Bản mẫu độ trung thực thấp",
  kind: "Tài liệu / sơ đồ thiết kế",
  definition:
    "Low-fidelity prototype là bản mẫu đơn giản, nhanh làm, chỉ thể hiện cấu trúc, nội dung chính và luồng đi, chưa có hình ảnh hoàn chỉnh hay tương tác thật; ví dụ phác thảo trên giấy hoặc khung xám trên máy.",
  definitionMore: "Bản mẫu này dùng để kiểm tra ý tưởng và hướng đi sớm, khi việc thay đổi còn rẻ.",
  oneLine: "Bản mẫu phác thảo nhanh để kiểm tra ý tưởng và luồng đi trước khi đầu tư vào chi tiết.",
  glance: [
    ["4", "Dạng bản mẫu thấp"],
    ["5", "Khách test trong ví dụ"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Lo-fi prototype", "Paper prototype (bản mẫu giấy)"] },
    { label: "Nhóm chính", items: ["Thiết kế và tạo mẫu"] },
    { label: "Thẻ phụ", items: ["Kiểm thử và đánh giá"] },
    {
      label: "Lưu ý tên gọi",
      items: ["“Độ trung thực thấp” nghĩa là ít giống sản phẩm cuối, không có nghĩa là kém chất lượng. Bản mẫu thấp vẫn cần đủ rõ để trả lời câu hỏi nghiên cứu."],
    },
  ],
  sections: SECTIONS,
  Body,
};
