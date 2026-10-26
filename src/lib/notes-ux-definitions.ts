import type { Note } from "./notes";

export const UX_DEFINITION_NOTES: Note[] = [
  {
    id: "ux-overall-experience", folder: "UX Design Definitions", title: "UX Design là thiết kế trải nghiệm tổng thể", when: "Note 01",
    summary: "End-to-end experience · Usability · Trust", pinned: true,
    body: `UX Design là quá trình thiết kế toàn bộ trải nghiệm của người dùng khi tương tác với một sản phẩm hoặc dịch vụ. Trải nghiệm này bắt đầu từ lúc người dùng nhận ra nhu cầu, tìm đến sản phẩm, thực hiện nhiệm vụ và tiếp tục sau khi đã hoàn thành mục tiêu.

UX không chỉ là những gì xuất hiện trên màn hình. Nó còn bao gồm mức độ dễ hiểu, tốc độ, cảm xúc, sự tin tưởng và khả năng nhận được hỗ trợ khi có vấn đề.`,
  },
  {
    id: "ux-problem-solving", folder: "UX Design Definitions", title: "UX Design là giải quyết vấn đề của người dùng", when: "Note 02",
    summary: "User needs · Context · Problem solving",
    body: `UX Design bắt đầu từ việc hiểu người dùng đang muốn làm gì và điều gì đang cản trở họ. Designer nghiên cứu hành vi, nhu cầu và bối cảnh sử dụng trước khi đề xuất giải pháp.

Một thiết kế tốt không nhất thiết phải có nhiều tính năng. Nó cần giải quyết đúng vấn đề và giúp người dùng đạt được mục tiêu với ít khó khăn nhất.`,
  },
  {
    id: "ux-usability", folder: "UX Design Definitions", title: "UX Design là tạo ra sản phẩm dễ sử dụng", when: "Note 03",
    summary: "Usability · Task success · Error recovery",
    body: `Một phần quan trọng của UX Design là usability — khả năng sử dụng của sản phẩm. Người dùng cần hiểu họ có thể làm gì, bắt đầu từ đâu, hệ thống đang ở trạng thái nào và bước tiếp theo là gì.

Một sản phẩm có usability tốt thường giúp người dùng:

- Hoàn thành nhiệm vụ thành công
- Mất ít thời gian hơn
- Ít mắc lỗi hơn
- Dễ phục hồi khi có lỗi
- Không cần được hướng dẫn quá nhiều`,
  },
  {
    id: "ux-user-business", folder: "UX Design Definitions", title: "UX Design là kết nối nhu cầu người dùng và mục tiêu kinh doanh", when: "Note 04",
    summary: "User value · Business goals · Feasibility",
    body: `UX Design không chỉ phục vụ người dùng mà còn phải tạo ra giá trị cho tổ chức. Một giải pháp tốt cần cân bằng giữa nhu cầu người dùng, mục tiêu kinh doanh và khả năng triển khai kỹ thuật.

Ví dụ, cải thiện flow đăng ký có thể giúp người dùng hoàn thành nhanh hơn, đồng thời tăng conversion rate cho doanh nghiệp. Khi hai mục tiêu này hỗ trợ lẫn nhau, UX trở thành một phần của chiến lược sản phẩm.`,
  },
  {
    id: "ux-evidence", folder: "UX Design Definitions", title: "UX Design là thiết kế dựa trên bằng chứng", when: "Note 05",
    summary: "Research evidence · Data · Design decisions",
    body: `Quyết định UX không nên chỉ dựa trên sở thích cá nhân hoặc cảm giác rằng một giao diện “trông đẹp”. Designer cần sử dụng dữ liệu từ user interview, usability testing, analytics, survey và phản hồi của khách hàng.

Bằng chứng giúp team phân biệt giữa điều mình giả định và điều người dùng thực sự trải nghiệm. Tuy nhiên, dữ liệu không tự đưa ra đáp án; designer vẫn cần phân tích nguyên nhân và chuyển insight thành quyết định thiết kế.`,
  },
  {
    id: "ux-iteration", folder: "UX Design Definitions", title: "UX Design là một quá trình lặp lại", when: "Note 06",
    summary: "Research → Define → Ideate → Prototype → Test → Improve",
    body: `UX Design không kết thúc khi giao diện được bàn giao. Sản phẩm cần được nghiên cứu, thiết kế, kiểm thử, triển khai và tiếp tục cải thiện dựa trên dữ liệu thực tế.

Một vòng lặp UX thường bao gồm:

**Research → Define → Ideate → Prototype → Test → Improve**

Mỗi vòng kiểm thử giúp team phát hiện giả định chưa đúng, giảm rủi ro và đưa sản phẩm đến gần nhu cầu thực tế hơn.`,
  },
  {
    id: "ux-context", folder: "UX Design Definitions", title: "UX Design là thiết kế theo bối cảnh", when: "Note 07",
    summary: "People · Devices · Environment · Accessibility",
    body: `Cùng một giao diện có thể mang lại trải nghiệm khác nhau tùy thuộc vào người sử dụng, thiết bị, môi trường và thời điểm sử dụng.

Người dùng có thể đang vội, thiếu tập trung, sử dụng điện thoại bằng một tay hoặc gặp hạn chế về thị giác và vận động. Vì vậy, UX Designer không chỉ hỏi “giao diện có hoạt động không?” mà còn hỏi “nó có hoạt động tốt trong hoàn cảnh thực tế không?”.`,
  },
  {
    id: "ux-quality", folder: "UX Design Definitions", title: "UX Design là tạo ra trải nghiệm hữu ích, dễ dùng và đáng tin cậy", when: "Note 08",
    summary: "Useful · Usable · Accessible · Credible · Valuable",
    body: `Một sản phẩm có UX tốt cần đáp ứng nhiều yếu tố cùng lúc:

- **Useful:** giải quyết một nhu cầu thực tế
- **Usable:** dễ học và dễ sử dụng
- **Accessible:** nhiều nhóm người có thể tiếp cận
- **Desirable:** tạo cảm xúc và nhận diện phù hợp
- **Credible:** khiến người dùng cảm thấy an toàn và tin tưởng
- **Valuable:** mang lại giá trị cho cả người dùng và tổ chức

UX tốt không có nghĩa là người dùng luôn chú ý đến thiết kế. Trong nhiều trường hợp, trải nghiệm tốt nhất là khi họ có thể hoàn thành mục tiêu một cách tự nhiên mà không phải suy nghĩ về cách hệ thống hoạt động.`,
  },
];
