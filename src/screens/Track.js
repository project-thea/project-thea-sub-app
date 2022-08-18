import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  ToastAndroid,
  PermissionsAndroid,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import Colors from '../shared/Colors';
import Footer from '../shared/Footer';
import { startTracking, stopTracking } from '../actions/TrackingActions';
import { getFrisbee } from '../Constants';
import { DateTime } from "luxon";
import Geolocation from 'react-native-geolocation-service';
import VIForegroundService from '@voximplant/react-native-foreground-service';

const Pulse = require('react-native-pulse').default;
let width = Dimensions.get('window').width;

const Track = (props) => {
  const [tracking, setTracking] = useState(false);
  
  //const foregroundServiceInst = VIForegroundService.getInstance();
  
  //---------------------------------------------
  const [forceLocation, setForceLocation] = useState(true);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [locationDialog, setLocationDialog] = useState(true);
  const [significantChanges, setSignificantChanges] = useState(false);
  const [observing, setObserving] = useState(false);
  const [foregroundService, setForegroundService] = useState(true);
  const [useLocationManager, setUseLocationManager] = useState(false);
  const [location, setLocation] = useState(null);

  const watchId = useRef(null);

  useEffect(() => {
    return () => {
      removeLocationUpdates();
    };
  }, [removeLocationUpdates]);

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          { text: 'Go to Settings', onPress: openSetting },
          { text: "Don't Use Location", onPress: () => {} },
        ],
      );
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
	  {
		title: 'Requesting tracking permissions',
		message: 'This app will track your movement as you move'
	  }
    );

	console.log('status:', status);
	;
	
    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    
	console.log('PermissionsAndroid:', PermissionsAndroid);
	;
    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
        console.log(position);
      },
      (error) => {
        Alert.alert(`Code ${error.code}`, error.message);
        setLocation(null);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: highAccuracy,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: forceLocation,
        forceLocationManager: useLocationManager,
        showLocationDialog: locationDialog,
      },
    );
  };

  const getLocationUpdates = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    if (Platform.OS === 'android' && foregroundService) {
      await startForegroundService();
    }

    setObserving(true);

    watchId.current = Geolocation.watchPosition(
      (position) => {
        setLocation(position);
        console.log(position);
      },
      (error) => {
        setLocation(null);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: highAccuracy,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 2000,
        forceRequestLocation: forceLocation,
        forceLocationManager: useLocationManager,
        showLocationDialog: locationDialog,
        useSignificantChanges: significantChanges,
      },
    );
  };

  const removeLocationUpdates = useCallback(() => {
    if (watchId.current !== null) {
      stopForegroundService();
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
      setObserving(false);
    }
  }, [stopForegroundService]);

  const startForegroundService = async () => {
    if (Platform.Version >= 26) {
      await VIForegroundService.getInstance().createNotificationChannel({
        id: 'locationChannel',
        name: 'Location Tracking Channel',
        description: 'Tracks location of user',
        enableVibration: false,
      });
    }

    return VIForegroundService.getInstance().startService({
      channelId: 'locationChannel',
      id: 420,
      title: 'THEA-GS', //appConfig.displayName,
      text: 'Collecting GPS location...',
      icon: 'ic_launcher',
    });
  };

  const stopForegroundService = useCallback(() => {
    VIForegroundService.getInstance().stopService().catch((err) => err);
  }, []);
  //---------------------------------------------
 
  
  const beginTracking = () => {
		getLocationUpdates();
		//setTracking(true);
		props.dispatch(startTracking());
	}
	
  const endTracking = () => {
  	removeLocationUpdates();
	//setTracking(false);
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
	const user_id = state.auth.userDetails.id ? state.auth.userDetails.id : 0;
	return { 
		uploadURL: state.settings.uploadURL,
		tracking: state.track.tracking,
		user_id: user_id,
		userDetails: state.auth.userDetails
	}
}

 export default connect(mapStateToProps)(Track);