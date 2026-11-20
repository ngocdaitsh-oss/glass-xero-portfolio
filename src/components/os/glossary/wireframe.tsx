"use client";

import { Fragment, type ReactNode } from "react";
import { Blk, T } from "./edit";
import { CheckCards, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, Icon, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Wireframe — copy from ux-glossary/wireframe.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "conventions", title: "Quy ước vẽ wireframe", icon: "pencil" },
  { id: "fidelity", title: "Mức độ chi tiết và wireflow", icon: "arrows" },
  { id: "when", title: "Khi nào nên dùng / chưa phù hợp", icon: "check-circle" },
  { id: "apply", title: "Cách tạo", icon: "list" },
  { id: "limits", title: "Giới hạn", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/* Wireframe conventions: thick bar = heading, thin bar = paragraph, filled box = control. */
const Heading = () => <span className="h-3 w-3/5 rounded-full bg-[var(--w-secondary)]" />;
const Line = ({ w = "w-full" }: { w?: string }) => <span className={`h-1.5 ${w} rounded-full bg-[var(--d-ci)]`} />;
function Btn({ label, hot }: { label: string; hot?: boolean }) {
  return <span className={`rounded-lg py-2 text-center text-[14px] font-semibold ${hot ? "bg-[var(--d-fill)] text-white" : "bg-[var(--d-soft)]"}`}>{label}</span>;
}
function Screen({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <span className="text-[15px] font-semibold text-[var(--w-muted)]">{title}</span>
      <div className="flex h-[300px] flex-col gap-3 rounded-[20px] bg-[var(--d-well)] p-5">{children}</div>
    </div>
  );
}

/** Three-step booking wireflow: the arrow leaves from the control that moves the user on. */
function Wireflow() {
  const screens = [
    <Screen key="1" title="1. Chọn gói">
      <Heading />
      <div className="flex h-16 items-center justify-center rounded-lg bg-[var(--d-soft)] text-[var(--w-muted)]">
        <Icon name="x" size={22} />
      </div>
      <span className="text-[15px] font-semibold">Gói A · 500k</span>
      <Line />
      <Line w="w-4/5" />
      <div className="mt-auto flex flex-col">
        <Btn label="Chọn" hot />
      </div>
    </Screen>,
    <Screen key="2" title="2. Chọn giờ">
      <Heading />
      <span className="text-[15px] font-semibold">Thứ Năm</span>
      {["14:00", "15:00"].map((t, i) => (
        <span key={t} className={`rounded-lg px-3 py-2 text-[14px] ${i === 0 ? "bg-[var(--d-ci)] font-semibold" : "bg-[var(--d-soft)]"}`}>
          {t}
        </span>
      ))}
      <div className="mt-auto flex flex-col">
        <Btn label="Tiếp tục" hot />
      </div>
    </Screen>,
    <Screen key="3" title="3. Xác nhận">
      <Heading />
      <span className="text-[15px] font-semibold">Gói A · T5 · 14:00 · 500k</span>
      <Line />
      <Line w="w-3/4" />
      <Line w="w-2/3" />
      <div className="mt-auto flex flex-col">
        <Btn label="Xác nhận" hot />
      </div>
    </Screen>,
  ];
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="arrows" size={36} iconSize={18} radius={10} />
        <Eyebrow>Wireflow ba bước của luồng đặt lịch</Eyebrow>
      </div>
      <div className="flex items-end gap-3">
        {screens.map((s, i) => (
          <Fragment key={i}>
            {s}
            {i < screens.length - 1 && (
              <span className="flex h-[300px] items-end pb-5 text-[var(--d-fill)]">
                <Icon name="arrow-right" size={24} />
              </span>
            )}
          </Fragment>
        ))}
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Thanh đậm là tiêu đề, thanh mảnh là đoạn văn, khối có dấu X là hình ảnh. Mũi tên đi từ nút cụ thể sang màn hình tiếp theo.
      </T>
    </Blk>
  );
}

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Section {...S.problem}>
        <P>
          Nếu bắt đầu ngay bằng thiết kế hoàn chỉnh (màu, ảnh, kiểu chữ), nhóm sẽ tranh luận về màu nút trước khi thống nhất trang cần có gì và theo thứ tự nào. Sửa bố cục ở bản hoàn chỉnh cũng tốn
          công hơn nhiều.
        </P>
        <CheckCards
          groups={[
            [
              "check-circle",
              "Wireframe giúp",
              [
                "Khám phá nhanh nhiều phương án bố cục.",
                "Tập trung thảo luận vào cấu trúc, thứ tự ưu tiên, luồng, không vào thẩm mỹ.",
                "Có bản phác chung để nhóm, bên liên quan và lập trình viên cùng nhìn.",
              ],
            ],
          ]}
        />
      </Section>

      <Section {...S.conventions}>
        <P>Theo Gordon (2021), một số quy ước phổ biến giúp người xem hiểu wireframe dù vẽ tay:</P>
        <Table
          head={["Thành phần", "Cách vẽ"]}
          widths={[320]}
          rows={[
            { cells: ["Khung thiết bị", "Khung trình duyệt hoặc điện thoại, đúng tỷ lệ màn hình thật."] },
            { cells: ["Thanh điều hướng, ô tìm kiếm", "Thanh và hộp chữ nhật."] },
            { cells: ["Tiêu đề", "Đường kẻ đậm."] },
            { cells: ["Đoạn văn", "Đường kẻ mảnh."] },
            { cells: ["Hình ảnh", "Hình chữ nhật có dấu X."] },
            { highlight: true, cells: ["Nút", "Hình chữ nhật, có nhãn chữ cho hành động chính."] },
            { cells: ["Danh sách chọn (dropdown)", "Hình chữ nhật có mũi tên nhỏ."] },
            { cells: ["Hộp thoại, thông báo", "Vài dòng chữ kèm một nút."] },
          ]}
        />
        <P>Gordon cũng gợi ý: dùng bút nét to để không sa vào chi tiết, đặt giới hạn thời gian, và chấp nhận bản phác chưa gọn gàng ở giai đoạn đầu.</P>
      </Section>

      <Section {...S.fidelity}>
        <Subhead icon="bar-chart">Mức độ chi tiết</Subhead>
        <P>
          Wireframe có thể từ phác tay nhanh tới bản chi tiết trên công cụ thiết kế. Chọn mức theo câu hỏi cần trả lời: khám phá ý tưởng thì phác nhanh; bàn giao bố cục thì chi tiết hơn.
        </P>
        <Subhead icon="arrows">Wireflow (Laubheimer, 2016)</Subhead>
        <P>Kết hợp wireframe với cách thể hiện luồng giống lưu đồ. Mỗi bước là một màn hình, mũi tên chỉ từ vùng bấm cụ thể sang trạng thái tiếp theo.</P>
        <InfoGrid
          items={[
            ["component", "Lấp khoảng trống", "Wireframe đơn lẻ khó thể hiện nội dung thay đổi và phản hồi sau mỗi thao tác; lưu đồ lại thiếu bối cảnh trang."],
            ["check-circle", "Phù hợp nhất cho ứng dụng", "Di động, web app có ít trang mà nội dung thay đổi theo tương tác."],
            ["ban", "Không phù hợp cho website tĩnh nhiều trang", "Hình sẽ quá lớn để hữu ích."],
          ]}
        />
        <Wireflow />
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "check-circle",
              "Nên dùng khi",
              [
                "Bắt đầu thiết kế một trang hoặc luồng mới.",
                "Cần so sánh nhiều phương án bố cục nhanh.",
                "Cần thống nhất thứ tự ưu tiên thông tin với nhóm và bên liên quan.",
                "Workshop thiết kế: phác wireflow trên bảng trắng hoặc giấy.",
              ],
            ],
          ]}
        />
        <Table
          head={["Chưa phù hợp khi", "Vì sao", "Thay bằng"]}
          widths={[320]}
          rows={[
            { icon: "users", cells: ["Cần thử tương tác với người dùng", "Wireframe tĩnh không cho người dùng thao tác.", "Low-fidelity prototype."] },
            { icon: "lightbulb", cells: ["Cần đánh giá cảm nhận về thương hiệu, thẩm mỹ", "Wireframe cố ý bỏ yếu tố hình ảnh.", "Mockup, high-fidelity prototype."] },
            { icon: "list", cells: ["Chỉ cần thống nhất cấu trúc danh mục", "Không cần bố cục trang.", "Sơ đồ site, tree testing."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định mục tiêu trang", "Và hành động chính.", "Mục tiêu rõ ràng."],
            ["Liệt kê nội dung", "Và sắp theo thứ tự quan trọng.", "Danh sách ưu tiên."],
            ["Phác nhanh nhiều phương án", "Giới hạn thời gian.", "Vài bản phác."],
            ["Dùng quy ước", "Để người khác đọc được; ghi nhãn cho nút hành động.", "Wireframe dễ hiểu."],
            ["Nối các màn hình", "Bằng mũi tên nếu là luồng (wireflow).", "Luồng tương tác."],
            ["Thảo luận và chọn", "Rồi chuyển sang prototype để thử với người dùng.", "Phương án được chọn."],
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["pencil", "Ý định, chưa phải bằng chứng", "Wireframe thể hiện ý định của nhà thiết kế, chưa phải bằng chứng người dùng hiểu được."],
            ["play-circle", "Khó thể hiện trạng thái", "Wireframe tĩnh khó thể hiện trạng thái, phản hồi, chuyển động."],
            ["chat", "Dễ bị hiểu nhầm", "Bên liên quan có thể hiểu nhầm wireframe là thiết kế cuối, hoặc góp ý về màu xám, ô trống."],
            ["file", "Thay đổi khi có nội dung thật", "Bố cục đúng trên wireframe có thể thay đổi khi chữ dài hơn, ảnh khác tỷ lệ."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Mục tiêu trang và người dùng.", "Danh sách nội dung, thứ tự ưu tiên.", "Kiến trúc thông tin (trang nằm ở đâu trong sản phẩm)."]}
          outputs={["Wireframe cho từng trang hoặc wireflow cho luồng.", "Phương án bố cục được chọn."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard icon="component" title="Bối cảnh" body="Sau task analysis, nhóm biết khách xem giá trước khi đọc mô tả gói, và cần biết trước giấy tờ phải mang." />
        <P>Trong 30 phút, nhà thiết kế phác ba phương án cho trang chọn gói:</P>
        <div className="flex gap-4">
          <InfoCard icon="list" title="A" className="flex-1" body="Bảng so sánh ba gói, giá ở hàng đầu." />
          <InfoCard tone="fill" icon="check-circle" title="B (được chọn)" className="flex-1" body="Ba thẻ dọc, giá to nhất trên mỗi thẻ." />
          <InfoCard icon="chat" title="C" className="flex-1" body="Hỏi hai câu về nhu cầu rồi gợi ý một gói." />
        </div>
        <InfoCard
          icon="arrows"
          title="Wireflow và bước tiếp"
          body="Nhóm chọn B và vẽ wireflow ba bước (như sơ đồ ở trên), thêm danh sách giấy tờ vào màn hình xác nhận. Sau đó chuyển B thành low-fidelity prototype để chạy usability testing."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Làm quá chi tiết quá sớm", "Mất thời gian, ngại bỏ phương án.", "Phác nhanh, giới hạn thời gian."],
            ["Chỉ làm một phương án", "Không có gì để so sánh.", "Phác vài phương án."],
            ["Nút không có nhãn", "Người xem không hiểu hành động chính.", "Ghi nhãn cho nút quan trọng."],
            ["Coi wireframe là đã kiểm chứng", "Chưa có người dùng thật.", "Chuyển sang prototype và kiểm thử."],
            ["Không nói rõ mức chi tiết với bên liên quan", "Góp ý sai trọng tâm (màu, ảnh).", "Nói trước: đây là bố cục, chưa phải giao diện."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Mức độ chi tiết", "Tương tác", "Dùng để"]}
          widths={[200]}
          rows={[
            { highlight: true, cells: ["Wireframe", "Thấp đến trung bình", "Thường tĩnh", "Bố cục, thứ tự thông tin."] },
            { cells: ["Wireflow", "Thấp đến cao", "Thể hiện luồng bằng mũi tên", "Luồng trong ứng dụng."] },
            { cells: ["Mockup", "Cao về hình ảnh", "Tĩnh", "Thể hiện giao diện gần thật."] },
            { cells: ["Prototype", "Thấp đến cao", "Có thể thao tác", "Thử nghiệm với người dùng."] },
            { cells: ["User Flow", "Không có bố cục trang", "Sơ đồ bước", "Thể hiện đường đi của người dùng."] },
          ]}
        />
        <P>Ranh giới giữa các khái niệm không cố định; nhiều nhóm dùng tên khác nhau. Quan trọng là nói rõ với nhau mức chi tiết và mục đích.</P>
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="pencil"
            title="Khi phác"
            items={["Biết mục tiêu trang và hành động chính.", "Nội dung được sắp theo thứ tự ưu tiên.", "Có vài phương án để so sánh.", "Dùng quy ước dễ hiểu; nút chính có nhãn."]}
          />
          <ChecklistColumn
            icon="users"
            title="Khi chia sẻ"
            items={["Luồng nhiều bước có wireflow.", "Đã nói rõ mức chi tiết với người xem.", "Có kế hoạch chuyển sang prototype và kiểm thử."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Prototype", "Bản mẫu", "Bước tiếp theo, cho phép tương tác."],
            ["Low-Fidelity Prototype", "Bản mẫu độ trung thực thấp", "Wireframe nối thành luồng bấm được."],
            ["High-Fidelity Prototype", "Bản mẫu độ trung thực cao", "Bản gần thiết kế cuối."],
            ["User Flow", "Luồng tương tác của người dùng", "Đường đi, không có bố cục trang."],
            ["Visual Hierarchy", "Phân cấp thị giác", "Thứ tự ưu tiên được phác lần đầu trên wireframe."],
            ["Information Architecture", "Kiến trúc thông tin", "Xác định trang nằm ở đâu, chứa gì."],
          ]}
        />
      </Section>
    </div>
  );
}

export const WIREFRAME: Article = {
  slug: "wireframe",
  version: 1,
  term: "Wireframe",
  fn: 3,
  vi: "Khung dây",
  kind: "Tài liệu / sơ đồ thiết kế",
  definition:
    "Wireframe là bản phác thể hiện bố cục trang, thứ tự ưu tiên thông tin, luồng đi của người dùng và đôi khi cả tương tác, ở mức đơn giản, chưa có màu sắc và hình ảnh hoàn chỉnh.",
  definitionMore: "Wireframe có thể là nét vẽ tay nhanh, hoặc bản chi tiết gần với thiết kế cuối, tùy mục đích.",
  oneLine: "Bản phác bố cục và thứ tự thông tin của trang, chưa có thiết kế hình ảnh hoàn chỉnh.",
  glance: [
    ["3 phương án", "Phác trong 30 phút (ví dụ)"],
    ["Wireflow", "Wireframe kèm luồng"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Biến thể: Wireflow (wireframe kèm luồng tương tác)"] },
    { label: "Nhóm chính", items: ["Thiết kế và tạo mẫu"] },
    { label: "Thẻ phụ", items: ["Kiến trúc và điều hướng"] },
    {
      label: "Lưu ý tên gọi",
      items: ["Wireframe, mockup và prototype thường bị dùng lẫn lộn. Ở đây, wireframe là bản phác bố cục và thứ tự ưu tiên thông tin; prototype là bản có thể tương tác để thử nghiệm."],
    },
  ],
  sections: SECTIONS,
  Body,
};
