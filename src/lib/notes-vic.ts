import type { Note } from "./notes";

export const VIC_NOTES: Note[] = [
  {
    id: "vic-why-design-system", folder: "VIC Design System", title: "Vì sao cần một design system", when: "Note 01",
    summary: "Design audit · Product consistency · Team workflow", pinned: true,
    body: `VIC Design System được xây dựng để tạo một ngôn ngữ thiết kế thống nhất cho các sản phẩm thuộc Viettel IT Center. Khi số lượng hệ thống và nhu cầu thiết kế tăng lên, việc duy trì từng màn hình hoặc từng component riêng lẻ bắt đầu tạo ra nhiều biến thể, làm chậm quá trình thiết kế và gây khó khăn khi phối hợp giữa designer và developer.

Mục tiêu của hệ thống không chỉ là tập hợp các UI component. Design system cần giúp đội ngũ:

- Duy trì trải nghiệm nhất quán giữa nhiều sản phẩm
- Tái sử dụng giải pháp đã được kiểm chứng
- Rút ngắn thời gian thiết kế và triển khai
- Tạo điểm tham chiếu chung giữa design và development
- Cho phép hệ thống mở rộng mà không làm mất tính đồng bộ

### Bốn nguyên tắc cốt lõi

1. **Nhất quán** — cùng một nhu cầu nên được giải quyết bằng cùng một pattern.
2. **Tái sử dụng** — foundations và components cần dùng được trong nhiều bối cảnh.
3. **Mở rộng được** — hệ thống có thể phát triển theo sản phẩm mà không phá vỡ cấu trúc chung.
4. **Tài liệu hóa** — quyết định thiết kế, cách dùng và giới hạn của component phải được ghi lại rõ ràng.`,
  },
  {
    id: "vic-audit", folder: "VIC Design System", title: "Research và đánh giá hiện trạng", when: "Note 02",
    summary: "Audit · Inventory · Gap analysis",
    body: `Trước khi chuẩn hóa, team rà soát các sản phẩm và tài nguyên UI hiện có. Giai đoạn research tập trung vào việc nhận diện màu sắc, typography, layout, component và interaction pattern đang được sử dụng trong nhiều hệ thống.

### Quá trình audit

- Thu thập màn hình và component từ các sản phẩm hiện hữu
- So sánh những phiên bản có cùng chức năng nhưng khác cách thể hiện
- Kiểm tra mức độ nhất quán của màu sắc, khoảng cách, typography và trạng thái
- Nhóm component theo chức năng sử dụng
- Xác định những phần có thể chuẩn hóa và những phần cần tiếp tục nghiên cứu

### Kết quả

Audit tạo ra một bức tranh chung về độ trưởng thành của hệ thống. Foundations đã tương đối hoàn chỉnh, trong khi mức độ hoàn thiện của các nhóm component chưa đồng đều. Những nhóm cơ bản như input, selection và button có độ bao phủ tốt hơn; chart, dashboard và một số interaction phức tạp vẫn cần tiếp tục phát triển.

Việc thể hiện tiến độ theo từng nhóm giúp team tránh đánh giá design system chỉ bằng tổng số component. Một thư viện lớn chưa chắc đã hoàn chỉnh nếu các pattern quan trọng chưa có guideline, state hoặc ví dụ sử dụng thực tế.`,
  },
  {
    id: "vic-five-layers", folder: "VIC Design System", title: "Kiến trúc năm tầng", when: "Note 03",
    summary: "Foundation → Component → Pattern → Template → Application",
    body: `VIC Design System được tổ chức theo mô hình năm tầng. Mỗi tầng sử dụng và mở rộng tầng phía trước, giúp team truy ngược một quyết định giao diện từ sản phẩm về đúng token hoặc component nền tảng.

### 01. Foundations

Các quy tắc cơ bản như color, typography, spacing, grid, iconography, illustration, effect và motion.

### 02. Components

Các đơn vị UI có thể tái sử dụng như button, input, card, modal, badge, tag và alert.

### 03. Patterns

Những tổ hợp component giải quyết một nhiệm vụ lớn hơn, ví dụ form layout, date range, navigation bar hoặc dashboard shell.

### 04. Templates

Cấu trúc trang có thể tái sử dụng như login, dashboard, list view, detail view và settings.

### 05. Applications

Sản phẩm thực tế sử dụng foundations, components, patterns và templates để tạo nên trải nghiệm hoàn chỉnh.

### Giá trị của kiến trúc

Mô hình này phân biệt rõ “một phần tử trông như thế nào” với “phần tử đó được kết hợp và sử dụng ra sao”. Nhờ vậy, component library không bị biến thành một bộ UI kit thiếu ngữ cảnh.`,
  },
  {
    id: "vic-foundations", folder: "VIC Design System", title: "Xây dựng foundations", when: "Note 04",
    summary: "Design tokens · Visual language · Responsive rules",
    body: `Foundations là lớp quy tắc chung giúp mọi component giữ cùng một ngôn ngữ hình ảnh. Trong file VIC, foundations được tách thành các trang riêng để designer có thể tra cứu và bảo trì độc lập.

### Color

Hệ màu được tổ chức thành các thang màu và token có quy ước đặt tên. Bên cạnh màu thương hiệu, hệ thống có các nhóm màu trung tính, màu chức năng và màu dùng trong từng ngữ cảnh giao diện. Việc sử dụng token giúp màu có ý nghĩa thay vì chỉ được gọi bằng mã hex.

### Typography

Typography được xây thành hệ thống style thay vì định dạng thủ công trên từng màn hình. Các cấp chữ được phân biệt theo vai trò nội dung, kích thước, độ đậm và line-height để duy trì hierarchy và khả năng đọc.

### Spacing & Padding

Khoảng cách được chuẩn hóa để component và layout có cùng nhịp điệu. Designer có thể lựa chọn từ một scale thống nhất thay vì sử dụng nhiều giá trị gần giống nhau.

### Layout & Grid

Grid định nghĩa cách nội dung thích nghi với nhiều kích thước màn hình. Đây là nền tảng để sản phẩm có thể mở rộng từ web tới các giao diện thiết bị khác mà vẫn giữ đúng hierarchy.

### Effect, Illustration và Motion

Effect chuẩn hóa elevation và cách phân lớp. Illustration giữ nhận diện hình ảnh nhất quán. Motion mô tả cách giao diện phản hồi và chuyển trạng thái; đây cũng là một trong những phần còn tiếp tục được hoàn thiện trong báo cáo hiện trạng.`,
  },
  {
    id: "vic-components", folder: "VIC Design System", title: "Phát triển component library", when: "Note 05",
    summary: "Reusable components · Variants · States",
    body: `Component library gồm khoảng **86 component** được nhóm theo chức năng. File Figma có các trang riêng cho những component phổ biến như Avatar, Badge, Button, Calendar, Chart, Checkbox, Date Picker, Dropdown, Input, Modal, Pagination, Search, Sidebar, Table, Tabs, Toast và Tooltip.

### Cách cấu trúc một component

Mỗi component cần xác định:

- Anatomy — component gồm những phần nào
- Variant — các kiểu hiển thị hoặc cấp độ nhấn mạnh
- Size — kích thước được hỗ trợ
- State — default, hover, focus, active, disabled, loading và error khi phù hợp
- Content rule — độ dài label, icon và dữ liệu được phép hiển thị
- Responsive behavior — cách component thay đổi theo container hoặc thiết bị

### Ví dụ: Button

Trang Button không chỉ chứa các mẫu nút. Nội dung được tách thành **Guideline**, **Usage**, **Components** và **Ready-made examples**. Cách tổ chức này giúp người dùng thư viện hiểu khi nào nên dùng một variant, cách kết hợp icon và label, cũng như cách component xuất hiện trong ngữ cảnh sản phẩm.

### Nhóm chức năng

Các component được theo dõi theo những nhóm như Input, Navigation, Data Display, Feedback, Overlay, Selection, Dashboard và Chart. Báo cáo tiến độ cho thấy các nhóm cơ bản đã trưởng thành hơn, trong khi Dashboard và Chart còn cần bổ sung coverage và chuẩn hóa.`,
  },
  {
    id: "vic-documentation", folder: "VIC Design System", title: "Documentation và usage guideline", when: "Note 06",
    summary: "Anatomy · Do/Don’t · Ready-made examples",
    body: `Một component chỉ thực sự tái sử dụng được khi team hiểu cách dùng nó. Vì vậy, tài liệu của VIC Design System cần trả lời cả hai câu hỏi: “component được cấu tạo như thế nào?” và “trong trường hợp nào nên sử dụng?”

### Cấu trúc tài liệu đề xuất

1. **Overview** — vai trò và vấn đề component giải quyết
2. **Anatomy** — các phần tử cấu thành
3. **Variants & states** — những phiên bản và trạng thái được hỗ trợ
4. **Usage** — trường hợp nên dùng, không nên dùng và lựa chọn thay thế
5. **Behavior** — interaction, responsive và validation
6. **Content** — quy tắc viết label, helper text và error message
7. **Accessibility** — focus, contrast, keyboard và screen reader
8. **Ready-made examples** — ví dụ component trong sản phẩm thật

### Lý do cần ready-made examples

Variant grid giúp kiểm tra tính đầy đủ của component, nhưng ví dụ thực tế mới cho thấy component có hoạt động tốt trong một flow hay không. Đây là cầu nối giữa component library và các template/application phía trên.`,
  },
  {
    id: "vic-adoption", folder: "VIC Design System", title: "Template và ứng dụng vào sản phẩm", when: "Note 07",
    summary: "Templates · Product adoption · Multi-platform",
    body: `Design system được kiểm chứng khi có thể áp dụng vào sản phẩm thật. Trong VIC, hệ thống đã được sử dụng trên nhiều nền tảng và bối cảnh như **SSO**, **AppStore** và **VERP**.

### SSO

Các màn hình đăng nhập và xác thực sử dụng cùng foundations và component, giúp trải nghiệm nhận diện tài khoản nhất quán giữa nhiều hệ thống.

### AppStore

Design system hỗ trợ giao diện trên nhiều loại thiết bị và sản phẩm. Việc tái sử dụng component giúp giữ cùng một ngôn ngữ thương hiệu trong khi vẫn thích nghi với từng nền tảng.

### VERP

Các màn hình có mật độ dữ liệu cao sử dụng table, filter, form và navigation từ thư viện chung. Đây là môi trường quan trọng để kiểm tra khả năng mở rộng của component trong ứng dụng nghiệp vụ.

### Giá trị quan sát được

- Giảm thời gian dựng lại những pattern quen thuộc
- Tăng tính nhất quán giữa các sản phẩm
- Giúp designer tập trung vào flow và bài toán người dùng
- Cho developer một nguồn tham chiếu rõ ràng hơn
- Bộc lộ sớm những component chưa đủ linh hoạt cho production`,
  },
  {
    id: "vic-maturity", folder: "VIC Design System", title: "Theo dõi độ trưởng thành của hệ thống", when: "Note 08",
    summary: "Coverage · Progress tracking · Quality",
    body: `Báo cáo hiện trạng ghi nhận mức hoàn thiện chung khoảng **68%** tại thời điểm tổng hợp. Con số này được chia nhỏ theo foundations, component library và từng nhóm chức năng để team biết phần nào đã ổn định và phần nào cần đầu tư tiếp.

### Không chỉ đếm số component

Một component chỉ nên được xem là hoàn thiện khi có đủ:

- Thiết kế và variants cần thiết
- State và interaction behavior
- Token được liên kết đúng
- Guideline và ví dụ sử dụng
- Kiểm tra accessibility
- Đối chiếu với implementation trong sản phẩm

### Các hướng cần tiếp tục

- Hoàn thiện motion và interaction guideline
- Tăng coverage cho chart, dashboard và data-heavy pattern
- Bổ sung accessibility checklist cho từng component
- Thiết lập mapping rõ hơn giữa component Figma và component code
- Theo dõi adoption, số lượng variant phát sinh ngoài hệ thống và contribution từ các product team`,
  },
  {
    id: "vic-governance", folder: "VIC Design System", title: "Governance và cách vận hành", when: "Note 09",
    summary: "Contribution · Review · Release",
    body: `Design system là một sản phẩm sống, vì vậy cần có quy trình để tiếp nhận yêu cầu và kiểm soát thay đổi.

### Quy trình đề xuất

1. Product team gửi nhu cầu mới hoặc vấn đề của component hiện tại.
2. Design system team kiểm tra xem nhu cầu có thể giải quyết bằng pattern sẵn có hay không.
3. Nếu cần mở rộng, team xác định use case, impact và phạm vi ảnh hưởng.
4. Component được thiết kế, kiểm thử trong bối cảnh sản phẩm và review với developer.
5. Sau khi phê duyệt, thư viện, tài liệu và phiên bản code được cập nhật cùng nhau.
6. Thay đổi breaking cần có migration note và thời gian chuyển đổi.

### Nguyên tắc quản trị

- Không thêm variant chỉ để giải quyết một màn hình đơn lẻ
- Ưu tiên nhu cầu xuất hiện ở nhiều sản phẩm hoặc flow cốt lõi
- Mọi thay đổi phải có owner và lý do rõ ràng
- Design và code cần dùng chung tên, trạng thái và logic component
- Deprecated component vẫn cần hướng dẫn thay thế trước khi bị loại bỏ`,
  },
  {
    id: "vic-reflection", folder: "VIC Design System", title: "Reflection", when: "Note 10",
    summary: "System thinking · Collaboration · Scale",
    body: `Bài học lớn nhất khi xây dựng VIC Design System là component chỉ là phần dễ nhìn thấy nhất. Giá trị thật của hệ thống đến từ cách foundations, components, patterns, templates và applications liên kết với nhau.

Một design system tốt không cố loại bỏ mọi khác biệt giữa sản phẩm. Nó chuẩn hóa những quyết định nên giống nhau, đồng thời tạo đủ cấu trúc để các team giải quyết nhu cầu riêng mà không phải bắt đầu lại từ đầu.

Việc theo dõi tiến độ theo từng nhóm chức năng cũng giúp team nhìn design system như một sản phẩm dài hạn: có user, backlog, quality criteria, adoption metric và những vòng cải tiến liên tục.`,
  },
];
