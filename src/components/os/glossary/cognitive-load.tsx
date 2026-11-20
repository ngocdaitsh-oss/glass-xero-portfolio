"use client";

import { Blk, T } from "./edit";
import { CheckCard, CheckCards, Formula, InfoGrid, InOutCards, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Stat, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Cognitive Load — copy from ux-glossary/cognitive-load.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "mechanism", title: "Cơ chế: trí nhớ làm việc và ba loại tải", icon: "component" },
  { id: "ui", title: "Biểu hiện trên giao diện: ví dụ tốt và chưa tốt", icon: "eye" },
  { id: "when", title: "Khi nào cần chú ý đến cognitive load", icon: "check-circle" },
  { id: "limits", title: "Giới hạn: khi nào “giảm tải” chưa đủ", icon: "shield-alert" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "evaluate", title: "Cách đánh giá cognitive load", icon: "clipboard-check" },
  { id: "maths", title: "Công thức và ví dụ tính", icon: "sigma" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** Working memory as a fixed-size box: intrinsic + germane are needed, extraneous is waste. */
function Capacity() {
  const parts: [string, string, number, string][] = [
    ["Nội tại", "độ phức tạp vốn có", 34, "bg-[var(--d-soft)] text-[var(--d-accent-strong)]"],
    ["Liên quan", "hiểu và học", 26, "bg-[var(--d-fill)] text-white"],
    ["Ngoại lai", "do cách trình bày", 40, "bg-[var(--d-bad-soft)] text-[var(--d-bad)]"],
  ];
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="component" size={36} iconSize={18} radius={10} />
        <Eyebrow>Dung tích trí nhớ làm việc</Eyebrow>
      </div>
      <div className="flex h-[96px] gap-1.5 rounded-2xl bg-[var(--d-well)] p-1.5">
        {parts.map(([t, sub, w, cls]) => (
          <span key={t} className={`flex flex-col justify-center rounded-xl px-5 ${cls}`} style={{ width: `${w}%` }}>
            <T className="text-[18px] leading-6 font-semibold">{t}</T>
            <T className="text-[14px] leading-5 opacity-80">{sub}</T>
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between gap-6">
        <T className="text-[16px] leading-6 font-semibold text-[var(--d-bad)]">Vượt dung tích → lỗi, chậm, bỏ cuộc</T>
        <T className="text-[16px] leading-6 font-semibold text-[var(--d-accent)]">← Thiết kế tốt thu nhỏ phần ngoại lai</T>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Trí nhớ làm việc như một chiếc hộp có dung tích cố định. Tải nội tại và tải liên quan là phần cần thiết. Tải ngoại lai chiếm chỗ vô ích. Khi tổng tải vượt dung tích, người
        dùng mắc lỗi hoặc bỏ cuộc. Thiết kế tốt thu nhỏ phần ngoại lai để còn chỗ cho phần cần thiết.
      </T>
    </Blk>
  );
}

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Section {...S.problem}>
        <P>
          Người dùng hiếm khi dành toàn bộ sự chú ý cho giao diện. Họ vừa dùng sản phẩm vừa nghĩ về công việc, bị thông báo cắt ngang, dùng điện thoại khi đang di chuyển. Giao
          diện nào đòi hỏi nhiều nỗ lực trí óc hơn mức cần thiết sẽ làm tăng lỗi, làm chậm và làm người dùng mệt mỏi, kể cả khi về lý thuyết mọi chức năng đều “có ở đó”.
        </P>
        <Eyebrow>Hiểu cognitive load hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          minH={170}
          items={[
            ["eye", "Hiển thị bao nhiêu thông tin", "Ở mỗi bước, và cái gì để sau."],
            ["list", "Chia bước thế nào", "Trong một luồng dài."],
            ["check-circle", "Dựa vào nhận diện hay ghi nhớ", "Cho người dùng chọn từ danh sách thay vì bắt họ nhớ và gõ."],
            ["component", "Dùng mẫu quen thuộc hay sáng tạo mới", "Cái mới làm người dùng phải học thêm."],
          ]}
          last={["arrows", "So sánh hai phương án", "Bằng mức nỗ lực người dùng cảm nhận."]}
        />
      </Section>

      <Section {...S.mechanism}>
        <P>
          Trí nhớ làm việc có giới hạn. Miller (1956) gợi ý con người giữ được khoảng “7 ± 2” đơn vị thông tin. Nghiên cứu sau đó của Cowan (2001) cho rằng con số thực tế nhỏ hơn,
          khoảng 4 cụm thông tin. Điều quan trọng với thiết kế không phải con số chính xác, mà là giới hạn này nhỏ và dễ bị vượt.
        </P>
        <div className="flex gap-4">
          <Stat value="7 ± 2" label="Miller (1956)" note="Đơn vị thông tin trí nhớ ngắn hạn giữ được." />
          <Stat fill value="~4" label="Cowan (2001)" note="Cụm thông tin, con số thực tế nhỏ hơn." />
        </div>
        <Subhead icon="component">Ba loại tải theo lý thuyết tải nhận thức (Sweller và cộng sự)</Subhead>
        <Table
          head={["Loại tải", "Ý nghĩa", "Trong UX", "Thiết kế nên"]}
          widths={[260]}
          rows={[
            {
              icon: "target",
              cells: [
                "Tải nội tại (intrinsic load)",
                "Độ phức tạp vốn có của nhiệm vụ.",
                "Chọn gói bảo hiểm vốn phức tạp hơn đặt lịch hẹn.",
                "Không loại bỏ được, nhưng chia nhỏ và sắp thứ tự hợp lý.",
              ],
            },
            {
              icon: "alert",
              highlight: true,
              cells: [
                "Tải ngoại lai (extraneous load)",
                "Nỗ lực phát sinh do cách trình bày, không do nhiệm vụ.",
                "Nhãn khó hiểu, bố cục lộn xộn, phải nhớ thông tin từ màn hình trước.",
                "Giảm tối đa. Đây là phần thiết kế kiểm soát được.",
              ],
            },
            {
              icon: "lightbulb",
              cells: ["Tải liên quan (germane load)", "Nỗ lực dành cho việc hiểu và học.", "Hiểu sự khác nhau giữa các gói dịch vụ để chọn đúng.", "Hỗ trợ bằng ví dụ, so sánh rõ ràng."],
            },
          ]}
        />
        <Capacity />
      </Section>

      <Section {...S.ui}>
        <PairCards
          icon={null}
          first="Tải cao"
          second="Tải thấp hơn"
          items={[
            ["Nhập lại thông tin — nhận diện dễ hơn ghi nhớ", "Bắt người dùng nhớ mã đơn từ email rồi gõ lại.", "Điền sẵn hoặc cho chọn từ danh sách."],
            ["So sánh lựa chọn — không phải giữ thông tin qua nhiều màn hình", "Mỗi gói dịch vụ mô tả ở một trang riêng.", "Bảng so sánh các gói cạnh nhau, cùng tiêu chí."],
            ["Form dài — chia nhỏ (chunking)", "Hai mươi trường trên một trang.", "Chia thành nhóm có tiêu đề, hoặc nhiều bước có chỉ báo tiến độ."],
            ["Nhãn — không phải dịch nghĩa trong đầu", "Thuật ngữ nội bộ (“Mã KH”, “Gói Premium+”).", "Từ ngữ quen thuộc với người dùng."],
            ["Lựa chọn — giảm số thứ cần cân nhắc", "Mười hai lựa chọn ngang hàng ngay từ đầu.", "Gợi ý lựa chọn phổ biến; nhóm và ẩn tùy chọn nâng cao."],
            ["Trang trí — giảm tải ngoại lai", "Nhiều hiệu ứng, màu, khối nổi bật cạnh tranh sự chú ý.", "Phân cấp thị giác rõ, ít yếu tố thừa."],
            ["Mẫu tương tác — không phải học thêm", "Tự chế cách chọn ngày mới lạ.", "Dùng mẫu quen thuộc."],
            ["Lỗi — không phải đoán", "“Dữ liệu không hợp lệ.”", "Nêu trường nào sai và cách sửa, ngay tại trường đó."],
          ]}
        />
      </Section>

      <Section {...S.when} intro="Luôn cần, nhưng đặc biệt quan trọng khi:">
        <CheckCards
          groups={[
            [
              "target",
              "Đặc biệt quan trọng khi",
              [
                "Tác vụ vốn phức tạp (tài chính, y tế, bảo hiểm, cấu hình sản phẩm).",
                "Người dùng dùng trong điều kiện bị phân tâm (mobile, khi di chuyển, khi đang làm việc khác).",
                "Người dùng mới, người cao tuổi, hoặc người có khó khăn về nhận thức.",
                "Quyết định có hậu quả (thanh toán, đồng ý điều khoản, xóa dữ liệu).",
              ],
            ],
            [
              "alert",
              "Dấu hiệu tải quá cao",
              [
                "Người dùng dừng lâu, quay lại màn hình trước để xem lại thông tin.",
                "Lỗi nhập liệu nhiều, đặc biệt ở các trường cần nhớ.",
                "Trong usability test, người dùng nói “khoan, để tôi xem lại…” hay “cái này là gì?”.",
              ],
            ],
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["target", "Không thể giảm tải nội tại về 0", "Nhiệm vụ phức tạp vẫn phức tạp; ẩn bớt thông tin quan trọng có thể dẫn tới quyết định sai."],
            ["eye", "Đơn giản hóa quá mức có thể tăng tải", "Ẩn mọi thứ sau menu khiến người dùng phải tìm và nhớ chỗ."],
            ["users", "Người dùng chuyên gia khác người mới", "Màn hình dày thông tin có thể hiệu quả với người dùng thành thạo."],
            ["gauge", "Đo tải nhận thức không đơn giản", "Thang đo tự đánh giá là cảm nhận; số liệu hành vi (thời gian, lỗi) bị ảnh hưởng bởi nhiều yếu tố khác."],
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định tác vụ và tải nội tại.", "Liệt kê thông tin người dùng thật sự cần để quyết định ở mỗi bước.", "Danh sách thông tin cần thiết cho từng bước."],
            [
              "Tìm nguồn tải ngoại lai.",
              "Rà soát chỗ người dùng phải nhớ, so sánh qua màn hình, dịch thuật ngữ, đoán hành vi giao diện.",
              "Danh sách điểm gây tải không cần thiết.",
            ],
            [
              "Áp dụng kỹ thuật giảm tải.",
              "Chia nhỏ, điền sẵn, dùng mặc định hợp lý, nhận diện thay vì ghi nhớ, mẫu quen thuộc, phân cấp thị giác rõ.",
              "Phương án thiết kế đã giảm tải.",
            ],
            ["Hỗ trợ tải liên quan.", "Với quyết định phức tạp, cung cấp so sánh, ví dụ, giải thích ngắn tại chỗ.", "Nội dung hỗ trợ hiểu và quyết định."],
            ["Đánh giá với người dùng.", "Quan sát và đo (xem phần Cách đánh giá và Công thức).", "Bằng chứng phương án mới giảm tải."],
          ]}
        />
      </Section>

      <Section {...S.evaluate}>
        <Table
          head={["Cách đánh giá", "Đo gì", "Lưu ý"]}
          widths={[380]}
          rows={[
            {
              icon: "clipboard-check",
              cells: ["Thang tự đánh giá sau tác vụ (ví dụ NASA-TLX, câu hỏi độ khó một câu)", "Cảm nhận của người dùng về mức nỗ lực.", "Dễ làm; là cảm nhận, không phải đo trực tiếp."],
            },
            { icon: "hourglass", cells: ["Chỉ số hiệu suất (thời gian, lỗi, tỷ lệ hoàn thành)", "Hệ quả của tải cao.", "Bị ảnh hưởng bởi nhiều yếu tố khác ngoài tải."] },
            { icon: "split", cells: ["Tác vụ phụ (dual-task)", "Hiệu suất ở một tác vụ phụ giảm khi tác vụ chính đòi hỏi nhiều.", "Chủ yếu dùng trong nghiên cứu."] },
            { icon: "eye", cells: ["Chỉ số sinh lý (đồng tử, nhịp tim, eye tracking)", "Phản ứng cơ thể khi nỗ lực trí óc.", "Cần thiết bị và chuyên môn."] },
            { icon: "chat", cells: ["Quan sát định tính", "Ngập ngừng, quay lại, lời nghĩ to.", "Gợi ý vị trí gây tải, không định lượng."] },
          ]}
        />
      </Section>

      <Section
        {...S.maths}
        intro="Phần này minh họa cách so sánh tải nhận thức mà người dùng cảm nhận được giữa hai phương án, bằng NASA-TLX, một thang đo phổ biến do NASA phát triển (Hart & Staveland, 1988)."
      >
        <Subhead icon="target">Xác định tiêu chí trước khi đo</Subhead>
        <InfoGrid
          cols={3}
          items={[
            ["gauge", "Chỉ số chính", "Điểm Raw TLX (bản không trọng số) sau tác vụ đặt lịch."],
            ["hourglass", "Chỉ số phụ", "Thời gian tác vụ, số lỗi."],
            ["rotate", "Cách đo", "Mỗi người làm tác vụ trên cả hai phương án, thứ tự đổi ngẫu nhiên giữa các người để tránh việc làm lần hai dễ hơn chỉ vì đã quen."],
          ]}
        />
        <Subhead icon="sigma">Công thức</Subhead>
        <P>NASA-TLX có sáu thang, mỗi thang 0–100:</P>
        <Table
          head={["Thang", "Hỏi về"]}
          widths={[380]}
          rows={[
            { cells: ["Nhu cầu trí óc (mental demand)", "Phải suy nghĩ, ghi nhớ, tính toán nhiều không."] },
            { cells: ["Nhu cầu thể chất (physical demand)", "Phải thao tác nhiều không."] },
            { cells: ["Áp lực thời gian (temporal demand)", "Có cảm thấy bị vội không."] },
            { highlight: true, cells: ["Hiệu suất (performance)", "Tự đánh giá làm tốt đến đâu. Lưu ý: điểm càng cao nghĩa là tự thấy làm càng kém."] },
            { cells: ["Nỗ lực (effort)", "Phải cố gắng đến mức nào."] },
            { cells: ["Mức bực bội (frustration)", "Có thấy khó chịu, căng thẳng không."] },
          ]}
        />
        <div className="flex gap-4">
          <Formula
            label="Điểm Raw TLX của một người"
            formula="Tổng điểm sáu thang ÷ 6"
            note="Bản gốc có thêm bước tính trọng số cho từng thang; bản không trọng số (raw) được dùng phổ biến vì đơn giản hơn."
          />
          <Formula label="Mức giảm của một người" formula="Điểm phương án A − Điểm phương án B" />
          <Formula label="Mức giảm trung bình" formula="Tổng mức giảm của mọi người ÷ Số người" />
        </div>
        <Subhead icon="bar-chart">Ví dụ thay số</Subhead>
        <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật.</Callout>
        <Formula
          label="Một người tham gia, phương án A (form một trang dài)"
          formula="(85 + 10 + 65 + 50 + 80 + 82) ÷ 6 = 372 ÷ 6 = 62,0"
          note="Sáu thang lần lượt 85, 10, 65, 50, 80, 82."
        />
        <P>Tám người tham gia, cả hai phương án (B: form chia bước, điền sẵn thông tin đã biết):</P>
        <Table
          head={["Người", "Điểm A", "Điểm B", "Mức giảm (A − B)"]}
          rows={[
            { cells: ["1", "62", "45", "17"] },
            { cells: ["2", "55", "40", "15"] },
            { cells: ["3", "71", "52", "19"] },
            { cells: ["4", "48", "38", "10"] },
            { cells: ["5", "66", "50", "16"] },
            { cells: ["6", "59", "47", "12"] },
            { cells: ["7", "70", "55", "15"] },
            { cells: ["8", "53", "41", "12"] },
            { highlight: true, cells: ["Trung bình", "60,5", "46,0", "14,5"] },
          ]}
        />
        <Formula label="Mức giảm trung bình" formula="(17 + 15 + 19 + 10 + 16 + 12 + 15 + 12) ÷ 8 = 116 ÷ 8 = 14,5 điểm" />

        <Subhead icon="shield-alert">Kiểm tra độ tin cậy của kết quả</Subhead>
        <P>Nhập tám mức giảm vào công cụ tính khoảng tin cậy cho trung bình:</P>
        <Table head={["Nhập vào công cụ", "Kết quả"]} widths={[560]} rows={[{ cells: ["17, 15, 19, 10, 16, 12, 15, 12 (mức tin cậy 95%)", "Sai số ≈ 2,5 điểm"] }]} />
        <Formula label="Khoảng tin cậy" formula="14,5 ± 2,5 → từ khoảng 12,0 đến 17,0 điểm" />
        <div className="flex gap-4">
          <Callout tone="good" title="Cách đọc đúng">
            Mọi người tham gia đều thấy B ít nặng nề hơn A, và khoảng tin cậy của mức giảm không chứa 0. Dữ liệu ủng hộ việc B làm giảm tải nhận thức cảm nhận được khoảng 12–17
            điểm trên thang 100. Sai số nhỏ dù chỉ có 8 người, vì mức giảm của mọi người khá giống nhau.
          </Callout>
          <Callout tone="bad" title="Cách đọc sai">
            “B giảm 24% tải nhận thức.” Raw TLX là thang cảm nhận; tính phần trăm trên thang này không có ý nghĩa như đo lường vật lý. Cũng cần xem thời gian và lỗi để biết hiệu
            suất có cải thiện theo không.
          </Callout>
        </div>

        <Subhead icon="clipboard-check">Điều kiện để kết quả đáng tin</Subhead>
        <InfoGrid
          items={[
            ["rotate", "Đổi thứ tự ngẫu nhiên", "Thứ tự hai phương án được đổi ngẫu nhiên giữa những người tham gia."],
            ["hourglass", "Hỏi ngay sau tác vụ", "Khi trải nghiệm còn mới."],
            ["book", "Hiểu từng thang", "Đặc biệt thang “hiệu suất” có chiều ngược."],
            ["analytics", "Kèm chỉ số hành vi", "Báo cáo cùng thời gian và lỗi."],
          ]}
        />

        <Subhead icon="split">Quy tắc ra quyết định</Subhead>
        <Table
          head={["Kết quả", "Quyết định"]}
          widths={[560]}
          rows={[
            { icon: "check-circle", cells: ["Tải cảm nhận giảm rõ, thời gian và lỗi không xấu đi", "Chọn phương án mới."] },
            { icon: "alert", cells: ["Tải cảm nhận giảm nhưng lỗi tăng", "Xem lại; có thể đơn giản hóa đã che mất thông tin cần thiết."] },
            { icon: "binoculars", cells: ["Không khác biệt rõ", "Xem quan sát định tính để tìm nguồn tải chưa được xử lý."] },
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Tác vụ chính và thông tin cần thiết ở mỗi bước.", "Phương án thiết kế cần đánh giá.", "Thang đo và kế hoạch kiểm thử."]}
          outputs={["Danh sách nguồn tải ngoại lai và cách xử lý.", "Thiết kế đã giảm tải.", "Bằng chứng từ kiểm thử (tải cảm nhận, thời gian, lỗi)."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối luồng đặt lịch tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard
          icon="file"
          title="Bối cảnh"
          body="Form đặt lịch hiện có 14 trường trên một trang, yêu cầu nhập lại mã dịch vụ từ trang trước, và hiển thị lịch dạng bảng nhỏ khó đọc trên mobile."
        />
        <CheckCard
          icon="alert"
          title="Nguồn tải ngoại lai tìm được"
          mark="•"
          items={["Phải nhớ mã dịch vụ từ trang trước.", "Mọi trường hiển thị cùng lúc, kể cả trường không bắt buộc.", "Lịch hiển thị cả tháng, phải tự tìm ngày còn trống."]}
        />
        <div className="flex gap-4">
          <InfoCard
            icon="check-circle"
            tone="fill"
            title="Thay đổi"
            className="flex-1"
            body="Mang dịch vụ đã chọn sang form tự động; chia form thành ba bước có tiêu đề; chỉ hiển thị các ngày còn trống, gợi ý khung giờ gần nhất."
          />
          <InfoCard
            icon="gauge"
            title="Đánh giá"
            className="flex-1"
            body="Kiểm thử within-subjects với NASA-TLX, thời gian và số lỗi, như phần Công thức và ví dụ tính."
          />
        </div>
        <Callout tone="note" icon="briefcase">
          Đây là kế hoạch minh họa, chưa phải kết quả thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            [
              "Áp “quy tắc 7 ± 2” cho số mục menu",
              "Con số của Miller nói về trí nhớ ngắn hạn khi phải ghi nhớ, không phải số lựa chọn người dùng nhìn thấy.",
              "Thiết kế theo nhận diện, nhóm và phân cấp; kiểm thử với người dùng.",
            ],
            ["Giảm tải bằng cách ẩn thông tin quan trọng", "Người dùng quyết định sai hoặc phải đi tìm.", "Chỉ ẩn thứ không cần cho quyết định hiện tại."],
            ["Chia quá nhiều bước", "Mỗi bước thêm một lần chờ và định hướng lại.", "Chia theo nhóm ý nghĩa, không chia vụn."],
            ["Coi tối giản thị giác là giảm tải", "Giao diện trông gọn nhưng nhãn mơ hồ vẫn bắt người dùng đoán.", "Giảm tải ở nội dung và tương tác, không chỉ ở hình thức."],
            ["Bỏ qua người dùng thành thạo", "Họ có thể cần mật độ thông tin cao hơn.", "Cung cấp lối tắt, chế độ nâng cao."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Trọng tâm", "Quan hệ với Cognitive Load"]}
          widths={[300]}
          rows={[
            { icon: "component", highlight: true, cells: ["Cognitive Load", "Nỗ lực trí óc khi xử lý thông tin.", "—"] },
            { icon: "lightbulb", cells: ["Mental Model", "Cách người dùng hiểu hệ thống hoạt động.", "Giao diện khớp mô hình tư duy thì giảm tải."] },
            { icon: "eye", cells: ["Visual Hierarchy", "Thứ tự người dùng nhận thấy các yếu tố.", "Phân cấp rõ giảm tải ngoại lai."] },
            {
              icon: "gauge",
              cells: ["Customer Effort Score", "Mức nỗ lực khách cảm nhận khi giải quyết việc với tổ chức.", "Rộng hơn, gồm cả nỗ lực thể chất, thời gian, nhiều kênh."],
            },
            { icon: "check-circle", cells: ["Usability", "Hiệu quả, hiệu suất và hài lòng khi dùng.", "Tải nhận thức cao thường làm giảm usability."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <ChecklistColumn
          icon="clipboard-check"
          title="Rà soát thiết kế"
          items={[
            "Người dùng không phải nhớ thông tin từ màn hình này sang màn hình khác.",
            "Thông tin cần cho quyết định được đặt cạnh nhau.",
            "Nhãn dùng từ ngữ của người dùng.",
            "Form dài được chia nhóm hoặc chia bước hợp lý.",
            "Có giá trị mặc định và điền sẵn khi hợp lý.",
            "Dùng mẫu tương tác quen thuộc.",
            "Thông báo lỗi nêu rõ cách sửa, đặt tại chỗ.",
            "Đã kiểm thử với người dùng, kèm đo cảm nhận và hiệu suất.",
          ]}
        />
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Mental Model", "Mô hình tư duy", "Giao diện khớp mô hình tư duy giúp giảm tải."],
            ["Visual Hierarchy", "Phân cấp thị giác", "Công cụ giảm tải ngoại lai."],
            ["Microcopy", "Vi văn bản", "Nhãn và thông báo rõ ràng giảm việc phải đoán."],
            ["Accessibility", "Khả năng tiếp cận", "Nguyên tắc “hiểu được” và nhu cầu nhận thức."],
            ["Customer Effort Score", "Điểm nỗ lực khách hàng", "Đo nỗ lực ở phạm vi rộng hơn giao diện."],
            ["Confidence Intervals", "Khoảng tin cậy", "Cách đọc mức giảm tải trung bình."],
            ["Usability Testing", "Kiểm thử khả năng sử dụng", "Cách quan sát và đo tải nhận thức."],
          ]}
        />
      </Section>
    </div>
  );
}

export const COGNITIVE_LOAD: Article = {
  slug: "cognitive-load",
  version: 1,
  term: "Cognitive Load",
  fn: 4,
  vi: "Tải nhận thức",
  kind: "Nguyên tắc / khái niệm",
  definition: "Cognitive load là lượng nỗ lực trí óc mà một người phải bỏ ra để xử lý thông tin và hoàn thành một tác vụ.",
  definitionMore:
    "Trí nhớ làm việc (working memory) của con người chỉ giữ và xử lý được một lượng thông tin nhỏ cùng lúc. Khi giao diện bắt người dùng ghi nhớ, so sánh, tìm kiếm hay suy đoán quá nhiều, họ chậm lại, mắc lỗi hoặc bỏ cuộc. Thiết kế tốt giảm phần tải không cần thiết để người dùng dồn sức cho chính việc họ muốn làm.",
  oneLine: "Lượng nỗ lực trí óc người dùng phải bỏ ra để xử lý thông tin và hoàn thành tác vụ.",
  glance: [
    ["~4", "Cụm thông tin trí nhớ làm việc giữ được"],
    ["3", "Loại tải: nội tại, ngoại lai, liên quan"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Mental workload (khi đo trong nghiên cứu về hiệu suất con người)"] },
    { label: "Nhóm chính", items: ["Nền tảng và nguyên tắc"] },
    { label: "Thẻ phụ", items: ["Cấu trúc và thiết kế", "Đo lường và phân tích"] },
    {
      label: "Lưu ý tên gọi",
      items: ["Bắt nguồn từ Cognitive Load Theory trong tâm lý học giáo dục. Trong UX thường dùng với nghĩa hẹp hơn: lượng nỗ lực trí óc mà giao diện đòi hỏi."],
    },
  ],
  sections: SECTIONS,
  Body,
};
