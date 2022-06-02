import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { QUERY_EXPENSES } from '../utils/queries';
import Expense from '../components/Expense'

export default function Expenses({username, setExp}) {
    const { loading, error, data } = useQuery(QUERY_EXPENSES, {variables: { username }});

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const expenses = data?.expenses || [];

      
    const sortCallback = (arrayItemA, arrayItemB) => {
    if (arrayItemA.date < arrayItemB.date) {
        return -1
    }
    
    if (arrayItemA.date > arrayItemB.date) {
        return 1
    }
    
    return 0
    }
      
    //expenses.sort(sortCallback);
    
    // expenses = expenses.sort((a, b) => (a.description > b.description) ? 1 : -1)

    return (
        <>
        {expenses.map((expense) => (
            <div className="table-row" key={expense._id}>
                <Expense expense={expense} setExp={setExp} />
            </div>
        ))}
        </>
    )
}
