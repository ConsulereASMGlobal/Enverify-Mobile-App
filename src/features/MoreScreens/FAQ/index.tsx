import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { NoDataView } from "../../../components/NoDataView";
import { colors } from "../../../globals/colors";
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
} from "../../../globals/themes";
import { axiosInstance } from "../../../helpers/axiosHelper";
import { TextBold, TextField } from "../../../components/TextField/TextField";
import { Spacer } from "../../../components/common/Spacer";
import { ContainerLayout } from "../../../components/Layouts/ContainerLayout";
import { ScrollContainerLayout } from "../../../components/Layouts/ScrollContainerLayout";
import { DynamicIcon } from "@src/utils/Dynamic/DynamicIcon";

const dummyList = [
  {
    id: 1,
    question: "What is the capital of France?",
    answer: "Paris",
  },
  {
    id: 2,
    question: "Who is the author of 'To Kill a Mockingbird'?",
    answer: "Harper Lee",
  },
  {
    id: 3,
    question: "What is the largest planet in our solar system?",
    answer: "Jupiter",
  },
];

export const FaqScreen = () => {
  const [faq, setFaq] = useState();
  const getFaq = async () => {
    const response = await axiosInstance.get(`faq`);
    setFaq(response?.data?.data);
    console.log(response, "respo-----------------");
  };
  useEffect(() => {
    getFaq();
  }, []);

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  const renderFaq = ({ item }: any) => {
    return (
      <View>
        <Spacer spacing={5} />
        <View style={styles.card}>
          <View>
            <TouchableOpacity
              onPress={() => toggleAccordion(item?.id)}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextBold>Q. {item?.question}?</TextBold>
              <View style={styles.iconCont}>
                <DynamicIcon
                  iconSize={14}
                  iconColor={colors.secondary}
                  iconName={
                    expandedIndex === item?.id ? "chevron-up" : "chevron-down"
                  }
                  iconFamily="Ionicons"
                />
              </View>
            </TouchableOpacity>
            {expandedIndex === item?.id && (
              <>
                <Spacer spacing={3} />
                <TextField>A. {item?.answer}</TextField>
              </>
            )}
          </View>
        </View>
        <Spacer spacing={5} />
      </View>
    );
  };
  return (
    <ScrollContainerLayout>
      <ContainerLayout>
        <FlatList
          data={faq}
          renderItem={renderFaq}
          keyExtractor={(item) => (item?.id).toString()}
          ListEmptyComponent={<NoDataView />}
        />
        <Spacer spacing={10} />
      </ContainerLayout>
    </ScrollContainerLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BORDER_RADIUS_SIZE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    backgroundColor: colors.white,
    paddingVertical: MEDIUM_PADDING_SIZE,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
    marginHorizontal: HALF_MEDIUM_PADDING_SIZE / 2,
  },
  iconCont: {
    width: 22,
    height: 22,
    backgroundColor: colors.shaded,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
});
