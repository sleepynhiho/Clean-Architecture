// Đây là một "Interface" hoặc "Abstract Class" định nghĩa các phương thức
// mà một Repository cụ thể *phải* triển khai.
// Nó KHÔNG chứa logic triển khai cụ thể.
class UserRepository {
  constructor() {
    if (this.constructor === UserRepository) {
      throw new Error("Không thể khởi tạo lớp trừu tượng UserRepository trực tiếp.");
    }
  }

  async add(user) {
    throw new Error("Phương thức 'add' chưa được triển khai.");
  }

  async getById(id) {
    throw new Error("Phương thức 'getById' chưa được triển khai.");
  }
}
