import { LoginParamsDto } from "./dto/login.dto";

export const registerUserService = async (formdata: LoginParamsDto) => {
  const { BASEURL } = await import("../../Constants/services.constants");
  const {
    default: { post },
  } = await import("../interface/interceptor");
  try {
    const url = BASEURL + "/auth/register";
    const { data } = await post(url, formdata);
    return { data };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error.response);
    if (error.response?.status >= 400)
      return { error: error.response.data.message };
  }
};
