import React, { Component } from "react";

class Field extends Component {
  render () {
    return (
      <Item rounded style={styles.input}>
        <Icon active style={styles.inputIcon} name="lock" type="SimpleLineIcons" />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={password => this.setState({ password })}
          secureTextEntry
        />
      </Item>
    );
  }
}
