"use client";

import { Blk, T } from "./edit";
import { CheckCards, Formula, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Voice of the Customer (VoC) — copy from ux-glossary/voice-of-the-customer.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "parts", title: "Bốn thành phần của VoC", icon: "component" },
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

const NEEDS: [string, number, number][] = [
  ["Biết trước chi phí", 8.6, 5.9],
  ["Được tư vấn bởi người hiểu ngành của mình", 8.1, 6.8],
  ["Đặt lịch nhanh", 7.2, 7.0],
];
const vn = (n: number) => n.toFixed(1).replace(".", ",");

/** Importance vs. satisfaction per need on a 1–10 scale; the gap between them is the opportunity. */
function GapChart() {
  return (
    <Blk label="biểu đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="bar-chart" size={36} iconSize={18} radius={10} />
        <Eyebrow>Mức quan trọng và mức hài lòng (thang 1–10, 200 khách)</Eyebrow>
      </div>
      <div className="flex flex-col gap-5">
        {NEEDS.map(([need, imp, sat], i) => (
          <div key={need} className="flex items-center gap-5">
            <span className="w-[220px] shrink-0 text-[15px] leading-[22px] font-semibold">{need}</span>
            <div className="relative h-12 flex-1 rounded-lg bg-[var(--d-well)]">
              <span
                className={`absolute top-1/2 h-3 -translate-y-1/2 rounded-full ${i === 0 ? "bg-[var(--d-bad-soft)]" : "bg-[var(--d-soft)]"}`}
                style={{ left: `${sat * 10}%`, width: `${(imp - sat) * 10}%` }}
              />
              <span className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--d-ci)]" style={{ left: `${sat * 10}%` }} />
              <span className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--d-fill)]" style={{ left: `${imp * 10}%` }} />
            </div>
            <div className="flex w-[110px] shrink-0 flex-col text-right">
              <span className={`font-mono text-[18px] font-semibold ${i === 0 ? "text-[var(--d-bad)]" : ""}`}>{vn(imp - sat)}</span>
              <span className="text-[13px] text-[var(--w-muted)]">khoảng cách</span>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-5">
          <span className="w-[220px] shrink-0" />
          <div className="flex flex-1 justify-between font-mono text-[13px] text-[var(--w-muted)]">
            {[0, 2, 4, 6, 8, 10].map((v) => (
              <span key={v}>{v}</span>
            ))}
          </div>
          <span className="w-[110px] shrink-0" />
        </div>
      </div>
      <div className="flex gap-6 text-[14px] text-[var(--w-secondary)]">
        <span className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[var(--d-fill)]" />
          Quan trọng
        </span>
        <span className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[var(--d-ci)]" />
          Hài lòng
        </span>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        “Biết trước chi phí” vừa quan trọng vừa có khoảng cách lớn nhất. Khoảng cách là cách đọc đơn giản bài này đề xuất, không phải công thức chuẩn của VoC.
      </T>
    </Blk>
  );
}

const TREE: [string, [string, string][]][] = [
  [
    "Tôi tin được dịch vụ",
    [
      ["Biết trước chi phí", "“Tôi muốn biết tổng tiền trước khi gặp”"],
      ["Thông tin của tôi được giữ kín", "“Tôi ngại đưa sổ sách cho người lạ”"],
    ],
  ],
  [
    "Tôi dễ dàng nhận được tư vấn",
    [
      ["Đặt lịch nhanh", "“Tôi chỉ rảnh buổi tối”"],
      ["Người tư vấn hiểu ngành của tôi", "“Tôi không muốn giải thích lại từ đầu”"],
    ],
  ],
];

function NeedsTree() {
  return (
    <div className="flex gap-4">
      {TREE.map(([primary, secondaries]) => (
        <div key={primary} className="flex flex-1 flex-col gap-3 rounded-[24px] bg-[var(--w-card)] p-6">
          <span className="w-fit rounded-full bg-[var(--d-fill)] px-4 py-1.5 text-[15px] font-semibold text-white">{primary}</span>
          <span className="text-[13px] text-[var(--w-muted)]">Sơ cấp</span>
          {secondaries.map(([s, quote]) => (
            <div key={s} className="flex flex-col gap-1.5 rounded-2xl bg-[var(--d-soft)] p-4">
              <span className="text-[16px] leading-[22px] font-semibold">{s}</span>
              <span className="text-[15px] leading-[22px] text-[var(--w-secondary)] italic">{quote}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Section {...S.problem}>
        <P>
          Nhóm phát triển thường nghĩ ngay tới giải pháp (“thêm chatbot”, “làm app”) trước khi hiểu khách hàng thật sự cần gì. Theo Gaskin và cộng sự (2011), nếu tập trung vào giải pháp quá sớm,
          nhóm có thể bỏ lỡ những cách đáp ứng nhu cầu sáng tạo hơn.
        </P>
        <CheckCards
          groups={[
            [
              "check-circle",
              "VoC mang lại (theo nguồn)",
              [
                "Hiểu chi tiết yêu cầu của khách hàng.",
                "Ngôn ngữ chung cho cả nhóm trong suốt quá trình phát triển.",
                "Đầu vào để đặt thông số thiết kế phù hợp.",
                "Điểm xuất phát cho đổi mới sản phẩm.",
              ],
            ],
          ]}
        />
        <P>VoC thường được làm ở giai đoạn đầu của một dự án sản phẩm, quy trình hay dịch vụ mới.</P>
      </Section>

      <Section {...S.parts}>
        <P>Theo Gaskin và cộng sự (2011):</P>
        <Subhead icon="chat">1. Nhu cầu khách hàng</Subhead>
        <InfoGrid
          cols={2}
          items={[
            ["chat", "Lợi ích, bằng lời khách hàng", "Nhu cầu là mô tả lợi ích mà sản phẩm cần mang lại, không phải giải pháp hay thông số kỹ thuật."],
            [
              "eye",
              "Ví dụ trong nguồn",
              "Khách hàng muốn đường chéo trên màn hình “trông thẳng, không bị răng cưa”. Đó là nhu cầu; “màn hình độ phân giải cao” là giải pháp.",
            ],
            [
              "users",
              "Thu thập",
              "Các cuộc trao đổi thường thu được khoảng 75–150 câu nhu cầu. Chủ yếu phỏng vấn từng người, mỗi cuộc khoảng một giờ, với khoảng 10–30 khách hàng; có khi tại nơi khách hàng dùng sản phẩm.",
            ],
            ["list-search", "Không hỏi thẳng", "Hỏi “bạn cần gì?” thường không hiệu quả. Tốt hơn là suy ra từ trải nghiệm họ kể lại, hoặc từ quan sát."],
          ]}
        />
        <Subhead icon="list">2. Cấu trúc phân cấp</Subhead>
        <Table
          head={["Cấp", "Số lượng (theo nguồn)", "Dùng để"]}
          widths={[260, 320]}
          rows={[
            { cells: ["Sơ cấp (chiến lược)", "Khoảng 2–10", "Định hướng chiến lược."] },
            { cells: ["Thứ cấp (chiến thuật)", "Mỗi nhu cầu sơ cấp có khoảng 3–10", "Biết cụ thể cần làm gì."] },
            { cells: ["Tam cấp (vận hành)", "Phần còn lại trong 75–150 câu", "Chi tiết cho kỹ thuật, thiết kế."] },
          ]}
        />
        <Callout tone="note" icon="alert">
          Nếu nhóm nội bộ tự gom nhu cầu, kết quả thường giống sơ đồ tổ chức của công ty hơn là cách khách hàng nghĩ. Tốt hơn là để khách hàng gom (qua nhóm thảo luận, hoặc cho từng người tự phân
          loại, tương tự card sorting).
        </Callout>
        <div className="flex gap-4">
          <InfoCard
            icon="bar-chart"
            title="3. Mức ưu tiên"
            className="flex-1"
            body="Một số nhu cầu quan trọng với khách hàng hơn nhu cầu khác, thường đo bằng khảo sát định lượng. Ưu tiên áp dụng cho nhu cầu được cảm nhận, không cho tính năng hay giải pháp kỹ thuật."
          />
          <InfoCard
            icon="target"
            title="4. Cảm nhận về mức đáp ứng"
            className="flex-1"
            body="Khách hàng đánh giá các sản phẩm, dịch vụ hiện có (kể cả cách họ đang tự xoay xở) đáp ứng từng nhu cầu tốt đến đâu. Chỗ quan trọng mà chưa được đáp ứng tốt là cơ hội."
          />
        </div>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "check-circle",
              "Nên dùng khi",
              ["Bắt đầu một sản phẩm, dịch vụ mới hoặc thiết kế lại lớn.", "Nhóm bất đồng về điều khách hàng cần.", "Cần căn cứ để xếp ưu tiên nhiều hướng đầu tư."],
            ],
          ]}
        />
        <Table
          head={["Chưa phù hợp khi", "Vì sao", "Thay bằng"]}
          widths={[320]}
          rows={[
            { icon: "list-search", cells: ["Cần tìm lỗi cụ thể trên giao diện", "VoC nói về nhu cầu, không về giao diện.", "Usability testing."] },
            { icon: "bar-chart", cells: ["Chỉ muốn theo dõi mức hài lòng định kỳ", "VoC theo nghĩa gốc là một nghiên cứu lớn.", "NPS, CES, customer feedback loop."] },
            { icon: "hourglass", cells: ["Không có thời gian cho cả phỏng vấn và khảo sát", "VoC gồm cả hai bước.", "Làm phần định tính trước, ghi rõ chưa có ưu tiên định lượng."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Nhóm cốt lõi tham gia trực tiếp", "Từ đầu: chọn chủ đề, chọn mẫu, viết câu hỏi, dự hoặc xem phỏng vấn. Đây là điều kiện để nhóm thật sự “thấm” VoC.", "Nhóm cùng sở hữu quy trình."],
            ["Phỏng vấn trải nghiệm", "Với khách hàng, từng người một; khai thác đến khi không còn nhu cầu mới.", "Bản ghi phỏng vấn."],
            ["Trích câu nhu cầu", "Giữ lời của khách hàng, loại bỏ giải pháp.", "75–150 câu nhu cầu (con số tham khảo)."],
            ["Cho khách hàng gom nhóm", "Để tạo cấu trúc sơ cấp, thứ cấp, tam cấp.", "Cây nhu cầu."],
            ["Khảo sát", "Đo mức quan trọng và mức hài lòng hiện tại.", "Điểm quan trọng và điểm hài lòng cho từng nhu cầu."],
            ["Xếp ưu tiên", "Và đưa vào quyết định thiết kế.", "Danh sách cơ hội."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật.</Callout>
        <Subhead icon="users">1. Tỷ lệ khách hàng nhắc tới một nhu cầu (từ phỏng vấn)</Subhead>
        <Formula
          label="Tỷ lệ nhắc tới"
          formula="Số khách nhắc tới nhu cầu ÷ Số khách được phỏng vấn"
          note="12 khách được phỏng vấn, 9 người nhắc tới “biết trước chi phí” → 9 ÷ 12 = 0,75 → 75%"
        />
        <P>
          Với 12 người, con số này chỉ cho biết nhu cầu phổ biến trong nhóm được phỏng vấn, chưa đại diện cho toàn bộ khách hàng. Mức ưu tiên cần đo ở bước khảo sát.
        </P>
        <Subhead icon="bar-chart">2. Khoảng cách giữa mức quan trọng và mức hài lòng (từ khảo sát)</Subhead>
        <P>Đây là một cách đọc đơn giản do bài này đề xuất, để thấy nhu cầu nào “quan trọng mà chưa được đáp ứng”. Không phải công thức chuẩn của VoC.</P>
        <Formula label="Khoảng cách" formula="Điểm quan trọng − Điểm hài lòng" note="Cùng một thang, ví dụ 1–10. Khảo sát 200 khách hàng, điểm trung bình." />
        <Table
          head={["Nhu cầu (thứ cấp)", "Quan trọng", "Hài lòng", "Khoảng cách"]}
          widths={[380]}
          rows={NEEDS.map(([n, imp, sat], i) => ({ highlight: i === 0, cells: [n, vn(imp), vn(sat), `${vn(imp)} − ${vn(sat)} = ${vn(imp - sat)}`] }))}
        />
        <GapChart />
        <InfoCard
          tone="fill"
          icon="split"
          title="Đọc kết quả"
          body="“Biết trước chi phí” vừa quan trọng vừa có khoảng cách lớn nhất → ưu tiên cao. “Đặt lịch nhanh” quan trọng nhưng đã được đáp ứng khá tốt → ưu tiên thấp hơn."
        />
        <InfoGrid
          cols={2}
          items={[
            ["alert", "Điểm trung bình có sai số", "Khoảng cách nhỏ (ví dụ chênh nhau vài phần mười) có thể không khác nhau thật."],
            [
              "users",
              "Cách dùng thang điểm khác nhau",
              "Người trả lời ở các nước, các nhóm khác nhau có thể dùng thang điểm khác nhau. Nguồn nhắc tới MaxDiff (chọn cái quan trọng nhất và kém quan trọng nhất trong từng nhóm) để giảm vấn đề này.",
            ],
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["users", "Phụ thuộc vào ai được phỏng vấn", "Mẫu lệch thì cây nhu cầu lệch."],
            ["chat", "Phỏng vấn cho biết nhu cầu có tồn tại", "Mức ưu tiên cần khảo sát mới có tính đại diện."],
            ["target", "Cần đáp ứng gì, không phải giải pháp nào", "VoC không cho biết giải pháp nào đáp ứng tốt nhất → cần thiết kế và kiểm thử."],
            ["hourglass", "Ảnh chụp tại một thời điểm", "Nhu cầu thay đổi theo thời gian."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Chủ đề, phạm vi.", "Mẫu khách hàng (hiện tại và tiềm năng).", "Kịch bản phỏng vấn trải nghiệm.", "Bảng khảo sát mức quan trọng và mức hài lòng."]}
          outputs={["Danh sách nhu cầu bằng lời khách hàng.", "Cây nhu cầu sơ cấp – thứ cấp – tam cấp.", "Điểm quan trọng và hài lòng cho từng nhu cầu.", "Danh sách cơ hội ưu tiên."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard icon="component" title="Bối cảnh" body="Dịch vụ muốn mở rộng sang nhóm chủ doanh nghiệp nhỏ." />
        <P>Cây nhu cầu (rút gọn): hai nhu cầu sơ cấp, mỗi nhu cầu có vài nhu cầu thứ cấp, và mỗi nhu cầu thứ cấp có các câu chi tiết bằng lời khách hàng.</P>
        <NeedsTree />
        <InfoCard
          tone="fill"
          icon="check-circle"
          title="Kết quả khảo sát (minh họa)"
          body="Như bảng ở phần công thức. Nhóm ưu tiên hiện giá rõ cho mọi gói và thêm thông tin bảo mật dữ liệu, trước khi đầu tư vào đặt lịch nhanh hơn."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Ghi giải pháp thay vì nhu cầu", "“Cần có app” là giải pháp, giới hạn lựa chọn.", "Hỏi “để làm gì?” đến khi ra lợi ích."],
            ["Viết lại bằng từ của công ty", "Mất nghĩa.", "Giữ nguyên lời khách hàng."],
            ["Hỏi thẳng “bạn cần gì?”", "Khách hàng khó diễn đạt.", "Hỏi về trải nghiệm thật."],
            ["Nhóm nội bộ tự gom nhu cầu", "Kết quả giống sơ đồ tổ chức.", "Để khách hàng gom."],
            ["Xếp ưu tiên từ số lần nhắc trong phỏng vấn", "Mẫu nhỏ, không đại diện.", "Khảo sát định lượng."],
            ["Gọi mọi phản hồi là VoC mà không nói rõ", "Gây nhầm với quy trình gốc.", "Ghi rõ đang dùng nghĩa nào."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Khác ở đâu"]}
          widths={[340]}
          rows={[
            { icon: "chat", highlight: true, cells: ["Voice of the Customer", "Quy trình có cấu trúc: nhu cầu → phân cấp → ưu tiên → mức đáp ứng."] },
            { icon: "rotate", cells: ["Customer Feedback Loop", "Vòng thu phản hồi liên tục và phản hồi lại khách hàng."] },
            { icon: "target", cells: ["Jobs to be Done", "Tập trung vào “việc” khách hàng cần hoàn thành; gần với VoC về tinh thần."] },
            { icon: "analytics", cells: ["Market Research", "Phạm vi rộng hơn: thị trường, đối thủ, giá."] },
            { icon: "list", cells: ["Survey", "Một công cụ dùng trong bước xếp ưu tiên của VoC."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="chat"
            title="Thu thập"
            items={["Nhóm cốt lõi tham gia trực tiếp.", "Phỏng vấn về trải nghiệm, không hỏi thẳng nhu cầu.", "Nhu cầu ghi bằng lời khách hàng, không phải giải pháp."]}
          />
          <ChecklistColumn
            icon="list"
            title="Cấu trúc và ưu tiên"
            items={["Khách hàng tham gia gom nhóm.", "Có cây nhu cầu ba cấp.", "Ưu tiên từ khảo sát, không từ số lần nhắc.", "Có đo mức đáp ứng hiện tại."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Customer Feedback Loop", "Vòng phản hồi khách hàng", "Thu phản hồi liên tục, khác quy trình VoC gốc."],
            ["Jobs to be Done (JTBD)", "Công việc cần hoàn thành", "Cách nhìn gần, tập trung vào việc cần làm."],
            ["Contextual Inquiry", "Phỏng vấn tại bối cảnh", "Cách thu thập nhu cầu tại nơi khách hàng dùng sản phẩm."],
            ["Affinity Diagram", "Sơ đồ tương đồng", "Cách gom nhu cầu thành nhóm."],
            ["Card Sorting", "Phân loại thẻ", "Để khách hàng tự gom nhu cầu."],
            ["Survey", "Khảo sát", "Đo mức quan trọng và mức hài lòng."],
          ]}
        />
      </Section>
    </div>
  );
}

export const VOICE_OF_THE_CUSTOMER: Article = {
  slug: "voice-of-the-customer",
  version: 1,
  term: "Voice of the Customer (VoC)",
  fn: 7,
  vi: "Tiếng nói khách hàng",
  kind: "Quy trình / cách tiếp cận",
  definition:
    "Voice of the Customer là quy trình nắm bắt yêu cầu của khách hàng: tạo ra một danh sách chi tiết các nhu cầu, sắp xếp chúng thành cấu trúc phân cấp, rồi xếp ưu tiên theo mức độ quan trọng và mức độ hài lòng với các lựa chọn hiện có.",
  definitionMore: "Kết quả là nền chung để cả nhóm ra quyết định thiết kế và tiếp thị.",
  oneLine: "Quy trình thu thập, cấu trúc và xếp ưu tiên nhu cầu khách hàng bằng chính lời của họ.",
  glance: [
    ["75–150", "Câu nhu cầu thường thu được"],
    ["10–30", "Khách hàng được phỏng vấn"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["VoC", "VOC"] },
    { label: "Nhóm chính", items: ["Khảo sát và phản hồi"] },
    { label: "Thẻ phụ", items: ["Nghiên cứu khám phá"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "Theo nghĩa gốc (từ quy trình QFD), VoC là quy trình thu thập, cấu trúc và xếp ưu tiên nhu cầu khách hàng. Trong thực tế, “VoC” còn được dùng rộng hơn để chỉ mọi phản hồi của khách hàng. Bài này theo nghĩa gốc.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
