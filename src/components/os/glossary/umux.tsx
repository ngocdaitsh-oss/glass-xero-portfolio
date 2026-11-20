"use client";

import { Blk, T } from "./edit";
import { CheckCards, Formula, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* UMUX — copy from ux-glossary/umux.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "items", title: "Các câu hỏi của UMUX và UMUX-LITE", icon: "list" },
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

const SCORES = [79.2, 66.7, 87.5, 70.8, 58.3, 83.3, 75, 62.5, 91.7, 70.8, 66.7, 79.2];
/** Axis runs 50–100 so the spread of 12 scores is readable. */
const pos = (v: number) => `${((v - 50) / 50) * 100}%`;

/** 12 individual UMUX scores, their mean and 95% CI against the 70 bar. */
function ScoreChart() {
  return (
    <Blk label="biểu đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="bar-chart" size={36} iconSize={18} radius={10} />
        <Eyebrow>12 điểm UMUX, trung bình và khoảng tin cậy</Eyebrow>
      </div>
      <div className="flex flex-col gap-3">
        <div className="relative h-16 rounded-lg bg-[var(--d-well)]">
          <span className="absolute -inset-y-1 w-0.5 bg-[var(--d-bad)]" style={{ left: pos(70) }} />
          {SCORES.map((s, i) => (
            <span
              key={i}
              className="absolute size-3.5 -translate-x-1/2 rounded-full bg-[var(--d-ci)]"
              style={{ left: pos(s), top: i % 2 ? "18%" : "56%" }}
            />
          ))}
        </div>
        <div className="relative h-10 rounded-lg bg-[var(--d-well)]">
          <span className="absolute -inset-y-1 w-0.5 bg-[var(--d-bad)]" style={{ left: pos(70) }} />
          <span className="absolute top-1/2 h-4 -translate-y-1/2 rounded-full bg-[var(--d-ci)]" style={{ left: pos(67.8), width: `${((80.8 - 67.8) / 50) * 100}%` }} />
          <span className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--d-accent)]" style={{ left: pos(74.3) }} />
        </div>
        <div className="flex justify-between font-mono text-[13px] text-[var(--w-muted)]">
          {[50, 60, 70, 80, 90, 100].map((v) => (
            <span key={v}>{v}</span>
          ))}
        </div>
      </div>
      <div className="flex gap-4">
        {[
          ["74,3", "Điểm trung bình"],
          ["67,8 – 80,8", "Khoảng tin cậy 95%"],
          ["70", "Tiêu chí nhóm chốt"],
        ].map(([v, l]) => (
          <div key={l} className="flex flex-1 flex-col gap-1 rounded-2xl bg-[var(--d-soft)] p-5">
            <span className="font-mono text-[22px] font-semibold">{v}</span>
            <span className="text-[14px] text-[var(--w-secondary)]">{l}</span>
          </div>
        ))}
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Hàng trên: điểm từng người. Hàng dưới: điểm trung bình và khoảng tin cậy. Vạch đỏ ở 70 nằm trong khoảng, nên chưa đủ chắc chắn là đạt.
      </T>
    </Blk>
  );
}

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Section {...S.problem}>
        <P>
          Muốn biết người dùng thấy sản phẩm dễ dùng đến đâu, nhóm thường tự đặt câu hỏi khảo sát. Câu hỏi tự đặt khó so sánh giữa các lần đo và giữa các sản phẩm, và chưa ai kiểm tra nó có đo
          đúng thứ cần đo không.
        </P>
        <P>
          Bảng hỏi chuẩn hóa như SUS giải quyết vấn đề này, nhưng SUS có 10 câu, khá dài khi chèn vào một khảo sát lớn hơn. UMUX ra đời để có một bảng hỏi ngắn hơn, nhắm vào ba khía cạnh của
          khả năng sử dụng trong ISO 9241-11: hiệu quả, hiệu suất và sự hài lòng.
        </P>
        <div className="flex items-start gap-4">
          <CheckCards
            groups={[
              [
                "check-circle",
                "UMUX giúp",
                ["Có một con số 0–100 dễ theo dõi qua các phiên bản.", "Tốn ít thời gian của người trả lời.", "So sánh được với lần đo trước, nếu dùng cùng bản và cùng cách tính."],
              ],
              ["ban", "Không giải quyết", ["Vì sao điểm thấp, và cần sửa chỗ nào → cần kiểm thử, phỏng vấn."]],
            ]}
          />
        </div>
      </Section>

      <Section {...S.items}>
        <P>
          Theo mô tả của MeasuringU (Sauro, 2017), UMUX có 4 câu trên thang 7 mức (từ “Rất không đồng ý” đến “Rất đồng ý”), gồm 2 câu tích cực và 2 câu tiêu cực xen kẽ:
        </P>
        <Table
          head={["Câu", "Nội dung (diễn giải)", "Chiều"]}
          widths={[100]}
          rows={[
            { highlight: true, cells: ["1", "Các chức năng của hệ thống đáp ứng yêu cầu của tôi.", "Tích cực"] },
            { cells: ["2", "Dùng hệ thống này là một trải nghiệm gây bực bội.", "Tiêu cực"] },
            { highlight: true, cells: ["3", "Hệ thống này dễ dùng.", "Tích cực"] },
            { cells: ["4", "Tôi phải mất quá nhiều thời gian sửa lỗi khi dùng hệ thống này.", "Tiêu cực"] },
          ]}
        />
        <P>
          UMUX-LITE chỉ giữ hai câu tích cực: câu 1 (chức năng đáp ứng yêu cầu) và câu 3 (dễ dùng). MeasuringU cho biết các nghiên cứu sau nhận thấy cách viết lẫn câu tích cực và tiêu cực của
          UMUX tạo ra cấu trúc hai nhóm không mong muốn, đây là một lý do để rút gọn thành bản chỉ có câu tích cực.
        </P>
        <Callout tone="note" icon="chat">
          Khi dịch sang tiếng Việt, cần giữ nghĩa sát bản gốc và thử trước với vài người; câu dịch khác nghĩa sẽ làm điểm không so sánh được với các nghiên cứu khác.
        </Callout>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "check-circle",
              "Nên dùng khi",
              [
                "Cần một chỉ số cảm nhận khả năng sử dụng ngắn gọn, chèn vào khảo sát hoặc cuối buổi kiểm thử.",
                "Theo dõi xu hướng qua các phiên bản sản phẩm.",
                "Không đủ chỗ cho 10 câu SUS.",
              ],
            ],
          ]}
        />
        <Table
          head={["Chưa phù hợp khi", "Vì sao", "Thay bằng"]}
          widths={[320]}
          rows={[
            { icon: "bar-chart", cells: ["Cần so sánh với chuẩn ngành đã công bố", "Dữ liệu chuẩn của SUS nhiều hơn.", "SUS."] },
            { icon: "list-search", cells: ["Cần biết vấn đề cụ thể", "Điểm số không chỉ ra chỗ sai.", "Usability testing."] },
            { icon: "target", cells: ["Đo cảm nhận về một tác vụ đơn lẻ", "UMUX đo toàn hệ thống.", "Câu hỏi sau tác vụ (ví dụ thang Likert một câu)."] },
            { icon: "users", cells: ["Rất ít người trả lời", "Khoảng tin cậy quá rộng.", "Kết hợp dữ liệu định tính."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Chọn bản", "UMUX 4 câu hay UMUX-LITE 2 câu, và giữ nguyên qua các lần đo.", "Bảng hỏi cố định."],
            ["Dịch và thử", "Với vài người nếu dùng tiếng Việt.", "Bản dịch đã kiểm tra."],
            ["Chốt tiêu chí trước", "Ví dụ “đạt nếu điểm trung bình từ X trở lên”. Mức X do nhóm chọn.", "Tiêu chí đạt."],
            ["Thu thập", "Sau khi người dùng đã dùng sản phẩm đủ lâu để có cảm nhận.", "Câu trả lời thô."],
            ["Tính điểm", "Từng người, rồi điểm trung bình và khoảng tin cậy.", "Điểm trung bình kèm phạm vi."],
            ["Kết hợp", "Với dữ liệu định tính để hiểu lý do.", "Kết luận và việc cần làm."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật.</Callout>
        <Callout tone="note" icon="file">
          Lưu ý nguồn: cách quy đổi điểm UMUX 4 câu dưới đây khớp nhau ở hai hướng dẫn độc lập (Qualaroo và Blucadò, trang sau ghi nguồn là Finstad, 2010). Bài viết này chưa đối chiếu được với
          bài báo gốc của Finstad; nên kiểm tra lại trước khi dùng cho báo cáo chính thức.
        </Callout>
        <Subhead icon="list">UMUX (4 câu)</Subhead>
        <Formula
          label="Bước 1. Quy đổi từng câu về thang 0–6"
          formula="Câu tích cực (1, 3): Câu trả lời − 1 · Câu tiêu cực (2, 4): 7 − Câu trả lời"
          note="Một người trả lời 6, 2, 6, 3 → Câu 1: 6 − 1 = 5 · Câu 2: 7 − 2 = 5 · Câu 3: 6 − 1 = 5 · Câu 4: 7 − 3 = 4"
        />
        <Formula label="Bước 2. Cộng lại" formula="Tổng = 5 + 5 + 5 + 4 = 19" note="Tối đa là 4 × 6 = 24" />
        <Formula label="Bước 3. Quy về thang 0–100" formula="Điểm UMUX = Tổng ÷ 24 × 100" note="19 ÷ 24 × 100 ≈ 79,2" />
        <Subhead icon="list">UMUX-LITE (2 câu)</Subhead>
        <P>Theo MeasuringU, điểm 0–100 của UMUX-LITE tính từ hai câu như sau:</P>
        <Formula
          label="UMUX-LITE"
          formula="Tổng đã quy đổi = (Câu 1 + Câu 2) − 2 · Điểm = Tổng đã quy đổi ÷ 12 × 100"
          note="Câu 1 = 6, câu 2 = 5 → (6 + 5) − 2 = 9 → 9 ÷ 12 × 100 = 75"
        />
        <P>
          MeasuringU (2017) còn giới thiệu một công thức hồi quy để quy đổi UMUX-LITE sang thang tương đương SUS. Một số nguồn sau đó cho biết công thức này không còn được khuyến nghị, vì nó
          đánh giá thấp điểm ở mức cao. Bài này chưa đọc nghiên cứu gốc về điểm đó, nên chỉ khuyên: báo cáo điểm gốc, và nếu dùng quy đổi thì ghi rõ công thức.
        </P>
        <Subhead icon="users">Điểm trung bình của nhóm và độ tin cậy</Subhead>
        <P>12 người trả lời UMUX, điểm từng người: 79,2 · 66,7 · 87,5 · 70,8 · 58,3 · 83,3 · 75 · 62,5 · 91,7 · 70,8 · 66,7 · 79,2.</P>
        <Formula label="Điểm trung bình" formula="Tổng điểm ÷ Số người" note="891,7 ÷ 12 ≈ 74,3" />
        <P>Điểm trung bình từ 12 người có thể khác điểm thật của toàn bộ người dùng. Khoảng tin cậy cho biết phạm vi hợp lý. Mức 95% là quy ước phổ biến.</P>
        <Table
          head={["Nhập vào công cụ", "Kết quả"]}
          widths={[360]}
          rows={[{ highlight: true, cells: ["12 điểm UMUX ở trên", "Trung bình 74,3; khoảng tin cậy 95%: 67,8 – 80,8"] }]}
        />
        <ScoreChart />
        <Subhead icon="split">Quy tắc quyết định</Subhead>
        <P>Tiêu chí nhóm chốt trước: đạt nếu từ 70 trở lên; mức 70 là lựa chọn của nhóm, không phải ngưỡng chuẩn.</P>
        <Table
          head={["Kết quả", "Quyết định"]}
          widths={[460]}
          rows={[
            { icon: "check-circle", cells: ["Cả khoảng tin cậy trên mức tiêu chí", "Đạt."] },
            { icon: "x", cells: ["Cả khoảng tin cậy dưới mức tiêu chí", "Không đạt."] },
            { icon: "hourglass", cells: ["Khoảng tin cậy chứa mức tiêu chí", "Chưa đủ chắc chắn."] },
          ]}
        />
        <InfoCard tone="fill" icon="hourglass" title="Áp dụng" body="74,3 cao hơn 70, nhưng khoảng 67,8 – 80,8 chứa mức 70. Chưa đủ chắc chắn là đạt." />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["eye", "UMUX đo cảm nhận", "Không đo hiệu quả thật. Người dùng có thể thấy dễ dùng mà vẫn làm sai."],
            [
              "file",
              "Tương quan cao chưa phải là đo đúng",
              "Cairns (2013): dù UMUX tương quan rất cao với SUS (r = 0,96 trong nghiên cứu gốc), điều đó chỉ cho thấy UMUX đo giống SUS. Nghiên cứu gốc chỉ dùng hai hệ thống rất khác nhau, có thể làm tương quan cao hơn thực tế.",
            ],
            ["list-search", "Không chỉ ra cách sửa", "Điểm số không cho biết cần sửa chỗ nào."],
            ["split", "Khó so sánh chéo", "Điểm không so sánh được nếu khác bản (UMUX với UMUX-LITE), khác cách tính, hoặc khác bản dịch."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Bảng hỏi UMUX hoặc UMUX-LITE (bản dịch đã thử).", "Tiêu chí đạt chốt trước.", "Người trả lời đã dùng sản phẩm."]}
          outputs={["Điểm từng người và điểm trung bình.", "Khoảng tin cậy.", "So sánh với lần đo trước hoặc tiêu chí."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <div className="flex gap-4">
          <InfoCard
            icon="component"
            title="Bối cảnh"
            className="flex-1"
            body="Sau khi thiết kế lại luồng đặt lịch, nhóm muốn theo dõi cảm nhận về khả năng sử dụng mỗi quý, mà không làm khảo sát sau đặt lịch dài thêm."
          />
          <InfoCard icon="list" title="Cách làm" className="flex-1" body="Chèn UMUX-LITE (2 câu) vào khảo sát ngắn sau khi đặt lịch thành công." />
        </div>
        <Table
          head={["Kết quả quý này (minh họa)", "Giá trị"]}
          widths={[360]}
          rows={[
            { cells: ["Số người trả lời", "10"] },
            { highlight: true, cells: ["Điểm trung bình", "70,8"] },
            { cells: ["Khoảng tin cậy 95%", "61,4 – 80,3"] },
          ]}
        />
        <InfoCard
          tone="fill"
          icon="hourglass"
          title="Diễn giải"
          body="Khoảng tin cậy rất rộng vì chỉ có 10 người. Nhóm chưa kết luận gì, mà kéo dài thời gian thu thập để có thêm người trả lời, và đọc các câu trả lời mở đi kèm để tìm lý do điểm thấp."
        />
        <Callout tone="note" icon="briefcase">
          Số liệu minh họa. Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Quên đảo chiều câu tiêu cực", "Điểm câu 2 và 4 bị ngược.", "Câu tiêu cực: 7 − câu trả lời."],
            ["So sánh UMUX với UMUX-LITE", "Hai bản tính khác nhau.", "Giữ cùng một bản."],
            ["Coi điểm UMUX là điểm SUS", "Hai thang khác nhau.", "Ghi rõ thang, cách quy đổi nếu có."],
            ["Báo điểm trung bình không kèm khoảng tin cậy", "Không thấy độ chắc chắn.", "Luôn kèm khoảng tin cậy."],
            ["Dùng điểm để tìm vấn đề", "Điểm không chỉ ra chỗ sai.", "Kết hợp kiểm thử, câu hỏi mở."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Số câu", "Đo gì"]}
          widths={[280, 120]}
          rows={[
            { icon: "list", highlight: true, cells: ["UMUX", "4", "Cảm nhận khả năng sử dụng toàn hệ thống."] },
            { icon: "list", cells: ["UMUX-LITE", "2", "Như trên, rút gọn."] },
            { icon: "bar-chart", cells: ["SUS", "10", "Cảm nhận khả năng sử dụng; có nhiều dữ liệu chuẩn để so sánh."] },
            { icon: "hourglass", cells: ["Customer Effort Score", "1", "Mức nỗ lực cho một tương tác cụ thể."] },
            { icon: "users", cells: ["Net Promoter Score", "1", "Khả năng giới thiệu, không đo khả năng sử dụng trực tiếp."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn icon="file" title="Trước khi đo" items={["Đã chọn bản (UMUX hay UMUX-LITE) và ghi rõ.", "Bản dịch đã thử.", "Đã chốt tiêu chí đạt."]} />
          <ChecklistColumn
            icon="sigma"
            title="Khi tính"
            items={["Đã đảo chiều câu tiêu cực (UMUX 4 câu).", "Đã tính khoảng tin cậy.", "Đã ghi rõ có quy đổi sang thang SUS hay không."]}
          />
          <ChecklistColumn icon="analytics" title="Khi báo cáo" items={["Kèm dữ liệu định tính để giải thích."]} />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["UX Metrics", "Chỉ số UX", "UMUX là một chỉ số thái độ."],
            ["Usability Testing", "Kiểm thử khả năng sử dụng", "Thường dùng UMUX cuối buổi."],
            ["Survey", "Khảo sát", "Cách thu thập UMUX trên diện rộng."],
            ["Likert Scale", "Thang Likert", "Dạng thang của từng câu."],
            ["Confidence Intervals", "Khoảng tin cậy", "Cách đọc điểm trung bình."],
            ["Customer Effort Score (CES)", "Điểm nỗ lực khách hàng", "Chỉ số một câu, đo khía cạnh khác."],
          ]}
        />
      </Section>
    </div>
  );
}

export const UMUX: Article = {
  slug: "umux",
  version: 1,
  term: "UMUX",
  fn: 6,
  vi: "Thang đo khả năng sử dụng UMUX",
  kind: "Chỉ số / thống kê",
  definition:
    "UMUX là bảng hỏi chuẩn hóa gồm 4 câu, dùng thang 7 mức, để đo cảm nhận của người dùng về khả năng sử dụng của một hệ thống; kết quả quy về thang 0–100.",
  definitionMore: "UMUX được xây dựng để ngắn hơn bảng hỏi SUS (System Usability Scale) nhưng cho kết quả gần tương đương.",
  oneLine: "Bảng hỏi 4 câu đo cảm nhận về khả năng sử dụng, quy về thang 0–100.",
  glance: [
    ["4 câu", "Thang 7 mức, quy về 0–100"],
    ["2 câu", "Bản rút gọn UMUX-LITE"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Bản rút gọn: UMUX-LITE"] },
    { label: "Nhóm chính", items: ["Chỉ số và đo lường"] },
    { label: "Thẻ phụ", items: ["Khảo sát và phản hồi"] },
    {
      label: "Lưu ý tên gọi",
      items: ["UMUX có 4 câu (Finstad, 2010). UMUX-LITE chỉ có 2 câu (Lewis, Utesch & Maher, 2013). Hai bản tính điểm khác nhau, cần ghi rõ đang dùng bản nào."],
    },
  ],
  sections: SECTIONS,
  Body,
};
