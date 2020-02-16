import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  AsyncStorage,
  
  TextInput,
  Keyboard,
  Platform,KeyboardAvoidingView
} from "react-native";
import { Container, Header, Content, Footer, FooterTab,  Icon,Input,Card,Left,Right,Body,Button} from 'native-base';
import {Divider} from 'react-native-elements'
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from 'moment'
import Constants from 'expo-constants';
import { Image } from 'react-native-elements';


export default class TodoList extends Component {
  

  constructor(){
    super()
this. state = {
    tasks: [],
    text: "",IconCheck:[],Date:"",search:""
  };
  }
 

  changeTextHandler = text => {
    this.setState({ text: text });
  };

  addTask = () => {
    let notEmpty = this.state.text.trim().length > 0;
let newDate =moment(new Date()).format('ll')
console.warn(newDate)
    if (notEmpty) {
      this.setState(
        prevState => {
          let { tasks, text ,Date} = prevState;
          return {
            tasks: tasks.concat({ key: this.state.tasks.length, text: text ,Date: newDate,}),
            text: ""
          };
        },
        () => {Tasks.save(this.state.tasks)
        console.warn(this.state.tasks)}
      );
    }
  };

  deleteTask = i => {
    for(let j=0;j<this.state.tasks.length;j++){
      this.state.IconCheck[j]=false
    }
    this.setState(
      prevState => {
        let tasks = prevState.tasks.slice();

        tasks.splice(i, 1);

        return { tasks: tasks };
      },
      () => {
        Tasks.save(this.state.tasks)}
        
    );
  };

 async componentDidMount() {
    console.warn(await AsyncStorage.getItem('TASKS'))

    Tasks.all(tasks => this.setState({ tasks: tasks || [] }));
    this.state.tasks.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.Date) - new Date(a.Date);
    });
    console.warn(this.state.tasks)
    for(let i=0;i<this.state.tasks.length;i++){
      this.state.IconCheck.push(false)
    }
  }
async check(i){
  this.state.IconCheck[i]=!this.state.IconCheck[i]
  this.setState({IconCheck:this.state.IconCheck})
  
}
async search(text){
  this.setState({search:text})
  let final=[]
for(let i=0;i<this.state.tasks.length;i++){
  console.warn('inside ',text,this.state.tasks )
  console.warn('i',i)
 let sample= this.state.tasks[i].text
 let n=sample.includes(text)
 if(n==true){
      final.push(this.state.tasks[i])
 }
 console.warn(final,"final")

}
await this.setState({tasks:final,search:""})

}
async oldTasks(){
  Tasks.all(tasks => this.setState({ tasks: tasks || [] }));

}
async Logout(){
  await AsyncStorage.removeItem('TASKS')
  await AsyncStorage.removeItem('Loggedin')
  this.props.navigation.navigate('LoginPage')

}
  render() {
    return (
      <Container style={{backgroundColor: "#F5FCFF",}}>
          <Header style={{ backgroundColor: "white" ,paddingTop:Constants.statusBarHeight}}>
                      <Text style={{fontSize:16,fontWeight:'bold'}}>
                        Acitivities
                      </Text>
                    <Body>
                      
                    </Body>
                    <Right>
                        <View style={{marginTop:'-4%'}}>
                        <Button transparent onPress={()=>this.Logout()}>
                          <Text style={{fontSize:15,fontWeight:'bold'}}>Log Out</Text>
                        </Button></View>
                    </Right>
                </Header>
        <Content>

        <View style={{margin:"1%"}}>
                       <Card>
                       <View style={{backgroundColor:'white',flexDirection:'row',justifyContent:'space-between'}}> 
                       <Icon name="search" style={{margin:"3%"}}/> 
                                   <Input style={{fontSize:12}}onChangeText={(text)=>this.search(text)}
                                   placeholder="Search" />
                                 <Text style={{fontSize:18,color:'red',fontWeight:'bold',margin:'4%'}} onPress={()=>this.oldTasks()}>
                                   X
                                 </Text>
                 
                               </View>
                               
                               
                               
                               </Card></View>
      <View
        style={styles.container}
      >
        <FlatList
          style={styles.list}
          data={this.state.tasks}
          renderItem={({ item, index }) =>
            <View style={{width:'100%',flexDirection:'row',marginTop:'2%',marginLeft:'2%',borderBottomWidth:1,borderColor:'grey',paddingBottom:'2%'}}>
              <View style={{width:'75%'}}>
                <View style={{margin:'2%',marginTop:"-1%"}}>
                  {console.warn(item,"item")}
                 
                  <Text style={{fontSize:13}}>{item.text}</Text>
                  
                  <View style={{marginTop:'3%'}}>
                  {item.Date && 
                  <Text style={{fontSize:13}}>{item.Date}</Text>}
                  
                  </View>
                </View>
                
              </View>
              <View style={{width:'10%',justifyContent:"center",alignItems:"center"}}>
                { 
                   this.state.IconCheck[index] ?
                  <TouchableOpacity onPress={()=>this.check(index)}>
              <Icon  name="heart" style={{color:'pink'}}/>
              </TouchableOpacity>
              :
              <Icon  name="heart" onPress={()=>this.check(index)} />
                }
              
              </View>
              <View style={{width:'10%',justifyContent:"center",alignItems:"center"}}>
                <Button  onPress={() => this.deleteTask(index)} style={{}} block success >
                  <Text>X</Text>
                  </Button>
                </View>
             <View style={{borderBottomWidth:1}}/>
            </View>
            }
        />
           
  

       
      </View>
      </Content>
      <KeyboardAvoidingView>
      <TextInput
          style={styles.textInput}
          onChangeText={this.changeTextHandler}
          onSubmitEditing={this.addTask}
          value={this.state.text}
          placeholder="Add Activities"
          returnKeyType="done"
          returnKeyLabel="done"
        />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

let Tasks = {
  convertToArrayOfObject(tasks, callback) {
    return callback(
      tasks ? tasks.split("||").map((task, i) => ({ key: i, text: task ,Date:moment(new Date).format('ll'),pin:false})) : []
    );
  },
  convertToStringWithSeparators(tasks) {
    return tasks.map(task => task.text).join("||");
  },
  all(callback) {
    return AsyncStorage.getItem("TASKS", (err, tasks) =>
      this.convertToArrayOfObject(tasks, callback)
    );
  },
  save(tasks) {
    AsyncStorage.setItem("TASKS", this.convertToStringWithSeparators(tasks));
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingTop: 20
  },
  list: {
    width: "100%"
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 18
  },
  
  listItemCont: {
    flexDirection: "row",
    width:'85%',
    alignItems: "center",
    justifyContent: "space-between"
  },
  textInput: {
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "gray",
    width: "100%",
    color:'black'
  }
});
