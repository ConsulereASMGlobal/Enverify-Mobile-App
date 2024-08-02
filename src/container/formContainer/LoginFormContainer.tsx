import React from "react";
import { View, Pressable } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { loginSchema } from "@src/static/schema/ValidationSchema";
import { ValidationInput } from "@src/components/Input/ValidationInput";
import { colors } from "@src/globals/colors";
import Button from "@src/components/Button/Button";
import { authActions } from "@src/redux/actions/combineAction";
import { TextMedium } from "@src/components/TextField/TextField";
import { RootState, useAppDispatch } from "@src/redux/store";
import { LoadingIndicator } from "@src/components/LoadingIndicator";

type LoginFormContainerProps = {
  recycler?: string;
};

type InputProps = {
  mobile: string;
  password: string;
};

export const LoginFormContainer = ({ recycler }: LoginFormContainerProps) => {
  const formOptions = { resolver: yupResolver(loginSchema) };
  const dispatch = useAppDispatch();
  const { logging } = useSelector((state: RootState) => state.auth);

  const { handleSubmit, ...formProps } = useForm<InputProps>(formOptions);

  const onSubmit: SubmitHandler<InputProps> = async (data) => {
    // data.recycler = recycler;
    dispatch(authActions.login({ ...data, userType: "PICKUP_POINT_STAFF" }));
  };

  const navigation = useNavigation<any>();

  return (
    <View style={{ width: "100%" }}>
      <ValidationInput
        placeholder="9XXXXXXXXX"
        label="Mobile Number"
        fieldName="mobile"
        autoCapitalize={"none"}
        // maxLength={10}
        keyboardType="phone-pad"
        prefix="+63"
        {...formProps}
      />

      <ValidationInput
        placeholder="Password"
        label="Password"
        fieldName="password"
        secureTextEntry
        iconName="eye"
        iconFamily="Feather"
        {...formProps}
      />

      <Pressable
        style={{ alignItems: "flex-end" }}
        onPress={() =>
          navigation.navigate("sendOtp", {
            heading: "Forgot Your Password?",
            subheading:
              "Please enter the mobile number associated with your account. We will send an OTP verification.",
            routeFrom: "forgot",
          })
        }
      >
        <TextMedium style={{ fontSize: 14, color: colors.primary }}>
          Forgot Password?
        </TextMedium>
      </Pressable>

      <Button
        textStyle={{ lineHeight: 18 }}
        onPress={handleSubmit(onSubmit)}
        disabled={!!logging}
        title={"Login"}
      >
        {!!logging && <LoadingIndicator activityColor="white" />}
      </Button>
    </View>
  );
};
