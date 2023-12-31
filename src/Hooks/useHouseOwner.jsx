import { useEffect, useState } from "react";

const useHouseOwner = (email) => {
  const [isSeller, setIsSeller] = useState(false);
  const [sellerLoading, setSellerLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/seller?email=${email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsSeller(data.isSeller);
          setSellerLoading(false);
        });
    }
  }, [email]);
  return [isSeller, sellerLoading];
};
export default useHouseOwner;
