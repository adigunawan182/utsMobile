import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import SignInScreen from './src/SignIn'
import SignUpScreen from './src/SignUp'
import PasswordForgetScreen from './src/PasswordForget'
import PasswordChangeScreen from './src/PasswordChange'
import HomeScreen from './src/Home'
import ProfileScreen from './src/Profile';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList,DrawerItem, } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons'

const Drawer = createDrawerNavigator();
 
const Tab = createBottomTabNavigator();
 
const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen}  options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={24} />
          ),
        }}/>
    </Tab.Navigator>
  );
};
 
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Log Out" onPress={props.onSignOut} />
    </DrawerContentScrollView>
  );
}

const HomeDrawer = ({onSignOut}) => {
  return (
    <Drawer.Navigator  drawerContent={props => <CustomDrawerContent {...props} onSignOut={onSignOut} />} >
      <Drawer.Screen name="Home" component={HomeTabs} />
      <Drawer.Screen
        name="Change Password"
        component={PasswordChangeScreen}
      />
      
      
    </Drawer.Navigator>
  );
};

const RootStack = createStackNavigator();
 
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const Hshown = 
  isAuthenticated ? ( false ) : ( true );

  const handleSignIn = () => {
 
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
 
    setIsAuthenticated(false);
  };

  const handleSignUp = () => {
 
    setIsAuthenticated(true);
  };

  return (
    <NavigationContainer>
    <RootStack.Navigator
      screenOptions={{
        headerShown: Hshown
      }}
    >
      {isAuthenticated ? (
       <RootStack.Screen name="Home">
       {(props) => (
         <HomeDrawer {...props} onSignOut={handleSignOut} />
       )}
     </RootStack.Screen>
      ) : (
        <>
          <RootStack.Screen name="Sign In">
            {(props) => (
              <SignInScreen {...props} onSignIn={handleSignIn} />
            )}
          </RootStack.Screen>
          <RootStack.Screen name="Sign Up">
            {(props) => (
              <SignUpScreen {...props} onSignUp={handleSignUp} />
            )}
          </RootStack.Screen>
          <RootStack.Screen name="Password Forget">
              
            {(props) => (
              <PasswordForgetScreen {...props} onSignIn={handleSignIn}/>
            )}
          </RootStack.Screen>
        </>
      )}
    </RootStack.Navigator>
  </NavigationContainer>
  );
};
 
export default App;
   