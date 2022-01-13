import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ImageBackground, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import eggplant from '../assets/images/eggplant.png'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faRedo } from '@fortawesome/free-solid-svg-icons';
import { apiUserConnection, wsTaskConnection, taskOrigin } from '../shared/globalValues'
import { sha256 } from 'js-sha256';


const bodyPreset = {
  userName: "",
  name: "",
  verifictation: "",
  role: 1
};
var bodyInfo = {
  userName: "",
  name: "",
  verifictation: "string",
  role: 1
};
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

export default class user extends Component {
  state = {
    allRequired: true,
    reload: 0,
    users: true,
    usersAdd: false,
    usersUpdate: false,
    usersRole: false,
    user: {
      userName: null,
      verification: null,
      role: 0
    },
    body: bodyPreset,
    data: []
  }

  Adduser = () => {
    bodyInfo = bodyPreset;
    this.setState({ body: bodyInfo });
    this.state.users === true
      ? this.setState({ users: false })
      : this.setState({ users: true });

    this.state.usersAdd === false
      ? this.setState({ usersAdd: true })
      : this.setState({ usersAdd: false });
  }

  AdduserPost = async () => {
    // if (this.state.body.name == null || this.state.body.description == null || this.state.body.durationMinutes == null || this.state.body.amountOfPeople == null) {
    //   this.setState({ allRequired: false });
    //   console.log('in IF')
    // }
    // else this.setState({ allRequired: true });
    var body2 = {
      userName: this.state.body.userName,
      name: this.state.body.name,
      role: this.state.body.role,
      password: sha256("password"),
      verification: "string"
    }
    var body = [
      this.state.user,
      body2
    ]
    if (this.state.allRequired) {
      var res = await fetch(apiUserConnection, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
          //'Origin': apiuserOrigin
        }
      });

      this.Adduser();
    }
  }

  Updateuserpage = (body) => {
    bodyInfo = body;
    this.setState({ body: body });
    this.Updateuser();
  }

  Updateuser = () => {
    this.state.users === true
      ? this.setState({ users: false })
      : this.setState({ users: true });

    this.state.usersUpdate === false
      ? this.setState({ usersUpdate: true })
      : this.setState({ usersUpdate: false });
  }

  UpdateuserPost = async () => {
    // if (this.state.body.name == null || this.state.body.description == null || this.state.body.durationMinutes == null || this.state.body.amountOfPeople == null) {
    //   this.setState({ allRequired: false });
    //   console.log('in IF')
    // }
    // else this.setState({ allRequired: true });
    var body2 = {
      userName: this.state.body.userName,
      name: this.state.body.name,
      role: this.state.body.role,
      verification: "string"
    }
    var body = [
      this.state.user,
      body2
    ]
    if (this.state.allRequired) {
      var res = await fetch(apiUserConnection, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
          //'Origin': apiuserOrigin,
          'Content-type': 'application/json; charset=UTF-8'
        }
      });

      this.Updateuser();
    }
  }

  DeleteuserPost = async () => {
    var body2 = {
      userName: this.state.body.userName,
      name: this.state.body.name,
      role: this.state.body.role,
      verification: "string"
    }
    var body = [
      this.state.user,
      body2
    ]
    var res = await fetch(apiUserConnection, {
      method: 'DELETE',
      body: JSON.stringify(body),
      headers: {
        //'Origin': apiuserOrigin,
        'Content-type': 'application/json; charset=UTF-8'
      }
    });

    this.Updateuser();
  }

  updateRole = () => {
    this.state.usersRole === true
      ? this.setState({ usersRole: false })
      : this.setState({ usersRole: true });
  }

  Getusers = async () => {
    this.setState({
      data: await (await fetch(apiUserConnection + "Users/", {
        method: 'POST',
        body: JSON.stringify(this.state.user),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })).json()
    });
  }

  async componentDidMount() {
    try {
      this.setState({ user: { userName: await AsyncStorage.getItem('userName'), verification: await AsyncStorage.getItem('verification'), role: parseInt(await AsyncStorage.getItem('role')) } })
    }
    catch (e) {
      console.log(e)
    }
    this.setState({ reload: this.state.reload + 1 });
    await this.Getusers();
  }

  renderItem() {
    return this.state.data.map(item => {
      var roleName = null;
      switch (item.role) {
        default:
          roleName = null;
          break;
        case 1:
          roleName = "Schoonmaker";
          break;
        case 9:
          roleName = "Hoofd Schoonmaker";
          break;
        case 99:
          roleName = "Hoofd van Loods";
          break;
        case 999:
          roleName = "Admin";
          break;
      }
      return (
        <TouchableOpacity style={styles.user_item} key={item.userName} name={item.userName} onPress={() => this.Updateuserpage(item)}>
          <View style={styles.user_item_display}>
            <Text style={styles.user_item_text}>Gebruikersnaam:</Text>
            <Text style={styles.user_item_value}>{item.userName}</Text>
          </View>
          <View style={styles.user_item_display}>
            <Text style={styles.user_item_text}>Naam:</Text>
            <Text style={styles.user_item_value}>{item.name}</Text>
          </View>
          <View style={styles.user_item_display}>
            <Text style={styles.user_item_text}>Functie:</Text>
            <Text style={styles.user_item_value}>{roleName}</Text>
          </View>
        </TouchableOpacity>);
    })
  }
  changeuserInfo(type, value) {
    switch (type) {
      case "UserName":
        bodyInfo.userName = value;
        break;
      case "Name":
        bodyInfo.name = value;
        break;
      case "Role":
        bodyInfo.role = value;
        break;
    }
    bodyInfo.verifictation = "string";
    this.setState({ body: bodyInfo });
    bodyInfo = bodyPreset;
  }

  getRoleName(role) {
    switch (role) {
      case 999:
        return "Admin";
      case 99:
        return "Hoofd van de loods";
      case 9:
        return "Hoofd Schoonmaker";
      case 1:
        return "Schoonmaker";
      default:
        return "Geen functie";
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar animated={true} backgroundColor="#000" hidden={false} />
        <ImageBackground source={eggplant} style={styles.container}>
          

          {/* Add user window */}
          {this.state.users && <View style={styles.user_background}>
            {/* Title */}
            <View style={styles.user_title}>
              <Text style={styles.user_title_text}>Gebruikers</Text>
              <TouchableOpacity style={styles.refreshbutton} onPress={() => this.Getusers()}>
                <FontAwesomeIcon icon={faRedo} size={30} color="white"/>
                </TouchableOpacity>
              <TouchableOpacity style={styles.user_button_add} onPress={() => this.Adduser()}>
                <FontAwesomeIcon icon={faPlus} style={styles.user_title_icon} size={30} />
              </TouchableOpacity>
            </View>
            <View style={styles.user_divider}></View>

            <ScrollView contentContainerStyle={styles.user_scroll}>{this.renderItem()}</ScrollView>
          </View>}

          {/* Add user window */}
          {this.state.usersAdd && <View style={styles.user_background}>
            {/* Title */}
            <View style={styles.user_title}>
              <Text style={styles.user_title_text}>Gebruiker toevoegen</Text>
            </View>
            <View style={styles.user_divider}></View>
            {!this.state.allRequired && <Text>Niet alle data is ingevuld!</Text>}
            {/* user info input*/}
            <View style={styles.add_item}>
              <View style={styles.add_item_display}>
                <Text style={styles.add_item_text}>Gebruikersnaam:</Text>
                <TextInput style={styles.add_item_input} placeholder="Yoeri" onChangeText={text => this.changeuserInfo("UserName", text)} />
              </View>
              <View style={styles.user_divider}></View>
              <View style={styles.add_item_display}>
                <Text style={styles.add_item_text}>Naam:</Text>
                <TextInput style={styles.add_item_input} placeholder="Yoeri Smits" onChangeText={text => this.changeuserInfo("Name", text)} />
              </View>
              <View style={styles.user_divider}></View>
              <View style={styles.add_item_display}>
                <Text style={styles.add_item_text}>Rol:</Text>
                <View style={styles.add_item_input_role}>
                  <TouchableOpacity style={styles.add_item_input_role_input} onPress={() => this.updateRole()}><Text>{this.getRoleName(this.state.body.role)}</Text></TouchableOpacity>
                  <View style={styles.role_divider}></View>
                  {this.state.usersRole && <View>
                    <TouchableOpacity style={styles.add_item_input_role_input} onPress={() => this.changeuserInfo("Role", 999)}><Text style={styles.add_item_input_role_text}>Admin</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.add_item_input_role_input} onPress={() => this.changeuserInfo("Role", 99)}><Text style={styles.add_item_input_role_text}>Hoofd van Loods</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.add_item_input_role_input} onPress={() => this.changeuserInfo("Role", 9)}><Text style={styles.add_item_input_role_text}>Hoofd Schoonmaker</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.add_item_input_role_input} onPress={() => this.changeuserInfo("Role", 1)}><Text style={styles.add_item_input_role_text}>Schoonmaker</Text></TouchableOpacity>
                  </View>}
                </View>

              </View>
            </View>

            <TouchableOpacity style={styles.add_button} onPress={() => this.AdduserPost()}>
              <Text style={styles.add_button_text}>Gebruiker toevoegen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.add_button} onPress={() => this.Adduser()}>
              <Text style={styles.add_button_text}>Annuleren</Text>
            </TouchableOpacity>
          </View>}

          {/* Update user window */}
          {this.state.usersUpdate && <View style={styles.user_background}>
            {/* Title */}
            <View style={styles.user_title}>
              <Text style={styles.user_title_text}>Gebruiker aanpassen</Text>
            </View>
            <View style={styles.user_divider}></View>
            {!this.state.allRequired && <Text>Niet alle data is ingevuld!</Text>}
            {/* user info input*/}
            <View style={styles.add_item}>
              <View style={styles.add_item_display}>
                <Text style={styles.add_item_text}>Gebruikersnaam:</Text>
                <TextInput style={styles.add_item_input} value={this.state.body.userName} onChangeText={text => this.changeuserInfo("UserName", text)} />
              </View>
              <View style={styles.user_divider}></View>
              <View style={styles.add_item_display}>
                <Text style={styles.add_item_text}>Naam:</Text>
                <TextInput style={styles.add_item_input} value={this.state.body.name} onChangeText={text => this.changeuserInfo("Name", text)} />
              </View>
              <View style={styles.user_divider}></View>
              <View style={styles.add_item_display}>
                <Text style={styles.add_item_text}>Rol:</Text>
                <View style={styles.add_item_input_role}>
                  <TouchableOpacity style={styles.add_item_input_role_input} onPress={() => this.updateRole()}><Text>{this.getRoleName(this.state.body.role)}</Text></TouchableOpacity>
                  <View style={styles.role_divider}></View>
                  {this.state.usersRole && <View>
                    <TouchableOpacity style={styles.add_item_input_role_input} onPress={() => this.changeuserInfo("Role", 999)}><Text style={styles.add_item_input_role_text}>Admin</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.add_item_input_role_input} onPress={() => this.changeuserInfo("Role", 99)}><Text style={styles.add_item_input_role_text}>Hoofd van Loods</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.add_item_input_role_input} onPress={() => this.changeuserInfo("Role", 9)}><Text style={styles.add_item_input_role_text}>Hoofd Schoonmaker</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.add_item_input_role_input} onPress={() => this.changeuserInfo("Role", 1)}><Text style={styles.add_item_input_role_text}>Schoonmaker</Text></TouchableOpacity>
                  </View>}
                </View>

              </View>
            </View>

            <TouchableOpacity style={styles.add_button} onPress={() => this.UpdateuserPost()}>
              <Text style={styles.add_button_text}>Gebruiker aanpassen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.add_button} onPress={() => this.DeleteuserPost()}>
              <Text style={styles.add_button_text}>Verwijderen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.add_button} onPress={() => this.Updateuserpage()}>
              <Text style={styles.add_button_text}>Annuleren</Text>
            </TouchableOpacity>
          </View>}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  refreshbutton: {
    position: 'fixed',
    top: '9.2%',
    left: '5%'
  },
  user_background: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    backgroundColor: '#5A0E56',
    opacity: 0.9,
    alignItems: 'center'
  },
  user_scroll: {
    flex: 1,
    alignItems: 'center'
  },
  user_divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'white'
  },
  user_title: {
    height: '7%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  user_title_text: {
    color: 'white',
    fontSize: 30
  },
  user_title_icon: {
    color: 'white'
  },
  user_button_add: {
    height: '70%',
    width: 10,
    position: 'absolute',
    right: '5%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  user_item: {
    marginTop: '4%',
    padding: 5,
    width: '100%',
    backgroundColor: '#470B44',
    opacity: 1.0,
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5
  },
  user_item_display: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  user_item_text: {
    color: 'white',
    textAlign: 'left'
  },
  user_item_value: {
    color: 'white',
    textAlign: 'right',
    maxWidth: '45%'
  },
  add_item: {
    marginTop: '2%',
    backgroundColor: '#470B44',
    padding: 5,
    width: '90%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
  },
  add_item_display: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5
  },
  add_item_text: {
    color: 'white'
  },
  add_item_input: {
    backgroundColor: 'white',
    width: '50%'
  },
  add_item_input_role: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column'
  },
  add_item_input_role_input: {
    width: '100%',
    backgroundColor: 'white',
    marginTop: '1%'
  },
  add_item_input_role_text: {
    textAlign: 'center'
  },
  role_divider: {
    height: '5%'
  },
  add_button: {
    marginTop: '2%',
    backgroundColor: '#470B44',
    padding: 10,
    width: '55%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  add_button_text: {
    color: 'white',
    fontSize: 20
  }
});