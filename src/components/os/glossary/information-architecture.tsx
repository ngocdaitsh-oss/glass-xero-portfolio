"use client";

import { Blk, T } from "./edit";
import { CheckCards, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Information Architecture — copy from ux-glossary/information-architecture.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "systems", title: "Thành phần của IA", icon: "component" },
  { id: "nav", title: "IA và điều hướng", icon: "split" },
  { id: "organize", title: "Cách tổ chức nội dung", icon: "list" },
  { id: "when", title: "Khi nào cần quan tâm đến IA", icon: "check-circle" },
  { id: "apply", title: "Cách áp dụng", icon: "list-search" },
  { id: "limits", title: "Giới hạn: khi nào IA chưa đủ", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** The visible menu on top, drawn from the tree underneath. */
function Layers() {
  const tree: [string, [string, ...string[]][]][] = [
    ["Dịch vụ", [["Tài chính gia đình"], ["Khởi nghiệp"]]],
    ["Về chúng tôi", []],
    ["Hỗ trợ", [["Đổi / hủy lịch"]]],
  ];
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="split" size={36} iconSize={18} radius={10} />
        <Eyebrow>Hai tầng: điều hướng và IA</Eyebrow>
      </div>
      <div className="flex items-center gap-5">
        <span className="w-[200px] shrink-0 font-mono text-[13px] tracking-[0.4px] text-[var(--w-muted)]">ĐIỀU HƯỚNG (THẤY ĐƯỢC)</span>
        <div className="grid flex-1 grid-cols-3 gap-3">
          {tree.map(([n]) => (
            <span key={n} className="rounded-[12px] bg-[var(--d-fill)] px-4 py-3 text-center text-[16px] leading-6 font-semibold text-white">
              {n}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-start gap-5">
        <span className="w-[200px] shrink-0 pt-3 font-mono text-[13px] tracking-[0.4px] text-[var(--w-muted)]">IA (CẤU TRÚC BÊN DƯỚI)</span>
        <div className="flex flex-1 flex-col gap-3 rounded-[18px] bg-[var(--d-well)] p-4">
          <span className="self-center rounded-[12px] bg-[var(--d-soft)] px-5 py-2.5 text-[16px] leading-6 font-semibold text-[var(--d-accent)]">Trang chủ</span>
          <div className="grid grid-cols-3 gap-3">
            {tree.map(([n, kids]) => (
              <div key={n} className="flex flex-col gap-2">
                <span className="rounded-[12px] bg-[var(--w-card)] px-4 py-2.5 text-center text-[16px] leading-6 font-semibold">{n}</span>
                {kids.map(([k]) => (
                  <span key={k} className="ml-5 rounded-[10px] bg-[var(--w-card)] px-3 py-2 text-[15px] leading-[22px] text-[var(--w-secondary)]">
                    {k}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Tầng dưới là IA: một cây cấu trúc với gốc “Trang chủ”. Tầng trên là điều hướng: thanh menu hiển thị ba nhánh chính, lấy từ tầng dưới.
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
            Khi sản phẩm lớn dần, nội dung thường được thêm vào theo cách tổ chức nội bộ của công ty: theo phòng ban, theo dự án. Người dùng không biết cấu trúc đó, nên họ không tìm được
            thông tin, hoặc tìm được nhưng không chắc đó là thứ mình cần.
          </P>
          <P strong>IA tổ chức nội dung theo cách người dùng nghĩ, để họ đoán được thông tin nằm ở đâu và gọi là gì.</P>
        </div>
        <Eyebrow>IA hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          minH={130}
          items={[
            ["component", "Nội dung chia thành những nhóm nào", "Tổ chức."],
            ["chat", "Mỗi nhóm, mỗi mục gọi tên là gì", "Nhãn."],
            ["link", "Các phần liên kết với nhau thế nào", "Điều hướng và liên kết."],
            ["file", "Nội dung mới đặt vào đâu", "Để cấu trúc không bị rối."],
          ]}
        />
      </Section>

      <Section {...S.systems}>
        <P>Sách Information Architecture: For the Web and Beyond mô tả IA qua bốn hệ thống chính.</P>
        <Table
          head={["Hệ thống", "Trả lời câu hỏi", "Ví dụ minh họa (giả định)"]}
          widths={[260, 300]}
          rows={[
            {
              icon: "component",
              cells: ["Tổ chức (organization)", "Nội dung được chia nhóm theo cách nào?", "Chia dịch vụ tư vấn theo nhu cầu của khách (“Tài chính gia đình”, “Khởi nghiệp”) thay vì theo tên chuyên gia."],
            },
            { icon: "chat", cells: ["Nhãn (labeling)", "Mỗi nhóm, mỗi mục gọi là gì?", "“Đặt lịch tư vấn” thay vì “Đăng ký phiên”."] },
            { icon: "split", cells: ["Điều hướng (navigation)", "Người dùng đi giữa các phần thế nào?", "Menu chính, breadcrumb, liên kết “Dịch vụ liên quan”."] },
            { icon: "list-search", cells: ["Tìm kiếm (search)", "Người dùng tìm trực tiếp thế nào?", "Ô tìm kiếm dịch vụ, gợi ý theo từ khóa."] },
          ]}
        />
      </Section>

      <Section {...S.nav}>
        <P>NN/g phân biệt rõ hai khái niệm.</P>
        <Table
          head={["", "Information Architecture", "Navigation"]}
          widths={[260]}
          rows={[
            {
              cells: [
                "Là gì",
                "Nội dung, chức năng và cấu trúc, cách tổ chức, cách đặt tên xác định quan hệ giữa chúng.",
                "Các thành phần giao diện giúp người dùng tìm thông tin và thực hiện hành động.",
              ],
            },
            { cells: ["Có hiện trên giao diện không", "Không trực tiếp; IA là nền để thiết kế giao diện.", "Có: menu chính, menu phụ, breadcrumb, bộ lọc."] },
            { cells: ["Ví dụ", "Sơ đồ trang (sitemap), danh sách nhãn.", "Thanh menu trên cùng, menu bên trái trên trang dịch vụ."] },
          ]}
        />
        <Layers />
      </Section>

      <Section {...S.organize}>
        <Table
          head={["Cách tổ chức", "Mô tả", "Phù hợp khi"]}
          widths={[320]}
          rows={[
            { icon: "book", cells: ["Theo chủ đề", "Gom theo nội dung.", "Người dùng tìm theo chủ đề."] },
            { icon: "check-circle", cells: ["Theo nhiệm vụ", "Gom theo việc người dùng muốn làm.", "Sản phẩm phục vụ các việc rõ ràng (“Đặt lịch”, “Đổi lịch”)."] },
            { icon: "users", cells: ["Theo đối tượng", "Gom theo nhóm người dùng.", "Các nhóm có nhu cầu rất khác nhau."] },
            { icon: "list", cells: ["Theo thứ tự chữ cái, thời gian, vị trí", "Cách tổ chức có quy tắc rõ ràng.", "Người dùng biết chính xác điều cần tìm (như glossary này)."] },
          ]}
        />
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            ["target", "Bối cảnh phù hợp", ["Xây sản phẩm mới có nhiều nội dung.", "Sản phẩm lớn dần, nội dung khó tìm.", "Gộp hoặc thiết kế lại nhiều trang, nhiều sản phẩm."]],
            [
              "eye",
              "Dấu hiệu nhận biết",
              [
                "Người dùng dùng ô tìm kiếm cho những thứ lẽ ra nằm trong menu.",
                "Bộ phận hỗ trợ nhận nhiều câu hỏi về thông tin đã có trên trang.",
                "Nhóm không thống nhất nội dung mới nên đặt ở đâu.",
              ],
            ],
            ["clipboard-check", "Điều kiện cần", ["Danh sách nội dung hiện có (content inventory).", "Hiểu cách người dùng nghĩ về nội dung (card sorting, phỏng vấn)."]],
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Kiểm kê nội dung.", "", "Danh sách nội dung và chức năng."],
            ["Hiểu cách người dùng phân nhóm và gọi tên.", "Card sorting, phỏng vấn, phân tích từ khóa tìm kiếm.", "Nhóm và nhãn theo cách nghĩ của người dùng."],
            ["Đề xuất cấu trúc.", "", "Sơ đồ trang, danh sách nhãn."],
            ["Kiểm tra cấu trúc.", "Tree testing (không cần giao diện); first-click testing khi đã có giao diện.", "Cấu trúc đã điều chỉnh."],
            ["Thiết kế điều hướng và tìm kiếm dựa trên cấu trúc.", "", "Thiết kế điều hướng."],
            ["Quản lý thay đổi.", "Quy tắc đặt nội dung mới.", "Hướng dẫn cho người quản lý nội dung."],
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          cols={3}
          items={[
            ["file", "IA tốt không cứu được nội dung kém", "Người dùng tìm thấy trang nhưng nội dung khó hiểu thì vẫn thất bại."],
            ["eye", "IA tốt có thể bị điều hướng kém che mất", "Cấu trúc đúng nhưng menu ẩn, nhãn nhỏ thì người dùng vẫn không thấy."],
            ["users", "Một cấu trúc không phục vụ hết mọi người", "Cần nhiều đường vào (điều hướng, tìm kiếm, liên kết liên quan)."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Danh sách nội dung, chức năng.", "Dữ liệu về cách người dùng phân nhóm, gọi tên.", "Mục tiêu của người dùng và của dịch vụ."]}
          outputs={["Sơ đồ trang (sitemap).", "Danh sách nhãn.", "Kết quả kiểm tra cấu trúc.", "Quy tắc quản lý nội dung."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <div className="flex gap-4">
          <InfoCard icon="users" title="Bối cảnh" className="flex-1" body="Trang dịch vụ tổ chức theo tên chuyên gia. Khách không biết nên chọn ai, thường gọi điện hỏi." />
          <InfoCard
            icon="component"
            title="Cách áp dụng"
            className="flex-1"
            body="Card sorting với 20 khách cho thấy họ phân nhóm theo nhu cầu (“Tài chính gia đình”, “Khởi nghiệp”, “Đầu tư cá nhân”). Nhóm đề xuất cấu trúc mới theo nhu cầu, chuyên gia nằm bên trong từng nhu cầu. Tree testing để kiểm tra trước khi thiết kế giao diện."
          />
        </div>
        <InfoCard
          tone="fill"
          icon="check-circle"
          title="Quyết định"
          body="Đổi cấu trúc trang dịch vụ theo nhu cầu; đổi nhãn “Đăng ký phiên” thành “Đặt lịch tư vấn” theo ngôn ngữ khách dùng; thêm mục “Đổi / hủy lịch” vào phần Hỗ trợ."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Coi IA là menu", "Thiết kế menu mà không xem lại cấu trúc.", "Xây cấu trúc trước, menu sau."],
            ["Tổ chức theo cơ cấu nội bộ", "Người dùng không biết cơ cấu công ty.", "Tổ chức theo cách người dùng nghĩ."],
            ["Nhãn chuyên môn hoặc nội bộ", "Người dùng không hiểu.", "Dùng ngôn ngữ người dùng; kiểm tra bằng card sorting."],
            ["Không kiểm tra cấu trúc", "Lỗi cấu trúc lộ ra khi đã xây xong.", "Tree testing trước khi thiết kế giao diện."],
            ["Không có quy tắc cho nội dung mới", "Cấu trúc rối dần theo thời gian.", "Hướng dẫn quản lý nội dung."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Quan hệ với IA"]}
          widths={[340]}
          rows={[
            { icon: "split", cells: ["Navigation", "Phần giao diện dựa trên IA."] },
            { icon: "list", cells: ["Sitemap", "Tài liệu thể hiện cấu trúc IA."] },
            { icon: "component", cells: ["Card Sorting", "Phương pháp hiểu cách người dùng phân nhóm, đầu vào cho IA."] },
            { icon: "check-circle", cells: ["Tree Testing", "Phương pháp kiểm tra cấu trúc IA."] },
            { icon: "file", cells: ["Content Design", "Thiết kế nội dung bên trong cấu trúc."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="component"
            title="Cấu trúc"
            items={["Đã kiểm kê nội dung.", "Cấu trúc dựa trên cách người dùng nghĩ, không theo cơ cấu nội bộ.", "Nhãn dùng ngôn ngữ người dùng."]}
          />
          <ChecklistColumn
            icon="check-circle"
            title="Kiểm tra và duy trì"
            items={["Đã kiểm tra cấu trúc trước khi thiết kế giao diện.", "Có nhiều đường vào: điều hướng, tìm kiếm, liên kết liên quan.", "Có quy tắc đặt nội dung mới."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Card Sorting", "Phân loại thẻ", "Hiểu cách người dùng phân nhóm."],
            ["Tree Testing", "Kiểm thử cây cấu trúc", "Kiểm tra cấu trúc."],
            ["Wireframe", "Khung dây", "Thể hiện cấu trúc trong bố cục từng trang."],
            ["First-Click Testing", "Kiểm thử cú nhấp đầu tiên", "Kiểm tra nhãn và điều hướng trên giao diện."],
            ["Content Design", "Thiết kế nội dung", "Nội dung bên trong cấu trúc."],
            ["Mental Model", "Mô hình tư duy", "IA tốt khớp với mô hình tư duy người dùng."],
            ["Cognitive Load", "Tải nhận thức", "Cấu trúc rõ giúp giảm tải nhận thức."],
          ]}
        />
      </Section>
    </div>
  );
}

export const INFORMATION_ARCHITECTURE: Article = {
  slug: "information-architecture",
  version: 1,
  term: "Information Architecture",
  fn: 4,
  vi: "Kiến trúc thông tin",
  kind: "Nguyên tắc / khái niệm",
  definition:
    "Information architecture là cách tổ chức, phân nhóm, đặt tên và liên kết nội dung cùng chức năng của một sản phẩm, để người dùng tìm thấy và hiểu được điều họ cần.",
  definitionMore: "IA không hiện ra trực tiếp trên giao diện; nó là cấu trúc mà điều hướng, tìm kiếm và nhãn dựa vào.",
  oneLine: "Cách tổ chức, đặt tên và liên kết nội dung để người dùng tìm và hiểu được điều họ cần.",
  glance: [
    ["4", "Hệ thống: tổ chức, nhãn, điều hướng, tìm kiếm"],
    ["2", "Tầng: IA bên dưới, điều hướng bên trên"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["IA"] },
    { label: "Nhóm chính", items: ["Kiến trúc thông tin"] },
    { label: "Thẻ phụ", items: ["Nguyên tắc thiết kế"] },
    {
      label: "Lưu ý tên gọi",
      items: ["IA không phải menu hay thanh điều hướng. IA là cấu trúc nội dung nằm bên dưới; điều hướng là phần giao diện giúp người dùng đi trong cấu trúc đó."],
    },
  ],
  sections: SECTIONS,
  Body,
};
