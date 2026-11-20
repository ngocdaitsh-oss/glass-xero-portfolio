"use client";

import { Blk, T } from "./edit";
import { CheckCards, Formula, InfoGrid, InOutCards, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Stat, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Diary Study — copy from ux-glossary/diary-study.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "parts", title: "Thành phần của một diary study", icon: "component" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "recruit", title: "Tuyển người tham gia và thời gian nghiên cứu", icon: "users" },
  { id: "analysis", title: "Thu thập và phân tích dữ liệu", icon: "sigma" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các phương pháp gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** Two weeks between the kick-off and the closing interview: irregular event entries above, one entry every evening below. */
function DiaryTimeline() {
  const days = 14;
  const events = [1.3, 2.1, 2.6, 5.2, 7.4, 8.1, 10.6, 12.3];
  const pct = (d: number) => `${(d / days) * 100}%`;
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="calendar" size={36} iconSize={18} radius={10} />
        <Eyebrow>Hai tuần ghi nhật ký</Eyebrow>
      </div>
      <div className="flex items-stretch gap-4">
        <span className="flex w-[120px] shrink-0 items-center justify-center rounded-[14px] bg-[var(--d-fill)] px-3 py-3 text-center text-[15px] leading-5 font-semibold text-white">
          Buổi mở đầu
        </span>
        <div className="flex flex-1 flex-col justify-center gap-3">
          <div className="flex items-center gap-4">
            <span className="w-[110px] shrink-0 font-mono text-[13px] tracking-[0.4px] text-[var(--w-muted)]">THEO SỰ KIỆN</span>
            <div className="relative h-8 flex-1 rounded-full bg-[var(--d-well)]">
              {events.map((d) => (
                <span key={d} className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--d-accent)]" style={{ left: pct(d) }} />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-[110px] shrink-0 font-mono text-[13px] tracking-[0.4px] text-[var(--w-muted)]">MỖI TỐI</span>
            <div className="relative h-8 flex-1 rounded-full bg-[var(--d-well)]">
              {Array.from({ length: days }, (_, i) => (
                <span key={i} className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--d-soft)]" style={{ left: pct(i + 0.7) }} />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-[110px] shrink-0" />
            <div className="flex flex-1 justify-between font-mono text-[13px] text-[var(--w-muted)]">
              <span>Ngày 1</span>
              <span>Ngày 7</span>
              <span>Ngày 14</span>
            </div>
          </div>
        </div>
        <span className="flex w-[120px] shrink-0 items-center justify-center rounded-[14px] bg-[var(--d-fill)] px-3 py-3 text-center text-[15px] leading-5 font-semibold text-white">
          Phỏng vấn kết thúc
        </span>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Ghi theo sự kiện cho các chấm không đều; ghi theo khoảng thời gian cho các chấm đều đặn mỗi tối. Người nghiên cứu đọc ghi chép mỗi ngày và hỏi thêm khi cần.
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
            Phỏng vấn và usability test chỉ chụp được một khoảnh khắc. Nhiều trải nghiệm lại kéo dài và thay đổi theo thời gian: một người cân nhắc dịch vụ trong hai tuần, dùng ứng
            dụng thói quen mỗi sáng, hay gặp sự cố vào những lúc không đoán trước. Khi hỏi lại sau nhiều ngày, người dùng thường quên chi tiết hoặc kể lại một phiên bản đã được “làm
            gọn”.
          </P>
          <P strong>Diary study thu dữ liệu gần thời điểm sự việc xảy ra, trong bối cảnh thật, qua nhiều ngày.</P>
        </div>
        <Eyebrow>Diary study hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          minH={150}
          items={[
            ["split", "Hành trình thật diễn ra thế nào theo thời gian", "Các bước, khoảng nghỉ, điểm quay lại."],
            ["calendar", "Thói quen và tần suất sử dụng", "Khi nào, ở đâu, vì sao người dùng dùng hoặc bỏ dùng."],
            ["rotate", "Cảm nhận thay đổi ra sao", "Từ lần đầu đến khi quen, hoặc đến khi bỏ."],
            ["binoculars", "Điểm chạm ngoài tầm quan sát", "Những gì xảy ra ngoài sản phẩm (hỏi bạn bè, so sánh với đối thủ)."],
          ]}
        />
      </Section>

      <Section {...S.parts}>
        <Table
          head={["Thành phần", "Mô tả", "Ví dụ minh họa (giả định)"]}
          widths={[260]}
          rows={[
            { icon: "target", cells: ["Câu hỏi nghiên cứu", "Điều cần hiểu theo thời gian.", "Khách cân nhắc và quyết định đặt lịch tư vấn như thế nào trong hai tuần."] },
            { icon: "list", cells: ["Cách ghi (logging)", "Khi nào người tham gia ghi lại (xem bảng bên dưới).", "Ghi mỗi khi tìm hiểu về dịch vụ + một ghi chép ngắn mỗi tối."] },
            { icon: "file", cells: ["Hình thức ghi", "Văn bản, ảnh, ghi âm, video ngắn, ảnh chụp màn hình.", "Ứng dụng nhắn tin hoặc nền tảng diary study; cho phép gửi ảnh."] },
            { icon: "chat", cells: ["Câu hỏi hướng dẫn", "Gợi ý nội dung mỗi lần ghi.", "“Bạn vừa làm gì? Ở đâu? Bạn cảm thấy thế nào? Điều gì làm bạn phân vân?”"] },
            { icon: "calendar", cells: ["Thời gian nghiên cứu", "Số ngày hoặc tuần người tham gia ghi.", "Hai tuần."] },
            { icon: "users", cells: ["Phỏng vấn mở đầu và kết thúc", "Giới thiệu cách ghi; sau cùng hỏi sâu về các ghi chép.", "Buổi mở đầu 30 phút, buổi kết thúc 45 phút."] },
          ]}
        />
        <Subhead icon="hourglass">Ba cách ghi phổ biến</Subhead>
        <P>Theo NN/g, có ba cách quyết định khi nào người tham gia ghi, và nhiều nghiên cứu kết hợp chúng.</P>
        <Table
          head={["Cách ghi", "Khi nào ghi", "Phù hợp khi"]}
          widths={[320]}
          rows={[
            {
              icon: "check-circle",
              cells: ["Theo sự kiện (event-based)", "Mỗi khi một sự việc xác định xảy ra.", "Sự việc cần nghiên cứu rõ ràng (mỗi lần tìm hiểu dịch vụ, mỗi lần dùng tính năng)."],
            },
            { icon: "calendar", cells: ["Theo khoảng thời gian (interval-based)", "Vào thời điểm cố định (mỗi tối, mỗi ba ngày).", "Muốn theo dõi đều đặn, kể cả những ngày không có gì."] },
            {
              icon: "alert",
              cells: ["Theo tín hiệu (signal-based, experience sampling)", "Khi người nghiên cứu gửi tín hiệu nhắc vào thời điểm ngẫu nhiên.", "Muốn biết trạng thái tại những thời điểm bất kỳ trong ngày."],
            },
          ]}
        />
        <DiaryTimeline />
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "target",
              "Bối cảnh phù hợp",
              [
                "Hành vi hoặc trải nghiệm kéo dài nhiều ngày, nhiều tuần.",
                "Hành vi diễn ra rải rác, không đoán trước, khó quan sát trực tiếp.",
                "Muốn hiểu thói quen, sự thay đổi cảm nhận, quá trình làm quen với sản phẩm.",
                "Muốn hiểu hành trình qua nhiều kênh, kể cả ngoài sản phẩm.",
              ],
            ],
            [
              "eye",
              "Dấu hiệu nhận biết",
              [
                "Phỏng vấn cho câu trả lời chung chung vì người dùng không nhớ rõ.",
                "Dữ liệu cho thấy người dùng bỏ dở rồi quay lại sau nhiều ngày, nhưng không rõ chuyện gì xảy ra ở giữa.",
              ],
            ],
            [
              "clipboard-check",
              "Điều kiện cần",
              [
                "Người tham gia sẵn sàng và có động lực ghi đều đặn.",
                "Người nghiên cứu có thời gian theo dõi, nhắc và hỏi thêm hằng ngày.",
                "Công cụ ghi đơn giản, tiện trên điện thoại.",
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
            { icon: "play-circle", cells: ["Cần đánh giá độ dễ dùng của một giao diện", "Người tham gia khó tự mô tả chi tiết thao tác.", "Usability testing."] },
            { icon: "hourglass", cells: ["Hành vi diễn ra trong một lần, ngắn", "Không cần theo dõi nhiều ngày.", "Phỏng vấn, contextual inquiry."] },
            { icon: "bar-chart", cells: ["Cần số liệu đại diện về tần suất, tỷ lệ", "Số người ít, dữ liệu tự báo cáo.", "Analytics, khảo sát."] },
            { icon: "users", cells: ["Không có ngân sách giữ chân người tham gia", "Người tham gia bỏ giữa chừng.", "Rút ngắn thời gian; dùng phương pháp khác."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định câu hỏi và thời gian.", "Chọn khoảng thời gian đủ để hành vi cần nghiên cứu xảy ra vài lần.", "Câu hỏi nghiên cứu, thời gian nghiên cứu."],
            ["Thiết kế cách ghi và câu hỏi hướng dẫn.", "Chọn cách ghi (sự kiện, khoảng thời gian, tín hiệu); viết câu hỏi ngắn, cụ thể.", "Hướng dẫn ghi."],
            [
              "Chạy thử (pilot).",
              "Thử với một hai người trong vài ngày để kiểm tra hướng dẫn, công cụ và tần suất hành vi thực tế.",
              "Hướng dẫn và thời gian đã điều chỉnh.",
            ],
            ["Tuyển người tham gia và buổi mở đầu.", "Giải thích mục tiêu, cách ghi, cho ví dụ một ghi chép tốt.", "Người tham gia sẵn sàng."],
            ["Theo dõi trong suốt nghiên cứu.", "Đọc ghi chép hằng ngày; nhắc người ghi thưa; hỏi thêm khi ghi chép chưa rõ.", "Dữ liệu ghi chép đầy đủ hơn."],
            ["Phỏng vấn kết thúc.", "Hỏi sâu về các ghi chép quan trọng.", "Ghi chép phỏng vấn."],
            ["Phân tích.", "Gom nhận định (affinity diagram), sắp theo thời gian để thấy hành trình và thay đổi.", "Nhận định, journey map theo thời gian."],
          ]}
        />
      </Section>

      <Section {...S.recruit}>
        <P>
          Diary study là phương pháp định tính, nên không có công thức cỡ mẫu. Số người tham gia dựa trên độ đa dạng của người dùng cần hiểu, thường từ khoảng mười người trở lên để
          còn đủ dữ liệu khi có người bỏ giữa chừng.
        </P>
        <div className="flex gap-4">
          <InfoCard tone="fill" icon="users" title="Khoảng 10 người trở lên" body="Để còn đủ dữ liệu khi có người bỏ giữa chừng." className="flex-1" />
          <InfoCard
            icon="calendar"
            title="Thời gian nghiên cứu"
            body="NN/g không đưa ra một con số cố định. Thời gian phụ thuộc câu hỏi nghiên cứu và tần suất hành vi xảy ra. Các ví dụ của NN/g dùng khoảng thời gian ghi từ một đến ba tuần."
            className="flex-1"
          />
        </div>
        <P>Nên chạy thử trước để biết hành vi thường xảy ra bao lâu một lần.</P>
        <Callout tone="scenario" title="Ví dụ lập luận (giả định)">
          Khách thường cân nhắc dịch vụ tư vấn trong khoảng một đến hai tuần → chọn hai tuần để bao trọn giai đoạn cân nhắc.
        </Callout>
      </Section>

      <Section {...S.analysis}>
        <Subhead icon="gauge">Chỉ số theo dõi trong quá trình nghiên cứu</Subhead>
        <P>Hai chỉ số đơn giản giúp người nghiên cứu biết dữ liệu có đủ không.</P>
        <Formula label="Tỷ lệ duy trì" formula="Số người còn ghi đến ngày cuối ÷ Số người bắt đầu" />
        <Formula label="Số ghi chép trung bình mỗi người" formula="Tổng số ghi chép ÷ Số người bắt đầu" />
        <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật. 12 người bắt đầu; đến ngày cuối còn 10 người ghi; tổng cộng 168 ghi chép.</Callout>
        <div className="flex gap-4">
          <Stat fill value="≈ 83%" label="Tỷ lệ duy trì" note="10 ÷ 12" />
          <Stat value="14" label="Ghi chép mỗi người" note="168 ÷ 12, khoảng một ghi chép mỗi ngày trong hai tuần" />
        </div>
        <Callout tone="note" title="Cách dùng">
          Đây là chỉ số chất lượng dữ liệu, không phải kết quả nghiên cứu. Nếu tỷ lệ duy trì giảm nhanh trong mấy ngày đầu, xem lại độ dài câu hỏi, công cụ ghi hoặc cách nhắc.
        </Callout>
        <Subhead icon="analytics">Phân tích</Subhead>
        <Table
          head={["Bước", "Hoạt động", "Đầu ra"]}
          widths={[260]}
          rows={[
            { icon: "pencil", cells: ["Đọc và gắn nhãn", "Gắn nhãn chủ đề, cảm xúc, điểm chạm cho từng ghi chép.", "Ghi chép có nhãn."] },
            { icon: "component", cells: ["Gom nhóm", "Gom nhận định bằng affinity diagram.", "Chủ đề chính."] },
            { icon: "calendar", cells: ["Sắp theo thời gian", "Đặt ghi chép của từng người lên đường thời gian.", "Hành trình cá nhân, điểm thay đổi."] },
            { icon: "users", cells: ["So sánh giữa người", "Tìm mẫu hình chung và khác biệt.", "Nhóm hành vi, journey map."] },
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["chat", "Dữ liệu tự báo cáo", "Người tham gia chọn ghi gì, có thể bỏ qua chi tiết họ thấy không quan trọng hoặc ngại chia sẻ."],
            ["eye", "Việc ghi chép có thể làm thay đổi hành vi", "Người tham gia chú ý nhiều hơn đến điều được hỏi."],
            ["hourglass", "Mệt mỏi theo thời gian", "Ghi chép thường ngắn dần về cuối."],
            ["bar-chart", "Không đại diện về mặt thống kê", "Cho biết hành trình diễn ra thế nào, không cho biết bao nhiêu người như vậy."],
          ]}
          last={["users", "Người bỏ giữa chừng có thể khác người ở lại", "Ví dụ người mất hứng thú với sản phẩm cũng là người dễ bỏ ghi."]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={[
            "Câu hỏi nghiên cứu và thời gian nghiên cứu.",
            "Hướng dẫn ghi, câu hỏi gợi ý, công cụ ghi.",
            "Người tham gia và phần thưởng phù hợp cho nhiều ngày tham gia.",
            "Thời gian theo dõi hằng ngày của người nghiên cứu.",
          ]}
          outputs={["Ghi chép theo thời gian (văn bản, ảnh, ghi âm).", "Nhận định đã tổng hợp.", "Hành trình theo thời gian, điểm thay đổi cảm nhận.", "Cơ hội thiết kế."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <div className="flex gap-4">
          <InfoCard
            icon="analytics"
            title="Bối cảnh"
            className="flex-1"
            body="Analytics cho thấy nhiều khách xem trang dịch vụ nhiều lần trong một đến hai tuần rồi mới đặt lịch, hoặc không bao giờ đặt. Nhóm không biết điều gì xảy ra giữa các lần truy cập."
          />
          <InfoCard
            icon="calendar"
            title="Cách áp dụng"
            className="flex-1"
            body="Diary study hai tuần với 12 người đang có ý định tìm dịch vụ tư vấn. Ghi theo sự kiện (mỗi khi tìm hiểu về dịch vụ, ở bất kỳ đâu) và một ghi chép ngắn mỗi tối."
          />
        </div>
        <CheckCards
          mark="•"
          groups={[
            [
              "binoculars",
              "Phát hiện (giả định)",
              [
                "Nhiều người hỏi ý kiến người thân sau lần xem đầu tiên; họ cần một liên kết dễ chia sẻ có thông tin chi phí.",
                "Người tham gia so sánh với hai, ba nơi khác và ghi chép lại bằng ảnh chụp màn hình.",
                "Cảm xúc lo lắng tăng lên vào những ngày gần quyết định, xoay quanh câu hỏi “có đáng tiền không?”.",
              ],
            ],
          ]}
        />
        <InfoCard
          icon="lightbulb"
          tone="fill"
          title="Cơ hội thiết kế"
          body="Trang tóm tắt dịch vụ dễ chia sẻ; nêu rõ chi phí và những gì nhận được; nội dung trả lời câu hỏi “có đáng không” bằng ví dụ tình huống cụ thể."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Câu hỏi hướng dẫn quá dài", "Người tham gia mệt, bỏ ghi.", "Câu hỏi ngắn, cho phép trả lời bằng ảnh hoặc ghi âm."],
            ["Không chạy thử", "Thời gian quá ngắn hoặc hướng dẫn khó hiểu.", "Chạy thử với một hai người trước."],
            ["Không theo dõi hằng ngày", "Phát hiện quá muộn rằng người tham gia ghi sai hoặc bỏ.", "Đọc ghi chép mỗi ngày, nhắc và hỏi thêm."],
            ["Thời gian không khớp với tần suất hành vi", "Hành vi chưa kịp xảy ra, hoặc nghiên cứu kéo dài vô ích.", "Chọn thời gian dựa trên tần suất thực tế."],
            ["Bỏ phỏng vấn kết thúc", "Mất cơ hội hiểu sâu những ghi chép quan trọng.", "Luôn có buổi phỏng vấn kết thúc."],
            ["Báo cáo tần suất như số liệu đại diện", "Dữ liệu tự báo cáo, số người ít.", "Dùng để hiểu mẫu hình, không để đo tỷ lệ."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Phương pháp", "Cách làm", "Trả lời câu hỏi", "Khi nào chọn"]}
          widths={[240]}
          rows={[
            {
              icon: "calendar",
              highlight: true,
              cells: ["Diary Study", "Người tham gia tự ghi lại trong nhiều ngày.", "“Trải nghiệm diễn ra và thay đổi thế nào theo thời gian?”", "Hành vi kéo dài, rải rác."],
            },
            {
              icon: "eye",
              cells: ["Contextual Inquiry", "Người nghiên cứu quan sát và hỏi tại chỗ, một buổi.", "“Công việc thật diễn ra thế nào?”", "Hành vi xảy ra trong một khoảng thời gian quan sát được."],
            },
            {
              icon: "rotate",
              cells: ["Longitudinal Study", "Nghiên cứu cùng nhóm người qua thời gian bằng nhiều cách.", "“Điều gì thay đổi theo thời gian?”", "Diary study là một dạng; có thể đo lặp lại bằng khảo sát."],
            },
            { icon: "chat", cells: ["User Interview", "Hỏi một lần về trải nghiệm đã qua.", "“Người dùng nhớ và nghĩ gì?”", "Cần hiểu động cơ, quan điểm nhanh."] },
            {
              icon: "analytics",
              cells: ["Clickstream Analysis", "Dữ liệu hành vi tự động trên sản phẩm.", "“Người dùng làm gì trên sản phẩm?”", "Bổ sung cho diary study ở phần hành vi trong sản phẩm."],
            },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Chuẩn bị"
            items={[
              "Câu hỏi nghiên cứu cần theo dõi theo thời gian.",
              "Thời gian nghiên cứu khớp với tần suất hành vi.",
              "Cách ghi phù hợp (sự kiện, khoảng thời gian, tín hiệu).",
              "Câu hỏi hướng dẫn ngắn, có ví dụ ghi chép tốt.",
              "Đã chạy thử.",
            ]}
          />
          <ChecklistColumn icon="calendar" title="Trong nghiên cứu" items={["Đọc ghi chép hằng ngày.", "Theo dõi tỷ lệ duy trì và số ghi chép.", "Nhắc và hỏi thêm khi cần."]} />
          <ChecklistColumn
            icon="analytics"
            title="Sau nghiên cứu"
            items={["Có phỏng vấn kết thúc.", "Phân tích theo cả chủ đề và thời gian.", "Ghi rõ giới hạn của dữ liệu tự báo cáo."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Longitudinal Study", "Nghiên cứu dài hạn", "Nhóm nghiên cứu theo thời gian mà diary study thuộc về."],
            ["Contextual Inquiry", "Phỏng vấn tại bối cảnh", "Thay thế khi hành vi quan sát được trong một buổi."],
            ["Field Study", "Nghiên cứu thực địa", "Nghiên cứu trong bối cảnh thật khi người nghiên cứu có thể có mặt."],
            ["Customer Journey", "Hành trình khách hàng", "Diary study cho thấy hành trình thật theo thời gian."],
            ["Affinity Diagram", "Sơ đồ tương đồng", "Cách tổng hợp ghi chép."],
            ["Attitudinal Methods", "Phương pháp nghiên cứu thái độ", "Diary study thu cả hành vi tự báo cáo và cảm nhận."],
            ["Clickstream Analysis", "Phân tích luồng nhấp", "Dữ liệu hành vi bổ sung trong sản phẩm."],
            ["Onboarding", "Làm quen người dùng", "Chủ đề phù hợp để nghiên cứu bằng nhật ký."],
          ]}
        />
      </Section>
    </div>
  );
}

export const DIARY_STUDY: Article = {
  slug: "diary-study",
  version: 1,
  term: "Diary Study",
  fn: 1,
  vi: "Nghiên cứu nhật ký",
  kind: "Phương pháp nghiên cứu / kiểm thử",
  definition:
    "Diary study là phương pháp nghiên cứu định tính, trong đó người tham gia tự ghi lại hoạt động, suy nghĩ và cảm xúc của mình liên quan đến một sản phẩm hay một việc cụ thể, trong một khoảng thời gian dài, ngay trong cuộc sống thật của họ.",
  definitionMore:
    "Nhờ ghi lại gần thời điểm sự việc xảy ra, phương pháp này nắm bắt được những trải nghiệm diễn ra rải rác, thay đổi theo thời gian, hoặc xảy ra ở nơi người nghiên cứu không thể có mặt.",
  oneLine: "Người tham gia tự ghi lại trải nghiệm trong nhiều ngày để thấy hành vi và cảm nhận thay đổi theo thời gian.",
  glance: [
    ["3", "Cách ghi: sự kiện, khoảng thời gian, tín hiệu"],
    ["1–3", "Tuần ghi trong các ví dụ của NN/g"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Diary method", "Experience sampling"] },
    { label: "Nhóm chính", items: ["Nghiên cứu khám phá"] },
    { label: "Thẻ phụ", items: ["Tổng hợp và mô hình hóa"] },
    {
      label: "Lưu ý tên gọi",
      items: ["Là phương pháp nghiên cứu dài hạn. Khác với longitudinal study nói chung, vốn nghiên cứu theo thời gian bằng nhiều cách, kể cả đo lặp lại."],
    },
  ],
  sections: SECTIONS,
  Body,
};
