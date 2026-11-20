"use client";

import { CheckCards, Flow, InfoGrid, InOutCards, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Table, sectionProps, type SectionDef } from "./ui";

/* Design Sprint — copy from ux-glossary/design-sprint.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "days", title: "Năm ngày của một design sprint", icon: "calendar" },
  { id: "roles", title: "Vai trò tham gia", icon: "users" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "evaluate", title: "Cách đánh giá kết quả sprint", icon: "gauge" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các cách tiếp cận gần", icon: "arrows" },
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
            Nhiều dự án đi theo con đường: tranh luận nhiều tuần → chọn một ý tưởng → xây dựng nhiều tháng → ra mắt → mới biết khách hàng không cần. Chi phí của việc biết sai muộn
            rất lớn. Ngược lại, các cuộc họp “động não” thường cho ra nhiều ý tưởng nhưng không đi đến quyết định.
          </P>
          <P strong>Design sprint nén vòng “hiểu → ý tưởng → quyết định → làm thử → kiểm chứng” vào một tuần, với quy tắc rõ ràng cho từng bước.</P>
        </div>
        <Eyebrow>Design sprint hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          minH={170}
          items={[
            ["target", "Có nên đầu tư vào hướng này không", "Dựa trên phản ứng của khách hàng với prototype thực tế."],
            ["split", "Chọn giải pháp nào", "Trong nhiều ý tưởng cạnh tranh."],
            ["shield-alert", "Rủi ro lớn nhất nằm ở đâu", "Câu hỏi nào cần trả lời trước khi xây dựng."],
            ["users", "Phối hợp nhóm", "Đưa người có quyền quyết định và các chuyên gia vào cùng một quy trình."],
          ]}
        />
      </Section>

      <Section {...S.days}>
        <Flow
          title="Một tuần sprint"
          icon="calendar"
          steps={[
            ["Thứ Hai", "Hiểu · mở rộng"],
            ["Thứ Ba", "Phác thảo · mở rộng"],
            ["Thứ Tư", "Quyết định · thu hẹp"],
            ["Thứ Năm", "Prototype · hiện thực"],
            ["Thứ Sáu", "Kiểm thử · kiểm chứng"],
            ["Đầu tư / Điều chỉnh / Dừng", "Quyết định sau sprint"],
          ]}
          on={[5]}
          soft={[0, 1]}
          note="Hai ngày đầu mở rộng (hiểu vấn đề, tạo nhiều ý tưởng). Ngày thứ ba thu hẹp (chọn một giải pháp). Ngày thứ tư hiện thực hóa (prototype). Ngày thứ năm kiểm chứng với khách hàng. Kết quả quay lại để quyết định: đầu tư, điều chỉnh, hay dừng."
        />
        <Table
          head={["Ngày", "Mục tiêu", "Hoạt động chính", "Đầu ra"]}
          widths={[220, 240]}
          rows={[
            {
              icon: "target",
              cells: [
                "Thứ Hai — Hiểu và chọn mục tiêu",
                "Hiểu vấn đề, chọn phần quan trọng nhất để tập trung.",
                "Đặt mục tiêu dài hạn; liệt kê câu hỏi sprint (điều gì có thể khiến thất bại); vẽ bản đồ hành trình khách hàng; hỏi chuyên gia; ghi chú cơ hội dạng “Làm thế nào để…” (How Might We); chọn mục tiêu trên bản đồ.",
                "Mục tiêu dài hạn, câu hỏi sprint, bản đồ, điểm tập trung.",
              ],
            },
            {
              icon: "pencil",
              cells: [
                "Thứ Ba — Phác thảo",
                "Tạo nhiều giải pháp cạnh tranh.",
                "Xem nhanh các giải pháp tham khảo (lightning demos); mỗi người phác thảo riêng qua bốn bước: ghi chú, ý tưởng, phác nhanh tám biến thể (Crazy 8s), phác thảo giải pháp hoàn chỉnh.",
                "Các bản phác thảo giải pháp cá nhân.",
              ],
            },
            {
              icon: "check-circle",
              cells: [
                "Thứ Tư — Quyết định",
                "Chọn giải pháp tốt nhất, lên kịch bản prototype.",
                "Trưng bày phác thảo; bỏ phiếu bằng chấm dán; người quyết định chọn; vẽ storyboard từng bước.",
                "Giải pháp được chọn, storyboard.",
              ],
            },
            {
              icon: "component",
              cells: [
                "Thứ Năm — Làm prototype",
                "Tạo prototype “trông như thật” đủ để kiểm thử.",
                "Chia việc; làm prototype mặt tiền (chỉ những màn hình khách sẽ thấy); chạy thử; chuẩn bị kịch bản phỏng vấn.",
                "Prototype thực tế, kịch bản kiểm thử.",
              ],
            },
            {
              icon: "play-circle",
              highlight: true,
              cells: [
                "Thứ Sáu — Kiểm thử",
                "Học từ khách hàng thật.",
                "Phỏng vấn từng người với prototype; cả nhóm quan sát và ghi chú; tìm điểm lặp lại; đối chiếu với câu hỏi sprint.",
                "Câu trả lời cho câu hỏi sprint, bước tiếp theo.",
              ],
            },
          ]}
        />
        <Callout tone="note" title="Số khách hàng kiểm thử ngày thứ Sáu">
          Sách Sprint gợi ý phỏng vấn năm khách hàng, mỗi người một buổi. Mục tiêu là thấy các phản ứng lặp lại, không phải đo tỷ lệ chính xác.
        </Callout>
      </Section>

      <Section {...S.roles}>
        <InfoGrid
          minH={150}
          items={[
            ["target", "Người quyết định (Decider)", "Người có quyền quyết định cuối cùng (thường là trưởng sản phẩm hoặc lãnh đạo). Chọn mục tiêu và giải pháp khi nhóm không thống nhất."],
            ["hourglass", "Người điều phối (Facilitator)", "Giữ thời gian, dẫn dắt hoạt động, giữ nhóm đi đúng quy trình."],
            ["users", "Thành viên nhóm", "Khoảng bảy người hoặc ít hơn, từ nhiều chức năng: thiết kế, sản phẩm, kỹ thuật, marketing, chăm sóc khách hàng, tài chính…"],
            ["book", "Chuyên gia (khách mời)", "Chia sẻ kiến thức vào ngày thứ Hai: khách hàng, kỹ thuật, kinh doanh."],
          ]}
          last={["chat", "Người phỏng vấn", "Thực hiện phỏng vấn ngày thứ Sáu; những người còn lại quan sát."]}
        />
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "target",
              "Bối cảnh phù hợp",
              [
                "Có một câu hỏi lớn, rủi ro cao, cần trả lời trước khi đầu tư.",
                "Bắt đầu sản phẩm, tính năng hoặc dịch vụ mới.",
                "Nhóm bị kẹt: tranh luận lâu, nhiều ý tưởng, không có quyết định.",
                "Có thời hạn gấp cần hướng đi rõ ràng.",
              ],
            ],
            [
              "clipboard-check",
              "Điều kiện cần",
              [
                "Người quyết định tham gia (ít nhất ở các thời điểm quyết định).",
                "Nhóm dành trọn thời gian trong tuần sprint.",
                "Tuyển được khách hàng mục tiêu cho ngày thứ Sáu.",
                "Câu hỏi đủ lớn để xứng đáng một tuần của cả nhóm.",
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
            { icon: "check", cells: ["Vấn đề nhỏ, rõ ràng (sửa một nhãn, một lỗi)", "Một tuần của cả nhóm là quá tốn kém.", "Thiết kế và kiểm thử nhanh trực tiếp."] },
            {
              icon: "binoculars",
              cells: [
                "Chưa hiểu người dùng là ai, nhu cầu là gì",
                "Sprint dựa nhiều vào kiến thức sẵn có; ngày thứ Hai không thay được nghiên cứu khám phá.",
                "Nghiên cứu khám phá trước (phỏng vấn, contextual inquiry).",
              ],
            },
            { icon: "users", cells: ["Người quyết định không tham gia", "Kết quả dễ bị gạt bỏ sau sprint.", "Hoãn sprint đến khi có người quyết định."] },
            { icon: "bar-chart", cells: ["Cần kết quả định lượng", "Năm buổi phỏng vấn không cho tỷ lệ đáng tin.", "Kiểm thử định lượng, A/B testing sau khi có sản phẩm."] },
            { icon: "rotate", cells: ["Vấn đề kéo dài, cần thay đổi tổ chức", "Sprint tập trung vào một câu hỏi trong một tuần.", "Service design, chương trình cải tiến dài hạn."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Chọn câu hỏi và người quyết định.", "", "Thách thức của sprint, người quyết định đồng ý tham gia."],
            [
              "Lập nhóm và chuẩn bị.",
              "Chọn thành viên liên chức năng, đặt phòng, chuẩn bị dụng cụ (giấy ghi chú, bảng, bút, chấm dán), mời chuyên gia.",
              "Lịch sprint, nhóm, dụng cụ.",
            ],
            ["Tuyển khách hàng cho ngày thứ Sáu ngay từ đầu tuần.", "", "Lịch phỏng vấn với khách hàng mục tiêu."],
            ["Chạy năm ngày theo cấu trúc.", "Người điều phối giữ thời gian; tránh thiết bị điện tử trong các hoạt động chung.", "Phác thảo, quyết định, storyboard, prototype."],
            ["Kiểm thử và tổng hợp.", "Cả nhóm ghi chú khi quan sát; cuối ngày tìm điểm lặp lại, đối chiếu với câu hỏi sprint.", "Câu trả lời cho câu hỏi sprint."],
            ["Quyết định bước tiếp theo.", "Đầu tư xây dựng, điều chỉnh và chạy sprint tiếp, hay dừng hướng này.", "Kế hoạch sau sprint."],
          ]}
        />
      </Section>

      <Section {...S.evaluate}>
        <P strong>
          Sprint không thất bại khi prototype bị khách hàng từ chối. Một kết quả “không” rõ ràng sau một tuần vẫn rẻ hơn nhiều so với biết điều đó sau nhiều tháng xây dựng.
        </P>
        <Table
          head={["Câu hỏi đánh giá", "Dấu hiệu sprint có giá trị"]}
          widths={[420]}
          rows={[
            { icon: "chat", cells: ["Câu hỏi sprint có được trả lời không?", "Mỗi câu hỏi có kết luận (đúng, sai, chưa rõ) kèm bằng chứng từ buổi kiểm thử."] },
            { icon: "rotate", cells: ["Phản ứng của khách có lặp lại không?", "Có điểm tích cực hoặc vấn đề xuất hiện ở nhiều người."] },
            { icon: "check-circle", cells: ["Nhóm có quyết định rõ ràng không?", "Có bước tiếp theo cụ thể, người quyết định đồng ý."] },
            { icon: "list", cells: ["Kết quả có được dùng sau sprint không?", "Quyết định được đưa vào kế hoạch sản phẩm."] },
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={[
            "Thách thức hoặc câu hỏi kinh doanh quan trọng.",
            "Người quyết định, người điều phối, nhóm liên chức năng.",
            "Kiến thức sẵn có về khách hàng (nghiên cứu, dữ liệu).",
            "Năm ngày trọn vẹn; phòng và dụng cụ.",
            "Khách hàng mục tiêu cho ngày kiểm thử.",
          ]}
          outputs={[
            "Mục tiêu dài hạn, câu hỏi sprint, bản đồ hành trình.",
            "Các bản phác thảo, giải pháp được chọn, storyboard.",
            "Prototype đã kiểm thử.",
            "Ghi chú từ năm buổi phỏng vấn và các điểm lặp lại.",
            "Quyết định và kế hoạch bước tiếp theo.",
          ]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard
          icon="target"
          title="Thách thức"
          body="Công ty muốn biết khách có sẵn sàng tư vấn trực tuyến qua video thay vì đến văn phòng không, trước khi đầu tư xây nền tảng."
        />
        <Table
          head={["Ngày", "Diễn biến"]}
          widths={[200]}
          rows={[
            {
              icon: "target",
              cells: [
                "Thứ Hai",
                "Mục tiêu dài hạn: “Trong hai năm, phần lớn buổi tư vấn đầu tiên diễn ra trực tuyến.” Câu hỏi sprint: “Khách có tin tưởng tư vấn qua video không?”, “Khách có biết cần chuẩn bị gì không?”. Mục tiêu tập trung: bước từ đặt lịch đến buổi tư vấn đầu tiên.",
              ],
            },
            { icon: "pencil", cells: ["Thứ Ba", "Bảy thành viên phác thảo các giải pháp, từ “phòng chờ ảo” đến “video giới thiệu tư vấn viên trước buổi hẹn”."] },
            { icon: "check-circle", cells: ["Thứ Tư", "Người quyết định chọn kết hợp: trang hồ sơ tư vấn viên có video ngắn + danh sách chuẩn bị trước buổi hẹn."] },
            { icon: "component", cells: ["Thứ Năm", "Prototype mặt tiền gồm email xác nhận, trang hồ sơ tư vấn viên, trang chuẩn bị và màn hình vào buổi gọi."] },
            { icon: "play-circle", highlight: true, cells: ["Thứ Sáu", "Phỏng vấn năm khách hàng tiềm năng."] },
          ]}
        />
        <InfoCard
          icon="analytics"
          title="Kết quả (giả định)"
          body="Phần lớn người tham gia thấy an tâm hơn khi xem video giới thiệu tư vấn viên; nhiều người lo về chất lượng kết nối và muốn có số điện thoại dự phòng."
        />
        <InfoCard
          icon="check-circle"
          tone="fill"
          title="Quyết định"
          body="Đầu tư xây phiên bản đầu; thêm phương án gọi điện dự phòng; đo tỷ lệ khách chọn trực tuyến sau khi ra mắt."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Người quyết định vắng mặt", "Quyết định bị lật lại sau sprint.", "Mời người quyết định từ đầu; ít nhất có mặt lúc chọn mục tiêu và giải pháp."],
            ["Chọn thách thức quá rộng", "Không thể làm prototype và kiểm thử trong một tuần.", "Thu hẹp vào một phần của hành trình."],
            ["Động não nhóm thay vì phác thảo cá nhân", "Ý kiến của người nói nhiều lấn át.", "Làm việc riêng rồi cùng xem, theo đúng quy trình."],
            ["Prototype quá trau chuốt hoặc quá sơ sài", "Mất thời gian, hoặc khách không phản ứng như với sản phẩm thật.", "Prototype mặt tiền, đủ thật ở những gì khách nhìn thấy."],
            ["Tuyển khách hàng muộn", "Ngày thứ Sáu không có đúng người.", "Tuyển từ trước hoặc đầu tuần sprint."],
            ["Coi năm buổi phỏng vấn là bằng chứng định lượng", "Năm người chỉ cho thấy xu hướng và vấn đề.", "Dùng để quyết định hướng; đo định lượng sau khi xây."],
            ["Không có kế hoạch sau sprint", "Kết quả bị quên.", "Kết thúc bằng quyết định và người chịu trách nhiệm bước tiếp theo."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Cách tiếp cận", "Trọng tâm", "Thời gian", "Quan hệ"]}
          widths={[220]}
          rows={[
            { icon: "calendar", highlight: true, cells: ["Design Sprint", "Trả lời một câu hỏi lớn bằng prototype và kiểm thử.", "Năm ngày, cấu trúc chặt.", "—"] },
            {
              icon: "lightbulb",
              cells: ["Design Thinking", "Tư duy và quy trình lấy con người làm trung tâm.", "Linh hoạt, có thể nhiều tháng.", "Design sprint là một cách thực hiện nén, có cấu trúc."],
            },
            {
              icon: "rotate",
              cells: ["Scrum Sprint", "Phát triển và bàn giao phần mềm.", "Thường 1–4 tuần, lặp lại liên tục.", "Khác mục đích; design sprint có thể diễn ra trước khi bắt đầu phát triển."],
            },
            {
              icon: "flask",
              cells: ["Lean UX", "Học liên tục qua giả thuyết và thử nghiệm nhỏ trong quá trình phát triển.", "Liên tục.", "Có thể dùng sprint để kiểm chứng một giả thuyết lớn."],
            },
            { icon: "component", cells: ["Hackathon", "Xây nhanh sản phẩm hoạt động được.", "Một đến vài ngày.", "Hackathon thiên về xây; sprint thiên về kiểm chứng với khách hàng."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Trước sprint"
            items={[
              "Có thách thức đủ lớn và đủ hẹp để làm trong một tuần.",
              "Người quyết định đồng ý tham gia.",
              "Nhóm liên chức năng, khoảng bảy người hoặc ít hơn.",
              "Đã tuyển khách hàng cho ngày thứ Sáu.",
            ]}
          />
          <ChecklistColumn
            icon="calendar"
            title="Trong sprint"
            items={[
              "Có mục tiêu dài hạn và câu hỏi sprint được ghi lại.",
              "Phác thảo cá nhân trước khi thảo luận nhóm.",
              "Prototype chỉ làm phần khách hàng sẽ thấy.",
              "Cả nhóm cùng quan sát và ghi chú buổi kiểm thử.",
            ]}
          />
          <ChecklistColumn icon="check-circle" title="Sau sprint" items={["Mỗi câu hỏi sprint có kết luận kèm bằng chứng.", "Có quyết định và người chịu trách nhiệm bước tiếp theo."]} />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Design Thinking", "Tư duy thiết kế", "Nền tảng tư duy mà sprint thực hiện dưới dạng nén."],
            ["Prototype", "Bản mẫu", "Sản phẩm của ngày thứ Năm."],
            ["Usability Testing", "Kiểm thử khả năng sử dụng", "Hình thức kiểm thử ngày thứ Sáu."],
            ["Customer Journey", "Hành trình khách hàng", "Bản đồ được vẽ ngày thứ Hai."],
            ["Ideation", "Tạo ý tưởng", "Hoạt động chính ngày thứ Ba."],
            ["Design Comparison", "So sánh thiết kế", "So sánh các phương án trước khi chọn."],
            ["Lean UX", "UX tinh gọn", "Cách tiếp cận học liên tục, có thể kết hợp với sprint."],
          ]}
        />
      </Section>
    </div>
  );
}

export const DESIGN_SPRINT: Article = {
  slug: "design-sprint",
  version: 1,
  term: "Design Sprint",
  fn: 3,
  vi: "Thiết kế nước rút",
  kind: "Quy trình / cách tiếp cận",
  definition:
    "Design sprint là quy trình năm ngày, trong đó một nhóm nhỏ liên chức năng hiểu vấn đề, phác thảo giải pháp, chọn hướng, làm prototype và kiểm thử với khách hàng thật.",
  definitionMore:
    "Mục tiêu là trả lời một câu hỏi quan trọng bằng bằng chứng từ người dùng trước khi bỏ nhiều tháng để xây dựng. Quy trình có cấu trúc chặt theo từng ngày, giúp nhóm ra quyết định nhanh mà không mất nhiều vòng họp và tranh luận.",
  oneLine: "Quy trình năm ngày để hiểu vấn đề, làm prototype và kiểm thử với khách hàng trước khi xây dựng.",
  glance: [
    ["5", "Ngày, mỗi ngày một mục tiêu"],
    ["5", "Khách hàng kiểm thử ngày thứ Sáu"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Google Ventures Design Sprint", "GV Sprint"] },
    { label: "Nhóm chính", items: ["Quy trình và vận hành"] },
    { label: "Thẻ phụ", items: ["Cấu trúc và thiết kế", "Kiểm thử và đánh giá"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "Do Jake Knapp phát triển và phổ biến qua GV, trình bày trong sách Sprint (2016). Khác với sprint trong Scrum, một chu kỳ phát triển phần mềm thường 1–4 tuần.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
