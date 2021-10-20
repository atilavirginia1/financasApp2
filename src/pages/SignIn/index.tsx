import React, {useState, useContext} from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, Platform, ActivityIndicator } from 'react-native';
import { Background, Container, Logo, AreaInput, Input, SubmitButton,
         SubmitText, Links, LinkText } from './style';
import { AuthContext } from "../../contexts/auth";

export default function SignIn(){
    const [email, setEmail]= useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const { signIn, loadingAuth } = useContext(AuthContext);

    function handleLogin(){
        signIn(email, password);
    }
    return (
        <Background>
            <Container
                behavior={ Platform.OS === 'ios' ? 'padding' : '' }
                enabled
            >
                <Logo source={require('../../assets/Logo.png')} />
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
                <SubmitButton onPress={handleLogin}>
                    {
                        loadingAuth ? (
                            <ActivityIndicator size={20} color='#fff' />
                        ) : (
                            <SubmitText>Acessar</SubmitText>
                        )
                    }
                    
                </SubmitButton>

                <Links onPress={() => navigation.navigate('Sign Up')}>
                    <LinkText>Criar uma conta</LinkText>
                </Links>
            </Container>
        </Background>
    )
}