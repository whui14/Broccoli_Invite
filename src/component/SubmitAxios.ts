import axios from "axios";

export const submit = async (name: string, email: string) => {
  try {
    if (email === "usedemail@airwallex.com") {
      return { error: "Something was wrong!", status: 400 };
    } else {
      var result = await axios.post(
        "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth",
        {
          name: name,
          email: email,
        }
      );
      return {...result, error: ''};
    
    }
  } catch (e: any) {
    return { error: e?.response?.data?.errorMessage || e?.message, status: 400 };
  }
};
