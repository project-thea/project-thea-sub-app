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
import { logout } from '../actions/AuthActions';

const Settings = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [server, setServer] = useState('');
	
	useEffect(() => {
		if(props.userDetails === null || props.userDetails === undefined){
			props.navigation.navigate('Login');
		}
	}, [props.userDetails]);
	
	
	return (
	<View style={{flex: 1}}>
		<ScrollView>
			<View style={{marginHorizontal: 10, marginTop: 10}}>

				<View>
					<Text h2>Account</Text>
				</View>
				
				<Text>UUID</Text>
				
				<Input
				  placeholder='Email'
				  leftIcon={
					<Icon
					  name='at'
					  size={24}
					  color='black'
					/>
				  }
				  value=""
				/>


				<Input
				  placeholder='Enter new password'
				  leftIcon={
					<Icon
					  name='key'
					  size={24}
					  color='black'
					/>
				  }
				/>

				<Input
				  placeholder='Confirm new password'
				  leftIcon={
					<Icon
					  name='key'
					  size={24}
					  color='black'
					/>
				  }
				/>
				
				<View>
					<Text h2>Collection settings</Text>
				</View>
				<Divider />
				
				<Input
				  placeholder='THEA Server'
				  leftIcon={
					<Icon
					  name='globe'
					  size={24}
					  color='black'
					/>
				  }
				/>

				<Button
				  title="Update"
				  containerStyle={{
					  marginTop: 10
				  }}
				  onPress={() => {}}
				/>
				

				<Button
				  title="Logout"
				  containerStyle={{
					  marginTop: 10
				  }}
				  onPress={() => {}}
				  buttonStyle={{
					  backgroundColor: 'red'
				  }}
				  onPress={() => props.dispatch(logout())}
				/>
				
				<Button
				  title="Delete Account"
				  containerStyle={{
					  marginTop: 10
				  }}
				  onPress={() => {}}
				  type="outline"
				  buttonStyle={{
					  color: 'red'
				  }}
				/>
			</View>
		</ScrollView>
		<Footer/>
	</View>
	);
}

function mapStateToProps(state) {
	return { 
		userDetails: state.auth.userDetails
	}
}

 export default connect(mapStateToProps)(Settings);