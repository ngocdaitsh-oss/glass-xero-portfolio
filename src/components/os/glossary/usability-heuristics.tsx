"use client";

import { Blk, T } from "./edit";
import { CheckCards, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Usability Heuristics — copy from ux-glossary/usability-heuristics.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "ten", title: "10 nguyên tắc và cách áp dụng khi thiết kế", icon: "list" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "limits", title: "Giới hạn: khi nào nguyên tắc chưa đủ", icon: "shield-alert" },
  { id: "apply", title: "Cách áp dụng trong quy trình thiết kế", icon: "list" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

const HEURISTICS: [string, string, string, string][] = [
  ["Visibility of system status — Cho thấy trạng thái hệ thống", "Luôn cho người dùng biết điều gì đang xảy ra, qua phản hồi kịp thời.", "Phản hồi càng nhanh càng tốt; nói rõ trạng thái trước các hành động quan trọng.", "Sau khi bấm xác nhận, nút chuyển thành “Đang giữ chỗ…”, rồi hiện “Đã đặt lịch 14:00 thứ Năm”."],
  ["Match between the system and the real world — Khớp với thế giới thực", "Dùng ngôn ngữ và quy ước của người dùng, không dùng thuật ngữ nội bộ.", "Không mặc định người dùng hiểu từ của nhóm; tìm hiểu từ ngữ của họ qua nghiên cứu.", "Dùng “buổi tư vấn” thay vì “session” hay “ticket”."],
  ["User control and freedom — Kiểm soát và tự do", "Có lối thoát rõ ràng khi người dùng làm nhầm.", "Hỗ trợ hoàn tác, làm lại; nút hủy rõ ràng, dễ thấy.", "Có nút “Đổi giờ” ngay trên trang xác nhận."],
  ["Consistency and standards — Nhất quán và theo chuẩn", "Cùng một ý nghĩa thì cùng một cách thể hiện; theo quy ước của nền tảng.", "Giữ nhất quán bên trong sản phẩm và với quy ước quen thuộc bên ngoài.", "Mọi trang đều gọi là “buổi tư vấn”; nút chính luôn cùng màu, cùng vị trí."],
  ["Error prevention — Ngăn lỗi", "Ngăn lỗi trước khi xảy ra, hoặc hỏi xác nhận trước khi thực hiện.", "Ưu tiên ngăn lỗi gây hậu quả lớn; dùng ràng buộc và giá trị mặc định tốt.", "Khung giờ đã kín không bấm được; hỏi lại trước khi hủy lịch."],
  ["Recognition rather than recall — Nhận ra thay vì phải nhớ", "Hiện sẵn lựa chọn và thông tin, không bắt người dùng nhớ.", "Đưa trợ giúp vào đúng ngữ cảnh; giảm thứ người dùng phải ghi nhớ.", "Bước cuối nhắc lại chuyên gia, giờ, giá đã chọn."],
  ["Flexibility and efficiency of use — Linh hoạt và hiệu quả", "Có lối tắt cho người dùng quen, không làm rối người mới.", "Cung cấp lối tắt, cá nhân hóa, tùy chỉnh cho thao tác lặp lại.", "Khách cũ có nút “Đặt lại với chuyên gia trước”."],
  ["Aesthetic and minimalist design — Thẩm mỹ và tối giản", "Bỏ thông tin không liên quan; mỗi thứ thừa đều cạnh tranh với thứ quan trọng.", "Tập trung vào thông tin phục vụ mục tiêu chính.", "Form đặt lịch chỉ hỏi tên, số điện thoại, chủ đề."],
  ["Help users recognize, diagnose, and recover from errors — Giúp nhận ra, hiểu và sửa lỗi", "Thông báo lỗi bằng ngôn ngữ thường, nói rõ vấn đề, gợi ý cách sửa.", "Dùng dấu hiệu lỗi quen thuộc; tránh thuật ngữ kỹ thuật; đưa ra cách sửa.", "“Số điện thoại cần 10 chữ số. Bạn đang nhập 9 chữ số.”"],
  ["Help and documentation — Trợ giúp và tài liệu", "Tốt nhất là không cần giải thích; nếu cần, trợ giúp phải dễ tìm, ngắn, theo tác vụ.", "Trợ giúp dễ tìm, đặt đúng ngữ cảnh, liệt kê bước cụ thể.", "Dòng “Có thể hủy miễn phí trước 24 giờ” đặt ngay cạnh nút xác nhận."],
];

function Pin({ n }: { n: number }) {
  return <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--d-fill)] font-mono text-[13px] font-semibold text-white">{n}</span>;
}

/** The confirmation screen from the example, with the heuristic each fix answers. */
function ScreenDiagram() {
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="eye" size={36} iconSize={18} radius={10} />
        <Eyebrow>Màn hình xác nhận sau khi rà theo nguyên tắc</Eyebrow>
      </div>
      <div className="flex items-start gap-8">
        <div className="flex w-[340px] shrink-0 flex-col gap-4 rounded-[24px] bg-[var(--d-well)] p-6">
          <span className="text-[18px] font-semibold">Xác nhận buổi tư vấn</span>
          <div className="flex items-start gap-3 rounded-xl bg-[var(--w-card)] p-4">
            <Pin n={6} />
            <span className="text-[15px] leading-[22px] text-[var(--w-secondary)]">Chuyên gia, 14:00 thứ Năm, giá đã chọn</span>
          </div>
          <div className="flex items-center gap-3">
            <Pin n={1} />
            <span className="flex-1 rounded-full bg-[var(--d-fill)] py-3 text-center text-[15px] font-semibold text-white">Đang giữ chỗ…</span>
          </div>
          <div className="flex items-center gap-3">
            <Pin n={3} />
            <span className="flex-1 rounded-full bg-[var(--d-soft)] py-3 text-center text-[15px] font-semibold">Đổi giờ</span>
          </div>
          <div className="flex items-start gap-3">
            <Pin n={10} />
            <span className="text-[14px] leading-[20px] text-[var(--w-secondary)]">Có thể hủy miễn phí trước 24 giờ · Xem chi tiết</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-3">
          {[
            [1, "Cho thấy trạng thái hệ thống", "Thêm trạng thái “đang xử lý” sau khi bấm."],
            [3, "Kiểm soát và tự do", "Thêm nút “Đổi giờ” sau khi xác nhận."],
            [6, "Nhận ra thay vì phải nhớ", "Màn hình cuối nhắc lại giờ đã chọn."],
            [10, "Trợ giúp, cân với nguyên tắc 8", "Giữ một dòng ngắn về chính sách hủy, kèm liên kết “Xem chi tiết”."],
          ].map(([n, t, d]) => (
            <div key={n} className="flex items-start gap-3 rounded-2xl bg-[var(--d-soft)] p-4">
              <Pin n={n as number} />
              <div className="flex flex-col gap-1">
                <span className="text-[16px] leading-[22px] font-semibold">{t}</span>
                <span className="text-[15px] leading-[22px] text-[var(--w-secondary)]">{d}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Mỗi số là nguyên tắc mà chỗ sửa đáp ứng. Tình huống giả định.
      </T>
    </Blk>
  );
}

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Section {...S.problem}>
        <P>
          Nhiều vấn đề khả năng sử dụng lặp lại giữa các sản phẩm rất khác nhau: không biết hệ thống đang xử lý hay đã treo, không có cách quay lại, thông báo lỗi khó hiểu. Thay vì phát hiện lại
          từng vấn đề qua kiểm thử, nhóm có thể dùng các nguyên tắc chung để tránh chúng ngay từ khi thiết kế.
        </P>
        <CheckCards
          groups={[
            [
              "check-circle",
              "Usability heuristics giúp",
              [
                "Có ngôn ngữ chung để nhóm thảo luận về thiết kế (“chỗ này vi phạm nguyên tắc 6”).",
                "Phòng tránh lỗi phổ biến trước khi kiểm thử.",
                "Làm khung rà soát nhanh (heuristic evaluation).",
              ],
            ],
          ]}
        />
      </Section>

      <Section {...S.ten}>
        <P>Diễn giải theo bài của NN/g. Ví dụ “làm tốt” là giả định, theo luồng đặt lịch tư vấn.</P>
        <Table
          head={["#", "Nguyên tắc", "Ý chính", "Gợi ý khi thiết kế", "Ví dụ làm tốt (giả định)"]}
          widths={[56, 240]}
          rows={HEURISTICS.map(([name, idea, tip, ex], i) => ({ cells: [String(i + 1), name, idea, tip, ex] }))}
        />
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "check-circle",
              "Nên dùng khi",
              [
                "Đang thiết kế: dùng như danh sách tự nhắc.",
                "Phản biện thiết kế trong nhóm: có tiêu chí chung để thảo luận.",
                "Rà soát nhanh trước khi kiểm thử với người dùng (heuristic evaluation).",
                "Đào tạo người mới vào nghề.",
              ],
            ],
          ]}
        />
        <Callout tone="note" icon="alert">
          NN/g gọi đây là nguyên tắc chung, không phải quy tắc cụ thể. Với lĩnh vực đặc thù (thiết bị di động, trò chơi, thiết bị y tế), có thể cần bổ sung bộ nguyên tắc riêng.
        </Callout>
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["users", "Không thay được người dùng thật", "Thiết kế đúng nguyên tắc vẫn có thể sai với nhu cầu, từ ngữ, bối cảnh của người dùng cụ thể."],
            ["split", "Các nguyên tắc có thể mâu thuẫn", "Thêm trợ giúp (nguyên tắc 10) có thể làm giao diện bớt tối giản (nguyên tắc 8). Cần cân nhắc theo ngữ cảnh."],
            ["target", "Không nói về tính hữu ích", "Giao diện dễ dùng nhưng giải quyết sai vấn đề vẫn thất bại."],
            ["eye", "Không bao quát accessibility đầy đủ", "Cần thêm tiêu chuẩn như WCAG."],
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Khi phác thảo", "Dùng 10 nguyên tắc làm danh sách tự nhắc cho từng màn hình.", "Phác thảo đã tránh lỗi phổ biến."],
            ["Khi phản biện thiết kế", "Gắn mỗi góp ý với một nguyên tắc cụ thể.", "Góp ý rõ ràng, ít cảm tính."],
            ["Trước khi kiểm thử", "Rà soát theo nguyên tắc (heuristic evaluation) để sửa lỗi hiển nhiên.", "Danh sách vấn đề đã sửa."],
            ["Khi kiểm thử", "Để người dùng thật kiểm chứng; nguyên tắc không thay được bước này.", "Vấn đề chỉ người dùng mới phát hiện được."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Thiết kế (phác thảo, wireframe, prototype hoặc sản phẩm).", "Danh sách 10 nguyên tắc."]}
          outputs={["Thiết kế đã tránh các lỗi phổ biến.", "Góp ý gắn với nguyên tắc cụ thể."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard icon="component" title="Bối cảnh" body="Nhà thiết kế phác thảo màn hình xác nhận đặt lịch, rồi tự rà theo 10 nguyên tắc trước buổi phản biện." />
        <Table
          head={["Nguyên tắc", "Rà soát", "Sửa"]}
          widths={[200]}
          rows={[
            { cells: ["1", "Chưa có trạng thái “đang xử lý” sau khi bấm.", "Thêm."] },
            { cells: ["3", "Không có cách đổi giờ sau khi xác nhận.", "Thêm nút “Đổi giờ”."] },
            { cells: ["6", "Màn hình cuối không nhắc lại giờ đã chọn.", "Thêm tóm tắt."] },
            {
              highlight: true,
              cells: ["8 và 10 mâu thuẫn", "Muốn thêm đoạn giải thích chính sách hủy dài, nhưng làm màn hình rối.", "Giữ một dòng ngắn, kèm liên kết “Xem chi tiết”."],
            },
          ]}
        />
        <ScreenDiagram />
        <InfoCard
          tone="fill"
          icon="check-circle"
          title="Kết quả"
          body="Buổi phản biện tập trung vào câu hỏi khó hơn (khách có hiểu sự khác nhau giữa các gói không), thay vì lỗi hiển nhiên."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Coi là quy tắc tuyệt đối", "Nguyên tắc có thể mâu thuẫn, cần cân nhắc ngữ cảnh.", "Dùng như hướng dẫn, ghi lý do khi chọn."],
            ["Coi đạt nguyên tắc là đủ", "Không thay được kiểm thử với người dùng.", "Kiểm chứng với người thật."],
            ["Học thuộc tên mà không hiểu ý", "Áp dụng máy móc.", "Gắn mỗi nguyên tắc với ví dụ trong sản phẩm của mình."],
            ["Dùng bộ chung cho lĩnh vực đặc thù", "Bỏ sót vấn đề riêng.", "Bổ sung bộ nguyên tắc chuyên biệt."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Là gì"]}
          widths={[340]}
          rows={[
            { icon: "list", highlight: true, cells: ["Usability Heuristics", "Bộ nguyên tắc chung về khả năng sử dụng."] },
            { icon: "list-search", cells: ["Heuristic Evaluation", "Phương pháp rà soát giao diện dựa trên bộ nguyên tắc đó."] },
            { icon: "component", cells: ["Design system / guideline", "Quy định cụ thể (màu, khoảng cách, thành phần) của một sản phẩm hoặc tổ chức."] },
            { icon: "eye", cells: ["WCAG", "Tiêu chuẩn accessibility, có tiêu chí kiểm tra được."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="list"
            title="Nguyên tắc 1–5"
            items={[
              "Người dùng luôn biết hệ thống đang làm gì.",
              "Từ ngữ là của người dùng.",
              "Có lối thoát, hoàn tác.",
              "Nhất quán trong sản phẩm và với quy ước chung.",
              "Lỗi hậu quả lớn được ngăn trước.",
            ]}
          />
          <ChecklistColumn
            icon="list"
            title="Nguyên tắc 6–10"
            items={[
              "Thông tin cần thiết hiện sẵn, không bắt nhớ.",
              "Có lối tắt cho người dùng quen.",
              "Không có thông tin thừa.",
              "Thông báo lỗi dễ hiểu, có cách sửa.",
              "Trợ giúp dễ tìm, đúng ngữ cảnh.",
            ]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Heuristic Evaluation", "Đánh giá theo nguyên tắc kinh nghiệm", "Phương pháp rà soát dùng bộ nguyên tắc này."],
            ["Usability Testing", "Kiểm thử khả năng sử dụng", "Kiểm chứng với người dùng thật."],
            ["Mental Model", "Mô hình tư duy", "Nền tảng của nguyên tắc 2 và 4."],
            ["Cognitive Load", "Tải nhận thức", "Nền tảng của nguyên tắc 6 và 8."],
            ["Microcopy", "Vi văn bản", "Thông báo lỗi, trợ giúp ngắn (nguyên tắc 9, 10)."],
            ["Visual Hierarchy", "Phân cấp thị giác", "Công cụ thực hiện nguyên tắc 8 (thẩm mỹ và tối giản)."],
          ]}
        />
      </Section>
    </div>
  );
}

export const USABILITY_HEURISTICS: Article = {
  slug: "usability-heuristics",
  version: 1,
  term: "Usability Heuristics",
  fn: 4,
  vi: "Nguyên tắc khả năng sử dụng",
  kind: "Nguyên tắc / khái niệm",
  definition: "Usability heuristics là các nguyên tắc chung, rút ra từ kinh nghiệm, về những gì giúp một giao diện dễ dùng.",
  definitionMore: "Bộ phổ biến nhất là 10 nguyên tắc của Jakob Nielsen (1994), được cập nhật cách diễn đạt và ví dụ năm 2020 nhưng giữ nguyên nội dung.",
  oneLine: "Các nguyên tắc kinh nghiệm giúp giao diện dễ dùng; bộ phổ biến nhất là 10 nguyên tắc của Nielsen.",
  glance: [
    ["10", "Nguyên tắc của Nielsen"],
    ["1994", "Năm công bố, cập nhật 2020"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["10 Usability Heuristics", "Nielsen's heuristics"] },
    { label: "Nhóm chính", items: ["Nền tảng và nguyên tắc"] },
    { label: "Thẻ phụ", items: ["Kiểm thử khả năng sử dụng"] },
    {
      label: "Lưu ý tên gọi",
      items: ["“Heuristic” là quy tắc kinh nghiệm, không phải quy định cứng. Bài này nói về bản thân các nguyên tắc; cách dùng chúng để rà soát giao diện có bài riêng: Heuristic Evaluation."],
    },
  ],
  sections: SECTIONS,
  Body,
};
