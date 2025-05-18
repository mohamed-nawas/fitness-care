import React from "react";

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





export default function useFetchAll(urls) {
  const isMounted = React.useRef(false);
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    isMounted.current = true;
    
    // Simulate fetching data locally based on the 'urls'
    const simulateFetch = (url) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (url.includes("products")) {
            resolve(products);  // Return all products if it's a 'products' request
          } else if (url.includes("products/")) {
            const id = parseInt(url.split("/").pop(), 10);
            const product = products.find((p) => p.id === id);
            if (product) {
              resolve(product);  // Return the specific product based on the ID
            } else {
              reject(new Error("Product not found"));
            }
          } else {
            reject(new Error("Invalid URL"));
          }
        }, 500); // Simulate network delay
      });
    };

    // Simulate fetching data for all URLs
    const promises = urls.map((url) => simulateFetch(url));

    Promise.all(promises)
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
  }, [urls]);

  return { data, loading, error };
}