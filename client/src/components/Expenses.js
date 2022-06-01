import React from 'react'
import { useQuery } from '@apollo/client';
import { QUERY_EXPENSES } from '../utils/queries';

export default function Expenses({username}) {
    const { loading, error, data } = useQuery(QUERY_EXPENSES, {variables: { username }});

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const expenses = data?.expenses || [];

    return (
        <>
        {expenses.map((expense) => (
            <div className="table-row" key={expense._id}>
                <div className="col">{expense.description}</div>
                <div className="col">{expense.category}</div>
                <div className="col">${expense.amount}</div>
                <div className="col">{expense.date}</div>
                <div className="col">
                    <label className="checkbox">
                        <input type="checkbox" />
                    </label>
                </div>
                <div className="col">
                    <a href={expense.link} target="_blank">Pay *make conditional*</a>
                </div>
                <div className="col">
                    <a href="#edit-expense-overlay" title="Update Expense">
                        <img src={process.env.PUBLIC_URL + '/images/pencil.png'} alt='edit' /> 
                    </a>&nbsp;&nbsp;&nbsp;
                    <img src={process.env.PUBLIC_URL + '/images/trash3.png'} alt='delete' /> 
                </div>
            </div>
        ))}
        </>
    )
}
