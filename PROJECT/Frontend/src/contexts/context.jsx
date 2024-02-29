import { createContext, useContext, useState } from "react";

// Create a React context
const UserContext = createContext();

// UserProvider component to wrap around the main application components
export const UserProvider = ({ children }) => {
  // State to store the current user
  const [currentUser, setCurrentUser] = useState(null);

  // Function to set the current user
  const setUser = (user) => {
    setCurrentUser(user);
  };

  // Provide the context value to the wrapped components
  return (
    <UserContext.Provider value={{ currentUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// useUser hook to access the user context within other components
export const useUser = () => {
  return useContext(UserContext);
};
