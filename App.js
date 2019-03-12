import React from 'react';
import { View } from 'react-native';
import { Container, Header, Content, Spinner, Form, Item, Picker, Input, Card, CardItem, Label, Text } from 'native-base';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: 1,
            convertedAmount: 1,
            currencies: [],
            rates: [],
            from: 'EUR',
            to: 'USD',
            notReady: true,
        };
    }

    componentDidMount() {
        fetch('https://api.exchangeratesapi.io/latest')
            .then(response => response.json())
            .then(data => {
                let currencies = Object.keys(data.rates);
                currencies.push(data.base);
                this.setState({ currencies: Object.keys(data.rates) });
                this.setState({ rates: data.rates });
                // adding EUR
                this.state.currencies.push('EUR');
                this.state.rates['EUR'] = 1.0000;
            })
            .then(() => this.setState({notReady: false}));
    }

    render() {

        if (this.state.notReady) {
            return (
                <Container>
                    <Header />
                    <Content>
                        <Spinner color='#007e59' />
                    </Content>
                </Container>
            );
        }

        const currencyItem = this.state.currencies.map(currency => <Picker.Item key={currency} label={currency} value={currency}/>);

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 2, flexDirection: 'row' }}>
                    <View style={{ flex: 1, backgroundColor: 'yellow' }}/>
                    <View style={{ flex: 2 ,backgroundColor: 'orange' }}/>
                    <View style={{ flex: 3, backgroundColor: '#007e59' }}/>
                </View>
                <View style={{ flex: 1, backgroundColor: '#000'}}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 36 }}>Conversion de devises</Text>
                </View>
                <Form style={{ flex: 2, flexDirection: 'row', backgroundColor: '#fff', padding: 15 }}>
                    <Item stackedLabel style={{ flex: 2, padding: 8 }}>
                        <Label>Montant à convertir</Label>
                        <Input
                            keyboardType='numeric'
                            minLenght={1}
                            value={this.state.amount.toString()}
                            onChangeText={text => this.setState({amount: text})}
                            style={{ fontSize: 18, fontWeight: 'bold' }}
                        />
                    </Item>
                    <Item picker style={{ flex: 1 }}>
                        <Picker
                            mode="dropdown"
                            style={{ width: undefined }}
                            selectedValue={this.state.from}
                            onValueChange={value => this.setState({from: value})}
                        >
                            {currencyItem}
                        </Picker>
                    </Item>
                </Form>
                <View style={{ flex: 2, flexDirection: 'row', backgroundColor: '#fff', padding: 15 }}>
                    <View style={{ flex: 2, padding: 15 }}>
                        <Card>
                            <CardItem header bordered>
                                <Text style={{ color: '#007e59', fontSize: 18, fontWeight: 'bold' }}>
                                    {this.state.amount * this.state.rates[this.state.to] / this.state.rates[this.state.from]}
                                </Text>
                            </CardItem>
                        </Card>
                    </View>
                    <Form style={{ flex: 1 }}>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                style={{ width: undefined }}
                                selectedValue={this.state.to}
                                onValueChange={value => this.setState({to: value})}
                            >
                                {currencyItem}
                            </Picker>
                        </Item>
                    </Form>
                </View>
                <View style={{ flex: 2, flexDirection: 'row' }}>
                    <View style={{ flex: 1, backgroundColor: 'yellow' }}/>
                    <View style={{ flex: 2 ,backgroundColor: 'orange' }}/>
                    <View style={{ flex: 3, backgroundColor: '#007e59' }}/>
                </View>
            </View>
        );
    }
}
