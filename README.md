# Project sử dụng clean architecture

Ứng dụng là một hệ thống quản lý người dùng siêu đơn giản:
*   Thêm người dùng mới (với tên và email).
*   Lấy thông tin người dùng theo ID.
*   Dữ liệu được lưu trữ tạm thời trong bộ nhớ (in-memory).

## Tính năng

*   Thêm người dùng với Tên và Email.
*   Truy vấn người dùng dựa trên ID.
*   Lưu trữ dữ liệu trong bộ nhớ (dữ liệu sẽ mất khi làm mới trang).
*   Giao diện người dùng (UI) Web cơ bản để tương tác.
*   Minh họa rõ ràng các lớp của Clean Architecture.

## Công nghệ sử dụng

*   **JavaScript (ES6+)**: Ngôn ngữ chính, chạy trực tiếp trên trình duyệt.
*   **HTML5**: Cấu trúc giao diện người dùng.
*   **CSS3**: Định dạng và làm đẹp giao diện.
*   **Không có Framework/Thư viện Lõi**: Tập trung vào việc triển khai Clean Architecture bằng JS thuần.

## Cấu trúc thư mục (Clean Architecture)

Dự án tuân theo cấu trúc thư mục dựa trên các lớp của Clean Architecture:

CLEAN-ARCHITECTURE/
└── src/
├── domain/ # 💡 Business logic cốt lõi
│ ├── entities/ # └── User.js (Entity nghiệp vụ)
│ ├── use_cases/ # └── AddUser.js, GetUserById.js
│ └── repositories/ # └── UserRepository.js (Interface)
│
├── application/ # 🔁 Interface adapters
│ ├── controllers/ # └── UserController.js
│ ├── presenters/ # └── UserPresenter.js
│ └── repositories/ # └── InMemoryUserRepository.js
│
├── infrastructure/ # 🌐 Giao diện và lưu trữ
│ ├── web/ # └── index.html, main.js (Composition Root)
│ └── database/ # (Sử dụng InMemory ở đây)
│
└── README.md # 📘 Tài liệu hướng dẫn

**Quy tắc phụ thuộc (Dependency Rule):** Mũi tên phụ thuộc luôn hướng vào trong.
`Infrastructure` -> `Application` -> `Domain`. Lớp `Domain` không biết gì về các lớp bên ngoài nó.

## 🛠️ Cách chạy dự án

1.  **Tải mã nguồn về và extract**

2.  **Mở file HTML:**
    Mở file `src/infrastructure/web/index.html` bằng trình duyệt web (go live).

3.  **Sử dụng ứng dụng:**
    Giao diện web sẽ hiện ra, cho phép bạn thêm người dùng và lấy người dùng theo ID.

4.  **(Khuyến nghị) Mở Developer Console:**
    Nhấn `F12` (hoặc chuột phải -> Inspect -> Console) để mở công cụ nhà phát triển của trình duyệt. Bạn sẽ thấy các log từ `main.js` và các lớp khác, giúp hiểu rõ hơn luồng hoạt động.

## Các khái niệm chính (Clean Architecture)

Dự án này minh họa các khái niệm sau:

*   **Phân lớp (Layering):** Tách biệt rõ ràng các mối quan tâm (concern separation) thành các lớp Domain, Application, Infrastructure.
*   **Quy tắc phụ thuộc (Dependency Rule):** Mã nguồn ở các lớp bên trong không được phụ thuộc vào mã nguồn ở các lớp bên ngoài. Sự phụ thuộc chỉ hướng vào trong.
*   **Entities (Thực thể):** (`src/domain/entities`) Đại diện cho các đối tượng nghiệp vụ cốt lõi (ví dụ: `User`).
*   **Use Cases (Trường hợp sử dụng):** (`src/domain/use_cases`) Chứa logic ứng dụng cụ thể, điều phối các Entity để hoàn thành một nhiệm vụ (ví dụ: `AddUser`, `GetUserById`).
*   **Repository Interface (Giao diện Kho lưu trữ):** (`src/domain/repositories`) Định nghĩa một "hợp đồng" trừu tượng cho việc truy cập dữ liệu, không quan tâm đến cách lưu trữ cụ thể. Lớp Domain phụ thuộc vào interface này.
*   **Repository Implementation (Triển khai Kho lưu trữ):** (`src/application/repositories`) Cung cấp cách triển khai *cụ thể* cho Repository Interface (ví dụ: `InMemoryUserRepository`). Lớp Application (hoặc Infrastructure) triển khai interface từ Domain.
*   **Controllers (Bộ điều khiển):** (`src/application/controllers`) Nhận đầu vào từ lớp ngoài cùng (UI), gọi Use Case phù hợp và trả kết quả (thông qua Presenter).
*   **Presenters (Bộ trình bày):** (`src/application/presenters`) Định dạng dữ liệu từ Use Case/Entity thành dạng phù hợp cho UI hoặc lớp ngoài cùng.
*   **Composition Root:** (`src/infrastructure/web/main.js`) Là nơi khởi tạo và "tiêm" (inject) các dependency vào các lớp. Nó là nơi duy nhất mà các lớp cụ thể (như `InMemoryUserRepository`) được khởi tạo và truyền vào các lớp cần chúng (như `AddUser` Use Case).


