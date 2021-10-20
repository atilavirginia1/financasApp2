import React, {useContext, useState, useEffect} from "react";
import { View, Text, Button, Alert, TouchableOpacity, Platform } from 'react-native';
import { AuthContext } from "../../contexts/auth";
import { Background, Container, Nome, Saldo, Title, List, Area } from './style';
import Header from "../../components/Header";
import HistoricoList from "../../components/HistoricoList";
import firebase from '../../services/firebaseConnection';
import { format, isPast } from "date-fns";
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from "../../components/DatePicker";

export default function Home(){
    const [historico, setHistorico] = useState([]);
    const[saldo, setSaldo] = useState(0);

    const {user} = useContext(AuthContext);
    const uid = user && user.uid;
    const [newDate, setNewDate] = useState(new Date());
    const[show, setShow] = useState(false);

    useEffect(() =>{
    
        async function loadList(){
            await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
                setSaldo(snapshot.val().saldo);
            });

            await firebase.database().ref('historico')
            .child(uid)
            .orderByChild('date').equalTo(format(newDate, 'dd/MM/yyyy'))
            .limitToLast(10).on('value', (snapshot) =>{
                setHistorico([]);
                snapshot.forEach((childItem) => {
                    let list = {
                        key: childItem.key,
                        tipo: childItem.val().tipo,
                        valor: childItem.val().valor,
                        date: childItem.val().date
                    };
                    
                    setHistorico(oldArray => [...oldArray, list].reverse());
                });

            })
        }
        loadList();
    },[newDate])

    function handleDelete(data){
        if (isPast(new Date(data.date))){
            alert('Você não pode excluir um registro antigo!');
            return;
        }

        Alert.alert(
            'Atenção',
            `Você deseja excluir ${data.tipo} - Valor: ${data.valor}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Continuar',
                    onPress: () => handleDeleteSuccess(data)
                }
            ]

        )
    }

    async function handleDeleteSuccess(data){
        await firebase.database().ref('historico')
        .child(uid).child(data.key).remove()
        .then( async () => {
            let saldoAtual = saldo;
            data.tipo === 'despesa' ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor);

            await firebase.database().ref('users').child(uid).child('saldo').set(saldoAtual)
        })
        .catch((error) => {
            alert("Ocorreu um erro!")
        })
    }

    function handleShowPicker(){
        setShow(true);
    }

    function handleClose(){

    }

    const onChange = (date) => {
        setShow(Platform.OS === 'ios');
        setNewDate(date);
    }

    return (
        <Background>
            <Header />
            <Container>
                <Nome>{user && user.nome}</Nome>
                <Saldo>R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>
            </Container>
            
            <Area>
                <TouchableOpacity onPress={handleShowPicker}>
                    <Icon name='event' color='#fff' size={30} />
                </TouchableOpacity>
                <Title>Últimas movimentações</Title>
            </Area>
            

            <List 
                showsVerticalScrollIndicator={false}
                data={historico}
                keyExtractor={item => item.key}
                renderItem={({item}) => ( <HistoricoList data={item} deleteItem={handleDelete} /> ) }
            />
            {
                show && (
                    <DatePicker 
                        onClose={handleClose}
                        date={newDate}
                        onChange={onChange}
                    />
                )
            }
        </Background>
    )
}