import { Error, WavingHand } from "@mui/icons-material";
import { memo, useMemo } from "react";
import { create } from "zustand";
import { usePrimaryColor, usePrimaryColorString } from "../theme";
import {
  Alert,
  Button,
  CircularProgress,
  TextField,
  useTheme,
} from "@mui/material";
import { TokenState, login, register, useTokenStore } from "../api";
import { AxiosError } from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface LoginPageState {
  showRegisterForm: boolean;
  email: string;
  showEmailValidatorError: boolean;
  showEmailUniqityError: boolean;
  password: string;
  showPasswordValidationError: boolean;
  confirmPassword: string;
  showPasswordNotMatchingError: boolean;
  name: string;
  showProgress: boolean;
  showLoginFailed: boolean;
  showNetworkProblem: boolean;
  actions: {
    setShowRegisterForm: (flag: boolean) => void;
    setEmail: (str: string) => void;
    setShowEmailValidatorError: (flag: boolean) => void;
    setShowEmailUniqityError: (flag: boolean) => void;
    setPassword: (str: string) => void;
    setShowPasswordValidationError: (flag: boolean) => void;
    setConfirmPassword: (str: string) => void;
    setShowPasswordNotMatchingError: (flag: boolean) => void;
    setName: (str: string) => void;
    setShowProgress: (flag: boolean) => void;
    setShowLoginFailed: (flag: boolean) => void;
    setShowNetworkProblem: (flag: boolean) => void;
  };
}

const useLoginPageStore = create<LoginPageState>()((set) => ({
  showRegisterForm: false,
  email: "",
  showEmailValidatorError: false,
  showEmailUniqityError: false,
  password: "",
  showPasswordValidationError: false,
  confirmPassword: "",
  showPasswordNotMatchingError: false,
  name: "",
  showProgress: false,
  showLoginFailed: false,
  showNetworkProblem: false,
  actions: {
    setShowRegisterForm: (flag: boolean) => set({ showRegisterForm: flag }),
    setEmail: (str: string) => set({ email: str }),
    setShowEmailValidatorError: (flag: boolean) =>
      set({ showEmailValidatorError: flag }),
    setShowEmailUniqityError: (flag: boolean) =>
      set({ showEmailUniqityError: flag }),
    setPassword: (str: string) => set({ password: str }),
    setShowPasswordValidationError: (flag: boolean) =>
      set({ showPasswordValidationError: flag }),
    setConfirmPassword: (str: string) => set({ confirmPassword: str }),
    setShowPasswordNotMatchingError: (flag: boolean) =>
      set({ showPasswordNotMatchingError: flag }),
    setName: (str: string) => set({ name: str }),
    setShowProgress: (flag: boolean) => set({ showProgress: flag }),
    setShowLoginFailed: (flag: boolean) => set({ showLoginFailed: flag }),
    setShowNetworkProblem: (flag: boolean) => set({ showNetworkProblem: flag }),
  },
}));

const validateEmail = (email: string) =>
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    ? true
    : false;

const validatePassword = (password: string) => password.length >= 6;

const validateConfirmPassword = (password: string, confirm: string) =>
  password === confirm;

const signin = (
  state: LoginPageState,
  tokenState: TokenState,
  navigate: NavigateFunction
) => {
  state.actions.setShowProgress(true);
  login({
    email: state.email,
    password: state.password,
  })
    .then(tokenState.setToken)
    .catch((res: AxiosError) => {
      if (res.response?.status == 401) state.actions.setShowLoginFailed(true);
      else state.actions.setShowNetworkProblem(true);
    })
    .then(() => navigate("/"))
    .finally(() => state.actions.setShowProgress(false));
};

const signup = (
  state: LoginPageState,
  tokenState: TokenState,
  navigate: NavigateFunction
) => {
  state.actions.setShowProgress(true);
  register({
    email: state.email,
    password: state.password,
    name: state.name,
  })
    .then(tokenState.setToken)
    .catch((res: AxiosError) => {
      if (res.response?.status == 400)
        state.actions.setShowEmailUniqityError(true);
      else state.actions.setShowNetworkProblem(true);
    })
    .then(() => navigate("/"))
    .finally(() => state.actions.setShowProgress(false));
};

export const Login = memo(() => {
  const state = useLoginPageStore((state) => state);
  const tokenState = useTokenStore((state) => state);
  const primaryColorString = usePrimaryColorString();
  const primaryColor = usePrimaryColor();
  const theme = useTheme();
  const navigate = useNavigate();
  const circularStyle = useMemo(
    () => ({
      color: theme.palette.common.white,
    }),
    [theme.palette.common.white]
  );

  const buttonStyle = useMemo(
    () => ({
      background: primaryColor.main,
      color: theme.palette.text.primary,
    }),
    [primaryColor.main]
  );

  return (
    <div className="sm:w-3/5 w-full m-auto h-full flex flex-col">
      <div className="grow"></div>
      <div className="flex flex-row w-full">
        <div className="grow"></div>
        <div className="flex flex-col">
          {state.showLoginFailed || state.showNetworkProblem ? (
            <Alert
              severity="error"
              icon={<Error />}
              variant="standard"
              className="rounded-lg mb-4 text-sm"
              onClose={() =>
                state.showLoginFailed
                  ? state.actions.setShowLoginFailed(false)
                  : state.actions.setShowNetworkProblem(false)
              }
            >
              {state.showLoginFailed
                ? "Either email or password is incorrect."
                : "Netork error."}
            </Alert>
          ) : (
            <></>
          )}
          <div className="p-2 mb-4">
            <strong className="text-3xl">
              Welcome to Eldoria! <WavingHand className="ml-2" />
            </strong>
            <div className="w-80 text-left pt-1 text-sm">
              Please sign-in to your account to start the advanture
            </div>
          </div>
          <TextField
            label="Email"
            className="mb-4  w-88"
            color={primaryColorString}
            required
            error={state.showEmailUniqityError || state.showEmailValidatorError}
            type="email"
            autoComplete="email"
            value={state.email}
            helperText={
              state.showEmailValidatorError
                ? "Email is not valid"
                : state.showEmailUniqityError
                ? "User already exists"
                : ""
            }
            onChange={(e) => state.actions.setEmail(e.target.value)}
          />
          {state.showRegisterForm ? (
            <TextField
              label="Name"
              className="mb-4  w-88"
              color={primaryColorString}
              autoComplete="name"
              value={state.name}
              required
              helperText="Please enter a DM recognisable full name"
              onChange={(e) => state.actions.setName(e.target.value)}
            />
          ) : (
            <></>
          )}

          <TextField
            label="Password"
            className="mb-4 w-88"
            color={primaryColorString}
            type="password"
            required
            autoComplete="password"
            value={state.password}
            error={
              state.showPasswordNotMatchingError ||
              state.showPasswordValidationError
            }
            helperText={
              state.showPasswordValidationError
                ? "Password must at least be 6 characters"
                : state.showPasswordNotMatchingError
                ? "Passwords do not match"
                : ""
            }
            onChange={(e) => state.actions.setPassword(e.target.value)}
          />

          {state.showRegisterForm ? (
            <TextField
              label="Confirm Password"
              className="mb-4  w-88"
              color={primaryColorString}
              required
              error={state.showPasswordNotMatchingError}
              type="password"
              autoComplete="password"
              value={state.confirmPassword}
              helperText={
                state.showPasswordNotMatchingError
                  ? "Passwords do not match"
                  : ""
              }
              onChange={(e) => state.actions.setConfirmPassword(e.target.value)}
            />
          ) : (
            <></>
          )}

          <Button
            variant="contained"
            style={buttonStyle}
            className="h-14 mb-4"
            type="submit"
            onClick={() => {
              const emailValidation = validateEmail(state.email);
              const passwordValidation = validatePassword(state.password);
              const confirmValidation = validateConfirmPassword(
                state.password,
                state.confirmPassword
              );

              state.actions.setShowEmailValidatorError(!emailValidation);
              state.actions.setShowPasswordValidationError(!passwordValidation);
              if (state.showRegisterForm)
                state.actions.setShowPasswordNotMatchingError(
                  !confirmValidation
                );

              if (
                !emailValidation ||
                !passwordValidation ||
                (state.showRegisterForm && !confirmValidation)
              )
                return;
              if (state.showRegisterForm) signup(state, tokenState, navigate);
              else signin(state, tokenState, navigate);
            }}
            disabled={state.email == "" || state.password == ""}
          >
            {state.showProgress ? (
              <CircularProgress style={circularStyle} />
            ) : state.showRegisterForm ? (
              "Register"
            ) : (
              "SIGN IN"
            )}
          </Button>

          {!state.showRegisterForm ? (
            <div className="flex flex-row p-1 pt-0 pb-0 mb-4">
              <div className="grow text-left pt-1 text-sm">
                New to our community?
              </div>
              <Button
                variant="text"
                className="text-xs grow pt-2"
                color={primaryColorString}
                onClick={() => state.actions.setShowRegisterForm(true)}
              >
                Create an account
              </Button>
            </div>
          ) : (
            <div className="flex flex-row p-1 pt-0 pb-0 mb-4">
              <div className="grow text-left pt-1 text-sm">
                Already part of our cummunity?
              </div>
              <Button
                variant="text"
                className="text-xs grow pt-2"
                color={primaryColorString}
                onClick={() => state.actions.setShowRegisterForm(false)}
              >
                Sign in instead
              </Button>
            </div>
          )}
        </div>
        <div className="grow"></div>
      </div>

      <div className="grow-[3]"></div>
    </div>
  );
});
