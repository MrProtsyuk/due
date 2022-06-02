import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { useMutation } from '@apollo/client'
import { EDIT_EXPENSE, REMOVE_EXPENSE } from '../utils/mutations';

export default function Expense({ expense, setExp }) {
    const [editExpense, { error }] = useMutation(EDIT_EXPENSE);

    const [removeExpense, { err }] = useMutation(REMOVE_EXPENSE);

    //Set initial value of checkbox from DB
    const [checked, setChecked] = useState(expense.paid)

    // update state based on form input changes
    const payBill = async (e) => {
        const id = expense._id;
        const payValue = e.target.checked;

        try {
            const { data } = await editExpense({
            variables: { _id: id, paid: payValue }
            });
            
        } catch (error2) {
            if (error2 instanceof Error) {
                console.log(error2.message)
            }
        }

        //setExp({...expense, paid: payValue})

        setChecked(!e.target.checked);
    };

    const deleteExpense = async () => {
        console.log('called delete expense')
        try {
            await removeExpense({
            variables: { _id: expense._id }
            });
            window.location.assign('/');
        } catch (error2) {
            if (error2 instanceof Error) {
                console.log(error2.message)
            }
        }
    }

    const fillEdit = () => {
        setExp(expense)
    }

    return (
        <>
            <div className="col">{expense.description}</div>
            <div className="col">{expense.category}</div>
            <div className="col">${expense.amount}</div>
            <div className="col">{ moment(new Date(expense.date)).format("MMM Do") }</div>
            <div className="col">
                <label className="checkbox">
                    <input
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
                    <span onClick={fillEdit}><img src={process.env.PUBLIC_URL + '/images/pencil.png'} alt='edit' /></span>
                </a>&nbsp;&nbsp;
                <span style={{cursor:'pointer'}} onClick={deleteExpense} title="Delete Expense">
                    <img src={process.env.PUBLIC_URL + '/images/trash3.png'} alt='delete' />
                </span>
            </div>
        </>
    )
}
