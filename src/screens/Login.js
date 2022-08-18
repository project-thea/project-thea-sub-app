import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { registerSujbect, setRegistrationError } from '../actions/AuthActions';
import { useFocusEffect }  from 'react-navigation';

const Login = (props) => {
	const [phone, setPhone] = useState('');
	
	useEffect(() => {
		if(props.userDetails !== undefined && props.userDetails !== null){
			props.navigation.navigate('Track');
		}
	}, [props.userDetails]);
	
	return	(
	  <ScrollView>
		<View style={styles.appTitleContainer}>
		  <View>
		  	<Text style={styles.appTitle}>THEA-GS</Text>
		  </View>
		  <View>
		  </View>
		</View>
		
		{props.registrationError ? (
		<View style={{...styles.registrationError, flexDirection: 'row'}}>
			<View style={{flex: 1}}>
			  <Icon name="exclamation-triangle" size={28}/>
			</View>
			<View style={{flex: 8}}>
			  <Text style={{color: '#721c24', fontSize: 16}}>{props.registrationError}</Text>
			</View>
		</View>) : null}
		
		<View style={{marginTop: '40%'}}></View>
		<Input
		  placeholder='Phone Number'
		  leftIcon={
			<Icon
			  name='phone'
			  size={24}
			  color='black'
			/>
		  }
		  onChangeText={(value) => setPhone(value)}
		/>
		
		<Button
		  title="Enroll"
		  containerStyle={{
			  marginHorizontal: 10
		  }}
		  onPress={() => { 
		    if(new RegExp('[0-9]{7,}').test(phone)){
			  props.dispatch(registerSujbect({phone}));			
		    }else{
			  Alert.alert("Error", "Please provide atleast  7 digits for the phone number");
		    }
		  }}
		  loading={props.registeringSubject}
		/>


		{
		//<Button
		//  title="Register"
		//  containerStyle={{
		//	  marginHorizontal: 10,
		//	  marginTop: 10
		//  }}
		//  onPress={() => { 
		//	props.navigation.navigate('Register');
		//  }}
		//  type="outline"
		///>
		}
	   </ScrollView>
	);

}

 const styles = StyleSheet.create({
	 heading: {
		 fontSize: 11
	 },
	 appTitleContainer:{
		 justifyContent: 'center',
		 flexDirection: 'row',
		 marginTop: 10,
		 //flex: 1
	 },
	 appTitle:{
		 fontSize: 24
	 },
	 appSubtitle:{
		 marginTop: 10,
		 flex: 1
	 },
	 registrationError: {
		 backgroundColor: '#f8d7da',
		 color: '#fff',
		 marginHorizontal: 10,
		 padding: 10
	 }
 });
 
function mapStateToProps(state) {
	return { 
		registrationError: state.auth.registrationError,
		userDetails: state.auth.userDetails,
		registeringSubject: state.auth.registeringSubject
	}
}

 export default connect(mapStateToProps)(Login);