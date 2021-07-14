Solution to issue with  @mauron85/react-native-background-geolocation!
https://github.com/mauron85/react-native-background-geolocation/issues/468


# Setup

1. Install Android Studio or the Android SDK 
2. Make sure android platform-tools folder is in the PATH environment variable. 
3. Make sure ANDROID_HOME is set to the location of the Sdk installation folder.
4. Have Androild API 28+ Installed. Go to Android Studio > Tools > SDK Manager. Optionally, update your android/build.gradle with your desired API level and correspond Android gradle plugin(refer to the AGP release notes at https://developer.android.com/studio/releases/gradle-plugin)
5. Clone the repo  and switch to project folder 
6. Install node dependencies : yarn install or npm install
7. Connect phone with usb debugging enabled if you using the phone to debug 
8. For Android, yarn run android or npm run android 
9. For iOS run: yarn run ios or npm run ios

# On Mac OSX 
1. Install the latest xcode via the app store 
2. install node and watchman 
   brew install node 
   brew install watchman
3. Install the lastes Xcode from the Mac App Store.
4. Install the Xcode Commandline tools by going to Xcode menu > Preferences > Locations panel. Install the toosl by selecting the most recent version in teh Command Line Tools dropdown
5. Install an iOS Simulator in Xcode. Open Xcode > Preferences > Components tab and select a simulator for the iOS version you want to use. 
6. Install CocoaPods 
	sudo gem install cocoapods
7. Install node dependences 
	npm install 
8. Install the cocoa pods 
    cd ios 
	pop install 
9 Update the build target by running pod update 
	cd ios 
	pod update

# Notes during development 
## Bug in  @mauron85/react-native-background-geolocation
We use the @mauron85/react-native-background-geolocation for tracking and as of the current  release there is a bug when using Android Sdk 29+. Below is the solution until this is fixed (or we submit patch).

This bug results in error below:
```
1: Task failed with an exception.
-----------
* Where:
Script 'C:\Users\Emmanuel\Documents\THEA\code\ProjectTheaSubApp\node_modules\@mauron85\react-native-background-geolocation\android\common\VERSIONS.gradle' line: 27
```

The solution is to  remove the "else if" block on lines 26 to 28 or replace lines 26 and 27 of @mauron85\react-native-background-geolocation\android\common\VERSIONS.gradle

```
#from 
else if (findProject(':app') != null) {
            applicationId = project(':app').android.defaultConfig.applicationId
        }
		
#to
else if (findProject('..:app') != null) {
            applicationId = project('...:app').android.defaultConfig.applicationId
        }
```


## Another issu