import React, { useState } from 'react'
import moment from 'moment';
import { useMutation } from '@apollo/client'
import { EDIT_EXPENSE } from '../utils/mutations';

export default function Expense({ expense }) {
    const [editExpense, { error2 }] = useMutation(EDIT_EXPENSE);

    //Set initial value of checkbox from DB
    const [checked, setChecked] = useState(expense.paid)

    // update state based on form input changes
    const payBill = async (e) => {

        const id = e.target.getAttribute('data-id');
        const payValue = e.target.checked

        try {
            const { data } = await editExpense({
            variables: { _id: id, paid: payValue }
            });
            
        } catch (error2) {
            if (error2 instanceof Error) {
                console.log(error2.message)
            }
        }

        setChecked(!e.target.checked);

    };

    return (
        <>
            <div className="col">{expense.description}</div>
            <div className="col">{expense.category}</div>
            <div className="col">${expense.amount}</div>
            {/* <div className="col">{ (new Date(expense.date)).toLocaleDateString() }</div> */}
            <div className="col">{ moment(new Date(expense.date)).format("MMM Do") }</div>
            <div className="col">
                <label className="checkbox">
                    <input
                        data-id={expense._id} 
                        type="checkbox" 
                        onChange={payBill}
                        checked={checked}
                    />
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
        </>
    )
}
