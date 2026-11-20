"use client";

import { Blk, T } from "./edit";
import { CheckCard, CheckCards, Formula, InfoGrid, InOutCards, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Stat, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* First-Click Testing — copy from ux-glossary/first-click-testing.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "parts", title: "Thành phần của một first-click test", icon: "component" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "maths", title: "Công thức và ví dụ tính", icon: "sigma" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các phương pháp gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** Interval bars on a shared axis: each group's 95% interval, then the difference against the zero line. */
function Intervals({
  title,
  rows,
  min,
  max,
  zero,
  ticks,
  note,
}: {
  title: string;
  rows: { label: string; lo: number; mid: number; hi: number; on?: boolean }[];
  min: number;
  max: number;
  zero?: number;
  ticks: number[];
  note: string;
}) {
  const x = (v: number) => `${((v - min) / (max - min)) * 100}%`;
  return (
    <Blk label="biểu đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="bar-chart" size={36} iconSize={18} radius={10} />
        <Eyebrow>{title}</Eyebrow>
      </div>
      <div className="flex flex-col gap-4">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-5">
            <span className="w-[200px] shrink-0 text-[17px] leading-6 font-semibold">{r.label}</span>
            <div className="relative h-10 flex-1 rounded-xl bg-[var(--d-well)]">
              {zero === undefined ? null : <span className="absolute inset-y-[-6px] w-[2px] bg-[var(--w-muted)] opacity-60" style={{ left: x(zero) }} />}
              <span
                className={`absolute top-1/2 h-3 -translate-y-1/2 rounded-full ${r.on ? "bg-[var(--d-fill)]" : "bg-[var(--d-ci)]"}`}
                style={{ left: x(r.lo), width: `calc(${x(r.hi)} - ${x(r.lo)})` }}
              />
              <span className={`absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full ${r.on ? "bg-[var(--d-accent)]" : "bg-[var(--w-muted)]"}`} style={{ left: x(r.mid) }} />
            </div>
            <span className="w-[150px] shrink-0 text-right font-mono text-[15px] leading-6">
              {r.lo} – {r.hi}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-5">
          <span className="w-[200px] shrink-0" />
          <div className="relative h-5 flex-1 font-mono text-[14px] text-[var(--w-muted)]">
            {ticks.map((t) => (
              <span key={t} className="absolute -translate-x-1/2" style={{ left: x(t) }}>
                {t}
              </span>
            ))}
          </div>
          <span className="w-[150px] shrink-0" />
        </div>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        {note}
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
            Khi người dùng đi sai hướng ngay từ bước đầu, họ thường khó quay lại đúng đường. Theo nghiên cứu của Bailey và Wolfson được trích lại rộng rãi, người dùng nhấp đúng ở lần
            đầu hoàn thành tác vụ khoảng 87% số lần, còn người nhấp sai ở lần đầu chỉ hoàn thành khoảng 46%.
          </P>
          <P strong>Vì vậy, kiểm tra riêng cú nhấp đầu tiên là cách nhanh và rẻ để biết điều hướng có hiệu quả không, trước khi xây dựng toàn bộ sản phẩm.</P>
        </div>
        <div className="flex gap-4">
          <Stat fill value="≈ 87%" label="Hoàn thành khi nhấp đúng lần đầu" note="Bailey & Wolfson" />
          <Stat value="≈ 46%" label="Hoàn thành khi nhấp sai lần đầu" note="Bailey & Wolfson" />
        </div>
        <Eyebrow>First-click testing hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          cols={3}
          minH={150}
          items={[
            ["list", "Nhãn và vị trí điều hướng có rõ không", "Điều hướng và nhãn có dẫn người dùng đi đúng hướng ngay từ đầu không."],
            ["split", "Phương án điều hướng nào tốt hơn", "So sánh hai thiết kế."],
            ["target", "Tác vụ nào cần ưu tiên sửa", "Tác vụ có tỷ lệ nhấp đúng thấp."],
          ]}
        />
      </Section>

      <Section {...S.parts}>
        <Table
          head={["Thành phần", "Mô tả", "Ví dụ minh họa (giả định)"]}
          widths={[260]}
          rows={[
            { icon: "component", cells: ["Giao diện", "Ảnh chụp, wireframe hoặc prototype; không cần sản phẩm hoàn chỉnh.", "Ảnh trang chủ của dịch vụ tư vấn."] },
            {
              icon: "chat",
              cells: [
                "Tác vụ",
                "Mô tả mục tiêu bằng lời của người dùng, không dùng đúng nhãn trên giao diện.",
                "“Bạn muốn hẹn một buổi nói chuyện với chuyên gia. Bạn sẽ nhấp vào đâu?”",
              ],
            },
            { icon: "target", cells: ["Vùng đúng", "Vùng được xác định trước là cú nhấp đúng.", "Nút “Đặt lịch tư vấn” và mục menu “Dịch vụ”."] },
            { icon: "analytics", cells: ["Dữ liệu ghi lại", "Vị trí nhấp, thời gian đến cú nhấp, tỷ lệ nhấp đúng.", "Bản đồ các điểm nhấp."] },
            { icon: "gauge", cells: ["Câu hỏi sau tác vụ (tùy chọn)", "Mức độ tự tin, lý do chọn.", "“Bạn chắc chắn thế nào về lựa chọn này?”"] },
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
                "Kiểm tra cấu trúc điều hướng, nhãn menu, vị trí nút chính.",
                "So sánh hai phương án điều hướng ở giai đoạn sớm.",
                "Cần kết quả nhanh với nhiều người, có thể làm từ xa không cần điều phối.",
              ],
            ],
            ["eye", "Dấu hiệu nhận biết", ["Analytics cho thấy người dùng vào sai mục rồi quay lại.", "Nhóm tranh luận về tên một mục menu."]],
            ["clipboard-check", "Điều kiện cần", ["Tác vụ rõ ràng, có câu trả lời đúng.", "Vùng đúng được xác định trước khi chạy test."]],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[360]}
          rows={[
            { icon: "split", cells: ["Cần đánh giá cả hành trình", "Chỉ đo bước đầu tiên.", "Usability testing."] },
            { icon: "dots", cells: ["Tác vụ không có một câu trả lời đúng", "Không xác định được vùng đúng.", "Phỏng vấn, khám phá."] },
            { icon: "chat", cells: ["Muốn hiểu vì sao người dùng chọn như vậy", "Dữ liệu chủ yếu là vị trí nhấp.", "Usability test có think-aloud."] },
            { icon: "list", cells: ["Kiểm tra cấu trúc thông tin chưa có giao diện", "Cần giao diện để nhấp.", "Tree testing, card sorting."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Chọn tác vụ quan trọng.", "Mỗi tác vụ là một mục tiêu thật của người dùng.", "Danh sách tác vụ."],
            ["Viết tác vụ bằng lời của người dùng.", "Tránh dùng đúng từ có trên nhãn giao diện.", "Kịch bản tác vụ."],
            ["Xác định vùng đúng và tiêu chí quyết định trước.", "", "Vùng đúng, ngưỡng hoặc quy tắc so sánh."],
            ["Tuyển người tham gia.", "", "Danh sách người tham gia."],
            ["Chạy test.", "Mỗi người làm từng tác vụ, chỉ nhấp một lần; thứ tự tác vụ nên thay đổi giữa các người.", "Dữ liệu nhấp."],
            ["Phân tích.", "Tính tỷ lệ nhấp đúng, khoảng tin cậy, xem bản đồ điểm nhấp sai.", "Kết quả theo tác vụ, quyết định."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <Callout tone="scenario">
          Số liệu minh họa, không phải dữ liệu thật. Tác vụ: “Bạn muốn hẹn một buổi nói chuyện với chuyên gia.” Hai nhóm khác nhau, mỗi nhóm 40 người. Nhóm 1 xem điều hướng hiện
          tại, nhóm 2 xem điều hướng mới (nút “Đặt lịch tư vấn” đặt ở thanh trên cùng).
        </Callout>

        <Subhead icon="target">Bước 1: Chốt tiêu chí trước khi chạy test</Subhead>
        <InfoGrid
          cols={3}
          items={[
            ["gauge", "Chỉ số chính", "Tỷ lệ nhấp đúng."],
            ["split", "Quy tắc quyết định", "Chọn điều hướng mới nếu khoảng tin cậy của chênh lệch nằm hoàn toàn trên 0."],
            ["shield-alert", "Mức tin cậy 95%", "Quy ước phổ biến; nhóm tự chọn theo rủi ro."],
          ]}
        />

        <Subhead icon="sigma">Bước 2: Tỷ lệ nhấp đúng</Subhead>
        <Formula label="Tỷ lệ nhấp đúng" formula="Số người nhấp đúng ÷ Tổng số người" />
        <div className="flex gap-4">
          <Stat value="65%" label="Điều hướng hiện tại" note="26 ÷ 40" />
          <Stat fill value="85%" label="Điều hướng mới" note="34 ÷ 40" />
        </div>

        <Subhead icon="arrows">Bước 3: Chênh lệch</Subhead>
        <Formula label="Chênh lệch" formula="Tỷ lệ mới − Tỷ lệ hiện tại" note="Chênh lệch = 85% − 65% = 20 điểm phần trăm." />

        <Subhead icon="bar-chart">Bước 4: Kết quả chắc chắn đến đâu</Subhead>
        <P>
          Với 40 người mỗi nhóm, tỷ lệ chỉ là ước lượng. Cách đơn giản để có khoảng tin cậy cho từng tỷ lệ: cộng thêm 2 người nhấp đúng và 2 người nhấp sai, rồi lấy kết quả điều
          chỉnh ± sai số.
        </P>
        <Formula label="Kết quả điều chỉnh" formula="(Số người nhấp đúng + 2) ÷ (Tổng số người + 4)" note="Hiện tại: 28 ÷ 44 ≈ 63,6%. Mới: 36 ÷ 44 ≈ 81,8%." />
        <Formula label="Khoảng tin cậy" formula="Kết quả điều chỉnh ± Sai số" note="Sai số lấy từ công cụ tính khoảng tin cậy cho tỷ lệ." />
        <Table
          head={["Nhập vào công cụ", "Sai số", "Khoảng tin cậy 95%"]}
          widths={[340]}
          rows={[
            { cells: ["26 nhấp đúng trên 40 người", "≈ 14 điểm", "63,6% ± 14 → khoảng 50% – 78%"] },
            { cells: ["34 nhấp đúng trên 40 người", "≈ 11 điểm", "81,8% ± 11 → khoảng 70% – 93%"] },
          ]}
        />
        <P>Để so sánh chênh lệch giữa hai nhóm, nhập cả hai nhóm vào công cụ so sánh hai tỷ lệ (two-proportion test, giống công cụ dùng cho A/B test).</P>
        <Table
          head={["Nhập vào công cụ", "Kết quả"]}
          widths={[460]}
          rows={[
            {
              highlight: true,
              cells: ["Nhóm 1: 26/40, nhóm 2: 34/40, mức tin cậy 95%", "Khoảng tin cậy của chênh lệch ≈ 2 đến 38 điểm phần trăm; p-value ≈ 0,04"],
            },
          ]}
        />
        <Intervals
          title="Khoảng tin cậy 95% (%, điểm phần trăm)"
          min={-10}
          max={100}
          zero={0}
          ticks={[0, 25, 50, 75, 100]}
          rows={[
            { label: "Hiện tại · 26/40", lo: 50, mid: 63.6, hi: 78 },
            { label: "Mới · 34/40", lo: 70, mid: 81.8, hi: 93 },
            { label: "Chênh lệch", lo: 2, mid: 20, hi: 38, on: true },
          ]}
          note="Vạch đứng là mốc 0. Khoảng của chênh lệch (2 đến 38 điểm) nằm hoàn toàn bên phải mốc 0, nhưng còn rất rộng."
        />
        <CheckCard
          icon="book"
          title="Diễn giải bằng lời"
          items={[
            "Khoảng tin cậy nằm hoàn toàn trên 0 → điều hướng mới có khả năng tốt hơn thật, không chỉ do ngẫu nhiên.",
            "p-value ≈ 0,04 nghĩa là: nếu hai điều hướng thật ra tốt như nhau, khả năng gặp chênh lệch lớn như thế này do ngẫu nhiên chỉ khoảng 4%.",
            "Nhưng khoảng rất rộng (2 đến 38 điểm): mức cải thiện thật có thể rất nhỏ hoặc rất lớn.",
          ]}
        />

        <Subhead icon="users">Bước 5: Cỡ mẫu</Subhead>
        <P>
          First-click test không có một cỡ mẫu chung. Bảng sau cho sai số ước tính ở tỷ lệ khoảng 50% (trường hợp sai số lớn nhất), mức tin cậy 95%.
        </P>
        <Table
          head={["Số người", "Sai số khoảng"]}
          widths={[460]}
          rows={[
            { cells: ["10", "± 31 điểm"] },
            { cells: ["30", "± 18 điểm"] },
            { highlight: true, cells: ["50", "± 14 điểm"] },
            { cells: ["100", "± 10 điểm"] },
            { cells: ["200", "± 7 điểm"] },
          ]}
        />
        <Callout tone="note">Quy tắc dễ nhớ: muốn sai số nhỏ đi một nửa → cần khoảng gấp bốn lần số người.</Callout>

        <Subhead icon="clipboard-check">Bước 6: Điều kiện để phép so sánh đúng</Subhead>
        <InfoGrid
          cols={3}
          items={[
            ["users", "Người khác nhau", "Hai nhóm là người khác nhau, được chia ngẫu nhiên."],
            ["chat", "Cùng tác vụ", "Cùng tác vụ, cùng cách mô tả."],
            ["target", "Vùng đúng chốt trước", "Vùng đúng được xác định trước khi xem dữ liệu."],
          ]}
        />

        <Subhead icon="check-circle">Bước 7: Quyết định</Subhead>
        <InfoCard
          tone="fill"
          icon="check-circle"
          title="Chọn điều hướng mới"
          body="Theo quy tắc đã chốt ở bước 1: khoảng tin cậy của chênh lệch nằm trên 0. Vì khoảng còn rộng, nên kiểm tra lại bằng usability test hoặc theo dõi sau khi ra mắt."
        />

        <Subhead icon="link">Liên hệ giữa cú nhấp đầu và việc hoàn thành tác vụ</Subhead>
        <P>Nếu sau cú nhấp đầu, người tham gia được làm tiếp tác vụ, có thể tính:</P>
        <Formula label="Tỷ lệ hoàn thành" formula="Số người hoàn thành ÷ Số người trong nhóm" />
        <Callout tone="scenario">Số liệu minh họa. Trong nhóm điều hướng hiện tại.</Callout>
        <div className="flex gap-4">
          <Stat fill value="≈ 88%" label="Nhấp đúng → hoàn thành" note="26 người nhấp đúng, 23 người hoàn thành: 23 ÷ 26" />
          <Stat value="≈ 43%" label="Nhấp sai → hoàn thành" note="14 người nhấp sai, 6 người hoàn thành: 6 ÷ 14" />
        </div>
        <P>Mẫu hình này giống với điều nghiên cứu của Bailey và Wolfson mô tả: cú nhấp đầu đúng gắn với khả năng hoàn thành cao hơn nhiều.</P>
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["split", "Chỉ đo bước đầu", "Nhấp đúng không đảm bảo hoàn thành cả tác vụ."],
            ["component", "Ảnh tĩnh khác sản phẩm thật", "Không có hover, không có menu mở ra."],
            ["chat", "Tác vụ viết bằng nhãn giao diện", "Khiến người dùng chỉ đi tìm chữ trùng."],
            ["bar-chart", "Ít người → khoảng tin cậy rộng", "Kết quả với vài chục người dùng để so sánh hướng, không để báo cáo con số chính xác."],
          ]}
          last={["lightbulb", "Không cho biết vì sao", "Người dùng chọn sai."]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Giao diện (ảnh, wireframe, prototype).", "Tác vụ viết bằng lời người dùng.", "Vùng đúng và quy tắc quyết định chốt trước.", "Người tham gia."]}
          outputs={["Tỷ lệ nhấp đúng và khoảng tin cậy theo tác vụ.", "Bản đồ điểm nhấp.", "Thời gian đến cú nhấp đầu.", "Quyết định về điều hướng."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard
          icon="analytics"
          title="Bối cảnh"
          body="Analytics cho thấy nhiều khách vào mục “Về chúng tôi” khi muốn đặt lịch. Nhóm đề xuất đưa nút “Đặt lịch tư vấn” lên thanh trên cùng."
        />
        <div className="flex gap-4">
          <InfoCard
            icon="bar-chart"
            title="Cách áp dụng và kết quả"
            className="flex-1"
            body="Như phần Công thức và ví dụ tính. Điều hướng mới có tỷ lệ nhấp đúng 85% so với 65%; khoảng tin cậy của chênh lệch 2–38 điểm, nằm trên 0."
          />
          <InfoCard
            icon="target"
            title="Bản đồ điểm nhấp sai (giả định)"
            className="flex-1"
            body="Ở điều hướng hiện tại, phần lớn cú nhấp sai rơi vào mục “Về chúng tôi” và “Liên hệ”. Người dùng hiểu “liên hệ” là cách để hẹn gặp."
          />
        </div>
        <InfoCard tone="fill" icon="check-circle" title="Quyết định" body="Dùng điều hướng mới; cân nhắc đổi nhãn “Liên hệ” để tránh nhầm với đặt lịch." />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Tác vụ dùng đúng nhãn giao diện", "Người dùng chỉ đi tìm chữ, không thể hiện cách nghĩ thật.", "Viết bằng lời người dùng."],
            ["Xác định vùng đúng sau khi xem dữ liệu", "Dễ “nới” vùng đúng cho kết quả đẹp.", "Chốt vùng đúng trước."],
            ["Cho cùng một người xem cả hai phương án", "Lần thứ hai bị ảnh hưởng bởi lần đầu.", "Hai nhóm khác nhau, chia ngẫu nhiên."],
            ["Báo cáo tỷ lệ không kèm khoảng tin cậy", "Người đọc tưởng con số chính xác.", "Luôn kèm khoảng tin cậy."],
            ["Kết luận cả hành trình từ cú nhấp đầu", "Chỉ đo bước đầu.", "Kiểm tra tiếp bằng usability test."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Phương pháp", "Đo gì", "Cần gì", "Khi nào chọn"]}
          widths={[240]}
          rows={[
            { icon: "target", highlight: true, cells: ["First-Click Testing", "Cú nhấp đầu trên giao diện.", "Ảnh, wireframe hoặc prototype.", "Kiểm tra nhanh điều hướng và nhãn."] },
            { icon: "list", cells: ["Tree Testing", "Tìm mục trong cấu trúc dạng cây, không có giao diện.", "Cấu trúc thông tin.", "Kiểm tra kiến trúc thông tin tách khỏi thiết kế."] },
            { icon: "play-circle", cells: ["Usability Testing", "Cả hành trình hoàn thành tác vụ.", "Prototype hoặc sản phẩm.", "Đánh giá đầy đủ, hiểu vì sao."] },
            { icon: "eye", cells: ["Eye Tracking", "Người dùng nhìn vào đâu.", "Thiết bị chuyên dụng.", "Biết người dùng có nhìn thấy không."] },
            { icon: "flask", cells: ["A/B Testing", "Hành vi thật trên sản phẩm đang chạy.", "Lưu lượng truy cập lớn.", "Kiểm chứng sau khi ra mắt."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Trước khi chạy"
            items={[
              "Tác vụ là mục tiêu thật, viết bằng lời người dùng.",
              "Vùng đúng được xác định trước.",
              "Quy tắc quyết định được chốt trước.",
              "Nếu so sánh: hai nhóm khác nhau, chia ngẫu nhiên.",
            ]}
          />
          <ChecklistColumn
            icon="analytics"
            title="Khi phân tích"
            items={[
              "Tính tỷ lệ nhấp đúng theo từng tác vụ.",
              "Có khoảng tin cậy.",
              "Xem bản đồ điểm nhấp sai để hiểu nhầm lẫn.",
              "Ghi rõ giới hạn: chỉ đo bước đầu.",
            ]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Tree Testing", "Kiểm thử cây điều hướng", "Kiểm tra cấu trúc thông tin không cần giao diện."],
            ["Card Sorting", "Phân loại thẻ", "Xây cấu trúc trước khi kiểm tra bằng first-click."],
            ["Information Architecture", "Kiến trúc thông tin", "Điều first-click testing giúp đánh giá."],
            ["Usability Testing", "Kiểm thử khả năng sử dụng", "Đánh giá cả hành trình sau cú nhấp đầu."],
            ["Eye Tracking", "Theo dõi chuyển động mắt", "Cho biết người dùng có nhìn thấy vùng đúng không."],
            ["Confidence Intervals", "Khoảng tin cậy", "Cách diễn giải tỷ lệ nhấp đúng."],
            ["A/B Testing", "Kiểm thử A/B", "Cùng phép so sánh hai tỷ lệ, trên sản phẩm thật."],
            ["Design Comparison", "So sánh thiết kế", "First-click test là một cách so sánh hai phương án."],
            ["Task Scenario", "Kịch bản tác vụ", "Mỗi câu hỏi là một kịch bản ngắn."],
          ]}
        />
      </Section>
    </div>
  );
}

export const FIRST_CLICK_TESTING: Article = {
  slug: "first-click-testing",
  version: 1,
  term: "First-Click Testing",
  fn: 5,
  vi: "Kiểm thử cú nhấp đầu tiên",
  kind: "Phương pháp nghiên cứu / kiểm thử",
  definition:
    "First-click testing là phương pháp kiểm thử, trong đó người tham gia nhận một tác vụ và chỉ cần nhấp vào chỗ đầu tiên họ nghĩ sẽ dẫn tới mục tiêu trên một giao diện (ảnh chụp, wireframe hoặc prototype).",
  definitionMore:
    "Người nghiên cứu ghi lại vị trí nhấp, thời gian và tỷ lệ người nhấp đúng, để đánh giá điều hướng và nhãn có dẫn người dùng đi đúng hướng ngay từ đầu không.",
  oneLine: "Kiểm tra người dùng nhấp vào đâu đầu tiên khi bắt đầu một tác vụ, để đánh giá điều hướng.",
  glance: [
    ["87%", "Hoàn thành khi nhấp đúng lần đầu"],
    ["46%", "Hoàn thành khi nhấp sai lần đầu"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["First-click test", "Click test"] },
    { label: "Nhóm chính", items: ["Kiểm thử và đánh giá"] },
    { label: "Thẻ phụ", items: ["Kiến trúc thông tin", "Đo lường và phân tích"] },
    { label: "Lưu ý tên gọi", items: ["Chỉ đo cú nhấp đầu tiên cho mỗi tác vụ, không đo cả hành trình hoàn thành tác vụ như usability test."] },
  ],
  sections: SECTIONS,
  Body,
};
