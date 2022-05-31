import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    {
        me {
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

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            userExpenses
        }
    }
`;

export const QUERY_EXPENSES  = gql`
    query expenses($username: String!) {
        expenses(username: $username) {
            _id
            description
            date
            amount
            link
            category
            recurring
        }

    }
`;

export const QUERY_EXPENSE  = gql`
    query expense($id: ID!){
        expense(_id: $id) {
            _id
            description
            date
            amount
            link
            category
            recurring
        }
    }
`;
