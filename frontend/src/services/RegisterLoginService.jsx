// class RegisterLoginService {

//     login(username, password){
//         console.log(username,password)
//     }
// }

class RegisterLoginService {
    async login(username, password) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username === "validUser" && password === "validPassword") {
            console.log("Login successful");
            resolve(true);
          } else {
            console.error("Invalid credentials");
            reject("Invalid credentials");
          }
        }, 1000); 
      });
    }
  }

  export default new RegisterLoginService();