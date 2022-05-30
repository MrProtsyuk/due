import React, { useState } from 'react'

export default function EditExpense() {
    // Set state for radio in add-expense overlay
    const [changes, setChanges] = useState('current');

    const handleChange = (e) => {
        if(e.target.name === 'changes'){
            setChanges(e.target.value);
        }
    };
  
    return (
    <div id="edit-expense-overlay" className="overlay">
        <div id="edit-expense" className="popup">
            <a className="close" href="#" title="Close">&times;</a>
            <div className="content">
                <h1>Update Expense</h1>
                <input type="text" placeholder="Description" /><br />
                <input type="text" placeholder="Category" /><br />
                <input type="text" placeholder="Amount" /><br />
                <input type="text" placeholder="Link" /><br />
                <input type="text" placeholder="Due date (MM/DD/YYYY)" /><br />
                <div className="mt20">
                    Apply changes to:<br />
                    <input
                        type="radio"
                        id="future"
                        name="changes"
                        value="future"
                        onChange={handleChange}
                        checked={changes === 'future'} 
                    />&nbsp;This and all future months<br />
                    <input
                        type="radio"
                        id="current"
                        name="changes"
                        value="current"
                        onChange={handleChange}
                        checked={changes === 'current'} 
                    />&nbsp;Only this month
                </div>
            </div>

            <div className="center mt20">
                <button className="button-main">Update Expense</button>
            </div>
        </div>
    </div>
  )
}
