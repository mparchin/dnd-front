import { useCallback } from "react";
import { apiAddress, header, useAuthority } from "../api";
import { JWTToken } from "../models/spell";
import axios from "axios";

export const useImagesApi = () => {
  const authority = useAuthority();
  const token = authority.state.token ?? new JWTToken();
  return useCallback(
    (file: File, showProgress?: (flag: boolean) => void) => {
      if (showProgress) showProgress(true);
      var formData = new FormData();
      formData.append("file", file);
      return axios
        .postForm<string>(`${apiAddress}/images`, formData, header(token))
        .then((res) => res.data)
        .catch(authority.error)
        .finally(() => {
          if (showProgress) showProgress(false);
        });
    },
    [token]
  );
};
