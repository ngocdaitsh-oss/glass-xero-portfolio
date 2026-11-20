"use client";

import { Blk, T } from "./edit";
import { CheckCards, Formula, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Subhead, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Sentiment Analysis — copy from ux-glossary/sentiment-analysis.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "levels", title: "Các mức phân tích", icon: "component" },
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

/** Share of 600 answers per label, then the 100-answer hand check: 82 labels matched. */
function SentimentChart() {
  return (
    <Blk label="biểu đồ" className="g-card flex flex-col gap-8 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="chat" size={36} iconSize={18} radius={10} />
        <Eyebrow>Khía cạnh “đặt lịch”: 600 phản hồi</Eyebrow>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex h-12 overflow-hidden rounded-xl">
          <span className="flex items-center justify-center bg-[var(--d-fill)] font-mono text-[15px] font-semibold text-white" style={{ width: "35%" }}>
            35% tích cực
          </span>
          <span className="flex items-center justify-center bg-[var(--d-well)] font-mono text-[15px]" style={{ width: "25%" }}>
            25%
          </span>
          <span className="flex items-center justify-center bg-[var(--d-bad-soft)] font-mono text-[15px] font-semibold text-[var(--d-bad)]" style={{ width: "40%" }}>
            40% tiêu cực
          </span>
        </div>
        <span className="text-[15px] leading-[22px] text-[var(--w-muted)]">Cảm xúc ròng = 35 − 40 = −5 điểm</span>
      </div>
      <div className="flex items-start gap-8">
        <div className="grid shrink-0 grid-cols-10 gap-1.5">
          {Array.from({ length: 100 }, (_, i) => (
            <span key={i} className={`size-3.5 rounded-full ${i < 82 ? "bg-[var(--d-ci)]" : "bg-[var(--d-bad)]"}`} />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[16px] leading-6 font-semibold">Kiểm tra 100 phản hồi bằng tay</span>
          <span className="text-[15px] leading-[22px] text-[var(--w-secondary)]">82 nhãn của máy khớp với người đọc; 18 nhãn khác (chấm đỏ).</span>
          <span className="text-[15px] leading-[22px] text-[var(--w-secondary)]">Khoảng 1/5 nhãn có thể sai: đủ để thấy xu hướng lớn, chưa đủ để báo cáo chính xác từng điểm phần trăm.</span>
        </div>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Số liệu minh họa. Cảm xúc ròng là quy ước của nhóm, chỉ dùng để theo dõi xu hướng trong cùng nguồn dữ liệu và cùng công cụ.
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
            Một dịch vụ có thể nhận hàng nghìn phản hồi mỗi tháng: câu trả lời mở trong khảo sát NPS, đánh giá trên cửa hàng ứng dụng, tin nhắn hỗ trợ. Đọc hết bằng tay không khả thi; chỉ đọc
            vài phản hồi thì dễ bị ấn tượng bởi những câu gay gắt nhất.
          </P>
          <P strong>
            Sentiment analysis cho cái nhìn tổng quát và nhanh: tỷ lệ phản hồi tiêu cực có tăng không, chủ đề nào gắn với cảm xúc tiêu cực nhiều nhất.
          </P>
        </div>
        <Eyebrow>Sentiment analysis hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          cols={3}
          minH={150}
          items={[
            ["alert", "Chủ đề nào cần chú ý trước", "Gắn nhiều phản hồi tiêu cực."],
            ["analytics", "Cảm xúc thay đổi thế nào", "Sau một thay đổi sản phẩm."],
            ["filter", "Nên đọc kỹ phản hồi nào", "Lọc ra nhóm cần nghiên cứu sâu."],
          ]}
        />
      </Section>

      <Section {...S.levels}>
        <Table
          head={["Mức", "Phân tích gì", "Ví dụ minh họa (giả định)"]}
          widths={[260]}
          rows={[
            { icon: "file", cells: ["Cả văn bản", "Một phản hồi tích cực hay tiêu cực.", "“Buổi tư vấn rất hữu ích nhưng đặt lịch rất mệt.” → khó phân loại một nhãn."] },
            { icon: "list", cells: ["Từng câu", "Mỗi câu một nhãn.", "Câu 1 tích cực, câu 2 tiêu cực."] },
            { icon: "component", highlight: true, cells: ["Theo khía cạnh (aspect-based)", "Cảm xúc về từng khía cạnh.", "Chuyên gia: tích cực; đặt lịch: tiêu cực."] },
          ]}
        />
        <P>Với UX, phân tích theo khía cạnh thường hữu ích nhất, vì một phản hồi hay khen phần này và chê phần khác.</P>
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            ["target", "Bối cảnh phù hợp", ["Lượng phản hồi văn bản lớn.", "Cần theo dõi xu hướng theo thời gian.", "Cần lọc nhanh để chọn phản hồi đọc kỹ."]],
            ["eye", "Dấu hiệu nhận biết", ["Hàng trăm câu trả lời mở chưa ai đọc.", "Cần biết phản ứng của khách sau một thay đổi lớn."]],
            ["clipboard-check", "Điều kiện cần", ["Công cụ hỗ trợ ngôn ngữ của phản hồi (tiếng Việt có nhiều thách thức riêng).", "Người kiểm tra một mẫu kết quả bằng tay."]],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[360]}
          rows={[
            { icon: "file", cells: ["Ít phản hồi", "Đọc bằng tay nhanh và chính xác hơn.", "Đọc và gắn nhãn thủ công."] },
            { icon: "chat", cells: ["Cần hiểu vì sao", "Nhãn cảm xúc không giải thích nguyên nhân.", "Phân tích chủ đề, phỏng vấn."] },
            { icon: "alert", cells: ["Ngôn ngữ nhiều mỉa mai, tiếng lóng", "Máy dễ phân loại sai.", "Kiểm tra thủ công nhiều hơn."] },
            { icon: "target", cells: ["Quyết định quan trọng dựa trên một con số", "Kết quả là ước đoán.", "Kết hợp với dữ liệu khác."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định nguồn và câu hỏi.", "", "Tập văn bản, câu hỏi phân tích."],
            ["Làm sạch dữ liệu.", "Loại trùng, thư rác, thông tin cá nhân.", "Dữ liệu sẵn sàng."],
            ["Chạy phân tích.", "Tốt nhất theo khía cạnh.", "Nhãn cảm xúc cho từng phản hồi hoặc khía cạnh."],
            ["Kiểm tra một mẫu bằng tay.", "So nhãn của máy với nhãn của người.", "Tỷ lệ khớp."],
            ["Tổng hợp và đọc kỹ.", "Đọc phản hồi trong nhóm tiêu cực nhiều nhất.", "Chủ đề, nguyên nhân, đề xuất."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật. 600 câu trả lời mở trong khảo sát sau tư vấn, phân tích về khía cạnh “đặt lịch”.</Callout>
        <Subhead icon="bar-chart">Tỷ lệ từng nhóm</Subhead>
        <Formula label="Tỷ lệ nhóm" formula="Số phản hồi trong nhóm ÷ Tổng số phản hồi" note="Tích cực 210 ÷ 600 = 35%; trung lập 150 ÷ 600 = 25%; tiêu cực 240 ÷ 600 = 40%" />
        <Subhead icon="sigma">Cảm xúc ròng</Subhead>
        <Formula
          label="Cảm xúc ròng"
          formula="Tỷ lệ tích cực − Tỷ lệ tiêu cực"
          note="35 − 40 = −5 điểm. Cách tóm tắt đơn giản do nhóm tự quy ước; không phải chỉ số chuẩn có thể so với nơi khác."
        />
        <Subhead icon="check-circle">Kiểm tra độ chính xác của máy</Subhead>
        <P>Chọn ngẫu nhiên 100 phản hồi, người đọc tự gắn nhãn rồi so với nhãn của máy.</P>
        <Formula label="Tỷ lệ khớp" formula="Số phản hồi máy và người gắn giống nhau ÷ Số phản hồi được kiểm tra" note="82 ÷ 100 = 82%" />
        <SentimentChart />
        <Callout tone="note" title="Diễn giải">
          Khoảng 1/5 nhãn có thể sai. Kết quả dùng được để thấy xu hướng lớn, nhưng không nên báo cáo tỷ lệ chính xác đến từng điểm phần trăm. Xem các phản hồi máy gắn sai để biết loại câu
          nào máy hay nhầm (ví dụ câu mỉa mai, câu khen rồi chê).
        </Callout>
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["alert", "Máy dễ sai", "Với mỉa mai, phủ định, câu khen rồi chê."],
            ["chat", "Ngôn ngữ và văn hóa ảnh hưởng độ chính xác", "Công cụ huấn luyện chủ yếu bằng tiếng Anh có thể kém với tiếng Việt."],
            ["users", "Người viết phản hồi không đại diện", "Người rất hài lòng hoặc rất bực thường viết nhiều hơn."],
            ["list-search", "Nhãn cảm xúc không cho biết nguyên nhân", "Cần đọc kỹ để hiểu vì sao."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Văn bản phản hồi đã làm sạch.", "Công cụ phân tích hỗ trợ đúng ngôn ngữ.", "Người kiểm tra mẫu."]}
          outputs={["Tỷ lệ tích cực, trung lập, tiêu cực theo khía cạnh.", "Tỷ lệ khớp với nhãn của người.", "Chủ đề và phản hồi cần đọc kỹ."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard icon="component" title="Bối cảnh" body="Dịch vụ có 600 câu trả lời mở mỗi tháng từ khảo sát NPS." />
        <InfoCard
          icon="analytics"
          title="Kết quả (theo phần tính toán ở trên)"
          body="Ở khía cạnh “đặt lịch”, 40% phản hồi tiêu cực; ở khía cạnh “chuyên gia”, phần lớn tích cực. Tỷ lệ khớp với nhãn người đọc 82%."
        />
        <InfoCard icon="eye" title="Đọc kỹ" body="Nhóm đọc 50 phản hồi tiêu cực về đặt lịch. Chủ đề lặp lại: khó đổi lịch, không nhận được xác nhận." />
        <InfoCard
          tone="fill"
          icon="check-circle"
          title="Quyết định"
          body="Đưa hai vấn đề vào ưu tiên; theo dõi tỷ lệ tiêu cực về đặt lịch sau khi sửa, cùng nguồn dữ liệu và cùng công cụ."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Tin hoàn toàn nhãn của máy", "Máy có thể sai nhiều.", "Kiểm tra mẫu bằng tay."],
            ["Một nhãn cho cả phản hồi nhiều ý", "Mất thông tin khen/chê từng phần.", "Phân tích theo khía cạnh."],
            ["So sánh giữa hai công cụ khác nhau", "Cách gắn nhãn khác nhau.", "Giữ nguyên công cụ khi theo dõi xu hướng."],
            ["Dừng ở con số", "Không biết vì sao.", "Đọc kỹ phản hồi tiêu cực."],
            ["Để lộ thông tin cá nhân", "Rủi ro quyền riêng tư.", "Làm sạch trước khi phân tích."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Phương pháp", "Làm gì", "Khi nào chọn"]}
          widths={[300]}
          rows={[
            { icon: "chat", highlight: true, cells: ["Sentiment Analysis", "Gắn nhãn cảm xúc cho văn bản.", "Nhiều phản hồi, cần xu hướng cảm xúc."] },
            { icon: "list-search", cells: ["Phân tích chủ đề (thematic analysis)", "Tìm chủ đề trong văn bản, thường bằng người.", "Cần hiểu nội dung và nguyên nhân."] },
            { icon: "component", cells: ["Affinity Diagram", "Gom dữ liệu định tính thành nhóm.", "Dữ liệu vừa phải, phân tích cùng nhóm."] },
            { icon: "rotate", cells: ["Customer Feedback Loop", "Quy trình thu và hành động theo phản hồi.", "Sentiment analysis là một bước trong vòng này."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Chuẩn bị"
            items={["Có đủ nhiều phản hồi để cần phân tích tự động.", "Dữ liệu đã làm sạch, ẩn thông tin cá nhân.", "Công cụ hỗ trợ đúng ngôn ngữ."]}
          />
          <ChecklistColumn
            icon="analytics"
            title="Phân tích"
            items={["Phân tích theo khía cạnh khi có thể.", "Đã kiểm tra mẫu bằng tay và báo cáo tỷ lệ khớp.", "Đã đọc kỹ phản hồi tiêu cực để hiểu nguyên nhân."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Customer Feedback Loop", "Vòng phản hồi khách hàng", "Nguồn dữ liệu và nơi dùng kết quả."],
            ["Net Promoter Score (NPS)", "Chỉ số khách hàng giới thiệu", "Câu trả lời mở của NPS là nguồn phổ biến."],
            ["Survey", "Khảo sát", "Nguồn câu trả lời mở."],
            ["Affinity Diagram", "Sơ đồ tương đồng", "Cách phân tích thủ công."],
            ["Voice of the Customer (VoC)", "Tiếng nói khách hàng", "Chương trình thu phản hồi, thường dùng sentiment analysis."],
            ["Quantitative Research", "Nghiên cứu định lượng", "Tổng hợp tỷ lệ từ nhãn cảm xúc."],
          ]}
        />
      </Section>
    </div>
  );
}

export const SENTIMENT_ANALYSIS: Article = {
  slug: "sentiment-analysis",
  version: 1,
  term: "Sentiment Analysis",
  fn: 6,
  vi: "Phân tích cảm xúc",
  kind: "Phương pháp nghiên cứu / kiểm thử",
  definition:
    "Sentiment analysis là việc phân tích văn bản (thường bằng máy) để xác định quan điểm, cảm xúc hay thái độ mà người viết thể hiện, phổ biến nhất là phân loại thành tích cực, trung lập hoặc tiêu cực.",
  definitionMore: "Trong UX, phương pháp này giúp đọc nhanh hàng nghìn phản hồi để thấy xu hướng và chủ đề gây cảm xúc mạnh.",
  oneLine: "Phân loại văn bản phản hồi thành tích cực, trung lập, tiêu cực để thấy xu hướng cảm xúc.",
  glance: [
    ["40%", "Phản hồi tiêu cực về đặt lịch trong ví dụ"],
    ["82%", "Nhãn máy khớp với người đọc"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Opinion mining", "Phân tích quan điểm"] },
    { label: "Nhóm chính", items: ["Đo lường và phân tích"] },
    { label: "Thẻ phụ", items: ["Tổng hợp và mô hình hóa"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "Sentiment analysis thường được làm tự động bằng phần mềm xử lý ngôn ngữ, trên lượng lớn văn bản (đánh giá, bình luận, phản hồi). Kết quả là ước đoán của máy, cần được kiểm tra bằng người đọc.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
