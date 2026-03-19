import { createContext, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";

const GithubContext = createContext();

const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await response.json();

    setUsers(data);
    setLoading(false);
  }, []);

  const value = useMemo(
    () => ({
      users,
      loading,
      fetchUsers,
    }),
    [users, loading, fetchUsers],
  );

  return (
    <GithubContext.Provider value={value}>{children}</GithubContext.Provider>
  );
};

GithubProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GithubContext;
