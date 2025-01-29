export function formatBookingTimingsforUi(startTime: string) {
    const startdate = new Date(Number(startTime));
    const options = {
      month: 'short' as "short",
      day: 'numeric' as "numeric",
      hour: 'numeric' as "numeric",
      minute: 'numeric' as "numeric",
      hour12: true
    };
    return `${startdate.toLocaleString('en-US', options)}`;
  }