"use client";

import { Blk, T } from "./edit";
import { CheckCards, Formula, InfoGrid, InOutCards, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Stat, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Confidence Intervals — copy from ux-glossary/confidence-intervals.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "parts", title: "Thành phần của một khoảng tin cậy", icon: "component" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "maths", title: "Công thức và ví dụ tính", icon: "sigma" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** Number line 0–100% with one interval per sample size: the bar shrinks as n grows. */
function IntervalLine() {
  const rows: { n: string; lo: number; hi: number; mid: number; label: string }[] = [
    { n: "n = 10", lo: 39, hi: 90, mid: 70, label: "39% – 90%" },
    { n: "n = 100", lo: 61, hi: 78, mid: 70, label: "hẹp hơn" },
  ];
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="bar-chart" size={36} iconSize={18} radius={10} />
        <Eyebrow>Ước lượng điểm và khoảng tin cậy</Eyebrow>
      </div>
      <div className="flex flex-col gap-5 pl-[120px]">
        <div className="relative h-5">
          {[0, 25, 50, 75, 100].map((t) => (
            <span key={t} className="absolute -translate-x-1/2 font-mono text-[14px] leading-5 text-[var(--w-muted)]" style={{ left: `${t}%` }}>
              {t}%
            </span>
          ))}
        </div>
        {rows.map((r, i) => (
          <div key={r.n} className="relative h-10">
            <span className="absolute top-1/2 -left-[120px] -translate-y-1/2 font-mono text-[15px] leading-6">{r.n}</span>
            <span aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-[var(--d-line)]" />
            <span className={`absolute top-1/2 h-3 -translate-y-1/2 rounded-full ${i ? "bg-[var(--d-fill)]" : "bg-[var(--d-soft)]"}`} style={{ left: `${r.lo}%`, width: `${r.hi - r.lo}%` }} />
            <span className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--d-accent)] ring-4 ring-[var(--w-card)]" style={{ left: `${r.mid}%` }} />
            <span className="absolute -top-1 font-mono text-[13px] leading-[18px] text-[var(--w-muted)]" style={{ left: `${r.hi + 1.5}%` }}>
              {r.label}
            </span>
          </div>
        ))}
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Chấm đặt ở 70% là ước lượng điểm. Thanh ngang là khoảng tin cậy. Mẫu càng lớn, thanh càng ngắn.
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
            “70% người tham gia hoàn thành tác vụ” nghe như một sự thật. Nhưng nếu đó là 7 trên 10 người, chỉ cần thêm hay bớt một người hoàn thành, con số đã nhảy 10 điểm. Báo
            cáo một con số đơn lẻ khiến người đọc tưởng nó chính xác hơn thực tế, và dễ ra quyết định dựa trên chênh lệch chỉ do may rủi.
          </P>
          <P strong>Khoảng tin cậy trả lời câu hỏi: “Con số này chắc chắn đến mức nào?”</P>
        </div>
        <Eyebrow>Khoảng tin cậy hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          minH={170}
          items={[
            ["check-circle", "Có đủ bằng chứng để hành động chưa", "Hay cần thêm dữ liệu."],
            ["split", "Hai phương án có thật sự khác nhau không", "Dựa trên khoảng tin cậy của chênh lệch."],
            ["target", "Có đạt mục tiêu không", "Ví dụ mục tiêu tỷ lệ hoàn thành 80%, khoảng tin cậy có nằm hoàn toàn trên 80% không."],
            ["users", "Cần bao nhiêu người tham gia", "Để đạt độ chính xác mong muốn."],
          ]}
        />
      </Section>

      <Section {...S.parts}>
        <Table
          head={["Thành phần", "Mô tả", "Ví dụ minh họa (giả định)"]}
          widths={[300]}
          rows={[
            { icon: "target", cells: ["Ước lượng điểm (point estimate)", "Con số tính từ mẫu.", "Tỷ lệ hoàn thành 70%."] },
            {
              icon: "gauge",
              cells: ["Mức tin cậy (confidence level)", "Tỷ lệ các khoảng tin cậy chứa giá trị thật, nếu lặp lại nghiên cứu nhiều lần. Quy ước phổ biến là 95%.", "95%."],
            },
            { icon: "arrows", cells: ["Sai số biên (margin of error)", "Khoảng cộng trừ quanh ước lượng điểm (với khoảng đối xứng).", "± 25 điểm phần trăm."] },
            { icon: "bar-chart", cells: ["Giới hạn dưới và trên", "Hai đầu của khoảng.", "39% đến 90%."] },
            { icon: "sigma", cells: ["Phương pháp tính", "Phụ thuộc loại dữ liệu và cỡ mẫu.", "Adjusted-Wald cho tỷ lệ mẫu nhỏ."] },
          ]}
        />
        <IntervalLine />
        <Subhead icon="lightbulb">Khoảng tin cậy 95% nghĩa là gì?</Subhead>
        <P>
          Nếu lặp lại cùng một nghiên cứu rất nhiều lần, mỗi lần với một mẫu mới, rồi tính khoảng tin cậy 95% cho mỗi lần, thì khoảng 95% số khoảng đó sẽ chứa giá trị thật. Với
          một khoảng cụ thể đã tính, giá trị thật hoặc nằm trong, hoặc không. Trong thực hành, có thể hiểu gần đúng là “các giá trị hợp lý của chỉ số thật, dựa trên dữ liệu này”.
        </P>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "target",
              "Gần như mọi khi báo cáo số liệu từ mẫu",
              [
                "Tỷ lệ hoàn thành tác vụ, tỷ lệ chuyển đổi, tỷ lệ đồng ý trong khảo sát.",
                "Điểm trung bình: SUS, độ dễ của tác vụ, NASA-TLX.",
                "Chênh lệch giữa hai phiên bản, hai lần đo, hai nhóm người dùng.",
                "Lập kế hoạch cỡ mẫu theo độ chính xác mong muốn.",
              ],
            ],
            [
              "alert",
              "Dấu hiệu cần dùng ngay",
              ["Báo cáo có con số từ ít người tham gia mà không ghi độ không chắc chắn.", "Nhóm sắp quyết định dựa trên chênh lệch nhỏ."],
            ],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[340]}
          rows={[
            {
              icon: "chat",
              cells: ["Dữ liệu định tính (trích dẫn, quan sát)", "Không có ước lượng số để tính khoảng.", "Báo cáo tần suất xuất hiện kèm ngữ cảnh; tránh gán phần trăm cho ít người."],
            },
            {
              icon: "analytics",
              cells: [
                "Dữ liệu toàn bộ (đã có tất cả người dùng, ví dụ toàn bộ đơn hàng của tháng)",
                "Không có sai số do lấy mẫu từ chính tháng đó.",
                "Báo cáo số thực; vẫn cần khoảng tin cậy khi dùng số liệu để suy rộng cho tương lai.",
              ],
            },
            {
              icon: "users",
              cells: ["Mẫu không ngẫu nhiên và lệch nặng", "Khoảng tin cậy chỉ phản ánh sai số ngẫu nhiên, không sửa được sai lệch do chọn mẫu.", "Sửa cách tuyển; ghi rõ giới hạn về đối tượng."],
            },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định loại dữ liệu.", "Nhị phân (hoàn thành / không), liên tục (thời gian, điểm), hay chênh lệch giữa hai nhóm.", "Loại dữ liệu và phương pháp tính phù hợp."],
            ["Chọn mức tin cậy.", "Quy ước phổ biến là 95%. Có thể chọn 90% cho quyết định ít rủi ro; ghi lại lựa chọn.", "Mức tin cậy."],
            ["Tính khoảng tin cậy.", "Xem công thức bên dưới.", "Giới hạn dưới, trên."],
            [
              "Diễn giải theo quyết định cần đưa ra.",
              "So với mục tiêu, với 0 (với chênh lệch), hoặc với mức thay đổi đáng quan tâm.",
              "Kết luận kèm mức độ chắc chắn.",
            ],
            ["Trình bày.", "Báo cáo cả ước lượng điểm, khoảng tin cậy, cỡ mẫu. Trên biểu đồ dùng thanh sai số (error bar).", "Báo cáo và biểu đồ."],
          ]}
        />
      </Section>

      <Section {...S.maths} intro="Mọi khoảng tin cậy đều có chung một dạng dễ nhớ:">
        <Formula
          label="Khoảng tin cậy"
          formula="Kết quả ± Sai số"
          note="Kết quả là con số tính từ dữ liệu: tỷ lệ, điểm trung bình, hoặc chênh lệch giữa hai nhóm. Sai số (margin of error) là mức dao động có thể xảy ra do chỉ đo trên một nhóm người; sai số lớn khi có ít người, hoặc khi câu trả lời của mọi người rất khác nhau."
        />
        <P>
          Phần “Kết quả” chỉ cần cộng, trừ, nhân, chia. Phần “Sai số” cần phép tính phức tạp hơn, nên dùng công cụ tính khoảng tin cậy hoặc bảng tính có sẵn hàm thống kê. Các ví
          dụ dưới đây ghi rõ nhập gì vào công cụ và nhận lại gì.
        </P>
        <Subhead icon="target">Xác định tiêu chí trước khi tính</Subhead>
        <div className="flex gap-4">
          <InfoCard icon="gauge" title="Mức tin cậy" body="95% (quy ước phổ biến; nhóm tự chọn theo rủi ro chấp nhận được)." className="flex-1" />
          <InfoCard icon="chat" title="Câu hỏi quyết định" body="Ví dụ “Tỷ lệ hoàn thành đặt lịch có đạt mục tiêu 80% không?”" className="flex-1" />
        </div>

        <Subhead icon="bar-chart">Ví dụ 1: Khoảng tin cậy cho một tỷ lệ</Subhead>
        <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật. 7 trên 10 người hoàn thành tác vụ đặt lịch.</Callout>
        <Formula label="Tỷ lệ hoàn thành" formula="Số người hoàn thành ÷ Tổng số người = 7 ÷ 10 = 70%" />
        <P>
          Với mẫu nhỏ, dùng cách tính adjusted-Wald. Mẹo dễ hiểu: trước khi tính, cộng thêm 2 người thành công và 2 người không thành công. Cách này giúp khoảng tin cậy không bị
          hẹp một cách vô lý khi có ít người.
        </P>
        <Table
          head={["Bước", "Cách tính", "Kết quả"]}
          widths={[280, undefined, 260]}
          rows={[
            { cells: ["Điểm giữa của khoảng", "(7 + 2) ÷ (10 + 4) = 9 ÷ 14", "≈ 64,3%"] },
            { cells: ["Sai số", "Nhập 7 thành công / 10 người vào công cụ tính (chọn adjusted-Wald, 95%)", "≈ 25 điểm phần trăm"] },
            { highlight: true, cells: ["Khoảng tin cậy", "64,3% ± 25", "khoảng 39% đến 90%"] },
          ]}
        />
        <Callout tone="note">
          Điểm giữa (64,3%) thấp hơn 70% một chút: đó là tác dụng của việc “cộng thêm 2 và 2”, kéo kết quả về phía an toàn khi mẫu nhỏ.
        </Callout>
        <Eyebrow>So sánh với cách tính đơn giản (không cộng thêm)</Eyebrow>
        <Table
          head={["Dữ liệu", "Cách tính đơn giản", "Cách tính cho mẫu nhỏ (adjusted-Wald)"]}
          widths={[200]}
          rows={[
            { cells: ["7 / 10", "41,6% – 98,4%", "39,2% – 89,7%"] },
            { highlight: true, cells: ["10 / 10", "100% – 100% (không có sai số)", "67,9% – 100%"] },
          ]}
        />
        <P>
          Với 10/10, cách tính đơn giản cho kết quả “chắc chắn 100%”, điều vô lý khi chỉ có 10 người. Cách tính cho mẫu nhỏ cho thấy tỷ lệ thật có thể thấp tới khoảng 68%. Đây là
          lý do adjusted-Wald được khuyến nghị cho nghiên cứu UX.
        </P>
        <Callout tone="good" title="Cách đọc theo câu hỏi quyết định">
          Khoảng 39% – 90% chứa cả giá trị dưới và trên 80%. Dữ liệu chưa cho phép kết luận luồng đặt lịch đã đạt mục tiêu 80%.
        </Callout>

        <Subhead icon="bar-chart">Ví dụ 2: Khoảng tin cậy cho một điểm trung bình</Subhead>
        <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật. Điểm SUS của 10 người: 48, 62, 55, 71, 90, 58, 66, 49, 83, 60.</Callout>
        <Formula label="Điểm trung bình" formula="Tổng điểm ÷ Số người = 642 ÷ 10 = 64,2" />
        <Table
          head={["Bước", "Cách tính", "Kết quả"]}
          widths={[280, undefined, 260]}
          rows={[
            { cells: ["Sai số", "Nhập 10 điểm vào công cụ tính khoảng tin cậy cho trung bình (95%)", "≈ 9,9 điểm"] },
            { highlight: true, cells: ["Khoảng tin cậy", "64,2 ± 9,9", "khoảng 54,4 đến 74,1"] },
          ]}
        />
        <div className="flex gap-4">
          <Callout tone="note">Sai số ở đây lớn vì chỉ có 10 người và điểm của họ khá chênh nhau (từ 48 đến 90).</Callout>
          <Callout tone="good" title="Cách đọc">
            Điểm SUS thật nhiều khả năng nằm trong khoảng 54 đến 74. Khoảng này chứa cả mức trung bình 68 mà MeasuringU thường dẫn, nên chưa thể nói sản phẩm “dưới trung bình” hay
            “trên trung bình”.
          </Callout>
        </div>

        <Subhead icon="split">Ví dụ 3: Khoảng tin cậy cho chênh lệch giữa hai nhóm</Subhead>
        <div className="flex gap-4">
          <Formula label="Chênh lệch" formula="Tỷ lệ của nhóm B − Tỷ lệ của nhóm A" />
          <Formula label="Khoảng tin cậy" formula="Chênh lệch ± Sai số" />
        </div>
        <P>
          Ví dụ đầy đủ có trong bài A/B Testing: chênh lệch 1,2 điểm phần trăm, sai số khoảng 0,7, nên khoảng tin cậy từ khoảng 0,5 đến 1,9 điểm. Khoảng tin cậy của chênh lệch
          không chứa 0 là dấu hiệu hai nhóm khác nhau thật ở mức tin cậy đã chọn.
        </P>

        <Subhead icon="users">Cần bao nhiêu người để sai số đủ nhỏ</Subhead>
        <P>Bảng tra cho một tỷ lệ, ở trường hợp cần nhiều người nhất (tỷ lệ quanh 50%), mức tin cậy 95%:</P>
        <Table
          head={["Số người", "Sai số khoảng"]}
          widths={[380]}
          rows={[
            { cells: ["10", "± 31 điểm phần trăm"] },
            { cells: ["30", "± 18 điểm phần trăm"] },
            { cells: ["100", "± 10 điểm phần trăm"] },
            { highlight: true, cells: ["385", "± 5 điểm phần trăm"] },
            { cells: ["1.068", "± 3 điểm phần trăm"] },
          ]}
        />
        <div className="flex gap-4">
          <Stat fill value="×4" label="Quy tắc dễ nhớ" note="Muốn sai số giảm một nửa, cần khoảng gấp bốn lần số người. Từ 100 lên khoảng 400 người, sai số giảm từ ±10 xuống khoảng ±5 điểm." />
          <Callout tone="note">
            Đây là lý do các khảo sát lớn thường có vài trăm đến hơn một nghìn người trả lời, còn usability test với 10 người phù hợp để tìm vấn đề hơn là để đo tỷ lệ chính xác.
          </Callout>
        </div>

        <Subhead icon="clipboard-check">Điều kiện để kết quả đáng tin</Subhead>
        <InfoGrid
          items={[
            ["users", "Mẫu đại diện", "Người tham gia được chọn đại diện cho nhóm cần suy rộng."],
            ["check", "Một kết quả mỗi người", "Mỗi người đóng góp một kết quả cho mỗi chỉ số."],
            ["sigma", "Đúng cách tính", "Chọn theo loại dữ liệu và số người (adjusted-Wald cho tỷ lệ mẫu nhỏ)."],
            ["hourglass", "Dữ liệu lệch", "Với thời gian tác vụ (thường có vài người rất chậm làm lệch trung bình), dùng công cụ hỗ trợ tính cho dữ liệu lệch, hoặc báo cáo trung vị."],
          ]}
        />

        <Subhead icon="split">Quy tắc ra quyết định</Subhead>
        <Table
          head={["Kết quả", "Cách đọc"]}
          widths={[500]}
          rows={[
            { icon: "check-circle", cells: ["Khoảng tin cậy nằm hoàn toàn trên mục tiêu", "Có bằng chứng đã đạt mục tiêu."] },
            { icon: "hourglass", cells: ["Khoảng tin cậy chứa mục tiêu", "Chưa đủ bằng chứng; cần thêm dữ liệu nếu quyết định quan trọng."] },
            { icon: "alert", cells: ["Khoảng tin cậy nằm hoàn toàn dưới mục tiêu", "Có bằng chứng chưa đạt mục tiêu."] },
            { icon: "split", cells: ["Khoảng của chênh lệch không chứa 0", "Có khác biệt ở mức tin cậy đã chọn; xét tiếp mức chênh có đáng giá không."] },
            { icon: "users", cells: ["Khoảng quá rộng để giúp quyết định", "Tăng số người, hoặc dùng làm tín hiệu định hướng thay vì kết luận."] },
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["shield-alert", "Chỉ phản ánh sai số ngẫu nhiên", "Sai lệch do cách tuyển, câu hỏi dẫn dắt, môi trường test không được thể hiện trong khoảng tin cậy."],
            ["gauge", "Không phải “xác suất 95% giá trị thật nằm trong khoảng này”", "Theo nghĩa chặt chẽ của thống kê tần suất."],
            ["split", "Hai khoảng chồng nhau chưa chắc không khác biệt", "Để so sánh hai nhóm, tính khoảng tin cậy của chênh lệch."],
            ["target", "Mức tin cậy là lựa chọn", "95% là quy ước, không phải quy luật."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Dữ liệu mẫu (số người, số thành công, hoặc các giá trị đo).", "Mức tin cậy đã chọn.", "Câu hỏi quyết định (so với mục tiêu, với 0, với nhóm khác)."]}
          outputs={["Ước lượng điểm, giới hạn dưới và trên, cỡ mẫu.", "Kết luận kèm mức độ chắc chắn.", "Biểu đồ có thanh sai số."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối luồng đặt lịch tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard
          icon="users"
          title="Bối cảnh"
          body="Sau usability test với 10 người, báo cáo ghi “70% hoàn thành đặt lịch, SUS 64,2”. Lãnh đạo hỏi: “Như vậy đã đạt mục tiêu 80% chưa, và SUS có dưới trung bình không?”"
        />
        <Eyebrow>Cách trả lời có khoảng tin cậy</Eyebrow>
        <div className="flex gap-4">
          <Stat value="70%" label="Tỷ lệ hoàn thành" note="Khoảng tin cậy 95%: 39% – 90%. Chưa đủ bằng chứng để nói đạt hay không đạt 80%." />
          <Stat value="64,2" label="SUS" note="Khoảng tin cậy 95%: 54 – 74. Chưa thể kết luận so với mức trung bình thường được dẫn." />
        </div>
        <InfoCard
          icon="lightbulb"
          tone="fill"
          title="Đề xuất"
          body="Nếu cần trả lời chắc chắn, chạy benchmark với số người được tính trước theo độ chính xác mong muốn. Nếu mục tiêu là tìm và sửa vấn đề, 10 người vẫn đủ để phát hiện nhiều vấn đề lớn."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Báo cáo phần trăm không có khoảng tin cậy với mẫu nhỏ", "Người đọc tưởng con số chính xác.", "Luôn kèm khoảng tin cậy và cỡ mẫu."],
            ["Dùng công thức Wald cho mẫu nhỏ", "Khoảng quá hẹp, có thể vượt 100% hoặc độ rộng bằng 0.", "Dùng adjusted-Wald."],
            ["So sánh bằng cách xem hai khoảng có chồng nhau không", "Có thể bỏ sót khác biệt thật.", "Tính khoảng tin cậy của chênh lệch."],
            ["Hiểu “95%” là xác suất cho khoảng cụ thể", "Sai ý nghĩa thống kê tần suất.", "Diễn giải là “các giá trị hợp lý dựa trên dữ liệu”."],
            ["Tin khoảng tin cậy hẹp dù mẫu lệch", "Khoảng tin cậy không sửa được sai lệch do chọn mẫu.", "Kiểm tra cách tuyển và đối tượng."],
            ["Dùng trung bình cộng và khoảng tin cậy t trực tiếp cho thời gian tác vụ", "Dữ liệu lệch phải làm khoảng tin cậy sai.", "Tính trên log thời gian; báo cáo trung bình nhân."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Ý nghĩa", "Quan hệ với khoảng tin cậy"]}
          widths={[320]}
          rows={[
            { icon: "bar-chart", highlight: true, cells: ["Confidence Interval", "Khoảng giá trị hợp lý của chỉ số thật.", "—"] },
            { icon: "arrows", cells: ["Margin of Error", "Một nửa độ rộng của khoảng tin cậy (khi khoảng đối xứng).", "“± 5%” trong khảo sát chính là sai số biên."] },
            {
              icon: "sigma",
              cells: [
                "Statistical Significance / p-value",
                "Mức độ khó xảy ra của dữ liệu nếu không có khác biệt.",
                "Khoảng tin cậy 95% của chênh lệch không chứa 0 tương ứng với p < 0,05 (hai phía) trong cùng phương pháp. Khoảng tin cậy cho thêm thông tin về độ lớn.",
              ],
            },
            { icon: "analytics", cells: ["Standard Deviation", "Mức phân tán của các giá trị riêng lẻ.", "Là đầu vào để tính khoảng tin cậy cho trung bình."] },
            {
              icon: "lightbulb",
              cells: ["Credible Interval (Bayes)", "Khoảng chứa giá trị thật với xác suất nhất định, theo cách tiếp cận Bayes.", "Cách diễn giải khác; dùng trong Bayesian A/B testing."],
            },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <ChecklistColumn
          icon="clipboard-check"
          title="Báo cáo số liệu"
          items={[
            "Mọi số liệu từ mẫu đều có khoảng tin cậy và cỡ mẫu đi kèm.",
            "Đã chọn công thức phù hợp loại dữ liệu và cỡ mẫu (adjusted-Wald cho tỷ lệ mẫu nhỏ, t cho trung bình).",
            "Mức tin cậy được ghi rõ.",
            "So sánh hai nhóm bằng khoảng tin cậy của chênh lệch.",
            "Kết luận được diễn giải theo câu hỏi quyết định (mục tiêu, 0, mức đáng quan tâm).",
            "Đã ghi chú các sai lệch mà khoảng tin cậy không phản ánh.",
          ]}
        />
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Statistical Significance", "Ý nghĩa thống kê", "Cách tiếp cận bổ sung để đánh giá khác biệt."],
            ["A/B Testing", "Kiểm thử A/B", "Ví dụ đầy đủ về khoảng tin cậy của chênh lệch."],
            ["Benchmark Study", "Nghiên cứu đo mốc", "Báo cáo mỗi chỉ số kèm khoảng tin cậy qua các lần đo."],
            ["Likert Scale", "Thang Likert", "Khoảng tin cậy cho tỷ lệ đồng ý (top-2-box)."],
            ["Survey", "Khảo sát", "Sai số biên và cỡ mẫu cho tỷ lệ."],
            ["Usability Testing", "Kiểm thử khả năng sử dụng", "Tỷ lệ hoàn thành với mẫu nhỏ."],
            ["UX Metrics", "Chỉ số UX", "Các chỉ số cần báo cáo kèm khoảng tin cậy."],
            ["Quantitative Research", "Nghiên cứu định lượng", "Nhóm phương pháp dùng khoảng tin cậy thường xuyên."],
          ]}
        />
      </Section>
    </div>
  );
}

export const CONFIDENCE_INTERVALS: Article = {
  slug: "confidence-intervals",
  version: 1,
  term: "Confidence Intervals",
  fn: 6,
  vi: "Khoảng tin cậy",
  kind: "Chỉ số / thống kê",
  definition:
    "Khoảng tin cậy là một khoảng giá trị được tính từ dữ liệu mẫu, cho biết giá trị thật của chỉ số (trong toàn bộ người dùng) có thể nằm trong phạm vi nào.",
  definitionMore:
    "Nghiên cứu UX hầu như luôn chỉ đo trên một nhóm nhỏ người dùng, nên mọi con số đều có sai lệch do ngẫu nhiên. Khoảng tin cậy thể hiện độ không chắc chắn đó. Khoảng hẹp nghĩa là ước lượng khá chính xác; khoảng rộng nghĩa là cần thận trọng khi kết luận.",
  oneLine: "Khoảng giá trị cho biết chỉ số thật có thể nằm ở đâu, thể hiện mức không chắc chắn của số liệu mẫu.",
  glance: [
    ["CI", "Viết tắt"],
    ["95%", "Mức tin cậy quy ước"],
  ],
  facts: [
    { label: "Viết tắt", items: ["CI"] },
    { label: "Nhóm chính", items: ["Đo lường và phân tích"] },
    { label: "Thẻ phụ", items: ["Kiểm thử và đánh giá"] },
    {
      label: "Lưu ý tên gọi",
      items: ["Thường đi kèm mức tin cậy, ví dụ “khoảng tin cậy 95%”. Khác với sai số biên (margin of error), là một nửa độ rộng của khoảng tin cậy."],
    },
  ],
  sections: SECTIONS,
  Body,
};
