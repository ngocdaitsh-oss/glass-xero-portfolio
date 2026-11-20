"use client";

import { Blk, T } from "./edit";
import { CheckCards, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Remote Testing — copy from ux-glossary/remote-testing.md on the Glossary Detail layout (Figma 2011:28710).
   The md merges Remote Testing and Remote User Testing, so both glossary entries share this article. */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "forms", title: "Hai dạng remote test", icon: "split" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các phương pháp gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** Location and moderation are separate axes: "remote" says nothing about whether someone moderates. */
function Matrix() {
  const cell = (title: string, body: string, on: boolean) => (
    <div className={`flex flex-col gap-2 rounded-2xl p-6 ${on ? "bg-[var(--d-fill)] text-white" : "bg-[var(--d-well)]"}`}>
      <span className="text-[16px] leading-6 font-semibold">{title}</span>
      <span className={`text-[15px] leading-[22px] ${on ? "text-white/85" : "text-[var(--w-secondary)]"}`}>{body}</span>
    </div>
  );
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="split" size={36} iconSize={18} radius={10} />
        <Eyebrow>Địa điểm và người điều phối là hai chiều riêng</Eyebrow>
      </div>
      <div className="grid grid-cols-[140px_1fr_1fr] gap-3">
        <span />
        <span className="text-center font-mono text-[13px] tracking-[1px] text-[var(--w-muted)] uppercase">Có điều phối</span>
        <span className="text-center font-mono text-[13px] tracking-[1px] text-[var(--w-muted)] uppercase">Không điều phối</span>
        <span className="flex items-center text-[15px] font-semibold">Từ xa</span>
        {cell("Remote moderated", "Cuộc gọi video, chia sẻ màn hình. Hiểu sâu, người dùng ở xa.", true)}
        {cell("Remote unmoderated", "Tự làm trên nền tảng test, phiên được ghi lại. Nhanh, nhiều người.", true)}
        <span className="flex items-center text-[15px] font-semibold">Cùng chỗ</span>
        {cell("In-person moderated", "Cần quan sát rộng, thiết bị đặc biệt.", false)}
        <div className="flex items-center justify-center rounded-2xl bg-[var(--d-well)] p-6 text-[15px] text-[var(--w-muted)]">—</div>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Hàng tô đậm là remote testing. NN/g gợi ý test trực tiếp khi có thể, nhưng test từ xa vẫn tốt hơn là không test.
      </T>
    </Blk>
  );
}

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Section {...S.problem}>
        <div className="flex flex-col gap-5">
          <P>Test trực tiếp cần người tham gia đến tận nơi: tốn thời gian di chuyển, khó tuyển người ở xa, và phòng test khác với môi trường thật.</P>
          <P strong>
            Remote testing cho phép tuyển người ở bất cứ đâu, tiết kiệm thời gian và chi phí, và người tham gia dùng thiết bị của chính họ. Theo NN/g, remote test có điều phối thường rẻ,
            nhanh và tiện hơn test trực tiếp; hạn chế chính là phải chuẩn bị kỹ thuật trước.
          </P>
        </div>
        <Eyebrow>Remote testing hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          cols={3}
          minH={150}
          items={[
            ["alert", "Vấn đề nào cần sửa", "Như usability test nói chung."],
            ["check-circle", "Thiết kế có giúp người dùng hoàn thành tác vụ không", "Quan sát qua màn hình hoặc bản ghi."],
            ["target", "Kiểm tra trên thiết bị và môi trường thật", "Của người dùng."],
          ]}
        />
      </Section>

      <Section {...S.forms}>
        <Matrix />
        <Table
          head={["", "Có điều phối (moderated)", "Không điều phối (unmoderated)"]}
          widths={[180]}
          rows={[
            {
              icon: "play-circle",
              cells: ["Cách làm", "Người điều phối và người tham gia cùng lúc qua cuộc gọi video, chia sẻ màn hình.", "Người tham gia tự làm theo hướng dẫn trên nền tảng test, phiên được ghi lại."],
            },
            { icon: "check-circle", cells: ["Ưu điểm", "Hỏi thêm ngay; hỗ trợ khi kẹt.", "Nhiều phiên cùng lúc; nhanh khi thời gian gấp."] },
            {
              icon: "alert",
              cells: [
                "Hạn chế",
                "Tốn thời gian người điều phối; khó biết khi nào ngắt lời người đang im lặng.",
                "Không hỏi thêm; không hỗ trợ khi kẹt; chỉ biết phiên tốt hay không sau khi kết thúc; người ít nói khó think-aloud.",
              ],
            },
            { icon: "target", cells: ["Phù hợp khi", "Cần hiểu sâu, tác vụ phức tạp.", "NN/g gợi ý: nghiên cứu tập trung vào vài phần cụ thể."] },
            { icon: "book", cells: ["Bài chi tiết", "Moderated Testing", "—"] },
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
                "Người dùng ở nhiều nơi, khó gặp trực tiếp.",
                "Ngân sách hoặc thời gian hạn chế.",
                "Cần kiểm tra trên thiết bị, mạng, môi trường thật của người dùng.",
                "Cần nhiều người trong thời gian ngắn (dạng không điều phối).",
              ],
            ],
            ["eye", "Dấu hiệu nhận biết", ["Tuyển người đến phòng test mất nhiều tuần.", "Sản phẩm dùng chủ yếu trên điện thoại cá nhân."]],
            [
              "clipboard-check",
              "Điều kiện cần",
              ["Người tham gia có thiết bị và kết nối ổn định.", "Công cụ gọi video, chia sẻ màn hình hoặc nền tảng test không điều phối.", "Kiểm tra kỹ thuật trước mỗi phiên."],
            ],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[360]}
          rows={[
            { icon: "component", cells: ["Sản phẩm vật lý, thiết bị đặc biệt", "Người tham gia không có thiết bị.", "Test trực tiếp."] },
            { icon: "users", cells: ["Người tham gia ít quen công nghệ", "Khó cài đặt, chia sẻ màn hình.", "Test trực tiếp, có hỗ trợ."] },
            { icon: "eye", cells: ["Cần quan sát ngôn ngữ cơ thể, bối cảnh rộng", "Chỉ thấy màn hình và khuôn mặt.", "Test trực tiếp, field study."] },
            { icon: "shield-alert", cells: ["Nội dung bảo mật cao", "Rủi ro lộ thông tin khi người tham gia ở ngoài.", "Test trực tiếp trong môi trường kiểm soát."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Chọn dạng: có điều phối hay không.", "", "Dạng test, công cụ."],
            ["Viết tác vụ và hướng dẫn.", "Với dạng không điều phối, hướng dẫn phải tự đủ rõ vì không có ai hỏi lại.", "Kịch bản."],
            ["Kiểm tra kỹ thuật.", "Đường dẫn bản mẫu, chia sẻ màn hình, ghi hình.", "Thiết lập đã kiểm tra."],
            ["Chạy thử một phiên.", "", "Kịch bản và thiết lập đã chỉnh."],
            ["Tuyển người và chạy phiên.", "Gửi hướng dẫn kỹ thuật trước; có phương án dự phòng khi mất kết nối.", "Bản ghi, ghi chép."],
            ["Phân tích.", "Như usability test: vấn đề, mức độ, chỉ số tác vụ.", "Báo cáo, đề xuất."],
          ]}
        />
        <P>
          Phần số người tham gia, tỷ lệ hoàn thành và khoảng tin cậy giống bài Moderated Testing (định tính) và Quantitative Research (định lượng).
        </P>
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["calendar", "Ít kiểm soát môi trường", "Người tham gia có thể bị gián đoạn, mạng chậm."],
            ["chat", "Dạng không điều phối", "Không biết vì sao người tham gia làm vậy nếu họ không nói ra."],
            ["users", "Chất lượng người tham gia", "Trên nền tảng tuyển đại trà có thể không đều; một số người làm qua loa."],
            ["eye", "Chỉ thấy màn hình", "Khó thấy bối cảnh xung quanh."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Tác vụ, hướng dẫn rõ ràng.", "Công cụ gọi video hoặc nền tảng test không điều phối.", "Người tham gia, hướng dẫn kỹ thuật cho họ."]}
          outputs={["Bản ghi phiên.", "Danh sách vấn đề, chỉ số tác vụ.", "Đề xuất sửa."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard
          icon="component"
          title="Bối cảnh"
          body="Khách hàng của dịch vụ ở nhiều tỉnh, chủ yếu đặt lịch trên điện thoại. Nhóm cần test luồng đặt lịch mới trong một tuần."
        />
        <div className="flex gap-4">
          <InfoCard
            icon="users"
            title="Vòng 1 — có điều phối từ xa"
            className="flex-1"
            body="5 khách, mỗi người 45 phút qua cuộc gọi video, chia sẻ màn hình điện thoại. Tìm và hiểu vấn đề."
          />
          <InfoCard
            icon="play-circle"
            title="Vòng 2 — không điều phối"
            className="flex-1"
            body="Sau khi sửa, 40 khách tự làm tác vụ trên nền tảng test trong hai ngày. Đo tỷ lệ hoàn thành."
          />
        </div>
        <InfoCard
          tone="fill"
          icon="lightbulb"
          title="Phát hiện quan trọng (giả định)"
          body="Ở vòng 1, hai khách dùng mạng di động yếu; trang xác nhận tải chậm khiến họ bấm nút hai lần và đặt trùng lịch. Vấn đề này khó thấy trong phòng test có mạng ổn định."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Coi “từ xa” là “không điều phối”", "Remote test có thể có điều phối.", "Phân biệt rõ hai dạng."],
            ["Không kiểm tra kỹ thuật trước", "Mất thời gian phiên, người tham gia bỏ cuộc.", "Kiểm tra trước, chạy thử."],
            ["Hướng dẫn không điều phối mơ hồ", "Người tham gia hiểu sai tác vụ.", "Thử hướng dẫn với vài người trước."],
            ["Không có phương án khi mất kết nối", "Mất phiên.", "Chuẩn bị số điện thoại, cách nối lại."],
            ["Tin mọi phiên không điều phối", "Một số người làm qua loa.", "Xem lại bản ghi, loại phiên không hợp lệ theo tiêu chí đặt trước."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Phương pháp", "Địa điểm", "Người điều phối", "Khi nào chọn"]}
          widths={[240]}
          rows={[
            { icon: "users", highlight: true, cells: ["Remote moderated", "Từ xa.", "Có.", "Hiểu sâu, người dùng ở xa."] },
            { icon: "play-circle", highlight: true, cells: ["Remote unmoderated", "Từ xa.", "Không.", "Nhanh, nhiều người, câu hỏi hẹp."] },
            { icon: "eye", cells: ["In-person moderated", "Cùng chỗ.", "Có.", "Cần quan sát rộng, thiết bị đặc biệt."] },
            { icon: "binoculars", cells: ["Field study", "Môi trường thật của người dùng, người nghiên cứu có mặt.", "Có.", "Hiểu bối cảnh, không chỉ giao diện."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Chuẩn bị"
            items={["Chọn rõ dạng có hoặc không điều phối.", "Tác vụ và hướng dẫn tự đủ rõ.", "Đã kiểm tra kỹ thuật và chạy thử."]}
          />
          <ChecklistColumn
            icon="clipboard-check"
            title="Khi chạy"
            items={["Gửi hướng dẫn kỹ thuật cho người tham gia trước.", "Có phương án khi mất kết nối.", "Có tiêu chí loại phiên không hợp lệ (với dạng không điều phối)."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Moderated Testing", "Kiểm thử có người điều phối", "Remote test có điều phối là một dạng."],
            ["Unmoderated Testing", "Kiểm thử không có người điều phối", "Dạng remote test phổ biến."],
            ["Usability Testing", "Kiểm thử khả năng sử dụng", "Khái niệm chung."],
            ["Field Study", "Nghiên cứu thực địa", "Nghiên cứu tại chỗ của người dùng, có người nghiên cứu."],
            ["Quantitative Research", "Nghiên cứu định lượng", "Remote unmoderated thường dùng cho test định lượng."],
            ["Research Operations", "Vận hành nghiên cứu", "Quản lý công cụ, tuyển người cho remote test."],
            ["Task Scenario", "Kịch bản tác vụ", "Không có người giải thích nên kịch bản phải tự rõ."],
          ]}
        />
      </Section>
    </div>
  );
}

export const REMOTE_TESTING: Article = {
  slug: "remote-testing",
  version: 1,
  term: "Remote Testing",
  fn: 5,
  vi: "Kiểm thử từ xa",
  kind: "Phương pháp nghiên cứu / kiểm thử",
  definition:
    "Remote testing là usability test trong đó người tham gia làm tác vụ tại nơi của họ (nhà, văn phòng) trên thiết bị của họ, còn người nghiên cứu theo dõi từ nơi khác qua phần mềm, hoặc xem lại bản ghi sau.",
  definitionMore: "Có hai dạng: có điều phối (cùng lúc, qua cuộc gọi video) và không điều phối (người tham gia tự làm theo hướng dẫn, phiên được ghi lại).",
  oneLine: "Usability test khi người tham gia ở nơi của họ, có hoặc không có người điều phối qua mạng.",
  glance: [
    ["2", "Dạng: có và không điều phối"],
    ["40", "Khách ở vòng không điều phối trong ví dụ"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Remote usability testing"] },
    { label: "Nhóm chính", items: ["Kiểm thử và đánh giá"] },
    { label: "Thẻ phụ", items: ["Nghiên cứu định tính", "Đo lường và phân tích"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "Bài này gộp Remote Testing và Remote User Testing vì cùng một khái niệm. “Từ xa” nói về địa điểm (người tham gia và người nghiên cứu ở hai nơi), không nói về việc có người điều phối hay không: remote test có thể có điều phối hoặc không điều phối.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};

/** Same concept, listed separately in the glossary; shares the article above. */
export const REMOTE_USER_TESTING: Article = { ...REMOTE_TESTING, slug: "remote-user-testing", term: "Remote User Testing" };
