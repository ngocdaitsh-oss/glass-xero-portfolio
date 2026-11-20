"use client";

import { Blk, T } from "./edit";
import { CheckCards, InfoGrid, InOutCards, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, Node, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Customer Experience — copy from ux-glossary/customer-experience.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "mechanism", title: "Cơ chế: CX hình thành như thế nào", icon: "component" },
  { id: "practice", title: "Biểu hiện trong thực tế: ví dụ tốt và chưa tốt", icon: "eye" },
  { id: "when", title: "Khi nào cần nhìn theo góc độ CX", icon: "check-circle" },
  { id: "limits", title: "Giới hạn: khi nào “CX” chưa đủ", icon: "shield-alert" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "evaluate", title: "Cách đánh giá CX", icon: "clipboard-check" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** Journey line in three stages: touchpoints the brand owns above, partner / customer / social ones below. */
function JourneyLine() {
  const stages: [string, string[], string[]][] = [
    ["Trước khi mua", ["Website"], ["Đánh giá trên mạng"]],
    ["Mua", ["Email xác nhận"], ["Cổng thanh toán"]],
    ["Sau khi mua", ["Nhân viên tư vấn", "Email theo dõi"], ["Lời kể của bạn bè", "Đánh giá của khách"]],
  ];
  const chip = (t: string, owned: boolean) => (
    <span key={t} className={`rounded-xl px-3.5 py-2 ${owned ? "bg-[var(--d-soft)] text-[var(--d-accent-strong)]" : "bg-[var(--d-well)]"}`}>
      <T className="text-[15px] leading-[22px] font-semibold">{t}</T>
    </span>
  );
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="split" size={36} iconSize={18} radius={10} />
        <Eyebrow>Điểm chạm dọc hành trình</Eyebrow>
      </div>
      <div className="flex items-stretch gap-4">
        <div className="flex w-[150px] shrink-0 flex-col justify-between py-1 font-mono text-[13px] leading-[18px] tracking-[0.4px] text-[var(--w-muted)] uppercase">
          <span>Tổ chức kiểm soát</span>
          <span>Giai đoạn</span>
          <span>Đối tác · khách · xã hội</span>
        </div>
        {stages.map(([stage, top, bottom]) => (
          <div key={stage} className="flex flex-1 flex-col gap-3">
            <div className="flex min-h-[44px] flex-wrap gap-2">{top.map((t) => chip(t, true))}</div>
            <span className="rounded-xl bg-[var(--d-fill)] px-4 py-2.5 text-center text-white">
              <T className="text-[16px] leading-6 font-semibold">{stage}</T>
            </span>
            <div className="flex min-h-[44px] flex-wrap gap-2">{bottom.map((t) => chip(t, false))}</div>
          </div>
        ))}
        <div className="flex items-center gap-3">
          <span aria-hidden className="text-[24px] text-[var(--w-muted)]">
            →
          </span>
          <Node on title="Cảm nhận tổng thể" className="w-[150px]" />
        </div>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Phía trên đường là các điểm chạm tổ chức kiểm soát; phía dưới là điểm chạm của đối tác, của khách và của xã hội. Cảm nhận tổng thể là kết quả tích lũy của tất cả điểm chạm,
        không chỉ phần phía trên.
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
            Một ứng dụng có thể được thiết kế rất tốt, nhưng nếu hóa đơn sai, tổng đài khó gọi, hay chính sách đổi trả rắc rối, khách vẫn rời đi. Tối ưu từng điểm chạm riêng lẻ
            không đảm bảo trải nghiệm tổng thể tốt, vì vấn đề thường nằm ở chỗ chuyển tiếp giữa các kênh và các bộ phận.
          </P>
          <P strong>
            Góc nhìn CX đặt câu hỏi: khách hàng trải qua điều gì từ đầu đến cuối, và tổ chức có đáp ứng lời hứa của mình ở mọi bước không?
          </P>
        </div>
        <Eyebrow>Hiểu CX hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          minH={170}
          items={[
            ["target", "Ưu tiên đầu tư", "Vào điểm chạm có ảnh hưởng lớn nhất đến giữ chân và giới thiệu."],
            ["users", "Phối hợp giữa các bộ phận", "Quanh hành trình của khách."],
            ["gauge", "Chọn chỉ số", "Phản ánh trải nghiệm tổng thể, không chỉ hiệu suất từng bộ phận."],
            ["split", "Thiết kế dịch vụ", "Liền mạch giữa kênh số và kênh trực tiếp."],
          ]}
        />
      </Section>

      <Section {...S.mechanism} intro="Lemon & Verhoef (2016) mô tả trải nghiệm khách hàng diễn ra qua ba giai đoạn và nhiều loại điểm chạm:">
        <Table
          head={["Giai đoạn", "Ý nghĩa", "Ví dụ (tình huống dịch vụ tư vấn)"]}
          widths={[300]}
          rows={[
            { icon: "binoculars", cells: ["Trước khi mua (pre-purchase)", "Nhận biết nhu cầu, tìm hiểu, cân nhắc.", "Tìm kiếm, đọc đánh giá, xem trang dịch vụ."] },
            { icon: "check-circle", cells: ["Mua (purchase)", "Chọn, đặt, thanh toán.", "Đặt lịch, nhận xác nhận."] },
            { icon: "rotate", cells: ["Sau khi mua (post-purchase)", "Sử dụng, hỗ trợ, quay lại hoặc rời đi.", "Buổi tư vấn, theo dõi sau tư vấn, đổi lịch, đánh giá."] },
          ]}
        />
        <Table
          head={["Loại điểm chạm", "Ai kiểm soát", "Ví dụ"]}
          widths={[300]}
          rows={[
            { icon: "component", highlight: true, cells: ["Do thương hiệu sở hữu", "Tổ chức.", "Website, ứng dụng, email, nhân viên."] },
            { icon: "link", cells: ["Do đối tác sở hữu", "Đối tác của tổ chức.", "Nền tảng thanh toán, đơn vị giao hàng."] },
            { icon: "users", cells: ["Do khách hàng sở hữu", "Khách hàng.", "Cách khách tự chuẩn bị, thói quen của họ."] },
            { icon: "chat", cells: ["Xã hội, bên ngoài", "Người khác, môi trường.", "Lời giới thiệu của bạn bè, đánh giá trên mạng."] },
          ]}
        />
        <JourneyLine />
        <Callout tone="note" icon="target" title="Kỳ vọng và lời hứa">
          Cảm nhận của khách hình thành khi so sánh điều họ trải qua với điều họ kỳ vọng. Kỳ vọng đến từ lời hứa của tổ chức (quảng cáo, trang web), từ kinh nghiệm trước đó, và từ
          những trải nghiệm tốt nhất họ từng có ở nơi khác.
        </Callout>
      </Section>

      <Section {...S.practice}>
        <PairCards
          icon={null}
          first="Chưa tốt"
          second="Tốt hơn"
          items={[
            [
              "Chuyển kênh — liền mạch giữa các điểm chạm",
              "Khách đặt lịch online, khi gọi tổng đài phải đọc lại toàn bộ thông tin.",
              "Nhân viên thấy ngay lịch hẹn và thông tin khách đã nhập.",
            ],
            ["Lời hứa — kỳ vọng được đáp ứng", "Quảng cáo “đặt lịch trong 1 phút”, thực tế phải chờ gọi lại xác nhận.", "Lời hứa khớp với trải nghiệm thật."],
            ["Khi có sự cố — giảm nỗ lực của khách", "Đổi lịch phải gọi giờ hành chính.", "Đổi lịch tự phục vụ, có thông báo rõ."],
            ["Sau khi mua — không dừng ở lúc giao dịch", "Không liên lạc gì sau buổi tư vấn.", "Gửi tóm tắt và bước tiếp theo."],
            ["Phản hồi — vòng phản hồi được đóng", "Thu khảo sát nhưng không hành động.", "Khách thấy góp ý được ghi nhận và có thay đổi."],
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
                "Tổ chức có nhiều kênh (online, tổng đài, cửa hàng, đối tác).",
                "Vấn đề của khách nằm ở chỗ giao giữa các bộ phận.",
                "Giữ chân và giới thiệu khách hàng là mục tiêu kinh doanh quan trọng.",
                "Đang thiết kế hoặc cải tổ một dịch vụ, không chỉ một màn hình.",
              ],
            ],
            [
              "eye",
              "Dấu hiệu nhận biết",
              [
                "Từng bộ phận báo cáo chỉ số tốt, nhưng khách vẫn phàn nàn.",
                "Khách phải lặp lại thông tin khi chuyển kênh.",
                "Không ai trả lời được khách trải qua những bước nào từ đầu đến cuối.",
              ],
            ],
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["eye", "Góc nhìn rộng có thể làm mất chi tiết", "Vấn đề khả năng sử dụng của một màn hình cụ thể vẫn cần nghiên cứu UX chi tiết."],
            ["link", "Không phải mọi điểm chạm đều kiểm soát được", "Tổ chức chỉ có thể tác động gián tiếp lên đánh giá của người khác hay trải nghiệm với đối tác."],
            ["gauge", "Một chỉ số không đại diện cho CX", "NPS hay CSAT chỉ phản ánh một khía cạnh."],
            ["users", "CX cần thay đổi tổ chức", "Bản đồ và báo cáo không đủ nếu các bộ phận không thay đổi cách làm việc."],
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định nhóm khách hàng và hành trình chính.", "Chọn những hành trình quan trọng nhất để bắt đầu.", "Danh sách hành trình ưu tiên."],
            ["Lập bản đồ hành trình từ góc nhìn khách.", "Dựa trên nghiên cứu: phỏng vấn, contextual inquiry, dữ liệu hỗ trợ, analytics.", "Customer journey map."],
            [
              "Xác định điểm chạm quan trọng và điểm đứt gãy.",
              "Nơi kỳ vọng không được đáp ứng, nơi khách phải nỗ lực nhiều, nơi chuyển giao giữa bộ phận.",
              "Danh sách vấn đề ưu tiên.",
            ],
            ["Gán chủ sở hữu.", "Mỗi giai đoạn và vấn đề có người hoặc bộ phận chịu trách nhiệm.", "Ma trận trách nhiệm."],
            ["Chọn bộ chỉ số.", "Kết hợp chỉ số cảm nhận (NPS, CES, CSAT), hành vi (giữ chân, liên hệ lại) và kinh doanh.", "Bộ chỉ số CX."],
            ["Cải tiến và đóng vòng phản hồi.", "Đưa vấn đề vào kế hoạch cải tiến và cho khách thấy thay đổi.", "Kế hoạch cải tiến, theo dõi định kỳ."],
          ]}
        />
      </Section>

      <Section {...S.evaluate}>
        <Table
          head={["Cách đánh giá", "Phản ánh", "Lưu ý"]}
          widths={[300]}
          rows={[
            { icon: "users", cells: ["NPS", "Mức sẵn lòng giới thiệu, quan hệ tổng thể.", "Không chỉ ra điểm chạm cụ thể."] },
            { icon: "gauge", cells: ["CES", "Nỗ lực tại một tương tác.", "Gắn với điểm chạm; cần ghi rõ phiên bản."] },
            { icon: "check-circle", cells: ["CSAT", "Mức hài lòng tại một tương tác hoặc tổng thể.", "Câu hỏi khác nhau giữa các tổ chức."] },
            { icon: "analytics", cells: ["Chỉ số hành vi", "Giữ chân, mua lại, tỷ lệ liên hệ lại, khiếu nại.", "Phản ánh hệ quả; không giải thích nguyên nhân."] },
            { icon: "chat", cells: ["Nghiên cứu định tính", "Lý do, cảm xúc, bối cảnh.", "Cần để hiểu số liệu."] },
            { icon: "list-search", cells: ["Voice of the Customer", "Tổng hợp phản hồi từ nhiều nguồn.", "Cần quy trình xử lý và hành động."] },
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={[
            "Nhóm khách hàng và hành trình ưu tiên.",
            "Dữ liệu từ nghiên cứu, hỗ trợ khách hàng, analytics, khảo sát.",
            "Danh sách bộ phận tham gia vào hành trình.",
          ]}
          outputs={["Customer journey map và danh sách điểm đứt gãy.", "Bộ chỉ số CX có chủ sở hữu.", "Kế hoạch cải tiến xuyên phòng ban."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard icon="gauge" title="Bối cảnh" body="Luồng đặt lịch online được đánh giá dễ dùng, nhưng NPS của dịch vụ thấp." />
        <Subhead icon="split">Nhìn theo hành trình</Subhead>
        <div className="flex gap-4">
          <InfoCard title="Trước khi mua" body="Trang dịch vụ hứa “tư vấn cá nhân hóa”." className="flex-1" />
          <InfoCard title="Mua" body="Đặt lịch online dễ dàng (CES cao)." className="flex-1" />
          <InfoCard
            tone="ink"
            title="Sau khi mua"
            body="Tư vấn viên không biết khách đã nhập nhu cầu gì trong form; buổi tư vấn bắt đầu bằng việc hỏi lại từ đầu; sau buổi không có tóm tắt."
            className="flex-1"
          />
        </div>
        <Callout tone="scenario" icon="lightbulb" title="Nhận định">
          Vấn đề không nằm ở giao diện đặt lịch, mà ở chỗ chuyển giao thông tin giữa kênh online và tư vấn viên, và ở giai đoạn sau khi mua.
        </Callout>
        <InfoCard
          icon="check-circle"
          tone="fill"
          title="Hành động"
          body="Chuyển thông tin form sang hệ thống của tư vấn viên; gửi tóm tắt sau buổi; theo dõi CES sau buổi tư vấn cạnh NPS."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Coi CX là việc của bộ phận chăm sóc khách hàng", "CX hình thành ở mọi điểm chạm.", "Gán trách nhiệm theo hành trình, xuyên phòng ban."],
            ["Dùng UX và CX như từ đồng nghĩa", "Bỏ sót phần trải nghiệm ngoài sản phẩm.", "Phân biệt rõ phạm vi khi đặt mục tiêu."],
            ["Chỉ theo dõi một chỉ số (thường là NPS)", "Không biết điểm chạm nào cần sửa.", "Dùng bộ chỉ số gồm cảm nhận, hành vi và kinh doanh."],
            ["Bản đồ hành trình dựa trên giả định nội bộ", "Phản ánh quy trình tổ chức, không phải trải nghiệm khách.", "Dựa trên nghiên cứu với khách thật."],
            ["Lời hứa marketing vượt xa trải nghiệm thật", "Kỳ vọng cao làm cảm nhận tệ hơn.", "Đồng bộ lời hứa với khả năng thực tế."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Trọng tâm", "Phạm vi"]}
          widths={[320]}
          rows={[
            { icon: "users", highlight: true, cells: ["Customer Experience (CX)", "Cảm nhận tổng thể về tổ chức.", "Mọi kênh, mọi điểm chạm, toàn bộ hành trình."] },
            { icon: "component", cells: ["User Experience (UX)", "Trải nghiệm khi dùng một sản phẩm hoặc dịch vụ cụ thể.", "Thường là sản phẩm số; là một phần của CX."] },
            { icon: "split", cells: ["Service Design", "Phương pháp thiết kế dịch vụ, gồm cả phần hậu trường.", "Cách để cải thiện CX một cách có hệ thống."] },
            { icon: "rotate", cells: ["Customer Journey", "Chuỗi giai đoạn và điểm chạm khách trải qua.", "Cách mô tả và phân tích CX."] },
            { icon: "lightbulb", cells: ["Brand Experience", "Cảm nhận về thương hiệu.", "Gần với CX nhưng nhấn mạnh hình ảnh, giá trị thương hiệu."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <ChecklistColumn
          icon="clipboard-check"
          title="Rà soát CX"
          items={[
            "Đã xác định hành trình chính của khách từ trước khi mua đến sau khi mua.",
            "Bản đồ hành trình dựa trên nghiên cứu với khách thật.",
            "Đã xác định điểm chuyển giao giữa các kênh và bộ phận.",
            "Mỗi giai đoạn có chủ sở hữu rõ ràng.",
            "Bộ chỉ số gồm cảm nhận, hành vi và kinh doanh.",
            "Lời hứa với khách khớp với trải nghiệm thật.",
            "Phản hồi của khách được biến thành hành động.",
          ]}
        />
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["User Experience (UX)", "Trải nghiệm người dùng", "Một phần của trải nghiệm khách hàng."],
            ["Customer Journey", "Hành trình khách hàng", "Cách mô tả CX theo giai đoạn và điểm chạm."],
            ["Customer Effort Score (CES)", "Điểm nỗ lực khách hàng", "Đo một khía cạnh của CX tại từng tương tác."],
            ["Customer Feedback Loop", "Vòng phản hồi khách hàng", "Biến phản hồi thành cải tiến CX."],
            ["CXO", "Giám đốc trải nghiệm", "Vai trò sở hữu CX ở cấp tổ chức."],
            ["Net Promoter Score (NPS)", "Chỉ số khách hàng giới thiệu", "Chỉ số quan hệ tổng thể."],
            ["Service Design", "Thiết kế dịch vụ", "Phương pháp cải thiện CX có hệ thống."],
            ["Voice of the Customer (VoC)", "Tiếng nói khách hàng", "Tổng hợp phản hồi để hiểu CX."],
          ]}
        />
      </Section>
    </div>
  );
}

export const CUSTOMER_EXPERIENCE: Article = {
  slug: "customer-experience",
  version: 1,
  term: "Customer Experience",
  fn: 7,
  vi: "Trải nghiệm khách hàng",
  kind: "Nguyên tắc / khái niệm",
  definition:
    "Customer experience (CX) là tổng thể nhận thức và cảm nhận của khách hàng về một tổ chức, hình thành qua mọi tương tác trực tiếp và gián tiếp với tổ chức đó trong suốt hành trình.",
  definitionMore:
    "Hành trình này bắt đầu từ khi khách tìm hiểu, kéo qua lúc mua và sử dụng, đến khi cần hỗ trợ và cả khi họ rời đi. CX gồm cả những điểm chạm tổ chức không trực tiếp kiểm soát, như lời giới thiệu của người khác hay đánh giá trên mạng. Khách hàng không nhìn thấy sơ đồ tổ chức; họ cảm nhận một trải nghiệm liền mạch, hoặc đứt gãy.",
  oneLine: "Tổng thể cảm nhận của khách hàng về tổ chức qua mọi tương tác, mọi kênh, trong suốt hành trình.",
  glance: [
    ["CX", "Viết tắt"],
    ["3", "Giai đoạn: trước, trong, sau khi mua"],
  ],
  facts: [
    { label: "Viết tắt", items: ["CX"] },
    { label: "Nhóm chính", items: ["Nền tảng và nguyên tắc"] },
    { label: "Thẻ phụ", items: ["Đo lường và phân tích", "Quy trình và vận hành"] },
    {
      label: "Lưu ý tên gọi",
      items: ["Hay bị dùng lẫn với User Experience (UX). CX bao trùm mọi tương tác qua mọi kênh và theo thời gian; UX thường chỉ trải nghiệm khi dùng một sản phẩm cụ thể."],
    },
  ],
  sections: SECTIONS,
  Body,
};
