import { useState } from 'react'
import * as React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Button, Text, TextInput, Dialog, Portal, Provider, DefaultTheme } from 'react-native-paper'
import { List } from 'react-native-paper'

const ViaCep = () => {
    let [cep, setCep] = useState("")
    let [dados, setDados] = useState("")
    const [expanded, setExpanded] = useState(false)
    const [selectedValue, setSelectedValue] = useState(null)
    const [email, setEmail] = useState("")
    const [visibleLoginDialog, setVisibleLoginDialog] = useState(false)
    const [visibleRegisterDialog, setVisibleRegisterDialog] = useState(false) 
    const [visibleCepErrorDialog, setVisibleCepErrorDialog] = useState(false)
    const [emailError, setEmailError] = useState(false)

    const handlePress = () => setExpanded(!expanded)
    
    const handleItemPress = (value) => {
        setSelectedValue(value)
        setExpanded(false)
    }

    const clearForm = () => {
        setCep('')
        setDados('')
        setSelectedValue(null)
        setEmail('')
    }

    const BuscaCep = (cep) => {
        let url = `https://viacep.com.br/ws/${cep}/json/`
        fetch(url)
            .then((resp) => resp.json())
            .then((dados) => {
                setDados(dados)
                setSelectedValue(dados.uf)
            })
            .catch((error) => {
                setVisibleCepErrorDialog(true)
            })
    }

    const handleEmailChange = (text) => {
        setEmail(text)
        if (emailError) {
            setEmailError(false)
        }
    }

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        return regex.test(email)
    }

    const handleLogin = () => {
        if (!validateEmail(email)) {
            setEmailError(true)
            setVisibleLoginDialog(true)
        } else {
            setEmailError(false)
            setVisibleLoginDialog(true)
        }
    }

    const handleRegister = () => setVisibleRegisterDialog(true)

    const isCepValid = (cep) => {
        const regex = /^[0-9]{5}-?[0-9]{3}$/
        return regex.test(cep)
    }

    const isFormValid = () => {
        return isCepValid(cep) && dados.logradouro && dados.bairro && dados.localidade
    }

    return (
        <Provider theme={theme}>
            <ScrollView style={styles.container}>
                <Text variant='displaySmall' style={styles.title}>Login</Text>
                <TextInput
                    label='Nome'
                    mode='outlined'
                    style={styles.input}
                    left={<TextInput.Icon icon="account" />}
                />
                <TextInput
                    label='Email'
                    mode='outlined'
                    value={email}
                    onChangeText={handleEmailChange}
                    style={styles.input}
                    keyboardType="email-address"
                    left={<TextInput.Icon icon="email" />}
                    error={emailError}
                />
                {emailError && <Text style={styles.errorText}>Por favor, insira um e-mail válido!</Text>}
                <Button mode="contained" onPress={handleLogin} style={styles.button}>
                    Login
                </Button>

                <Text variant='displaySmall' style={[styles.title, { marginTop: 20 }]}>Via CEP Rest</Text>
                <TextInput
                    label='CEP'
                    left={<TextInput.Icon icon="map-marker" />}
                    onChangeText={(value) => { setCep(value) }}
                    onBlur={() => { BuscaCep(cep) }}
                    keyboardType='numeric'
                    mode='outlined'
                    style={styles.input}
                />
                <TextInput
                    label='Rua'
                    left={<TextInput.Icon icon="road" />}
                    value={dados.logradouro == null ? "" : dados.logradouro}
                    onChangeText={(value) => { setDados({ ...dados, logradouro: value }) }}
                    mode='outlined'
                    style={styles.input}
                />
                <TextInput
                    label='Bairro'
                    left={<TextInput.Icon icon="city" />}
                    value={dados.bairro == null ? "" : dados.bairro}
                    onChangeText={(value) => { setDados({ ...dados, bairro: value }) }}
                    mode='outlined'
                    style={styles.input}
                />
                <TextInput
                    label='Número'
                    left={<TextInput.Icon icon="numeric" />}
                    value={dados.unidade == null ? "" : dados.unidade}
                    onChangeText={(value) => { setDados({ ...dados, unidade: value }) }}
                    mode='outlined'
                    style={styles.input}
                />
                <TextInput
                    label='Complemento'
                    left={<TextInput.Icon icon="home-plus" />}
                    value={dados.complemento == null ? "" : dados.complemento}
                    onChangeText={(value) => { setDados({ ...dados, complemento: value }) }}
                    mode='outlined'
                    style={styles.input}
                />
                <TextInput
                    label='Cidade'
                    left={<TextInput.Icon icon="home-city" />}
                    value={dados.localidade == null ? "" : dados.localidade}
                    onChangeText={(value) => { setDados({ ...dados, localidade: value }) }}
                    mode='outlined'
                    style={styles.input}
                />

                <List.Section title="Estados" style={styles.listSection}>
                    <List.Accordion
                        title={selectedValue == null ? 'Selecione o Estado' : selectedValue}
                        left={props => <List.Icon icon="map-legend" />}
                        expanded={expanded}
                        onPress={handlePress}
                        style={styles.accordion}
                    >
                        {['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'].map(state => (
                            <List.Item key={state} title={state} onPress={() => { handleItemPress(state) }} />
                        ))}
                    </List.Accordion>
                </List.Section>

                <Button 
                    icon="database-check" 
                    mode="contained" 
                    onPress={handleRegister} 
                    style={[styles.button, { marginBottom: 20 }]} 
                    disabled={!isFormValid()}
                >
                    Cadastrar
                </Button>
            </ScrollView>

            <Portal>
                <Dialog 
                    visible={visibleLoginDialog} 
                    onDismiss={() => setVisibleLoginDialog(false)}
                    style={styles.dialog}
                >
                    <Dialog.Title style={styles.dialogTitle}>Login</Dialog.Title>
                    <Dialog.Content>
                        {emailError ? (
                            <Text style={styles.dialogContent}>Por favor, insira um e-mail válido!</Text>
                        ) : (
                            <Text style={styles.dialogContent}>Login realizado com sucesso!</Text>
                        )}
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button 
                            color="#e74c3c" 
                            labelStyle={{ fontWeight: '600' }}
                            onPress={() => { clearForm(); setVisibleLoginDialog(false); setEmailError(false) }}
                        >
                            Fechar
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            
            <Portal>
                <Dialog visible={visibleRegisterDialog} onDismiss={() => setVisibleLoginDialog(false)}>
                    <Dialog.Title>Cadastro</Dialog.Title>
                    <Dialog.Content>
                        <Text>Cadastro realizado com sucesso!</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => { clearForm(); setVisibleRegisterDialog(false) }}>Fechar</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <Portal>
                <Dialog visible={visibleCepErrorDialog} onDismiss={() => setVisibleCepErrorDialog(false)}>
                    <Dialog.Title>CEP não encontrado</Dialog.Title>
                    <Dialog.Content>
                        <Text>O CEP digitado não foi encontrado. Por favor, verifique e tente novamente.</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setVisibleCepErrorDialog(false)}>Fechar</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </Provider>
    )
}

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#3498db',
        accent: '#f1c40f',
        background: '#f0f4f7',
        surface: 'white',
        text: '#2c3e50',
        placeholder: '#95a5a6',
    },
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f0f4f7',
        flexGrow: 1,
    },
    title: {
        textAlign: 'center',
        marginBottom: 20,
        color: '#2c3e50',
        fontWeight: '700',
        letterSpacing: 1,
        textShadowColor: 'rgba(0,0,0,0.1)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2,
    },
    input: {
        marginBottom: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    button: {
        marginBottom: 15,
        borderRadius: 8,
        paddingVertical: 5,
        backgroundColor: '#3498db',
        shadowColor: '#2980b9',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    listSection: {
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    accordion: {
        backgroundColor: 'white',
    },
    dialog: {
        borderRadius: 15,
        backgroundColor: '#f8f9fa',
    },
    dialogTitle: {
        color: '#3498db',
        fontWeight: '700',
    },
    dialogContent: {
        lineHeight: 24,
        color: '#2c3e50',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
})

export default ViaCep
