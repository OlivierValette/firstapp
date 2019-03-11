import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={ {...styles.container, ...styles.white} }>Bienvenue sur... First App</Text>
        <Text style={ {...styles.container, ...styles.white} }>Bienvenue sur... First App</Text>
        <Text style={ {...styles.container, ...styles.white} }>Bienvenue sur... First App</Text>
        <Text style={ {...styles.container, ...styles.white} }>Bienvenue sur... First App</Text>
        <Text style={ {...styles.container, ...styles.white} }>Bienvenue sur... First App</Text>
        <Text style={ {...styles.container, ...styles.white} }>Bienvenue sur... First App</Text>
        <Text style={ {...styles.container, ...styles.white} }>Bienvenue sur... First App</Text>
        <Text style={ {...styles.container, ...styles.white} }>Bienvenue sur... First App</Text>
        <Text style={ {...styles.container, ...styles.white} }>Bienvenue sur... First App</Text>
        <Text style={ {...styles.container, ...styles.white} }>Bienvenue sur... First App</Text>
        <Text style={ {...styles.container, ...styles.white} }>Bienvenue sur... First App</Text>
        <Text style={ {...styles.container, ...styles.white} }>Bienvenue sur... First App</Text>
        <Text style={ {...styles.container, ...styles.white} }>Bienvenue sur... First App</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007e59',
    padding: 10
  },
  white: {
    color: 'white',
    fontSize: 36,
    textAlign: 'center'
  },
});
