import { gql } from '@apollo/client';

export const LOGIN_USER  = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER  = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token 
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_EXPENSE  = gql`
    mutation addExpense(
        $description: String!
        $category: String
        $amount: Int! 
        $link: String
        $date: String!
        $recurring: String!
        $paid: Boolean
        ) {
        addExpense(
            description: $description
            category: $category
            amount: $amount 
            link: $link 
            date: $date
            recurring: $recurring
            paid: $paid
        ) {
            _id
            username
            email
            userExpenses {
                _id
                description
                date
                amount
                link
                category
                recurring   
                paid            
            }
        }
    }
`;

export const REMOVE_EXPENSE = gql`
    mutation removeExpense($_id: ID!) {
        removeExpense(_id: $_id) {
            username
            userExpenses {
                _id
                description
                date
                amount
                link
                category
                recurring
                paid     
            }
        }
    }
`;

export const EDIT_EXPENSE = gql`
    mutation editExpense($_id: ID!) {
        editExpense(_id: $_id) {
            username
            userExpenses {
                description
                date
                amount
                link
                category
                recurring   
                paid      
            }
        }
    }
`