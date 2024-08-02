import React, { useState } from "react";
import { View } from "react-native";
import { RootState, useAppDispatch } from "../../redux/store";
import { pickUpSchema } from "../../static/schema/ValidationSchema";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { ValidationInput } from "../../components/Input/ValidationInput";
import Button from "../../components/Button/Button";

import { useSelector } from "react-redux";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { useNavigation } from "@react-navigation/native";
import { TextField } from "../../components/TextField/TextField";
import { DropDown } from "../../components/Dropdown/DropDown";
import { BottomModalActions } from "../../redux/actions/combineAction";
import provinceList from "./provinceList";
import cityList from "./cityList";

import toast from "../../services/toast";
import { FileImagePicker } from "@src/components/ImagePicker/FileImagePicker";
import { Spacer } from "@src/components/common/Spacer";
import RadioGroup from "@src/components/RadioGroup/RadioGroup";
import { options } from "../../navigation/AuthStack";
import { uploadImage } from "@src/services/uploadImage";

type InputProps = {
  lotNumber: string;
};

export const PickupFormContainer = ({ regdata }) => {
  console.log(regdata, "data here------------");
  let provinces = [...provinceList];
  provinces.sort(function (a, b) {
    var labelA = a.label.toUpperCase();
    var labelB = b.label.toUpperCase();
    if (labelA < labelB) {
      return -1;
    }
    if (labelA > labelB) {
      return 1;
    }
    return 0;
  });

  let cities = [...cityList];

  cities.sort(function (a, b) {
    var labelA = a.label.toUpperCase();
    var labelB = b.label.toUpperCase();
    if (labelA < labelB) {
      return -1;
    }
    if (labelA > labelB) {
      return 1;
    }
    return 0;
  });

  const dispatch = useAppDispatch();
  const [selectedProvince, setSelectedProvince] = useState();
  const [selectedCity, setSelectedCity] = useState();

  const navigation = useNavigation<any>();
  const formOptions = { resolver: yupResolver(pickUpSchema) };

  const { handleSubmit, ...formProps } = useForm<InputProps>(formOptions);
  const { logging } = useSelector((state: RootState) => state.auth);
  const [imagePOE, setPOEImage] = useState<any>(null);
  const [imagePOF, setPOFImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const radioOptions = [
    { id: 1, label: "Yes", value: "True" },
    { id: 2, label: "No", value: "False" },
  ];
  const onSubmit: SubmitHandler<InputProps> = async (data) => {
    if (!selectedCity) {
      toast.danger({ message: "City is a required field" });
    }

    if (!selectedProvince) {
      toast.danger({ message: "Province is a required field" });
    }
    setLoading(true);

    const poeImage = await uploadImage(imagePOE);
    const pofImage = await uploadImage(imagePOF);

    setLoading(false);
    if (!poeImage) {
      toast.danger({ message: "Please upload Proof of Establishment" });
    }
    if (!pofImage) {
      toast.danger({ message: "Please upload Proof of Facility" });
    }
    navigation.navigate("lastStep", {
      regdata: {
        ...regdata,
        ...data,
        franchiseeId: regdata?.filterFran?.value,
        franchiseeName: regdata?.filterFran?.label,
        province: selectedProvince,
        city: selectedCity,

        kycDocument: [
          {
            docUrl: regdata?.identityImage,
            docNumber: "",
            docType: "POI", //possible values ISO,PPRS
          },
          {
            docUrl: poeImage,
            docNumber: "",
            docType: "POE", //possible values ISO,PPRS
          },
          {
            docUrl: pofImage,
            docNumber: "",
            docType: "POF", //possible values ISO,PPRS
          },
        ],
        isoCertificate: data?.iso,
        pprsCertificate: data?.pprs,
      },
    });
  };

  return (
    <View style={{ width: "100%" }}>
      <ValidationInput
        placeholder="Lot Number/Building/Location*"
        label="Lot Number/Building/Location*"
        fieldName="lotNumber"
        autoCapitalize={"none"}
        {...formProps}
      />

      <TextField
        style={{
          paddingBottom: 5,
          fontSize: 14,
        }}
      >
        Province*
      </TextField>
      <DropDown
        placeholder="Select Province"
        rightIconName="sort-down"
        setSelectedValue={setSelectedProvince}
        combineOnPress={(rest) =>
          dispatch(
            BottomModalActions.toggleBottomModal({
              title: "Select Province",
              showList: true,
              data: provinces,
              ...rest,
            })
          )
        }
      />

      <TextField
        style={{
          paddingBottom: 5,
          fontSize: 14,
        }}
      >
        City*
      </TextField>
      <DropDown
        placeholder="Select City"
        rightIconName="sort-down"
        setSelectedValue={setSelectedCity}
        combineOnPress={(rest) =>
          dispatch(
            BottomModalActions.toggleBottomModal({
              title: "Select City",
              showList: true,
              data: cities,
              ...rest,
            })
          )
        }
      />

      <ValidationInput
        placeholder="Enter Barangay"
        label="Barangay*"
        fieldName="barangay"
        autoCapitalize={"none"}
        {...formProps}
      />
      <ValidationInput
        placeholder="Notes"
        label="Notes(optional)"
        fieldName="notes"
        autoCapitalize={"none"}
        subLabel="Give us more information about your address."
        multiline
        {...formProps}
      />
      <>
        <TextField style={{ marginTop: 5 }}>
          Do you have PPRS certification?
        </TextField>
        <RadioGroup options={radioOptions} {...formProps} name={"pprs"} />
        <TextField style={{ marginTop: 10 }}>
          Do you have ISO 9001 certification?
        </TextField>
        <RadioGroup options={radioOptions} {...formProps} name={"iso"} />
      </>
      <Spacer spacing={10} />
      <>
        <View
          style={{
            width: "50%",
            alignSelf: "center",
          }}
        >
          <FileImagePicker setImage={setPOEImage} title={"Upload Image"} />
        </View>
        <TextField style={{ textAlign: "center", marginTop: 15, fontSize: 14 }}>
          {`Proof of Establishment \n (SEC/DTI/Business Permit/Mayor Letter)`}
        </TextField>
      </>
      <Spacer spacing={10} />
      <>
        <View
          style={{
            width: "50%",
            alignSelf: "center",
          }}
        >
          <FileImagePicker setImage={setPOFImage} title={"Upload Image"} />
        </View>
        <TextField style={{ textAlign: "center", marginTop: 15, fontSize: 14 }}>
          {`Picture of the facility \n (Name of the establishment should be visible)`}
        </TextField>
      </>

      <Button
        textStyle={{ lineHeight: 18 }}
        onPress={handleSubmit(onSubmit)}
        disabled={!!loading}
        title={"Next"}
      >
        {!!loading && <LoadingIndicator activityColor="white" />}
      </Button>
    </View>
  );
};
