import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { REGULAR_PADDING_SIZE } from "../../../../globals/themes";
import { ValidationInput } from "../../../../components/Input/ValidationInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { sortingDataSchema } from "../../../../static/schema/ValidationSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { colors } from "../../../../globals/colors";
import Button from "../../../../components/Button/Button";
import { Spacer } from "../../../../components/common/Spacer";
import toast from "../../../../services/toast/index";
import { useNavigation } from "@react-navigation/native";
import { routes } from "../../../../navigation/routes";
import { TextField } from "../../../../components/TextField/TextField";
import { BottomModalActions } from "../../../../redux/actions/combineAction";
import { useAppDispatch } from "../../../../redux/store";
import { DropDown } from "../../../../components/Dropdown/DropDown";
import { FastImage } from "../../../../components/image/index";
import { useSelector } from "react-redux";
import { selectProfile } from "../../../../redux/selectors";
import { axiosInstance } from "../../../../helpers/axiosHelper";
import RoundCheckIcon from "../../../../assets/svgIcon/icon_tick_round.svg";
import { DynamicIcon } from "@src/utils/Dynamic/DynamicIcon";
import { HorizontalLine } from "@src/components/HorizontalLine";

type InputProps = {};
export const SelectedProcess = ({ route }: any) => {
  const navigation = useNavigation<any>();

  const dispatch = useAppDispatch();
  const { process, inMaterials, outMaterials, processType } = route.params;
  const maxTwoDecimalRegExp = /^[0-9]*(\.[0-9]{0,2})?$/;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: process.title, // Replace with your dynamic title variable
    });
  }, [process, navigation]);

  const [itemDetail, setItemDetail] = useState({});
  const [needOpLog, setNeedOpLog] = useState(false);

  const formOptions = {
    resolver: yupResolver(sortingDataSchema),
    defaultValues: {
      inputMaterials: [
        {
          materialTypeId: "",
          inputQuantity: "",
          inputMaterialName: "",
          inputMaterialCategoryId: "",
        },
      ],
    },
  };

  const { handleSubmit, watch, getValues, setValue, ...formProps } =
    useForm<InputProps>(formOptions);

  const [selectedInput, setSelectedInput] = useState();

  const [refresh, setRefresh] = useState(false);
  const [inputFields, setInputFields] = useState(getValues().inputMaterials);

  const handleAddOutput = () => {
    const newIndex: number = getValues().inputMaterials?.length;
    const newInput = {
      materialTypeId: "",
      inputQuantity: "",
      inputMaterialName: "",
      inputMaterialCategoryId: "",
    };
    setValue(`inputMaterials[${newIndex}]`, newInput);
    setRefresh((pre) => !pre);
  };
  useEffect(() => {
    setInputFields(getValues().inputMaterials);
  }, [refresh, getValues]);

  const setSelectedInputCategory = (index: number, value: string) => {
    console.log(value, ":::::");
    setValue(`inputMaterials[${index}.materialTypeId]`, value);
    const currentMaterial = inMaterials.find((each) => each.id === value);
    // console.log(currentMaterial, "this is current material");
    setValue(
      `inputMaterials[${index}.inputMaterialName]`,

      currentMaterial?.name
    );
    setValue(
      `inputMaterials[${index}.inputMaterialCategoryId]`,

      currentMaterial?.categoryId
    );
  };

  useEffect(() => {
    selectedInput &&
      axiosInstance.get(`inventory/items/${selectedInput}`).then((res) => {
        if (res.status === 200) {
          setItemDetail(res?.data?.data[0]);
        }
      });
  }, [selectedInput]);

  const updatedInMaterials = inMaterials
    ?.filter((each) => each.stock > 0)
    .map((each: any) => {
      return {
        id: each?.id,
        label:
          each?.categoryName + " " + each?.name + " (" + each?.stock + " kg)",
        value: each?.id,
        weight: each?.weight,
        quantity: each?.quantity,
      };
    });

  const updatedOutMaterials = outMaterials
    ?.filter((each) => each.id)
    .map((each: any) => {
      return {
        id: each?.id,
        label: each?.categoryName + " " + each?.name,
        value: each?.id,
      };
    });

  const profileData = useSelector(selectProfile);

  const onSubmit: SubmitHandler<InputProps> = async (data: any) => {
    if (data?.operatingHours && Number(data?.operatingHours) > 24) {
      toast.danger({
        message: "Operating hours can not be more than 24!",
      });
      return;
    }

    // if (!selectedInput) {
    //   toast.danger({ message: "Input material is required!" });
    //   return;
    // }

    // if (Number(itemDetail?.quantity || 0) < Number(data?.inputQuantity)) {
    //   toast.danger({
    //     message:
    //       "Input Quantity entered is higher than available Raw material!",
    //   });
    //   return;
    // }

    const productionItem: any = {};
    const inputItem: any = {};
    const filteredInputs = data.inputMaterials.filter(
      (each: any) => each.materialTypeId && each.inputQuantity
    );
    const formData = {
      ...data,
      wastage: data?.wastage === "" ? 0 : data?.wastage,
    };
    formData.inputMaterial = filteredInputs;

    // console.log(formData?.inputMaterials, "OOOOOOO");
    // return;
    let inputSum = 0;

    formData.inputMaterial.map((each) => {
      inputItem[each.materialTypeId] = each.inputQuantity;

      inputSum += Number(each.inputQuantity);
    });

    console.log(inputSum, "Input sum here");
    // return;

    let outputSum = Number(formData.wastage);

    let decimalErrorCount = 0;

    updatedOutMaterials?.forEach((item: any) => {
      if (formData[item.id] !== "") {
        productionItem[item.id] = formData[item.id];
        productionItem[item.id] = Number(formData[item.id]);

        if (formData[item.id] && !maxTwoDecimalRegExp.test(formData[item.id])) {
          decimalErrorCount += 1;
          return;
        }

        outputSum += Number(formData[item.id]);
      }
      delete formData[item.id];
    });
    console.log(outputSum, "Output sum here");

    if (decimalErrorCount > 0) {
      toast.danger({
        message: "Quantity should have at most two decimal places",
      });
      return;
    }

    if (process?.processType !== "DIVERSION" && outputSum !== inputSum) {
      toast.danger({
        message: "Total of output quantity should be equal to input quantity",
      });
      return;
    }

    // if (process?.processType !== "DIVERSION" &&inputSum !== outputSum) {
    //   toast.danger({
    //     message:
    //       "Total of output quantity and wastage should be equal to total of input quantities",
    //   });
    //   return;
    // }
    delete formData["inputMaterials"];

    // return;
    const preSortData = {
      hubId: profileData?.hubId,
      userId: profileData?.id,
      // inputMaterialTypeId: updatedInMaterials.find(
      //   (each) => each.id === selectedInput
      // ),
      processId: process?.id,
      processName: process?.title,
      processType: process?.processType,
      productionItem: productionItem,
      // inputMaterial: formData.inputMaterials,
      ...formData,
    };
    console.log(preSortData, "data-------");
    // return;
    navigation.navigate(routes.process.preSortingSummary, {
      preSortData,
      outputList: outMaterials,
      process,
    });
  };

  return (
    <View style={{ backgroundColor: colors.backgroundColor, flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={styles.screen}>
            <View style={styles.screen.screenIcon}>
              <FastImage
                source={{ uri: process?.icon }}
                resizeMode="contain"
                style={styles.imageStyle}
              />
            </View>
            <TextField
              style={{ fontSize: 12, lineHeight: 20, fontWeight: "bold" }}
            >
              {process?.title}
            </TextField>
            <View style={styles.check}>
              <RoundCheckIcon style={{ top: 7, right: 7 }} />
            </View>
          </View>
          <Spacer spacing={10} />

          <Pressable
            onPress={() => setNeedOpLog((prev) => !prev)}
            style={{
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
            }}
          >
            <TextField
              style={{
                marginVertical: 15,
                color: colors.dark,
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              Log operational info?{" "}
            </TextField>
            <DynamicIcon
              iconName={needOpLog ? "caretup" : "caretdown"}
              iconColor={colors.dark}
              iconFamily="AntDesign"
              iconSize={12}
            />
          </Pressable>
          {needOpLog && (
            <>
              <ValidationInput
                tooltipChild={
                  <TextField>
                    Number of hours for which the production activity was
                    carried out
                  </TextField>
                }
                placeholder="Operating Hours"
                label="Operating Hours"
                fieldName="operatingHours"
                autoCapitalize={"none"}
                keyboardType="numeric"
                iconName={""}
                leftIconName={""}
                unit="Hrs"
                {...formProps}
              />
              <Spacer spacing={5} />

              <ValidationInput
                tooltipChild={
                  <TextField>
                    Number of people who were directly working on the production
                    process
                  </TextField>
                }
                placeholder="Crew Size"
                label="Crew Size"
                fieldName="teamSize"
                autoCapitalize={"none"}
                keyboardType="numeric"
                iconName={""}
                leftIconName={""}
                unit="Qty"
                {...formProps}
              />
              <Spacer spacing={5} />
            </>
          )}

          <TextField
            style={{
              marginVertical: 15,
              color: colors.dark,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Input
          </TextField>
          {/* <View style={styles.dropdownMainContainer}>
            <DropDown
              tooltipChild={
                <TextField>
                  Select the material which was fed into the processing
                  equipment
                </TextField>
              }
              lebel="Input Material"
              placeholder="Select Input Material"
              rightIconName="sort-down"
              setSelectedValue={setSelectedInput}
              combineOnPress={(rest) =>
                dispatch(
                  BottomModalActions.toggleBottomModal({
                    title: "Select Input Material",
                    showList: true,
                    data: updatedInMaterials,
                    ...rest,
                  })
                )
              }
            />
          </View>

          <Spacer spacing={5} /> */}
          {/* <ValidationInput
            tooltipChild={
              <TextField>
                Select the material which was fed into the processing equipment
              </TextField>
            }
            placeholder="Input Quantity"
            label="Input Quantity"
            fieldName="inputQuantity"
            autoCapitalize={"none"}
            keyboardType="numeric"
            iconName={""}
            leftIconName={""}
            unit={"KG"}
            {...formProps}
          />

          <Spacer spacing={5} /> */}
          {inputFields &&
            inputFields?.map((each, index) => (
              <>
                <View key={each} style={styles.dropdownMainContainer}>
                  {inputFields[1] && (
                    <View>
                      {index === 0 && <Spacer spacing={5} />}
                      {index > 0 && (
                        <>
                          <Spacer spacing={10} />
                          <HorizontalLine color={colors.grayTwo} />
                          <Spacer spacing={15} />
                        </>
                      )}
                      <TouchableOpacity
                        style={{
                          alignItems: "flex-end",
                          position: "absolute",
                          right: 0,
                          top: index > 0 ? 25 : -15,
                        }}
                        onPress={() => {
                          getValues().inputMaterials.splice(index, 1);
                          setRefresh((pre) => !pre);
                        }}
                      >
                        <Spacer spacing={5} />
                        <DynamicIcon
                          iconName={"highlight-remove"}
                          iconFamily={"MaterialIcons"}
                          iconColor={colors.error}
                          iconSize={24}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  <TextField
                    style={{
                      paddingBottom: 5,
                      fontSize: 12,
                      color: colors.primary,
                    }}
                  >
                    {"Input Material"}
                  </TextField>
                  <DropDown
                    placeholder="Select Input Material"
                    rightIconName="sort-down"
                    value={getValues().inputMaterials[index].name}
                    setSelectedValue={(value) => {
                      console.log(value, "this is from dropdown");
                      setSelectedInputCategory(index, value);
                    }}
                    combineOnPress={(rest) =>
                      dispatch(
                        BottomModalActions.toggleBottomModal({
                          title: "Select Input Material",
                          showList: true,
                          data: updatedInMaterials,
                          ...rest,
                        })
                      )
                    }
                  />
                </View>

                <Spacer spacing={5} />

                <View>
                  <TextField style={[styles.label]}>
                    {"Input Quantity"}
                  </TextField>
                </View>
                <View
                  style={{
                    borderRadius: 6,
                    flexDirection: "row",
                    alignItems: "center",
                    elevation: 3,
                    backgroundColor: colors.white,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                  }}
                >
                  <TextInput
                    placeholder={"Input Quantity"}
                    onChangeText={(val) => {
                      if (!maxTwoDecimalRegExp.test(val)) {
                        setValue(`inputMaterials[${index}].error`, true);
                        toast.danger({
                          message: `Quantity should have at most two decimal places`,
                        });
                      }
                      setValue(`inputMaterials[${index}].inputQuantity`, val);
                    }}
                    defaultValue={
                      getValues().inputMaterials[index].inputQuantity
                    }
                    style={{
                      color: colors.dark,
                      ...styles.input,
                    }}
                    placeholderTextColor={colors.gray}
                  />
                  <View
                    style={[styles.unit, { backgroundColor: colors.primary }]}
                  >
                    <TextField style={styles.unitValue}>{"KG"}</TextField>
                  </View>
                </View>
                <Spacer spacing={8} />
              </>
            ))}
          {/* Alternate recycling */}
          {process?.title === "Alternate Recycling" && (
            <>
              <Button
                textStyle={{
                  lineHeight: 18,
                  color: colors.primary,
                  fontWeight: "bold",
                }}
                onPress={() => handleAddOutput()}
                title={"+ Add Input"}
                style={{
                  backgroundColor: colors.backgroundColor,
                  borderWidth: 1,
                  borderColor: colors.primary,
                  borderRadius: 100,
                }}
              />
              <Spacer spacing={15} />
            </>
          )}

          <TextField
            style={{
              marginVertical: 15,
              color: colors.dark,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Output
          </TextField>

          {updatedOutMaterials?.length ? (
            updatedOutMaterials?.map((each, index) => (
              <View key={index} style={styles.leftLabelInput}>
                <TextField style={styles.leftLabel}>{each.label}</TextField>
                <View style={{ width: "40%" }}>
                  <ValidationInput
                    placeholder="Qty"
                    fieldName={each.id}
                    autoCapitalize={"none"}
                    keyboardType="numeric"
                    iconName={""}
                    leftIconName={""}
                    unit={"Kg"}
                    {...formProps}
                  />
                </View>
              </View>
            ))
          ) : (
            <></>
          )}

          <Spacer spacing={10} />

          <ValidationInput
            tooltipChild={
              <TextField>
                Enter the amount which was lost on the account of moisture, non
                plastic material or other contaminations
              </TextField>
            }
            placeholder="Wastage"
            label="Wastage"
            fieldName="wastage"
            autoCapitalize={"none"}
            keyboardType="numeric"
            iconName={""}
            leftIconName={""}
            unit={"KG"}
            {...formProps}
          />

          <Spacer spacing={20} />

          <Button
            textStyle={{ lineHeight: 18 }}
            onPress={handleSubmit(onSubmit)}
            title={"Next"}
          />
          <Spacer spacing={10} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: REGULAR_PADDING_SIZE,
    marginVertical: 15,
  },
  screen: {
    minHeight: 108,
    width: 108,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    position: "relative",
    marginTop: 10,
    padding: 10,
    screenIcon: {
      width: 48,
      height: 48,
      backgroundColor: colors.primaryBG,
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
    },
  },

  check: {
    width: 12,
    height: 12,
    position: "absolute",
    // backgroundColor: colors.secondary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    top: 5,
    right: 5,
  },

  imageStyle: { height: 24, width: 24 },

  dropdownMainContainer: { zIndex: 99999 },

  leftLabelInput: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  leftLabel: { marginBottom: 8, fontWeight: "bold" },
  input: {
    height: 50,
    padding: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    flex: 1,
    fontSize: 16,
    // fontFamily: Fonts.PoppinsRegular
  },
  label: {
    color: colors.primary,
    paddingBottom: 5,
    fontSize: 12,
  },
  unit: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 12,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
    elevation: 3,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  unitValue: {
    fontSize: 14,
    color: colors.white,
  },
});
