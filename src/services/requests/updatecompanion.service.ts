export const getUpdateCompanionrequestService = async () => {
    const { BASEURL } = await import("../../Constants/services.constants");
    const {
      default: { get },
    } = await import("../interface/interceptor");
    try {
      const url = BASEURL + "/admin/profile/getcompanionupdaterequestlist";
      const { data:{ data } } = await get(url);
      return { data };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      }
      console.error(error.response);
      if (error.response?.status >= 400)
        return { error: error.response.data.message };
      return { error: 'Server Error' };
    }
  };


  export const getCompanionrequestDetailsService = async (id: string) => {
    const { BASEURL } = await import("../../Constants/services.constants");
    const {
      default: { get },
    } = await import("../interface/interceptor");
    try {
      const url = BASEURL + "/admin/profile/getupdatecompaniondetails";
      const { data:{ data } } = await get(url, { params: { id } });
      return { data };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      }
      console.error(error.response);
      if (error.response?.status >= 400)
        return { error: error.response.data.message };
      return { error: 'Server Error' };
    }
  };