"use client";

import { Blk, T } from "./edit";
import { CheckCard, CheckCards, Formula, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Stat, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Heatmap — copy from ux-glossary/heatmap.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "types", title: "Các loại heatmap", icon: "component" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "maths", title: "Công thức và ví dụ tính", icon: "sigma" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các tài liệu gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** A long page beside its scroll-depth bar: hot at the top, cooling as fewer sessions reach each part. */
function ScrollMap() {
  const parts: [string, string, number, number][] = [
    ["Tiêu đề, banner, nút “Đặt lịch”", "Màn hình đầu", 100, 150],
    ["Bảng giá", "Bảng giá", 62, 120],
    ["Câu hỏi thường gặp", "Câu hỏi thường gặp", 24, 120],
  ];
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="analytics" size={36} iconSize={18} radius={10} />
        <Eyebrow>Scroll map của một trang dài</Eyebrow>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-1 flex-col gap-2">
          {parts.map(([name, , pct, h]) => (
            <div key={name} className="flex items-center rounded-[16px] bg-[var(--d-well)] px-6" style={{ height: h }}>
              <T className="text-[17px] leading-6 font-semibold">{name}</T>
              <span className="ml-auto font-mono text-[15px]">{pct}%</span>
            </div>
          ))}
        </div>
        <div
          className="w-10 shrink-0 rounded-[14px]"
          style={{ background: "linear-gradient(to bottom, #e0533d 0%, #f0a43a 40%, #f2d65c 62%, #7fb3e6 85%, #4d7fd6 100%)" }}
        />
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Thanh màu đỏ ở phần đầu trang (nhiều người xem), chuyển dần sang vàng ở giữa, xanh ở cuối (ít người cuộn tới). Con số cho tỷ lệ phiên cuộn tới từng phần.
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
            Bảng số analytics cho biết bao nhiêu người vào trang và bao nhiêu người bấm nút, nhưng khó cho thấy toàn cảnh trên giao diện: người dùng dừng ở đâu, bỏ qua vùng nào, click vào
            chỗ không phải nút.
          </P>
          <P strong>Heatmap biến dữ liệu đó thành hình ảnh đọc được trong vài giây.</P>
        </div>
        <div className="flex gap-4">
          <Stat fill value="≈ 57%" label="Thời gian xem ở màn hình đầu" note="NN/g, bài năm 2018" />
          <Stat value="≈ 74%" label="Thời gian xem ở hai màn hình đầu" note="NN/g, bài năm 2018" />
        </div>
        <Eyebrow>Heatmap hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          cols={3}
          minH={170}
          items={[
            ["eye", "Nội dung quan trọng có nằm trong vùng được xem không", "Ví dụ: người dùng có cuộn tới bảng giá không?"],
            ["target", "Người dùng có click vào thứ không phải nút không", "Dấu hiệu kỳ vọng sai."],
            ["binoculars", "Câu hỏi nào cần nghiên cứu tiếp", "Heatmap thường chỉ ra chỗ có vấn đề, không chỉ ra vì sao."],
          ]}
        />
      </Section>

      <Section {...S.types}>
        <Table
          head={["Loại", "Dữ liệu", "Cho thấy", "Ví dụ minh họa (giả định)"]}
          widths={[240]}
          rows={[
            { icon: "target", cells: ["Click map", "Vị trí click/chạm (analytics).", "Vùng được click nhiều.", "Nhiều người click vào ảnh bảng giá (không phải nút)."] },
            { icon: "list", highlight: true, cells: ["Scroll map", "Độ sâu cuộn (analytics).", "Tỷ lệ người cuộn tới mỗi phần trang.", "Chỉ 24% người cuộn tới phần câu hỏi thường gặp."] },
            { icon: "arrows", cells: ["Move map", "Vị trí con trỏ chuột (analytics).", "Nơi con trỏ di chuyển; chỉ gợi ý gián tiếp về chú ý.", "Con trỏ dừng lâu ở bảng giá."] },
            { icon: "eye", cells: ["Attention map (eye tracking)", "Điểm dừng mắt (thiết bị eye tracking).", "Nơi mắt người dùng nhìn.", "Banner ảnh nhận nhiều điểm nhìn hơn nút đặt lịch."] },
          ]}
        />
        <ScrollMap />
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            ["target", "Bối cảnh phù hợp", ["Trang có lưu lượng truy cập đủ lớn để mẫu hình ổn định.", "Cần nhìn nhanh vị trí vấn đề trước khi nghiên cứu sâu.", "Kiểm tra sau khi thay đổi bố cục."]],
            ["eye", "Dấu hiệu nhận biết", ["Tỷ lệ chuyển đổi thấp nhưng không rõ người dùng bị kẹt ở đâu trên trang.", "Nội dung quan trọng nằm sâu dưới trang."]],
            [
              "clipboard-check",
              "Điều kiện cần",
              [
                "Công cụ ghi hành vi trên trang (với click, scroll, move map) hoặc thiết bị eye tracking.",
                "Đủ số phiên hoặc số người: với heatmap eye tracking, NN/g khuyến nghị khoảng 39 người làm cùng tác vụ.",
                "Tách heatmap theo thiết bị (máy tính, điện thoại) vì bố cục khác nhau.",
              ],
            ],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[360]}
          rows={[
            { icon: "bar-chart", cells: ["Lưu lượng truy cập thấp", "Vài phiên tạo màu không ổn định.", "Session replay, usability test."] },
            { icon: "chat", cells: ["Cần biết vì sao người dùng làm vậy", "Heatmap chỉ cho thấy ở đâu.", "Usability test có think-aloud, phỏng vấn."] },
            { icon: "rotate", cells: ["Trang thay đổi nội dung theo người dùng", "Các phiên không cùng bố cục nên khó gộp.", "Phân tích theo phần tử, không theo vị trí."] },
            { icon: "split", cells: ["Cần so sánh có kiểm soát", "Heatmap không cho biết khác biệt có thật hay không.", "A/B testing."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định câu hỏi.", "Ví dụ: “Người dùng có cuộn tới bảng giá không?”", "Câu hỏi và loại heatmap cần dùng."],
            ["Thiết lập thu thập dữ liệu.", "Chọn trang, thiết bị, khoảng thời gian.", "Cấu hình công cụ."],
            ["Thu đủ dữ liệu.", "", "Số phiên đủ để mẫu hình ổn định."],
            ["Đọc heatmap theo câu hỏi.", "Đọc kèm số liệu, không chỉ nhìn màu.", "Quan sát theo từng vùng."],
            ["Kiểm chứng.", "Xem session replay hoặc làm usability test để hiểu vì sao.", "Nhận định, đề xuất thay đổi."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <P>Màu trên heatmap là tỷ lệ được tô lên giao diện. Đọc kèm con số giúp tránh hiểu sai.</P>
        <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật. Trang dịch vụ tư vấn trên điện thoại, 2.000 phiên trong hai tuần.</Callout>
        <Subhead icon="list">Tỷ lệ người cuộn tới một phần trang (scroll map)</Subhead>
        <Formula label="Tỷ lệ cuộn tới" formula="Số phiên cuộn tới phần đó ÷ Tổng số phiên" />
        <div className="flex gap-4">
          <Stat fill value="62%" label="Bảng giá" note="1.240 ÷ 2.000" />
          <Stat value="24%" label="Câu hỏi thường gặp" note="480 ÷ 2.000" />
        </div>
        <Subhead icon="target">Tỷ lệ click vào một vùng (click map)</Subhead>
        <Formula label="Tỷ lệ click" formula="Số phiên có click vào vùng ÷ Tổng số phiên" note="Ảnh bảng giá (không phải nút): 310 ÷ 2.000 = 15,5%." />
        <Subhead icon="bar-chart">Kết quả chắc chắn đến đâu</Subhead>
        <P>Với 2.000 phiên, khoảng tin cậy hẹp. Nhập vào công cụ tính khoảng tin cậy cho tỷ lệ.</P>
        <Table head={["Nhập vào công cụ", "Kết quả"]} widths={[520]} rows={[{ highlight: true, cells: ["1.240 phiên trên 2.000, mức tin cậy 95%", "Khoảng tin cậy ≈ 60% – 64%"] }]} />
        <Callout tone="note" title="Lưu ý">
          Một người có thể có nhiều phiên. Tỷ lệ tính theo phiên khác với tỷ lệ tính theo người; ghi rõ đơn vị khi báo cáo.
        </Callout>
        <Subhead icon="split">Quyết định</Subhead>
        <CheckCard
          icon="check-circle"
          title="Đọc kết quả"
          items={[
            "15,5% phiên click vào ảnh bảng giá → người dùng mong ảnh đó bấm được. Cân nhắc biến ảnh thành nút dẫn tới chi tiết giá.",
            "Chỉ 24% cuộn tới câu hỏi thường gặp → đưa câu hỏi quan trọng nhất (về chi phí) lên gần bảng giá.",
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <CheckCards
          mark="•"
          groups={[
            [
              "shield-alert",
              "Giới hạn",
              [
                "Heatmap cho biết ở đâu, không cho biết vì sao.",
                "Màu phụ thuộc thang màu của công cụ. Cùng dữ liệu, thang khác cho cảm giác khác.",
                "Move map không phải eye tracking. Con trỏ không luôn đi theo mắt.",
                "Gộp nhiều người che mất khác biệt giữa các nhóm người dùng.",
                "Heatmap eye tracking với ít người dễ gây hiểu sai.",
              ],
            ],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Câu hỏi cần trả lời.", "Công cụ ghi hành vi hoặc thiết bị eye tracking.", "Đủ số phiên hoặc số người, tách theo thiết bị."]}
          outputs={["Heatmap kèm số liệu theo vùng.", "Quan sát về vị trí vấn đề.", "Câu hỏi để kiểm chứng tiếp."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard
          icon="analytics"
          title="Bối cảnh"
          body="Tỷ lệ đặt lịch trên điện thoại thấp hơn máy tính. Nhóm xem scroll map và click map của trang dịch vụ trên điện thoại."
        />
        <div className="flex gap-4">
          <InfoCard
            icon="eye"
            title="Quan sát (theo phần tính toán ở trên)"
            className="flex-1"
            body="62% phiên cuộn tới bảng giá, nhưng 15,5% phiên click vào ảnh bảng giá, vốn không phải nút. Chỉ 24% cuộn tới phần câu hỏi thường gặp, nơi trả lời câu hỏi về chi phí."
          />
          <InfoCard
            icon="play-circle"
            title="Kiểm chứng"
            className="flex-1"
            body="Xem 20 session replay có click vào ảnh bảng giá. Người dùng phóng to ảnh để đọc chữ nhỏ, rồi rời trang."
          />
        </div>
        <InfoCard
          icon="check-circle"
          tone="fill"
          title="Quyết định"
          body="Chuyển bảng giá từ ảnh sang văn bản dễ đọc trên điện thoại; đưa câu hỏi về chi phí lên ngay dưới bảng giá; theo dõi lại bằng heatmap và tỷ lệ đặt lịch."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Chỉ nhìn màu, không xem số", "Màu phụ thuộc thang của công cụ.", "Đọc kèm tỷ lệ theo vùng."],
            ["Gộp máy tính và điện thoại", "Bố cục khác nên vị trí không khớp.", "Tách theo thiết bị."],
            ["Coi move map như eye tracking", "Con trỏ không đi theo mắt.", "Dùng eye tracking khi cần biết chỗ nhìn."],
            ["Kết luận từ ít phiên", "Mẫu hình chưa ổn định.", "Thu đủ dữ liệu trước khi đọc."],
            ["Dừng ở heatmap", "Không hiểu nguyên nhân.", "Kiểm chứng bằng replay hoặc usability test."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Tài liệu / công cụ", "Cho thấy", "Khi nào chọn"]}
          widths={[300]}
          rows={[
            { icon: "analytics", highlight: true, cells: ["Heatmap", "Mẫu hình gộp của nhiều người trên giao diện.", "Nhìn nhanh vị trí vấn đề."] },
            { icon: "eye", cells: ["Gaze plot", "Đường nhìn của một người theo thứ tự.", "Phân tích định tính eye tracking."] },
            { icon: "play-circle", cells: ["Session replay", "Video phiên của từng người.", "Hiểu chuỗi hành động."] },
            { icon: "filter", cells: ["Funnel report", "Tỷ lệ đi qua từng bước.", "Biết người dùng rời ở bước nào."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Trước khi đọc"
            items={["Có câu hỏi rõ trước khi xem heatmap.", "Ghi rõ heatmap của dữ liệu nào (click, scroll, move, mắt nhìn).", "Tách theo thiết bị."]}
          />
          <ChecklistColumn
            icon="analytics"
            title="Khi đọc"
            items={["Đủ số phiên hoặc số người.", "Đọc kèm số liệu, ghi rõ đơn vị (phiên hay người).", "Kiểm chứng nguyên nhân bằng phương pháp khác."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Eye Tracking", "Theo dõi chuyển động mắt", "Nguồn dữ liệu cho heatmap chú ý."],
            ["Clickstream Analysis", "Phân tích luồng nhấp", "Dữ liệu hành vi tương tự, nhìn theo chuỗi."],
            ["Session Replay", "Xem lại phiên", "Kiểm chứng nguyên nhân sau khi xem heatmap."],
            ["First-Click Testing", "Kiểm thử cú nhấp đầu tiên", "Bản đồ điểm nhấp là một dạng click map."],
            ["A/B Testing", "Kiểm thử A/B", "Kiểm chứng thay đổi đề xuất từ heatmap."],
            ["Confidence Intervals", "Khoảng tin cậy", "Đọc tỷ lệ theo vùng."],
          ]}
        />
      </Section>
    </div>
  );
}

export const HEATMAP: Article = {
  slug: "heatmap",
  version: 1,
  term: "Heatmap",
  fn: 6,
  vi: "Bản đồ nhiệt",
  kind: "Tài liệu / sơ đồ thiết kế",
  definition:
    "Heatmap là hình ảnh phủ màu lên giao diện để cho thấy nơi người dùng tương tác hoặc chú ý nhiều (màu nóng) và ít (màu lạnh), được gộp từ hành vi của nhiều người.",
  definitionMore: "Heatmap giúp nhóm nhìn nhanh mẫu hình chung, ví dụ vùng được click nhiều, phần trang ít người cuộn tới, hay chỗ mắt người dùng dừng lại.",
  oneLine: "Hình phủ màu cho thấy người dùng click, cuộn hoặc nhìn nhiều ở đâu trên giao diện.",
  glance: [
    ["4", "Loại: click, scroll, move, attention"],
    ["≈ 57%", "Thời gian xem ở màn hình đầu"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Click map", "Scroll map", "Attention map"] },
    { label: "Nhóm chính", items: ["Đo lường và phân tích"] },
    { label: "Thẻ phụ", items: ["Kiểm thử và đánh giá"] },
    {
      label: "Lưu ý tên gọi",
      items: ["Heatmap là cách trình bày dữ liệu bằng màu, không phải một phương pháp nghiên cứu riêng. Dữ liệu có thể đến từ analytics hoặc eye tracking; luôn nói rõ heatmap của dữ liệu nào."],
    },
  ],
  sections: SECTIONS,
  Body,
};
