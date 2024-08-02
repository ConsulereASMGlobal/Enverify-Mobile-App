import { Fonts, screenWidth } from '../../globals/themes';
import React, { useEffect } from 'react';

import { View, StyleSheet } from 'react-native';

import { FlatList, PanGestureHandler } from 'react-native-gesture-handler';

import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { FastImage } from '../../components/image';
import BellIcon from '../../assets/svgIcon/bell_icon_round.svg';
import { TextField } from '../../components/TextField/TextField';
import { useAppDispatch } from '../../redux/store';
import { notificationActions } from '../../redux/actions/combineAction';
import { useSelector } from 'react-redux';
import { selectNotificationList } from '../../redux/selectors';
import { NoDataView } from '../../components/NoDataView';
import { Spacer } from '../../components/common/Spacer';
import { colors } from '../../globals/colors';
import { Row } from '../../components/common/Row';
import {
  epochToHumanReadable,
  epochToHumanReadableTime
} from '../../utils/dateUtils';

type itemT = {
  item: (typeof data)[number];
};

const threshold = -screenWidth * 0.4;

const FlatListItem = ({ item }: itemT) => {
  const disptch = useAppDispatch();
  const dragX = useSharedValue(0);

  const height = useSharedValue<number | undefined>(undefined);

  const opacity = useSharedValue(1);

  const wrapper = (args: any) => {
    disptch(notificationActions.deleteNotification(args));
  };

  const gestureHander = useAnimatedGestureHandler({
    onActive: e => {
      if (e.translationX < 0) {
        dragX.value = e.translationX;
      }
    },

    onEnd: e => {
      if (threshold < e.translationX) {
        dragX.value = withTiming(0);
      } else {
        dragX.value = withTiming(-screenWidth);
        height.value = withTiming(0);
        opacity.value = withTiming(0);
        runOnJS(wrapper)({ id: item?.id });
      }
    }
  });

  const itemContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: dragX.value
        }
      ],

      height: height.value,
      opacity: opacity.value,
      marginTop: opacity.value === 1 ? 10 : 0
    };
  });

  return (
    <View>
      <PanGestureHandler
        onGestureEvent={gestureHander}
        activeOffsetX={[-10, 10]}>
        <Animated.View style={[styles.itemContainer, itemContainerStyle]}>
          {!!item?.image && (
            <FastImage
              source={{ uri: item?.image }}
              style={styles.image}
              resizeMode="stretch"
            />
          )}
          <View style={{ padding: 10, flexDirection: 'row', flex: 1 }}>
            <View style={{ width: 40, height: 40, marginEnd: 15 }}>
              <BellIcon fill={colors.secondary} />
            </View>

            <View
              style={{
                flex: 1,
                paddingBottom: 5
              }}>
              <Row>
                <TextField style={{ ...styles.itemText }}>
                  {`${epochToHumanReadable(item?.createdAt)}`}
                </TextField>
                <TextField style={{ ...styles.itemText }}>
                  {', '}
                  {`${epochToHumanReadableTime(item?.createdAt)}`}
                </TextField>
              </Row>
              <TextField style={styles.title}>{item?.title}</TextField>
              <TextField style={styles.body}>{item?.body}</TextField>
            </View>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const Notifications = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(notificationActions.getNotification());
  }, []);

  const notificationList = useSelector(selectNotificationList);
  return (
    <View style={styles.container}>
      <TextField
        style={{ fontSize: 14, textAlign: 'center', color: colors.primary }}>
        ⓘ You can swipe left to dismiss notification.
      </TextField>
      {/* <Spacer spacing={2} /> */}
      {notificationList?.length > 0 ? (
        <FlatList
          style={styles.flatlistStyle}
          contentContainerStyle={{
            paddingHorizontal: 10
          }}
          scrollEnabled={true}
          bounces={true}
          // data={notificationList}
          // data={[1, 3]}
          data={JSON.parse(JSON.stringify(notificationList))}
          keyExtractor={item => item?.id}
          ListEmptyComponent={NoDataView}
          renderItem={({ item }) => <FlatListItem item={item} />}
          ListFooterComponent={() => <Spacer spacing={10} />}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <NoDataView />
      )}
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor
  },

  flatlistStyle: {},

  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    // padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden'
  },

  image: {
    width: '100%',
    height: 130,
    borderRadius: 10,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    marginBottom: 10
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: Fonts.PoppinsSemiBold
  },
  body: {
    fontSize: 14,
    flex: 1
  },
  itemText: {
    fontSize: 11,
    paddingBottom: 5,
    color: colors.dark
  }
});

const data = [
  {
    image:
      'https://images.unsplash.com/photo-1489721775296-bd64cd2c4ddf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
    body: 'Return request has been assigned to SmartCenter-Shell Smart centre 1.Will Notify you once Pickup-Agent assigned for collection',
    id: '6411e9e1bc95cf6ce403e44a',
    title: 'Order- 6411e9e1bc95cf6ce403e449',
    createdAt: 1678895585439
  },
  {
    body: 'Return request has been assigned to SmartCenter-Shell Smart centre 1.Will Notify you once Pickup-Agent assigned for collection',
    id: '6411e9e1bc95cf6ce403e44b',
    title: 'Order- 6411e9e1bc95cf6ce403e449',
    createdAt: 1678895585439
  },
  {
    image:
      'https://images.unsplash.com/photo-1489721775296-bd64cd2c4ddf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
    body: 'Return request has been assigned to SmartCenter-Shell Smart centre 1.Will Notify you once Pickup-Agent assigned for collection',
    id: '6411e9e1bc95cf6ce403e44c',
    title: 'Order- 6411e9e1bc95cf6ce403e449',
    createdAt: 1678895585439
  },
  {
    image:
      'https://images.unsplash.com/photo-1489721775296-bd64cd2c4ddf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
    body: 'Return request has been assigned to SmartCenter-Shell Smart centre 1.Will Notify you once Pickup-Agent assigned for collection',
    id: '6411e9e1bc95cf6ce403e45c',
    title: 'Order- 6411e9e1bc95cf6ce403e449',
    createdAt: 1678895585439
  },
  {
    image:
      'https://images.unsplash.com/photo-1489721775296-bd64cd2c4ddf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
    body: 'Return request has been assigned to SmartCenter-Shell Smart centre 1.Will Notify you once Pickup-Agent assigned for collection',
    id: '6411e9e1bc95cf6ce403e45a',
    title: 'Order- 6411e9e1bc95cf6ce403e449',
    createdAt: 1678895585439
  }
];
