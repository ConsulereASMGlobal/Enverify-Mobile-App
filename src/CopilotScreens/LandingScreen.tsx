import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { TextField } from '../components/TextField/TextField';
import { Spacer } from '../components/common/Spacer';
import { SquircleView } from 'react-native-figma-squircle';
import FastImage from 'react-native-fast-image';
import {
  BORDER_RADIUS_SIZE,
  Fonts,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE
} from '../globals/themes';
import { colors } from '../globals/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tooltip from 'react-native-walkthrough-tooltip';
import MenuIcon from './../assets/others/menu-3-line.svg';
import Bell from './../assets/others/bell.svg';
import HomeSvgIcon from './../assets/tabIcons/HomeSvgIcon';

import OrderSvgIcon from '../assets/MoreScreenIcons/OrderSvgIcon';
import ProfileSvgIcon from '../assets/tabIcons/ProfileSvgIcon';
import StocksSvgIcon from './../assets/tabIcons/StocksSvgIcon';
export const LandingScreen = ({ setWalkthroughCompleted }) => {
  const [one, setOne] = useState(true);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [four, setFour] = useState(false);
  const [five, setFive] = useState(false);
  const [six, setSix] = useState(false);
  const [seven, setSeven] = useState(false);
  const [eight, setEigth] = useState(false);

  useEffect(() => {
    checkWalkthroughStatus();
  }, []);

  const checkWalkthroughStatus = async () => {
    const walkthroughComplete = await AsyncStorage.getItem(
      'walkthroughCompleted'
    );
    setOne(!!!walkthroughComplete);
  };
  const skipTuto = async () => {
    await AsyncStorage.setItem('walkthroughCompleted', 'true');
    setWalkthroughCompleted(true);
    setOne(false);
    setTwo(false);
    setThree(false);
    setFour(false);
    setFive(false);
    setSix(false);
    setSeven(false);
    setEigth(false);
  };
  const ContentView = ({ text, onPressNext }) => {
    return (
      <View style={{ flex: 1 }}>
        <TextField
          style={{
            fontSize: 17,
            textAlign: 'center',
            lineHeight: 22,
            fontWeight: 'bold',
            color: colors.primary
          }}>
          {text}
        </TextField>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
            marginHorizontal: 10
          }}>
          <Pressable onPress={() => skipTuto()}>
            <TextField
              style={{
                textDecorationLine: 'underline',
                color: colors.dark,
                lineHeight: 20,
                fontSize: 12,
                fontStyle: 'italic'
              }}>
              {eight ? '' : 'Skip'}
            </TextField>
          </Pressable>
          <Pressable onPress={eight ? () => skipTuto() : onPressNext}>
            <TextField
              style={{
                textDecorationLine: 'underline',
                color: colors.dark,
                lineHeight: 20,
                fontSize: 12,
                fontStyle: 'italic'
              }}>
              {eight ? 'Finish' : 'Next'}
            </TextField>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
      <View style={styles.mainContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colors.backgroundColor,
            marginBottom: 10
          }}>
          <MenuIcon
            height={22}
            width={22}
            fill="#136662"
            style={styles.iconStyle}
          />
          <TextField
            style={{
              fontSize: 20,
              lineHeight: 20,
              fontWeight: 'bold',
              textAlignVertical: 'bottom'
            }}>
            Home
          </TextField>
          <Tooltip
            isVisible={one}
            backgroundColor={'rgba(0,0,0,0.8)'}
            backgroundStyle={{ backgroundColor: 'transparent' }}
            content={
              <ContentView
                text="View Notifications"
                onPressNext={() => {
                  setOne(false);
                  setTwo(true);
                }}
              />
            }
            placement="left"
            contentStyle={{ height: '130%', maxWidth: '75%', minWidth: '50%' }}
            onClose={() => setWalkthroughCompleted(false)}>
            <View
              style={{
                borderWidth: one ? 1 : 0,
                borderRadius: one ? 20 : 0,
                padding: one ? 10 : 0,
                backgroundColor: colors.backgroundColor,
                borderColor: colors.primary
              }}>
              <Bell height={22} width={22} fill="#136662" />
              <View style={styles.bellBadge}>
                <Text style={styles.bellBadgeText}>0</Text>
              </View>
            </View>
          </Tooltip>
        </View>

        <Spacer spacing={10} />
        <View>
          <Tooltip
            isVisible={two}
            backgroundColor={'rgba(0,0,0,0.85)'}
            content={
              <ContentView
                text={`Collect Material\nFrom Depositor`}
                onPressNext={() => {
                  setTwo(false);
                  setThree(true);
                }}
              />
            }
            contentStyle={{ height: '100%', width: '95%', minWidth: '50%' }}
            placement="bottom"
            onClose={() => setWalkthroughCompleted(false)}>
            <SquircleView
              style={styles.card}
              squircleParams={{
                cornerSmoothing: 1,
                fillColor: colors.secondary,
                cornerRadius: BORDER_RADIUS_SIZE
              }}>
              <View>
                <TextField style={styles.textStyle}>Collect</TextField>
                <TextField
                  style={{
                    fontSize: 11,
                    color: colors.white
                  }}>
                  Collect recyclables from depositors
                </TextField>
              </View>
              <View style={styles.circleView}>
                <FastImage
                  source={require('../assets/img/Collect.png')}
                  resizeMode="contain"
                  style={{
                    height: 36,
                    width: 36
                  }}
                />
              </View>
            </SquircleView>
          </Tooltip>
        </View>
        <View>
          <Tooltip
            isVisible={three}
            backgroundColor={'rgba(0,0,0,0.85)'}
            content={
              <ContentView
                text={`Record the production data`}
                onPressNext={() => {
                  setThree(false);
                  setFour(true);
                }}
              />
            }
            contentStyle={{ height: '125%', width: '85%', minWidth: '50%' }}
            placement="bottom"
            onClose={() => setWalkthroughCompleted(false)}>
            <SquircleView
              style={styles.card}
              squircleParams={{
                cornerSmoothing: 1,
                fillColor: colors.secondary,
                cornerRadius: BORDER_RADIUS_SIZE
              }}>
              <View>
                <TextField style={styles.textStyle}>Process</TextField>
                <TextField
                  style={{
                    fontSize: 11,
                    color: colors.white
                  }}>
                  Process the recyclables
                </TextField>
              </View>
              <View style={styles.circleView}>
                <FastImage
                  source={require('../assets/img/process.png')}
                  resizeMode="contain"
                  style={{
                    height: 36,
                    width: 36
                  }}
                />
              </View>
            </SquircleView>
          </Tooltip>
        </View>
        <View>
          <Tooltip
            isVisible={four}
            backgroundColor={'rgba(0,0,0,0.85)'}
            content={
              <ContentView
                text={`Supply recyclables to waste diverters`}
                onPressNext={() => {
                  setFour(false);
                  setFive(true);
                }}
              />
            }
            contentStyle={{ height: '125%', width: '85%', minWidth: '50%' }}
            placement="bottom"
            onClose={() => setWalkthroughCompleted(false)}>
            <SquircleView
              style={styles.card}
              squircleParams={{
                cornerSmoothing: 1,
                fillColor: colors.secondary,
                cornerRadius: BORDER_RADIUS_SIZE
              }}>
              <View>
                <TextField style={styles.textStyle}>Supply</TextField>
                <TextField
                  style={{
                    fontSize: 11,
                    color: colors.white
                  }}>
                  Supply recyclables to diverters
                </TextField>
              </View>
              <View style={styles.circleView}>
                <FastImage
                  source={require('../assets/img/return.png')}
                  resizeMode="contain"
                  style={{
                    height: 36,
                    width: 36
                  }}
                />
              </View>
            </SquircleView>
          </Tooltip>
        </View>
        <View>
          <Tooltip
            isVisible={five}
            backgroundColor={'rgba(0,0,0,0.85)'}
            content={
              <ContentView
                text={`Receive recyclables from suppliers`}
                onPressNext={() => {
                  setFive(false);
                  setSix(true);
                }}
              />
            }
            contentStyle={{ height: '125%', width: '85%', minWidth: '50%' }}
            placement="top"
            onClose={() => setWalkthroughCompleted(false)}>
            <SquircleView
              style={styles.card}
              squircleParams={{
                cornerSmoothing: 1,
                fillColor: colors.secondary,
                cornerRadius: BORDER_RADIUS_SIZE
              }}>
              <View>
                <TextField style={styles.textStyle}>Receive</TextField>
                <TextField
                  style={{
                    fontSize: 11,
                    color: colors.white
                  }}>
                  Receive recyclables from suppliers
                </TextField>
              </View>
              <View style={styles.circleView}>
                <FastImage
                  source={require('./../assets/img/received.png')}
                  resizeMode="contain"
                  style={{
                    height: 36,
                    width: 36
                  }}
                />
              </View>
            </SquircleView>
          </Tooltip>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingBottom: 5
        }}>
        <View
          style={{
            borderTopWidth: 1,
            borderColor: colors.borderColor,
            backgroundColor: 'white'
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 10,
              marginHorizontal: 20
            }}>
            <View
              style={{
                alignItems: 'center'
              }}>
              <HomeSvgIcon color={colors.primary} />
              <TextField style={{ fontSize: 12 }}>Home</TextField>
            </View>
            <Tooltip
              isVisible={six}
              backgroundColor={'rgba(0,0,0,0.85)'}
              content={
                <ContentView
                  text={`View Return\nOrder Status`}
                  onPressNext={() => {
                    setSix(false);
                    setSeven(true);
                  }}
                />
              }
              contentStyle={{ height: '100%', width: '80%', minWidth: '50%' }}
              placement="top"
              onClose={() => setWalkthroughCompleted(false)}>
              <View
                style={{
                  alignItems: 'center',
                  borderWidth: six ? 1 : 0,
                  borderRadius: six ? 40 : 0,
                  paddingHorizontal: six ? 11 : 0,
                  paddingVertical: six ? 7 : 0,
                  backgroundColor: colors.white,
                  borderColor: colors.primary
                }}>
                <OrderSvgIcon color={colors.primary} />
                <TextField style={{ fontSize: 12 }}>Orders</TextField>
              </View>
            </Tooltip>
            <Tooltip
              isVisible={seven}
              backgroundColor={'rgba(0,0,0,0.85)'}
              content={
                <ContentView
                  text="View current stocks at MRF/Collection point."
                  onPressNext={() => {
                    setEigth(true);
                    setSeven(false);
                  }}
                />
              }
              contentStyle={{ height: '122%', width: '80%', minWidth: '50%' }}
              placement="top"
              onClose={() => setWalkthroughCompleted(false)}>
              <View
                style={{
                  alignItems: 'center',
                  borderWidth: seven ? 1 : 0,
                  borderRadius: seven ? 50 : 0,
                  paddingHorizontal: seven ? 11 : 0,
                  paddingVertical: seven ? 7 : 0,
                  backgroundColor: colors.white,
                  borderColor: colors.primary
                }}>
                <StocksSvgIcon color={colors.primary} />
                <TextField style={{ fontSize: 12 }}>Stocks</TextField>
              </View>
            </Tooltip>
            <Tooltip
              isVisible={eight}
              backgroundColor={'rgba(0,0,0,0.85)'}
              content={
                <ContentView
                  text="View My Profile"
                  onPressNext={() => {
                    setEigth(false);
                  }}
                />
              }
              contentStyle={{ height: '130%', width: '60%', minWidth: '50%' }}
              placement="top"
              onClose={() => setWalkthroughCompleted(false)}>
              <View
                style={{
                  alignItems: 'center',
                  borderWidth: eight ? 1 : 0,
                  borderRadius: eight ? 40 : 0,
                  paddingHorizontal: eight ? 11 : 0,
                  paddingVertical: eight ? 7 : 0,
                  backgroundColor: colors.white,
                  borderColor: colors.primary
                }}>
                <ProfileSvgIcon color={colors.primary} />
                <TextField style={{ fontSize: 12 }}>Profile</TextField>
              </View>
            </Tooltip>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: REGULAR_PADDING_SIZE,
    paddingHorizontal: REGULAR_PADDING_SIZE,
    backgroundColor: colors.backgroundColor
  },
  card: {
    height: 100,
    backgroundColor: colors.white,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: BORDER_RADIUS_SIZE,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: MEDIUM_PADDING_SIZE,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
    width: '100%'
  },
  textStyle: {
    fontSize: 24,
    lineHeight: 27,
    color: colors.white
  },
  headerText: {
    marginTop: 35,
    textAlign: 'center',
    color: colors.secondary
  },
  circleView: {
    width: 62,
    height: 62,
    borderRadius: 62 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary
  },
  iconStyle: {
    alignItems: 'flex-start',
    borderColor: 'red',
    borderWidth: 1
  },
  bellBadge: {
    position: 'absolute',
    backgroundColor: colors.primary,
    height: 15,
    width: 15,
    borderRadius: 50,
    top: -5,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bellBadgeText: {
    color: '#fff',
    fontSize: 11
  }
});
