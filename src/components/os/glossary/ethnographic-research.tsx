"use client";

import { Blk, T } from "./edit";
import { CheckCards, InfoGrid, InOutCards, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Ethnographic Research — copy from ux-glossary/ethnographic-research.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "traits", title: "Đặc điểm của nghiên cứu dân tộc học", icon: "component" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "notes", title: "Ghi chép và phân tích", icon: "pencil" },
  { id: "ethics", title: "Đạo đức nghiên cứu", icon: "shield-alert" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các phương pháp gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** The comparison table as a ladder: how present the researcher is, from absent to fully immersed. */
function Immersion() {
  const rows: [string, string, string, number][] = [
    ["Diary Study", "Người nghiên cứu không có mặt.", "Nhiều ngày, nhiều tuần.", 1],
    ["Contextual Inquiry", "Quan sát kèm hỏi, quan hệ thầy – trò.", "Một buổi đến vài ngày.", 2],
    ["Field Study", "Từ quan sát đến hòa nhập (khái niệm bao trùm).", "Tùy loại.", 3],
    ["Ethnographic Research", "Hòa nhập hoàn toàn.", "Dài.", 4],
  ];
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="users" size={36} iconSize={18} radius={10} />
        <Eyebrow>Mức hòa nhập của người nghiên cứu</Eyebrow>
      </div>
      <div className="flex flex-col gap-3">
        {rows.map(([name, how, time, lv]) => {
          const on = lv === 4;
          return (
            <div key={name} className="flex items-center gap-5">
              <span className="w-[210px] shrink-0 text-[17px] leading-6 font-semibold">{name}</span>
              <div className="grid flex-1 grid-cols-4 gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <span key={i} className={`h-9 rounded-[10px] ${i <= lv ? (on ? "bg-[var(--d-fill)]" : "bg-[var(--d-soft)]") : "bg-[var(--d-well)]"}`} />
                ))}
              </div>
              <div className="flex w-[300px] shrink-0 flex-col">
                <T className="text-[15px] leading-[22px]">{how}</T>
                <T className="font-mono text-[13px] leading-5 text-[var(--w-muted)]">{time}</T>
              </div>
            </div>
          );
        })}
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        NN/g xếp ethnography là một loại field study, ở mức hòa nhập sâu nhất.
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
            Nhiều hành vi được chi phối bởi những điều người dùng không tự nhận ra: thói quen gia đình, quan hệ trong nhóm, chuẩn mực “nên làm thế này”. Phỏng vấn không chạm được vì
            người dùng không nghĩ đến việc kể. Một buổi quan sát cũng không đủ vì chuẩn mực chỉ lộ ra qua nhiều tình huống.
          </P>
          <P strong>
            Ethnographic research giải quyết bằng thời gian và sự hòa nhập: người nghiên cứu ở đủ lâu để không còn là “khách”, và thấy những gì diễn ra khi không ai chú ý.
          </P>
        </div>
        <Callout tone="note">NN/g nhấn mạnh phương pháp này đặc biệt hữu ích khi văn hóa của người dùng khác với văn hóa của nhóm nghiên cứu.</Callout>
        <Eyebrow>Ethnographic research hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          cols={3}
          minH={170}
          items={[
            ["check-circle", "Sản phẩm có hợp với đời sống thật không", "Chuẩn mực, quan hệ, vai trò trong nhóm."],
            ["users", "Ai thật sự ra quyết định", "Người dùng trực tiếp hay người ảnh hưởng xung quanh."],
            ["lightbulb", "Cơ hội mới", "Nhu cầu chưa ai nói ra."],
          ]}
        />
      </Section>

      <Section {...S.traits}>
        <Table
          head={["Đặc điểm", "Mô tả", "Ví dụ minh họa (giả định)"]}
          widths={[280]}
          rows={[
            { icon: "target", cells: ["Môi trường tự nhiên", "Nghiên cứu ở nơi người dùng sống, làm việc.", "Ở cùng các gia đình đang cân nhắc dịch vụ tư vấn."] },
            { icon: "calendar", cells: ["Thời gian kéo dài", "Nhiều ngày đến nhiều tuần, đôi khi lâu hơn.", "Gặp lại mỗi gia đình nhiều lần trong một tháng."] },
            { icon: "eye", cells: ["Quan sát có tham gia", "Người nghiên cứu tham gia vào sinh hoạt ở mức phù hợp.", "Ngồi cùng bữa tối khi gia đình bàn chuyện tài chính."] },
            { icon: "component", cells: ["Toàn cảnh", "Quan tâm cả quan hệ, vai trò, đồ vật, không gian.", "Ai giữ giấy tờ, ai có tiếng nói cuối cùng."] },
            { icon: "users", cells: ["Góc nhìn của người trong cuộc", "Hiểu ý nghĩa theo cách người dùng hiểu.", "Vì sao “hỏi ý kiến người lớn” là bắt buộc."] },
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
                "Bước vào một thị trường, nhóm người dùng hoặc văn hóa mà nhóm chưa hiểu.",
                "Hành vi gắn với quan hệ xã hội, gia đình, cộng đồng.",
                "Giai đoạn khám phá sớm, trước khi xác định vấn đề cần giải quyết.",
              ],
            ],
            [
              "eye",
              "Dấu hiệu nhận biết",
              [
                "Sản phẩm làm đúng yêu cầu nhưng người dùng vẫn không chấp nhận, không ai giải thích được vì sao.",
                "Câu trả lời phỏng vấn nghe “hợp lý” nhưng không khớp với dữ liệu hành vi.",
              ],
            ],
            [
              "clipboard-check",
              "Điều kiện cần",
              [
                "Thời gian và ngân sách cho nghiên cứu dài.",
                "Người nghiên cứu có kinh nghiệm quan sát, ghi chép và giữ khoảng cách phù hợp.",
                "Sự đồng ý của người tham gia và cộng đồng.",
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
            { icon: "target", cells: ["Câu hỏi hẹp về một công việc cụ thể", "Hòa nhập dài là quá mức cần.", "Contextual inquiry."] },
            { icon: "hourglass", cells: ["Thời gian dự án ngắn", "Không đủ thời gian để hòa nhập.", "Field study ngắn, diary study."] },
            { icon: "play-circle", cells: ["Cần đánh giá giao diện", "Không đo được độ dễ dùng.", "Usability testing."] },
            { icon: "ban", cells: ["Không thể có mặt trong bối cảnh", "Mất yếu tố cốt lõi của phương pháp.", "Diary study, phỏng vấn từ xa."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định câu hỏi và cộng đồng nghiên cứu.", "Câu hỏi mở về đời sống, không phải về tính năng.", "Câu hỏi nghiên cứu, phạm vi cộng đồng."],
            ["Xin phép và xây dựng quan hệ.", "Giải thích mục đích, cách ghi chép, quyền rút lui.", "Sự đồng ý và người kết nối trong cộng đồng."],
            ["Hòa nhập và quan sát.", "Có mặt thường xuyên, quan sát, tham gia ở mức phù hợp, hỏi khi thích hợp.", "Ghi chép thực địa."],
            ["Ghi chép mỗi ngày.", "Ghi càng sớm càng tốt, tách quan sát với diễn giải.", "Nhật ký thực địa."],
            ["Phân tích lặp.", "Đọc lại ghi chép, tìm mẫu hình, điều chỉnh điều cần quan sát tiếp.", "Chủ đề và giả thuyết đang hình thành."],
            ["Tổng hợp và chuyển thành cơ hội thiết kế.", "", "Nhận định, mô hình (empathy map, journey, sơ đồ quan hệ), cơ hội thiết kế."],
          ]}
        />
      </Section>

      <Section {...S.notes}>
        <P strong>Tách quan sát với diễn giải là quy tắc quan trọng nhất khi ghi chép.</P>
        <div className="flex gap-4">
          <InfoCard tone="fill" icon="eye" title="Quan sát (điều đã thấy)" body="Người mẹ đưa điện thoại cho con trai đọc bảng giá." className="flex-1" />
          <InfoCard
            icon="lightbulb"
            title="Diễn giải (điều nghĩ ra)"
            body="Con trai có thể là người hiểu công nghệ, hoặc là người được tin tưởng về tài chính. Cần kiểm tra."
            className="flex-1"
          />
        </div>
        <P>
          Phân tích thường dùng affinity diagram để gom chủ đề, sau đó dựng mô hình phù hợp: sơ đồ quan hệ giữa các vai trò, empathy map, journey map.
        </P>
        <Callout tone="note">Phương pháp này không có công thức tính. Giá trị nằm ở độ sâu của hiểu biết, không ở số lượng.</Callout>
      </Section>

      <Section {...S.ethics}>
        <InfoGrid
          items={[
            ["check-circle", "Đồng ý có hiểu biết", "Người tham gia biết mình được nghiên cứu, mục đích là gì, dữ liệu dùng thế nào."],
            ["x", "Quyền rút lui", "Bất kỳ lúc nào."],
            ["shield-alert", "Bảo vệ danh tính", "Ẩn tên, không ghi lại thông tin nhạy cảm không cần thiết."],
            ["users", "Tôn trọng chuẩn mực của cộng đồng", "Không chụp ảnh, ghi âm khi chưa được phép."],
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["eye", "Phụ thuộc vào người nghiên cứu", "Cách nhìn và kinh nghiệm của người nghiên cứu ảnh hưởng điều được ghi lại."],
            ["users", "Sự có mặt làm thay đổi hành vi", "Nhất là trong những ngày đầu."],
            ["bar-chart", "Ít người, sâu", "Kết quả cho biết điều có thể xảy ra trong một nhóm, không cho biết tỷ lệ trong dân số."],
            ["rotate", "Khó lặp lại", "Đúng như cũ."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Câu hỏi nghiên cứu mở.", "Người kết nối và sự đồng ý của cộng đồng.", "Thời gian dài và người nghiên cứu có kinh nghiệm.", "Công cụ ghi chép."]}
          outputs={["Ghi chép thực địa.", "Nhận định về chuẩn mực, quan hệ, vai trò.", "Mô hình tổng hợp.", "Cơ hội thiết kế."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <div className="flex gap-4">
          <InfoCard
            icon="users"
            title="Bối cảnh"
            className="flex-1"
            body="Dịch vụ tư vấn mở rộng sang một nhóm khách hàng mới, có văn hóa gia đình khác với nhóm thiết kế. Tỷ lệ đặt lịch ở nhóm này thấp, phỏng vấn không cho lý do rõ ràng."
          />
          <InfoCard
            icon="calendar"
            title="Cách áp dụng"
            className="flex-1"
            body="Người nghiên cứu gặp gỡ nhiều lần năm gia đình trong một tháng, tham gia các buổi họp mặt khi được mời."
          />
        </div>
        <CheckCards
          mark="•"
          groups={[
            [
              "binoculars",
              "Nhận định (giả định)",
              [
                "Quyết định chi tiêu lớn được bàn chung trong gia đình, người lớn tuổi có tiếng nói cuối cùng.",
                "Việc đặt lịch online “một mình” bị xem là thiếu tôn trọng gia đình.",
                "Người trẻ là người tìm thông tin, nhưng không phải người quyết định.",
              ],
            ],
          ]}
        />
        <InfoCard
          icon="lightbulb"
          tone="fill"
          title="Cơ hội thiết kế"
          body="Cho phép mời thêm người thân vào buổi tư vấn; tài liệu tóm tắt in được hoặc dễ chia sẻ để cả nhà cùng đọc."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Gọi một buổi phỏng vấn tại nhà là ethnography", "Thiếu thời gian và sự hòa nhập.", "Gọi đúng tên: field visit, contextual inquiry."],
            ["Đến với giả thuyết cố định", "Chỉ thấy điều muốn thấy.", "Câu hỏi mở, điều chỉnh theo quan sát."],
            ["Trộn quan sát với diễn giải", "Không phân biệt được dữ kiện với ý kiến.", "Ghi hai cột riêng."],
            ["Bỏ qua đạo đức nghiên cứu", "Mất lòng tin, gây hại cho người tham gia.", "Đồng ý có hiểu biết, ẩn danh."],
            ["Khái quát từ vài gia đình thành cả thị trường", "Mẫu nhỏ, có chọn lọc.", "Kiểm chứng bằng khảo sát hoặc dữ liệu rộng hơn."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Immersion />
        <Table
          head={["Phương pháp", "Mức hòa nhập", "Thời gian", "Trả lời câu hỏi"]}
          widths={[260]}
          rows={[
            { icon: "users", highlight: true, cells: ["Ethnographic Research", "Hòa nhập hoàn toàn.", "Dài.", "“Văn hóa, quan hệ, chuẩn mực nào chi phối hành vi?”"] },
            { icon: "binoculars", cells: ["Field Study", "Từ quan sát đến hòa nhập (khái niệm bao trùm).", "Tùy loại.", "“Người dùng làm gì trong môi trường thật?”"] },
            { icon: "eye", cells: ["Contextual Inquiry", "Quan sát kèm hỏi, quan hệ thầy – trò.", "Một buổi đến vài ngày.", "“Công việc cụ thể diễn ra thế nào?”"] },
            { icon: "calendar", cells: ["Diary Study", "Người nghiên cứu không có mặt.", "Nhiều ngày, nhiều tuần.", "“Trải nghiệm thay đổi thế nào theo thời gian?”"] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Chuẩn bị"
            items={["Câu hỏi nghiên cứu mở, về đời sống chứ không về tính năng.", "Có sự đồng ý và người kết nối.", "Đủ thời gian để hòa nhập."]}
          />
          <ChecklistColumn icon="eye" title="Thực địa" items={["Ghi chép mỗi ngày.", "Tách quan sát với diễn giải.", "Tôn trọng chuẩn mực và quyền riêng tư."]} />
          <ChecklistColumn icon="analytics" title="Sau thực địa" items={["Phân tích lặp, kiểm tra lại giả thuyết.", "Ghi rõ giới hạn về mẫu và vai trò người nghiên cứu."]} />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Field Study", "Nghiên cứu thực địa", "Khái niệm bao trùm; ethnography là dạng hòa nhập sâu nhất."],
            ["Contextual Inquiry", "Phỏng vấn tại bối cảnh", "Dạng ngắn, tập trung vào một công việc."],
            ["Diary Study", "Nghiên cứu nhật ký", "Thay thế khi không thể có mặt lâu dài."],
            ["Affinity Diagram", "Sơ đồ tương đồng", "Cách tổng hợp ghi chép thực địa."],
            ["Empathy Mapping", "Bản đồ thấu cảm", "Mô hình tổng hợp từ nhận định."],
            ["Customer Journey", "Hành trình khách hàng", "Hiểu hành trình trong bối cảnh văn hóa."],
          ]}
        />
      </Section>
    </div>
  );
}

export const ETHNOGRAPHIC_RESEARCH: Article = {
  slug: "ethnographic-research",
  version: 1,
  term: "Ethnographic Research",
  fn: 1,
  vi: "Nghiên cứu dân tộc học",
  kind: "Phương pháp nghiên cứu / kiểm thử",
  definition:
    "Ethnographic research là phương pháp nghiên cứu định tính, trong đó người nghiên cứu hòa nhập vào môi trường tự nhiên của một nhóm người trong thời gian dài, quan sát và tham gia vào sinh hoạt của họ để hiểu quan hệ, cách tương tác và chuẩn mực văn hóa chi phối hành vi.",
  definitionMore: "Phương pháp này trả lời câu hỏi vì sao người ta sống và làm việc như vậy, không chỉ họ làm gì.",
  oneLine: "Hòa nhập vào đời sống của người dùng trong thời gian dài để hiểu văn hóa và chuẩn mực đằng sau hành vi.",
  glance: [
    ["5", "Đặc điểm cốt lõi"],
    ["2", "Cột ghi chép: quan sát, diễn giải"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Ethnography", "Design ethnography"] },
    { label: "Nhóm chính", items: ["Nghiên cứu khám phá"] },
    { label: "Thẻ phụ", items: ["Nghiên cứu định tính"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "Gốc từ nhân học. Trong UX, NN/g xếp ethnography là một loại field study, mức hòa nhập sâu nhất. Bài này dùng nghĩa hẹp: hòa nhập kéo dài, không phải mọi chuyến thăm người dùng.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
