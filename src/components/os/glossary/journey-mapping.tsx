"use client";

import { Blk, T } from "./edit";
import { CheckCards, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Journey Mapping — copy from ux-glossary/journey-mapping.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "parts", title: "Năm thành phần của journey map", icon: "component" },
  { id: "states", title: "Bản đồ hiện tại và bản đồ tương lai", icon: "split" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các tài liệu gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

const STAGES: { stage: string; act: string; think: string; mood: number; chance: string }[] = [
  { stage: "Tìm hiểu", act: "Đọc trang", think: "“Có hợp?”", mood: 0.6, chance: "" },
  { stage: "So sánh", act: "Hỏi nhà", think: "“Đáng không?”", mood: 0.15, chance: "Tóm tắt chi phí" },
  { stage: "Đặt lịch", act: "Chọn giờ", think: "“Giờ nào?”", mood: 0.45, chance: "Giữ chỗ tạm" },
  { stage: "Tư vấn", act: "Gặp chuyên gia", think: "“Rõ ràng”", mood: 0.8, chance: "" },
  { stage: "Sau tư vấn", act: "Đọc tóm tắt", think: "“Làm gì?”", mood: 0.4, chance: "Bước tiếp rõ ràng" },
];

/** The map as a grid: stages across, then actions, thoughts, the emotion line and opportunities. */
function JourneyGrid() {
  const W = 1000;
  const col = W / STAGES.length;
  const pts = STAGES.map((s, i) => [col * i + col / 2, 100 - s.mood * 80] as const);
  const path = pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
  const row = (label: string, cells: (string | null)[], strong?: boolean) => (
    <div className="flex gap-2">
      <span className="w-[110px] shrink-0 pt-3 font-mono text-[13px] tracking-[0.4px] text-[var(--w-muted)]">{label}</span>
      <div className="grid flex-1 grid-cols-5 gap-2">
        {cells.map((c, i) => (
          <span
            key={i}
            className={`min-h-[48px] rounded-[12px] px-3 py-3 text-[15px] leading-[22px] ${
              strong ? "bg-[var(--d-fill)] font-semibold text-white" : c ? "bg-[var(--d-well)]" : ""
            }`}
          >
            {c ? <T>{c}</T> : null}
          </span>
        ))}
      </div>
    </div>
  );
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-5 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="split" size={36} iconSize={18} radius={10} />
        <Eyebrow>Khách lần đầu · đặt buổi tư vấn trong tuần tới</Eyebrow>
      </div>
      <div className="flex flex-col gap-2">
        {row("GIAI ĐOẠN", STAGES.map((s) => s.stage), true)}
        {row("HÀNH ĐỘNG", STAGES.map((s) => s.act))}
        {row("SUY NGHĨ", STAGES.map((s) => s.think))}
        <div className="flex gap-2">
          <span className="w-[110px] shrink-0 pt-3 font-mono text-[13px] tracking-[0.4px] text-[var(--w-muted)]">CẢM XÚC</span>
          <div className="flex-1 rounded-[12px] bg-[var(--d-well)] px-1 py-2">
            <svg viewBox={`0 0 ${W} 110`} className="h-[110px] w-full" preserveAspectRatio="none">
              <path d={path} fill="none" className="stroke-[var(--d-accent)]" strokeWidth="3" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>
        {row("CƠ HỘI", STAGES.map((s) => s.chance || null))}
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Điểm thấp nhất của đường cảm xúc nằm ở giai đoạn So sánh. Có thể thêm hàng tùy mục tiêu: điểm chạm, kênh, bộ phận phụ trách, chỉ số theo giai đoạn.
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
            Mỗi bộ phận chỉ thấy phần hành trình của mình: nhóm marketing thấy lúc khách tìm hiểu, nhóm sản phẩm thấy lúc khách đặt lịch, nhóm hỗ trợ thấy lúc khách gặp sự cố. Không ai
            thấy toàn bộ, nên những điểm đứt gãy giữa các phần thường bị bỏ qua.
          </P>
          <P strong>Journey map đặt toàn bộ hành trình lên một tài liệu chung, dựa trên dữ liệu nghiên cứu, để các bộ phận cùng nhìn và cùng quyết định.</P>
        </div>
        <Eyebrow>Journey mapping hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          cols={3}
          minH={130}
          items={[
            ["alert", "Điểm đứt gãy nằm ở đâu", "Trong hành trình."],
            ["target", "Cải thiện giai đoạn nào trước", "Theo mức đứt gãy."],
            ["users", "Ai chịu trách nhiệm", "Cho từng phần."],
          ]}
        />
      </Section>

      <Section {...S.parts}>
        <P>Theo NN/g, một journey map có năm thành phần chính.</P>
        <Table
          head={["Thành phần", "Mô tả", "Ví dụ minh họa (giả định)"]}
          widths={[260]}
          rows={[
            { icon: "users", cells: ["Nhân vật (actor)", "Người có hành trình; thường dựa trên persona hoặc phân khúc.", "Khách lần đầu tìm dịch vụ tư vấn."] },
            {
              icon: "target",
              cells: ["Kịch bản và kỳ vọng", "Tình huống và mục tiêu cụ thể; điều nhân vật mong đợi.", "Muốn đặt một buổi tư vấn tài chính trong tuần tới, mong biết rõ chi phí trước."],
            },
            { icon: "split", cells: ["Các giai đoạn", "Các phần lớn của hành trình.", "Tìm hiểu → So sánh → Đặt lịch → Tư vấn → Sau tư vấn."] },
            {
              icon: "chat",
              cells: ["Hành động, suy nghĩ, cảm xúc", "Nhân vật làm gì, nghĩ gì, cảm thấy gì ở mỗi giai đoạn.", "Ở giai đoạn So sánh: chụp bảng giá gửi người thân; lo không đáng tiền."],
            },
            { icon: "lightbulb", highlight: true, cells: ["Cơ hội", "Điều có thể cải thiện, rút ra từ bản đồ.", "Tóm tắt chi phí dễ chia sẻ."] },
          ]}
        />
        <JourneyGrid />
      </Section>

      <Section {...S.states}>
        <div className="flex gap-4">
          <InfoCard
            tone="fill"
            icon="eye"
            title="Hiện tại (current-state)"
            body="Hành trình đang diễn ra, dựa trên dữ liệu nghiên cứu. Dùng khi tìm điểm đứt gãy, ưu tiên cải thiện."
            className="flex-1"
          />
          <InfoCard
            icon="lightbulb"
            title="Tương lai (future-state)"
            body="Hành trình mong muốn sau khi cải thiện. Dùng khi định hướng thiết kế, thống nhất tầm nhìn."
            className="flex-1"
          />
        </div>
        <P>Thường làm bản đồ hiện tại trước, rồi dùng nó làm cơ sở cho bản đồ tương lai.</P>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "target",
              "Bối cảnh phù hợp",
              [
                "Trải nghiệm đi qua nhiều giai đoạn, nhiều kênh, nhiều bộ phận.",
                "Cần thống nhất giữa các bộ phận về vấn đề và ưu tiên.",
                "Sau nghiên cứu, cần tổng hợp dữ liệu theo trình tự thời gian.",
              ],
            ],
            ["eye", "Dấu hiệu nhận biết", ["Mỗi bộ phận có một con số tốt nhưng trải nghiệm chung vẫn kém.", "Khách phàn nàn ở những chỗ “giữa” các bộ phận."]],
            ["clipboard-check", "Điều kiện cần", ["Dữ liệu nghiên cứu (phỏng vấn, diary study, field study, analytics).", "Đại diện các bộ phận tham gia dựng bản đồ."]],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[340]}
          rows={[
            { icon: "ban", cells: ["Chưa có dữ liệu nghiên cứu", "Bản đồ chỉ là giả định.", "Nghiên cứu trước; hoặc ghi rõ là bản đồ giả thuyết."] },
            { icon: "component", cells: ["Cần chi tiết từng bước trên giao diện", "Journey map ở mức giai đoạn.", "User flow."] },
            { icon: "briefcase", cells: ["Cần thể hiện quy trình nội bộ", "Journey map tập trung vào khách.", "Service blueprint."] },
            { icon: "users", cells: ["Không có ai sẽ dùng bản đồ", "Tài liệu đẹp nhưng không dẫn tới hành động.", "Xác định người dùng bản đồ và quyết định cần đưa ra trước."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định mục tiêu và phạm vi.", "Bản đồ dùng để quyết định gì; nhân vật và kịch bản nào.", "Mục tiêu, nhân vật, kịch bản."],
            ["Thu thập và rà soát dữ liệu.", "", "Dữ liệu nghiên cứu đã sắp xếp."],
            ["Xác định các giai đoạn.", "Theo cách khách trải qua, không theo cơ cấu bộ phận.", "Danh sách giai đoạn."],
            ["Điền hành động, suy nghĩ, cảm xúc.", "Mỗi nội dung gắn với dữ liệu; dùng trích dẫn thật.", "Bản nháp bản đồ."],
            ["Tìm điểm đứt gãy và cơ hội.", "", "Hàng cơ hội."],
            ["Hoàn thiện và chia sẻ.", "Thiết kế để dễ đọc; giao người phụ trách từng cơ hội.", "Journey map, kế hoạch hành động."],
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["users", "Bản đồ là bản tóm tắt", "Một nhân vật và một kịch bản không thể hiện hết các hành trình khác."],
            ["analytics", "Đường cảm xúc là tổng hợp định tính", "Không phải số đo chính xác."],
            ["hourglass", "Bản đồ cũ dần", "Hành trình thay đổi khi sản phẩm và hoàn cảnh thay đổi."],
            ["lightbulb", "Bản đồ tương lai là giả thuyết", "Cần kiểm chứng."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Mục tiêu bản đồ, nhân vật, kịch bản.", "Dữ liệu nghiên cứu.", "Đại diện các bộ phận."]}
          outputs={["Journey map hiện tại (và tương lai nếu cần).", "Danh sách cơ hội, người phụ trách."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <div className="flex gap-4">
          <InfoCard
            icon="analytics"
            title="Bối cảnh"
            className="flex-1"
            body="Nhóm đã có dữ liệu từ diary study, field study và heatmap về hành trình đặt lịch tư vấn. Các bộ phận chưa thống nhất nên cải thiện ở đâu."
          />
          <InfoCard
            icon="users"
            title="Cách áp dụng"
            className="flex-1"
            body="Buổi làm việc nửa ngày với đại diện marketing, sản phẩm và hỗ trợ khách hàng. Dựng bản đồ hiện tại cho nhân vật “khách lần đầu” như sơ đồ ở trên."
          />
        </div>
        <Table
          head={["Giai đoạn", "Điểm đứt gãy tìm được (giả định)"]}
          widths={[220]}
          rows={[
            { icon: "alert", highlight: true, cells: ["So sánh", "Cảm xúc thấp nhất; khách lo không đáng tiền và cần hỏi người thân."] },
            { icon: "calendar", cells: ["Đặt lịch", "Bị gián đoạn, mất thông tin đã nhập."] },
            { icon: "dots", cells: ["Sau tư vấn", "Không rõ bước tiếp theo."] },
          ]}
        />
        <InfoCard
          tone="fill"
          icon="check-circle"
          title="Quyết định"
          body="Ưu tiên giai đoạn So sánh (tóm tắt chi phí dễ chia sẻ, giao cho nhóm nội dung) và Đặt lịch (tự lưu thông tin, giao cho nhóm sản phẩm). Dựng bản đồ tương lai cho hai giai đoạn này."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Dựng từ giả định", "Bản đồ phản ánh nhóm, không phải khách.", "Dựa trên dữ liệu; ghi rõ phần giả thuyết."],
            ["Giai đoạn theo bộ phận", "Không đúng với cách khách trải qua.", "Giai đoạn theo góc nhìn khách."],
            ["Gộp nhiều nhân vật vào một bản đồ", "Hành trình bị lẫn.", "Một nhân vật và một kịch bản mỗi bản đồ."],
            ["Không có hàng cơ hội", "Bản đồ không dẫn tới hành động.", "Luôn có cơ hội và người phụ trách."],
            ["Làm một mình", "Các bộ phận không tin hay không dùng.", "Dựng cùng đại diện các bộ phận."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Tài liệu", "Phạm vi", "Khi nào chọn"]}
          widths={[260]}
          rows={[
            { icon: "split", highlight: true, cells: ["Journey Map", "Một nhân vật, một kịch bản, gắn với sản phẩm hoặc dịch vụ.", "Cải thiện trải nghiệm cụ thể."] },
            { icon: "binoculars", cells: ["Experience Map", "Trải nghiệm rộng của con người, không gắn với một sản phẩm.", "Hiểu bối cảnh chung trước khi có sản phẩm."] },
            { icon: "briefcase", cells: ["Service Blueprint", "Journey của khách cộng quy trình, hệ thống nội bộ phía sau.", "Cải thiện vận hành dịch vụ."] },
            { icon: "component", cells: ["User Flow", "Các bước trên giao diện để hoàn thành một tác vụ.", "Thiết kế chi tiết tương tác."] },
            { icon: "users", cells: ["Empathy Map", "Không theo thời gian; bốn góc nhìn về người dùng.", "Tổng hợp nhanh về người dùng."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="target"
            title="Phạm vi"
            items={["Có mục tiêu bản đồ và người sẽ dùng nó.", "Một nhân vật, một kịch bản.", "Dựa trên dữ liệu nghiên cứu.", "Giai đoạn theo góc nhìn khách."]}
          />
          <ChecklistColumn
            icon="split"
            title="Nội dung và sử dụng"
            items={["Có hành động, suy nghĩ, cảm xúc ở mỗi giai đoạn.", "Có hàng cơ hội và người phụ trách.", "Có kế hoạch cập nhật bản đồ."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Customer Journey", "Hành trình khách hàng", "Hành trình thật mà bản đồ mô tả."],
            ["User Flow", "Luồng tương tác của người dùng", "Chi tiết các bước trên giao diện."],
            ["Service Design", "Thiết kế dịch vụ", "Service blueprint mở rộng journey map."],
            ["Empathy Mapping", "Bản đồ thấu cảm", "Tài liệu bổ sung, không theo thời gian."],
            ["Diary Study", "Nghiên cứu nhật ký", "Nguồn dữ liệu theo thời gian."],
            ["Field Study", "Nghiên cứu thực địa", "Nguồn dữ liệu về bối cảnh."],
            ["Jobs to be Done (JTBD)", "Công việc cần hoàn thành", "Kịch bản của bản đồ thường là một job."],
            ["Task Analysis", "Phân tích tác vụ", "Đi sâu vào các bước trong một giai đoạn của hành trình."],
          ]}
        />
      </Section>
    </div>
  );
}

export const JOURNEY_MAPPING: Article = {
  slug: "journey-mapping",
  version: 1,
  term: "Journey Mapping",
  fn: 2,
  vi: "Lập bản đồ hành trình",
  kind: "Tài liệu / sơ đồ thiết kế",
  definition:
    "Journey map là hình ảnh trực quan mô tả quá trình một người trải qua để đạt một mục tiêu, gồm các giai đoạn, hành động, suy nghĩ, cảm xúc và cơ hội cải thiện. Journey mapping là hoạt động cùng nhau dựng tài liệu đó từ dữ liệu nghiên cứu.",
  definitionMore: "Bản đồ giúp cả nhóm nhìn chung một hành trình và thống nhất nên cải thiện ở đâu.",
  oneLine: "Hình ảnh mô tả các giai đoạn, hành động và cảm xúc của một người khi đạt một mục tiêu.",
  glance: [
    ["5", "Thành phần theo NN/g"],
    ["2", "Loại: hiện tại, tương lai"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Customer journey map", "User journey map"] },
    { label: "Nhóm chính", items: ["Tổng hợp và mô hình hóa"] },
    { label: "Thẻ phụ", items: ["Nghiên cứu khám phá"] },
    {
      label: "Lưu ý tên gọi",
      items: ["Bài này nói về hoạt động lập bản đồ và tài liệu journey map. Khái niệm hành trình mà khách thật sự trải qua được trình bày ở bài Customer Journey."],
    },
  ],
  sections: SECTIONS,
  Body,
};
