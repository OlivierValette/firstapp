import React from 'react';
import { Font } from 'expo';
import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Text,
  Form,
  Item,
  Icon,
  Input,
  Picker,
  Button,
  Spinner
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    const dim = Dimensions.get('screen');
    const orientation = dim.height > dim.width ? 'portrait' : 'landscape';
    this.state = { amount: 1, currencies: [], from: 'EUR', to: 'USD', result: null, loading: false, orientation: orientation };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    const response = await fetch('https://api.exchangeratesapi.io/latest');
    const data = await response.json();
    let currencies = Object.keys(data.rates);
    currencies.push(data.base);
    this.setState({ currencies: currencies });
    Dimensions.addEventListener('change', dim => {
      this.setState({ orientation: dim.screen.height > dim.screen.width ? 'portrait' : 'landscape' });
    })
  }

  convert(event) {
    this.setState({ loading: true });
    fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.from}&symbols=${this.state.to}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ result: data.rates[this.state.to] * this.state.amount, loading: false })
      });
  }

  render() {

    if(this.state.currencies.length === 0) {
      return <Spinner/>
    }

    const currencyItem = this.state.currencies.map(currency => <Picker.Item key={currency} label={currency} value={currency}/>);

    let result = null;
    if (this.state.loading) {
      result = <Spinner/>
    } else if (this.state.result) {
      result = <Text>{this.state.result}</Text>;
    }

    return (
      <Container style={{ paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight }}>
        <Header>
          <Body style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Title>Convertisseur monétaire</Title>
          </Body>
        </Header>
        <Content>
          <Form style={{ flexDirection: this.state.orientation === 'portrait' ? 'column' : 'row' }}>
            <Item style={{ flex: 1 }}>
              <Icon name='money' type='FontAwesome'/>
              <Input
                keyboardType='numeric'
                minLength={1}
                value={this.state.amount.toString()}
                onChangeText={text => this.setState({ amount: text })}
                style={{ flex: 1 }}
              />
            </Item>
            <Item picker style={{ flex: 1 }}>
              <Picker
                mode='dropdown'
                selectedValue={this.state.from}
                onValueChange={value => this.setState({ from: value })}
              >
                {currencyItem}
              </Picker>
            </Item>
            <Item picker style={{ flex: 1 }}>
              <Picker
                mode='dropdown'
                selectedValue={this.state.to}
                onValueChange={value => this.setState({ to: value })}
              >
                {currencyItem}
              </Picker>
            </Item>
            <Button block iconLeft onPress={event => this.convert(event)}>
              <Icon name='calculator' ios='ios-calculator' android='md-calculator' />
              <Text>Convertir</Text>
            </Button>
          </Form>
          {result}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  blue: {
    color: 'blue',
  },
  big: {
    fontSize: 40
  }
});
