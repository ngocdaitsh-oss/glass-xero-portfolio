"use client";

import { Blk, T } from "./edit";
import { CheckCards, InfoGrid, InOutCards, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Arrow, Callout, ChecklistColumn, Eyebrow, InfoCard, Node, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Customer Feedback Loop — copy from ux-glossary/customer-feedback-loop.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "loops", title: "Các bước và hai vòng phản hồi", icon: "rotate" },
  { id: "roles", title: "Vai trò tham gia", icon: "users" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "evaluate", title: "Cách đánh giá vòng phản hồi", icon: "clipboard-check" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** Two nested loops sharing one feedback source: the fast inner loop per customer inside the slower outer loop. */
function Loops() {
  const row = (steps: string[], on?: boolean, soft?: boolean) => (
    <div className="flex items-center gap-2">
      {steps.map((s, i) => (
        <span key={s} className="flex items-center gap-2">
          {i ? <Arrow size={20} /> : null}
          <Node title={s} on={on} soft={soft} />
        </span>
      ))}
    </div>
  );
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="rotate" size={36} iconSize={18} radius={10} />
        <Eyebrow>Hai vòng lồng nhau</Eyebrow>
      </div>
      <div className="flex items-center gap-4">
        <Node title="Phản hồi" sub="nguồn chung" soft className="w-[140px]" />
        <Arrow />
        <div className="flex flex-1 flex-col gap-5 rounded-[24px] bg-[var(--d-well)] p-6">
          <div className="flex items-center justify-between gap-4">
            <Eyebrow size={14} className="text-[var(--d-accent)]">
              Vòng ngoài · hệ thống
            </Eyebrow>
            {row(["Tổng hợp", "Nguyên nhân gốc", "Sửa", "Đo lại"], false, true)}
          </div>
          <div className="flex items-center justify-between gap-4 rounded-[18px] bg-[var(--w-card)] p-5">
            <Eyebrow size={14} className="text-[var(--d-accent)]">
              Vòng trong · từng khách
            </Eyebrow>
            {row(["Liên hệ lại", "Xử lý", "Báo kết quả"], true)}
          </div>
          <T className="text-center text-[15px] leading-[22px] font-semibold text-[var(--d-accent)]">Thông báo thay đổi cho khách</T>
        </div>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Vòng trong nhỏ, nhanh: phản hồi của một khách → nhân viên tuyến đầu liên hệ lại và xử lý → khách được báo kết quả. Vòng ngoài lớn, chậm hơn: nhiều phản hồi được tổng hợp
        → tìm nguyên nhân gốc → đội sản phẩm hoặc quy trình sửa → đo lại → thông báo thay đổi cho khách. Cả hai vòng dùng chung nguồn dữ liệu phản hồi.
      </T>
    </Blk>
  );
}

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Section {...S.problem}>
        <P>
          Nhiều tổ chức thu rất nhiều phản hồi: khảo sát sau giao dịch, đánh giá, tin nhắn hỗ trợ, bình luận trên mạng. Nhưng phản hồi thường nằm rải rác ở nhiều hệ thống, không ai
          chịu trách nhiệm xử lý, và khách không bao giờ biết chuyện gì xảy ra sau khi họ góp ý. Kết quả là tổ chức bỏ lỡ cơ hội cải thiện, còn khách dần ngừng phản hồi vì thấy
          không có tác dụng.
        </P>
        <Eyebrow>Vòng phản hồi khách hàng hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          minH={170}
          items={[
            ["chat", "Khách nào cần được liên hệ lại ngay", "Vòng trong."],
            ["rotate", "Vấn đề nào lặp lại đủ nhiều", "Để sửa ở cấp hệ thống (vòng ngoài)."],
            ["bar-chart", "Ưu tiên cải tiến", "Dựa trên tần suất và mức ảnh hưởng."],
            ["check-circle", "Thay đổi đã có hiệu quả chưa", "Dựa trên phản hồi ở vòng sau."],
          ]}
        />
      </Section>

      <Section {...S.loops}>
        <Table
          head={["Bước", "Hoạt động", "Đầu ra"]}
          widths={[300]}
          rows={[
            { icon: "clipboard-check", cells: ["1. Thu thập", "Khảo sát (CES, NPS, CSAT), câu hỏi mở, hỗ trợ khách hàng, đánh giá, phỏng vấn.", "Phản hồi từ nhiều nguồn."] },
            { icon: "list", cells: ["2. Tổng hợp và phân loại", "Gom về một nơi; gắn nhãn chủ đề, điểm chạm, mức nghiêm trọng.", "Dữ liệu phản hồi có cấu trúc."] },
            { icon: "binoculars", cells: ["3. Phân tích", "Tìm vấn đề lặp lại, nguyên nhân gốc, nhóm khách bị ảnh hưởng.", "Danh sách vấn đề ưu tiên."] },
            {
              icon: "play-circle",
              highlight: true,
              cells: ["4. Hành động", "Vòng trong: liên hệ lại khách cụ thể. Vòng ngoài: sửa quy trình, sản phẩm, chính sách.", "Phản hồi cá nhân; thay đổi hệ thống."],
            },
            { icon: "chat", cells: ["5. Báo lại", "Cho khách biết góp ý đã được ghi nhận và đã thay đổi gì.", "Thông báo, ghi chú phát hành, phản hồi trực tiếp."] },
            { icon: "analytics", cells: ["6. Đo lại", "Theo dõi chỉ số và phản hồi sau thay đổi.", "Bằng chứng hiệu quả; vòng tiếp theo."] },
          ]}
        />
        <Loops />
        <Table
          head={["", "Vòng trong (inner loop)", "Vòng ngoài (outer loop)"]}
          widths={[220]}
          rows={[
            { cells: ["Phạm vi", "Một khách, một trường hợp.", "Nhiều khách, vấn đề lặp lại."] },
            { cells: ["Ai làm", "Nhân viên tuyến đầu, quản lý trực tiếp.", "Đội sản phẩm, quy trình, lãnh đạo."] },
            { cells: ["Tốc độ", "Nhanh (thường trong vài ngày).", "Chậm hơn (theo chu kỳ cải tiến)."] },
            { cells: ["Ví dụ", "Gọi lại khách báo đổi lịch khó khăn, đổi lịch giúp họ.", "Xây tính năng đổi lịch tự phục vụ."] },
          ]}
        />
      </Section>

      <Section {...S.roles}>
        <Table
          head={["Vai trò", "Trách nhiệm trong vòng"]}
          widths={[380]}
          rows={[
            { icon: "chat", cells: ["Nhân viên tuyến đầu", "Liên hệ lại khách, xử lý trường hợp cụ thể, ghi nhận nguyên nhân."] },
            { icon: "analytics", cells: ["Researcher / CX analyst", "Tổng hợp, phân loại, phân tích xu hướng, đề xuất ưu tiên."] },
            { icon: "component", cells: ["Product / UX team", "Thiết kế và thực hiện thay đổi hệ thống."] },
            { icon: "target", cells: ["Lãnh đạo", "Ưu tiên nguồn lực cho vấn đề hệ thống; theo dõi định kỳ."] },
            { icon: "rotate", highlight: true, cells: ["Chủ sở hữu vòng phản hồi", "Đảm bảo không bước nào bị bỏ qua."] },
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
                "Tổ chức đã thu phản hồi nhưng ít khi hành động dựa trên đó.",
                "Sản phẩm, dịch vụ thay đổi liên tục và cần học từ khách.",
                "Đã có chỉ số như CES, NPS và muốn biến chúng thành cải tiến.",
              ],
            ],
            [
              "eye",
              "Dấu hiệu nhận biết",
              ["Phản hồi nằm rải rác, không ai đọc hết.", "Tỷ lệ khách trả lời khảo sát giảm dần.", "Cùng một lời phàn nàn xuất hiện lặp lại nhiều tháng."],
            ],
            [
              "clipboard-check",
              "Điều kiện cần",
              ["Có chủ sở hữu và quy trình rõ ràng.", "Được phép liên hệ lại khách theo quy định về dữ liệu cá nhân.", "Có nguồn lực để hành động, không chỉ để thu thập."],
            ],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[340]}
          rows={[
            { icon: "users", cells: ["Không có nguồn lực để hành động", "Thu phản hồi mà không xử lý làm giảm niềm tin của khách.", "Thu ít hơn, tập trung vào điểm chạm có thể cải thiện."] },
            {
              icon: "binoculars",
              cells: ["Cần khám phá nhu cầu mới chưa ai nói ra", "Phản hồi chủ yếu phản ánh vấn đề với trải nghiệm hiện tại.", "Nghiên cứu khám phá: contextual inquiry, phỏng vấn."],
            },
            { icon: "split", cells: ["Cần chứng minh một thay đổi gây ra cải thiện", "Vòng phản hồi cho tín hiệu, không phải thử nghiệm có kiểm soát.", "A/B testing."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định nguồn phản hồi và điểm chạm.", "Liệt kê nơi khách đang góp ý và điểm chạm mỗi nguồn phản ánh.", "Danh sách nguồn (khảo sát, hỗ trợ, đánh giá) và điểm chạm tương ứng."],
            ["Gom về một nơi và phân loại thống nhất.", "Thống nhất bộ nhãn chủ đề và mức nghiêm trọng.", "Kho phản hồi có cấu trúc."],
            [
              "Thiết lập vòng trong.",
              "Quy tắc khi nào liên hệ lại (ví dụ khách báo nỗ lực cao, điểm thấp kèm bình luận), ai liên hệ, trong bao lâu.",
              "Quy trình liên hệ lại.",
            ],
            ["Thiết lập vòng ngoài.", "Họp định kỳ xem xu hướng; đưa vấn đề hệ thống vào danh sách ưu tiên của đội sản phẩm.", "Danh sách cải tiến có chủ sở hữu."],
            ["Báo lại cho khách.", "Phản hồi cá nhân cho vòng trong; thông báo thay đổi cho vòng ngoài.", "Thông điệp “Bạn góp ý, chúng tôi đã thay đổi”."],
            ["Đo lại và điều chỉnh quy trình.", "So sánh chỉ số trước và sau, rút kinh nghiệm cho cách vận hành vòng.", "Chỉ số trước và sau, bài học cho chu kỳ sau."],
          ]}
        />
      </Section>

      <Section {...S.evaluate}>
        <Table
          head={["Câu hỏi đánh giá", "Dấu hiệu vòng hoạt động tốt"]}
          widths={[520]}
          rows={[
            { icon: "list", cells: ["Phản hồi có được đọc và phân loại hết không?", "Có quy trình và người chịu trách nhiệm; không còn phản hồi tồn đọng lâu."] },
            { icon: "chat", cells: ["Khách cần liên hệ lại có được liên hệ kịp thời không?", "Có quy tắc và thời hạn; được theo dõi."] },
            { icon: "rotate", cells: ["Vấn đề lặp lại có được sửa ở cấp hệ thống không?", "Có danh sách cải tiến từ phản hồi, có trạng thái."] },
            { icon: "users", cells: ["Khách có biết góp ý của họ dẫn tới thay đổi gì không?", "Có thông báo thay đổi; khách nhắc tới điều này trong phản hồi sau."] },
            { icon: "analytics", cells: ["Thay đổi có cải thiện trải nghiệm không?", "Chỉ số liên quan (CES, số lần liên hệ lại) được theo dõi trước và sau."] },
          ]}
        />
        <Callout tone="note">
          Tổ chức có thể tự đặt chỉ số vận hành cho vòng phản hồi, ví dụ tỷ lệ trường hợp được liên hệ lại đúng hạn. Ghi rõ định nghĩa và giữ nguyên qua các kỳ.
        </Callout>
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Nguồn phản hồi và công cụ thu thập.", "Bộ nhãn phân loại.", "Quy tắc liên hệ lại; quy định về dữ liệu cá nhân.", "Chủ sở hữu cho từng bước."]}
          outputs={[
            "Kho phản hồi có cấu trúc.",
            "Trường hợp cá nhân được xử lý (vòng trong).",
            "Cải tiến hệ thống có chủ sở hữu (vòng ngoài).",
            "Thông báo thay đổi cho khách; chỉ số trước và sau.",
          ]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard icon="clipboard-check" title="Bối cảnh" body="Sau mỗi lần đặt lịch và đổi lịch, khách nhận câu hỏi CES kèm câu hỏi mở." />
        <Subhead icon="rotate">Hai vòng trong tình huống</Subhead>
        <div className="flex gap-4">
          <InfoCard
            tone="fill"
            title="Vòng trong"
            className="flex-1"
            body="Khách chọn mức 1–3 (khó khăn) và để lại bình luận được nhân viên chăm sóc liên hệ lại trong vòng một ngày làm việc. Ví dụ, một khách viết “Không tìm thấy chỗ đổi lịch”. Nhân viên gọi lại, đổi lịch giúp khách, và ghi nhận nguyên nhân là “không tìm thấy tính năng”."
          />
          <InfoCard
            tone="ink"
            title="Vòng ngoài"
            className="flex-1"
            body="Họp hằng tháng cho thấy nhãn “không tìm thấy tính năng đổi lịch” xuất hiện nhiều nhất. Đội sản phẩm đưa nút “Đổi lịch” vào email xác nhận và trang “Lịch hẹn của tôi” (dựa trên kết quả card sorting)."
          />
        </div>
        <InfoCard
          icon="chat"
          title="Báo lại và đo lại"
          body="Email gửi khách: “Từ nay bạn có thể đổi lịch ngay trong email xác nhận.” Nhóm theo dõi CES của tác vụ đổi lịch và số cuộc gọi về đổi lịch trong các tháng tiếp theo."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Thu phản hồi mà không hành động", "Khách mất niềm tin, ngừng phản hồi.", "Chỉ thu khi có quy trình xử lý."],
            ["Chỉ có vòng trong", "Xử lý từng khách nhưng vấn đề gốc vẫn lặp lại.", "Tổng hợp định kỳ để sửa ở cấp hệ thống."],
            ["Chỉ có vòng ngoài", "Khách gặp vấn đề nghiêm trọng không được hỗ trợ kịp thời.", "Có quy tắc liên hệ lại cho trường hợp cá nhân."],
            ["Không báo lại cho khách", "Khách không biết góp ý có tác dụng.", "Thông báo thay đổi, cảm ơn cụ thể."],
            ["Ưu tiên theo người phàn nàn to nhất", "Phản hồi không đại diện cho mọi khách.", "Ưu tiên theo tần suất, mức ảnh hưởng, đối chiếu với dữ liệu hành vi."],
            ["Phân loại không thống nhất", "Không thấy được xu hướng.", "Một bộ nhãn chung, có hướng dẫn."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Trọng tâm", "Quan hệ với vòng phản hồi"]}
          widths={[320]}
          rows={[
            { icon: "rotate", highlight: true, cells: ["Customer Feedback Loop", "Quy trình từ phản hồi đến hành động và báo lại.", "—"] },
            {
              icon: "chat",
              cells: ["Voice of the Customer (VoC)", "Chương trình thu thập và tổng hợp tiếng nói khách hàng.", "VoC là nguồn đầu vào; vòng phản hồi đảm bảo có hành động."],
            },
            { icon: "gauge", cells: ["CES / NPS / CSAT", "Chỉ số đo cảm nhận.", "Nguồn tín hiệu cho vòng phản hồi."] },
            {
              icon: "flask",
              cells: [
                "Build–Measure–Learn (Lean)",
                "Vòng lặp học hỏi khi phát triển sản phẩm.",
                "Cùng tinh thần lặp lại; vòng phản hồi khách hàng tập trung vào phản hồi từ khách hiện tại.",
              ],
            },
            { icon: "book", cells: ["Research Operations", "Vận hành hoạt động nghiên cứu.", "Cung cấp công cụ, quy trình lưu trữ và chia sẻ nhận định."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <ChecklistColumn
          icon="clipboard-check"
          title="Rà soát vòng phản hồi"
          items={[
            "Mọi nguồn phản hồi được gom về một nơi.",
            "Có bộ nhãn phân loại thống nhất.",
            "Có quy tắc và thời hạn liên hệ lại khách (vòng trong).",
            "Có họp định kỳ để xử lý vấn đề lặp lại (vòng ngoài).",
            "Mỗi cải tiến có chủ sở hữu và trạng thái.",
            "Khách được báo lại về thay đổi.",
            "Chỉ số được theo dõi trước và sau thay đổi.",
            "Việc liên hệ lại tuân thủ quy định về dữ liệu cá nhân.",
          ]}
        />
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Customer Effort Score (CES)", "Điểm nỗ lực khách hàng", "Tín hiệu đầu vào cho vòng phản hồi."],
            ["Net Promoter Score (NPS)", "Chỉ số khách hàng giới thiệu", "Tín hiệu đầu vào; gắn với khái niệm vòng trong và vòng ngoài."],
            ["Voice of the Customer (VoC)", "Tiếng nói khách hàng", "Chương trình thu thập phản hồi."],
            ["Customer Experience", "Trải nghiệm khách hàng", "Mục tiêu mà vòng phản hồi cải thiện."],
            ["CXO", "Giám đốc trải nghiệm", "Vai trò thường sở hữu vòng phản hồi ở cấp tổ chức."],
            ["Affinity Diagram", "Sơ đồ tương đồng", "Cách tổng hợp phản hồi dạng văn bản."],
            ["Sentiment Analysis", "Phân tích cảm xúc", "Hỗ trợ phân loại phản hồi số lượng lớn."],
          ]}
        />
      </Section>
    </div>
  );
}

export const CUSTOMER_FEEDBACK_LOOP: Article = {
  slug: "customer-feedback-loop",
  version: 1,
  term: "Customer Feedback Loop",
  fn: 7,
  vi: "Vòng phản hồi khách hàng",
  kind: "Quy trình / cách tiếp cận",
  definition:
    "Customer feedback loop là quy trình lặp lại: thu thập phản hồi của khách hàng, phân tích để hiểu vấn đề, hành động để cải thiện, rồi thông báo lại cho khách và đo xem thay đổi có hiệu quả không.",
  definitionMore:
    "Điểm khác biệt của “vòng” là phản hồi không dừng ở báo cáo. Phản hồi phải dẫn tới hành động, và khách thấy góp ý của họ có tác dụng. Khi vòng bị đứt ở bất kỳ bước nào, khảo sát chỉ còn là việc thu số liệu.",
  oneLine: "Quy trình thu phản hồi, phân tích, hành động và báo lại cho khách, lặp lại liên tục.",
  glance: [
    ["2", "Vòng: trong và ngoài"],
    ["6", "Bước từ thu thập đến đo lại"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Closed-loop feedback", "Đóng vòng phản hồi (closing the loop)"] },
    { label: "Nhóm chính", items: ["Quy trình và vận hành"] },
    { label: "Thẻ phụ", items: ["Đo lường và phân tích", "Nghiên cứu khám phá"] },
    {
      label: "Lưu ý tên gọi",
      items: ["Reichheld & Markey phân biệt vòng trong (xử lý với từng khách) và vòng ngoài (sửa nguyên nhân gốc mang tính hệ thống). Một vòng đầy đủ cần cả hai."],
    },
  ],
  sections: SECTIONS,
  Body,
};
