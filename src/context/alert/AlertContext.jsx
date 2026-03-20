import { createContext, useCallback, useMemo, useReducer } from "react";
import PropTypes from "prop-types";

import alertReducer from "./AlertReducer";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const initialState = null;

  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = useCallback((msg, type) => {
    dispatch({
      type: "SET_ALERT",
      payload: {
        msg,
        type,
      },
    });

    setTimeout(() => dispatch({ type: "REMOVE_ALERT" }), 3000);
  }, []);

  const value = useMemo(
    () => ({
      alert: state,
      setAlert,
    }),
    [state, setAlert],
  );

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};

AlertProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AlertContext;
