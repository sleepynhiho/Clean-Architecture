document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM đã tải xong. Khởi tạo ứng dụng...');

  // Lớp ngoài cùng (Infrastructure) biết về tất cả các lớp khác để khởi tạo chúng.
  // Nhưng các lớp bên trong (Domain, Application) không biết về Infrastructure.

  try {
      const userRepository = new InMemoryUserRepository();
      console.log('UserRepository đã khởi tạo:', userRepository);

      const addUserUseCase = new AddUser(userRepository);
      const getUserByIdUseCase = new GetUserById(userRepository);
      console.log('Use Cases đã khởi tạo.');

      const userPresenter = new UserPresenter();
      console.log('Presenter đã khởi tạo.');

      const userController = new UserController(addUserUseCase, getUserByIdUseCase, userPresenter);
      console.log('UserController đã khởi tạo:', userController);


      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const addUserBtn = document.getElementById('addUserBtn');
      const addUserResultDiv = document.getElementById('addUserResult');

      const userIdInput = document.getElementById('userId');
      const getUserBtn = document.getElementById('getUserBtn');
      const getUserResultDiv = document.getElementById('getUserResult');

      addUserBtn.addEventListener('click', async () => {
          const name = nameInput.value.trim();
          const email = emailInput.value.trim();

          if (!name || !email) {
              addUserResultDiv.innerHTML = '<pre style="color: red;">Lỗi: Vui lòng nhập tên và email.</pre>';
              return;
          }

          const request = {
              body: { name, email }
          };

          addUserResultDiv.innerHTML = 'Đang xử lý...';
          console.log('Gọi userController.addUser với request:', request);

          const result = await userController.addUser(request);
          console.log('Kết quả từ userController.addUser:', result);
          addUserResultDiv.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;

          if(result.success !== false) {
               nameInput.value = '';
               emailInput.value = '';
          }
      });

      getUserBtn.addEventListener('click', async () => {
          const userId = userIdInput.value.trim();

          if (!userId) {
              getUserResultDiv.innerHTML = '<pre style="color: red;">Lỗi: Vui lòng nhập ID người dùng.</pre>';
              return;
          }

          const request = {
              params: { id: userId }
          };

          getUserResultDiv.innerHTML = 'Đang tìm kiếm...';
          console.log('Gọi userController.getUser với request:', request);

          const result = await userController.getUser(request);

          console.log('Kết quả từ userController.getUser:', result);
          getUserResultDiv.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
      });

      console.log('Ứng dụng đã sẵn sàng.');

  } catch (error) {
      console.error("Lỗi nghiêm trọng khi khởi tạo ứng dụng:", error);
      document.body.innerHTML = `<h1 style="color:red">Lỗi khởi tạo ứng dụng: ${error.message}</h1><p>Kiểm tra console để biết chi tiết.</p>`;
  }
});