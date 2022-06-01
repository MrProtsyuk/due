import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_EXPENSES } from '../utils/queries';
import { EDIT_EXPENSE } from '../utils/mutations';
import moment from 'moment';

export default function Expenses({username}) {
    const [editExpense, { error2 }] = useMutation(EDIT_EXPENSE);

    const { loading, error, data } = useQuery(QUERY_EXPENSES, {variables: { username }});

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const expenses = data?.expenses || [];

    //const [paid, setPaid] = useState(false);
    

    // update state based on form input changes
    const payBill = async (e) => {

        const id = e.target.getAttribute('data-id');
        const payValue = e.target.checked

        try {
            const { data } = await editExpense({
            variables: { _id: id, paid: payValue }
            });
        } catch (error2) {
            if (error instanceof Error) {
                console.log(error2.message)
            }
        }
    };

    return (
        <>
        {expenses.map((expense) => (
            <div className="table-row" key={expense._id}>
                <div className="col">{expense.description}</div>
                <div className="col">{expense.category}</div>
                <div className="col">${expense.amount}</div>
                {/* <div className="col">{ (new Date(expense.date)).toLocaleDateString() }</div> */}
                <div className="col">{ moment(new Date(expense.date)).format("MMM Do") }</div>
                <div className="col">
                    <label className="checkbox">
                        <input data-id={expense._id} name="paid" type="checkbox" onChange={payBill}/>
                    </label>
                </div>
                <div className="col">
                    {expense.link && <a href={expense.link} target="bill">Pay</a>}
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
