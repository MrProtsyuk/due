import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            userCategory {
                _id
                name
            }
            userExpenses {
                _id
                description
                date
                amount
                link
                category
            }
        }
    }
`;

export const QUERY_CATEGORIES = gql`
    query categories($name: String!) {
        categories(name: $name) {
            _id
            name
        }
    }
`;

export const QUERY_USER  = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            userCategory
            userExpenses
        }
    }
`;

export const QUERY_EXPENSES  = gql`
    query expenses($username: String) {
        expenses(username: $username) {
            _id
            description
            date
            amount
            link
            category
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
        }
    }
`;
