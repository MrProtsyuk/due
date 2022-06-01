import React, { useState } from "react";
import AddExpense from '../components/AddExpense'
import EditExpense from '../components/EditExpense'
import Expenses from '../components/Expenses'

import Auth from '../utils/auth'
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_EXPENSE } from "../utils/mutations";


export default function Home() {
    const loggedIn = Auth.loggedIn();

    if(!loggedIn){
        console.log('not logged in')
        window.location.assign('/login');
    }
    
    const { loading, data } = useQuery(QUERY_ME);
    const [ removeExpense, { error } ] = useMutation(REMOVE_EXPENSE)

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

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
                    
                    <Expenses username={data.me.username} />
                </div>
            </section>

            <AddExpense />

            <EditExpense />
    
        </main>
      )
}