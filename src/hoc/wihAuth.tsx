import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_LOC } from "../Constants/common.constants";
import { useDispatch, useSelector } from "react-redux";
import { decodeAccessToken } from "../utils/common.utils";
import { datafetched } from "../Redux/auth/auth.reducer";
import { storeType } from "@/Redux/store/store";
import { removeUserData } from "@/utils/removeUserData";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (props: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tokenredux = useSelector(
      (state: storeType) => state.AuthReducer.data
    );
    useEffect(() => {
      const token = Cookies.get(ACCESS_TOKEN_LOC);
      if (!token && !tokenredux) {
        navigate("/", { replace: true });
      } else if (tokenredux && tokenredux.role !== "ADMIN") {
        removeUserData().then(() => {
          navigate("/", { replace: true });
        })
      } else if (!tokenredux && token) {
        dispatch(datafetched(decodeAccessToken(token).decodedToken));
      }
    }, [navigate, tokenredux, dispatch]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
