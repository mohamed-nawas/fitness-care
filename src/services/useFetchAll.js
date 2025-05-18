// import React from "react";

// export default function useFetchAll(urls) {
//   const isMounted = React.useRef(false);
//   const [data, setData] = React.useState(null);
//   const [loading, setLoading] = React.useState(true);
//   const [error, setError] = React.useState(null)

//   React.useEffect(() => {
//     isMounted.current = true;
//     const promises = urls.map((url) =>
//       fetch(process.env.REACT_APP_API_BASE_URL + url).then((response) => {
//         if (response.ok) return response.json();
//         throw response;
//       })
//     );

//     Promise.all(promises)
//       .then((json) => {
//         if (isMounted.current) setData(json);
//       })
//       .catch((e) => {
//         console.error(e);
//         if (isMounted.current) setError(e);
//       })
//       .finally(() => {
//         if (isMounted.current) setLoading(false);
//       });

//     return () => (isMounted.current = false);
//   }, [urls]);

//   return { data, loading, error };
// }
