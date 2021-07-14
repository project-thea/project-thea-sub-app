import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, ListItem } from 'react-native-elements';
import Colors from '../shared/Colors';
import Footer from '../shared/Footer';
import { getTests } from '../actions/TestActions';
import { DateTime } from "luxon";

const Tests = (props) => {
    
	const now = DateTime.fromISO(new Date());
	
	useEffect(() => {
		refreshTests();
	}, []);

	const refreshTests = () => {
		if(!props.fetchingTests){
			props.dispatch(getTests());
		}
	}
	
	return (
	<SafeAreaView style={{flex: 1}}>
		<ScrollView
			refreshControl={
			  <RefreshControl
				refreshing={props.fetchingTests}
				onRefresh={() => refreshTests()}
			  />
			}
		>
		<View style={{marginHorizontal: 10, marginTop: 10}}>
			
			
			{props.tests.map( (v, i) => {
				const testDate = DateTime.fromISO(v.created_at);
				const dateDiff = now.diff(testDate, ['days']);
				return (
				<ListItem key="3" bottomDivider onPress={() => props.navigation.navigate('TestDetails', {index: i} )}>
					<ListItem.Content>
					  <ListItem.Title>{v.status}</ListItem.Title>
					  <ListItem.Subtitle>Test done on {DateTime.fromISO(v.created_at).toFormat('yyyy-LL-dd HH:mm:ss')}</ListItem.Subtitle>
					</ListItem.Content>
					<ListItem.Chevron />
				</ListItem>
			);})}
	  	
		</View>
		</ScrollView>
		<View>
			{props.tests.length > 0 ? null : (<Text>You have 0 tests. Swipe down to refresh.</Text>)}
		</View>
		<Footer/>
	</SafeAreaView>
	);
}

function mapStateToProps(state) {
	return { 
		tests: state.tests.tests,
		fetchingTests: state.tests.fetchingTests,
		fetchingTestsError: state.tests.fetchingTestsError
	}
}

 export default connect(mapStateToProps)(Tests);