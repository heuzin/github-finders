import { createContext, useMemo, useCallback, useReducer } from "react";
import PropTypes from "prop-types";

import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const setLoading = () => dispatch({ type: "SET_LOADING" });

  // Get initial users (testing purposes)
  const fetchUsers = useCallback(async () => {
    setLoading();
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await response.json();

    dispatch({
      type: "GET_USERS",
      payload: data,
    });
  }, []);

  // Set loading

  const value = useMemo(
    () => ({
      users: state.users,
      loading: state.loading,
      fetchUsers,
    }),
    [state, fetchUsers],
  );

  return (
    <GithubContext.Provider value={value}>{children}</GithubContext.Provider>
  );
};

GithubProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GithubContext;
