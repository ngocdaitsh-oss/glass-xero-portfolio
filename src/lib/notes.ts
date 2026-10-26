/** Usability-testing notes shared by the desktop and mobile Notes apps. */

import { UX_DEFINITION_NOTES } from "./notes-ux-definitions";
import { VIC_NOTES } from "./notes-vic";

export type Note = {
  id: string;
  folder: "Usability Testing" | "VIC Design System" | "UX Design Definitions";
  title: string;
  when: string;
  summary: string;
  pinned?: boolean;
  body: string;
};

export const USABILITY_NOTES: Note[] = [
  {
    id: "research-planning",
    folder: "Usability Testing",
    title: "Chuẩn bị nghiên cứu",
    when: "Note 01",
    summary: "Planning · Moderated usability testing · LMS Pro v2",
    pinned: true,
    body: `### Mục tiêu

Tôi thực hiện usability testing để kiểm tra liệu học viên có thể bắt đầu, tiếp tục và hoàn thành hành trình học trên LMS một cách độc lập hay không. Nghiên cứu tập trung vào hai mục tiêu sản phẩm chính: giúp người học nhận biết tiến độ rõ ràng hơn và giảm ma sát trong các tác vụ học tập cốt lõi.

### Phạm vi kiểm thử

- Đăng nhập và xử lý khi quên mật khẩu
- Tìm bài mới và quay lại bài đang học dở
- Học trong Learning Activity: video, tab, chuyển activity, note và highlight
- Tìm Resource
- Làm Quiz/Test và nộp bài
- Xem lại Test Result
- Hiểu Dashboard và tiến độ học tập
- Tìm Calendar, lọc lịch và xem chi tiết sự kiện

### Phương pháp

Tôi chọn moderated usability testing 1:1, kết hợp think-aloud và retrospective think-aloud. Moderator quan sát trực tiếp hành vi, thời điểm do dự, đường đi sai và lý do phía sau mỗi quyết định. Trước vòng test chính, kịch bản được pilot với 1–2 người nội bộ để kiểm tra thời lượng, dữ liệu test, tài khoản và cách diễn đạt task.

### Người tham gia

Nhóm mục tiêu được xây dựng từ ba chương trình ACCA, CFA, CMA và bối cảnh học online/hybrid. Các proto-persona phản ánh sự khác biệt về cách học: CFA thiên về text dài và luyện đề, ACCA thường học qua video và nhiều môn song song, CMA kết hợp video, case study và test, còn nhóm online/hybrid cần truy cập nhanh vào lịch và lớp học.

### Đầu ra của giai đoạn

Một test plan thống nhất gồm research goals, nhóm người dùng, luồng cần kiểm tra, task script, câu hỏi follow-up và tiêu chí quan sát. Đây là cơ sở để tất cả session được điều phối nhất quán và có thể so sánh với nhau.`,
  },
  {
    id: "script-and-metrics",
    folder: "Usability Testing",
    title: "Xây dựng kịch bản và metric",
    when: "Note 02",
    summary: "Test script · Task metrics · Desktop + Mobile",
    body: `### Cách thiết kế task

Task được viết theo bối cảnh thực tế thay vì hướng dẫn người dùng bấm vào đâu. Ví dụ: “Hãy tìm lại bài học bạn đang học dở và tiếp tục học” hoặc “Hãy tìm lịch học gần nhất và vào lớp”. Cách viết này giúp kiểm tra đúng mental model và khả năng khám phá của giao diện.

### Dữ liệu ghi nhận cho từng subtask

- **Completion:** hoàn thành đúng, hoàn thành nhưng có lỗi/đi đường vòng, hoặc không hoàn thành
- **Path deviation:** đi đúng luồng, đi sai nhưng vẫn về đích, hoặc dead-end
- **Severity:** 0 — không có vấn đề; 1 — minor; 2 — moderate; 3 — major; 4 — blocker
- **Time on task:** thời gian thực tế so với target time
- **Frequency:** mức độ thường xuyên thực hiện trong bối cảnh học thật
- **Evidence:** hành vi quan sát được, câu nói của người dùng và điểm cần moderator hỗ trợ

### Nguyên tắc ghi note

Tôi tách dữ kiện quan sát khỏi diễn giải. “Người dùng quay lại breadcrumb ba lần” là evidence; “navigation không khớp mental model” là insight. Việc phân tách này giúp affinity diagram không biến thành tập hợp ý kiến chủ quan.`,
  },
  {
    id: "session-notes",
    folder: "Usability Testing",
    title: "Điều phối và ghi nhận session",
    when: "Note 03",
    summary: "7 participants · Moderated 1:1 · Think-aloud",
    body: `### Trong mỗi session

Tôi quan sát điểm bắt đầu, thứ tự thao tác, thời gian do dự, số lần đổi hướng và thời điểm cần gợi ý. Sau mỗi scenario, người tham gia mô tả lại phần khó hiểu nhất để xác định nguyên nhân gốc thay vì chỉ ghi nhận rằng họ “làm sai”.

### Cách chuẩn hóa dữ liệu

Mỗi dòng trong bảng note tương ứng với một subtask và một người tham gia. Dữ liệu định lượng gồm status, thời gian, đường đi và severity; dữ liệu định tính gồm hành vi, câu nói, kỳ vọng và thói quen học ngoài LMS. Phần lớn các tỷ lệ tổng hợp dùng mẫu **n=7**; một số subtask có ít dữ liệu hơn nên được đọc theo sample base riêng.

### Quan sát nổi bật

- Người học thường nhớ vị trí bài học bằng trí nhớ thay vì dựa vào trạng thái trên hệ thống.
- Các công cụ như Note, Highlight và Calculator tồn tại nhưng ít được nhận biết hoặc không đủ hữu ích để thay thế giấy, Notion hay máy tính ngoài.
- Calendar được đánh giá là hữu ích sau khi tìm thấy, nhưng entry point lại khó khám phá.
- Người dùng kỳ vọng video hoạt động giống YouTube/Facebook và kỳ vọng navigation nhất quán giữa các màn.`,
  },
  {
    id: "metric-summary",
    folder: "Usability Testing",
    title: "Tổng hợp metric",
    when: "Note 04",
    summary: "Completion · Severity · Time on task · Path deviation",
    body: `### Kết quả chính

| Subtask | Kết quả | Thời gian trung bình | Ý nghĩa |
|---|---:|---:|---|
| Quay lại bài đang học dở | 100% không hoàn thành đúng | 40.7s | Điểm gãy lớn nhất của learning continuity |
| Tìm Calendar | 85.7% không hoàn thành | 29.8s | Entry point không theo mental model |
| Thao tác với video | 85.7% không hoàn thành đầy đủ | 16.25s | Interaction pattern lệch khỏi nền tảng quen thuộc |
| Tìm và dùng Note/Highlight | 85.7% không hoàn thành đầy đủ | Thiếu dữ liệu ổn định | Discoverability và perceived value đều thấp |
| Tìm Resource | 57% không hoàn thành | 14s | LMS chưa được xem là nguồn tài liệu chính |
| Hiểu tiến độ Dashboard | 43% không hoàn thành | 34.4s | Cách tính và phân tầng dữ liệu chưa rõ |
| Hiểu các vùng Dashboard | 57% không hoàn thành | 43.2s | Radar chart gây tải nhận thức và thiếu tin cậy |
| Tìm lại Test Result | 33.3% không hoàn thành | 25.7s | Entry point và nhãn Test/Test Result dễ nhầm |

### Điều đã hoạt động tốt

- 100% người dùng có thể đăng nhập, dù 43% phải đi đường vòng.
- Trạng thái câu hỏi trong bài test và flow nộp bài nhìn chung dễ hiểu.
- Breakdown theo topic và xem lại câu sai đạt tỷ lệ hoàn thành cao.
- Khi đã vào Calendar, đổi chế độ xem, lọc và mở chi tiết event tương đối dễ dùng.

### Kết luận từ metric

Vấn đề nghiêm trọng không nằm ở việc người dùng “không biết dùng LMS”. Họ bị đứt mạch vì không biết mình đang ở đâu, bước tiếp theo là gì và phải quay lại đúng nơi bằng cách nào. Khoảng một phần tư interaction trở thành dead-end, cho thấy đây là vấn đề cấp hệ thống chứ không phải một vài lỗi UI rời rạc.`,
  },
  {
    id: "affinity-insights",
    folder: "Usability Testing",
    title: "Affinity diagram và insight",
    when: "Note 05",
    summary: "Evidence clustering · Insight statements · UX patterns",
    body: `### Cách tôi tổng hợp

Tôi chuyển note thô thành evidence card, sau đó gom các card có cùng hành vi hoặc nguyên nhân. Mỗi cụm được viết lại thành insight statement gồm ba phần: điều người dùng cố làm, trở ngại họ gặp và tác động lên hành trình học.

### Năm pattern chính

1. **Navigation & Flow Continuity** — Người học không biết bắt đầu từ đâu, đi theo đường nào hoặc quay lại đúng chỗ như thế nào.
2. **State Visibility & System Feedback** — Hệ thống có lưu trạng thái nhưng không hiển thị đủ rõ hoặc nhất quán, khiến người học không nhận ra hay không tin vào trạng thái đó.
3. **Information Clarity & Cognitive Load** — Người học nhìn thấy dữ liệu nhưng không hiểu cách tổ chức, cách tính hoặc ý nghĩa của dữ liệu.
4. **Feature Value & Adoption** — Nhiều tính năng không hỏng về mặt usability nhưng chưa tạo ra giá trị đủ mạnh để thay đổi thói quen dùng giấy, Zalo, Drive hay công cụ bên ngoài.
5. **Mental Model Mismatch** — Cách tương tác, đặc biệt ở video và navigation, không khớp với pattern quen thuộc từ các nền tảng phổ biến.

### Insight statement tổng hợp

LMS đang hỗ trợ nhiều chức năng học tập, nhưng chưa tạo được một hành trình liên tục và có định hướng. Người học có thể hoàn thành từng tác vụ riêng lẻ, nhưng dễ mất phương hướng khi chuyển giữa Dashboard, Course Content, Learning Activity, Calendar và Test Result.`,
  },
  {
    id: "flow-prioritization",
    folder: "Usability Testing",
    title: "Trọng số luồng và ưu tiên vấn đề",
    when: "Note 06",
    summary: "Flow importance · Weighted severity · Prioritization",
    body: `### Cách ưu tiên

Sau affinity diagram, tôi không xếp hạng vấn đề chỉ bằng số lần xuất hiện. Mỗi flow được đánh giá theo mức độ quan trọng trong hành trình, sau đó kết hợp với severity quan sát được ở từng nhóm người dùng.

Các yếu tố phản ánh **flow importance** nên gồm:

- Task criticality — tác vụ có nằm trong mục tiêu cốt lõi của người học hay không
- Business impact — tác động đến engagement, retention và completion rate
- Frequency of use — tần suất flow xuất hiện trong quá trình học
- Dependency in journey — flow có mở khóa hoặc ảnh hưởng đến các bước sau hay không

Complexity và newness được tách khỏi importance vì một flow đơn giản hoặc quen thuộc vẫn có thể cực kỳ quan trọng. Hai yếu tố này phù hợp hơn khi ước lượng effort hoặc rủi ro triển khai.

### Thứ tự ưu tiên đề xuất

1. **Resume learning và trạng thái bài học** — critical flow, 100% thất bại, ảnh hưởng trực tiếp đến continuity và course completion.
2. **Tìm Calendar từ mọi ngữ cảnh** — 85.7% thất bại, có thể ảnh hưởng đến attendance và việc vào lớp đúng giờ.
3. **Video interaction** — thành phần học tập cốt lõi nhưng 85.7% không hoàn thành đầy đủ thao tác được yêu cầu.
4. **Dashboard clarity và progress model** — dữ liệu tồn tại nhưng chưa giúp người học hiểu hoặc tin vào tiến độ.
5. **Entry point của Test Result và Resource** — ảnh hưởng đến khả năng ôn tập và sử dụng LMS như một learning hub.
6. **Adoption của Note, Highlight và Calculator** — cần đánh giá lại value proposition trước khi chỉ cải thiện discoverability.

### Nguyên tắc ra quyết định

Ưu tiên cao nhất thuộc về vấn đề vừa nghiêm trọng, vừa xảy ra trong flow cốt lõi, vừa kéo theo nhiều bước sau. Một lỗi nhỏ xuất hiện thường xuyên không mặc nhiên quan trọng hơn một blocker làm đứt toàn bộ hành trình học.`,
  },
  {
    id: "problems-and-criteria",
    folder: "Usability Testing",
    title: "UX problems và success criteria",
    when: "Note 07",
    summary: "Problem framing · Baseline · Target metrics",
    body: `### UX Problem 1 — Navigation model breakdown

Người học không thể bắt đầu, tiếp tục hoặc quay lại hành trình học theo cách tự nhiên vì cấu trúc điều hướng không phù hợp với mental model của họ.

**Target:** resume learning ≥ 80%; tìm Calendar ≥ 70%; đi sai luồng ≤ 15%.

### UX Problem 2 — Poor state visibility

Trạng thái học tập không xuất hiện rõ ràng và nhất quán tại nơi người dùng cần ra quyết định.

**Target:** nhận diện đúng bài đang học dở ≥ 80%; hiểu tiến độ Dashboard ≥ 80%.

### UX Problem 3 — Low information clarity

Dashboard và Test Result hiển thị nhiều dữ liệu nhưng thiếu phân tầng và ngữ cảnh giải thích.

**Target:** hiểu Dashboard trong ≤ 20 giây; tỷ lệ hiểu sai dữ liệu ≤ 5%; đánh giá độ rõ ràng ≥ 4/5.

### UX Problem 4 — Low feature value & adoption

Các feature hỗ trợ học chưa đủ dễ thấy hoặc chưa mang lại lợi ích rõ ràng hơn thói quen hiện tại.

**Target:** tìm thấy Resource ≥ 75%; sử dụng Note/Highlight ≥ 40%; Calendar trở thành kênh được sử dụng thường xuyên hơn.

### UX Problem 5 — Core learning interaction friction

Video player không tuân theo interaction pattern quen thuộc, làm gián đoạn việc học.

**Target:** hoàn thành thao tác video ≥ 80%; nhận diện control ≥ 85%; tỷ lệ lỗi ≤ 20%.`,
  },
  {
    id: "next-design-direction",
    folder: "Usability Testing",
    title: "Hướng thiết kế tiếp theo",
    when: "Note 08",
    summary: "Ideation · Design direction · Validation",
    body: `- Thêm khu vực **Tiếp tục học** trên Dashboard, kèm bài đang học, vị trí, tiến độ và hành động chính rõ ràng.
- Chuẩn hóa sidebar và entry point giữa My Courses, Course Content, Dashboard và Calendar.
- Hiển thị trạng thái **Completed / In progress / Not started** nhất quán ở mọi màn.
- Giảm số lượng biểu đồ, thay radar chart bằng dạng trực quan quen thuộc hơn và thêm ngữ cảnh cho từng chỉ số.
- Thiết kế video player theo pattern phổ biến: tua 10 giây, timeline rõ, control dễ nhận diện và PiP có giải thích.
- Đặt Note, Highlight và Resource đúng ngữ cảnh sử dụng; đồng thời kiểm tra xem feature có giải quyết nhu cầu thật hay chỉ sao chép công cụ người học đã có.
- Chạy vòng usability testing tiếp theo trên prototype và đo lại đúng các baseline/target ở trên.

### Reflection

Bài học lớn nhất của nghiên cứu này là usability không chỉ nằm ở khả năng hoàn thành một màn hình. Một LMS có thể chứa đầy đủ chức năng nhưng vẫn không trở thành công cụ học tập trung tâm nếu người học không biết mình đang ở đâu, không tin vào trạng thái hệ thống và không thấy lý do để thay đổi thói quen hiện tại.`,
  },
];

export const NOTES: Note[] = [...USABILITY_NOTES, ...VIC_NOTES, ...UX_DEFINITION_NOTES];

export const FOLDERS: { name: string; count: number }[] = [
  { name: "All notes", count: NOTES.length },
  { name: "Usability Testing", count: USABILITY_NOTES.length },
  { name: "VIC Design System", count: VIC_NOTES.length },
  { name: "UX Design Definitions", count: UX_DEFINITION_NOTES.length },
];

export const FOLDER_ICON: Record<string, string> = {
  "All notes": "/figma/notes/file.svg",
  "Usability Testing": "/figma/notes/users.svg",
  "VIC Design System": "/figma/notes/columns.svg",
  "UX Design Definitions": "/figma/notes/chip-palette.svg",
};
