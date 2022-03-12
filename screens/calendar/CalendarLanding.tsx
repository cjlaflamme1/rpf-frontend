import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Button, Text } from 'react-native-elements';

interface Props {
  navigation: any;
};

const CalendarLanding: React.FC<Props> = ({ navigation }) => {

  return (
    <View>
      <ScrollView>
        <Calendar
          style={[styles.calendar]}
        />
        <View style={[styles.buttonContainer]}>
          <Button
            title="General Availability"
            buttonStyle={[styles.buttonStyle]}
            onPress={() => navigation.navigate('General Availability')}
          />
          <Button
            title="Schedule Request"
            buttonStyle={[styles.buttonStyle]}
            onPress={() => navigation.navigate('Schedule Request')}
          />
          <Button
            title="Browse Requests"
            buttonStyle={[styles.buttonStyle]}
            onPress={() => navigation.navigate('Browse Requests')}
          />
        </View>
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  calendar: {
    minWidth: '95%',
    marginTop: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    marginTop: 40,
    minWidth: '50%',
  }
})

export default CalendarLanding;