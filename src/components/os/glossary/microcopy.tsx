"use client";

import { Blk, T } from "./edit";
import { CheckCards, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Microcopy — copy from ux-glossary/microcopy.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "types", title: "Các loại microcopy", icon: "component" },
  { id: "principles", title: "Nguyên tắc viết microcopy", icon: "book" },
  { id: "errors", title: "Thông báo lỗi", icon: "alert" },
  { id: "when", title: "Khi nào cần chú ý đặc biệt", icon: "check-circle" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "limits", title: "Giới hạn: khi nào microcopy chưa đủ", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các khái niệm gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

/** The booking form before and after the microcopy change, drawn as two simplified form mocks. */
function FormMock({ after }: { after: boolean }) {
  return (
    <div className="flex flex-1 flex-col gap-4 rounded-2xl bg-[var(--d-well)] p-6">
      <span className="font-mono text-[13px] tracking-[1px] text-[var(--w-muted)] uppercase">{after ? "Sau" : "Trước"}</span>
      <div className="flex flex-col gap-2">
        <span className={`text-[15px] leading-[22px] font-semibold ${after ? "text-[var(--d-accent)]" : ""}`}>
          {after ? "Số điện thoại — chỉ dùng để nhắc lịch, không dùng để quảng cáo" : "Số điện thoại *"}
        </span>
        <div className={`h-11 rounded-xl bg-[var(--w-card)] ${after ? "" : ""}`} />
        <span className={`text-[14px] leading-5 ${after ? "text-[var(--d-accent)]" : "text-[var(--d-bad)]"}`}>
          {after ? "Số điện thoại cần có 10 chữ số." : "Dữ liệu không hợp lệ"}
        </span>
      </div>
      <div className={`flex h-11 items-center justify-center rounded-xl text-[15px] font-semibold ${after ? "bg-[var(--d-ci)] text-white" : "bg-[var(--w-card)]"}`}>
        {after ? "Xác nhận đặt lịch" : "Gửi"}
      </div>
      <span className={`text-[14px] leading-5 ${after ? "text-[var(--d-accent)]" : "text-[var(--w-muted)]"}`}>
        {after ? "Đổi hoặc hủy miễn phí trước 24 giờ." : "(không có)"}
      </span>
    </div>
  );
}

function BeforeAfter() {
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="pencil" size={36} iconSize={18} radius={10} />
        <Eyebrow>Form đặt lịch trước và sau khi đổi microcopy</Eyebrow>
      </div>
      <div className="flex items-stretch gap-4">
        <FormMock after={false} />
        <FormMock after />
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Chữ màu xanh là bốn chỗ thay đổi: nhãn ô, thông báo lỗi, nhãn nút và lời trấn an cạnh nút.
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
            Người dùng thường dừng lại ở những khoảnh khắc nhỏ: “Bấm nút này có mất tiền không?”, “Vì sao cần số điện thoại?”, “Lỗi này là sao?”. Nếu không có câu trả lời ngay tại chỗ, họ
            do dự, đoán sai hoặc rời đi.
          </P>
          <P>
            Porter mô tả microcopy là chữ gắn với ngữ cảnh, trả lời một băn khoăn cụ thể đúng lúc và giảm cảm giác phải cam kết. Ví dụ quen thuộc: dòng “Bạn có thể hủy đăng ký bất cứ lúc
            nào” cạnh nút đăng ký.
          </P>
        </div>
        <Eyebrow>Microcopy hỗ trợ</Eyebrow>
        <InfoGrid
          cols={3}
          minH={150}
          items={[
            ["list", "Người dùng biết phải làm gì", "Ở mỗi bước."],
            ["shield-alert", "Người dùng yên tâm", "Trước khi cam kết."],
            ["check-circle", "Người dùng sửa được lỗi", "Mà không cần hỗ trợ."],
          ]}
        />
      </Section>

      <Section {...S.types}>
        <Table
          head={["Loại", "Mục đích", "Ví dụ minh họa (giả định)"]}
          widths={[240]}
          rows={[
            { icon: "play-circle", cells: ["Nhãn nút", "Nói rõ điều sẽ xảy ra khi bấm.", "“Xác nhận đặt lịch” thay vì “Gửi”."] },
            { icon: "pencil", cells: ["Nhãn và gợi ý ô nhập", "Nói rõ cần nhập gì, định dạng nào.", "“Số điện thoại — để nhắc lịch trước 1 ngày”."] },
            { icon: "shield-alert", cells: ["Lời trấn an", "Giải đáp băn khoăn trước khi cam kết.", "“Bạn có thể đổi hoặc hủy lịch miễn phí trước 24 giờ.”"] },
            { icon: "alert", cells: ["Thông báo lỗi", "Nói rõ vấn đề và cách sửa.", "“Số điện thoại cần có 10 chữ số.”"] },
            { icon: "check-circle", cells: ["Xác nhận", "Cho biết thao tác đã xong và bước tiếp theo.", "“Đã đặt lịch. Chúng tôi đã gửi thông tin vào email của bạn.”"] },
            { icon: "file", cells: ["Trạng thái trống", "Hướng dẫn khi chưa có nội dung.", "“Bạn chưa có lịch hẹn nào. Đặt buổi tư vấn đầu tiên.”"] },
          ]}
        />
      </Section>

      <Section {...S.principles}>
        <Table
          head={["Nguyên tắc", "Ý nghĩa", "Chưa tốt", "Tốt hơn"]}
          widths={[220]}
          rows={[
            { icon: "eye", cells: ["Rõ hơn khéo", "Hiểu ngay quan trọng hơn hay.", "“Bắt đầu hành trình của bạn”", "“Đặt lịch tư vấn”"] },
            { icon: "chat", cells: ["Ngôn ngữ của người dùng", "Dùng từ người dùng dùng.", "“Khởi tạo phiên”", "“Đặt lịch”"] },
            { icon: "target", cells: ["Đúng lúc, đúng chỗ", "Đặt gần nơi người dùng cần.", "Chính sách hủy ở cuối trang", "Chính sách hủy ngay cạnh nút đặt"] },
            { icon: "play-circle", cells: ["Nói rõ điều sẽ xảy ra", "Người dùng biết kết quả trước khi bấm.", "“Tiếp tục”", "“Tiếp tục đến thanh toán”"] },
            { icon: "rotate", cells: ["Nhất quán", "Cùng một điều thì cùng một từ.", "“Buổi tư vấn” / “cuộc hẹn” / “phiên”", "Một từ thống nhất"] },
            { icon: "x", cells: ["Ngắn nhưng đủ", "Bỏ chữ thừa, giữ chữ cần.", "“Vui lòng nhấn vào nút bên dưới để có thể tiến hành xác nhận”", "“Xác nhận đặt lịch”"] },
          ]}
        />
      </Section>

      <Section {...S.errors}>
        <P>NN/g chia hướng dẫn về thông báo lỗi thành các nhóm:</P>
        <InfoGrid
          cols={3}
          items={[
            ["eye", "Dễ thấy", "Hiện gần chỗ xảy ra lỗi; dấu hiệu rõ, không chỉ dựa vào màu; mức độ hiển thị tương xứng với độ nghiêm trọng; không báo lỗi quá sớm khi người dùng đang nhập."],
            ["chat", "Truyền đạt", "Ngôn ngữ dễ hiểu; nói chính xác vấn đề; gợi ý cách sửa; giọng tích cực, không đổ lỗi cho người dùng."],
            ["check-circle", "Hiệu quả", "Ngăn lỗi dễ xảy ra; giữ lại dữ liệu người dùng đã nhập; giảm công sức sửa."],
          ]}
        />
        <Table
          head={["Chưa tốt", "Vì sao", "Tốt hơn"]}
          widths={[300]}
          rows={[
            { icon: "x", cells: ["“Lỗi 422”", "Mã kỹ thuật, không nói cách sửa.", "“Số điện thoại cần có 10 chữ số.”"] },
            { icon: "x", cells: ["“Dữ liệu không hợp lệ”", "Không nói chỗ nào, vì sao.", "“Ngày sinh cần theo dạng ngày/tháng/năm, ví dụ 05/09/1990.”"] },
            { icon: "x", cells: ["“Bạn đã nhập sai!”", "Đổ lỗi, giọng tiêu cực.", "“Email này chưa đúng định dạng. Kiểm tra lại dấu @ nhé.”"] },
            {
              icon: "x",
              cells: ["“Giờ không còn trống” (và xóa toàn bộ form)", "Mất dữ liệu, không gợi ý.", "“Giờ 9:00 vừa có người đặt. Giờ gần nhất còn trống: 10:00. Thông tin của bạn vẫn được giữ.”"],
            },
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
                "Bước cam kết: thanh toán, đặt lịch, đăng ký, cung cấp thông tin cá nhân.",
                "Form có nhiều ô nhập.",
                "Tình huống lỗi và trạng thái đặc biệt (trống, đang tải, thất bại).",
              ],
            ],
            [
              "eye",
              "Dấu hiệu nhận biết",
              [
                "Người dùng do dự lâu ở một nút (thấy qua session replay, usability test).",
                "Bộ phận hỗ trợ nhận câu hỏi mà câu trả lời lẽ ra nên có ngay trên giao diện.",
                "Tỷ lệ bỏ cao ở một bước của form.",
              ],
            ],
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Liệt kê các điểm người dùng có thể băn khoăn.", "Từ usability test, câu hỏi gửi hỗ trợ, dữ liệu bỏ dở.", "Danh sách điểm cần microcopy."],
            ["Viết microcopy cho từng điểm.", "Theo nguyên tắc: rõ, ngôn ngữ người dùng, đúng chỗ.", "Bản nháp."],
            ["Kiểm tra nhất quán.", "Dùng một bảng thuật ngữ chung.", "Microcopy thống nhất."],
            ["Kiểm tra với người dùng.", "Usability test; với thay đổi lớn có thể A/B test.", "Microcopy đã chỉnh."],
            ["Ghi vào hướng dẫn nội dung.", "", "Quy tắc dùng lại cho các màn hình khác."],
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          cols={3}
          items={[
            ["pencil", "Microcopy không sửa được thiết kế sai", "Một luồng rối cần thiết kế lại, không chỉ thêm chữ giải thích."],
            ["gauge", "Quá nhiều chữ cũng là vấn đề", "Thêm microcopy ở mọi nơi làm tăng tải nhận thức."],
            ["chat", "Microcopy phụ thuộc ngôn ngữ và văn hóa", "Cần xem lại khi dịch sang ngôn ngữ khác."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Các điểm băn khoăn từ nghiên cứu, dữ liệu hỗ trợ.", "Ngôn ngữ người dùng (từ phỏng vấn, focus group).", "Bảng thuật ngữ, giọng văn của sản phẩm."]}
          outputs={["Microcopy cho nút, ô nhập, lỗi, xác nhận, trạng thái.", "Hướng dẫn viết dùng lại."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard
          icon="component"
          title="Bối cảnh"
          body="Nhiều khách bỏ ở bước nhập số điện thoại trong form đặt lịch. Phỏng vấn ngắn cho thấy khách lo bị gọi điện bán hàng."
        />
        <Table
          head={["Vị trí", "Trước", "Sau"]}
          widths={[260]}
          rows={[
            { icon: "pencil", cells: ["Nhãn ô số điện thoại", "“Số điện thoại *”", "“Số điện thoại — chỉ dùng để nhắc lịch, không dùng để quảng cáo”"] },
            { icon: "play-circle", cells: ["Nút", "“Gửi”", "“Xác nhận đặt lịch”"] },
            { icon: "shield-alert", cells: ["Cạnh nút", "(không có)", "“Đổi hoặc hủy miễn phí trước 24 giờ.”"] },
            { icon: "alert", cells: ["Lỗi số điện thoại", "“Dữ liệu không hợp lệ”", "“Số điện thoại cần có 10 chữ số.”"] },
          ]}
        />
        <BeforeAfter />
        <InfoCard tone="fill" icon="check-circle" title="Kiểm tra" body="Usability test với 5 khách, rồi A/B test để đo tỷ lệ hoàn thành form." />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Nhãn nút chung chung (“OK”, “Gửi”)", "Người dùng không biết điều sẽ xảy ra.", "Nói rõ hành động."],
            ["Khéo nhưng khó hiểu", "Người dùng phải đoán.", "Ưu tiên rõ ràng."],
            ["Thông báo lỗi kỹ thuật", "Không giúp người dùng sửa.", "Nói vấn đề và cách sửa."],
            ["Không nhất quán từ ngữ", "Người dùng nghĩ đó là hai thứ khác nhau.", "Bảng thuật ngữ chung."],
            ["Dùng microcopy để vá thiết kế sai", "Vấn đề gốc vẫn còn.", "Sửa thiết kế."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Khái niệm", "Quan hệ với microcopy"]}
          widths={[300]}
          rows={[
            { icon: "file", cells: ["Content Design", "Khái niệm rộng: thiết kế mọi nội dung; microcopy là một phần."] },
            { icon: "pencil", cells: ["UX Writing", "Thường dùng gần nghĩa với việc viết microcopy."] },
            { icon: "chat", cells: ["Copywriting (marketing)", "Viết để thuyết phục, thu hút; microcopy viết để giúp thao tác."] },
            { icon: "lightbulb", cells: ["Mental Model", "Microcopy giúp sửa hiểu lầm về cách hệ thống hoạt động."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="pencil"
            title="Nội dung"
            items={["Nút nói rõ điều sẽ xảy ra.", "Ô nhập nói rõ cần gì và vì sao (khi thông tin nhạy cảm).", "Có lời trấn an ở bước cam kết.", "Thông báo lỗi nói vấn đề và cách sửa, không đổ lỗi."]}
          />
          <ChecklistColumn
            icon="clipboard-check"
            title="Hệ thống"
            items={["Dữ liệu đã nhập được giữ lại khi có lỗi.", "Từ ngữ nhất quán trên toàn sản phẩm.", "Đã kiểm tra với người dùng."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Content Design", "Thiết kế nội dung", "Khái niệm rộng hơn."],
            ["Mental Model", "Mô hình tư duy", "Microcopy giúp sửa hiểu lầm."],
            ["Heuristic Evaluation", "Đánh giá theo nguyên tắc kinh nghiệm", "Nguyên tắc 2 và 9 liên quan trực tiếp đến chữ trên giao diện."],
            ["Cognitive Load", "Tải nhận thức", "Chữ thừa làm tăng tải nhận thức."],
            ["A/B Testing", "Kiểm thử A/B", "Đo tác động của thay đổi microcopy."],
            ["Accessibility", "Khả năng truy cập", "Thông báo lỗi không chỉ dựa vào màu."],
          ]}
        />
      </Section>
    </div>
  );
}

export const MICROCOPY: Article = {
  slug: "microcopy",
  version: 1,
  term: "Microcopy",
  fn: 4,
  vi: "Vi văn bản",
  kind: "Nguyên tắc / khái niệm",
  definition:
    "Microcopy là những đoạn chữ rất ngắn trên giao diện (một từ, một cụm từ hay một câu) xuất hiện đúng lúc người dùng cần, để hướng dẫn thao tác, giải đáp băn khoăn hoặc giúp họ sửa lỗi.",
  definitionMore: "Dù ngắn, microcopy có thể ảnh hưởng lớn đến việc người dùng có tiếp tục hay bỏ đi.",
  oneLine: "Những đoạn chữ ngắn đúng lúc trên giao diện, giúp người dùng thao tác, yên tâm và sửa lỗi.",
  glance: [
    ["6", "Loại microcopy"],
    ["6", "Nguyên tắc viết"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["UX copy", "UI text (gần nghĩa)"] },
    { label: "Nhóm chính", items: ["Nội dung"] },
    { label: "Thẻ phụ", items: ["Nguyên tắc thiết kế"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "Microcopy là một phần của content design, tập trung vào những đoạn chữ rất ngắn gắn với thao tác: nhãn nút, gợi ý trong ô nhập, thông báo lỗi, xác nhận. Không phải văn bản quảng cáo.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
