import { statusUpdateInputDto } from "@/data/dto/companion.data.dto";

export const getCompanionRequestsService = async () => {
  const { BASEURL } = await import("../../Constants/services.constants");
  const {
    default: { get },
  } = await import("../interface/interceptor");
  try {
    const url = BASEURL + `/admin/profile/getnewcompanionrequestlist`;
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

export const getCompanionRateListService = async () => {
  const { BASEURL } = await import("../../Constants/services.constants");
  const {
    default: { get },
  } = await import("../interface/interceptor");
  try {
    const url = BASEURL + `/admin/profile/getcompanionlistbylocation`;
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

export const getCompanionRateDetailsService = async (companionId: string) => {
  const { BASEURL } = await import("../../Constants/services.constants");
  const {
    default: { get },
  } = await import("../interface/interceptor");
  try {
    const url = BASEURL + `/admin/profile/getcompaniondetailsforupdaterate`;
    const {
      data: { data },
    } = await get(url, { params: { companionId } });
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


export const getewCompanionRequestDetailsService = async (companionId: string) => {
  const { BASEURL } = await import("../../Constants/services.constants");
  const {
    default: { get },
  } = await import("../interface/interceptor");
  try {
    const url = BASEURL + `/admin/profile/getnewcompanionrequestdetails`;
    const {
      data: { data },
    } = await get(url, { params: { companionId } });
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


export const updatebeCompanionRequestStatusService =  async (
  statusinfo: statusUpdateInputDto
) => {
  const { BASEURL } = await import("../../Constants/services.constants");
  const {
    default: { post },
  } = await import("../interface/interceptor");
  try {
    const url = BASEURL + `/admin/profile/updatebecompanionrequeststatus`;
    const { data } = await post(url, statusinfo);
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