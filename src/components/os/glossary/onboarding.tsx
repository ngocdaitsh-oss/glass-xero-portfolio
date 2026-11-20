"use client";

import { Blk, T } from "./edit";
import { CheckCards, Formula, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Onboarding — copy from ux-glossary/onboarding.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "parts", title: "Thành phần của onboarding", icon: "component" },
  { id: "push-pull", title: "Hướng dẫn trước và trợ giúp theo ngữ cảnh", icon: "split" },
  { id: "when", title: "Khi nào cần onboarding", icon: "check-circle" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "maths", title: "Công thức và ví dụ tính", icon: "sigma" },
  { id: "limits", title: "Giới hạn: khi nào onboarding chưa đủ", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

const STEPS: [string, number, string | null][] = [
  ["Tạo tài khoản", 1200, null],
  ["Hoàn tất thiết lập", 960, "80%"],
  ["Đặt lịch đầu tiên trong 7 ngày", 540, "56%"],
];

/** People left at each onboarding step; the widest drop marks where to focus. */
function StepFunnel() {
  return (
    <Blk label="biểu đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="filter" size={36} iconSize={18} radius={10} />
        <Eyebrow>Số người qua từng bước</Eyebrow>
      </div>
      <div className="flex flex-col gap-3">
        {STEPS.map(([label, n, rate], i) => (
          <div key={label} className="flex items-center gap-5">
            <span className="w-[240px] shrink-0 text-[15px] leading-6 font-semibold">{label}</span>
            <div className="relative h-11 flex-1 rounded-lg bg-[var(--d-well)]">
              <span
                className={`absolute inset-y-0 left-0 flex items-center rounded-lg px-4 font-mono text-[15px] font-semibold ${i === 2 ? "bg-[var(--d-ci)] text-white" : "bg-[var(--d-ci-weak)]"}`}
                style={{ width: `${(n / 1200) * 100}%` }}
              >
                {n.toLocaleString("vi-VN")}
              </span>
            </div>
            <span className={`w-[64px] shrink-0 text-right font-mono text-[15px] ${i === 2 ? "font-semibold text-[var(--d-bad)]" : "text-[var(--w-muted)]"}`}>{rate ?? "—"}</span>
          </div>
        ))}
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Bước từ thiết lập đến đặt lịch mất nhiều người nhất → tập trung cải thiện ở đây. Tỷ lệ kích hoạt = 540 ÷ 1.200 = 45%.
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
            Những phút đầu tiên quyết định nhiều người dùng có ở lại không. Nếu họ không hiểu sản phẩm làm được gì, hoặc không biết bắt đầu từ đâu, họ rời đi trước khi thấy giá trị.
          </P>
          <P strong>
            Nhưng onboarding cũng có thể gây hại: màn hình hướng dẫn dài chặn người dùng, bị bỏ qua và nhanh bị quên. NN/g khuyên tránh onboarding khi có thể, và dùng nguồn lực đó để làm
            giao diện dễ dùng hơn; phần lớn ứng dụng di động không nên cần onboarding dạng hướng dẫn.
          </P>
        </div>
        <Eyebrow>Onboarding tốt hỗ trợ</Eyebrow>
        <InfoGrid
          cols={3}
          minH={150}
          items={[
            ["target", "Người dùng đến được giá trị đầu tiên", "Nhanh."],
            ["clipboard-check", "Thiết lập cần thiết", "Được hoàn thành."],
            ["lightbulb", "Tính năng quan trọng", "Được biết đến đúng lúc."],
          ]}
        />
      </Section>

      <Section {...S.parts}>
        <P>NN/g chia onboarding thành ba loại thành phần:</P>
        <Table
          head={["Thành phần", "Mục đích", "Ví dụ minh họa (giả định)", "Lưu ý"]}
          widths={[220]}
          rows={[
            {
              icon: "play-circle",
              cells: ["Giới thiệu tính năng (feature promotion)", "Cho biết sản phẩm làm được gì.", "Ba màn hình giới thiệu: đặt lịch, nhắc lịch, tài liệu sau tư vấn.", "Người dùng thường bỏ qua; nên ngắn."],
            },
            {
              icon: "users",
              cells: ["Tùy chỉnh (customization)", "Thiết lập theo nhu cầu người dùng.", "Chọn chủ đề quan tâm: tài chính gia đình, khởi nghiệp.", "Hữu ích khi thật sự cá nhân hóa trải nghiệm."],
            },
            {
              icon: "book",
              cells: ["Hướng dẫn (instructions)", "Chỉ cách dùng giao diện.", "Chú thích “Bấm vào đây để chọn giờ”.", "Nếu cần nhiều hướng dẫn, giao diện có thể đang khó dùng."],
            },
          ]}
        />
      </Section>

      <Section {...S["push-pull"]}>
        <div className="flex flex-col gap-5">
          <P>
            Theo NN/g, các bài hướng dẫn hiện ra trước (tutorial, walkthrough) thường làm gián đoạn, bị bỏ qua, nhanh bị quên và không chắc giúp người dùng làm tốt hơn. NN/g gọi đây là kiểu
            “đẩy” thông tin (push).
          </P>
          <P>Trợ giúp theo ngữ cảnh (contextual help) hiện ra khi có dấu hiệu người dùng cần, kiểu “kéo” (pull), nên tránh được các vấn đề trên.</P>
        </div>
        <Table
          head={["", "Hướng dẫn trước (push)", "Trợ giúp theo ngữ cảnh (pull)"]}
          widths={[220]}
          rows={[
            { icon: "calendar", cells: ["Khi nào xuất hiện", "Trước khi dùng.", "Khi người dùng cần."] },
            { icon: "lightbulb", cells: ["Ví dụ", "5 màn hình hướng dẫn khi mở ứng dụng lần đầu.", "Gợi ý ngắn cạnh ô chọn giờ khi người dùng lần đầu mở trang đặt lịch."] },
            { icon: "alert", cells: ["Vấn đề thường gặp", "Bị bỏ qua, bị quên.", "Cần thiết kế cách hiện không gây phiền."] },
          ]}
        />
        <Callout tone="note" title="Lời khuyên của NN/g">
          Trợ giúp dễ tắt và dễ mở lại; tiết lộ dần (progressive disclosure); không bắt người dùng nhớ quy trình nhiều bước mà hiện trợ giúp ở từng bước; bỏ qua quy ước ai cũng biết. Hướng
          dẫn từng bước vẫn có thể hợp lý khi tương tác hoàn toàn mới lạ.
        </Callout>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "target",
              "Bối cảnh phù hợp",
              ["Cần thiết lập trước khi dùng được (tài khoản, quyền, thông tin cá nhân hóa).", "Tương tác mới lạ, chưa có quy ước quen thuộc.", "Giới thiệu tính năng mới cho người dùng cũ."],
            ],
            ["eye", "Dấu hiệu nhận biết", ["Nhiều người dùng mới rời đi trước khi thực hiện hành động chính đầu tiên.", "Người dùng cũ không biết đến tính năng quan trọng."]],
            ["lightbulb", "Trước khi thêm onboarding, hỏi", ["Có thể làm giao diện dễ hiểu hơn để không cần hướng dẫn không?"]],
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định “giá trị đầu tiên”.", "Hành động chính cho thấy người dùng đã nhận được giá trị.", "Hành động kích hoạt (activation)."],
            ["Tìm hiểu điều gì ngăn người dùng đến đó.", "Usability test, analytics, phỏng vấn người dùng mới.", "Rào cản."],
            ["Sửa giao diện trước.", "", "Rào cản đã giảm mà không cần hướng dẫn."],
            ["Thêm onboarding tối thiểu cho phần còn lại.", "Ưu tiên thiết lập cần thiết và trợ giúp theo ngữ cảnh.", "Thiết kế onboarding."],
            ["Đo và cải tiến.", "Tỷ lệ kích hoạt, tỷ lệ hoàn thành từng bước.", "Kết quả, điều chỉnh."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <Callout tone="scenario">
          Số liệu minh họa, không phải dữ liệu thật. Ứng dụng của dịch vụ tư vấn. “Giá trị đầu tiên” được xác định là đặt buổi tư vấn đầu tiên trong 7 ngày.
        </Callout>
        <Subhead icon="filter">Tỷ lệ qua từng bước</Subhead>
        <Formula label="Tỷ lệ qua bước" formula="Số người qua bước này ÷ Số người ở bước trước" note="960 ÷ 1.200 = 80%; 540 ÷ 960 ≈ 56%" />
        <StepFunnel />
        <Subhead icon="target">Tỷ lệ kích hoạt</Subhead>
        <Formula label="Tỷ lệ kích hoạt" formula="Số người đạt giá trị đầu tiên ÷ Số người tạo tài khoản" note="540 ÷ 1.200 = 45% (khoảng tin cậy 95% ≈ 42% – 48%)" />
        <Subhead icon="split">So sánh trước và sau thay đổi</Subhead>
        <P>Nhóm thay 5 màn hình hướng dẫn bằng trợ giúp theo ngữ cảnh ở trang đặt lịch, chạy A/B test với nhóm người dùng mới, mỗi nhóm 1.200 người.</P>
        <Formula label="Chênh lệch" formula="Tỷ lệ kích hoạt mới − Tỷ lệ kích hoạt cũ" />
        <Table
          head={["Nhập vào công cụ so sánh hai tỷ lệ", "Kết quả"]}
          widths={[400]}
          rows={[
            {
              highlight: true,
              cells: ["Cũ 540/1.200 (45%), mới 660/1.200 (55%)", "Chênh lệch +10 điểm phần trăm; khoảng tin cậy 95% ≈ +6 đến +14 điểm; p-value rất nhỏ (dưới 0,001)"],
            },
          ]}
        />
        <InfoCard
          tone="fill"
          icon="check-circle"
          title="Quyết định"
          body="Khoảng tin cậy nằm hoàn toàn trên 0 → trợ giúp theo ngữ cảnh có khả năng tốt hơn thật. Áp dụng thay đổi."
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          cols={3}
          items={[
            ["pencil", "Onboarding không sửa được giao diện khó dùng", "Nếu cần nhiều hướng dẫn, nên xem lại thiết kế."],
            ["rotate", "Kích hoạt chưa phải giữ chân", "Người dùng đặt lịch lần đầu chưa chắc quay lại; cần theo dõi dài hạn."],
            ["users", "Một luồng không phù hợp với mọi người", "Người dùng có kinh nghiệm khác người mới hoàn toàn."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Định nghĩa “giá trị đầu tiên”.", "Dữ liệu về nơi người dùng mới rời đi.", "Kết quả usability test với người dùng mới."]}
          outputs={["Thiết kế onboarding tối thiểu.", "Tỷ lệ kích hoạt, tỷ lệ qua từng bước.", "Quyết định giữ, sửa hay bỏ từng phần onboarding."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard
          icon="component"
          title="Bối cảnh"
          body="Ứng dụng có 5 màn hình hướng dẫn khi mở lần đầu. Analytics cho thấy phần lớn người dùng bấm “Bỏ qua” ngay; tỷ lệ kích hoạt 45%."
        />
        <InfoCard
          icon="eye"
          title="Nghiên cứu"
          body="Usability test với 5 người dùng mới: họ bỏ qua hướng dẫn, đến trang đặt lịch thì không hiểu giờ nào còn trống."
        />
        <InfoCard
          icon="pencil"
          title="Thay đổi"
          body="Bỏ 4 màn hình giới thiệu, giữ 1 màn hình thiết lập chủ đề quan tâm; thêm gợi ý ngắn ở trang đặt lịch khi người dùng mở lần đầu (“Giờ màu xanh là giờ còn trống”), dễ tắt."
        />
        <InfoCard tone="fill" icon="analytics" title="Kết quả (theo phần tính toán ở trên)" body="Kích hoạt tăng từ 45% lên 55%." />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Dùng onboarding để vá giao diện khó dùng", "Vấn đề gốc vẫn còn.", "Sửa giao diện trước."],
            ["Hướng dẫn dài trước khi dùng", "Bị bỏ qua, bị quên.", "Trợ giúp theo ngữ cảnh."],
            ["Không cho bỏ qua hoặc mở lại", "Gây phiền, mất kiểm soát.", "Dễ tắt, dễ mở lại."],
            ["Giới thiệu mọi tính năng", "Quá tải thông tin.", "Chỉ điều cần cho giá trị đầu tiên."],
            ["Không đo", "Không biết onboarding có giúp không.", "Theo dõi tỷ lệ kích hoạt, so sánh có kiểm soát."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Quan hệ với onboarding"]}
          widths={[320]}
          rows={[
            { icon: "lightbulb", cells: ["Contextual help", "Một cách làm onboarding, hiện khi cần."] },
            { icon: "book", cells: ["Tutorial / walkthrough", "Một cách làm onboarding, hiện trước; thường kém hiệu quả hơn."] },
            { icon: "file", cells: ["Empty state (trạng thái trống)", "Cơ hội hướng dẫn tự nhiên khi chưa có nội dung."] },
            { icon: "target", cells: ["Activation", "Chỉ số đo onboarding có giúp người dùng đến giá trị đầu tiên không."] },
            { icon: "pencil", cells: ["Microcopy", "Chữ trong trợ giúp, gợi ý."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="pencil"
            title="Thiết kế"
            items={["Đã xác định “giá trị đầu tiên”.", "Đã thử làm giao diện rõ hơn trước khi thêm hướng dẫn.", "Onboarding chỉ gồm phần cần thiết."]}
          />
          <ChecklistColumn
            icon="analytics"
            title="Trải nghiệm và đo"
            items={["Ưu tiên trợ giúp theo ngữ cảnh.", "Dễ bỏ qua, dễ mở lại.", "Đo tỷ lệ kích hoạt và so sánh có kiểm soát."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Microcopy", "Vi văn bản", "Chữ trong gợi ý, trợ giúp."],
            ["Cognitive Load", "Tải nhận thức", "Hướng dẫn dài làm tăng tải nhận thức."],
            ["Longitudinal Study", "Nghiên cứu dài hạn", "Theo dõi sau giai đoạn làm quen."],
            ["A/B Testing", "Kiểm thử A/B", "Đo tác động của thay đổi onboarding."],
            ["Moderated Testing", "Kiểm thử có người điều phối", "Tìm rào cản của người dùng mới."],
            ["Mental Model", "Mô hình tư duy", "Onboarding giúp hình thành mental model đúng."],
          ]}
        />
      </Section>
    </div>
  );
}

export const ONBOARDING: Article = {
  slug: "onboarding",
  version: 1,
  term: "Onboarding",
  fn: 4,
  vi: "Làm quen người dùng",
  kind: "Nguyên tắc / khái niệm",
  definition:
    "Onboarding là quá trình giúp người dùng làm quen với một giao diện mới, thông qua các luồng và thành phần riêng nằm ngoài giao diện chính, gồm cả bước thiết lập ban đầu.",
  definitionMore: "Mục tiêu là giúp người dùng nhanh chóng đến được giá trị đầu tiên của sản phẩm.",
  oneLine: "Giúp người dùng mới làm quen và nhanh đến được giá trị đầu tiên của sản phẩm.",
  glance: [
    ["45%", "Tỷ lệ kích hoạt ban đầu trong ví dụ"],
    ["55%", "Sau khi đổi sang trợ giúp theo ngữ cảnh"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["User onboarding", "First-run experience"] },
    { label: "Nhóm chính", items: ["Thiết kế và tạo mẫu"] },
    { label: "Thẻ phụ", items: ["Nguyên tắc thiết kế"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "Bài này gộp Onboarding và User Onboarding vì cùng một khái niệm. Không nhầm với onboarding nhân viên mới trong nhân sự. Theo NN/g, onboarding không chỉ dành cho người dùng lần đầu: có thể xuất hiện khi giới thiệu tính năng mới cho người dùng cũ.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
