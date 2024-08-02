import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Tooltip from "react-native-walkthrough-tooltip";
import { colors } from "../../globals/colors";
import { DynamicIcon } from "../../utils/Dynamic/DynamicIcon";

interface tooltipProps {
  tooltipText?: string;
  tooltipPosition?: any;
  children?: React.ReactNode;
}
const TooltipComp = ({
  tooltipText,
  tooltipPosition = "top",
  children,
}: tooltipProps) => {
  const [toolTipVisible, setToolTipVisible] = useState(false);
  return (
    <View>
      <Tooltip
        isVisible={toolTipVisible}
        content={children}
        tooltipStyle={{
          width: 240,
          height: 220,
        }}
        placement={tooltipPosition}
        onClose={() => setToolTipVisible(false)}
      >
        <TouchableOpacity
          style={{
            backgroundColor: toolTipVisible ? colors.red : colors.shaded,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            width: 22,
            height: 22,
          }}
          onPress={() => setToolTipVisible(true)}
        >
          <DynamicIcon
            iconName={!toolTipVisible ? "information-variant" : "close"}
            iconFamily="MaterialCommunityIcons"
            iconSize={16}
            iconColor={toolTipVisible ? colors.white : colors.dark}
          />
        </TouchableOpacity>
      </Tooltip>
    </View>
  );
};

export default TooltipComp;

const styles = StyleSheet.create({});
