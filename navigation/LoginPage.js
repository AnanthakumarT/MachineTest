import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,TouchableOpacity,
  Alert, AsyncStorage, ActivityIndicator
} from 'react-native';

var correct = false
var button = false
var phonenoalert = false
'use strict';
import { Overlay } from 'react-native-elements'
import {Container,Content,Footer,Button,Form, Item, Input, Label} from 'native-base'
    


export default class LoginPage extends Component {

  constructor() {
    super();
    this.state = {
     email:'',
      password: '', 
      validcredentials:[
        {
          email:'ashwinashes@gmail.com',
          password:'4'
        },
        {
          email:'ananthakumar@gmail.com',
          password:'1'
        },
      ],
      isVisible:[]

    }
  }
  async componentDidMount(){
    let user =await AsyncStorage.getItem('Loggedin')
    console.warn(user)
    if(user =='true'){
        this.props.navigation.navigate('HomeScreen')

    }
    else 
    {
        return
    }

  }
  handleSubmit = async (e)=>{
    for(let i=0;i<this.state.validcredentials.length;i++){
      if(this.state.email == this.state.validcredentials[i].email){
        if(this.state.password == this.state.validcredentials[i].password){
          this.state.isVisible[i]=true
        }
        else{
      this.state.isVisible[i]=false
        }
      }
      else{

      this.state.isVisible[i]=false

      }
    }
    if(this.state.isVisible.indexOf(true) == -1){
    alert('Please check your email and passsword')
    }
    else{
     alert('Login Success')
     await AsyncStorage.setItem('Loggedin','true')
     

     this.props.navigation.navigate('HomeScreen')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          {/* <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/> */}
          <TextInput style={styles.inputs}
            placeholder="Email"
            underlineColorAndroid='transparent'
            onChangeText={(email) => this.setState({ email })}
          />


        </View>
      
        {/* <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/> */}

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({ password })} />
        </View>




       
        {
          this.state.buttoncheck ? <ActivityIndicator /> : <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} 
          onPress={()=>this.handleSubmit()}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableHighlight>

        }



        <TouchableHighlight 
          style={styles.buttonContainer} >
          <Text>Forgot your password?</Text>
        </TouchableHighlight>



   
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "steelblue",
  },
  loginText: {
    color: 'white',
  }
});
LoginPage.navigationOptions = {
  header: null,
};

