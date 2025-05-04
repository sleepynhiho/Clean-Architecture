class User {
  constructor(id, name, email) {
    if (!name || !email) {
      throw new Error('Tên và email là bắt buộc.');
    }
    this.id = id; 
    this.name = name;
    this.email = email;
  }
}
