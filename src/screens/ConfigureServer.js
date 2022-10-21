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
import { updateUploadURL } from '../actions/SettingsActions';
import { useFocusEffect }  from 'react-navigation';

const ConfigureServer = (props) => {
	const [serverURL, setServerURL] = useState(props.uploadURL);
	const [updating, setUpdating] = useState(false);
	
	useEffect(() => {
		if(props.userDetails !== undefined && props.userDetails !== null){
			props.navigation.navigate('Track');
		}
	}, [props.userDetails]);
	
	const checkUpdateStatus = () => {
	  setUpdating(true);
	  setTimeout(() => {
		  if(props.uploadURL === serverURL){
			  Alert.alert('Success', 'Server URL updated successfully.');
			  setUpdating(false);
		  }
	  }, 2000);
	}
	
	return	(
	  <ScrollView>
		
		<View style={{marginHorizontal: 10, marginTop: 10}}>
		  <Text>Set THEA-GS Server URL. By default, the demo server at https://demo.project-thea.org will be used</Text>
		</View>
		<View style={{marginTop: '10%'}}></View>
		<Input
		  disabled={updating}
		  placeholder='THEA GS Server URL'
		  leftIcon={
			<Icon
			  name='server'
			  size={24}
			  color='black'
			/>
		  }
		  value={serverURL}
		  onChangeText={(value) => setServerURL(value)}
		/>
		
		<Button
		  disabled={updating}
		  title="Update"
		  containerStyle={{
			  marginHorizontal: 10
		  }}
		  onPress={() => { 
		    if(serverURL.length > 6){
			  props.dispatch(updateUploadURL(serverURL));	
			  checkUpdateStatus();
		    }else{
			  Alert.alert("Error", "Please provide atleast  6 leters for the server URL");
		    }
		  }}
		  loading={updating}
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
		 backgroundColor: '#f8d7da',
		 color: '#fff',
		 marginHorizontal: 10,
		 padding: 10
	 }
 });
 
function mapStateToProps(state) {
	return { 
		uploadURL : state.settings.uploadURL
	}
}

 export default connect(mapStateToProps)(ConfigureServer);