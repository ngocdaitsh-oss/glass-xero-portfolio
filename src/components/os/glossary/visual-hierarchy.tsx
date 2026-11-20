"use client";

import { Blk, T } from "./edit";
import { CheckCards, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Visual Hierarchy — copy from ux-glossary/visual-hierarchy.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "tools", title: "Ba công cụ tạo phân cấp", icon: "component" },
  { id: "when", title: "Khi nào cần chú ý đặc biệt", icon: "check-circle" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "limits", title: "Giới hạn: khi nào phân cấp thị giác chưa đủ", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** Plan card from the example: every element the same weight vs. a clear 1-2-3 order. */
function BeforeAfter() {
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="eye" size={36} iconSize={18} radius={10} />
        <Eyebrow>Thẻ gói tư vấn: trước và sau khi sắp lại phân cấp</Eyebrow>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-1 flex-col gap-3">
          <span className="text-[15px] font-semibold text-[var(--w-muted)]">Trước</span>
          <div className="flex flex-col gap-3 rounded-[24px] bg-[var(--d-well)] p-6">
            <span className="w-fit rounded-full bg-[var(--d-bad)] px-3 py-1 text-[15px] font-semibold text-white">Ưu đãi</span>
            <span className="text-[16px] font-semibold">Gói Chuyên sâu</span>
            <span className="text-[16px]">1.200.000đ</span>
            <span className="text-[16px] text-[var(--w-secondary)]">Phân tích dòng tiền, kế hoạch vay, theo dõi 1 tháng</span>
            <span className="rounded-full bg-[var(--d-soft)] py-2.5 text-center text-[16px] text-[var(--w-secondary)]">Chọn</span>
          </div>
          <span className="text-[14px] leading-[20px] text-[var(--w-muted)]">Làm mờ: nhãn “Ưu đãi” đỏ nổi nhất, không phải giá hay nút chọn.</span>
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <span className="text-[15px] font-semibold text-[var(--w-muted)]">Sau</span>
          <div className="flex flex-col gap-4 rounded-[24px] bg-[var(--d-well)] p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col">
                <span className="text-[24px] leading-[30px] font-semibold">Gói Chuyên sâu</span>
                <span className="text-[28px] leading-[34px] font-semibold">1.200.000đ</span>
              </div>
              <span className="rounded-full bg-[var(--d-bad-soft)] px-3 py-1 text-[14px] text-[var(--d-bad)]">Ưu đãi</span>
            </div>
            <ul className="flex flex-col gap-1 text-[16px] leading-[22px] text-[var(--w-secondary)]">
              <li>· Phân tích dòng tiền</li>
              <li>· Kế hoạch vay</li>
              <li>· Theo dõi 1 tháng</li>
            </ul>
            <span className="rounded-full bg-[var(--d-fill)] py-3 text-center text-[16px] font-semibold text-white">Chọn gói này</span>
          </div>
          <span className="text-[14px] leading-[20px] text-[var(--w-muted)]">(1) tên gói và giá, (2) ba lợi ích, (3) nút chọn; “Ưu đãi” chỉ còn là điểm nhấn phụ.</span>
        </div>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Nội dung gói chỉ để minh họa bố cục. Tình huống giả định.
      </T>
    </Blk>
  );
}

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Section {...S.problem}>
        <P>
          Khi mọi thứ trên màn hình đều to, đậm, nhiều màu như nhau, người dùng không biết nhìn vào đâu. Họ phải tự đọc hết để tìm thứ cần, hoặc bỏ lỡ hành động chính. Ngược lại, khi phân cấp rõ,
          người dùng nắm được ý chính chỉ trong vài giây.
        </P>
        <CheckCards
          groups={[
            ["check-circle", "Visual hierarchy giúp", ["Người dùng thấy ngay điều quan trọng nhất.", "Biết thành phần nào thuộc về nhau.", "Biết hành động chính là gì."]],
          ]}
        />
      </Section>

      <Section {...S.tools}>
        <P>Theo Gordon (2021), ba công cụ chính:</P>
        <Table
          head={["Công cụ", "Cách hoạt động", "Gợi ý từ NN/g"]}
          widths={[240]}
          rows={[
            {
              icon: "eye",
              cells: [
                "Màu sắc và độ tương phản",
                "Thứ nổi bật là thứ khác biệt về độ sáng, độ bão hòa so với xung quanh, chứ không phải bản thân màu. Kiểu chữ (đậm, nghiêng, gạch chân) cũng tạo tương phản.",
                "Thiết kế đơn giản: khoảng 2 màu chính và 2 màu phụ. Thiết kế phức tạp: không quá 3 kiểu tương phản. Không dựa chỉ vào màu (người mù màu không phân biệt được).",
              ],
            },
            {
              icon: "bar-chart",
              cells: [
                "Kích thước (scale)",
                "Thứ lớn hơn thu hút chú ý trước.",
                "Khoảng 3 cỡ chữ (nhỏ, vừa, lớn); ví dụ trên web: thân bài khoảng 14–16px, tiêu đề phụ 18–22px, tiêu đề tới 32px. Không quá 2 thành phần cỡ lớn.",
              ],
            },
            {
              icon: "component",
              cells: ["Nhóm (grouping)", "Thứ gần nhau, hoặc nằm chung một khung, nền, được hiểu là cùng nhóm.", "Khoảng cách giữa tiêu đề và nội dung của nó nên nhỏ hơn khoảng cách tới nhóm khác."],
            },
          ]}
        />
        <InfoCard tone="fill" icon="alert" title="Câu tóm tắt đáng nhớ" body="Nếu cái gì cũng được làm nổi bật thì không có gì nổi bật." />
      </Section>

      <Section {...S.when}>
        <InfoGrid
          items={[
            ["target", "Trang có một hành động chính", "Đặt lịch, thanh toán: hành động đó phải dễ thấy nhất."],
            ["list", "Trang nhiều nội dung", "Danh sách dịch vụ, bảng giá: cần nhóm rõ để người dùng quét nhanh."],
            ["eye", "Giao diện di động", "Không gian nhỏ, dễ thành “mọi thứ như nhau”."],
            ["file", "Nội dung do người khác đưa vào", "Ảnh, bài viết có thể phá vỡ phân cấp của khuôn mẫu, ví dụ một ảnh màu đậm lấn át tiêu đề (Gordon)."],
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định thứ tự quan trọng trước khi thiết kế", "Người dùng cần thấy gì đầu tiên, thứ hai, thứ ba.", "Danh sách ưu tiên nội dung."],
            ["Chọn công cụ", "Cho từng cấp: kích thước, tương phản, nhóm.", "Quy tắc phân cấp (cỡ chữ, màu, khoảng cách)."],
            ["Giới hạn số cấp", "Ít cỡ chữ, ít màu, ít thành phần lớn.", "Thiết kế không bị “mọi thứ nổi bật”."],
            ["Kiểm tra bằng cách nheo mắt hoặc làm mờ", "Những khối nào còn nổi bật? Có đúng thứ tự mong muốn không?", "Điểm nhấn ngoài ý muốn được phát hiện."],
            ["Kiểm tra với nội dung thật", "Không chỉ nội dung mẫu.", "Phân cấp vẫn đúng khi có ảnh, chữ thật."],
            ["Kiểm thử với người dùng", "Họ có thấy điều quan trọng không? (ví dụ first-click testing).", "Bằng chứng phân cấp hoạt động."],
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["eye", "Dẫn mắt, không bảo đảm hiểu", "Phân cấp thị giác dẫn mắt, nhưng không bảo đảm người dùng hiểu nội dung."],
            ["list", "Cấu trúc nội dung sai", "Thông tin quan trọng nằm sai trang thì làm nổi bật cũng không cứu được → cần information architecture."],
            ["users", "Khó tiếp cận", "Phân cấp tốt về hình ảnh có thể vẫn khó với người dùng trình đọc màn hình, nếu thứ tự trong mã nguồn không khớp → cần xem thêm accessibility."],
            ["list-search", "Cần kiểm chứng", "Thứ tự mắt nhìn thực tế cần kiểm chứng (kiểm thử, eye tracking), không chỉ dựa vào suy đoán của nhà thiết kế."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Mục tiêu của trang và hành động chính.", "Danh sách nội dung theo thứ tự quan trọng.", "Nội dung thật hoặc gần thật."]}
          outputs={["Quy tắc phân cấp: cỡ chữ, màu, khoảng cách.", "Thiết kế đã qua kiểm tra làm mờ."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard
          icon="component"
          title="Bối cảnh"
          body="Trang chọn gói tư vấn có ba gói. Trong phiên bản cũ, tên gói, giá, mô tả, ưu đãi và nút “Chọn” đều có cỡ chữ gần nhau; nhãn “Ưu đãi” màu đỏ, nút “Chọn” màu xám."
        />
        <BeforeAfter />
        <Table
          head={["Thành phần", "Thay đổi"]}
          widths={[300]}
          rows={[
            { cells: ["Tên gói và giá", "Cỡ lớn nhất trên thẻ."] },
            { cells: ["Lợi ích", "Cỡ vừa, nhóm sát dưới giá."] },
            { highlight: true, cells: ["Nút “Chọn gói này”", "Màu thương hiệu, tương phản cao, cùng vị trí trên cả ba thẻ."] },
            { cells: ["Nhãn “Ưu đãi”", "Giảm độ bão hòa, chỉ còn là điểm nhấn phụ."] },
          ]}
        />
        <InfoCard tone="fill" icon="target" title="Kiểm chứng" body="Chạy first-click testing để xem người dùng có bấm đúng nút chọn gói không." />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Làm nổi bật mọi thứ", "Không còn gì nổi bật.", "Chọn ít điểm nhấn."],
            ["Quá nhiều màu có độ sáng giống nhau", "Không tạo được tương phản.", "Giới hạn màu; tạo khác biệt về độ sáng."],
            ["Chỉ dùng màu để phân biệt", "Người mù màu không thấy.", "Kết hợp kích thước, kiểu chữ, vị trí."],
            ["Viết hoa phần lớn chữ", "Các cấp chữ trông giống nhau, khó phân biệt.", "Chỉ viết hoa nhãn ngắn."],
            ["Chỉ kiểm tra với nội dung mẫu", "Ảnh, chữ thật có thể phá phân cấp.", "Kiểm tra với nội dung thật."],
            ["Khoảng cách đều nhau", "Không thấy nhóm.", "Khoảng cách trong nhóm nhỏ hơn giữa các nhóm."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Trọng tâm"]}
          widths={[380]}
          rows={[
            { icon: "eye", highlight: true, cells: ["Visual Hierarchy", "Thứ tự mắt nhìn trên một màn hình."] },
            { icon: "list", cells: ["Information Architecture", "Cách tổ chức và đặt tên nội dung trong toàn sản phẩm."] },
            { icon: "play-circle", cells: ["Cognitive Load", "Công sức trí óc người dùng phải bỏ ra; phân cấp tốt giúp giảm."] },
            { icon: "component", cells: ["Aesthetic and minimalist design (nguyên tắc 8 của Nielsen)", "Bỏ thông tin thừa; liên quan nhưng hẹp hơn."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="pencil"
            title="Khi thiết kế"
            items={["Đã xác định thứ tự quan trọng trước khi thiết kế.", "Hành động chính dễ thấy nhất.", "Số cỡ chữ, số màu được giới hạn.", "Không quá vài thành phần cỡ lớn."]}
          />
          <ChecklistColumn icon="eye" title="Khi kiểm tra" items={["Không chỉ dựa vào màu.", "Khoảng cách thể hiện nhóm.", "Đã kiểm tra làm mờ.", "Đã kiểm tra với nội dung thật."]} />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Cognitive Load", "Tải nhận thức", "Phân cấp rõ giúp giảm tải nhận thức."],
            ["Information Architecture", "Kiến trúc thông tin", "Cấu trúc nội dung, khác thứ tự nhìn."],
            ["Usability Heuristics", "Nguyên tắc khả năng sử dụng", "Nguyên tắc 8: thẩm mỹ và tối giản."],
            ["Accessibility", "Khả năng tiếp cận", "Không dựa chỉ vào màu; thứ tự đọc."],
            ["First-Click Testing", "Kiểm thử cú nhấp đầu tiên", "Kiểm chứng hành động chính có dễ thấy không."],
            ["Wireframe", "Khung dây", "Nơi thứ tự ưu tiên được phác lần đầu."],
          ]}
        />
      </Section>
    </div>
  );
}

export const VISUAL_HIERARCHY: Article = {
  slug: "visual-hierarchy",
  version: 1,
  term: "Visual Hierarchy",
  fn: 4,
  vi: "Phân cấp thị giác",
  kind: "Nguyên tắc / khái niệm",
  definition: "Visual hierarchy là cách sắp xếp các thành phần trên một thiết kế hai chiều để mắt người nhìn lần lượt từ thứ quan trọng nhất đến ít quan trọng hơn.",
  definitionMore: "Phân cấp thị giác quyết định người dùng chú ý vào đâu trước, và họ hiểu điều gì là chính.",
  oneLine: "Sắp xếp thiết kế để mắt người nhìn theo đúng thứ tự quan trọng.",
  glance: [
    ["3 công cụ", "Tương phản, kích thước, nhóm"],
    ["~3 cỡ chữ", "Nhỏ, vừa, lớn"],
  ],
  facts: [
    { label: "Nhóm chính", items: ["Nền tảng và nguyên tắc"] },
    { label: "Thẻ phụ", items: ["Thiết kế giao diện"] },
    { label: "Lưu ý tên gọi", items: ["Visual hierarchy nói về thứ tự mắt người nhìn thấy các thành phần, không phải cấu trúc nội dung (đó là information architecture)."] },
  ],
  sections: SECTIONS,
  Body,
};
