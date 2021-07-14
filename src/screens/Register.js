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
import RNPickerSelect from '@react-native-picker/picker';

const Register = (props) => {
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [othernames, setOthernames] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [nextOfKin, setNextOfKin] = useState('');
	const [nextOfKinPhone, setNextOfKinPhone] = useState('');
	const [idNumber, setIdNumber] = useState('');
	const [idType, setIdType] = useState('');
	
	useEffect(() => {
		if(props.userDetails){
			props.navigation.navigate('Track');
		}
	}, [props.userDetails]);
	
	
	const validateInputs = () => {
	  
		if(email.length === 0){
			Alert.alert('Error', 'Email is required.');
			return false;
		}
	  
		if(phone.length === 0){
			Alert.alert('Error', 'Phone number is required.');
			return false;
		}
	  
		return true;
	}
	
  return	(
		<ScrollView>
  	
		{props.authError ? (<View>{props.authError}</View>) : null}
  	
		<Input
			placeholder='First Name'
			leftIcon={
			<Icon
				name='angle-right'
				size={24}
				color='black'
			/>
			}
			onChangeText={(value) => setFirstname(value)}
		/>
  
		<Input
			placeholder='Last Name'
			leftIcon={
			<Icon
				name='angle-right'
				size={24}
				color='black'
			/>
			}
			onChangeText={(value) => setLastname(value)}
			disabled={props.registeringSubject}
		/>
  
  	<Input
		placeholder='Other names'
		leftIcon={
		<Icon
			name='angle-right'
			size={24}
			color='black'
		/>
		}
		onChangeText={(value) => setOthernames(value)}
		disabled={props.registeringSubject}
  	/>
	
  	<Input
		placeholder='Email'
		leftIcon={
		<Icon
			name='at'
			size={24}
			color='black'
		/>
		}
		onChangeText={(value) => setEmail(value)}
		disabled={props.registeringSubject}
  	/>
  
  	<Input
  	  placeholder='Phone'
  	  leftIcon={
  		<Icon
  		  name='phone'
  		  size={24}
  		  color='black'
  		/>
  	  }
	  onChangeText={(value) => setPhone(value)}
	  disabled={props.registeringSubject}
  	/>
	
  	<Input
  	  placeholder='Next of Kin'
  	  leftIcon={
  		<Icon
  		  name='user'
  		  size={24}
  		  color='black'
  		/>
  	  }
	  onChangeText={(value) => setNextOfKin(value)}
	  disabled={props.registeringSubject}
  	/>
	
  	<Input
  	  placeholder='Next of Kin Phone'
  	  leftIcon={
  		<Icon
  		  name='phone'
  		  size={24}
  		  color='black'
  		/>
  	  }
	  onChangeText={(value) => setNextOfKinPhone(value)}
	  disabled={props.registeringSubject}
  	/>
	
  	<Input
  	  placeholder='ID Number'
  	  leftIcon={
  		<Icon
  		  name='id-card'
  		  size={24}
  		  color='black'
  		/>
  	  }
	  onChangeText={(value) => setIdNumber(value)}
	  disabled={props.registeringSubject}
  	/>
	
  	<Input
  	  placeholder='ID Type'
  	  leftIcon={
  		<Icon
  		  name='list'
  		  size={24}
  		  color='black'
  		/>
  	  }
	  onChangeText={(value) => setIdType(value)}
	  disabled={props.registeringSubject}
  	/>
	
  	<Button
  	  title="Register"
  	  containerStyle={{
  		  marginHorizontal: 10
  	  }}
  	  onPress={() => { 
  		if(validateInputs()){
			props.dispatch(registerSujbect({
				firstname,
				lastname,
				othernames,
				email,
				phone,
				nextOfKin,
				nextOfKinPhone,
				idNumber,
				idType
			}));
		}
  		//props.dispatch(sendAuthDetails())
  	  }}
  	  loading={props.registeringSubject}
  	/>
  
  
  	<View style={{marginHorizontal: 10}}>
  		<Icon
  		  name='angle-right'
  		  size={24}
  		  color='black'
  		/>
  		<Text onPress={() => props.navigation.navigate('Login')}>Back to login</Text>
  	</View>
  	
  	
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
	 }
 });
 
function mapStateToProps(state) {
	return { 
		registeringSubject: state.auth.registeringSubject,
		authError: state.auth.authError,
		userDetails: state.auth.userDetails
	}
}

 export default connect(mapStateToProps)(Register);