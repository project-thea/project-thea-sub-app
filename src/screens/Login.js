import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { authUser } from '../actions/AuthActions';
import { useFocusEffect }  from 'react-navigation';

const Login = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	useEffect(() => {
		if(props.userDetails !== undefined && props.userDetails !== null){
			props.navigation.navigate('Track');
		}
	}, [props.userDetails]);
	
	return	(
	  <ScrollView>
		<View style={styles.appTitleContainer}>
		  <View>
		  	<Text style={styles.appTitle}>THEA-C19</Text>
		  </View>
		  <View>
		  	<Text style={styles.appSubtitle}>Subject App</Text>
		  </View>
		</View>
		
		{props.authError ? (<View style={styles.authError}><Text>{props.authError}</Text></View>) : null}
		
		<Input
		  placeholder='Enter email'
		  leftIcon={
			<Icon
			  name='at'
			  size={24}
			  color='black'
			/>
		  }
		  onChangeText={(value) => setEmail(value)}
		/>

		<Input
		  placeholder='Enter password'
		  leftIcon={
			<Icon
			  name='key'
			  size={24}
			  color='black'
			/>
		  }
		  onChangeText={(value) => setPassword(value)}
		  secureTextEntry={true}
		/>

		<Button
		  title="Login"
		  containerStyle={{
			  marginHorizontal: 10
		  }}
		  onPress={() => { 
			props.dispatch(authUser(email, password))
		  }}
		  loading={props.authenticating}
		/>


		<Button
		  title="Register"
		  containerStyle={{
			  marginHorizontal: 10,
			  marginTop: 10
		  }}
		  onPress={() => { 
			props.navigation.navigate('Register');
		  }}
		  type="outline"
		/>
		
		<View style={{marginHorizontal: 10}}>
	      <Icon
	        name='angle-right'
	        size={24}
	        color='black'
	      />
	      <Text>Log in anonymously?</Text>
		</View>
		
		<View style={{marginHorizontal: 10}}>
	      <Icon
	        name='angle-right'
	        size={24}
	        color='black'
	      />
	      <Text>Forgot password?</Text>
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
	 },
	 authError: {
		 backgroundColor: 'red',
		 color: '#ffffff'
	 }
 });
 
function mapStateToProps(state) {
	return { 
		authenticating: state.auth.authenticating,
		authError: state.auth.authError,
		userDetails: state.auth.userDetails
	}
}

 export default connect(mapStateToProps)(Login);