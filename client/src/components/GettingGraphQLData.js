import React from "react";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";
import './GettingGraphQLData.css';
const GET_USER_INFO = gql`
	{
		supply {
			id
			storeLocation
			purchaseMethod
		}
	}
`;
const GettingGraphQLData = props => {
	return (
		<>
			<div className="list-type5">
				<h3>Graph List</h3><br/>
				<ol>
				{props.data?.supply?.map(p => (
					<li key={p.id}><a>{p.storeLocation} {p.purchaseMethod}</a></li>
				))}
				</ol>
			</div>
		</>
	);
};
export default graphql(GET_USER_INFO)(GettingGraphQLData);
