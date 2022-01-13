import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ImageBackground, TextInput, ScrollView } from 'react-native';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import eggplant from '../assets/images/eggplant.png'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { apiTaskConnection, wsTaskConnection, apiTaskOrigin } from '../shared/globalValues'


const bodyPreset = {
  id: "00000000-0000-0000-0000-000000000000",
  name: "",
  description: "",
  durationMinutes: 0,
  amountOfPeople: 0
};
var bodyInfo = {
  id: "",
  name: "",
  description: "",
  durationMinutes: 0,
  amountOfPeople: 0
};
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

export default class Task extends Component {
  state = {
    allRequired: true,
    reload: 0,
    tasks: true,
    tasksAdd: false,
    tasksUpdate: false,
    body: bodyPreset,
    data: []
  }

  Start = async () => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl(wsTaskConnection)
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Error)
        .build();

      connection.on("GetTasks", (a) => {

        this.setState({ data: a });
      });
      await connection.start();
    }
    catch (e) {
      console.log(e);
    }
  }

  AddTask = () => {
    bodyInfo = bodyPreset;
    this.state.tasks === true
      ? this.setState({ tasks: false })
      : this.setState({ tasks: true });

    this.state.tasksAdd === false
      ? this.setState({ tasksAdd: true })
      : this.setState({ tasksAdd: false });
  }

  AddTaskPost = async () => {
    // if (this.state.body.name == null || this.state.body.description == null || this.state.body.durationMinutes == null || this.state.body.amountOfPeople == null) {
    //   this.setState({ allRequired: false });
    //   console.log('in IF')
    // }
    // else this.setState({ allRequired: true });
    if (this.state.allRequired) {
      var res = await fetch(apiTaskConnection, {
        method: 'POST',
        body: JSON.stringify(this.state.body),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
          //'Origin': apiTaskOrigin
        }
      });

      this.AddTask();
    }
  }

  UpdateTaskpage = (body) => {
    bodyInfo = body;
    this.setState({ body: body });
    this.UpdateTask();
  }

  UpdateTask = () => {
    this.state.tasks === true
      ? this.setState({ tasks: false })
      : this.setState({ tasks: true });

    this.state.tasksUpdate === false
      ? this.setState({ tasksUpdate: true })
      : this.setState({ tasksUpdate: false });
  }

  UpdateTaskPost = async () => {
    // if (this.state.body.name == null || this.state.body.description == null || this.state.body.durationMinutes == null || this.state.body.amountOfPeople == null) {
    //   this.setState({ allRequired: false });
    //   console.log('in IF')
    // }
    // else this.setState({ allRequired: true });
    if (this.state.allRequired) {
      var res = await fetch(apiTaskConnection, {
        method: 'PATCH',
        body: JSON.stringify(this.state.body),
        headers: {
          //'Origin': apiTaskOrigin,
          'Content-type': 'application/json; charset=UTF-8'
        }
      });

      this.UpdateTask();
    }
  }

  DeleteTaskPost = async () => {
    var res = await fetch(apiTaskConnection, {
      method: 'DELETE',
      body: JSON.stringify(this.state.body),
      headers: {
        //'Origin': apiTaskOrigin,
        'Content-type': 'application/json; charset=UTF-8'
      }
    });

    this.UpdateTask();
  }

  GetTasks = async () => {
    this.setState({ data: await (await fetch(apiTaskConnection, {
      method: 'GET',
      headers: {
        //'Origin': apiTaskOrigin
      }
    })).json() });
  }

  async componentDidMount() {
    this.Start();
    this.setState({ reload: this.state.reload + 1 });
    await this.GetTasks();
  }

  renderItem() {
    return this.state.data.map(item => {
      return (
        <TouchableOpacity style={styles.task_item} key={item.id} name={item.name} onPress={() => this.UpdateTaskpage(item)}>
          <View style={styles.task_item_display}>
            <Text style={styles.task_item_text}>Naam:</Text>
            <Text style={styles.task_item_value}>{item.name}</Text>
          </View>
          <View style={styles.task_item_display}>
            <Text style={styles.task_item_text}>Beschrijving:</Text>
            <Text style={styles.task_item_value}>{item.description}</Text>
          </View>
          <View style={styles.task_item_display}>
            <Text style={styles.task_item_text}>Tijdsduur:</Text>
            <Text style={styles.task_item_value}>{item.durationMinutes}</Text>
          </View>
          <View style={styles.task_item_display}>
            <Text style={styles.task_item_text}>Aantal personen:</Text>
            <Text style={styles.task_item_value}>{item.amountOfPeople}</Text>
          </View>
        </TouchableOpacity>);
    })
  }
  changeTaskInfo(type, value) {
    switch (type) {
      case "Name":
        bodyInfo.name = value;
        break;
      case "Description":
        bodyInfo.description = value;
        break;
      case "TimeSpan":
        bodyInfo.durationMinutes = value;
        break;
      case "People":
        bodyInfo.amountOfPeople = value;
        break;
    }
    this.setState({ body: bodyInfo });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar animated={true} backgroundColor="#000" hidden={false} />
        <ImageBackground source={eggplant} style={styles.container}>

          {/* Add task window */}
          {this.state.tasks && <View style={styles.task_background}>
            {/* Title */}
            <View style={styles.task_title}>
              <Text style={styles.task_title_text}>Taken</Text>
              <TouchableOpacity style={styles.task_button_add} onPress={() => this.AddTask()}>
                <FontAwesomeIcon icon={faPlus} style={styles.task_title_icon} size={30} />
              </TouchableOpacity>
            </View>
            <View style={styles.task_divider}></View>

            {/* Datepicker */}
            <View style={styles.task_cal}>
              <FontAwesomeIcon icon={faCalendarAlt} style={styles.task_cal_icon} size={30} />
              <Text style={styles.task_cal_text}>{today}</Text>
            </View>
            <View style={styles.task_divider}></View>
            <ScrollView contentContainerStyle={styles.task_scroll}>{this.renderItem()}</ScrollView>
          </View>}

          {/* Add task window */}
          {this.state.tasksAdd && <View style={styles.task_background}>
            {/* Title */}
            <View style={styles.task_title}>
              <Text style={styles.task_title_text}>Taak toevoegen</Text>
            </View>
            <View style={styles.task_divider}></View>
            {!this.state.allRequired && <Text>Niet alle data is ingevuld!</Text>}
            {/* Task info input*/}
            <View style={styles.add_item}>
              <View style={styles.add_item_display}>
                <Text style={styles.add_item_text}>Naam:</Text>
                <TextInput style={styles.add_item_input} placeholder={"Bladblazer"} onChangeText={text => this.changeTaskInfo("Name", text)} />
              </View>
              <View style={styles.task_divider}></View>
              <View style={styles.add_item_display}>
                <Text style={styles.add_item_text}>Beschrijving:</Text>
                <TextInput style={styles.add_item_input} placeholder={"Kort stukje tekst"} onChangeText={text => this.changeTaskInfo("Description", text)} />
              </View>
              <View style={styles.task_divider}></View>
              <View style={styles.add_item_display}>
                <Text style={styles.add_item_text}>Tijdsduur:</Text>
                <TextInput style={styles.add_item_input} placeholder={"30"} onChangeText={text => this.changeTaskInfo("TimeSpan", text)} keyboardType='number-pad' />
              </View>
              <View style={styles.task_divider}></View>
              <View style={styles.add_item_display}>
                <Text style={styles.add_item_text}>Aantal personen:</Text>
                <TextInput style={styles.add_item_input} placeholder={"1"} onChangeText={text => this.changeTaskInfo("People", text)} keyboardType='number-pad' />
              </View>
            </View>

            <TouchableOpacity style={styles.add_button} onPress={() => this.AddTaskPost()}>
              <Text style={styles.add_button_text}>Taak toevoegen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.add_button} onPress={() => this.AddTask()}>
              <Text style={styles.add_button_text}>Annuleren</Text>
            </TouchableOpacity>
          </View>}

          {/* Update task window */}
          {this.state.tasksUpdate && <View style={styles.task_background}>
            {/* Title */}
            <View style={styles.task_title}>
              <Text style={styles.task_title_text}>Taak aanpassen</Text>
            </View>
            <View style={styles.task_divider}></View>
            {!this.state.allRequired && <Text>Niet alle data is ingevuld!</Text>}
            {/* Task info input*/}
            <View style={styles.add_item}>
              <View style={styles.add_item_display}>
                <Text style={styles.add_item_text}>Naam:</Text>
                <TextInput style={styles.add_item_input} value={this.state.body.name} onChangeText={text => this.changeTaskInfo("Name", text)} />
              </View>
              <View style={styles.task_divider}></View>
              <View style={styles.add_item_display}>
                <Text style={styles.add_item_text}>Beschrijving:</Text>
                <TextInput style={styles.add_item_input} value={this.state.body.description} onChangeText={text => this.changeTaskInfo("Description", text)} />
              </View>
              <View style={styles.task_divider}></View>
              <View style={styles.add_item_display}>
                <Text style={styles.add_item_text}>Tijdsduur:</Text>
                <TextInput style={styles.add_item_input} value={this.state.body.durationMinutes} onChangeText={text => this.changeTaskInfo("TimeSpan", text)} keyboardType='number-pad' />
              </View>
              <View style={styles.task_divider}></View>
              <View style={styles.add_item_display}>
                <Text style={styles.add_item_text}>Aantal personen:</Text>
                <TextInput style={styles.add_item_input} value={this.state.body.amountOfPeople} onChangeText={text => this.changeTaskInfo("People", text)} keyboardType='number-pad' />
              </View>
            </View>

            <TouchableOpacity style={styles.add_button} onPress={() => this.UpdateTaskPost()}>
              <Text style={styles.add_button_text}>Taak aanpassen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.add_button} onPress={() => this.DeleteTaskPost()}>
              <Text style={styles.add_button_text}>Verwijderen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.add_button} onPress={() => this.UpdateTaskpage()}>
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
  task_background: {
    width: '100%',
    backgroundColor: '#5A0E56',
    opacity: 0.9,
    flexGrow: 1,
    alignItems: 'center'
  },
  task_scroll: {
    flexGrow: 1,
    alignItems: 'center'
  },
  task_divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'white'
  },
  task_title: {
    height: '7%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  task_title_text: {
    color: 'white',
    fontSize: 30
  },
  task_title_icon: {
    color: 'white'
  },
  task_cal: {
    height: '7%',
    width: '40%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  task_cal_text: {
    color: 'white',
    fontSize: 20
  },
  task_cal_icon: {
    color: 'white'
  },
  task_button_add: {
    height: '70%',
    width: 10,
    position: 'absolute',
    right: '5%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  task_item: {
    marginTop: '2%',
    padding: 5,
    width: '90%',
    backgroundColor: '#470B44',
    opacity: 1.0,
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5
  },
  task_item_display: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  task_item_text: {
    color: 'white',
    textAlign: 'left'
  },
  task_item_value: {
    color: 'white',
    textAlign: 'right'
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
    backgroundColor: 'white'
  },
  add_button: {
    marginTop: '2%',
    backgroundColor: '#470B44',
    padding: 10,
    width: '50%',
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