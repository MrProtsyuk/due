import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { ADD_EXPENSE } from '../utils/mutations';

export default function AddExpense() {
    const [formState, setFormState] = useState({ description: '', category: '', amount: '', link: '', date: '', recurring: 'yes' });
    const [err, setErr] = useState('');
    const [addExpense, { error }] = useMutation(ADD_EXPENSE);

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

        // Validation
        if(!formState.description){
            setErr('You must enter a description');
            return;
        }
    
        if(!formState.category){
            setErr('You must enter a category');
            return;
        }

        // Need to add Validate amount 
        if(!formState.amount){
            setErr('You must enter a valid amount');
            return;
        }

        // Need to add Validate link 
        if(!formState.link){
            setErr('You must enter a valid link');
            return;
        }

        // Need to add Validate date 
        if(!formState.date){
            setErr('You must enter a valid date');
            return;
        }
    
        try {
            const { data } = await addExpense({
            variables: { ...formState },
            });
    
            //Auth.login(data.login.token);
    
            // clear form values
            setFormState({
            description: '',
            category: '',
            amount: '',
            link: '',
            date: '',
            recurring: 'yes'
            });
        } catch (error) {
            if (error instanceof Error) {
            console.log(error.message)
                // if(error.message.indexOf('credential') != -1){
            //     setErr('User not found')
            // }
            }
        }
    }
    
    return (
    <div id="add-expense-overlay" className="overlay">
        <form onSubmit={handleFormSubmit}>
            <div id="add-expense" className="popup">
                <a className="close" href="#" title="Close">&times;</a>
                <div className="content">
                    <h1>Add Expense</h1>
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
                        placeholder="Link (http://www.link.com)"
                    /><br />
                    <input
                        type="text"
                        name="date"
                        onChange={handleChange}
                        placeholder="Due date (MM/DD/YYYY)"
                    /><br />

                    <div className="mt20">
                        Recurring Expense?&nbsp;
                        <input
                            type="radio"
                            id="yes"
                            name="recurring"
                            value="yes"
                            onChange={handleChange}
                            checked={formState.recurring === 'yes'}
                        />&nbsp;Yes&nbsp;&nbsp;
                        <input
                            type="radio"
                            id="no"
                            name="recurring"
                            value="no"
                            onChange={handleChange}
                            checked={formState.recurring === 'no'}
                        />&nbsp;No
                    </div>

                    <div className="center mt20">
                        <button type="submit" className="button-main">Add Expense</button>
                    </div>

                    {err && (
                        <div className="error-text mt10">
                            {err}
                        </div>
                    )}
                </div>
            </div>
        </form>

        
    </div>
    
  )
}
