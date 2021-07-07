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
import { registerSujbect } from '../actions/AuthActions';
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
		  	<Text style={styles.appTitle}>THEA-C19</Text>
		  </View>
		  <View>
		  	<Text style={styles.appSubtitle}>Subject App</Text>
		  </View>
		</View>
		
		{props.registrationError ? (<View style={styles.registrationError}><Text>{props.registrationError}</Text></View>) : null}
		
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
		  title="Use Anonymously"
		  containerStyle={{
			  marginHorizontal: 10
		  }}
		  onPress={() => { 
			props.dispatch(registerSujbect({phone}))
		  }}
		  loading={props.registeringSubject}
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
		 backgroundColor: 'red',
		 color: '#ffffff'
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