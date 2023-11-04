declare module "virtual:pwa-register/react" {
  // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
  import type { Dispatch, SetStateAction } from "react";
  import type { RegisterSWOptions } from "vite-plugin-pwa/types";

  export function useRegisterSW(
    options?: RegisterSWOptions
  ): {
    needRefresh: [boolean, Dispatch<SetStateAction<boolean>>];
    offlineReady: [boolean, Dispatch<SetStateAction<boolean>>];
    updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
  };
}
