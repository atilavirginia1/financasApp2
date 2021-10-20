import React, { useState, useContext } from "react";
import { View, Text, Platform, ActivityIndicator } from 'react-native';
import {
    Background, Container, Logo, AreaInput, Input, SubmitButton,
    SubmitText, Links, LinkText
} from '../SignIn/style';
import { AuthContext } from "../../contexts/auth";

export default function SignIn() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signUp, loadingAuth } = useContext(AuthContext);

    function handleSignUp() {
        signUp(email, password, nome);
    }
    return (
        <Background>
            <Container
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                enabled
            >

                <AreaInput>
                    <Input
                        placeholder="Nome"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={nome}
                        onChangeText={(text) => setNome(text)}
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder="Email"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder="Password"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </AreaInput>
                <SubmitButton onPress={handleSignUp}>
                    {
                        loadingAuth ? (
                            <ActivityIndicator size={20} color='#fff' />
                        ) : (
                            <SubmitText>Cadastrar</SubmitText>
                        )
                    }
                </SubmitButton>

            </Container>
        </Background>
    )
}