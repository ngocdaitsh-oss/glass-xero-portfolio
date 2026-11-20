"use client";

import { Blk, T } from "./edit";
import { CheckCards, Formula, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Moderated Testing — copy from ux-glossary/moderated-testing.md on the Glossary Detail layout (Figma 2011:28710).
   The md merges Moderated Testing and Moderated Usability Testing, so both glossary entries share this article. */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "parts", title: "Thành phần của một buổi moderated test", icon: "component" },
  { id: "vs", title: "Moderated và unmoderated", icon: "split" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
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

const CURVE: [number, number][] = [
  [1, 31],
  [2, 52],
  [3, 67],
  [5, 85],
  [10, 98],
];

/** Share of problems found by N users under the 31%-per-user model; returns shrink after five. */
function ProblemsCurve() {
  return (
    <Blk label="biểu đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="users" size={36} iconSize={18} radius={10} />
        <Eyebrow>Tỷ lệ vấn đề tìm được theo số người</Eyebrow>
      </div>
      <div className="flex flex-col gap-3">
        {CURVE.map(([n, p]) => (
          <div key={n} className="flex items-center gap-5">
            <span className="w-[80px] shrink-0 text-[15px] leading-6 font-semibold">{n} người</span>
            <div className="relative h-9 flex-1 rounded-lg bg-[var(--d-well)]">
              <span className={`absolute inset-y-0 left-0 rounded-lg ${n === 5 ? "bg-[var(--d-ci)]" : "bg-[var(--d-ci-weak)]"}`} style={{ width: `${p}%` }} />
            </div>
            <span className={`w-[56px] shrink-0 text-right font-mono text-[15px] ${n === 5 ? "font-semibold text-[var(--d-accent)]" : ""}`}>{p}%</span>
          </div>
        ))}
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Theo mô hình, với 31% mỗi người. Từ người thứ 5, phần tìm thêm được giảm dần, nên Nielsen khuyên ba lần test, mỗi lần 5 người.
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
            Analytics cho biết người dùng bỏ ở đâu; heatmap cho biết họ click vào đâu. Nhưng cả hai không cho biết vì sao. Khi người dùng do dự trước một nút, chỉ có quan sát và hỏi đúng
            lúc mới hiểu được họ đang nghĩ gì.
          </P>
          <P strong>Moderated testing cho phép quan sát trực tiếp và hỏi thêm ngay khi điều gì đó xảy ra.</P>
          <P>
            Theo Nielsen, think-aloud cho thấy người dùng thật sự nghĩ gì về thiết kế, vì sao họ hiểu sai, và điều gì khiến một phần trở nên dễ dùng. Phương pháp này cũng rẻ và linh hoạt:
            dùng được với bản phác thảo giấy lẫn sản phẩm đang chạy.
          </P>
        </div>
        <Eyebrow>Moderated testing hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          cols={3}
          minH={150}
          items={[
            ["alert", "Vấn đề khả năng sử dụng nào cần sửa", "Và vì sao chúng xảy ra."],
            ["check-circle", "Thiết kế có giúp người dùng hoàn thành tác vụ không", "Quan sát hành vi thật."],
            ["list", "Ưu tiên sửa", "Theo mức độ nghiêm trọng."],
          ]}
        />
      </Section>

      <Section {...S.parts}>
        <Table
          head={["Thành phần", "Mô tả", "Ví dụ minh họa (giả định)"]}
          widths={[240]}
          rows={[
            { icon: "users", highlight: true, cells: ["Người điều phối", "Giao tác vụ, quan sát, hỏi thêm; giữ trung lập.", "Người nghiên cứu UX."] },
            { icon: "users", cells: ["Người tham gia", "Đại diện cho người dùng mục tiêu.", "5 khách đang cân nhắc dịch vụ tư vấn."] },
            { icon: "file", cells: ["Kịch bản tác vụ", "Mục tiêu thật, viết bằng lời người dùng.", "“Bạn muốn hẹn một buổi nói chuyện với chuyên gia vào cuối tuần này.”"] },
            { icon: "chat", cells: ["Think-aloud", "Người tham gia nói to suy nghĩ trong lúc làm.", "“Tôi đang tìm chỗ xem giá… chắc ở đây.”"] },
            { icon: "list-search", cells: ["Câu hỏi sau tác vụ", "Hỏi về khó khăn, cảm nhận.", "“Phần nào làm bạn phân vân nhất?”"] },
            { icon: "eye", cells: ["Người quan sát, ghi chép", "Ghi lại hành vi và lời nói.", "Một người ghi chép, nhóm thiết kế xem trực tiếp."] },
          ]}
        />
      </Section>

      <Section {...S.vs}>
        <Table
          head={["", "Moderated", "Unmoderated"]}
          widths={[180]}
          rows={[
            {
              icon: "play-circle",
              cells: ["Cách làm", "Người điều phối và người tham gia cùng lúc, trực tiếp hoặc từ xa.", "Người tham gia tự làm một mình, theo lịch của họ; phiên được ghi lại."],
            },
            { icon: "check-circle", cells: ["Ưu điểm", "Hỏi thêm ngay; hỗ trợ khi bị kẹt; hiểu sâu vì sao.", "Chạy nhiều phiên cùng lúc; nhanh khi thời gian gấp."] },
            {
              icon: "alert",
              cells: [
                "Hạn chế",
                "Mỗi phiên tốn thời gian của người điều phối; khó biết khi nào nên ngắt lời người tham gia đang im lặng.",
                "Không hỏi thêm được; không hỗ trợ khi kẹt; chỉ biết phiên tốt hay không sau khi kết thúc; người ít nói khó think-aloud.",
              ],
            },
            { icon: "target", cells: ["Phù hợp khi", "Cần hiểu sâu, tác vụ phức tạp, giai đoạn sớm.", "NN/g gợi ý: nghiên cứu tập trung vào vài phần cụ thể."] },
          ]}
        />
        <Callout tone="note" title="Tại chỗ hay từ xa">
          NN/g gợi ý test trực tiếp khi có thể; moderated test từ xa thường rẻ, nhanh và tiện hơn, hạn chế chính là phải chuẩn bị kỹ thuật trước. Test từ xa vẫn tốt hơn là không test.
        </Callout>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "target",
              "Bối cảnh phù hợp",
              [
                "Cần hiểu vì sao người dùng gặp khó.",
                "Tác vụ phức tạp, nhiều bước.",
                "Bản mẫu chưa hoàn chỉnh, cần người điều phối hỗ trợ.",
                "Muốn nhóm thiết kế xem trực tiếp để cùng hiểu vấn đề.",
              ],
            ],
            ["eye", "Dấu hiệu nhận biết", ["Dữ liệu cho thấy người dùng bỏ ở một bước nhưng không rõ vì sao.", "Thiết kế mới chưa được ai ngoài nhóm thử."]],
            ["clipboard-check", "Điều kiện cần", ["Người điều phối được luyện để không dẫn dắt.", "Người tham gia đúng nhóm người dùng mục tiêu."]],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[360]}
          rows={[
            { icon: "bar-chart", cells: ["Cần số liệu với nhiều người", "Mỗi phiên tốn thời gian; ít người.", "Unmoderated test, A/B testing."] },
            { icon: "target", cells: ["Câu hỏi hẹp, rõ ràng (một nút, một nhãn)", "Không cần điều phối.", "Unmoderated test, first-click testing."] },
            { icon: "lightbulb", cells: ["Cần hiểu nhu cầu, chưa có thiết kế", "Usability test cần thứ để thử.", "Phỏng vấn, field study."] },
            { icon: "users", cells: ["Cần biết thái độ của nhiều người", "Ít người, định tính.", "Khảo sát."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định mục tiêu và tác vụ.", "", "Câu hỏi nghiên cứu, kịch bản tác vụ."],
            ["Tuyển người tham gia.", "", "Lịch phiên."],
            ["Chạy thử một phiên.", "Kiểm tra tác vụ, thời lượng, công cụ (đặc biệt khi test từ xa).", "Kịch bản đã chỉnh."],
            ["Chạy phiên.", "Giới thiệu, giải thích think-aloud, giao tác vụ, quan sát, hỏi thêm sau khi người tham gia làm xong.", "Ghi âm, ghi hình, ghi chép."],
            ["Tổng hợp ngay sau mỗi phiên.", "", "Danh sách vấn đề từng phiên."],
            ["Phân tích và ưu tiên.", "Gộp vấn đề, xếp mức độ nghiêm trọng, tính chỉ số tác vụ.", "Báo cáo, đề xuất sửa."],
            ["Sửa và test lại.", "", "Thiết kế đã cải thiện."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <Subhead icon="users">Số người tham gia cho test định tính</Subhead>
        <P>
          Nielsen (2000), dựa trên mô hình của Nielsen và Landauer (1993), cho rằng một người dùng tìm được trung bình khoảng 31% vấn đề, và 5 người tìm được khoảng 85%. Phần tìm thêm được
          giảm dần khi thêm người.
        </P>
        <ProblemsCurve />
        <Callout tone="note" title="Điều kiện">
          Con số 31% là trung bình từ các dự án trong nghiên cứu gốc; dự án của bạn có thể khác. Bảng này dành cho test định tính để tìm vấn đề, không áp dụng khi cần đo chỉ số chính xác.
        </Callout>

        <Subhead icon="check-circle">Tỷ lệ hoàn thành tác vụ</Subhead>
        <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật. 5 người làm tác vụ “Đặt lịch tư vấn vào cuối tuần này”.</Callout>
        <Formula label="Tỷ lệ hoàn thành" formula="Số người hoàn thành ÷ Số người tham gia" note="3 ÷ 5 = 60%" />
        <P>Với 5 người, khoảng tin cậy rất rộng. Cộng thêm 2 người hoàn thành và 2 người không hoàn thành để có kết quả điều chỉnh:</P>
        <Formula label="Kết quả điều chỉnh" formula="(Số người hoàn thành + 2) ÷ (Số người + 4)" note="(3 + 2) ÷ (5 + 4) = 5 ÷ 9 ≈ 55,6%" />
        <Table
          head={["Nhập vào công cụ tính khoảng tin cậy cho tỷ lệ", "Sai số", "Khoảng tin cậy 95%"]}
          widths={[420]}
          rows={[{ highlight: true, cells: ["3 hoàn thành trên 5 người", "≈ 33 điểm", "Khoảng 23% – 88%"] }]}
        />
        <Callout tone="note" title="Diễn giải">
          Với 5 người, con số chỉ cho biết có vấn đề, không cho biết chính xác bao nhiêu người sẽ gặp. Giá trị chính của test là hiểu vì sao 2 người không hoàn thành.
        </Callout>
        <P>
          Thành công một phần: NN/g gợi ý có thể chia mức (thành công hoàn toàn, thành công với vấn đề nhỏ, thành công với vấn đề lớn, thất bại) và báo cáo tỷ lệ của từng mức. Không gán
          điểm cho các mức rồi lấy trung bình.
        </P>

        <Subhead icon="hourglass">Thời gian hoàn thành</Subhead>
        <Formula
          label="Thời gian trung bình"
          formula="Tổng thời gian của người hoàn thành ÷ Số người hoàn thành"
          note="Ba người hoàn thành trong 95, 130 và 80 giây → (95 + 130 + 80) ÷ 3 = 305 ÷ 3 ≈ 102 giây"
        />
        <P>Chỉ tính người hoàn thành, vì thời gian của người bỏ cuộc không cho biết họ cần bao lâu để xong.</P>
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["users", "Ít người → không đo chỉ số chính xác", "Dùng để tìm và hiểu vấn đề."],
            ["eye", "Môi trường test khác đời thật", "Người tham gia biết mình được quan sát."],
            ["chat", "Think-aloud không tự nhiên", "Người tham gia có thể lọc lời nói; theo Nielsen, cách hỏi của người điều phối chưa được luyện có thể làm lệch hành vi."],
            ["file", "Phụ thuộc vào tác vụ", "Tác vụ không thực tế cho kết quả sai."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Câu hỏi nghiên cứu, kịch bản tác vụ.", "Bản mẫu hoặc sản phẩm.", "Người tham gia, người điều phối, người ghi chép.", "Công cụ ghi hình (và gọi video nếu từ xa)."]}
          outputs={["Danh sách vấn đề có mức độ nghiêm trọng.", "Tỷ lệ hoàn thành, thời gian (kèm giới hạn).", "Trích dẫn và đoạn video tiêu biểu.", "Đề xuất sửa."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard icon="component" title="Bối cảnh" body="Luồng đặt lịch mới đã qua heuristic evaluation. Nhóm chạy moderated test từ xa với 5 khách." />
        <InfoCard
          icon="analytics"
          title="Kết quả (theo phần tính toán ở trên)"
          body="3/5 hoàn thành. Hai người không hoàn thành đều nghĩ rằng chọn giờ là đã đặt xong (mental model lệch), nên đóng trang trước khi xác nhận. Một người hoàn thành nói: “Tôi tưởng xong rồi, may mà thấy nút Xác nhận ở dưới.”"
        />
        <InfoCard
          tone="fill"
          icon="check-circle"
          title="Quyết định"
          body="Thêm thông báo giữ chỗ tạm và đưa nút Xác nhận lên gần phần chọn giờ; test lại với 5 người khác."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Người điều phối gợi ý cách làm", "Hành vi không còn thật.", "Chỉ hỏi, không hướng dẫn; hỏi lại bằng câu của người tham gia."],
            ["Hỏi “Bạn có thích không?”", "Thu ý kiến, không thu hành vi.", "Quan sát họ làm; hỏi về khó khăn cụ thể."],
            ["Báo cáo tỷ lệ từ 5 người như số chính xác", "Khoảng tin cậy rất rộng.", "Kèm khoảng tin cậy; tập trung vào vấn đề."],
            ["Một lần test lớn rồi thôi", "Không kiểm tra được bản sửa.", "Nhiều lần test nhỏ, sửa giữa các lần."],
            ["Không chạy thử", "Tác vụ khó hiểu, công cụ lỗi.", "Chạy thử một phiên trước."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Phương pháp", "Người điều phối", "Khi nào chọn"]}
          widths={[260]}
          rows={[
            { icon: "users", highlight: true, cells: ["Moderated Testing", "Có, cùng lúc.", "Hiểu sâu vì sao."] },
            { icon: "play-circle", cells: ["Unmoderated Testing", "Không.", "Nhanh, nhiều người, câu hỏi hẹp."] },
            { icon: "clipboard-check", cells: ["Heuristic Evaluation", "Không có người dùng; chuyên gia đánh giá.", "Rà soát nhanh trước test."] },
            { icon: "binoculars", cells: ["Contextual Inquiry", "Có, trong môi trường thật của người dùng.", "Hiểu công việc thật, chưa cần thiết kế."] },
            { icon: "chat", cells: ["Focus Group", "Có, nhưng thảo luận nhóm.", "Thái độ, nhu cầu; không đo độ dễ dùng."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn icon="file" title="Chuẩn bị" items={["Tác vụ là mục tiêu thật, viết bằng lời người dùng.", "Người tham gia đúng nhóm mục tiêu.", "Đã chạy thử một phiên."]} />
          <ChecklistColumn
            icon="eye"
            title="Trong phiên"
            items={["Giải thích think-aloud và nhắc khi người tham gia im lặng.", "Không gợi ý cách làm.", "Hỏi thêm sau khi người tham gia làm xong tác vụ."]}
          />
          <ChecklistColumn icon="analytics" title="Sau phiên" items={["Tổng hợp ngay.", "Báo cáo tỷ lệ kèm khoảng tin cậy và giới hạn.", "Có kế hoạch test lại sau khi sửa."]} />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Usability Testing", "Kiểm thử khả năng sử dụng", "Khái niệm chung; moderated là một hình thức."],
            ["Unmoderated Testing", "Kiểm thử không có người điều phối", "Hình thức đối lập."],
            ["Remote Testing", "Kiểm thử từ xa", "Moderated test có thể chạy từ xa."],
            ["Think-Aloud Protocol", "Phương pháp nói to suy nghĩ", "Kỹ thuật thường dùng trong phiên."],
            ["Heuristic Evaluation", "Đánh giá theo nguyên tắc kinh nghiệm", "Rà soát trước khi test."],
            ["Mental Model", "Mô hình tư duy", "Think-aloud giúp lộ ra mental model."],
            ["Confidence Intervals", "Khoảng tin cậy", "Đọc tỷ lệ hoàn thành với ít người."],
            ["High-Fidelity Prototype", "Bản mẫu độ trung thực cao", "Đối tượng test thường gặp."],
            ["Task Scenario", "Kịch bản tác vụ", "Lời giao việc người điều phối đọc cho người tham gia."],
            ["Wizard of Oz", "Phương pháp “phù thủy xứ Oz”", "Dạng kiểm thử có điều phối, có thêm người đóng vai hệ thống."],
          ]}
        />
      </Section>
    </div>
  );
}

export const MODERATED_TESTING: Article = {
  slug: "moderated-testing",
  version: 1,
  term: "Moderated Testing",
  fn: 5,
  vi: "Kiểm thử có người điều phối",
  kind: "Phương pháp nghiên cứu / kiểm thử",
  definition:
    "Moderated testing là hình thức usability test trong đó người điều phối có mặt cùng lúc với người tham gia (trực tiếp hoặc qua cuộc gọi video), giao tác vụ, quan sát người tham gia làm, và hỏi thêm khi cần để hiểu vì sao họ hành động như vậy.",
  definitionMore: "Thường kết hợp với think-aloud: người tham gia nói to suy nghĩ của mình trong lúc làm.",
  oneLine: "Usability test có người điều phối cùng lúc, quan sát và hỏi thêm để hiểu vì sao.",
  glance: [
    ["85%", "Vấn đề 5 người tìm được (theo mô hình)"],
    ["3/5", "Hoàn thành tác vụ trong ví dụ"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Facilitated usability test", "Moderated usability study"] },
    { label: "Nhóm chính", items: ["Kiểm thử và đánh giá"] },
    { label: "Thẻ phụ", items: ["Nghiên cứu định tính"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "Bài này gộp Moderated Testing và Moderated Usability Testing vì cùng một khái niệm: usability test có người điều phối tham gia cùng lúc với người dùng, tại chỗ hoặc từ xa. Đối lập là unmoderated testing: người dùng tự làm một mình.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};

/** Same concept, listed separately in the glossary; shares the article above. */
export const MODERATED_USABILITY_TESTING: Article = {
  ...MODERATED_TESTING,
  slug: "moderated-usability-testing",
  term: "Moderated Usability Testing",
};
