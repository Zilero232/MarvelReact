import { useState, useCallback } from "react";

export const useHttp = () => {
  const [process, setProcess] = useState("waiting");

  const request = useCallback(
    async (url, method = "GET", body = null, headers = { "Content-Type": "application/json" }) => {
      setProcess("loading");

      try {
        const res = await fetch(url, { method, body, headers });

        if (!res.ok) {
          throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        const data = await res.json();
        setProcess("confirmed");
        return data;
      } catch (e) {
        setProcess("error");
        throw e;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const clearError = useCallback(() => setProcess("waiting"), []);

  return { request, process, clearError };
};
