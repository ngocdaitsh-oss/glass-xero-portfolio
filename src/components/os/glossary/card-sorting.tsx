"use client";

import { Blk, T } from "./edit";
import { CheckCard, CheckCards, Formula, InfoGrid, InOutCards, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Card Sorting — copy from ux-glossary/card-sorting.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "parts", title: "Thành phần của một card sort", icon: "component" },
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

/** Tullis & Wood (2004): how closely a subsample matches the full 168-person result. */
function Stability() {
  const rows: [number, number][] = [
    [5, 0.75],
    [15, 0.9],
    [20, 0.93],
    [30, 0.95],
    [60, 0.98],
  ];
  return (
    <Blk label="biểu đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="bar-chart" size={36} iconSize={18} radius={10} />
        <Eyebrow>Mức giống với kết quả của cả 168 người</Eyebrow>
      </div>
      <div className="flex flex-col gap-3">
        {rows.map(([n, r]) => (
          <div key={n} className="flex items-center gap-5">
            <span className="w-[120px] shrink-0 text-[17px] leading-6 font-semibold">{n} người</span>
            <div className="relative h-9 flex-1 overflow-hidden rounded-xl bg-[var(--d-well)]">
              <span className={`absolute inset-y-0 left-0 rounded-xl ${n === 15 ? "bg-[var(--d-fill)]" : "bg-[var(--d-soft)]"}`} style={{ width: `${r * 100}%` }} />
            </div>
            <span className="w-[110px] shrink-0 text-right font-mono text-[16px] leading-6">khoảng {String(r).replace(".", ",")}</span>
          </div>
        ))}
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Hệ số tương quan, từ 0 đến 1; càng gần 1 càng giống. Sau khoảng 15 người, thêm người tham gia chỉ làm kết quả ổn định hơn một chút.
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
            Menu và cấu trúc trang thường được xây theo cách tổ chức nội bộ nhìn thông tin: theo phòng ban, theo tên sản phẩm nội bộ, theo thuật ngữ chuyên môn. Người dùng không
            biết sơ đồ tổ chức đó. Họ tìm thông tin theo nhu cầu và từ ngữ của chính họ, nên dễ lạc khi cấu trúc không khớp với cách họ nghĩ.
          </P>
          <P strong>Card sorting đưa cách nghĩ của người dùng vào trước khi chốt cấu trúc.</P>
        </div>
        <Eyebrow>Card sorting hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          minH={170}
          items={[
            ["component", "Nên có những nhóm nội dung nào", "Ở cấp cao nhất của menu."],
            ["split", "Mục nào nên đặt cùng nhau", "Và mục nào gây phân vân."],
            ["chat", "Gọi tên nhóm thế nào", "Bằng từ ngữ của người dùng."],
            ["link", "Nội dung nào cần xuất hiện ở nhiều nơi", "Hoặc cần lối tắt."],
          ]}
        />
      </Section>

      <Section {...S.parts}>
        <div className="flex gap-4">
          <InfoCard title="Open card sort" body="Người tham gia tự tạo nhóm và tự đặt tên." tone="fill" className="flex-1" />
          <InfoCard title="Closed card sort" body="Xếp thẻ vào các nhóm có sẵn." className="flex-1" />
          <InfoCard title="Hybrid" body="Có nhóm sẵn nhưng được tạo thêm." className="flex-1" />
        </div>
        <Table
          head={["Thành phần", "Mô tả", "Ví dụ minh họa (giả định)"]}
          widths={[280]}
          rows={[
            {
              icon: "file",
              cells: ["Thẻ (cards)", "Mỗi thẻ là một mục nội dung hoặc tính năng, ghi bằng từ dễ hiểu. Thường vài chục thẻ.", "“Đặt lịch tư vấn”, “Bảng giá”, “Câu hỏi thường gặp”, “Chính sách hoàn tiền”…"],
            },
            { icon: "split", cells: ["Dạng sort", "Open, closed hoặc hybrid.", "Open: người tham gia tự tạo nhóm."] },
            { icon: "component", cells: ["Hình thức", "Trực tiếp với thẻ giấy, hoặc trực tuyến bằng công cụ.", "Trực tuyến, không người điều phối."] },
            { icon: "users", cells: ["Người tham gia", "Thuộc nhóm người dùng mục tiêu.", "Khách hàng tiềm năng của dịch vụ tư vấn."] },
            { icon: "analytics", cells: ["Dữ liệu thu được", "Các nhóm, tên nhóm, và (nếu có người điều phối) lời giải thích của người tham gia.", "Ma trận tương đồng, danh sách tên nhóm."] },
          ]}
        />
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            ["target", "Bối cảnh phù hợp", ["Xây mới hoặc tổ chức lại kiến trúc thông tin, menu, danh mục.", "Nhiều nội dung, khó quyết định cách nhóm.", "Nhóm nội bộ không thống nhất được cách phân loại."]],
            [
              "eye",
              "Dấu hiệu nhận biết",
              ["Người dùng không tìm thấy nội dung dù nó có tồn tại.", "Menu được đặt theo tên phòng ban hoặc thuật ngữ nội bộ.", "Mục “Khác” hoặc “Tiện ích” ngày càng phình to."],
            ],
            ["clipboard-check", "Điều kiện cần", ["Có danh sách nội dung đại diện (thường lấy từ kiểm kê nội dung).", "Tiếp cận được người dùng mục tiêu."]],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[360]}
          rows={[
            { icon: "check-circle", cells: ["Cần kiểm tra một cấu trúc đã có", "Card sorting tạo ý tưởng cấu trúc, không đo người dùng có tìm được không.", "Tree testing."] },
            { icon: "list", cells: ["Nội dung quá ít (vài mục)", "Không có gì đáng để phân loại.", "Quyết định trực tiếp; kiểm tra bằng usability test."] },
            { icon: "split", cells: ["Nội dung phụ thuộc mạnh vào luồng tác vụ", "Card sorting bỏ qua thứ tự bước và bối cảnh sử dụng.", "User flow, task analysis."] },
            {
              icon: "chat",
              cells: ["Người tham gia không hiểu thẻ (thuật ngữ quá chuyên môn)", "Kết quả phản ánh sự bối rối với từ ngữ, không phải cách họ nhóm.", "Viết lại thẻ bằng từ dễ hiểu; phỏng vấn trước."],
            },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            [
              "Chọn nội dung cho thẻ.",
              "Lấy từ kiểm kê nội dung; chọn mục đại diện, cùng mức chi tiết. Viết nhãn thẻ rõ nghĩa, tránh để từ ngữ trên thẻ gợi ý nhóm.",
              "Bộ thẻ.",
            ],
            ["Chọn dạng sort và hình thức.", "Open khi khám phá cấu trúc mới; closed khi kiểm tra xem nội dung có vừa với nhóm có sẵn không.", "Thiết kế nghiên cứu."],
            ["Chọn số người tham gia.", "Xem phần Công thức và ví dụ tính.", "Kế hoạch tuyển."],
            ["Thử trước với 1–2 người.", "Kiểm tra thẻ có dễ hiểu, thời gian có hợp lý không.", "Bộ thẻ đã chỉnh."],
            ["Thu thập.", "Nếu có người điều phối, khuyến khích người tham gia nghĩ to để hiểu lý do họ nhóm như vậy.", "Dữ liệu nhóm, tên nhóm, ghi chú."],
            ["Phân tích.", "Ma trận tương đồng, các nhóm phổ biến, tên nhóm hay dùng, thẻ gây phân vân.", "Đề xuất cấu trúc và nhãn."],
            ["Kiểm chứng bằng tree testing.", "Cho người tham gia tìm mục cụ thể trong cấu trúc đề xuất.", "Cấu trúc đã được kiểm tra khả năng tìm kiếm."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <Subhead icon="target">Xác định tiêu chí trước khi phân tích</Subhead>
        <InfoGrid
          cols={3}
          items={[
            ["chat", "Câu hỏi chính", "Những thẻ nào người dùng thường đặt cùng nhau?"],
            ["gauge", "Chỉ số", "Tỷ lệ tương đồng của từng cặp thẻ."],
            [
              "book",
              "Cách đọc đã chốt trước",
              "Cặp thẻ có tỷ lệ cao là ứng viên cùng nhóm; cặp có tỷ lệ trung bình là vùng phân vân, cần xem kỹ lời giải thích hoặc kiểm tra bằng tree testing.",
            ],
          ]}
        />
        <Subhead icon="sigma">Công thức</Subhead>
        <Formula
          label="Tỷ lệ tương đồng của hai thẻ"
          formula="Số người đặt hai thẻ vào cùng một nhóm ÷ Tổng số người tham gia × 100%"
          note="Tức là: trong số người tham gia, bao nhiêu phần trăm cho rằng hai thẻ này thuộc về nhau."
        />
        <P>
          Tính cho mọi cặp thẻ sẽ được ma trận tương đồng (similarity matrix): một bảng mà mỗi ô là tỷ lệ tương đồng của một cặp thẻ. Công cụ card sort thường vẽ thêm dendrogram,
          một sơ đồ cây gom dần các thẻ có tỷ lệ tương đồng cao.
        </P>
        <Subhead icon="bar-chart">Ví dụ thay số</Subhead>
        <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật. Open card sort với 15 người tham gia.</Callout>
        <Table
          head={["Cặp thẻ", "Số người đặt cùng nhóm", "Tỷ lệ tương đồng", "Khoảng tin cậy 95% (adjusted-Wald)"]}
          widths={[380]}
          rows={[
            { highlight: true, cells: ["“Đặt lịch tư vấn” – “Đổi lịch đã đặt”", "12 / 15", "12 ÷ 15 = 80%", "khoảng 54% – 94%"] },
            { cells: ["“Bảng giá” – “Chính sách hoàn tiền”", "4 / 15", "4 ÷ 15 ≈ 27%", "khoảng 11% – 52%"] },
          ]}
        />
        <CheckCard
          icon="book"
          title="Cách đọc"
          items={[
            "Đa số người tham gia coi “Đặt lịch” và “Đổi lịch” là một nhóm. Khoảng tin cậy rộng vì chỉ có 15 người, nhưng ngay cả đầu dưới (54%) vẫn cho thấy hơn một nửa người dùng nhiều khả năng nghĩ như vậy.",
            "“Bảng giá” và “Chính sách hoàn tiền” ít khi được đặt cùng nhau. Người dùng có thể nghĩ “Bảng giá” thuộc về dịch vụ, còn “Hoàn tiền” thuộc về hỗ trợ. Cần xem tên nhóm và lời giải thích để hiểu lý do.",
            "Với 15 người, card sorting dùng các con số này để nhận ra xu hướng, không để khẳng định tỷ lệ chính xác.",
          ]}
        />

        <Subhead icon="users">Cần bao nhiêu người tham gia</Subhead>
        <P>
          Không có công thức cỡ mẫu đơn giản như A/B testing, vì mục tiêu là cấu trúc nhóm ổn định. NN/g dẫn lại nghiên cứu của Tullis & Wood (2004). Hai tác giả lấy những nhóm
          nhỏ từ dữ liệu card sort của 168 người, rồi đo xem kết quả của nhóm nhỏ giống kết quả của cả 168 người đến mức nào.
        </P>
        <Stability />
        <div className="flex gap-4">
          <InfoCard tone="fill" title="Ít nhất 15 người" body="NN/g khuyến nghị cho card sort định tính." className="flex-1" />
          <InfoCard title="30–50 người" body="Khi cần số liệu định lượng tổng quát hơn (NN/g)." className="flex-1" />
          <InfoCard title="20–30 người" body="Đề xuất của Tullis & Wood." className="flex-1" />
        </div>
        <Callout tone="note">
          Đây là khuyến nghị gắn với nghiên cứu cụ thể đó; nhóm điều chỉnh theo độ đa dạng của người dùng (nhiều nhóm người dùng khác nhau thì cần nhiều người hơn).
        </Callout>

        <Subhead icon="clipboard-check">Điều kiện để kết quả đáng tin</Subhead>
        <InfoGrid
          items={[
            ["users", "Đúng người", "Người tham gia thuộc nhóm người dùng mục tiêu, không phải đồng nghiệp nội bộ."],
            ["chat", "Từ ngữ trung lập", "Thẻ không gợi ý nhóm (ví dụ tránh để nhiều thẻ cùng bắt đầu bằng một từ)."],
            ["list", "Cùng mức chi tiết", "Thẻ có cùng mức chi tiết."],
            ["hourglass", "Số thẻ vừa phải", "Để người tham gia không mệt."],
          ]}
        />

        <Subhead icon="split">Quy tắc ra quyết định</Subhead>
        <Table
          head={["Kết quả", "Quyết định"]}
          widths={[460]}
          rows={[
            { icon: "check-circle", cells: ["Cặp thẻ có tỷ lệ tương đồng cao", "Đặt cùng nhóm."] },
            {
              icon: "hourglass",
              cells: ["Tỷ lệ trung bình (vùng phân vân)", "Xem tên nhóm và lời giải thích; cân nhắc đặt ở cả hai nơi hoặc thêm liên kết chéo; kiểm tra bằng tree testing."],
            },
            {
              icon: "dots",
              cells: ["Thẻ bị đặt rải rác ở nhiều nhóm", "Nhãn thẻ có thể khó hiểu, hoặc nội dung phục vụ nhiều nhu cầu; viết lại nhãn hoặc tách nội dung."],
            },
            { icon: "chat", cells: ["Nhiều tên nhóm khác nhau cho cùng một cụm", "Chọn tên được dùng nhiều nhất hoặc dễ hiểu nhất; kiểm tra lại bằng tree testing."] },
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["lightbulb", "Kết quả là ý tưởng cấu trúc, không phải cấu trúc cuối cùng", "Cần kiểm chứng bằng tree testing."],
            ["target", "Không xét bối cảnh tác vụ", "Người dùng nhóm thẻ khi không có mục tiêu cụ thể, khác với khi họ đang tìm thông tin thật."],
            ["file", "Phụ thuộc chất lượng thẻ", "Nhãn thẻ dở cho kết quả dở."],
            ["bar-chart", "Mẫu nhỏ chỉ cho thấy xu hướng", "Tỷ lệ tương đồng của từng cặp còn nhiều không chắc chắn."],
          ]}
          last={["alert", "Không có “câu trả lời đúng” duy nhất", "Nhóm thiết kế vẫn phải cân nhắc mục tiêu kinh doanh và ràng buộc kỹ thuật."]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Kiểm kê nội dung; bộ thẻ đã thử trước.", "Dạng sort, hình thức, công cụ.", "Tiêu chí tuyển và số người tham gia."]}
          outputs={[
            "Ma trận tương đồng, dendrogram.",
            "Các nhóm phổ biến và tên nhóm theo từ ngữ của người dùng.",
            "Danh sách thẻ gây phân vân.",
            "Đề xuất kiến trúc thông tin cần kiểm chứng.",
          ]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối trang dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <div className="flex gap-4">
          <InfoCard
            icon="list"
            title="Bối cảnh"
            className="flex-1"
            body="Menu hiện có các mục “Giới thiệu”, “Dịch vụ”, “Tiện ích”, “Liên hệ”. Mục “Tiện ích” chứa lẫn lộn bảng giá, câu hỏi thường gặp, chính sách hoàn tiền và trang đặt lịch. Khách thường không tìm thấy trang đổi lịch."
          />
          <InfoCard icon="component" title="Cách áp dụng" className="flex-1" body="Open card sort trực tuyến với 15 khách hàng tiềm năng, 30 thẻ." />
        </div>
        <CheckCard
          icon="analytics"
          title="Kết quả (giả định)"
          mark="•"
          items={[
            "“Đặt lịch” và “Đổi lịch” thường được đặt cùng nhau, thường được đặt tên kiểu “Lịch hẹn của tôi”.",
            "“Bảng giá” thường đi với các trang dịch vụ, không đi với “Chính sách hoàn tiền”.",
            "Mục “Tiện ích” không xuất hiện trong cách gọi của người tham gia.",
          ]}
        />
        <InfoCard
          icon="check-circle"
          tone="fill"
          title="Quyết định"
          body="Bỏ mục “Tiện ích”; tạo nhóm “Lịch hẹn”; đưa bảng giá vào từng trang dịch vụ. Cấu trúc mới được kiểm chứng bằng tree testing trước khi triển khai."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kế hoạch minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Copy nguyên kết quả card sort thành menu", "Kết quả là ý tưởng, chưa được kiểm chứng; bỏ qua mục tiêu kinh doanh.", "Dùng làm đầu vào, rồi kiểm chứng bằng tree testing."],
            ["Nhãn thẻ gợi ý nhóm (nhiều thẻ cùng chứa từ “Tài khoản”)", "Người tham gia nhóm theo từ khóa trùng, không theo ý nghĩa.", "Viết nhãn mô tả nội dung, tránh lặp từ khóa."],
            ["Dùng thuật ngữ nội bộ trên thẻ", "Người tham gia không hiểu, nhóm ngẫu nhiên.", "Dùng từ ngữ của người dùng."],
            ["Quá nhiều thẻ", "Người tham gia mệt, chất lượng giảm ở cuối.", "Chọn mục đại diện; chia thành nhiều đợt nếu cần."],
            ["Tuyển đồng nghiệp làm người tham gia", "Họ mang theo cách nhìn nội bộ.", "Tuyển người dùng mục tiêu."],
            ["Chỉ nhìn dendrogram mà bỏ qua tên nhóm và lời giải thích", "Mất thông tin về lý do và từ ngữ.", "Phân tích cả số liệu lẫn tên nhóm, ghi chú."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Phương pháp", "Cách làm", "Trả lời câu hỏi", "Khi nào chọn"]}
          widths={[260]}
          rows={[
            {
              icon: "file",
              highlight: true,
              cells: ["Card Sorting", "Người tham gia tự nhóm và đặt tên nội dung.", "“Người dùng nghĩ nội dung nên được nhóm thế nào?”", "Xây hoặc tổ chức lại cấu trúc."],
            },
            {
              icon: "split",
              cells: [
                "Tree Testing",
                "Người tham gia tìm mục cụ thể trong cây cấu trúc chỉ có chữ.",
                "“Người dùng có tìm được nội dung trong cấu trúc này không?”",
                "Kiểm chứng cấu trúc trước khi thiết kế giao diện.",
              ],
            },
            { icon: "component", cells: ["Affinity Diagram", "Nhóm nghiên cứu gom ghi chú dữ liệu thành chủ đề.", "“Dữ liệu nghiên cứu nói lên những chủ đề gì?”", "Tổng hợp dữ liệu định tính."] },
            { icon: "book", cells: ["Information Architecture", "Không phải phương pháp; là cấu trúc tổ chức thông tin.", "—", "Card sorting là một đầu vào để xây IA."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Chuẩn bị"
            items={[
              "Thẻ lấy từ kiểm kê nội dung, cùng mức chi tiết.",
              "Nhãn thẻ dùng từ ngữ của người dùng, không gợi ý nhóm.",
              "Đã chọn dạng sort phù hợp với mục tiêu.",
              "Đã thử với 1–2 người.",
            ]}
          />
          <ChecklistColumn
            icon="analytics"
            title="Thu thập và phân tích"
            items={[
              "Người tham gia thuộc nhóm người dùng mục tiêu, đủ số lượng cho mục tiêu.",
              "Đã xem cả ma trận tương đồng, tên nhóm và lời giải thích.",
              "Đã xác định các thẻ gây phân vân.",
              "Đề xuất cấu trúc được kiểm chứng bằng tree testing.",
            ]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Tree Testing", "Kiểm thử cây cấu trúc", "Bước kiểm chứng cấu trúc rút ra từ card sorting."],
            ["First-Click Testing", "Kiểm thử cú nhấp đầu tiên", "Kiểm tra nhãn và điều hướng trên giao diện sau khi có cấu trúc."],
            ["Information Architecture", "Kiến trúc thông tin", "Kết quả mà card sorting góp phần xây dựng."],
            ["Mental Model", "Mô hình tư duy", "Điều card sorting giúp làm lộ ra."],
            ["Affinity Diagram", "Sơ đồ tương đồng", "Kỹ thuật gom nhóm tương tự, nhưng do nhóm nghiên cứu thực hiện."],
            ["Attitudinal Methods", "Phương pháp nghiên cứu thái độ", "Nhóm phương pháp mà card sorting thuộc về."],
            ["Confidence Intervals", "Khoảng tin cậy", "Cách đọc độ không chắc chắn của tỷ lệ tương đồng."],
          ]}
        />
      </Section>
    </div>
  );
}

export const CARD_SORTING: Article = {
  slug: "card-sorting",
  version: 1,
  term: "Card Sorting",
  fn: 5,
  vi: "Phân loại thẻ",
  kind: "Phương pháp nghiên cứu / kiểm thử",
  definition:
    "Card sorting là phương pháp nghiên cứu trong đó người tham gia sắp xếp các thẻ, mỗi thẻ ghi một mục nội dung hoặc tính năng, thành các nhóm có ý nghĩa với họ, và thường đặt tên cho từng nhóm.",
  definitionMore:
    "Kết quả cho thấy người dùng tự nhiên nhóm và gọi tên thông tin như thế nào, tức là mô hình tư duy của họ. Từ đó nhóm thiết kế xây dựng kiến trúc thông tin, menu và nhãn điều hướng gần với cách người dùng suy nghĩ.",
  oneLine: "Người tham gia tự nhóm và đặt tên các thẻ nội dung, giúp xây kiến trúc thông tin theo cách người dùng suy nghĩ.",
  glance: [
    ["3", "Dạng: open, closed, hybrid"],
    ["15+", "Người tham gia tối thiểu"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Card sort"] },
    { label: "Nhóm chính", items: ["Cấu trúc và thiết kế"] },
    { label: "Thẻ phụ", items: ["Nghiên cứu khám phá", "Tổng hợp và mô hình hóa"] },
    { label: "Lưu ý tên gọi", items: ["Khác với Tree Testing, phương pháp kiểm tra một cấu trúc đã có."] },
  ],
  sections: SECTIONS,
  Body,
};
