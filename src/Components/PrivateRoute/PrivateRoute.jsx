import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, isAuthenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            element={props =>
                isAuthenticated ? (
                    <Element {...props} />
                ) : (
                    <Navigate to="/login" replace />
                )
            }
        />
    );
};

export default PrivateRoute;
