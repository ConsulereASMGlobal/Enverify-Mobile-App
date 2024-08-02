import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Pressable,
  Linking,
} from "react-native";
import Button from "../../../components/Button/Button";
import { TextField } from "../../../components/TextField/TextField";
import { colors } from "../../../globals/colors";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    Alert.alert("Message sent!", "Thank you for contacting us.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <View>
        <TextField style={{ fontWeight: "bold", paddingBottom: 10 }}>
          How Can We Help?
        </TextField>
        <TextField style={{ paddingBottom: 20 }}>
          Fill out our contact form.
        </TextField>
      </View>
      <View style={{ flex: 1 }}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.messageInput}
          placeholder="Message"
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <View style={{ paddingTop: 10, gap: 5 }}>
          <TextField style={styles.subtitle}>Email Us</TextField>
          <Pressable
            onPress={() => {
              Linking.openURL(`mailto:erica@evergreenlabs.org`);
            }}
          >
            <TextField style={styles.contactInfo}>
              erica@evergreenlabs.org
            </TextField>
          </Pressable>
          {/* <TextField style={styles.subtitle}>Call Us</TextField>
          <Pressable
            onPress={() => {
              Linking.openURL(`tel:+63-9063754849`);
            }}>
            <TextField style={styles.contactInfo}>+63-9063754849</TextField>
          </Pressable> */}
        </View>
        <Button onPress={handleSubmit} title="Send" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.backgroundColor,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  messageInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: 150,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  contactInfo: {
    fontSize: 16,
    marginBottom: 10,
    textDecorationLine: "underline",
    color: colors.secondary,
  },
});

export default ContactUs;
