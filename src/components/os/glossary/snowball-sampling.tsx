"use client";

import { Blk, T } from "./edit";
import { CheckCards, Formula, InOutCards, InfoGrid, PairCards, RelatedCards, Scenario, Steps } from "./blocks";
import type { Article } from "./types";
import { Callout, ChecklistColumn, Eyebrow, InfoCard, P, Section, Table, Tile, sectionProps, type SectionDef } from "./ui";

/* Snowball Sampling — copy from ux-glossary/snowball-sampling.md on the Glossary Detail layout (Figma 2011:28710). */

const SECTIONS: SectionDef[] = [
  { id: "problem", title: "Vấn đề giải quyết", icon: "target" },
  { id: "how", title: "Cách hoạt động", icon: "component" },
  { id: "when", title: "Khi nào nên dùng", icon: "check-circle" },
  { id: "not-fit", title: "Khi nào chưa phù hợp", icon: "ban" },
  { id: "apply", title: "Cách áp dụng", icon: "list" },
  { id: "maths", title: "Công thức và ví dụ tính", icon: "sigma" },
  { id: "limits", title: "Giới hạn của kết luận", icon: "shield-alert" },
  { id: "io", title: "Đầu vào và đầu ra", icon: "login" },
  { id: "example", title: "Ví dụ áp dụng", icon: "briefcase" },
  { id: "mistakes", title: "Lỗi và nhầm lẫn thường gặp", icon: "alert" },
  { id: "compare", title: "Phân biệt với các cách chọn mẫu gần", icon: "arrows" },
  { id: "checklist", title: "Checklist tự kiểm tra", icon: "clipboard-check" },
  { id: "related", title: "Thuật ngữ liên quan", icon: "link" },
];
const S = sectionProps(SECTIONS);

const SEEDS = ["A", "B", "C", "D"];

/** 4 seeds → 8 → 16: each branch tends to resemble the person who referred it. */
function ReferralTree() {
  return (
    <Blk label="sơ đồ" className="g-card flex flex-col gap-6 rounded-[28px] bg-[var(--w-card)] p-10">
      <div className="flex items-center gap-3">
        <Tile icon="users" size={36} iconSize={18} radius={10} />
        <Eyebrow>4 hạt giống, mỗi người giới thiệu 2 người</Eyebrow>
      </div>
      <div className="grid grid-cols-[110px_1fr] items-center gap-y-5">
        <span className="text-[15px] font-semibold">Hạt giống</span>
        <div className="grid grid-cols-4">
          {SEEDS.map((s) => (
            <span key={s} className="mx-auto flex size-11 items-center justify-center rounded-full bg-[var(--d-fill)] text-[16px] font-semibold text-white">
              {s}
            </span>
          ))}
        </div>
        <span className="text-[15px] font-semibold">Đợt 1 · 8</span>
        <div className="grid grid-cols-4">
          {SEEDS.map((s) => (
            <div key={s} className="flex justify-center gap-6">
              {[1, 2].map((n) => (
                <span key={n} className="flex size-8 items-center justify-center rounded-full bg-[var(--d-ci-weak)] font-mono text-[13px]">
                  {s.toLowerCase()}
                  {n}
                </span>
              ))}
            </div>
          ))}
        </div>
        <span className="text-[15px] font-semibold">Đợt 2 · 16</span>
        <div className="grid grid-cols-4">
          {SEEDS.map((s) => (
            <div key={s} className="flex justify-center gap-2">
              {[1, 2, 3, 4].map((n) => (
                <span key={n} className="size-5 rounded-full bg-[var(--d-well)]" />
              ))}
            </div>
          ))}
        </div>
      </div>
      <T as="p" className="text-[15px] leading-[22px] tracking-[-0.2px] text-[var(--w-muted)]">
        Tổng 4 + 8 + 16 = 28 người được liên hệ. Mỗi nhánh thường giống người giới thiệu, nên cần chọn hạt giống đa dạng.
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
            Có những nhóm người dùng rất khó tìm: chuyên gia trong một lĩnh vực hẹp, người dùng một công cụ chuyên biệt, cộng đồng nhỏ, hoặc người ngại tiết lộ một đặc điểm. Đăng tin tuyển
            công khai ít hiệu quả, vì nhóm này nhỏ hoặc không tin người lạ.
          </P>
          <P strong>
            Snowball sampling dùng mạng lưới quan hệ của chính người tham gia: người đã tham gia giới thiệu người quen. Lời giới thiệu từ người quen cũng giúp tạo lòng tin.
          </P>
        </div>
        <Eyebrow>Snowball sampling hỗ trợ</Eyebrow>
        <InfoGrid
          cols={3}
          minH={150}
          items={[
            ["users", "Tuyển được nhóm khó tiếp cận", "Qua mạng lưới của người tham gia."],
            ["shield-alert", "Tạo lòng tin", "Khi chủ đề nhạy cảm."],
            ["gauge", "Tiết kiệm chi phí tuyển", "Cho nghiên cứu định tính nhỏ."],
          ]}
        />
      </Section>

      <Section {...S.how}>
        <ReferralTree />
        <Table
          head={["Thành phần", "Mô tả", "Ví dụ minh họa (giả định)"]}
          widths={[220]}
          rows={[
            { icon: "users", highlight: true, cells: ["Hạt giống", "Những người đầu tiên, phù hợp tiêu chí.", "4 chủ doanh nghiệp nhỏ đã dùng dịch vụ tư vấn."] },
            { icon: "chat", cells: ["Lời mời giới thiệu", "Nhờ người tham gia giới thiệu người phù hợp.", "“Bạn có quen chủ doanh nghiệp nào đang tìm tư vấn tài chính không?”"] },
            { icon: "filter", cells: ["Tiêu chí sàng lọc", "Kiểm tra người được giới thiệu có phù hợp không.", "Đang điều hành doanh nghiệp dưới 10 nhân viên."] },
            { icon: "rotate", cells: ["Đợt", "Mỗi vòng giới thiệu.", "Đợt 1, đợt 2."] },
          ]}
        />
      </Section>

      <Section {...S.when}>
        <CheckCards
          groups={[
            ["target", "Bối cảnh phù hợp", ["Nhóm người dùng nhỏ, chuyên biệt, khó tìm.", "Chủ đề nhạy cảm, cần lòng tin.", "Nghiên cứu định tính, cần vài chục người."]],
            ["eye", "Dấu hiệu nhận biết", ["Đăng tin tuyển nhiều tuần không có người phù hợp.", "Người phù hợp chỉ tin người quen giới thiệu."]],
            [
              "clipboard-check",
              "Điều kiện cần",
              ["Có vài người hạt giống phù hợp và đa dạng.", "Tiêu chí sàng lọc rõ ràng.", "Tôn trọng quyền riêng tư: người được giới thiệu tự quyết định có tham gia không."],
            ],
          ]}
        />
      </Section>

      <Section {...S["not-fit"]}>
        <Table
          head={["Tình huống", "Vì sao chưa phù hợp", "Cân nhắc thay thế"]}
          widths={[320]}
          rows={[
            { icon: "bar-chart", cells: ["Cần số liệu đại diện", "Mẫu không ngẫu nhiên, lệch theo mạng lưới.", "Chọn mẫu xác suất, khảo sát đại diện."] },
            { icon: "users", cells: ["Nhóm người dùng dễ tiếp cận", "Không cần tuyển qua giới thiệu.", "Tuyển trực tiếp qua danh sách khách hàng."] },
            { icon: "eye", cells: ["Cần nhiều góc nhìn khác nhau", "Người giới thiệu thường giống nhau.", "Tuyển có chủ đích theo nhiều tiêu chí."] },
          ]}
        />
      </Section>

      <Section {...S.apply}>
        <Steps
          steps={[
            ["Xác định tiêu chí người tham gia.", "", "Tiêu chí sàng lọc."],
            ["Chọn hạt giống đa dạng.", "Khác nhau về những đặc điểm quan trọng, để các nhánh không giống nhau.", "Danh sách hạt giống."],
            [
              "Mời giới thiệu sau mỗi buổi.",
              "Đưa thông tin nghiên cứu để người tham gia chuyển cho người quen; không yêu cầu cung cấp thông tin liên hệ khi người kia chưa đồng ý.",
              "Danh sách người được giới thiệu.",
            ],
            ["Sàng lọc.", "", "Người phù hợp."],
            ["Theo dõi chuỗi giới thiệu.", "Ghi ai giới thiệu ai để thấy độ đa dạng.", "Sơ đồ chuỗi."],
            ["Dừng khi đủ hoặc khi không còn góc nhìn mới.", "", "Mẫu nghiên cứu."],
          ]}
        />
      </Section>

      <Section {...S.maths}>
        <P>Một phép tính đơn giản giúp ước tính cần bao nhiêu hạt giống và bao nhiêu đợt.</P>
        <Callout tone="scenario">Số liệu minh họa, không phải dữ liệu thật. 4 hạt giống; giả định mỗi người giới thiệu trung bình 2 người.</Callout>
        <Formula label="Số người mỗi đợt" formula="Số người ở đợt trước × Số người được giới thiệu trung bình mỗi người" note="Đợt 1: 4 × 2 = 8 người. Đợt 2: 8 × 2 = 16 người." />
        <Formula label="Tổng số người được liên hệ" formula="Hạt giống + Đợt 1 + Đợt 2" note="4 + 8 + 16 = 28 người" />
        <Formula
          label="Số người dự kiến tham gia"
          formula="Tổng số người được liên hệ × Tỷ lệ đồng ý và phù hợp"
          note="Nếu khoảng 60% người được liên hệ đồng ý và phù hợp: 28 × 60% ≈ 17 người"
        />
        <Callout tone="note" title="Lưu ý">
          Đây là ước tính để lập kế hoạch. Thực tế, số người giới thiệu rất khác nhau giữa các người, và chuỗi có thể dừng sớm. Snowball sampling là chọn mẫu thuận tiện, không tính được sai
          số chọn mẫu theo cách thông thường, vì các người trong mẫu không độc lập với nhau.
        </Callout>
      </Section>

      <Section {...S.limits}>
        <InfoGrid
          items={[
            ["users", "Mẫu lệch theo mạng lưới", "Người trong cùng chuỗi thường giống nhau; người ít quan hệ hoặc ở nhóm khác dễ bị bỏ sót."],
            ["target", "Phụ thuộc vào hạt giống", "Đặc điểm của hạt giống ảnh hưởng toàn bộ mẫu."],
            ["bar-chart", "Không đại diện", "Không suy ra tỷ lệ cho cả nhóm người dùng."],
            ["chat", "Người giới thiệu có thể chọn người “dễ nói chuyện”", "Không phải người điển hình."],
          ]}
        />
      </Section>

      <Section {...S.io}>
        <InOutCards
          inputs={["Tiêu chí người tham gia.", "Hạt giống đa dạng.", "Thông tin nghiên cứu để người tham gia chuyển tiếp."]}
          outputs={["Người tham gia đã sàng lọc.", "Sơ đồ chuỗi giới thiệu.", "Ghi chú về giới hạn của mẫu."]}
        />
      </Section>

      <Section {...S.example}>
        <Scenario>Tiếp nối dịch vụ tư vấn. Không phải dự án đã triển khai.</Scenario>
        <InfoCard
          icon="component"
          title="Bối cảnh"
          body="Dịch vụ muốn nghiên cứu nhu cầu tư vấn tài chính của chủ doanh nghiệp rất nhỏ (dưới 10 nhân viên). Đăng tin tuyển hai tuần chỉ có 2 người phù hợp."
        />
        <InfoCard
          icon="users"
          title="Cách áp dụng"
          body="Chọn 4 hạt giống khác nhau về ngành (bán lẻ, dịch vụ ăn uống, thiết kế, sản xuất nhỏ). Sau mỗi buổi phỏng vấn, đưa thông tin nghiên cứu để họ gửi cho người quen. Theo phần tính toán ở trên, dự kiến khoảng 17 người tham gia sau hai đợt."
        />
        <div className="flex gap-4">
          <InfoCard
            icon="eye"
            title="Theo dõi độ đa dạng"
            className="flex-1"
            body="Sau đợt 1, nhóm thấy nhánh bán lẻ giới thiệu toàn người bán lẻ cùng khu vực → chủ động tìm thêm hạt giống ở khu vực khác."
          />
          <InfoCard
            tone="fill"
            icon="file"
            title="Báo cáo"
            className="flex-1"
            body="Ghi rõ mẫu được tuyển qua giới thiệu, có thể lệch về những người có mạng lưới kinh doanh rộng."
          />
        </div>
        <Callout tone="note" icon="briefcase">
          Đây là kịch bản minh họa, chưa phải kết quả nghiên cứu thực tế.
        </Callout>
      </Section>

      <Section {...S.mistakes}>
        <PairCards
          items={[
            ["Một hai hạt giống", "Cả mẫu giống nhau.", "Nhiều hạt giống đa dạng."],
            ["Suy ra tỷ lệ cho cả nhóm", "Mẫu không đại diện.", "Dùng để hiểu, không để đo."],
            ["Yêu cầu thông tin liên hệ của người quen", "Vi phạm quyền riêng tư.", "Để người được giới thiệu tự liên hệ."],
            ["Không sàng lọc người được giới thiệu", "Người không phù hợp vào mẫu.", "Áp dụng tiêu chí rõ ràng."],
            ["Không theo dõi chuỗi", "Không thấy mẫu đang lệch.", "Ghi ai giới thiệu ai."],
          ]}
        />
      </Section>

      <Section {...S.compare}>
        <Table
          head={["Cách chọn mẫu", "Mô tả", "Khi nào chọn"]}
          widths={[320]}
          rows={[
            { icon: "users", highlight: true, cells: ["Snowball sampling", "Tuyển qua giới thiệu nối tiếp.", "Nhóm khó tiếp cận."] },
            { icon: "check", cells: ["Convenience sampling (thuận tiện)", "Tuyển ai dễ tìm.", "Nghiên cứu nhanh, ít yêu cầu."] },
            { icon: "target", cells: ["Purposive sampling (có chủ đích)", "Chọn người theo tiêu chí cụ thể.", "Cần góc nhìn đa dạng có kiểm soát."] },
            { icon: "split", cells: ["Random sampling (ngẫu nhiên)", "Mỗi người trong tổng thể có cơ hội được chọn.", "Cần số liệu đại diện."] },
          ]}
        />
      </Section>

      <Section {...S.checklist} intro="Dùng để tự rà soát; trạng thái tick không được lưu lại.">
        <div className="flex items-start gap-4">
          <ChecklistColumn
            icon="file"
            title="Chuẩn bị"
            items={["Nhóm người cần tìm thật sự khó tiếp cận.", "Có nhiều hạt giống đa dạng.", "Tiêu chí sàng lọc rõ."]}
          />
          <ChecklistColumn
            icon="analytics"
            title="Khi tuyển và báo cáo"
            items={["Người được giới thiệu tự quyết định tham gia.", "Theo dõi chuỗi giới thiệu và độ đa dạng.", "Báo cáo ghi rõ giới hạn của mẫu."]}
          />
        </div>
      </Section>

      <Section {...S.related}>
        <RelatedCards
          items={[
            ["Research Operations", "Vận hành nghiên cứu", "Quản lý tuyển người tham gia."],
            ["Qualitative Research", "Nghiên cứu định tính", "Snowball sampling thường dùng cho nghiên cứu định tính."],
            ["Ethnographic Research", "Nghiên cứu dân tộc học", "Tiếp cận cộng đồng qua người quen."],
            ["Survey", "Khảo sát", "Không dùng snowball khi cần số liệu đại diện."],
            ["Focus Group", "Thảo luận nhóm tập trung", "Lưu ý không để người quen nhau trong cùng một nhóm."],
          ]}
        />
      </Section>
    </div>
  );
}

export const SNOWBALL_SAMPLING: Article = {
  slug: "snowball-sampling",
  version: 1,
  term: "Snowball Sampling",
  fn: 1,
  vi: "Chọn mẫu quả cầu tuyết",
  kind: "Phương pháp nghiên cứu / kiểm thử",
  definition:
    "Snowball sampling là cách tuyển người tham gia nghiên cứu bằng cách bắt đầu từ vài người phù hợp (gọi là “hạt giống”), rồi nhờ họ giới thiệu thêm người khác có cùng đặc điểm, và cứ thế lan rộng như quả cầu tuyết lăn.",
  definitionMore: "Cách này hữu ích khi nhóm người cần tìm khó tiếp cận qua các kênh tuyển thông thường.",
  oneLine: "Tuyển người tham gia qua giới thiệu nối tiếp, bắt đầu từ vài người phù hợp.",
  glance: [
    ["28", "Người được liên hệ sau hai đợt"],
    ["≈ 17", "Người dự kiến tham gia"],
  ],
  facts: [
    { label: "Tên gọi khác", items: ["Chain referral sampling (chọn mẫu theo chuỗi giới thiệu)"] },
    { label: "Nhóm chính", items: ["Nghiên cứu khám phá"] },
    { label: "Thẻ phụ", items: ["Quy trình"] },
    {
      label: "Lưu ý tên gọi",
      items: [
        "Thuật ngữ có hai nghĩa. Trong bài báo của Goodman (1961), đây là một thiết kế chọn mẫu xác suất. Trong thực tế nghiên cứu (và trong UX), “snowball sampling” thường chỉ cách tuyển người qua giới thiệu, là chọn mẫu thuận tiện, không phải xác suất. Bài này dùng nghĩa thứ hai.",
      ],
    },
  ],
  sections: SECTIONS,
  Body,
};
