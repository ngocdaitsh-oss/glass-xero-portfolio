"use client";

import { Blk, T } from "./edit";
import { CheckCards, InfoGrid, InOutCards, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Field Study — copy from ux-glossary/field-study.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "types", title: "Các loại field study", icon: "component" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "notes", title: "Ghi chép tại thực địa", icon: "pencil" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các phương pháp gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** One axis from "observe only" to "fully immersed"; customer-site visits can sit anywhere along it. */
function InvolvementAxis() {
  const points: [string, number, boolean][] = [
    ["Direct observation", 6, false],
    ["Contextual inquiry", 42, true],
    ["Ethnography", 94, false],
  ];
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="arrows" size={36} iconSize={18} radius={10} />
        <Eyebrow>Mức can thiệp của người nghiên cứu</Eyebrow>
      </div>
      <div className="flex flex-col gap-4 px-2">
        <div className="relative h-12">
          {points.map(([name, x, on]) => (
            <span
              key={name}
              className={`absolute top-0 -translate-x-1/2 rounded-[12px] px-4 py-2.5 text-[16px] leading-6 font-semibold whitespace-nowrap ${on ? "bg-[var(--d-fill)] text-white" : "bg-[var(--d-soft)] text-[var(--d-accent)]"}`}
              style={{ left: `${x}%` }}
            >
              {name}
            </span>
          ))}
        </div>
        <div className="relative h-3 rounded-full bg-[var(--d-well)]">
          {points.map(([name, x]) => (
            <span key={name} className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--d-accent)]" style={{ left: `${x}%` }} />
          ))}
        </div>
        <div className="relative h-11">
          <span className="absolute inset-x-[18%] top-0 flex h-11 items-center justify-center rounded-[12px] bg-[var(--d-well)] text-[15px] leading-6 font-semibold">
            Customer-site visit: tùy mục tiêu
          </span>
        </div>
        <div className="flex justify-between font-mono text-[13px] tracking-[0.4px] text-[var(--w-muted)]">
          <span>CHỈ QUAN SÁT</span>
          <span>HÒA NHẬP HOÀN TOÀN</span>
        </div>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Từ trái sang: direct observation, contextual inquiry, customer-site visit (có thể nằm ở nhiều vị trí), ethnography.
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
            Trong phòng lab, người dùng có máy tính ổn định, không ai làm phiền, và một tác vụ rõ ràng. Ngoài đời thì khác: mạng chập chờn, con nhỏ đòi bế, đồng nghiệp hỏi chuyện, giấy
            tờ để lẫn, ba ứng dụng mở cùng lúc. Những yếu tố này thường là nguyên nhân thật của vấn đề, nhưng không xuất hiện trong lab.
          </P>
          <P strong>Field study đưa người nghiên cứu đến nơi sự việc thật sự diễn ra.</P>
        </div>
        <Eyebrow>Field study hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          cols={3}
          minH={170}
          items={[
            ["binoculars", "Vấn đề thật là gì", "Trước khi thiết kế hay thiết kế lại (giai đoạn khám phá)."],
            ["component", "Bối cảnh ảnh hưởng thế nào", "Môi trường, người khác, công cụ đang dùng."],
            ["check-circle", "Thiết kế có chạy được ngoài đời không", "Dùng ở giai đoạn sau như “field testing” để đánh giá."],
          ]}
        />
      </Section>

      <Section {...S.types}>
        <P>NN/g liệt kê các loại field study theo mức độ người nghiên cứu can thiệp.</P>
        <InvolvementAxis />
        <Table
          head={["Loại", "Cách làm", "Mức can thiệp", "Dùng khi"]}
          widths={[260, undefined, 180]}
          rows={[
            { icon: "eye", cells: ["Direct observation (quan sát trực tiếp)", "Quan sát im lặng, hạn chế làm gián đoạn.", "Thấp nhất.", "Muốn thấy hành vi tự nhiên nhất."] },
            {
              icon: "chat",
              highlight: true,
              cells: [
                "Contextual inquiry",
                "Quan sát kèm hỏi; người dùng là “thầy”, người nghiên cứu là “trò”. Gồm cả field usability testing.",
                "Trung bình.",
                "Hiểu sâu một công việc cụ thể.",
              ],
            },
            {
              icon: "briefcase",
              cells: ["Customer-site visit (thăm khách hàng)", "Đến nơi khách hàng làm việc để trao đổi, quan sát.", "Tùy mục tiêu.", "Sản phẩm B2B, hiểu môi trường doanh nghiệp."],
            },
            { icon: "users", cells: ["Ethnography (dân tộc học)", "Hòa nhập hoàn toàn trong thời gian dài.", "Cao nhất.", "Hiểu văn hóa, quan hệ, chuẩn mực."] },
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
                "Trước khi thiết kế hoặc thiết kế lại, ở giai đoạn khám phá.",
                "Bối cảnh sử dụng có ảnh hưởng lớn (di động, ngoài trời, môi trường làm việc đặc thù).",
                "Sản phẩm dùng cùng nhiều công cụ, giấy tờ hay người khác.",
                "Sau khi ra mắt, để kiểm tra thiết kế chạy thế nào trong đời thật.",
              ],
            ],
            [
              "eye",
              "Dấu hiệu nhận biết",
              [
                "Usability test trong lab tốt, nhưng dữ liệu thật cho thấy người dùng vẫn gặp khó.",
                "Nhóm không thể mô tả nơi và cách người dùng thật sự dùng sản phẩm.",
              ],
            ],
            [
              "clipboard-check",
              "Điều kiện cần",
              ["Được phép vào môi trường của người dùng.", "Thời gian di chuyển và chuẩn bị.", "Câu hỏi nghiên cứu rõ để biết cần quan sát gì."],
            ],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[360]}
          rows={[
            { icon: "split", cells: ["Cần so sánh có kiểm soát giữa hai phương án", "Môi trường thật có quá nhiều biến số.", "A/B testing, usability test trong lab."] },
            { icon: "calendar", cells: ["Hành vi kéo dài nhiều tuần", "Một hai lần thăm không đủ.", "Diary study."] },
            { icon: "ban", cells: ["Không thể vào môi trường người dùng", "Bảo mật, khoảng cách, quyền riêng tư.", "Phỏng vấn từ xa có chia sẻ màn hình; diary study."] },
            { icon: "bar-chart", cells: ["Cần số liệu đại diện", "Mẫu nhỏ, định tính.", "Khảo sát, analytics."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định câu hỏi và loại field study.", "", "Câu hỏi nghiên cứu, loại field study phù hợp."],
            ["Chọn người tham gia và địa điểm.", "Chọn theo độ đa dạng của bối cảnh; field study dùng mẫu nhỏ.", "Lịch thăm."],
            ["Chuẩn bị hướng dẫn quan sát.", "Điều cần chú ý, câu hỏi gợi mở, cách ghi chép.", "Hướng dẫn thực địa."],
            ["Xin phép và giải thích.", "Ghi âm, chụp ảnh chỉ khi được đồng ý.", "Sự đồng ý."],
            ["Thực hiện tại thực địa.", "Quan sát trước, hỏi sau; ghi lại môi trường, công cụ, người xung quanh.", "Ghi chép, ảnh, ghi âm."],
            ["Tổng hợp ngay sau mỗi buổi.", "Ghi lại khi còn nhớ rõ.", "Tóm tắt từng buổi."],
            ["Phân tích.", "Affinity diagram, mô hình bối cảnh, journey map.", "Nhận định, cơ hội thiết kế."],
          ]}
        />
      </Section>

      <Section {...S.notes}>
        <Table
          head={["Nên ghi", "Ví dụ minh họa (giả định)"]}
          widths={[360]}
          rows={[
            { icon: "target", cells: ["Môi trường", "Bàn làm việc ở phòng khách, TV đang bật."] },
            { icon: "component", cells: ["Công cụ đang dùng", "Điện thoại, sổ tay ghi số điện thoại các trung tâm tư vấn."] },
            { icon: "users", cells: ["Người xung quanh", "Vợ/chồng ngồi cạnh, góp ý khi xem bảng giá."] },
            { icon: "hourglass", cells: ["Gián đoạn", "Bị gọi đi giữa chừng, quay lại thì phiên đặt lịch đã hết hạn."] },
            { icon: "lightbulb", cells: ["Cách vượt khó tự nghĩ ra", "Chụp màn hình để không mất thông tin."] },
          ]}
        />
        <Callout tone="note">Phương pháp này không có công thức tính. Giá trị nằm ở hiểu biết về bối cảnh.</Callout>
      </Section>

      <Section {...S.limits}>
        <CheckCards
          mark="•"
          groups={[
            [
              "shield-alert",
              "Giới hạn",
              [
                "Sự có mặt của người nghiên cứu làm thay đổi hành vi.",
                "Mẫu nhỏ, không đại diện về thống kê.",
                "Khó so sánh giữa các buổi vì mỗi bối cảnh khác nhau.",
                "Điều quan sát được phụ thuộc thời điểm thăm: một buổi chiều yên tĩnh không cho thấy giờ cao điểm.",
              ],
            ],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Câu hỏi nghiên cứu, loại field study.", "Người tham gia, địa điểm, sự đồng ý.", "Hướng dẫn quan sát, công cụ ghi chép."]}
          outputs={["Ghi chép, ảnh, ghi âm.", "Nhận định về bối cảnh sử dụng.", "Mô hình bối cảnh, journey map.", "Cơ hội thiết kế."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <div className="flex gap-4">
          <InfoCard
            icon="analytics"
            title="Bối cảnh"
            className="flex-1"
            body="Analytics cho thấy nhiều khách bỏ dở form đặt lịch ở bước nhập thông tin. Usability test trong lab không thấy vấn đề lớn."
          />
          <InfoCard icon="eye" title="Cách áp dụng" className="flex-1" body="Thăm sáu khách tại nhà, quan sát họ đặt lịch thật trên điện thoại." />
        </div>
        <CheckCards
          mark="•"
          groups={[
            [
              "binoculars",
              "Nhận định (giả định)",
              [
                "Khách thường đặt lịch khi đang làm việc khác và bị gián đoạn. Khi quay lại, phiên đã hết hạn và dữ liệu đã nhập bị mất.",
                "Khách cần hỏi người thân về giờ trống trước khi chọn lịch, nên phải rời form.",
                "Một số khách đặt lịch bằng mạng di động yếu, trang tải chậm ở bước xác nhận.",
              ],
            ],
          ]}
        />
        <InfoCard
          icon="lightbulb"
          tone="fill"
          title="Cơ hội thiết kế"
          body="Tự lưu thông tin đã nhập; cho phép giữ chỗ tạm; gửi liên kết hoàn tất qua tin nhắn."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Biến field study thành phỏng vấn tại nhà", "Chỉ nghe kể, không thấy hành vi.", "Quan sát trước, hỏi sau."],
            ["Không ghi lại bối cảnh", "Mất đúng điều mà field study có giá trị.", "Ghi môi trường, công cụ, người xung quanh."],
            ["Can thiệp hoặc hướng dẫn người dùng", "Hành vi không còn tự nhiên.", "Để người dùng tự làm, chỉ hỏi khi cần."],
            ["Chờ nhiều ngày mới tổng hợp", "Quên chi tiết.", "Tóm tắt ngay sau mỗi buổi."],
            ["Dùng ít bối cảnh quá giống nhau", "Không thấy được sự đa dạng.", "Chọn người theo độ đa dạng bối cảnh."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Phương pháp", "Quan hệ với field study", "Khi nào chọn"]}
          widths={[300]}
          rows={[
            { icon: "binoculars", highlight: true, cells: ["Field Study", "Khái niệm bao trùm.", "Cần hiểu bối cảnh thật."] },
            { icon: "chat", cells: ["Contextual Inquiry", "Một loại field study, có cấu trúc thầy – trò.", "Hiểu sâu một công việc cụ thể."] },
            { icon: "users", cells: ["Ethnographic Research", "Một loại field study, hòa nhập sâu và lâu.", "Hiểu văn hóa, chuẩn mực."] },
            { icon: "flask", cells: ["Usability Testing (lab)", "Không phải field study; bối cảnh dựng sẵn.", "Đánh giá giao diện có kiểm soát."] },
            { icon: "calendar", cells: ["Diary Study", "Nghiên cứu trong bối cảnh thật nhưng người nghiên cứu không có mặt.", "Hành vi kéo dài, rải rác."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Chuẩn bị"
            items={["Câu hỏi nghiên cứu rõ ràng.", "Chọn đúng loại field study.", "Người tham gia đa dạng về bối cảnh.", "Có sự đồng ý về ghi âm, chụp ảnh."]}
          />
          <ChecklistColumn icon="eye" title="Tại thực địa" items={["Quan sát trước, hỏi sau.", "Ghi môi trường, công cụ, người xung quanh, gián đoạn."]} />
          <ChecklistColumn icon="analytics" title="Sau thực địa" items={["Tóm tắt ngay sau mỗi buổi.", "Ghi rõ giới hạn về mẫu và thời điểm thăm."]} />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Contextual Inquiry", "Phỏng vấn tại bối cảnh", "Một loại field study."],
            ["Ethnographic Research", "Nghiên cứu dân tộc học", "Loại field study hòa nhập sâu nhất."],
            ["Diary Study", "Nghiên cứu nhật ký", "Thay thế khi không thể có mặt hoặc hành vi kéo dài."],
            ["Usability Testing", "Kiểm thử khả năng sử dụng", "Đối lập về bối cảnh; field usability testing là dạng kết hợp."],
            ["Affinity Diagram", "Sơ đồ tương đồng", "Cách tổng hợp ghi chép thực địa."],
            ["Customer Journey", "Hành trình khách hàng", "Field study cho thấy hành trình trong bối cảnh thật."],
          ]}
        />
      </Section>
    </div>
  );
}

export const FIELD_STUDY: Article = {
  slug: "field-study",
  version: 1,
  term: "Field Study",
  fn: 1,
  vi: "Nghiên cứu thực địa",
  kind: "Phương pháp nghiên cứu / kiểm thử",
  definition:
    "Field study là nghiên cứu diễn ra trong môi trường tự nhiên của người dùng (nhà, nơi làm việc, cửa hàng, ngoài đường) thay vì trong phòng lab hay một bối cảnh dựng sẵn.",
  definitionMore:
    "Mục tiêu là thấy người dùng làm việc, sống và dùng sản phẩm như thế nào khi có đủ những yếu tố thật xung quanh: người khác, đồ vật, gián đoạn, giới hạn.",
  oneLine: "Nghiên cứu người dùng ngay trong môi trường thật của họ thay vì trong phòng lab.",
  glance: [
    ["4", "Loại theo mức can thiệp"],
    ["5", "Điều nên ghi tại thực địa"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Field research", "Field visit", "Site visit"] },
    { label: "Nhóm chính", items: ["Nghiên cứu khám phá"] },
    { label: "Thẻ phụ", items: ["Nghiên cứu định tính"] },
    {
      label: "Lưu ý tên gọi",
      items: ["Field study là khái niệm bao trùm cho mọi nghiên cứu diễn ra trong môi trường thật của người dùng. Contextual inquiry và ethnography là những loại field study cụ thể."],
    },
  ],
  sections: SECTIONS,
  Body,
};
