/* eslint-disable @typescript-eslint/prefer-as-const */
export function formatBookingTimingsforUi(startTime: string) {
  const startdate = new Date(Number(startTime));
  const options = {
    month: "short" as "short",
    day: "numeric" as "numeric",
    hour: "numeric" as "numeric",
    minute: "numeric" as "numeric",
    hour12: true,
  };
  return `${startdate.toLocaleString("en-US", options)}`;
}

export function formatBookingTimingswithEndTime(
  startTime: string,
  endtime: string
) {
  const startdate = new Date(Number(startTime));
  const enddate = new Date(Number(endtime));

  const options = {
    month: "short" as "short",
    day: "numeric" as "numeric",
    hour: "numeric" as "numeric",
    minute: "numeric" as "numeric",
    hour12: true,
  };
  const endtimeoptions = {
    hour: "numeric" as "numeric",
    minute: "numeric" as "numeric",
    hour12: true,
  };
  return `${startdate.toLocaleString(
    "en-US",
    options
  )} - ${enddate.toLocaleString("en-US", endtimeoptions)}`;
}

interface BookingDto {
  id: string;
  bookingstart: string;
  bookingend: string;
}

export function Convert24HoursPieChart(values: BookingDto[]) {
  if (!values) {
    return [];
  }
  const results = values.map((l) => {
    const value = {
      day: formatBookingTimingswithEndTime(l.bookingstart, l.bookingend),
      bookingHours:
        (Number(l.bookingend) - Number(l.bookingstart)) / (1000 * 60 * 60),
    };
    return value;
  });
  return results;
}

export function Convert7daysBarchart(values: BookingDto[]) {
  if (!values) {
    return [];
  }
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const indexing: { [key: number]: number } = {};
  for (let i = 0; i < values.length; i += 1) {
    const l = values[i];
    const index = new Date(Number(l.bookingstart)).getDay();
    const duration =
      (Number(l.bookingend) - Number(l.bookingstart)) / (1000 * 60 * 60);
    indexing[index] = indexing[index] ? indexing[index] + duration : duration;
  }
  const results = weekday.map((l,i) => {
    const value = {
      day: l,
      bookingHours: indexing[i] || 0 
    }
    return value;
  })
  return results
}
