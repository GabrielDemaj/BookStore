// import { useRandom } from "@store/useRandom";
import TouchableOpacity from '@components/TouchableOpacity';
import useTheme from '@hooks/useTheme';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Item from './Item';

function TabBar({state, descriptors, navigation, isAuthenticated}: any) {
  // const { scrollToTop, updateRandom } = useRandom((state) => state, shallow);
  const theme = useTheme();

  const totalWidth = Dimensions.get('window').width;

  return (
    <View
      style={[
        style.tabContainer,
        {
          width: totalWidth,
          height: theme.tabHeight,
          backgroundColor: theme.palette.background,
          bottom: 0,
        },
      ]}>
      <View style={{flexDirection: 'row'}}>
        {state.routes.map((route: any, index: number) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
          const badge = options?.tabBarBadge || 0;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
            // if (index === 0) {
            //   updateRandom({ scrollToTop: !scrollToTop });
            // }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{flex: 1}}
              key={index}
              activeOpacity={0.8}>
              <Item
                // iconName={label.toString()}
                isCurrent={isFocused}
                label={label}
                // badge={badge}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default TabBar;
const style = StyleSheet.create({
  tabContainer: {
    backgroundColor: '#fff',
    elevation: 10,
    position: 'absolute',
  },
});
