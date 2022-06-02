import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_EXPENSE } from '../utils/mutations';
import { checkDate, isValidHttpUrl } from '../utils/helpers';

export default function EditExpense({ exp, setExp }) {
    const [editExpense, { error }] = useMutation(EDIT_EXPENSE);
    const [err, setErr] = useState('');
  
    // update state based on form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setExp({
            ...exp,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Description Validation
        if(!exp.description){
            setErr('You must enter a description');
            return;
        }
    
        // Category not required

        // Amount Validation - skips on second round for some reason
        if(!Number.isInteger(parseInt(exp.amount))){
            setErr('You must enter a valid amount with no decimal');
            return;
        }

        // Link Validation
        if(!isValidHttpUrl(exp.link)){
            setErr('You must enter a valid link');
            return;
        }

        // Date Validation
        if(!checkDate(exp.date)){
            setErr('You must enter a valid date');
            return;
        }

        console.log ('sending ', exp)

        try {
            const { data } = await editExpense({
            variables: { _id: exp._id, description: exp.description, category: exp.category, amount: parseInt(exp.amount), link: exp.link, date: exp.date, recurring: exp.recurring, paid: exp.paid }
        });
            
        } catch (error2) {
            if (error2 instanceof Error) {
                console.log(error2.message)
            }
        }

        window.location.assign('/');
    }

    return (
    <div id="edit-expense-overlay" className="overlay">
        <form onSubmit={handleFormSubmit}>
            <div id="edit-expense" className="popup">
                <a className="close" href="#" title="Close">&times;</a>
                <div className="content">
                    <h1>Update Expense</h1>
                    <label>Description</label>
                    <input
                        value={exp.description}
                        name="description"
                        onChange={handleChange}
                        type="text"
                        placeholder="Description"
                    />
                    <label>Category</label>
                    <input
                        value={exp.category}
                        type="text"
                        name="category"
                        onChange={handleChange}
                        placeholder="Category"
                    />
                    <label>Amount</label>
                    <input
                        value={exp.amount}
                        type="text"
                        name="amount"
                        onChange={handleChange}
                        placeholder="Amount (##.##)"
                    />
                    <label>Link</label>
                    <input
                        value={exp.link}
                        type="text"
                        name="link"
                        onChange={handleChange}
                        placeholder="Link"
                    />
                    <label>Date</label>
                    <input
                        value={exp.date}
                        type="text"
                        name="date"
                        onChange={handleChange}
                        placeholder="Due date (MM/DD/YYYY)"
                    /><br />
                    {/* <div className="mt20">
                        Apply changes to:<br />
                        <input
                            type="radio"
                            id="future"
                            name="changes"
                            value="future"
                            onChange={handleChange}
                            checked={exp.changes === 'future'} 
                        />&nbsp;This and all future months<br />
                        <input
                            type="radio"
                            id="current"
                            name="changes"
                            value="current"
                            onChange={handleChange}
                            checked={exp.changes === 'current'} 
                        />&nbsp;Only this month
                    </div> */}
                </div>

                <div className="center mt20">
                    <button type="submit" className="button-main" title="Update Expense">Update Expense</button>
                </div>

                {err && (
                    <div className="error-text mt10">
                        {err}
                    </div>
                )}
            </div>
        </form>
    </div>
  )
}
