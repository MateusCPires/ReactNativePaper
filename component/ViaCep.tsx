import {useState} from 'react';
import  * as React from 'react';
import { ScrollView } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { List } from 'react-native-paper';

const ViaCep=()=>{
    let [cep, setCep] = useState("")
    let [dados, setDados] = useState("")

    const [expanded, setExpanded] = useState(false);
    const handlePress = () => setExpanded(!expanded);
    const [selectedValue, setSelectedValue] = useState(null)

    const handleItemPress = (value)=>{
        setSelectedValue(value)
        setExpanded(false)
    }

    const BuscaCep=(cep)=>{
        let url = `https://viacep.com.br/ws/${cep}/json/`
        fetch(url)
        .then(
            (resp)=>{ return resp.json() }
        )
        .then(
            (dados)=>{
                console.log(dados)
                setDados(dados)
                setSelectedValue(dados.uf)
            }
        )
        .catch(
            (x)=>{console.log("Erro: " + x)}
        )
    }
    return(
        <ScrollView>
            <Text variant='displayLarge'>Via CEP Rest</Text>
            <TextInput
                label='CEP'
                onChangeText={(value) => {setCep(value)}}
                onBlur={() => {BuscaCep(cep)}}
                keyboardType='numeric'
                mode='outlined'
            />
            <TextInput
                label='Rua'
                value= {dados.logradouro}
                onChangeText={(value) => {setCep(dados.logradouro = value)}}
                mode='outlined'
            />
            <TextInput
                label='Bairro'
                value= {dados.bairro}
                onChangeText={(value) => {setCep(dados.bairro = value)}}
                mode='outlined'
            />
            <TextInput
                label='Numero'
                value= {dados.unidade}
                onChangeText={(value) => {setCep(dados.unidade = value)}}
                mode='outlined'
            />
            <TextInput
                label='Complemento'
                value= {dados.complemento}
                onChangeText={(value) => {setCep(dados.complemento = value)}}
                mode='outlined'
            />
            <TextInput
                label='Cidade'
                value= {dados.localidade}
                onChangeText={(value) => {setCep(dados.localidade = value)}}
                mode='outlined'
            />

            <List.Section title="Estados">
                <List.Accordion 
                    title={selectedValue == null ? 'Selecione o Estado' : selectedValue}
                    expanded={expanded}
                    onPress={handlePress}>
                    
                    <List.Item title="AC" onPress={() => { handleItemPress("AC") }} />
                    <List.Item title="AL" onPress={() => { handleItemPress("AL") }} />
                    <List.Item title="AM" onPress={() => { handleItemPress("AM") }} />
                    <List.Item title="AP" onPress={() => { handleItemPress("AP") }} />
                    <List.Item title="BA" onPress={() => { handleItemPress("BA") }} />
                    <List.Item title="CE" onPress={() => { handleItemPress("CE") }} />
                    <List.Item title="DF" onPress={() => { handleItemPress("DF") }} />
                    <List.Item title="ES" onPress={() => { handleItemPress("ES") }} />
                    <List.Item title="GO" onPress={() => { handleItemPress("GO") }} />
                    <List.Item title="MA" onPress={() => { handleItemPress("MA") }} />
                    <List.Item title="MG" onPress={() => { handleItemPress("MG") }} />
                    <List.Item title="MS" onPress={() => { handleItemPress("MS") }} />
                    <List.Item title="MT" onPress={() => { handleItemPress("MT") }} />
                    <List.Item title="PA" onPress={() => { handleItemPress("PA") }} />
                    <List.Item title="PB" onPress={() => { handleItemPress("PB") }} />
                    <List.Item title="PE" onPress={() => { handleItemPress("PE") }} />
                    <List.Item title="PI" onPress={() => { handleItemPress("PI") }} />
                    <List.Item title="PR" onPress={() => { handleItemPress("PR") }} />
                    <List.Item title="RJ" onPress={() => { handleItemPress("RJ") }} />
                    <List.Item title="RN" onPress={() => { handleItemPress("RN") }} />
                    <List.Item title="RO" onPress={() => { handleItemPress("RO") }} />
                    <List.Item title="RR" onPress={() => { handleItemPress("RR") }} />
                    <List.Item title="RS" onPress={() => { handleItemPress("RS") }} />
                    <List.Item title="SC" onPress={() => { handleItemPress("SC") }} />
                    <List.Item title="SE" onPress={() => { handleItemPress("SE") }} />
                    <List.Item title="SP" onPress={() => { handleItemPress("SP") }} />
                    <List.Item title="TO" onPress={() => { handleItemPress("TO") }} />
                </List.Accordion>
            </List.Section>
        </ScrollView>
    )
}

export default ViaCep;
