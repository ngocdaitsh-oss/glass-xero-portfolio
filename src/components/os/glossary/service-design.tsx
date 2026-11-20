"use client";

import { Fragment } from "react";
import { Blk, T } from "./edit";
import { CheckCards, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Service Design — copy from ux-glossary/service-design.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "parts", title: "Thành phần của dịch vụ", icon: "component" },
  { id: "blueprint", title: "Service blueprint", icon: "list" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list-search" },
  { id: "limits", title: "Giới hạn: khi nào service design chưa đủ", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

const STEPS = ["Bấm đổi lịch", "Chọn giờ mới", "Nhận xác nhận"];
/** Rows of the blueprint; null leaves the step empty, "!" marks the break point. */
const ROWS: [string, (string | null)[], string | null][] = [
  ["Khách", ["Bấm “Đổi lịch”", "Chọn giờ mới", "Nhận xác nhận"], "Đường tương tác"],
  ["Frontstage", ["Hiện giờ trống", "Gửi xác nhận", null], "Đường hiển thị"],
  ["Backstage", [null, "Điều phối kiểm tra", null], "Đường tương tác nội bộ"],
  ["Hỗ trợ", ["!Hệ thống lịch không đồng bộ với lịch chuyên gia", null, null], null],
];

/** Service blueprint for one rescheduling journey, with the three dividing lines and the broken support layer. */
function Blueprint() {
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="list" size={36} iconSize={18} radius={10} />
        <Eyebrow>Service blueprint: khách đổi lịch</Eyebrow>
      </div>
      <div className="grid grid-cols-[120px_repeat(3,1fr)] gap-x-3 gap-y-2">
        <span />
        {STEPS.map((s) => (
          <span key={s} className="pb-1 text-center font-mono text-[13px] tracking-[1px] text-[var(--w-muted)] uppercase">
            {s}
          </span>
        ))}
        {ROWS.map(([lane, cells, line]) => (
          <Fragment key={lane}>
            <span className="flex items-center text-[15px] leading-[22px] font-semibold">{lane}</span>
            {cells.map((c, i) => {
              if (c === null && lane === "Hỗ trợ") return null;
              if (c === null) return <span key={i} className="min-h-[56px] rounded-xl" />;
              const bad = c.startsWith("!");
              return (
                <div
                  key={i}
                  className={`flex min-h-[56px] items-center justify-center rounded-xl px-4 py-3 text-center text-[15px] leading-[22px] ${bad ? "col-span-3 bg-[var(--d-bad-soft)] font-semibold text-[var(--d-bad)]" : lane === "Khách" ? "bg-[var(--d-fill)] text-white" : "bg-[var(--d-well)]"}`}
                >
                  {bad ? `✗ ${c.slice(1)}` : c}
                </div>
              );
            })}
            {line && (
              <div className="col-span-4 flex items-center gap-3 py-1">
                <span className="h-0 flex-1 border-t-2 border-dashed border-[var(--w-muted)] opacity-40" />
                <span className="font-mono text-[12px] text-[var(--w-muted)]">{line}</span>
                <span className="h-0 flex-1 border-t-2 border-dashed border-[var(--w-muted)] opacity-40" />
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Giao diện đổi lịch hoạt động đúng; điểm đứt gãy nằm ở tầng hỗ trợ phía sau, nơi khách không thấy.
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
            Nhiều vấn đề trải nghiệm không nằm ở giao diện. Khách đổi lịch trên ứng dụng rất dễ, nhưng chuyên gia không nhận được thông báo và vẫn chờ ở giờ cũ. Giao diện “đúng” nhưng dịch
            vụ vẫn hỏng, vì quy trình và hệ thống phía sau không theo kịp.
          </P>
          <P strong>Service design nhìn toàn bộ hệ thống tạo ra trải nghiệm, không chỉ màn hình.</P>
        </div>
        <Eyebrow>Service design hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          cols={3}
          minH={150}
          items={[
            ["list-search", "Nguyên nhân gốc nằm ở đâu", "Giao diện, quy trình, hệ thống hay con người."],
            ["users", "Nhân viên cần gì", "Để phục vụ khách tốt."],
            ["rotate", "Quy trình nào cần thay đổi", "Khi đổi trải nghiệm khách hàng."],
          ]}
        />
      </Section>

      <Section {...S.parts}>
        <P>NN/g chia nguồn lực của một dịch vụ thành ba nhóm:</P>
        <Table
          head={["Thành phần", "Gồm", "Ví dụ minh họa (giả định)"]}
          widths={[220]}
          rows={[
            { icon: "users", cells: ["Con người (people)", "Nhân viên, khách hàng, khách hàng khác, đối tác.", "Chuyên gia tư vấn, nhân viên chăm sóc khách hàng, khách."] },
            { icon: "component", cells: ["Vật dụng (props)", "Đồ vật vật lý và số.", "Ứng dụng đặt lịch, phòng tư vấn, email xác nhận, tài liệu tóm tắt."] },
            { icon: "rotate", cells: ["Quy trình (processes)", "Luồng công việc, thủ tục.", "Quy trình xác nhận lịch, quy trình chuẩn bị trước buổi tư vấn."] },
          ]}
        />
        <div className="flex gap-4">
          <InfoCard icon="eye" title="Frontstage" className="flex-1" body="Phần khách thấy: kênh, sản phẩm, điểm chạm, giao diện." />
          <InfoCard icon="component" title="Backstage" className="flex-1" body="Phần khách không thấy: chính sách, công nghệ, hạ tầng, hệ thống." />
        </div>
      </Section>

      <Section {...S.blueprint}>
        <P>
          Service blueprint là sơ đồ chính của service design. Theo NN/g, blueprint thể hiện quan hệ giữa con người, vật dụng và quy trình, gắn với các điểm chạm trong một hành trình khách
          hàng.
        </P>
        <Table
          head={["Tầng", "Mô tả", "Ví dụ (giả định): khách đổi lịch"]}
          widths={[240]}
          rows={[
            { icon: "users", cells: ["Hành động của khách", "Khách làm gì.", "Bấm “Đổi lịch” trên ứng dụng."] },
            { icon: "eye", cells: ["Hành động frontstage", "Nhân viên hoặc hệ thống khách thấy.", "Ứng dụng hiện giờ trống, gửi xác nhận."] },
            { icon: "component", cells: ["Hành động backstage", "Nhân viên làm phía sau, khách không thấy.", "Nhân viên điều phối kiểm tra lịch chuyên gia."] },
            { icon: "rotate", cells: ["Quy trình hỗ trợ", "Hệ thống, quy trình nội bộ.", "Hệ thống lịch đồng bộ với lịch của chuyên gia."] },
          ]}
        />
        <Blueprint />
        <P>Blueprint có thể thêm: bằng chứng vật lý (props, địa điểm), thời gian, chính sách, cảm xúc, chỉ số.</P>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "target",
              "Bối cảnh phù hợp",
              ["Dịch vụ có nhiều kênh (trực tuyến, điện thoại, trực tiếp).", "Có nhiều bộ phận phối hợp để tạo trải nghiệm.", "Vấn đề lặp lại mà sửa giao diện không giải quyết được."],
            ],
            ["eye", "Dấu hiệu nhận biết", ["Khách phàn nàn về việc “không ai biết chuyện gì đang xảy ra”.", "Nhân viên phải làm nhiều việc thủ công để bù cho hệ thống."]],
            ["clipboard-check", "Điều kiện cần", ["Tiếp cận được nhân viên và quy trình nội bộ.", "Sự tham gia của nhiều bộ phận."]],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[360]}
          rows={[
            { icon: "component", cells: ["Sản phẩm số thuần túy, ít quy trình phía sau", "Phần backstage đơn giản.", "Journey mapping, UX design."] },
            { icon: "ban", cells: ["Không tiếp cận được bộ phận nội bộ", "Không vẽ được backstage.", "Bắt đầu từ journey map."] },
            { icon: "eye", cells: ["Vấn đề nằm rõ ràng ở giao diện", "Không cần phân tích toàn hệ thống.", "Usability testing."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Chọn hành trình và kịch bản.", "", "Phạm vi blueprint."],
            ["Nghiên cứu cả khách và nhân viên.", "Phỏng vấn, quan sát nhân viên (contextual inquiry), journey map của khách.", "Dữ liệu frontstage và backstage."],
            ["Dựng service blueprint hiện tại.", "Cùng đại diện các bộ phận.", "Blueprint hiện tại, điểm đứt gãy."],
            ["Thiết kế lại.", "Thay đổi con người, vật dụng, quy trình.", "Blueprint tương lai."],
            ["Thử nghiệm và triển khai.", "Thử với một nhóm nhỏ trước.", "Dịch vụ đã cải thiện."],
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          cols={3}
          items={[
            ["list", "Blueprint chỉ cho một hành trình", "Dịch vụ lớn cần nhiều blueprint."],
            ["users", "Thay đổi quy trình cần quyền quyết định", "Vượt ngoài nhóm thiết kế."],
            ["hourglass", "Blueprint cũ dần", "Khi quy trình thay đổi."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Journey map của khách.", "Dữ liệu về nhân viên, quy trình, hệ thống.", "Đại diện các bộ phận."]}
          outputs={["Service blueprint hiện tại và tương lai.", "Điểm đứt gãy, nguyên nhân gốc.", "Thay đổi về con người, vật dụng, quy trình."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard
          icon="component"
          title="Bối cảnh"
          body="Sau khi ra mắt chức năng đổi lịch tự phục vụ, khách vẫn phàn nàn: đến buổi tư vấn đã đổi giờ nhưng chuyên gia không có mặt."
        />
        <InfoCard
          icon="list"
          title="Service blueprint (như sơ đồ ở trên)"
          body="Ứng dụng ghi nhận đổi lịch, nhưng hệ thống lịch không đồng bộ tự động với lịch của chuyên gia; nhân viên điều phối phải kiểm tra bằng tay mỗi sáng, nên lịch đổi trong ngày bị sót."
        />
        <InfoCard
          tone="fill"
          icon="check-circle"
          title="Thay đổi"
          body="Đồng bộ tự động hai hệ thống; trong thời gian chờ, gửi thông báo cho chuyên gia ngay khi có đổi lịch; quy định không cho đổi lịch trong vòng 2 giờ trước buổi hẹn."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Chỉ vẽ phần khách thấy", "Đó là journey map, không phải service design.", "Vẽ cả backstage và quy trình hỗ trợ."],
            ["Không hỏi nhân viên", "Bỏ sót nguyên nhân gốc.", "Nghiên cứu cả nhân viên."],
            ["Một blueprint cho mọi hành trình", "Quá rối, mất trọng tâm.", "Một hành trình, một kịch bản."],
            ["Sửa giao diện cho vấn đề quy trình", "Vấn đề gốc vẫn còn.", "Xác định tầng nào gây vấn đề."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Phạm vi"]}
          widths={[320]}
          rows={[
            { icon: "component", highlight: true, cells: ["Service Design", "Toàn bộ hệ thống: frontstage, backstage, quy trình."] },
            { icon: "pencil", cells: ["UX Design", "Trải nghiệm với sản phẩm, chủ yếu phần khách tương tác."] },
            { icon: "users", cells: ["Customer Experience (CX)", "Toàn bộ cảm nhận của khách với tổ chức."] },
            { icon: "arrows", cells: ["Journey Map", "Hành trình của khách; service blueprint mở rộng thêm phần phía sau."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn icon="file" title="Phạm vi và nghiên cứu" items={["Phạm vi là một hành trình, một kịch bản.", "Đã nghiên cứu cả khách và nhân viên."]} />
          <ChecklistColumn
            icon="list"
            title="Blueprint"
            items={["Blueprint có đủ tầng và các đường phân cách.", "Đánh dấu điểm đứt gãy và nguyên nhân gốc.", "Thay đổi đề xuất bao gồm con người, vật dụng, quy trình khi cần."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Journey Mapping", "Lập bản đồ hành trình", "Service blueprint mở rộng journey map."],
            ["Customer Experience", "Trải nghiệm khách hàng", "Service design cải thiện CX từ phía sau."],
            ["Customer Journey", "Hành trình khách hàng", "Hành trình mà blueprint dựa vào."],
            ["Contextual Inquiry", "Phỏng vấn tại bối cảnh", "Cách nghiên cứu công việc của nhân viên."],
            ["Design Thinking", "Tư duy thiết kế", "Cách tiếp cận thường dùng trong service design."],
            ["Research Operations", "Vận hành nghiên cứu", "Một ví dụ về thiết kế quy trình nội bộ."],
          ]}
        />
      </Section>
    </div>
  );
}

export const SERVICE_DESIGN: Article = {
  slug: "service-design",
  version: 1,
  term: "Service Design",
  fn: 7,
  vi: "Thiết kế dịch vụ",
  kind: "Quy trình / cách tiếp cận",
  definition:
    "Service design là việc lên kế hoạch và tổ chức các nguồn lực của một tổ chức (con người, vật dụng và quy trình) để trực tiếp cải thiện trải nghiệm của nhân viên, và qua đó gián tiếp cải thiện trải nghiệm của khách hàng.",
  definitionMore: "Service design nhìn dịch vụ như một hệ thống gồm phần khách hàng thấy (frontstage) và phần phía sau (backstage).",
  oneLine: "Tổ chức con người, vật dụng và quy trình phía sau để dịch vụ vận hành tốt cho cả nhân viên và khách.",
  glance: [
    ["3", "Nhóm nguồn lực theo NN/g"],
    ["4", "Tầng của service blueprint"],
  ],
  facts: [
    { label: "Nhóm chính", items: ["Chiến lược sản phẩm"] },
    { label: "Thẻ phụ", items: ["Tổng hợp và mô hình hóa"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "Service design nhìn cả phía sau trải nghiệm: nhân viên, quy trình, hệ thống nội bộ. UX design thường tập trung vào phần khách hàng thấy và tương tác. NN/g ghi nhận thuật ngữ được Lynn Shostack sử dụng từ năm 1982.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
