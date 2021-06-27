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
import { Input, Button } from 'react-native-elements';
import Colors from '../shared/Colors';
import Footer from '../shared/Footer';
import QRCode from 'react-native-qrcode-svg';

const Certificate = (props) => {
	
	const windowWidth = Dimensions.get('window').width;
	const windowHeight = Dimensions.get('window').height;
	const size = windowWidth-20;

	return (
	<View style={{flex: 1}}>
		<ScrollView>
		<View style={{marginHorizontal: 10, marginTop: 10}}>
			<QRCode
			  value="http://project-thea.org"
			  size={size}
			/>	
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

 export default connect(mapStateToProps)(Certificate);