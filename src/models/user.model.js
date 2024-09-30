export default class UserModel {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
  static add(userObj) {
    console.log(userObj);
    users.push(
      new UserModel(
        users.length + 1,
        userObj.name,
        userObj.email,
        userObj.password
      )
    );
  }

  static validateUser(email, password) {
    const user = users.find((u) => u.email == email && u.password == password);
    return user;
  }

  static getUserNameByEmail(email) {
    const user = users.find((j) => j.email == email);
    if (user) {
      return user.name;
    } else {
      return undefined;
    }
  }

  static getUserId(email, pass) {
    const user = users.find((u) => u.email == email && u.password == pass);
    return user.id;
  }
}

var users = [];
