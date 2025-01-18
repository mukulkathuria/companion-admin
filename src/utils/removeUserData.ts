export const removeUserData = async () => {
    const { ACCESS_TOKEN_LOC, REFRESH_TOKEN_LOC } = await import(
      '../Constants/common.constants'
    );
    const {
      default: { remove }
    } = await import('js-cookie');
    remove(ACCESS_TOKEN_LOC);
    remove(REFRESH_TOKEN_LOC);
    window.sessionStorage.clear();
  };