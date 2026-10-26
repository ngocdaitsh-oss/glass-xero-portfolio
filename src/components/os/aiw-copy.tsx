"use client";

import { useLang } from "@/lib/i18n";

/**
 * "01 — Overview" body, shared by the desktop AI Workflow document and the
 * mobile page. Rich copy with bold phrases, so it branches on the language.
 */
export function OverviewCopy({ strong = "font-semibold text-[#0a0a0a]" }: { strong?: string }) {
  const lang = useLang();
  const b = strong;
  return (
    <>
      {lang === "vi" ? (
            <>
              <p>
                Quy trình bắt đầu từ việc <strong className={b}>tiếp nhận yêu cầu</strong>,{" "}
                <strong className={b}>phân tích tài liệu</strong>, <strong className={b}>xác định</strong> user flow,
                màn hình, state và các edge case.
              </p>
              <p>
                Sau đó, AI hỗ trợ <strong className={b}>đề xuất cấu trúc thiết kế</strong>,{" "}
                <strong className={b}>rà soát logic</strong>, <strong className={b}>kiểm tra tính nhất quán</strong> và
                chuẩn bị nội dung bàn giao. Designer vẫn giữ vai trò chính trong việc đánh giá, chỉnh sửa và đảm bảo
                kết quả phù hợp với sản phẩm cuối cùng.
              </p>
            </>
          ) : (
          <>
          <p>
            The process begins with <strong className={b}>receiving requirements</strong>,{" "}
            <strong className={b}>analyzing documents</strong>,{" "}
            <strong className={b}>identifying</strong> user flow, screens, state, and edge
            cases.
          </p>
          <p>
            Then, AI assists in suggesting <strong className={b}>design structures</strong>,{" "}
            <strong className={b}>reviewing logic</strong>,{" "}
            <strong className={b}>checking consistency</strong>, and preparing content
            handoffs. Designers remain the primary role in evaluating, editing, and ensuring the output aligns with the
            final product.
          </p>
          </>
          )}
    </>
  );
}
