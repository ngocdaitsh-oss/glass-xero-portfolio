"use client";

import { Fragment } from "react";
import { Blk, T } from "./edit";
import { CheckCards, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Mental Model — copy from ux-glossary/mental-model.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "mechanism", title: "Cơ chế: ba mô hình", icon: "component" },
  { id: "signs", title: "Biểu hiện: khi mental model khớp và lệch", icon: "eye" },
  { id: "when", title: "Khi nào cần quan tâm", icon: "check-circle" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "limits", title: "Giới hạn: khi nào mental model chưa đủ để giải thích", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

const MODELS: [string, string, "ok" | "mid" | "bad"][] = [
  ["Mô hình của nhà thiết kế", "“Giữ chỗ 10 phút”", "ok"],
  ["Hình ảnh hệ thống", "Giao diện, nhãn, phản hồi: không hiển thị việc giữ chỗ", "mid"],
  ["Mô hình của người dùng", "“Đã giữ chỗ, quay lại sau”", "bad"],
];

/** Designer and user only meet through the system image; a gap there produces a different user model. */
function ThreeModels() {
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="component" size={36} iconSize={18} radius={10} />
        <Eyebrow>Nhà thiết kế chỉ nói chuyện với người dùng qua hình ảnh hệ thống</Eyebrow>
      </div>
      <div className="flex items-stretch gap-3">
        {MODELS.map(([title, body, tone], i) => (
          <Fragment key={title}>
            {i > 0 && <span className="flex items-center font-mono text-[22px] text-[var(--w-muted)]">→</span>}
            <div
              className={`flex flex-1 flex-col gap-2 rounded-2xl p-6 ${tone === "mid" ? "bg-[var(--d-ci)] text-white" : tone === "bad" ? "bg-[var(--d-bad-soft)]" : "bg-[var(--d-well)]"}`}
            >
              <span className="text-[16px] leading-6 font-semibold">{title}</span>
              <span className={`text-[15px] leading-[22px] ${tone === "mid" ? "text-white/85" : "text-[var(--w-secondary)]"}`}>{body}</span>
              {tone === "bad" && <span className="mt-auto font-mono text-[14px] font-semibold text-[var(--d-bad)]">✗ lệch</span>}
            </div>
          </Fragment>
        ))}
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Nhà thiết kế không thể giải thích trực tiếp cho từng người dùng. Giao diện là kênh duy nhất, nên giao diện phải thể hiện được cách hệ thống hoạt động.
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
            Nhóm thiết kế hiểu sản phẩm rất rõ, vì họ biết nó được xây thế nào. Người dùng thì không; họ chỉ thấy giao diện và đoán phần còn lại dựa trên kinh nghiệm với những sản phẩm
            khác. NN/g lưu ý mental model của nhà thiết kế về sản phẩm của chính mình thường đầy đủ hơn nhiều so với người dùng.
          </P>
          <P strong>Khi nhóm thiết kế theo hiểu biết của mình thay vì theo cách người dùng nghĩ, sản phẩm “hợp lý với nhóm” nhưng khó hiểu với người dùng.</P>
        </div>
        <Eyebrow>Hiểu mental model hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          cols={3}
          minH={150}
          items={[
            ["list", "Nhãn, cấu trúc, luồng", "Nên theo quy ước nào."],
            ["split", "Giữ quy ước quen thuộc", "Hay giới thiệu cách làm mới (và cần giải thích bao nhiêu)."],
            ["alert", "Lỗi người dùng đến từ đâu", "Giao diện sai, hay mental model lệch."],
          ]}
        />
      </Section>

      <Section {...S.mechanism}>
        <P>Don Norman mô tả ba thứ liên quan với nhau trong The Design of Everyday Things:</P>
        <Table
          head={["Mô hình", "Là gì", "Ví dụ minh họa (giả định)"]}
          widths={[260]}
          rows={[
            { icon: "pencil", cells: ["Mô hình của nhà thiết kế", "Cách nhóm hiểu hệ thống hoạt động.", "Đặt lịch giữ chỗ tạm 10 phút; hết 10 phút giờ sẽ trả lại cho người khác."] },
            { icon: "eye", highlight: true, cells: ["Hình ảnh hệ thống (system image)", "Những gì người dùng thấy: giao diện, nhãn, phản hồi, tài liệu.", "Trang chọn giờ không nhắc gì về việc giữ chỗ 10 phút."] },
            { icon: "users", cells: ["Mô hình của người dùng", "Cách người dùng hiểu hệ thống, dựa trên hình ảnh hệ thống và kinh nghiệm.", "Nghĩ rằng chọn giờ là đã giữ chỗ, có thể quay lại hoàn tất sau."] },
          ]}
        />
        <ThreeModels />
      </Section>

      <Section {...S.signs}>
        <Table
          head={["", "Khớp", "Lệch"]}
          widths={[220]}
          rows={[
            { icon: "play-circle", cells: ["Hành vi", "Người dùng đoán đúng điều sẽ xảy ra.", "Người dùng ngạc nhiên, mắc lỗi, thử đi thử lại."] },
            { icon: "chat", cells: ["Lời nói (khi think-aloud)", "“Chắc bấm vào đây là được.” → đúng.", "“Ơ, sao giờ của tôi mất rồi?”"] },
            { icon: "lightbulb", cells: ["Ví dụ", "Biểu tượng giỏ hàng: người dùng biết có thể thêm nhiều thứ rồi thanh toán sau.", "Người dùng nghĩ đã đặt lịch xong khi mới chọn giờ."] },
          ]}
        />
        <Callout tone="note" title="Hai hướng khi có sự lệch (NN/g)">
          Làm hệ thống khớp với kỳ vọng của người dùng, hoặc giúp người dùng hiểu đúng hơn bằng nhãn rõ ràng và giải thích.
        </Callout>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "target",
              "Bối cảnh phù hợp",
              ["Thiết kế sản phẩm mới hoặc cách làm khác với quy ước quen thuộc.", "Người dùng mắc cùng một lỗi lặp đi lặp lại.", "Nhóm thiết kế và người dùng dùng từ ngữ khác nhau."],
            ],
            ["eye", "Dấu hiệu nhận biết", ["Người dùng nói “tôi tưởng là…” trong usability test.", "Bộ phận hỗ trợ nhận nhiều câu hỏi về cùng một hành vi của hệ thống."]],
            ["list-search", "Cách tìm hiểu mental model (NN/g gợi ý)", ["Usability test có think-aloud.", "Card sorting.", "Phỏng vấn."]],
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Tìm hiểu mental model hiện có.", "Think-aloud, card sorting, phỏng vấn; chú ý câu “tôi tưởng…”.", "Mô tả cách người dùng nghĩ về hệ thống."],
            ["So với mô hình của nhà thiết kế.", "", "Các điểm lệch."],
            ["Chọn hướng xử lý cho từng điểm lệch.", "Đổi hệ thống cho khớp, hay giúp người dùng hiểu đúng.", "Quyết định thiết kế."],
            ["Thể hiện qua hình ảnh hệ thống.", "Nhãn, phản hồi, trạng thái, gợi ý ngắn.", "Thiết kế đã điều chỉnh."],
            ["Kiểm tra lại.", "", "Bằng chứng người dùng đã hiểu đúng."],
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          cols={3}
          items={[
            ["users", "Mỗi người có một mental model khác nhau", "Tùy kinh nghiệm. Không có một mental model chung cho mọi người dùng."],
            ["rotate", "Mental model thay đổi theo thời gian", "Khi người dùng quen dần với sản phẩm."],
            ["alert", "Không phải lỗi nào cũng do mental model", "Có lỗi do giao diện khó nhìn, khó bấm, hay do người dùng bị gián đoạn."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Dữ liệu từ think-aloud, card sorting, phỏng vấn.", "Mô tả cách hệ thống thật sự hoạt động."]}
          outputs={["Danh sách điểm lệch giữa mô hình người dùng và hệ thống.", "Quyết định thiết kế cho từng điểm.", "Nhãn, phản hồi, trạng thái đã điều chỉnh."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard
          icon="component"
          title="Bối cảnh"
          body="Nhiều khách phàn nàn “đã đặt lịch mà không thấy xác nhận”. Dữ liệu cho thấy họ chọn giờ rồi rời trang trước khi xác nhận."
        />
        <InfoCard
          icon="chat"
          title="Tìm hiểu"
          body="Usability test có think-aloud. Khách nói: “Chọn giờ xong là đặt rồi, giống khi đặt bàn qua điện thoại.” Mental model: chọn giờ = đã đặt. Hệ thống thật: chọn giờ chỉ giữ chỗ tạm 10 phút, cần bấm xác nhận."
        />
        <div className="flex gap-4">
          <InfoCard icon="rotate" title="Làm hệ thống khớp với người dùng" className="flex-1" body="Đặt lịch ngay khi chọn giờ, cho phép hủy dễ dàng sau đó." />
          <InfoCard
            icon="lightbulb"
            title="Giúp người dùng hiểu đúng"
            className="flex-1"
            body="Sau khi chọn giờ, hiện rõ “Giờ này đang được giữ cho bạn trong 10 phút — bấm Xác nhận để hoàn tất”, kèm đồng hồ đếm ngược."
          />
        </div>
        <InfoCard
          tone="fill"
          icon="check-circle"
          title="Quyết định"
          body="Nhóm chọn hướng thứ hai cho phiên bản này vì cần thông tin liên hệ trước khi đặt; kiểm tra lại bằng usability test."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Thiết kế theo hiểu biết của nhóm", "Nhóm biết nhiều hơn người dùng.", "Tìm hiểu cách người dùng nghĩ trước."],
            ["Đổ lỗi cho người dùng", "Lỗi thường do hình ảnh hệ thống không rõ.", "Xem lại nhãn, phản hồi, trạng thái."],
            ["Phá quy ước mà không giải thích", "Người dùng áp mental model cũ vào.", "Giữ quy ước, hoặc giải thích rõ khi khác."],
            ["Coi mental model là một sơ đồ cố định", "Mỗi người khác nhau, thay đổi theo thời gian.", "Tìm hiểu nhiều người, kiểm tra lại định kỳ."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Quan hệ với mental model"]}
          widths={[340]}
          rows={[
            { icon: "component", cells: ["Information Architecture", "IA tốt khớp với cách người dùng phân nhóm và gọi tên nội dung."] },
            { icon: "gauge", cells: ["Cognitive Load", "Mental model lệch làm tăng tải nhận thức: người dùng phải suy nghĩ thêm."] },
            { icon: "check-circle", cells: ["Consistency and standards (nguyên tắc Nielsen)", "Giữ quy ước giúp người dùng dùng lại mental model đã có."] },
            { icon: "pencil", cells: ["Microcopy", "Một cách sửa mental model lệch ngay tại chỗ."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn icon="list-search" title="Tìm hiểu" items={["Đã tìm hiểu cách người dùng nghĩ về hệ thống.", "Đã liệt kê điểm lệch với cách hệ thống hoạt động."]} />
          <ChecklistColumn
            icon="pencil"
            title="Thiết kế"
            items={["Mỗi điểm lệch có hướng xử lý: đổi hệ thống hay giúp người dùng hiểu.", "Giao diện thể hiện được cách hệ thống hoạt động.", "Đã kiểm tra lại với người dùng."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Information Architecture", "Kiến trúc thông tin", "Cấu trúc khớp với cách người dùng nghĩ."],
            ["Card Sorting", "Phân loại thẻ", "Cách tìm hiểu mental model về nhóm nội dung."],
            ["Cognitive Load", "Tải nhận thức", "Mental model lệch làm tăng tải nhận thức."],
            ["Heuristic Evaluation", "Đánh giá theo nguyên tắc kinh nghiệm", "Nhiều nguyên tắc liên quan đến mental model."],
            ["Microcopy", "Vi văn bản", "Sửa hiểu lầm ngay tại chỗ."],
            ["Moderated Testing", "Kiểm thử có điều phối", "Think-aloud giúp lộ ra mental model."],
          ]}
        />
      </Section>
    </div>
  );
}

export const MENTAL_MODEL: Article = {
  slug: "mental-model",
  version: 1,
  term: "Mental Model",
  fn: 2,
  vi: "Mô hình tư duy",
  kind: "Nguyên tắc / khái niệm",
  definition:
    "Mental model là những gì người dùng tin về cách một hệ thống hoạt động, dựa trên kinh nghiệm trước đó và những gì họ thấy. Niềm tin này giúp họ đoán điều gì sẽ xảy ra khi thao tác, và quyết định cách họ dùng giao diện.",
  definitionMore: "Khi mental model của người dùng khớp với cách hệ thống thật sự hoạt động, sản phẩm trở nên dễ dùng. Khi lệch, người dùng mắc lỗi hoặc bối rối.",
  oneLine: "Niềm tin của người dùng về cách hệ thống hoạt động, quyết định cách họ thao tác.",
  glance: [
    ["3", "Mô hình theo Don Norman"],
    ["2", "Hướng xử lý khi lệch"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Mô hình nhận thức", "Mô hình trong đầu"] },
    { label: "Nhóm chính", items: ["Nguyên tắc thiết kế"] },
    { label: "Thẻ phụ", items: ["Kiến trúc thông tin"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "Mental model là niềm tin của người dùng về cách hệ thống hoạt động. Không phải tài liệu do nhóm thiết kế vẽ ra. (Indi Young có một kỹ thuật vẽ sơ đồ “mental model diagram”; đó là cách thể hiện, không phải bản thân khái niệm.)",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
