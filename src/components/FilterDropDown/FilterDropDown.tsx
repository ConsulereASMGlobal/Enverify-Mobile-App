import { colors } from '../../globals/colors';
import React, { useEffect } from 'react';
import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import { Pressable, Text, View } from 'react-native';
import { DynamicIcon } from '../../utils/Dynamic/DynamicIcon';

function FilterDropDown({ title, data, placeholder, value, setValue }: any) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(data);

  useEffect(() => {
    setItems(data);
  }, [data]);

  const selectValue = (
    currentValue: ((prevState: string) => string) | string
  ) => {
    let chosenValue = (currentValue as (prevState: string) => string)('');
    if (chosenValue === value) {
      setValue(null);
    } else {
      setValue(currentValue);
    }
  };

  var conditionalProps: any = {};

  if (value) {
    conditionalProps.ArrowDownIconComponent = () => (
      <Pressable
        style={{
          paddingHorizontal: 5
        }}
        onPress={() => {
          setValue(null);
        }}>
        <DynamicIcon
          iconName={'remove'}
          iconFamily={'FontAwesome'}
          iconColor={colors.primary}
          iconSize={16}
        />
      </Pressable>
    );
  }

  return (
    <View style={{ gap: 10 }}>
      {title && (
        <Text style={{ fontSize: 16, color: colors.dark }}>{title}</Text>
      )}
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        listMode="MODAL"
        searchable={true}
        setOpen={setOpen}
        setValue={selectValue}
        setItems={setItems}
        placeholder={placeholder}
        searchPlaceholder="Type here to search"
        modalProps={{
          transparent: true,
          animationType: 'slide',
          presentationStyle: 'overFullScreen'
        }}
        style={{
          borderColor: colors.gray,
          backgroundColor: colors.backgroundColor
        }}
        placeholderStyle={{
          color: colors.gray
        }}
        textStyle={{
          fontSize: 16,
          color: colors.primary
        }}
        modalContentContainerStyle={{
          backgroundColor: '#fff',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '50%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingHorizontal: 15,
          elevation: 20
        }}
        searchContainerStyle={{
          borderColor: 'white',
          paddingVertical: 15,
          borderWidth: 1,
          paddingHorizontal: 0
        }}
        searchTextInputStyle={{
          borderColor: colors.primary
        }}
        searchTextInputProps={{
          clearButtonMode: 'while-editing'
        }}
        listParentContainerStyle={{
          height: 50
        }}
        listItemLabelStyle={{
          color: colors.darkGray
        }}
        closeIconStyle={{
          height: 22,
          width: 22
        }}
        itemSeparator={true}
        itemSeparatorStyle={{
          backgroundColor: colors.grayTwo
        }}
        {...conditionalProps}
      />
    </View>
  );
}

export default FilterDropDown;
