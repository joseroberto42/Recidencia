import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import AddMedicationScreen from '../screens/MedicationScreen';
import HealthRecordScreen from '../screens/HealthRecordScreen';
const Tab = createBottomTabNavigator();

const Layout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="Add Medication" component={AddMedicationScreen} />
        <Tab.Screen name="Health Records" component={HealthRecordScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Layout;
