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
    mutation addExpense($description: String!, $amount: Int!, $link: String!) {
        addExpense(description: $description, amount: $amount, link: $link) {
            _id
            description
            date
            amount
            link
            category
        }
    }
`;

export const ADD_CATEGORY  = gql`
    mutation addCategory($name: String!) {
        addCategory(name: $name) {
            _id
            name
        }
    }
`;
