"use client";

import { Blk, T } from "./edit";
import { CheckCards, InfoGrid, PairCards, RelatedCards, Scenario } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* CXO — copy from ux-glossary/cxo.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "mechanism", title: "Cơ chế: CXO tạo tác động bằng cách nào", icon: "component" },
  { id: "signals", title: "Biểu hiện trong tổ chức: dấu hiệu tốt và chưa tốt", icon: "eye" },
  { id: "when", title: "Khi nào tổ chức cần vai trò này", icon: "check-circle" },
  { id: "limits", title: "Giới hạn: khi nào có CXO vẫn chưa đủ", icon: "shield-alert" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các vai trò gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** Departments as columns; the customer journey is the line across them that the CXO owns. */
function Swimlanes() {
  const depts = ["Marketing", "Sản phẩm", "Thiết kế", "Bán hàng", "CSKH"];
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="split" size={36} iconSize={18} radius={10} />
        <Eyebrow>CXO sở hữu đường ngang</Eyebrow>
      </div>
      <div className="relative grid grid-cols-5 gap-3">
        {depts.map((d) => (
          <div key={d} className="flex h-[200px] flex-col items-center gap-3 rounded-2xl bg-[var(--d-well)] pt-4">
            <T className="text-[16px] leading-6 font-semibold">{d}</T>
          </div>
        ))}
        <div className="pointer-events-none absolute inset-x-0 top-[96px] flex items-center">
          <span className="h-1.5 flex-1 rounded-full bg-[var(--d-fill)]" />
          <span aria-hidden className="-ml-1 text-[22px] leading-none text-[var(--d-fill)]">
            ▶
          </span>
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-[89px] grid grid-cols-5 gap-3">
          {depts.map((d) => (
            <span key={d} className="flex justify-center">
              <span className="size-5 rounded-full bg-[var(--d-fill)] ring-4 ring-[var(--d-well)]" />
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <T className="text-[16px] leading-6 font-semibold text-[var(--d-accent)]">Hành trình khách hàng cắt qua mọi bộ phận</T>
        <span className="rounded-xl bg-[var(--d-fill)] px-4 py-2 text-white">
          <T className="text-[15px] leading-[22px] font-semibold">CXO chịu trách nhiệm cho đường ngang</T>
        </span>
      </div>
    </Blk>
  );
}

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Section {...S.problem}>
        <div className="flex flex-col gap-5">
          <P>
            Trải nghiệm của khách hàng không nằm gọn trong một bộ phận. Một khách đặt lịch tư vấn có thể gặp quảng cáo (marketing), trang dịch vụ (sản phẩm, thiết kế), email xác nhận
            (vận hành), cuộc gọi tư vấn (bán hàng) và hỗ trợ sau đó (chăm sóc khách hàng). Mỗi bộ phận tối ưu phần của mình theo chỉ số riêng. Kết quả là những khoảng trống ở chỗ
            giao nhau: thông tin không khớp, khách phải lặp lại câu chuyện, lời hứa ở bước này bị phá ở bước sau.
          </P>
          <P strong>
            Khi không ai sở hữu trải nghiệm từ đầu đến cuối, các vấn đề liên phòng ban thường không được ưu tiên. Lý do là chúng không thuộc chỉ số của riêng ai.
          </P>
        </div>
        <Eyebrow>Vai trò CXO hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          minH={170}
          items={[
            ["target", "Ưu tiên đầu tư", "Vấn đề trải nghiệm nào ảnh hưởng nhiều nhất đến khách hàng và kinh doanh."],
            ["arrows", "Phân xử đánh đổi giữa các bộ phận", "Khi tối ưu cho một bộ phận làm hại trải nghiệm tổng thể."],
            ["gauge", "Thống nhất chỉ số", "Tổ chức đo trải nghiệm bằng gì, và ai chịu trách nhiệm."],
            ["book", "Xây năng lực", "Đầu tư vào nghiên cứu, thiết kế, design system, quy trình đưa dữ liệu người dùng vào quyết định."],
          ]}
        />
      </Section>

      <Section {...S.mechanism}>
        <Table
          head={["Đòn bẩy", "Mô tả", "Biểu hiện cụ thể"]}
          widths={[300]}
          rows={[
            { icon: "lightbulb", cells: ["Tầm nhìn chung", "Định nghĩa trải nghiệm mà tổ chức muốn mang lại.", "Nguyên tắc trải nghiệm được các bộ phận dùng khi ra quyết định."] },
            {
              icon: "split",
              cells: [
                "Bản đồ hành trình xuyên phòng ban",
                "Nhìn trải nghiệm theo hành trình của khách, không theo sơ đồ tổ chức.",
                "Customer journey map có chủ sở hữu cho từng giai đoạn.",
              ],
            },
            { icon: "gauge", cells: ["Chỉ số chung", "Đưa chỉ số trải nghiệm vào bộ chỉ số điều hành.", "Báo cáo định kỳ gồm chỉ số trải nghiệm bên cạnh chỉ số tài chính."] },
            {
              icon: "rotate",
              cells: ["Vòng phản hồi", "Đảm bảo phản hồi của khách được thu thập, phân tích và dẫn tới hành động.", "Customer feedback loop có người chịu trách nhiệm đóng vòng."],
            },
            {
              icon: "users",
              cells: ["Năng lực và quy trình", "Xây đội nghiên cứu, thiết kế, research operations, design system.", "Nghiên cứu người dùng là một bước bình thường trong quy trình sản phẩm."],
            },
            { icon: "check-circle", cells: ["Quyền quyết định", "Có tiếng nói trong các quyết định chiến lược.", "Thay đổi ảnh hưởng đến trải nghiệm được đánh giá trước khi duyệt."] },
          ]}
        />
        <Swimlanes />
      </Section>

      <Section {...S.signals}>
        <PairCards
          icon={null}
          first="Chưa tốt"
          second="Tốt hơn"
          items={[
            [
              "Quyền hạn",
              "Chức danh có, nhưng không có ngân sách hay tiếng nói trong quyết định.",
              "Có ngân sách, có quyền tham gia và phản biện quyết định ảnh hưởng đến trải nghiệm.",
            ],
            ["Chỉ số", "Mỗi bộ phận báo cáo chỉ số riêng, không ai nhìn tổng thể.", "Một bộ chỉ số trải nghiệm chung, có chủ sở hữu rõ ràng."],
            ["Dữ liệu người dùng", "Nghiên cứu làm một lần cho dự án lớn, rồi bỏ quên.", "Nghiên cứu liên tục; kết quả được lưu và tái sử dụng."],
            ["Hợp tác", "CXO “đi kiểm tra” các bộ phận.", "CXO tạo điều kiện, công cụ và ngôn ngữ chung để các bộ phận tự cải thiện."],
            ["Ưu tiên", "Trải nghiệm chỉ được nhắc khi có khủng hoảng.", "Trải nghiệm là tiêu chí trong lập kế hoạch định kỳ."],
          ]}
        />
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "target",
              "Bối cảnh phù hợp",
              [
                "Tổ chức có nhiều kênh và nhiều bộ phận cùng tham gia vào trải nghiệm của khách.",
                "Vấn đề trải nghiệm thường nằm ở chỗ giao giữa các bộ phận.",
                "Trải nghiệm là yếu tố cạnh tranh chính (dịch vụ, tài chính, y tế, thương mại điện tử).",
                "Tổ chức đang đầu tư lớn vào chuyển đổi số hoặc thay đổi mô hình phục vụ khách hàng.",
              ],
            ],
            [
              "eye",
              "Dấu hiệu nhận biết",
              [
                "Khách phàn nàn về việc phải lặp lại thông tin giữa các kênh.",
                "Các bộ phận có chỉ số tốt nhưng mức hài lòng tổng thể vẫn thấp.",
                "Không ai trả lời được “ai chịu trách nhiệm cho trải nghiệm của khách từ đầu đến cuối?”.",
              ],
            ],
          ]}
        />
        <Callout tone="note" icon="users" title="Với tổ chức nhỏ">
          Không nhất thiết cần một chức danh riêng. Trách nhiệm có thể giao cho một lãnh đạo hiện có (ví dụ trưởng sản phẩm), miễn là trách nhiệm và quyền hạn được ghi rõ.
        </Callout>
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["lightbulb", "Chức danh không thay được văn hóa", "Nếu lãnh đạo cao nhất không coi trọng trải nghiệm, CXO khó tạo thay đổi."],
            ["ban", "Không có quyền hạn thì chỉ là tư vấn", "Vai trò không có ngân sách và tiếng nói trong quyết định thường chỉ dừng ở khuyến nghị."],
            ["users", "Một người không thay được năng lực của tổ chức", "Vẫn cần đội nghiên cứu, thiết kế và quy trình."],
            ["book", "Phạm vi khác nhau giữa các tổ chức", "Cùng một chức danh có thể có trách nhiệm rất khác nhau; đánh giá theo trách nhiệm thật, không theo tên gọi."],
          ]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối luồng đặt lịch tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard icon="analytics" title="Bối cảnh" body="Một công ty dịch vụ có tỷ lệ đặt lịch online tăng, nhưng tỷ lệ khách đến buổi tư vấn lại thấp." />
        <Subhead icon="split">Hai cách nhìn</Subhead>
        <div className="flex items-stretch gap-4">
          <Blk label="thẻ" className="flex flex-1 flex-col gap-5 rounded-[24px] bg-[var(--d-bad-soft)] p-7">
            <div className="flex items-center gap-3">
              <Tile icon="x" size={36} iconSize={18} radius={10} tone="bad" />
              <Eyebrow size={14} className="text-[var(--d-bad)]">
                Không có người sở hữu trải nghiệm tổng thể
              </Eyebrow>
            </div>
            {[
              "Đội sản phẩm báo cáo tỷ lệ đặt lịch tăng, coi là thành công.",
              "Đội vận hành nhận lịch nhưng không biết khách đặt qua kênh nào và kỳ vọng gì.",
              "Đội tư vấn phải hỏi lại thông tin khách đã nhập trong form.",
            ].map((t) => (
              <T key={t} as="p" className="text-[17px] leading-[26px] text-[var(--d-callout-body)]">
                {t}
              </T>
            ))}
          </Blk>
          <Blk label="thẻ" className="flex flex-1 flex-col gap-5 rounded-[24px] bg-[var(--d-soft)] p-7">
            <div className="flex items-center gap-3">
              <Tile icon="check" size={36} iconSize={18} radius={10} tone="solid" />
              <Eyebrow size={14} className="text-[var(--d-accent)]">
                Có người sở hữu từ đầu đến cuối
              </Eyebrow>
            </div>
            {[
              "Lập customer journey map từ lúc khách tìm hiểu đến sau buổi tư vấn; mỗi giai đoạn có chủ sở hữu.",
              "Thêm chỉ số chung “tỷ lệ khách đặt lịch đến buổi tư vấn” vào báo cáo của cả ba đội.",
              "Kết nối dữ liệu form với hệ thống của đội tư vấn để khách không phải lặp lại thông tin.",
            ].map((t) => (
              <T key={t} as="p" className="text-[17px] leading-[26px] text-[var(--d-callout-body)]">
                {t}
              </T>
            ))}
          </Blk>
        </div>
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            [
              "Coi CXO là “trưởng phòng thiết kế” với chức danh lớn hơn",
              "CXO chịu trách nhiệm trải nghiệm toàn tổ chức, không chỉ giao diện.",
              "Xác định phạm vi gồm mọi điểm chạm, kể cả ngoài sản phẩm số.",
            ],
            ["Bổ nhiệm CXO nhưng không trao quyền", "Không thể thay đổi quy trình hay ưu tiên của các bộ phận khác.", "Gắn trách nhiệm với ngân sách và quyền tham gia quyết định."],
            [
              "Đẩy hết trách nhiệm trải nghiệm cho CXO",
              "Các bộ phận khác coi trải nghiệm “không phải việc của mình”.",
              "Mỗi bộ phận vẫn sở hữu phần trải nghiệm của mình; CXO điều phối tổng thể.",
            ],
            ["Nhầm CXO với “C-level nói chung”", "Gây hiểu nhầm trong tài liệu và tuyển dụng.", "Viết đầy đủ “Chief Experience Officer” ở lần đầu nhắc đến."],
            ["Chỉ đo bằng một chỉ số (ví dụ NPS)", "Một chỉ số không phản ánh hết trải nghiệm.", "Dùng bộ chỉ số gồm cảm nhận, hành vi và kết quả kinh doanh."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Vai trò", "Trọng tâm", "Phạm vi điển hình"]}
          widths={[340]}
          rows={[
            { icon: "users", highlight: true, cells: ["Chief Experience Officer (CXO)", "Trải nghiệm tổng thể của khách hàng và người dùng.", "Mọi điểm chạm, xuyên phòng ban."] },
            { icon: "chat", cells: ["Chief Customer Officer (CCO)", "Quan hệ khách hàng, giữ chân, giá trị vòng đời khách hàng.", "Thường gắn với bán hàng, dịch vụ, thành công khách hàng."] },
            { icon: "component", cells: ["Chief Design Officer (CDO)", "Chất lượng và chiến lược thiết kế.", "Đội thiết kế, ngôn ngữ thiết kế, design system."] },
            { icon: "eye", cells: ["Head of UX / UX Director", "Năng lực nghiên cứu và thiết kế UX.", "Sản phẩm số; thường không ở cấp điều hành cao nhất."] },
            { icon: "target", cells: ["Chief Product Officer (CPO)", "Chiến lược và danh mục sản phẩm.", "Sản phẩm; trải nghiệm là một trong nhiều mục tiêu."] },
          ]}
        />
        <Callout tone="note">Phạm vi trong bảng mang tính điển hình; mỗi tổ chức định nghĩa khác nhau.</Callout>
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát cách tổ chức đang sở hữu trải nghiệm; trạng thái tick không được lưu lại.">
        <ChecklistColumn
          icon="clipboard-check"
          title="Sở hữu trải nghiệm"
          items={[
            "Có một người hoặc nhóm chịu trách nhiệm rõ ràng cho trải nghiệm từ đầu đến cuối.",
            "Người đó có ngân sách và tiếng nói trong quyết định chiến lược.",
            "Có bản đồ hành trình xuyên phòng ban, với chủ sở hữu cho từng giai đoạn.",
            "Có bộ chỉ số trải nghiệm chung, được báo cáo định kỳ ở cấp điều hành.",
            "Phản hồi của khách được thu thập, phân tích và dẫn tới hành động.",
            "Mỗi bộ phận hiểu phần trải nghiệm mình chịu trách nhiệm.",
          ]}
        />
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Customer Experience", "Trải nghiệm khách hàng", "Phạm vi trách nhiệm chính của CXO."],
            ["Customer Journey", "Hành trình khách hàng", "Cách nhìn trải nghiệm xuyên phòng ban mà CXO sở hữu."],
            ["Customer Feedback Loop", "Vòng phản hồi khách hàng", "Cơ chế CXO dùng để biến phản hồi thành hành động."],
            ["Research Operations", "Vận hành nghiên cứu", "Năng lực tổ chức mà CXO thường đầu tư."],
            ["Service Design", "Thiết kế dịch vụ", "Phương pháp thiết kế xuyên kênh, xuyên phòng ban."],
            ["User Experience (UX)", "Trải nghiệm người dùng", "Một phần của trải nghiệm tổng thể."],
          ]}
        />
      </Section>
    </div>
  );
}

export const CXO: Article = {
  slug: "cxo",
  version: 1,
  term: "CXO",
  fn: 7,
  vi: "Giám đốc trải nghiệm (Chief Experience Officer)",
  kind: "Nguyên tắc / khái niệm",
  definition:
    "CXO (Chief Experience Officer) là vị trí lãnh đạo cấp cao chịu trách nhiệm về trải nghiệm tổng thể của khách hàng và người dùng trên mọi điểm chạm của tổ chức.",
  definitionMore:
    "Vai trò này kết nối các bộ phận vốn hoạt động riêng rẽ (sản phẩm, thiết kế, marketing, bán hàng, chăm sóc khách hàng) quanh một cách hiểu chung về trải nghiệm. CXO cũng đưa tiếng nói của người dùng vào các quyết định chiến lược ở cấp cao nhất.",
  oneLine: "Lãnh đạo cấp cao chịu trách nhiệm về trải nghiệm khách hàng và người dùng trên mọi điểm chạm.",
  glance: [
    ["C-level", "Cấp điều hành"],
    ["6", "Đòn bẩy tạo tác động"],
  ],
  facts: [
    { label: "Viết tắt", items: ["CXO — Chief Experience Officer"] },
    { label: "Nhóm chính", items: ["Quy trình và vận hành"] },
    { label: "Thẻ phụ", items: ["Nền tảng và nguyên tắc"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "“CXO” cũng hay được dùng như cách gọi chung cho mọi chức danh cấp C. Chức danh gần nghĩa: Chief Customer Officer (CCO), Chief Design Officer (CDO); phạm vi khác nhau tùy tổ chức.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
