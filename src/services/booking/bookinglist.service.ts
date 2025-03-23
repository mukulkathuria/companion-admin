import { updateBookingStatusInputDto } from "@/data/dto/bookingRequests.dto";

export const getBookinglistService = async () => {
  const { BASEURL } = await import("../../Constants/services.constants");
  const {
    default: { get },
  } = await import("../interface/interceptor");
  try {
    const url = BASEURL + "/admin/booking/getallbookinglist";
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

export const getExtensionBookinglistService = async () => {
  const { BASEURL } = await import("../../Constants/services.constants");
  const {
    default: { get },
  } = await import("../interface/interceptor");
  try {
    const url = BASEURL + "/admin/booking/getunderextensionbookinglist";
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

export const getUserCancellationBookinglistService = async () => {
  const { BASEURL } = await import("../../Constants/services.constants");
  const {
    default: { get },
  } = await import("../interface/interceptor");
  try {
    const url = BASEURL + "/admin/booking/getcancelledbookinglistofuser";
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

export const getCompanionCancellationBookinglistService = async () => {
  const { BASEURL } = await import("../../Constants/services.constants");
  const {
    default: { get },
  } = await import("../interface/interceptor");
  try {
    const url = BASEURL + "/admin/booking/getcancelledbookinglist";
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

export const updateBookingStatusService = async (
  values: updateBookingStatusInputDto
) => {
  const { BASEURL } = await import("../../Constants/services.constants");
  const {
    default: { post },
  } = await import("../interface/interceptor");
  try {
    const url = BASEURL + "/admin/booking/updatebookingstatus";
    const {
      data,
    } = await post(url, values);
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
