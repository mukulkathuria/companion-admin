import { FC, useState } from "react";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const validationErrors: LoginParamsDto = {
      email: "",
      password: "",
    };

    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      validationErrors.email = "Invalid email format";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    } else if (!Regex.password.test(password)) {
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
      const logindata = await loginUserService({ email, password });
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  className="lginputfield"
                />
                <br />
                {errors.password && (
                  <span style={{ color: "red" }}>{errors.password}</span>
                )}
              </div>
              <button type="submit" className="lgbtn" onClick={handleSubmit}>
                Login
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
