class AddUser {
  constructor(userRepository) {
    if (!userRepository) {
      throw new Error('UserRepository là bắt buộc.');
    }
    this.userRepository = userRepository;
  }

  async execute(userData) {
    if (!userData || !userData.name || !userData.email) {
      throw new Error('Dữ liệu người dùng không hợp lệ.');
    }
    const user = new User(null, userData.name, userData.email);

    try {
      const addedUser = await this.userRepository.add(user);
      return addedUser;
    } catch (error) {
      console.error("Lỗi khi thêm người dùng trong Use Case:", error);
      throw new Error(`Không thể thêm người dùng: ${error.message}`);
    }
  }
}
