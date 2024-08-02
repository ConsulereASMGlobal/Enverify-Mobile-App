import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useAppDispatch } from "../../redux/store";
import { registerSchema } from "../../static/schema/ValidationSchema";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { ValidationInput } from "../../components/Input/ValidationInput";
import Button from "../../components/Button/Button";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { useNavigation } from "@react-navigation/native";
import { FileImagePicker } from "@src/components/ImagePicker/FileImagePicker";
import { TextField } from "@src/components/TextField/TextField";
import { DropDown } from "@src/components/Dropdown/DropDown";
import { BottomModalActions } from "@src/redux/actions/combineAction";
import { users } from "@src/services/api";
import toast from "@src/services/toast";
import { uploadImage } from "@src/services/uploadImage";

type InputProps = {
  firstName: string;
  lastName: string;
};

export const RegisterFormContainer = ({ mobile, country, prefix }) => {
  const navigation = useNavigation<any>();
  const formOptions = { resolver: yupResolver(registerSchema) };

  const { handleSubmit, ...formProps } = useForm<InputProps>(formOptions);
  const [image, setImage] = useState<any>(null);
  const dispatch = useAppDispatch();
  const [selectedFranchisee, setSelectedFranchisee] = useState();
  const [FranchiseeList, setFranchiseeList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    users.getSMART_CENTRE().then((res) => {
      // console.log(res?.data, "---------Fra-------");
      setFranchiseeList(res?.data);
    });
  }, []);
  const franchisees = FranchiseeList?.map((each) => ({
    label: each?.personalDetails?.name,
    value: each.id,
  }));
  const onSubmit: SubmitHandler<InputProps> = async (data) => {
    if (!selectedFranchisee) {
      toast.danger({ message: "Please select Franchisee" });
    }
    const filterFran = franchisees.find(
      (each) => each.value === selectedFranchisee
    );
    console.log(filterFran?.label, filterFran?.value);
    setLoading(true);
    const identityImage = await uploadImage(image);
    setLoading(false);
    if (!identityImage) {
      toast.danger({ message: "Please upload Proof of Identity" });
    }
    // return;
    navigation.navigate("pickupLocation", {
      regdata: { ...data, mobile, country, prefix, filterFran, identityImage },
    });
  };

  return (
    <View style={{ width: "100%" }}>
      <DropDown
        lebel="Franchisee"
        placeholder="Select the Franchisee"
        rightIconName="sort-down"
        setSelectedValue={setSelectedFranchisee}
        combineOnPress={(rest) =>
          dispatch(
            BottomModalActions.toggleBottomModal({
              title: "Select the Franchisee",
              showList: true,
              data: franchisees,
              ...rest,
            })
          )
        }
      />
      <ValidationInput
        placeholder="First Name"
        label="First Name"
        fieldName="firstName"
        autoCapitalize={"none"}
        {...formProps}
      />

      <ValidationInput
        placeholder="Last Name"
        label="Last Name"
        fieldName="lastName"
        autoCapitalize={"none"}
        {...formProps}
      />
      <ValidationInput
        placeholder="Email"
        label="Email"
        fieldName="email"
        autoCapitalize={"none"}
        {...formProps}
      />
      <ValidationInput
        placeholder="Password"
        fieldName="password"
        label="Password"
        secureTextEntry
        iconName="eye"
        iconFamily="Feather"
        {...formProps}
      />
      <ValidationInput
        placeholder="Confirm Password"
        fieldName="cPassword"
        label="Confirm Password"
        secureTextEntry
        iconName="eye"
        iconFamily="Feather"
        {...formProps}
      />
      <>
        <View
          style={{
            width: "50%",
            alignSelf: "center",
          }}
        >
          <FileImagePicker setImage={setImage} title={"Upload Image"} />
        </View>
        <TextField style={{ textAlign: "center", marginTop: 15, fontSize: 14 }}>
          {`Proof of Identity \n (TIN/ Driving License)`}
        </TextField>
      </>

      <Button
        onPress={handleSubmit(onSubmit)}
        disabled={!!loading}
        title={"Next"}
      >
        {!!loading && <LoadingIndicator activityColor="white" />}
      </Button>
    </View>
  );
};
