import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { TextBold, TextField } from "@src/components/TextField/TextField";
import { useSelector } from "react-redux";
import { selectNotificationCount, selectProfile } from "@src/redux/selectors";
import { FastImage } from "@src/components/image";
import Bell from "../../assets/others/bell.svg";
import { routes } from "@src/navigation/routes";
import { colors } from "@src/globals/colors";
import { useNavigation } from "@react-navigation/native";
import { MEDIUM_PADDING_SIZE, REGULAR_PADDING_SIZE } from "@src/globals/themes";

const ProfileBox = () => {
  const profileData = useSelector(selectProfile);
  const notificationCount = useSelector(selectNotificationCount);
  const navigation = useNavigation<any>();

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: colors.secondary }} />
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: colors.secondary,
            paddingHorizontal: REGULAR_PADDING_SIZE,
            paddingVertical: MEDIUM_PADDING_SIZE,
          }}
        >
          <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
            {profileData?.kycDocument && profileData?.kycDocument[1]?.docUrl ? (
              <Pressable
                onPress={() => navigation.navigate(routes.more.profile)}
                style={{ backgroundColor: colors.white, borderRadius: 100 }}
              >
                <FastImage
                  source={{ uri: profileData?.kycDocument[1]?.docUrl }}
                  style={{ width: 48, height: 48, borderRadius: 100 }}
                />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => navigation.navigate(routes.more.profile)}
              >
                <FastImage
                  source={require("../../assets/others/userProfile.png")}
                  style={{ width: 48, height: 48, borderRadius: 100 }}
                />
              </Pressable>
            )}
            <View>
              <TextField style={{ color: colors.white, fontSize: 12 }}>
                Welcome
              </TextField>
              {profileData?.personalDetails?.name && (
                <TextBold style={{ color: colors.white }}>
                  {profileData?.personalDetails?.name.split(" ")[0]}
                </TextBold>
              )}
            </View>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.notificaion.list)}
            >
              <Bell height={27} width={27} fill={colors.white} />
              {notificationCount > 0 && (
                <View style={styles.bellBadge}>
                  <TextField style={styles.bellBadgeText}>
                    {notificationCount}
                  </TextField>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ProfileBox;

const styles = StyleSheet.create({
  bellBadge: {
    position: "absolute",
    backgroundColor: colors.white,
    height: 20,
    width: 20,
    borderRadius: 50,
    top: -8,
    left: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  bellBadgeText: {
    color: colors.dark,
    fontSize: 10,
  },
});
