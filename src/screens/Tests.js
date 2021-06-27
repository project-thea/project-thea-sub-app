import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, ListItem } from 'react-native-elements';
import Colors from '../shared/Colors';
import Footer from '../shared/Footer';

const Tests = (props) => {


	return (
	<View style={{flex: 1}}>
		<ScrollView>
		<View style={{marginHorizontal: 10, marginTop: 10}}>
			
			<ListItem key="0" bottomDivider  onPress={() => props.navigation.navigate('TestDetails')}>
				<ListItem.Content>
				  <ListItem.Title>NEGATIVE</ListItem.Title>
				  <ListItem.Subtitle>Test done on 20/04/2021</ListItem.Subtitle>
				</ListItem.Content>
				<ListItem.Chevron />
			</ListItem>
			<ListItem key="1" bottomDivider onPress={() => props.navigation.navigate('TestDetails')}>
				<ListItem.Content>
				  <ListItem.Title>NEGATIVE</ListItem.Title>
				  <ListItem.Subtitle>Test done on 20/04/2021</ListItem.Subtitle>
				</ListItem.Content>
				<ListItem.Chevron/>
			</ListItem>
			<ListItem key="2" bottomDivider onPress={() => props.navigation.navigate('TestDetails')}>
				<ListItem.Content>
				  <ListItem.Title>NEGATIVE</ListItem.Title>
				  <ListItem.Subtitle>Test done on 20/04/2021</ListItem.Subtitle>
				</ListItem.Content>
				<ListItem.Chevron />
			</ListItem>
			<ListItem key="3" bottomDivider onPress={() => props.navigation.navigate('TestDetails')}>
				<ListItem.Content>
				  <ListItem.Title>POSITIVE</ListItem.Title>
				  <ListItem.Subtitle>Test done on 20/04/2021</ListItem.Subtitle>
				</ListItem.Content>
				<ListItem.Chevron />
			</ListItem>
	  
		</View>
		</ScrollView>
		<Footer/>
	</View>
	);
}

function mapStateToProps(state) {
	return { 

	}
}

 export default connect(mapStateToProps)(Tests);