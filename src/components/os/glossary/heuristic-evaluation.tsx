"use client";

import { Blk, T } from "./edit";
import { CheckCards, Formula, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Heuristic Evaluation — copy from ux-glossary/heuristic-evaluation.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "heuristics", title: "10 nguyên tắc của Nielsen", icon: "list" },
  { id: "severity", title: "Mức độ nghiêm trọng", icon: "gauge" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list-search" },
  { id: "maths", title: "Công thức và ví dụ tính", icon: "sigma" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các phương pháp gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** Each evaluator's share of the 15 distinct problems, one cell per problem. */
function Coverage() {
  const rows: [string, number][] = [
    ["Người A", 9],
    ["Người B", 7],
    ["Người C", 8],
  ];
  return (
    <Blk label="biểu đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="users" size={36} iconSize={18} radius={10} />
        <Eyebrow>Mỗi người tìm được bao nhiêu trong 15 vấn đề</Eyebrow>
      </div>
      <div className="flex flex-col gap-3">
        {rows.map(([name, n]) => (
          <div key={name} className="flex items-center gap-5">
            <span className="w-[100px] shrink-0 text-[17px] leading-6 font-semibold">{name}</span>
            <div className="grid flex-1 grid-cols-[repeat(15,1fr)] gap-1.5">
              {Array.from({ length: 15 }, (_, i) => (
                <span key={i} className={`h-9 rounded-[8px] ${i < n ? "bg-[var(--d-fill)]" : "bg-[var(--d-well)]"}`} />
              ))}
            </div>
            <span className="w-[110px] shrink-0 text-right font-mono text-[15px]">
              {n} / 15
            </span>
          </div>
        ))}
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Không ai tìm được hết. Đây là lý do cần nhiều người đánh giá.
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
            Usability test với người dùng thật cho kết quả đáng tin, nhưng tốn thời gian tuyển người và chạy phiên. Nhiều vấn đề lại khá rõ ràng: thiếu phản hồi sau khi bấm, nhãn không
            nhất quán, không có cách hoàn tác. Những vấn đề này có thể được phát hiện trước, để buổi test với người dùng tập trung vào điều khó đoán hơn.
          </P>
          <P strong>Heuristic evaluation giúp tìm nhanh các vấn đề đó với chi phí thấp, kể cả khi mới có wireframe.</P>
        </div>
        <Eyebrow>Heuristic evaluation hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          cols={3}
          minH={150}
          items={[
            ["play-circle", "Sửa gì trước khi test với người dùng", "Loại bớt vấn đề rõ ràng."],
            ["gauge", "Ưu tiên vấn đề", "Theo mức độ nghiêm trọng."],
            ["list", "Thiết kế có vi phạm nguyên tắc cơ bản không", "Trước khi ra mắt."],
          ]}
        />
      </Section>

      <Section {...S.heuristics}>
        <P>
          Nielsen phát triển bộ nguyên tắc cùng Rolf Molich năm 1990, rồi chỉnh lại năm 1994 dựa trên phân tích 249 vấn đề khả năng sử dụng. Bộ nguyên tắc giữ nguyên từ đó, chỉ cập nhật
          cách diễn đạt năm 2020.
        </P>
        <Table
          head={["Nguyên tắc", "Diễn giải ngắn", "Ví dụ vi phạm (giả định)"]}
          widths={[340]}
          rows={[
            ["1. Visibility of system status", "Cho người dùng biết hệ thống đang làm gì.", "Bấm “Xác nhận đặt lịch” mà không có dấu hiệu đang xử lý."],
            ["2. Match between the system and the real world", "Dùng ngôn ngữ và quy ước quen thuộc với người dùng.", "Nút ghi “Khởi tạo phiên” thay vì “Đặt lịch”."],
            ["3. User control and freedom", "Có lối thoát rõ ràng: hủy, quay lại, hoàn tác.", "Không đổi được giờ sau khi đã chọn."],
            ["4. Consistency and standards", "Cùng một ý nghĩa thì cùng một cách thể hiện.", "Trang này gọi “buổi tư vấn”, trang kia gọi “cuộc hẹn”."],
            ["5. Error prevention", "Ngăn lỗi trước khi xảy ra.", "Cho chọn giờ đã kín lịch."],
            ["6. Recognition rather than recall", "Hiện sẵn thông tin, không bắt người dùng nhớ.", "Bước xác nhận không nhắc lại giờ đã chọn."],
            ["7. Flexibility and efficiency of use", "Có lối tắt cho người dùng quen.", "Khách cũ phải nhập lại toàn bộ thông tin."],
            ["8. Aesthetic and minimalist design", "Chỉ hiện điều cần thiết.", "Form đặt lịch có đoạn giới thiệu dài."],
            ["9. Help users recognize, diagnose, and recover from errors", "Thông báo lỗi dễ hiểu, có cách khắc phục.", "Báo “Lỗi 422” khi số điện thoại sai định dạng."],
            ["10. Help and documentation", "Có trợ giúp khi cần, dễ tìm.", "Không có thông tin về chính sách hủy lịch."],
          ].map((cells) => ({ cells }))}
        />
        <Callout tone="note">Có thể dùng bộ nguyên tắc khác phù hợp với lĩnh vực (ví dụ bộ nguyên tắc cho thiết bị di động hay trò chơi); ghi rõ bộ đã dùng.</Callout>
      </Section>

      <Section {...S.severity}>
        <P>Nielsen đề xuất thang 0–4 để xếp hạng vấn đề.</P>
        <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
          <div className="flex items-center gap-3">
            <Tile icon="gauge" size={36} iconSize={18} radius={10} />
            <Eyebrow>Thang mức độ nghiêm trọng</Eyebrow>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {[
              ["0", "Không phải vấn đề khả năng sử dụng.", "bg-[var(--d-well)]"],
              ["1", "Chỉ về thẩm mỹ; sửa nếu còn thời gian.", "bg-[var(--d-well)]"],
              ["2", "Nhỏ; ưu tiên thấp.", "bg-[var(--d-soft)]"],
              ["3", "Lớn; ưu tiên cao.", "bg-[var(--d-ci)]"],
              ["4", "Thảm họa; phải sửa trước khi ra mắt.", "bg-[var(--d-fill)] text-white"],
            ].map(([n, t, c]) => (
              <div key={n} className={`flex min-h-[150px] flex-col gap-2 rounded-[18px] p-5 ${c}`}>
                <span className="text-[36px] leading-[40px] font-bold">{n}</span>
                <T className="text-[16px] leading-6">{t}</T>
              </div>
            ))}
          </div>
        </Blk>
        <InfoGrid
          cols={3}
          items={[
            ["users", "Tần suất", "Bao nhiêu người gặp."],
            ["alert", "Tác động", "Khó vượt qua đến đâu."],
            ["rotate", "Tính lặp lại", "Gặp một lần hay mỗi lần dùng."],
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
                "Trước usability test, để loại bớt vấn đề rõ ràng.",
                "Có wireframe, prototype hoặc sản phẩm cần rà soát nhanh.",
                "Ngân sách hoặc thời gian không cho phép test với người dùng ngay.",
              ],
            ],
            ["eye", "Dấu hiệu nhận biết", ["Thiết kế mới hoàn thành, chưa được ai ngoài nhóm thiết kế xem.", "Sản phẩm cũ chưa bao giờ được rà soát khả năng sử dụng."]],
            [
              "clipboard-check",
              "Điều kiện cần",
              ["Người đánh giá hiểu bộ nguyên tắc và có kinh nghiệm UX.", "NN/g khuyến nghị khoảng 3–5 người đánh giá, mỗi người làm độc lập trước."],
            ],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[340]}
          rows={[
            {
              icon: "play-circle",
              cells: [
                "Thay thế hoàn toàn test với người dùng",
                "Chuyên gia không phải người dùng; bỏ sót vấn đề liên quan đến bối cảnh và kiến thức người dùng.",
                "Usability testing.",
              ],
            },
            { icon: "book", cells: ["Lĩnh vực chuyên môn sâu (y tế, tài chính phức tạp)", "Người đánh giá thiếu kiến thức lĩnh vực.", "Kết hợp chuyên gia lĩnh vực; test với người dùng."] },
            { icon: "users", cells: ["Chỉ có một người đánh giá", "Một người bỏ sót nhiều vấn đề.", "Tối thiểu ba người."] },
            { icon: "binoculars", cells: ["Cần hiểu nhu cầu người dùng", "Phương pháp chỉ đánh giá giao diện.", "Nghiên cứu khám phá."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định phạm vi và bộ nguyên tắc.", "Màn hình, luồng, nhóm người dùng mục tiêu.", "Phạm vi đánh giá, bộ nguyên tắc."],
            ["Chọn người đánh giá.", "", "3–5 người đánh giá."],
            ["Đánh giá độc lập.", "Theo NN/g, mỗi người tự đánh giá khoảng 1–2 giờ trước khi cả nhóm gộp kết quả.", "Danh sách vấn đề của từng người, kèm nguyên tắc bị vi phạm."],
            ["Gộp danh sách.", "Loại trùng lặp, thống nhất mô tả.", "Danh sách vấn đề chung."],
            ["Xếp mức độ nghiêm trọng.", "Mỗi người xếp riêng, rồi lấy trung bình.", "Vấn đề có mức độ trung bình."],
            ["Đề xuất cách sửa và báo cáo.", "", "Báo cáo có ưu tiên, ảnh chụp màn hình, đề xuất."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật. Ba người đánh giá (A, B, C) rà soát luồng đặt lịch tư vấn.</Callout>
        <Subhead icon="users">Bước 1: Mỗi người tìm được bao nhiêu phần</Subhead>
        <P>Sau khi gộp và loại trùng, có 15 vấn đề khác nhau.</P>
        <Formula label="Tỷ lệ tìm được" formula="Số vấn đề một người tìm được ÷ Tổng số vấn đề khác nhau" note="A: 9 ÷ 15 = 60%. B: 7 ÷ 15 ≈ 47%. C: 8 ÷ 15 ≈ 53%." />
        <Coverage />
        <Callout tone="note" title="Ý nghĩa">
          Trong nghiên cứu gốc năm 1990, Nielsen và Molich ghi nhận mỗi người đánh giá chỉ tìm được khoảng 20–51% vấn đề.
        </Callout>

        <Subhead icon="gauge">Bước 2: Mức độ nghiêm trọng trung bình</Subhead>
        <P>Nielsen lưu ý điểm của một người đánh giá không đáng tin; lấy trung bình của khoảng ba người thường là đủ.</P>
        <Formula label="Mức độ trung bình" formula="Tổng điểm của các người đánh giá ÷ Số người đánh giá" />
        <Table
          head={["Vấn đề", "A", "B", "C", "Trung bình"]}
          widths={[420, 80, 80, 80]}
          rows={[
            { highlight: true, cells: ["Không báo đang xử lý khi bấm “Xác nhận”", "3", "4", "3", "(3 + 4 + 3) ÷ 3 ≈ 3,3"] },
            { cells: ["Nhãn “buổi tư vấn” / “cuộc hẹn” không nhất quán", "2", "1", "2", "(2 + 1 + 2) ÷ 3 ≈ 1,7"] },
          ]}
        />

        <Subhead icon="split">Bước 3: Quyết định</Subhead>
        <Table
          head={["Kết quả", "Quyết định"]}
          widths={[460]}
          rows={[
            { icon: "alert", cells: ["Vấn đề có mức trung bình từ 3 trở lên", "Sửa trước khi test với người dùng."] },
            { icon: "list", cells: ["Vấn đề mức 1–2", "Đưa vào danh sách cải tiến."] },
          ]}
        />
        <Callout tone="note">
          Ngưỡng “từ 3 trở lên” là quy ước của nhóm trong ví dụ, dựa trên ý nghĩa của thang (3 = lớn, ưu tiên cao); nhóm tự đặt ngưỡng theo tình huống.
        </Callout>
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["users", "Đây là dự đoán của chuyên gia, không phải hành vi thật", "Có vấn đề chuyên gia thấy nhưng người dùng không gặp, và ngược lại."],
            ["book", "Phụ thuộc kinh nghiệm người đánh giá", "Không ai tìm được hết; cần nhiều người đánh giá."],
            ["component", "Thiên về vấn đề bề mặt", "Khó phát hiện vấn đề về nhu cầu hay luồng công việc."],
            ["gauge", "Mức độ nghiêm trọng là ước đoán", "Cần kiểm chứng bằng test với người dùng."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Giao diện hoặc prototype, phạm vi đánh giá.", "Bộ nguyên tắc.", "3–5 người đánh giá.", "Mẫu ghi vấn đề (mô tả, vị trí, nguyên tắc, mức độ)."]}
          outputs={["Danh sách vấn đề đã gộp.", "Mức độ nghiêm trọng trung bình.", "Đề xuất sửa, ưu tiên."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard icon="component" title="Bối cảnh" body="Luồng đặt lịch mới vừa có prototype. Nhóm muốn loại bỏ vấn đề rõ ràng trước buổi usability test tuần sau." />
        <InfoCard
          icon="analytics"
          title="Kết quả (theo phần tính toán ở trên)"
          body="Ba người đánh giá tìm được 15 vấn đề khác nhau. Bốn vấn đề có mức trung bình từ 3 trở lên, trong đó nặng nhất là thiếu phản hồi sau khi bấm “Xác nhận” (vi phạm nguyên tắc 1) và cho chọn giờ đã kín (nguyên tắc 5)."
        />
        <InfoCard
          icon="check-circle"
          tone="fill"
          title="Quyết định"
          body="Sửa bốn vấn đề nặng trước buổi test; buổi test tập trung vào việc khách có hiểu các gói dịch vụ không, điều chuyên gia khó đoán."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Một người đánh giá", "Bỏ sót nhiều vấn đề.", "3–5 người."],
            ["Đánh giá cùng nhau từ đầu", "Ý kiến ảnh hưởng lẫn nhau.", "Độc lập trước, gộp sau."],
            ["Ghi ý kiến cá nhân thay vì vi phạm nguyên tắc", "Khó thuyết phục, khó ưu tiên.", "Mỗi vấn đề gắn với một nguyên tắc."],
            ["Coi là thay thế test với người dùng", "Chuyên gia không phải người dùng.", "Kết hợp với usability test."],
            ["Chỉ liệt kê, không xếp mức độ", "Không biết sửa gì trước.", "Xếp mức độ, lấy trung bình."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Phương pháp", "Ai tham gia", "Dựa trên", "Khi nào chọn"]}
          widths={[260]}
          rows={[
            { icon: "list", highlight: true, cells: ["Heuristic Evaluation", "Chuyên gia.", "Bộ nguyên tắc.", "Rà soát nhanh, chi phí thấp."] },
            { icon: "split", cells: ["Cognitive Walkthrough", "Chuyên gia.", "Đóng vai người dùng mới đi qua từng bước.", "Đánh giá khả năng học khi dùng lần đầu."] },
            { icon: "play-circle", cells: ["Usability Testing", "Người dùng thật.", "Hành vi quan sát được.", "Cần bằng chứng từ người dùng."] },
            { icon: "check-circle", cells: ["Accessibility Audit", "Chuyên gia.", "Tiêu chuẩn WCAG.", "Kiểm tra khả năng truy cập."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Chuẩn bị"
            items={["Phạm vi và bộ nguyên tắc được xác định rõ.", "Có 3–5 người đánh giá.", "Mỗi người đánh giá độc lập trước.", "Mỗi vấn đề gắn với nguyên tắc bị vi phạm."]}
          />
          <ChecklistColumn
            icon="analytics"
            title="Tổng hợp"
            items={["Danh sách đã gộp và loại trùng.", "Mức độ nghiêm trọng là trung bình của nhiều người.", "Có kế hoạch kiểm chứng bằng test với người dùng."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Usability Testing", "Kiểm thử khả năng sử dụng", "Kiểm chứng bằng người dùng thật."],
            ["Moderated Testing", "Kiểm thử có người điều phối", "Hình thức test với người dùng thường chạy sau heuristic evaluation."],
            ["Cognitive Walkthrough", "Đi qua từng bước nhận thức", "Phương pháp chuyên gia khác, tập trung vào khả năng học."],
            ["Accessibility", "Khả năng truy cập", "Rà soát theo tiêu chuẩn riêng."],
            ["Cognitive Load", "Tải nhận thức", "Nhiều nguyên tắc nhằm giảm tải nhận thức."],
            ["High-Fidelity Prototype", "Bản mẫu độ trung thực cao", "Đối tượng thường được đánh giá."],
            ["Low-Fidelity Prototype", "Bản mẫu độ trung thực thấp", "Có thể đánh giá sớm từ wireframe."],
            ["Usability Heuristics", "Nguyên tắc khả năng sử dụng", "Giải thích sâu từng nguyên tắc dùng trong đánh giá."],
          ]}
        />
      </Section>
    </div>
  );
}

export const HEURISTIC_EVALUATION: Article = {
  slug: "heuristic-evaluation",
  version: 1,
  term: "Heuristic Evaluation",
  fn: 5,
  vi: "Đánh giá theo nguyên tắc kinh nghiệm",
  kind: "Phương pháp nghiên cứu / kiểm thử",
  definition:
    "Heuristic evaluation là phương pháp kiểm tra khả năng sử dụng, trong đó một nhóm nhỏ người đánh giá xem xét giao diện và đối chiếu với một bộ nguyên tắc thiết kế đã được công nhận (heuristics) để tìm ra vấn đề.",
  definitionMore: "Bộ phổ biến nhất là 10 nguyên tắc của Jakob Nielsen.",
  oneLine: "Chuyên gia đối chiếu giao diện với bộ nguyên tắc thiết kế để tìm vấn đề khả năng sử dụng.",
  glance: [
    ["10", "Nguyên tắc của Nielsen"],
    ["3–5", "Người đánh giá (NN/g)"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Expert review (gần nghĩa, rộng hơn)"] },
    { label: "Nhóm chính", items: ["Kiểm thử và đánh giá"] },
    { label: "Thẻ phụ", items: ["Nguyên tắc thiết kế"] },
    {
      label: "Lưu ý tên gọi",
      items: ["Chuyên gia đánh giá giao diện theo một bộ nguyên tắc; không có người dùng thật tham gia. Expert review là khái niệm rộng hơn, có thể không theo bộ nguyên tắc cố định."],
    },
  ],
  sections: SECTIONS,
  Body,
};
