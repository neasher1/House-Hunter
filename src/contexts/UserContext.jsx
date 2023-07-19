import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const setUserInLocalStorage = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

const getUserFromLocalStorage = () => {
  const userString = localStorage.getItem("currentUser");
  return userString ? JSON.parse(userString) : null;
};

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getUserFromLocalStorage);
  const [loading, setLoading] = useState(true);

  const setUserAndLoading = (user) => {
    setUserInLocalStorage(user);
    setCurrentUser(user);
    setLoading(false);
  };
  console.log(currentUser);
  console.log(`http://localhost:5000/currentUser?email=${currentUser}`);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchUser();
    }
  }, [currentUser]);

  const fetchUser = () => {
    fetch(`http://localhost:5000/currentUser?email=${currentUser}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.email) {
          setUserAndLoading(data.email);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  };

  return (
    <UserContext.Provider value={{ setUserAndLoading, currentUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
