import { useState } from 'react';
import * as React from 'react';
import { ScrollView, Alert, StyleSheet } from 'react-native';
import { Button, Text, TextInput, Dialog, Portal, Provider, DefaultTheme } from 'react-native-paper';
import { List } from 'react-native-paper';

const ViaCep = () => {
    let [cep, setCep] = useState("");
    let [dados, setDados] = useState("");
    const [expanded, setExpanded] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [email, setEmail] = useState("");
    const [visibleDialog, setVisibleDialog] = useState(false);

    const handlePress = () => setExpanded(!expanded);
    
    const handleItemPress = (value) => {
        setSelectedValue(value);
        setExpanded(false);
    };

    const clearForm = () => {
        setCep('');
        setDados('');
        setSelectedValue(null);
        setEmail('');
    };

    const isValidEmail = (email) => {
        return email.includes("@");
    };

    const BuscaCep = (cep) => {
        let url = `https://viacep.com.br/ws/${cep}/json/`;
        fetch(url)
            .then((resp) => resp.json())
            .then((dados) => {
                if (dados.erro) {
                    Alert.alert('Erro', 'CEP não encontrado!');
                } else {
                    console.log(dados);
                    setDados(dados);
                    setSelectedValue(dados.uf);
                }
            })
            .catch((error) => {
                console.log("Erro:", error);
                Alert.alert('Erro', 'Erro ao buscar o CEP');
            });
    };

    const handleLogin = () => {
        if (!isValidEmail(email)) {
            Alert.alert('Erro', 'Por favor, insira um e-mail válido');
        } else {
            Alert.alert('Login', 'Login realizado com sucesso!');
        }
    };

    const handleRegister = () => {
        setVisibleDialog(true);
    };

    return (
        <Provider>
            <ScrollView contentContainerStyle={styles.container}>
                <Text variant='displaySmall' style={styles.title}>Login</Text>
                <TextInput
                    label='Nome'
                    mode='outlined'
                    style={styles.input}
                />
                <TextInput
                    label='Email'
                    mode='outlined'
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    style={styles.input}
                    keyboardType="email-address"
                />
                <Button mode="contained" onPress={handleLogin} style={styles.button}>Login</Button>

                <Text variant='displaySmall' style={[styles.title, { marginTop: 20 }]}>Via CEP Rest</Text>
                <TextInput
                    label='CEP'
                    onChangeText={(value) => { setCep(value) }}
                    onBlur={() => { BuscaCep(cep) }}
                    keyboardType='numeric'
                    mode='outlined'
                    style={styles.input}
                />
                <TextInput
                    label='Rua'
                    value={dados.logradouro == null ? "": dados.logradouro}
                    onChangeText={(value) => {setCep(dados.bairro = value)}}
                    mode='outlined'
                    style={styles.input}
                />
                <TextInput
                    label='Bairro'
                    value={dados.bairro == null ? "": dados.bairro}
                    onChangeText={(value) => { setDados({ ...dados, bairro: value }) }}
                    mode='outlined'
                    style={styles.input}
                />
                <TextInput
                    label='Número'
                    value={dados.unidade  == null ? "": dados.unidade}
                    onChangeText={(value) => { setDados({ ...dados, unidade: value }) }}
                    mode='outlined'
                    style={styles.input}
                />
                <TextInput
                    label='Complemento'
                    value={dados.complemento  == null ? "": dados.complemento}
                    onChangeText={(value) => { setDados({ ...dados, complemento: value }) }}
                    mode='outlined'
                    style={styles.input}
                />
                <TextInput
                    label='Cidade'
                    value={dados.localidade  == null ? "": dados.localidade}
                    onChangeText={(value) => { setDados({ ...dados, localidade: value }) }}
                    mode='outlined'
                    style={styles.input}
                />

                <List.Section title="Estados" style={styles.listSection}>
                    <List.Accordion
                        title={selectedValue == null ? 'Selecione o Estado' : selectedValue}
                        expanded={expanded}
                        onPress={handlePress}
                        style={styles.accordion}>
                        {['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'].map(state => (
                            <List.Item key={state} title={state} onPress={() => { handleItemPress(state) }} />
                        ))}
                    </List.Accordion>
                </List.Section>

                <Button icon="database-check" mode="contained" onPress={handleRegister} style={[styles.button, { marginBottom: 20 }]}>Cadastrar</Button>
            </ScrollView>

            {/* Dialog de Cadastro */}
            <Portal>
                <Dialog visible={visibleDialog} onDismiss={() => setVisibleDialog(false)}>
                    <Dialog.Title>Cadastro</Dialog.Title>
                    <Dialog.Content>
                        <Text>Cadastro realizado com sucesso!</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => { clearForm(); setVisibleDialog(false); }}>Fechar</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f8f8f8',
        flexGrow: 1,
    },
    title: {
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    input: {
        marginBottom: 15,
    },
    button: {
        marginBottom: 10,
    },
    listSection: {
        marginBottom: 20,
    },
    accordion: {
        backgroundColor: '#ffffff',
    },
});

export default ViaCep;
