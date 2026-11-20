"use client";

import { Blk, T } from "./edit";
import { CheckCard, CheckCards, Formula, InfoGrid, InOutCards, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Design Comparison — copy from ux-glossary/design-comparison.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "types", title: "Các dạng so sánh thiết kế", icon: "component" },
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

/** The two worked examples on a 0–100% axis: the interval either clears the 50% line or straddles it. */
function PreferenceChart() {
  const rows: { label: string; lo: number; mid: number; hi: number; ok: boolean; read: string }[] = [
    { label: "34 / 50 chọn B", lo: 54, mid: 66.7, hi: 79, ok: true, read: "Cả khoảng nằm trên 50%" },
    { label: "27 / 50 chọn B", lo: 40, mid: 54, hi: 67, ok: false, read: "Khoảng chứa 50%" },
  ];
  return (
    <Blk label="biểu đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="bar-chart" size={36} iconSize={18} radius={10} />
        <Eyebrow>Tỷ lệ chọn B và khoảng tin cậy 95%</Eyebrow>
      </div>
      <div className="flex flex-col gap-5">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-5">
            <span className="w-[150px] shrink-0 text-[17px] leading-6 font-semibold">{r.label}</span>
            <div className="relative h-10 flex-1 rounded-xl bg-[var(--d-well)]">
              <span className="absolute inset-y-[-6px] left-1/2 w-[2px] bg-[var(--w-muted)] opacity-60" />
              <span
                className={`absolute top-1/2 h-3 -translate-y-1/2 rounded-full ${r.ok ? "bg-[var(--d-fill)]" : "bg-[var(--d-ci-weak)]"}`}
                style={{ left: `${r.lo}%`, width: `${r.hi - r.lo}%` }}
              />
              <span className={`absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full ${r.ok ? "bg-[var(--d-accent)]" : "bg-[var(--w-muted)]"}`} style={{ left: `${r.mid}%` }} />
            </div>
            <span className="w-[200px] shrink-0 text-right font-mono text-[15px] leading-6">
              {r.lo}% – {r.hi}%
            </span>
          </div>
        ))}
        <div className="flex items-center gap-5">
          <span className="w-[150px] shrink-0" />
          <div className="relative h-5 flex-1 font-mono text-[14px] text-[var(--w-muted)]">
            <span className="absolute left-0">0%</span>
            <span className="absolute left-1/2 -translate-x-1/2">50%</span>
            <span className="absolute right-0">100%</span>
          </div>
          <span className="w-[200px] shrink-0" />
        </div>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Vạch giữa là mốc 50%, tức hai phương án được chọn ngang nhau. Chỉ coi B được ưa thích hơn khi cả khoảng tin cậy nằm bên phải vạch này.
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
            Ở giai đoạn thiết kế, nhóm thường có vài phương án và tranh luận theo cảm tính: “bản này hiện đại hơn”, “bản kia rõ ràng hơn”. Sản phẩm chưa ra mắt nên chưa thể A/B
            test. Chọn sai hướng sớm thì những công sức sau đều đi theo hướng sai.
          </P>
          <P strong>Design comparison đưa ý kiến và hành vi của người dùng vào quyết định chọn hướng, với chi phí thấp và nhanh.</P>
        </div>
        <Eyebrow>Design comparison hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          minH={150}
          items={[
            ["split", "Chọn hướng thiết kế", "Để phát triển tiếp."],
            ["eye", "Phương án nào truyền tải đúng cảm giác mong muốn", "Đáng tin, thân thiện, chuyên nghiệp…"],
            ["check-circle", "Phương án nào dễ hiểu và dễ dùng hơn", "Cho một tác vụ cụ thể."],
            ["component", "Nên kết hợp điểm mạnh nào", "Từ các phương án."],
          ]}
        />
      </Section>

      <Section {...S.types}>
        <Table
          head={["Dạng", "Cách làm", "Thu được", "Loại dữ liệu"]}
          widths={[280, undefined, undefined, 200]}
          rows={[
            { icon: "chat", cells: ["Preference test (hỏi sở thích)", "Cho xem các phương án, hỏi thích bản nào và vì sao.", "Tỷ lệ chọn mỗi phương án; lý do.", "Thái độ"] },
            {
              icon: "file",
              cells: [
                "Desirability test (chọn từ mô tả)",
                "Cho xem một phương án, người tham gia chọn vài từ mô tả cảm nhận từ một danh sách có sẵn (product reaction cards).",
                "Cảm nhận về hình ảnh, thương hiệu.",
                "Thái độ",
              ],
            },
            {
              icon: "eye",
              cells: ["Kiểm tra hiểu đúng / first impression", "Cho xem nhanh, hỏi người tham gia hiểu trang này để làm gì, nhớ được gì.", "Mức độ truyền tải thông điệp.", "Thái độ + hiểu biết"],
            },
            {
              icon: "play-circle",
              highlight: true,
              cells: ["Comparative usability test", "Người tham gia làm cùng tác vụ trên từng phương án.", "Tỷ lệ hoàn thành, thời gian, lỗi, độ dễ cảm nhận.", "Hành vi + thái độ"],
            },
          ]}
        />
        <Callout tone="note" title="Về desirability test">
          Bộ product reaction cards gốc do Benedek & Miner phát triển tại Microsoft (2002) có 118 từ, người tham gia chọn 5 từ. Khi làm khảo sát trực tuyến, NN/g gợi ý dùng danh
          sách ngắn hơn, khoảng 25 từ trở xuống, chọn theo mục tiêu thương hiệu.
        </Callout>
        <Subhead icon="users">Hai cách cho xem</Subhead>
        <div className="flex gap-4">
          <InfoCard
            tone="fill"
            title="Mỗi người xem tất cả phương án (within-subjects)"
            body="So sánh trực tiếp được, cần ít người hơn. Phải đổi thứ tự ngẫu nhiên, vì phương án xem sau dễ được đánh giá khác đi chỉ vì đã quen."
            className="flex-1"
          />
          <InfoCard title="Mỗi người chỉ xem một phương án (between-subjects)" body="Không bị ảnh hưởng thứ tự, nhưng cần nhiều người hơn." className="flex-1" />
        </div>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "target",
              "Bối cảnh phù hợp",
              [
                "Giai đoạn chọn hướng: có 2–3 phương án hợp lý, cần chọn một để phát triển.",
                "Cần đánh giá cảm nhận thị giác, thương hiệu, mức đáng tin.",
                "Chưa có sản phẩm thật hoặc không đủ lưu lượng để A/B test.",
              ],
            ],
            ["eye", "Dấu hiệu nhận biết", ["Nhóm tranh luận lâu về thẩm mỹ mà không có dữ liệu.", "Cần kiểm tra một thiết kế có truyền tải đúng tính cách thương hiệu không."]],
            [
              "clipboard-check",
              "Điều kiện cần",
              ["Các phương án ở cùng mức hoàn thiện (cùng độ chi tiết, cùng nội dung).", "Người tham gia thuộc nhóm người dùng mục tiêu.", "Tiêu chí so sánh được chốt trước."],
            ],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[380]}
          rows={[
            {
              icon: "chat",
              cells: [
                "Cần biết phương án nào giúp người dùng làm việc tốt hơn, chỉ bằng câu hỏi “thích bản nào”",
                "Người tham gia thường chọn bản đẹp hơn, chưa chắc là bản dễ dùng hơn.",
                "Comparative usability test.",
              ],
            },
            { icon: "analytics", cells: ["Sản phẩm đã ra mắt và có đủ lưu lượng", "Có thể đo hành vi thật trên người dùng thật.", "A/B testing."] },
            { icon: "split", cells: ["Phương án khác nhau quá nhiều điểm", "Không biết yếu tố nào tạo ra lựa chọn.", "Thu hẹp khác biệt; hỏi lý do kỹ hơn."] },
            { icon: "dots", cells: ["Có quá nhiều phương án (5–10 bản)", "Người tham gia mệt, khó so sánh.", "Lọc bớt bằng đánh giá nội bộ; so sánh 2–3 bản mạnh nhất."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định câu hỏi và tiêu chí.", "Ví dụ: “Phương án nào khiến khách thấy dịch vụ đáng tin hơn và đặt lịch dễ hơn?”", "Câu hỏi nghiên cứu, tiêu chí so sánh."],
            ["Chuẩn bị phương án.", "Cùng nội dung, cùng mức hoàn thiện; chỉ khác ở phần cần so sánh.", "Các phương án sẵn sàng để cho xem."],
            ["Chọn dạng so sánh và cách cho xem.", "Preference, desirability, hay comparative usability; mỗi người xem tất cả hay chỉ một bản.", "Thiết kế nghiên cứu."],
            [
              "Viết câu hỏi trung lập.",
              "Không gọi tên phương án theo cách gợi ý (“bản mới”, “bản cải tiến”); dùng nhãn trung lập (A, B). Luôn hỏi lý do.",
              "Kịch bản hoặc bảng câu hỏi.",
            ],
            ["Thu thập.", "Đổi thứ tự ngẫu nhiên nếu mỗi người xem tất cả các bản.", "Lựa chọn, lý do, từ mô tả, số liệu tác vụ."],
            ["Phân tích và quyết định.", "Tính tỷ lệ kèm khoảng tin cậy; đọc lý do; đặt cạnh dữ liệu hành vi nếu có.", "Phương án được chọn hoặc hướng kết hợp, kèm lý do."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <Subhead icon="target">Xác định tiêu chí trước khi đo</Subhead>
        <InfoGrid
          cols={3}
          items={[
            ["gauge", "Chỉ số chính", "Tỷ lệ người tham gia chọn phương án B khi được hỏi “Bạn sẽ tin tưởng đặt lịch ở trang nào hơn?”."],
            ["bar-chart", "Chỉ số phụ", "Tỷ lệ chọn từ “Đáng tin cậy” trong desirability test; tỷ lệ hoàn thành tác vụ đặt lịch trên từng phương án."],
            [
              "book",
              "Cách đọc đã chốt trước",
              "Nếu hai phương án ngang nhau, mỗi bản sẽ được chọn khoảng 50%. Chỉ coi B được ưa thích hơn khi cả khoảng tin cậy của tỷ lệ chọn B nằm trên 50%.",
            ],
          ]}
        />
        <Subhead icon="sigma">Công thức</Subhead>
        <Formula label="Tỷ lệ chọn B" formula="Số người chọn B ÷ Tổng số người tham gia" />
        <Formula label="Khoảng tin cậy" formula="Tỷ lệ ± Sai số" note="Sai số tính bằng công cụ; xem bài Confidence Intervals." />
        <Formula label="Tỷ lệ chọn một từ mô tả" formula="Số người chọn từ đó ÷ Tổng số người xem phương án" />

        <Subhead icon="bar-chart">Ví dụ thay số</Subhead>
        <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật. 50 người tham gia, mỗi người xem cả hai phương án, thứ tự đổi ngẫu nhiên.</Callout>
        <P>
          Câu hỏi sở thích: tỷ lệ chọn B = 34 ÷ 50 = <b>68%</b>. Với nhóm nhỏ, dùng cách tính adjusted-Wald. Mẹo: cộng thêm 2 người chọn B và 2 người không chọn B rồi tính lại.
        </P>
        <Table
          head={["Bước", "Cách tính", "Kết quả"]}
          widths={[260]}
          rows={[
            { cells: ["Điểm giữa của khoảng", "(34 + 2) ÷ (50 + 4) = 36 ÷ 54", "≈ 66,7%"] },
            { cells: ["Sai số", "Nhập 34 / 50 vào công cụ tính (adjusted-Wald, 95%)", "≈ 12,6 điểm phần trăm"] },
            { highlight: true, cells: ["Khoảng tin cậy", "66,7% ± 12,6", "khoảng 54% đến 79%"] },
          ]}
        />
        <PreferenceChart />
        <div className="flex gap-4">
          <InfoCard
            tone="fill"
            icon="check-circle"
            title="34 / 50 chọn B"
            body="Cả khoảng tin cậy nằm trên 50%, nên dữ liệu ủng hộ việc người tham gia ưa thích B hơn A khi nghĩ về mức đáng tin."
            className="flex-1"
          />
          <InfoCard
            icon="hourglass"
            title="27 / 50 chọn B"
            body="Tỷ lệ 54%, khoảng tin cậy từ công cụ khoảng 40% đến 67%. Khoảng này chứa 50%: chưa đủ bằng chứng để nói người tham gia thích B hơn. Hai phương án có thể được ưa thích ngang nhau."
            className="flex-1"
          />
        </div>

        <Subhead icon="file">Desirability test (từ “Đáng tin cậy”)</Subhead>
        <Table
          head={["", "Phương án A", "Phương án B"]}
          widths={[380]}
          rows={[
            { cells: ["Số người chọn từ “Đáng tin cậy”", "14 / 50", "30 / 50"] },
            { highlight: true, cells: ["Tỷ lệ", "14 ÷ 50 = 28%", "30 ÷ 50 = 60%"] },
          ]}
        />
        <P>
          Phương án B được mô tả là “đáng tin cậy” nhiều hơn. Kết hợp với lý do người tham gia nêu (ví dụ “thấy rõ thông tin chi phí”, “có ảnh tư vấn viên thật”), nhóm biết điều
          gì làm B đáng tin hơn.
        </P>

        <Subhead icon="users">Cần bao nhiêu người tham gia</Subhead>
        <P>Với tỷ lệ chọn quanh 50% (trường hợp khó phân biệt nhất), sai số ở mức tin cậy 95% khoảng:</P>
        <Table
          head={["Số người tham gia", "Sai số khoảng"]}
          widths={[460]}
          rows={[
            { cells: ["10", "± 31 điểm phần trăm"] },
            { cells: ["30", "± 18 điểm phần trăm"] },
            { highlight: true, cells: ["50", "± 14 điểm phần trăm"] },
            { cells: ["100", "± 10 điểm phần trăm"] },
            { cells: ["200", "± 7 điểm phần trăm"] },
          ]}
        />
        <CheckCard
          icon="book"
          title="Cách đọc bảng"
          items={[
            "Với 10 người, ngay cả khi 7 người chọn B, khoảng tin cậy vẫn có thể chứa 50%.",
            "Muốn phát hiện một phương án được ưa thích hơn rõ rệt (ví dụ 65% so với 35%), cần vài chục người trở lên. Muốn phát hiện khác biệt nhỏ, cần vài trăm người.",
            "Quy tắc dễ nhớ: muốn sai số giảm một nửa, cần khoảng gấp bốn lần số người.",
          ]}
        />
        <Callout tone="note">Với comparative usability test định tính (5–8 người), mục tiêu là hiểu vì sao một phương án dễ dùng hơn, không phải đo tỷ lệ chính xác.</Callout>

        <Subhead icon="clipboard-check">Điều kiện để kết quả đáng tin</Subhead>
        <InfoGrid
          items={[
            ["component", "Cùng mức hoàn thiện", "Các phương án cùng mức hoàn thiện, cùng nội dung."],
            ["file", "Nhãn trung lập", "A, B; không gợi ý bản nào mới hơn hay tốt hơn."],
            ["rotate", "Đổi thứ tự", "Thứ tự xem được đổi ngẫu nhiên."],
            ["users", "Đúng người", "Người tham gia thuộc nhóm người dùng mục tiêu, không phải đồng nghiệp."],
          ]}
          last={["chat", "Luôn hỏi lý do", "Không chỉ hỏi chọn bản nào."]}
        />

        <Subhead icon="split">Quy tắc ra quyết định</Subhead>
        <Table
          head={["Kết quả", "Quyết định"]}
          widths={[480]}
          rows={[
            { icon: "check-circle", cells: ["Một phương án được ưa thích rõ (khoảng tin cậy trên 50%) và cũng dễ dùng hơn", "Chọn phương án đó."] },
            { icon: "split", cells: ["Được ưa thích hơn nhưng khó dùng hơn", "Không chọn chỉ vì sở thích; tìm cách đưa điểm được thích vào phương án dễ dùng hơn."] },
            { icon: "hourglass", cells: ["Khoảng tin cậy chứa 50%", "Hai phương án ngang nhau về sở thích; quyết định dựa trên tiêu chí khác (dễ dùng, chi phí, thương hiệu)."] },
            { icon: "users", cells: ["Lý do chọn rất khác nhau giữa các nhóm người dùng", "Xem lại nhóm người dùng mục tiêu; có thể cần phương án riêng."] },
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["chat", "Sở thích nói ra khác hành vi thật", "Người tham gia thích bản đẹp hơn nhưng có thể làm việc tốt hơn với bản khác."],
            ["component", "Phụ thuộc mức hoàn thiện của phương án", "Bản được trau chuốt hơn thường được chọn nhiều hơn."],
            ["list", "Chỉ so sánh các phương án được đưa vào", "Bản được chọn chưa chắc là tốt nhất có thể."],
            ["eye", "Ấn tượng đầu khác trải nghiệm lâu dài", "Thiết kế gây ấn tượng mạnh lúc đầu có thể gây mệt khi dùng thường xuyên."],
          ]}
          last={["bar-chart", "Nhóm nhỏ chỉ cho thấy xu hướng", "Khoảng tin cậy rộng khi có ít người."]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={[
            "Câu hỏi nghiên cứu và tiêu chí so sánh.",
            "2–3 phương án cùng mức hoàn thiện.",
            "Kịch bản, câu hỏi, danh sách từ mô tả (nếu dùng desirability test).",
            "Người tham gia thuộc nhóm mục tiêu.",
          ]}
          outputs={[
            "Tỷ lệ chọn mỗi phương án, kèm khoảng tin cậy.",
            "Lý do chọn và từ mô tả cảm nhận.",
            "Số liệu tác vụ (nếu có comparative usability test).",
            "Quyết định chọn hướng hoặc kết hợp, kèm lý do.",
          ]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối trang dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <div className="flex gap-4">
          <InfoCard
            icon="split"
            title="Bối cảnh"
            className="flex-1"
            body="Nhóm có hai hướng cho trang dịch vụ: A dùng hình minh họa và giọng văn trẻ trung; B dùng ảnh tư vấn viên thật, nêu rõ chi phí và giọng văn chuyên nghiệp. Mục tiêu là khách thấy dịch vụ đáng tin để đặt lịch."
          />
          <InfoCard
            icon="component"
            title="Cách áp dụng"
            className="flex-1"
            body="Khảo sát trực tuyến 50 khách hàng tiềm năng: xem cả hai bản theo thứ tự ngẫu nhiên, chọn bản tin tưởng hơn, nêu lý do, chọn 3 từ mô tả mỗi bản. Comparative usability test với 6 người: tìm thông tin chi phí và đặt lịch trên cả hai bản."
          />
        </div>
        <InfoCard
          icon="analytics"
          title="Kết quả (giả định)"
          body="B được chọn nhiều hơn rõ rệt và được mô tả là “đáng tin cậy” nhiều hơn. Nhưng trong usability test, người tham gia tìm nút đặt lịch trên A nhanh hơn."
        />
        <InfoCard
          icon="check-circle"
          tone="fill"
          title="Quyết định"
          body="Phát triển theo hướng B, nhưng mang cách đặt nút đặt lịch nổi bật của A sang. Sau khi ra mắt, kiểm chứng bằng A/B test với chỉ số chính là tỷ lệ gửi đặt lịch thành công."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kế hoạch minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Chỉ hỏi “thích bản nào” để quyết định độ dễ dùng", "Sở thích thẩm mỹ khác khả năng sử dụng.", "Thêm tác vụ thật trên từng phương án."],
            ["Phương án khác nhau về mức hoàn thiện", "Bản đẹp hơn được chọn vì trau chuốt, không vì ý tưởng.", "Làm các phương án cùng mức chi tiết."],
            ["Gọi tên gợi ý (“bản mới”, “bản cải tiến”)", "Người tham gia nghiêng về bản được ngầm khen.", "Dùng nhãn trung lập A, B."],
            ["Không đổi thứ tự", "Bản xem sau được đánh giá khác chỉ vì thứ tự.", "Đổi thứ tự ngẫu nhiên."],
            ["Không hỏi lý do", "Biết bản nào thắng nhưng không biết vì sao, khó cải thiện tiếp.", "Luôn có câu hỏi “vì sao”."],
            ["Kết luận từ 5–10 người như số liệu chính xác", "Khoảng tin cậy rất rộng.", "Báo kèm khoảng tin cậy; dùng nhóm nhỏ để tìm lý do, không để đo tỷ lệ."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Phương pháp", "Cách làm", "Trả lời câu hỏi", "Khi nào chọn"]}
          widths={[260]}
          rows={[
            {
              icon: "split",
              highlight: true,
              cells: [
                "Design Comparison",
                "Người tham gia xem hoặc dùng thử nhiều phương án trong nghiên cứu.",
                "“Phương án nào được ưa thích, hiểu đúng, dùng tốt hơn?”",
                "Giai đoạn chọn hướng, trước khi ra mắt.",
              ],
            },
            { icon: "flask", cells: ["A/B Testing", "Chia ngẫu nhiên người dùng thật trên sản phẩm đang chạy.", "“Phương án nào làm chỉ số hành vi tốt hơn?”", "Sau ra mắt, đủ lưu lượng."] },
            { icon: "play-circle", cells: ["Usability Testing", "Quan sát người dùng làm tác vụ trên một thiết kế.", "“Người dùng gặp khó ở đâu, vì sao?”", "Tìm và sửa vấn đề."] },
            { icon: "chat", cells: ["Attitudinal Methods", "Nhóm phương pháp thu điều người dùng nói.", "—", "Preference test là một phương pháp thái độ."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Chuẩn bị"
            items={[
              "Câu hỏi và tiêu chí so sánh được chốt trước.",
              "Các phương án cùng mức hoàn thiện, chỉ khác ở phần cần so sánh.",
              "Nhãn phương án trung lập.",
              "Đã quyết định mỗi người xem tất cả hay chỉ một phương án.",
            ]}
          />
          <ChecklistColumn
            icon="analytics"
            title="Thu thập và phân tích"
            items={["Thứ tự xem được đổi ngẫu nhiên.", "Luôn hỏi lý do lựa chọn.", "Tỷ lệ được báo kèm khoảng tin cậy.", "Đã đặt sở thích cạnh dữ liệu tác vụ (nếu có)."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["A/B Testing", "Kiểm thử A/B", "So sánh trên người dùng thật sau khi ra mắt."],
            ["Usability Testing", "Kiểm thử khả năng sử dụng", "Thêm tác vụ thật vào so sánh."],
            ["Attitudinal Methods", "Phương pháp nghiên cứu thái độ", "Nhóm phương pháp mà preference test thuộc về."],
            ["Confidence Intervals", "Khoảng tin cậy", "Cách đọc tỷ lệ chọn kèm độ không chắc chắn."],
            ["Visual Hierarchy", "Phân cấp thị giác", "Yếu tố thường khác nhau giữa các phương án."],
            ["Design Sprint", "Thiết kế nước rút", "Thường so sánh nhiều phương án phác thảo trước khi chọn."],
            ["High-Fidelity Prototype", "Prototype độ hoàn thiện cao", "Mức hoàn thiện của phương án ảnh hưởng tới lựa chọn."],
          ]}
        />
      </Section>
    </div>
  );
}

export const DESIGN_COMPARISON: Article = {
  slug: "design-comparison",
  version: 1,
  term: "Design Comparison",
  fn: 5,
  vi: "So sánh thiết kế",
  kind: "Phương pháp nghiên cứu / kiểm thử",
  definition:
    "Design comparison là phương pháp đưa hai hay nhiều phương án thiết kế cho người tham gia, để biết phương án nào được ưa thích hơn, được hiểu đúng hơn, hoặc giúp hoàn thành tác vụ tốt hơn.",
  definitionMore:
    "Phương pháp thường dùng ở giai đoạn sớm, khi nhóm đang chọn hướng đi và chưa có sản phẩm thật để chạy A/B test. Kết quả mạnh nhất khi kết hợp điều người tham gia nói (thích bản nào, vì sao) với điều họ làm (có hoàn thành tác vụ không).",
  oneLine: "Cho người tham gia xem hoặc dùng thử nhiều phương án thiết kế để biết phương án nào tốt hơn.",
  glance: [
    ["4", "Dạng so sánh"],
    ["50%", "Mốc ngang nhau khi đọc tỷ lệ chọn"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Preference testing", "Comparative testing"] },
    { label: "Nhóm chính", items: ["Kiểm thử và đánh giá"] },
    { label: "Thẻ phụ", items: ["Cấu trúc và thiết kế", "Nghiên cứu khám phá"] },
    {
      label: "Lưu ý tên gọi",
      items: ["Hỏi thích phương án nào (preference test) khác với cho làm tác vụ trên từng phương án (comparative usability test). Khác với A/B testing, vốn đo hành vi người dùng thật."],
    },
  ],
  sections: SECTIONS,
  Body,
};
