import React, { useRef, useState } from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { BORDER_RADIUS_SIZE, REGULAR_PADDING_SIZE } from '../../globals/themes';
import Button from '../../components/Button/Button';
import { Spacer } from '../../components/common/Spacer';
import { colors } from '../../globals/colors';
import { TextBold, TextField } from '../../components/TextField/TextField';
import toast from '../../services/toast/index';
import { captureRef } from 'react-native-view-shot';
import { DynamicIcon } from '../../utils/Dynamic/DynamicIcon';

const { height, width } = Dimensions.get('window');

type SignatureCanvasProps = {
  onRequestClose: () => void;
  onRequestConfirm: () => any;
  submiting: boolean;
  setSign: React.Dispatch<React.SetStateAction<undefined>>;
};

export const SignatureCanvas = ({
  onRequestConfirm,
  onRequestClose,
  submiting,
  setSign
}: SignatureCanvasProps) => {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [paths, setPaths] = useState<string[][]>([]);
  const [imguri, setimguri] = useState();
  const onTouchMove = (event: GestureResponderEvent) => {
    const newPath = [...currentPath];

    //get current user touches position
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;

    // create new point
    const newPoint = `${newPath.length === 0 ? 'M' : ''}${locationX.toFixed(
      0
    )},${locationY.toFixed(0)} `;

    // add the point to older points
    newPath.push(newPoint);
    setCurrentPath(newPath);
  };

  const onTouchEnd = () => {
    const currentPaths = [...paths];
    const newPath = [...currentPath];

    //push new path with old path and clean current path state
    currentPaths.push(newPath);
    setPaths(currentPaths);
    setCurrentPath([]);
  };

  const save = async () => {
    if (paths.length === 0) {
      toast.danger({ message: 'Singature is required !' });
      return;
    }
    try {
      const localUri = await captureRef(signRef, {
        height: 100,
        quality: 0.2,
        format: 'png'
      });
      setimguri(localUri);
      setSign({ uri: localUri });
      console.log(localUri, 'Canvas uri');
      onRequestConfirm({ uri: localUri });
    } catch (e) {
      console.log(e);
    }
  };
  const clear = () => {
    setCurrentPath([]);
    setPaths([]);
    onRequestClose();
  };
  const signRef = useRef<any>(null);
  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <TextBold
          style={{
            textAlign: 'center'
          }}>
          Add Signature
        </TextBold>
        <Spacer spacing={9} />
        <ImageBackground
          source={
            paths.length > 0 ? null : require('../../assets/others/penIcon.jpg')
          }
          resizeMode="contain"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.white
          }}>
          <View
            style={styles.svgContainer}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}>
            <View ref={signRef} collapsable={false}>
              <Svg height={height * 0.2} width={width * 0.7}>
                <Path
                  d={currentPath.join('')}
                  stroke={'black'}
                  fill={'transparent'}
                  strokeWidth={3}
                />

                {paths.length > 0 &&
                  paths.map((item, index) => (
                    <Path
                      key={`path-${index}`}
                      d={item.join('')}
                      stroke={'black'}
                      strokeWidth={3}
                      fill={'transparent'}
                    />
                  ))}
              </Svg>
            </View>
          </View>
        </ImageBackground>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <Button
            onPress={clear}
            title={'Cancel'}
            textStyle={{
              color: colors.primary
            }}
            style={{
              width: '47%',
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: colors.primary
            }}
          />
          <Spacer spacing={10} />
          <Button
            onPress={save}
            title={submiting ? 'loading' : 'Confirm'}
            style={{ width: '47%' }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)' // Adjust the opacity here (0.5 means 50% transparency)
  },

  svgContainer: {
    height: height * 0.2,
    width: width * 0.7,
    borderColor: colors.borderColor,
    // backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: BORDER_RADIUS_SIZE
  },
  saveButton: {
    height: 40,
    width: 100,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  modalView: {
    marginHorizontal: REGULAR_PADDING_SIZE,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 34,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // paddingBottom: XLARGE_PADDING_SIZE,
    alignItems: 'center'
  }
});
