// import { decodedTokenDto } from './dto/decodedToken';

export const uuid  = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const decodeAccessToken = (token: string) => {
  if (!token || !token.trim().length) {
    return { error: 'Invalid Token' };
  }
  const splittedToken = token.split('.');
  if (splittedToken.length < 3) {
    return { error: 'inValid token' };
  }
  try {
    const atobToken = atob(splittedToken[1]);
    const decodedToken = JSON.parse(atobToken);
    return { decodedToken };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: 'Invalid token' };
  }
};

export const isMobileDevice = (userAgent: string) => {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ];
  const matched = toMatch.some((tomatchItem) => userAgent.match(tomatchItem));
  return matched;
};

export const addDays = (days: number) => {
  const result = new Date();
  result.setDate(result.getDate() + days);
  return result;
};

export const convertFile = async (basestr: string, fileName: string) => {
  const res = await fetch(basestr);
  const blob = await res.blob();
  return new File([blob], fileName, { type: 'image/png' });
};