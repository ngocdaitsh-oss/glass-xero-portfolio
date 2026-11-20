"use client";

import { CheckCard, CheckCards, Flow, InfoGrid, InOutCards, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Table, sectionProps, type SectionDef } from "./ui";

/* Contextual Inquiry — copy from ux-glossary/contextual-inquiry.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "parts", title: "Bốn nguyên tắc và mô hình thợ cả – học việc", icon: "component" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "recruit", title: "Tuyển người tham gia và số lượng", icon: "users" },
  { id: "data", title: "Thu thập và phân tích dữ liệu", icon: "file" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các phương pháp gần", icon: "arrows" },
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
            Khi được hỏi “Bạn làm việc này thế nào?”, người dùng thường kể một phiên bản gọn gàng và lý tưởng. Họ bỏ qua các bước đã thành thói quen, những lần bị gián đoạn, mẩu
            giấy ghi chú dán cạnh màn hình, hay bảng tính tự lập để bù cho thiếu sót của hệ thống. Những chi tiết đó lại thường là cơ hội thiết kế quan trọng nhất.
          </P>
          <P strong>Contextual inquiry giải quyết khoảng cách giữa điều người dùng kể và điều thật sự diễn ra bằng cách quan sát tại chỗ.</P>
        </div>
        <Eyebrow>Contextual inquiry hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          minH={170}
          items={[
            ["target", "Nên giải quyết vấn đề nào", "Điểm đau thật trong công việc hằng ngày."],
            ["eye", "Thiết kế cho bối cảnh nào", "Môi trường, thiết bị, gián đoạn, người cùng làm."],
            ["split", "Hiểu luồng công việc thật", "Các bước, vai trò, công cụ, điểm chuyển giao."],
            ["lightbulb", "Phát hiện cách xoay xở (workaround)", "Dấu hiệu sản phẩm hiện tại chưa đáp ứng nhu cầu."],
          ]}
        />
      </Section>

      <Section {...S.parts} intro="Beyer & Holtzblatt mô tả bốn nguyên tắc của contextual inquiry:">
        <Table
          head={["Nguyên tắc", "Ý nghĩa", "Biểu hiện khi thực hiện"]}
          widths={[260]}
          rows={[
            { icon: "eye", cells: ["Bối cảnh (context)", "Đến nơi công việc diễn ra, quan sát công việc thật.", "Ngồi cạnh người dùng khi họ làm việc thật, không dựng tình huống."] },
            { icon: "users", cells: ["Hợp tác (partnership)", "Người dùng và người nghiên cứu cùng khám phá công việc.", "Người dùng dẫn dắt; người nghiên cứu hỏi để hiểu, không kiểm tra."] },
            {
              icon: "chat",
              cells: [
                "Diễn giải (interpretation)",
                "Cùng người dùng kiểm tra cách hiểu của người nghiên cứu ngay tại chỗ.",
                "“Tôi thấy anh mở bảng tính này trước — có phải vì…?” để người dùng xác nhận hoặc sửa.",
              ],
            },
            { icon: "target", cells: ["Trọng tâm (focus)", "Có trọng tâm nghiên cứu rõ ràng, định hướng điều cần quan sát.", "Biết mình đang tìm hiểu phần công việc nào và vì sao."] },
          ]}
        />
        <div className="flex gap-4">
          <InfoCard
            icon="book"
            tone="fill"
            title="Mô hình thợ cả – học việc (master–apprentice)"
            className="flex-[2]"
            body="Người nghiên cứu học công việc giống như người học việc học từ thợ cả. Người học việc quan sát người thợ cả làm, rồi hỏi về lý do khi thấy điều chưa hiểu. Cách này giúp người dùng giải thích công việc tự nhiên hơn, vì họ đang dạy chứ không bị phỏng vấn."
          />
        </div>
        <Flow
          title="Một buổi contextual inquiry"
          icon="hourglass"
          steps={[
            ["Mở đầu", "ngắn"],
            ["Quan sát + hỏi trong lúc làm", "phần chính của buổi"],
            ["Tổng kết, kiểm tra cách hiểu", "cùng người dùng"],
            ["Ghi chép ngay", "trong cùng ngày"],
          ]}
          on={[1]}
          note="Phỏng vấn mở đầu ngắn → chuyển sang quan sát công việc thật, xen kẽ câu hỏi → tổng kết, kiểm tra lại cách hiểu với người dùng → ghi chép và diễn giải ngay sau buổi."
        />
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "target",
              "Bối cảnh phù hợp",
              [
                "Giai đoạn khám phá, trước khi quyết định xây gì.",
                "Công việc phức tạp, nhiều bước, nhiều công cụ (công cụ nội bộ, B2B, y tế, vận hành).",
                "Công việc phụ thuộc mạnh vào môi trường: cửa hàng, phòng khám, kho, hiện trường.",
                "Thay thế một quy trình hoặc hệ thống hiện có.",
              ],
            ],
            [
              "eye",
              "Dấu hiệu nhận biết",
              [
                "Nhóm thiết kế chưa bao giờ thấy người dùng làm việc thật.",
                "Người dùng dùng nhiều bảng tính, ghi chú giấy hoặc công cụ ngoài để bù cho hệ thống.",
                "Phỏng vấn cho kết quả quá chung chung.",
              ],
            ],
            [
              "clipboard-check",
              "Điều kiện cần",
              [
                "Được phép vào môi trường làm việc của người dùng (kể cả quy định bảo mật).",
                "Thời gian cho mỗi buổi đủ dài để thấy công việc thật.",
                "Người nghiên cứu có kỹ năng quan sát và hỏi không dẫn dắt.",
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
            { icon: "bar-chart", cells: ["Cần số liệu định lượng", "Số người ít, không cho tỷ lệ đại diện.", "Khảo sát, analytics."] },
            { icon: "ban", cells: ["Không vào được môi trường thật (bảo mật, khoảng cách)", "Mất nguyên tắc bối cảnh.", "Phỏng vấn từ xa có chia sẻ màn hình; diary study."] },
            { icon: "calendar", cells: ["Công việc diễn ra rải rác trong nhiều tuần", "Một buổi không thấy được toàn bộ.", "Diary study, nghiên cứu dài hạn."] },
            { icon: "component", cells: ["Cần đánh giá một thiết kế cụ thể", "Contextual inquiry để hiểu công việc, không để kiểm thử giao diện.", "Usability testing."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định trọng tâm.", "Viết rõ phần công việc cần hiểu và câu hỏi nghiên cứu.", "Tài liệu trọng tâm nghiên cứu."],
            [
              "Tuyển người tham gia và sắp xếp buổi làm việc.",
              "Chọn người đại diện các vai trò và bối cảnh khác nhau; xin phép môi trường làm việc.",
              "Lịch buổi, giấy đồng ý tham gia.",
            ],
            [
              "Chuẩn bị.",
              "Hướng dẫn mở đầu, danh sách chủ đề cần chú ý (không phải bảng câu hỏi cứng), công cụ ghi chép, cách chụp ảnh môi trường nếu được phép.",
              "Bộ dụng cụ nghiên cứu.",
            ],
            [
              "Thực hiện buổi làm việc.",
              "Mở đầu ngắn; quan sát công việc thật; hỏi khi thấy điều chưa hiểu; diễn giải và kiểm tra lại với người dùng; tổng kết.",
              "Ghi chép, ảnh, sơ đồ phác thảo.",
            ],
            ["Diễn giải ngay sau buổi.", "Cả nhóm cùng nghe lại và ghi chép các nhận định, càng sớm càng tốt khi trí nhớ còn mới.", "Ghi chú nhận định."],
            [
              "Tổng hợp.",
              "Dùng affinity diagram, các mô hình công việc (luồng, trình tự, công cụ, môi trường) và journey map.",
              "Nhận định chính, cơ hội thiết kế.",
            ],
          ]}
        />
      </Section>

      <Section
        {...S.recruit}
        intro="Contextual inquiry là phương pháp định tính, nên không có công thức cỡ mẫu. Mục tiêu là bao phủ đủ sự đa dạng của công việc, không phải ước lượng tỷ lệ."
      >
        <CheckCard
          icon="users"
          title="Cách quyết định số người"
          items={[
            "Liệt kê các vai trò và bối cảnh khác nhau ảnh hưởng tới công việc (ví dụ: nhân viên lễ tân và tư vấn viên; chi nhánh lớn và nhỏ).",
            "Chọn vài người cho mỗi tổ hợp quan trọng.",
            "Dừng khi các buổi mới không còn cho thêm nhận định quan trọng (bão hòa).",
          ]}
        />
        <div className="flex gap-4">
          <InfoCard title="2 × 2 = 4" body="2 vai trò × 2 loại chi nhánh = 4 tổ hợp (giả định)." className="flex-1" />
          <InfoCard title="2–3 người" body="Cho mỗi tổ hợp." className="flex-1" />
          <InfoCard tone="fill" title="8–12 buổi" body="Đây là cách lập luận theo độ đa dạng, không phải con số chuẩn." className="flex-1" />
        </div>
      </Section>

      <Section {...S.data}>
        <Table
          head={["Loại dữ liệu", "Thu được", "Cách ghi"]}
          widths={[300]}
          rows={[
            { icon: "play-circle", cells: ["Hành động", "Các bước người dùng thực hiện, thứ tự, thời điểm chuyển công cụ.", "Ghi chép theo trình tự."] },
            { icon: "chat", cells: ["Lời giải thích", "Lý do, mục tiêu, khó khăn.", "Ghi nguyên văn câu quan trọng."] },
            { icon: "file", cells: ["Hiện vật (artifacts)", "Giấy tờ, ghi chú, bảng tính, biểu mẫu.", "Chụp ảnh (nếu được phép)."] },
            { icon: "eye", cells: ["Môi trường", "Bố trí không gian, thiết bị, tiếng ồn, gián đoạn.", "Phác sơ đồ, ảnh."] },
            { icon: "split", cells: ["Phối hợp", "Ai chuyển việc cho ai, qua kênh nào.", "Sơ đồ luồng công việc."] },
          ]}
        />
        <Callout tone="note" icon="component" title="Phân tích">
          Chuyển ghi chép thành các nhận định riêng lẻ, rồi gom nhóm bằng affinity diagram. Contextual Design còn dùng các mô hình công việc (work models) để thể hiện luồng, trình
          tự, công cụ và môi trường.
        </Callout>
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["bar-chart", "Không đại diện về mặt thống kê", "Kết quả cho biết công việc diễn ra thế nào và vì sao, không cho biết bao nhiêu người."],
            ["eye", "Hiệu ứng người quan sát", "Người dùng có thể làm việc khác đi khi bị quan sát."],
            ["calendar", "Chỉ thấy những gì xảy ra trong buổi", "Công việc theo mùa, sự cố hiếm có thể không xuất hiện."],
            ["users", "Phụ thuộc kỹ năng người nghiên cứu", "Câu hỏi dẫn dắt hoặc diễn giải chủ quan làm sai lệch dữ liệu."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={[
            "Trọng tâm và câu hỏi nghiên cứu.",
            "Tiêu chí tuyển theo vai trò, bối cảnh.",
            "Quyền truy cập môi trường làm việc; giấy đồng ý.",
            "Hướng dẫn buổi làm việc, công cụ ghi chép.",
          ]}
          outputs={[
            "Ghi chép, ảnh hiện vật và môi trường.",
            "Nhận định đã tổng hợp (affinity diagram).",
            "Mô hình công việc, journey map.",
            "Danh sách điểm đau, cách xoay xở và cơ hội thiết kế.",
          ]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Mở rộng luồng đặt lịch tư vấn sang phía nhân viên. Không phải dự án đã triển khai.</Scenario>
        <div className="flex gap-4">
          <InfoCard
            icon="users"
            title="Bối cảnh"
            className="flex-1"
            body="Khách đặt lịch online, nhưng nhân viên lễ tân tại chi nhánh vẫn gọi điện xác nhận từng khách. Nhóm sản phẩm không hiểu vì sao."
          />
          <InfoCard
            icon="eye"
            title="Cách áp dụng"
            className="flex-1"
            body="Ba buổi contextual inquiry tại quầy lễ tân, mỗi buổi khoảng nửa ngày, quan sát lễ tân xử lý lịch hẹn trong giờ làm việc thật."
          />
        </div>
        <CheckCard
          icon="binoculars"
          title="Quan sát (giả định)"
          mark="•"
          items={[
            "Lễ tân in danh sách lịch hẹn mỗi sáng và ghi chú tay bên cạnh.",
            "Họ gọi điện vì hệ thống không cho biết khách đã đọc email xác nhận chưa, và khách hay quên lịch.",
            "Khi khách đến muộn, lễ tân phải tự sắp xếp lại với tư vấn viên bằng cách nhắn tin riêng.",
          ]}
        />
        <Callout tone="scenario" icon="chat" title="Diễn giải với người dùng">
          “Chị gọi điện vì muốn chắc khách sẽ đến, đúng không?” — “Đúng, và để hỏi họ có cần chuẩn bị giấy tờ gì không.”
        </Callout>
        <InfoCard
          icon="lightbulb"
          tone="fill"
          title="Cơ hội thiết kế"
          body="Nhắc lịch tự động kèm danh sách giấy tờ cần mang, cho khách xác nhận bằng một chạm; màn hình lịch hẹn cho lễ tân thấy trạng thái xác nhận."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Biến buổi làm việc thành phỏng vấn ngồi một chỗ", "Mất phần quan sát công việc thật.", "Để người dùng làm việc thật; hỏi trong lúc làm."],
            ["Đóng vai chuyên gia, sửa lỗi cho người dùng", "Người dùng ngừng làm theo cách tự nhiên.", "Giữ vai người học việc."],
            ["Câu hỏi dẫn dắt", "Người dùng xác nhận giả định của người nghiên cứu.", "Hỏi mở: “Anh vừa làm gì ở bước này?”"],
            ["Không kiểm tra cách hiểu với người dùng", "Diễn giải sai không được sửa.", "Nêu cách hiểu của mình và để người dùng xác nhận hoặc sửa."],
            ["Để lâu mới ghi chép", "Mất chi tiết.", "Diễn giải trong cùng ngày."],
            ["Chỉ quan sát một vai trò, một bối cảnh", "Bỏ sót sự đa dạng của công việc.", "Tuyển theo các tổ hợp vai trò và bối cảnh."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Phương pháp", "Cách làm", "Trả lời câu hỏi", "Khi nào chọn"]}
          widths={[260]}
          rows={[
            {
              icon: "eye",
              highlight: true,
              cells: [
                "Contextual Inquiry",
                "Quan sát và hỏi trong lúc người dùng làm việc thật, tại môi trường thật.",
                "“Công việc thật diễn ra thế nào, vì sao?”",
                "Khám phá công việc phức tạp, phụ thuộc bối cảnh.",
              ],
            },
            {
              icon: "chat",
              cells: ["User Interview", "Hỏi người dùng, thường ngoài bối cảnh công việc.", "“Người dùng nghĩ và kể gì?”", "Cần hiểu động cơ, quan điểm; không vào được môi trường."],
            },
            {
              icon: "binoculars",
              cells: ["Field Study / Ethnographic Research", "Quan sát dài hơn, có thể không can thiệp.", "“Văn hóa, thói quen, bối cảnh rộng ra sao?”", "Cần hiểu sâu bối cảnh xã hội, dài hạn."],
            },
            { icon: "component", cells: ["Usability Testing", "Người dùng làm tác vụ trên thiết kế cụ thể.", "“Thiết kế này dùng được không?”", "Đánh giá giải pháp."] },
            {
              icon: "calendar",
              cells: ["Diary Study", "Người dùng tự ghi lại trải nghiệm theo thời gian.", "“Trải nghiệm thay đổi thế nào qua nhiều ngày?”", "Công việc rải rác, khó quan sát trực tiếp."],
            },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Chuẩn bị"
            items={[
              "Có trọng tâm nghiên cứu rõ ràng.",
              "Tuyển người theo các vai trò và bối cảnh khác nhau.",
              "Đã xin phép môi trường và có giấy đồng ý, kể cả cho ảnh chụp.",
            ]}
          />
          <ChecklistColumn
            icon="eye"
            title="Trong buổi"
            items={[
              "Người dùng làm việc thật, không dựng tình huống.",
              "Giữ vai người học việc, hỏi mở.",
              "Đã kiểm tra cách hiểu với người dùng ngay tại chỗ.",
              "Ghi lại hiện vật, môi trường, cách xoay xở.",
            ]}
          />
          <ChecklistColumn
            icon="clipboard-check"
            title="Sau buổi"
            items={["Diễn giải trong cùng ngày.", "Tổng hợp bằng affinity diagram hoặc mô hình công việc.", "Phân biệt rõ điều đã quan sát với điều suy luận."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Affinity Diagram", "Sơ đồ tương đồng", "Cách tổng hợp dữ liệu sau các buổi."],
            ["Field Study", "Nghiên cứu thực địa", "Nhóm phương pháp nghiên cứu tại môi trường thật."],
            ["Ethnographic Research", "Nghiên cứu dân tộc học", "Quan sát sâu và dài hơn về bối cảnh."],
            ["Diary Study", "Nghiên cứu nhật ký", "Thay thế khi công việc rải rác theo thời gian."],
            ["Journey Mapping", "Bản đồ hành trình", "Một cách thể hiện kết quả."],
            ["Task Analysis", "Phân tích tác vụ", "Phân tích chi tiết các bước công việc quan sát được."],
            ["Attitudinal Methods", "Phương pháp nghiên cứu thái độ", "Contextual inquiry kết hợp cả thái độ và hành vi."],
          ]}
        />
      </Section>
    </div>
  );
}

export const CONTEXTUAL_INQUIRY: Article = {
  slug: "contextual-inquiry",
  version: 1,
  term: "Contextual Inquiry",
  fn: 1,
  vi: "Phỏng vấn tại bối cảnh — quan sát và phỏng vấn người dùng ngay nơi họ làm việc",
  kind: "Phương pháp nghiên cứu / kiểm thử",
  definition:
    "Contextual inquiry là phương pháp nghiên cứu định tính, trong đó người nghiên cứu đến môi trường thật của người dùng, quan sát họ làm việc và hỏi họ ngay trong lúc làm.",
  definitionMore:
    "Người nghiên cứu đóng vai “người học việc”, còn người dùng là “người thợ cả” hướng dẫn công việc của mình. Phương pháp này làm lộ ra những chi tiết người dùng không nghĩ tới khi được phỏng vấn ở nơi khác: thói quen, cách xoay xở, công cụ tự chế, gián đoạn và bối cảnh thật.",
  oneLine: "Quan sát và hỏi người dùng ngay trong môi trường làm việc thật, để thấy công việc diễn ra thế nào.",
  glance: [
    ["4", "Nguyên tắc"],
    ["Học việc", "Vai của người nghiên cứu"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Contextual interview"] },
    { label: "Nhóm chính", items: ["Nghiên cứu khám phá"] },
    { label: "Thẻ phụ", items: ["Tổng hợp và mô hình hóa"] },
    {
      label: "Lưu ý tên gọi",
      items: ["Phương pháp thu thập dữ liệu cốt lõi của Contextual Design (Beyer & Holtzblatt). Người nghiên cứu quan sát công việc thật đang diễn ra chứ không chỉ nghe kể lại."],
    },
  ],
  sections: SECTIONS,
  Body,
};
