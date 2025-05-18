const baseUrl = process.env.REACT_APP_API_BASE_URL;

const shippingAddress = [
  {
    "city": "Mumbai",
    "country": "India",
    "id": 1
  },
  {
    "city": "London",
    "country": "United Kingdom",
    "id": 2
  },
  {
    "country": "United Kingdom",
    "city": "London",
    "id": 3
  }
];

// export async function getShippingAddress(userId) {
//   return fetch(baseUrl + "shippingAddress/" + userId).then((response) => {
//     if (response.ok) return response.json();
//     throw response;
//   });
// }

// export async function saveShippingAddress(address) {
//   return fetch(baseUrl + "shippingAddress", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(address),
//   });
// }

export async function getShippingAddress(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const address = shippingAddress.find((addr) => addr.id === parseInt(userId));
      if (address) resolve(address);
      else reject(new Error("Shipping address not found"));
    }, 200);
  });
}

export async function saveShippingAddress(address) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = shippingAddress.findIndex((a) => a.id === address.id);
      if (index >= 0) {
        shippingAddress[index] = address;
      } else {
        shippingAddress.push(address);
      }
      resolve({ success: true });
    }, 200);
  });
}
