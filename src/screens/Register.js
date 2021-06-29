import React from 'react';
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
import { sendAuthDetails } from '../actions/AuthActions';

const Register = (props) => {
	
	return	(
	  <ScrollView>
		
		{props.authError ? (<View>{props.authError}</View>) : null}
		
		<Input
		  placeholder='email'
		  leftIcon={
			<Icon
			  name='at'
			  size={24}
			  color='black'
			/>
		  }
		/>

		<Input
		  placeholder='First Name'
		  leftIcon={
			<Icon
			  name='key'
			  size={24}
			  color='black'
			/>
		  }
		/>

		<Input
		  placeholder='Last time'
		  leftIcon={
			<Icon
			  name='key'
			  size={24}
			  color='black'
			/>
		  }
		/>

		<Input
		  placeholder='Other names'
		  leftIcon={
			<Icon
			  name='key'
			  size={24}
			  color='black'
			/>
		  }
		/>
		
		<Button
		  title="Login"
		  containerStyle={{
			  marginHorizontal: 10
		  }}
		  onPress={() => { 
			props.navigation.navigate('Track');
			//props.dispatch(sendAuthDetails())
		  }}
		  loading={props.authenticating}
		/>


		<View style={{marginHorizontal: 10}}>
			<Icon
			  name='angle-right'
			  size={24}
			  color='black'
			/>
			<Text>Back to login</Text>
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
		authenticating: state.auth.authenticating,
		authError: state.auth.authError
	}
}

 export default connect(mapStateToProps)(Register);