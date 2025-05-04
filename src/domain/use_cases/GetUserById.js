class GetUserById {
  constructor(userRepository) {
     if (!userRepository) {
      throw new Error('UserRepository là bắt buộc.');
    }
    this.userRepository = userRepository;
  }

  async execute(userId) {
    if (userId === null || userId === undefined) {
        throw new Error('ID người dùng là bắt buộc.');
    }

    try {
      const user = await this.userRepository.getById(userId);
      return user; 
    } catch (error) {
      console.error("Lỗi khi lấy người dùng theo ID trong Use Case:", error);
      throw new Error(`Không thể lấy người dùng: ${error.message}`);
    }
  }
}
