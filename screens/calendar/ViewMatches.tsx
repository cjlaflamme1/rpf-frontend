import React from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Button, Card, Text } from 'react-native-elements';
import { dateOnly, timeOnly } from '../../helpers/timeAndDate';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface Props { };

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

  const { matches } = selectedScheduledAvailability;

  return (
    <View style={[styles.pageContainer]}>
      <ScrollView>
        <View style={[styles.sectionContainer]}>
          <Text h3>{dateOnly(selectedScheduledAvailability.startDateTime)}</Text>
        </View>
        <View style={[styles.sectionContainer]}>
          <Text h4>Scheduled Matches:</Text>
        </View>
        <View style={[styles.sectionContainer]}>
          {
            matches
              .slice()
              .map((match, index) => (
                <Card containerStyle={[styles.cardContainer]} key={`${match.id}-${index}`}>
                  <Card.Title>
                    {`${match.initialUser.firstName} ${match.initialUser.lastName}`}
                  </Card.Title>
                  <Card.Divider />
                  <View style={[styles.cardContentContainer]}>
                    <View>
                      <Text style={[styles.cardSection]}>
                        {`Start time: ${timeOnly(match.startDateTime)}`}
                      </Text>
                      <Text style={[styles.cardSection]}>
                        {`End Time: ${timeOnly(match.endDateTime)}`}
                      </Text>
                      <View>
                        <Text style={[styles.cardSection]}>
                          Areas:
                        </Text>
                        {
                          match.areas.map((area, index) => (
                            <Text style={[styles.areaItem]} key={`${area}-${index}`}>{area}</Text>
                          ))
                        }
                      </View>
                    </View>
                    <View>
                      <Text style={[styles.cardSection]}>Icon</Text>
                      <Text style={[styles.cardSection]}>{`${match.initialUser.firstName} ${match.initialUser.lastName}`}</Text>
                      <Text style={[styles.cardSection]}>Link to Profile info</Text>
                      <Text style={[styles.cardSection]}>Link to Climbing info</Text>
                    </View>
                  </View>
                  <View style={[styles.sectionContainer]}>
                    <Button
                      containerStyle={[styles.cardButton]}
                      title={'Submit request'}
                    />
                  </View>
                </Card>
              ))
          }
        </View>
        <View style={[styles.sectionContainer]}>
          <Text h4>General Availability Matches:</Text>
        </View>
        <View style={[styles.sectionContainer]}>
          <View>
            <Text>
              First match here
            </Text>
          </View>
          <View>
            <Text>
              Second match here
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  pageContainer: {
    marginTop: 10,
  },
  sectionContainer: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    minWidth: '95%',
    maxWidth: '95%'
  },
  cardContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardButton: {
    width: '100%',
    marginTop: 5,
  },
  cardSection: {
    marginTop: 3,
  },
  areaItem: {
    marginLeft: 5,
  }
})

export default ViewMatches;