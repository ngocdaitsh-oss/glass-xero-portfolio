"use client";

import { Blk, T } from "./edit";
import {
  Arrow,
  Callout,
  ChecklistColumn,
  Checks,
  Eyebrow,
  Icon,
  InfoCard,
  Node,
  P,
  Section,
  Stat,
  Subhead,
  Table,
  Tile,
  type IconName,
  type SectionDef,
} from "./ui";

/*
 * A/B Testing — copy from ux-glossary/ab-testing.md (the source of truth for the words), laid out on
 * Figma 2011:28710 "Desktop — Glossary Detail · A/B Testing". The md's editorial notes (what to hide,
 * when to link) are applied rather than shown; "Nguồn tham khảo" and the empty "Tôi đã áp dụng như thế
 * nào?" block are left out on purpose.
 */

/** Bump when the structure below changes, so edits saved against the old structure are dropped. */
export const AB_VERSION = 1;

export const AB_META = {
  slug: "ab-testing",
  term: "A/B Testing",
  vi: "Kiểm thử A/B — thử nghiệm so sánh hai phiên bản",
  kind: "Phương pháp nghiên cứu / kiểm thử",
  definition:
    "A/B testing là phương pháp so sánh hai phiên bản của cùng một trải nghiệm (A là phiên bản hiện tại, B là phiên bản thay đổi). Người dùng thật được chia ngẫu nhiên vào từng phiên bản, rồi nhóm đo hành vi của họ để biết phiên bản nào đạt mục tiêu tốt hơn.",
  definitionMore:
    "Vì chỉ khác nhau ở phần thay đổi và người dùng được chia ngẫu nhiên, chênh lệch đủ tin cậy về mặt thống kê có thể được quy cho chính thay đổi đó, không phải do may rủi hay yếu tố bên ngoài.",
  oneLine: "So sánh hai phiên bản bằng cách chia ngẫu nhiên người dùng thật và đo phiên bản nào đạt mục tiêu tốt hơn.",
  facts: [
    { label: "Tên gọi khác", items: ["Split testing", "Online controlled experiment (thử nghiệm có đối chứng trực tuyến)"] },
    { label: "Nhóm chính", items: ["Kiểm thử và đánh giá"] },
    { label: "Thẻ phụ", items: ["Đo lường và phân tích", "Nghiên cứu định lượng"] },
    { label: "Lưu ý tên gọi", items: ["“Split URL testing” là một dạng A/B testing (mỗi phiên bản ở một URL riêng). “Multivariate testing” là phương pháp khác."] },
  ],
};

export const AB_SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "parts", title: "Thành phần của một A/B test", icon: "component" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "math", title: "Công thức và ví dụ tính", icon: "sigma" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các phương pháp gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];

const S = Object.fromEntries(AB_SECTIONS.map((s, i) => [s.id, { def: s, n: i + 1, total: AB_SECTIONS.length }]));

export function ABTestingBody() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Problem />
      <Parts />
      <When />
      <NotFit />
      <Apply />
      <Maths />
      <Limits />
      <InOut />
      <Example />
      <Mistakes />
      <Compare />
      <Checklist />
      <Related />
    </div>
  );
}

/* 01 ─ Vấn đề giải quyết (2012:28932) */
function Problem() {
  const decisions: [IconName, string, string][] = [
    ["play-circle", "Có ra mắt thay đổi này không", "Thay đổi có cải thiện chỉ số mục tiêu mà không làm hại chỉ số khác không?"],
    ["split", "Chọn phương án nào", "Khi đã có hai phương án hợp lý và cần bằng chứng về hành vi thật."],
    ["bar-chart", "Thay đổi có tác động lớn đến mức nào", "Ước lượng mức chênh lệch, kèm khoảng không chắc chắn."],
    ["analytics", "Có nên tiếp tục đầu tư theo hướng này không", "Kết quả giúp kiểm chứng hoặc bác bỏ một giả thuyết sản phẩm."],
  ];
  return (
    <Section {...S.problem}>
      <div className="flex flex-col gap-5">
        <P>
          Khi nhóm phải chọn giữa hai phương án, tranh luận thường dựa vào ý kiến cá nhân, kinh nghiệm hoặc người có tiếng nói lớn nhất. Đo “trước và sau khi ra mắt”
          cũng dễ sai, vì kết quả có thể thay đổi do mùa vụ, chiến dịch marketing hay sự kiện bên ngoài chứ không phải do thiết kế.
        </P>
        <P strong>
          A/B testing giải quyết vấn đề này bằng cách cho hai phiên bản chạy cùng lúc, trên các nhóm người dùng được chia ngẫu nhiên. Nhờ vậy, mọi yếu tố bên ngoài tác
          động lên cả hai nhóm như nhau.
        </P>
      </div>
      <Eyebrow>A/B testing hỗ trợ các quyết định</Eyebrow>
      <div className="grid grid-cols-2 gap-5">
        {decisions.map(([icon, title, body], i) => (
          <InfoCard key={title} icon={icon} n={i + 1} title={title} body={body} minH={190} />
        ))}
      </div>
    </Section>
  );
}

/* 02 ─ Thành phần của một A/B test (2012:28959) */
function Parts() {
  return (
    <Section {...S.parts}>
      <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
        <div className="flex items-center gap-3">
          <Tile icon="split" size={36} iconSize={18} radius={10} />
          <Eyebrow>Sơ đồ quy trình</Eyebrow>
        </div>
        <div className="flex items-center justify-between">
          <Node title="Người dùng" />
          <Arrow />
          <Node title="Chia ngẫu nhiên" />
          <Arrow />
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <Node title="Phiên bản A" sub="Đối chứng" className="w-[150px]" />
              <Arrow />
              <Node title="Đo hành vi" />
            </div>
            <div className="flex items-center gap-2.5">
              <Node title="Phiên bản B" sub="Thử nghiệm" on className="w-[150px]" />
              <Arrow />
              <Node title="Đo hành vi" />
            </div>
          </div>
          <Arrow />
          <Node title="So sánh" sub="chỉ số chính + bảo vệ" />
          <Arrow />
          <Node title="Quyết định" />
        </div>
        <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
          Người dùng truy cập → hệ thống chia ngẫu nhiên → một nhóm thấy A, một nhóm thấy B → ghi nhận hành vi của từng nhóm → so sánh chỉ số chính và chỉ số bảo vệ →
          quyết định.
        </T>
      </Blk>
      <Table
        head={["Thành phần", "Mô tả", "Ví dụ minh họa (giả định)"]}
        widths={[280]}
        rows={[
          {
            icon: "lightbulb",
            cells: [
              "Giả thuyết",
              "Thay đổi gì, cho ai, kỳ vọng hành vi thay đổi ra sao và vì sao.",
              "“Hiển thị giờ trống trước khi yêu cầu nhập thông tin sẽ giúp nhiều khách hoàn tất đặt lịch hơn, vì họ không phải điền xong mới biết giờ đã hết.”",
            ],
          },
          { icon: "check", cells: ["Phiên bản A (control — đối chứng)", "Trải nghiệm hiện tại.", "Form yêu cầu nhập thông tin trước, chọn giờ sau."] },
          {
            icon: "flask",
            cells: ["Phiên bản B (variant / treatment — thử nghiệm)", "Trải nghiệm có thay đổi. Nên chỉ khác A ở phần cần kiểm chứng.", "Chọn giờ trước, nhập thông tin sau."],
          },
          {
            icon: "users",
            cells: ["Đơn vị chia ngẫu nhiên", "Đối tượng được chia vào A hoặc B: người dùng, phiên truy cập, thiết bị…", "Mỗi người dùng chỉ thấy một phiên bản trong suốt thời gian test."],
          },
          { icon: "split", cells: ["Tỷ lệ phân bổ", "Phần trăm người dùng vào mỗi phiên bản.", "50/50."] },
          {
            icon: "target",
            cells: [
              "Chỉ số chính (primary metric)",
              "Chỉ số được chọn trước để quyết định thắng/thua; phản ánh mục tiêu của giả thuyết.",
              "Tỷ lệ khách mở form và gửi yêu cầu đặt lịch thành công.",
            ],
          },
          {
            icon: "shield-alert",
            cells: ["Chỉ số bảo vệ (guardrail metrics)", "Chỉ số không được xấu đi, kể cả khi chỉ số chính tốt lên.", "Tỷ lệ hủy lịch, tỷ lệ lỗi gửi form, thời gian tải trang."],
          },
          {
            icon: "sigma",
            cells: [
              "Cỡ mẫu và thời gian chạy",
              "Số người cần và thời gian cần để phát hiện mức chênh lệch đáng quan tâm. Tính trước khi chạy.",
              "Tính bằng công cụ tính cỡ mẫu dựa trên tỷ lệ hiện tại và mức chênh lệch muốn phát hiện.",
            ],
          },
          {
            icon: "clipboard-check",
            cells: [
              "Tiêu chí quyết định",
              "Quy tắc đặt trước: khi nào ra mắt B, khi nào giữ A, khi nào cần thêm nghiên cứu.",
              "Ra mắt B nếu chỉ số chính tốt hơn có ý nghĩa thống kê và không có chỉ số bảo vệ nào xấu đi.",
            ],
          },
        ]}
      />
    </Section>
  );
}

/* 03 ─ Khi nào nên dùng (2013:28884) */
function When() {
  const cols: [IconName, string, string[]][] = [
    [
      "target",
      "Bối cảnh phù hợp",
      [
        "Sản phẩm đã ra mắt và có đủ lượng người dùng để đạt cỡ mẫu cần thiết trong thời gian hợp lý.",
        "Có một câu hỏi cụ thể dạng “B có tốt hơn A về chỉ số X không?”.",
        "Kết quả cần đo là hành vi quan sát được (bấm, đăng ký, hoàn thành, mua, quay lại).",
        "Nhóm đã có hai phương án đều hợp lý, và nghiên cứu định tính chưa đủ để chọn.",
        "Chi phí khi chọn sai đủ lớn để đáng đầu tư một thử nghiệm.",
      ],
    ],
    [
      "eye",
      "Dấu hiệu nhận biết",
      [
        "Nhóm tranh luận lâu giữa hai phương án mà không có bằng chứng.",
        "Thay đổi có thể ảnh hưởng đến chỉ số kinh doanh quan trọng và cần kiểm soát rủi ro trước khi áp dụng cho tất cả.",
        "Nhóm muốn tách tác động của thiết kế khỏi tác động của mùa vụ hay chiến dịch.",
      ],
    ],
    [
      "clipboard-check",
      "Điều kiện cần",
      [
        "Hạ tầng chia ngẫu nhiên và ghi nhận sự kiện (analytics) đáng tin cậy.",
        "Chỉ số chính đo được, đã được định nghĩa rõ.",
        "Có người hiểu cách đọc kết quả thống kê, hoặc dùng công cụ có hướng dẫn rõ ràng.",
      ],
    ],
  ];
  return (
    <Section {...S.when}>
      <div className="grid grid-cols-3 gap-5">
        {cols.map(([icon, title, items]) => (
          <Blk key={title} label="thẻ" className="g-card flex flex-col gap-6 rounded-[24px] bg-[var(--w-card)] p-7">
            <div className="flex items-center gap-3">
              <Tile icon={icon} size={40} iconSize={20} />
              <Eyebrow className="text-[var(--d-accent)]">{title}</Eyebrow>
            </div>
            <Checks items={items} />
          </Blk>
        ))}
      </div>
    </Section>
  );
}

/* 04 ─ Khi nào chưa phù hợp (2013:28933) */
function NotFit() {
  return (
    <Section {...S.not}>
      <Table
        head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
        widths={[340]}
        rows={[
          {
            cells: [
              "Lượng truy cập thấp (ví dụ phần lớn website portfolio cá nhân)",
              "Không đạt cỡ mẫu trong thời gian hợp lý; kết quả chủ yếu là nhiễu.",
              "Usability testing, first-click testing, preference test trên prototype.",
            ],
          },
          { cells: ["Cần hiểu vì sao người dùng hành động như vậy", "A/B testing cho biết phiên bản nào tốt hơn, không cho biết nguyên nhân.", "Phỏng vấn, usability testing, session replay."] },
          { cells: ["Sản phẩm chưa ra mắt / mới ở giai đoạn ý tưởng", "Chưa có người dùng thật để chia nhóm.", "Kiểm thử prototype, nghiên cứu khám phá."] },
          {
            cells: [
              "Thay đổi lớn, nhiều phần cùng lúc (redesign toàn bộ)",
              "Nếu B thắng, không biết phần nào tạo ra khác biệt; nếu B thua, khó biết sửa chỗ nào.",
              "Nghiên cứu định tính trước; chia nhỏ thay đổi; hoặc chấp nhận chỉ trả lời câu hỏi “tổng thể tốt hơn không”.",
            ],
          },
          {
            cells: [
              "Muốn tìm phương án tốt nhất trong rất nhiều lựa chọn",
              "A/B testing chỉ so sánh vài phương án đã có.",
              "Ideation, nghiên cứu khám phá, rồi mới A/B test các phương án mạnh nhất.",
            ],
          },
          {
            cells: [
              "Mục tiêu dài hạn khó đo trong thời gian test (niềm tin, giữ chân nhiều tháng)",
              "Chỉ số ngắn hạn có thể không phản ánh tác động dài hạn.",
              "Nghiên cứu dài hạn (longitudinal study), theo dõi nhóm giữ lại (holdout) nếu có hạ tầng.",
            ],
          },
          {
            cells: [
              "Thay đổi liên quan đạo đức, pháp lý, an toàn, accessibility",
              "Không nên cho một nhóm người dùng tiếp tục chịu trải nghiệm gây hại chỉ để so sánh.",
              "Sửa trực tiếp theo tiêu chuẩn; đánh giá chuyên môn.",
            ],
          },
          {
            cells: [
              "Người dùng của hai nhóm ảnh hưởng lẫn nhau (mạng xã hội, chợ hai chiều)",
              "Vi phạm giả định các nhóm độc lập; kết quả bị sai lệch.",
              "Thiết kế thử nghiệm chuyên biệt (chia theo cụm, theo khu vực) với sự hỗ trợ của chuyên gia dữ liệu.",
            ],
          },
        ]}
      />
    </Section>
  );
}

/* 05 ─ Cách áp dụng (2013:29003): eight steps in the frame's three phases. */
function Apply() {
  const phases: { icon: IconName; label: string; name: string; note: string; steps: [string, string, string][] }[] = [
    {
      icon: "calendar",
      label: "Giai đoạn 1",
      name: "Chuẩn bị",
      note: "Từ vấn đề đến tiêu chí đo",
      steps: [
        [
          "Bắt đầu từ vấn đề và bằng chứng.",
          "Xác định vấn đề từ dữ liệu hành vi, nghiên cứu định tính hoặc phản hồi người dùng. Một A/B test tốt thường có lý do rõ ràng, không phải “thử xem sao”.",
          "Mô tả vấn đề, bằng chứng hiện có.",
        ],
        [
          "Viết giả thuyết.",
          "Mẫu gợi ý: “Vì [bằng chứng], chúng tôi tin rằng [thay đổi] cho [nhóm người dùng] sẽ làm [chỉ số] thay đổi theo hướng [tăng/giảm], vì [lý do].”",
          "Giả thuyết có thể bị bác bỏ.",
        ],
        [
          "Chọn chỉ số chính, chỉ số bảo vệ và tiêu chí quyết định.",
          "Chọn một chỉ số chính gắn trực tiếp với giả thuyết. Ghi lại quy tắc quyết định trước khi chạy.",
          "Kế hoạch đo lường.",
        ],
      ],
    },
    {
      icon: "flask",
      label: "Giai đoạn 2",
      name: "Thiết kế & thiết lập",
      note: "Phiên bản B, cỡ mẫu, kiểm tra hạ tầng",
      steps: [
        [
          "Thiết kế phiên bản B.",
          "Thay đổi phải đủ rõ để có thể tạo ra khác biệt, và gắn với giả thuyết. Kiểm tra B trên mọi thiết bị và trình duyệt chính, kể cả trạng thái lỗi và accessibility.",
          "Thiết kế và bản triển khai của B.",
        ],
        [
          "Tính cỡ mẫu và thời gian chạy.",
          "Dùng công cụ tính cỡ mẫu với các đầu vào: tỷ lệ hiện tại của chỉ số chính, mức chênh lệch nhỏ nhất muốn phát hiện (minimum detectable effect), mức ý nghĩa và độ mạnh thống kê (power) mà nhóm chọn. Chạy đủ các chu kỳ tuần để tránh lệch do ngày trong tuần.",
          "Cỡ mẫu mục tiêu, ngày kết thúc dự kiến.",
        ],
        [
          "Kiểm tra trước khi chạy chính thức.",
          "Kiểm tra việc ghi sự kiện; có thể chạy A/A test (hai nhóm cùng thấy A) để xác nhận hệ thống không tự tạo ra khác biệt.",
          "Xác nhận hạ tầng hoạt động đúng.",
        ],
      ],
    },
    {
      icon: "bar-chart",
      label: "Giai đoạn 3",
      name: "Chạy & kết luận",
      note: "Theo dõi sức khỏe, phân tích, ghi lại",
      steps: [
        [
          "Chạy test và theo dõi sức khỏe — không theo dõi để quyết định sớm.",
          "Chỉ theo dõi lỗi kỹ thuật, tỷ lệ phân bổ và chỉ số bảo vệ nghiêm trọng. Không dừng test chỉ vì thấy B “đang thắng”.",
          "Dữ liệu đầy đủ theo kế hoạch.",
        ],
        [
          "Phân tích, quyết định và ghi lại.",
          "Đọc kết quả theo tiêu chí đã đặt; ghi cả test thất bại hoặc không có khác biệt vào kho lưu trữ chung.",
          "Báo cáo kết quả, quyết định, bài học.",
        ],
      ],
    },
  ];
  let step = 0;
  return (
    <Section {...S.apply}>
      <div className="flex flex-col gap-8">
        {phases.map((ph) => (
          <Blk key={ph.name} label="giai đoạn" className="flex gap-8">
            <div className="flex w-[220px] shrink-0 flex-col gap-2 pt-7">
              <Tile icon={ph.icon} size={40} iconSize={20} tone="soft" />
              <Eyebrow size={13} className="mt-2 text-[var(--w-muted)]">
                {ph.label}
              </Eyebrow>
              <T as="h3" className="text-[26px] leading-[34px] font-bold tracking-[-0.8px]">
                {ph.name}
              </T>
              <T as="p" className="text-[15px] leading-[22px] text-[var(--w-secondary)]">
                {ph.note}
              </T>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              {ph.steps.map(([title, body, out]) => {
                step += 1;
                const first = step === 1;
                return (
                  <Blk key={title} label="bước" className="g-card flex gap-6 rounded-[24px] bg-[var(--w-card)] p-7">
                    <span
                      className={`flex size-11 shrink-0 items-center justify-center rounded-full font-mono text-[16px] leading-6 ${first ? "bg-[var(--d-fill)] text-white" : "bg-[var(--d-well)] text-[var(--d-accent)]"}`}
                    >
                      {String(step).padStart(2, "0")}
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <T as="h4" className="text-[22px] leading-[30px] font-semibold tracking-[-0.5px]">
                        {title}
                      </T>
                      <T as="p" className="text-[17px] leading-[26px] tracking-[-0.2px] text-[var(--w-secondary)]">
                        {body}
                      </T>
                      <span className="mt-2 flex items-center gap-2.5 self-start rounded-[10px] bg-[var(--d-well)] px-3 py-1.5">
                        <Icon name="login" size={14} className="text-[var(--w-muted)]" />
                        <span className="font-mono text-[13px] leading-[18px] tracking-[0.4px] text-[var(--w-muted)]">ĐẦU RA</span>
                        <T className="text-[15px] leading-[22px] font-semibold">{out}</T>
                      </span>
                    </div>
                  </Blk>
                );
              })}
            </div>
          </Blk>
        ))}
      </div>
    </Section>
  );
}

/** Formula card (Formulas row): mono label, the formula large, a note below. */
function Formula({ label, formula, note }: { label: string; formula: string; note?: string }) {
  return (
    <Blk label="công thức" className="g-card flex flex-1 flex-col gap-5 rounded-[24px] bg-[var(--w-card)] p-8">
      <Eyebrow size={14}>{label}</Eyebrow>
      <T as="p" className="text-[24px] leading-[34px] font-semibold tracking-[-0.6px]">
        {formula}
      </T>
      {note ? (
        <T as="p" className="text-[16px] leading-6 text-[var(--w-secondary)]">
          {note}
        </T>
      ) : null}
    </Blk>
  );
}

/** "Khoảng tin cậy 95%" chart (2014:29142): two intervals on one axis, 0 line and the MDE line. */
function CIChart() {
  const min = -2;
  const max = 4;
  const x = (v: number) => `${((v - min) / (max - min)) * 100}%`;
  const rows = [
    { who: "12.500 người / nhóm", note: "p ≈ 0,0007 · khoảng không chứa 0", lo: 0.5, hi: 1.9, label: "0,5 … 1,9", strong: true },
    { who: "1.000 người / nhóm", note: "p ≈ 0,34 · khoảng chứa 0 → chưa đủ bằng chứng", lo: -1.3, hi: 3.7, label: "−1,3 … 3,7", strong: false },
  ];
  return (
    <Blk label="biểu đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-end justify-between gap-6">
        <div className="flex items-center gap-4">
          <Tile icon="dots" size={48} iconSize={22} radius={12} tone="solid" />
          <div className="flex flex-col gap-1">
            <Eyebrow size={13}>Khoảng tin cậy 95% cho chênh lệch (điểm %)</Eyebrow>
            <T as="h4" className="text-[24px] leading-8 font-semibold tracking-[-0.6px]">
              Cùng chênh lệch 1,2 điểm — nhóm càng đông, khoảng càng hẹp
            </T>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-6 text-[14px] leading-5 text-[var(--w-secondary)]">
          <span className="flex items-center gap-2">
            <span className="h-0.5 w-4 bg-[var(--w-text)]" />0 = không khác biệt
          </span>
          <span className="flex items-center gap-2">
            <span className="w-4 border-t-2 border-dashed border-[var(--d-accent)]" />
            MDE = 1 điểm
          </span>
        </div>
      </div>
      <div className="flex">
        <div className="flex w-[230px] shrink-0 flex-col justify-around gap-8 py-6">
          {rows.map((r) => (
            <div key={r.who} className="flex flex-col gap-1">
              <T className="text-[17px] leading-6 font-semibold">{r.who}</T>
              <T className="text-[14px] leading-5 text-[var(--w-muted)]">{r.note}</T>
            </div>
          ))}
        </div>
        <div className="relative flex-1">
          {/* grid + axis */}
          {[-1, 0, 1, 2, 3, 4].map((v) => (
            <span key={v} className="absolute top-0 bottom-8" style={{ left: x(v) }}>
              <span className={`absolute inset-y-0 w-px ${v === 0 ? "bg-[var(--w-text)]" : "bg-[var(--d-line)]"}`} />
              <span className="absolute -bottom-8 -translate-x-1/2 font-mono text-[13px] leading-5 text-[var(--w-muted)]">{v > 0 ? `+${v}` : v === 0 ? "0" : `−${-v}`}</span>
            </span>
          ))}
          <span className="absolute top-0 bottom-8 border-l-2 border-dashed border-[var(--d-accent)]" style={{ left: x(1) }} />
          <div className="relative flex flex-col justify-around gap-8 pt-6 pb-14">
            {rows.map((r) => (
              <div key={r.who} className="relative h-[52px]">
                {/* Label sits over the interval's upper end, clear of the 0 and MDE lines. */}
                <span
                  className={`absolute top-0 -translate-x-full font-mono text-[14px] leading-5 whitespace-nowrap ${r.strong ? "text-[var(--d-accent)]" : "text-[var(--w-secondary)]"}`}
                  style={{ left: x(r.hi) }}
                >
                  {r.label}
                </span>
                <span
                  className={`absolute top-[32px] h-2 -translate-y-1/2 rounded-full ${r.strong ? "bg-[var(--d-ci)]" : "bg-[var(--d-ci-weak)]"}`}
                  style={{ left: x(r.lo), right: `calc(100% - ${x(r.hi)})` }}
                />
                {[r.lo, r.hi].map((v) => (
                  <span key={v} className={`absolute top-[32px] h-5 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full ${r.strong ? "bg-[var(--d-fill)]" : "bg-[var(--w-muted)]"}`} style={{ left: x(v) }} />
                ))}
                <span
                  className={`absolute top-[32px] size-4 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-[var(--w-card)] ${r.strong ? "bg-[var(--d-fill)]" : "bg-[var(--w-muted)]"}`}
                  style={{ left: x(1.2) }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Blk>
  );
}

/* 06 ─ Công thức và ví dụ tính (2014:28884) */
function Maths() {
  const four: [IconName, string][] = [
    ["target", "Cải thiện đúng chỉ số chính đã chọn."],
    ["gauge", "Có mức cải thiện đủ lớn để đáng triển khai."],
    ["bar-chart", "Có đủ bằng chứng rằng chênh lệch không chỉ do may rủi."],
    ["shield-alert", "Không làm xấu các chỉ số quan trọng khác."],
  ];
  const conditions = [
    "Người dùng được chia ngẫu nhiên vào hai nhóm.",
    "Một người luôn thấy cùng một phiên bản; không chia lại ở mỗi lần truy cập.",
    "Hai nhóm chạy đồng thời, trong cùng khoảng thời gian.",
    "Người tham gia đại diện cho nhóm sẽ nhận thay đổi khi ra mắt.",
    "Chạy đủ ít nhất một đến hai chu kỳ hành vi trọn vẹn (thường tối thiểu một tuần nếu hành vi thay đổi theo ngày).",
    "Không dừng thử nghiệm ngay khi thấy p-value vừa xuống dưới ngưỡng.",
    "Không thay đổi thiết kế hay cách ghi sự kiện giữa chừng.",
    "Kiểm tra tỷ lệ chia nhóm thực tế có đúng như thiết lập không (sample ratio mismatch — SRM). Lệch bất thường thường là dấu hiệu lỗi kỹ thuật; khi đó tìm nguyên nhân trước khi đọc kết quả.",
    "Sự kiện được ghi đầy đủ ở cả hai phiên bản; không có sự cố hay chiến dịch bên ngoài chỉ dẫn về một phiên bản.",
    "Không chạy đồng thời thử nghiệm khác gây ảnh hưởng lên cùng nhóm người dùng.",
  ];
  const rule = ["p-value nhỏ hơn mức đã chốt trước (ví dụ 0,05).", "Khoảng tin cậy của chênh lệch không chứa 0.", "Mức tăng đạt MDE.", "Chỉ số bảo vệ không xấu đi."];
  return (
    <Section
      {...S.math}
      intro="Trong A/B testing, phiên bản “tốt hơn” không đơn giản là phiên bản có con số cao hơn một chút. Đó là phiên bản:"
    >
      <div className="grid grid-cols-4 gap-4">
        {four.map(([icon, text], i) => (
          <InfoCard key={text} icon={icon} n={i + 1} title={text} minH={220} />
        ))}
      </div>
      <P>
        Phần này đi qua từng điều kiện bằng một ví dụ thay số, tiếp nối tình huống đặt lịch tư vấn ở phần Ví dụ áp dụng. Các công thức chỉ dùng cộng, trừ, nhân, chia;
        phần cần tính phức tạp hơn được làm bằng công cụ tính.
      </P>

      <Subhead icon="clipboard-check">Xác định tiêu chí trước khi chạy</Subhead>
      <P>Ví dụ thử nghiệm đổi thứ tự bước trong form đặt lịch:</P>
      <Table
        head={["Loại chỉ số", "Trong ví dụ"]}
        widths={[420]}
        rows={[
          { cells: ["Chỉ số chính (primary metric)", "Tỷ lệ người mở form gửi yêu cầu đặt lịch thành công."] },
          { cells: ["Chỉ số phụ (secondary metrics)", "Thời gian hoàn tất form; số lần đổi khung giờ."] },
          { cells: ["Chỉ số bảo vệ (guardrail metrics)", "Tỷ lệ lỗi gửi form; tỷ lệ hủy lịch sau khi đặt; thời gian tải trang."] },
          { cells: ["Mức cải thiện tối thiểu (MDE — minimum detectable effect)", "Mức tăng nhỏ nhất đáng để triển khai: ví dụ tăng ít nhất 1 điểm phần trăm."] },
        ]}
      />
      <P>Chốt các tiêu chí này trước khi chạy và ghi lại. Nếu chạy xong mới chọn chỉ số nào đang đẹp nhất, rất dễ đi đến kết luận sai.</P>

      <Subhead icon="sigma">Công thức</Subhead>
      <div className="flex gap-4">
        <Formula label="Tỷ lệ chuyển đổi" formula="Số người hoàn thành ÷ Số người trong nhóm" />
        <Formula label="Chênh lệch" formula="Tỷ lệ của B − Tỷ lệ của A" note="Đơn vị: điểm phần trăm." />
        <Formula label="Mức tăng tương đối" formula="Chênh lệch ÷ Tỷ lệ của A × 100%" />
      </div>

      <Subhead icon="list">Ví dụ thay số</Subhead>
      <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật.</Callout>
      <Table
        head={["", "Phiên bản A (nhập thông tin trước)", "Phiên bản B (chọn giờ trước)"]}
        widths={[300]}
        rows={[
          { cells: ["Số người mở form", "12.500", "12.500"] },
          { cells: ["Số người gửi thành công", "1.000", "1.150"] },
          { cells: ["Tỷ lệ chuyển đổi", "1.000 ÷ 12.500 = 8,0%", "1.150 ÷ 12.500 = 9,2%"] },
        ]}
      />
      <div className="flex gap-4">
        <Stat value="8,0%" label="Tỷ lệ A" note="Nhập thông tin trước" />
        <Stat value="9,2%" label="Tỷ lệ B" note="Chọn giờ trước" fill />
        <Stat value="+1,2" label="Chênh lệch" note="9,2% − 8,0% = 1,2 điểm phần trăm" />
        <Stat value="+15%" label="Mức tăng tương đối" note="1,2 ÷ 8,0 × 100% = 15%" />
      </div>
      <P>Nhưng chỉ nhìn thấy “tăng 15%” vẫn chưa đủ. Cần kiểm tra xem chênh lệch đó có thể chỉ do may rủi hay không.</P>

      <Subhead icon="shield-alert">Kiểm tra độ tin cậy của kết quả</Subhead>
      <P>
        Ý tưởng: mỗi nhóm chỉ là một phần người dùng. Nếu chạy lại thử nghiệm với những người khác, tỷ lệ sẽ dao động một chút. Sai số (margin of error) cho biết mức
        dao động đó khoảng bao nhiêu. Nhóm càng đông, sai số càng nhỏ.
      </P>
      <div className="flex gap-4">
        <Formula
          label="Khoảng tin cậy"
          formula="Chênh lệch ± Sai số"
          note="Khoảng tin cậy (confidence interval) là khoảng mà chênh lệch thật nhiều khả năng nằm trong. Quy ước phổ biến là dùng khoảng tin cậy 95%."
        />
      </div>
      <P>Sai số được tính bằng công cụ tính A/B test (nhập số người và số người hoàn thành của từng nhóm):</P>
      <Table
        head={["Nhập vào công cụ", "Kết quả"]}
        widths={[640]}
        firstStrong={false}
        rows={[{ cells: ["Nhóm A: 1.000 / 12.500 · Nhóm B: 1.150 / 12.500", "Sai số ≈ 0,7 điểm phần trăm"] }]}
      />
      <P strong>Khoảng tin cậy = 1,2 ± 0,7 → từ khoảng 0,5 đến 1,9 điểm phần trăm.</P>
      <P>
        Công cụ cũng cho p-value ≈ 0,0007. Nghĩa là: nếu thật ra A và B như nhau, khả năng thấy chênh lệch lớn như vậy chỉ do may rủi là khoảng 0,07%, rất nhỏ. Quy ước
        phổ biến coi p-value dưới 0,05 (5%) là có bằng chứng về khác biệt. Đây là quy ước, không phải quy tắc bắt buộc; nhóm chọn mức này theo rủi ro chấp nhận được và
        ghi lại trước khi chạy.
      </P>
      <CIChart />
      <div className="flex gap-4">
        <Callout tone="good" title="Cách đọc đúng">
          Toàn bộ khoảng tin cậy lớn hơn 0, nên dữ liệu ủng hộ việc B thật sự tốt hơn A. Mức tăng thật nhiều khả năng từ 0,5 đến 1,9 điểm phần trăm. Đầu dưới (0,5) thấp
          hơn MDE 1 điểm, nghĩa là vẫn có khả năng mức tăng thật nhỏ hơn mức nhóm mong muốn.
        </Callout>
        <Callout tone="bad" title="Cách đọc sai">
          “p-value 0,0007 nghĩa là chỉ có 0,07% khả năng B không tốt hơn.” p-value không phải xác suất một phiên bản tốt hơn. Nó chỉ cho biết dữ liệu này khó xảy ra đến
          mức nào nếu hai phiên bản thật ra như nhau.
        </Callout>
      </div>

      <Subhead icon="users">Cùng chênh lệch, nhóm nhỏ hơn</Subhead>
      <Table
        head={["", "A", "B"]}
        widths={[300]}
        rows={[
          { cells: ["Số người mở form", "1.000", "1.000"] },
          { cells: ["Số người gửi thành công", "80", "92"] },
          { cells: ["Tỷ lệ chuyển đổi", "8,0%", "9,2%"] },
        ]}
      />
      <P>Chênh lệch vẫn là 1,2 điểm phần trăm (tăng 15%). Nhưng với 1.000 người mỗi nhóm, công cụ cho sai số ≈ 2,5 điểm phần trăm:</P>
      <P strong>Khoảng tin cậy = 1,2 ± 2,5 → từ khoảng −1,3 đến 3,7 điểm phần trăm, p-value ≈ 0,34.</P>
      <P>
        Khoảng này chứa cả 0 và giá trị âm: dữ liệu chưa đủ bằng chứng để kết luận B tốt hơn. Điều này cũng không có nghĩa là A và B như nhau; chỉ là chưa đủ dữ liệu để
        biết.
      </P>
      <Table
        head={["Khái niệm", "Ý nghĩa thực tế", "Lưu ý"]}
        widths={[300]}
        rows={[
          { cells: ["Chênh lệch (effect size)", "B khác A bao nhiêu.", "Luôn báo cả điểm phần trăm, không chỉ phần trăm tương đối."] },
          { cells: ["Khoảng tin cậy", "Khoảng giá trị hợp lý của chênh lệch thật.", "Khoảng rộng nghĩa là còn rất không chắc chắn."] },
          {
            cells: [
              "p-value",
              "Khả năng thấy chênh lệch như vậy nếu thật ra không có khác biệt.",
              "Không phải xác suất “B tốt hơn”; không cho biết khác biệt có đáng giá không.",
            ],
          },
          { cells: ["Ý nghĩa thực tiễn", "Chênh lệch có đủ lớn để đáng triển khai và duy trì không.", "So với MDE đã chốt trước."] },
        ]}
      />

      <Subhead icon="users">Cần bao nhiêu người dùng</Subhead>
      <P>Số người cần cho mỗi nhóm phụ thuộc ba điều, cần biết trước khi chạy:</P>
      <div className="grid grid-cols-3 gap-4">
        <InfoCard n={1} title="Tỷ lệ hiện tại" body="Tỷ lệ hiện tại của chỉ số chính." />
        <InfoCard n={2} title="Mức thay đổi nhỏ nhất muốn phát hiện" body="MDE." />
        <InfoCard
          n={3}
          title="Mức chắc chắn mong muốn"
          body="Quy ước phổ biến là khoảng tin cậy 95% và 80% khả năng phát hiện được thay đổi nếu nó thật sự tồn tại (độ mạnh thống kê — statistical power)."
        />
      </div>
      <P>Bảng tra cho tình huống trên (tỷ lệ hiện tại 8%, quy ước 95% / 80%), tính bằng công cụ tính cỡ mẫu:</P>
      <div className="flex gap-4">
        <div className="min-w-0 flex-[2]">
          <Table
            head={["Muốn phát hiện mức tăng", "Tỷ lệ của B cần đạt", "Số người cần mỗi nhóm"]}
            rows={[
              { cells: ["2 điểm phần trăm", "10,0%", "khoảng 3.213"] },
              { cells: ["1 điểm phần trăm", "9,0%", "khoảng 12.208"], highlight: true },
              { cells: ["0,5 điểm phần trăm", "8,5%", "khoảng 47.528"] },
            ]}
          />
        </div>
        <Blk label="thẻ" className="flex w-[380px] shrink-0 flex-col gap-3 rounded-[24px] bg-[var(--d-fill)] p-8 text-white">
          <Eyebrow size={13} className="text-[var(--d-fill-sub)]">
            Quy tắc dễ nhớ
          </Eyebrow>
          <T className="block text-[64px] leading-[68px] font-bold tracking-[-2.5px]">× 4</T>
          <T as="p" className="text-[17px] leading-[26px] text-[var(--d-fill-sub)]">
            Muốn phát hiện mức thay đổi nhỏ bằng một nửa, cần khoảng gấp bốn lần số người. Đó là lý do ví dụ trên dùng 12.500 người mỗi nhóm cho MDE 1 điểm.
          </T>
        </Blk>
      </div>
      <P>
        Vì vậy không thể nói “chạy 1.000 người là đủ” khi chưa biết tỷ lệ hiện tại và mức thay đổi mong muốn. Có thể tự tính với số liệu của mình bằng công cụ tính cỡ mẫu
        trực tuyến. Nếu lượng truy cập không đạt số người cần trong thời gian hợp lý, xem lại phần “Khi nào chưa phù hợp”.
      </P>

      <Subhead icon="check-circle">Điều kiện để kết quả đáng tin</Subhead>
      <div className="grid grid-cols-2 gap-4">
        {conditions.map((c) => (
          <Blk key={c} label="điều kiện" className="g-card flex gap-3.5 rounded-[20px] bg-[var(--w-card)] px-6 py-5">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[var(--d-soft)] text-[var(--d-accent)]">
              <Icon name="check" size={16} />
            </span>
            <T as="p" className="text-[17px] leading-[26px] tracking-[-0.2px]">
              {c}
            </T>
          </Blk>
        ))}
      </div>
      <Callout tone="note" icon="lightbulb">
        Nếu cần xem kết quả hằng ngày và có quyền dừng sớm, dùng phương pháp được thiết kế cho việc đó (sequential testing hoặc Bayesian A/B testing), thay vì liên tục
        “canh p-value”.
      </Callout>

      <Subhead icon="clipboard-check">Quy tắc ra quyết định</Subhead>
      <Blk label="quy tắc" className="flex overflow-hidden rounded-[24px] bg-[var(--w-card)]">
        <div className="flex w-[240px] shrink-0 flex-col gap-2 bg-[var(--d-ink)] p-7 text-[var(--d-ink-fg)]">
          <Eyebrow size={13} className="text-[var(--d-ink-sub)]">
            Ra mắt B khi
          </Eyebrow>
          <T className="text-[24px] leading-8 font-semibold tracking-[-0.6px]">Đủ cả bốn điều kiện</T>
        </div>
        {rule.map((r, i) => (
          <div key={r} className={`flex flex-1 flex-col gap-2 p-7 ${i ? "border-l border-[var(--d-line)]" : ""}`}>
            <span className="font-mono text-[13px] leading-[18px] tracking-[0.4px] text-[var(--d-accent)]">{i ? `VÀ · 0${i + 1}` : "01"}</span>
            <T className="text-[19px] leading-[27px] font-semibold tracking-[-0.4px]">{r}</T>
          </div>
        ))}
      </Blk>
      <Table
        head={["Kết quả", "Quyết định"]}
        widths={[540]}
        rows={[
          { cells: ["B tốt hơn, có bằng chứng, đạt MDE, chỉ số bảo vệ ổn định.", "Triển khai B; tiếp tục theo dõi sau ra mắt."] },
          {
            cells: [
              "B cao hơn nhưng khoảng tin cậy chứa 0.",
              "Chưa đủ bằng chứng. Nếu chưa đủ số người đã tính, chạy tiếp theo kế hoạch; nếu đã đủ, không kết luận B tốt hơn.",
            ],
          },
          { cells: ["B có bằng chứng tốt hơn nhưng mức tăng nhỏ hơn MDE.", "Có thể không đáng chi phí triển khai và duy trì; cân nhắc theo bối cảnh."] },
          { cells: ["Chỉ số chính tăng nhưng lỗi, hủy lịch hoặc khiếu nại tăng.", "Chưa triển khai; tìm hiểu nguyên nhân."] },
          { cells: ["Khoảng tin cậy quá rộng.", "Dữ liệu chưa đủ; xem lại số người."] },
          { cells: ["Đã đủ số người mà không thấy khác biệt.", "Giữ A, hoặc chọn phiên bản đơn giản hoặc rẻ hơn để duy trì."] },
        ]}
      />
      <P>
        Không có phép tính nào cho kết luận chắc chắn tuyệt đối. A/B testing cho biết mức độ bằng chứng và mức độ không chắc chắn. Cách làm đúng là đọc cùng lúc chênh
        lệch, khoảng tin cậy, p-value, MDE và chỉ số bảo vệ, thay vì chỉ nhìn bên nào có tỷ lệ cao hơn.
      </P>
    </Section>
  );
}

/* 07 ─ Giới hạn của kết luận (2016:28884) */
function Limits() {
  const items: [IconName, string, string][] = [
    ["target", "Chỉ đúng trong điều kiện đã test", "Cho nhóm người dùng, thời gian, kênh và phiên bản cụ thể. Không tự động đúng cho thị trường, thiết bị hay giai đoạn khác."],
    ["binoculars", "Cho biết cái gì, không cho biết vì sao", "Muốn hiểu nguyên nhân, cần nghiên cứu định tính bổ sung."],
    ["arrows", "Chỉ so sánh các phương án đã đưa vào", "B thắng A không có nghĩa B là phương án tốt nhất có thể."],
    [
      "hourglass",
      "Hiệu ứng ngắn hạn có thể khác dài hạn",
      "Novelty effect — người dùng tò mò với cái mới, hiệu ứng giảm dần. Change aversion — người dùng quen tay phản ứng tiêu cực lúc đầu, rồi thích nghi.",
    ],
    ["dots", "“Không có khác biệt có ý nghĩa” ≠ “không có khác biệt”", "Có thể test chưa đủ mạnh để phát hiện."],
    [
      "filter",
      "Nhìn nhiều chỉ số, nhiều phân khúc làm tăng kết quả “may mắn”",
      "Càng chia nhỏ dữ liệu, càng dễ thấy một khác biệt ngẫu nhiên trông như thật. Phân tích phân khúc chỉ nên dùng để đặt giả thuyết mới.",
    ],
  ];
  return (
    <Section {...S.limits}>
      <div className="grid grid-cols-2 gap-4">
        {items.map(([icon, title, body], i) => (
          <InfoCard key={title} icon={icon} n={i + 1} title={title} body={body} />
        ))}
        <InfoCard
          icon="alert"
          n={7}
          tone="ink"
          className="col-span-2"
          title="Chỉ số tăng không có nghĩa trải nghiệm tốt hơn"
          body="Dark pattern có thể tăng chuyển đổi nhưng làm mất niềm tin. Cần chỉ số bảo vệ và góc nhìn UX rộng hơn."
        />
      </div>
    </Section>
  );
}

/* 08 ─ Đầu vào và đầu ra (2016:28919) */
function InOut() {
  const inputs = [
    "Vấn đề và bằng chứng dẫn đến giả thuyết.",
    "Giả thuyết đã viết rõ.",
    "Định nghĩa chỉ số chính, chỉ số bảo vệ và cách ghi nhận.",
    "Dữ liệu nền: tỷ lệ hiện tại của chỉ số chính, lượng truy cập dự kiến.",
    "Công cụ chia ngẫu nhiên, ghi sự kiện và phân tích.",
    "Thiết kế phiên bản B đã kiểm tra chất lượng.",
  ];
  const outputs = [
    "Kết quả: mức chênh lệch, khoảng tin cậy, kết quả các chỉ số bảo vệ.",
    "Quyết định: ra mắt B, giữ A, hoặc cần nghiên cứu thêm — kèm lý do.",
    "Bài học về giả thuyết: được ủng hộ, bị bác bỏ, hay chưa đủ bằng chứng.",
    "Bản ghi thử nghiệm trong kho lưu trữ chung, để nhóm không lặp lại test cũ.",
  ];
  return (
    <Section {...S.io}>
      <div className="flex items-center gap-4">
        <Blk label="thẻ" className="g-card flex flex-1 flex-col gap-6 self-stretch rounded-[24px] bg-[var(--w-card)] p-8">
          <div className="flex items-center gap-3">
            <Tile icon="file" size={40} iconSize={20} />
            <Eyebrow className="text-[var(--d-accent)]">Đầu vào cần chuẩn bị</Eyebrow>
          </div>
          <Checks items={inputs} mark="•" />
        </Blk>
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[var(--d-fill)] text-[20px] text-white">→</span>
        <Blk label="thẻ" className="flex flex-1 flex-col gap-6 self-stretch rounded-[24px] bg-[var(--d-ink)] p-8 text-[var(--d-ink-fg)]">
          <div className="flex items-center gap-3">
            <Tile icon="list-search" size={40} iconSize={20} tone="ink" />
            <Eyebrow className="text-[var(--d-ink-accent)]">Đầu ra sau khi áp dụng</Eyebrow>
          </div>
          <Checks items={outputs} mark="•" markClass="text-[var(--d-ink-accent)]" />
        </Blk>
      </div>
    </Section>
  );
}

/* 09 ─ Ví dụ áp dụng (2016:28964) */
function Example() {
  const flow = (tag: "A" | "B", steps: string[]) => (
    <div className="flex items-center gap-3">
      <span className={`flex size-12 shrink-0 items-center justify-center rounded-xl text-[22px] leading-7 font-bold text-white ${tag === "A" ? "bg-[var(--d-ink-strong)]" : "bg-[var(--d-fill)]"}`}>{tag}</span>
      {steps.map((s, i) => (
        <span key={s} className="flex items-center gap-3">
          {i ? <Arrow size={20} /> : null}
          <span className={`rounded-xl px-5 py-3 ${tag === "B" && i === 0 ? "bg-[var(--d-soft)] text-[var(--d-accent-strong)]" : "bg-[var(--d-well)]"}`}>
            <T className="text-[17px] leading-6 font-semibold tracking-[-0.2px]">{s}</T>
          </span>
        </span>
      ))}
    </div>
  );
  const metrics: [string, string][] = [
    ["Chỉ số chính", "Tỷ lệ người mở form gửi yêu cầu thành công."],
    ["Chỉ số bảo vệ", "Tỷ lệ hủy lịch sau khi đặt, tỷ lệ lỗi gửi form."],
    ["Cỡ mẫu và thời gian", "Tính trước (xem phép tính ở phần Công thức và ví dụ tính); chạy đủ các chu kỳ tuần."],
  ];
  return (
    <Section {...S.example}>
      <Callout tone="scenario" title="Tình huống giả định">
        Tiếp nối luồng đặt lịch tư vấn trong bài User Flow. Để A/B testing khả thi, giả sử đây là một website dịch vụ có lượng truy cập lớn, không phải portfolio cá nhân.
        Không phải dự án đã triển khai.
      </Callout>
      <div className="flex gap-4">
        <InfoCard
          icon="binoculars"
          className="flex-1"
          title="Vấn đề"
          body="Dữ liệu hành vi (giả định) cho thấy nhiều người bỏ form ở bước chọn giờ. Ghi chép từ một vài buổi usability testing (giả định) cho thấy khách bực bội khi điền xong thông tin mới biết giờ mong muốn đã hết."
        />
        <InfoCard
          icon="lightbulb"
          tone="fill"
          className="flex-1"
          title="Giả thuyết"
          body="Vì khách thường bỏ dở khi phát hiện giờ hết sau khi đã nhập thông tin, chúng tôi tin rằng đưa bước chọn giờ lên trước cho khách truy cập trang dịch vụ sẽ tăng tỷ lệ gửi yêu cầu thành công, vì khách chỉ đầu tư công sức khi đã chắc có giờ phù hợp."
        />
      </div>
      <Blk label="thẻ" className="g-card flex flex-col gap-6 rounded-[24px] bg-[var(--w-card)] p-8">
        <div className="flex items-center gap-3">
          <Tile icon="flask" size={40} iconSize={20} />
          <Eyebrow size={14}>Thiết kế test</Eyebrow>
        </div>
        {flow("A", ["Nhập thông tin", "Chọn giờ", "Gửi"])}
        {flow("B", ["Chọn giờ", "Nhập thông tin", "Gửi"])}
        <div className="flex border-t border-[var(--d-line)] pt-2">
          {metrics.map(([k, v], i) => (
            <div key={k} className={`flex flex-1 flex-col gap-2 pt-5 ${i ? "border-l border-[var(--d-line)] px-6" : "pr-6"}`}>
              <Eyebrow size={13}>{k}</Eyebrow>
              <T as="p" className="text-[17px] leading-[26px] tracking-[-0.2px]">
                {v}
              </T>
            </div>
          ))}
        </div>
      </Blk>
      <Table
        head={["Kết quả có thể xảy ra", "Quyết định tương ứng"]}
        widths={[520]}
        rows={[
          { cells: ["B tốt hơn có ý nghĩa thống kê, chỉ số bảo vệ ổn định.", "Ra mắt B cho tất cả; theo dõi tiếp chỉ số sau ra mắt."] },
          { cells: ["B tốt hơn nhưng tỷ lệ hủy lịch tăng.", "Chưa ra mắt; nghiên cứu vì sao khách hủy (có thể họ đặt vội khi chưa chắc)."] },
          { cells: ["Không có khác biệt đủ tin cậy.", "Không kết luận A = B; xem lại giả thuyết, cân nhắc thay đổi rõ hơn hoặc nghiên cứu định tính thêm."] },
        ]}
      />
      <Callout tone="note" icon="briefcase" title="Ghi chú cho portfolio cá nhân">
        Đây là kế hoạch minh họa, chưa phải kết quả thử nghiệm thực tế. Với lượng truy cập thấp, cách phù hợp hơn để kiểm chứng cùng giả thuyết là kiểm thử prototype hai
        luồng với một nhóm nhỏ người thuộc nhóm khách hàng mục tiêu, kết hợp quan sát và phỏng vấn ngắn.
      </Callout>
    </Section>
  );
}

/* 10 ─ Lỗi và nhầm lẫn thường gặp (2016:29038) */
function Mistakes() {
  const items: [string, string, string][] = [
    [
      "Xem kết quả liên tục và dừng ngay khi thấy “thắng” (peeking)",
      "Làm tăng mạnh khả năng kết luận sai từ một dao động ngẫu nhiên.",
      "Tính cỡ mẫu trước và chạy đủ; hoặc dùng phương pháp thống kê được thiết kế cho việc theo dõi liên tục.",
    ],
    ["Không có giả thuyết, “thử xem sao”", "Khó rút ra bài học dù thắng hay thua.", "Viết giả thuyết có lý do và bằng chứng."],
    ["Chọn chỉ số sau khi đã thấy dữ liệu", "Dễ chọn chỉ số “đẹp” một cách vô thức.", "Ghi chỉ số chính và tiêu chí quyết định trước khi chạy."],
    ["Cỡ mẫu quá nhỏ", "Kết quả chủ yếu là nhiễu; dễ bỏ sót tác động thật.", "Tính cỡ mẫu; nếu không đủ lưu lượng, chọn phương pháp khác."],
    ["Chạy quá ngắn hoặc không đủ chu kỳ tuần", "Hành vi thay đổi theo ngày trong tuần.", "Chạy theo các tuần trọn vẹn."],
    ["Thay đổi quá nhiều thứ trong B", "Không biết yếu tố nào tạo ra khác biệt.", "Chỉ thay đổi những gì gắn với giả thuyết, hoặc chấp nhận câu hỏi tổng thể."],
    ["Bỏ qua lệch tỷ lệ phân bổ (SRM)", "Thường là dấu hiệu lỗi kỹ thuật làm kết quả sai lệch.", "Kiểm tra tỷ lệ phân bổ trước khi đọc kết quả."],
    ["Đào phân khúc đến khi tìm ra “người thắng”", "Nhiều phép so sánh tạo ra kết quả ngẫu nhiên trông như thật.", "Coi kết quả phân khúc là giả thuyết mới, kiểm chứng bằng test riêng."],
    ["Chỉ báo % tương đối", "“+20%” có thể chỉ là từ 5% lên 6% với độ không chắc chắn lớn.", "Báo cả số tuyệt đối và khoảng tin cậy."],
    ["Coi “không có ý nghĩa thống kê” là “không có tác động”", "Test có thể chưa đủ mạnh.", "Báo cáo “chưa đủ bằng chứng” và khoảng tin cậy."],
    ["Chỉ tối ưu chỉ số ngắn hạn", "Có thể đánh đổi niềm tin, giữ chân hoặc trải nghiệm.", "Dùng chỉ số bảo vệ; xem xét tác động dài hạn."],
    ["Không lưu lại test thất bại", "Nhóm lặp lại test cũ, mất bài học.", "Lưu mọi test vào kho chung, kể cả kết quả trung tính."],
  ];
  return (
    <Section {...S.mistakes}>
      <div className="grid grid-cols-2 gap-4">
        {items.map(([title, why, fix]) => (
          <Blk key={title} label="lỗi" className="g-card flex flex-col gap-4 rounded-[24px] bg-[var(--w-card)] p-7">
            <div className="flex items-start gap-3.5">
              <Tile icon="alert" size={36} iconSize={18} radius={10} tone="bad" />
              <T as="h4" className="min-w-0 flex-1 pt-1 text-[20px] leading-7 font-semibold tracking-[-0.4px]">
                {title}
              </T>
            </div>
            <div className="flex flex-col gap-1 border-l-2 border-[var(--d-bad)] pl-4">
              <span className="font-mono text-[13px] leading-[18px] tracking-[0.4px] text-[var(--d-bad)]">VÌ SAO SAI</span>
              <T as="p" className="text-[16px] leading-6 text-[var(--w-secondary)]">
                {why}
              </T>
            </div>
            <div className="flex flex-col gap-1 border-l-2 border-[var(--d-accent)] pl-4">
              <span className="font-mono text-[13px] leading-[18px] tracking-[0.4px] text-[var(--d-accent)]">CÁCH KHẮC PHỤC</span>
              <T as="p" className="text-[16px] leading-6">
                {fix}
              </T>
            </div>
          </Blk>
        ))}
      </div>
    </Section>
  );
}

/* 11 ─ Phân biệt với các phương pháp gần (2017:28884) */
function Compare() {
  const combo = ["Nghiên cứu định tính", "Đặt giả thuyết", "A/B testing để kiểm chứng ở quy mô lớn", "Nghiên cứu định tính để giải thích kết quả"];
  return (
    <Section {...S.compare}>
      <Table
        head={["Phương pháp", "Cách làm", "Trả lời câu hỏi", "Khi nào chọn"]}
        widths={[250]}
        rows={[
          {
            icon: "split",
            highlight: true,
            cells: [
              "A/B Testing",
              "Chia ngẫu nhiên người dùng thật giữa 2 (hoặc vài) phiên bản, đo hành vi.",
              "“Phiên bản nào làm chỉ số X tốt hơn?”",
              "Sản phẩm đã ra mắt, đủ lưu lượng, câu hỏi rõ.",
            ],
          },
          {
            icon: "component",
            cells: [
              "Multivariate Testing",
              "Thử đồng thời nhiều yếu tố và các tổ hợp của chúng.",
              "“Yếu tố nào, và tổ hợp nào, tác động đến chỉ số?”",
              "Lưu lượng rất lớn, cần hiểu tương tác giữa các yếu tố.",
            ],
          },
          { icon: "link", cells: ["Split URL Testing", "Một dạng A/B test, mỗi phiên bản ở một URL riêng.", "Như A/B testing.", "Hai phiên bản khác nhau nhiều về cấu trúc trang."] },
          {
            icon: "eye",
            cells: [
              "Usability Testing",
              "Quan sát người dùng thực hiện tác vụ, thường với số người ít.",
              "“Người dùng gặp khó ở đâu và vì sao?”",
              "Mọi giai đoạn, kể cả khi chưa ra mắt; cần hiểu nguyên nhân.",
            ],
          },
          {
            icon: "chat",
            cells: [
              "Preference test / Design comparison",
              "Cho người tham gia xem các phương án và hỏi họ thích hoặc chọn cái nào.",
              "“Người dùng nói họ thích phương án nào?”",
              "Giai đoạn sớm; lưu ý sở thích nói ra khác hành vi thật.",
            ],
          },
          {
            icon: "rotate",
            cells: [
              "So sánh trước – sau (before/after)",
              "So sánh chỉ số trước và sau khi ra mắt thay đổi.",
              "“Chỉ số có thay đổi sau ra mắt không?”",
              "Khi không thể A/B test; rất dễ bị yếu tố bên ngoài làm nhiễu.",
            ],
          },
        ]}
      />
      <Blk label="thẻ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-8">
        <div className="flex items-center gap-3">
          <Tile icon="list" size={36} iconSize={18} radius={10} />
          <Eyebrow>Kết hợp thường gặp</Eyebrow>
        </div>
        <div className="flex items-center gap-4">
          {combo.map((c, i) => (
            <span key={c} className="flex flex-1 items-center gap-4">
              {i ? <Arrow size={20} /> : null}
              <span className={`flex min-h-[64px] flex-1 items-center rounded-2xl px-5 py-3 ${i === 2 ? "bg-[var(--d-fill)] text-white" : "bg-[var(--d-well)]"}`}>
                <T className="text-[17px] leading-6 font-semibold tracking-[-0.2px]">{c}</T>
              </span>
            </span>
          ))}
        </div>
      </Blk>
    </Section>
  );
}

/* 12 ─ Checklist tự kiểm tra (2017:28968) */
function Checklist() {
  return (
    <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
      <div className="flex items-start gap-4">
        <ChecklistColumn
          icon="calendar"
          title="Trước khi chạy"
          items={[
            "Có vấn đề và bằng chứng dẫn đến giả thuyết.",
            "Giả thuyết nêu rõ thay đổi, nhóm người dùng, chỉ số và lý do.",
            "Đã chọn một chỉ số chính và các chỉ số bảo vệ.",
            "Đã ghi tiêu chí quyết định trước khi chạy.",
            "Đã tính cỡ mẫu và thời gian chạy; lưu lượng đủ đáp ứng.",
            "Phiên bản B đã kiểm tra trên các thiết bị chính, kể cả trạng thái lỗi và accessibility.",
            "Đã kiểm tra việc ghi sự kiện ở cả hai phiên bản.",
          ]}
        />
        <ChecklistColumn
          icon="play-circle"
          title="Trong khi chạy"
          items={["Chỉ theo dõi sức khỏe kỹ thuật, không dừng sớm vì kết quả “đẹp”.", "Không thay đổi phiên bản hay tỷ lệ phân bổ giữa chừng."]}
        />
        <ChecklistColumn
          icon="clipboard-check"
          title="Sau khi chạy"
          items={[
            "Đã kiểm tra tỷ lệ phân bổ (SRM) và chất lượng dữ liệu.",
            "Báo cáo cả mức chênh lệch tuyệt đối và khoảng tin cậy.",
            "Đã xem xét chỉ số bảo vệ trước khi quyết định.",
            "Kết luận nêu rõ phạm vi áp dụng và giới hạn.",
            "Đã lưu kết quả vào kho chung, kể cả khi không có khác biệt.",
          ]}
        />
      </div>
    </Section>
  );
}

/* 13 ─ Thuật ngữ liên quan (2017:29071) */
function Related() {
  const items: [string, string, string][] = [
    ["Multivariate Testing", "Kiểm thử đa biến", "Mở rộng A/B testing cho nhiều yếu tố cùng lúc."],
    ["Statistical Significance", "Ý nghĩa thống kê", "Cách đánh giá khác biệt có thể do ngẫu nhiên hay không."],
    ["Confidence Intervals", "Khoảng tin cậy", "Mô tả độ không chắc chắn của mức chênh lệch."],
    ["Usability Testing", "Kiểm thử khả năng sử dụng", "Giải thích vì sao; thay thế khi lưu lượng thấp."],
    ["Quantitative Research", "Nghiên cứu định lượng", "Nhóm phương pháp mà A/B testing thuộc về."],
    ["UX Metrics", "Chỉ số UX", "Nguồn chọn chỉ số chính và chỉ số bảo vệ."],
    ["Design Comparison", "So sánh thiết kế", "Phương án so sánh dựa trên ý kiến, dùng ở giai đoạn sớm."],
    ["User Experience (UX)", "Trải nghiệm người dùng", "Khung rộng để không chỉ tối ưu một chỉ số."],
    ["Affinity Diagram", "Sơ đồ tương đồng", "Tổng hợp dữ liệu định tính thành nhận định, làm cơ sở để đặt giả thuyết cho A/B test."],
    ["Clickstream Analysis", "Phân tích luồng nhấp", "Tìm bước có vấn đề trong luồng, nơi đáng đặt giả thuyết để A/B test."],
    ["User Flow", "Luồng tương tác của người dùng", "Nguồn của tình huống ví dụ trong bài."],
  ];
  return (
    <Section {...S.related}>
      <div className="grid grid-cols-3 gap-4">
        {items.map(([en, vi, why]) => (
          <Blk key={en} label="thẻ" className="g-card flex min-h-[170px] flex-col gap-2 rounded-[24px] bg-[var(--w-card)] p-7">
            <T as="h4" className="text-[20px] leading-7 font-semibold tracking-[-0.4px]">
              {en}
            </T>
            <T className="text-[15px] leading-[22px] text-[var(--w-muted)]">{vi}</T>
            <T as="p" className="mt-1 text-[17px] leading-[26px] tracking-[-0.2px] text-[var(--w-secondary)]">
              {why}
            </T>
          </Blk>
        ))}
      </div>
    </Section>
  );
}
