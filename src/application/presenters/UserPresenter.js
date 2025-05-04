class UserPresenter {
  present(user) {
    if (!user) {
        return null; 
    }
    return {
      id: user.id,
      name: user.name, 
      email: user.email 
    };
  }

  presentError(error, statusCode = 500) {
      return {
          success: false,
          error: {
              message: error.message || 'Đã có lỗi xảy ra.',
          },
          status: statusCode
      };
  }
}
