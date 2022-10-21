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
import { Input, Button, ListItem, Divider } from 'react-native-elements';
import Colors from '../shared/Colors';
import Footer from '../shared/Footer';
import { deleteSubject, updateSubject, deleteAccount } from '../actions/AuthActions';

const Settings = (props) => {
	
	console.log("000000000000000000000000000000000000000000000000000000");
	console.log("props.userDetails:", props.userDetails);
	if(props.userDetails === null || props.userDetails === undefined){
	  console.log("999999999999999999999999999999999999999999999999999999");
	  props.navigation.navigate('Login');
	}
	
  const [firstname, setFirstname] = useState(props.userDetails.first_name);
  const [lastname, setLastname] = useState(props.userDetails.last_name);
  const [othernames, setOthernames] = useState(props.userDetails.othernames);
  const [email, setEmail] = useState(props.userDetails.email);
  const [phone, setPhone] = useState(props.userDetails.phone);
  const [nextOfKin, setNextOfKin] = useState(props.userDetails.next_of_kin);
  const [nextOfKinPhone, setNextOfKinPhone] = useState(props.userDetails.next_of_kin_phone);
  const [idNumber, setIdNumber] = useState(props.userDetails.id_number);
  const [idType, setIdType] = useState(props.userDetails.id_type);
  const [nationality, setNationality] = useState(props.userDetails.nationality);
	
  useEffect(() => {
	if(props.userDetails === null || props.userDetails === undefined){
	  props.navigation.navigate('Login');
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
  
  return (
	<View style={{flex: 1}}>
    <ScrollView>
	  <View style={{marginHorizontal: 10, marginTop: 10}}>

		<View>
  		  <Text h2>Account</Text>
			</View>
				
	  		<Text h5>{props.userDetails.unique_id}</Text>
				
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
			  defaultValue={firstname}
			  disabled={props.updatingSubject}
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
			  defaultValue={lastname}
			  disabled={props.updatingSubject}
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
			  defaultValue={othernames}
			  disabled={props.updatingSubject}
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
			  defaultValue={email}
			  disabled={props.updatingSubject}
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
			  defaultValue={phone}
			  disabled={props.updatingSubject}
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
			  defaultValue={nextOfKin}
			  disabled={props.updatingSubject}
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
			  defaultValue={nextOfKinPhone}
			  disabled={props.updatingSubject}
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
			  defaultValue={idNumber}
			  disabled={props.updatingSubject}
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
			  defaultValue={idType}
			  disabled={props.updatingSubject}
			/>
			
				
				<View>
					<Text h2>Collection settings</Text>
				</View>
				<Divider />
				
				<Input
				  defaultValue={props.uploadURL}
				  placeholder='THEA Server'
				  leftIcon={
					<Icon
					  name='globe'
					  size={24}
					  color='black'
					/>
				  }
				  disabled={props.updatingSubject}
				/>

				<Button
				  title="Update"
				  containerStyle={{
					  marginTop: 10
				  }}
				  onPress={() => {}}
				/>
				

				<Button
					title="Delete Info"
					containerStyle={{
						marginTop: 10
					}}
					buttonStyle={{
						backgroundColor: 'red'
					}}
				  
					onPress={() => { 
						props.dispatch(deleteAccount(() => props.navigation.navigate('Login')));
						}
					}
				/>
			</View>
		</ScrollView>
		<Footer/>
	</View>
	);
}

function mapStateToProps(state) {
	return { 
		userDetails: state.auth.userDetails,
		updatingSubject: state.auth.updatingSubject,
		uploadURL: state.settings.uploadURL
	}
}

 export default connect(mapStateToProps)(Settings);