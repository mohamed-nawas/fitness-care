import React from "react";

export default function useFetch(url) {
  const isMounted = React.useRef(false);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    isMounted.current = true;
    async function init() {
      try {
        const response = await fetch(process.env.REACT_APP_API_BASE_URL + url);
        console.log(`url: ${url}`);
        if (response.ok) {
          const json = await response.json();
          if (isMounted.current) setData(json);
        } else {
          throw response;
        }
      } catch (e) {
        if (isMounted.current) setError(e);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    }
    init();

    return () => (isMounted.current = false);
  }, [url]);

  return { data, error, loading };
}
