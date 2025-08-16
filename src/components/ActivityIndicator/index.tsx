import useTheme from "@hooks/useTheme";
import React from "react";
import {
  ActivityIndicator as RNActivityIndicator,
  ActivityIndicatorProps as RNActivityIndicatorProps,
} from "react-native";

export interface ActivityIndicatorProps
  extends Omit<RNActivityIndicatorProps, "color"> {
  /**
   * The color of the spinner.
   *
   * @default "primary"
   */
  color?: string;
}

const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({
  color = "primary",
  ...rest
}) => {
  const theme = useTheme();
  return <RNActivityIndicator {...rest} color={theme.palette.primary} />;
};

export default ActivityIndicator;
