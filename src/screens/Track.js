import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import Colors from '../shared/Colors';
import Footer from '../shared/Footer';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import { startTracking, stopTracking } from '../actions/TrackingActions';

const Pulse = require('react-native-pulse').default;
let width = Dimensions.get('window').width;

const Track = (props) => {
  const [tracking, setTracking] = useState(false);
  
  useEffect(() => {
	  configBgLocation();
	  
	  return () => {
		  //@TODO: Clean up
	  }
  });
  
  const configBgLocation = () => {
	BackgroundGeolocation.configure({
	  desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
	  stationaryRadius: 50,
	  distanceFilter: 50,
	  notificationTitle: 'THEA-C19',
	  notificationText: 'Collecting GPS location...',
	  debug: false,
	  startOnBoot: false,
	  stopOnTerminate: true,
	  locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
	  interval: 10000,
	  fastestInterval: 5000,
	  activitiesInterval: 10000,
	  stopOnStillActivity: false,
	  url: props.uploadURL,
	  httpHeaders: {
		'Authorization': `Bearer ${props.accessToken}`,
	  },
	  // customize post properties
	  postTemplate: {
		latitude: '@latitude',
		longitude: '@longitude',
		subject_id: props.user_id,
		date_time: '@time',
		unique_id: ''
	  }
	});
	
	BackgroundGeolocation.on('location', (location) => {
	  // handle your locations here
	  // to perform long running operation on iOS
	  // you need to create background task
	  console.log('locatoin:', location);
	  
	  BackgroundGeolocation.startTask(taskKey => {
		// execute long running task
		// eg. ajax post location
		// IMPORTANT: task has to be ended by endTask
		BackgroundGeolocation.endTask(taskKey);
	  });
	});
	
    BackgroundGeolocation.on('stationary', (stationaryLocation) => {
      // handle stationary locations here
      Actions.sendLocation(stationaryLocation);
    });

    BackgroundGeolocation.on('error', (error) => {
      console.log('[ERROR] BackgroundGeolocation error:', error);
    });

    BackgroundGeolocation.on('start', () => {
      console.log('[INFO] BackgroundGeolocation service has been started');
    });

    BackgroundGeolocation.on('stop', () => {
      console.log('[INFO] BackgroundGeolocation service has been stopped');
    });

    BackgroundGeolocation.on('authorization', (status) => {
      console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(() =>
          Alert.alert('App requires location tracking permission', 'Would you like to open app settings?', [
            { text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings() },
            { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
          ]), 1000);
      }
    });

    BackgroundGeolocation.on('background', () => {
      console.log('[INFO] App is in background');
    });

    BackgroundGeolocation.on('foreground', () => {
      console.log('[INFO] App is in foreground');
    });

    BackgroundGeolocation.on('abort_requested', () => {
      console.log('[INFO] Server responded with 285 Updates Not Required');

      // Here we can decide whether we want stop the updates or not.
      // If you've configured the server to return 285, then it means the server does not require further update.
      // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
      // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
    });

    BackgroundGeolocation.on('http_authorization', () => {
      console.log('[INFO] App needs to authorize the http requests');
    });
		
  }
  
  const beginTracking = () => {
		BackgroundGeolocation.checkStatus(status => {
		  console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
		  console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
		  console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);

		  // you don't need to check status before start (this is just the example)
		  if (!status.isRunning) {
			BackgroundGeolocation.start(); //triggers start on start event
		  }
		  props.dispatch(startTracking());
		});
	}
	
  const endTracking = () => {
  	console.log('[INFO] end Tracking');
  	
  	//BackgroundGeolocation.removeAllListeners();
  	BackgroundGeolocation.stop();
  	props.dispatch(stopTracking());
  }
	
	const toggleTracking = () => {
		console.log("[TOGGLETRACKING]:", props.tracking);
		if(!props.tracking){
			beginTracking();
			return;
		}
		endTracking();
	}
	
  return (<View style={{flex: 1}}>
  	<ScrollView>
  	  <View>	
  	  	<Text style={{textAlign: 'center', fontSize: 18, marginTop: 20}}>Tap button below to start and stop tracking</Text>
  	  </View>
  
  	  <View style={{justifyContent: 'center',  alignItems:'center'}}>
  		<TouchableOpacity
  		   style={{
  		     marginTop: '20%',
  		     marginBottom: '15%',
  		     borderWidth:1,
  		     borderColor:'rgba(0,0,0,0.2)',
  		     alignItems:'center',
  		     justifyContent:'center',
  		     width:150,
  		     //position: 'absolute',                                          
  		     bottom: 10,
  		     //marginLeft: '35%',
  		     
  		     //right: 10,
  		     height:150,
  		     backgroundColor:'#fff',
  		     borderRadius:150,
  		     textAlign: 'center'
  		   }}
  		  onPress={() => toggleTracking()}
  		 >
  			{props.tracking ? (<Pulse color={Colors.primary} numPulses={3} diameter={200} speed={20} duration={2000}/>
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
  </View>);
	
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
	const user_id = state.auth.userDetails ? state.auth.userDetails.id : 0;
	return { 
		//uuid: state.auth.uuid,
		uploadURL: state.settings.uploadURL,
		tracking: state.track.tracking,
		user_id: user_id,
		accessToken: state.auth.token
	}
}

 export default connect(mapStateToProps)(Track);