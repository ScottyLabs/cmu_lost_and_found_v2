// Work in Progress

export default class UserController {
  /**
   * Login a user given a token
   * @param  {String}   token    auth token
   * @param  {Function} callback args(err, token, user)
   */
  loginWithToken(token: string, callback: Function) {
    // User.getByToken(token, function(err, user){
    //     return callback(err, token, user);
    // });
  }

  /**
   * Login a user given an email and password.
   * @param  {String}   email    Email address
   * @param  {String}   password Password
   * @param  {Function} callback args(err, token, user)
   */
  loginWithPassword(email: string, password: string, callback: Function) {}

  /**
   * Determine whether or not a user can register.
   * @param  {String}   email    Email of the user
   * @param  {Function} callback args(err, true, false)
   * @return {[type]}            [description]
   */
  canRegister(email: string, password: string, callback: Function) {
    if (!password || password.length < 6) {
      return callback(
        { message: "Password must be 6 or more characters." },
        false
      );
    }
  }

  createUser(email: string, password: string, callback: Function) {
    email = email.toLowerCase();

    // Check that there isn't a user with this email already.
    this.canRegister(email, password, function (err: Error, valid: boolean) {
      if (err || !valid) {
        return callback(err);
      }

      // var u = new User();
      // u.email = email;
      // u.password = User.generateHash(password);
      // u.save(function (err) {
      //   if (err) {
      //     // Duplicate key error codes
      //     if (
      //       err.name === "MongoError" &&
      //       (err.code === 11000 || err.code === 11001)
      //     ) {
      //       return callback({
      //         message: "An account for this email already exists.",
      //       });
      //     }

      //     return callback(err);
      //   } else {
      //     // yay! success.
      //     var token = u.generateAuthToken();

      //     return callback(null, {
      //       token: token,
      //       user: u,
      //     });
      //   }
      // });
    });
  }
}
