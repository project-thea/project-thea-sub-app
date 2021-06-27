import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import Colors from '../shared/Colors';
import Footer from '../shared/Footer';

const Pulse = require('react-native-pulse').default;

const Track = (props) => {
	const [tracking, setTracking] = useState(false);
	
	return (<View style={{flex: 1}}>
		<ScrollView>
			<View>	
				<Text style={{textAlign: 'center', fontSize: 18, marginTop: 20}}>Tap button below to start and stop tracking</Text>
			</View>

			<View style={{justifyContent: 'center',  alignItems:'center'}}>
			<TouchableOpacity
			   style={{
				   marginTop: '15%',
				   marginBottom: '15%',
				   borderWidth:1,
				   borderColor:'rgba(0,0,0,0.2)',
				   alignItems:'center',
				   justifyContent:'center',
				   width:100,
				   //position: 'absolute',                                          
				   bottom: 10,
				   //marginLeft: '35%',
				   
				   //right: 10,
				   height:100,
				   backgroundColor:'#fff',
				   borderRadius:100,
				   textAlign: 'center'
				 }}
				 
				 onPress={() =>setTracking(!tracking)}
			 >
				{tracking ? (<Pulse color={Colors.primary} numPulses={3} diameter={200} speed={20} duration={2000}/>
				):(<Icon
					raised
					name={tracking ? "square-full" : "map-marker"}
					size={40}  
					type='font-awesome-5' 
					color={tracking ? 'green' : Colors.primary }
					/>)}
			  </TouchableOpacity>
			  </View>
			  
		</ScrollView>
		<Footer/>
		</View>
	);
	
}

const styles = StyleSheet.create({
	container: {
	  color: Colors.lightishblue,
	  flex: 1,
	  flexDirection: "column"
	},
	footerContainer:{
	  marginTop: 10,
	},

	shadow:{
	shadowColor: "#000",
	shadowOffset: {
		width: 0,
		height: 1,
	},
	shadowOpacity: 0.22,
	shadowRadius: 2.22,

	elevation: 3,
	},
	quantityCircle: {
		width: 28,
		height: 28,
		borderRadius: 100/2,
		backgroundColor: '#52c41a',
		paddingTop: 4,
		paddingLeft: 10
	},
	quantityFont: {
	  color: 'white',
	},
	pulse: {
	  position: 'absolute',
	  top: '50%'
	}
});

function mapStateToProps(state) {
	return { 

	}
}

 export default connect(mapStateToProps)(Track);