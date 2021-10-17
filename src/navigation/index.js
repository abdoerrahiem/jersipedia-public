import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {
  Home,
  // Splash,
  ListJersey,
  Profile,
  JerseyDetails,
  Cart,
  Checkout,
  EditProfile,
  ChangePassword,
  History,
  Login,
  Register,
  RegisterContinue,
  Midtrans,
} from '../screens'
import {BottomNavigator, DefaultHeader} from '../components'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function Main() {
  return (
    <Tab.Navigator
      tabBar={props => <BottomNavigator {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="ListJersey"
        component={ListJersey}
        options={{
          title: 'Jersey',
        }}
      />
      <Tab.Screen name="Profile" component={Profile} />
      {/* <Tab.Screen name="Notifications" component={Notifications} /> */}
    </Tab.Navigator>
  )
}

export default function Navigation() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="Splash" component={Splash} /> */}
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="JerseyDetails" component={JerseyDetails} />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: true,
          headerTitle: () => <DefaultHeader title="My Cart" />,
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{
          headerShown: true,
          headerTitle: () => <DefaultHeader title="Checkout" />,
        }}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="RegisterContinue" component={RegisterContinue} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: true,
          headerTitle: () => <DefaultHeader title="Edit Profile" />,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: true,
          headerTitle: () => <DefaultHeader title="Change Password" />,
        }}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{
          headerShown: true,
          headerTitle: () => <DefaultHeader title="My Cart History" />,
        }}
      />
      <Stack.Screen
        name="Midtrans"
        component={Midtrans}
        options={{
          headerShown: true,
          headerTitle: () => <DefaultHeader title="Continue Payment" />,
        }}
      />
    </Stack.Navigator>
  )
}
