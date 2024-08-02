import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Pdf from 'react-native-pdf';

export const PDFViewer = ({ route, navigation }: any) => {
  const { title, pdfUrl } = route.params;
  const source = { uri: pdfUrl };

  useEffect(() => {
    title && navigation.setOptions({ title });
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <Pdf
        trustAllCerts={false}
        source={source}
        onError={error => {
          console.log(`Error: ${error}`);
        }}
        style={styles.pdf}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  pdf: {
    flex: 1,
    width: '100%'
  }
});

export default PDFViewer;
