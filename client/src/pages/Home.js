import React from "react";

import Auth from '../utils/auth'
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_EXPENSES } from '../utils/queries';

export default function Home() {
    const { loading, data } = useQuery(QUERY_EXPENSES);
    const { data: userData } = useQuery(QUERY_ME);
    const expenses = data?.expenses || [];

    const loggedIn = Auth.loggedIn();

    return (
         <main> 
            <section className="list">
                <div className="flex-wrapper">
                    <div>
                        <div className="month-name">
                            May
                        </div>
                        <div className="month-nav">
                            <span>&#9664;</span> April | June <span>&#9654;</span>
                        </div>
                    </div>
    
                    <div className="pb10">
                        <a className="btn" href="#add-expense-overlay" title="Add Expense">&#43; Add Expense</a>
                    </div>
                </div>
                
                <div className="responsive-table">
                    <div className="table-header">
                        <div className="col">Description</div>
                        <div className="col">Category</div>
                        <div className="col">Amt</div>
                        <div className="col">Due</div>
                        <div className="col">Paid</div>
                        <div className="col">Link</div>
                        <div className="col">Actions</div>
                    </div>
                    
                    <div className="table-row">
                        <div className="col">Xfinity</div>
                        <div className="col">None</div>
                        <div className="col">$126.82</div>
                        <div className="col">May 28th</div>
                        <div className="col">
                            <label className="checkbox">
                                <input type="checkbox" />
                            </label>
                        </div>
                        <div className="col"></div>
                        <div className="col">
                            <a href="#edit-expense-overlay" title="Update Expense">
                                <img src={process.env.PUBLIC_URL + '/images/pencil.png'} /> 
                            </a>&nbsp;&nbsp;&nbsp;
                            <img src={process.env.PUBLIC_URL + '/images/trash3.png'} /> 
                        </div>
                    </div>
    
                    <div className="table-row">
                        <div className="col">Rent</div>
                        <div className="col">Household</div>
                        <div className="col">$1,200</div>
                        <div className="col">May 1st</div>
                        <div className="col">
                            <label className="checkbox">
                                <input type="checkbox" />
                            </label>
                        </div>
                        <div className="col">
                            <a href="www.pay.com" target="_blank">Pay</a>
                        </div>
                        <div className="col">
                            <a href="#edit-expense-overlay" title="Update Expense">
                                <img src={process.env.PUBLIC_URL + '/images/pencil.png'} /> 
                            </a>&nbsp;&nbsp;&nbsp;
                            <img src={process.env.PUBLIC_URL + '/images/trash3.png'} /> 
                        </div>
                    </div>
                </div>
            </section>
    
            <div id="add-expense-overlay" className="overlay">
                <div id="add-expense" className="popup">
                    <a className="close" href="#" title="Close">&times;</a>
                    <div className="content">
                        <h1>Add Expense</h1>
                        <input type="text" placeholder="Description" /><br />
                        <input type="text" placeholder="Category" /><br />
                        <input type="text" placeholder="Amount (###.##)" /><br />
                        <input type="text" placeholder="Link" /><br />
                        <input type="text" placeholder="Due date (MM/DD/YYYY)" /><br />
                        <div className="mt20">
                            Recurring Expense?&nbsp;
                            <input type="radio" id="yes" name="recurring" value="yes" checked />&nbsp;Yes&nbsp;&nbsp;
                            <input type="radio" id="no" name="recurring" value="no" />&nbsp;No
                        </div>
    
                        <div className="center mt20">
                            <button className="button-main">Add Expense</button>
                        </div>
                    </div>
                </div>
            </div>
    
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
                            <input type="radio" id="future" name="changes" value="future" checked />&nbsp;This and all future months<br />
                            <input type="radio" id="current" name="changes" value="current" />&nbsp;Only this month
                        </div>
                    </div>
    
                    <div className="center mt20">
                        <button className="button-main">Update Expense</button>
                    </div>
                </div>
            </div>
    
        </main>
      )
}