import React from 'react'
import { View, Button } from 'react-native'
import * as SQLite from 'expo-sqlite';

const Banco=()=>{
    let db
    async function CriaBanco() {
        db = await SQLite.openDatabaseAsync('PAM2');
        if(db){
            console.log('Banco Criado')
        }
        else{
            console.log('Erro ao Criar o Banco')
        }
    }

    async function CriaTabela() {
        try{
            await db.execAsync(`
                PRAGMA journal_mode = WAL;
                CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
            `);
            console.log('tabela criada')
        }catch(erro){
            console.log('erro ao criar tabela')
        }
    }


    return(
        <View>
            <Button
            title="Criar Banco"
            onPress={()=>{CriaBanco()}}/>
            <Button
            title="Criar Tabela"
            onPress={()=>{CriaTabela()}}/>
        </View>
    )
}

export default Banco