import { createContext, useMemo, useReducer } from "react";
import PropTypes from "prop-types";

import githubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const value = useMemo(
    () => ({
      ...state,
      dispatch,
    }),
    [state],
  );

  return (
    <GithubContext.Provider value={value}>{children}</GithubContext.Provider>
  );
};

GithubProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GithubContext;
