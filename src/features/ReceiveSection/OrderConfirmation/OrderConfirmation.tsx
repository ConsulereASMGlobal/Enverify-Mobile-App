import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import {
  initializeAudio,
  playPause,
  releaseAudio
} from '@src/utils/soundUtils';
import { returnActions } from '@src/redux/actions/combineAction';
import { selectReturnList } from '@src/redux/selectors';
import { RootState } from '@src/redux/store';
import SupplyCard from '../components/SupplyCard';
import { globalStyle } from '@src/globals/globalStyles';
import Button from '@src/components/Button/Button';
import { colors } from '@src/globals/colors';
import { LoadingIndicator } from '@src/components/LoadingIndicator';
import { NoDataView } from '@src/components/NoDataView';
import { Spacer } from '@src/components/common/Spacer';
import ConfirmModal from '@src/components/ConfirmModal';
import ConfirmScreen from '@src/features/ConfirmScreen';
import CongratulationsModal from '@src/components/CongratulationsModal/CongratulationsModal';
import CongratulationScreen from '@src/features/CongratulationScreen/CongratulationScreen';
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE
} from '@src/globals/themes';
import { orderAPI } from '@src/services/api';

export const OrderConfirmation = () => {
  useEffect(() => {
    initializeAudio();
    return () => {
      releaseAudio();
    };
  }, []);

  const [isModalVisible, setisModalVisible] = useState(false);
  const [isConfirmModalVisible, setisConfirmModalVisible] = useState(false);
  const [orderDecision, setOrderDecision] = useState<{
    id: string;
    decision: boolean;
  }>();
  const [finalDecision, setFinalDecision] = useState<boolean>();

  const _onRequestClose = () => {
    setisModalVisible(false);
    navigation.goBack();
  };

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(returnActions.getReturn('CREATED'));
  }, [dispatch, isFocused]);

  const returnOrders = useSelector(selectReturnList);
  const isLoading = useSelector((state: RootState) => state.returnList.loading);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const _onRefresh = () => {
    setRefreshing(true);
    dispatch(returnActions.getReturn('CREATED'));
    setRefreshing(false);
  };

  const handleOrder = (id: string, decision: boolean) => {
    setOrderDecision({
      id,
      decision
    });
    setisConfirmModalVisible(true);
  };

  const onYes = () => {
    if (orderDecision?.id) {
      setLoading(true);
      orderAPI
        .changeStatus({
          orderId: orderDecision?.id,
          status: orderDecision?.decision ? 'ACCEPTED' : 'REJECTED'
        })
        .then(res => {
          setLoading(false);
          if (res.status === 200) {
            setFinalDecision(orderDecision.decision);
            setisConfirmModalVisible(false);
            setisModalVisible(true);
            playPause();
          } else {
            setisConfirmModalVisible(false);
          }
        });
    }
  };

  const onNo = () => {
    setisConfirmModalVisible(false);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <SupplyCard item={item} detail={true} flowFrom="OrderConfirmation" />

      <View style={[globalStyle.flexRow, { justifyContent: 'space-between' }]}>
        <Button
          title="Accept"
          style={{ width: '47%', backgroundColor: colors.primary }}
          onPress={() => handleOrder(item.id, true)}
        />
        <Button
          title="Reject"
          style={{
            width: '47%',
            borderWidth: 1,
            borderColor: colors.primary,
            backgroundColor: colors.white
          }}
          textStyle={{ color: colors.primary }}
          onPress={() => handleOrder(item.id, false)}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={returnOrders}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={_onRefresh}
              tintColor={colors.primary}
            />
          }
          style={{ flex: 1 }}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatlistContainerStyle}
          ListEmptyComponent={NoDataView}
          ItemSeparatorComponent={() => <Spacer spacing={5} />}
        />
      )}

      <ConfirmModal modalVisible={isConfirmModalVisible} onRequestClose={onNo}>
        <ConfirmScreen
          onNo={onNo}
          onYes={onYes}
          loading={loading}
          message={`Are you sure you want to ${
            orderDecision?.decision ? 'ACCEPT' : 'REJECT'
          } this order?`}
        />
      </ConfirmModal>

      <CongratulationsModal
        modalVisible={isModalVisible}
        onRequestClose={_onRequestClose}>
        <CongratulationScreen
          onRequestClose={_onRequestClose}
          message={`The order has been successfully ${
            finalDecision ? 'accepted' : 'rejected'
          }. Check order history for details.`}
          heading={``}
          bottomContent={
            <View style={{ ...globalStyle.container }}>
              <Button
                style={{
                  width: '80%',
                  backgroundColor: colors.white,
                  borderColor: colors.primary,
                  borderWidth: 1
                }}
                textStyle={{ color: colors.primary }}
                title={'Ok'}
                onPress={_onRequestClose}
              />
            </View>
          }
        />
      </CongratulationsModal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
    backgroundColor: colors.backgroundColor
  },
  flatlistContainerStyle: {
    paddingVertical: MEDIUM_PADDING_SIZE,
    paddingHorizontal: HALF_MEDIUM_PADDING_SIZE
  },
  card: {
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
    padding: MEDIUM_PADDING_SIZE,
    marginBottom: 5
  },
  circleView: {
    width: 36,
    height: 36,
    borderRadius: 92 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8ECF2',
    padding: 16,
    marginRight: 15
  },
  statusView: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 3,
    marginBottom: 5,
    borderRadius: 92 / 2
  }
});
