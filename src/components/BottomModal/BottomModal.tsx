import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-native';

import { Spacer } from '../common/Spacer';
import { FastImage } from '../image';
import { colors } from '../../globals/colors';
import { BottomModalActions } from '../../redux/actions/combineAction';
import {
  MEDIUM_PADDING_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  screenWidth
} from '../../globals/themes';
import { TextField } from '../TextField/TextField';

interface BotomOverlayProps {
  visible: boolean;
  data: Array;
  title?: string;
  onSelect?: Function;
}

export const BotomOverlay = ({
  title,
  data,
  visible,
  onSelect
}: BotomOverlayProps) => {
  const dispatch = useDispatch();
  // const [selected, setSelected] = useState([]);
  const closeModal = () => {
    dispatch(
      BottomModalActions.toggleBottomModal({
        onSelect: () => {},
        title: '',
        showList: false,
        data: []
      })
    );
  };

  const selectItem = (item: any) => {
    !!onSelect && onSelect({ item });
    closeModal();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}>
      <TouchableOpacity style={styles.centeredView} onPress={closeModal}>
        <View style={styles.modalView}>
          <Spacer spacing={10} />
          {title && (
            <View>
              <View style={[{ flexDirection: 'row' }, styles.titleContainer]}>
                <TextField style={{ color: colors.gray }}>{title}</TextField>
              </View>
              <Spacer spacing={3} />

              <View
                style={{
                  borderBottomWidth: 1,
                  marginHorizontal: MEDIUM_PADDING_SIZE,
                  borderColor: colors.borderColor
                }}
              />
            </View>
          )}
          <Spacer spacing={5} />
          <FlatList
            data={data}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: colors.borderColor
                }}
              />
            )}
            style={{ maxHeight: 400 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{
                    flex: 1,
                    width: screenWidth - 40,
                    paddingVertical: HALF_MEDIUM_PADDING_SIZE,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                  onPress={() => {
                    selectItem(item), console.log(item, 'this is selected');
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    {/* {item?.image && (
                      <View
                        style={{
                          padding: 5,
                          backgroundColor: colors.backgroundColor,
                          borderRadius: 100,
                          marginRight: 5
                        }}>
                        <FastImage
                          source={{ uri: item?.image }}
                          resizeMode="contain"
                          style={{
                            height: 20,
                            width: 20
                            // backgroundColor: colors.gray
                          }}
                        />
                      </View>
                    )} */}
                    <View>
                      <TextField>{item?.label}</TextField>
                    </View>
                  </View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: colors.primary,
                      borderRadius: 4,
                      paddingHorizontal: 7,
                      paddingVertical: 2,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    <TextField style={{ fontSize: 14 }}>Select</TextField>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item.id}
          />
          <Spacer spacing={14} />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'flex-end'
    // alignItems: 'center',
  },
  modalView: {
    paddingHorizontal: 15,
    backgroundColor: 'white',
    width: screenWidth,
    // height: screenHeight - 60,
    borderRadius: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  titleContainer: {
    width: screenWidth,
    paddingHorizontal: 15
  }
});
