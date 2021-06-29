import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import { doAutoAuth } from '../actions/AuthActions';
import { Button } from 'react-native-elements';

const AutoLogin = (props) => {
	
	useEffect(() => {
		props.dispatch(doAutoAuth());
		const unsubscribe = props.navigation.addListener('focus', () => {
			props.dispatch(doAutoAuth());
		});

		return unsubscribe;
	}, [props.navigation]);
	
	useEffect(() => {
		if(props.autoLoginTo !== 'AutoLogin'){
			props.navigation.navigate(props.autoLoginTo);
		}
	}, [props.autoLoginTo]);
	
	return	(
	  <ScrollView>
		<View style={{marginHorizontal: 10}}>
		 <View style={[styles.container, styles.horizontal]}>
			{props.tryingAutoAuth ? (<ActivityIndicator size="large"  color="#0000ff" />) : (<Text>{props.autoAuthError}</Text>)}
		</View>
		{props.autoAuthError ? (<Button
		  title="Press to re-try"
		  type="clear"
		  onPress={() => props.dispatch(doAutoAuth())}
		/>) : null}
		
		<Button
		  title="Continue to login"
		  type="outline"
		  onPress={() => props.navigation.navigate('Login')}
		  containerStyle={{marginTop: 10}}
		  raised
		/>
		</View>
	   </ScrollView>
	);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
	marginTop: '20%',
	marginBottom: '20%'
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

function mapStateToProps(state) {
	return { 
		autoLoginTo: state.auth.autoLoginTo,
		tryingAutoAuth: state.auth.tryingAutoAuth,
		autoAuthError: state.auth.autoAuthError
	}
}

 export default connect(mapStateToProps)(AutoLogin);