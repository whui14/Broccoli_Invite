import axios from "axios";

export const submit = async (name: string, email: string) => {
    try {
      if (email === "usedemail@airwallex.com") {
        return {errorMessage: 'Something was wrong!', status: 400}
      } else {
        var result = await axios.post(
          "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth",
          {
            name: name,
            email: email,
          }
        );
        return result;
      }
    } catch (e) {
      return {errorMessage: e, status: 400}
    }
};