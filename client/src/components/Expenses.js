import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { QUERY_EXPENSES } from '../utils/queries';
import Expense from '../components/Expense'

export default function Expenses({username}) {
    const { loading, error, data } = useQuery(QUERY_EXPENSES, {variables: { username }});

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const expenses = data?.expenses || [];

    return (
        <>
        {expenses.map((expense) => (
            <div className="table-row" key={expense._id}>
                <Expense expense={expense} />
            </div>
        ))}
        </>
    )
}
