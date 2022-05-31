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
        $amount: Int! 
        $link: String! 
        $recurring: Boolean!
        ) {
        addExpense(
            description: $description 
            amount: $amount 
            link: $link 
            recurring: $recurring
        ) {
            _id
            username
            email
            userExpense {
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