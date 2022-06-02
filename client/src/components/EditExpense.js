import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_EXPENSE } from '../utils/mutations';

export default function EditExpense() {
    const [formState, setFormState] = useState({ description: '', category: '', amount: '', link: '', date: '', changes: 'current' });
        const [editExpense, { error }] = useMutation(EDIT_EXPENSE);


    // update state based on form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
        ...formState,
        [name]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        console.log(formState)

        // Code to send to GraphQL

        // clear form values after GraphQL stuff
        // setFormState({
        //     description: '',
        //     category: '',
        //     amount: '',
        //     link: '',
        //     date: '',
        //     changes: 'current'
        // });

    }
 
    return (
    <div id="edit-expense-overlay" className="overlay">
        <form onSubmit={handleFormSubmit}>
            <div id="edit-expense" className="popup">
                <a className="close" href="#" title="Close">&times;</a>
                <div className="content">
                    <h1>Update Expense</h1>
                    <input
                        name="description"
                        onChange={handleChange}
                        type="text"
                        placeholder="Description"
                    />
                    <input
                        type="text"
                        name="category"
                        onChange={handleChange}
                        placeholder="Category"
                    /><br />
                    <input
                        type="text"
                        name="amount"
                        onChange={handleChange}
                        placeholder="Amount (##.##)"
                    /><br />
                    <input
                        type="text"
                        name="link"
                        onChange={handleChange}
                        placeholder="Link"
                    /><br />
                    <input
                        type="text"
                        name="date"
                        onChange={handleChange}
                        placeholder="Due date (MM/DD/YYYY)"
                    /><br />
                    <div className="mt20">
                        Apply changes to:<br />
                        <input
                            type="radio"
                            id="future"
                            name="changes"
                            value="future"
                            onChange={handleChange}
                            checked={formState.changes === 'future'} 
                        />&nbsp;This and all future months<br />
                        <input
                            type="radio"
                            id="current"
                            name="changes"
                            value="current"
                            onChange={handleChange}
                            checked={formState.changes === 'current'} 
                        />&nbsp;Only this month
                    </div>
                </div>

                <div className="center mt20" style={{cursor: 'pointer'}} onClick={editExpense} title='Edit Expense' >
                <button type="submit" className="button-main">Update Expense</button>
                </div>
            </div>
        </form>
    </div>
  )
}
