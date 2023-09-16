import { createContext, useState } from "react";

export const SearchContext = createContext({
  searchTerm: "",
  setSearchTerm: () => {},
});

import PropTypes from "prop-types";

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
