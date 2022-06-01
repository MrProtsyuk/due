import React, { useState } from "react";
import AddExpense from '../components/AddExpense'
import EditExpense from '../components/EditExpense'
import Expenses from '../components/Expenses'

import Auth from '../utils/auth'
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_EXPENSES } from '../utils/queries';

export default function Home() {
    const [radio, setRadio] = useState('current');
    
    const { loading, error, data } = useQuery(QUERY_ME);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const loggedIn = Auth.loggedIn();

    if(!loggedIn){
        console.log('not logged in')
        window.location.assign('/login');
    }

    const handleChange = (e) => {
        setRadio(e.target.value);
    };

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
                                <img src={process.env.PUBLIC_URL + '/images/pencil.png'} alt='edit' /> 
                            </a>&nbsp;&nbsp;&nbsp;
                            <img src={process.env.PUBLIC_URL + '/images/trash3.png'} alt='delete' /> 
                        </div>
                    </div>

                    <Expenses username={data.me.username} />
    
                </div>
            </section>

            <AddExpense />

            <EditExpense />
    
        </main>
      )
}