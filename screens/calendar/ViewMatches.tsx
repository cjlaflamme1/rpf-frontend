import React from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface Props {};

const ViewMatches: React.FC<Props> = () => {
  const currentState = useAppSelector((state) => ({
    climbAvailabilityScheduledState: state.climbAvailabilityScheduledState,
  }));
  const dispatch = useAppDispatch();
  
  const { selectedScheduledAvailability } = currentState.climbAvailabilityScheduledState;
  if (
    !selectedScheduledAvailability
    || !selectedScheduledAvailability.matches
    || selectedScheduledAvailability.matches.length <= 0
  ) {
    return (
      <View>
        <Text>No Matches Found</Text>
      </View>
    );
  }

  return (
    <View>
      <ScrollView>
        <View style={[styles.buttonContainer]}>
          <Text>View Matches</Text>
        </View>
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButton: {
    marginTop: 40,
    minWidth: '50%',
  }
})

export default ViewMatches;