import React from "react";

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_EXPENSES } from '../utils/queries';

const Home = () => {
    const { loading, data } = useQuery(QUERY_EXPENSES);
    const { data: userData } = useQuery(QUERY_ME);
    const expenses = data?.expenses || [];

    const loggedIn = Auth.loggedIn();

    return (
        <main>
        </main>
        /* Jons JSX here */
    )
}