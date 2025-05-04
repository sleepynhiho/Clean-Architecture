class UserController {
  constructor(addUserUseCase, getUserByIdUseCase, userPresenter) {
     if (!addUserUseCase || !getUserByIdUseCase) {
      throw new Error('Use Cases là bắt buộc cho Controller.');
    }
    this.addUserUseCase = addUserUseCase;
    this.getUserByIdUseCase = getUserByIdUseCase;
    this.userPresenter = userPresenter; 
  }

  async addUser(req) {
    try {
      const userData = req.body; 
      if (!userData) throw new Error("Dữ liệu yêu cầu không hợp lệ.");

      const addedUser = await this.addUserUseCase.execute(userData);
      if (this.userPresenter) {
        return this.userPresenter.present(addedUser);
      }
      return { success: true, user: addedUser }; 

    } catch (error) {
      console.error("Lỗi trong UserController (addUser):", error);
       if (this.userPresenter) {
        return this.userPresenter.presentError(error);
      }
      return { success: false, error: error.message };
    }
  }

  async getUser(req) {
    try {
      const userId = req.params.id; 
      if (userId === undefined) throw new Error("ID người dùng là bắt buộc.");

      const user = await this.getUserByIdUseCase.execute(userId);

      if (!user) {
        const notFoundError = new Error(`Người dùng với ID ${userId} không tồn tại.`);
         if (this.userPresenter) {
           return this.userPresenter.presentError(notFoundError, 404); 
         }
         return { success: false, error: notFoundError.message, status: 404 };
      }

       if (this.userPresenter) {
        return this.userPresenter.present(user);
      }
      return { success: true, user: user };

    } catch (error) {
      console.error("Lỗi trong UserController (getUser):", error);
       if (this.userPresenter) {
        return this.userPresenter.presentError(error);
      }
      return { success: false, error: error.message };
    }
  }
}
