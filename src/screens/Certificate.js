import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import Colors from '../shared/Colors';
import Footer from '../shared/Footer';
import QRCode from 'react-native-qrcode-svg';
import { getTests } from '../actions/TestActions';
import { DateTime } from "luxon";

const Certificate = (props) => {
	const now = DateTime.fromISO(new Date());
	const windowWidth = Dimensions.get('window').width;
	const windowHeight = Dimensions.get('window').height;
	const size = windowWidth-20;

	const getColor = (status) => {
		if(props.recentTest === null ) return 'grey';
		
		if(props.recentTest.status.toUpperCase() === 'POSITIVE') return 'red';
		if(props.recentTest.status.toUpperCase() === 'NEGATIVE') return 'green';
		
		//unknown
		return 'grey';
	}

	const testDate = props.recentTest ? DateTime.fromISO(props.recentTest.created_at) : null;
	
	return (
	<View style={{flex: 1}}>
		<ScrollView
			refreshControl={
			  <RefreshControl
				refreshing={props.fetchingTests}
				onRefresh={() => props.dispatch(getTests())}
			  />
			}
		>
		<View style={{marginHorizontal: 10, marginTop: 10}}>
			
		<QRCode
		  value={props.unique_id}
		  size={size}
		  color={getColor()}
		/>
		
		</View>
		</ScrollView>
		<View>
			<Text>Swipe down to refresh</Text>
		</View>
		<Footer/>
	</View>
	);
}

function mapStateToProps(state) {
	const recentTest = state.tests.tests.length > 0 ? state.tests.tests[0] : null;
	return { 
	    recentTest,
		fetchingTests: state.tests.fetchingTests,
		fetchingTestsError: state.tests.fetchingTestsError,
		unique_id: state.auth.userDetails.unique_id
	}
}

export default connect(mapStateToProps)(Certificate);