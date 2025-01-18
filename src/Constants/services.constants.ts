export const BASEURL = import.meta.env.VITE_BASE_URL || '';

export const ignoretokenpaths = [
    `${BASEURL}/auth/login`,
    `${BASEURL}/auth/register`,
    `${BASEURL}/auth/password/email`,
    `${BASEURL}/auth/password/reset`
  ];