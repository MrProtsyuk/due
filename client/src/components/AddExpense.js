import React, { useState } from 'react'

export default function AddExpense() {
    const [formState, setFormState] = useState({ description: '', category: '', amount: '', link: '', date: '', recurring: 'yes' });

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

        // clear form values
        setFormState({
            description: '',
            category: '',
            amount: '',
            link: '',
            date: '',
            recurring: 'yes'
        });

    }
    
    return (
    <div id="add-expense-overlay" className="overlay">
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
                    // value={formState.category}
                    type="text"
                    name="category"
                    onChange={handleChange}
                    placeholder="Category"
                /><br />
                <input
                    // value={formState.amount}
                    type="text"
                    name="amount"
                    onChange={handleChange}
                    placeholder="Amount (##.##)"
                /><br />
                <input
                    // value={formState.link}
                    type="text"
                    name="link"
                    onChange={handleChange}
                    placeholder="Link"
                /><br />
                <input
                    // value={formState.date}
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
                    <button type="submit" onClick={handleFormSubmit} className="button-main">Add Expense</button>
                </div>
            </div>
        </div>
    </div>
  )
}
