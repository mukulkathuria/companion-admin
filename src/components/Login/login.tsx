import { FC, useEffect, useState } from "react";
import {
  ACCESS_TOKEN_LOC,
  REFRESH_TOKEN_LOC,
  Regex,
} from "@/Constants/common.constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginParamsDto } from "@/services/auth/dto/login.dto";
import { toast } from "sonner";

const Login: FC = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [isloading, setisLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ email: "", password: "" });

  useEffect(() => {
    import("js-cookie").then(({ default: { get } }) => {
      if (get(ACCESS_TOKEN_LOC)) {
        navigate("/requests");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const validationErrors: LoginParamsDto = {
      email: "",
      password: "",
    };

    if (!data.email) {
      validationErrors.email = "Email is required";
    } else if (!validateEmail(data.email)) {
      validationErrors.email = "Invalid email format";
    }

    if (!data.password) {
      validationErrors.password = "Password is required";
    } else if (!Regex.password.test(data.password)) {
      validationErrors.password = "Password is not valid";
    }
    setErrors(validationErrors);
    const value = Object.values(validationErrors).every((l) => l);
    return value;
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setisLoading(() => true);
    try {
      const { datafetched } = await import("../../Redux/auth/auth.reducer");
      const { decodeAccessToken } = await import("../../utils/common.utils");
      const { loginUserService } = await import(
        "../../services/auth/login.service"
      );
      const {
        default: { set },
      } = await import("js-cookie");
      if (!validateForm()) {
        // Submit the form data (for example, send to an API)
        const logindata = await loginUserService({
          email: data.email,
          password: data.password,
        });
        if (logindata?.data) {
          dispatch(
            datafetched(
              decodeAccessToken(logindata.data.access_token).decodedToken
            )
          );
          set(ACCESS_TOKEN_LOC, logindata.data.access_token);
          set(REFRESH_TOKEN_LOC, logindata.data.refresh_token);
          navigate("/requests");
        } else {
          console.log("Error handling");
          toast.error("Some error occur. Please try again after sometime");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setData({ email: "", password: "Ī" });
      setisLoading(() => false);
    }
  };
  return (
    <>
      <div className="loginbox">
        <div className="leftbox">
          <h1 className="zestful">zestful amigos</h1>
        </div>
        <div className="rightbox">
          <h1 className="zestful zestnone">zestful amigos</h1>
          <div className="logindetail">
            <div onKeyUp={(e) => e.key === "Enter" && handleSubmit(e)}>
              <h5>Welcome</h5>
              <p>PLEASE LOGIN TO ADMIN DASHBOARD</p>
              <div className="lginputbox">
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) =>
                    setData((l) => ({ ...l, email: e.target.value }))
                  }
                  required
                  name="email"
                  placeholder="Email"
                  className="lginputfield"
                />
                <br />
                {errors.email && (
                  <span style={{ color: "red" }}>{errors.email}</span>
                )}
              </div>
              <div className="lginputbox">
                <input
                  type="password"
                  value={data.password}
                  onChange={(e) => setData((l) => ({ ...l, password: e.target.value }))}
                  required
                  name="password"
                  placeholder="Password"
                  className="lginputfield"
                />
                <br />
                {errors.password && (
                  <span style={{ color: "red" }}>{errors.password}</span>
                )}
              </div>
              <button
                type="submit"
                className="lgbtn"
                onClick={handleSubmit}
                disabled={isloading}
              >
                {isloading ? "Please Wait.." : "Login"}
              </button>
              <p className="forgotpass">forgot password ?</p>
            </div>
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default Login;
