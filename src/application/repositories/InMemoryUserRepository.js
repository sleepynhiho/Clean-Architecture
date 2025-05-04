// Lớp này triển khai cụ thể cách lưu trữ User vào bộ nhớ.
// Nó tuân thủ hợp đồng đã định nghĩa trong UserRepository (interface).
class InMemoryUserRepository extends UserRepository {
  constructor() {
    super(); 
    this.users = [];
    this.currentId = 1;
  }

  /**
   * @override
   */
  async add(user) {
    await new Promise(resolve => setTimeout(resolve, 50));
    const newId = this.currentId++;
    const userWithId = new User(newId, user.name, user.email);

    this.users.push(userWithId);
    console.log('Đã thêm vào InMemory DB:', userWithId);
    return userWithId;
  }

  /**
   * @override
   */
  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 50));

    const userId = parseInt(id, 10); //
    const user = this.users.find(u => u.id === userId);
    console.log(`Tìm kiếm ID ${id} trong InMemory DB:`, user ? user : 'Không tìm thấy');
    return user || null; 
  }
}
