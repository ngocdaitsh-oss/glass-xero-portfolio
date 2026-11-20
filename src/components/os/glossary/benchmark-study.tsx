"use client";

import { CheckCard, CheckCards, Flow, Formula, InfoGrid, InOutCards, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Stat, Subhead, Table, sectionProps, type SectionDef } from "./ui";

/* Benchmark Study — copy from ux-glossary/benchmark-study.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "parts", title: "Thành phần của một benchmark study", icon: "component" },
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

function Body() {
  return (
    <div className="flex flex-col gap-[120px]">
      <Section {...S.problem}>
        <div className="flex flex-col gap-5">
          <P>
            Sau một đợt redesign, nhóm thường tin rằng trải nghiệm đã tốt hơn. Nhưng nếu không đo trước khi thay đổi, không có gì để so sánh. Nếu đo theo cách khác nhau mỗi lần
            (tác vụ khác, người tham gia khác, câu hỏi khác), con số cũng không so sánh được.
          </P>
          <P strong>
            Benchmark study tạo một thước đo cố định: cùng tác vụ, cùng chỉ số, cùng cách tuyển và cùng quy trình. Mỗi lần đo cho ra một điểm trên đường thời gian.
          </P>
        </div>
        <Eyebrow>Benchmark study hỗ trợ các quyết định</Eyebrow>
        <InfoGrid
          minH={180}
          items={[
            ["check-circle", "Thay đổi có hiệu quả không", "Trải nghiệm sau redesign có tốt hơn trước không, kèm mức độ chắc chắn."],
            ["bar-chart", "Ưu tiên đầu tư", "Tác vụ nào có điểm thấp nhất, cần cải thiện trước."],
            ["target", "Đặt mục tiêu", "Ví dụ “tỷ lệ hoàn thành đặt lịch đạt mức X trong quý tới”."],
            ["analytics", "Chứng minh giá trị của UX", "Với lãnh đạo, bằng số liệu theo thời gian."],
          ]}
          last={["arrows", "So sánh với đối thủ", "Trên cùng tác vụ."]}
        />
      </Section>

      <Section {...S.parts}>
        <Table
          head={["Thành phần", "Mô tả", "Ví dụ minh họa (giả định)"]}
          widths={[300]}
          rows={[
            { icon: "list", cells: ["Tác vụ chính (top tasks)", "Những việc quan trọng nhất người dùng đến để làm. Giữ nguyên giữa các lần đo.", "Tìm dịch vụ phù hợp; đặt lịch tư vấn; đổi lịch đã đặt."] },
            { icon: "check-circle", cells: ["Chỉ số hiệu quả (effectiveness)", "Người dùng có hoàn thành được tác vụ không.", "Tỷ lệ hoàn thành tác vụ."] },
            { icon: "hourglass", cells: ["Chỉ số hiệu suất (efficiency)", "Tốn bao nhiêu công sức.", "Thời gian tác vụ; số lỗi."] },
            { icon: "chat", cells: ["Chỉ số cảm nhận (satisfaction)", "Người dùng cảm thấy thế nào.", "Câu hỏi độ dễ sau mỗi tác vụ; SUS hoặc UMUX sau buổi test."] },
            { icon: "users", cells: ["Người tham gia", "Cùng tiêu chí tuyển giữa các lần đo.", "Khách hàng tiềm năng chưa từng dùng trang."] },
            { icon: "rotate", cells: ["Quy trình cố định", "Cùng kịch bản, cùng thứ tự tác vụ (hoặc xáo trộn có kiểm soát), cùng thiết bị.", "Test từ xa không có người điều phối, trên máy tính."] },
            { icon: "target", cells: ["Mốc so sánh", "Lần đo trước, đối thủ, hoặc mục tiêu đặt ra.", "Lần đo trước redesign."] },
          ]}
        />
        <Flow
          title="Chu kỳ benchmark"
          icon="rotate"
          steps={["Lần đo 1 (mốc)", "Thay đổi thiết kế", "Lần đo 2", "So sánh", "Quyết định"]}
          on={[0, 2]}
          soft={[3]}
          note="Lần đo 1 tạo mốc → nhóm thay đổi thiết kế → lần đo 2 dùng đúng bộ tác vụ và chỉ số → so sánh hai lần đo kèm khoảng tin cậy → quyết định → lặp lại ở chu kỳ sau."
        />
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            [
              "target",
              "Bối cảnh phù hợp",
              [
                "Trước và sau một thay đổi lớn (redesign, đổi luồng chính).",
                "Sản phẩm đã ổn định và cần theo dõi chất lượng trải nghiệm định kỳ (theo quý, theo năm).",
                "Cần so sánh với đối thủ trên cùng tác vụ.",
                "Cần số liệu để báo cáo tác động của UX.",
              ],
            ],
            [
              "eye",
              "Dấu hiệu nhận biết",
              [
                "Nhóm nói “trải nghiệm đã tốt hơn” nhưng không có số liệu so sánh.",
                "Lãnh đạo hỏi về hiệu quả đầu tư cho UX.",
                "Có nhiều thay đổi nhỏ liên tục và cần biết xu hướng tổng thể.",
              ],
            ],
            [
              "clipboard-check",
              "Điều kiện cần",
              [
                "Xác định được các tác vụ chính và giữ ổn định qua nhiều lần đo.",
                "Đủ người tham gia để con số đủ chắc chắn (xem phần cỡ mẫu).",
                "Có tài liệu quy trình để lần đo sau làm lại y hệt.",
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
            { icon: "rotate", cells: ["Sản phẩm còn ở giai đoạn khám phá, thay đổi liên tục", "Tác vụ chưa ổn định thì không có mốc để so sánh.", "Usability testing định tính để tìm vấn đề."] },
            { icon: "binoculars", cells: ["Cần tìm nguyên nhân vấn đề", "Benchmark cho biết bao nhiêu, ít cho biết vì sao.", "Usability testing định tính, phỏng vấn."] },
            { icon: "users", cells: ["Ngân sách chỉ đủ cho vài người tham gia", "Khoảng tin cậy quá rộng, khó phát hiện thay đổi.", "Usability testing định tính; dùng số liệu hành vi có sẵn."] },
            { icon: "split", cells: ["Cần so sánh hai phiên bản trên người dùng thật với lưu lượng lớn", "Có cách đo trực tiếp hơn trên hành vi thật.", "A/B testing."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            [
              "Chọn tác vụ chính và chỉ số.",
              "Chọn 3–8 tác vụ quan trọng nhất; với mỗi tác vụ, chọn chỉ số hiệu quả, hiệu suất và cảm nhận. Định nghĩa rõ thế nào là “hoàn thành”.",
              "Danh sách tác vụ, định nghĩa thành công, bộ chỉ số.",
            ],
            [
              "Thiết kế quy trình lặp lại được.",
              "Viết kịch bản tác vụ, thứ tự, thiết bị, hình thức (có hoặc không có người điều phối), câu hỏi sau tác vụ.",
              "Tài liệu quy trình benchmark.",
            ],
            ["Tính cỡ mẫu.", "Dựa trên mức thay đổi nhỏ nhất muốn phát hiện giữa hai lần đo.", "Số người tham gia mỗi lần đo."],
            ["Đo lần đầu (mốc).", "Chạy quy trình lần đầu để có số liệu gốc.", "Số liệu mốc kèm khoảng tin cậy."],
            ["Đo lại sau thay đổi, đúng quy trình cũ.", "Ghi lại mọi khác biệt không tránh được (ví dụ nền tảng test đổi phiên bản).", "Số liệu lần đo mới."],
            [
              "So sánh, báo cáo, quyết định.",
              "So sánh từng chỉ số kèm khoảng tin cậy; kết hợp với nhận định định tính để giải thích.",
              "Báo cáo benchmark, quyết định ưu tiên cho chu kỳ sau.",
            ],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <Subhead icon="target">Xác định tiêu chí trước khi đo</Subhead>
        <Table
          head={["Loại chỉ số", "Trong ví dụ"]}
          widths={[380]}
          rows={[
            { cells: ["Chỉ số chính", "Tỷ lệ hoàn thành tác vụ “Đặt lịch tư vấn”."] },
            { cells: ["Chỉ số phụ", "Thời gian tác vụ; điểm độ dễ sau tác vụ; điểm SUS."] },
            { cells: ["Mức thay đổi đáng quan tâm", "Tăng tỷ lệ hoàn thành từ khoảng 70% lên 85% (15 điểm phần trăm)."] },
          ]}
        />
        <Subhead icon="sigma">Công thức</Subhead>
        <div className="flex gap-4">
          <Formula label="Tỷ lệ hoàn thành" formula="Số người hoàn thành ÷ Số người tham gia" />
          <Formula label="Chênh lệch giữa hai lần đo" formula="Tỷ lệ lần 2 − Tỷ lệ lần 1" />
          <Formula label="Khoảng tin cậy" formula="Kết quả ± Sai số" note="Sai số tính bằng công cụ; xem bài Confidence Intervals." />
        </div>
        <Subhead icon="bar-chart">Ví dụ thay số</Subhead>
        <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật.</Callout>
        <Table
          head={["", "Lần đo 1 (trước redesign)", "Lần đo 2 (sau redesign)"]}
          widths={[380]}
          rows={[
            { cells: ["Số người tham gia", "30", "30"] },
            { cells: ["Số người hoàn thành", "21", "26"] },
            { highlight: true, cells: ["Tỷ lệ hoàn thành", "21 ÷ 30 = 70,0%", "26 ÷ 30 = 86,7%"] },
            { cells: ["Khoảng tin cậy 95% (adjusted-Wald, từ công cụ)", "52,0% – 83,5%", "69,7% – 95,3%"] },
          ]}
        />
        <div className="flex gap-4">
          <Stat value="70,0%" label="Lần đo 1 · n = 30" note="Khoảng tin cậy 95%: 52,0% – 83,5%." />
          <Stat value="86,7%" label="Lần đo 2 · n = 30" note="Khoảng tin cậy 95%: 69,7% – 95,3%." />
          <Stat fill value="+16,7" label="Điểm phần trăm" note="Chênh lệch = 86,7% − 70,0%. Nhìn qua, redesign có vẻ đạt mục tiêu." />
        </div>

        <Subhead icon="shield-alert">Kiểm tra độ tin cậy của kết quả</Subhead>
        <P>Nhập số liệu hai lần đo vào công cụ so sánh hai tỷ lệ (như khi phân tích A/B test):</P>
        <Table
          head={["Nhập vào công cụ", "Kết quả"]}
          widths={[480]}
          rows={[{ cells: ["Lần 1: 21 / 30 · Lần 2: 26 / 30", "Sai số của chênh lệch ≈ 20,4 điểm phần trăm · p-value ≈ 0,12"] }]}
        />
        <Formula label="Khoảng tin cậy của chênh lệch" formula="16,7 ± 20,4 → từ khoảng −3,8 đến 37,1 điểm phần trăm" />
        <div className="flex gap-4">
          <Callout tone="good" title="Cách đọc đúng">
            Với 30 người mỗi lần đo, dữ liệu chưa đủ bằng chứng để khẳng định tỷ lệ hoàn thành đã tăng. Khoảng tin cậy chứa cả 0: mức thay đổi thật có thể từ hơi giảm đến tăng
            hơn 37 điểm. Khoảng tin cậy của từng lần đo cũng chồng lên nhau nhiều.
          </Callout>
          <Callout tone="bad" title="Cách đọc sai">
            “Tỷ lệ hoàn thành tăng 24%, redesign thành công.”
          </Callout>
        </div>
        <Callout tone="note">
          Với nhóm nhỏ, Sauro & Lewis khuyến nghị một biến thể điều chỉnh của phép so sánh hai tỷ lệ (gọi là “N−1”). Trong ví dụ này kết luận không đổi.
        </Callout>

        <Subhead icon="users">Cần bao nhiêu người tham gia</Subhead>
        <P>
          Số người cần cho mỗi lần đo phụ thuộc tỷ lệ hiện tại, mức thay đổi muốn phát hiện và mức chắc chắn mong muốn. Bảng tra cho tỷ lệ hiện tại 70%, theo quy ước phổ biến
          (khoảng tin cậy 95%, 80% khả năng phát hiện nếu thay đổi có thật), tính bằng công cụ tính cỡ mẫu:
        </P>
        <Table
          head={["Muốn phát hiện mức tăng", "Tỷ lệ lần 2 cần đạt", "Số người cần mỗi lần đo"]}
          rows={[
            { cells: ["20 điểm phần trăm", "90%", "khoảng 62"] },
            { highlight: true, cells: ["15 điểm phần trăm", "85%", "khoảng 121"] },
            { cells: ["10 điểm phần trăm", "80%", "khoảng 294"] },
          ]}
        />
        <P>
          Với 30 người, benchmark chỉ phát hiện đáng tin những thay đổi rất lớn. Để phát hiện mức tăng 15 điểm, cần khoảng 121 người mỗi lần đo. Đây là lý do benchmark thường
          dùng test từ xa không người điều phối để có đủ người với chi phí hợp lý.
        </P>

        <Subhead icon="clipboard-check">Điều kiện để kết quả đáng tin</Subhead>
        <InfoGrid
          items={[
            ["list", "Giữ nguyên bộ đo", "Tác vụ, định nghĩa thành công và câu hỏi giữ nguyên giữa các lần đo."],
            ["users", "Cùng tiêu chí tuyển", "Người tham gia ở các lần đo có cùng tiêu chí tuyển."],
            ["component", "Cùng môi trường", "Cùng thiết bị, hình thức test và nền tảng (hoặc ghi lại khác biệt)."],
            [
              "hourglass",
              "Thời gian tác vụ",
              "Chỉ tính cho người hoàn thành. Vì vài người rất chậm có thể kéo lệch trung bình, nên báo cáo trung vị hoặc dùng công cụ hỗ trợ dữ liệu lệch (trung bình nhân — geometric mean).",
            ],
          ]}
        />

        <Subhead icon="split">Quy tắc ra quyết định</Subhead>
        <Table
          head={["Kết quả", "Quyết định"]}
          widths={[560]}
          rows={[
            { icon: "check-circle", cells: ["Cải thiện có bằng chứng (khoảng tin cậy không chứa 0), đạt mức mong muốn", "Ghi nhận; giữ thay đổi; chọn tác vụ yếu nhất tiếp theo."] },
            { icon: "hourglass", cells: ["Có cải thiện nhưng khoảng tin cậy chứa 0", "Chưa kết luận; tăng số người ở lần đo sau hoặc kết hợp dữ liệu hành vi."] },
            { icon: "binoculars", cells: ["Chỉ số chính tốt hơn nhưng thời gian hoặc cảm nhận xấu đi", "Điều tra bằng usability testing định tính."] },
            { icon: "alert", cells: ["Không đổi hoặc xấu đi", "Xem lại giả thuyết thiết kế; phân tích nguyên nhân."] },
          ]}
        />
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["binoculars", "Cho biết mức độ, không cho biết nguyên nhân", "Cần dữ liệu định tính kèm theo."],
            ["list", "Chỉ đúng với tác vụ đã chọn", "Trải nghiệm ở các tác vụ khác có thể khác."],
            ["eye", "Môi trường test khác môi trường thật", "Tỷ lệ hoàn thành trong test có kịch bản có thể khác hành vi tự nhiên."],
            ["arrows", "So sánh với đối thủ", "Chỉ có ý nghĩa khi tác vụ tương đương thật sự."],
          ]}
          last={["gauge", "Điểm chuẩn ngoài chỉ là mốc tham khảo", "Ví dụ SUS trung bình khoảng 68 chỉ là mốc tham khảo chung, không phải mục tiêu riêng của sản phẩm."]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={[
            "Danh sách tác vụ chính và định nghĩa thành công.",
            "Bộ chỉ số và thang đo.",
            "Tiêu chí tuyển người tham gia; cỡ mẫu đã tính.",
            "Nền tảng test và tài liệu quy trình.",
          ]}
          outputs={[
            "Bảng chỉ số từng tác vụ, kèm khoảng tin cậy, cho mỗi lần đo.",
            "So sánh giữa các lần đo hoặc với đối thủ.",
            "Danh sách tác vụ ưu tiên cải thiện.",
            "Tài liệu quy trình được cập nhật cho lần đo sau.",
          ]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối luồng đặt lịch tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard icon="users" title="Bối cảnh" body="Nhóm chuẩn bị redesign trang dịch vụ và luồng đặt lịch. Lãnh đạo muốn biết redesign có cải thiện trải nghiệm không." />
        <CheckCard
          icon="list"
          title="Cách áp dụng"
          mark="•"
          items={[
            "Trước redesign, đo mốc với 3 tác vụ: tìm dịch vụ phù hợp, đặt lịch, đổi lịch đã đặt. Mỗi tác vụ đo tỷ lệ hoàn thành, thời gian và độ dễ; cuối buổi đo SUS.",
            "Sau khi tính cỡ mẫu, nhóm nhận ra 30 người là không đủ để phát hiện mức cải thiện 15 điểm. Nhóm chọn test từ xa không người điều phối với khoảng 120 người mỗi lần đo.",
            "Sau redesign, đo lại đúng quy trình.",
          ]}
        />
        <InfoCard
          icon="check-circle"
          tone="fill"
          title="Quyết định"
          body="Báo cáo từng tác vụ kèm khoảng tin cậy. Tác vụ “đổi lịch” có điểm thấp nhất và trở thành ưu tiên của chu kỳ sau."
        />
        <Callout tone="note" icon="briefcase">
          Đây là kế hoạch minh họa, chưa phải kết quả thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Đổi tác vụ hoặc câu hỏi giữa các lần đo", "Mất khả năng so sánh.", "Cố định bộ tác vụ; nếu buộc phải đổi, đo song song một chu kỳ."],
            ["Cỡ mẫu quá nhỏ cho câu hỏi so sánh", "Không phát hiện được thay đổi thật.", "Tính cỡ mẫu theo mức thay đổi muốn phát hiện."],
            ["Chỉ báo con số, không báo khoảng tin cậy", "Người đọc tưởng chênh lệch nhỏ là thật.", "Luôn báo khoảng tin cậy."],
            ["Đo ngay sau khi ra mắt", "Người dùng chưa quen; hiệu ứng mới lạ hoặc ngại thay đổi.", "Chờ đủ thời gian thích nghi, hoặc đo với người dùng mới."],
            ["Coi điểm chuẩn ngành là mục tiêu cứng", "Bối cảnh và tác vụ khác nhau.", "Dùng mốc của chính sản phẩm làm so sánh chính."],
            ["Tính trung bình cộng cho thời gian tác vụ", "Vài người rất chậm kéo lệch kết quả.", "Dùng trung bình nhân hoặc trung vị."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Phương pháp", "Mục tiêu", "Số người", "Khi nào chọn"]}
          widths={[280]}
          rows={[
            { icon: "bar-chart", highlight: true, cells: ["Benchmark Study", "Đo mức độ và theo dõi theo thời gian.", "Thường nhiều (vài chục đến hàng trăm).", "Cần số liệu so sánh lặp lại."] },
            { icon: "users", cells: ["Usability Testing (định tính)", "Tìm vấn đề và nguyên nhân.", "Ít.", "Đang thiết kế, cần cải thiện nhanh."] },
            { icon: "split", cells: ["A/B Testing", "So sánh hai phiên bản trên hành vi thật.", "Rất nhiều (người dùng thật).", "Sản phẩm đã ra mắt, đủ lưu lượng."] },
            { icon: "gauge", cells: ["UX Metrics", "Khái niệm về các chỉ số đo trải nghiệm.", "—", "Benchmark là cách đo các chỉ số đó một cách lặp lại."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="component"
            title="Thiết kế"
            items={[
              "Đã chọn tác vụ chính và định nghĩa rõ thế nào là hoàn thành.",
              "Bộ chỉ số gồm hiệu quả, hiệu suất và cảm nhận.",
              "Đã tính cỡ mẫu theo mức thay đổi muốn phát hiện.",
              "Quy trình được ghi lại đủ chi tiết để lặp lại.",
            ]}
          />
          <ChecklistColumn
            icon="analytics"
            title="Phân tích"
            items={[
              "Mỗi chỉ số có khoảng tin cậy.",
              "So sánh giữa các lần đo có kiểm định hoặc khoảng tin cậy của chênh lệch.",
              "Thời gian tác vụ dùng trung bình nhân hoặc trung vị.",
              "Đã ghi lại mọi khác biệt về quy trình giữa các lần đo.",
            ]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["UX Metrics", "Chỉ số UX", "Các chỉ số mà benchmark đo lặp lại."],
            ["Usability Testing", "Kiểm thử khả năng sử dụng", "Hình thức thu thập dữ liệu của benchmark; bản định tính giải thích nguyên nhân."],
            ["Confidence Intervals", "Khoảng tin cậy", "Cách báo cáo mỗi chỉ số và so sánh giữa các lần đo."],
            ["Statistical Significance", "Ý nghĩa thống kê", "Đánh giá chênh lệch giữa hai lần đo."],
            ["Remote Testing", "Kiểm thử từ xa", "Cách có đủ người tham gia với chi phí hợp lý."],
            ["A/B Testing", "Kiểm thử A/B", "Cùng công thức so sánh hai tỷ lệ, nhưng trên người dùng thật."],
            ["Attitudinal Methods", "Phương pháp nghiên cứu thái độ", "Nguồn của các chỉ số cảm nhận như SUS."],
            ["UMUX", "Thang đo khả năng sử dụng UMUX", "Bảng hỏi ngắn có thể dùng làm chỉ số cảm nhận khi đo định kỳ."],
          ]}
        />
      </Section>
    </div>
  );
}

export const BENCHMARK_STUDY: Article = {
  slug: "benchmark-study",
  version: 1,
  term: "Benchmark Study",
  fn: 1,
  vi: "Nghiên cứu đo mốc trải nghiệm",
  kind: "Phương pháp nghiên cứu / kiểm thử",
  definition:
    "Benchmark study là nghiên cứu đo một bộ chỉ số trải nghiệm cố định trên các tác vụ chính, theo một quy trình lặp lại được, để tạo “mốc” so sánh qua các phiên bản, theo thời gian hoặc với sản phẩm khác.",
  definitionMore:
    "Các chỉ số thường gồm tỷ lệ hoàn thành tác vụ, thời gian tác vụ, số lỗi và điểm cảm nhận chuẩn hóa. Nhờ có mốc, nhóm trả lời được câu hỏi “trải nghiệm đã tốt hơn chưa, và tốt hơn bao nhiêu?” bằng dữ liệu.",
  oneLine: "Đo lặp lại một bộ chỉ số trải nghiệm cố định để so sánh qua thời gian, phiên bản hoặc với đối thủ.",
  glance: [
    ["3–8", "Tác vụ chính"],
    ["~121", "Người mỗi lần đo để thấy +15 điểm"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["UX benchmarking", "Usability benchmark"] },
    { label: "Nhóm chính", items: ["Đo lường và phân tích"] },
    { label: "Thẻ phụ", items: ["Kiểm thử và đánh giá", "Quy trình và vận hành"] },
    {
      label: "Lưu ý tên gọi",
      items: ["“Benchmark” trong UX là đo lặp lại cùng một bộ chỉ số theo cùng một cách. Không phải mọi lần đo một chỉ số đều là benchmark study."],
    },
  ],
  sections: SECTIONS,
  Body,
};
