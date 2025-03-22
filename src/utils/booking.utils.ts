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

export function timeAgo(timestamp: string): string {
  const now = new Date();
  const past = new Date(timestamp);

  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const seconds = diffInSeconds;
  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / (3600 * 24));
  const months = Math.floor(diffInSeconds / (3600 * 24 * 30));
  const years = Math.floor(diffInSeconds / (3600 * 24 * 365));

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else if (days < 30) {
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  } else if (months < 12) {
    return `${months} month${months !== 1 ? 's' : ''} ago`;
  } else {
    return `${years} year${years !== 1 ? 's' : ''} ago`;
  }
}
