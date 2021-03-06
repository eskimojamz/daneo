/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  light?: string;
  dark?: string;
};

type ColorName = { colorName: keyof typeof Colors.light & keyof typeof Colors.dark; }

export type TextProps = ThemeProps & DefaultText['props'] & ColorName;
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
  const { style, light, dark, colorName, ...otherProps } = props;
  const color = useThemeColor({ light, dark }, colorName);

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, light, dark, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light, dark }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
