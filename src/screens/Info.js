import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, ListItem, Card } from 'react-native-elements';
import Colors from '../shared/Colors';
import Footer from '../shared/Footer';

const Info = (props) => {
	
	return (
	<View style={{flex: 1}}>
		<ScrollView>
			<Card>
				<Text style={{marginBottom: 10}}>
Project-THEA is a tracking platform using a mobile application akin to the one used in airline traffic tracking. We combine geo-location technology and COVID-19 test-history information through a mobile application called THEA-C19 to support public health preparedness and surveillance. This technology collates multiple COVID-test results of drivers and other occupants of haulage tracks along the transit routes together with geolocation in real-time to improve preparedness and case track and tracing within and between borders of East Africa.
				</Text>
				<ListItem key="3" bottomDivider onPress={() => Linking.openURL("https://project-thea.org")} topDivider>
					<ListItem.Content>
					  <ListItem.Title>Website</ListItem.Title>
					  <ListItem.Subtitle>https://project-thea.org</ListItem.Subtitle>
					</ListItem.Content>
				</ListItem>
		
				
			</Card>		
		</ScrollView>
		<Footer/>
	</View>
	);
}

function mapStateToProps(state) {
	return { 

	}
}

 export default connect(mapStateToProps)(Info);