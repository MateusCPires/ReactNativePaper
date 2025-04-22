import React from 'react'
import { View, Button } from 'react-native'
import * as SQLite from 'expo-sqlite'

let db

const Banco=()=>{
    async function CriaBanco() {
        db = await SQLite.openDatabaseAsync('PAM2')
        if(db){
            console.log('Banco Criado')
            return db
        }
        else{
            console.log('Erro ao Criar o Banco')
        }
    }

    async function CriaTabela() {
        db = await CriaBanco()

        try{
            await db.execAsync(`
                PRAGMA journal_mode = WAL;
                CREATE TABLE IF NOT EXISTS TB_USUARIO (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nome TEXT NOT NULL
                    );
            `)
            console.log('tabela criada')
        }catch(erro){
            console.log('erro ao criar tabela')
        }
    }

    async function Inserir() {
        db = await CriaBanco()

        try{
            db.execAsync(`
                INSERT INTO TB_USUARIO (nome) VALUES ('Renan'),
                ('Mateus'),
                ('Zé Matraca');
                `);
            console.log('dado inserido')
        }catch(erro){
            console.log('Erro: ' + erro)
        }
    }

    async function Exibir() { 

        db = await CriaBanco()

        const allRows = await db.getAllAsync('SELECT * FROM TB_USUARIO');
        for (const row of allRows) {
            console.log(row.id, row.nome);
        }
    }

    async function Deletar() { 
        db = await CriaBanco()

        try{
            db.execAsync(`
                DELETE FROM TB_USUARIO WHERE value = $value', { $value: 'Renan' }
                `);
            console.log('dado deletado')
        }catch(erro){
            console.log('Erro: ' + erro)
        }

    }


    return(
        <View>
            <Button
            title="Criar Banco"
            onPress={CriaBanco}/>
            
            <Button
            title="Criar Tabela"
            onPress={CriaTabela}/>
            
            <Button
            title="Inserir"
            onPress={Inserir}/>

            <Button
            title="Exibir"
            onPress={Exibir}/>

            <Button
            title="Deletar"
            onPress={Deletar}/>
        </View>
    )
}

export default Banco