"use client";

import { Blk, T } from "./edit";
import { InOutCards, PairCards, RelatedCards, Steps } from "./blocks";
import type { Article } from "./types";
import { Arrow, Callout, ChecklistColumn, Checks, Eyebrow, InfoCard, Node, P, Section, Subhead, Table, Tile, sectionProps, type IconName, type SectionDef } from "./ui";

/*
 * Affinity Diagram — copy from ux-glossary/affinity-diagram.md, on the Glossary Detail layout (Figma 2011:28710).
 * Editorial notes, "Nguồn tham khảo" and the empty case-study block are left out.
 */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "parts", title: "Thành phần của một affinity diagram", icon: "component" },
  { id: "notation", title: "Quy ước thể hiện", icon: "eye" },
  { id: "data", title: "Dữ liệu cần để xây dựng", icon: "file" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "quality", title: "Tiêu chí chất lượng", icon: "clipboard-check" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các phương pháp và tài liệu gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Problem />
      <Parts />
      <Notation />
      <Data />
      <When />
      <NotFit />
      <Apply />
      <Quality />
      <Limits />
      <InOut />
      <Example />
      <Mistakes />
      <Compare />
      <Checklist />
      <Related />
    </div>
  );
}

function Problem() {
  const traps: [IconName, string, string][] = [
    ["lightbulb", "Nhớ cái gây ấn tượng, quên cái lặp lại", "Một câu nói gay gắt dễ được nhắc mãi, trong khi một vấn đề nhỏ nhưng xuất hiện ở hầu hết người tham gia bị bỏ qua."],
    ["filter", "Áp danh mục có sẵn lên dữ liệu", "Nhóm phân loại theo các trang hoặc tính năng đã biết (“trang chủ”, “form”), nên chỉ thấy lại điều mình đã nghĩ, không thấy vấn đề nằm vắt qua nhiều trang."],
    ["users", "Mỗi người hiểu dữ liệu một kiểu", "Người ghi chép, designer, PM và developer rút ra kết luận khác nhau từ cùng một nghiên cứu."],
  ];
  const decisions: [IconName, string, string][] = [
    ["bar-chart", "Vấn đề nào cần ưu tiên", "Chủ đề nào xuất hiện ở nhiều người tham gia, chủ đề nào chỉ là trường hợp riêng."],
    ["target", "Thiết kế tiếp theo nên giải quyết điều gì", "Chuyển chủ đề thành nhận định (insight) và cơ hội thiết kế."],
    ["binoculars", "Cần nghiên cứu thêm ở đâu", "Những nhóm mỏng, những ghi chú không xếp được, những khoảng trống trong dữ liệu."],
    ["chat", "Đội có cùng hiểu dữ liệu không", "Sơ đồ là bằng chứng chung để thảo luận, thay cho trí nhớ của từng người."],
  ];
  return (
    <Section {...S.problem}>
      <P>
        Sau vài buổi phỏng vấn hay usability testing, nhóm thường có hàng trăm ghi chú: câu nói của người dùng, hành vi quan sát được, lỗi gặp phải, ý tưởng nảy ra trong lúc
        ghi chép. Nếu không có cách tổng hợp, có ba chuyện hay xảy ra:
      </P>
      <div className="grid grid-cols-3 gap-4">
        {traps.map(([icon, title, body], i) => (
          <InfoCard key={title} icon={icon} n={i + 1} title={title} body={body} />
        ))}
      </div>
      <P strong>
        Affinity diagram giải quyết các vấn đề này bằng cách đưa mọi ghi chú ra một không gian chung, để cả nhóm gom chúng từ dưới lên cho đến khi các chủ đề tự lộ ra.
      </P>
      <Eyebrow>Affinity diagram hỗ trợ các quyết định</Eyebrow>
      <div className="grid grid-cols-2 gap-5">
        {decisions.map(([icon, title, body], i) => (
          <InfoCard key={title} icon={icon} n={i + 1} title={title} body={body} minH={190} />
        ))}
      </div>
    </Section>
  );
}

/** Three-tier structure: theme → labelled groups → notes, with a lone note aside. */
function Structure() {
  const groups: [string, string[]][] = [
    ["Muốn biết giờ trống trước", ["P1", "P3", "P4"]],
    ["Sợ mất dữ liệu đã nhập", ["P2", "P5"]],
  ];
  const tier = "w-[150px] shrink-0 pt-3.5 font-mono text-[14px] leading-5 tracking-[0.4px] text-[var(--w-muted)] uppercase";
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="split" size={36} iconSize={18} radius={10} />
        <Eyebrow>Sơ đồ cấu trúc ba tầng</Eyebrow>
      </div>
      <div className="flex gap-6">
        <T className={tier}>Chủ đề cấp cao</T>
        <Node on title="Tôi không muốn mất công vô ích khi đặt lịch" className="flex-1" />
      </div>
      <div className="flex gap-6">
        <T className={tier}>Nhãn nhóm</T>
        <div className="flex flex-1 gap-4">
          {groups.map(([label, notes]) => (
            <div key={label} className="flex flex-1 flex-col gap-3">
              <Node soft title={label} />
              <div className="flex justify-center gap-2.5">
                {notes.map((n) => (
                  <span key={n} className="rounded-xl bg-[var(--d-well)] px-4 py-2 font-mono text-[15px] leading-[22px]">
                    {n}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-6">
        <T className={tier}>Chưa xếp được</T>
        <span className="rounded-xl bg-[var(--d-warn)] px-4 py-2.5">
          <T className="text-[16px] leading-6 text-[var(--d-callout-body)]">P6: phông chữ khó đọc trên máy tính bảng</T>
        </span>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Tầng dưới cùng là các ghi chú đơn lẻ. Các ghi chú liên quan được gom thành nhóm, mỗi nhóm có một nhãn. Các nhãn liên quan lại được gom thành một chủ đề cấp cao. Một
        số ghi chú không thuộc nhóm nào được để riêng ở cạnh sơ đồ.
      </T>
    </Blk>
  );
}

function Parts() {
  return (
    <Section {...S.parts}>
      <Table
        head={["Thành phần", "Mô tả", "Ví dụ minh họa (giả định)"]}
        widths={[300]}
        rows={[
          {
            icon: "file",
            cells: [
              "Ghi chú đơn lẻ (affinity note)",
              "Một ý duy nhất: một quan sát, một câu nói, một vấn đề. Có mã nguồn để truy ngược về người tham gia và buổi nghiên cứu.",
              "“Điền xong tên, số điện thoại rồi mới thấy giờ mình muốn đã hết.” (P3)",
            ],
          },
          { icon: "component", cells: ["Nhóm (cluster)", "Các ghi chú có cùng ý nghĩa hoặc cùng vấn đề, được đặt gần nhau.", "Năm ghi chú từ bốn người về việc không biết giờ còn trống."] },
          {
            icon: "chat",
            cells: [
              "Nhãn nhóm (label)",
              "Câu tóm tắt điều mà cả nhóm ghi chú cùng nói. Viết thành một nhận định, tốt nhất theo giọng người dùng.",
              "“Tôi muốn biết còn giờ phù hợp trước khi bỏ công điền thông tin.”",
            ],
          },
          { icon: "book", cells: ["Nhóm cấp cao (theme)", "Gom nhiều nhãn nhóm có liên hệ thành chủ đề rộng hơn.", "“Tôi không muốn mất công vô ích khi đặt lịch.”"] },
          {
            icon: "dots",
            cells: [
              "Ghi chú chưa xếp được",
              "Ghi chú không hợp nhóm nào. Trong mô tả phương pháp KJ, chúng được gọi là “lone wolves” (con sói đơn độc) và được để riêng thay vì ép vào nhóm.",
              "Một ghi chú duy nhất về phông chữ khó đọc trên máy tính bảng.",
            ],
          },
          {
            icon: "link",
            cells: [
              "Liên hệ giữa các nhóm",
              "Mũi tên hoặc dải nối thể hiện quan hệ (nguyên nhân – hệ quả, mâu thuẫn, phụ thuộc). Không bắt buộc, nhưng có trong phương pháp KJ gốc.",
              "“Không biết giờ trống” → dẫn đến → “bỏ dở form”.",
            ],
          },
        ]}
      />
      <Structure />
    </Section>
  );
}

function Notation() {
  return (
    <Section
      {...S.notation}
      intro="Không có ký hiệu bắt buộc chung. Các quy ước dưới đây đến từ những cách làm đã được mô tả trong tài liệu; nhóm chọn và ghi lại quy ước của mình trước buổi làm việc."
    >
      <Table
        head={["Quy ước", "Cách làm", "Nguồn / bối cảnh"]}
        widths={[280]}
        rows={[
          { cells: ["Một ghi chú = một ý", "Ghi chú ngắn, cụ thể, có thể đọc hiểu khi tách khỏi ngữ cảnh.", "Bước “label making” trong phương pháp KJ (Scupin, 1997; Lucero, 2015)."] },
          { cells: ["Mã nguồn trên mỗi ghi chú", "Ví dụ P3_07: người tham gia 3, ghi chú thứ 7.", "Lucero (2015) đánh mã người tham gia/buổi kèm số thứ tự."] },
          { cells: ["Màu ghi chú theo người tham gia", "Mỗi người tham gia một màu, để nhìn qua biết một vấn đề do bao nhiêu người nêu.", "Lucero (2015), trong đánh giá prototype."] },
          {
            cells: [
              "Màu theo tầng",
              "Ghi chú gốc một màu; nhãn nhóm một màu; nhãn cấp cao một màu khác.",
              "Lucero (2015), dựa trên cách làm của Beyer & Holtzblatt, dùng giấy xanh dương cho nhãn nhóm và giấy hồng cho nhóm cấp cao. Đây là một quy ước, không phải chuẩn.",
            ],
          },
          { cells: ["Nhãn viết theo giọng người dùng", "“Tôi muốn…”, “Tôi không biết…” thay vì “Vấn đề về lịch”.", "Beyer & Holtzblatt (1998), được Lucero (2015) áp dụng."] },
          { cells: ["Mức chi tiết", "Thường hai đến ba tầng. Quá nhiều tầng khiến sơ đồ khó đọc; quá ít tầng chỉ còn là danh sách.", "Lựa chọn của nhóm, tùy lượng dữ liệu."] },
        ]}
      />
      <Callout tone="note" icon="eye" title="Lưu ý accessibility khi xuất bản sơ đồ">
        Nếu dùng màu để mã hóa người tham gia hoặc tầng, cần thêm cách nhận biết khác (mã chữ, vị trí, viền) và mô tả văn bản, vì màu không được là cách duy nhất truyền tải
        thông tin.
      </Callout>
    </Section>
  );
}

function Data() {
  return (
    <Section {...S.data} intro="Affinity diagram chỉ tốt bằng dữ liệu đưa vào. Cần phân biệt rõ hai trường hợp:">
      <Table
        head={["", "Dựa trên dữ liệu nghiên cứu", "Dựa trên ý kiến / giả định của nhóm"]}
        widths={[240]}
        rows={[
          {
            cells: [
              "Nguồn ghi chú",
              "Phỏng vấn, contextual inquiry, usability testing, diary study, câu trả lời mở trong khảo sát, phản hồi khách hàng.",
              "Ý tưởng trong buổi ideation, giả định của các bên liên quan, câu hỏi còn mở.",
            ],
          },
          { cells: ["Trả lời câu hỏi", "“Người dùng thực sự gặp gì?”", "“Nhóm đang nghĩ gì, có những ý tưởng nào?”"] },
          { cells: ["Cách gọi tên kết quả", "Nhận định (insight) từ nghiên cứu.", "Giả thuyết hoặc nhóm ý tưởng, cần kiểm chứng."] },
          { cells: ["Rủi ro", "Ghi chú bị diễn giải lại sai so với lời người dùng.", "Bị trình bày như thể là kết quả nghiên cứu."] },
        ]}
      />
      <Blk label="thẻ" className="g-card flex flex-col gap-6 rounded-[24px] bg-[var(--w-card)] p-7">
        <div className="flex items-center gap-3">
          <Tile icon="check-circle" size={40} iconSize={20} />
          <Eyebrow className="text-[var(--d-accent)]">Ghi chú tốt cần có</Eyebrow>
        </div>
        <Checks
          items={[
            "Một ý, viết đủ rõ để người không dự buổi nghiên cứu vẫn hiểu.",
            "Phân biệt điều quan sát được (người dùng bấm nhầm nút) với diễn giải (nhãn nút gây hiểu lầm). Có thể đánh dấu loại ghi chú.",
            "Trích nguyên văn lời người dùng khi có thể, đặt trong ngoặc kép.",
            "Mã nguồn để truy ngược.",
          ]}
        />
      </Blk>
      <Subhead icon="users">Về số lượng ghi chú và người làm</Subhead>
      <div className="flex gap-4">
        <InfoCard title="50–100" body="ghi chú cho mỗi buổi phỏng vấn hai giờ, theo mô tả của Beyer & Holtzblatt (qua Lucero, 2015)." className="flex-1" />
        <InfoCard tone="fill" title="1 người / 100 ghi chú" body="Khuyến nghị để xây sơ đồ trong một ngày." className="flex-1" />
        <InfoCard title="500 – 2.400" body="ghi chú mỗi sơ đồ trong tám dự án đánh giá prototype của Lucero, do nhóm hai đến năm người xây trong vài ngày." className="flex-1" />
      </div>
      <P>
        Không có con số chung. Một nghiên cứu nhỏ với vài người tham gia sẽ có ít ghi chú hơn nhiều; điều quan trọng là đủ người cùng đọc dữ liệu để tránh góc nhìn một chiều.
      </P>
    </Section>
  );
}

function When() {
  const groups: [IconName, string, string[]][] = [
    [
      "target",
      "Bối cảnh phù hợp",
      [
        "Sau một đợt nghiên cứu định tính (phỏng vấn, contextual inquiry, usability testing) khi cần tổng hợp nhiều ghi chú thành chủ đề.",
        "Khi muốn cả nhóm cùng đọc và cùng hiểu dữ liệu, không chỉ nhận báo cáo từ một người.",
        "Sau buổi ideation, để gom các ý tưởng trùng hoặc gần nhau trước khi chọn hướng.",
        "Khi gom phản hồi mở từ khảo sát hoặc kênh hỗ trợ khách hàng với khối lượng còn đọc thủ công được.",
      ],
    ],
    [
      "eye",
      "Dấu hiệu nhận biết",
      [
        "Có nhiều ghi chú nhưng chưa ai nói được “ba vấn đề lớn nhất là gì”.",
        "Mỗi thành viên nhớ một vài câu chuyện khác nhau từ cùng nghiên cứu.",
        "Nhóm muốn phân loại theo cấu trúc sản phẩm hiện tại, trong khi vấn đề có thể nằm vắt qua nhiều phần.",
      ],
    ],
    [
      "clipboard-check",
      "Điều kiện cần",
      [
        "Dữ liệu đã được ghi lại thành từng ý (hoặc có thời gian để làm việc này).",
        "Không gian làm việc đủ rộng: tường, bảng trắng, hoặc bảng trắng trực tuyến.",
        "Thời gian tập trung của những người tham gia gom nhóm, và một người điều phối.",
      ],
    ],
  ];
  return (
    <Section {...S.when}>
      <div className="flex items-start gap-4">
        {groups.map(([icon, title, items]) => (
          <Blk key={title} label="thẻ" className="g-card flex flex-1 flex-col gap-6 self-stretch rounded-[24px] bg-[var(--w-card)] p-7">
            <div className="flex items-center gap-3">
              <Tile icon={icon} size={40} iconSize={20} />
              <Eyebrow className="text-[var(--d-accent)]">{title}</Eyebrow>
            </div>
            <Checks items={items} />
          </Blk>
        ))}
      </div>
    </Section>
  );
}

function NotFit() {
  return (
    <Section {...S["not-fit"]}>
      <Table
        head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
        widths={[340]}
        rows={[
          {
            icon: "users",
            cells: [
              "Cần biết người dùng phân loại nội dung thế nào (đặt tên menu, nhóm trang)",
              "Affinity diagram phản ánh cách nhóm thiết kế gom dữ liệu, không phải mô hình tư duy của người dùng.",
              "Card Sorting, Tree Testing.",
            ],
          },
          {
            icon: "bar-chart",
            cells: [
              "Cần con số đáng tin về mức độ phổ biến",
              "Đếm ghi chú chỉ cho biết tần suất trong mẫu nhỏ đã nghiên cứu, không đại diện cho toàn bộ người dùng.",
              "Survey, phân tích dữ liệu hành vi, Quantitative Research.",
            ],
          },
          {
            icon: "analytics",
            cells: [
              "Dữ liệu quá lớn để đọc thủ công (hàng chục nghìn phản hồi)",
              "Không thể đưa hết lên tường; lọc ngẫu hứng gây thiên lệch.",
              "Lấy mẫu có chủ đích trước khi gom; mã hóa định tính có hỗ trợ công cụ; Sentiment Analysis cho khảo sát sơ bộ.",
            ],
          },
          {
            icon: "ban",
            cells: [
              "Chỉ có một người làm, không ai cùng đọc",
              "Mất lợi ích lớn nhất là nhiều góc nhìn và hiểu biết chung; dễ xác nhận định kiến của chính mình.",
              "Vẫn có thể gom nhóm một mình, nhưng nên mời người khác rà lại các nhãn; hoặc dùng quy trình thematic analysis có ghi chép rõ ràng.",
            ],
          },
          { icon: "target", cells: ["Câu hỏi đã rõ và hẹp (“Nút A hay nút B được bấm nhiều hơn?”)", "Không cần khám phá chủ đề.", "A/B Testing, First-Click Testing."] },
          {
            icon: "alert",
            cells: [
              "Chưa có dữ liệu, chỉ có ý kiến nội bộ, nhưng cần trình bày như kết quả nghiên cứu",
              "Sơ đồ trông như phân tích dữ liệu, dễ khiến giả định được coi là sự thật.",
              "Vẫn dùng được để gom ý tưởng, nhưng ghi rõ là giả định; lên kế hoạch nghiên cứu để kiểm chứng.",
            ],
          },
        ]}
      />
    </Section>
  );
}

function Apply() {
  const steps: [string, string, string][] = [
    [
      "Xác định câu hỏi và phạm vi.",
      "Ghi rõ sơ đồ này để trả lời câu hỏi gì (“Vì sao khách bỏ dở đặt lịch?”) và dùng dữ liệu nào. Nếu dữ liệu rất lớn, lọc trước theo câu hỏi, như NN/g khuyến nghị, để buổi làm việc không bị loãng.",
      "Câu hỏi tổng hợp, danh sách nguồn dữ liệu.",
    ],
    [
      "Viết ghi chú.",
      "Mỗi ghi chú một ý, có mã nguồn. Nên viết sớm sau buổi nghiên cứu, khi ngữ cảnh còn nhớ rõ; Lucero (2015) mô tả việc tổ chức buổi diễn giải trong vòng 48 giờ. Khi nhiều người cùng tạo ý tưởng, cho mỗi người viết riêng trước rồi mới chia sẻ, để ý kiến không bị người nói đầu tiên dẫn dắt.",
      "Bộ ghi chú đầy đủ, có mã nguồn.",
    ],
    ["Chuẩn bị không gian và quy ước.", "Chọn tường, bảng trắng hoặc bảng trực tuyến. Thống nhất quy ước màu, cách viết nhãn, và người điều phối.", "Không gian sẵn sàng, quy ước đã ghi lại."],
    [
      "Gom nhóm từ dưới lên.",
      "Mọi người đọc ghi chú và đặt những ghi chú “nói cùng một điều” cạnh nhau. Không bắt đầu từ danh mục có sẵn. Ban đầu có thể làm im lặng để mỗi người tự đọc, sau đó trao đổi khi các nhóm bắt đầu hình thành. Ghi chú chưa hợp nhóm nào thì để riêng.",
      "Các nhóm ghi chú thô.",
    ],
    [
      "Đặt nhãn và xây tầng.",
      "Viết cho mỗi nhóm một nhãn là nhận định, không chỉ là chủ đề (“Tôi muốn biết giờ trống trước khi điền” thay vì “Giờ trống”). Gom các nhãn liên quan thành chủ đề cấp cao. Tách nhóm quá lớn, gộp nhóm trùng; một ghi chú thuộc hai nhóm có thể nhân bản.",
      "Sơ đồ nhiều tầng có nhãn.",
    ],
    [
      "“Đi dọc bức tường” (walking the wall) để rà soát.",
      "Cả nhóm đọc lại sơ đồ từ trên xuống: nhãn có đúng với các ghi chú bên dưới không, chủ đề nào thiếu bằng chứng, có khoảng trống nào trong dữ liệu. Beyer & Holtzblatt dùng bước này để kích thích ý tưởng thiết kế và tìm lỗ hổng dữ liệu.",
      "Sơ đồ đã chỉnh, danh sách câu hỏi còn mở.",
    ],
    [
      "Ưu tiên và xác định bước tiếp theo.",
      "Xem mỗi chủ đề được bao nhiêu người tham gia nêu, mức ảnh hưởng đến mục tiêu, và quyết định hành động. NN/g gợi ý dot voting khi khó đạt đồng thuận, và chỉ định người phụ trách cho từng việc.",
      "Danh sách chủ đề ưu tiên, việc cần làm, người phụ trách.",
    ],
    [
      "Ghi lại và chia sẻ.",
      "Chụp ảnh hoặc xuất bảng trực tuyến; chuyển cấu trúc nhãn thành tài liệu, kèm một vài câu nói tiêu biểu cho mỗi nhóm. Tường giấy sẽ bị gỡ; tài liệu mới là thứ còn lại.",
      "Bản ghi sơ đồ, báo cáo nhận định.",
    ],
  ];
  const flow = ["Câu hỏi", "Viết ghi chú", "Gom nhóm", "Đặt nhãn, xây tầng", "Rà soát", "Ưu tiên", "Ghi lại"];
  return (
    <Section
      {...S.apply}
      intro="Phương pháp KJ gốc gồm bốn bước: ghi nhãn (label making), gom nhãn (label grouping), vẽ sơ đồ (chart making) và giải thích (explanation). Các cách áp dụng trong UX, như của Beyer & Holtzblatt, Lucero hay NN/g, đều giữ tinh thần này và điều chỉnh theo bối cảnh. Các bước dưới đây là một cách tổ chức phổ biến, có thể rút gọn khi dữ liệu ít."
    >
      <Steps steps={steps} />
      <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
        <div className="flex items-center gap-3">
          <Tile icon="rotate" size={36} iconSize={18} radius={10} />
          <Eyebrow>Sơ đồ quy trình</Eyebrow>
        </div>
        <div className="flex items-center justify-between gap-2">
          {flow.map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              {i ? <Arrow size={20} /> : null}
              <Node title={s} on={i === 2 || i === 4} soft={i === 3} />
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 self-center rounded-2xl bg-[var(--d-soft)] px-5 py-3 text-[var(--d-accent)]">
          <Tile icon="rotate" size={28} iconSize={16} radius={8} tone="solid" />
          <T className="text-[15px] leading-[22px] font-semibold">Rà soát có thể quay lại bước gom nhóm để chỉnh lại nhóm</T>
        </div>
      </Blk>
    </Section>
  );
}

function Quality() {
  return (
    <Section {...S.quality}>
      <PairCards
        icon={null}
        first="Sơ đồ chưa tốt"
        second="Sơ đồ tốt"
        items={[
          ["Nhãn là nhận định", "“Xác nhận.”", "“Tôi không biết đã đặt lịch thành công chưa.”"],
          ["Nhãn khớp với ghi chú bên dưới", "Nhãn rộng đến mức ghi chú nào cũng nhét vào được.", "Đọc nhãn là đoán được nội dung các ghi chú."],
          ["Nhóm hình thành từ dữ liệu", "Các nhóm trùng khít với sitemap hoặc danh sách tính năng sẵn có.", "Có những chủ đề vắt qua nhiều trang hoặc tính năng."],
          [
            "Truy ngược được",
            "Không biết ghi chú đến từ đâu; một người nói nhiều lần trông như nhiều người.",
            "Mỗi ghi chú có mã người tham gia; biết mỗi chủ đề có bao nhiêu người nêu.",
          ],
          ["Kích thước nhóm hợp lý", "Một nhóm “Khác” khổng lồ, hoặc mỗi ghi chú một nhóm.", "Nhóm quá lớn đã được tách; không có hàng chục nhóm một ghi chú."],
          ["Ngoại lệ được giữ lại", "Ghi chú lạ bị bỏ đi hoặc bị ép vào nhóm gần nhất.", "Ghi chú chưa xếp được để riêng và được xem lại."],
          ["Phân biệt dữ liệu và giả định", "Ý tưởng của nhóm lẫn với lời người dùng.", "Ghi rõ nguồn: nghiên cứu hay ý kiến nội bộ."],
          ["Có bước tiếp theo", "Sơ đồ đẹp nhưng không ai biết làm gì tiếp.", "Chủ đề ưu tiên gắn với quyết định và người phụ trách."],
        ]}
      />
    </Section>
  );
}

function Limits() {
  const items: [IconName, string, string][] = [
    ["eye", "Sơ đồ là một cách diễn giải, không phải sự thật khách quan", "Cùng dữ liệu, nhóm khác có thể gom khác. Đó là lý do cần nhiều người cùng làm và ghi lại lập luận."],
    [
      "bar-chart",
      "Số ghi chú không phải tỷ lệ người dùng",
      "“4/5 người tham gia nêu” chỉ mô tả mẫu đã nghiên cứu; không suy ra “80% người dùng”. Lucero (2015) đếm ghi chú và số người nêu để hỗ trợ ưu tiên, đồng thời lưu ý một nhóm nhiều ghi chú có thể chỉ do một hai người nhắc lại nhiều lần.",
    ],
    ["file", "Chỉ phản ánh những gì đã được ghi lại", "Điều người ghi chép bỏ sót, hoặc nhóm người dùng không được nghiên cứu, sẽ không xuất hiện."],
    ["users", "Dễ bị người có tiếng nói lớn dẫn dắt", "NN/g nêu rõ rủi ro người tham gia áp đảo làm lệch cách gom nhóm."],
  ];
  return (
    <Section {...S.limits}>
      <div className="grid grid-cols-2 gap-4">
        {items.map(([icon, title, body], i) => (
          <InfoCard key={title} icon={icon} n={i + 1} title={title} body={body} />
        ))}
        <InfoCard
          icon="lightbulb"
          n={5}
          tone="ink"
          className="col-span-2"
          title="Chủ đề chưa phải giải pháp"
          body="Sơ đồ cho biết vấn đề; giải pháp cần ideation, prototype và kiểm thử tiếp."
        />
      </div>
    </Section>
  );
}

function InOut() {
  return (
    <Section {...S.io}>
      <InOutCards
        inputs={[
          "Câu hỏi tổng hợp và phạm vi dữ liệu.",
          "Ghi chú từ nghiên cứu (hoặc ý tưởng từ ideation), mỗi ghi chú một ý, có mã nguồn.",
          "Không gian làm việc (tường, bảng trắng hoặc công cụ trực tuyến) và giấy ghi chú.",
          "Nhóm tham gia có góc nhìn đa dạng, một người điều phối.",
          "Quy ước màu và cách viết nhãn.",
        ]}
        outputs={[
          "Sơ đồ nhiều tầng: ghi chú → nhóm có nhãn → chủ đề cấp cao.",
          "Danh sách nhận định ưu tiên, mỗi nhận định kèm bằng chứng (số người nêu, câu nói tiêu biểu).",
          "Danh sách câu hỏi còn mở và khoảng trống dữ liệu.",
          "Bản ghi số của sơ đồ để chia sẻ và lưu trữ.",
          "Đầu vào cho các tài liệu khác: persona, journey map, giả thuyết cho A/B testing.",
        ]}
      />
    </Section>
  );
}

function Example() {
  return (
    <Section {...S.example}>
      <Callout tone="scenario" title="Tình huống giả định">
        Tiếp nối luồng đặt lịch tư vấn trong bài User Flow và bài A/B Testing. Không phải dự án đã triển khai.
      </Callout>
      <div className="flex gap-4">
        <InfoCard
          icon="users"
          title="Bối cảnh"
          className="flex-1"
          body="Nhóm thực hiện usability testing luồng đặt lịch tư vấn với năm người thuộc nhóm khách hàng mục tiêu, kèm phỏng vấn ngắn sau mỗi buổi. Hai người ghi chép tạo được khoảng 120 ghi chú."
        />
        <Blk label="thẻ" className="g-card flex flex-1 flex-col gap-5 rounded-[24px] bg-[var(--w-card)] p-7">
          <div className="flex items-center gap-3">
            <Tile icon="list" size={40} iconSize={20} />
            <Eyebrow className="text-[var(--d-accent)]">Cách áp dụng</Eyebrow>
          </div>
          <Checks
            mark="•"
            items={[
              "Câu hỏi tổng hợp: “Điều gì khiến khách không hoàn tất đặt lịch, hoặc hoàn tất nhưng không yên tâm?”",
              "Mỗi người tham gia một màu ghi chú (P1–P5), có mã thêm bằng chữ để không phụ thuộc vào màu.",
              "Ba thành viên (designer, người ghi chép, PM) gom nhóm trên bảng trắng trực tuyến trong một buổi chiều.",
            ]}
          />
        </Blk>
      </div>
      <Eyebrow>Sơ đồ có thể trông như sau (số liệu minh họa, không phải dữ liệu thật)</Eyebrow>
      <Table
        head={["Chủ đề cấp cao", "Nhãn nhóm", "Số người nêu", "Câu nói tiêu biểu (giả định)"]}
        widths={[280, undefined, 170]}
        rows={[
          { highlight: true, cells: ["Tôi không muốn mất công vô ích", "Tôi muốn biết giờ trống trước khi điền thông tin", "4/5", "“Điền hết rồi mới báo hết giờ.”"] },
          { cells: ["", "Tôi sợ mất thông tin đã nhập khi quay lại", "2/5", "“Bấm quay lại là trống trơn.”"] },
          { cells: ["Tôi không chắc mình đã đặt xong", "Tôi không thấy xác nhận rõ ràng", "3/5", "“Vậy là xong chưa nhỉ?”"] },
          { cells: ["", "Tôi muốn có lịch hẹn trong email hoặc lịch điện thoại", "2/5", "“Tôi hay quên nếu không có nhắc.”"] },
          { cells: ["Chưa xếp được", "Phông chữ nhỏ trên máy tính bảng", "1/5", "—"] },
        ]}
      />
      <Eyebrow>Quyết định có thể rút ra</Eyebrow>
      <Table
        head={["Nhận định", "Bước tiếp theo"]}
        widths={[480]}
        rows={[
          {
            icon: "bar-chart",
            cells: [
              "Biết giờ trống quá muộn là chủ đề nhiều người nêu nhất trong mẫu.",
              "Thiết kế phương án chọn giờ trước; nếu website có đủ lưu lượng, kiểm chứng bằng A/B testing (xem bài A/B Testing).",
            ],
          },
          { icon: "check-circle", cells: ["Thiếu xác nhận rõ ràng sau khi gửi.", "Sửa màn hình xác nhận, thêm email xác nhận; kiểm tra lại bằng usability testing vòng sau."] },
          {
            icon: "eye",
            cells: ["Phông chữ trên máy tính bảng chỉ một người nêu.", "Không bỏ qua: kiểm tra theo tiêu chí accessibility, vì có thể là vấn đề thật với nhóm nhỏ hơn."],
          },
        ]}
      />
      <Callout tone="note" icon="briefcase">
        Đây là kế hoạch minh họa, chưa phải kết quả nghiên cứu thực tế. “4/5” chỉ mô tả năm người trong mẫu giả định, không phải tỷ lệ của toàn bộ khách hàng.
      </Callout>
    </Section>
  );
}

function Mistakes() {
  return (
    <Section {...S.mistakes}>
      <PairCards
        items={[
          ["Bắt đầu bằng danh mục có sẵn (theo trang, theo tính năng)", "Mất tính từ dưới lên; chỉ thấy lại điều đã biết.", "Gom ghi chú theo ý nghĩa trước, đặt tên nhóm sau."],
          ["Nhãn chỉ là một danh từ (“Thanh toán”, “Lịch”)", "Không cho biết vấn đề là gì; khó ra quyết định.", "Viết nhãn thành một câu nhận định, tốt nhất theo giọng người dùng."],
          ["Một ghi chú chứa nhiều ý", "Không biết đặt vào nhóm nào; ý phụ bị mất.", "Tách thành nhiều ghi chú trước khi gom."],
          ["Ghi chú không có mã nguồn", "Không biết mỗi chủ đề có bao nhiêu người nêu; một người nói nhiều trông như nhiều người.", "Ghi mã người tham gia trên mọi ghi chú."],
          ["Ép mọi ghi chú vào nhóm", "Ý mới hoặc ngoại lệ quan trọng bị che lấp.", "Giữ khu vực “chưa xếp được” và xem lại ở cuối."],
          ["Nhóm quá to hoặc quá vụn", "Nhóm quá to không cho nhận định cụ thể; nhóm quá vụn không thấy được chủ đề.", "Tách nhóm lớn, gộp nhóm trùng, thêm tầng nếu cần."],
          ["Một người quyết định thay cả nhóm", "Sơ đồ phản ánh định kiến của một người.", "Cho mọi người đọc và gom độc lập trước; luân phiên người dẫn thảo luận."],
          ["Sa đà vào từng ghi chú", "Buổi làm việc kéo dài, mệt mỏi, không xong.", "Đặt khung thời gian, nghỉ giữa các vòng, chấp nhận chỉnh lại ở bước rà soát."],
          ["Coi số ghi chú là tỷ lệ người dùng", "Mẫu định tính nhỏ không đại diện cho toàn bộ người dùng.", "Báo “số người tham gia nêu / tổng số người tham gia” và nêu rõ giới hạn."],
          ["Trộn ý tưởng của nhóm với dữ liệu người dùng", "Giả định được trình bày như phát hiện.", "Dùng màu hoặc ký hiệu riêng cho ý tưởng; hoặc làm hai sơ đồ riêng."],
          ["Gỡ tường mà không ghi lại", "Mất kết quả và lập luận.", "Chụp ảnh, chuyển thành tài liệu trước khi dọn."],
          ["Gọi affinity diagram là card sorting", "Hai phương pháp trả lời câu hỏi khác nhau, do người khác nhau thực hiện.", "Xem bảng phân biệt bên dưới."],
        ]}
      />
    </Section>
  );
}

function Compare() {
  return (
    <Section {...S.compare}>
      <Table
        head={["Phương pháp / Tài liệu", "Ai sắp xếp, sắp xếp gì", "Trả lời câu hỏi", "Quan hệ với Affinity Diagram"]}
        widths={[240]}
        rows={[
          { icon: "component", highlight: true, cells: ["Affinity Diagram", "Nhóm thiết kế/nghiên cứu gom ghi chú nghiên cứu hoặc ý tưởng.", "“Dữ liệu này đang nói những chủ đề gì?”", "—"] },
          {
            icon: "list",
            cells: [
              "Card Sorting",
              "Người dùng sắp xếp các mục nội dung vào nhóm.",
              "“Người dùng nghĩ nội dung nên được nhóm và gọi tên thế nào?”",
              "Kỹ thuật gom nhóm tương tự nhưng mục đích khác: card sorting là phương pháp nghiên cứu cho kiến trúc thông tin.",
            ],
          },
          {
            icon: "book",
            cells: [
              "Thematic analysis (phân tích chủ đề)",
              "Nhà nghiên cứu mã hóa dữ liệu định tính và xây chủ đề theo quy trình có hệ thống (Braun & Clarke, 2006).",
              "“Có những mẫu ý nghĩa nào trong dữ liệu?”",
              "Cùng mục tiêu tìm chủ đề; thematic analysis chặt chẽ và ghi chép kỹ hơn, affinity diagram nhanh và mang tính cộng tác hơn. Hai cách có thể kết hợp.",
            ],
          },
          {
            icon: "users",
            cells: [
              "Empathy Map",
              "Nhóm sắp xếp hiểu biết về một kiểu người dùng vào các ô cố định (nói, nghĩ, làm, cảm thấy).",
              "“Người dùng này nói, nghĩ, làm, cảm thấy gì?”",
              "Empathy map dùng khung có sẵn (từ trên xuống); affinity diagram để nhóm tự hình thành (từ dưới lên). Kết quả affinity có thể là đầu vào cho empathy map.",
            ],
          },
          {
            icon: "split",
            cells: [
              "Journey Map / User Persona",
              "Nhóm mô hình hóa trải nghiệm theo thời gian hoặc theo kiểu người dùng.",
              "“Hành trình diễn ra thế nào?” / “Chúng ta thiết kế cho ai?”",
              "Các tài liệu đầu ra thường xây từ nhận định đã gom bằng affinity diagram.",
            ],
          },
          {
            icon: "lightbulb",
            cells: ["Mind map (sơ đồ tư duy)", "Một người hoặc nhóm phát triển ý từ một chủ đề trung tâm ra ngoài.", "“Chủ đề này có những nhánh nào?”", "Mind map đi từ trên xuống; affinity diagram đi từ dưới lên."],
          },
        ]}
      />
    </Section>
  );
}

function Checklist() {
  return (
    <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
      <div className="flex items-start gap-4">
        <ChecklistColumn
          icon="file"
          title="Trước buổi làm việc"
          items={[
            "Đã ghi rõ câu hỏi tổng hợp và phạm vi dữ liệu.",
            "Mỗi ghi chú chỉ có một ý và có mã nguồn.",
            "Đã phân biệt ghi chú quan sát, lời người dùng và ý tưởng của nhóm.",
            "Nhóm tham gia có nhiều góc nhìn; có người điều phối.",
            "Đã thống nhất quy ước màu, cách viết nhãn; màu không phải cách nhận biết duy nhất.",
          ]}
        />
        <ChecklistColumn
          icon="component"
          title="Trong khi gom nhóm"
          items={[
            "Không bắt đầu bằng danh mục có sẵn.",
            "Nhãn là câu nhận định, khớp với các ghi chú bên dưới.",
            "Ghi chú chưa xếp được được giữ riêng, không ép vào nhóm.",
            "Đã tách nhóm quá lớn và gộp nhóm trùng.",
            "Có khung thời gian và giờ nghỉ.",
          ]}
        />
        <ChecklistColumn
          icon="clipboard-check"
          title="Sau buổi làm việc"
          items={[
            "Đã rà soát toàn sơ đồ và ghi lại khoảng trống dữ liệu.",
            "Mỗi chủ đề ưu tiên có bằng chứng (số người nêu, câu nói tiêu biểu).",
            "Không diễn giải số ghi chú thành tỷ lệ người dùng.",
            "Mỗi chủ đề ưu tiên có bước tiếp theo và người phụ trách.",
            "Đã ghi lại sơ đồ dưới dạng số trước khi gỡ.",
          ]}
        />
      </div>
    </Section>
  );
}

function Related() {
  return (
    <Section {...S.related}>
      <RelatedCards
        items={[
          ["Card Sorting", "Phân loại thẻ", "Kỹ thuật gom nhóm tương tự, nhưng do người dùng thực hiện để định hình cấu trúc thông tin."],
          ["Contextual Inquiry", "Phỏng vấn tại bối cảnh", "Nguồn dữ liệu gốc mà Contextual Design dùng affinity diagram để tổng hợp."],
          ["Customer Feedback Loop", "Vòng phản hồi khách hàng", "Affinity diagram giúp tổng hợp phản hồi dạng văn bản để tìm vấn đề lặp lại."],
          ["Usability Testing", "Kiểm thử khả năng sử dụng", "Nguồn ghi chú phổ biến; affinity diagram giúp ưu tiên vấn đề tìm được."],
          ["Qualitative Research", "Nghiên cứu định tính", "Nhóm dữ liệu mà affinity diagram thường dùng để tổng hợp."],
          ["Ideation", "Tạo ý tưởng", "Affinity diagram dùng để gom và sắp xếp ý tưởng sau buổi ideation."],
          ["Empathy Mapping", "Bản đồ thấu cảm", "Tài liệu tổng hợp theo khung có sẵn, có thể xây từ nhận định đã gom."],
          ["Journey Mapping", "Bản đồ hành trình", "Tài liệu đầu ra thường dựa trên các chủ đề từ affinity diagram."],
          ["User Persona", "Chân dung người dùng", "Persona nên được xây từ dữ liệu đã tổng hợp, không từ giả định."],
          ["A/B Testing", "Kiểm thử A/B", "Nhận định từ affinity diagram có thể trở thành giả thuyết để kiểm chứng."],
          ["User Flow", "Luồng tương tác của người dùng", "Nguồn của tình huống ví dụ trong bài."],
          ["Accessibility", "Khả năng tiếp cận", "Cách xử lý các vấn đề ít người nêu; lưu ý không dùng màu làm cách mã hóa duy nhất."],
        ]}
      />
    </Section>
  );
}

export const AFFINITY_DIAGRAM: Article = {
  slug: "affinity-diagram",
  version: 1,
  term: "Affinity Diagram",
  fn: 2,
  vi: "Sơ đồ tương đồng — sơ đồ gom nhóm theo mức liên quan",
  kind: "Tài liệu / sơ đồ thiết kế",
  definition:
    "Affinity diagram là sơ đồ gom các ghi chú rời rạc (quan sát, câu nói của người dùng, ý tưởng) thành từng nhóm theo mức độ liên quan, rồi đặt tên cho các nhóm và sắp chúng thành nhiều tầng chủ đề.",
  definitionMore:
    "Các nhóm được hình thành từ dưới lên dựa trên chính dữ liệu, không áp sẵn danh mục. Nhờ vậy, nhóm nhìn ra các vấn đề và chủ đề chung ẩn trong một lượng lớn dữ liệu định tính, và cả đội cùng có một cách hiểu chung về dữ liệu đó.",
  oneLine: "Gom các ghi chú nghiên cứu rời rạc thành nhóm theo mức liên quan, từ dưới lên, để thấy các chủ đề chung.",
  glance: [
    ["KJ", "Phương pháp gốc"],
    ["3 tầng", "Ghi chú → nhóm → chủ đề"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["KJ method (theo tên Jiro Kawakita)", "Affinity mapping", "Affinity diagramming"] },
    { label: "Nhóm chính", items: ["Tổng hợp và mô hình hóa"] },
    { label: "Thẻ phụ", items: ["Nghiên cứu khám phá", "Kiểm thử và đánh giá"] },
    {
      label: "Lưu ý tên gọi",
      items: ["“Affinity diagram” vừa chỉ sơ đồ (kết quả) vừa chỉ hoạt động xây sơ đồ. Khác với Card Sorting, nơi người dùng sắp xếp nội dung để định hình cấu trúc thông tin."],
    },
  ],
  sections: SECTIONS,
  Body,
};
