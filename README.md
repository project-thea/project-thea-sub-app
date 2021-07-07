Solution to issue with  @mauron85/react-native-background-geolocation!
https://github.com/mauron85/react-native-background-geolocation/issues/468


# Notes during development 
1. We use the @mauron85/react-native-background-geolocation for tracking and as of the current 
release there is bug when using Android Sdk 29. The solution until this is fixed (or we submit patch).
This bug results in error below:
```
1: Task failed with an exception.
-----------
* Where:
Script 'C:\Users\Emmanuel\Documents\THEA\code\ProjectTheaSubApp\node_modules\@mauron85\react-native-background-geolocation\android\common\VERSIONS.gradle' line: 27
```

The solution is is to  remove the "else if" block on lines 26 to 28 or replace lines 26 and 27 of @mauron85\react-native-background-geolocation\android\common\VERSIONS.gradle

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