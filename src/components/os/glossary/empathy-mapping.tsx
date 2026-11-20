"use client";

import { Blk, T } from "./edit";
import { CheckCards, InfoGrid, InOutCards, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Empathy Mapping — copy from ux-glossary/empathy-mapping.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "parts", title: "Thành phần của empathy map", icon: "component" },
  { id: "scope", title: "Empathy map cho một người và cho một nhóm", icon: "users" },
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

/** Says / Thinks / Does / Feels around the person in the middle; no reading order. */
function Quadrants({ title, center, cells, note }: { title: string; center: string; cells: [string, string, string[]][]; note?: string }) {
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="users" size={36} iconSize={18} radius={10} />
        <Eyebrow>{title}</Eyebrow>
      </div>
      <div className="relative grid grid-cols-2 gap-3">
        {cells.map(([name, hint, lines], i) => (
          <div
            key={name}
            className={`flex min-h-[200px] flex-col gap-3 rounded-[20px] p-7 ${i % 3 === 0 ? "bg-[var(--d-soft)]" : "bg-[var(--d-well)]"} ${i < 2 ? "pb-14" : "pt-14"}`}
          >
            <div className="flex items-baseline gap-3">
              <T className="text-[22px] leading-[30px] font-semibold tracking-[-0.5px] text-[var(--d-accent)]">{name}</T>
              <T className="font-mono text-[13px] tracking-[0.4px] text-[var(--w-muted)]">{hint}</T>
            </div>
            {lines.map((l) => (
              <T key={l} as="p" className="text-[16px] leading-6 tracking-[-0.2px]">
                {l}
              </T>
            ))}
          </div>
        ))}
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[16px] bg-[var(--d-fill)] px-6 py-3.5 text-center text-[17px] leading-6 font-semibold text-white">
          {center}
        </span>
      </div>
      {note ? (
        <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
          {note}
        </T>
      ) : null}
    </Blk>
  );
}

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Section {...S.problem}>
        <div className="flex flex-col gap-5">
          <P>
            Sau phỏng vấn hay quan sát, mỗi thành viên trong nhóm nhớ một phần khác nhau về người dùng. Nếu không gom lại, nhóm dễ thiết kế cho hình dung của riêng mình thay vì cho
            người dùng thật.
          </P>
          <P strong>
            Empathy map giải quyết việc này bằng cách đặt mọi quan sát lên cùng một bề mặt, chia theo bốn góc nhìn. Nhóm thấy ngay chỗ người dùng nói một đằng nhưng làm một nẻo, và
            chỗ nhóm chưa biết gì.
          </P>
        </div>
        <Eyebrow>Empathy map hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          cols={3}
          minH={170}
          items={[
            ["eye", "Nhóm đã hiểu người dùng đủ chưa", "Ô nào trống là khoảng trống nghiên cứu."],
            ["lightbulb", "Nhu cầu thật là gì", "Khác biệt giữa Nói và Làm, giữa Nghĩ và Cảm thấy thường chỉ ra nhu cầu ẩn."],
            ["target", "Ưu tiên vấn đề cho bước Define", "Trong design thinking."],
          ]}
        />
      </Section>

      <Section {...S.parts}>
        <P>Theo NN/g, empathy map gồm bốn ô xoay quanh người dùng (hoặc persona) ở giữa.</P>
        <Quadrants
          title="Bốn ô của empathy map"
          center="Người dùng"
          cells={[
            ["Nói", "SAYS", ["Câu nói trực tiếp từ phỏng vấn, nhật ký, phản hồi."]],
            ["Nghĩ", "THINKS", ["Điều người dùng nghĩ nhưng có thể không nói ra; suy ra từ quan sát."]],
            ["Làm", "DOES", ["Hành động quan sát được."]],
            ["Cảm thấy", "FEELS", ["Trạng thái cảm xúc, thường kèm lý do."]],
          ]}
          note="Ô trên trái là Nói, trên phải là Nghĩ, dưới trái là Làm, dưới phải là Cảm thấy. Ở giữa là tên người dùng hoặc persona. Sơ đồ không có thứ tự đọc."
        />
        <Table
          head={["Ô", "Chứa gì", "Ví dụ minh họa (giả định)"]}
          widths={[220]}
          rows={[
            { icon: "chat", cells: ["Nói (Says)", "Câu nói trực tiếp từ phỏng vấn, nhật ký, phản hồi.", "“Tôi chỉ muốn biết buổi tư vấn tốn bao nhiêu.”"] },
            { icon: "lightbulb", cells: ["Nghĩ (Thinks)", "Điều người dùng nghĩ nhưng có thể không nói ra; suy ra từ quan sát.", "Lo rằng mình sẽ bị thuyết phục mua gói đắt hơn."] },
            { icon: "eye", cells: ["Làm (Does)", "Hành động quan sát được.", "Mở trang dịch vụ ba lần trong một tuần; chụp màn hình bảng giá gửi cho người thân."] },
            { icon: "users", cells: ["Cảm thấy (Feels)", "Trạng thái cảm xúc, thường kèm lý do.", "Phân vân, ngại cam kết khi chưa rõ chi phí."] },
          ]}
        />
        <Callout tone="note" title="Ô Nghĩ và Cảm thấy cần thận trọng">
          Đây là phần suy luận. Ghi rõ dựa trên quan sát nào để nhóm không điền cảm tưởng của chính mình vào.
        </Callout>
        <P>
          Nhiều phiên bản mở rộng thêm các phần khác (ví dụ mục tiêu, điều người dùng nghe và thấy, khó khăn và mong muốn). Gamestorming đã công bố một bản cập nhật của canvas gốc.
          Hãy chọn một phiên bản và dùng thống nhất trong dự án.
        </P>
      </Section>

      <Section {...S.scope}>
        <div className="flex gap-4">
          <InfoCard icon="users" title="Một người" body="Dựng từ một buổi phỏng vấn hoặc quan sát. Dùng khi tổng hợp nhanh sau từng buổi nghiên cứu." className="flex-1" />
          <InfoCard
            tone="fill"
            icon="component"
            title="Gộp (aggregated)"
            body="Gộp nhiều empathy map của người dùng cùng phân khúc. Dùng khi tìm chủ đề chung; bước đầu để xây persona."
            className="flex-1"
          />
        </div>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "target",
              "Bối cảnh phù hợp",
              [
                "Đầu quá trình thiết kế, sau những buổi nghiên cứu đầu tiên.",
                "Cần sắp xếp dữ liệu định tính (ghi chép phỏng vấn, nhật ký) theo cách dễ thảo luận.",
                "Cần tìm khoảng trống nghiên cứu.",
                "Dùng như công cụ cuối buổi phỏng vấn hoặc usability test để tóm tắt nhanh.",
              ],
            ],
            ["eye", "Dấu hiệu nhận biết", ["Các thành viên tranh luận về người dùng dựa trên ấn tượng cá nhân.", "Có nhiều ghi chép nhưng chưa ai nhìn được toàn cảnh."]],
            ["clipboard-check", "Điều kiện cần", ["Có dữ liệu thật từ người dùng.", "Nhóm thống nhất empathy map đại diện cho ai."]],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[340]}
          rows={[
            { icon: "ban", cells: ["Chưa có dữ liệu người dùng", "Sơ đồ sẽ chứa giả định của nhóm.", "Nghiên cứu trước; hoặc ghi rõ là “giả thuyết” cần kiểm chứng."] },
            { icon: "split", cells: ["Cần hiểu trình tự trải nghiệm", "Empathy map không theo thời gian.", "Customer journey map."] },
            { icon: "users", cells: ["Cần mô tả đầy đủ một nhóm người dùng", "Empathy map thiếu mục tiêu, bối cảnh, hành vi chi tiết.", "User persona."] },
            { icon: "component", cells: ["Dữ liệu lớn, nhiều chủ đề", "Bốn ô không đủ để gom.", "Affinity diagram."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định đối tượng và phạm vi.", "Một người hay một phân khúc; trong bối cảnh nào.", "Tên người dùng/phân khúc ở giữa sơ đồ."],
            ["Chuẩn bị dữ liệu.", "Ghi chép phỏng vấn, nhật ký, quan sát.", "Dữ liệu nghiên cứu sẵn sàng."],
            ["Điền từng ô bằng giấy note.", "Mỗi người ghi riêng, rồi dán vào ô tương ứng. Ô Nói nên là câu trích dẫn thật.", "Bốn ô có nội dung."],
            ["Gom và tóm tắt.", "Gom các note giống nhau trong từng ô, đặt tên chủ đề.", "Chủ đề chính trong mỗi ô."],
            ["Tìm mâu thuẫn và khoảng trống.", "Đối chiếu Nói với Làm, Nghĩ với Cảm thấy; đánh dấu ô còn mỏng.", "Nhu cầu ẩn, câu hỏi nghiên cứu tiếp theo."],
            ["Rút ra nhu cầu.", "Chuyển các nhận định thành nhu cầu người dùng để dùng ở bước tiếp theo.", "Danh sách nhu cầu hoặc “how might we”."],
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["file", "Chỉ tốt bằng dữ liệu đầu vào", "Empathy map dựng từ giả định thì chỉ phản ánh giả định."],
            ["lightbulb", "Ô Nghĩ và Cảm thấy là suy luận", "Cần ghi nguồn quan sát để tránh nhóm áp cảm tưởng."],
            ["users", "Không thay persona hay journey map", "Empathy map là bước tổng hợp đầu, không phải mô tả đầy đủ."],
            ["component", "Empathy map gộp có thể làm mờ khác biệt", "Giữa các người dùng trong cùng phân khúc."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Dữ liệu nghiên cứu định tính.", "Bảng trắng hoặc bảng số với khung bốn ô.", "Những người đã tham gia nghiên cứu."]}
          outputs={["Empathy map cho từng người hoặc từng phân khúc.", "Nhu cầu người dùng đã rút ra.", "Danh sách khoảng trống nghiên cứu."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <P>Sau sáu buổi phỏng vấn với khách chưa đặt lịch, nhóm dựng một empathy map gộp cho phân khúc “khách đang cân nhắc”.</P>
        <Quadrants
          title="Nội dung đã gom (giả định)"
          center="Khách đang cân nhắc"
          cells={[
            ["Nói", "SAYS", ["“Tôi chỉ muốn biết chi phí.”", "“Để tôi hỏi ý kiến nhà đã.”"]],
            ["Nghĩ", "THINKS", ["Sợ bị ép mua gói đắt hơn.", "Không chắc buổi tư vấn có giúp được mình."]],
            ["Làm", "DOES", ["Mở trang nhiều lần trước khi quyết định.", "Chụp bảng giá gửi người thân.", "So sánh với hai nơi khác."]],
            ["Cảm thấy", "FEELS", ["Phân vân, ngại cam kết.", "Yên tâm hơn khi đọc được ví dụ tình huống giống mình."]],
          ]}
        />
        <div className="flex gap-4">
          <InfoCard
            tone="fill"
            icon="split"
            title="Mâu thuẫn tìm được"
            body="Khách nói chỉ cần biết giá, nhưng làm lại là hỏi ý kiến người thân và so sánh nhiều nơi. Nhu cầu thật là tự tin rằng lựa chọn của mình đáng tiền, không chỉ là con số."
            className="flex-1"
          />
          <InfoCard
            icon="binoculars"
            title="Khoảng trống"
            body="Ô Cảm thấy ở giai đoạn ngay sau khi đặt lịch còn mỏng → cần thêm nghiên cứu (ví dụ diary study)."
            className="flex-1"
          />
        </div>
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Điền từ trí tưởng tượng", "Sơ đồ chỉ phản ánh nhóm, không phải người dùng.", "Mỗi note gắn với dữ liệu thật; ghi rõ khi là giả thuyết."],
            ["Ô Nói không phải câu trích dẫn", "Mất độ tin cậy, lẫn với suy luận.", "Dùng nguyên văn lời người dùng."],
            ["Coi empathy map là sản phẩm cuối", "Dừng lại ở sơ đồ, không rút ra nhu cầu.", "Luôn có bước rút nhu cầu và câu hỏi tiếp theo."],
            ["Gộp người dùng quá khác nhau", "Che mất khác biệt quan trọng.", "Một empathy map cho một phân khúc."],
            ["Đọc như trình tự thời gian", "Empathy map không có thứ tự.", "Dùng journey map khi cần trình tự."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Tài liệu", "Mục đích", "Cấu trúc", "Khi nào chọn"]}
          widths={[260]}
          rows={[
            { icon: "users", highlight: true, cells: ["Empathy Map", "Hiểu chung về người dùng.", "Bốn ô, không theo thời gian.", "Sau nghiên cứu đầu, cần tổng hợp nhanh."] },
            { icon: "file", cells: ["User Persona", "Mô tả một nhóm người dùng đại diện.", "Hồ sơ: mục tiêu, bối cảnh, hành vi.", "Cần tham chiếu xuyên suốt dự án."] },
            { icon: "split", cells: ["Customer Journey Map", "Trải nghiệm theo thời gian.", "Các giai đoạn, điểm chạm.", "Cần thấy trình tự và điểm đứt gãy."] },
            { icon: "component", cells: ["Affinity Diagram", "Gom nhiều dữ liệu thành chủ đề.", "Nhóm tự do theo nội dung.", "Dữ liệu nhiều, chưa biết chủ đề."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Nội dung"
            items={[
              "Empathy map đại diện cho một người hoặc một phân khúc rõ ràng.",
              "Nội dung dựa trên dữ liệu thật, giả thuyết được ghi rõ.",
              "Ô Nói là câu trích dẫn.",
              "Ô Nghĩ và Cảm thấy có ghi quan sát làm căn cứ.",
            ]}
          />
          <ChecklistColumn
            icon="lightbulb"
            title="Rút ra"
            items={["Đã tìm mâu thuẫn giữa các ô.", "Đã đánh dấu khoảng trống nghiên cứu.", "Đã rút ra nhu cầu cho bước tiếp theo."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Design Thinking", "Tư duy thiết kế", "Empathy map là công cụ của giai đoạn thấu cảm."],
            ["User Persona", "Chân dung người dùng", "Empathy map gộp là bước đầu để xây persona."],
            ["Customer Journey", "Hành trình khách hàng", "Bổ sung chiều thời gian mà empathy map không có."],
            ["Affinity Diagram", "Sơ đồ tương đồng", "Cách gom dữ liệu khi quá nhiều cho bốn ô."],
            ["Contextual Inquiry", "Phỏng vấn tại bối cảnh", "Nguồn dữ liệu cho ô Làm."],
            ["Diary Study", "Nghiên cứu nhật ký", "Lấp khoảng trống về cảm xúc theo thời gian."],
          ]}
        />
      </Section>
    </div>
  );
}

export const EMPATHY_MAPPING: Article = {
  slug: "empathy-mapping",
  version: 1,
  term: "Empathy Mapping",
  fn: 2,
  vi: "Bản đồ thấu cảm",
  kind: "Tài liệu / sơ đồ thiết kế",
  definition:
    "Empathy map là một sơ đồ chia bốn ô (Nói, Nghĩ, Làm, Cảm thấy) dùng để gom những gì nhóm biết về một người dùng hoặc một nhóm người dùng, nhằm tạo hiểu biết chung về nhu cầu và cảm nhận của họ.",
  definitionMore: "Sơ đồ giúp nhóm nhìn người dùng từ nhiều phía cùng lúc và thấy chỗ nào còn thiếu hiểu biết.",
  oneLine: "Sơ đồ bốn ô Nói – Nghĩ – Làm – Cảm thấy giúp nhóm hiểu chung về người dùng.",
  glance: [
    ["4", "Ô: Nói, Nghĩ, Làm, Cảm thấy"],
    ["2", "Loại: một người, gộp"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Empathy map canvas"] },
    { label: "Nhóm chính", items: ["Tổng hợp và mô hình hóa"] },
    { label: "Thẻ phụ", items: ["Nghiên cứu khám phá"] },
    { label: "Lưu ý tên gọi", items: ["“Empathy mapping” là hoạt động; “empathy map” là tài liệu tạo ra. Không phải journey map: empathy map không theo trình tự thời gian."] },
  ],
  sections: SECTIONS,
  Body,
};
