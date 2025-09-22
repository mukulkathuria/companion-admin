import { statusUpdateInputDto, updateCompanionPriceInputDto } from "@/data/dto/companion.data.dto";

export const updateCompanionProfileService = async (
  values: FormData,
  id: string
) => {
  const { BASEURL } = await import("../../Constants/services.constants");
  const {
    default: { post },
  } = await import("../interface/interceptor");
  try {
    const url = BASEURL + `/admin/profile/updatecompaniondetails/${id}`;
    const { data } = await post(url, values);
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

export const updateCompanionProfileStatusService = async (
  statusinfo: statusUpdateInputDto
) => {
  const { BASEURL } = await import("../../Constants/services.constants");
  const {
    default: { post },
  } = await import("../interface/interceptor");
  try {
    const url = BASEURL + `/admin/profile/updatecompanionrequeststatus`;
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


export const updateCompanionBasePriceService = async (
  values: updateCompanionPriceInputDto,
  id: string
) => {
  const { BASEURL } = await import("../../Constants/services.constants");
  const {
    default: { post },
  } = await import("../interface/interceptor");
  try {
    const url = BASEURL + `/admin/profile/updatecompanionbaseprice/${id}`;
    const { data } = await post(url, values);
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


export const updateCompanionCancellationStatusService = async (
  statusinfo: statusUpdateInputDto
) => {
  const { BASEURL } = await import("../../Constants/services.constants");
  const {
    default: { post },
  } = await import("../interface/interceptor");
  try {
    const url = BASEURL + `/admin/accept/updatecancellationstatus`;
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


/* eslint-disable @typescript-eslint/no-explicit-any */
export const companionPaymentService = async (values: any) => {
  try {
    const { BASEURL } = await import("../../Constants/services.constants");
    const {
      default: { post },
    } = await import("../interface/interceptor");

    const url = `${BASEURL}/admin/profile/updatecompanionbaseprice`;
    const response = await post(url, values);

    return { data: response.data };
  } catch (error: any) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    }

    console.error(error?.response);

    if (error?.response?.status >= 400) {
      return { error: error.response.data?.message || "Request failed" };
    }

    return { error: "Server Error" };
  }
};

