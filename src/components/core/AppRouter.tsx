import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RouteType } from './types';
import NotFound from '../../pages/NotFound';

const Users = lazy(() => import('../../pages/users/Users'));
const Clients = lazy(() => import('../../pages/clients/Clients'));

export enum RoutePaths {
    Users = 'users',
    Clients = 'clients'
}

const publicRoutes: RouteType[] = [
    { path: '/', element: <Clients /> },
    { path: RoutePaths.Clients, element: <Clients /> },
    { path: RoutePaths.Users, element: <Users /> },
    { path: '*', element: <NotFound /> }
];

// const privateRoutes: RouteType[] = [];

const AppRouter = (props: React.PropsWithChildren): JSX.Element => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {/* {privateRoutes.map((route, idx) => (
                        <Route
                            key={`p${idx}`}
                            path={route.path}
                            element={
                                <PageLayoutPrivate>
                                    {route.element}
                                </PageLayoutPrivate>
                            }
                        />
                    ))} */}
                    {publicRoutes.map((route, idx) => (
                        <Route
                            key={`u${idx}`}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Routes>
            </Suspense>
            {props.children}
        </BrowserRouter>
    );
};

export default AppRouter;
