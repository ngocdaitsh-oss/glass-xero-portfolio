"use client";

import { Blk, T } from "./edit";
import { CheckCards, Formula, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Jobs to be Done — copy from ux-glossary/jobs-to-be-done.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "parts", title: "Thành phần của một job", icon: "component" },
  { id: "story", title: "Job story", icon: "pencil" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "maths", title: "Công thức và ví dụ tính", icon: "sigma" },
  { id: "limits", title: "Giới hạn: khi nào JTBD chưa đủ", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** Opportunity = importance + gap, drawn as a stacked bar out of 20. */
function Opportunity() {
  const rows: [string, number, number, boolean][] = [
    ["Biết trước tổng chi phí", 8.6, 5.4, true],
    ["Chọn được giờ phù hợp", 7.9, 1.8, false],
    ["Xem được hồ sơ chuyên gia", 7.0, 0, false],
  ];
  const pct = (v: number) => `${(v / 20) * 100}%`;
  return (
    <Blk label="biểu đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="bar-chart" size={36} iconSize={18} radius={10} />
        <Eyebrow>Điểm cơ hội = Mức quan trọng + Khoảng thiếu hụt</Eyebrow>
      </div>
      <div className="flex flex-col gap-3">
        {rows.map(([name, imp, gap, on]) => (
          <div key={name} className="flex items-center gap-5">
            <span className="w-[230px] shrink-0 text-[17px] leading-6 font-semibold">{name}</span>
            <div className="flex h-10 flex-1 gap-1 rounded-xl bg-[var(--d-well)]">
              <span className={`h-full rounded-xl ${on ? "bg-[var(--d-fill)]" : "bg-[var(--d-ci)]"}`} style={{ width: pct(imp) }} />
              {gap ? <span className="h-full rounded-xl bg-[var(--d-bad-soft)]" style={{ width: pct(gap) }} /> : null}
            </div>
            <span className="w-[80px] shrink-0 text-right font-mono text-[16px] font-semibold">{String((imp + gap).toFixed(1)).replace(".", ",")}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-5 text-[15px] leading-[22px] text-[var(--w-muted)]">
        <span className="flex items-center gap-2">
          <span className="size-3.5 rounded-[4px] bg-[var(--d-ci)]" /> Mức quan trọng
        </span>
        <span className="flex items-center gap-2">
          <span className="size-3.5 rounded-[4px] bg-[var(--d-bad-soft)]" /> Khoảng thiếu hụt
        </span>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        “Xem được hồ sơ chuyên gia” có khoảng thiếu hụt âm (7,0 − 8,0) nên lấy 0: khách đã hài lòng hơn mức họ coi trọng.
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
            Nhóm thường mô tả khách hàng bằng đặc điểm: tuổi, thu nhập, nghề nghiệp. Nhưng hai người cùng đặc điểm có thể mua cùng một dịch vụ vì hai lý do hoàn toàn khác nhau, và hai
            người rất khác nhau có thể mua vì cùng một lý do. Đặc điểm không giải thích được vì sao người ta chọn.
          </P>
          <P strong>
            JTBD chuyển trọng tâm sang hoàn cảnh và tiến triển mong muốn. Khi hiểu khách hàng “thuê” dịch vụ để làm gì, nhóm thấy cả đối thủ thật (kể cả những thứ không cùng ngành) và cơ
            hội chưa được phục vụ.
          </P>
        </div>
        <Eyebrow>JTBD hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          cols={3}
          minH={170}
          items={[
            ["users", "Sản phẩm thật sự cạnh tranh với ai", "Bất cứ thứ gì khách có thể “thuê” cho cùng một job."],
            ["component", "Tính năng nào đáng làm", "Tính năng giúp hoàn thành job tốt hơn."],
            ["lightbulb", "Nhu cầu nào chưa được phục vụ", "Điểm cơ hội."],
          ]}
        />
      </Section>

      <Section {...S.parts}>
        <Table
          head={["Thành phần", "Mô tả", "Ví dụ minh họa (giả định)"]}
          widths={[260]}
          rows={[
            { icon: "target", cells: ["Hoàn cảnh", "Tình huống làm nảy sinh nhu cầu.", "Vừa nhận một khoản tiền lớn, chưa biết xử lý thế nào."] },
            { icon: "arrows", highlight: true, cells: ["Tiến triển mong muốn", "Điều người đó muốn đạt được.", "Đưa ra quyết định tài chính mà mình yên tâm."] },
            { icon: "check-circle", cells: ["Khía cạnh chức năng", "Việc cần làm được.", "Biết các lựa chọn và rủi ro."] },
            { icon: "lightbulb", cells: ["Khía cạnh cảm xúc", "Mình muốn cảm thấy thế nào.", "Tự tin, không lo bị lừa."] },
            { icon: "users", cells: ["Khía cạnh xã hội", "Mình muốn người khác nhìn mình thế nào.", "Được gia đình thấy là người cẩn trọng."] },
            { icon: "ban", cells: ["Rào cản", "Điều khiến người đó ngại thay đổi.", "Sợ tốn tiền cho lời khuyên chung chung."] },
          ]}
        />
      </Section>

      <Section {...S.story}>
        <P>
          Job story là cách viết nhu cầu theo JTBD, thường được ghi nhận cho Alan Klement và nhóm Intercom (khoảng năm 2013). Job story thay nhân vật (persona) bằng hoàn cảnh.
        </P>
        <Formula label="Cấu trúc job story" formula="Khi [hoàn cảnh], tôi muốn [động cơ], để tôi có thể [kết quả mong đợi]." />
        <div className="flex gap-4">
          <InfoCard icon="file" title="User story (truyền thống)" body="Là một khách hàng, tôi muốn xem bảng giá để biết chi phí." className="flex-1" />
          <InfoCard
            tone="fill"
            icon="pencil"
            title="Job story"
            body="Khi tôi đang cân nhắc có nên tư vấn không, tôi muốn biết trước tổng chi phí, để tôi có thể bàn với gia đình trước khi đặt lịch."
            className="flex-1"
          />
        </div>
        <P>
          Job story cho biết vì sao và trong hoàn cảnh nào, giúp nhóm thiết kế đúng thứ cần thiết (ví dụ: bảng giá dễ chia sẻ cho người thân, không chỉ là bảng giá).
        </P>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            ["target", "Bối cảnh phù hợp", ["Định hướng sản phẩm, tìm cơ hội mới.", "Hiểu vì sao khách chọn hoặc bỏ sản phẩm.", "Viết yêu cầu thiết kế gắn với hoàn cảnh thật."]],
            ["eye", "Dấu hiệu nhận biết", ["Persona hiện có không giải thích được hành vi.", "Nhóm thêm tính năng nhưng khách vẫn không chọn."]],
            ["clipboard-check", "Điều kiện cần", ["Phỏng vấn khách hàng về quyết định thật họ đã đưa ra (khi nào, vì sao, đã cân nhắc gì)."]],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[340]}
          rows={[
            { icon: "component", cells: ["Cần sửa chi tiết giao diện", "JTBD ở mức chiến lược, không chỉ ra lỗi giao diện.", "Usability testing, heuristic evaluation."] },
            { icon: "split", cells: ["Cần mô tả hành vi theo trình tự", "JTBD không mô tả từng bước.", "Journey mapping."] },
            { icon: "ban", cells: ["Job được viết ra mà không có nghiên cứu", "Chỉ là giả định của nhóm.", "Phỏng vấn khách hàng trước."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            [
              "Phỏng vấn về quyết định thật.",
              "Hỏi khách đã chọn (hoặc bỏ) dịch vụ thế nào: hoàn cảnh, những gì đã thử, điều khiến họ quyết định.",
              "Ghi chép phỏng vấn.",
            ],
            ["Xác định job.", "Hoàn cảnh, tiến triển mong muốn, các khía cạnh.", "Danh sách job."],
            ["Viết job story.", "", "Job story cho các job chính."],
            ["Liệt kê kết quả mong muốn của từng job.", "Những điều khách dùng để đánh giá job được hoàn thành tốt.", "Danh sách kết quả mong muốn."],
            ["Đo mức quan trọng và mức hài lòng (nếu cần ưu tiên).", "Khảo sát khách về từng kết quả mong muốn.", "Điểm cơ hội."],
            ["Ưu tiên và thiết kế.", "", "Cơ hội ưu tiên, ý tưởng giải pháp."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <P>
          Phương pháp Outcome-Driven Innovation (Tony Ulwick, Strategyn) dùng điểm cơ hội để tìm kết quả mong muốn đang bị phục vụ kém: quan trọng với khách nhưng khách chưa hài lòng.
        </P>
        <Formula label="Khoảng thiếu hụt" formula="Mức quan trọng − Mức hài lòng (nếu ra số âm thì lấy 0)" />
        <Formula
          label="Điểm cơ hội"
          formula="Mức quan trọng + Khoảng thiếu hụt"
          note="Khoảng thiếu hụt lấy 0 khi âm, vì khách đã hài lòng hơn mức họ coi trọng; điều đó không tạo thêm cơ hội."
        />
        <Subhead icon="bar-chart">Ví dụ thay số</Subhead>
        <Callout tone="scenario">
          Số liệu minh họa, không phải dữ liệu thật. Khảo sát khách đang cân nhắc dịch vụ tư vấn. Mỗi kết quả mong muốn được chấm mức quan trọng và mức hài lòng trên thang 0–10 (thang
          giả định cho ví dụ). Con số trong bảng là trung bình.
        </Callout>
        <Table
          head={["Kết quả mong muốn", "Quan trọng", "Hài lòng", "Khoảng thiếu hụt", "Điểm cơ hội"]}
          widths={[280, 120, 120]}
          rows={[
            { highlight: true, cells: ["Biết trước tổng chi phí", "8,6", "3,2", "8,6 − 3,2 = 5,4", "8,6 + 5,4 = 14,0"] },
            { cells: ["Chọn được giờ phù hợp", "7,9", "6,1", "7,9 − 6,1 = 1,8", "7,9 + 1,8 = 9,7"] },
            { cells: ["Xem được hồ sơ chuyên gia", "7,0", "8,0", "7,0 − 8,0 = −1,0 → lấy 0", "7,0 + 0 = 7,0"] },
          ]}
        />
        <Opportunity />
        <Callout tone="note" title="Diễn giải">
          “Biết trước tổng chi phí” có điểm cơ hội cao nhất: khách rất coi trọng nhưng ít hài lòng. “Xem được hồ sơ chuyên gia” đã được phục vụ tốt hơn mức khách cần.
        </Callout>
        <InfoCard
          tone="fill"
          icon="check-circle"
          title="Quyết định"
          body="Ưu tiên thiết kế lại phần thông tin chi phí. Điểm cơ hội dùng để xếp thứ tự, không phải ngưỡng tuyệt đối; nhóm cần kiểm tra số người trả lời đủ để thứ tự ổn định."
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["dots", "Job có thể được viết quá chung", "(“muốn cuộc sống tốt hơn”), không dẫn tới thiết kế cụ thể."],
            ["chat", "Điểm cơ hội phụ thuộc vào cách đặt câu hỏi", "Và nhóm người trả lời."],
            ["play-circle", "Không thay usability test", "Biết đúng job nhưng giao diện vẫn có thể khó dùng."],
            ["split", "Các trường phái JTBD khác nhau", "Về cách định nghĩa và áp dụng; nên thống nhất một cách trong nhóm."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Phỏng vấn khách về quyết định thật.", "Khảo sát mức quan trọng và hài lòng (nếu cần ưu tiên)."]}
          outputs={["Danh sách job, job story.", "Kết quả mong muốn và điểm cơ hội.", "Cơ hội ưu tiên cho thiết kế."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <div className="flex gap-4">
          <InfoCard
            icon="users"
            title="Bối cảnh"
            className="flex-1"
            body="Nhóm mô tả khách theo độ tuổi và thu nhập nhưng không giải thích được vì sao nhiều khách xem trang rồi bỏ."
          />
          <InfoCard
            icon="chat"
            title="Cách áp dụng"
            className="flex-1"
            body="Phỏng vấn 10 khách đã đặt lịch và 10 khách đã bỏ, hỏi về hoàn cảnh và quá trình quyết định."
          />
        </div>
        <Callout tone="good" title="Job chính tìm được (giả định)">
          Khi tôi vừa có một thay đổi tài chính lớn, tôi muốn có người hiểu biết giúp tôi xem xét các lựa chọn, để tôi có thể quyết định mà không lo mình đã bỏ sót điều gì.
        </Callout>
        <InfoCard
          icon="arrows"
          title="Đối thủ thật"
          body="Không chỉ các dịch vụ tư vấn khác, mà cả việc hỏi người quen, đọc diễn đàn, hoặc chờ thêm."
        />
        <InfoCard
          tone="fill"
          icon="check-circle"
          title="Quyết định"
          body="Dựa trên điểm cơ hội (phần tính toán ở trên), ưu tiên làm rõ chi phí; viết nội dung trang theo hoàn cảnh (“Khi bạn vừa nhận một khoản tiền lớn…”) thay vì theo đặc điểm khách hàng."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Viết job là tính năng (“muốn có bộ lọc”)", "Tính năng là giải pháp, không phải job.", "Hỏi “để làm gì?” cho đến khi thấy tiến triển mong muốn."],
            ["Job quá chung", "Không dẫn tới thiết kế.", "Gắn với hoàn cảnh cụ thể."],
            ["Bỏ qua khía cạnh cảm xúc, xã hội", "Chỉ thấy một phần lý do.", "Hỏi cả cảm nhận và quan hệ với người khác."],
            ["Viết job không qua nghiên cứu", "Chỉ là giả định.", "Phỏng vấn quyết định thật."],
            ["Quên lấy 0 khi khoảng thiếu hụt âm", "Điểm cơ hội bị giảm sai.", "Áp dụng đúng quy tắc."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Trọng tâm", "Khi nào chọn"]}
          widths={[280]}
          rows={[
            { icon: "target", highlight: true, cells: ["Jobs to be Done", "Hoàn cảnh và tiến triển mong muốn.", "Định hướng sản phẩm, hiểu vì sao khách chọn."] },
            { icon: "users", cells: ["User Persona", "Đặc điểm và hành vi của một nhóm người dùng.", "Tham chiếu chung về người dùng."] },
            { icon: "file", cells: ["User Story", "Yêu cầu tính năng theo vai trò.", "Lập kế hoạch phát triển."] },
            { icon: "split", cells: ["Customer Journey", "Trải nghiệm theo thời gian.", "Thấy trình tự và điểm đứt gãy."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="target"
            title="Job"
            items={[
              "Job dựa trên phỏng vấn về quyết định thật.",
              "Job mô tả hoàn cảnh và tiến triển, không phải tính năng.",
              "Có cả khía cạnh chức năng, cảm xúc, xã hội.",
            ]}
          />
          <ChecklistColumn
            icon="sigma"
            title="Viết và ưu tiên"
            items={["Job story có đủ “Khi… tôi muốn… để tôi có thể…”.", "Nếu tính điểm cơ hội: khoảng thiếu hụt âm được lấy 0.", "Biết đối thủ thật của job."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["User Persona", "Chân dung người dùng", "Cách mô tả người dùng khác, theo đặc điểm."],
            ["Customer Journey", "Hành trình khách hàng", "Hành trình hoàn thành một job."],
            ["Journey Mapping", "Lập bản đồ hành trình", "Thể hiện quá trình hoàn thành job theo thời gian."],
            ["Ideation", "Tạo ý tưởng", "Tạo giải pháp sau khi xác định job."],
            ["Survey", "Khảo sát", "Cách đo mức quan trọng và hài lòng."],
            ["Empathy Mapping", "Bản đồ thấu cảm", "Bổ sung khía cạnh cảm xúc của job."],
            ["Voice of the Customer (VoC)", "Tiếng nói khách hàng", "Cách tiếp cận gần: nhu cầu bằng lời khách hàng, có phân cấp và ưu tiên."],
          ]}
        />
      </Section>
    </div>
  );
}

export const JOBS_TO_BE_DONE: Article = {
  slug: "jobs-to-be-done",
  version: 1,
  term: "Jobs to be Done (JTBD)",
  fn: 2,
  vi: "Công việc cần hoàn thành",
  kind: "Nguyên tắc / khái niệm",
  definition:
    "Jobs to be Done là cách nhìn cho rằng người ta không mua sản phẩm vì đặc điểm của sản phẩm, mà “thuê” sản phẩm để giúp họ đạt được một tiến triển trong một hoàn cảnh cụ thể.",
  definitionMore: "Thay vì hỏi “khách hàng là ai?”, JTBD hỏi “khách hàng đang cố làm được điều gì, trong hoàn cảnh nào?”",
  oneLine: "Hiểu khách hàng qua tiến triển họ muốn đạt được trong một hoàn cảnh, không qua đặc điểm nhân khẩu.",
  glance: [
    ["3", "Khía cạnh: chức năng, cảm xúc, xã hội"],
    ["14,0", "Điểm cơ hội cao nhất trong ví dụ"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Jobs theory", "Outcome-Driven Innovation"] },
    { label: "Nhóm chính", items: ["Nghiên cứu khám phá"] },
    { label: "Thẻ phụ", items: ["Chiến lược sản phẩm"] },
    {
      label: "Lưu ý tên gọi",
      items: ["“Job” không phải nghề nghiệp, mà là tiến triển một người muốn đạt được trong một hoàn cảnh cụ thể. Có nhiều trường phái JTBD; bài này giới thiệu ý tưởng chung, job story và điểm cơ hội."],
    },
  ],
  sections: SECTIONS,
  Body,
};
