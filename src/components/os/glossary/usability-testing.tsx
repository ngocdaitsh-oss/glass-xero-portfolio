"use client";

import { Blk, T } from "./edit";
import { CheckCards, Formula, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Usability Testing — copy from ux-glossary/usability-testing.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "parts", title: "Ba thành phần cốt lõi", icon: "component" },
  { id: "types", title: "Các dạng usability testing", icon: "split" },
  { id: "when", title: "Khi nào nên dùng / chưa phù hợp", icon: "check-circle" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "maths", title: "Công thức và ví dụ tính", icon: "sigma" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** Share of problems found by n users under the 31%-per-user model: 1 − 0.69^n. */
const CURVE = Array.from({ length: 15 }, (_, i) => 100 * (1 - Math.pow(0.69, i + 1)));

function CurveChart() {
  return (
    <Blk label="biểu đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="bar-chart" size={36} iconSize={18} radius={10} />
        <Eyebrow>Tỷ lệ vấn đề tìm được theo số người (mô hình 31%)</Eyebrow>
      </div>
      <div className="flex h-[240px] items-end gap-2">
        {CURVE.map((v, i) => (
          <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
            {(i === 0 || i === 4 || i === 9 || i === 14) && <span className="font-mono text-[13px] font-semibold">{v.toFixed(1).replace(".", ",")}%</span>}
            <div className={`w-full rounded-t-md ${i === 4 ? "bg-[var(--d-fill)]" : i < 4 ? "bg-[var(--d-ci)]" : "bg-[var(--d-soft)]"}`} style={{ height: `${v * 0.8}%` }} />
          </div>
        ))}
      </div>
      <div className="flex gap-2 font-mono text-[13px] text-[var(--w-muted)]">
        {CURVE.map((_, i) => (
          <span key={i} className="flex-1 text-center">
            {i + 1}
          </span>
        ))}
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Số người tham gia ở trục ngang. Sau khoảng 5 người, mỗi người thêm vào tìm được rất ít vấn đề mới, nên chạy nhiều vòng nhỏ thay vì một vòng lớn.
      </T>
    </Blk>
  );
}

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Section {...S.problem}>
        <P>
          Người làm ra sản phẩm hiểu sản phẩm quá rõ, nên khó thấy chỗ người mới bị vướng. Hỏi người dùng “bạn có thấy dễ dùng không” thường cho câu trả lời lịch sự, không phản ánh hành vi. Cách
          đáng tin nhất là xem người dùng thật sự dùng.
        </P>
        <P>Theo Moran (2019), thiết kế lặp lại dựa trên việc quan sát người dùng thật là cách đáng tin cậy để làm đúng trải nghiệm.</P>
        <CheckCards
          groups={[
            ["check-circle", "Usability testing giúp", ["Tìm vấn đề trong thiết kế.", "Phát hiện cơ hội cải thiện.", "Hiểu hành vi và sở thích của người dùng mục tiêu."]],
          ]}
        />
      </Section>

      <Section {...S.parts}>
        <InfoGrid
          items={[
            ["chat", "Người điều phối (facilitator)", "Hướng dẫn, đặt câu hỏi thêm. Cố gắng không ảnh hưởng tới hành vi người tham gia."],
            ["file", "Tác vụ (tasks)", "Việc thực tế người tham gia cần làm. Cách viết rất quan trọng; một chữ sai có thể gợi ý hoặc dẫn dắt (xem Task Scenario)."],
            ["users", "Người tham gia (participant)", "Người dùng thật hoặc có bối cảnh, nhu cầu tương tự. Thường được yêu cầu nói to suy nghĩ (think-aloud)."],
          ]}
        />
      </Section>

      <Section {...S.types}>
        <Table
          head={["Dạng", "Mô tả", "Phù hợp khi"]}
          widths={[280]}
          rows={[
            { icon: "chat", highlight: true, cells: ["Định tính (qualitative)", "Thu thông tin, câu chuyện để tìm vấn đề. Phổ biến hơn.", "Tìm và hiểu vấn đề."] },
            { icon: "bar-chart", cells: ["Định lượng (quantitative)", "Thu chỉ số như tỷ lệ thành công, thời gian.", "Đo đối chuẩn (benchmark), so sánh."] },
            { icon: "users", cells: ["Trực tiếp, có điều phối", "Người điều phối và người tham gia ở cùng chỗ.", "Cần quan sát kỹ, hỏi sâu."] },
            { icon: "eye", cells: ["Từ xa, có điều phối", "Hai bên ở hai nơi, thường qua chia sẻ màn hình.", "Người tham gia ở xa."] },
            { icon: "play-circle", cells: ["Từ xa, không điều phối", "Công cụ trực tuyến gửi tác vụ dạng chữ; người tham gia tự làm; nhóm nhận bản ghi và chỉ số.", "Cần nhanh, nhiều người."] },
          ]}
        />
        <P>
          Theo Moran (2019), một nghiên cứu định tính đơn giản có thể khá rẻ; chi phí tăng khi có nhiều nhóm người dùng, nghiên cứu định lượng, so sánh với đối thủ, test ở nhiều quốc gia hoặc dùng
          eye tracking.
        </P>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "check-circle",
              "Nên dùng khi",
              [
                "Có bất kỳ thứ gì để thử: bản vẽ giấy, prototype, sản phẩm thật, sản phẩm đối thủ.",
                "Muốn biết người dùng có hoàn thành được tác vụ quan trọng không.",
                "Trước khi ra mắt, và lặp lại sau mỗi vòng sửa.",
              ],
            ],
          ]}
        />
        <Table
          head={["Chưa phù hợp khi", "Thay bằng"]}
          widths={[460]}
          rows={[
            { icon: "list-search", cells: ["Chưa biết người dùng cần gì", "Phỏng vấn, contextual inquiry, field study."] },
            { icon: "chat", cells: ["Cần biết người dùng nghĩ gì về giá, thương hiệu", "Survey, phỏng vấn."] },
            { icon: "hourglass", cells: ["Cần hành vi tự nhiên lâu dài", "Diary study, phân tích dữ liệu sản phẩm."] },
            { icon: "list", cells: ["Chỉ cần kiểm tra cấu trúc menu", "Tree testing."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định mục tiêu", "Cần biết điều gì, về phần nào của sản phẩm.", "Câu hỏi nghiên cứu."],
            ["Chọn dạng test", "Định tính hay định lượng, trực tiếp hay từ xa, có điều phối hay không.", "Kế hoạch test."],
            ["Viết task scenario", "Thực tế, không gợi ý.", "Bộ kịch bản."],
            ["Tuyển người tham gia", "Đại diện cho người dùng mục tiêu.", "Danh sách người tham gia."],
            ["Chạy thử (pilot)", "Với một người.", "Kịch bản và kế hoạch đã sửa."],
            ["Chạy test", "Quan sát, ghi chép; không dẫn dắt.", "Ghi chép, bản ghi."],
            ["Phân tích", "Gom vấn đề, xếp mức độ nghiêm trọng.", "Danh sách vấn đề ưu tiên."],
            ["Sửa và test lại", "", "Thiết kế cải thiện qua từng vòng."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật.</Callout>
        <Subhead icon="users">Bao nhiêu người là đủ cho test định tính?</Subhead>
        <P>
          Nielsen (2000), dựa trên mô hình của Nielsen & Landauer (1993), cho rằng mỗi người tham gia tìm được trung bình khoảng 31% số vấn đề. Mô hình giả định mỗi người mới tìm thêm 31% số vấn đề
          còn lại chưa ai tìm ra:
        </P>
        <Formula
          label="Vấn đề tìm thêm"
          formula="31% × Phần còn lại chưa tìm ra"
          note="Người 1: 31%, còn 69%. Người 2: 31% × 69% ≈ 21,4% → tổng ≈ 52,4%, còn ≈ 47,6%. Người 3: 31% × 47,6% ≈ 14,8% → tổng ≈ 67,1%."
        />
        <Table
          head={["Số người", "Tỷ lệ vấn đề tìm được (theo mô hình)"]}
          widths={[260]}
          rows={[
            { cells: ["1", "31,0%"] },
            { cells: ["2", "52,4%"] },
            { cells: ["3", "67,1%"] },
            { cells: ["4", "77,3%"] },
            { highlight: true, cells: ["5", "84,4%"] },
            { cells: ["10", "97,6%"] },
            { cells: ["15", "99,6%"] },
          ]}
        />
        <CurveChart />
        <P>
          Mỗi người thêm vào tìm được ít vấn đề mới hơn người trước. Vì vậy Nielsen khuyên chạy nhiều vòng nhỏ khoảng 5 người, sửa rồi test lại, thay vì một vòng lớn: ba vòng 5 người tốt hơn một
          vòng 15 người, vì bản sửa có thể chưa đúng và vòng sau còn tìm ra vấn đề sâu hơn.
        </P>
        <InfoGrid
          items={[
            ["analytics", "31% là trung bình", "Từ các dự án Nielsen nghiên cứu; sản phẩm của bạn có thể khác."],
            ["users", "Một nhóm người dùng", "Nếu có nhiều nhóm khác nhau, Nielsen gợi ý mỗi nhóm 3–4 người (hai nhóm) hoặc 3 người (ba nhóm trở lên)."],
            ["bar-chart", "Không áp dụng cho test định lượng", "Nielsen gợi ý khoảng 20 người khi cần chỉ số."],
          ]}
        />
        <Subhead icon="alert">Vì sao 5 người không đủ cho con số</Subhead>
        <Formula label="Tỷ lệ thành công" formula="Số người hoàn thành ÷ Tổng số người" note="5 người, 4 người hoàn thành → 4 ÷ 5 = 80%" />
        <Table
          head={["Nhập vào công cụ", "Kết quả"]}
          widths={[360]}
          rows={[{ highlight: true, cells: ["4 thành công trên 5 người", "Khoảng tin cậy 95%: 36,0% – 98,0%"] }]}
        />
        <InfoCard
          tone="fill"
          icon="alert"
          title="Đọc kết quả"
          body="Khoảng tin cậy rộng hơn 60 điểm: tỷ lệ thật có thể chỉ khoảng một phần ba, cũng có thể gần như tất cả. Với test định tính, báo cáo vấn đề tìm được, không báo “80% thành công” như một con số chắc chắn."
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["eye", "Biết mình đang bị quan sát", "Người tham gia làm việc được giao, nên hành vi có thể khác đời thật."],
            ["chat", "Định tính không cho tỷ lệ", "Test định tính cho biết vấn đề có tồn tại, không cho biết bao nhiêu phần trăm người dùng gặp."],
            ["target", "Phạm vi hẹp", "Kết quả chỉ áp dụng cho những tác vụ đã test và nhóm người dùng đã tuyển."],
            ["users", "“5 người” là trung bình", "Không bảo đảm tìm đủ 85% vấn đề trong mọi trường hợp."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Câu hỏi nghiên cứu.", "Thứ để test (prototype, sản phẩm).", "Bộ task scenario.", "Người tham gia đại diện.", "Cách ghi lại (được người tham gia đồng ý)."]}
          outputs={["Danh sách vấn đề kèm mức độ nghiêm trọng và bằng chứng.", "Đề xuất sửa.", "(Test định lượng) chỉ số kèm khoảng tin cậy."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard icon="component" title="Bối cảnh" body="Nhóm thiết kế lại luồng đặt lịch và test bằng prototype." />
        <Table
          head={["Vòng", "Phát hiện", "Sửa"]}
          widths={[260]}
          rows={[
            {
              cells: [
                "Vòng 1 (5 người, trực tiếp, think-aloud)",
                "3 người không thấy giá gói Chuyên sâu, nên tránh gói này. 2 người không biết đã đặt xong hay chưa vì thiếu màn hình xác nhận.",
                "Hiện giá mọi gói; thêm màn hình xác nhận có tóm tắt.",
              ],
            },
            { cells: ["Vòng 2 (5 người mới)", "Hai vấn đề trên không còn; phát hiện vấn đề mới: người dùng không biết cần mang giấy tờ gì.", "Thêm danh sách giấy tờ."] },
            { highlight: true, cells: ["Vòng 3", "Không còn vấn đề nghiêm trọng trong các tác vụ đã test.", "—"] },
          ]}
        />
        <Callout tone="note" icon="briefcase">
          Số liệu minh họa. Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Dẫn dắt người tham gia", "Thay đổi hành vi, kết quả sai.", "Giữ im lặng, hỏi trung tính."],
            ["Kịch bản chứa chữ trên giao diện", "Người tham gia chỉ tìm chữ.", "Viết task scenario đúng cách."],
            ["Báo tỷ lệ từ 5 người như số liệu chắc chắn", "Khoảng tin cậy rất rộng.", "Báo vấn đề; cần số thì làm test định lượng."],
            ["Test một lần rồi thôi", "Bản sửa có thể chưa đúng.", "Test lặp lại sau mỗi vòng sửa."],
            ["Tuyển sai người", "Vấn đề không đại diện.", "Sàng lọc theo người dùng mục tiêu."],
            ["Hỏi ý kiến thay vì quan sát", "Lời nói khác hành động.", "Ưu tiên hành vi."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Khác ở đâu"]}
          widths={[300]}
          rows={[
            { icon: "users", highlight: true, cells: ["Usability Testing", "Người dùng thật làm tác vụ; nhóm quan sát."] },
            { icon: "list-search", cells: ["Heuristic Evaluation", "Chuyên gia rà soát theo nguyên tắc, không có người dùng."] },
            { icon: "split", cells: ["A/B Testing", "So sánh hai phiên bản trên sản phẩm thật bằng số liệu, không quan sát trực tiếp."] },
            { icon: "chat", cells: ["User interview", "Trò chuyện, không làm tác vụ trên giao diện."] },
            { icon: "users", cells: ["Focus Group", "Thảo luận nhóm về ý kiến, không quan sát cá nhân dùng sản phẩm."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Chuẩn bị"
            items={["Có câu hỏi nghiên cứu rõ.", "Đã chọn dạng test phù hợp.", "Kịch bản thực tế, không gợi ý.", "Người tham gia đại diện cho người dùng mục tiêu.", "Đã chạy thử."]}
          />
          <ChecklistColumn icon="eye" title="Trong buổi" items={["Không dẫn dắt.", "Ghi lại cả lời nói và hành vi."]} />
          <ChecklistColumn
            icon="analytics"
            title="Sau buổi"
            items={["Vấn đề có mức độ nghiêm trọng và bằng chứng.", "Không báo tỷ lệ từ mẫu nhỏ như số liệu chắc chắn.", "Có kế hoạch sửa và test lại."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Moderated Testing", "Kiểm thử có người điều phối", "Một dạng usability testing."],
            ["Remote Testing", "Kiểm thử từ xa", "Một dạng usability testing."],
            ["Task Scenario", "Kịch bản tác vụ", "Việc giao cho người tham gia."],
            ["Think-Aloud Protocol", "Nói to suy nghĩ", "Kỹ thuật thường dùng trong buổi test."],
            ["Heuristic Evaluation", "Đánh giá theo nguyên tắc kinh nghiệm", "Rà soát chuyên gia, bổ sung cho test."],
            ["UX Metrics", "Chỉ số UX", "Chỉ số đo trong test định lượng."],
          ]}
        />
      </Section>
    </div>
  );
}

export const USABILITY_TESTING: Article = {
  slug: "usability-testing",
  version: 1,
  term: "Usability Testing",
  fn: 5,
  vi: "Kiểm thử khả năng sử dụng",
  kind: "Phương pháp kiểm thử",
  definition:
    "Usability testing là phương pháp nghiên cứu trong đó người tham gia đại diện cho người dùng thật thực hiện các tác vụ trên một giao diện, trong khi nhóm nghiên cứu quan sát hành vi và lắng nghe phản hồi.",
  definitionMore: "Mục đích là tìm vấn đề, phát hiện cơ hội và hiểu hành vi của người dùng mục tiêu.",
  oneLine: "Quan sát người dùng thật làm tác vụ trên giao diện để tìm vấn đề và cơ hội cải thiện.",
  glance: [
    ["~5", "Người mỗi vòng định tính"],
    ["84,4%", "Vấn đề tìm được với 5 người (mô hình)"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["User testing"] },
    { label: "Nhóm chính", items: ["Kiểm thử khả năng sử dụng"] },
    { label: "Thẻ phụ", items: ["Nghiên cứu định tính"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "“Usability testing” là tên chung. Các biến thể có bài riêng: Moderated Testing (có người điều phối), Remote Testing (từ xa). Kỹ thuật thường dùng trong buổi test: Think-Aloud Protocol.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
