"use client";

import { Blk, T } from "./edit";
import { CheckCards, Formula, InOutCards, PairCards, RelatedCards, Scenario, Steps, InfoGrid } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Minimum Viable Product — copy from ux-glossary/minimum-viable-product.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "forms", title: "Các dạng MVP", icon: "component" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "maths", title: "Công thức và ví dụ tính", icon: "sigma" },
  { id: "limits", title: "Giới hạn: khi nào MVP chưa đủ", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** Fake-door result on a 0–16% axis: the CI sits above the 5% threshold, well below the 15% stated in the survey. */
function ThresholdChart() {
  const x = (v: number) => `${(v / 16) * 100}%`;
  return (
    <Blk label="biểu đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="bar-chart" size={36} iconSize={18} radius={10} />
        <Eyebrow>Tỷ lệ bấm đăng ký so với ngưỡng</Eyebrow>
      </div>
      <div className="relative mt-10 mb-2 h-16 rounded-xl bg-[var(--d-well)]">
        <span className="absolute inset-y-0 left-0 rounded-l-xl bg-[var(--d-bad-soft)]" style={{ width: x(5) }} />
        <span className="absolute inset-y-0 w-0.5 bg-[var(--d-bad)]" style={{ left: x(5) }} />
        <span className="absolute -top-8 -translate-x-1/2 text-[14px] font-semibold whitespace-nowrap text-[var(--d-bad)]" style={{ left: x(5) }}>
          Ngưỡng 5%
        </span>
        <span className="absolute top-1/2 h-4 -translate-y-1/2 rounded-full bg-[var(--d-ci)]" style={{ left: x(6.6), width: `calc(${x(8.7)} - ${x(6.6)})` }} />
        <span className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--d-accent)]" style={{ left: x(7.6) }} />
        <span className="absolute -top-8 -translate-x-1/2 text-[14px] font-semibold whitespace-nowrap text-[var(--d-accent)]" style={{ left: x(7.6) }}>
          7,6% (6,6 – 8,7%)
        </span>
        <span className="absolute inset-y-2 w-0.5 border-l-2 border-dashed border-[var(--w-muted)]" style={{ left: x(15) }} />
        <span className="absolute -top-8 -translate-x-1/2 text-[14px] whitespace-nowrap text-[var(--w-muted)]" style={{ left: x(15) }}>
          Khảo sát: 15%
        </span>
      </div>
      <div className="flex justify-between font-mono text-[13px] text-[var(--w-muted)]">
        {[0, 4, 8, 12, 16].map((n) => (
          <span key={n}>{n}%</span>
        ))}
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Cả khoảng tin cậy nằm trên ngưỡng 5% → đạt tiêu chí. Hành vi thật thấp hơn nhiều so với mức “quan tâm” khách nói trong khảo sát.
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
            Khảo sát cho biết người ta nói sẽ dùng; nhưng nói và làm thường khác nhau. Xây đầy đủ sản phẩm rồi mới biết khách có dùng không thì rủi ro lớn: tốn thời gian, tiền bạc, và khó
            bỏ khi đã đầu tư nhiều.
          </P>
          <P strong>MVP kiểm chứng giả định bằng hành vi thật với chi phí thấp nhất.</P>
        </div>
        <Eyebrow>MVP hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          cols={3}
          minH={150}
          items={[
            ["users", "Có đủ người thật sự cần không", "Không chỉ nói là cần."],
            ["check-circle", "Giá trị cốt lõi", "Có được khách công nhận không."],
            ["split", "Tiếp tục, điều chỉnh hay dừng", "Hướng đi."],
          ]}
        />
      </Section>

      <Section {...S.forms}>
        <Table
          head={["Dạng", "Cách làm", "Kiểm chứng điều gì", "Ví dụ minh họa (giả định)"]}
          widths={[200]}
          rows={[
            {
              icon: "play-circle",
              highlight: true,
              cells: [
                "Fake door / smoke test",
                "Đặt lời mời hoặc nút cho tính năng chưa có; đo bao nhiêu người bấm. Sau khi bấm, nói rõ tính năng đang được chuẩn bị.",
                "Mức quan tâm thật.",
                "Nút “Đăng ký gói Tài chính gia đình” trên trang dịch vụ.",
              ],
            },
            { icon: "users", cells: ["Concierge", "Làm thủ công cho vài khách, khách biết là có người làm.", "Giá trị cốt lõi, quy trình.", "Chuyên gia tự gửi kế hoạch tài chính qua email cho 10 gia đình."] },
            { icon: "eye", cells: ["Wizard of Oz", "Khách thấy như hệ thống tự động, phía sau là người làm.", "Trải nghiệm trước khi xây hệ thống.", "“Trợ lý” đặt lịch qua tin nhắn, phía sau là nhân viên trả lời."] },
            { icon: "component", cells: ["Một tính năng", "Chỉ làm một tính năng cốt lõi.", "Tính năng đó có đủ giá trị không.", "Chỉ có đặt lịch và nhắc lịch, chưa có cổng tài liệu."] },
            { icon: "file", cells: ["Video hoặc trang giới thiệu", "Mô tả sản phẩm chưa có, đo đăng ký quan tâm.", "Thông điệp và mức quan tâm.", "Trang giới thiệu gói mới, ô đăng ký nhận tin."] },
          ]}
        />
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "target",
              "Bối cảnh phù hợp",
              ["Ý tưởng sản phẩm hoặc tính năng mới, nhiều điều chưa chắc chắn.", "Có một giả định quan trọng mà nếu sai thì cả hướng đi sai.", "Có thể tiếp cận khách hàng thật."],
            ],
            ["eye", "Dấu hiệu nhận biết", ["Nhóm dựa vào khảo sát ý định để quyết định đầu tư lớn.", "Lãnh đạo hỏi “làm sao biết khách sẽ dùng?”."]],
            ["clipboard-check", "Điều kiện cần", ["Giả định cần kiểm chứng và tiêu chí thành công chốt trước.", "Cách đo hành vi."]],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[360]}
          rows={[
            { icon: "shield-alert", cells: ["Sản phẩm có rủi ro an toàn, pháp lý cao", "Không thể ra mắt phiên bản thiếu.", "Bản mẫu, test trong môi trường có kiểm soát."] },
            { icon: "check-circle", cells: ["Giả định đã được kiểm chứng", "Không còn gì để học.", "Xây và cải tiến."] },
            { icon: "eye", cells: ["Cần đánh giá độ dễ dùng", "MVP đo nhu cầu, không đo độ dễ dùng.", "Usability testing."] },
            { icon: "ban", cells: ["Fake door với điều khách đã trả tiền", "Làm mất lòng tin.", "Concierge, đăng ký quan tâm miễn phí."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định giả định rủi ro nhất.", "", "Giả định cần kiểm chứng."],
            ["Chốt tiêu chí thành công trước.", "Chỉ số và ngưỡng.", "Tiêu chí quyết định."],
            ["Chọn dạng MVP rẻ nhất trả lời được câu hỏi.", "", "Kế hoạch MVP."],
            ["Xây và chạy.", "", "Dữ liệu hành vi."],
            ["Đo và học.", "Kết hợp số liệu và phỏng vấn ngắn.", "Kết quả so với tiêu chí."],
            ["Quyết định.", "Tiếp tục, điều chỉnh hay dừng.", "Bước tiếp theo."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật. Fake door test cho gói “Tài chính gia đình” trên trang dịch vụ trong hai tuần.</Callout>
        <Subhead icon="target">Bước 1: Chốt tiêu chí trước</Subhead>
        <P>
          Tiêu chí (do nhóm đặt trước khi chạy, dựa trên chi phí đầu tư): tiếp tục nếu tỷ lệ bấm đăng ký từ 5% trở lên và khoảng tin cậy không xuống dưới 5%.
        </P>
        <Subhead icon="sigma">Bước 2: Tỷ lệ quan tâm</Subhead>
        <Formula label="Tỷ lệ quan tâm" formula="Số người bấm đăng ký ÷ Số người xem trang" note="182 ÷ 2.400 ≈ 7,6%" />
        <Subhead icon="bar-chart">Bước 3: Kết quả chắc chắn đến đâu</Subhead>
        <Table
          head={["Nhập vào công cụ tính khoảng tin cậy cho tỷ lệ", "Kết quả"]}
          widths={[520]}
          rows={[{ highlight: true, cells: ["182 người bấm trên 2.400 người xem, mức tin cậy 95%", "Khoảng tin cậy ≈ 6,6% – 8,7%"] }]}
        />
        <ThresholdChart />
        <Subhead icon="split">Bước 4: Quyết định</Subhead>
        <InfoCard
          tone="fill"
          icon="check-circle"
          title="Đạt tiêu chí"
          body="Cả khoảng tin cậy nằm trên ngưỡng 5% → tiếp tục bước tiếp theo: chạy concierge MVP với 10 gia đình để kiểm chứng giá trị của gói, không chỉ mức quan tâm."
        />
        <Callout tone="note" title="Lưu ý">
          Bấm nút là tín hiệu quan tâm, chưa phải là sẵn lòng trả tiền. Mỗi dạng MVP kiểm chứng một giả định khác nhau.
        </Callout>
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["target", "Một MVP chỉ kiểm chứng một giả định", "Mức quan tâm cao không chứng minh khách sẽ trả tiền hay sẽ dùng lâu dài."],
            ["alert", "MVP quá sơ sài có thể cho kết quả âm sai", "Khách không thích vì trải nghiệm kém, không phải vì ý tưởng kém."],
            ["ban", "Fake door có thể làm khách thất vọng", "Nếu không minh bạch."],
            ["users", "Kết quả phụ thuộc vào ai thấy MVP", "Người truy cập trang hiện tại có thể khác thị trường mục tiêu."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Giả định rủi ro nhất.", "Tiêu chí thành công chốt trước.", "Cách tiếp cận khách hàng, cách đo hành vi."]}
          outputs={["Dữ liệu hành vi, khoảng tin cậy.", "Bài học đã kiểm chứng.", "Quyết định tiếp tục, điều chỉnh hay dừng."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard
          icon="component"
          title="Bối cảnh"
          body="Market research ước tính có cơ hội cho gói “Tài chính gia đình” (khảo sát cho tỷ lệ quan tâm 15%). Nhóm muốn kiểm chứng bằng hành vi trước khi xây toàn bộ gói."
        />
        <div className="flex gap-4">
          <InfoCard
            icon="play-circle"
            title="MVP 1 — Fake door"
            className="flex-1"
            body="Như phần tính toán ở trên, 7,6% người xem bấm đăng ký; sau khi bấm, khách thấy thông báo “Gói đang được chuẩn bị, để lại email để nhận thông tin đầu tiên”. Tỷ lệ này thấp hơn nhiều so với 15% “quan tâm” trong khảo sát, nhưng vẫn đạt ngưỡng đã đặt."
          />
          <InfoCard
            icon="users"
            title="MVP 2 — Concierge"
            className="flex-1"
            body="Chuyên gia làm thủ công kế hoạch tài chính cho 10 gia đình đã đăng ký, có thu phí thử nghiệm. Phỏng vấn sau đó để hiểu giá trị và điều chỉnh."
          />
        </div>
        <InfoCard tone="fill" icon="check-circle" title="Quyết định" body="Chỉ xây công cụ tự động cho những phần các gia đình thấy giá trị nhất sau MVP 2." />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Coi MVP là bản rút gọn để ra mắt", "Bỏ mất mục tiêu học.", "Mỗi MVP gắn với một giả định và tiêu chí."],
            ["Không chốt tiêu chí trước", "Dễ diễn giải kết quả theo ý muốn.", "Đặt ngưỡng trước khi chạy."],
            ["MVP quá lớn", "Tốn công, học chậm.", "Chọn dạng rẻ nhất trả lời được câu hỏi."],
            ["Fake door không minh bạch", "Mất lòng tin.", "Nói rõ sau khi khách bấm."],
            ["Kết luận ngoài phạm vi", "Mức quan tâm không chứng minh khách sẽ trả tiền.", "Kiểm chứng từng giả định bằng MVP phù hợp."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Mục đích", "Khi nào chọn"]}
          widths={[220]}
          rows={[
            { icon: "target", highlight: true, cells: ["MVP", "Học về khách hàng bằng hành vi thật.", "Kiểm chứng giả định rủi ro."] },
            { icon: "pencil", cells: ["Prototype", "Kiểm tra thiết kế, thường không đưa ra thị trường.", "Kiểm tra độ dễ dùng, luồng."] },
            { icon: "flask", cells: ["Beta", "Bản gần hoàn chỉnh cho một nhóm dùng thử.", "Tìm lỗi trước khi ra mắt rộng."] },
            { icon: "rotate", cells: ["Lean UX", "Cách làm việc dựa trên giả thuyết và thử nghiệm nhỏ.", "MVP là một dạng thử nghiệm trong Lean UX."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Chuẩn bị"
            items={["Có giả định rủi ro nhất cần kiểm chứng.", "Tiêu chí thành công được chốt trước.", "Dạng MVP là rẻ nhất trả lời được câu hỏi."]}
          />
          <ChecklistColumn
            icon="analytics"
            title="Chạy và kết luận"
            items={["Đo hành vi, không chỉ ý định.", "Minh bạch với khách (đặc biệt với fake door).", "Kết luận chỉ trong phạm vi giả định đã kiểm chứng."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Lean UX", "UX tinh gọn", "MVP là thử nghiệm trong vòng lặp Lean UX."],
            ["Market Research", "Nghiên cứu thị trường", "MVP kiểm chứng ý định bằng hành vi."],
            ["Low-Fidelity Prototype", "Bản mẫu độ trung thực thấp", "Kiểm tra thiết kế trước khi làm MVP."],
            ["A/B Testing", "Kiểm thử A/B", "Cách đo kết quả của một số dạng MVP."],
            ["Confidence Intervals", "Khoảng tin cậy", "Cách đọc tỷ lệ quan tâm."],
            ["Jobs to be Done (JTBD)", "Công việc cần hoàn thành", "Nguồn cho giả định về giá trị."],
            ["Wizard of Oz", "Phương pháp “phù thủy xứ Oz”", "Thử giá trị bằng cách vận hành thủ công phía sau."],
          ]}
        />
      </Section>
    </div>
  );
}

export const MINIMUM_VIABLE_PRODUCT: Article = {
  slug: "minimum-viable-product",
  version: 1,
  term: "Minimum Viable Product",
  fn: 3,
  vi: "Sản phẩm khả dụng tối thiểu",
  kind: "Nguyên tắc / khái niệm",
  definition: "Minimum viable product là phiên bản của một sản phẩm mới giúp nhóm thu được nhiều bài học đã kiểm chứng nhất về khách hàng với ít công sức nhất.",
  definitionMore: "Mục đích của MVP là kiểm chứng một giả định quan trọng bằng hành vi thật của khách hàng, trước khi đầu tư xây sản phẩm đầy đủ.",
  oneLine: "Phiên bản giúp học nhiều nhất về khách hàng với ít công sức nhất, trước khi xây đầy đủ.",
  glance: [
    ["7,6%", "Tỷ lệ bấm đăng ký trong ví dụ"],
    ["5", "Dạng MVP"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["MVP"] },
    { label: "Nhóm chính", items: ["Chiến lược sản phẩm"] },
    { label: "Thẻ phụ", items: ["Quy trình"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "MVP không phải “phiên bản rút gọn để ra mắt sớm”. Theo Eric Ries, MVP là cách học được nhiều nhất về khách hàng với ít công sức nhất. Ries cũng nhấn mạnh MVP không đơn giản là làm một sản phẩm tối giản.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
