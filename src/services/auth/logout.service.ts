export const logoutUserService = async () => {
  const { BASEURL } = await import("../../Constants/services.constants");
  const {
    default: { post },
  } = await import("../interface/interceptor");
  try {
    const url = BASEURL + "/auth/logout";
    const { data } = await post(url);
    return { data };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    }
    console.error(error.response);
    if (error.response?.status >= 400)
      return { error: error.response.data.message };
  }
};
