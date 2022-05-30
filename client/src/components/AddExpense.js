import React, { useState } from 'react'

export default function AddExpense() {
    // Set state for radio in add-expense overlay
    const [recurring, setRecurring] = useState('yes');

    const handleChange = (e) => {
        if(e.target.name === 'recurring'){
            setRecurring(e.target.value);
        }
    };
  
    return (
    <div id="add-expense-overlay" className="overlay">
        <div id="add-expense" className="popup">
            <a className="close" href="#" title="Close">&times;</a>
            <div className="content">
                <h1>Add Expense</h1>
                <input
                    // value={formState.description}
                    name="description"
                    onChange={handleChange}
                    type="text"
                    placeholder="Description"
                />
                <input type="text" placeholder="Description" /><br />
                <input type="text" placeholder="Category" /><br />
                <input type="text" placeholder="Amount (###.##)" /><br />
                <input type="text" placeholder="Link" /><br />
                <input type="text" placeholder="Due date (MM/DD/YYYY)" /><br />
                <div className="mt20">
                    Recurring Expense?&nbsp;
                    <input
                        type="radio"
                        id="yes"
                        name="recurring"
                        value="yes"
                        onChange={handleChange}
                        checked={recurring === 'yes'}
                    />&nbsp;Yes&nbsp;&nbsp;
                    <input
                        type="radio"
                        id="no"
                        name="recurring"
                        value="no"
                        onChange={handleChange}
                        checked={recurring === 'no'}
                    />&nbsp;No
                </div>

                <div className="center mt20">
                    <button className="button-main">Add Expense</button>
                </div>
            </div>
        </div>
    </div>
  )
}
