import React, { useState, useContext, createContext } from "react";


const SearchQueryContext = createContext();

export function SearchQueryProvider({ children }) {
  let [searchQuery, setSearchQuery] = useState("");
 
  let value = { searchQuery, setSearchQuery};

  return <SearchQueryContext.Provider value={value}>{children}</SearchQueryContext.Provider>;
}

export function useSearchQueryContext() {
  return useContext(SearchQueryContext);
}
