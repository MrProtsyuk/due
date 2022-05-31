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
        ) {
        addExpense(
            description: $description
            category: $category
            amount: $amount 
            link: $link 
            date: $date
            recurring: $recurring
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
            }
        }
    }
`;