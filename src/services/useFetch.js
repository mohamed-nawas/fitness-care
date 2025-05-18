import React from "react";
// const baseUrl = process.env.REACT_APP_API_BASE_URL;

const products = [
  {
    "id": 1,
    "category": "shoes",
    "image": "shoe1.jpg",
    "name": "Hiker",
    "price": 94.95,
    "skus": [
      {
        "sku": "17",
        "size": 7
      },
      {
        "sku": "18",
        "size": 8
      }
    ],
    "description": "This rugged boot will get you up the mountain safely."
  },
  {
    "id": 2,
    "category": "gym",
    "image": "gym2.png",
    "name": "Dumbells and shoes",
    "price": 383.85,
    "skus": [
      {
        "sku": "17",
        "size": 7
      },
      {
        "sku": "18",
        "size": 8
      }
    ],
    "description": "Pair of black colored dumbells and shoes."
  },
  {
    "id": 3,
    "category": "shoes",
    "image": "shoe2.jpg",
    "name": "Climber",
    "price": 78.99,
    "skus": [
      {
        "sku": "28",
        "size": 8
      },
      {
        "sku": "29",
        "size": 9
      }
    ],
    "description": "Sure-footed traction in slippery conditions."
  },
  {
    "id": 4,
    "category": "gym",
    "image": "gym4.png",
    "name": "Long barbell",
    "price": 482.5,
    "skus": [
      {
        "sku": "39",
        "size": 9
      }
    ],
    "description": "Long sized heavy category barbell."
  },
  {
    "id": 5,
    "category": "streaching",
    "image": "streaching3.png",
    "name": "Fitness ball",
    "price": 500,
    "skus": [
      {
        "sku": "37",
        "size": 7
      },
      {
        "sku": "39",
        "size": 9
      }
    ],
    "description": "Heavy sized fitness exercise ball."
  },
  {
    "id": 6,
    "category": "gym",
    "image": "gym1.png",
    "name": "Dumbells and muscle streaching cable",
    "price": 400.85,
    "skus": [
      {
        "sku": "37",
        "size": 7
      },
      {
        "sku": "38",
        "size": 8
      }
    ],
    "description": "Pair of black colored dumbells and streaching cable."
  },
  {
    "id": 7,
    "category": "shoes",
    "image": "shoe3.jpg",
    "name": "Explorer",
    "price": 246.25,
    "skus": [
      {
        "sku": "37",
        "size": 7
      },
      {
        "sku": "39",
        "size": 9
      }
    ],
    "description": "Simple normal football for extreme conditions."
  }
]



// export default function useFetch(url) {
//   const isMounted = React.useRef(false);
//   const [data, setData] = React.useState(null);
//   const [error, setError] = React.useState(null);
//   const [loading, setLoading] = React.useState(true);

//   React.useEffect(() => {
//     isMounted.current = true;
//     async function init() {
//       try {
//         const response = await fetch(baseUrl + url);
//         if (response.ok) {
//           const json = await response.json();
//           if (isMounted.current) setData(json);
//         } else {
//           throw response;
//         }
//       } catch (e) {
//         if (isMounted.current) setError(e);
//       } finally {
//         if (isMounted.current) setLoading(false);
//       }
//     }
//     init();

//     return () => (isMounted.current = false);
//   }, [url]);

//   return { data, error, loading };
// }




export default function useFetch(url) {
  const isMounted = React.useRef(false);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    isMounted.current = true;

    const simulateFetch = () =>
      new Promise((resolve) => {
        setTimeout(() => {
          if (url.includes("products")) {
            resolve(products);
          } else if (url.includes("products/")) {
            const id = parseInt(url.split("/").pop(), 10);
            const product = products.find((p) => p.id === id);
            resolve(product);
          } else {
            resolve(null);
          }
        }, 500);
      });

    simulateFetch()
      .then((json) => {
        if (isMounted.current) setData(json);
      })
      .catch((e) => {
        if (isMounted.current) setError(e);
      })
      .finally(() => {
        if (isMounted.current) setLoading(false);
      });

    return () => {
      isMounted.current = false;
    };
  }, [url]);

  return { data, error, loading };
}