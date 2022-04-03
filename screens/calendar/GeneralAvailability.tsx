import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import { View, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Button, ListItem, Text } from 'react-native-elements';

interface Props {};

const GeneralAvailability: React.FC<Props> = () => {
  const [expanded, setExpanded] = useState(false);
  const [expanded1, setExpanded1] = useState(false);

  return (
    <View>
      <ScrollView>
        <Calendar
          style={[styles.calendar]}
        />
        <View style={[styles.buttonContainer]}>
          <Button
              title="Add New Date"
              buttonStyle={[styles.buttonStyle]}
            />
        </View>
        <View style={[styles.accordionContainer]}>
          <ListItem.Accordion
            style={[styles.accordion]}
            isExpanded={expanded}
            onPress={() => setExpanded(!expanded)}
            content={
              <>
                <ListItem.Content style={[styles.accordion]}>
                  <ListItem.Title>
                    <Text>
                      Every Thursday
                    </Text>
                  </ListItem.Title>
                </ListItem.Content>
              </>
            }
          >
            <ListItem
              style={[styles.accordionItem]}
              containerStyle={[styles.accordionItem]}
            >
              <ListItem.Content>
                <View style={[styles.accordionCard]}>
                  <View>
                    <Text>
                      2pm-9pm
                    </Text>
                    <Text>
                      Rumney
                    </Text>
                  </View>
                  <View style={[styles.cardButtons]}>
                    <FontAwesome
                      style={[styles.cardIcon]}
                      name="edit"
                      size={24}
                      color="black"
                      onPress={() => console.log('clicky')}
                    />
                    <FontAwesome
                      style={[styles.cardIcon]}
                      name="trash-o"
                      size={24}
                      color="black"
                      onPress={() => console.log('clicky')}
                    />
                  </View>
                </View>
              </ListItem.Content>
            </ListItem>
          </ListItem.Accordion>
          <ListItem.Accordion
            style={[styles.accordion]}
            isExpanded={expanded1}
            onPress={() => setExpanded1(!expanded1)}
            content={
              <>
                <ListItem.Content style={[styles.accordion]}>
                  <ListItem.Title>
                    <Text>
                      Every Other Tuesday
                    </Text>
                  </ListItem.Title>
                </ListItem.Content>
              </>
            }
          >
            <ListItem
              style={[styles.accordionItem]}
              containerStyle={[styles.accordionItem]}
            >
              <ListItem.Content>
                <View style={[styles.accordionCard]}>
                  <View>
                    <Text>
                      2pm-9pm
                    </Text>
                    <Text>
                      Rumney
                    </Text>
                  </View>
                  <View style={[styles.cardButtons]}>
                    <FontAwesome
                      style={[styles.cardIcon]}
                      name="edit"
                      size={24}
                      color="black"
                      onPress={() => console.log('clicky')}
                    />
                    <FontAwesome
                      style={[styles.cardIcon]}
                      name="trash-o"
                      size={24}
                      color="black"
                      onPress={() => console.log('clicky')}
                    />
                  </View>
                </View>
              </ListItem.Content>
            </ListItem>
          </ListItem.Accordion>
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
  accordionContainer: {
    marginTop: 20,
  },
  buttonStyle: {
    marginTop: 20,
    minWidth: '50%',
  },
  accordion: {
    width: '100%',
  },
  accordionItem: {
    width: '100%',
  },
  accordionCard: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardButtons: {
    flexDirection: 'row',
  },
  cardIcon: {
    marginRight: 10,
  }
})

export default GeneralAvailability;