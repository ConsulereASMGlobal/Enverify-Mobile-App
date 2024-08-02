import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { TextField } from '../../../components/TextField/TextField';
import { colors } from '../../../globals/colors';

export const PrivacyPolicy = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 20 }}>
        <TextField style={styles.paragraph}>
          We take your privacy seriously and are committed to protecting your
          personal information. This privacy policy explains how we collect,
          use, and disclose your information.
        </TextField>
        <TextField style={styles.subTitle}>
          What information do we collect?
        </TextField>
        <TextField style={styles.paragraph}>
          We collect information from you when you register on our site, place
          an order, subscribe to our newsletter, or fill out a form. This
          information may include your name, email address, mailing address,
          phone number, credit card information, and other details.
        </TextField>
        <TextField style={styles.subTitle}>
          How do we use your information?
        </TextField>
        <TextField style={styles.paragraph}>
          We use your information to process your orders, improve our website,
          and communicate with you. We may also use your information to send you
          promotional emails or other marketing materials.
        </TextField>
        <TextField style={styles.subTitle}>
          How do we protect your information?
        </TextField>
        <TextField style={styles.paragraph}>
          We use a variety of security measures to protect your personal
          information, including encryption and secure servers. We also have
          strict access controls to limit who can access your information.
        </TextField>
        <TextField style={styles.subTitle}>
          Do we disclose your information to third parties?
        </TextField>
        <TextField style={styles.paragraph}>
          We do not sell, trade, or otherwise transfer your personal information
          to outside parties. This does not include trusted third parties who
          assist us in operating our website, conducting our business, or
          servicing you, as long as those parties agree to keep this information
          confidential.
        </TextField>
        <TextField style={styles.subTitle}>What are your rights?</TextField>
        <TextField style={styles.paragraph}>
          You have the right to access, modify, or delete your personal
          information at any time. You may also opt out of receiving promotional
          emails or other marketing materials.
        </TextField>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.backgroundColor
  },
  title: {
    fontSize: 2,
    fontWeight: 'bold',
    marginBottom: 20
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10
  }
});
