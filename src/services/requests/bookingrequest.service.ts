export const getBookingRequestsService = async () => {
    const { BASEURL } = await import("../../Constants/services.constants");
    const {
      default: { get },
    } = await import("../interface/interceptor");
    try {
      const url = BASEURL + "/admin/booking/bookingrequest";
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
  
  export const getBookingDetailsService = async (bookingId: string) => {
    const { BASEURL } = await import("../../Constants/services.constants");
    const {
      default: { post },
    } = await import("../interface/interceptor");
    try {
      const values = {
        bookingid: Number(bookingId)
      }
      const url = BASEURL + "/admin/booking/bookingdetails";
      const { data:{ data } } = await post(url, values);
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
    return { error: 'Server Error' };
  };

  export const acceptBookingService = async (bookingId: string) => {
    const { BASEURL } = await import("../../Constants/services.constants");
    const {
      default: { get },
    } = await import("../interface/interceptor");
    try {
      const values = {
        bookingid: Number(bookingId)
      }
      const url = BASEURL + "/admin/accept/booking";
      const { data } = await get(url, { params: values });
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
    return { error: 'Server Error' };
  };

  export const getExtensionRequestsService = async () => {
    const { BASEURL } = await import("../../Constants/services.constants");
    const {
      default: { get },
    } = await import("../interface/interceptor");
    try {
      const url = BASEURL + "/admin/booking/getunderextensionbookinglist";
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
  
  export const getCancellationRequestsService = async () => {
    const { BASEURL } = await import("../../Constants/services.constants");
    const {
      default: { get },
    } = await import("../interface/interceptor");
    try {
      const url = BASEURL + "/admin/booking/getcancelledbookinglist";
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
  

  export const rejectBookingService = async (bookingId: string) => {
    const { BASEURL } = await import("../../Constants/services.constants");
    const {
      default: { get },
    } = await import("../interface/interceptor");
    try {
      const values = {
        bookingid: Number(bookingId)
      }
      const url = BASEURL + "/admin/accept/rejectbookings";
      const { data } = await get(url, { params: values });
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
    return { error: 'Server Error' };
  };