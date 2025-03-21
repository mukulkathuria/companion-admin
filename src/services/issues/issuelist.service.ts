export const getAllActiveIssueService = async () => {
  const { BASEURL } = await import("../../Constants/services.constants");
  const {
    default: { get },
  } = await import("../interface/interceptor");
  try {
    const url = BASEURL + "/admin/issues";
    const {
      data: { data },
    } = await get(url);
    return { data };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    }
    console.error(error.response);
    if (error.response?.status >= 400)
      return { error: error.response.data.message };
    return { error: "Server Error" };
  }
};

export const getIssueDetails = async (issueId: string) => {
  const { BASEURL } = await import("../../Constants/services.constants");
  const {
    default: { get },
  } = await import("../interface/interceptor");
  try {
    const url = BASEURL + "/admin/issues/getissuedetails";
    const {
      data: { data },
    } = await get(url, { params: { issueId } });
    return { data };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    }
    console.error(error.response);
    if (error.response?.status >= 400)
      return { error: error.response.data.message };
    return { error: "Server Error" };
  }
};
